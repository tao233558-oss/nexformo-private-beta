import type { VoiceActivity } from "../../shared/companion";

export const RAINFORM_AUDIO_STORAGE_KEY = "nexformo.rainform.audio.v1";
export const RAINFORM_BRIDGE_CHANNEL = "nexformo.rainform.v1";

export type RainformAudioPreference = {
  volume: number;
};

export type RainformVoiceState =
  | "idle"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"
  | "error";

export type RainformBridgeMessage = {
  channel: typeof RAINFORM_BRIDGE_CHANNEL;
  type: string;
  [key: string]: unknown;
};

export function clampRainformVolume(value: unknown, fallback = 0.45) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return Math.min(1, Math.max(0, fallback));
  return Math.min(1, Math.max(0, parsed));
}

export function parseRainformAudioPreference(raw: string | null): RainformAudioPreference {
  if (!raw) return { volume: 0.45 };
  try {
    const parsed = JSON.parse(raw) as { volume?: unknown };
    return { volume: clampRainformVolume(parsed.volume) };
  } catch {
    return { volume: 0.45 };
  }
}

export function minuteOfDay(hours: number, minutes: number) {
  const safeHours = Math.min(24, Math.max(0, Number.isFinite(hours) ? hours : 0));
  const safeMinutes = Math.min(59, Math.max(0, Number.isFinite(minutes) ? minutes : 0));
  return Math.min(1440, safeHours * 60 + safeMinutes);
}

export function rainformTimelineRatio(minutes: number) {
  return Math.min(1, Math.max(0, minutes / 1440));
}

export function interpolateRainfallAtMinute(values: readonly number[], minutes: number) {
  if (values.length === 0) return 0;
  if (values.length === 1) return Number.isFinite(values[0]) ? values[0] : 0;
  const ratio = rainformTimelineRatio(minutes);
  const scaled = ratio * (values.length - 1);
  const leftIndex = Math.min(values.length - 1, Math.floor(scaled));
  const rightIndex = Math.min(values.length - 1, leftIndex + 1);
  const left = Number.isFinite(values[leftIndex]) ? values[leftIndex] : 0;
  const right = Number.isFinite(values[rightIndex]) ? values[rightIndex] : left;
  return left + (right - left) * (scaled - leftIndex);
}

export function formatClockTime(hours: number, minutes: number) {
  return `${String(Math.min(23, Math.max(0, Math.floor(hours)))).padStart(2, "0")}:${String(
    Math.min(59, Math.max(0, Math.floor(minutes))),
  ).padStart(2, "0")}`;
}

export function rainformDuckFactor(activity: VoiceActivity) {
  if (activity === "speaking" || activity === "singing") return 0.14;
  if (["connecting", "listening", "thinking", "ready"].includes(activity)) return 0.08;
  return 1;
}

export function rainformVoiceState(activity: VoiceActivity, open: boolean): RainformVoiceState {
  if (!open) return "idle";
  if (activity === "connecting") return "connecting";
  if (activity === "ready" || activity === "listening") return "listening";
  if (activity === "thinking") return "thinking";
  if (activity === "speaking" || activity === "singing") return "speaking";
  if (["permission-denied", "unavailable", "error"].includes(activity)) return "error";
  return "idle";
}

export function nextRainformEscapeTarget(voiceOpen: boolean, rainformOpen: boolean) {
  if (voiceOpen) return "voice" as const;
  if (rainformOpen) return "rainform" as const;
  return "none" as const;
}

export function isRainformBridgeMessage(value: unknown): value is RainformBridgeMessage {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { channel?: unknown; type?: unknown };
  return candidate.channel === RAINFORM_BRIDGE_CHANNEL && typeof candidate.type === "string";
}

export function isRainformForecastBridgePayload(value: unknown) {
  if (!value || typeof value !== "object") return false;
  const candidate = value as {
    status?: unknown;
    locationLabel?: unknown;
    conditionLabel?: unknown;
    day?: Record<string, unknown>;
  };
  if (candidate.status !== "live" && candidate.status !== "stale") return false;
  if (typeof candidate.locationLabel !== "string" || candidate.locationLabel.length > 160) return false;
  if (typeof candidate.conditionLabel !== "string" || candidate.conditionLabel.length > 80) return false;
  const day = candidate.day;
  if (!day || typeof day !== "object") return false;
  if (typeof day.timezone !== "string" || typeof day.timeLabel !== "string") return false;
  const timelineHour = Number(day.timelineHour);
  if (!Number.isFinite(timelineHour) || timelineHour < 0 || timelineHour > 24) return false;
  const validateSeries = (series: unknown, maximum: number) => Array.isArray(series)
    && series.length === 25
    && series.every((item) => item === null || (typeof item === "number" && Number.isFinite(item) && item >= 0 && item <= maximum));
  return validateSeries(day.values, 500)
    && validateSeries(day.probabilities, 100)
    && Array.isArray(day.availableHours)
    && day.availableHours.length === 25
    && day.availableHours.every((item) => typeof item === "boolean");
}
