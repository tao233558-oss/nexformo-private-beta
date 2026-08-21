export const SOL_EMOTION_VERSION = 1;

export const SOL_MOODS = [
  "calm",
  "joyful",
  "shy",
  "curious",
  "tender",
  "concerned",
  "lonely",
  "tired",
] as const;

export const SOL_BODY_MOTIFS = [
  "quiet_hold",
  "warm_orbit",
  "shy_fold",
  "attentive_glow",
  "joyful_bloom",
  "tender_breathe",
  "tired_drift",
  "protective_halo",
] as const;

export const SOL_EMOTION_CUE_INTENTS = [
  "compliment",
  "sadness",
  "happiness",
  "loneliness",
  "curiosity",
  "farewell",
  "neutral",
] as const;

export type SolMood = (typeof SOL_MOODS)[number];
export type SolBodyMotif = (typeof SOL_BODY_MOTIFS)[number];
export type SolEmotionCueIntent = (typeof SOL_EMOTION_CUE_INTENTS)[number];

export type SolEmotionCue = {
  intent: SolEmotionCueIntent;
  intensity: number;
};

export type SolEmotionalState = {
  version: number;
  primaryMood: SolMood;
  secondaryMood: SolMood | null;
  valence: number;
  energy: number;
  warmth: number;
  trust: number;
  curiosity: number;
  connection: number;
  confidence: number;
  lastInteractionAt: number;
  lastUpdatedAt: number;
  lastVisitAt: number;
  lastMoodChangeAt: number;
  activeMotif: SolBodyMotif;
  motifLockUntil: number;
  lastCueIntent: SolEmotionCueIntent;
  lastCueAt: number;
  lastEvent: SolEmotionEventType;
  lastWelcomeAt: number;
  manualShapeUntil: number;
  manualWeatherUntil: number;
};

export type SolEmotionEventType =
  | "SESSION_STARTED"
  | "USER_RETURNED"
  | "USER_MESSAGE"
  | "USER_COMPLIMENT"
  | "USER_SAD"
  | "USER_HAPPY"
  | "USER_LONELY"
  | "USER_CURIOUS"
  | "USER_FAREWELL"
  | "SOL_REPLIED"
  | "VOICE_STARTED"
  | "VOICE_ENDED"
  | "MUSIC_STARTED"
  | "MUSIC_PAUSED"
  | "MUSIC_STOPPED"
  | "WEATHER_CHANGED"
  | "MANUAL_SHAPE_SELECTED"
  | "MANUAL_WEATHER_SELECTED"
  | "IDLE_ELAPSED"
  | "INTERACTION_WITH_PARTICLES"
  | "MEMORY_CONFIRMED"
  | "MEMORY_RECALLED"
  | "MEMORY_CORRECTED"
  | "MEMORY_REMOVED"
  | "RESET_EMOTIONAL_STATE";

export type SolEmotionEvent =
  | { type: "SESSION_STARTED"; now: number }
  | { type: "USER_RETURNED"; now: number; absenceMs?: number }
  | { type: "USER_MESSAGE"; now: number; cue: SolEmotionCue }
  | { type: "USER_COMPLIMENT"; now: number; intensity?: number }
  | { type: "USER_SAD"; now: number; intensity?: number }
  | { type: "USER_HAPPY"; now: number; intensity?: number }
  | { type: "USER_LONELY"; now: number; intensity?: number }
  | { type: "USER_CURIOUS"; now: number; intensity?: number }
  | { type: "USER_FAREWELL"; now: number; intensity?: number }
  | { type: "SOL_REPLIED"; now: number; cue?: SolEmotionCue }
  | { type: "VOICE_STARTED"; now: number }
  | { type: "VOICE_ENDED"; now: number }
  | { type: "MUSIC_STARTED"; now: number }
  | { type: "MUSIC_PAUSED"; now: number }
  | { type: "MUSIC_STOPPED"; now: number }
  | { type: "WEATHER_CHANGED"; now: number }
  | { type: "MANUAL_SHAPE_SELECTED"; now: number }
  | { type: "MANUAL_WEATHER_SELECTED"; now: number }
  | { type: "IDLE_ELAPSED"; now: number }
  | { type: "INTERACTION_WITH_PARTICLES"; now: number; intensity?: number }
  | { type: "MEMORY_CONFIRMED"; now: number }
  | { type: "MEMORY_RECALLED"; now: number }
  | { type: "MEMORY_CORRECTED"; now: number }
  | { type: "MEMORY_REMOVED"; now: number }
  | { type: "RESET_EMOTIONAL_STATE"; now: number };

