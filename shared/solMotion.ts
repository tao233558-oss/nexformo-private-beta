export const SOL_GESTURE_IDS = [
  "idleBreath",
  "listeningStillness",
  "thinkingGather",
  "shyFold",
  "joyfulBloom",
  "comfortingEmbrace",
  "playfulLeap",
  "heartPulse",
  "memoryEcho",
  "musicSway",
] as const;

export const SOL_MOTION_SOURCES = [
  "ambient",
  "manual",
  "interaction",
  "voice",
  "conversation",
  "memory",
  "music",
  "easter_egg",
] as const;

export type SolGestureId = (typeof SOL_GESTURE_IDS)[number];
export type SolMotionSource = (typeof SOL_MOTION_SOURCES)[number];

export type SolMotionCue = {
  version: 1;
  gesture: SolGestureId;
  source: SolMotionSource;
  strength: number;
  durationMs: number;
  createdAt: number;
  seed: number;
};

export type SolMotionPlan = {
  primary: SolMotionCue;
  ambientGesture: SolGestureId;
  startedAt: number;
  expiresAt: number;
  locked: boolean;
};

export type SolMotionVisual = {
  breath: number;
  stillness: number;
  fold: number;
  bloom: number;
  embrace: number;
  corePulse: number;
  sway: number;
  orbit: number;
  sparkle: number;
  warmth: number;
  pointerAttraction: number;
};

export type SolPocketStarlightPhase =
  | "idle"
  | "companion"
  | "forming"
  | "visible"
  | "dissolving";

export type SolPocketStarlightState = {
  phase: SolPocketStarlightPhase;
  startedAt: number;
  durationMs: number;
  cooldownUntil: number;
  consentUntil: number;
  seed: number;
};

const clamp = (value: unknown, minimum: number, maximum: number, fallback: number) => {
  const number = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.min(maximum, Math.max(minimum, number));
};

export const clamp01 = (value: unknown, fallback = 0) => clamp(value, 0, 1, fallback);

const safeTime = (value: unknown, fallback: number) =>
  clamp(value, 0, Number.MAX_SAFE_INTEGER, fallback);

export const SOL_MOTION_PRIORITY: Record<SolMotionSource, number> = {
  ambient: 100,
  music: 200,
  conversation: 400,
  memory: 500,
  voice: 600,
  interaction: 700,
  easter_egg: 720,
  manual: 800,
};

export const SOL_GESTURE_LABELS: Record<SolGestureId, string> = {
  idleBreath: "轻轻呼吸",
  listeningStillness: "专注聆听",
  thinkingGather: "安静思考",
  shyFold: "害羞收拢",
  joyfulBloom: "开心绽放",
  comfortingEmbrace: "温柔拥抱",
  playfulLeap: "俏皮跃动",
  heartPulse: "心跳回应",
  memoryEcho: "记忆回响",
  musicSway: "随乐轻摆",
};

