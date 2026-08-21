import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_MUSIC_PLAYBACK_STATE,
  calculateLyricAlignmentOffset,
  clampLyricsOffset,
  classifyMusicVersion,
  createLyricBindingKey,
  createLyricSelectionKey,
  findActiveLyricIndex,
  musicPlaybackReducer,
  nextMusicPlayerPresentation,
  normalizeYouTubeTitle,
  parseLrc,
  parseMusicCommand,
  resolveLyricDisplayState,
  scoreLyricsMatchDetailed,
  type MusicTrack,
} from "../shared/music";
import { DEFAULT_COMPANION_STATE } from "../shared/companion";
import {
  clampFloatingPosition,
  finalizeFloatingPlacement,
  floatingRect,
  floatingRectsOverlap,
  getDesktopReservedRects,
  restoreFloatingPosition,
  shouldBeginFloatingDrag,
  snapFloatingPosition,
} from "../src/lib/floatingWindow";
import {
  createStageReplyExcerpt,
  isStageReplyVisible,
  resolveStageContentPriority,
  shouldCreateEvolutionNodeForTurn,
} from "../src/lib/stagePresentation";
import {
  MusicRhythmController,
  sampleMusicRhythm,
  type MusicRhythmFrame,
  type MusicRhythmInput,
} from "../src/lib/musicRhythm";
import {
  DEFAULT_SOL_PREFERENCES,
  applySolConversationCue,
  applySolInteraction,
  createSolPresenceState,
  forceNextSolMotif,
  getSolMotifVisual,
  parseSolPresenceCommand,
  shouldAllowProactiveMessage,
  stepSolPresence,
} from "../src/lib/solPresenceController";

const TRACKS: MusicTrack[] = [
  {
    videoId: "first-track",
    title: "合成晴光",
    artist: "测试歌手甲",
    thumbnail: "https://example.com/first.jpg",
    durationSeconds: 269,
    provider: "youtube",
    version: "studio",
  },
  {
    videoId: "second-track",
    title: "虚构夜航",
    artist: "测试歌手乙",
    thumbnail: "https://example.com/second.jpg",
    durationSeconds: 226,
    provider: "youtube",
    version: "studio",
  },
];

const assertBounded = (frame: MusicRhythmFrame, maximum = 1) => {
  for (const value of Object.values(frame)) {
    assert.ok(value >= 0, `expected ${value} to be non-negative`);
    assert.ok(value <= maximum, `expected ${value} to be at most ${maximum}`);
  }
};

test("parses deterministic Chinese music, volume, selection, and lyric commands", () => {
  assert.deepEqual(parseMusicCommand("Sol，播放测试歌手的合成晴光"), {
    action: "music.search",
    query: "测试歌手的合成晴光",
    autoplay: true,
  });
  assert.deepEqual(parseMusicCommand("搜索测试歌手的合成晴光"), {
    action: "music.search",
    query: "测试歌手的合成晴光",
    autoplay: false,
  });
  assert.deepEqual(parseMusicCommand("播放第二首"), {
    action: "music.select",
    index: 1,
  });
  assert.deepEqual(parseMusicCommand("暂停"), { action: "music.pause" });
  assert.deepEqual(parseMusicCommand("音量调到百分之三十"), {
    action: "music.setVolume",
    volume: 30,
  });
  assert.deepEqual(parseMusicCommand("歌词慢一点"), {
    action: "lyrics.setOffset",
    deltaSeconds: -0.5,
  });
  assert.deepEqual(parseMusicCommand("收起播放器"), {
    action: "player.setPresentation",
    presentation: "compact",
  });
  assert.deepEqual(parseMusicCommand("关闭播放器"), {
    action: "player.setPresentation",
    presentation: "closed",
  });
});

test("player presentation transitions preserve a reopenable compact state", () => {
  assert.equal(nextMusicPlayerPresentation("expanded", "compact", true), "compact");
  assert.equal(nextMusicPlayerPresentation("compact", "closed", true), "closed");
  assert.equal(nextMusicPlayerPresentation("closed", "expanded", true), "expanded");
  assert.equal(nextMusicPlayerPresentation("closed", "expanded", false), "closed");
});

