export const MUSIC_PLAYBACK_STATUSES = [
  "idle",
  "loading",
  "playing",
  "paused",
  "ended",
  "error",
] as const;

export const MUSIC_RHYTHM_INTENSITIES = ["off", "low", "medium", "high"] as const;
export const MUSIC_PLAYER_PRESENTATIONS = ["expanded", "compact", "closed"] as const;
export const MUSIC_VERSION_TYPES = [
  "studio",
  "official_audio",
  "music_video",
  "lyric_video",
  "live",
  "cover",
  "remix",
  "acoustic",
  "sped_up",
  "slowed",
  "instrumental",
  "unknown",
] as const;
export const LYRIC_DISPLAY_STATES = [
  "loading",
  "waiting_for_playback",
  "instrumental_intro",
  "active",
  "paused",
  "unavailable",
  "playback_error",
  "needs_selection",
] as const;

export type MusicPlaybackStatus = (typeof MUSIC_PLAYBACK_STATUSES)[number];
export type MusicRhythmIntensity = (typeof MUSIC_RHYTHM_INTENSITIES)[number];
export type MusicPlayerPresentation = (typeof MUSIC_PLAYER_PRESENTATIONS)[number];
export type MusicVersionType = (typeof MUSIC_VERSION_TYPES)[number];
export type LyricDisplayState = (typeof LYRIC_DISPLAY_STATES)[number];
export type LyricConfidenceLabel = "高" | "中" | "低";

export type MusicProviderStatus = {
  provider: "youtube";
  ready: boolean;
  label: string;
  code?: "MUSIC_NOT_CONFIGURED";
};

export type MusicSearchResult = {
  videoId: string;
  title: string;
  artist: string;
  thumbnail: string;
  durationSeconds: number | null;
  provider: "youtube";
  trackHint?: string;
  artistHint?: string;
  version: MusicVersionType;
};

export type MusicTrack = MusicSearchResult;

export type MusicQueue = {
  tracks: MusicTrack[];
  currentIndex: number;
};

export type LyricLine = {
  timeSeconds: number;
  text: string;
};

export type LyricCandidateSummary = {
  lyricId: string;
  trackName: string;
  artistName: string;
  durationSeconds: number | null;
  kind: "synced" | "plain" | "instrumental" | "none";
  matchedVersion: MusicVersionType;
  confidence: number;
  confidenceLabel: LyricConfidenceLabel;
  durationDifference: number | null;
  recommended: boolean;
};

export type LyricResult = {
  provider: "lrclib";
  kind: "synced" | "plain" | "instrumental" | "none";
  trackName: string;
  artistName: string;
  durationSeconds: number | null;
  lines: LyricLine[];
  plainLyrics: string;
  lyricId: string;
  source: "lrclib";
  confidence: number;
  confidenceLabel: LyricConfidenceLabel;
  matchedVersion: MusicVersionType;
  requestedVersion: MusicVersionType;
  durationDifference: number | null;
  requiresSelection: boolean;
  candidates: LyricCandidateSummary[];
  appliedOffsetSeconds: number;
  notice?: string;
};

export type MusicPlaybackState = {
  status: MusicPlaybackStatus;
  queue: MusicQueue;
  currentTrack: MusicTrack | null;
  currentTime: number;
  duration: number;
  volume: number;
  error: string;
  autoplayBlocked: boolean;
};

export type MusicCommand =
  | { action: "music.search"; query: string; autoplay: boolean }
  | { action: "music.select"; index: number }
  | { action: "music.play" }
  | { action: "music.pause" }
  | { action: "music.stop" }
  | { action: "music.next" }
  | { action: "music.previous" }
  | { action: "music.setVolume"; volume?: number; delta?: number }
  | { action: "player.setPresentation"; presentation: MusicPlayerPresentation }
  | { action: "lyrics.show" }
  | { action: "lyrics.hide" }
  | { action: "lyrics.setOffset"; deltaSeconds: number };

