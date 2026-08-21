import { clamp01, stableMotionSeed } from "./solMotion";

export const SOL_MUSIC_RITUAL_IDS = [
  "none",
  "gravityBreath",
  "lyricRipple",
  "pauseFreeze",
  "resumeHeartbeat",
  "trackTrailTransition",
  "comfortListening",
] as const;

export const SOL_MUSIC_RITUAL_SOURCES = ["automatic", "explicit", "playback", "lyrics", "emotion"] as const;

export type SolMusicRitualId = (typeof SOL_MUSIC_RITUAL_IDS)[number];
export type SolMusicRitualSource = (typeof SOL_MUSIC_RITUAL_SOURCES)[number];

export type SolMusicRitualState = {
  ritual: SolMusicRitualId;
  source: SolMusicRitualSource;
  trackId: string | null;
  startedAt: number;
  durationMs: number;
  strength: number;
  seed: number;
};

export type SolMusicRitualVisual = {
  phase: number;
  lyricRipple: number;
  pauseFreeze: number;
  resumeHeartbeat: number;
  trackTransition: number;
  comfort: number;
};

const durations: Record<SolMusicRitualId, number> = {
  none: 0,
  gravityBreath: 8_000,
  lyricRipple: 1_250,
  pauseFreeze: 1_600,
  resumeHeartbeat: 1_150,
  trackTrailTransition: 1_850,
  comfortListening: 12_000,
};

export function createSolMusicRitualState(now = 0): SolMusicRitualState {
  return { ritual: "none", source: "playback", trackId: null, startedAt: now, durationMs: 0, strength: 0, seed: 0 };
}

export function startSolMusicRitual(
  ritual: SolMusicRitualId,
  source: SolMusicRitualSource,
  trackId: string | null,
  now: number,
  strength = 0.72,
): SolMusicRitualState {
  return {
    ritual,
    source,
    trackId: trackId?.slice(0, 80) || null,
    startedAt: Math.max(0, Number.isFinite(now) ? now : 0),
    durationMs: durations[ritual],
    strength: clamp01(strength, 0.72),
    seed: stableMotionSeed(`${ritual}:${trackId ?? "none"}:${Math.floor(now / 100)}`),
  };
}

const smooth = (value: number) => {
  const clamped = clamp01(value);
  return clamped * clamped * (3 - 2 * clamped);
};

const windowPulse = (progress: number, start: number, end: number) => {
  if (progress <= start || progress >= end) return 0;
  const local = (progress - start) / Math.max(0.0001, end - start);
  return Math.sin(Math.PI * local);
};

export function sampleSolMusicRitual(
  state: SolMusicRitualState,
  now: number,
  reducedMotion = false,
): SolMusicRitualVisual {
  const empty: SolMusicRitualVisual = {
    phase: 1,
    lyricRipple: 0,
    pauseFreeze: 0,
    resumeHeartbeat: 0,
    trackTransition: 0,
    comfort: 0,
  };
  if (state.ritual === "none" || state.durationMs <= 0) return empty;
  const progress = clamp01((now - state.startedAt) / state.durationMs);
  if (progress >= 1) return empty;
  const scale = state.strength;
  if (state.ritual === "lyricRipple") return { ...empty, phase: progress, lyricRipple: windowPulse(progress, 0, 1) * scale };
  if (state.ritual === "pauseFreeze") return { ...empty, phase: progress, pauseFreeze: smooth(progress) * scale };
  if (state.ritual === "resumeHeartbeat") return { ...empty, phase: progress, resumeHeartbeat: windowPulse(progress, 0, 1) * scale };
  if (state.ritual === "trackTrailTransition") return { ...empty, phase: progress, trackTransition: windowPulse(progress, 0, 1) * (reducedMotion ? scale * 0.12 : scale) };
  if (state.ritual === "comfortListening") return { ...empty, phase: progress, comfort: scale * (1 - smooth(progress) * 0.25) };
  return empty;
}

export function shouldTriggerLyricRipple(
  previousIndex: number,
  nextIndex: number,
  lyricKind: string | null | undefined,
) {
  return lyricKind === "synced" && nextIndex >= 0 && nextIndex !== previousIndex;
}

export function detectsExplicitComfortMusicIntent(rawText: string) {
  const text = rawText.normalize("NFKC").trim();
  return /(?:陪我听完|放|播放|来|想听|找|搜索).{0,12}(?:悲伤|伤感|难过|失恋|安静的歌|低落的歌)/.test(text)
    || /(?:悲伤|伤感|难过|失恋).{0,8}(?:歌|音乐)/.test(text);
}