export type SolExpressionContext = {
  musicPlaying?: boolean;
  voiceActive?: boolean;
  raining?: boolean;
  reducedMotion?: boolean;
};

export type SolExpressionModifiers = {
  music: boolean;
  voice: boolean;
  rain: boolean;
  reducedMotion: boolean;
};

export type SolExpression = {
  cohesion: number;
  coreGlow: number;
  breathingSpeed: number;
  movementAmplitude: number;
  roamingRadius: number;
  orbitSpeed: number;
  pointerAttraction: number;
  paletteWarmth: number;
  particleSpread: number;
  responseSoftness: number;
  modifiers: SolExpressionModifiers;
};

const BASELINE = {
  valence: 0.59,
  energy: 0.48,
  warmth: 0.58,
  trust: 0.28,
  curiosity: 0.68,
  connection: 0.24,
  confidence: 0.5,
};

const motifForMood: Record<SolMood, SolBodyMotif> = {
  calm: "quiet_hold",
  joyful: "joyful_bloom",
  shy: "shy_fold",
  curious: "attentive_glow",
  tender: "tender_breathe",
  concerned: "protective_halo",
  lonely: "tender_breathe",
  tired: "tired_drift",
};

const motifExpression: Record<SolBodyMotif, Omit<SolExpression, "modifiers">> = {
  quiet_hold: { cohesion: 0.68, coreGlow: 0.42, breathingSpeed: 0.28, movementAmplitude: 0.18, roamingRadius: 0.16, orbitSpeed: 0.08, pointerAttraction: 0.3, paletteWarmth: 0.24, particleSpread: 0.22, responseSoftness: 0.82 },
  warm_orbit: { cohesion: 0.56, coreGlow: 0.68, breathingSpeed: 0.48, movementAmplitude: 0.38, roamingRadius: 0.34, orbitSpeed: 0.52, pointerAttraction: 0.48, paletteWarmth: 0.7, particleSpread: 0.42, responseSoftness: 0.66 },
  shy_fold: { cohesion: 0.86, coreGlow: 0.7, breathingSpeed: 0.5, movementAmplitude: 0.2, roamingRadius: 0.1, orbitSpeed: 0.07, pointerAttraction: 0.42, paletteWarmth: 0.82, particleSpread: 0.08, responseSoftness: 0.84 },
  attentive_glow: { cohesion: 0.64, coreGlow: 0.7, breathingSpeed: 0.24, movementAmplitude: 0.14, roamingRadius: 0.1, orbitSpeed: 0.03, pointerAttraction: 0.62, paletteWarmth: 0.48, particleSpread: 0.18, responseSoftness: 0.86 },
  joyful_bloom: { cohesion: 0.36, coreGlow: 0.84, breathingSpeed: 0.74, movementAmplitude: 0.72, roamingRadius: 0.6, orbitSpeed: 0.46, pointerAttraction: 0.54, paletteWarmth: 0.7, particleSpread: 0.74, responseSoftness: 0.38 },
  tender_breathe: { cohesion: 0.72, coreGlow: 0.68, breathingSpeed: 0.36, movementAmplitude: 0.24, roamingRadius: 0.2, orbitSpeed: 0.14, pointerAttraction: 0.48, paletteWarmth: 0.76, particleSpread: 0.26, responseSoftness: 0.9 },
  tired_drift: { cohesion: 0.6, coreGlow: 0.28, breathingSpeed: 0.18, movementAmplitude: 0.16, roamingRadius: 0.3, orbitSpeed: 0.06, pointerAttraction: 0.16, paletteWarmth: 0.3, particleSpread: 0.34, responseSoftness: 0.94 },
  protective_halo: { cohesion: 0.78, coreGlow: 0.64, breathingSpeed: 0.3, movementAmplitude: 0.18, roamingRadius: 0.12, orbitSpeed: 0.2, pointerAttraction: 0.58, paletteWarmth: 0.72, particleSpread: 0.18, responseSoftness: 0.96 },
};

export const clampSolValue = (value: unknown, fallback = 0.5) => {
  const numeric = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.min(1, Math.max(0, numeric));
};

const safeTime = (value: unknown, fallback: number) =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : fallback;

const safeRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;

const approach = (current: number, target: number, amount: number) =>
  current + (target - current) * clampSolValue(amount, 0);

