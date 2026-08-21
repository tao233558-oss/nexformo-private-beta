import type { ParticleForm } from "../../shared/visualScene";
import {
  computeHeartNormal,
  computeSpatialDensityWeights,
  createVolumetricHeartTargets,
  estimateHeartThickness,
  HEART_BOUNDS,
} from "./particleShapeSampling";

export type ParticleSpatialMetadata = {
  normals: Float32Array;
  depthBands: Float32Array;
  surfaceWeights: Float32Array;
};

export type ParticleShapeSample = ParticleSpatialMetadata & {
  positions: Float32Array;
  density: Float32Array;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : 0));

const hashUnit = (index: number, salt: number) => {
  let value = Math.imul((index + 1) ^ salt, 2246822519) >>> 0;
  value ^= value >>> 13;
  value = Math.imul(value, 3266489917) >>> 0;
  value ^= value >>> 16;
  return (value >>> 0) / 0xffffffff;
};

const normalize3 = (x: number, y: number, z: number): [number, number, number] => {
  const length = Math.hypot(x, y, z);
  return length > 0.000001 ? [x / length, y / length, z / length] : [0, 0, 1];
};

const writeNormal = (normals: Float32Array, offset: number, value: readonly number[]) => {
  const normalized = normalize3(value[0], value[1], value[2]);
  normals[offset] = normalized[0];
  normals[offset + 1] = normalized[1];
  normals[offset + 2] = normalized[2];
};

export function createShapeSpatialMetadata(form: ParticleForm, positions: Float32Array): ParticleSpatialMetadata {
  const count = Math.floor(positions.length / 3);
  const normals = new Float32Array(count * 3);
  const depthBands = new Float32Array(count);
  const surfaceWeights = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const x = positions[offset];
    const y = positions[offset + 1];
    const z = positions[offset + 2];
    let normal: [number, number, number];
    let surfaceWeight = 0.72;
    let depthBand = 0;

    if (form === "heart") {
      normal = computeHeartNormal(x, y, z);
      const maximumDepth = Math.max(0.0001, estimateHeartThickness(x, y) * HEART_BOUNDS.maxDepth);
      const shellRatio = clamp(Math.abs(z) / maximumDepth, 0, 1);
      surfaceWeight = 0.22 + shellRatio * 0.7;
      depthBand = Math.abs(z) < maximumDepth * 0.24 ? 0 : clamp(z / maximumDepth, -1, 1);
    } else if (form === "sphere") {
      normal = normalize3(x, y, z);
      const radius = Math.max(0.0001, Math.hypot(x, y, z));
      depthBand = clamp(z / radius, -1, 1);
      surfaceWeight = 0.94;
    } else if (form === "torus") {
      const angle = Math.atan2(z, x);
      const centerX = Math.cos(angle) * 2.05;
      const centerZ = Math.sin(angle) * 2.05;
      normal = normalize3(x - centerX, y, z - centerZ);
      depthBand = clamp(z / 2.72, -1, 1);
      surfaceWeight = 0.94;
    } else if (form === "wave") {
      const dx = 0.624 * Math.cos(x * 1.2 + z * 0.7);
      const dz = 0.364 * Math.cos(x * 1.2 + z * 0.7) - 0.432 * Math.sin(z * 1.8);
      normal = normalize3(-dx, 1, -dz);
      depthBand = clamp(z / 2.34, -1, 1);
      surfaceWeight = 0.86;
    } else if (form === "helix") {
      normal = normalize3(x, Math.sin(index * 0.618) * 0.14, z);
      depthBand = clamp(z / 1.04, -1, 1);
      surfaceWeight = 0.9;
    } else if (form === "bloom") {
      const radius = Math.hypot(x, y);
      const petalSide = z >= 0 ? 1 : -1;
      normal = radius < 0.66
        ? normalize3(x * 0.18, y * 0.18, petalSide)
        : normalize3(-x * 0.13, -y * 0.13, petalSide * 0.88);
      depthBand = clamp(z / 0.72, -1, 1);
      surfaceWeight = radius < 0.66 ? 0.56 : 0.9;
    } else if (form === "spiral") {
      normal = normalize3(x * 0.34, 0.82, z * 0.34);
      depthBand = clamp(z / 3.35, -1, 1);
      surfaceWeight = 0.78;
    } else {
      normal = normalize3(x, y * 0.8, z);
      depthBand = clamp(z / 2.7, -1, 1);
      surfaceWeight = 0.68;
    }

    writeNormal(normals, offset, normal);
    depthBands[index] = depthBand;
    surfaceWeights[index] = surfaceWeight;
  }
  return { normals, depthBands, surfaceWeights };
}