test("normalizes common YouTube edition suffixes and HTML entities", () => {
  assert.equal(normalizeYouTubeTitle("测试歌手 - 合成晴光（Official MV）"), "测试歌手 - 合成晴光");
  assert.equal(normalizeYouTubeTitle("A &amp; B [Official Audio]"), "A & B");
  assert.equal(normalizeYouTubeTitle("虚构夜航 - 歌词版"), "虚构夜航");
});

test("classifies Chinese and English music version markers before title cleanup", () => {
  assert.equal(classifyMusicVersion("Synthetic Sky (Official Music Video)"), "music_video");
  assert.equal(classifyMusicVersion("Synthetic Sky 官方音频"), "official_audio");
  assert.equal(classifyMusicVersion("Synthetic Sky 歌词版"), "lyric_video");
  assert.equal(classifyMusicVersion("Synthetic Sky 演唱会现场"), "live");
  assert.equal(classifyMusicVersion("Synthetic Sky 翻唱 Cover"), "cover");
  assert.equal(classifyMusicVersion("Synthetic Sky Slowed"), "slowed");
  assert.equal(classifyMusicVersion("Synthetic Sky", "Artist - Topic"), "official_audio");
});

test("lyric matching rejects incompatible live, cover, and large-duration variants", () => {
  const exact = scoreLyricsMatchDetailed(
    {
      id: 12,
      trackName: "Synthetic Sky",
      artistName: "Test Artist",
      albumName: "Studio Collection",
      duration: 180,
      syncedLyrics: "[00:10.00]Synthetic line",
    },
    {
      track: "Synthetic Sky",
      artist: "Test Artist",
      durationSeconds: 180,
      requestedVersion: "studio",
    },
  );
  assert.equal(exact.rejected, false);
  assert.ok(exact.confidence >= 0.78);

  const liveMismatch = scoreLyricsMatchDetailed(
    {
      id: 13,
      trackName: "Synthetic Sky Live",
      artistName: "Test Artist",
      duration: 181,
      syncedLyrics: "[00:10.00]Synthetic line",
    },
    {
      track: "Synthetic Sky",
      artist: "Test Artist",
      durationSeconds: 180,
      requestedVersion: "studio",
    },
  );
  assert.equal(liveMismatch.rejected, true);

  const coverMismatch = scoreLyricsMatchDetailed(
    {
      id: 14,
      trackName: "Synthetic Sky Cover",
      artistName: "Different Artist",
      duration: 180,
      syncedLyrics: "[00:10.00]Synthetic line",
    },
    {
      track: "Synthetic Sky",
      artist: "Test Artist",
      durationSeconds: 180,
      requestedVersion: "studio",
    },
  );
  assert.equal(coverMismatch.rejected, true);

  const durationMismatch = scoreLyricsMatchDetailed(
    {
      id: 15,
      trackName: "Synthetic Sky",
      artistName: "Test Artist",
      duration: 245,
      syncedLyrics: "[00:10.00]Synthetic line",
    },
    {
      track: "Synthetic Sky",
      artist: "Test Artist",
      durationSeconds: 180,
      requestedVersion: "studio",
    },
  );
  assert.equal(durationMismatch.rejected, true);
  assert.equal(durationMismatch.confidence, 0);
});

test("parses synchronized LRC timestamps, offsets, duplicates, and ordering", () => {
  const lines = parseLrc([
    "[offset:500]",
    "[00:02.50]第二句",
    "[00:01.00][00:03.00]第一句",
    "[00:01.00]第一句",
    "[ar:测试歌手]",
  ].join("\r\n"));

  assert.deepEqual(lines, [
    { timeSeconds: 1.5, text: "第一句" },
    { timeSeconds: 3, text: "第二句" },
    { timeSeconds: 3.5, text: "第一句" },
  ]);
});

test("finds the active lyric line with positive and negative display offsets", () => {
  const lines = [
    { timeSeconds: 1, text: "一" },
    { timeSeconds: 2.5, text: "二" },
    { timeSeconds: 4, text: "三" },
  ];

  assert.equal(findActiveLyricIndex(lines, 0.5), -1);
  assert.equal(findActiveLyricIndex(lines, 2.2), 0);
  assert.equal(findActiveLyricIndex(lines, 2.2, 0.5), 1);
  assert.equal(findActiveLyricIndex(lines, 2.7, -0.5), 0);
  assert.equal(findActiveLyricIndex([], 10), -1);
});