export function stableMotionSeed(value: string | number) {
  const text = String(value);
  let result = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    result ^= text.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

export function sanitizeSolMotionCue(
  value: unknown,
  fallback?: SolMotionCue,
): SolMotionCue | null {
  if (!value || typeof value !== "object") return fallback ?? null;
  const record = value as Record<string, unknown>;
  if (!SOL_GESTURE_IDS.includes(record.gesture as SolGestureId)) return fallback ?? null;
  if (!SOL_MOTION_SOURCES.includes(record.source as SolMotionSource)) return fallback ?? null;
  const createdAt = safeTime(record.createdAt, fallback?.createdAt ?? 0);
  return {
    version: 1,
    gesture: record.gesture as SolGestureId,
    source: record.source as SolMotionSource,
    strength: clamp01(record.strength, fallback?.strength ?? 0.5),
    durationMs: Math.round(clamp(record.durationMs, 400, 30_000, fallback?.durationMs ?? 6_000)),
    createdAt,
    seed: Math.round(clamp(record.seed, 0, 0xffffffff, fallback?.seed ?? stableMotionSeed(`${record.gesture}:${createdAt}`))),
  };
}

export function createSolMotionCue(
  gesture: SolGestureId,
  source: SolMotionSource,
  now: number,
  strength = 0.6,
  durationMs = 6_000,
  seed = stableMotionSeed(`${gesture}:${source}:${Math.floor(now / 250)}`),
): SolMotionCue {
  return sanitizeSolMotionCue({ gesture, source, createdAt: now, strength, durationMs, seed })!;
}

export function isSolMotionCueExpired(cue: SolMotionCue, now: number) {
  return now >= cue.createdAt + cue.durationMs;
}

export function getSolMotionTransitionProgress(cue: SolMotionCue, now: number) {
  const linear = clamp01((now - cue.createdAt) / Math.max(1, cue.durationMs));
  return linear * linear * (3 - 2 * linear);
}

export function chooseDeterministicAmbientGesture(
  seed: string | number,
  candidates: SolGestureId[] = ["idleBreath", "listeningStillness", "shyFold", "joyfulBloom"],
) {
  const safe = candidates.filter((gesture) => SOL_GESTURE_IDS.includes(gesture));
  return safe.length ? safe[stableMotionSeed(seed) % safe.length] : "idleBreath";
}

export function createSolMotionPlan(now = 0, ambientGesture: SolGestureId = "idleBreath"): SolMotionPlan {
  const primary = createSolMotionCue(ambientGesture, "ambient", now, 0.42, 20_000);
  return {
    primary,
    ambientGesture,
    startedAt: now,
    expiresAt: primary.createdAt + primary.durationMs,
    locked: false,
  };
}

export function resolveSolMotionCue(
  plan: SolMotionPlan,
  incoming: SolMotionCue,
  now: number,
): SolMotionPlan {
  const currentExpired = isSolMotionCueExpired(plan.primary, now);
  if (plan.locked && incoming.source !== "manual") return plan;
  if (
    !currentExpired &&
    plan.primary.gesture === incoming.gesture &&
    plan.primary.source === incoming.source
  ) {
    return plan;
  }
  if (!currentExpired && SOL_MOTION_PRIORITY[incoming.source] < SOL_MOTION_PRIORITY[plan.primary.source]) {
    return plan;
  }
  return {
    ...plan,
    primary: incoming,
    startedAt: incoming.createdAt,
    expiresAt: incoming.createdAt + incoming.durationMs,
  };
}

export function advanceSolMotionPlan(plan: SolMotionPlan, now: number): SolMotionPlan {
  if (!isSolMotionCueExpired(plan.primary, now) || plan.locked) return plan;
  const ambient = createSolMotionCue(
    plan.ambientGesture,
    "ambient",
    now,
    0.42,
    20_000,
    stableMotionSeed(`${plan.ambientGesture}:${Math.floor(now / 20_000)}`),
  );
  return { ...plan, primary: ambient, startedAt: now, expiresAt: now + ambient.durationMs };
}

const ZERO_VISUAL: SolMotionVisual = {
  breath: 0,
  stillness: 0,
  fold: 0,
  bloom: 0,
  embrace: 0,
  corePulse: 0,
  sway: 0,
  orbit: 0,
  sparkle: 0,
  warmth: 0,
  pointerAttraction: 0,
};

const GESTURE_VISUALS: Record<SolGestureId, SolMotionVisual> = {
  idleBreath: { ...ZERO_VISUAL, breath: 0.48, sway: 0.08, warmth: 0.12, pointerAttraction: 0.18 },
  listeningStillness: { ...ZERO_VISUAL, breath: 0.18, stillness: 0.88, fold: 0.08, corePulse: 0.18, sparkle: 0.08, warmth: 0.22, pointerAttraction: 0.38 },
  thinkingGather: { ...ZERO_VISUAL, breath: 0.22, stillness: 0.66, fold: 0.28, orbit: -0.18, corePulse: 0.25, warmth: 0.1 },
  shyFold: { ...ZERO_VISUAL, breath: 0.32, fold: 0.55, stillness: 0.35, warmth: 0.62, sparkle: 0.12, pointerAttraction: 0.14 },
  joyfulBloom: { ...ZERO_VISUAL, breath: 0.42, bloom: 0.72, corePulse: 0.42, sway: 0.2, sparkle: 0.46, warmth: 0.52, pointerAttraction: 0.3 },
  comfortingEmbrace: { ...ZERO_VISUAL, breath: 0.28, stillness: 0.46, fold: 0.18, embrace: 0.76, warmth: 0.82, pointerAttraction: 0.22 },
  playfulLeap: { ...ZERO_VISUAL, breath: 0.42, bloom: 0.3, corePulse: 0.5, sway: 0.56, orbit: 0.26, sparkle: 0.5, warmth: 0.4, pointerAttraction: 0.42 },
  heartPulse: { ...ZERO_VISUAL, breath: 0.34, corePulse: 0.92, sparkle: 0.3, warmth: 0.88, pointerAttraction: 0.26 },
  memoryEcho: { ...ZERO_VISUAL, breath: 0.28, stillness: 0.28, corePulse: 0.62, orbit: 0.12, sparkle: 0.28, warmth: 0.68 },
  musicSway: { ...ZERO_VISUAL, breath: 0.44, sway: 0.5, orbit: 0.12, sparkle: 0.24, warmth: 0.32 },
};

export function getSolMotionVisual(cue: SolMotionCue, reducedMotion = false): SolMotionVisual {
  const base = GESTURE_VISUALS[cue.gesture];
  const displacementScale = cue.strength * (reducedMotion ? 0.14 : 1);
  const semanticScale = cue.strength * (reducedMotion ? 0.7 : 1);
  return {
    ...base,
    breath: clamp01(base.breath * semanticScale),
    stillness: clamp01(base.stillness * semanticScale),
    fold: clamp01(base.fold * displacementScale),
    bloom: clamp01(base.bloom * displacementScale),
    embrace: clamp01(base.embrace * displacementScale),
    corePulse: clamp01(base.corePulse * semanticScale),
    sway: clamp01(base.sway * displacementScale),
    orbit: clamp(base.orbit * displacementScale, -1, 1, 0),
    sparkle: clamp01(base.sparkle * semanticScale),
    warmth: clamp01(base.warmth * semanticScale),
    pointerAttraction: clamp01(base.pointerAttraction * displacementScale),
  };
}

export function createPocketStarlightState(now = 0): SolPocketStarlightState {
  return { phase: "idle", startedAt: now, durationMs: 0, cooldownUntil: now, consentUntil: now, seed: 0 };
}

export function beginCompanionHeart(
  state: SolPocketStarlightState,
  now: number,
): SolPocketStarlightState {
  if (state.phase === "companion" && now < state.consentUntil) return state;
  return {
    ...state,
    phase: "companion",
    startedAt: now,
    durationMs: 18_000,
    consentUntil: now + 18_000,
    seed: stableMotionSeed(`companion:${Math.floor(now / 1000)}`),
  };
}

export function canStartPocketStarlight(
  state: SolPocketStarlightState,
  now: number,
  enabled: boolean,
  doNotDisturb: boolean,
  proactive = false,
) {
  return enabled && now >= state.cooldownUntil && (!proactive || !doNotDisturb);
}

export function startPocketStarlight(
  state: SolPocketStarlightState,
  now: number,
  reducedMotion = false,
): SolPocketStarlightState {
  return {
    phase: "forming",
    startedAt: now,
    durationMs: reducedMotion ? 5_200 : 6_800,
    cooldownUntil: now + 25 * 60_000,
    consentUntil: now,
    seed: stableMotionSeed(`pocket:${Math.floor(now / 1000)}`),
  };
}

export function samplePocketStarlight(
  state: SolPocketStarlightState,
  now: number,
  reducedMotion = false,
) {
  if (state.phase === "idle" || state.phase === "companion") {
    return { phase: state.phase, intensity: 0, textMix: 0, dissolve: 0, glow: state.phase === "companion" ? 0.24 : 0 };
  }
  const progress = clamp01((now - state.startedAt) / Math.max(1, state.durationMs));
  const formingEnd = reducedMotion ? 0.12 : 0.18;
  const visibleEnd = 0.82;
  const textMix = progress < formingEnd
    ? progress / formingEnd
    : progress < visibleEnd
      ? 1
      : Math.max(0, 1 - (progress - visibleEnd) / (1 - visibleEnd));
  const phase: SolPocketStarlightPhase = progress < formingEnd
    ? "forming"
    : progress < visibleEnd
      ? "visible"
      : progress < 1
        ? "dissolving"
        : "idle";
  return {
    phase,
    intensity: phase === "idle" ? 0 : 1,
    textMix: clamp01(textMix),
    dissolve: phase === "dissolving" ? clamp01((progress - visibleEnd) / (1 - visibleEnd)) : 0,
    glow: phase === "idle" ? 0 : reducedMotion ? 0.72 : 1,
  };
}