export type MusicPlaybackAction =
  | { type: "queue"; tracks: MusicTrack[] }
  | { type: "select"; index: number }
  | { type: "status"; status: MusicPlaybackStatus; error?: string }
  | { type: "progress"; currentTime: number; duration?: number }
  | { type: "volume"; volume: number }
  | { type: "autoplay-blocked"; blocked: boolean }
  | { type: "stop" };

export const DEFAULT_MUSIC_PLAYBACK_STATE: MusicPlaybackState = {
  status: "idle",
  queue: { tracks: [], currentIndex: -1 },
  currentTrack: null,
  currentTime: 0,
  duration: 0,
  volume: 70,
  error: "",
  autoplayBlocked: false,
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const decodeHtmlEntities = (value: string) =>
  value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

export function normalizeMusicQuery(value: string) {
  return decodeHtmlEntities(value)
    .normalize("NFKC")
    .replace(/[“”‘’「」『』《》]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

export const MUSIC_VERSION_LABELS: Record<MusicVersionType, string> = {
  studio: "录音室版",
  official_audio: "官方音频",
  music_video: "音乐视频",
  lyric_video: "歌词视频",
  live: "现场版",
  cover: "翻唱版",
  remix: "混音版",
  acoustic: "不插电版",
  sped_up: "加速版",
  slowed: "慢速版",
  instrumental: "纯音乐",
  unknown: "版本未标注",
};

export function classifyMusicVersion(title: string, channelOrArtist = ""): MusicVersionType {
  const value = `${normalizeMusicQuery(title)} ${normalizeMusicQuery(channelOrArtist)}`.toLocaleLowerCase();
  if (/(?:sped\s*up|speed\s*up|nightcore|加速版|加速|倍速)/i.test(value)) return "sped_up";
  if (/(?:slowed|slow(?:ed)?\s*(?:down)?|慢速版|降速|慢放)/i.test(value)) return "slowed";
  if (/(?:instrumental|伴奏|纯音乐|无人声)/i.test(value)) return "instrumental";
  if (/(?:\blive\b|concert|现场版|演唱会|音乐节|live版)/i.test(value)) return "live";
  if (/(?:\bcover\b|翻唱|翻奏|致敬版)/i.test(value)) return "cover";
  if (/(?:\bremix\b|mix版|混音|重混)/i.test(value)) return "remix";
  if (/(?:acoustic|unplugged|不插电|木吉他版)/i.test(value)) return "acoustic";
  if (/(?:lyrics?\s*(?:video)?|歌词版|动态歌词|中字)/i.test(value)) return "lyric_video";
  if (/(?:official\s*audio|audio\s*only|官方音频|官方版音频|主题频道|\s-\s*topic\b)/i.test(value)) return "official_audio";
  if (/(?:official\s*(?:music\s*)?video|\bofficial\s*mv\b|\bmv\b|官方\s*mv|音乐视频)/i.test(value)) return "music_video";
  if (/(?:album\s*version|studio\s*version|录音室版|专辑版)/i.test(value)) return "studio";
  return /\btopic\b/i.test(value) ? "studio" : "unknown";
}

export function normalizeYouTubeTitle(value: string) {
  const normalized = normalizeMusicQuery(value)
    .replace(
      /[\[【(（][^\]】)）]*(?:official|music\s*video|mv|lyrics?|audio|visuali[sz]er|完整版|官方|中字|歌词|音频|现场)[^\]】)）]*[\]】)）]/gi,
      " ",
    )
    .replace(
      /(?:\s*[-–—|·]\s*)?(?:official\s*(?:music\s*)?video|official\s*audio|lyrics?\s*video|mv|完整版|官方(?:版|视频)?|歌词版|纯享版)\s*$/gi,
      " ",
    )
    .replace(/\s+/g, " ")
    .replace(/^[-–—|·\s]+|[-–—|·\s]+$/g, "")
    .trim();
  return normalized || normalizeMusicQuery(value);
}

export function parseIso8601Duration(value: string) {
  const match = value.trim().match(
    /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i,
  );
  if (!match) return null;
  const days = Number(match[1] || 0);
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);
  const seconds = Number(match[4] || 0);
  const total = days * 86_400 + hours * 3_600 + minutes * 60 + seconds;
  return Number.isFinite(total) ? Math.round(total) : null;
}

