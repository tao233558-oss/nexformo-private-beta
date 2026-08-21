import type {
  MusicPlaybackStatus,
  MusicRhythmIntensity,
} from "../../shared/music";

export type MusicRhythmInput = {
  trackId: string | null;
  status: MusicPlaybackStatus;
  currentTime: number;
  intensity: MusicRhythmIntensity;
  reducedMotion?: boolean;
};

export type MusicRhythmFrame = {
  pulse: number;
  accent: number;
  energy: number;
  orbit: number;
};

const ZERO_FRAME: MusicRhythmFrame = {
  pulse: 0,
  accent: 0,
  energy: 0,
  orbit: 0,
};

const INTENSITY_SCALE: Record<MusicRhythmIntensity, number> = {
  off: 0,
  low: 0.28,
  medium: 0.62,
  high: 1,
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const clamp01 = (value: number) => clamp(value, 0, 1);

const hashTrack = (value: string) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const seededBeatValue = (seed: number, beatIndex: number) => {
  let value = (seed ^ Math.imul(beatIndex + 1, 0x45d9f3b)) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b) >>> 0;
  return ((value ^ (value >>> 16)) >>> 0) / 0xffffffff;
};

const sanitizeTime = (value: number) =>
  Number.isFinite(value) ? Math.max(0, value) : 0;

/**
 * Produces a deterministic, seek-safe visual rhythm target from playback time.
 * It is an aesthetic oscillator, not FFT or audio-spectrum analysis.
 */
export function sampleMusicRhythm(input: MusicRhythmInput): MusicRhythmFrame {
  if (
    input.status !== "playing" ||
    !input.trackId ||
    input.intensity === "off"
  ) {
    return { ...ZERO_FRAME };
  }

  const time = sanitizeTime(input.currentTime);
  const seed = hashTrack(input.trackId);
  const bpm = 84 + (seed % 49);
  const beats = (time * bpm) / 60;
  const beatIndex = Math.floor(beats);
  const beatPhase = beats - beatIndex;
  const beatAttack = Math.exp(-beatPhase * 8.5);
  const beatVariation = seededBeatValue(seed, beatIndex);
  const downbeat = beatIndex % 4 === 0;
  const phaseOffset = (seed % 6_283) / 1_000;

  const rawPulse = beatAttack * (0.64 + beatVariation * 0.24);
  const rawAccent = beatAttack *
    (downbeat ? 0.96 : beatVariation > 0.82 ? 0.68 : 0.1 + beatVariation * 0.12);
  const rawEnergy = clamp01(
    0.48 +
      Math.sin(time * 0.37 + phaseOffset) * 0.14 +
      Math.sin(time * 0.11 + phaseOffset * 0.7) * 0.1 +
      rawPulse * 0.16,
  );
  const rawOrbit = clamp01(
    0.52 + Math.sin(beats * 0.16 + phaseOffset) * 0.28 + rawAccent * 0.12,
  );

  const accessibilityScale = input.reducedMotion ? 0.18 : 1;
  const scale = INTENSITY_SCALE[input.intensity] * accessibilityScale;

  return {
    pulse: clamp01(rawPulse * scale),
    accent: clamp01(rawAccent * scale),
    energy: clamp01(rawEnergy * scale),
    orbit: clamp01(rawOrbit * scale),
  };
}

const damp = (current: number, target: number, rate: number, deltaSeconds: number) => {
  const blend = 1 - Math.exp(-rate * deltaSeconds);
  return current + (target - current) * blend;
};

/**
 * Smooths deterministic rhythm targets for use inside a render loop.
 * Paused, ended, idle, loading, and error states decay gently to rest.
 */
export class MusicRhythmController {
  private frame: MusicRhythmFrame = { ...ZERO_FRAME };

  update(input: MusicRhythmInput, deltaSeconds: number): MusicRhythmFrame {
    if (input.intensity === "off") return this.reset();

    const delta = Number.isFinite(deltaSeconds)
      ? clamp(deltaSeconds, 0, 1)
      : 1 / 60;
    const target = sampleMusicRhythm(input);
    const playing = input.status === "playing" && Boolean(input.trackId);

    this.frame = {
      pulse: damp(this.frame.pulse, target.pulse, playing ? 13 : 5.5, delta),
      accent: damp(this.frame.accent, target.accent, playing ? 17 : 7, delta),
      energy: damp(this.frame.energy, target.energy, playing ? 4.5 : 3.8, delta),
      orbit: damp(this.frame.orbit, target.orbit, playing ? 3.2 : 3.2, delta),
    };

    const maximum = input.reducedMotion ? 0.18 : 1;
    this.frame.pulse = clamp(this.frame.pulse, 0, maximum);
    this.frame.accent = clamp(this.frame.accent, 0, maximum);
    this.frame.energy = clamp(this.frame.energy, 0, maximum);
    this.frame.orbit = clamp(this.frame.orbit, 0, maximum);

    return this.snapshot();
  }

  snapshot(): MusicRhythmFrame {
    return { ...this.frame };
  }

  reset(): MusicRhythmFrame {
    this.frame = { ...ZERO_FRAME };
    return this.snapshot();
  }
}