export function createSolEmotionalState(now = Date.now()): SolEmotionalState {
  return {
    version: SOL_EMOTION_VERSION,
    primaryMood: "curious",
    secondaryMood: "calm",
    ...BASELINE,
    lastInteractionAt: now,
    lastUpdatedAt: now,
    lastVisitAt: now,
    lastMoodChangeAt: now,
    activeMotif: "attentive_glow",
    motifLockUntil: now,
    lastCueIntent: "neutral",
    lastCueAt: 0,
    lastEvent: "SESSION_STARTED",
    lastWelcomeAt: 0,
    manualShapeUntil: 0,
    manualWeatherUntil: 0,
  };
}

export function sanitizeSolEmotionCue(value: unknown): SolEmotionCue {
  const record = safeRecord(value) ?? {};
  return {
    intent: SOL_EMOTION_CUE_INTENTS.includes(record.intent as SolEmotionCueIntent)
      ? (record.intent as SolEmotionCueIntent)
      : "neutral",
    intensity: clampSolValue(record.intensity, 0.2),
  };
}

export function sanitizeSolEmotionalState(
  value: unknown,
  now = Date.now(),
): SolEmotionalState {
  const fallback = createSolEmotionalState(now);
  const record = safeRecord(value);
  if (!record) return fallback;
  const primaryMood = SOL_MOODS.includes(record.primaryMood as SolMood)
    ? (record.primaryMood as SolMood)
    : fallback.primaryMood;
  const secondaryMood = record.secondaryMood === null
    ? null
    : SOL_MOODS.includes(record.secondaryMood as SolMood)
      ? (record.secondaryMood as SolMood)
      : fallback.secondaryMood;
  const activeMotif = SOL_BODY_MOTIFS.includes(record.activeMotif as SolBodyMotif)
    ? (record.activeMotif as SolBodyMotif)
    : motifForMood[primaryMood];
  return {
    version: SOL_EMOTION_VERSION,
    primaryMood,
    secondaryMood,
    valence: clampSolValue(record.valence, fallback.valence),
    energy: clampSolValue(record.energy, fallback.energy),
    warmth: clampSolValue(record.warmth, fallback.warmth),
    trust: clampSolValue(record.trust, fallback.trust),
    curiosity: clampSolValue(record.curiosity, fallback.curiosity),
    connection: clampSolValue(record.connection, fallback.connection),
    confidence: clampSolValue(record.confidence, fallback.confidence),
    lastInteractionAt: safeTime(record.lastInteractionAt, fallback.lastInteractionAt),
    lastUpdatedAt: safeTime(record.lastUpdatedAt, fallback.lastUpdatedAt),
    lastVisitAt: safeTime(record.lastVisitAt, fallback.lastVisitAt),
    lastMoodChangeAt: safeTime(record.lastMoodChangeAt, fallback.lastMoodChangeAt),
    activeMotif,
    motifLockUntil: safeTime(record.motifLockUntil, fallback.motifLockUntil),
    lastCueIntent: SOL_EMOTION_CUE_INTENTS.includes(record.lastCueIntent as SolEmotionCueIntent)
      ? (record.lastCueIntent as SolEmotionCueIntent)
      : "neutral",
    lastCueAt: safeTime(record.lastCueAt, 0),
    lastEvent: typeof record.lastEvent === "string" ? record.lastEvent as SolEmotionEventType : "SESSION_STARTED",
    lastWelcomeAt: safeTime(record.lastWelcomeAt, 0),
    manualShapeUntil: safeTime(record.manualShapeUntil, 0),
    manualWeatherUntil: safeTime(record.manualWeatherUntil, 0),
  };
}

export function inferSolEmotionCue(rawText: string): SolEmotionCue {
  const text = rawText.normalize("NFKC").trim().toLowerCase();
  if (!text) return { intent: "neutral", intensity: 0.1 };
  if (/(?:孤单|孤独|没人理解|一个人|寂寞)/.test(text)) return { intent: "loneliness", intensity: 0.76 };
  if (/(?:难过|伤心|不开心|焦虑|害怕|很累|累了|想哭)/.test(text)) return { intent: "sadness", intensity: 0.72 };
  if (/(?:你好可爱|真可爱|喜欢你|爱你|谢谢你陪我|谢谢.*陪|好温柔|抱抱)/.test(text)) return { intent: "compliment", intensity: 0.7 };
  if (/(?:很开心|好开心|太棒了|哈哈|兴奋|快乐)/.test(text)) return { intent: "happiness", intensity: 0.68 };
  if (/(?:晚安|我要走了|先走了|再见|明天见)/.test(text)) return { intent: "farewell", intensity: 0.58 };
  if (/(?:你在想什么|为什么|怎么想|好奇|想知道|告诉我)/.test(text)) return { intent: "curiosity", intensity: 0.5 };
  return { intent: "neutral", intensity: 0.2 };
}

