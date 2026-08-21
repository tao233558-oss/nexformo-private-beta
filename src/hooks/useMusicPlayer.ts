import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  DEFAULT_MUSIC_PLAYBACK_STATE,
  MUSIC_VERSION_TYPES,
  calculateLyricAlignmentOffset,
  clampLyricsOffset,
  classifyMusicVersion,
  createLyricBindingKey,
  createLyricSelectionKey,
  findActiveLyricIndex,
  musicPlaybackReducer,
  normalizeMusicQuery,
  parseMusicCommand,
  resolveLyricDisplayState,
  type LyricCandidateSummary,
  type LyricLine,
  type LyricResult,
  type MusicCommand,
  type MusicPlaybackStatus,
  type MusicPlayerPresentation,
  type MusicProviderStatus,
  type MusicRhythmIntensity,
  type MusicSearchResult,
  type MusicTrack,
  type MusicVersionType,
} from "../../shared/music";
import { resolveYouTubePlaybackFallback } from "../lib/youtubePlayerLifecycle";

export type MusicPlayerController = {
  load: (videoId: string, autoplay: boolean) => void | Promise<void>;
  play: () => void | Promise<void>;
  pause: () => void | Promise<void>;
  stop: () => void | Promise<void>;
  seek: (timeSeconds: number) => void | Promise<void>;
  setVolume: (volume: number) => void | Promise<void>;
  getCurrentTime: () => number;
  getDuration: () => number;
};

export type MusicCommandExecution = {
  handled: boolean;
  command: MusicCommand | null;
  message: string;
  suppressSpeech: boolean;
};

const UNKNOWN_PROVIDER_STATUS: MusicProviderStatus = {
  provider: "youtube",
  ready: false,
  label: "YouTube 音乐搜索",
};

const MUSIC_PRESENTATION_KEY = "nexformo.music.presentation.v1";

const loadMusicPresentation = (): MusicPlayerPresentation => {
  try {
    const saved = window.localStorage.getItem(MUSIC_PRESENTATION_KEY);
    return saved === "expanded" || saved === "compact" ? saved : "compact";
  } catch {
    return "compact";
  }
};

const recordOf = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const compactText = (value: unknown, maximum: number) =>
  typeof value === "string" ? value.trim().slice(0, maximum) : "";

const safeThumbnail = (value: unknown) => {
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value, window.location.origin);
    return url.protocol === "https:" || url.origin === window.location.origin ? url.href : "";
  } catch {
    return "";
  }
};

const sanitizeSearchResult = (value: unknown): MusicSearchResult | null => {
  const candidate = recordOf(value);
  if (!candidate) return null;
  const videoId = compactText(candidate.videoId, 20);
  const title = compactText(candidate.title, 240);
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId) || !title) return null;
  const rawDuration = candidate.durationSeconds;
  const duration =
    typeof rawDuration === "number" && Number.isFinite(rawDuration)
      ? clamp(rawDuration, 0, 86_400)
      : null;
  return {
    videoId,
    title,
    artist: compactText(candidate.artist, 160) || "未知音乐人",
    thumbnail: safeThumbnail(candidate.thumbnail),
    durationSeconds: duration,
    provider: "youtube",
    version: MUSIC_VERSION_TYPES.includes(candidate.version as MusicVersionType)
      ? (candidate.version as MusicVersionType)
      : classifyMusicVersion(title, compactText(candidate.artist, 160)),
    trackHint: compactText(candidate.trackHint, 160) || undefined,
    artistHint: compactText(candidate.artistHint, 120) || undefined,
  };
};

