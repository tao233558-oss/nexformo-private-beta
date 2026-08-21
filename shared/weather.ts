import type { CompanionMood, CompanionState } from "./companion";
import type { SolEmotionalState, SolMood } from "./solEmotion";

export const SOL_WEATHER_MODES = [
  "clear",
  "drizzle",
  "rain",
  "heavy_rain",
  "star_rain",
] as const;

export type SolWeatherMode = (typeof SOL_WEATHER_MODES)[number];
export type SolWeatherTransition = "settled" | "weather_change" | "rain_to_fireflies";

export type SolWeatherState = {
  mode: SolWeatherMode;
  previousMode: SolWeatherMode;
  intensity: number;
  wind: number;
  rippleStrength: number;
  autonomyEnabled: boolean;
  locked: boolean;
  transition: SolWeatherTransition;
  transitionStartedAt: number;
  transitionDurationMs: number;
  lastChangedAt: number;
};

export type SolWeatherCommand =
  | { action: "weather.setMode"; mode: SolWeatherMode }
  | { action: "weather.adjustIntensity"; delta: number }
  | { action: "weather.adjustWind"; delta: number }
  | { action: "weather.setAutonomy"; value: boolean }
  | { action: "weather.setLocked"; value: boolean }
  | { action: "weather.setImmersion"; value: boolean };

export type SolWeatherVisualState = {
  rainDensity: number;
  rainSpeed: number;
  rainBrightness: number;
  fireflyMix: number;
  clearMix: number;
};

