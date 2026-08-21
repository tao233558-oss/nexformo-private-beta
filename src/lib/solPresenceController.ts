import type { CompanionMood, CompanionState, VoiceActivity } from "../../shared/companion";
import type { LyricResult, MusicPlaybackStatus } from "../../shared/music";
import type { SolEmotionalState, SolMood } from "../../shared/solEmotion";
import {
  SOL_GESTURE_IDS,
  advanceSolMotionPlan,
  beginCompanionHeart,
  canStartPocketStarlight,
  chooseDeterministicAmbientGesture,
  createPocketStarlightState,
  createSolMotionCue,
  createSolMotionPlan,
  resolveSolMotionCue,
  startPocketStarlight,
  type SolGestureId,
  type SolMotionCue,
  type SolMotionPlan,
  type SolPocketStarlightState,
} from "../../shared/solMotion";
import {
  createSolMusicRitualState,
  startSolMusicRitual,
  type SolMusicRitualId,
  type SolMusicRitualSource,
  type SolMusicRitualState,
} from "../../shared/solMusicRitual";

export const SOL_PRESENCE_MOTIFS = [
  "breathing",
  "gentleSway",
  "shyGather",
  "affectionateBloom",
  "heartPulse",
  "playfulBounce",
  "softOrbit",
  "sparkleBurst",
  "energeticDance",
  "calmFloat",
  "listeningStillness",
  "comfortingEmbrace",
  "sleepyDrift",
] as const;

export const SOL_AUTONOMY_LEVELS = ["off", "low", "medium", "high"] as const;
export const SOL_COMPANION_MODES = ["quiet", "tender", "playful"] as const;

export type SolPresenceMotif = (typeof SOL_PRESENCE_MOTIFS)[number];
export type SolAutonomyLevel = (typeof SOL_AUTONOMY_LEVELS)[number];
export type SolCompanionMode = (typeof SOL_COMPANION_MODES)[number];
export type SolInteraction = "pointer" | "click" | "doubleClick" | "dragStart" | "dragEnd";

export type SolPresencePreferences = {
  autonomy: SolAutonomyLevel;
  companionMode: SolCompanionMode;
  doNotDisturb: boolean;
  motifLocked: boolean;
  comfortEasterEggEnabled: boolean;
};

export type SolPresenceState = {
  valence: number;
  arousal: number;
  affection: number;
  curiosity: number;
  confidence: number;
  playfulness: number;
  calmness: number;
  socialEnergy: number;
  currentMotif: SolPresenceMotif;
  motifStartedAt: number;
  userOverrideUntil: number;
  lastInteractionAt: number;
  motionPlan: SolMotionPlan;
  musicRitual: SolMusicRitualState;
  pocketStarlight: SolPocketStarlightState;
  comfortMusicUntil: number;
};

export type SolPresenceContext = {
  now: number;
  companion: CompanionState;
  musicStatus: MusicPlaybackStatus;
  musicTrackId: string | null;
  musicEnergy: number;
  preferences: SolPresencePreferences;
  emotion?: SolEmotionalState;
  voiceActivity?: VoiceActivity;
  activeLyricIndex?: number;
  lyricKind?: LyricResult["kind"] | null;
};

export type SolPresenceCommand =
  | { action: "presence.nextMotif" }
  | { action: "presence.setAutonomy"; value: SolAutonomyLevel }
  | { action: "presence.setMode"; value: SolCompanionMode }
  | { action: "presence.setDnd"; value: boolean }
  | { action: "presence.setLocked"; value: boolean }
  | { action: "presence.setGesture"; value: SolGestureId }
  | { action: "presence.triggerPocket" }
  | { action: "presence.setPocketEnabled"; value: boolean };

export type SolMotifVisual = {
  pulse: number;
  sway: number;
  gather: number;
  vertical: number;
  orbit: number;
  sparkle: number;
  warmth: number;
  pointerAttraction: number;
};

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : 0));

const approach = (current: number, target: number, amount: number) =>
  current + (target - current) * clamp(amount);

const hash = (value: string) => {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
};

const pick = (items: SolPresenceMotif[], seed: string) => items[hash(seed) % items.length];

