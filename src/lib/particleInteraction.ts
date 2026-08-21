export type ParticleInteractionRole = "core" | "body" | "accent";

export type PointerInteractionInput = {
  particle: readonly [number, number];
  pointer: readonly [number, number];
  active: boolean;
  inside: boolean;
  attraction: number;
  dragging?: boolean;
  reducedMotion?: boolean;
  role?: ParticleInteractionRole;
};

export type PointerDepthInput = PointerInteractionInput & {
  normal: readonly [number, number, number];
  depthBand: number;
  surfaceWeight: number;
};

export type PointerCavityInput = PointerInteractionInput & {
  seed?: number;
};

export type ParallaxInput = {
  pointer: readonly [number, number];
  active: boolean;
  inside: boolean;
  reducedMotion?: boolean;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));

const smoothstep = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

export function getPointerSurfaceFalloff(distance: number, radius: number) {
  if (!Number.isFinite(distance) || !Number.isFinite(radius) || radius <= 0 || distance >= radius) return 0;
  return smoothstep(1 - Math.max(0, distance) / radius);
}

export function clampSurfaceDisplacement(value: number, dragging = false, reducedMotion = false) {
  const maximum = (dragging ? 0.145 : 0.082) * (reducedMotion ? 0.12 : 1);
  return Math.min(maximum, Math.max(-maximum, Number.isFinite(value) ? value : 0));
}

export function samplePointerDisplacement({
  particle,
  pointer,
  active,
  inside,
  attraction,
  dragging = false,
  reducedMotion = false,
  role = "body",
}: PointerInteractionInput): [number, number] {
  if (!active || !inside) return [0, 0];
  const strength = clamp01(attraction);
  if (strength === 0) return [0, 0];
  const dx = pointer[0] - particle[0];
  const dy = pointer[1] - particle[1];
  const distance = Math.hypot(dx, dy);
  const radius = dragging ? 1.28 : 1.02;
  if (!Number.isFinite(distance) || distance <= 0.000001 || distance >= radius) return [0, 0];
  const roleScale = role === "core" ? 0.42 : role === "accent" ? 1 : 0.76;
  const motionScale = reducedMotion ? 0.12 : 1;
  const falloff = getPointerSurfaceFalloff(distance, radius);
  const maximum = (dragging ? 0.075 : 0.034) * roleScale * motionScale;
  const magnitude = Math.min(maximum, falloff * strength * maximum);
  return [dx / distance * magnitude, dy / distance * magnitude];
}

/**
 * Pre-Phase-12 pointer hollow, gated by real pointer presence and made finite.
 * The direction is outward from the pointer, with a seeded fallback at zero
 * distance so the center can open without NaN or a permanent default force.
 */
export function samplePointerCavityDisplacement({
  particle,
  pointer,
  active,
  inside,
  attraction,
  dragging = false,
  reducedMotion = false,
  role = "body",
  seed = 0,
}: PointerCavityInput): [number, number] {
  if (!active || !inside) return [0, 0];
  const dx = particle[0] - pointer[0];
  const dy = particle[1] - pointer[1];
  const distance = Math.hypot(dx, dy);
  const radius = dragging ? 0.98 : 0.72;
  const falloff = getPointerSurfaceFalloff(distance, radius);
  if (falloff === 0) return [0, 0];

  const angle = clamp01(seed) * Math.PI * 2;
  const directionX = distance > 0.000001 ? dx / distance : Math.cos(angle);
  const directionY = distance > 0.000001 ? dy / distance : Math.sin(angle);
  const roleScale = role === "core" ? 0.52 : role === "accent" ? 1 : 0.84;
  const motionScale = reducedMotion ? 0.12 : 1;
  const pointerStrength = 0.36 + clamp01(attraction) * 0.64;
  const maximum = (dragging ? 0.28 : 0.16) * roleScale * motionScale;
  const magnitude = Math.min(maximum, falloff * pointerStrength * maximum);
  return [directionX * magnitude, directionY * magnitude];
}

export function samplePointerDepthIndentation({
  particle,
  pointer,
  active,
  inside,
  attraction,
  dragging = false,
  reducedMotion = false,
  role = "body",
  normal,
  depthBand,
  surfaceWeight,
}: PointerDepthInput): [number, number, number] {
  if (!active || !inside) return [0, 0, 0];
  const dx = pointer[0] - particle[0];
  const dy = pointer[1] - particle[1];
  const distance = Math.hypot(dx, dy);
  const radius = dragging ? 1.28 : 1.02;
  const falloff = getPointerSurfaceFalloff(distance, radius);
  if (falloff === 0) return [0, 0, 0];
  const normalLength = Math.hypot(normal[0], normal[1], normal[2]);
  if (!Number.isFinite(normalLength) || normalLength <= 0.000001) return [0, 0, 0];
  const front = smoothstep((Math.min(1, Math.max(-1, depthBand)) + 0.08) / 1.08);
  const surface = clamp01(surfaceWeight);
  const roleScale = role === "core" ? 0.28 : role === "accent" ? 1 : 0.72;
  const strength = clamp01(attraction) * falloff * front * surface * roleScale;
  const inward = clampSurfaceDisplacement(
    strength * (dragging ? 0.145 : 0.082),
    dragging,
    reducedMotion,
  );
  const ring = Math.exp(-Math.pow((distance / radius - 0.58) * 8, 2))
    * strength
    * (reducedMotion ? 0.12 : 1)
    * 0.012;
  const signed = -inward + ring;
  return [
    normal[0] / normalLength * signed,
    normal[1] / normalLength * signed,
    normal[2] / normalLength * signed,
  ];
}

export function sampleParallaxTarget({
  pointer,
  active,
  inside,
  reducedMotion = false,
}: ParallaxInput): [number, number] {
  if (!active || !inside) return [0, 0];
  const scale = reducedMotion ? 0.12 : 1;
  return [
    Math.min(0.2, Math.max(-0.2, (Number.isFinite(pointer[0]) ? pointer[0] : 0) * 0.2)) * scale,
    Math.min(0.11, Math.max(-0.11, (Number.isFinite(pointer[1]) ? pointer[1] : 0) * 0.11)) * scale,
  ];
}

export function settleInteractionDisplacement(current: number, deltaSeconds: number, active: boolean) {
  if (!active && Math.abs(current) <= 0.000001) return 0;
  const delta = Math.max(0, Number.isFinite(deltaSeconds) ? deltaSeconds : 0);
  const next = current * Math.exp(-delta * 14);
  return Math.abs(next) < 0.000001 ? 0 : next;
}

export function pointerInteractionReturnsToRest(input: PointerInteractionInput) {
  return samplePointerDisplacement({ ...input, active: false });
}