export const SOL_WEATHER_LABELS: Record<SolWeatherMode, string> = {
  clear: "晴空",
  drizzle: "细雨",
  rain: "雨幕",
  heavy_rain: "骤雨",
  star_rain: "星雨",
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const clampWind = (value: number) => Math.min(1, Math.max(-1, value));

export function isRainWeather(mode: SolWeatherMode) {
  return mode === "drizzle" || mode === "rain" || mode === "heavy_rain" || mode === "star_rain";
}

export function getWeatherPreset(mode: SolWeatherMode) {
  switch (mode) {
    case "drizzle":
      return { intensity: 0.3, wind: 0.06 };
    case "rain":
      return { intensity: 0.62, wind: 0.14 };
    case "heavy_rain":
      return { intensity: 0.96, wind: 0.46 };
    case "star_rain":
      return { intensity: 0.48, wind: 0.04 };
    default:
      return { intensity: 0, wind: 0 };
  }
}

export function createSolWeatherState(now = Date.now()): SolWeatherState {
  return {
    mode: "clear",
    previousMode: "clear",
    ...getWeatherPreset("clear"),
    rippleStrength: 0.58,
    autonomyEnabled: true,
    locked: false,
    transition: "settled",
    transitionStartedAt: now,
    transitionDurationMs: 2200,
    lastChangedAt: now,
  };
}

export function normalizeSolWeatherState(state: SolWeatherState): SolWeatherState {
  return {
    ...state,
    intensity: clamp01(state.intensity),
    wind: clampWind(state.wind),
    rippleStrength: clamp01(state.rippleStrength),
    transitionDurationMs: Math.max(400, state.transitionDurationMs),
  };
}

export function setSolWeatherMode(
  state: SolWeatherState,
  mode: SolWeatherMode,
  now = Date.now(),
): SolWeatherState {
  if (state.mode === mode && state.transition === "settled") return state;
  const stoppingRain = isRainWeather(state.mode) && !isRainWeather(mode);
  return normalizeSolWeatherState({
    ...state,
    previousMode: state.mode,
    mode,
    ...getWeatherPreset(mode),
    transition: stoppingRain ? "rain_to_fireflies" : "weather_change",
    transitionStartedAt: now,
    transitionDurationMs: stoppingRain ? 4200 : 2400,
    lastChangedAt: now,
  });
}

export function parseSolWeatherCommand(raw: string): SolWeatherCommand | null {
  const text = raw.trim().toLowerCase().replace(/\s+/g, "");
  if (!text) return null;
  // Song titles frequently contain weather words (for example “晴天” and “下雨”).
  // Keep explicit music/search requests available for the music router that runs next.
  if (/^(?:播放|搜索|搜一下|找一首|找首|听|来一首|放一首|play|search)/i.test(text)) {
    return null;
  }

  if (/^(进入雨中|进入雨景|沉浸雨景|让我进入雨中|雨中沉浸)$/.test(text)) {
    return { action: "weather.setImmersion", value: true };
  }
  if (/^(退出雨中|退出雨景|退出沉浸雨景|离开雨中)$/.test(text)) {
    return { action: "weather.setImmersion", value: false };
  }
  if (/^(停止下雨|停雨|雨停了|让雨停下|关闭雨景|不要下雨)$/.test(text)) {
    return { action: "weather.setMode", mode: "clear" };
  }
  if (/^(天气自主|自主天气|让sol决定天气|天气自动)$/.test(text)) {
    return { action: "weather.setAutonomy", value: true };
  }
  if (/^(关闭天气自主|天气不要自主|手动天气)$/.test(text)) {
    return { action: "weather.setAutonomy", value: false };
  }
  if (/^(锁定天气|保持这个天气|别改变天气)$/.test(text)) {
    return { action: "weather.setLocked", value: true };
  }
  if (/^(解锁天气|允许天气变化|解除天气锁定)$/.test(text)) {
    return { action: "weather.setLocked", value: false };
  }
  if (/(暴雨|大雨|骤雨|雨下大一点|雨再大一点)/.test(text)) {
    return { action: "weather.setMode", mode: "heavy_rain" };
  }
  if (/(星雨|流星雨|萤火雨|梦幻的雨)/.test(text)) {
    return { action: "weather.setMode", mode: "star_rain" };
  }
  if (/(毛毛雨|细雨|小雨|下点小雨)/.test(text)) {
    return { action: "weather.setMode", mode: "drizzle" };
  }
  if (/(下雨|下一场雨|雨幕|雨天|来场雨)/.test(text)) {
    return { action: "weather.setMode", mode: "rain" };
  }
  if (/(晴天|晴空|清空天气|天气放晴)/.test(text)) {
    return { action: "weather.setMode", mode: "clear" };
  }
  if (/(雨更密|雨大一点|增强雨势|天气强一点)/.test(text)) {
    return { action: "weather.adjustIntensity", delta: 0.16 };
  }
  if (/(雨更稀|雨小一点|减弱雨势|天气弱一点)/.test(text)) {
    return { action: "weather.adjustIntensity", delta: -0.16 };
  }
  if (/(往左吹|左风|风向左)/.test(text)) {
    return { action: "weather.adjustWind", delta: -0.22 };
  }
  if (/(往右吹|右风|风向右)/.test(text)) {
    return { action: "weather.adjustWind", delta: 0.22 };
  }
  return null;
}

export function applySolWeatherCommand(
  state: SolWeatherState,
  command: SolWeatherCommand,
  now = Date.now(),
): SolWeatherState {
  switch (command.action) {
    case "weather.setMode":
      return setSolWeatherMode(state, command.mode, now);
    case "weather.adjustIntensity":
      return normalizeSolWeatherState({ ...state, intensity: state.intensity + command.delta, lastChangedAt: now });
    case "weather.adjustWind":
      return normalizeSolWeatherState({ ...state, wind: state.wind + command.delta, lastChangedAt: now });
    case "weather.setAutonomy":
      return { ...state, autonomyEnabled: command.value, lastChangedAt: now };
    case "weather.setLocked":
      return { ...state, locked: command.value, lastChangedAt: now };
    case "weather.setImmersion":
      return command.value && state.mode === "clear" ? setSolWeatherMode(state, "rain", now) : state;
  }
}

export function getSolWeatherTransitionProgress(state: SolWeatherState, now = Date.now()) {
  if (state.transition === "settled") return 1;
  const linear = clamp01((now - state.transitionStartedAt) / state.transitionDurationMs);
  return linear * linear * (3 - 2 * linear);
}

export function getSolWeatherVisualState(
  state: SolWeatherState,
  now = Date.now(),
  reducedMotion = false,
): SolWeatherVisualState {
  const progress = getSolWeatherTransitionProgress(state, now);
  const targetRain = isRainWeather(state.mode) ? state.intensity : 0;
  const sourceRain = isRainWeather(state.previousMode) ? Math.max(state.intensity, getWeatherPreset(state.previousMode).intensity) : 0;
  const rainDensity = state.transition === "rain_to_fireflies"
    ? sourceRain * (1 - progress)
    : sourceRain + (targetRain - sourceRain) * progress;
  const starBoost = state.mode === "star_rain" ? 0.24 : 0;
  return {
    rainDensity: clamp01(rainDensity) * (reducedMotion ? 0.34 : 1),
    rainSpeed: (0.46 + state.intensity * 1.12) * (reducedMotion ? 0.26 : 1),
    rainBrightness: clamp01(0.46 + state.intensity * 0.42 + starBoost),
    fireflyMix: state.transition === "rain_to_fireflies" ? Math.sin(progress * Math.PI) : 0,
    clearMix: isRainWeather(state.mode) ? 0 : progress,
  };
}

const MOOD_WEATHER: Record<CompanionMood, SolWeatherMode> = {
  serene: "clear",
  curious: "star_rain",
  joyful: "star_rain",
  tender: "drizzle",
  melancholy: "rain",
  tense: "rain",
  playful: "star_rain",
  awe: "star_rain",
};

export function selectEmotionalWeather(companion: CompanionState): SolWeatherMode {
  if (companion.energy < 0.26 && companion.valence > 0.35) return "clear";
  if (companion.arousal > 0.82 && companion.valence < 0.38) return "rain";
  return MOOD_WEATHER[companion.primaryMood];
}

const SOL_EMOTION_WEATHER: Record<SolMood, SolWeatherMode> = {
  calm: "clear",
  joyful: "star_rain",
  shy: "drizzle",
  curious: "star_rain",
  tender: "drizzle",
  concerned: "rain",
  lonely: "drizzle",
  tired: "clear",
};

export function selectSolEmotionalWeather(emotion: SolEmotionalState): SolWeatherMode {
  if (emotion.energy < 0.28 && emotion.valence > 0.42) return "clear";
  return SOL_EMOTION_WEATHER[emotion.primaryMood];
}

export function shouldAutonomouslyChangeWeather(input: {
  state: SolWeatherState;
  now: number;
  cooldownMs: number;
  doNotDisturb: boolean;
  overlayOpen: boolean;
  busy: boolean;
  studioActive: boolean;
}) {
  return Boolean(
    input.studioActive &&
      input.state.autonomyEnabled &&
      !input.state.locked &&
      !input.doNotDisturb &&
      !input.overlayOpen &&
      !input.busy &&
      input.now - input.state.lastChangedAt >= input.cooldownMs,
  );
}