export function decaySolEmotionalState(
  rawState: SolEmotionalState,
  now: number,
): SolEmotionalState {
  const state = sanitizeSolEmotionalState(rawState, now);
  const elapsedHours = Math.min(24 * 30, Math.max(0, now - state.lastUpdatedAt) / 3_600_000);
  if (elapsedHours <= 0) return state;
  const emotionalAmount = 1 - Math.exp(-elapsedHours / 56);
  const relationalAmount = 1 - Math.exp(-elapsedHours / (24 * 45));
  const moodSettled = elapsedHours >= 18 && now >= state.motifLockUntil;
  return sanitizeSolEmotionalState({
    ...state,
    valence: approach(state.valence, BASELINE.valence, emotionalAmount),
    energy: approach(state.energy, BASELINE.energy, emotionalAmount),
    warmth: approach(state.warmth, BASELINE.warmth, emotionalAmount * 0.65),
    curiosity: approach(state.curiosity, BASELINE.curiosity, emotionalAmount * 0.55),
    confidence: approach(state.confidence, BASELINE.confidence, emotionalAmount * 0.45),
    trust: approach(state.trust, Math.max(BASELINE.trust, state.trust * 0.94), relationalAmount),
    connection: approach(state.connection, Math.max(BASELINE.connection, state.connection * 0.94), relationalAmount),
    primaryMood: moodSettled ? "calm" : state.primaryMood,
    secondaryMood: moodSettled ? state.primaryMood : state.secondaryMood,
    activeMotif: moodSettled ? "quiet_hold" : state.activeMotif,
    lastUpdatedAt: now,
  }, now);
}

const cueEvent = (cue: SolEmotionCue, now: number): SolEmotionEvent => {
  const intensity = cue.intensity;
  switch (cue.intent) {
    case "compliment": return { type: "USER_COMPLIMENT", now, intensity };
    case "sadness": return { type: "USER_SAD", now, intensity };
    case "happiness": return { type: "USER_HAPPY", now, intensity };
    case "loneliness": return { type: "USER_LONELY", now, intensity };
    case "curiosity": return { type: "USER_CURIOUS", now, intensity };
    case "farewell": return { type: "USER_FAREWELL", now, intensity };
    default: return { type: "SOL_REPLIED", now, cue };
  }
};

function applyCueChange(
  state: SolEmotionalState,
  intent: SolEmotionCueIntent,
  rawIntensity: number | undefined,
  now: number,
) {
  const repeated = state.lastCueIntent === intent && now - state.lastCueAt < 90_000;
  const intensity = clampSolValue(rawIntensity, 0.5) * (repeated ? 0.005 : 1);
  let primaryMood: SolMood = state.primaryMood;
  let activeMotif: SolBodyMotif = state.activeMotif;
  let patch: Partial<SolEmotionalState> = {};

  switch (intent) {
    case "compliment":
      primaryMood = "shy";
      activeMotif = "shy_fold";
      patch = { valence: state.valence + 0.07 * intensity, energy: state.energy + 0.025 * intensity, warmth: state.warmth + 0.1 * intensity, trust: state.trust + 0.035 * intensity, connection: state.connection + 0.045 * intensity, confidence: state.confidence + 0.02 * intensity };
      break;
    case "sadness":
      primaryMood = "concerned";
      activeMotif = "protective_halo";
      patch = { valence: state.valence - 0.045 * intensity, energy: state.energy - 0.11 * intensity, warmth: state.warmth + 0.1 * intensity, trust: state.trust + 0.025 * intensity, connection: state.connection + 0.035 * intensity };
      break;
    case "loneliness":
      primaryMood = "tender";
      activeMotif = "tender_breathe";
      patch = { valence: state.valence - 0.035 * intensity, energy: state.energy - 0.07 * intensity, warmth: state.warmth + 0.12 * intensity, trust: state.trust + 0.03 * intensity, connection: state.connection + 0.05 * intensity };
      break;
    case "happiness":
      primaryMood = "joyful";
      activeMotif = "joyful_bloom";
      patch = { valence: state.valence + 0.1 * intensity, energy: state.energy + 0.11 * intensity, warmth: state.warmth + 0.055 * intensity, connection: state.connection + 0.025 * intensity, confidence: state.confidence + 0.025 * intensity };
      break;
    case "curiosity":
      primaryMood = "curious";
      activeMotif = "attentive_glow";
      patch = { curiosity: state.curiosity + 0.11 * intensity, energy: state.energy + 0.035 * intensity, trust: state.trust + 0.012 * intensity };
      break;
    case "farewell":
      primaryMood = "tender";
      activeMotif = "tender_breathe";
      patch = { warmth: state.warmth + 0.045 * intensity, energy: state.energy - 0.035 * intensity, connection: state.connection + 0.012 * intensity };
      break;
    default:
      patch = { curiosity: state.curiosity + 0.006 * intensity };
  }

  const allowMoodChange = !repeated || now >= state.motifLockUntil || intent === "sadness" || intent === "loneliness";
  return sanitizeSolEmotionalState({
    ...state,
    ...patch,
    primaryMood: allowMoodChange ? primaryMood : state.primaryMood,
    secondaryMood: allowMoodChange && state.primaryMood !== primaryMood ? state.primaryMood : state.secondaryMood,
    activeMotif: allowMoodChange ? activeMotif : state.activeMotif,
    motifLockUntil: allowMoodChange ? now + (intent === "sadness" || intent === "loneliness" ? 16_000 : 12_000) : state.motifLockUntil,
    lastMoodChangeAt: allowMoodChange ? now : state.lastMoodChangeAt,
    lastInteractionAt: now,
    lastUpdatedAt: now,
    lastCueIntent: intent,
    lastCueAt: now,
  }, now);
}