export function parseLrc(value: string): LyricLine[] {
  if (!value.trim()) return [];
  const offsetMatch = value.match(/\[offset:\s*(-?\d+)\s*]/i);
  const offsetSeconds = offsetMatch ? Number(offsetMatch[1]) / 1_000 : 0;
  const parsed: LyricLine[] = [];

  for (const rawLine of value.split(/\r?\n/)) {
    const timestamps = [...rawLine.matchAll(/\[(\d{1,3}):(\d{1,2}(?:[.:]\d{1,3})?)\]/g)];
    if (!timestamps.length) continue;
    const text = rawLine.replace(/\[[^\]]+\]/g, "").trim();
    if (!text) continue;
    for (const timestamp of timestamps) {
      const minutes = Number(timestamp[1]);
      const seconds = Number(timestamp[2].replace(":", "."));
      const timeSeconds = Math.max(0, minutes * 60 + seconds + offsetSeconds);
      if (Number.isFinite(timeSeconds)) parsed.push({ timeSeconds, text });
    }
  }

  const seen = new Set<string>();
  return parsed
    .sort((left, right) => left.timeSeconds - right.timeSeconds)
    .filter((line) => {
      const key = `${line.timeSeconds.toFixed(3)}\u0000${line.text}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export function findActiveLyricIndex(
  lines: LyricLine[],
  currentTime: number,
  offsetSeconds = 0,
) {
  if (!lines.length) return -1;
  const target = Math.max(0, currentTime + offsetSeconds);
  let low = 0;
  let high = lines.length - 1;
  let answer = -1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (lines[middle].timeSeconds <= target) {
      answer = middle;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }
  return answer;
}

export function clampLyricsOffset(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(clamp(value, -90, 90) * 10) / 10;
}

export function calculateLyricAlignmentOffset(
  lyricTimeSeconds: number,
  playbackCurrentTime: number,
) {
  return clampLyricsOffset(lyricTimeSeconds - playbackCurrentTime);
}

const safeStoragePart = (value: string) =>
  value.normalize("NFKC").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 80) || "unknown";

export function createLyricBindingKey(videoId: string, lyricId: string) {
  return `nexformo.lyrics.offset.v2:${safeStoragePart(videoId)}:${safeStoragePart(lyricId)}`;
}

export function createLyricSelectionKey(videoId: string) {
  return `nexformo.lyrics.selection.v2:${safeStoragePart(videoId)}`;
}

export function resolveLyricDisplayState(input: {
  loading: boolean;
  hasError: boolean;
  playbackStatus: MusicPlaybackStatus;
  lyricKind: LyricResult["kind"] | null;
  requiresSelection: boolean;
  activeLyricIndex: number;
}): LyricDisplayState {
  if (input.loading) return "loading";
  if (input.playbackStatus === "error") return "playback_error";
  if (input.requiresSelection) return "needs_selection";
  if (input.hasError || !input.lyricKind || input.lyricKind === "none") return "unavailable";
  if (input.lyricKind === "instrumental") return "unavailable";
  if (input.playbackStatus === "idle" || input.playbackStatus === "loading") {
    return "waiting_for_playback";
  }
  if (input.playbackStatus === "paused" || input.playbackStatus === "ended") return "paused";
  if (input.lyricKind === "synced" && input.activeLyricIndex < 0) {
    return "instrumental_intro";
  }
  return "active";
}

const chineseDigits: Record<string, number> = {
  零: 0,
  〇: 0,
  一: 1,
  二: 2,
  两: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
};

function parseChineseNumber(value: string): number {
  if (/^\d+$/.test(value)) return Number(value);
  if (value === "十") return 10;
  if (value === "百") return 100;
  if (value.includes("百")) {
    const [hundreds, rest = ""] = value.split("百");
    return (chineseDigits[hundreds] ?? 1) * 100 + (parseChineseNumber(rest) || 0);
  }
  if (value.includes("十")) {
    const [tens, units = ""] = value.split("十");
    return (chineseDigits[tens] ?? 1) * 10 + (chineseDigits[units] ?? 0);
  }
  return [...value].reduce((total, character) => total * 10 + (chineseDigits[character] ?? 0), 0);
}

const ordinalMap: Record<string, number> = {
  一: 0,
  二: 1,
  两: 1,
  三: 2,
  四: 3,
  五: 4,
  "1": 0,
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
};

export function parseMusicCommand(rawValue: string): MusicCommand | null {
  const value = normalizeMusicQuery(rawValue)
    .replace(/^sol[，,：:\s]*/i, "")
    .replace(/^(?:请|麻烦你|可以帮我|能不能帮我)\s*/, "")
    .trim();
  if (!value) return null;

  if (/^(?:收起|缩小)(?:音乐)?播放器$/.test(value)) {
    return { action: "player.setPresentation", presentation: "compact" };
  }
  if (/^(?:展开|打开|显示)(?:音乐)?播放器$/.test(value)) {
    return { action: "player.setPresentation", presentation: "expanded" };
  }
  if (/^(?:关闭|隐藏)(?:音乐)?播放器$/.test(value)) {
    return { action: "player.setPresentation", presentation: "closed" };
  }

  if (/^(?:停止播放|停止音乐|关掉音乐|关闭音乐|停下|停止)$/.test(value)) {
    return { action: "music.stop" };
  }
  if (/^(?:暂停|暂停播放|暂停音乐)$/.test(value)) return { action: "music.pause" };
  if (/^(?:继续|继续播放|恢复播放|播放)$/.test(value)) return { action: "music.play" };
  if (/^(?:下一首|播放下一首|换下一首)$/.test(value)) return { action: "music.next" };
  if (/^(?:上一首|播放上一首|回到上一首)$/.test(value)) return { action: "music.previous" };

  const selection = value.match(/^(?:播放|选择|选|放)(?:搜索结果)?第?([一二两三四五1-5])首?$/);
  if (selection) return { action: "music.select", index: ordinalMap[selection[1]] };

  if (/^(?:显示|打开|展开)(?:同步)?歌词$/.test(value)) return { action: "lyrics.show" };
  if (/^(?:隐藏|关闭|收起)(?:同步)?歌词$/.test(value)) return { action: "lyrics.hide" };
  if (/^歌词(?:再)?快一点$/.test(value)) {
    return { action: "lyrics.setOffset", deltaSeconds: 0.5 };
  }
  if (/^歌词(?:再)?慢一点$/.test(value)) {
    return { action: "lyrics.setOffset", deltaSeconds: -0.5 };
  }

  const volume = value.match(/^(?:把)?(?:声音|音量)(?:调到|设置为|设为)?(?:百分之)?([零〇一二两三四五六七八九十百\d]+)%?$/);
  if (volume) {
    return { action: "music.setVolume", volume: clamp(parseChineseNumber(volume[1]), 0, 100) };
  }
  if (/^(?:声音|音量)(?:再)?(?:大|高)一点$/.test(value)) {
    return { action: "music.setVolume", delta: 10 };
  }
  if (/^(?:声音|音量)(?:再)?(?:小|低)一点$/.test(value)) {
    return { action: "music.setVolume", delta: -10 };
  }

  const searchOnlyPrefix = /^(?:帮我|给我)?(?:搜索|搜一下|搜|找一下|找找|查找|找)\s*/;
  const searchPrefix = /^(?:帮我|给我)?(?:搜索|搜一下|搜|找一下|找找|查找|找一首|找首|找|播放一下|播放|放一下|放一首|来一首|来点|我想听|想听)\s*/;
  const hasSearchPrefix = searchPrefix.test(value);
  const musicRequest = /(?:歌|歌曲|音乐|纯音乐|单曲|版|演唱|听)/.test(value);
  if (hasSearchPrefix || musicRequest && /(?:找|搜|播放|放|来|想听)/.test(value)) {
    const explicitlyRequestsPlayback = /(?:并播放|然后播放|直接播放|放给我听|我要听)/.test(value);
    const searchOnly = searchOnlyPrefix.test(value) && !explicitlyRequestsPlayback;
    const query = normalizeMusicQuery(value.replace(searchPrefix, ""))
      .replace(/^(?:歌曲|音乐)[:：]?\s*/, "")
      .replace(/(?:并播放|然后播放|直接播放|放给我听)$/g, "")
      .trim();
    if (query) return { action: "music.search", query, autoplay: !searchOnly };
  }

  return null;
}

export function nextMusicPlayerPresentation(
  current: MusicPlayerPresentation,
  requested: MusicPlayerPresentation,
  hasTrack: boolean,
) {
  if (requested === "closed") return "closed";
  if (!hasTrack && current === "closed") return "closed";
  return requested;
}

export function inferMusicHints(query: string) {
  const value = normalizeMusicQuery(query).replace(/["']/g, "").trim();
  const possessive = value.match(/^(.{1,60}?)(?:的|\s+-\s+)(.{1,100})$/);
  if (!possessive) return { trackHint: "", artistHint: "" };
  return {
    artistHint: possessive[1].trim(),
    trackHint: possessive[2].trim(),
  };
}

const normalizeForMatch = (value: string) =>
  normalizeYouTubeTitle(value)
    .toLocaleLowerCase()
    .replace(/[\s\p{P}\p{S}]+/gu, "");

export type LyricsMatchCandidate = {
  id?: unknown;
  trackName?: unknown;
  artistName?: unknown;
  albumName?: unknown;
  duration?: unknown;
  syncedLyrics?: unknown;
  plainLyrics?: unknown;
  instrumental?: unknown;
};

export type LyricsMatchDetails = {
  score: number;
  confidence: number;
  confidenceLabel: LyricConfidenceLabel;
  rejected: boolean;
  durationDifference: number | null;
  matchedVersion: MusicVersionType;
};

const STRICT_MUSIC_VERSIONS = new Set<MusicVersionType>([
  "live",
  "cover",
  "remix",
  "acoustic",
  "sped_up",
  "slowed",
  "instrumental",
]);

const confidenceLabel = (confidence: number): LyricConfidenceLabel =>
  confidence >= 0.78 ? "高" : confidence >= 0.58 ? "中" : "低";

export function scoreLyricsMatchDetailed(
  candidate: LyricsMatchCandidate,
  expected: {
    track: string;
    artist?: string;
    durationSeconds?: number | null;
    requestedVersion?: MusicVersionType;
  },
): LyricsMatchDetails {
  const track = typeof candidate.trackName === "string" ? candidate.trackName : "";
  const artist = typeof candidate.artistName === "string" ? candidate.artistName : "";
  const album = typeof candidate.albumName === "string" ? candidate.albumName : "";
  const wantedTrack = normalizeForMatch(expected.track);
  const wantedArtist = normalizeForMatch(expected.artist || "");
  const candidateTrack = normalizeForMatch(track);
  const candidateArtist = normalizeForMatch(artist);
  const requestedVersion = expected.requestedVersion ?? "unknown";
  const matchedVersion = classifyMusicVersion(`${track} ${album}`, artist);
  if (!candidateTrack || !wantedTrack) {
    return {
      score: -100,
      confidence: 0,
      confidenceLabel: "低",
      rejected: true,
      durationDifference: null,
      matchedVersion,
    };
  }

  const exactTrack = candidateTrack === wantedTrack;
  const partialTrack =
    !exactTrack && (candidateTrack.includes(wantedTrack) || wantedTrack.includes(candidateTrack));
  let score = exactTrack ? 56 : partialTrack ? 34 : -45;
  let rejected = !exactTrack && !partialTrack;

  if (wantedArtist && candidateArtist) {
    if (candidateArtist === wantedArtist) score += 23;
    else if (candidateArtist.includes(wantedArtist) || wantedArtist.includes(candidateArtist)) score += 13;
    else {
      score -= 34;
      rejected = true;
    }
  }

  const duration = typeof candidate.duration === "number" ? candidate.duration : Number(candidate.duration);
  const durationDifference =
    expected.durationSeconds && Number.isFinite(duration)
      ? Math.abs(duration - expected.durationSeconds)
      : null;
  if (durationDifference !== null) {
    if (durationDifference <= 2) score += 22;
    else if (durationDifference <= 8) score += 14;
    else if (durationDifference <= 15) score += 5;
    else if (durationDifference <= 30) score -= 10;
    else {
      score -= 36;
      if (durationDifference > 45) rejected = true;
    }
  }

  const requestedStrict = STRICT_MUSIC_VERSIONS.has(requestedVersion);
  const matchedStrict = STRICT_MUSIC_VERSIONS.has(matchedVersion);
  if (requestedStrict && matchedVersion !== requestedVersion) {
    score -= 70;
    rejected = true;
  } else if (matchedStrict && matchedVersion !== requestedVersion) {
    score -= 70;
    rejected = true;
  } else if (requestedVersion === matchedVersion && requestedVersion !== "unknown") {
    score += 8;
  } else if (
    ["studio", "official_audio", "music_video", "lyric_video", "unknown"].includes(requestedVersion) &&
    ["studio", "official_audio", "music_video", "lyric_video", "unknown"].includes(matchedVersion)
  ) {
    score += 3;
  }

  if (typeof candidate.syncedLyrics === "string" && candidate.syncedLyrics.trim()) score += 8;
  else if (typeof candidate.plainLyrics === "string" && candidate.plainLyrics.trim()) score += 3;
  if (candidate.instrumental === true && requestedVersion !== "instrumental") {
    score -= 40;
    rejected = true;
  }
  if (candidate.id !== undefined && candidate.id !== null) score += 2;

  const confidence = rejected ? 0 : clamp(score / 120, 0, 1);
  return {
    score,
    confidence,
    confidenceLabel: confidenceLabel(confidence),
    rejected,
    durationDifference,
    matchedVersion,
  };
}

export function scoreLyricsMatch(
  candidate: LyricsMatchCandidate,
  expected: {
    track: string;
    artist?: string;
    durationSeconds?: number | null;
    requestedVersion?: MusicVersionType;
  },
) {
  return scoreLyricsMatchDetailed(candidate, expected).score;
}

export function musicPlaybackReducer(
  state: MusicPlaybackState,
  action: MusicPlaybackAction,
): MusicPlaybackState {
  if (action.type === "queue") {
    return {
      ...state,
      queue: { tracks: action.tracks.slice(0, 5), currentIndex: -1 },
      currentTrack: null,
      currentTime: 0,
      duration: 0,
      status: "idle",
      error: "",
      autoplayBlocked: false,
    };
  }
  if (action.type === "select") {
    const index = clamp(Math.floor(action.index), 0, Math.max(0, state.queue.tracks.length - 1));
    const currentTrack = state.queue.tracks[index] ?? null;
    return {
      ...state,
      queue: { ...state.queue, currentIndex: currentTrack ? index : -1 },
      currentTrack,
      currentTime: 0,
      duration: currentTrack?.durationSeconds ?? 0,
      status: currentTrack ? "loading" : "idle",
      error: "",
      autoplayBlocked: false,
    };
  }
  if (action.type === "status") {
    return {
      ...state,
      status: action.status,
      error: action.error ?? (action.status === "error" ? state.error : ""),
      autoplayBlocked: action.status === "playing" ? false : state.autoplayBlocked,
    };
  }
  if (action.type === "progress") {
    return {
      ...state,
      currentTime: Math.max(0, action.currentTime),
      duration: Math.max(0, action.duration ?? state.duration),
    };
  }
  if (action.type === "volume") return { ...state, volume: clamp(action.volume, 0, 100) };
  if (action.type === "autoplay-blocked") return { ...state, autoplayBlocked: action.blocked };
  return {
    ...DEFAULT_MUSIC_PLAYBACK_STATE,
    volume: state.volume,
    queue: { tracks: state.queue.tracks, currentIndex: -1 },
  };
}
