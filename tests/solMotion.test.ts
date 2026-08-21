import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { detectExplicitShape } from "../shared/companion";
import { parseMusicCommand } from "../shared/music";
import { parseSolMemoryCommand } from "../shared/solMemory";
import {
  SOL_GESTURE_IDS,
  advanceSolMotionPlan,
  beginCompanionHeart,
  canStartPocketStarlight,
  chooseDeterministicAmbientGesture,
  createPocketStarlightState,
  createSolMotionCue,
  createSolMotionPlan,
  getSolMotionTransitionProgress,
  getSolMotionVisual,
  resolveSolMotionCue,
  samplePocketStarlight,
  sanitizeSolMotionCue,
  startPocketStarlight,
} from "../shared/solMotion";
import {
  SOL_MUSIC_RITUAL_IDS,
  createSolMusicRitualState,
  detectsExplicitComfortMusicIntent,
  sampleSolMusicRitual,
  shouldTriggerLyricRipple,
  startSolMusicRitual,
} from "../shared/solMusicRitual";
import { parseSolWeatherCommand } from "../shared/weather";
import {
  assignParticleRoles,
  countParticleRoles,
  createMorphCurveControls,
  createSpatialParticleMapping,
  getCoherentMorphPhase,
  reorderParticleTargets,
  sampleCoherentMorphPosition,
  shouldSuppressClickAfterDrag,
} from "../src/lib/particleMorph";
import {
  HEART_BOUNDS,
  computeSpatialDensityWeights,
  createBalancedHeartTargets,
  validateShapeDistribution,
} from "../src/lib/particleShapeSampling";
import {
  pointerInteractionReturnsToRest,
  samplePointerDisplacement,
} from "../src/lib/particleInteraction";
import {
  getShapeMotionProfile,
  sampleHeartDoublePulse,
  sampleShapeMotionOffset,
  shapeMotionMagnitude,
} from "../src/lib/particleShapeMotion";
import { glyphPointsAreBounded, sampleGlyphAlphaPoints } from "../src/lib/pocketStarlight";
import {
  DEFAULT_SOL_PREFERENCES,
  SOL_PRESENCE_MOTIFS,
  applySolConversationCue,
  applySolInteraction,
  createSolPresenceState,
  parseSolPresenceCommand,
} from "../src/lib/solPresenceController";

const basePlan = () => createSolMotionPlan(0);
const cue = (gesture: Parameters<typeof createSolMotionCue>[0], source: Parameters<typeof createSolMotionCue>[1], now = 1_000) =>
  createSolMotionCue(gesture, source, now, 0.7, 5_000, 42);

test("1 unknown gestures are rejected", () => assert.equal(sanitizeSolMotionCue({ gesture: "mistDance", source: "ambient" }), null));

test("2 strength and duration are clamped", () => {
  const value = sanitizeSolMotionCue({ gesture: "joyfulBloom", source: "manual", strength: 8, durationMs: 99_000, createdAt: 0, seed: 1 });
  assert.equal(value?.strength, 1);
  assert.equal(value?.durationMs, 30_000);
});

test("3 gesture selection is deterministic", () => assert.equal(chooseDeterministicAmbientGesture("same-seed"), chooseDeterministicAmbientGesture("same-seed")));

test("4 only one primary gesture is active", () => {
  const first = resolveSolMotionCue(basePlan(), cue("musicSway", "music"), 1_000);
  const second = resolveSolMotionCue(first, cue("listeningStillness", "interaction", 1_100), 1_100);
  assert.equal(second.primary.gesture, "listeningStillness");
  assert.equal(Object.hasOwn(second, "secondary"), false);
});

test("5 direct interaction outranks music", () => {
  const interaction = resolveSolMotionCue(basePlan(), cue("listeningStillness", "interaction"), 1_000);
  assert.equal(resolveSolMotionCue(interaction, cue("musicSway", "music", 1_200), 1_200), interaction);
});

test("6 voice listening outranks ambient motion", () => assert.equal(resolveSolMotionCue(basePlan(), cue("listeningStillness", "voice"), 1_000).primary.gesture, "listeningStillness"));

test("7 memory recall temporarily outranks music", () => {
  const music = resolveSolMotionCue(basePlan(), cue("musicSway", "music"), 1_000);
  assert.equal(resolveSolMotionCue(music, cue("memoryEcho", "memory", 1_200), 1_200).primary.gesture, "memoryEcho");
});

