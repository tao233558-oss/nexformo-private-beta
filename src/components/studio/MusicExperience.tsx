import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  GripHorizontal,
  ListMusic,
  LoaderCircle,
  Maximize2,
  Minimize2,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Square,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { CompanionMessage, VoiceActivity } from "../../../shared/companion";
import type {
  MusicPlaybackStatus,
  MusicRhythmIntensity,
} from "../../../shared/music";
import { MUSIC_VERSION_LABELS } from "../../../shared/music";
import { sampleMusicRhythm } from "../../lib/musicRhythm";
import {
  YOUTUBE_API_READY_TIMEOUT_MS,
  YOUTUBE_AUTOPLAY_CONFIRM_MS,
  YOUTUBE_MANUAL_PLAY_CONFIRM_MS,
  youtubePlayerErrorMessage,
} from "../../lib/youtubePlayerLifecycle";
import { resolveStageContentPriority } from "../../lib/stagePresentation";
import { useFloatingPlayer } from "../../hooks/useFloatingPlayer";
import type {
  MusicPlayerController,
  UseMusicPlayerResult,
} from "../../hooks/useMusicPlayer";
import StageSolReply from "./StageSolReply";

type YouTubePlayerEvent = { target: YouTubePlayer };
type YouTubeStateEvent = YouTubePlayerEvent & { data: number };
type YouTubeErrorEvent = YouTubePlayerEvent & { data: number };