export function reduceSolEmotion(
  rawState: SolEmotionalState,
  event: SolEmotionEvent,
): SolEmotionalState {
  if (event.type === "RESET_EMOTIONAL_STATE") return createSolEmotionalState(event.now);
  let state = decaySolEmotionalState(rawState, event.now);
  if (event.type === "USER_MESSAGE") {
    state = reduceSolEmotion(state, cueEvent(sanitizeSolEmotionCue(event.cue), event.now));
    return { ...state, lastEvent: "USER_MESSAGE" };
  }

  switch (event.type) {
    case "SESSION_STARTED":
      return { ...state, lastVisitAt: event.now, lastUpdatedAt: event.now, lastEvent: event.type };
    case "USER_RETURNED": {
      const absenceHours = Math.max(0, event.absenceMs ?? event.now - state.lastVisitAt) / 3_600_000;
      const intensity = clampSolValue(absenceHours / 72, 0.35);
      return sanitizeSolEmotionalState({
        ...state,
        primaryMood: "tender",
        secondaryMood: state.primaryMood,
        warmth: state.warmth + 0.05 * intensity,
        connection: state.connection + 0.018 * intensity,
        activeMotif: "warm_orbit",
        motifLockUntil: event.now + 14_000,
        lastMoodChangeAt: event.now,
        lastWelcomeAt: event.now,
        lastInteractionAt: event.now,
        lastUpdatedAt: event.now,
        lastEvent: event.type,
      }, event.now);
    }
    case "USER_COMPLIMENT": state = applyCueChange(state, "compliment", event.intensity, event.now); break;
    case "USER_SAD": state = applyCueChange(state, "sadness", event.intensity, event.now); break;
    case "USER_HAPPY": state = applyCueChange(state, "happiness", event.intensity, event.now); break;
    case "USER_LONELY": state = applyCueChange(state, "loneliness", event.intensity, event.now); break;
    case "USER_CURIOUS": state = applyCueChange(state, "curiosity", event.intensity, event.now); break;
    case "USER_FAREWELL": state = applyCueChange(state, "farewell", event.intensity, event.now); break;
    case "SOL_REPLIED":
      if (event.cue && event.cue.intent !== "neutral") state = applyCueChange(state, event.cue.intent, event.cue.intensity * 0.28, event.now);
      break;
    case "INTERACTION_WITH_PARTICLES": {
      const amount = clampSolValue(event.intensity, 0.4);
      state = sanitizeSolEmotionalState({ ...state, curiosity: state.curiosity + 0.016 * amount, connection: state.connection + 0.01 * amount, lastInteractionAt: event.now }, event.now);
      break;
    }
    case "MEMORY_CONFIRMED":
      state = sanitizeSolEmotionalState({
        ...state,
        warmth: state.warmth + 0.008,
        connection: state.connection + 0.006,
        activeMotif: event.now >= state.motifLockUntil ? "warm_orbit" : state.activeMotif,
        motifLockUntil: Math.max(state.motifLockUntil, event.now + 6_000),
      }, event.now);
      break;
    case "MEMORY_RECALLED":
      state = sanitizeSolEmotionalState({
        ...state,
        activeMotif: event.now >= state.motifLockUntil ? "tender_breathe" : state.activeMotif,
        motifLockUntil: Math.max(state.motifLockUntil, event.now + 5_000),
      }, event.now);
      break;
    case "MEMORY_CORRECTED":
    case "MEMORY_REMOVED":
      break;
    case "MANUAL_SHAPE_SELECTED": state = { ...state, manualShapeUntil: event.now + 120_000 }; break;
    case "MANUAL_WEATHER_SELECTED": state = { ...state, manualWeatherUntil: event.now + 120_000 }; break;
    case "IDLE_ELAPSED":
      if (event.now - state.lastInteractionAt >= 3_600_000 && event.now >= state.motifLockUntil) {
        state = { ...state, primaryMood: "calm", secondaryMood: state.primaryMood, activeMotif: "quiet_hold", lastMoodChangeAt: event.now };
      }
      break;
    default:
      break;
  }
  return sanitizeSolEmotionalState({ ...state, lastUpdatedAt: event.now, lastEvent: event.type }, event.now);
}

