export const HEART_DISTRIBUTION = {
  legacy: 1,
  seamRepair: 0,
} as const;

export const HEART_BOUNDS = {
  minX: -2.3,
  maxX: 2.3,
  minY: -1.75,
  maxY: 2.35,
  maxDepth: 0.5,
} as const;

export type HeartPointKind = 0 | 1 | 2 | 3;

export type VolumetricHeartTargets = {
  positions: Float32Array;
  normals: Float32Array;
  depthBands: Float32Array;
  surfaceWeights: Float32Array;
  kinds: Uint8Array;
  counts: {
    legacy: number;
    seamRepair: number;
  };
};

export type BalancedHeartTargets = VolumetricHeartTargets;

const HEART_X_SCALE = 1.9;
const HEART_Y_SCALE = 1.65;
const HEART_Y_OFFSET = 0.16;

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : 0));

const smoothstep = (value: number) => {
  const bounded = clamp(value, 0, 1);
  return bounded * bounded * (3 - 2 * bounded);
};

const hashUnit = (index: number, salt: number) => {
  let value = Math.imul((index + 1) ^ salt, 2246822519) >>> 0;
  value ^= value >>> 13;
  value = Math.imul(value, 3266489917) >>> 0;
  value ^= value >>> 16;
  return (value >>> 0) / 0xffffffff;
};

/** Exact deterministic generator used by the pre-Phase-12 createShape helper. */
const seeded = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const halton = (index: number, base: number) => {
  let result = 0;
  let fraction = 1 / base;
  let value = Math.max(1, Math.floor(index));
  while (value > 0) {
    result += fraction * (value % base);
    value = Math.floor(value / base);
    fraction /= base;
  }
  return result;
};

const toNormalizedHeart = (x: number, y: number) => ({
  x: x / HEART_X_SCALE,
  y: (y - HEART_Y_OFFSET) / HEART_Y_SCALE,
});

export function isPointInsideHeart(x: number, y: number) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
  const normalized = toNormalizedHeart(x, y);
  const x2 = normalized.x * normalized.x;
  const y2 = normalized.y * normalized.y;
  const sum = x2 + y2 - 1;
  return sum * sum * sum - x2 * normalized.y * y2 <= 0;
}

export function findHeartBoundaryRadius(angle: number) {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  let inside = 0;
  let outside = 2;
  while (
    isPointInsideHeart(
      dx * outside * HEART_X_SCALE,
      dy * outside * HEART_Y_SCALE + HEART_Y_OFFSET,
    ) &&
    outside < 4
  ) outside *= 1.35;
  for (let iteration = 0; iteration < 26; iteration += 1) {
    const middle = (inside + outside) * 0.5;
    if (isPointInsideHeart(
      dx * middle * HEART_X_SCALE,
      dy * middle * HEART_Y_SCALE + HEART_Y_OFFSET,
    )) inside = middle;
    else outside = middle;
  }
  return inside;
}

/** Coherent local half-thickness derived from distance to the implicit silhouette. */
export function estimateHeartThickness(x: number, y: number) {
  if (!isPointInsideHeart(x, y)) return 0;
  const normalized = toNormalizedHeart(x, y);
  const radius = Math.hypot(normalized.x, normalized.y);
  const angle = radius > 0.000001 ? Math.atan2(normalized.y, normalized.x) : 0;
  const boundary = Math.max(0.0001, findHeartBoundaryRadius(angle));
  const inwardDistance = clamp(1 - radius / boundary, 0, 1);
  const body = Math.pow(smoothstep(inwardDistance / 0.88), 0.68);
  const lobeBoost = 1 + 0.12 * Math.exp(-Math.pow((Math.abs(normalized.x) - 0.42) * 3.2, 2))
    * smoothstep((normalized.y + 0.25) / 0.8);
  const lowerTaper = 0.42 + 0.58 * smoothstep((normalized.y + 1.02) / 0.44);
  const cleftGuard = normalized.y > 0.62 && Math.abs(normalized.x) < 0.24
    ? 0.72 + Math.abs(normalized.x) * 0.9
    : 1;
  return clamp(body * lobeBoost * lowerTaper * cleftGuard, 0, 1);
}

const normalize3 = (x: number, y: number, z: number): [number, number, number] => {
  const length = Math.hypot(x, y, z);
  return length > 0.000001
    ? [x / length, y / length, z / length]
    : [0, 0, 1];
};

