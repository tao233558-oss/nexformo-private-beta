import assert from "node:assert/strict";
import test from "node:test";
import {
  SOL_BODY_MOTIFS,
  canOfferSolWelcome,
  createSolEmotionalState,
  decaySolEmotionalState,
  deriveSolExpression,
  inferSolEmotionCue,
  reduceSolEmotion,
  sanitizeSolEmotionCue,
  sanitizeSolEmotionalState,
  serializeSolEmotionalState,
  shouldAllowEmotionalAutonomy,
} from "../shared/solEmotion";
import { selectSolEmotionalWeather } from "../shared/weather";

const normalizedValues = (state: ReturnType<typeof createSolEmotionalState>) => [
  state.valence,
  state.energy,
  state.warmth,
  state.trust,
  state.curiosity,
  state.connection,
  state.confidence,
];

test("emotional values remain bounded after strong and repeated events", () => {
  let state = createSolEmotionalState(1_000);
  for (let index = 0; index < 150; index += 1) {
    state = reduceSolEmotion(state, {
      type: "USER_COMPLIMENT",
      now: 2_000 + index * 100,
      intensity: 9,
    });
  }
  assert.ok(normalizedValues(state).every((value) => value >= 0 && value <= 1));
  assert.ok(state.warmth < 0.9, "duplicate compliments should have strong diminishing returns");
});

test("a compliment produces a small warm and shy response", () => {
  const initial = createSolEmotionalState(1_000);
  const state = reduceSolEmotion(initial, {
    type: "USER_MESSAGE",
    now: 2_000,
    cue: inferSolEmotionCue("你好可爱"),
  });
  assert.equal(state.primaryMood, "shy");
  assert.equal(state.activeMotif, "shy_fold");
  assert.ok(state.warmth > initial.warmth);
  assert.ok(state.connection > initial.connection);
});

test("sadness creates calm attentive behavior instead of joyful motion", () => {
  const initial = createSolEmotionalState(1_000);
  const state = reduceSolEmotion(initial, {
    type: "USER_MESSAGE",
    now: 2_000,
    cue: inferSolEmotionCue("我今天有点难过"),
  });
  const expression = deriveSolExpression(state);
  assert.equal(state.primaryMood, "concerned");
  assert.equal(state.activeMotif, "protective_halo");
  assert.ok(state.energy < initial.energy);
  assert.ok(state.warmth > initial.warmth);
  assert.ok(expression.movementAmplitude < 0.3);
  assert.ok(expression.responseSoftness > 0.9);
});

test("elapsed-time decay returns emotion gradually toward baseline", () => {
  const initial = reduceSolEmotion(createSolEmotionalState(0), {
    type: "USER_HAPPY",
    now: 1_000,
    intensity: 1,
  });
  const decayed = decaySolEmotionalState(initial, 72 * 3_600_000);
  assert.ok(decayed.valence < initial.valence);
  assert.ok(decayed.energy < initial.energy);
  assert.ok(decayed.valence > 0.59);
});

test("music and pause are temporary context modifiers", () => {
  const initial = reduceSolEmotion(createSolEmotionalState(0), {
    type: "USER_SAD",
    now: 1_000,
    intensity: 0.7,
  });
  const playingState = reduceSolEmotion(initial, { type: "MUSIC_STARTED", now: 2_000 });
  const pausedState = reduceSolEmotion(playingState, { type: "MUSIC_PAUSED", now: 3_000 });
  assert.equal(pausedState.primaryMood, initial.primaryMood);
  assert.equal(pausedState.activeMotif, initial.activeMotif);
  assert.ok(Math.abs(pausedState.energy - initial.energy) < 0.001, "music events may apply only normal elapsed-time decay");
  const playing = deriveSolExpression(initial, { musicPlaying: true });
  const paused = deriveSolExpression(initial, { musicPlaying: false });
  assert.ok(playing.movementAmplitude > paused.movementAmplitude);
  assert.equal(paused.modifiers.music, false);
});

test("manual shape and weather selections retain a priority lock", () => {
  let state = createSolEmotionalState(0);
  state = reduceSolEmotion(state, { type: "MANUAL_SHAPE_SELECTED", now: 1_000 });
  state = reduceSolEmotion(state, { type: "MANUAL_WEATHER_SELECTED", now: 2_000 });
  state = reduceSolEmotion(state, { type: "USER_HAPPY", now: 3_000, intensity: 1 });
  assert.ok(state.manualShapeUntil > 3_000);
  assert.ok(state.manualWeatherUntil > 3_000);
});

