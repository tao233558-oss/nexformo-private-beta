import type { ParticleForm } from "../../shared/visualScene";

export const PARTICLE_SHAPE_KIND: Record<ParticleForm, number> = {
  constellation: 0,
  wave: 1,
  sphere: 2,
  torus: 6,
  spiral: 0,
  heart: 3,
  helix: 4,
  bloom: 5,
};

export type ShapeMotionProfile = {
  kind: number;
  amplitude: number;
  centerAnchor: number;
  highlightOnly: boolean;
};

export function getShapeMotionProfile(form: ParticleForm, reducedMotion = false): ShapeMotionProfile {
  const attenuation = reducedMotion ? 0.12 : 1;
  const base = form === "heart"
    ? { amplitude: 0.042, centerAnchor: 0.72, highlightOnly: false }
    : form === "bloom"
      ? { amplitude: 0.055, centerAnchor: 0.9, highlightOnly: false }
      : form === "sphere"
        ? { amplitude: 0.038, centerAnchor: 0.58, highlightOnly: false }
        : form === "helix"
          ? { amplitude: 0, centerAnchor: 1, highlightOnly: true }
          : form === "wave"
            ? { amplitude: 0.045, centerAnchor: 0.48, highlightOnly: false }
            : { amplitude: 0.022, centerAnchor: 0.5, highlightOnly: false };
  return { ...base, kind: PARTICLE_SHAPE_KIND[form], amplitude: base.amplitude * attenuation };
}

export function sampleHeartDoublePulse(time: number) {
  const period = 3.2;
  const phase = ((Number.isFinite(time) ? time : 0) % period + period) % period / period;
  const beat = (center: number, halfWidth: number, strength: number) => {
    const distance = Math.abs(phase - center);
    if (distance >= halfWidth) return 0;
    return Math.cos((distance / halfWidth) * Math.PI * 0.5) * strength;
  };
  return Math.max(0, beat(0.09, 0.065, 1) + beat(0.205, 0.052, 0.62));
}

export function sampleShapeMotionOffset(
  form: ParticleForm,
  position: readonly [number, number, number],
  time: number,
  seed = 0,
  reducedMotion = false,
): [number, number, number] {
  const profile = getShapeMotionProfile(form, reducedMotion);
  const [x, y, z] = position;
  const radius = Math.max(0.000001, Math.hypot(x, y, z));
  if (form === "heart") {
    const pulse = sampleHeartDoublePulse(time) * profile.amplitude;
    return [x / radius * pulse, y / radius * pulse, z / radius * pulse];
  }
  if (form === "bloom") {
    const planarRadius = Math.hypot(x, y);
    if (planarRadius < 0.3) return [0, 0, 0];
    const phase = Math.atan2(y, x) * 5 + time * 0.82 + seed * 0.4;
    const amount = Math.sin(phase) * profile.amplitude;
    const depthAmount = Math.sin(phase + Math.PI * 0.5) * profile.amplitude * 0.72;
    return [x / planarRadius * amount * 0.28, y / planarRadius * amount * 0.28, depthAmount];
  }
  if (form === "sphere") {
    const amount = Math.sin(time * 0.72 + radius * 2.4) * profile.amplitude;
    return [x / radius * amount, y / radius * amount, z / radius * amount];
  }
  if (form === "wave") {
    const phase = time * 0.78 + x * 0.7 + z * 0.34 + seed * 0.2;
    const slope = 0.62 * Math.cos(x * 1.2 + z * 0.7);
    const depthSlope = 0.34 * Math.cos(z * 0.7 + x * 0.2);
    const tangentLength = Math.hypot(1, slope, depthSlope);
    const amount = Math.sin(phase) * profile.amplitude;
    return [amount / tangentLength, amount * slope / tangentLength, amount * depthSlope / tangentLength];
  }
  return [0, 0, 0];
}

export function shapeMotionMagnitude(offset: readonly [number, number, number]) {
  return Math.hypot(offset[0], offset[1], offset[2]);
}