/** Stable analytic-shell approximation used by both the regular heart and Pocket Starlight. */
export function computeHeartNormal(x: number, y: number, z: number): [number, number, number] {
  const localThickness = Math.max(0.0001, estimateHeartThickness(x, y) * HEART_BOUNDS.maxDepth);
  const shellRatio = clamp(Math.abs(z) / localThickness, 0, 1);
  if (shellRatio > 0.58) {
    const epsilon = 0.012;
    const dzdx = (
      estimateHeartThickness(x + epsilon, y) - estimateHeartThickness(x - epsilon, y)
    ) * HEART_BOUNDS.maxDepth / (epsilon * 2);
    const dzdy = (
      estimateHeartThickness(x, y + epsilon) - estimateHeartThickness(x, y - epsilon)
    ) * HEART_BOUNDS.maxDepth / (epsilon * 2);
    const side = z >= 0 ? 1 : -1;
    return normalize3(-dzdx * side, -dzdy * side, side);
  }
  const normalized = toNormalizedHeart(x, y);
  return normalize3(normalized.x * 0.32, normalized.y * 0.28, z / HEART_BOUNDS.maxDepth);
}

const writePoint = (
  target: VolumetricHeartTargets,
  index: number,
  x: number,
  y: number,
  z: number,
  kind: HeartPointKind,
) => {
  const offset = index * 3;
  target.positions[offset] = x;
  target.positions[offset + 1] = y;
  target.positions[offset + 2] = z;
  target.kinds[index] = kind;
  const normal = computeHeartNormal(x, y, z);
  target.normals[offset] = normal[0];
  target.normals[offset + 1] = normal[1];
  target.normals[offset + 2] = normal[2];
  const maximumDepth = Math.max(0.0001, estimateHeartThickness(x, y) * HEART_BOUNDS.maxDepth);
  const shellRatio = clamp(Math.abs(z) / maximumDepth, 0, 1);
  target.depthBands[index] = Math.abs(z) < maximumDepth * 0.24
    ? 0
    : Math.sign(z) * smoothstep((shellRatio - 0.2) / 0.8);
  target.surfaceWeights[index] = kind === 1
    ? 0.96
    : kind === 2
      ? 1
      : kind === 3
        ? 0.18
        : 0.22 + shellRatio * 0.42;
};

type RegionWriter = (x: number, y: number, sequence: number, accepted: number) => number;

const sampleHeartRegion = (
  target: VolumetricHeartTargets,
  start: number,
  count: number,
  scale: number,
  kind: HeartPointKind,
  sequenceOffset: number,
  getZ: RegionWriter,
) => {
  let accepted = 0;
  let candidate = 1;
  const maximumAttempts = Math.max(128, count * 12);
  while (accepted < count && candidate <= maximumAttempts) {
    const sequence = candidate + sequenceOffset;
    const nx = (halton(sequence, 2) * 2.44 - 1.22) * scale;
    const ny = (halton(sequence, 3) * 2.42 - 1.12) * scale;
    const x = nx * HEART_X_SCALE;
    const y = ny * HEART_Y_SCALE + HEART_Y_OFFSET;
    if (isPointInsideHeart(x, y)) {
      writePoint(target, start + accepted, x, y, getZ(x, y, sequence, accepted), kind);
      accepted += 1;
    }
    candidate += 1;
  }

  while (accepted < count) {
    const sequence = accepted + sequenceOffset + 1;
    const angle = Math.PI * 2 * halton(sequence, 2);
    const radius = Math.sqrt(halton(sequence, 3)) * 0.72 * scale;
    const x = Math.cos(angle) * radius * HEART_X_SCALE;
    const y = Math.sin(angle) * radius * HEART_Y_SCALE + HEART_Y_OFFSET;
    writePoint(target, start + accepted, x, y, getZ(x, y, sequence, accepted), kind);
    accepted += 1;
  }
};

export function sampleHeartVolume(x: number, y: number, sequence: number, index: number) {
  void x;
  void y;
  void index;
  return (hashUnit(sequence, 0x7f4a7c15) * 2 - 1) * HEART_BOUNDS.maxDepth * 0.82;
}

export function sampleHeartSurface(x: number, y: number, sequence: number, index: number) {
  void x;
  void y;
  void index;
  return (hashUnit(sequence, 0x165667b1) * 2 - 1) * HEART_BOUNDS.maxDepth * 0.56;
}

