import assert from "node:assert/strict";
import test from "node:test";
import type { ParticleForm } from "../shared/visualScene";
import {
  HEART_BOUNDS,
  computeSpatialDensityWeights,
  createVolumetricHeartTargets,
  validateHeartVolume,
} from "../src/lib/particleShapeSampling";
import {
  createParticleShapeSample,
  sampleDepthLightFactor,
} from "../src/lib/particleVolume";
import {
  sampleParallaxTarget,
  samplePointerCavityDisplacement,
  samplePointerDepthIndentation,
  settleInteractionDisplacement,
} from "../src/lib/particleInteraction";
import {
  getShapeMotionProfile,
  sampleHeartDoublePulse,
  sampleShapeMotionOffset,
  shapeMotionMagnitude,
} from "../src/lib/particleShapeMotion";

const heart = createVolumetricHeartTargets(6_000);
const heartMetrics = validateHeartVolume(heart);
const forms: ParticleForm[] = ["constellation", "wave", "sphere", "torus", "spiral", "heart", "helix", "bloom"];
const samples = Object.fromEntries(forms.map((form) => [form, createParticleShapeSample(form, 3_600)])) as Record<ParticleForm, ReturnType<typeof createParticleShapeSample>>;

const legacySeeded = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const legacyHeartPoint = (index: number, count: number) => {
  const fill = 0.08 + Math.sqrt(legacySeeded(index, 4.3)) * 0.92;
  const t = (index / Math.max(1, count)) * Math.PI * 2;
  return [
    16 * Math.sin(t) ** 3 * 0.135 * fill,
    (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.115 * fill + 0.2,
    (legacySeeded(index, 8.9) - 0.5) * (0.28 + fill * 0.72),
  ] as const;
};

test("correction 1 Phase 11 heart sampling is deterministic", () => {
  assert.deepEqual(createVolumetricHeartTargets(6_000).positions, heart.positions);
});

test("correction 2 every target comes from the legacy heart population", () => {
  assert.equal(heart.positions.length, 18_000);
  assert.deepEqual(heart.counts, { legacy: 6_000, seamRepair: 0 });
});

test("correction 3 every heart target and metadata value is finite", () => {
  assert.ok([...heart.positions, ...heart.normals, ...heart.depthBands, ...heart.surfaceWeights].every(Number.isFinite));
});

test("correction 4 restored heart contains no exact duplicate targets", () => {
  assert.equal(heartMetrics.uniqueCount, heartMetrics.count);
});

test("correction 5 the left and right heart populations remain balanced", () => {
  assert.ok(Math.abs(heartMetrics.left - heartMetrics.right) / heartMetrics.count < 0.025);
});

test("correction 6 front and back heart populations remain balanced", () => {
  assert.ok(Math.abs(heartMetrics.front - heartMetrics.back) / heartMetrics.count < 0.015);
});

test("correction 7 the Phase 11 heart center remains occupied", () => {
  assert.ok(heartMetrics.centerDisk / heartMetrics.count > 0.025);
});

test("correction 8 selected targets match the exact pre-Phase-12 formula", () => {
  for (const index of [0, 137, 2_048, 5_999]) {
    const expected = legacyHeartPoint(index, 6_000);
    const offset = index * 3;
    assert.ok(Math.abs(heart.positions[offset] - expected[0]) < 1e-5);
    assert.ok(Math.abs(heart.positions[offset + 1] - expected[1]) < 1e-5);
    assert.ok(Math.abs(heart.positions[offset + 2] - expected[2]) < 1e-5);
  }
});

test("correction 9 restored heart keeps the original non-flat depth", () => {
  assert.ok(heartMetrics.zVariance > 0.02);
  assert.ok(heartMetrics.zVariance < 0.065);
});

test("correction 10 all legacy targets stay inside their original bounds", () => {
  for (let index = 0; index < heart.positions.length; index += 3) {
    assert.ok(heart.positions[index] >= HEART_BOUNDS.minX && heart.positions[index] <= HEART_BOUNDS.maxX);
    assert.ok(heart.positions[index + 1] >= HEART_BOUNDS.minY - 0.01 && heart.positions[index + 1] <= HEART_BOUNDS.maxY);
    assert.ok(Math.abs(heart.positions[index + 2]) <= HEART_BOUNDS.maxDepth);
  }
});

test("correction 11 lower heart point remains centered", () => {
  let minimumY = Infinity;
  for (let index = 1; index < heart.positions.length; index += 3) minimumY = Math.min(minimumY, heart.positions[index]);
  const xs: number[] = [];
  for (let index = 0; index < heart.positions.length; index += 3) {
    if (heart.positions[index + 1] < minimumY + 0.13) {
      xs.push(heart.positions[index]);
    }
  }
  assert.ok(xs.length > 0);
  assert.ok(Math.abs(xs.reduce((sum, value) => sum + value, 0) / xs.length) < 0.08);
});

test("correction 12 the classic top cleft remains clearly recognizable", () => {
  let centerTop = -Infinity;
  let lobeTop = -Infinity;
  for (let index = 0; index < heart.positions.length; index += 3) {
    const x = heart.positions[index];
    const y = heart.positions[index + 1];
    if (Math.abs(x) < 0.18) centerTop = Math.max(centerTop, y);
    if (Math.abs(x) > 0.45) lobeTop = Math.max(lobeTop, y);
  }
  assert.ok(lobeTop - centerTop > 0.3);
});

test("correction 13 outer and inner role metadata are both retained", () => {
  let outer = 0;
  let inner = 0;
  for (let index = 0; index < heart.kinds.length; index += 1) {
    if (heart.kinds[index] === 2) outer += 1;
    if (heart.kinds[index] === 3) inner += 1;
  }
  assert.ok(outer > heart.kinds.length * 0.15);
  assert.ok(inner > 0);
});

test("correction 14 legacy depth and surface metadata stay bounded", () => {
  assert.ok([...heart.depthBands].every((value) => value >= -1 && value <= 1));
  assert.ok([...heart.surfaceWeights].every((value) => value >= 0.32 && value <= 0.88));
});

test("correction 15 heart normals are finite and normalized", () => {
  assert.equal(heartMetrics.normalizedNormals, true);
});

test("phase13 16 flower petals contain bounded real Z curvature", () => {
  const z = samples.bloom.positions.filter((_, index) => index % 3 === 2);
  assert.ok(Math.max(...z) - Math.min(...z) > 0.7);
  assert.ok(Math.max(...z) <= 0.75 && Math.min(...z) >= -0.75);
});

test("phase13 17 the flower center remains anchored", () => {
  let checked = 0;
  for (let index = 0; index < samples.bloom.positions.length; index += 3) {
    const x = samples.bloom.positions[index];
    const y = samples.bloom.positions[index + 1];
    if (Math.hypot(x, y) < 0.12) {
      assert.ok(Math.abs(samples.bloom.positions[index + 2]) < 0.08);
      checked += 1;
    }
  }
  assert.ok(checked > 0);
});

test("phase13 18 sphere distribution remains centered and symmetric", () => {
  const sums = [0, 0, 0];
  for (let index = 0; index < samples.sphere.positions.length; index += 3) {
    sums[0] += samples.sphere.positions[index];
    sums[1] += samples.sphere.positions[index + 1];
    sums[2] += samples.sphere.positions[index + 2];
  }
  assert.ok(sums.every((sum) => Math.abs(sum / 3_600) < 0.012));
});

test("phase13 19 helix strands have a bounded stable cross-section", () => {
  for (let index = 0; index < 3_600; index += 1) {
    if (index % 11 === 0) continue;
    const radius = Math.hypot(samples.helix.positions[index * 3], samples.helix.positions[index * 3 + 2]);
    assert.ok(radius >= 0.805 && radius <= 0.995);
  }
});

test("phase13 20 wave ribbon thickness remains bounded", () => {
  for (let index = 0; index < samples.wave.positions.length; index += 3) {
    const x = samples.wave.positions[index];
    const y = samples.wave.positions[index + 1];
    const z = samples.wave.positions[index + 2];
    const base = Math.sin(x * 1.2 + z * 0.7) * 0.52 + Math.cos(z * 1.8) * 0.24;
    assert.ok(Math.abs(y - base) < 0.19);
  }
});

test("phase13 21 torus geometry remains valid", () => {
  for (let index = 0; index < samples.torus.positions.length; index += 3) {
    const x = samples.torus.positions[index];
    const y = samples.torus.positions[index + 1];
    const z = samples.torus.positions[index + 2];
    const tubeDistance = Math.hypot(Math.hypot(x, z) - 2.05, y);
    assert.ok(tubeDistance >= 0.58 && tubeDistance <= 0.66);
  }
});

test("phase13 22 every form produces deterministic finite spatial metadata", () => {
  for (const form of forms) {
    const first = createParticleShapeSample(form, 256);
    const second = createParticleShapeSample(form, 256);
    assert.deepEqual(first.normals, second.normals);
    assert.deepEqual(first.depthBands, second.depthBands);
    assert.ok([...first.normals, ...first.depthBands, ...first.surfaceWeights].every(Number.isFinite));
  }
});

test("phase13 23 front-facing particles receive more light than back-facing particles", () => {
  assert.ok(sampleDepthLightFactor(0.8, 0.8, 0.9).light > sampleDepthLightFactor(-0.8, -0.8, 0.9).light);
});

test("phase13 24 rim light stays restrained and bounded", () => {
  assert.ok(sampleDepthLightFactor(0, 0, 1).rim <= 0.22);
});

test("phase13 25 interior light remains below a bright surface core", () => {
  const interior = sampleDepthLightFactor(0.2, 0, 0.18, 1, "body");
  const core = sampleDepthLightFactor(0.8, 0.6, 0.9, 1, "core");
  assert.ok(interior.light < core.light);
});

test("phase13 26 density compensation remains finite and bounded", () => {
  const weights = computeSpatialDensityWeights(heart.positions);
  assert.ok([...weights].every((value) => Number.isFinite(value) && value >= 0.58 && value <= 1.16));
});

test("phase13 27 sparse contour particles retain readable alpha", () => {
  assert.ok(sampleDepthLightFactor(0.05, 0, 1, 1.16, "accent").alpha > 0.25);
});

test("phase13 28 inactive and outside pointers produce neutral parallax", () => {
  assert.deepEqual(sampleParallaxTarget({ pointer: [1, 1], active: false, inside: true }), [0, 0]);
  assert.deepEqual(sampleParallaxTarget({ pointer: [1, 1], active: true, inside: false }), [0, 0]);
});

test("phase13 29 camera parallax is clamped", () => {
  assert.deepEqual(sampleParallaxTarget({ pointer: [20, -20], active: true, inside: true }), [0.2, -0.11]);
});

test("phase13 30 reduced motion attenuates parallax by at least eighty percent", () => {
  const regular = sampleParallaxTarget({ pointer: [0.8, 0.7], active: true, inside: true });
  const reduced = sampleParallaxTarget({ pointer: [0.8, 0.7], active: true, inside: true, reducedMotion: true });
  assert.ok(Math.hypot(...reduced) <= Math.hypot(...regular) * 0.2);
});

const cavityBase = {
  particle: [0.3, 0] as const,
  pointer: [0, 0] as const,
  active: true,
  inside: true,
  attraction: 1,
  role: "body" as const,
  seed: 0.25,
};

test("correction 31 inactive or departed pointers close the heart cavity exactly", () => {
  assert.deepEqual(samplePointerCavityDisplacement({ ...cavityBase, active: false }), [0, 0]);
  assert.deepEqual(samplePointerCavityDisplacement({ ...cavityBase, inside: false }), [0, 0]);
});

test("correction 32 the heart cavity pushes nearby particles away from the pointer", () => {
  const result = samplePointerCavityDisplacement(cavityBase);
  assert.ok(result[0] > 0);
  assert.ok(Math.abs(result[1]) < 1e-12);
});

test("correction 33 particles outside the cavity radius remain untouched", () => {
  assert.deepEqual(samplePointerCavityDisplacement({ ...cavityBase, particle: [0.73, 0] }), [0, 0]);
});

test("correction 34 a pointer exactly on a particle still opens a finite seeded cavity", () => {
  const result = samplePointerCavityDisplacement({ ...cavityBase, particle: [0, 0] });
  assert.ok(result.every(Number.isFinite));
  assert.ok(Math.hypot(...result) > 0);
});

test("correction 35 cavity motion is bounded and dragging can open it farther", () => {
  const hover = samplePointerCavityDisplacement(cavityBase);
  const drag = samplePointerCavityDisplacement({ ...cavityBase, dragging: true });
  assert.ok(Math.hypot(...hover) <= 0.16 * 0.84);
  assert.ok(Math.hypot(...drag) <= 0.28 * 0.84);
  assert.ok(Math.hypot(...drag) > Math.hypot(...hover));
});

test("correction 36 cavity role hierarchy and reduced motion are preserved", () => {
  const core = samplePointerCavityDisplacement({ ...cavityBase, role: "core" });
  const accent = samplePointerCavityDisplacement({ ...cavityBase, role: "accent" });
  const reduced = samplePointerCavityDisplacement({ ...cavityBase, reducedMotion: true });
  const regular = samplePointerCavityDisplacement(cavityBase);
  assert.ok(Math.hypot(...core) < Math.hypot(...accent));
  assert.ok(Math.hypot(...reduced) <= Math.hypot(...regular) * 0.13);
});

const pointerBase = {
  particle: [0, 0] as const,
  pointer: [0.3, 0] as const,
  active: true,
  inside: true,
  attraction: 1,
  normal: [0, 0, 1] as const,
  depthBand: 1,
  surfaceWeight: 1,
};

test("phase13 31 inactive depth interaction is exactly zero", () => {
  assert.deepEqual(samplePointerDepthIndentation({ ...pointerBase, active: false }), [0, 0, 0]);
});

test("phase13 32 zero-distance depth interaction remains finite", () => {
  const result = samplePointerDepthIndentation({ ...pointerBase, pointer: [0, 0] });
  assert.ok(result.every(Number.isFinite));
});

test("phase13 33 only particles inside the depth radius respond", () => {
  assert.deepEqual(samplePointerDepthIndentation({ ...pointerBase, pointer: [1.4, 0] }), [0, 0, 0]);
  assert.ok(Math.hypot(...samplePointerDepthIndentation(pointerBase)) > 0);
});

test("phase13 34 front-surface indentation is bounded", () => {
  const result = samplePointerDepthIndentation({ ...pointerBase, dragging: true });
  assert.ok(Math.hypot(...result) <= 0.145);
  assert.ok(result[2] < 0);
});

test("phase13 35 core particles respond less than accents", () => {
  const core = samplePointerDepthIndentation({ ...pointerBase, role: "core" });
  const accent = samplePointerDepthIndentation({ ...pointerBase, role: "accent" });
  assert.ok(Math.hypot(...core) < Math.hypot(...accent));
});

test("phase13 36 release settles deterministically to exact zero", () => {
  let value = 0.12;
  for (let index = 0; index < 120; index += 1) value = settleInteractionDisplacement(value, 1 / 60, false);
  assert.equal(value, 0);
});

test("phase13 37 heart heartbeat is bounded and returns exactly to zero", () => {
  assert.equal(sampleHeartDoublePulse(0), 0);
  assert.equal(sampleHeartDoublePulse(3.2), 0);
  assert.ok(sampleHeartDoublePulse(0.288) <= 1);
});

test("phase13 38 flower depth motion preserves its center", () => {
  assert.deepEqual(sampleShapeMotionOffset("bloom", [0.1, 0.1, 0], 1, 0.4), [0, 0, 0]);
});

test("phase13 39 sphere motion stays symmetric in three dimensions", () => {
  const positive = sampleShapeMotionOffset("sphere", [1, 0.5, 0.25], 1.2, 0.4);
  const negative = sampleShapeMotionOffset("sphere", [-1, -0.5, -0.25], 1.2, 0.4);
  assert.ok(positive.every((value, index) => Math.abs(value + negative[index]) < 1e-12));
});

test("phase13 40 helix highlight does not displace the whole geometry", () => {
  assert.deepEqual(sampleShapeMotionOffset("helix", [0.9, 1, 0], 2, 0.4), [0, 0, 0]);
});

test("phase13 41 wave motion is three-dimensional tangential and bounded", () => {
  const offset = sampleShapeMotionOffset("wave", [0.8, 0.2, 0.3], 2, 0.5);
  assert.notEqual(offset[2], 0);
  assert.ok(shapeMotionMagnitude(offset) <= getShapeMotionProfile("wave").amplitude + 1e-9);
});

test("phase13 42 reduced motion strongly attenuates all spatial shape motion", () => {
  for (const form of ["heart", "bloom", "sphere", "wave"] as const) {
    const regular = shapeMotionMagnitude(sampleShapeMotionOffset(form, [1.2, 0.7, 0.3], 0.288, 0.2, false));
    const reduced = shapeMotionMagnitude(sampleShapeMotionOffset(form, [1.2, 0.7, 0.3], 0.288, 0.2, true));
    assert.ok(reduced <= regular * 0.13 + 1e-12);
  }
});