const sanitizeLyricCandidate = (value: unknown): LyricCandidateSummary | null => {
  const candidate = recordOf(value);
  if (!candidate) return null;
  const lyricId = compactText(candidate.lyricId, 80);
  if (!/^[A-Za-z0-9_-]+$/.test(lyricId)) return null;
  const rawDuration = candidate.durationSeconds;
  const rawConfidence = candidate.confidence;
  const kinds = new Set<LyricCandidateSummary["kind"]>([
    "synced",
    "plain",
    "instrumental",
    "none",
  ]);
  const version = MUSIC_VERSION_TYPES.includes(candidate.matchedVersion as MusicVersionType)
    ? (candidate.matchedVersion as MusicVersionType)
    : "unknown";
  const confidence =
    typeof rawConfidence === "number" && Number.isFinite(rawConfidence)
      ? clamp(rawConfidence, 0, 1)
      : 0;
  const rawDifference = candidate.durationDifference;
  return {
    lyricId,
    trackName: compactText(candidate.trackName, 180) || "未知歌曲",
    artistName: compactText(candidate.artistName, 140) || "未知音乐人",
    durationSeconds:
      typeof rawDuration === "number" && Number.isFinite(rawDuration)
        ? clamp(rawDuration, 0, 86_400)
        : null,
    kind: kinds.has(candidate.kind as LyricCandidateSummary["kind"])
      ? (candidate.kind as LyricCandidateSummary["kind"])
      : "none",
    matchedVersion: version,
    confidence,
    confidenceLabel:
      candidate.confidenceLabel === "高" || candidate.confidenceLabel === "中"
        ? candidate.confidenceLabel
        : "低",
    durationDifference:
      typeof rawDifference === "number" && Number.isFinite(rawDifference)
        ? clamp(rawDifference, 0, 86_400)
        : null,
    recommended: candidate.recommended === true,
  };
};

const sanitizeLyricLine = (value: unknown): LyricLine | null => {
  const candidate = recordOf(value);
  if (!candidate || typeof candidate.timeSeconds !== "number") return null;
  const text = compactText(candidate.text, 500);
  if (!Number.isFinite(candidate.timeSeconds) || candidate.timeSeconds < 0 || !text) return null;
  return { timeSeconds: Math.min(candidate.timeSeconds, 86_400), text };
};

const sanitizeLyricResult = (value: unknown, track: MusicTrack): LyricResult => {
  const candidate = recordOf(value) ?? {};
  const allowedKinds = new Set<LyricResult["kind"]>([
    "synced",
    "plain",
    "instrumental",
    "none",
  ]);
  const kind = allowedKinds.has(candidate.kind as LyricResult["kind"])
    ? (candidate.kind as LyricResult["kind"])
    : "none";
  const rawLines = Array.isArray(candidate.lines) ? candidate.lines : [];
  const lines = rawLines
    .map(sanitizeLyricLine)
    .filter((line): line is LyricLine => Boolean(line))
    .sort((left, right) => left.timeSeconds - right.timeSeconds)
    .slice(0, 5_000);
  const rawDuration = candidate.durationSeconds;
  const durationSeconds =
    typeof rawDuration === "number" && Number.isFinite(rawDuration)
      ? clamp(rawDuration, 0, 86_400)
      : track.durationSeconds;
  const finalKind = kind === "synced" && !lines.length ? "none" : kind;
  const rawConfidence = candidate.confidence;
  const confidence =
    typeof rawConfidence === "number" && Number.isFinite(rawConfidence)
      ? clamp(rawConfidence, 0, 1)
      : 0;
  const requestedVersion = MUSIC_VERSION_TYPES.includes(candidate.requestedVersion as MusicVersionType)
    ? (candidate.requestedVersion as MusicVersionType)
    : track.version;
  const matchedVersion = MUSIC_VERSION_TYPES.includes(candidate.matchedVersion as MusicVersionType)
    ? (candidate.matchedVersion as MusicVersionType)
    : "unknown";
  const rawDifference = candidate.durationDifference;
  return {
    provider: "lrclib",
    kind: finalKind,
    trackName: compactText(candidate.trackName, 180) || track.trackHint || track.title,
    artistName: compactText(candidate.artistName, 140) || track.artistHint || track.artist,
    durationSeconds,
    lines,
    plainLyrics: compactText(candidate.plainLyrics, 60_000),
    lyricId: compactText(candidate.lyricId, 80),
    source: "lrclib",
    confidence,
    confidenceLabel:
      candidate.confidenceLabel === "高" || candidate.confidenceLabel === "中"
        ? candidate.confidenceLabel
        : "低",
    matchedVersion,
    requestedVersion,
    durationDifference:
      typeof rawDifference === "number" && Number.isFinite(rawDifference)
        ? clamp(rawDifference, 0, 86_400)
        : null,
    requiresSelection: candidate.requiresSelection === true,
    candidates: Array.isArray(candidate.candidates)
      ? candidate.candidates
          .map(sanitizeLyricCandidate)
          .filter((item): item is LyricCandidateSummary => Boolean(item))
          .slice(0, 5)
      : [],
    appliedOffsetSeconds:
      typeof candidate.appliedOffsetSeconds === "number"
        ? clampLyricsOffset(candidate.appliedOffsetSeconds)
        : 0,
    notice: compactText(candidate.notice, 240) || undefined,
  };
};