test("8 lower-priority cues cannot replace higher-priority cues", () => {
  const manual = resolveSolMotionCue(basePlan(), cue("heartPulse", "manual"), 1_000);
  assert.equal(resolveSolMotionCue(manual, cue("idleBreath", "ambient", 1_200), 1_200), manual);
});

test("9 expired cues return to ambient motion", () => {
  const plan = resolveSolMotionCue(basePlan(), cue("joyfulBloom", "conversation"), 1_000);
  assert.equal(advanceSolMotionPlan(plan, 6_001).primary.source, "ambient");
});

test("10 user-locked gestures are preserved", () => {
  const plan = { ...resolveSolMotionCue(basePlan(), cue("heartPulse", "manual"), 1_000), locked: true };
  assert.equal(resolveSolMotionCue(plan, cue("listeningStillness", "voice", 9_000), 9_000), plan);
});

test("11 local gesture commands bypass model routing", () => {
  assert.deepEqual(parseSolPresenceCommand("认真听我说"), { action: "presence.setGesture", value: "listeningStillness" });
  assert.deepEqual(parseSolPresenceCommand("抱抱我"), { action: "presence.setGesture", value: "comfortingEmbrace" });
});

const source = new Float32Array([-1, 0, 0, 1, 0, 0, 0, 1, 0, 0, -1, 0]);
const target = new Float32Array([0, 2, 0, 0, -2, 0, -2, 0, 0, 2, 0, 0]);

test("12 spatial mapping is deterministic", () => assert.deepEqual(createSpatialParticleMapping(source, target), createSpatialParticleMapping(source, target)));

test("13 spatial mapping is one-to-one", () => {
  const mapping = [...createSpatialParticleMapping(source, target)];
  assert.equal(new Set(mapping).size, mapping.length);
});

test("14 spatial mapping and targets contain no NaN", () => assert.ok([...reorderParticleTargets(target, createSpatialParticleMapping(source, target))].every(Number.isFinite)));

test("15 morph progress is bounded", () => {
  assert.equal(getCoherentMorphPhase(-10).progress, 0);
  assert.equal(getCoherentMorphPhase(10).progress, 1);
});

test("16 release travel and settle phases are continuous", () => {
  assert.equal(getCoherentMorphPhase(0.1).phase, "release");
  assert.equal(getCoherentMorphPhase(0.5).phase, "travel");
  assert.equal(getCoherentMorphPhase(0.9).phase, "settle");
  const control = createMorphCurveControls(source, target);
  const left = sampleCoherentMorphPosition([-1, 0, 0], [0, 2, 0], [control[0], control[1], control[2]], 0.499);
  const right = sampleCoherentMorphPosition([-1, 0, 0], [0, 2, 0], [control[0], control[1], control[2]], 0.501);
  assert.ok(Math.hypot(left[0] - right[0], left[1] - right[1], left[2] - right[2]) < 0.03);
});

test("17 restored morph coordinates match target exactly", () => assert.deepEqual(sampleCoherentMorphPosition([-1, 0, 0], [0, 2, 0], [0.2, 0.1, 0], 1), [0, 2, 0]));

test("18 reduced motion attenuates curved travel", () => {
  const regular = sampleCoherentMorphPosition([-1, 0, 0], [1, 0, 0], [0, 1, 0], 0.5, false);
  const reduced = sampleCoherentMorphPosition([-1, 0, 0], [1, 0, 0], [0, 1, 0], 0.5, true);
  assert.ok(Math.abs(reduced[1]) < Math.abs(regular[1]));
});

test("19 particle roles are deterministic", () => assert.deepEqual(assignParticleRoles(5_000), assignParticleRoles(5_000)));

test("20 particle role ratios remain bounded", () => {
  const counts = countParticleRoles(assignParticleRoles(100_000));
  assert.ok(counts.core / 100_000 >= 0.1 && counts.core / 100_000 <= 0.15);
  assert.ok(counts.body / 100_000 >= 0.7 && counts.body / 100_000 <= 0.8);
  assert.ok(counts.accent / 100_000 >= 0.1 && counts.accent / 100_000 <= 0.15);
});

test("21 accent particles cannot dominate the body", () => {
  const counts = countParticleRoles(assignParticleRoles(54_000));
  assert.ok(counts.accent < counts.body / 4);
});