const moodMotifs: Record<CompanionMood, SolPresenceMotif[]> = {
  serene: ["breathing", "calmFloat", "gentleSway"],
  curious: ["listeningStillness", "softOrbit", "sparkleBurst"],
  joyful: ["affectionateBloom", "playfulBounce", "sparkleBurst"],
  tender: ["affectionateBloom", "heartPulse", "comfortingEmbrace"],
  melancholy: ["comfortingEmbrace", "gentleSway", "sleepyDrift"],
  tense: ["listeningStillness", "breathing", "shyGather"],
  playful: ["playfulBounce", "sparkleBurst", "affectionateBloom"],
  awe: ["softOrbit", "affectionateBloom", "calmFloat"],
};

const musicMotifs: Record<SolCompanionMode, SolPresenceMotif[]> = {
  quiet: ["gentleSway", "softOrbit", "calmFloat", "breathing"],
  tender: ["affectionateBloom", "heartPulse", "gentleSway", "softOrbit"],
  playful: ["playfulBounce", "energeticDance", "sparkleBurst", "heartPulse"],
};

const emotionalMotifs: Record<SolMood, SolPresenceMotif[]> = {
  calm: ["breathing", "calmFloat", "gentleSway"],
  joyful: ["affectionateBloom", "playfulBounce", "sparkleBurst"],
  shy: ["shyGather", "heartPulse", "gentleSway"],
  curious: ["listeningStillness", "softOrbit", "sparkleBurst"],
  tender: ["comfortingEmbrace", "affectionateBloom", "heartPulse"],
  concerned: ["listeningStillness", "comfortingEmbrace", "breathing"],
  lonely: ["comfortingEmbrace", "gentleSway", "sleepyDrift"],
  tired: ["sleepyDrift", "calmFloat", "breathing"],
};

const motifDurations: Record<SolAutonomyLevel, number> = {
  off: Number.POSITIVE_INFINITY,
  low: 30_000,
  medium: 21_000,
  high: 14_000,
};

export const DEFAULT_SOL_PREFERENCES: SolPresencePreferences = {
  autonomy: "medium",
  companionMode: "tender",
  doNotDisturb: false,
  motifLocked: false,
  comfortEasterEggEnabled: true,
};

export function createSolPresenceState(now = 0): SolPresenceState {
  return {
    valence: 0.18,
    arousal: 0.3,
    affection: 0.3,
    curiosity: 0.68,
    confidence: 0.48,
    playfulness: 0.46,
    calmness: 0.72,
    socialEnergy: 0.52,
    currentMotif: "breathing",
    motifStartedAt: now,
    userOverrideUntil: now,
    lastInteractionAt: now,
    motionPlan: createSolMotionPlan(now),
    musicRitual: createSolMusicRitualState(now),
    pocketStarlight: createPocketStarlightState(now),
    comfortMusicUntil: now,
  };
}

export function parseSolPresenceCommand(rawText: string): SolPresenceCommand | null {
  const text = rawText.normalize("NFKC").trim().replace(/^sol[，,：:\s]*/i, "");
  if (/^(?:换一个|换个|下一个)(?:自主)?(?:律动|动作)$/.test(text)) return { action: "presence.nextMotif" };
  if (/^(?:认真听我说|安静听我说|听我说)$/.test(text)) return { action: "presence.setGesture", value: "listeningStillness" };
  if (/^(?:看着我|靠近一点|好奇一点)$/.test(text)) return { action: "presence.setGesture", value: "listeningStillness" };
  if (/^(?:抱抱我|抱抱|温柔地抱抱我)$/.test(text)) return { action: "presence.setGesture", value: "comfortingEmbrace" };
  if (/^(?:开心一点|开心地动一动)$/.test(text)) return { action: "presence.setGesture", value: "joyfulBloom" };
  if (/^(?:害羞一点|害羞地动一动)$/.test(text)) return { action: "presence.setGesture", value: "shyFold" };
  if (/^(?:轻轻呼吸|慢慢呼吸)$/.test(text)) return { action: "presence.setGesture", value: "idleBreath" };
  if (/^(?:给我一点开心|逗我开心|打开口袋星光|来一次口袋星光)$/.test(text)) return { action: "presence.triggerPocket" };
  if (/^(?:关闭安慰彩蛋|关闭口袋星光)$/.test(text)) return { action: "presence.setPocketEnabled", value: false };
  if (/^(?:开启安慰彩蛋|打开安慰彩蛋|开启口袋星光)$/.test(text)) return { action: "presence.setPocketEnabled", value: true };
  if (/^(?:安静一点|陪我安静听歌|安静陪我听歌)$/.test(text)) return { action: "presence.setMode", value: "quiet" };
  if (/^(?:温柔一点|温柔陪我)$/.test(text)) return { action: "presence.setMode", value: "tender" };
  if (/^(?:活泼一点|再活泼一点|开心地跳舞)$/.test(text)) return { action: "presence.setMode", value: "playful" };
  if (/^(?:不要主动说话|开启勿扰模式|勿扰模式|安静陪着我)$/.test(text)) return { action: "presence.setDnd", value: true };
  if (/^(?:可以主动陪我聊天|关闭勿扰模式|恢复陪伴模式)$/.test(text)) return { action: "presence.setDnd", value: false };
  if (/^(?:锁定这个动作|锁定当前律动|保持这个动作)$/.test(text)) return { action: "presence.setLocked", value: true };
  if (/^(?:恢复自主律动|解除律动锁定|自己跳吧|自己动一动)$/.test(text)) return { action: "presence.setLocked", value: false };
  if (/^(?:关闭自主律动|不要自己动)$/.test(text)) return { action: "presence.setAutonomy", value: "off" };
  if (/^(?:轻微自主律动|自主律动轻一点)$/.test(text)) return { action: "presence.setAutonomy", value: "low" };
  if (/^(?:增强自主律动|自主律动强一点)$/.test(text)) return { action: "presence.setAutonomy", value: "high" };
  return null;
}