type YouTubePlayer = {
  loadVideoById: (videoId: string) => void;
  cueVideoById: (videoId: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
};

type YouTubePlayerOptions = {
  width: string;
  height: string;
  playerVars: Record<string, string | number>;
  events: {
    onReady: (event: YouTubePlayerEvent) => void;
    onStateChange: (event: YouTubeStateEvent) => void;
    onError: (event: YouTubeErrorEvent) => void;
    onAutoplayBlocked?: (event: YouTubePlayerEvent) => void;
  };
};

type YouTubeNamespace = {
  Player: new (element: HTMLElement, options: YouTubePlayerOptions) => YouTubePlayer;
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
};

type YouTubeWindow = Window &
  typeof globalThis & {
    YT?: YouTubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
  };

let youtubeApiPromise: Promise<YouTubeNamespace> | null = null;

function loadYouTubeApi() {
  const youtubeWindow = window as YouTubeWindow;
  if (youtubeWindow.YT?.Player) return Promise.resolve(youtubeWindow.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise<YouTubeNamespace>((resolve, reject) => {
    const previousReady = youtubeWindow.onYouTubeIframeAPIReady;
    let finished = false;
    let script = document.querySelector<HTMLScriptElement>(
      "script[data-nexformo-youtube-api]",
    );

    const cleanup = () => {
      window.clearInterval(pollTimer);
      window.clearTimeout(timeoutTimer);
      script?.removeEventListener("error", fail);
      if (youtubeWindow.onYouTubeIframeAPIReady === ready) {
        youtubeWindow.onYouTubeIframeAPIReady = previousReady;
      }
    };
    const finish = () => {
      if (finished || !youtubeWindow.YT?.Player) return;
      finished = true;
      cleanup();
      resolve(youtubeWindow.YT);
    };
    const fail = () => {
      if (finished) return;
      finished = true;
      cleanup();
      youtubeApiPromise = null;
      reject(new Error("YouTube 播放器加载失败，请检查网络后重试。"));
    };
    const ready = () => {
      try {
        previousReady?.();
      } finally {
        finish();
      }
    };

    youtubeWindow.onYouTubeIframeAPIReady = ready;
    const pollTimer = window.setInterval(finish, 100);
    const timeoutTimer = window.setTimeout(fail, YOUTUBE_API_READY_TIMEOUT_MS);

    if (!script) {
      script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.dataset.nexformoYoutubeApi = "true";
      document.head.appendChild(script);
    }
    script.addEventListener("error", fail, { once: true });
  });

  return youtubeApiPromise;
}

const formatTime = (rawSeconds: number) => {
  const seconds = Math.max(0, Math.floor(Number.isFinite(rawSeconds) ? rawSeconds : 0));
  const hours = Math.floor(seconds / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  const remainder = seconds % 60;
  return hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`
    : `${minutes}:${String(remainder).padStart(2, "0")}`;
};

const statusLabels: Record<MusicPlaybackStatus, string> = {
  idle: "等待播放",
  loading: "正在缓冲",
  playing: "正在播放",
  paused: "已暂停",
  ended: "播放结束",
  error: "播放遇到问题",
};

function YouTubePlayerPane({ music }: { music: UseMusicPlayerResult }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);
  const manualPlayTimerRef = useRef<number | null>(null);
  const callbacksRef = useRef({
    registerController: music.registerController,
    reportPlayerStatus: music.reportPlayerStatus,
    reportProgress: music.reportProgress,
    reportAutoplayBlocked: music.reportAutoplayBlocked,
    reportPlayerFailure: music.reportPlayerFailure,
  });
  const [ready, setReady] = useState(false);
  const [apiError, setApiError] = useState("");
  const [retryToken, setRetryToken] = useState(0);

  callbacksRef.current = {
    registerController: music.registerController,
    reportPlayerStatus: music.reportPlayerStatus,
    reportProgress: music.reportProgress,
    reportAutoplayBlocked: music.reportAutoplayBlocked,
    reportPlayerFailure: music.reportPlayerFailure,
  };

  useEffect(() => {
    let disposed = false;
    const host = hostRef.current;
    if (!host) return;

    void loadYouTubeApi()
      .then((youtube) => {
        if (disposed || !hostRef.current) return;
        const player = new youtube.Player(hostRef.current, {
          width: "100%",
          height: "100%",
          playerVars: {
            controls: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (disposed) return;
              playerRef.current = event.target;
              setReady(true);
              setApiError("");
              const controller: MusicPlayerController = {
                load: (videoId, autoplay) => {
                  if (autoplayTimerRef.current !== null) {
                    window.clearTimeout(autoplayTimerRef.current);
                    autoplayTimerRef.current = null;
                  }
                  if (manualPlayTimerRef.current !== null) {
                    window.clearTimeout(manualPlayTimerRef.current);
                    manualPlayTimerRef.current = null;
                  }
                  if (autoplay) {
                    event.target.loadVideoById(videoId);
                    autoplayTimerRef.current = window.setTimeout(() => {
                      if (event.target.getPlayerState() !== youtube.PlayerState.PLAYING) {
                        callbacksRef.current.reportAutoplayBlocked(true);
                        callbacksRef.current.reportPlayerStatus("paused");
                      }
                    }, YOUTUBE_AUTOPLAY_CONFIRM_MS);
                  } else {
                    event.target.cueVideoById(videoId);
                  }
                },
                play: () => {
                  if (manualPlayTimerRef.current !== null) {
                    window.clearTimeout(manualPlayTimerRef.current);
                  }
                  event.target.playVideo();
                  manualPlayTimerRef.current = window.setTimeout(() => {
                    manualPlayTimerRef.current = null;
                    if (
                      event.target.getPlayerState() === youtube.PlayerState.PLAYING &&
                      event.target.getCurrentTime() > 0.25
                    ) return;
                    callbacksRef.current.reportAutoplayBlocked(false);
                    callbacksRef.current.reportPlayerFailure(
                      "YouTube 未确认播放，可能受嵌入、地区或视频权限限制。",
                    );
                  }, YOUTUBE_MANUAL_PLAY_CONFIRM_MS);
                },
                pause: () => event.target.pauseVideo(),
                stop: () => event.target.stopVideo(),
                seek: (seconds) => event.target.seekTo(Math.max(0, seconds), true),
                setVolume: (volume) => event.target.setVolume(Math.max(0, Math.min(100, volume))),
                getCurrentTime: () => event.target.getCurrentTime() || 0,
                getDuration: () => event.target.getDuration() || 0,
              };
              callbacksRef.current.registerController(controller);
              progressTimerRef.current = window.setInterval(() => {
                try {
                  callbacksRef.current.reportProgress(
                    controller.getCurrentTime(),
                    controller.getDuration(),
                  );
                } catch {
                  // A player can briefly be unavailable while YouTube replaces its iframe.
                }
              }, 250);
            },
            onStateChange: (event) => {
              if (disposed) return;
              const state = event.data;
              if (state === youtube.PlayerState.PLAYING) {
                if (autoplayTimerRef.current !== null) {
                  window.clearTimeout(autoplayTimerRef.current);
                  autoplayTimerRef.current = null;
                }
                callbacksRef.current.reportAutoplayBlocked(false);
                callbacksRef.current.reportPlayerStatus("playing");
              } else if (state === youtube.PlayerState.PAUSED) {
                callbacksRef.current.reportPlayerStatus("paused");
              } else if (state === youtube.PlayerState.ENDED) {
                callbacksRef.current.reportPlayerStatus("ended");
              } else if (state === youtube.PlayerState.BUFFERING) {
                callbacksRef.current.reportPlayerStatus("loading");
              } else if (state === youtube.PlayerState.CUED) {
                callbacksRef.current.reportPlayerStatus("paused");
              }
            },
            onError: (event) => {
              if (disposed) return;
              if (autoplayTimerRef.current !== null) {
                window.clearTimeout(autoplayTimerRef.current);
                autoplayTimerRef.current = null;
              }
              if (manualPlayTimerRef.current !== null) {
                window.clearTimeout(manualPlayTimerRef.current);
                manualPlayTimerRef.current = null;
              }
              callbacksRef.current.reportPlayerFailure(youtubePlayerErrorMessage(event.data));
            },
            onAutoplayBlocked: () => {
              if (disposed) return;
              callbacksRef.current.reportAutoplayBlocked(true);
              callbacksRef.current.reportPlayerStatus("paused");
            },
          },
        });
        playerRef.current = player;
      })
      .catch((error) => {
        if (disposed) return;
        const message = error instanceof Error ? error.message : "YouTube 播放器加载失败。";
        setApiError(message);
        callbacksRef.current.reportPlayerStatus("error", message);
      });

    return () => {
      disposed = true;
      callbacksRef.current.registerController(null);
      if (progressTimerRef.current !== null) window.clearInterval(progressTimerRef.current);
      if (autoplayTimerRef.current !== null) window.clearTimeout(autoplayTimerRef.current);
      if (manualPlayTimerRef.current !== null) window.clearTimeout(manualPlayTimerRef.current);
      progressTimerRef.current = null;
      autoplayTimerRef.current = null;
      manualPlayTimerRef.current = null;
      try {
        playerRef.current?.destroy();
      } catch {
        // The iframe may already have been removed during a hot reload.
      }
      playerRef.current = null;
    };
  }, [retryToken]);

  return (
    <div>
      <div className="aspect-video w-full overflow-hidden border border-white/12 bg-black">
        <div ref={hostRef} className="h-full w-full" aria-label="YouTube 音乐播放器" />
      </div>
      {!ready && !apiError && (
        <p className="mt-2 flex items-center gap-2 text-[9px] text-white/40" role="status">
          <LoaderCircle className="animate-spin" size={11} /> 正在连接 YouTube 播放器
        </p>
      )}
      {apiError && (
        <div className="mt-2 flex items-center justify-between gap-3 text-[9px] leading-relaxed text-white/55" role="alert">
          <p>{apiError}</p>
          <button type="button" onClick={() => {
            youtubeApiPromise = null;
            document.querySelector("script[data-nexformo-youtube-api]")?.remove();
            setApiError("");
            setReady(false);
            setRetryToken((value) => value + 1);
          }} className="shrink-0 border border-white/20 px-2 py-1 text-white/58 transition hover:border-white/50 hover:text-white">重新连接</button>
        </div>
      )}
    </div>
  );
}

export function MusicSearchResults({
  music,
  className = "",
}: {
  music: UseMusicPlayerResult;
  className?: string;
}) {
  if (!music.resultsVisible) return null;
  return (
    <section
      className={`border border-white/10 bg-black/78 p-3 backdrop-blur-xl ${className}`}
      aria-label="歌曲搜索结果"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-white/30">
            Sol 找到的音乐
          </p>
          {music.searchQuery && (
            <p className="mt-1 truncate text-[10px] font-light text-white/55">
              “{music.searchQuery}”
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {music.searching && <LoaderCircle className="animate-spin text-white/45" size={13} />}
          <button
            type="button"
            onClick={music.dismissSearch}
            className="flex h-6 w-6 items-center justify-center text-white/30 transition hover:text-white/75"
            aria-label="关闭歌曲搜索结果"
            title="关闭搜索结果"
          >
            <X size={11} />
          </button>
        </div>
      </div>

      {music.searchError && (
        <p className="border-l border-white/20 pl-3 text-[9px] leading-relaxed text-white/48" role="status">
          {music.searchError}
        </p>
      )}

      {!!music.results.length && (
        <div className="space-y-2">
          {music.results.map((result, index) => (
            <article
              key={result.videoId}
              className="grid grid-cols-[72px_minmax(0,1fr)_28px] items-center gap-3 border-t border-white/8 pt-2 first:border-t-0 first:pt-0"
            >
              <div className="aspect-video overflow-hidden bg-white/5">
                {result.thumbnail ? (
                  <img
                    src={result.thumbnail}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="block h-full w-full bg-gradient-to-br from-white/10 to-transparent" />
                )}
              </div>
              <div className="min-w-0">
                <p className="line-clamp-2 text-[10px] font-light leading-snug text-white/72">
                  {result.title}
                </p>
                <p className="mt-1 truncate text-[8px] text-white/30">
                  {result.artist}
                  {result.durationSeconds ? ` · ${formatTime(result.durationSeconds)}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => music.selectResult(index, true)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/18 text-white/65 transition hover:border-white/55 hover:text-white"
                aria-label={`播放第 ${index + 1} 首：${result.title}`}
                title={`播放第 ${index + 1} 首`}
              >
                <Play size={10} fill="currentColor" />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

const intensityLabels: Record<MusicRhythmIntensity, string> = {
  off: "关闭",
  low: "轻",
  medium: "中",
  high: "强",
};

export function StageLyrics({ music }: { music: UseMusicPlayerResult }) {
  const track = music.playback.currentTrack;
  const visibleLines = useMemo(() => {
    const lines = music.lyrics?.lines ?? [];
    if (!lines.length || music.activeLyricIndex < 0) return [];
    const center = music.activeLyricIndex;
    const start = Math.max(0, center - 1);
    return lines.slice(start, Math.min(lines.length, center + 2)).map((line, offset) => ({
      line,
      index: start + offset,
    }));
  }, [music.activeLyricIndex, music.lyrics?.lines]);
  const rhythm = useMemo(
    () =>
      sampleMusicRhythm({
        trackId: track?.videoId ?? null,
        status: music.playback.status,
        currentTime: music.playback.currentTime,
        intensity: music.rhythmIntensity,
      }),
    [music.playback.currentTime, music.playback.status, music.rhythmIntensity, track?.videoId],
  );
  const lyricStyle = {
    "--lyric-pulse": String(1 + rhythm.pulse * 0.018),
    "--lyric-glow": `${10 + rhythm.accent * 18}px`,
    "--lyric-brightness": String(0.84 + rhythm.energy * 0.28),
  } as CSSProperties;

  if (!track || !music.lyricsVisible || music.presentation === "closed") return null;

  const plainLine = music.lyrics?.plainLyrics
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" · ");

  const sourceLabel = music.lyrics?.kind === "synced"
    ? "同步歌词"
    : music.lyrics?.kind === "plain"
      ? "普通歌词"
      : "暂无歌词";

  return (
    <section
      className="pointer-events-auto fixed bottom-[112px] left-1/2 z-[46] w-[min(680px,calc(100vw-760px))] -translate-x-1/2 text-center"
      style={lyricStyle}
      aria-label="舞台歌词"
    >
      <div className="mb-1 flex items-center justify-center gap-1 text-[8px] text-white/20">
        <span className="text-white/24">{sourceLabel}</span>
        <span className="mx-1 h-2 w-px bg-white/10" />
        <button type="button" onClick={() => music.adjustLyricsOffset(-0.5)} className="px-1.5 py-1 transition hover:text-white/60" aria-label="让歌词延后半秒">−0.5</button>
        <span>
          歌词校准 {music.lyricsOffset > 0 ? "+" : ""}{music.lyricsOffset.toFixed(1)} 秒
        </span>
        <button type="button" onClick={() => music.adjustLyricsOffset(0.5)} className="px-1.5 py-1 transition hover:text-white/60" aria-label="让歌词提前半秒">+0.5</button>
        {!!music.lyrics?.candidates.length && (
          <button type="button" onClick={() => music.setLyricsCandidateVisible(!music.lyricsCandidateVisible)} className="ml-1 px-1.5 py-1 text-white/32 transition hover:text-white/70">换一版歌词</button>
        )}
        <button type="button" onClick={() => music.setLyricsVisible(false)} className="ml-1 p-1 transition hover:text-white/60" aria-label="隐藏歌词"><EyeOff size={10} /></button>
      </div>
      <div className="min-h-[62px] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" aria-live="polite">
        {music.lyricDisplayState === "loading" && <p className="pt-5 text-[9px] text-white/34">正在寻找可靠的歌词版本…</p>}
        {music.lyricDisplayState === "playback_error" && <p className="pt-5 text-[9px] text-white/34">播放器当前无法播放，歌词同步已暂停。</p>}
        {music.lyricDisplayState === "waiting_for_playback" && <p className="pt-5 text-[9px] text-white/34">等待播放器开始</p>}
        {music.lyricDisplayState === "instrumental_intro" && <p className="stage-lyric-active pt-4 text-[15px] font-light tracking-[0.12em] text-white/68">前奏中</p>}
        {music.lyricDisplayState === "needs_selection" && (
          <button type="button" onClick={() => music.setLyricsCandidateVisible(true)} className="mt-3 border border-white/16 px-4 py-2 text-[9px] text-white/48 transition hover:border-white/40 hover:text-white">找到多个可能版本 · 请选择歌词</button>
        )}
        {music.lyricDisplayState === "unavailable" && (
          <p className="pt-5 text-[9px] text-white/32">
            {music.lyricsError || music.lyrics?.notice || "暂未找到可靠的歌词版本"}
          </p>
        )}
        {(music.lyricDisplayState === "active" || music.lyricDisplayState === "paused") && music.lyrics?.kind === "synced" && (
          <div className="space-y-1.5 py-1">
            {visibleLines.map(({ line, index }) => {
              const active = index === music.activeLyricIndex;
              return (
                <div key={`${line.timeSeconds}-${index}-${active ? "active" : "idle"}`} className="group relative flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => music.seek(Math.max(0, line.timeSeconds - music.lyricsOffset))}
                    className={active ? "stage-lyric-active block w-full truncate px-16 text-[17px] font-light tracking-[0.04em] text-white" : "block w-full truncate px-16 text-[10px] font-light text-white/26 transition hover:text-white/55"}
                    aria-current={active ? "true" : undefined}
                    title={`${formatTime(line.timeSeconds)} ${line.text}`}
                  >
                    {line.text}
                  </button>
                  <button type="button" onClick={() => music.alignLyricsToLine(index)} className="absolute right-3 opacity-0 text-[8px] text-white/28 transition hover:text-white/70 group-hover:opacity-100 focus:opacity-100" aria-label={`将歌词“${line.text}”对齐到当前时间`}>这句现在开始</button>
                </div>
              );
            })}
            {music.lyricDisplayState === "paused" && <p className="text-[8px] tracking-[0.14em] text-white/20">已暂停</p>}
          </div>
        )}
        {(music.lyricDisplayState === "active" || music.lyricDisplayState === "paused") && music.lyrics?.kind === "plain" && (
          <p className="stage-lyric-active mx-auto max-w-xl pt-4 text-[14px] font-light leading-relaxed text-white/72">{plainLine || "已找到非同步歌词"}</p>
        )}
      </div>
      {music.lyrics?.lyricId && (
        <p className="mt-1 text-[7px] tracking-[0.08em] text-white/14">LRCLIB · {MUSIC_VERSION_LABELS[music.lyrics.matchedVersion]} · 匹配度{music.lyrics.confidenceLabel}</p>
      )}
    </section>
  );
}

function LyricCandidateSelector({ music }: { music: UseMusicPlayerResult }) {
  const candidates = music.lyrics?.candidates ?? [];
  if (!music.lyricsCandidateVisible || !candidates.length || music.presentation === "closed") return null;
  return (
    <section className="pointer-events-auto fixed bottom-[186px] left-1/2 z-[49] w-[460px] -translate-x-1/2 border border-white/12 bg-black/92 p-3 shadow-2xl backdrop-blur-xl" aria-label="歌词版本选择">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-[8px] uppercase tracking-[0.16em] text-white/28">歌词版本</p>
          <p className="mt-1 text-[9px] text-white/48">请选择与当前视频一致的版本</p>
        </div>
        <button type="button" onClick={() => music.setLyricsCandidateVisible(false)} className="p-1 text-white/30 hover:text-white/70" aria-label="关闭歌词版本选择"><X size={11} /></button>
      </div>
      <div className="max-h-[230px] space-y-1 overflow-y-auto border-t border-white/8 pt-2">
        {candidates.map((candidate) => (
          <button key={candidate.lyricId} type="button" onClick={() => void music.selectLyricsCandidate(candidate.lyricId)} className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-3 border border-transparent px-2 py-2 text-left transition hover:border-white/15 hover:bg-white/[0.03]">
            <span className="min-w-0">
              <span className="block truncate text-[10px] text-white/68">{candidate.trackName}</span>
              <span className="mt-1 block truncate text-[8px] text-white/28">{candidate.artistName} · {candidate.durationSeconds ? formatTime(candidate.durationSeconds) : "未知时长"} · {MUSIC_VERSION_LABELS[candidate.matchedVersion]}</span>
            </span>
            <span className="flex items-center gap-2 text-[8px] text-white/30">
              {candidate.kind === "synced" ? "同步" : candidate.kind === "plain" ? "普通" : "无歌词"}
              <span className={candidate.confidenceLabel === "高" ? "text-emerald-200/65" : candidate.confidenceLabel === "中" ? "text-amber-100/55" : "text-white/25"}>{candidate.confidenceLabel}</span>
              {candidate.recommended && <span className="border border-white/14 px-1 py-0.5 text-white/45">推荐</span>}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function MusicDock({
  music,
  timelineVisible,
  sideRailsVisible,
  className = "",
}: {
  music: UseMusicPlayerResult;
  timelineVisible: boolean;
  sideRailsVisible: boolean;
  className?: string;
}) {
  const track = music.playback.currentTrack;
  const floating = useFloatingPlayer({
    enabled: Boolean(track && music.presentation !== "closed"),
    timelineVisible,
    stageVisible: Boolean(track && music.lyricsVisible),
    sideRailsVisible,
    snap: true,
  });
  if (!track) return null;
  const playing = music.playback.status === "playing";
  const currentIndex = music.playback.queue.currentIndex;
  const lastIndex = music.playback.queue.tracks.length - 1;
  const duration = Math.max(music.playback.duration, track.durationSeconds ?? 0, 0);
  const compact = music.presentation === "compact";

  if (music.presentation === "closed") {
    return (
      <button
        type="button"
        onClick={() => music.setPlayerPresentation("compact")}
        className="pointer-events-auto fixed left-[320px] top-[94px] z-[47] flex items-center gap-2 border border-white/12 bg-black/72 px-3 py-2 text-[9px] text-white/48 backdrop-blur-xl transition hover:border-white/30 hover:text-white"
        aria-label="打开播放器"
      >
        <Music2 size={12} /> 打开播放器
      </button>
    );
  }

  return (
    <section
      ref={(element) => {
        floating.windowRef.current = element;
      }}
      style={floating.style}
      className={`floating-player-window pointer-events-auto fixed z-[47] border border-white/10 bg-black/82 shadow-2xl backdrop-blur-xl transition-[width] duration-500 ${
        compact
          ? "w-[380px] p-2"
          : "w-[640px] p-4"
      } ${className}`}
      aria-label="Sol 音乐播放器"
      data-player-presentation={music.presentation}
      data-player-dragging={floating.dragging ? "true" : "false"}
      data-player-motion={floating.motion}
    >
      <div
        className={`mb-2 flex touch-none select-none items-start justify-between gap-3 border-b border-white/[0.06] pb-2 ${floating.dragging ? "cursor-grabbing" : "cursor-grab"}`}
        aria-label="拖动播放器窗口"
        title="按住此处拖动播放器"
        {...floating.dragHandleProps}
      >
        <div className="flex min-w-0 items-start gap-2">
          <GripHorizontal className="mt-0.5 shrink-0 text-white/20" size={12} aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-[10px] font-light text-white/76">{track.title}</p>
            <p className="mt-1 truncate text-[8px] text-white/28">{track.artist} · {statusLabels[music.playback.status]}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={music.showVersions} className="player-icon-button" aria-label="其他版本" title="其他版本"><ListMusic size={11} /></button>
          <button type="button" onClick={floating.resetPosition} className="player-icon-button" aria-label="恢复播放器默认位置" title="恢复默认位置"><RotateCcw size={11} /></button>
          <button type="button" onClick={() => music.setPlayerPresentation(compact ? "expanded" : "compact")} className="player-icon-button" aria-label={compact ? "展开播放器" : "收起播放器"} title={compact ? "展开播放器" : "收起播放器"}>
            {compact ? <Maximize2 size={11} /> : <Minimize2 size={11} />}
          </button>
          <button type="button" onClick={() => music.setPlayerPresentation("closed")} className="player-icon-button" aria-label="关闭播放器" title="关闭播放器并暂停"><X size={11} /></button>
        </div>
      </div>

      {floating.collisionNotice && (
        <p className="mb-2 text-[7px] tracking-[0.06em] text-white/22" role="status">
          {floating.collisionNotice}
        </p>
      )}

      <YouTubePlayerPane music={music} />

      {music.playback.autoplayBlocked && (
        <button type="button" onClick={music.play} className="mt-2 w-full border border-white/35 bg-white px-3 py-2 text-[9px] font-medium text-black transition hover:bg-white/85">
          点击开始播放
        </button>
      )}

      {music.playerNotice && <p className="mt-2 text-[9px] leading-relaxed text-amber-100/48" role="status">{music.playerNotice}</p>}

      {music.playback.error && (
        <div className="mt-2 border-l border-white/18 pl-3 text-[9px] leading-relaxed text-white/48" role="alert">
          <p>{music.playback.error}</p>
          <div className="mt-2 flex items-center gap-4">
            <button type="button" onClick={music.showVersions} className="text-white/48 underline decoration-white/20 underline-offset-4 transition hover:text-white">选择其他版本</button>
            <a href={`https://www.youtube.com/watch?v=${encodeURIComponent(track.videoId)}`} target="_blank" rel="noreferrer" className="text-white/30 underline decoration-white/15 underline-offset-4 transition hover:text-white/70">在 YouTube 打开</a>
          </div>
        </div>
      )}

      {!compact && (
        <>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-9 text-right font-mono text-[8px] text-white/28">
              {formatTime(music.playback.currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={Math.max(1, duration)}
              step={0.25}
              value={Math.min(music.playback.currentTime, Math.max(1, duration))}
              onChange={(event) => music.seek(Number(event.target.value))}
              className="h-px min-w-0 flex-1 cursor-pointer accent-white"
              aria-label="歌曲播放进度"
            />
            <span className="w-9 font-mono text-[8px] text-white/28">{formatTime(duration)}</span>
          </div>
        </>
      )}

      <div className={`${compact ? "mt-2" : "mt-3 border-t border-white/8 pt-3"} flex items-center justify-between gap-3`}>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={music.previous}
                disabled={currentIndex <= 0}
                className="flex h-7 w-7 items-center justify-center text-white/45 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                aria-label="上一首"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={playing ? music.pause : music.play}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/28 text-white transition hover:border-white/70"
                aria-label={playing ? "暂停" : "播放"}
              >
                {playing ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
              </button>
              <button
                type="button"
                onClick={music.next}
                disabled={currentIndex < 0 || currentIndex >= lastIndex}
                className="flex h-7 w-7 items-center justify-center text-white/45 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                aria-label="下一首"
              >
                <ChevronRight size={14} />
              </button>
              <button
                type="button"
                onClick={music.stop}
                className="ml-1 flex h-7 w-7 items-center justify-center text-white/30 transition hover:text-white"
                aria-label="停止播放"
              >
                <Square size={9} fill="currentColor" />
              </button>
            </div>

            <label className="flex min-w-[118px] items-center gap-2 text-white/32">
              <Volume2 size={11} />
              <span className="sr-only">音乐音量</span>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={music.playback.volume}
                onChange={(event) => music.setVolume(Number(event.target.value))}
                className="h-px min-w-0 flex-1 cursor-pointer accent-white"
              />
              <span className="w-5 font-mono text-[8px]">{music.playback.volume}</span>
            </label>
      </div>

      {!compact && (
          <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
            <div className="flex items-center gap-1" aria-label="粒子律动强度">
              <span className="mr-1 text-[8px] uppercase tracking-[0.12em] text-white/24">粒子律动</span>
              {(Object.keys(intensityLabels) as MusicRhythmIntensity[]).map((intensity) => (
                <button
                  key={intensity}
                  type="button"
                  onClick={() => music.setRhythmIntensity(intensity)}
                  className={`h-6 min-w-6 px-1 text-[8px] transition ${
                    music.rhythmIntensity === intensity ? "bg-white text-black" : "text-white/30 hover:text-white/70"
                  }`}
                  aria-pressed={music.rhythmIntensity === intensity}
                >
                  {intensityLabels[intensity]}
                </button>
              ))}
            </div>
            {!music.lyricsVisible && (
              <button
                type="button"
                onClick={() => music.setLyricsVisible(true)}
                className="flex items-center gap-2 text-[8px] text-white/35 transition hover:text-white/75"
              >
                <Eye size={11} /> 显示歌词
              </button>
            )}
          </div>
      )}
    </section>
  );
}

export default function MusicExperience({
  music,
  companionMessages,
  voiceActivity,
  stageReplyVisible,
  timelineVisible,
  focusMode,
  motionStageLine = "",
  className = "",
}: {
  music: UseMusicPlayerResult;
  companionMessages: CompanionMessage[];
  voiceActivity: VoiceActivity;
  stageReplyVisible: boolean;
  timelineVisible: boolean;
  focusMode: boolean;
  motionStageLine?: string;
  className?: string;
}) {
  const latestAssistantMessage = useMemo(
    () => [...companionMessages].reverse().find((message) => message.role === "assistant") ?? null,
    [companionMessages],
  );
  const stagePriority = resolveStageContentPriority({
    playbackStatus: music.playback.status,
    lyricDisplayState: music.lyricDisplayState,
    lyricsVisible: music.lyricsVisible,
    hasStageReply: Boolean(motionStageLine || latestAssistantMessage && stageReplyVisible),
  });
  const lyricsPrimary = stagePriority === "lyrics";

  return (
    <div className={`pointer-events-none fixed inset-0 z-[45] ${className}`}>
      <MusicSearchResults music={music} className="pointer-events-auto fixed right-[370px] top-[94px] z-[48] w-[340px]" />
      <MusicDock
        music={music}
        timelineVisible={timelineVisible}
        sideRailsVisible={!focusMode}
      />
      <StageSolReply
        message={latestAssistantMessage}
        visible={!motionStageLine && stageReplyVisible && (stagePriority === "sol_reply" || lyricsPrimary)}
        voiceActivity={voiceActivity}
        lyricsPrimary={lyricsPrimary}
      />
      {motionStageLine && (
        <section
          className={`pointer-events-none fixed left-1/2 z-[46] -translate-x-1/2 text-center ${lyricsPrimary ? "bottom-[190px]" : "bottom-[116px]"}`}
          data-sol-motion-caption="visible"
          aria-live="polite"
        >
          <div className="flex items-center justify-center gap-2 text-[7px] uppercase tracking-[0.2em] text-white/24">
            <span>SOL</span><span className="h-px w-5 bg-white/12" /><span>温柔陪伴</span>
          </div>
          <p className="mt-2 text-[15px] font-light text-white/72 [text-shadow:0_2px_18px_#000]">{motionStageLine}</p>
        </section>
      )}
      <StageLyrics music={music} />
      <LyricCandidateSelector music={music} />
    </div>
  );
}