const responsePayload = async (response: Response) => {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
};

const responseMessage = (payload: unknown, fallback: string) => {
  const candidate = recordOf(payload);
  return (
    compactText(candidate?.error, 240) ||
    compactText(candidate?.message, 240) ||
    compactText(candidate?.notice, 240) ||
    fallback
  );
};

export function useMusicPlayer() {
  const [playback, dispatch] = useReducer(
    musicPlaybackReducer,
    DEFAULT_MUSIC_PLAYBACK_STATE,
  );
  const [providerStatus, setProviderStatus] = useState<MusicProviderStatus>(
    UNKNOWN_PROVIDER_STATUS,
  );
  const [results, setResults] = useState<MusicSearchResult[]>([]);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [playerNotice, setPlayerNotice] = useState("");
  const [lyrics, setLyrics] = useState<LyricResult | null>(null);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [lyricsError, setLyricsError] = useState("");
  const [lyricsVisible, setLyricsVisible] = useState(true);
  const [lyricsOffset, setLyricsOffset] = useState(0);
  const [lyricsCandidateVisible, setLyricsCandidateVisible] = useState(false);
  const [rhythmIntensity, setRhythmIntensity] =
    useState<MusicRhythmIntensity>("medium");
  const [presentation, setPresentation] =
    useState<MusicPlayerPresentation>(loadMusicPresentation);

  const controllerRef = useRef<MusicPlayerController | null>(null);
  const playbackRef = useRef(playback);
  const lyricsRef = useRef(lyrics);
  const resultsRef = useRef(results);
  const searchAbortRef = useRef<AbortController | null>(null);
  const lyricsAbortRef = useRef<AbortController | null>(null);
  const pendingAutoplayRef = useRef(false);
  const fallbackAttemptedRef = useRef(false);
  const resumeSeekTimerRef = useRef<number | null>(null);
  const lastVisiblePresentationRef = useRef<Exclude<MusicPlayerPresentation, "closed">>(
    presentation === "expanded" ? "expanded" : "compact",
  );

  playbackRef.current = playback;
  lyricsRef.current = lyrics;
  resultsRef.current = results;

  const invokeController = useCallback(
    (operation: (controller: MusicPlayerController) => void | Promise<void>) => {
      const controller = controllerRef.current;
      if (!controller) return false;
      try {
        void Promise.resolve(operation(controller)).catch(() => {
          dispatch({ type: "status", status: "error", error: "播放器暂时无法完成这个操作。" });
        });
        return true;
      } catch {
        dispatch({ type: "status", status: "error", error: "播放器暂时无法完成这个操作。" });
        return false;
      }
    },
    [],
  );

  const registerController = useCallback((controller: MusicPlayerController | null) => {
    controllerRef.current = controller;
    if (!controller) return;
    const current = playbackRef.current;
    void Promise.resolve(controller.setVolume(current.volume)).catch(() => undefined);
    if (current.currentTrack) {
      void Promise.resolve(
        controller.load(current.currentTrack.videoId, pendingAutoplayRef.current),
      )
        .then(() => {
          if (current.currentTime <= 0) return;
          if (resumeSeekTimerRef.current !== null) window.clearTimeout(resumeSeekTimerRef.current);
          resumeSeekTimerRef.current = window.setTimeout(() => {
            void Promise.resolve(controller.seek(current.currentTime)).catch(() => undefined);
            resumeSeekTimerRef.current = null;
          }, 650);
        })
        .catch(() => {
          dispatch({ type: "status", status: "error", error: "播放器初始化失败，请重新选择歌曲。" });
        });
    }
  }, []);

  const reportPlayerStatus = useCallback(
    (status: MusicPlaybackStatus, error = "") => {
      dispatch({ type: "status", status, error });
      if (status === "playing") {
        pendingAutoplayRef.current = false;
        setPlayerNotice("");
      }
    },
    [],
  );

  const reportProgress = useCallback((currentTime: number, duration?: number) => {
    if (!Number.isFinite(currentTime)) return;
    dispatch({
      type: "progress",
      currentTime,
      duration: typeof duration === "number" && Number.isFinite(duration) ? duration : undefined,
    });
  }, []);

  const reportAutoplayBlocked = useCallback((blocked = true) => {
    dispatch({ type: "autoplay-blocked", blocked });
  }, []);

  const selectFromTracks = useCallback(
    (tracks: MusicTrack[], index: number, autoplay = true, fallback = false) => {
      const track = tracks[index];
      if (!track) return false;
      if (!fallback) {
        fallbackAttemptedRef.current = false;
        setPlayerNotice("");
      }
      dispatch({ type: "queue", tracks });
      dispatch({ type: "select", index });
      setResults(tracks);
      setResultsVisible(false);
      setPresentation((current) =>
        current === "closed" ? lastVisiblePresentationRef.current : current,
      );
      pendingAutoplayRef.current = autoplay;
      setLyricsVisible(true);
      setLyricsOffset(0);
      setLyrics(null);
      setLyricsError("");
      setLyricsCandidateVisible(false);
      const invoked = invokeController((controller) => {
        controller.setVolume(playbackRef.current.volume);
        return controller.load(track.videoId, autoplay);
      });
      if (!invoked) dispatch({ type: "status", status: "loading" });
      return true;
    },
    [invokeController],
  );

  const reportPlayerFailure = useCallback(
    (message: string) => {
      const current = playbackRef.current;
      const nextIndex = resolveYouTubePlaybackFallback({
        currentIndex: current.queue.currentIndex,
        trackCount: current.queue.tracks.length,
        fallbackAttempted: fallbackAttemptedRef.current,
      });
      if (nextIndex === null) {
        setPlayerNotice("");
        dispatch({ type: "status", status: "error", error: `${message} 请重试或选择其他版本。` });
        return false;
      }
      fallbackAttemptedRef.current = true;
      setPlayerNotice("当前版本无法播放，正在自动尝试下一个搜索结果…");
      return selectFromTracks(current.queue.tracks, nextIndex, true, true);
    },
    [selectFromTracks],
  );

  const selectResult = useCallback(
    (index: number, autoplay = true) => selectFromTracks(resultsRef.current, index, autoplay),
    [selectFromTracks],
  );

  const dismissSearch = useCallback(() => {
    searchAbortRef.current?.abort();
    searchAbortRef.current = null;
    setSearching(false);
    setSearchError("");
    setResultsVisible(false);
  }, []);

  const showVersions = useCallback(() => {
    if (!resultsRef.current.length && playbackRef.current.queue.tracks.length) {
      setResults(playbackRef.current.queue.tracks);
    }
    if (playbackRef.current.currentTrack) {
      lastVisiblePresentationRef.current = "compact";
      setPresentation("compact");
      try {
        window.localStorage.setItem(MUSIC_PRESENTATION_KEY, "compact");
      } catch {
        // Presentation persistence is optional.
      }
    }
    setResultsVisible(true);
  }, []);

  const setPlayerPresentation = useCallback(
    (next: MusicPlayerPresentation) => {
      if (next === "closed") {
        pendingAutoplayRef.current = false;
        invokeController((controller) => controller.pause());
        if (playbackRef.current.status === "playing" || playbackRef.current.status === "loading") {
          dispatch({ type: "status", status: "paused" });
        }
        setPresentation("closed");
        return "播放器已关闭，音乐也暂停了。";
      }

      lastVisiblePresentationRef.current = next;
      setPresentation(next);
      try {
        window.localStorage.setItem(MUSIC_PRESENTATION_KEY, next);
      } catch {
        // Presentation persistence is optional.
      }
      return next === "compact" ? "播放器已收起。" : "播放器已展开。";
    },
    [invokeController],
  );

  const search = useCallback(async (rawQuery: string, autoplayFirst = false) => {
    const query = normalizeMusicQuery(rawQuery);
    if (!query) return { ok: false, message: "请告诉 Sol 想听什么。" };
    searchAbortRef.current?.abort();
    const controller = new AbortController();
    searchAbortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort("timeout"), 18_000);
    setSearching(true);
    setSearchError("");
    setSearchQuery(query);
    setResultsVisible(!autoplayFirst);
    try {
      const response = await fetch(`/api/music/search?q=${encodeURIComponent(query)}`, {
        signal: controller.signal,
      });
      const payload = await responsePayload(response);
      const candidate = recordOf(payload);
      if (!response.ok || candidate?.success === false) {
        if (candidate?.code === "MUSIC_NOT_CONFIGURED") {
          setProviderStatus({
            provider: "youtube",
            ready: false,
            label: "YouTube 音乐搜索",
            code: "MUSIC_NOT_CONFIGURED",
          });
        }
        throw new Error(responseMessage(payload, "音乐搜索暂时不可用。"));
      }

      const envelope = recordOf(payload);
      const nestedData = recordOf(envelope?.data);
      const rawResults = Array.isArray(payload)
        ? payload
        : Array.isArray(envelope?.results)
          ? envelope.results
          : Array.isArray(envelope?.tracks)
            ? envelope.tracks
            : Array.isArray(nestedData?.results)
              ? nestedData.results
              : [];
      const nextResults = rawResults
        .map(sanitizeSearchResult)
        .filter((item): item is MusicSearchResult => Boolean(item))
        .slice(0, 5);
      if (controller.signal.aborted || searchAbortRef.current !== controller) {
        return { ok: false, message: "搜索已取消。" };
      }
      setResults(nextResults);
      setResultsVisible(!autoplayFirst);
      setProviderStatus({ provider: "youtube", ready: true, label: "YouTube 音乐搜索" });
      if (!nextResults.length) {
        setSearchError("没有找到合适的歌曲，换一个歌名或歌手试试。" );
        return { ok: false, message: "没有找到合适的歌曲。" };
      }
      if (autoplayFirst) {
        selectFromTracks(nextResults, 0, true);
        return {
          ok: true,
          message: `找到了 ${nextResults.length} 个结果，正在为你播放第一首《${nextResults[0].title}》。`,
        };
      }
      return {
        ok: true,
        message: `找到了 ${nextResults.length} 个结果，请选择想播放的版本。`,
      };
    } catch (error) {
      if (controller.signal.aborted && searchAbortRef.current !== controller) {
        return { ok: false, message: "搜索已取消。" };
      }
      const message =
        controller.signal.aborted
          ? "音乐搜索等待时间过长，请稍后再试。"
          : error instanceof Error
            ? error.message
            : "音乐搜索暂时不可用。";
      setSearchError(message);
      return { ok: false, message };
    } finally {
      window.clearTimeout(timeout);
      if (searchAbortRef.current === controller) {
        searchAbortRef.current = null;
        setSearching(false);
      }
    }
  }, [selectFromTracks]);

  const play = useCallback(() => {
    const current = playbackRef.current;
    if (!current.currentTrack) {
      if (resultsRef.current.length === 1) return selectFromTracks(resultsRef.current, 0, true);
      return false;
    }
    pendingAutoplayRef.current = true;
    dispatch({ type: "autoplay-blocked", blocked: false });
    const invoked = invokeController((controller) => controller.play());
    if (!invoked) dispatch({ type: "status", status: "loading" });
    return true;
  }, [invokeController, selectFromTracks]);

  const pause = useCallback(
    () => invokeController((controller) => controller.pause()),
    [invokeController],
  );

  const stop = useCallback(() => {
    pendingAutoplayRef.current = false;
    invokeController((controller) => controller.stop());
    dispatch({ type: "stop" });
    setLyrics(null);
    setLyricsError("");
    setLyricsCandidateVisible(false);
  }, [invokeController]);

  const next = useCallback(() => {
    const current = playbackRef.current;
    const index = current.queue.currentIndex + 1;
    if (index < 0 || index >= current.queue.tracks.length) return false;
    return selectFromTracks(current.queue.tracks, index, true);
  }, [selectFromTracks]);

  const previous = useCallback(() => {
    const current = playbackRef.current;
    const index = current.queue.currentIndex - 1;
    if (index < 0 || index >= current.queue.tracks.length) return false;
    return selectFromTracks(current.queue.tracks, index, true);
  }, [selectFromTracks]);

  const seek = useCallback(
    (timeSeconds: number) => {
      const current = playbackRef.current;
      const nextTime = clamp(
        timeSeconds,
        0,
        current.duration > 0 ? current.duration : Math.max(timeSeconds, 0),
      );
      reportProgress(nextTime, current.duration);
      return invokeController((controller) => controller.seek(nextTime));
    },
    [invokeController, reportProgress],
  );

  const setVolume = useCallback(
    (volume: number) => {
      const nextVolume = clamp(Math.round(volume), 0, 100);
      dispatch({ type: "volume", volume: nextVolume });
      invokeController((controller) => controller.setVolume(nextVolume));
      return nextVolume;
    },
    [invokeController],
  );

  const persistLyricsOffset = useCallback((offset: number) => {
    const track = playbackRef.current.currentTrack;
    const lyricId = lyricsRef.current?.lyricId;
    if (!track || !lyricId) return;
    try {
      window.localStorage.setItem(createLyricBindingKey(track.videoId, lyricId), String(offset));
    } catch {
      // Lyric calibration still works for the current session.
    }
  }, []);

  const setCalibratedLyricsOffset = useCallback(
    (rawOffset: number) => {
      const next = clampLyricsOffset(rawOffset);
      setLyricsOffset(next);
      persistLyricsOffset(next);
      return next;
    },
    [persistLyricsOffset],
  );

  const adjustLyricsOffset = useCallback(
    (deltaSeconds: number) => {
      setLyricsOffset((current) => {
        const next = clampLyricsOffset(current + deltaSeconds);
        persistLyricsOffset(next);
        return next;
      });
    },
    [persistLyricsOffset],
  );

  const alignLyricsToLine = useCallback(
    (index: number) => {
      const line = lyricsRef.current?.lines[index];
      if (!line) return null;
      return setCalibratedLyricsOffset(
        calculateLyricAlignmentOffset(line.timeSeconds, playbackRef.current.currentTime),
      );
    },
    [setCalibratedLyricsOffset],
  );

  const executeCommand = useCallback(
    async (command: MusicCommand): Promise<MusicCommandExecution> => {
      let message = "";
      switch (command.action) {
        case "music.search": {
          const result = await search(command.query, command.autoplay);
          message = result.message;
          break;
        }
        case "music.select":
          message = selectResult(command.index, true)
            ? `正在准备播放第 ${command.index + 1} 首。`
            : "这个搜索结果不存在，请重新选择。";
          break;
        case "music.play":
          message = play() ? "继续播放。" : "请先搜索并选择一首歌曲。";
          break;
        case "music.pause":
          message = pause() ? "已请求暂停。" : "现在没有可以暂停的歌曲。";
          break;
        case "music.stop":
          stop();
          message = "音乐已经停止。";
          break;
        case "music.next":
          message = next() ? "正在切换到下一首。" : "已经没有下一首了。";
          break;
        case "music.previous":
          message = previous() ? "正在切换到上一首。" : "已经是第一首了。";
          break;
        case "music.setVolume": {
          const target =
            typeof command.volume === "number"
              ? command.volume
              : playbackRef.current.volume + (command.delta ?? 0);
          const volume = setVolume(target);
          message = `音乐音量已调到百分之 ${volume}。`;
          break;
        }
        case "player.setPresentation":
          message = setPlayerPresentation(command.presentation);
          break;
        case "lyrics.show":
          setLyricsVisible(true);
          message = "已显示歌词。";
          break;
        case "lyrics.hide":
          setLyricsVisible(false);
          message = "已隐藏歌词。";
          break;
        case "lyrics.setOffset":
          adjustLyricsOffset(command.deltaSeconds);
          message = command.deltaSeconds > 0 ? "歌词已经提前一点。" : "歌词已经延后一点。";
          break;
      }
      return { handled: true, command, message, suppressSpeech: true };
    },
    [adjustLyricsOffset, next, pause, play, previous, search, selectResult, setPlayerPresentation, setVolume, stop],
  );

  const executeText = useCallback(
    async (rawText: string): Promise<MusicCommandExecution> => {
      const command = parseMusicCommand(rawText);
      if (!command) {
        return { handled: false, command: null, message: "", suppressSpeech: false };
      }
      return executeCommand(command);
    },
    [executeCommand],
  );

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8_000);
    void (async () => {
      try {
        const response = await fetch("/api/music/status", { signal: controller.signal });
        const payload = await responsePayload(response);
        if (!response.ok) return;
        const envelope = recordOf(payload);
        const candidate = recordOf(envelope?.status) ?? envelope;
        if (!candidate) return;
        setProviderStatus({
          provider: "youtube",
          ready: candidate.ready === true,
          label: compactText(candidate.label, 120) || "YouTube 音乐搜索",
          code:
            candidate.code === "MUSIC_NOT_CONFIGURED"
              ? "MUSIC_NOT_CONFIGURED"
              : undefined,
        });
      } catch {
        // Music remains optional; configuration feedback appears only after a search attempt.
      } finally {
        window.clearTimeout(timeout);
      }
    })();
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const loadLyrics = useCallback(async (track: MusicTrack, explicitLyricId = "") => {
    lyricsAbortRef.current?.abort();
    const controller = new AbortController();
    lyricsAbortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort("timeout"), 16_000);
    setLyrics(null);
    setLyricsError("");
    setLyricsLoading(true);

    let lyricId = explicitLyricId;
    if (!lyricId) {
      try {
        lyricId = window.localStorage.getItem(createLyricSelectionKey(track.videoId)) || "";
      } catch {
        lyricId = "";
      }
    }
    const parameters = new URLSearchParams({
      videoId: track.videoId,
      title: track.title,
      track: track.trackHint || track.title,
      trackName: track.trackHint || track.title,
      // A YouTube channel name is frequently a label or lyric channel rather than
      // the performer. Only send an artist when it was inferred from the user's
      // query/title; title + duration is safer than a confidently wrong channel.
      artist: track.artistHint || "",
      artistName: track.artistHint || "",
      version: track.version,
    });
    if (track.durationSeconds) {
      parameters.set("duration", String(track.durationSeconds));
      parameters.set("durationSeconds", String(track.durationSeconds));
    }
    if (lyricId) parameters.set("lyricId", lyricId);

    try {
      const response = await fetch(`/api/lyrics?${parameters.toString()}`, {
        signal: controller.signal,
      });
      const payload = await responsePayload(response);
      if (!response.ok) throw new Error(responseMessage(payload, "歌词服务暂时不可用。"));
      const envelope = recordOf(payload);
      const rawLyrics = envelope?.lyrics ?? envelope?.result ?? envelope?.data ?? payload;
      if (controller.signal.aborted || lyricsAbortRef.current !== controller) return null;
      const nextLyrics = sanitizeLyricResult(rawLyrics, track);
      setLyrics(nextLyrics);
      setLyricsCandidateVisible(nextLyrics.requiresSelection);
      let restoredOffset = nextLyrics.appliedOffsetSeconds;
      if (nextLyrics.lyricId) {
        try {
          if (explicitLyricId) {
            window.localStorage.setItem(createLyricSelectionKey(track.videoId), nextLyrics.lyricId);
          }
          const savedValue = window.localStorage.getItem(
            createLyricBindingKey(track.videoId, nextLyrics.lyricId),
          );
          const saved = savedValue === null ? Number.NaN : Number(savedValue);
          if (Number.isFinite(saved)) restoredOffset = saved;
        } catch {
          // Use the server-provided default offset.
        }
      }
      setLyricsOffset(clampLyricsOffset(restoredOffset));
      return nextLyrics;
    } catch (error) {
      if (controller.signal.aborted && lyricsAbortRef.current !== controller) return null;
      const message =
        controller.signal.aborted
          ? "歌词加载等待时间过长。"
          : error instanceof Error
            ? error.message
            : "歌词服务暂时不可用。";
      setLyricsError(message);
      return null;
    } finally {
      window.clearTimeout(timeout);
      if (lyricsAbortRef.current === controller) {
        lyricsAbortRef.current = null;
        setLyricsLoading(false);
      }
    }
  }, []);

  const selectLyricsCandidate = useCallback(
    async (lyricId: string) => {
      const track = playbackRef.current.currentTrack;
      if (!track || !/^[A-Za-z0-9_-]{1,80}$/.test(lyricId)) return false;
      const loaded = await loadLyrics(track, lyricId);
      if (loaded) setLyricsCandidateVisible(false);
      return Boolean(loaded);
    },
    [loadLyrics],
  );

  useEffect(() => {
    const track = playback.currentTrack;
    if (!track) {
      lyricsAbortRef.current?.abort();
      setLyrics(null);
      setLyricsLoading(false);
      setLyricsCandidateVisible(false);
      return;
    }
    void loadLyrics(track);
    return () => {
      lyricsAbortRef.current?.abort();
    };
  }, [loadLyrics, playback.currentTrack]);

  useEffect(
    () => () => {
      searchAbortRef.current?.abort();
      lyricsAbortRef.current?.abort();
      if (resumeSeekTimerRef.current !== null) window.clearTimeout(resumeSeekTimerRef.current);
      controllerRef.current = null;
    },
    [],
  );

  const activeLyricIndex = useMemo(
    () => findActiveLyricIndex(lyrics?.lines ?? [], playback.currentTime, lyricsOffset),
    [lyrics?.lines, lyricsOffset, playback.currentTime],
  );
  const lyricDisplayState = useMemo(
    () =>
      resolveLyricDisplayState({
        loading: lyricsLoading,
        hasError: Boolean(lyricsError),
        playbackStatus: playback.status,
        lyricKind: lyrics?.kind ?? null,
        requiresSelection: lyrics?.requiresSelection === true,
        activeLyricIndex,
      }),
    [activeLyricIndex, lyrics?.kind, lyrics?.requiresSelection, lyricsError, lyricsLoading, playback.status],
  );

  return {
    playback,
    providerStatus,
    results,
    resultsVisible,
    searchQuery,
    searching,
    searchError,
    playerNotice,
    lyrics,
    lyricsLoading,
    lyricsError,
    lyricsVisible,
    lyricsOffset,
    lyricsCandidateVisible,
    activeLyricIndex,
    lyricDisplayState,
    rhythmIntensity,
    presentation,
    search,
    dismissSearch,
    showVersions,
    selectResult,
    play,
    pause,
    stop,
    next,
    previous,
    seek,
    setVolume,
    setLyricsVisible,
    setLyricsCandidateVisible,
    adjustLyricsOffset,
    setCalibratedLyricsOffset,
    alignLyricsToLine,
    selectLyricsCandidate,
    setRhythmIntensity,
    setPlayerPresentation,
    executeCommand,
    executeText,
    registerController,
    reportPlayerStatus,
    reportProgress,
    reportAutoplayBlocked,
    reportPlayerFailure,
  };
}

export type UseMusicPlayerResult = ReturnType<typeof useMusicPlayer>;