test("lyric display states never reveal the first line before its timestamp", () => {
  const base = {
    loading: false,
    hasError: false,
    playbackStatus: "playing" as const,
    lyricKind: "synced" as const,
    requiresSelection: false,
    activeLyricIndex: -1,
  };
  assert.equal(resolveLyricDisplayState(base), "instrumental_intro");
  assert.equal(resolveLyricDisplayState({ ...base, activeLyricIndex: 0 }), "active");
  assert.equal(resolveLyricDisplayState({ ...base, playbackStatus: "paused" }), "paused");
  assert.equal(resolveLyricDisplayState({ ...base, playbackStatus: "error" }), "playback_error");
  assert.equal(
    resolveLyricDisplayState({ ...base, lyricKind: "none", requiresSelection: true }),
    "needs_selection",
  );
});

test("lyric alignment uses explicit bounded offsets and stable per-version keys", () => {
  assert.equal(calculateLyricAlignmentOffset(42, 10), 32);
  assert.equal(calculateLyricAlignmentOffset(200, 10), 90);
  assert.equal(calculateLyricAlignmentOffset(0, 200), -90);
  assert.equal(clampLyricsOffset(0.5), 0.5);
  assert.equal(clampLyricsOffset(Number.NaN), 0);

  const first = createLyricBindingKey("video/id", "lyrics:studio");
  const same = createLyricBindingKey("video/id", "lyrics:studio");
  const different = createLyricBindingKey("video/id", "lyrics:live");
  assert.equal(first, same);
  assert.notEqual(first, different);
  assert.notEqual(createLyricSelectionKey("video/id"), createLyricSelectionKey("other/video"));
});

test("music playback reducer follows queue, selection, confirmed status, and stop transitions", () => {
  const queued = musicPlaybackReducer(DEFAULT_MUSIC_PLAYBACK_STATE, {
    type: "queue",
    tracks: TRACKS,
  });
  assert.equal(queued.queue.tracks.length, 2);
  assert.equal(queued.currentTrack, null);

  const selected = musicPlaybackReducer(queued, { type: "select", index: 1 });
  assert.equal(selected.status, "loading");
  assert.equal(selected.currentTrack?.videoId, "second-track");
  assert.equal(selected.duration, 226);

  const playing = musicPlaybackReducer(selected, { type: "status", status: "playing" });
  const progressed = musicPlaybackReducer(playing, {
    type: "progress",
    currentTime: 12.5,
    duration: 225.8,
  });
  const louder = musicPlaybackReducer(progressed, { type: "volume", volume: 130 });
  assert.equal(louder.status, "playing");
  assert.equal(louder.currentTime, 12.5);
  assert.equal(louder.volume, 100);

  const stopped = musicPlaybackReducer(louder, { type: "stop" });
  assert.equal(stopped.status, "idle");
  assert.equal(stopped.currentTrack, null);
  assert.equal(stopped.currentTime, 0);
  assert.equal(stopped.volume, 100);
  assert.equal(stopped.queue.tracks.length, 2);
});

const rhythmInput: MusicRhythmInput = {
  trackId: "video-123",
  status: "playing",
  currentTime: 37.25,
  intensity: "high",
};

test("rhythm sampling is deterministic, seek-safe, and bounded", () => {
  const first = sampleMusicRhythm(rhythmInput);
  sampleMusicRhythm({ ...rhythmInput, currentTime: 123.4 });
  const afterSeekBack = sampleMusicRhythm(rhythmInput);

  assert.deepEqual(afterSeekBack, first);
  assertBounded(first);

  for (const currentTime of [0, 0.01, 1, 60, 3_600, Number.POSITIVE_INFINITY]) {
    assertBounded(sampleMusicRhythm({ ...rhythmInput, currentTime }));
  }
});

test("rhythm sampling requires confirmed playing state and respects intensity", () => {
  assert.deepEqual(
    sampleMusicRhythm({ ...rhythmInput, status: "paused" }),
    { pulse: 0, accent: 0, energy: 0, orbit: 0 },
  );
  assert.deepEqual(
    sampleMusicRhythm({ ...rhythmInput, intensity: "off" }),
    { pulse: 0, accent: 0, energy: 0, orbit: 0 },
  );
  assert.deepEqual(
    sampleMusicRhythm({ ...rhythmInput, trackId: null }),
    { pulse: 0, accent: 0, energy: 0, orbit: 0 },
  );

  const low = sampleMusicRhythm({ ...rhythmInput, intensity: "low" });
  const high = sampleMusicRhythm(rhythmInput);
  for (const key of Object.keys(high) as Array<keyof MusicRhythmFrame>) {
    assert.ok(low[key] <= high[key]);
  }
});