export function createParticleShapeSample(form: ParticleForm, requestedCount: number): ParticleShapeSample {
  const count = Math.max(0, Math.floor(Number.isFinite(requestedCount) ? requestedCount : 0));
  if (form === "heart") {
    const heart = createVolumetricHeartTargets(count);
    return {
      positions: heart.positions,
      normals: heart.normals,
      depthBands: heart.depthBands,
      surfaceWeights: heart.surfaceWeights,
      density: computeSpatialDensityWeights(heart.positions),
    };
  }

  const positions = new Float32Array(count * 3);
  const gridWidth = Math.ceil(Math.sqrt(count * 1.65));
  const gridHeight = Math.ceil(count / Math.max(1, gridWidth));
  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const randomA = hashUnit(index, 0x27d4eb2f);
    const randomB = hashUnit(index, 0x165667b1);
    const randomC = hashUnit(index, 0x6d2b79f5);
    let x = 0;
    let y = 0;
    let z = 0;

    if (form === "wave") {
      const column = index % gridWidth;
      const row = Math.floor(index / gridWidth);
      x = (column / Math.max(1, gridWidth - 1) - 0.5) * 7.5;
      z = (row / Math.max(1, gridHeight - 1) - 0.5) * 4.6;
      const phase = x * 1.2 + z * 0.7;
      y = Math.sin(phase) * 0.52 + Math.cos(z * 1.8) * 0.24;
      const normal = normalize3(
        -0.624 * Math.cos(phase),
        1,
        -0.364 * Math.cos(phase) + 0.432 * Math.sin(z * 1.8),
      );
      const thickness = (randomA - 0.5) * 0.16;
      x += normal[0] * thickness;
      y += normal[1] * thickness;
      z += normal[2] * thickness;
    } else if (form === "sphere") {
      const phi = Math.acos(1 - (2 * (index + 0.5)) / Math.max(1, count));
      const theta = Math.PI * (1 + Math.sqrt(5)) * index;
      const radius = 2.2 + (randomA - 0.5) * 0.1;
      x = Math.cos(theta) * Math.sin(phi) * radius;
      y = Math.cos(phi) * radius;
      z = Math.sin(theta) * Math.sin(phi) * radius;
    } else if (form === "torus") {
      const u = randomA * Math.PI * 2;
      const v = randomB * Math.PI * 2;
      const majorRadius = 2.05;
      const tubeRadius = 0.62 + (randomC - 0.5) * 0.06;
      x = (majorRadius + tubeRadius * Math.cos(v)) * Math.cos(u);
      y = tubeRadius * Math.sin(v);
      z = (majorRadius + tubeRadius * Math.cos(v)) * Math.sin(u);
    } else if (form === "spiral") {
      const arm = index % 5;
      const radius = Math.sqrt(randomA) * 3.35;
      const angle = radius * 2.35 + (arm / 5) * Math.PI * 2 + (randomB - 0.5) * 0.38;
      x = Math.cos(angle) * radius;
      z = Math.sin(angle) * radius;
      y = (randomC - 0.5) * (0.18 + radius * 0.12);
    } else if (form === "helix") {
      const progress = index / Math.max(1, count - 1);
      const angle = progress * Math.PI * 8;
      const strand = index % 2 === 0 ? 1 : -1;
      const connector = index % 11 === 0;
      const baseRadius = connector ? (randomB * 2 - 1) * 0.82 : strand * 0.9;
      const radialX = Math.cos(angle);
      const radialZ = Math.sin(angle);
      const crossAngle = randomB * Math.PI * 2;
      const crossRadius = (connector ? 0.035 : 0.095) * Math.sqrt(randomC);
      x = radialX * (baseRadius + Math.cos(crossAngle) * crossRadius);
      z = radialZ * (baseRadius + Math.cos(crossAngle) * crossRadius);
      y = (progress - 0.5) * 5.2 + Math.sin(crossAngle) * crossRadius;
    } else if (form === "bloom") {
      if (index % 7 === 0) {
        const radius = Math.sqrt(randomA) * 0.62;
        const angle = randomB * Math.PI * 2;
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * radius;
        z = (randomC - 0.5) * 0.28 * (radius / 0.62);
      } else {
        const angle = randomA * Math.PI * 2;
        const petalWave = Math.abs(Math.sin(angle * 5));
        const petalRadius = (0.34 + petalWave * 2.03) * Math.sqrt(randomB);
        const fill = clamp(petalRadius / 2.37, 0, 1);
        x = Math.cos(angle) * petalRadius;
        y = Math.sin(angle) * petalRadius;
        const arch = Math.sin(Math.PI * fill);
        z = Math.sin(angle * 5) * 0.5 * arch + 0.16 * arch * arch;
        z += (randomC - 0.5) * 0.14;
      }
    } else {
      const cluster = index % 9;
      const clusterAngle = (cluster / 9) * Math.PI * 2;
      const clusterRadius = 0.65 + (cluster % 3) * 0.72;
      const centerX = Math.cos(clusterAngle) * clusterRadius;
      const centerY = Math.sin(clusterAngle * 1.7) * 1.18;
      const centerZ = Math.sin(clusterAngle) * clusterRadius;
      const spread = 0.22 + (cluster % 4) * 0.09;
      x = centerX + (randomA - 0.5) * spread * 2.4;
      y = centerY + (randomB - 0.5) * spread * 1.8;
      z = centerZ + (randomC - 0.5) * spread * 2.4;
    }

    positions[offset] = x;
    positions[offset + 1] = y;
    positions[offset + 2] = z;
  }

  return {
    positions,
    density: computeSpatialDensityWeights(positions),
    ...createShapeSpatialMetadata(form, positions),
  };
}