export function deriveSolExpression(
  rawState: SolEmotionalState,
  context: SolExpressionContext = {},
): SolExpression {
  const state = sanitizeSolEmotionalState(rawState);
  const base = motifExpression[state.activeMotif];
  const music = context.musicPlaying === true;
  const voice = context.voiceActive === true;
  const rain = context.raining === true;
  const reducedMotion = context.reducedMotion === true;
  const movementScale = reducedMotion ? 0.14 : 1;
  const energyInfluence = state.energy - 0.5;
  const warmth = clampSolValue(base.paletteWarmth * 0.58 + state.warmth * 0.42);
  const movement = clampSolValue(base.movementAmplitude + energyInfluence * 0.34 + (music ? 0.18 : 0) - (rain ? 0.06 : 0));
  return {
    cohesion: clampSolValue(base.cohesion + (state.primaryMood === "concerned" ? 0.08 : 0)),
    coreGlow: clampSolValue(base.coreGlow * 0.68 + state.warmth * 0.2 + state.valence * 0.12 + (music ? 0.08 : 0)),
    breathingSpeed: clampSolValue((base.breathingSpeed + (music ? 0.14 : 0)) * (reducedMotion ? 0.42 : 1)),
    movementAmplitude: clampSolValue(movement * movementScale),
    roamingRadius: clampSolValue((base.roamingRadius + (music ? 0.08 : 0)) * movementScale),
    orbitSpeed: clampSolValue((base.orbitSpeed + (music ? 0.12 : 0)) * movementScale),
    pointerAttraction: clampSolValue(base.pointerAttraction + (voice ? 0.12 : 0)),
    paletteWarmth: warmth,
    particleSpread: clampSolValue(base.particleSpread * (reducedMotion ? 0.38 : 1)),
    responseSoftness: clampSolValue(base.responseSoftness + (rain ? 0.08 : 0)),
    modifiers: { music, voice, rain, reducedMotion },
  };
}

export function canOfferSolWelcome(
  state: SolEmotionalState,
  now: number,
  alreadyWelcomedThisSession = false,
) {
  const absence = now - state.lastVisitAt;
  return !alreadyWelcomedThisSession && absence >= 6 * 3_600_000 && state.lastWelcomeAt < state.lastVisitAt;
}

export function shouldAllowEmotionalAutonomy(input: {
  doNotDisturb: boolean;
  typing: boolean;
  voiceActive: boolean;
  musicPlaying: boolean;
  overlayOpen: boolean;
  busy: boolean;
  now: number;
  lastInteractionAt: number;
  cooldownMs: number;
}) {
  return !input.doNotDisturb && !input.typing && !input.voiceActive && !input.musicPlaying && !input.overlayOpen && !input.busy && input.now - input.lastInteractionAt >= input.cooldownMs;
}

export function serializeSolEmotionalState(state: SolEmotionalState) {
  return JSON.stringify(sanitizeSolEmotionalState(state, state.lastUpdatedAt));
}