test("22 sadness creates companion heart rather than happiness text", () => {
  const state = beginCompanionHeart(createPocketStarlightState(0), 1_000);
  assert.equal(state.phase, "companion");
  assert.equal(samplePocketStarlight(state, 2_000).textMix, 0);
});

test("23 Pocket Starlight requires invitation", () => {
  const companion = beginCompanionHeart(createPocketStarlightState(0), 1_000);
  assert.equal(samplePocketStarlight(companion, 2_000).textMix, 0);
  assert.ok(startPocketStarlight(companion, 2_000).phase === "forming");
});

test("24 Pocket Starlight cooldown prevents repetition", () => {
  const active = startPocketStarlight(createPocketStarlightState(0), 1_000);
  assert.equal(canStartPocketStarlight(active, 2_000, true, false), false);
});

test("25 Do Not Disturb prevents proactive Pocket Starlight", () => assert.equal(canStartPocketStarlight(createPocketStarlightState(0), 1_000, true, true, true), false));

const glyphAlpha = (() => {
  const pixels = new Uint8ClampedArray(40 * 10 * 4);
  for (let y = 2; y < 8; y += 1) for (let x = 3; x < 37; x += 2) pixels[(y * 40 + x) * 4 + 3] = 255;
  return pixels;
})();

test("26 glyph sampling is deterministic", () => assert.deepEqual(sampleGlyphAlphaPoints(glyphAlpha, 40, 10, 80), sampleGlyphAlphaPoints(glyphAlpha, 40, 10, 80)));

test("27 glyph points remain within the heart text bounds", () => assert.equal(glyphPointsAreBounded(sampleGlyphAlphaPoints(glyphAlpha, 40, 10, 80)), true));

test("28 reduced motion preserves Pocket Starlight text and glow", () => {
  const state = startPocketStarlight(createPocketStarlightState(0), 1_000, true);
  const visual = samplePocketStarlight(state, 2_500, true);
  assert.ok(visual.textMix > 0 && visual.glow > 0);
});

test("29 Pocket Starlight restores the previous form mathematically", () => {
  const state = startPocketStarlight(createPocketStarlightState(0), 1_000);
  assert.equal(samplePocketStarlight(state, 9_000).textMix, 0);
});

test("30 removed Starburst Home is absent from music rituals", () => assert.equal(SOL_MUSIC_RITUAL_IDS.includes("starburstHome" as never), false));

test("31 removed Starburst Home command no longer routes locally", () => assert.equal(parseSolPresenceCommand("来一次星爆归心"), null));

test("32 normal confirmed playback starts without a large ritual", () => assert.equal(createSolMusicRitualState(0).ritual, "none"));

test("33 track-trail displacement returns exactly to zero", () => {
  const state = startSolMusicRitual("trackTrailTransition", "playback", "track", 0, 1);
  assert.equal(sampleSolMusicRitual(state, 0).trackTransition, 0);
  assert.equal(sampleSolMusicRitual(state, 1_850).trackTransition, 0);
});

test("34 remaining rituals do not carry a replacement particle form", () => assert.equal(Object.hasOwn(startSolMusicRitual("trackTrailTransition", "playback", "track", 0), "form"), false));

test("35 Pause Freeze decelerates instead of stopping immediately", () => {
  const state = startSolMusicRitual("pauseFreeze", "playback", "track", 0, 1);
  assert.ok(sampleSolMusicRitual(state, 800).pauseFreeze > sampleSolMusicRitual(state, 1).pauseFreeze);
});

test("36 Resume Heartbeat produces one bounded wave", () => {
  const state = startSolMusicRitual("resumeHeartbeat", "playback", "track", 0, 1);
  assert.ok(sampleSolMusicRitual(state, 575).resumeHeartbeat > 0.9);
  assert.equal(sampleSolMusicRitual(state, 1_150).resumeHeartbeat, 0);
});

test("37 track changes have one deterministic matched transition", () => {
  assert.deepEqual(startSolMusicRitual("trackTrailTransition", "playback", "next", 100, 0.7), startSolMusicRitual("trackTrailTransition", "playback", "next", 100, 0.7));
});

