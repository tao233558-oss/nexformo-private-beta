export type ParticleRole = 0 | 1 | 2;

const clamp01 = (value: number) => Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));

const spatialKey = (x: number, y: number, z: number) => {
  const quantize = (value: number) => Math.min(1023, Math.max(0, Math.round(clamp01(value) * 1023)));
  const xx = quantize(x);
  const yy = quantize(y);
  const zz = quantize(z);
  let key = 0;
  for (let bit = 0; bit < 10; bit += 1) {
    key |= ((xx >> bit) & 1) << (bit * 3);
    key |= ((yy >> bit) & 1) << (bit * 3 + 1);
    key |= ((zz >> bit) & 1) << (bit * 3 + 2);
  }
  return key >>> 0;
};

const normalizedSpatialEntries = (positions: Float32Array) => {
  const count = Math.floor(positions.length / 3);
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const x = Number.isFinite(positions[offset]) ? positions[offset] : 0;
    const y = Number.isFinite(positions[offset + 1]) ? positions[offset + 1] : 0;
    const z = Number.isFinite(positions[offset + 2]) ? positions[offset + 2] : 0;
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
  }
  const dx = Math.max(0.0001, maxX - minX);
  const dy = Math.max(0.0001, maxY - minY);
  const dz = Math.max(0.0001, maxZ - minZ);
  return Array.from({ length: count }, (_, index) => {
    const offset = index * 3;
    return {
      index,
      key: spatialKey(
        ((Number.isFinite(positions[offset]) ? positions[offset] : 0) - minX) / dx,
        ((Number.isFinite(positions[offset + 1]) ? positions[offset + 1] : 0) - minY) / dy,
        ((Number.isFinite(positions[offset + 2]) ? positions[offset + 2] : 0) - minZ) / dz,
      ),
    };
  }).sort((left, right) => left.key - right.key || left.index - right.index);
};

/** Deterministic O(n log n) Morton-order correspondence. */
export function createSpatialParticleMapping(source: Float32Array, target: Float32Array) {
  const count = Math.min(Math.floor(source.length / 3), Math.floor(target.length / 3));
  const sourceEntries = normalizedSpatialEntries(source.subarray(0, count * 3));
  const targetEntries = normalizedSpatialEntries(target.subarray(0, count * 3));
  const mapping = new Uint32Array(count);
  for (let rank = 0; rank < count; rank += 1) {
    mapping[sourceEntries[rank].index] = targetEntries[rank].index;
  }
  return mapping;
}

export function reorderParticleTargets(target: Float32Array, mapping: Uint32Array) {
  const reordered = new Float32Array(mapping.length * 3);
  for (let sourceIndex = 0; sourceIndex < mapping.length; sourceIndex += 1) {
    const targetIndex = mapping[sourceIndex];
    reordered[sourceIndex * 3] = target[targetIndex * 3];
    reordered[sourceIndex * 3 + 1] = target[targetIndex * 3 + 1];
    reordered[sourceIndex * 3 + 2] = target[targetIndex * 3 + 2];
  }
  return reordered;
}

export function createMorphCurveControls(source: Float32Array, target: Float32Array) {
  const count = Math.min(source.length, target.length) / 3;
  const controls = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const dx = target[offset] - source[offset];
    const dy = target[offset + 1] - source[offset + 1];
    const dz = target[offset + 2] - source[offset + 2];
    const length = Math.max(0.0001, Math.hypot(dx, dy, dz));
    const seed = ((Math.imul(index + 1, 2654435761) >>> 0) / 0xffffffff) * Math.PI * 2;
    const nx = -dy / length;
    const ny = dx / length;
    controls[offset] = (nx * Math.cos(seed) + dz / length * Math.sin(seed)) * 0.24;
    controls[offset + 1] = (ny * Math.cos(seed) - dx / length * Math.sin(seed)) * 0.24;
    controls[offset + 2] = Math.sin(seed) * 0.18;
  }
  return controls;
}

export function getCoherentMorphPhase(progress: number) {
  const value = clamp01(progress);
  if (value < 0.16) return { phase: "release" as const, progress: value / 0.16 };
  if (value < 0.82) return { phase: "travel" as const, progress: (value - 0.16) / 0.66 };
  return { phase: "settle" as const, progress: clamp01((value - 0.82) / 0.18) };
}

const smooth = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

export function sampleCoherentMorphPosition(
  source: [number, number, number],
  target: [number, number, number],
  control: [number, number, number],
  progress: number,
  reducedMotion = false,
): [number, number, number] {
  if (progress <= 0) return [...source];
  if (progress >= 1) return [...target];
  const t = smooth(progress);
  const arc = Math.sin(Math.PI * t) * (reducedMotion ? 0.08 : 1);
  const release = Math.sin(Math.PI * Math.min(1, clamp01(progress) / 0.22)) * (1 - smooth(clamp01((progress - 0.16) / 0.22)));
  const sourceLength = Math.max(0.0001, Math.hypot(...source));
  return [0, 1, 2].map((axis) =>
    source[axis] + (target[axis] - source[axis]) * t + control[axis] * arc + source[axis] / sourceLength * release * (reducedMotion ? 0.008 : 0.055),
  ) as [number, number, number];
}

export function assignParticleRoles(count: number, seed = 0x51f15e) {
  const roles = new Float32Array(Math.max(0, Math.floor(count)));
  for (let index = 0; index < roles.length; index += 1) {
    const hash = Math.imul((index + 1) ^ seed, 2246822519) >>> 0;
    const unit = hash / 0xffffffff;
    roles[index] = unit < 0.12 ? 0 : unit < 0.88 ? 1 : 2;
  }
  return roles;
}

export function countParticleRoles(roles: Float32Array) {
  const counts = { core: 0, body: 0, accent: 0 };
  for (const role of roles) {
    if (role < 0.5) counts.core += 1;
    else if (role < 1.5) counts.body += 1;
    else counts.accent += 1;
  }
  return counts;
}

export function shouldSuppressClickAfterDrag(distance: number, threshold = 0.035) {
  return Number.isFinite(distance) && distance > threshold;
}