test("reduced motion strongly attenuates every rhythm channel", () => {
  const regular = sampleMusicRhythm(rhythmInput);
  const reduced = sampleMusicRhythm({ ...rhythmInput, reducedMotion: true });
  assertBounded(reduced, 0.18);
  for (const key of Object.keys(regular) as Array<keyof MusicRhythmFrame>) {
    assert.ok(reduced[key] <= regular[key]);
  }
});

test("MusicRhythmController smooths attack and decays monotonically on pause and stop", () => {
  const controller = new MusicRhythmController();
  let playing = controller.update(rhythmInput, 1 / 60);
  for (let index = 0; index < 20; index += 1) {
    playing = controller.update({ ...rhythmInput, currentTime: 37.25 + index / 60 }, 1 / 60);
  }
  assert.ok(playing.energy > 0);

  let previous = playing;
  for (let index = 0; index < 12; index += 1) {
    const next = controller.update({ ...rhythmInput, status: "paused" }, 0.1);
    for (const key of Object.keys(next) as Array<keyof MusicRhythmFrame>) {
      assert.ok(next[key] <= previous[key] + Number.EPSILON);
    }
    previous = next;
  }

  const beforeStop = controller.update(rhythmInput, 0.2);
  const stopped = controller.update(
    { ...rhythmInput, trackId: null, status: "idle" },
    0.1,
  );
  for (const key of Object.keys(stopped) as Array<keyof MusicRhythmFrame>) {
    assert.ok(stopped[key] <= beforeStop[key] + Number.EPSILON);
  }
  assertBounded(stopped);
});

test("Sol presence commands stay local and deterministic", () => {
  assert.deepEqual(parseSolPresenceCommand("换一个律动"), {
    action: "presence.nextMotif",
  });
  assert.deepEqual(parseSolPresenceCommand("不要主动说话"), {
    action: "presence.setDnd",
    value: true,
  });
  assert.deepEqual(parseSolPresenceCommand("锁定这个动作"), {
    action: "presence.setLocked",
    value: true,
  });
  assert.equal(parseSolPresenceCommand("变成爱心陪我听"), null);
});

test("removed aura commands no longer enter the local presence controller", () => {
  assert.equal(parseSolPresenceCommand("仙气一点"), null);
  assert.equal(parseSolPresenceCommand("让仙气在屏幕上游动"), null);
  assert.equal(parseSolPresenceCommand("锁定仙气巡游"), null);
});

test("Sol emotional values remain bounded and locked motifs do not switch", () => {
  const initial = createSolPresenceState(0);
  const context = {
    now: 120_000,
    companion: {
      ...DEFAULT_COMPANION_STATE,
      valence: 1,
      arousal: 1,
      trust: 1,
      connection: 1,
      energy: 1,
      curiosity: 1,
      primaryMood: "playful" as const,
    },
    musicStatus: "playing" as const,
    musicTrackId: "abcdefghijk",
    musicEnergy: 1,
    preferences: { ...DEFAULT_SOL_PREFERENCES },
  };
  let state = initial;
  for (let index = 0; index < 80; index += 1) {
    state = stepSolPresence(state, { ...context, now: context.now + index * 20_000 });
  }
  for (const key of ["valence", "arousal", "affection", "curiosity", "confidence", "playfulness", "calmness", "socialEnergy"] as const) {
    assert.ok(state[key] >= 0 && state[key] <= 1, `${key} should remain bounded`);
  }

  const locked = stepSolPresence(
    { ...state, currentMotif: "heartPulse", motifStartedAt: 0, userOverrideUntil: 0 },
    { ...context, now: 900_000, preferences: { ...DEFAULT_SOL_PREFERENCES, motifLocked: true } },
  );
  assert.equal(locked.currentMotif, "heartPulse");

});