export function reorderParticleShapeSample(sample: ParticleShapeSample, mapping: Uint32Array): ParticleShapeSample {
  const count = mapping.length;
  const positions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  const depthBands = new Float32Array(count);
  const surfaceWeights = new Float32Array(count);
  const density = new Float32Array(count);
  for (let sourceIndex = 0; sourceIndex < count; sourceIndex += 1) {
    const targetIndex = mapping[sourceIndex];
    const sourceOffset = sourceIndex * 3;
    const targetOffset = targetIndex * 3;
    positions[sourceOffset] = sample.positions[targetOffset];
    positions[sourceOffset + 1] = sample.positions[targetOffset + 1];
    positions[sourceOffset + 2] = sample.positions[targetOffset + 2];
    normals[sourceOffset] = sample.normals[targetOffset];
    normals[sourceOffset + 1] = sample.normals[targetOffset + 1];
    normals[sourceOffset + 2] = sample.normals[targetOffset + 2];
    depthBands[sourceIndex] = sample.depthBands[targetIndex];
    surfaceWeights[sourceIndex] = sample.surfaceWeights[targetIndex];
    density[sourceIndex] = sample.density[targetIndex];
  }
  return { positions, normals, depthBands, surfaceWeights, density };
}

export type DepthLightSample = {
  diffuse: number;
  rim: number;
  depth: number;
  light: number;
  alpha: number;
};

export function sampleDepthLightFactor(
  facing: number,
  depthBand: number,
  surfaceWeight: number,
  densityWeight = 1,
  role: "core" | "body" | "accent" = "body",
): DepthLightSample {
  const safeFacing = clamp(facing, -1, 1);
  const safeDepth = clamp(depthBand, -1, 1);
  const surface = clamp(surfaceWeight, 0, 1);
  const diffuse = clamp(0.58 + Math.max(0, safeFacing) * 0.32 - Math.max(0, -safeFacing) * 0.16, 0.38, 0.92);
  const rim = clamp(Math.pow(1 - Math.abs(safeFacing), 2) * surface * 0.22, 0, 0.22);
  const depth = clamp(0.78 + safeDepth * 0.12, 0.64, 0.92);
  const roleLight = role === "core" ? 0.08 : role === "accent" ? 0.06 : 0;
  const light = clamp((diffuse * depth + rim + roleLight) * clamp(densityWeight, 0.58, 1.16), 0.34, 1.16);
  const alpha = clamp((0.36 + surface * 0.34 + (role === "accent" ? 0.1 : 0)) * depth, 0.2, 0.78);
  return { diffuse, rim, depth, light, alpha };
}