const motifToGesture: Record<SolPresenceMotif, SolGestureId> = {
  breathing: "idleBreath",
  gentleSway: "musicSway",
  shyGather: "shyFold",
  affectionateBloom: "joyfulBloom",
  heartPulse: "heartPulse",
  playfulBounce: "playfulLeap",
  softOrbit: "listeningStillness",
  sparkleBurst: "joyfulBloom",
  energeticDance: "musicSway",
  calmFloat: "idleBreath",
  listeningStillness: "listeningStillness",
  comfortingEmbrace: "comfortingEmbrace",
  sleepyDrift: "idleBreath",
};

const gestureToMotif: Record<SolGestureId, SolPresenceMotif> = {
  idleBreath: "breathing",
  listeningStillness: "listeningStillness",
  thinkingGather: "shyGather",
  shyFold: "shyGather",
  joyfulBloom: "affectionateBloom",
  comfortingEmbrace: "comfortingEmbrace",
  playfulLeap: "playfulBounce",
  heartPulse: "heartPulse",
  memoryEcho: "sparkleBurst",
  musicSway: "gentleSway",
};

export function applySolMotionCue(
  state: SolPresenceState,
  cue: SolMotionCue,
  now = cue.createdAt,
): SolPresenceState {
  const motionPlan = resolveSolMotionCue(state.motionPlan, cue, now);
  if (motionPlan === state.motionPlan) return state;
  return {
    ...state,
    motionPlan,
    currentMotif: gestureToMotif[motionPlan.primary.gesture],
    motifStartedAt: now,
    userOverrideUntil: Math.max(state.userOverrideUntil, motionPlan.expiresAt),
  };
}

export function setSolMusicRitual(
  state: SolPresenceState,
  ritual: SolMusicRitualId,
  source: SolMusicRitualSource,
  trackId: string | null,
  now: number,
  strength = 0.72,
) {
  return { ...state, musicRitual: startSolMusicRitual(ritual, source, trackId, now, strength) };
}

export function requestPocketStarlight(
  state: SolPresenceState,
  preferences: SolPresencePreferences,
  now: number,
  reducedMotion = false,
) {
  if (!canStartPocketStarlight(state.pocketStarlight, now, preferences.comfortEasterEggEnabled, preferences.doNotDisturb, false)) {
    return state;
  }
  const pocketStarlight = startPocketStarlight(state.pocketStarlight, now, reducedMotion);
  const cue = createSolMotionCue("heartPulse", "easter_egg", now, 0.82, pocketStarlight.durationMs, pocketStarlight.seed);
  return applySolMotionCue({ ...state, pocketStarlight }, cue, now);
}