test("Sol interactions and conversation cues create bounded temporary motifs", () => {
  const initial = createSolPresenceState(0);
  const first = applySolInteraction(initial, "doubleClick", 1_000);
  const second = applySolInteraction(initial, "doubleClick", 1_000);
  assert.deepEqual(first, second);
  assert.equal(first.currentMotif, "heartPulse");
  assert.equal(first.userOverrideUntil, 9_000);
  assert.equal(applySolInteraction(initial, "pointer", 1_000).currentMotif, "listeningStillness");
  assert.equal(applySolInteraction(initial, "dragStart", 1_000).currentMotif, "softOrbit");
  assert.equal(applySolInteraction(initial, "dragEnd", 1_000).currentMotif, "calmFloat");

  const comfort = applySolConversationCue(initial, "我今天有点难过", 2_000);
  assert.equal(comfort.currentMotif, "comfortingEmbrace");
  assert.ok(comfort.affection <= 1);

  const context = {
    now: 30_000,
    companion: DEFAULT_COMPANION_STATE,
    musicStatus: "paused" as const,
    musicTrackId: null,
    musicEnergy: 0,
    preferences: DEFAULT_SOL_PREFERENCES,
  };
  assert.deepEqual(forceNextSolMotif(initial, context), forceNextSolMotif(initial, context));
});

test("Sol reduced-motion visuals are strongly attenuated", () => {
  const regular = getSolMotifVisual("energeticDance", "high", false);
  const reduced = getSolMotifVisual("energeticDance", "high", true);
  for (const key of Object.keys(regular) as Array<keyof typeof regular>) {
    assert.ok(Math.abs(reduced[key]) <= Math.abs(regular[key]));
    assert.ok(Math.abs(reduced[key]) <= 0.16);
  }
});

test("proactive messages respect cooldown, music, overlays, busy state, and DND", () => {
  const base = {
    now: 300_000,
    lastConversationAt: 0,
    cooldownMs: 180_000,
    doNotDisturb: false,
    musicStatus: "paused" as const,
    overlayOpen: false,
    busy: false,
  };
  assert.equal(shouldAllowProactiveMessage(base), true);
  assert.equal(shouldAllowProactiveMessage({ ...base, now: 100_000 }), false);
  assert.equal(shouldAllowProactiveMessage({ ...base, doNotDisturb: true }), false);
  assert.equal(shouldAllowProactiveMessage({ ...base, musicStatus: "playing" }), false);
  assert.equal(shouldAllowProactiveMessage({ ...base, overlayOpen: true }), false);
  assert.equal(shouldAllowProactiveMessage({ ...base, busy: true }), false);
});

const FLOATING_VIEWPORT = { width: 1_440, height: 900 };
const COMPACT_PLAYER = { width: 380, height: 230 };

test("floating player clamps to safe viewport bounds", () => {
  assert.deepEqual(
    clampFloatingPosition({ x: -900, y: 5_000 }, COMPACT_PLAYER, FLOATING_VIEWPORT),
    { x: 18, y: 652 },
  );
});

test("floating player restores an out-of-bounds saved position", () => {
  assert.deepEqual(
    restoreFloatingPosition({ x: 9_000, y: -400 }, COMPACT_PLAYER, FLOATING_VIEWPORT),
    { x: 1_042, y: 18 },
  );
});

test("floating player snaps only after reaching a configured region", () => {
  const snapped = snapFloatingPosition(
    { x: 527, y: 22 },
    COMPACT_PLAYER,
    FLOATING_VIEWPORT,
  );
  assert.equal(snapped.snapRegion, "top-center");
  assert.deepEqual(snapped.position, { x: 530, y: 18 });

  const free = snapFloatingPosition(
    { x: 650, y: 300 },
    COMPACT_PLAYER,
    FLOATING_VIEWPORT,
  );
  assert.equal(free.snapRegion, "none");
});

test("floating player can snap into every viewport corner", () => {
  const bottomRight = snapFloatingPosition(
    { x: 1_038, y: 649 },
    COMPACT_PLAYER,
    FLOATING_VIEWPORT,
  );
  assert.equal(bottomRight.snapRegion, "bottom-right");
  assert.deepEqual(bottomRight.position, { x: 1_042, y: 652 });

  const topLeft = snapFloatingPosition(
    { x: 21, y: 20 },
    COMPACT_PLAYER,
    FLOATING_VIEWPORT,
  );
  assert.equal(topLeft.snapRegion, "top-left");
  assert.deepEqual(topLeft.position, { x: 18, y: 18 });
});

test("floating drag uses a small deterministic movement threshold", () => {
  assert.equal(shouldBeginFloatingDrag({ x: 10, y: 10 }, { x: 13, y: 13 }), false);
  assert.equal(shouldBeginFloatingDrag({ x: 10, y: 10 }, { x: 16, y: 10 }), true);
});