test("38 lyric ripple triggers only when the lyric index changes", () => {
  assert.equal(shouldTriggerLyricRipple(2, 2, "synced"), false);
  assert.equal(shouldTriggerLyricRipple(2, 3, "synced"), true);
});

test("39 missing lyrics skip ripple without affecting playback", () => assert.equal(shouldTriggerLyricRipple(-1, -1, "none"), false));

test("40 explicit sad-song intent selects comfort semantics", () => assert.equal(detectsExplicitComfortMusicIntent("陪我听完一首伤感的歌"), true));

test("41 song titles alone do not force sadness classification", () => {
  assert.equal(detectsExplicitComfortMusicIntent("海阔天空"), false);
  assert.equal(detectsExplicitComfortMusicIntent("晴天"), false);
});

test("42 reduced motion strongly attenuates track-trail displacement", () => {
  const state = startSolMusicRitual("trackTrailTransition", "playback", "track", 0, 1);
  assert.ok(sampleSolMusicRitual(state, 925, true).trackTransition < sampleSolMusicRitual(state, 925, false).trackTransition * 0.2);
});

test("43 dragging suppresses its following click", () => {
  assert.equal(shouldSuppressClickAfterDrag(0.08), true);
  assert.equal(shouldSuppressClickAfterDrag(0.01), false);
});

test("44 music commands remain correctly routed", () => assert.equal(parseMusicCommand("暂停")?.action, "music.pause"));

test("45 weather commands remain correctly routed", () => assert.equal(parseSolWeatherCommand("开始下雨")?.action, "weather.setMode"));

test("46 memory commands remain correctly routed", () => assert.equal(parseSolMemoryCommand("打开记忆星图")?.action, "open"));

test("47 shape commands remain correctly routed", () => assert.equal(detectExplicitShape("变成一颗爱心"), "heart"));

test("48 playing Jay Chou Sunny Day remains a music command", () => {
  assert.equal(parseMusicCommand("播放周杰伦的晴天")?.action, "music.search");
  assert.equal(parseSolPresenceCommand("播放周杰伦的晴天"), null);
});

test("49 searching songs about rainy days remains music search", () => {
  assert.equal(parseMusicCommand("搜索下雨天的歌")?.action, "music.search");
  assert.equal(parseSolWeatherCommand("搜索下雨天的歌"), null);
});

test("50 removed aura commands remain absent", () => {
  assert.equal(parseSolPresenceCommand("仙气一点"), null);
  assert.equal(parseSolPresenceCommand("让雾气巡游"), null);
});

test("51 aura preferences do not reappear", () => assert.equal(Object.keys(DEFAULT_SOL_PREFERENCES).some((key) => /aura|mist|fog|仙气/i.test(key)), false));

test("52 transition and reduced-motion visuals remain bounded", () => {
  assert.ok(getSolMotionTransitionProgress(cue("joyfulBloom", "conversation", 0), 2_500) >= 0);
  const visual = getSolMotionVisual(cue("playfulLeap", "manual"), true);
  assert.ok(Object.values(visual).every((value) => Number.isFinite(value) && value >= -1 && value <= 1));
  assert.equal(createSolMusicRitualState(0).ritual, "none");
});

test("53 removed large-ritual fields do not remain in visual state", () => {
  const visual = sampleSolMusicRitual(createSolMusicRitualState(0), 0);
  assert.equal(Object.keys(visual).some((key) => /starburst|suspension|gravityReturn|heartLanding/.test(key)), false);
});

test("54 removed mist and Starburst commands stay outside local routing", () => {
  assert.equal(parseSolWeatherCommand("开启薄雾"), null);
  assert.equal(parseSolPresenceCommand("星爆归心"), null);
});

const heartSample = createBalancedHeartTargets(12_000);

test("55 heart sampling is deterministic and exact", () => {
  const repeat = createBalancedHeartTargets(12_000);
  assert.deepEqual(repeat.positions, heartSample.positions);
  assert.equal(heartSample.positions.length, 36_000);
  assert.deepEqual(heartSample.counts, { legacy: 12_000, seamRepair: 0 });
});

test("56 heart targets are finite unique and lobe-balanced", () => {
  const metrics = validateShapeDistribution(heartSample.positions);
  assert.equal(metrics.finite, true);
  assert.equal(metrics.uniqueCount, metrics.count);
  assert.ok(Math.abs(metrics.left - metrics.right) / metrics.count < 0.025);
});

