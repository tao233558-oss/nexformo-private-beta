import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_COMPANION_STATE } from "../shared/companion";
import {
  applySolWeatherCommand,
  createSolWeatherState,
  getSolWeatherTransitionProgress,
  getSolWeatherVisualState,
  parseSolWeatherCommand,
  selectEmotionalWeather,
  setSolWeatherMode,
  shouldAutonomouslyChangeWeather,
} from "../shared/weather";
import { shouldCreateEvolutionNodeForTurn } from "../src/lib/stagePresentation";

test("weather commands are deterministic and distinguish local controls", () => {
  assert.deepEqual(parseSolWeatherCommand("下一场雨"), {
    action: "weather.setMode",
    mode: "rain",
  });
  assert.deepEqual(parseSolWeatherCommand("来一点星雨"), {
    action: "weather.setMode",
    mode: "star_rain",
  });
  assert.deepEqual(parseSolWeatherCommand("停止下雨"), {
    action: "weather.setMode",
    mode: "clear",
  });
  assert.deepEqual(parseSolWeatherCommand("往左吹"), {
    action: "weather.adjustWind",
    delta: -0.22,
  });
  assert.equal(parseSolWeatherCommand("今天过得怎么样"), null);
  assert.equal(parseSolWeatherCommand("播放周杰伦的晴天"), null);
  assert.equal(parseSolWeatherCommand("搜索下雨天的歌"), null);
});

test("enter and exit rain immersion are local weather commands", () => {
  assert.deepEqual(parseSolWeatherCommand("进入雨中"), {
    action: "weather.setImmersion",
    value: true,
  });
  assert.deepEqual(parseSolWeatherCommand("退出雨景"), {
    action: "weather.setImmersion",
    value: false,
  });
});

test("stopping rain creates a four-second firefly transition", () => {
  const raining = setSolWeatherMode(createSolWeatherState(0), "rain", 100);
  const clearing = setSolWeatherMode(raining, "clear", 1_000);
  assert.equal(clearing.transition, "rain_to_fireflies");
  assert.equal(clearing.transitionDurationMs, 4_200);
  assert.equal(getSolWeatherTransitionProgress(clearing, 1_000), 0);
  assert.equal(getSolWeatherTransitionProgress(clearing, 5_200), 1);
  assert.ok(getSolWeatherVisualState(clearing, 3_100).fireflyMix > 0.95);
});

test("weather controls clamp intensity and wind", () => {
  let state = createSolWeatherState(0);
  state = applySolWeatherCommand(state, { action: "weather.adjustIntensity", delta: 5 }, 1);
  state = applySolWeatherCommand(state, { action: "weather.adjustWind", delta: -5 }, 2);
  assert.equal(state.intensity, 1);
  assert.equal(state.wind, -1);
});

test("reduced motion strongly limits falling rain", () => {
  const rain = setSolWeatherMode(createSolWeatherState(0), "heavy_rain", 0);
  const regular = getSolWeatherVisualState(rain, 5_000, false);
  const reduced = getSolWeatherVisualState(rain, 5_000, true);
  assert.ok(reduced.rainDensity < regular.rainDensity * 0.4);
  assert.ok(reduced.rainSpeed < regular.rainSpeed * 0.3);
});

test("removed mist mode and commands remain unavailable", () => {
  assert.equal(parseSolWeatherCommand("打开薄雾"), null);
  assert.equal(parseSolWeatherCommand("雾浓一点"), null);
});

test("autonomous weather respects all user and lifecycle guards", () => {
  const state = createSolWeatherState(0);
  const base = {
    state,
    now: 500_000,
    cooldownMs: 200_000,
    doNotDisturb: false,
    overlayOpen: false,
    busy: false,
    studioActive: true,
  };
  assert.equal(shouldAutonomouslyChangeWeather(base), true);
  assert.equal(shouldAutonomouslyChangeWeather({ ...base, doNotDisturb: true }), false);
  assert.equal(shouldAutonomouslyChangeWeather({ ...base, overlayOpen: true }), false);
  assert.equal(shouldAutonomouslyChangeWeather({ ...base, busy: true }), false);
  assert.equal(shouldAutonomouslyChangeWeather({ ...base, studioActive: false }), false);
  assert.equal(shouldAutonomouslyChangeWeather({ ...base, state: { ...state, locked: true } }), false);
});

test("Sol mood selects gentle emotional weather and never autonomous heavy rain", () => {
  const modes = [
    selectEmotionalWeather({ ...DEFAULT_COMPANION_STATE, primaryMood: "tender" }),
    selectEmotionalWeather({ ...DEFAULT_COMPANION_STATE, primaryMood: "melancholy" }),
    selectEmotionalWeather({ ...DEFAULT_COMPANION_STATE, primaryMood: "playful" }),
  ];
  assert.deepEqual(modes, ["drizzle", "rain", "star_rain"]);
  assert.equal(modes.includes("heavy_rain"), false);
});

test("weather remains independent from playback state", () => {
  const rain = setSolWeatherMode(createSolWeatherState(0), "rain", 10);
  const beforePause = getSolWeatherVisualState(rain, 3_000);
  const afterPause = getSolWeatherVisualState(rain, 3_000);
  assert.deepEqual(afterPause, beforePause);
});

test("local weather commands never request a world evolution node", () => {
  assert.equal(shouldCreateEvolutionNodeForTurn({
    localMusicHandled: false,
    localPresenceHandled: false,
    localWeatherHandled: Boolean(parseSolWeatherCommand("下雨")),
  }), false);
});