export function chooseNextSolMotif(state: SolPresenceState, context: SolPresenceContext) {
  const musicPlaying = context.musicStatus === "playing";
  const pool = musicPlaying
    ? musicMotifs[context.preferences.companionMode]
    : context.emotion
      ? emotionalMotifs[context.emotion.primaryMood]
      : moodMotifs[context.companion.primaryMood];
  const filtered = pool.filter((motif) => motif !== state.currentMotif);
  const candidates = filtered.length ? filtered : pool;
  const timeBucket = Math.floor(context.now / 7_000);
  return pick(candidates, `${context.musicTrackId ?? context.companion.primaryMood}:${timeBucket}`);
}

export function stepSolPresence(
  state: SolPresenceState,
  context: SolPresenceContext,
): SolPresenceState {
  const companion = context.companion;
  const emotion = context.emotion;
  const mode = context.preferences.companionMode;
  const playing = context.musicStatus === "playing";
  const targetPlayfulness = mode === "playful" ? 0.82 : mode === "quiet" ? 0.25 : 0.55;
  const targetCalmness = mode === "quiet" ? 0.9 : mode === "playful" ? 0.42 : 0.72;
  const lockedGesture = motifToGesture[state.currentMotif];
  const planForStep = context.preferences.motifLocked && state.motionPlan.primary.gesture !== lockedGesture
    ? {
        ...state.motionPlan,
        primary: createSolMotionCue(lockedGesture, "manual", context.now, 0.7, 30_000),
        startedAt: context.now,
        expiresAt: context.now + 30_000,
        locked: true,
      }
    : { ...state.motionPlan, locked: context.preferences.motifLocked };
  const advancedPlan = advanceSolMotionPlan(
    planForStep,
    context.now,
  );
  let next = {
    ...state,
    valence: approach(state.valence, emotion?.valence ?? (companion.valence + 1) / 2, 0.12),
    arousal: approach(state.arousal, playing ? Math.max(emotion?.energy ?? companion.arousal, context.musicEnergy) : emotion?.energy ?? companion.arousal, 0.12),
    affection: approach(state.affection, emotion ? (emotion.connection + emotion.trust + emotion.warmth) / 3 : (companion.connection + companion.trust) / 2, 0.08),
    curiosity: approach(state.curiosity, emotion?.curiosity ?? companion.curiosity, 0.1),
    confidence: approach(state.confidence, emotion?.confidence ?? 0.35 + companion.trust * 0.5, 0.08),
    playfulness: approach(state.playfulness, targetPlayfulness, 0.08),
    calmness: approach(state.calmness, targetCalmness, 0.08),
    socialEnergy: approach(state.socialEnergy, emotion?.energy ?? companion.energy, 0.1),
    motionPlan: advancedPlan,
    currentMotif: gestureToMotif[advancedPlan.primary.gesture],
  };

  const voiceGesture = context.voiceActivity === "listening"
    ? "listeningStillness"
    : context.voiceActivity === "thinking" || context.voiceActivity === "connecting"
      ? "thinkingGather"
      : context.voiceActivity === "speaking" || context.voiceActivity === "singing"
        ? "joyfulBloom"
        : null;
  if (voiceGesture) {
    next = applySolMotionCue(
      next,
      createSolMotionCue(voiceGesture, "voice", context.now, 0.62, 2_400),
      context.now,
    );
  }

  const canSwitch =
    context.preferences.autonomy !== "off" &&
    !context.preferences.motifLocked &&
    context.now >= state.userOverrideUntil &&
    context.now - state.motifStartedAt >= motifDurations[context.preferences.autonomy];
  if (!canSwitch) return next;
  const nextMotif = chooseNextSolMotif(next, context);
  const ambientGesture = motifToGesture[nextMotif];
  const motionPlan = {
    ...next.motionPlan,
    ambientGesture,
  };
  return applySolMotionCue(
    { ...next, motionPlan, currentMotif: nextMotif, motifStartedAt: context.now },
    createSolMotionCue(ambientGesture, "ambient", context.now, 0.46, motifDurations[context.preferences.autonomy]),
    context.now,
  );
}