test("persistent emotion selects gentle weather and never autonomous heavy rain", () => {
  const moods = ["calm", "joyful", "shy", "curious", "tender", "concerned", "lonely", "tired"] as const;
  const results = moods.map((primaryMood) => selectSolEmotionalWeather({
    ...createSolEmotionalState(0),
    primaryMood,
  }));
  assert.equal(results.includes("heavy_rain"), false);
  assert.equal(selectSolEmotionalWeather({ ...createSolEmotionalState(0), primaryMood: "concerned" }), "rain");
});

test("return welcome is offered only once for the same visit", () => {
  const now = 48 * 3_600_000;
  const initial = { ...createSolEmotionalState(0), lastVisitAt: 1_000, lastWelcomeAt: 0 };
  assert.equal(canOfferSolWelcome(initial, now), true);
  const welcomed = reduceSolEmotion(initial, { type: "USER_RETURNED", now, absenceMs: now - 1_000 });
  assert.equal(canOfferSolWelcome(welcomed, now + 1_000), false);
  assert.equal(welcomed.activeMotif, "warm_orbit");
});

test("emotional autonomy respects every interaction guard", () => {
  const base = {
    doNotDisturb: false,
    typing: false,
    voiceActive: false,
    musicPlaying: false,
    overlayOpen: false,
    busy: false,
    now: 100_000,
    lastInteractionAt: 0,
    cooldownMs: 30_000,
  };
  assert.equal(shouldAllowEmotionalAutonomy(base), true);
  assert.equal(shouldAllowEmotionalAutonomy({ ...base, doNotDisturb: true }), false);
  assert.equal(shouldAllowEmotionalAutonomy({ ...base, typing: true }), false);
  assert.equal(shouldAllowEmotionalAutonomy({ ...base, voiceActive: true }), false);
  assert.equal(shouldAllowEmotionalAutonomy({ ...base, musicPlaying: true }), false);
  assert.equal(shouldAllowEmotionalAutonomy({ ...base, overlayOpen: true }), false);
  assert.equal(shouldAllowEmotionalAutonomy({ ...base, busy: true }), false);
});

test("reduced motion preserves meaning while strongly attenuating movement", () => {
  const joyful = reduceSolEmotion(createSolEmotionalState(0), {
    type: "USER_HAPPY",
    now: 1_000,
    intensity: 1,
  });
  const regular = deriveSolExpression(joyful);
  const reduced = deriveSolExpression(joyful, { reducedMotion: true });
  assert.ok(reduced.movementAmplitude < regular.movementAmplitude * 0.2);
  assert.ok(reduced.orbitSpeed < regular.orbitSpeed * 0.2);
  assert.ok(reduced.paletteWarmth > 0.4);
});

test("invalid persisted state safely migrates and clamps", () => {
  const state = sanitizeSolEmotionalState({
    version: -20,
    primaryMood: "invalid",
    activeMotif: "unknown",
    valence: 99,
    warmth: -3,
    trust: Number.NaN,
    lastUpdatedAt: "yesterday",
  }, 5_000);
  assert.equal(state.version, 1);
  assert.equal(state.primaryMood, "curious");
  assert.equal(state.activeMotif, "attentive_glow");
  assert.equal(state.valence, 1);
  assert.equal(state.warmth, 0);
  assert.ok(normalizedValues(state).every((value) => value >= 0 && value <= 1));
});

test("removed curious reach persistence migrates to attentive glow", () => {
  const state = sanitizeSolEmotionalState({
    ...createSolEmotionalState(0),
    primaryMood: "curious",
    activeMotif: "curious_reach",
  }, 5_000);
  assert.equal(SOL_BODY_MOTIFS.includes("curious_reach" as never), false);
  assert.equal(state.activeMotif, "attentive_glow");
  assert.equal(serializeSolEmotionalState(state).includes("curious_reach"), false);
});

test("emotional persistence contains no conversation text", () => {
  const rawMessage = "这是一段绝不能写入情绪状态的原始对话";
  const state = reduceSolEmotion(createSolEmotionalState(0), {
    type: "USER_MESSAGE",
    now: 1_000,
    cue: inferSolEmotionCue(rawMessage),
  });
  const serialized = serializeSolEmotionalState(state);
  assert.equal(serialized.includes(rawMessage), false);
  assert.equal(serialized.includes("原始对话"), false);
});

test("emotion cues are conservative, validated, and clamped", () => {
  assert.deepEqual(inferSolEmotionCue("我感觉很孤单"), { intent: "loneliness", intensity: 0.76 });
  assert.deepEqual(inferSolEmotionCue("今天天气不错"), { intent: "neutral", intensity: 0.2 });
  assert.deepEqual(sanitizeSolEmotionCue({ intent: "happiness", intensity: 8 }), { intent: "happiness", intensity: 1 });
  assert.deepEqual(sanitizeSolEmotionCue({ intent: "diagnosis", intensity: -1 }), { intent: "neutral", intensity: 0 });
});