export function createVolumetricHeartTargets(requestedCount: number): VolumetricHeartTargets {
  const count = Math.max(0, Math.floor(Number.isFinite(requestedCount) ? requestedCount : 0));
  const target: VolumetricHeartTargets = {
    positions: new Float32Array(count * 3),
    normals: new Float32Array(count * 3),
    depthBands: new Float32Array(count),
    surfaceWeights: new Float32Array(count),
    kinds: new Uint8Array(count),
    counts: { legacy: count, seamRepair: 0 },
  };

  for (let index = 0; index < count; index += 1) {
    const randomB = seeded(index, 4.3);
    const randomC = seeded(index, 8.9);
    const t = (index / Math.max(1, count)) * Math.PI * 2;
    const fill = 0.08 + Math.sqrt(randomB) * 0.92;
    const heartX = 16 * Math.sin(t) ** 3;
    const heartY = 13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);
    const x = heartX * 0.135 * fill;
    const y = heartY * 0.115 * fill + 0.2;
    const localDepth = 0.28 + fill * 0.72;
    const z = (randomC - 0.5) * localDepth;
    const kind: HeartPointKind = fill > 0.9 ? 2 : fill < 0.24 ? 3 : 0;
    writePoint(target, index, x, y, z, kind);

    const offset = index * 3;
    const normal = normalize3(x * 0.18, (y - 0.2) * 0.16, z / localDepth);
    target.normals[offset] = normal[0];
    target.normals[offset + 1] = normal[1];
    target.normals[offset + 2] = normal[2];
    target.depthBands[index] = clamp(z / Math.max(0.0001, localDepth * 0.5), -1, 1);
    target.surfaceWeights[index] = 0.32 + fill * 0.56;
  }

  return target;
}

/** Compatibility name retained for Pocket Starlight and older regression tests. */
export const createBalancedHeartTargets = createVolumetricHeartTargets;

const gridKey = (x: number, y: number) => `${x}:${y}`;

/** Deterministic near-linear projected-density compensation. */
export function computeSpatialDensityWeights(positions: Float32Array, cellSize = 0.18) {
  const count = Math.floor(positions.length / 3);
  const safeCellSize = clamp(cellSize, 0.04, 2);
  const cells = new Map<string, number>();
  const cellX = new Int32Array(count);
  const cellY = new Int32Array(count);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const x = Math.floor((Number.isFinite(positions[offset]) ? positions[offset] : 0) / safeCellSize);
    const y = Math.floor((Number.isFinite(positions[offset + 1]) ? positions[offset + 1] : 0) / safeCellSize);
    cellX[index] = x;
    cellY[index] = y;
    const key = gridKey(x, y);
    cells.set(key, (cells.get(key) ?? 0) + 1);
  }

  const localCounts = new Float32Array(count);
  let mean = 0;
  for (let index = 0; index < count; index += 1) {
    let local = 0;
    for (let y = -1; y <= 1; y += 1) {
      for (let x = -1; x <= 1; x += 1) {
        local += cells.get(gridKey(cellX[index] + x, cellY[index] + y)) ?? 0;
      }
    }
    localCounts[index] = Math.max(1, local);
    mean += localCounts[index];
  }
  mean /= Math.max(1, count);

  const weights = new Float32Array(count);
  for (let index = 0; index < count; index += 1) {
    weights[index] = clamp(Math.sqrt(mean / localCounts[index]), 0.58, 1.16);
  }
  return weights;
}

export function validateHeartVolume(target: VolumetricHeartTargets) {
  const distribution = validateShapeDistribution(target.positions);
  let front = 0;
  let back = 0;
  let zMean = 0;
  let zSquareMean = 0;
  let normalizedNormals = true;
  for (let index = 0; index < target.kinds.length; index += 1) {
    const offset = index * 3;
    const z = target.positions[offset + 2];
    if (z > 0.015) front += 1;
    else if (z < -0.015) back += 1;
    zMean += z;
    zSquareMean += z * z;
    const normalLength = Math.hypot(
      target.normals[offset],
      target.normals[offset + 1],
      target.normals[offset + 2],
    );
    normalizedNormals = normalizedNormals
      && Number.isFinite(normalLength)
      && normalLength >= 0.96
      && normalLength <= 1.04;
  }
  const count = Math.max(1, target.kinds.length);
  zMean /= count;
  zSquareMean /= count;
  return {
    ...distribution,
    front,
    back,
    zVariance: Math.max(0, zSquareMean - zMean * zMean),
    normalizedNormals,
  };
}

export function validateShapeDistribution(positions: Float32Array) {
  const count = Math.floor(positions.length / 3);
  let finite = true;
  let left = 0;
  let right = 0;
  let centerDisk = 0;
  let centralStrip = 0;
  const unique = new Set<string>();
  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const x = positions[offset];
    const y = positions[offset + 1];
    const z = positions[offset + 2];
    finite = finite && Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z);
    if (x < -0.08) left += 1;
    else if (x > 0.08) right += 1;
    if (Math.hypot(x, y - HEART_Y_OFFSET) <= 0.38) centerDisk += 1;
    if (Math.abs(x) <= 0.12) centralStrip += 1;
    unique.add(`${x.toFixed(6)}:${y.toFixed(6)}:${z.toFixed(6)}`);
  }
  return {
    count,
    finite,
    uniqueCount: unique.size,
    left,
    right,
    centerDisk,
    centralStrip,
  };
}