export function applySolInteraction(
  state: SolPresenceState,
  interaction: SolInteraction,
  now: number,
): SolPresenceState {
  const motif: SolPresenceMotif =
    interaction === "doubleClick"
      ? "heartPulse"
      : interaction === "dragStart"
        ? "softOrbit"
        : interaction === "dragEnd"
          ? "calmFloat"
          : interaction === "pointer"
            ? "listeningStillness"
            : interaction === "click"
              ? state.affection > 0.52
                ? "shyGather"
                : "sparkleBurst"
              : state.currentMotif;
  const base = {
    ...state,
    affection: clamp(state.affection + (interaction === "doubleClick" ? 0.05 : 0.012)),
    curiosity: clamp(state.curiosity + 0.016),
    currentMotif: motif,
    motifStartedAt: motif === state.currentMotif ? state.motifStartedAt : now,
    userOverrideUntil: now + (interaction === "pointer" ? 6_000 : 8_000),
    lastInteractionAt: now,
  };
  const gesture: SolGestureId = interaction === "doubleClick"
    ? "heartPulse"
    : interaction === "dragStart"
      ? "listeningStillness"
      : interaction === "dragEnd"
        ? "idleBreath"
        : interaction === "pointer"
          ? "listeningStillness"
          : state.affection > 0.52
            ? "shyFold"
            : "joyfulBloom";
  const next = applySolMotionCue(
    base,
    createSolMotionCue(gesture, "interaction", now, interaction === "doubleClick" ? 0.82 : 0.58, interaction === "pointer" ? 3_200 : 6_000),
    now,
  );
  return { ...next, currentMotif: motif };
}

export function applySolConversationCue(
  state: SolPresenceState,
  rawText: string,
  now: number,
): SolPresenceState {
  const text = rawText.normalize("NFKC").toLowerCase();
  const tender = /(?:喜欢你|爱你|可爱|谢谢|陪我|抱抱|温柔)/.test(text);
  const vulnerable = /(?:难过|伤心|孤独|焦虑|害怕|累了|不开心)/.test(text);
  const playful = /(?:开心|好玩|跳舞|活泼|哈哈|兴奋)/.test(text);
  const heart = /(?:爱心|心形)/.test(text);
  const motif: SolPresenceMotif = heart
    ? "heartPulse"
    : vulnerable
      ? "comfortingEmbrace"
      : tender
        ? "affectionateBloom"
        : playful
          ? "playfulBounce"
          : "listeningStillness";
  const base = {
    ...state,
    affection: clamp(state.affection + (tender || vulnerable ? 0.035 : 0.008)),
    curiosity: clamp(state.curiosity + 0.012),
    playfulness: clamp(state.playfulness + (playful ? 0.04 : 0)),
    currentMotif: motif,
    motifStartedAt: now,
    userOverrideUntil: now + (heart || vulnerable ? 14_000 : 9_000),
    lastInteractionAt: now,
  };
  const gesture: SolGestureId = heart
    ? "heartPulse"
    : vulnerable
      ? "comfortingEmbrace"
      : tender
        ? "shyFold"
        : playful
          ? "joyfulBloom"
          : /[?？]|(?:为什么|怎么|什么|可以吗|能不能)/.test(text)
            ? "listeningStillness"
            : "listeningStillness";
  const withPocket = vulnerable
    ? { ...base, pocketStarlight: beginCompanionHeart(state.pocketStarlight, now) }
    : base;
  return applySolMotionCue(
    withPocket,
    createSolMotionCue(gesture, "conversation", now, vulnerable ? 0.78 : 0.6, vulnerable ? 18_000 : 9_000),
    now,
  );
}

export function forceNextSolMotif(state: SolPresenceState, context: SolPresenceContext) {
  const nextMotif = chooseNextSolMotif(state, { ...context, now: context.now + 7_000 });
  const base = {
    ...state,
    currentMotif: nextMotif,
    motifStartedAt: context.now,
    userOverrideUntil: context.now + 12_000,
    lastInteractionAt: context.now,
  };
  return applySolMotionCue(
    base,
    createSolMotionCue(motifToGesture[nextMotif], "manual", context.now, 0.68, 12_000),
    context.now,
  );
}

export function applySuggestedSolGesture(
  state: SolPresenceState,
  suggestion: unknown,
  now: number,
) {
  if (!suggestion || typeof suggestion !== "object") return state;
  const record = suggestion as Record<string, unknown>;
  if (!SOL_GESTURE_IDS.includes(record.gesture as SolGestureId)) return state;
  const strength = typeof record.strength === "number" ? record.strength : 0.55;
  const durationMs = typeof record.durationMs === "number" ? record.durationMs : 6_000;
  return applySolMotionCue(
    state,
    createSolMotionCue(record.gesture as SolGestureId, "conversation", now, strength, durationMs),
    now,
  );
}

