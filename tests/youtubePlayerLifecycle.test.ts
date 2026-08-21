import assert from "node:assert/strict";
import test from "node:test";
import {
  YOUTUBE_API_READY_TIMEOUT_MS,
  resolveYouTubePlaybackFallback,
  youtubePlayerErrorMessage,
} from "../src/lib/youtubePlayerLifecycle";

test("YouTube readiness timeout is bounded", () => {
  assert.ok(YOUTUBE_API_READY_TIMEOUT_MS >= 8_000);
  assert.ok(YOUTUBE_API_READY_TIMEOUT_MS <= 20_000);
});

test("embedded playback advances at most once and only when a next result exists", () => {
  assert.equal(resolveYouTubePlaybackFallback({ currentIndex: 0, trackCount: 5, fallbackAttempted: false }), 1);
  assert.equal(resolveYouTubePlaybackFallback({ currentIndex: 1, trackCount: 5, fallbackAttempted: true }), null);
  assert.equal(resolveYouTubePlaybackFallback({ currentIndex: 4, trackCount: 5, fallbackAttempted: false }), null);
  assert.equal(resolveYouTubePlaybackFallback({ currentIndex: -1, trackCount: 5, fallbackAttempted: false }), 0);
});

test("known YouTube embed failures have specific user-facing explanations", () => {
  assert.match(youtubePlayerErrorMessage(100), /删除|私密/);
  assert.match(youtubePlayerErrorMessage(101), /内嵌/);
  assert.match(youtubePlayerErrorMessage(150), /内嵌/);
  assert.match(youtubePlayerErrorMessage(5), /浏览器/);
});

