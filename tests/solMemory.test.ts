import test from "node:test";
import assert from "node:assert/strict";
import {
  SOL_MEMORY_CONTEXT_LIMIT,
  buildSolMemoryContext,
  createExplicitMemoryCandidate,
  createSolMemory,
  findDuplicateMemory,
  getMemoryResonanceVisual,
  getMemoryStarPosition,
  getSensitiveMemoryReason,
  inferImplicitMemoryCandidate,
  parseSolMemoryArchive,
  parseSolMemoryCommand,
  sanitizeSolMemory,
  sanitizeSolMemoryCandidate,
  sanitizeSolMemoryStore,
  selectRelevantMemories,
  type SolMemory,
} from "../shared/solMemory";
import { createSolEmotionalState, reduceSolEmotion } from "../shared/solEmotion";
import { shouldCreateEvolutionNodeForTurn } from "../src/lib/stagePresentation";

const makeMemory = (
  summary: string,
  id: string,
  patch: Partial<SolMemory> = {},
) => {
  const candidate = createExplicitMemoryCandidate(`记住${summary}`);
  assert.ok(candidate);
  const memory = createSolMemory(candidate, "explicit", 1_700_000_000_000, id);
  assert.ok(memory);
  return sanitizeSolMemory({ ...memory, ...patch }) as SolMemory;
};

test("memory candidates are length-bounded, clamped, and sanitized", () => {
  const candidate = sanitizeSolMemoryCandidate({
    category: "invalid",
    tone: "invalid",
    title: "星".repeat(80),
    summary: "你喜欢安静的雨天。".repeat(30),
    tags: ["雨天", "雨天", "很长的标签".repeat(10)],
    importance: 9,
    confidence: -4,
  });
  assert.ok(candidate);
  assert.equal(candidate.title.length, 28);
  assert.equal(candidate.summary.length, 120);
  assert.equal(candidate.importance, 1);
  assert.equal(candidate.confidence, 0);
  assert.deepEqual(candidate.tags, ["雨天", "很长的标签很长的标签很长"]);
});

test("invalid persisted memory safely falls back without crashing", () => {
  const store = sanitizeSolMemoryStore({ enabled: "no", memories: [null, { id: "broken" }] });
  assert.equal(store.enabled, true);
  assert.deepEqual(store.memories, []);
});

test("explicit memory stores a semantic summary instead of the command text", () => {
  const candidate = createExplicitMemoryCandidate("请记住我喜欢雨天和蓝色");
  assert.ok(candidate);
  assert.equal(candidate.summary, "你喜欢雨天和蓝色。");
  assert.equal(candidate.summary.includes("请记住"), false);
});

test("secret-like content is rejected", () => {
  assert.match(getSensitiveMemoryReason("记住我的密码是 abc123"), /密码/);
  assert.match(getSensitiveMemoryReason("记住 API Key 是 sk-abcdefghijklmnopqrstuvwxyz"), /密钥/);
  assert.equal(createExplicitMemoryCandidate("记住我的密码是 abc123"), null);
});

test("explicit local memory commands are deterministic", () => {
  assert.deepEqual(parseSolMemoryCommand("打开记忆星图"), { action: "open" });
  assert.equal(parseSolMemoryCommand("记住我喜欢蓝色")?.action, "remember");
  assert.deepEqual(parseSolMemoryCommand("不要记这个"), { action: "cancel_candidate" });
  assert.equal(parseSolMemoryCommand("播放周杰伦的晴天"), null);
  assert.equal(parseSolMemoryCommand("搜索下雨天的歌"), null);
});

test("forget and clear requests are routed for confirmation rather than direct deletion", () => {
  assert.deepEqual(parseSolMemoryCommand("忘掉我喜欢蓝色这件事"), { action: "forget", query: "我喜欢蓝色" });
  assert.deepEqual(parseSolMemoryCommand("清空所有记忆"), { action: "clear" });
});

