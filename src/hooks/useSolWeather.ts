import { useCallback, useEffect, useRef, useState } from "react";
import type { CompanionState } from "../../shared/companion";
import type { SolEmotionalState } from "../../shared/solEmotion";
import {
  SOL_WEATHER_LABELS,
  applySolWeatherCommand,
  createSolWeatherState,
  parseSolWeatherCommand,
  selectEmotionalWeather,
  selectSolEmotionalWeather,
  setSolWeatherMode,
  shouldAutonomouslyChangeWeather,
  type SolWeatherCommand,
  type SolWeatherMode,
  type SolWeatherState,
} from "../../shared/weather";

type UseSolWeatherOptions = {
  companion: CompanionState;
  emotion: SolEmotionalState;
  doNotDisturb: boolean;
  overlayOpen: boolean;
  busy: boolean;
  studioActive: boolean;
  onManualChange?: () => void;
};

export type WeatherCommandResult = {
  handled: boolean;
  message: string;
  focusMode?: boolean;
};

export type UseSolWeatherResult = {
  state: SolWeatherState;
  setMode: (mode: SolWeatherMode) => void;
  setIntensity: (value: number) => void;
  setWind: (value: number) => void;
  setAutonomyEnabled: (value: boolean) => void;
  setLocked: (value: boolean) => void;
  stopRain: () => void;
  reset: () => void;
  executeText: (text: string) => WeatherCommandResult;
};

function describeCommand(command: SolWeatherCommand, state: SolWeatherState) {
  switch (command.action) {
    case "weather.setMode":
      return command.mode === "clear"
        ? "好呀，我让雨慢慢停下。最后几滴会化成萤火，回到我身边。"
        : `好呀，${SOL_WEATHER_LABELS[command.mode]}来了。你可以不用说话，和我一起待在这里。`;
    case "weather.adjustIntensity":
      return command.delta > 0 ? "我让雨势更清晰了一点。" : "我把雨声放轻了一点。";
    case "weather.adjustWind":
      return command.delta > 0 ? "风正轻轻往右走。" : "风正轻轻往左走。";
    case "weather.setAutonomy":
      return command.value ? "天气交给我吧，我会跟着心情轻轻变化。" : "好，天气暂时由你决定。";
    case "weather.setLocked":
      return command.value ? "我会保持现在的天气。" : "天气已经解锁，我又可以悄悄改变天空了。";
    case "weather.setImmersion":
      return command.value
        ? `来吧，我们进入${SOL_WEATHER_LABELS[state.mode === "clear" ? "rain" : state.mode]}里。`
        : "我们回到工作室，雨还会继续陪着你。";
  }
}

export function useSolWeather({
  companion,
  emotion,
  doNotDisturb,
  overlayOpen,
  busy,
  studioActive,
  onManualChange,
}: UseSolWeatherOptions): UseSolWeatherResult {
  const [state, setState] = useState<SolWeatherState>(() => createSolWeatherState());
  const companionRef = useRef(companion);
  const emotionRef = useRef(emotion);
  const stateRef = useRef(state);
  const guardRef = useRef({ doNotDisturb, overlayOpen, busy, studioActive });

  companionRef.current = companion;
  emotionRef.current = emotion;
  stateRef.current = state;
  guardRef.current = { doNotDisturb, overlayOpen, busy, studioActive };

  const mutate = useCallback((command: SolWeatherCommand) => {
    onManualChange?.();
    setState((current) => applySolWeatherCommand(current, command));
  }, [onManualChange]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const current = stateRef.current;
      const guard = guardRef.current;
      const now = Date.now();
      if (!shouldAutonomouslyChangeWeather({
        state: current,
        now,
        cooldownMs: 210_000,
        ...guard,
      })) return;

      const nextMode = emotionRef.current
        ? selectSolEmotionalWeather(emotionRef.current)
        : selectEmotionalWeather(companionRef.current);
      if (nextMode === current.mode) {
        setState((value) => ({ ...value, lastChangedAt: now }));
        return;
      }
      setState((value) => setSolWeatherMode(value, nextMode, now));
    }, 7_000);
    return () => window.clearInterval(interval);
  }, []);

  const setMode = useCallback((mode: SolWeatherMode) => mutate({ action: "weather.setMode", mode }), [mutate]);
  const setIntensity = useCallback((value: number) => {
    onManualChange?.();
    setState((current) => ({ ...current, intensity: Math.min(1, Math.max(0, value)), lastChangedAt: Date.now() }));
  }, [onManualChange]);
  const setWind = useCallback((value: number) => {
    onManualChange?.();
    setState((current) => ({ ...current, wind: Math.min(1, Math.max(-1, value)), lastChangedAt: Date.now() }));
  }, [onManualChange]);
  const setAutonomyEnabled = useCallback((value: boolean) => mutate({ action: "weather.setAutonomy", value }), [mutate]);
  const setLocked = useCallback((value: boolean) => mutate({ action: "weather.setLocked", value }), [mutate]);
  const stopRain = useCallback(() => setMode("clear"), [setMode]);
  const reset = useCallback(() => setState(createSolWeatherState()), []);

  const executeText = useCallback((text: string): WeatherCommandResult => {
    const command = parseSolWeatherCommand(text);
    if (!command) return { handled: false, message: "" };
    onManualChange?.();
    const before = stateRef.current;
    const next = applySolWeatherCommand(before, command);
    setState(next);
    return {
      handled: true,
      message: describeCommand(command, next),
      ...(command.action === "weather.setImmersion" ? { focusMode: command.value } : {}),
    };
  }, [onManualChange]);

  return {
    state,
    setMode,
    setIntensity,
    setWind,
    setAutonomyEnabled,
    setLocked,
    stopRain,
    reset,
    executeText,
  };
}