test("57 the Phase 11 heart keeps its recognizable center and top cleft", () => {
  const metrics = validateShapeDistribution(heartSample.positions);
  assert.ok(metrics.centerDisk / metrics.count > 0.025);
  let centerTop = -Infinity;
  let lobeTop = -Infinity;
  for (let index = 0; index < heartSample.positions.length; index += 3) {
    const x = heartSample.positions[index];
    const y = heartSample.positions[index + 1];
    if (Math.abs(x) < 0.18) centerTop = Math.max(centerTop, y);
    if (Math.abs(x) > 0.45) lobeTop = Math.max(lobeTop, y);
  }
  assert.ok(lobeTop - centerTop > 0.3);
});

test("58 legacy role metadata stays inside the classic heart bounds", () => {
  for (let index = 0; index < heartSample.kinds.length; index += 1) {
    if (heartSample.kinds[index] === 0) continue;
    const offset = index * 3;
    const x = heartSample.positions[offset];
    const y = heartSample.positions[offset + 1];
    const z = heartSample.positions[offset + 2];
    assert.ok(x >= HEART_BOUNDS.minX && x <= HEART_BOUNDS.maxX);
    assert.ok(y >= HEART_BOUNDS.minY - 0.01 && y <= HEART_BOUNDS.maxY);
    assert.ok(Math.abs(z) <= HEART_BOUNDS.maxDepth);
  }
});

test("59 cached heart morph restoration matches its target exactly", () => {
  const targetPoint: [number, number, number] = [heartSample.positions[0], heartSample.positions[1], heartSample.positions[2]];
  assert.deepEqual(sampleCoherentMorphPosition([0, 0, 0], targetPoint, [0.2, 0.1, 0.1], 1), targetPoint);
});

test("60 projected density weights are deterministic finite and bounded", () => {
  const first = computeSpatialDensityWeights(heartSample.positions);
  const second = computeSpatialDensityWeights(heartSample.positions);
  assert.deepEqual(first, second);
  assert.ok([...first].every((value) => Number.isFinite(value) && value >= 0.579 && value <= 1.16));
});

const pointerBase = {
  particle: [0, 0] as const,
  pointer: [0.5, 0] as const,
  active: true,
  inside: true,
  attraction: 1,
};

test("61 inactive and outside pointers produce exactly zero displacement", () => {
  assert.deepEqual(samplePointerDisplacement({ ...pointerBase, active: false }), [0, 0]);
  assert.deepEqual(samplePointerDisplacement({ ...pointerBase, inside: false }), [0, 0]);
});

test("62 pointer force is finite at zero distance", () => {
  const displacement = samplePointerDisplacement({ ...pointerBase, pointer: [0, 0] });
  assert.deepEqual(displacement, [0, 0]);
  assert.ok(displacement.every(Number.isFinite));
});

test("63 pointer force is local clamped and smoothly weaker at distance", () => {
  const near = samplePointerDisplacement({ ...pointerBase, pointer: [0.2, 0] });
  const middle = samplePointerDisplacement({ ...pointerBase, pointer: [0.7, 0] });
  const far = samplePointerDisplacement({ ...pointerBase, pointer: [1.2, 0] });
  assert.ok(Math.hypot(...near) <= 0.085);
  assert.ok(Math.hypot(...near) > Math.hypot(...middle));
  assert.deepEqual(far, [0, 0]);
});

test("64 core particles respond less than accents", () => {
  const core = samplePointerDisplacement({ ...pointerBase, role: "core" });
  const accent = samplePointerDisplacement({ ...pointerBase, role: "accent" });
  assert.ok(Math.hypot(...core) < Math.hypot(...accent));
});

test("65 pointer release and reduced motion settle to the exact target", () => {
  assert.deepEqual(pointerInteractionReturnsToRest(pointerBase), [0, 0]);
  const regular = samplePointerDisplacement(pointerBase);
  const reduced = samplePointerDisplacement({ ...pointerBase, reducedMotion: true });
  assert.ok(Math.hypot(...reduced) < Math.hypot(...regular) * 0.2);
});

test("66 rigid tilt IDs and stored aliases are rejected", () => {
  assert.equal(SOL_GESTURE_IDS.includes("curiousReach" as never), false);
  assert.equal(SOL_PRESENCE_MOTIFS.includes("curiousTilt" as never), false);
  assert.equal(sanitizeSolMotionCue({ gesture: "curiousReach", source: "ambient" }), null);
  assert.equal(sanitizeSolMotionCue({ gesture: "curiousTilt", source: "ambient" }), null);
});