test("implicit suggestions only recognize stable statements", () => {
  assert.ok(inferImplicitMemoryCandidate("我喜欢安静的雨天"));
  assert.equal(inferImplicitMemoryCandidate("我今天有点难过"), null);
  assert.equal(inferImplicitMemoryCandidate("你喜欢雨天吗？"), null);
});

test("duplicate memories are detected without creating a second star", () => {
  const memory = makeMemory("我喜欢雨天和蓝色", "rain-blue");
  const candidate = createExplicitMemoryCandidate("记住我喜欢雨天和蓝色");
  assert.ok(candidate);
  assert.equal(findDuplicateMemory(candidate, [memory])?.id, memory.id);
});

test("only confirmed relevant memories are selected and generic greetings inject nothing", () => {
  const preference = makeMemory("我喜欢蓝色和雨天", "preference");
  const music = makeMemory("我喜欢周杰伦的音乐", "music");
  const unconfirmed = { ...preference, id: "draft", confirmed: false };
  const restored = [preference, music, unconfirmed]
    .map(sanitizeSolMemory)
    .filter((item): item is SolMemory => Boolean(item));
  assert.equal(restored.some((item) => item.id === "draft"), false);
  assert.deepEqual(selectRelevantMemories("你好", restored), []);
  assert.equal(selectRelevantMemories("你记得我喜欢什么吗", restored).length, 2);
});

test("pinned relevant memories rank ahead without making irrelevant memories eligible", () => {
  const blue = makeMemory("我喜欢蓝色", "blue", { pinned: true, importance: 0.4 });
  const rain = makeMemory("我喜欢雨天", "rain", { importance: 0.9 });
  const place = makeMemory("我喜欢去海边旅行", "place", { pinned: true });
  const selected = selectRelevantMemories("你记得我喜欢蓝色吗", [rain, place, blue]);
  assert.equal(selected[0]?.id, "blue");
  assert.equal(selected.some((item) => item.id === "place"), false);
});

test("memory context is capped at three entries and a bounded serialized size", () => {
  const memories = Array.from({ length: 8 }, (_, index) => makeMemory(`我喜欢蓝色风格${index}`, `memory-${index}`));
  const context = buildSolMemoryContext("你记得我喜欢什么吗", memories);
  assert.ok(context.length <= 3);
  assert.ok(JSON.stringify(context).length <= SOL_MEMORY_CONTEXT_LIMIT + 2);
});

test("deterministic star positions remain stable and in bounds", () => {
  const memory = makeMemory("我喜欢雨天", "stable-star");
  const first = getMemoryStarPosition(memory);
  const second = getMemoryStarPosition(memory);
  assert.deepEqual(first, second);
  assert.ok(first.x >= 0.06 && first.x <= 0.94);
  assert.ok(first.y >= 0.1 && first.y <= 0.9);
  assert.equal(Number.isFinite(first.x) && Number.isFinite(first.y), true);
});

test("memory archives reject malformed roots and sanitize valid imports", () => {
  assert.equal(parseSolMemoryArchive({ wrong: [] }), null);
  const memory = makeMemory("我喜欢雨天", "archive-star");
  assert.equal(parseSolMemoryArchive({ version: 99, enabled: true, memories: [memory] })?.memories.length, 1);
});

test("reduced motion preserves glow while strongly attenuating resonance displacement", () => {
  const regular = getMemoryResonanceVisual(false);
  const reduced = getMemoryResonanceVisual(true);
  assert.ok(reduced.displacement <= regular.displacement * 0.2);
  assert.ok(reduced.glow > 0.5);
});

test("memory removal is emotionally neutral and local memory commands never evolve the world", () => {
  const initial = createSolEmotionalState(1_000);
  const removed = reduceSolEmotion(initial, { type: "MEMORY_REMOVED", now: 2_000 });
  assert.equal(removed.valence, initial.valence);
  assert.equal(removed.warmth, initial.warmth);
  assert.equal(shouldCreateEvolutionNodeForTurn({
    localMusicHandled: false,
    localPresenceHandled: false,
    localWeatherHandled: false,
    localMemoryHandled: true,
  }), false);
});