test("floating collision resolver avoids side rails and the evolution timeline", () => {
  const reserved = getDesktopReservedRects(FLOATING_VIEWPORT, {
    sideRailsVisible: true,
    timelineVisible: true,
    stageVisible: false,
  });
  const sidePlacement = finalizeFloatingPlacement({
    position: { x: 40, y: 260 },
    size: COMPACT_PLAYER,
    viewport: FLOATING_VIEWPORT,
    reservedRects: reserved,
    snap: false,
  });
  const timelinePlacement = finalizeFloatingPlacement({
    position: { x: 530, y: 700 },
    size: COMPACT_PLAYER,
    viewport: FLOATING_VIEWPORT,
    reservedRects: reserved,
    snap: false,
  });
  assert.equal(sidePlacement.collided, true);
  assert.equal(timelinePlacement.collided, true);
  for (const placement of [sidePlacement, timelinePlacement]) {
    assert.equal(
      reserved.some((rect) => floatingRectsOverlap(floatingRect(placement.position, COMPACT_PLAYER), rect)),
      false,
    );
  }
});

test("manual floating placement can intentionally overlap reserved interface regions", () => {
  const reserved = getDesktopReservedRects(FLOATING_VIEWPORT, {
    sideRailsVisible: true,
    timelineVisible: true,
    stageVisible: true,
  });
  const placement = finalizeFloatingPlacement({
    position: { x: 40, y: 220 },
    size: COMPACT_PLAYER,
    viewport: FLOATING_VIEWPORT,
    reservedRects: [],
    snap: false,
  });
  assert.equal(placement.collided, false);
  assert.deepEqual(placement.position, { x: 40, y: 220 });
  assert.equal(
    reserved.some((rect) => floatingRectsOverlap(floatingRect(placement.position, COMPACT_PLAYER), rect)),
    true,
  );
});

test("stage reply excerpt is deterministic and preserves original punctuation", () => {
  const text = "我看见合成光点正在慢慢靠近。它像一封只写给此刻的虚构来信！后面的完整说明仍然留在右侧对话记录里。";
  const first = createStageReplyExcerpt(text, 54);
  assert.deepEqual(first, createStageReplyExcerpt(text, 54));
  assert.ok(first.text.includes("。"));
  assert.equal(first.truncated, true);
  assert.ok(first.text.length <= 55);
});

test("stage content keeps confirmed lyrics above a new Sol reply", () => {
  assert.equal(resolveStageContentPriority({
    playbackStatus: "playing",
    lyricDisplayState: "active",
    lyricsVisible: true,
    hasStageReply: true,
  }), "lyrics");
  assert.equal(resolveStageContentPriority({
    playbackStatus: "paused",
    lyricDisplayState: "paused",
    lyricsVisible: true,
    hasStageReply: true,
  }), "sol_reply");
  assert.equal(resolveStageContentPriority({
    playbackStatus: "error",
    lyricDisplayState: "playback_error",
    lyricsVisible: true,
    hasStageReply: true,
  }), "playback_error");
});

test("stage reply timeout is stable at its exact boundary", () => {
  assert.equal(isStageReplyVisible(1_000, 11_999, 11_000), true);
  assert.equal(isStageReplyVisible(1_000, 12_000, 11_000), false);
});

test("local music and presence commands never request an evolution node", () => {
  const musicHandled = Boolean(parseMusicCommand("暂停音乐"));
  const presenceHandled = Boolean(parseSolPresenceCommand("换一个律动"));
  assert.equal(shouldCreateEvolutionNodeForTurn({
    localMusicHandled: musicHandled,
    localPresenceHandled: false,
  }), false);
  assert.equal(shouldCreateEvolutionNodeForTurn({
    localMusicHandled: false,
    localPresenceHandled: presenceHandled,
  }), false);
});

test("reduced-motion snapping stays instant while preserving the snap result", () => {
  const regular = snapFloatingPosition({ x: 527, y: 20 }, COMPACT_PLAYER, FLOATING_VIEWPORT);
  const reduced = snapFloatingPosition(
    { x: 527, y: 20 },
    COMPACT_PLAYER,
    FLOATING_VIEWPORT,
    { reducedMotion: true },
  );
  assert.deepEqual(reduced.position, regular.position);
  assert.equal(reduced.motion, "instant");
});