test("67 questions and look-at-me commands use attentive stillness without lean state", () => {
  const initial = createSolPresenceState(0);
  assert.equal(applySolConversationCue(initial, "你在想什么？", 1_000).motionPlan.primary.gesture, "listeningStillness");
  assert.deepEqual(parseSolPresenceCommand("看着我"), { action: "presence.setGesture", value: "listeningStillness" });
  assert.equal(applySolInteraction(initial, "pointer", 1_000).currentMotif, "listeningStillness");
  assert.equal(Object.keys(getSolMotionVisual(cue("listeningStillness", "conversation"))).some((key) => /lean|tilt|asymmetry/i.test(key)), false);
});

test("68 removed rigid shader fields and persistence preferences stay absent", () => {
  const sourceText = readFileSync(new URL("../src/components/ParticleCanvas.tsx", import.meta.url), "utf8");
  assert.equal(/uGestureLean|uGestureAsymmetry|curiousReach|curiousTilt/.test(sourceText), false);
  assert.equal(Object.keys(DEFAULT_SOL_PREFERENCES).some((key) => /lean|tilt|asymmetry/i.test(key)), false);
});

test("69 heart double heartbeat is deterministic bounded and returns to rest", () => {
  assert.equal(sampleHeartDoublePulse(0), 0);
  assert.equal(sampleHeartDoublePulse(3.2), 0);
  assert.ok(sampleHeartDoublePulse(0.288) > 0);
  assert.ok(sampleHeartDoublePulse(0.656) > 0);
  assert.ok(sampleHeartDoublePulse(0.288) <= 1);
});

test("70 heart motion preserves radial geometry and returns exactly to target", () => {
  assert.deepEqual(sampleShapeMotionOffset("heart", [1, 0.4, 0], 0), [0, 0, 0]);
  assert.deepEqual(sampleShapeMotionOffset("heart", [1, 0.4, 0], 3.2), [0, 0, 0]);
  assert.ok(shapeMotionMagnitude(sampleShapeMotionOffset("heart", [1, 0.4, 0], 0.288)) <= getShapeMotionProfile("heart").amplitude + 1e-9);
});

test("71 flower motion anchors its center", () => {
  assert.deepEqual(sampleShapeMotionOffset("bloom", [0.1, 0.1, 0], 1), [0, 0, 0]);
  assert.ok(shapeMotionMagnitude(sampleShapeMotionOffset("bloom", [1.4, 0.2, 0], 1)) <= getShapeMotionProfile("bloom").amplitude + 1e-9);
});

test("72 sphere motion remains symmetric", () => {
  const positive = sampleShapeMotionOffset("sphere", [1, 0.5, 0.25], 1.2, 0.4);
  const negative = sampleShapeMotionOffset("sphere", [-1, -0.5, -0.25], 1.2, 0.4);
  assert.ok(positive.every((value, index) => Math.abs(value + negative[index]) < 1e-12));
});

test("73 helix uses a bounded highlight without geometry displacement", () => {
  assert.equal(getShapeMotionProfile("helix").highlightOnly, true);
  assert.deepEqual(sampleShapeMotionOffset("helix", [1, 1, 1], 12, 0.8), [0, 0, 0]);
});

test("74 wave motion remains tangential and bounded", () => {
  const offset = sampleShapeMotionOffset("wave", [0.8, 0.2, 0.3], 2, 0.5);
  assert.ok(Math.abs(offset[2]) > 0);
  assert.ok(shapeMotionMagnitude(offset) <= getShapeMotionProfile("wave").amplitude + 1e-9);
});

test("75 reduced motion strongly attenuates every shape-specific displacement", () => {
  for (const form of ["heart", "bloom", "sphere", "wave"] as const) {
    const regular = shapeMotionMagnitude(sampleShapeMotionOffset(form, [1.2, 0.7, 0.3], 0.288, 0.2, false));
    const reduced = shapeMotionMagnitude(sampleShapeMotionOffset(form, [1.2, 0.7, 0.3], 0.288, 0.2, true));
    assert.ok(reduced <= regular * 0.13 + 1e-12);
  }
});