export function markComfortMusicIntent(state: SolPresenceState, now: number) {
  return { ...state, comfortMusicUntil: now + 12 * 60_000 };
}

export function chooseAmbientGestureForPresence(state: SolPresenceState, now: number) {
  return chooseDeterministicAmbientGesture(
    `${state.currentMotif}:${Math.floor(now / 20_000)}`,
    ["idleBreath", "listeningStillness", "shyFold", "joyfulBloom"],
  );
}

const motifVisuals: Record<SolPresenceMotif, SolMotifVisual> = {
  breathing: { pulse: 0.24, sway: 0.08, gather: 0, vertical: 0.05, orbit: 0.04, sparkle: 0.05, warmth: 0.08, pointerAttraction: 0.2 },
  gentleSway: { pulse: 0.16, sway: 0.36, gather: 0, vertical: 0.12, orbit: 0.12, sparkle: 0.04, warmth: 0.16, pointerAttraction: 0.22 },
  shyGather: { pulse: 0.32, sway: 0.08, gather: 0.28, vertical: 0.02, orbit: 0.02, sparkle: 0.12, warmth: 0.5, pointerAttraction: 0.18 },
  affectionateBloom: { pulse: 0.42, sway: 0.16, gather: -0.12, vertical: 0.08, orbit: 0.1, sparkle: 0.3, warmth: 0.68, pointerAttraction: 0.32 },
  heartPulse: { pulse: 0.72, sway: 0.06, gather: 0.04, vertical: 0.04, orbit: 0.04, sparkle: 0.34, warmth: 0.86, pointerAttraction: 0.25 },
  playfulBounce: { pulse: 0.5, sway: 0.34, gather: -0.06, vertical: 0.42, orbit: 0.16, sparkle: 0.34, warmth: 0.45, pointerAttraction: 0.48 },
  softOrbit: { pulse: 0.2, sway: 0.16, gather: 0, vertical: 0.06, orbit: 0.52, sparkle: 0.16, warmth: 0.18, pointerAttraction: 0.24 },
  sparkleBurst: { pulse: 0.34, sway: 0.18, gather: -0.08, vertical: 0.12, orbit: 0.12, sparkle: 0.8, warmth: 0.36, pointerAttraction: 0.4 },
  energeticDance: { pulse: 0.72, sway: 0.64, gather: -0.1, vertical: 0.46, orbit: 0.42, sparkle: 0.52, warmth: 0.48, pointerAttraction: 0.36 },
  calmFloat: { pulse: 0.12, sway: 0.18, gather: 0, vertical: 0.2, orbit: 0.08, sparkle: 0.06, warmth: 0.1, pointerAttraction: 0.18 },
  listeningStillness: { pulse: 0.1, sway: 0.03, gather: 0.12, vertical: 0, orbit: 0, sparkle: 0.02, warmth: 0.2, pointerAttraction: 0.38 },
  comfortingEmbrace: { pulse: 0.28, sway: 0.12, gather: 0.18, vertical: 0.04, orbit: 0.06, sparkle: 0.1, warmth: 0.76, pointerAttraction: 0.2 },
  sleepyDrift: { pulse: 0.08, sway: 0.18, gather: 0.04, vertical: 0.1, orbit: 0.03, sparkle: 0.02, warmth: 0.12, pointerAttraction: 0.1 },
};

export function getSolMotifVisual(
  motif: SolPresenceMotif,
  autonomy: SolAutonomyLevel,
  reducedMotion = false,
): SolMotifVisual {
  const intensity = { off: 0, low: 0.38, medium: 0.72, high: 1 }[autonomy];
  const scale = intensity * (reducedMotion ? 0.16 : 1);
  const visual = motifVisuals[motif];
  return Object.fromEntries(
    Object.entries(visual).map(([key, value]) => [
      key,
      key === "gather" ? clamp(value * scale, -1, 1) : clamp(value * scale),
    ]),
  ) as SolMotifVisual;
}

export function shouldAllowProactiveMessage(input: {
  now: number;
  lastConversationAt: number;
  cooldownMs: number;
  doNotDisturb: boolean;
  musicStatus: MusicPlaybackStatus;
  overlayOpen: boolean;
  busy: boolean;
}) {
  return (
    !input.doNotDisturb &&
    input.musicStatus !== "playing" &&
    !input.overlayOpen &&
    !input.busy &&
    input.now - input.lastConversationAt >= input.cooldownMs
  );
}
