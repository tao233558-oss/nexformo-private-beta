import assert from "node:assert/strict";
import test from "node:test";
import {
  RAINFORM_BRIDGE_CHANNEL,
  clampRainformVolume,
  formatClockTime,
  interpolateRainfallAtMinute,
  isRainformBridgeMessage,
  isRainformForecastBridgePayload,
  minuteOfDay,
  nextRainformEscapeTarget,
  parseRainformAudioPreference,
  rainformDuckFactor,
  rainformTimelineRatio,
  rainformVoiceState,
} from "../src/lib/rainformControls";

test("local clock maps deterministically onto the 00:00-24:00 timeline", () => {
  assert.equal(minuteOfDay(0, 0), 0);
  assert.equal(minuteOfDay(12, 30), 750);
  assert.equal(rainformTimelineRatio(750), 750 / 1440);
  assert.equal(rainformTimelineRatio(1440), 1);
  assert.equal(formatClockTime(7, 5), "07:05");
});

test("current rainfall interpolates between adjacent hourly samples", () => {
  const values = Array.from({ length: 25 }, (_, hour) => hour * 2);
  assert.equal(interpolateRainfallAtMinute(values, minuteOfDay(8, 0)), 16);
  assert.equal(interpolateRainfallAtMinute(values, minuteOfDay(8, 30)), 17);
  assert.equal(interpolateRainfallAtMinute(values, minuteOfDay(24, 0)), 48);
});

test("rain audio preference is bounded and corrupted storage is harmless", () => {
  assert.equal(clampRainformVolume(1.4), 1);
  assert.equal(clampRainformVolume(-0.2), 0);
  assert.deepEqual(parseRainformAudioPreference('{"volume":0.72}'), { volume: 0.72 });
  assert.deepEqual(parseRainformAudioPreference("not-json"), { volume: 0.45 });
});

test("voice presentation and ducking keep one predictable state machine", () => {
  assert.equal(rainformVoiceState("ready", true), "listening");
  assert.equal(rainformVoiceState("speaking", true), "speaking");
  assert.equal(rainformVoiceState("permission-denied", true), "error");
  assert.equal(rainformDuckFactor("listening"), 0.08);
  assert.equal(rainformDuckFactor("speaking"), 0.14);
  assert.equal(rainformDuckFactor("disabled"), 1);
});

test("Escape closes voice mode before the Rainform experience", () => {
  assert.equal(nextRainformEscapeTarget(true, true), "voice");
  assert.equal(nextRainformEscapeTarget(false, true), "rainform");
  assert.equal(nextRainformEscapeTarget(false, false), "none");
});

test("message bridge accepts only its namespaced message envelope", () => {
  assert.equal(isRainformBridgeMessage({ channel: RAINFORM_BRIDGE_CHANNEL, type: "rainform.ready" }), true);
  assert.equal(isRainformBridgeMessage({ channel: "other", type: "rainform.ready" }), false);
  assert.equal(isRainformBridgeMessage(null), false);
});

test("forecast bridge rejects malformed, oversized and out-of-range series", () => {
  const valid = {
    status: "live",
    locationLabel: "杭州 · 浙江",
    conditionLabel: "有雨",
    day: {
      timezone: "Asia/Shanghai",
      timeLabel: "12:30",
      timelineHour: 12.5,
      values: Array.from({ length: 25 }, (_, hour) => hour / 10),
      probabilities: Array.from({ length: 25 }, () => 60),
      availableHours: Array.from({ length: 25 }, () => true),
    },
  };
  assert.equal(isRainformForecastBridgePayload(valid), true);
  assert.equal(isRainformForecastBridgePayload({ ...valid, day: { ...valid.day, values: [1, 2] } }), false);
  assert.equal(isRainformForecastBridgePayload({
    ...valid,
    day: { ...valid.day, probabilities: [...valid.day.probabilities.slice(0, 24), 101] },
  }), false);
  assert.equal(isRainformForecastBridgePayload({ ...valid, status: "unknown" }), false);
});
