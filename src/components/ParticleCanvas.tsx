import {
  Component,
  type MouseEvent as ReactMouseEvent,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  PARTICLE_FORMS,
  type ParticleForm,
  type VisualScene,
} from "../../shared/visualScene";
import type { VoiceActivity } from "../../shared/companion";
import {
  createSolEmotionalState,
  deriveSolExpression,
  type SolEmotionalState,
} from "../../shared/solEmotion";
import type {
  MusicPlaybackStatus,
  MusicRhythmIntensity,
} from "../../shared/music";
import type { SolMemoryResonance } from "../../shared/solMemory";
import {
  SOL_MOTION_PRIORITY,
  getSolMotionVisual,
  samplePocketStarlight,
} from "../../shared/solMotion";
import { sampleSolMusicRitual } from "../../shared/solMusicRitual";
import {
  createSolWeatherState,
  getSolWeatherVisualState,
  type SolWeatherState,
} from "../../shared/weather";
import { MusicRhythmController } from "../lib/musicRhythm";
import {
  assignParticleRoles,
  createMorphCurveControls,
  createSpatialParticleMapping,
  shouldSuppressClickAfterDrag,
} from "../lib/particleMorph";
import {
  createParticleShapeSample,
  reorderParticleShapeSample,
  type ParticleShapeSample,
} from "../lib/particleVolume";
import { sampleParallaxTarget } from "../lib/particleInteraction";
import { PARTICLE_SHAPE_KIND } from "../lib/particleShapeMotion";
import { sampleGlyphAlphaPoints } from "../lib/pocketStarlight";
import { useReducedMotion } from "../hooks/useReducedMotion";
import {
  createSolPresenceState,
  type SolAutonomyLevel,
  type SolInteraction,
  type SolPresenceState,
} from "../lib/solPresenceController";

type ParticleCanvasProps = {
  scene: VisualScene;
  generating: boolean;
  experienceMode: "hero" | "entering" | "studio" | "focus";
  voiceActivity?: VoiceActivity;
  audioLevel?: number;
  musicTrackId?: string | null;
  musicStatus?: MusicPlaybackStatus;
  musicTime?: number;
  musicIntensity?: MusicRhythmIntensity;
  solPresence?: SolPresenceState;
  solEmotion?: SolEmotionalState;
  solAutonomy?: SolAutonomyLevel;
  weather?: SolWeatherState;
  memoryResonance?: SolMemoryResonance | null;
  onSolInteraction?: (interaction: SolInteraction) => void;
};

type PointerPresenceState = {
  position: THREE.Vector2;
  active: boolean;
  down: boolean;
  dragging: boolean;
  dragReported: boolean;
  downPosition: THREE.Vector2;
  ripplePosition: THREE.Vector2;
  rippleAt: number;
  velocity: THREE.Vector2;
  lastPosition: THREE.Vector2;
  lastAt: number;
  suppressClick: boolean;
};

const FALLBACK_SOL_PRESENCE = createSolPresenceState(0);
const FALLBACK_SOL_EMOTION = createSolEmotionalState(0);
const FALLBACK_SOL_WEATHER = createSolWeatherState(0);

const vertexShader = /* glsl */ `
  attribute float aSeed;
  attribute float aRole;
  attribute vec3 aTarget;
  attribute vec3 aMorphCurve;
  attribute vec3 aPocketTarget;
  attribute vec3 aHeartTarget;
  attribute vec3 aShapeNormal;
  attribute vec3 aHeartNormal;
  attribute vec3 aShapeMeta;
  attribute vec3 aHeartMeta;

  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform float uSpeed;
  uniform float uTurbulence;
  uniform float uCohesion;
  uniform float uPointSize;
  uniform float uGenerating;
  uniform float uImmersion;
  uniform float uReducedMotion;
  uniform float uVoiceLevel;
  uniform float uVoiceMode;
  uniform float uMusicPulse;
  uniform float uMusicAccent;
  uniform float uMusicEnergy;
  uniform float uSolPulse;
  uniform float uSolSway;
  uniform float uSolGather;
  uniform float uSolVertical;
  uniform float uSolSparkle;
  uniform float uSolWarmth;
  uniform float uSolPointerAttraction;
  uniform float uMemoryResonance;
  uniform float uShapeKind;
  uniform float uGestureStrength;
  uniform float uGestureStillness;
  uniform float uGestureFold;
  uniform float uGestureBloom;
  uniform float uGestureEmbrace;
  uniform float uGestureCorePulse;
  uniform float uGestureSway;
  uniform float uGestureOrbit;
  uniform float uGestureSparkle;
  uniform float uGestureWarmth;
  uniform float uLyricRipple;
  uniform float uPauseFreeze;
  uniform float uResumeHeartbeat;
  uniform float uTrackTransition;
  uniform float uPocketStarlight;
  uniform float uPocketDissolve;
  uniform vec2 uPointerPoint;
  uniform float uPointerActive;
  uniform float uPointerDragging;
  uniform float uPointerRipple;
  uniform vec2 uRipplePoint;

  varying float vSeed;
  varying float vGlow;
  varying float vRole;
  varying float vDensityWeight;
  varying float vShapeAccent;
  varying float vFacing;
  varying float vRim;
  varying float vDepthBand;
  varying float vSurfaceWeight;
  varying float vViewDepth;

  float easeInOut(float value) {
    return value * value * (3.0 - 2.0 * value);
  }

  void main() {
    float rawProgress = clamp(uProgress, 0.0, 1.0);
    float progress = easeInOut(rawProgress);
    float release = sin(3.14159265 * min(1.0, rawProgress / 0.22)) * (1.0 - easeInOut(clamp((rawProgress - 0.16) / 0.22, 0.0, 1.0)));
    float travelArc = sin(3.14159265 * progress) * (1.0 - uReducedMotion * 0.92);
    vec3 sourceDirection = normalize(position + vec3(0.0001));
    vec3 transformed = mix(position, aTarget, progress);
    transformed += aMorphCurve * travelArc;
    transformed += sourceDirection * release * mix(0.055, 0.008, uReducedMotion);
    float motionScale = 1.0 - uReducedMotion * 0.88;
    float coreRole = 1.0 - step(0.5, aRole);
    float bodyRole = step(0.5, aRole) * (1.0 - step(1.5, aRole));
    float accentRole = step(1.5, aRole);
    float pocketHeartMix = uPocketStarlight * (coreRole + bodyRole) * 0.9;
    vec3 shapeNormal = normalize(mix(aShapeNormal, aHeartNormal, pocketHeartMix) + vec3(0.0001));
    vec3 shapeMeta = mix(aShapeMeta, aHeartMeta, pocketHeartMix);
    float depthBand = shapeMeta.x;
    float surfaceWeight = shapeMeta.y;
    float roleMotion = coreRole * 0.55 + bodyRole + accentRole * 0.78;
    float stillnessScale = (1.0 - uGestureStillness * 0.78) * (1.0 - uPauseFreeze * 0.74);
    float time = uTime * mix(0.08, 0.72, uSpeed) * motionScale * stillnessScale * (1.0 + uImmersion * 1.8);

    vec3 organic = vec3(
      sin(time + transformed.y * 1.7 + aSeed * 8.0),
      cos(time * 0.83 + transformed.z * 1.9 + aSeed * 5.0),
      sin(time * 0.61 + transformed.x * 1.5 + aSeed * 11.0)
    );
    transformed += organic * uTurbulence * 0.2 * roleMotion;
    transformed *= mix(1.12, 0.82, uCohesion);
    transformed *= 1.0 + uImmersion * 0.06;

    float fieldRadius = length(transformed);
    float listeningPulse = sin(uTime * 2.2 - fieldRadius * 2.8 + aSeed * 2.0) * 0.035;
    float speakingWave = sin(uTime * 7.0 - fieldRadius * 5.0 + aSeed * 5.0) * uVoiceLevel * 0.12;
    vec3 fieldDirection = normalize(transformed + vec3(0.0001));
    transformed += fieldDirection * listeningPulse * step(0.5, uVoiceMode) * (1.0 - step(1.5, uVoiceMode));
    transformed -= fieldDirection * 0.08 * step(1.5, uVoiceMode) * (1.0 - step(2.5, uVoiceMode));
    transformed += fieldDirection * speakingWave * step(2.5, uVoiceMode);
    transformed *= 1.0 + uMusicPulse * (0.025 + coreRole * 0.07) + uMusicEnergy * bodyRole * 0.014;
    transformed += fieldDirection * uMusicAccent * accentRole * (0.08 + sin(aSeed * 31.0) * 0.02);

    float solBreath = sin(uTime * 1.8 + aSeed * 0.8) * uSolPulse * 0.035;
    transformed *= 1.0 + solBreath - uSolGather * 0.13;
    transformed.x += sin(uTime * 1.35 + transformed.y * 0.55 + aSeed * 2.0) * uSolSway * 0.22;
    transformed.y += sin(uTime * 2.15 + aSeed * 4.0) * uSolVertical * 0.18;
    float memoryWave = sin(uTime * 2.4 - fieldRadius * 4.2 + aSeed * 7.0) * uMemoryResonance;
    transformed += fieldDirection * memoryWave * 0.15 * motionScale;
    transformed *= 1.0 + uMemoryResonance * 0.035 * motionScale;

    float gestureBreath = sin(uTime * 1.55 + aSeed * 0.4) * uGestureStrength * (0.012 + coreRole * 0.025);
    transformed *= 1.0 + gestureBreath + uGestureBloom * 0.11 - uGestureFold * 0.1;
    transformed.x -= sign(transformed.x + 0.0001) * uGestureEmbrace * max(0.0, 1.35 - abs(transformed.y)) * 0.085;
    transformed.x += sin(uTime * 1.2 + transformed.y * 0.65) * uGestureSway * 0.1;
    float gestureAngle = uGestureOrbit * 0.075;
    transformed.xz = mat2(cos(gestureAngle), -sin(gestureAngle), sin(gestureAngle), cos(gestureAngle)) * transformed.xz;
    transformed *= 1.0 + sin(uTime * 3.4) * uGestureCorePulse * coreRole * 0.055;

    float shapeMotionScale = motionScale * (1.0 - uPauseFreeze * 0.8);
    vec3 shapeDirection = shapeNormal;
    float shapeAccent = 0.0;
    if (uShapeKind > 2.5 && uShapeKind < 3.5) {
      float heartCycle = fract(uTime / 3.2 - surfaceWeight * 0.012);
      float firstBeat = smoothstep(0.025, 0.09, heartCycle) * (1.0 - smoothstep(0.09, 0.16, heartCycle));
      float secondBeat = smoothstep(0.16, 0.205, heartCycle) * (1.0 - smoothstep(0.205, 0.265, heartCycle));
      float doubleBeat = firstBeat + secondBeat * 0.62;
      transformed += shapeDirection * doubleBeat * (0.015 + coreRole * 0.035) * shapeMotionScale;
      shapeAccent = (0.5 + 0.5 * sin(uTime * 1.65 - fieldRadius * 3.4)) * (0.22 + coreRole * 0.2);
    } else if (uShapeKind > 4.5 && uShapeKind < 5.5) {
      float petalRadius = length(transformed.xy);
      float petalAnchor = smoothstep(0.32, 1.15, petalRadius);
      float petalBreath = sin(atan(transformed.y, transformed.x) * 5.0 + uTime * 0.82 + aSeed * 0.4);
      transformed += shapeDirection * petalBreath * petalAnchor * 0.045 * shapeMotionScale;
      shapeAccent = petalAnchor * (0.5 + 0.5 * petalBreath) * 0.34;
    } else if (uShapeKind > 1.5 && uShapeKind < 2.5) {
      float surfaceWave = sin(uTime * 0.72 + fieldRadius * 2.4);
      transformed += shapeDirection * surfaceWave * 0.034 * shapeMotionScale;
      shapeAccent = (0.5 + 0.5 * surfaceWave) * 0.28;
    } else if (uShapeKind > 3.5 && uShapeKind < 4.5) {
      shapeAccent = (0.5 + 0.5 * sin(uTime * 1.1 + transformed.y * 3.2 + aSeed * 0.35)) * 0.48;
    } else if (uShapeKind > 0.5 && uShapeKind < 1.5) {
      float wavePhase = uTime * 0.78 + transformed.x * 0.7 + transformed.z * 0.34 + aSeed * 0.2;
      float waveSlope = 0.62 * cos(transformed.x * 1.2 + transformed.z * 0.7);
      float waveDepthSlope = 0.34 * cos(transformed.z * 0.7 + transformed.x * 0.2);
      vec3 waveTangent = normalize(vec3(1.0, waveSlope, waveDepthSlope));
      transformed += waveTangent * sin(wavePhase) * 0.04 * shapeMotionScale;
      shapeAccent = (0.5 + 0.5 * sin(wavePhase)) * 0.25;
    } else if (uShapeKind > 5.5 && uShapeKind < 6.5) {
      shapeAccent = (0.5 + 0.5 * sin(uTime * 0.86 + atan(transformed.z, transformed.x) * 3.0)) * 0.3;
    }

    float lyricWave = sin((transformed.y + 2.8) * 2.4 - (1.0 - uLyricRipple) * 7.0) * uLyricRipple;
    transformed += fieldDirection * lyricWave * (bodyRole * 0.035 + accentRole * 0.13) * motionScale;
    transformed.y += accentRole * uLyricRipple * 0.18 * motionScale;
    transformed *= 1.0 + sin(uTime * 5.6 - fieldRadius * 3.8) * uResumeHeartbeat * 0.045;
    transformed.x += (aSeed < 0.5 ? -1.0 : 1.0) * uTrackTransition * sin(3.14159265 * aSeed) * 2.8 * motionScale;
    transformed.y += uTrackTransition * sin(aSeed * 24.0) * 0.5 * motionScale;
    transformed = mix(transformed, aHeartTarget, uPocketStarlight * (coreRole + bodyRole) * 0.9);
    transformed = mix(transformed, aPocketTarget, uPocketStarlight * accentRole);
    transformed.y += accentRole * uPocketDissolve * (0.25 + aSeed * 1.2) * motionScale;

    vec2 mousePosition = uPointerPoint * vec2(3.7, 2.25);
    vec2 mouseDelta = mousePosition - transformed.xy;
    float mouseDistance = length(mouseDelta);
    vec2 mouseDirection = mouseDistance > 0.0001 ? mouseDelta / mouseDistance : vec2(0.0);
    float heartPointerMask = 1.0 - step(0.35, abs(uShapeKind - 3.0));
    float pointerRadius = mix(0.72, 0.98, uPointerDragging);
    float pointerProgress = clamp(1.0 - mouseDistance / pointerRadius, 0.0, 1.0);
    float pointerField = pointerProgress * pointerProgress * (3.0 - 2.0 * pointerProgress);
    float pointerRole = coreRole * 0.42 + bodyRole * 0.76 + accentRole;
    float pointerStrength = 0.36 + uSolPointerAttraction * 0.64;
    float legacyCavityRole = coreRole * 0.52 + bodyRole * 0.84 + accentRole;
    vec2 zeroDistanceDirection = vec2(cos(aSeed * 6.2831853), sin(aSeed * 6.2831853));
    vec2 outwardDirection = mouseDistance > 0.0001 ? -mouseDirection : zeroDistanceDirection;
    float cavityMaximum = mix(0.16, 0.28, uPointerDragging)
      * legacyCavityRole * motionScale;
    transformed.xy += outwardDirection * pointerField * uPointerActive
      * pointerStrength * cavityMaximum * heartPointerMask;

    float pointerMaximum = mix(0.034, 0.075, uPointerDragging) * pointerRole * motionScale;
    transformed.xy += mouseDirection * pointerField * uPointerActive
      * pointerStrength * pointerMaximum * (1.0 - heartPointerMask);
    float frontSurface = smoothstep(-0.08, 0.55, depthBand) * surfaceWeight;
    float indentation = pointerField * uPointerActive * pointerStrength
      * mix(0.082, 0.145, uPointerDragging) * pointerRole * frontSurface * motionScale;
    float surfaceRing = exp(-pow((mouseDistance / pointerRadius - 0.58) * 8.0, 2.0))
      * uPointerActive * pointerStrength * frontSurface * 0.012 * motionScale;
    transformed += shapeNormal * (-indentation + surfaceRing) * (1.0 - heartPointerMask);

    vec2 ripplePosition = uRipplePoint * vec2(3.7, 2.25);
    vec2 rippleDelta = transformed.xy - ripplePosition;
    float rippleDistance = length(rippleDelta);
    float rippleWave = sin(rippleDistance * 10.0 - (1.0 - uPointerRipple) * 11.0);
    transformed += shapeNormal * rippleWave * uPointerRipple * exp(-rippleDistance * 0.8)
      * surfaceWeight * 0.065 * motionScale;

    vec3 nucleusDirection = normalize(transformed + vec3(0.0001));
    float nucleusRadius = 0.32 + sin(uTime * 2.2 + aSeed * 18.0) * 0.08;
    vec3 nucleus = nucleusDirection * nucleusRadius;
    transformed = mix(transformed, nucleus, uGenerating * 0.9);

    vec4 modelPosition = modelMatrix * vec4(transformed, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    float densityWeight = shapeMeta.z;
    float depthPointScale = 0.94 + clamp(depthBand, -1.0, 1.0) * 0.08;
    float pocketPointBoost = uPocketStarlight * (accentRole * 1.45 + (coreRole + bodyRole) * 0.24);
    gl_PointSize = max(0.72, uPointSize * clamp(densityWeight, 0.68, 1.12) * depthPointScale * (1.0 + uVoiceLevel * 0.34 + uMusicEnergy * 0.16 + uSolSparkle * 0.12 + uMemoryResonance * 0.24 + uGestureSparkle * accentRole * 0.24 + uGestureCorePulse * coreRole * 0.16) * (11.0 / max(1.0, -viewPosition.z)) + pocketPointBoost);

    vec3 viewNormal = normalize(normalMatrix * shapeNormal);
    float facing = clamp(dot(viewNormal, vec3(0.0, 0.0, 1.0)), -1.0, 1.0);

    vSeed = aSeed;
    vGlow = 1.0 - smoothstep(1.5, 7.0, -viewPosition.z);
    vRole = aRole;
    vDensityWeight = densityWeight;
    vShapeAccent = shapeAccent;
    vFacing = facing;
    vRim = pow(1.0 - abs(facing), 2.0) * surfaceWeight;
    vDepthBand = depthBand;
    vSurfaceWeight = surfaceWeight;
    vViewDepth = smoothstep(3.2, 7.4, -viewPosition.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uBrightness;
  uniform float uGenerating;
  uniform float uVoiceLevel;
  uniform float uMusicEnergy;
  uniform float uMusicAccent;
  uniform float uTime;
  uniform float uSolSparkle;
  uniform float uSolWarmth;
  uniform float uMemoryResonance;
  uniform float uGestureWarmth;
  uniform float uGestureSparkle;
  uniform float uPocketStarlight;
  uniform float uShapeKind;

  varying float vSeed;
  varying float vGlow;
  varying float vRole;
  varying float vDensityWeight;
  varying float vShapeAccent;
  varying float vFacing;
  varying float vRim;
  varying float vDepthBand;
  varying float vSurfaceWeight;
  varying float vViewDepth;

  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    if (distanceToCenter > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.08, 0.5, distanceToCenter);
    float core = 1.0 - smoothstep(0.0, 0.18, distanceToCenter);

    vec3 baseColor = mix(uColorA, uColorB, smoothstep(0.05, 0.72, vSeed));
    baseColor = mix(baseColor, uColorC, smoothstep(0.68, 1.0, vSeed));
    baseColor = mix(baseColor, vec3(1.0, 0.48, 0.72), min(1.0, uSolWarmth * 0.24 + uGestureWarmth * 0.28));
    baseColor = mix(baseColor, vec3(1.0, 0.72, 0.84), uMemoryResonance * 0.22);
    float sparkleNoise = fract(sin((vSeed + floor(uTime * 4.0) * 0.013) * 43758.5453) * 12741.371);
    float sparkle = step(0.995 - uSolSparkle * 0.08, sparkleNoise);

    float heartLook = max(1.0 - step(0.35, abs(uShapeKind - 3.0)), uPocketStarlight);
    vec3 legacyColor = baseColor * (mix(0.62, 1.45, uBrightness) + core * 0.34 + uGenerating * 0.2
      + uVoiceLevel * 0.34 + uMusicEnergy * 0.28 + uMusicAccent * 0.12 + vShapeAccent * 0.12);
    vec3 depthColor = mix(baseColor, sqrt(max(baseColor, vec3(0.0))), 0.76) + vec3(0.008, 0.012, 0.02);
    float frontLight = max(0.0, vFacing);
    float backLight = max(0.0, -vFacing);
    float diffuse = clamp(0.58 + frontLight * 0.32 - backLight * 0.16, 0.38, 0.92);
    float rimLight = clamp(vRim * 0.22, 0.0, 0.22);
    float depthLight = clamp(0.82 + vDepthBand * 0.1 - vViewDepth * 0.07, 0.64, 0.94);
    float interiorLight = mix(0.78, 1.0, clamp(vSurfaceWeight, 0.0, 1.0));
    depthColor *= mix(vec3(0.78, 0.84, 1.02), vec3(1.035, 0.99, 0.96), smoothstep(-0.55, 0.62, vFacing));
    depthColor *= (diffuse * depthLight * interiorLight + rimLight)
      * (mix(0.78, 1.34, uBrightness) + core * 0.18 + uGenerating * 0.16
        + uVoiceLevel * 0.24 + uMusicEnergy * 0.2 + uMusicAccent * 0.08 + vShapeAccent * 0.1)
      * 1.35;
    vec3 color = mix(depthColor, legacyColor, clamp(heartLook, 0.0, 1.0));
    float accentRole = step(1.5, vRole);
    color += sparkle * (uSolSparkle + uGestureSparkle * accentRole) * vec3(0.7, 0.42, 0.58);
    color = mix(color, vec3(1.0, 0.82, 0.42), uPocketStarlight * accentRole * 0.72);

    float legacyRoleAlpha = mix(0.84, 0.96, step(1.5, vRole));
    float legacyAlpha = alpha * mix(0.48, 0.95, vGlow)
      * clamp(vDensityWeight, 0.62, 1.08) * legacyRoleAlpha;
    float depthRoleAlpha = mix(0.72, 0.9, step(1.5, vRole));
    float surfaceAlpha = mix(0.54, 0.86, clamp(vSurfaceWeight, 0.0, 1.0));
    float depthAlpha = alpha * mix(0.52, 0.92, vGlow) * clamp(vDensityWeight, 0.62, 1.08)
      * depthRoleAlpha * surfaceAlpha * mix(0.72, 1.0, smoothstep(-0.7, 0.65, vFacing));
    float finalAlpha = mix(depthAlpha, legacyAlpha, clamp(heartLook, 0.0, 1.0));
    if (finalAlpha < 0.025) discard;
    gl_FragColor = vec4(color, finalAlpha);
  }
`;

const weatherRainVertexShader = /* glsl */ `
  attribute float aSeed;
  attribute float aLayer;
  attribute float aEndpoint;
  attribute float aPhase;
  attribute float aVisibility;

  uniform float uTime;
  uniform float uRainSpeed;
  uniform float uWind;
  uniform float uFireflyMix;
  uniform float uMusicPulse;
  uniform float uMusicAccent;
  uniform vec2 uPointerPoint;
  uniform vec2 uPointerVelocity;
  uniform float uAspect;
  uniform float uTanHalfFov;
  uniform vec3 uCameraPosition;

  varying float vSeed;
  varying float vVisibility;
  varying float vLayer;
  varying float vSolField;
  varying float vFirefly;

  void main() {
    float layerSpeed = mix(0.62, 1.28, aLayer);
    float layerZ = -1.8 + aLayer * 2.7;
    float cameraDistance = max(1.0, uCameraPosition.z - layerZ);
    float halfHeight = uTanHalfFov * cameraDistance;
    float halfWidth = halfHeight * uAspect;
    float travelHeight = halfHeight * 2.0 + 0.9;
    float fall = uTime * uRainSpeed * layerSpeed;
    float y = uCameraPosition.y + halfHeight + 0.45 - mod(fall + aPhase * travelHeight, travelHeight);
    float baseX = (aSeed * 2.0 - 1.0) * halfWidth * 1.04;
    float windTravel = uWind * (fall * 0.2 + aLayer * 0.4);
    float x = uCameraPosition.x + baseX + windTravel;
    x = uCameraPosition.x + mod(x - uCameraPosition.x + halfWidth, halfWidth * 2.0) - halfWidth;
    float lengthScale = (0.15 + aLayer * 0.34) * (0.65 + uRainSpeed * 0.32);
    vec3 rainPosition = vec3(x, y + aEndpoint * lengthScale, layerZ);

    vec2 pointer = uCameraPosition.xy + uPointerPoint * vec2(halfWidth, halfHeight);
    vec2 pointerDelta = rainPosition.xy - pointer;
    float pointerField = exp(-dot(pointerDelta, pointerDelta) * 0.58);
    rainPosition.x += pointerField * uPointerVelocity.x * (0.24 + aLayer * 0.3);
    rainPosition.y += pointerField * uPointerVelocity.y * 0.08;

    float solDistance = length(rainPosition.xy * vec2(0.84, 1.12));
    float solField = exp(-solDistance * solDistance * 0.34);

    float angle = aSeed * 42.0 + uTime * (0.28 + aLayer * 0.34);
    float orbit = 0.38 + aPhase * 2.7;
    vec3 fireflyPosition = vec3(
      cos(angle) * orbit + sin(uTime * 0.34 + aSeed * 19.0) * 0.32,
      sin(angle * 0.83) * orbit * 0.58 + cos(uTime * 0.27 + aSeed * 11.0) * 0.22,
      -0.15 + sin(angle * 0.51) * 0.62
    );
    fireflyPosition.xy += pointerField * uPointerVelocity * 0.15;
    fireflyPosition += normalize(fireflyPosition + vec3(0.001)) * uMusicPulse * 0.12;
    fireflyPosition.y += uMusicAccent * 0.08;
    fireflyPosition += vec3(0.0, aEndpoint * mix(lengthScale, 0.012, uFireflyMix), 0.0);

    vec3 transformed = mix(rainPosition, fireflyPosition, uFireflyMix);
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    vSeed = aSeed;
    vVisibility = aVisibility;
    vLayer = aLayer;
    vSolField = solField;
    vFirefly = uFireflyMix;
  }
`;

const weatherRainFragmentShader = /* glsl */ `
  uniform float uRainDensity;
  uniform float uRainBrightness;
  uniform float uFireflyMix;
  uniform float uMusicEnergy;
  uniform vec3 uCoolColor;
  uniform vec3 uWarmColor;

  varying float vSeed;
  varying float vVisibility;
  varying float vLayer;
  varying float vSolField;
  varying float vFirefly;

  void main() {
    float visibleDensity = max(uRainDensity, uFireflyMix * 0.82);
    if (vVisibility > visibleDensity) discard;
    float layerAlpha = mix(0.12, 0.68, vLayer);
    float fireflySpark = mix(1.0, 1.55 + sin(vSeed * 93.0) * 0.32, vFirefly);
    vec3 coolRain = mix(vec3(0.48, 0.63, 0.88), uCoolColor, 0.42);
    vec3 solWarm = mix(vec3(1.0, 0.48, 0.72), uWarmColor, 0.34);
    vec3 color = mix(coolRain, solWarm, vSolField * 0.68);
    color = mix(color, vec3(1.0, 0.72, 0.34), vFirefly * 0.86);
    color *= (uRainBrightness + uMusicEnergy * 0.16) * fireflySpark;
    float transitionAlpha = mix(1.0, 0.86, vFirefly);
    gl_FragColor = vec4(color, layerAlpha * transitionAlpha);
  }
`;

const weatherAtmosphereVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.999, 1.0);
  }
`;

const weatherAtmosphereFragmentShader = /* glsl */ `
  uniform float uRipple;
  uniform float uRippleStrength;
  uniform vec2 uRipplePoint;
  uniform float uMusicPulse;
  uniform vec3 uRippleColor;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 rippleCenter = uRipplePoint * 0.5 + 0.5;
    rippleCenter.y = 1.0 - rippleCenter.y;
    float distanceToRipple = distance(uv, rippleCenter);
    float ringRadius = uRipple * 0.62;
    float ring = exp(-pow((distanceToRipple - ringRadius) * 42.0, 2.0));
    float rippleAlpha = ring * (1.0 - uRipple) * uRippleStrength;
    vec3 color = uRippleColor * (0.58 + uMusicPulse * 0.1);
    color += vec3(0.78, 0.62, 0.76) * rippleAlpha * 0.38;
    gl_FragColor = vec4(color, rippleAlpha * 0.2);
  }
`;

const seeded = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

type CachedParticleShape = Pick<ParticleShapeSample, "positions" | "normals"> & {
  shaderMetadata: Float32Array;
};

const packShapeMetadata = (sample: ParticleShapeSample) => {
  const packed = new Float32Array(sample.depthBands.length * 3);
  for (let index = 0; index < sample.depthBands.length; index += 1) {
    packed[index * 3] = sample.depthBands[index];
    packed[index * 3 + 1] = sample.surfaceWeights[index];
    packed[index * 3 + 2] = sample.density[index];
  }
  return packed;
};

const getParticleBudget = () => {
  if (typeof window === "undefined") return 24_000;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const isMobile = window.innerWidth < 768;
  if (isMobile || memory <= 4 || cores <= 4) return 18_000;
  if (window.innerWidth < 1180 || memory <= 6) return 36_000;
  return 54_000;
};

const supportsWebGL = () => {
  if (typeof document === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

function FallbackField() {
  const points = useMemo(
    () =>
      Array.from({ length: 96 }, (_, index) => ({
        left: 50 + Math.cos(index * 2.399) * Math.sqrt(index) * 4.1,
        top: 50 + Math.sin(index * 2.399) * Math.sqrt(index) * 2.7,
        size: 1 + (index % 4) * 0.75,
        opacity: 0.2 + (index % 7) * 0.09,
        delay: `${-(index % 12) * 0.24}s`,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
      {points.map((point, index) => (
        <span
          key={index}
          className="fallback-particle"
          style={{
            left: `${point.left}%`,
            top: `${point.top}%`,
            width: point.size,
            height: point.size,
            opacity: point.opacity,
            animationDelay: point.delay,
          }}
        />
      ))}
    </div>
  );
}

class WebGLErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <FallbackField /> : this.props.children;
  }
}

function ParticleSystem({
  scene,
  generating,
  experienceMode,
  voiceActivity = "disabled",
  audioLevel = 0,
  musicTrackId = null,
  musicStatus = "idle",
  musicTime = 0,
  musicIntensity = "medium",
  solPresence = FALLBACK_SOL_PRESENCE,
  solEmotion = FALLBACK_SOL_EMOTION,
  solAutonomy = "medium",
  weather = FALLBACK_SOL_WEATHER,
  memoryResonance = null,
  interactionRef,
  count,
  reducedMotion,
}: ParticleCanvasProps & {
  count: number;
  interactionRef: MutableRefObject<PointerPresenceState>;
  reducedMotion: boolean;
}) {
  const pointsRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const transitionRef = useRef(1);
  const desiredSceneRef = useRef(scene);
  const generatingRef = useRef(generating);
  const experienceModeRef = useRef(experienceMode);
  const voiceActivityRef = useRef(voiceActivity);
  const audioLevelRef = useRef(audioLevel);
  const musicTrackIdRef = useRef<string | null>(musicTrackId);
  const musicStatusRef = useRef<MusicPlaybackStatus>(musicStatus);
  const musicIntensityRef = useRef<MusicRhythmIntensity>(musicIntensity);
  const musicClockRef = useRef({ currentTime: musicTime, sampledAt: performance.now() });
  const musicRhythmRef = useRef(new MusicRhythmController());
  const solPresenceRef = useRef(solPresence);
  const solEmotionRef = useRef(solEmotion);
  const weatherRef = useRef(weather);
  const memoryResonanceRef = useRef(memoryResonance);
  const solAutonomyRef = useRef<SolAutonomyLevel>(solAutonomy);
  const desiredColorsRef = useRef([
    new THREE.Color(scene.palette[0]),
    new THREE.Color(scene.palette[1] ?? scene.palette[0]),
    new THREE.Color(scene.palette[2] ?? scene.palette[1] ?? scene.palette[0]),
  ]);
  const { camera } = useThree();
  const currentFormRef = useRef<ParticleForm>("constellation");

  const shapeCache = useMemo(() => {
    const generated = {} as Record<ParticleForm, ParticleShapeSample>;
    for (const form of PARTICLE_FORMS) generated[form] = createParticleShapeSample(form, count);
    const canonical = {} as Record<ParticleForm, CachedParticleShape>;
    const source = generated.constellation.positions;
    for (const form of PARTICLE_FORMS) {
      const sample = form === "constellation"
        ? generated[form]
        : reorderParticleShapeSample(
          generated[form],
          createSpatialParticleMapping(source, generated[form].positions),
        );
      canonical[form] = {
        positions: sample.positions,
        normals: sample.normals,
        shaderMetadata: packShapeMetadata(sample),
      };
    }
    return canonical;
  }, [count]);

  const geometry = useMemo(() => {
    const nextGeometry = new THREE.BufferGeometry();
    nextGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(shapeCache.constellation.positions), 3),
    );
    nextGeometry.setAttribute(
      "aTarget",
      new THREE.BufferAttribute(new Float32Array(shapeCache.constellation.positions), 3),
    );
    const seeds = new Float32Array(count);
    for (let index = 0; index < count; index += 1) seeds[index] = seeded(index, 14.7);
    nextGeometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    const roles = assignParticleRoles(count);
    nextGeometry.setAttribute("aRole", new THREE.BufferAttribute(roles, 1));
    nextGeometry.setAttribute("aMorphCurve", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    nextGeometry.setAttribute("aPocketTarget", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    nextGeometry.setAttribute("aHeartTarget", new THREE.BufferAttribute(new Float32Array(shapeCache.heart.positions), 3));
    nextGeometry.setAttribute("aShapeNormal", new THREE.BufferAttribute(new Float32Array(shapeCache.constellation.normals), 3));
    nextGeometry.setAttribute("aHeartNormal", new THREE.BufferAttribute(new Float32Array(shapeCache.heart.normals), 3));
    nextGeometry.setAttribute("aShapeMeta", new THREE.BufferAttribute(new Float32Array(shapeCache.constellation.shaderMetadata), 3));
    nextGeometry.setAttribute("aHeartMeta", new THREE.BufferAttribute(new Float32Array(shapeCache.heart.shaderMetadata), 3));
    nextGeometry.computeBoundingSphere();
    return nextGeometry;
  }, [count, shapeCache]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 1 },
          uMouse: { value: new THREE.Vector2() },
          uSpeed: { value: scene.speed },
          uTurbulence: { value: scene.turbulence },
          uCohesion: { value: scene.cohesion },
          uPointSize: { value: scene.pointSize },
          uBrightness: { value: scene.brightness },
          uGenerating: { value: 0 },
          uImmersion: { value: 0 },
          uReducedMotion: { value: reducedMotion ? 1 : 0 },
          uVoiceLevel: { value: 0 },
          uVoiceMode: { value: 0 },
          uMusicPulse: { value: 0 },
          uMusicAccent: { value: 0 },
          uMusicEnergy: { value: 0 },
          uSolPulse: { value: 0 },
          uSolSway: { value: 0 },
          uSolGather: { value: 0 },
          uSolVertical: { value: 0 },
          uSolSparkle: { value: 0 },
          uSolWarmth: { value: 0 },
          uSolPointerAttraction: { value: 0 },
          uMemoryResonance: { value: 0 },
          uShapeKind: { value: PARTICLE_SHAPE_KIND[scene.form] },
          uGestureStrength: { value: 0 },
          uGestureStillness: { value: 0 },
          uGestureFold: { value: 0 },
          uGestureBloom: { value: 0 },
          uGestureEmbrace: { value: 0 },
          uGestureCorePulse: { value: 0 },
          uGestureSway: { value: 0 },
          uGestureOrbit: { value: 0 },
          uGestureSparkle: { value: 0 },
          uGestureWarmth: { value: 0 },
          uLyricRipple: { value: 0 },
          uPauseFreeze: { value: 0 },
          uResumeHeartbeat: { value: 0 },
          uTrackTransition: { value: 0 },
          uPocketStarlight: { value: 0 },
          uPocketDissolve: { value: 0 },
          uPointerPoint: { value: new THREE.Vector2() },
          uPointerActive: { value: 0 },
          uPointerDragging: { value: 0 },
          uPointerRipple: { value: 0 },
          uRipplePoint: { value: new THREE.Vector2() },
          uColorA: { value: new THREE.Color(scene.palette[0]) },
          uColorB: { value: new THREE.Color(scene.palette[1] ?? scene.palette[0]) },
          uColorC: { value: new THREE.Color(scene.palette[2] ?? scene.palette[1] ?? scene.palette[0]) },
        },
      }),
    [],
  );

  useEffect(() => {
    const position = geometry.getAttribute("position") as THREE.BufferAttribute;
    const target = geometry.getAttribute("aTarget") as THREE.BufferAttribute;
    const curve = geometry.getAttribute("aMorphCurve") as THREE.BufferAttribute;
    const normal = geometry.getAttribute("aShapeNormal") as THREE.BufferAttribute;
    const metadata = geometry.getAttribute("aShapeMeta") as THREE.BufferAttribute;
    if (scene.form !== currentFormRef.current) {
      const source = new Float32Array(target.array as Float32Array);
      const reordered = shapeCache[scene.form].positions;
      const curves = createMorphCurveControls(source, reordered);
      position.copyArray(source);
      target.copyArray(reordered);
      curve.copyArray(curves);
      normal.copyArray(shapeCache[scene.form].normals);
      metadata.copyArray(shapeCache[scene.form].shaderMetadata);
      position.needsUpdate = true;
      target.needsUpdate = true;
      curve.needsUpdate = true;
      normal.needsUpdate = true;
      metadata.needsUpdate = true;
      transitionRef.current = 0;
      currentFormRef.current = scene.form;
    }
    const usesLegacyHeartBlend = scene.form === "heart";
    const nextBlending = usesLegacyHeartBlend ? THREE.AdditiveBlending : THREE.NormalBlending;
    const nextDepthWrite = !usesLegacyHeartBlend;
    if (material.blending !== nextBlending || material.depthWrite !== nextDepthWrite) {
      material.blending = nextBlending;
      material.depthWrite = nextDepthWrite;
      material.needsUpdate = true;
    }
    desiredSceneRef.current = scene;
    desiredColorsRef.current[0].set(scene.palette[0]);
    desiredColorsRef.current[1].set(scene.palette[1] ?? scene.palette[0]);
    desiredColorsRef.current[2].set(scene.palette[2] ?? scene.palette[1] ?? scene.palette[0]);
  }, [geometry, material, scene, shapeCache]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await document.fonts?.load('700 180px "Nexformo Taiwan Ming"', "天天开心");
      } catch {
        // The local fallback font is still sampled below.
      }
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 300;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#fff";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = '700 210px "Nexformo Taiwan Ming", "Songti SC", serif';
      context.fillText("天天开心", canvas.width / 2, canvas.height / 2 + 12);
      const roles = (geometry.getAttribute("aRole") as THREE.BufferAttribute).array as Float32Array;
      const accentIndices: number[] = [];
      for (let index = 0; index < roles.length; index += 1) if (roles[index] > 1.5) accentIndices.push(index);
      const image = context.getImageData(0, 0, canvas.width, canvas.height);
      const points = sampleGlyphAlphaPoints(image.data, canvas.width, canvas.height, accentIndices.length);
      const targets = new Float32Array(count * 3);
      for (let index = 0; index < accentIndices.length; index += 1) {
        const targetIndex = accentIndices[index] * 3;
        targets[targetIndex] = points[index * 3];
        targets[targetIndex + 1] = points[index * 3 + 1];
        targets[targetIndex + 2] = points[index * 3 + 2];
      }
      const attribute = geometry.getAttribute("aPocketTarget") as THREE.BufferAttribute;
      attribute.copyArray(targets);
      attribute.needsUpdate = true;
    })();
    return () => { cancelled = true; };
  }, [count, geometry]);

  useEffect(() => {
    generatingRef.current = generating;
  }, [generating]);

  useEffect(() => {
    experienceModeRef.current = experienceMode;
  }, [experienceMode]);

  useEffect(() => {
    voiceActivityRef.current = voiceActivity;
  }, [voiceActivity]);

  useEffect(() => {
    audioLevelRef.current = Math.min(1, Math.max(0, audioLevel));
  }, [audioLevel]);

  useEffect(() => {
    if (musicTrackIdRef.current !== musicTrackId) musicRhythmRef.current.reset();
    musicTrackIdRef.current = musicTrackId;
  }, [musicTrackId]);

  useEffect(() => {
    musicStatusRef.current = musicStatus;
  }, [musicStatus]);

  useEffect(() => {
    musicIntensityRef.current = musicIntensity;
  }, [musicIntensity]);

  useEffect(() => {
    solPresenceRef.current = solPresence;
  }, [solPresence]);

  useEffect(() => {
    solEmotionRef.current = solEmotion;
  }, [solEmotion]);

  useEffect(() => {
    weatherRef.current = weather;
  }, [weather]);

  useEffect(() => {
    memoryResonanceRef.current = memoryResonance;
  }, [memoryResonance]);

  useEffect(() => {
    solAutonomyRef.current = solAutonomy;
  }, [solAutonomy]);

  useEffect(() => {
    musicClockRef.current = { currentTime: Math.max(0, musicTime), sampledAt: performance.now() };
  }, [musicTime]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state, delta) => {
    const uniforms = material.uniforms;
    const desired = desiredSceneRef.current;
    transitionRef.current = Math.min(1, transitionRef.current + delta / (reducedMotion ? 0.35 : 2.2));

    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uProgress.value = transitionRef.current;
    uniforms.uReducedMotion.value = reducedMotion ? 1 : 0;
    uniforms.uShapeKind.value = PARTICLE_SHAPE_KIND[desired.form];
    uniforms.uMouse.value.lerp(state.pointer, 0.065);
    uniforms.uSpeed.value = THREE.MathUtils.damp(uniforms.uSpeed.value, desired.speed, 3.8, delta);
    uniforms.uTurbulence.value = THREE.MathUtils.damp(
      uniforms.uTurbulence.value,
      desired.turbulence,
      3.8,
      delta,
    );
    uniforms.uCohesion.value = THREE.MathUtils.damp(
      uniforms.uCohesion.value,
      desired.cohesion,
      3.8,
      delta,
    );
    uniforms.uPointSize.value = THREE.MathUtils.damp(
      uniforms.uPointSize.value,
      desired.pointSize,
      4.2,
      delta,
    );
    uniforms.uBrightness.value = THREE.MathUtils.damp(
      uniforms.uBrightness.value,
      desired.brightness,
      4.2,
      delta,
    );
    uniforms.uGenerating.value = THREE.MathUtils.damp(
      uniforms.uGenerating.value,
      generatingRef.current ? 1 : 0,
      generatingRef.current ? 4.8 : 2.6,
      delta,
    );
    uniforms.uImmersion.value = THREE.MathUtils.damp(
      uniforms.uImmersion.value,
      experienceModeRef.current === "entering" ? 1 : 0,
      experienceModeRef.current === "entering" ? 2.8 : 1.8,
      delta,
    );
    const voiceMode =
      voiceActivityRef.current === "listening"
        ? 1
        : voiceActivityRef.current === "thinking" || voiceActivityRef.current === "connecting"
          ? 2
          : voiceActivityRef.current === "speaking" || voiceActivityRef.current === "singing"
            ? 3
            : 0;
    const desiredVoiceLevel = voiceMode === 3 ? audioLevelRef.current : voiceMode > 0 ? 0.22 : 0;
    uniforms.uVoiceMode.value = THREE.MathUtils.damp(
      uniforms.uVoiceMode.value,
      voiceMode,
      8,
      delta,
    );
    uniforms.uVoiceLevel.value = THREE.MathUtils.damp(
      uniforms.uVoiceLevel.value,
      desiredVoiceLevel,
      voiceMode === 3 ? 12 : 5,
      delta,
    );
    const clockAge = Math.max(0, (performance.now() - musicClockRef.current.sampledAt) / 1_000);
    const musicCurrentTime =
      musicClockRef.current.currentTime + (musicStatusRef.current === "playing" ? clockAge : 0);
    const musicFrame = musicRhythmRef.current.update(
      {
        trackId: musicTrackIdRef.current,
        status: musicStatusRef.current,
        currentTime: musicCurrentTime,
        intensity: musicIntensityRef.current,
        reducedMotion,
      },
      delta,
    );
    uniforms.uMusicPulse.value = musicFrame.pulse;
    uniforms.uMusicAccent.value = musicFrame.accent;
    uniforms.uMusicEnergy.value = musicFrame.energy;
    const autonomyScale = { off: 0, low: 0.42, medium: 0.74, high: 1 }[solAutonomyRef.current];
    const motionVisual = getSolMotionVisual(solPresenceRef.current.motionPlan.primary, reducedMotion);
    const gestureScale = solPresenceRef.current.motionPlan.primary.source === "ambient" ? autonomyScale : 1;
    const primaryPriority = SOL_MOTION_PRIORITY[solPresenceRef.current.motionPlan.primary.source];
    const ritualAllowed = solPresenceRef.current.musicRitual.source === "explicit" || primaryPriority <= SOL_MOTION_PRIORITY.music;
    const ritualVisual = sampleSolMusicRitual(
      solPresenceRef.current.musicRitual,
      Date.now(),
      reducedMotion,
    );
    const ritualScale = ritualAllowed ? 1 : 0;
    const pocketVisual = samplePocketStarlight(solPresenceRef.current.pocketStarlight, Date.now(), reducedMotion);
    const emotionVisual = deriveSolExpression(solEmotionRef.current, {
      musicPlaying: musicStatusRef.current === "playing",
      voiceActive: voiceMode > 0,
      raining: weatherRef.current.mode !== "clear",
      reducedMotion,
    });
    const emotionalGather = (emotionVisual.cohesion - 0.5) * 0.44 - emotionVisual.particleSpread * 0.08;
    const highGesture = primaryPriority >= SOL_MOTION_PRIORITY.conversation;
    const emotionWeight = highGesture ? 0.24 : 0.44;
    uniforms.uSolPulse.value = THREE.MathUtils.damp(uniforms.uSolPulse.value, Math.min(1, motionVisual.breath * gestureScale * (1 - emotionWeight) + emotionVisual.breathingSpeed * emotionWeight), 3.2, delta);
    uniforms.uSolSway.value = THREE.MathUtils.damp(uniforms.uSolSway.value, Math.min(1, motionVisual.sway * gestureScale * (1 - emotionWeight) + emotionVisual.movementAmplitude * emotionWeight), 2.6, delta);
    uniforms.uSolGather.value = THREE.MathUtils.damp(uniforms.uSolGather.value, THREE.MathUtils.clamp((motionVisual.fold - motionVisual.bloom) * 0.34 * gestureScale + emotionalGather * emotionWeight, -1, 1), 2.8, delta);
    uniforms.uSolVertical.value = THREE.MathUtils.damp(uniforms.uSolVertical.value, Math.min(1, motionVisual.bloom * 0.2 * gestureScale + emotionVisual.roamingRadius * emotionWeight), 2.8, delta);
    uniforms.uSolSparkle.value = THREE.MathUtils.damp(uniforms.uSolSparkle.value, Math.min(1, motionVisual.sparkle * gestureScale * 0.62 + emotionVisual.coreGlow * emotionWeight), 4.2, delta);
    uniforms.uSolWarmth.value = THREE.MathUtils.damp(uniforms.uSolWarmth.value, Math.min(1, motionVisual.warmth * gestureScale * 0.58 + emotionVisual.paletteWarmth * emotionWeight), 2.4, delta);
    uniforms.uSolPointerAttraction.value = THREE.MathUtils.damp(uniforms.uSolPointerAttraction.value, Math.min(1, motionVisual.pointerAttraction * gestureScale * 0.64 + emotionVisual.pointerAttraction * emotionWeight), 4, delta);
    uniforms.uGestureStrength.value = THREE.MathUtils.damp(uniforms.uGestureStrength.value, motionVisual.breath * gestureScale, 3.2, delta);
    uniforms.uGestureStillness.value = THREE.MathUtils.damp(uniforms.uGestureStillness.value, Math.max(motionVisual.stillness, musicStatusRef.current === "paused" ? 0.58 : 0) * gestureScale, 3.4, delta);
    uniforms.uGestureFold.value = THREE.MathUtils.damp(uniforms.uGestureFold.value, motionVisual.fold * gestureScale, 3.1, delta);
    uniforms.uGestureBloom.value = THREE.MathUtils.damp(uniforms.uGestureBloom.value, motionVisual.bloom * gestureScale, 3.4, delta);
    uniforms.uGestureEmbrace.value = THREE.MathUtils.damp(uniforms.uGestureEmbrace.value, motionVisual.embrace * gestureScale, 2.8, delta);
    uniforms.uGestureCorePulse.value = THREE.MathUtils.damp(uniforms.uGestureCorePulse.value, motionVisual.corePulse * gestureScale, 4, delta);
    uniforms.uGestureSway.value = THREE.MathUtils.damp(uniforms.uGestureSway.value, motionVisual.sway * gestureScale, 2.7, delta);
    uniforms.uGestureOrbit.value = THREE.MathUtils.damp(uniforms.uGestureOrbit.value, motionVisual.orbit * gestureScale, 2.7, delta);
    uniforms.uGestureSparkle.value = THREE.MathUtils.damp(uniforms.uGestureSparkle.value, motionVisual.sparkle * gestureScale, 4, delta);
    uniforms.uGestureWarmth.value = THREE.MathUtils.damp(uniforms.uGestureWarmth.value, motionVisual.warmth * gestureScale, 2.5, delta);
    uniforms.uLyricRipple.value = ritualVisual.lyricRipple * ritualScale;
    uniforms.uPauseFreeze.value = THREE.MathUtils.damp(uniforms.uPauseFreeze.value, musicStatusRef.current === "paused" ? 0.88 : ritualVisual.pauseFreeze * ritualScale, 2.8, delta);
    uniforms.uResumeHeartbeat.value = ritualVisual.resumeHeartbeat * ritualScale;
    uniforms.uTrackTransition.value = ritualVisual.trackTransition * ritualScale;
    uniforms.uPocketStarlight.value = THREE.MathUtils.damp(uniforms.uPocketStarlight.value, pocketVisual.textMix, pocketVisual.textMix > 0 ? 4.5 : 2.8, delta);
    uniforms.uPocketDissolve.value = pocketVisual.dissolve;
    const memoryAge = memoryResonanceRef.current
      ? Math.max(0, (Date.now() - memoryResonanceRef.current.startedAt) / 1_000)
      : 10;
    const memoryDuration = reducedMotion ? 2.8 : 3.8;
    const memoryTarget = memoryAge < memoryDuration
      ? Math.sin(Math.PI * memoryAge / memoryDuration) * (reducedMotion ? 0.62 : 1)
      : 0;
    uniforms.uMemoryResonance.value = THREE.MathUtils.damp(
      uniforms.uMemoryResonance.value,
      memoryTarget,
      memoryTarget > 0 ? 4.2 : 2.4,
      delta,
    );
    uniforms.uPointerPoint.value.lerp(interactionRef.current.position, 0.12);
    uniforms.uPointerActive.value = interactionRef.current.active ? 1 : 0;
    uniforms.uPointerDragging.value = THREE.MathUtils.damp(uniforms.uPointerDragging.value, interactionRef.current.dragging ? 1 : 0, 10, delta);
    uniforms.uRipplePoint.value.copy(interactionRef.current.ripplePosition);
    const rippleAge = Math.max(0, (performance.now() - interactionRef.current.rippleAt) / 1_000);
    const rippleTarget = rippleAge < 1.2 ? 1 - rippleAge / 1.2 : 0;
    uniforms.uPointerRipple.value = THREE.MathUtils.damp(uniforms.uPointerRipple.value, rippleTarget, 12, delta);

    const colorBlend = 1 - Math.exp(-delta * 2.2);
    uniforms.uColorA.value.lerp(desiredColorsRef.current[0], colorBlend);
    uniforms.uColorB.value.lerp(desiredColorsRef.current[1], colorBlend);
    uniforms.uColorC.value.lerp(desiredColorsRef.current[2], colorBlend);

    const time = state.clock.elapsedTime;
    const mode = experienceModeRef.current;
    const cameraDepth = mode === "entering" ? 3.45 : mode === "focus" ? 4.85 : mode === "studio" ? 5.45 : 6.2;
    let targetX = 0;
    let targetY = 0;
    let targetZ = cameraDepth;
    if (!reducedMotion && desired.cameraMotion === "orbit") {
      targetX = Math.sin(time * 0.13) * 0.72;
      targetY = Math.cos(time * 0.09) * 0.22;
      targetZ = cameraDepth - 0.24 + Math.cos(time * 0.13) * 0.28;
    } else if (!reducedMotion && desired.cameraMotion === "drift") {
      targetX = Math.sin(time * 0.08) * 0.3;
      targetY = Math.cos(time * 0.07) * 0.16;
      targetZ = cameraDepth - 0.08 + Math.sin(time * 0.05) * 0.12;
    }
    const parallax = sampleParallaxTarget({
      pointer: [interactionRef.current.position.x, interactionRef.current.position.y],
      active: interactionRef.current.active && mode === "studio",
      inside: interactionRef.current.active,
      reducedMotion,
    });
    targetX += parallax[0];
    targetY += parallax[1];
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3, delta);
    camera.lookAt(0, 0, 0);
    if (pointsRef.current) {
      const allowsWholeFormOrbit = desired.form === "constellation" || desired.form === "spiral";
      const targetRotationY = allowsWholeFormOrbit
        ? Math.sin(time * 0.055) * 0.055 + musicFrame.orbit * 0.04 + motionVisual.orbit * gestureScale * 0.045 + emotionVisual.orbitSpeed * emotionWeight * 0.035
        : 0;
      pointsRef.current.rotation.y = THREE.MathUtils.damp(pointsRef.current.rotation.y, targetRotationY, 2.8, delta);
      pointsRef.current.rotation.z = THREE.MathUtils.damp(pointsRef.current.rotation.z, 0, 4, delta);
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}

function SolWeatherSystem({
  scene,
  weather = FALLBACK_SOL_WEATHER,
  musicTrackId = null,
  musicStatus = "idle",
  musicTime = 0,
  musicIntensity = "medium",
  interactionRef,
  count,
  reducedMotion,
}: Pick<
  ParticleCanvasProps,
  | "scene"
  | "weather"
  | "musicTrackId"
  | "musicStatus"
  | "musicTime"
  | "musicIntensity"
> & {
  interactionRef: MutableRefObject<PointerPresenceState>;
  count: number;
  reducedMotion: boolean;
}) {
  const rainCount = Math.max(1_800, Math.min(4_200, Math.floor(count * 0.075)));
  const weatherRef = useRef(weather);
  const musicTrackIdRef = useRef<string | null>(musicTrackId);
  const musicStatusRef = useRef<MusicPlaybackStatus>(musicStatus);
  const musicIntensityRef = useRef<MusicRhythmIntensity>(musicIntensity);
  const musicClockRef = useRef({ currentTime: musicTime, sampledAt: performance.now() });
  const rhythmRef = useRef(new MusicRhythmController());
  const desiredColorsRef = useRef([
    new THREE.Color(scene.palette[1] ?? scene.palette[0]),
    new THREE.Color(scene.palette[3] ?? scene.palette[2] ?? scene.palette[0]),
  ]);
  const fireflyRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null);

  const geometry = useMemo(() => {
    const nextGeometry = new THREE.BufferGeometry();
    const vertices = rainCount * 2;
    const positions = new Float32Array(vertices * 3);
    const seeds = new Float32Array(vertices);
    const layers = new Float32Array(vertices);
    const endpoints = new Float32Array(vertices);
    const phases = new Float32Array(vertices);
    const visibility = new Float32Array(vertices);
    for (let drop = 0; drop < rainCount; drop += 1) {
      const seed = seeded(drop, 84.2);
      const phase = seeded(drop, 103.7);
      const visibilitySeed = seeded(drop, 176.9);
      const layer = (drop % 3) / 2;
      for (let endpoint = 0; endpoint < 2; endpoint += 1) {
        const index = drop * 2 + endpoint;
        seeds[index] = seed;
        phases[index] = phase;
        layers[index] = layer;
        endpoints[index] = endpoint;
        visibility[index] = visibilitySeed;
      }
    }
    nextGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    nextGeometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    nextGeometry.setAttribute("aLayer", new THREE.BufferAttribute(layers, 1));
    nextGeometry.setAttribute("aEndpoint", new THREE.BufferAttribute(endpoints, 1));
    nextGeometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    nextGeometry.setAttribute("aVisibility", new THREE.BufferAttribute(visibility, 1));
    return nextGeometry;
  }, [rainCount]);

  const rainMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: weatherRainVertexShader,
        fragmentShader: weatherRainFragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uRainDensity: { value: 0 },
          uRainSpeed: { value: 0 },
          uRainBrightness: { value: 0 },
          uWind: { value: 0 },
          uFireflyMix: { value: 0 },
          uMusicPulse: { value: 0 },
          uMusicAccent: { value: 0 },
          uMusicEnergy: { value: 0 },
          uPointerPoint: { value: new THREE.Vector2() },
          uPointerVelocity: { value: new THREE.Vector2() },
          uAspect: { value: 16 / 9 },
          uTanHalfFov: { value: Math.tan(THREE.MathUtils.degToRad(45) / 2) },
          uCameraPosition: { value: new THREE.Vector3(0, 0, 5.45) },
          uCoolColor: { value: new THREE.Color(scene.palette[1] ?? scene.palette[0]) },
          uWarmColor: { value: new THREE.Color(scene.palette[3] ?? scene.palette[2] ?? scene.palette[0]) },
        },
      }),
    [],
  );
  const fireflyGeometry = useMemo(() => {
    const nextGeometry = new THREE.BufferGeometry();
    const fireflyCount = Math.max(220, Math.min(420, Math.floor(rainCount * 0.08)));
    const positions = new Float32Array(fireflyCount * 3);
    for (let index = 0; index < fireflyCount; index += 1) {
      const angle = seeded(index, 124.8) * Math.PI * 2;
      const radius = 0.38 + seeded(index, 137.1) * 2.6;
      const offset = index * 3;
      positions[offset] = Math.cos(angle) * radius;
      positions[offset + 1] = Math.sin(angle) * radius * 0.58;
      positions[offset + 2] = (seeded(index, 151.4) - 0.5) * 1.3;
    }
    nextGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    nextGeometry.computeBoundingSphere();
    return nextGeometry;
  }, [rainCount]);

  const atmosphereMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: weatherAtmosphereVertexShader,
        fragmentShader: weatherAtmosphereFragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uRipple: { value: 1 },
          uRippleStrength: { value: 0 },
          uRipplePoint: { value: new THREE.Vector2() },
          uMusicPulse: { value: 0 },
          uRippleColor: { value: new THREE.Color(scene.palette[2] ?? scene.palette[0]) },
        },
      }),
    [],
  );

  const fireflyMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#ffb45c"),
        size: 1.8,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(() => {
    weatherRef.current = weather;
  }, [weather]);
  useEffect(() => {
    if (musicTrackIdRef.current !== musicTrackId) rhythmRef.current.reset();
    musicTrackIdRef.current = musicTrackId;
  }, [musicTrackId]);
  useEffect(() => {
    musicStatusRef.current = musicStatus;
  }, [musicStatus]);
  useEffect(() => {
    musicIntensityRef.current = musicIntensity;
  }, [musicIntensity]);
  useEffect(() => {
    musicClockRef.current = { currentTime: Math.max(0, musicTime), sampledAt: performance.now() };
  }, [musicTime]);
  useEffect(() => {
    desiredColorsRef.current[0].set(scene.palette[1] ?? scene.palette[0]);
    desiredColorsRef.current[1].set(scene.palette[3] ?? scene.palette[2] ?? scene.palette[0]);
    atmosphereMaterial.uniforms.uRippleColor.value.set(scene.palette[2] ?? scene.palette[0]);
  }, [atmosphereMaterial.uniforms.uRippleColor.value, scene.palette]);
  useEffect(
    () => () => {
      geometry.dispose();
      fireflyGeometry.dispose();
      rainMaterial.dispose();
      atmosphereMaterial.dispose();
      fireflyMaterial.dispose();
    },
    [atmosphereMaterial, fireflyGeometry, fireflyMaterial, geometry, rainMaterial],
  );

  useFrame((frame, delta) => {
    const weatherState = weatherRef.current;
    const visual = getSolWeatherVisualState(weatherState, Date.now(), reducedMotion);
    const clockAge = Math.max(0, (performance.now() - musicClockRef.current.sampledAt) / 1_000);
    const currentTime = musicClockRef.current.currentTime + (musicStatusRef.current === "playing" ? clockAge : 0);
    const rhythm = rhythmRef.current.update(
      {
        trackId: musicTrackIdRef.current,
        status: musicStatusRef.current,
        currentTime,
        intensity: musicIntensityRef.current,
        reducedMotion,
      },
      delta,
    );
    const rainUniforms = rainMaterial.uniforms;
    rainUniforms.uTime.value = frame.clock.elapsedTime;
    rainUniforms.uRainDensity.value = THREE.MathUtils.damp(rainUniforms.uRainDensity.value, visual.rainDensity, 3.2, delta);
    rainUniforms.uRainSpeed.value = THREE.MathUtils.damp(rainUniforms.uRainSpeed.value, visual.rainSpeed, 2.8, delta);
    rainUniforms.uRainBrightness.value = THREE.MathUtils.damp(rainUniforms.uRainBrightness.value, visual.rainBrightness, 2.8, delta);
    rainUniforms.uWind.value = THREE.MathUtils.damp(rainUniforms.uWind.value, weatherState.wind, 2.4, delta);
    rainUniforms.uFireflyMix.value = reducedMotion ? 0 : visual.fireflyMix;
    rainUniforms.uMusicPulse.value = rhythm.pulse;
    rainUniforms.uMusicAccent.value = rhythm.accent;
    rainUniforms.uMusicEnergy.value = rhythm.energy;
    rainUniforms.uPointerPoint.value.lerp(interactionRef.current.position, 0.12);
    rainUniforms.uAspect.value = frame.size.width / Math.max(1, frame.size.height);
    const perspectiveCamera = frame.camera as THREE.PerspectiveCamera;
    rainUniforms.uTanHalfFov.value = Math.tan(THREE.MathUtils.degToRad(perspectiveCamera.fov) / 2);
    rainUniforms.uCameraPosition.value.copy(frame.camera.position);
    const pointerAge = performance.now() - interactionRef.current.lastAt;
    const pointerVelocity = pointerAge < 160 ? interactionRef.current.velocity : new THREE.Vector2();
    rainUniforms.uPointerVelocity.value.lerp(pointerVelocity, 1 - Math.exp(-delta * 7));
    const colorBlend = 1 - Math.exp(-delta * 2.1);
    rainUniforms.uCoolColor.value.lerp(desiredColorsRef.current[0], colorBlend);
    rainUniforms.uWarmColor.value.lerp(desiredColorsRef.current[1], colorBlend);

    fireflyMaterial.opacity = reducedMotion ? 0 : visual.fireflyMix * 0.58;
    fireflyMaterial.size = 1.55 + rhythm.pulse * 0.65;
    if (fireflyRef.current) {
      fireflyRef.current.rotation.z = frame.clock.elapsedTime * 0.085;
      fireflyRef.current.rotation.y = Math.sin(frame.clock.elapsedTime * 0.17) * 0.2;
      const gatherScale = 1 - visual.fireflyMix * 0.17;
      fireflyRef.current.scale.setScalar(gatherScale);
    }

    const atmosphereUniforms = atmosphereMaterial.uniforms;
    atmosphereUniforms.uRipplePoint.value.copy(interactionRef.current.ripplePosition);
    atmosphereUniforms.uRippleStrength.value = weatherState.rippleStrength;
    atmosphereUniforms.uMusicPulse.value = rhythm.pulse;
    const rippleAge = Math.max(0, (performance.now() - interactionRef.current.rippleAt) / 1_000);
    atmosphereUniforms.uRipple.value = rippleAge < 2.2 ? rippleAge / 2.2 : 1;
  });

  return (
    <>
      <mesh frustumCulled={false} renderOrder={-2} material={atmosphereMaterial}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      <lineSegments
        geometry={geometry}
        material={rainMaterial}
        frustumCulled={false}
        renderOrder={2}
      />
      <points
        ref={fireflyRef}
        geometry={fireflyGeometry}
        material={fireflyMaterial}
        frustumCulled={false}
        renderOrder={3}
      />
    </>
  );
}

export default function ParticleCanvas({
  scene,
  generating,
  experienceMode,
  voiceActivity = "disabled",
  audioLevel = 0,
  musicTrackId = null,
  musicStatus = "idle",
  musicTime = 0,
  musicIntensity = "medium",
  solPresence = FALLBACK_SOL_PRESENCE,
  solEmotion = FALLBACK_SOL_EMOTION,
  solAutonomy = "medium",
  weather = FALLBACK_SOL_WEATHER,
  memoryResonance = null,
  onSolInteraction,
}: ParticleCanvasProps) {
  const [count] = useState(getParticleBudget);
  const [webGLAvailable] = useState(supportsWebGL);
  const [visible, setVisible] = useState(() => document.visibilityState !== "hidden");
  const reducedMotion = useReducedMotion();
  const interactionRef = useRef<PointerPresenceState>({
    position: new THREE.Vector2(),
    active: false,
    down: false,
    dragging: false,
    dragReported: false,
    downPosition: new THREE.Vector2(),
    ripplePosition: new THREE.Vector2(),
    rippleAt: -10_000,
    velocity: new THREE.Vector2(),
    lastPosition: new THREE.Vector2(),
    lastAt: performance.now(),
    suppressClick: false,
  });
  const maxDpr = typeof window !== "undefined" && window.innerWidth < 768 ? 1.25 : 1.65;

  const updatePointer = (
    event: ReactPointerEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    const x = THREE.MathUtils.clamp(((event.clientX - bounds.left) / Math.max(1, bounds.width)) * 2 - 1, -1, 1);
    const y = THREE.MathUtils.clamp(-(((event.clientY - bounds.top) / Math.max(1, bounds.height)) * 2 - 1), -1, 1);
    const now = performance.now();
    const elapsed = Math.max(8, now - interactionRef.current.lastAt) / 1_000;
    interactionRef.current.velocity
      .set(x - interactionRef.current.lastPosition.x, y - interactionRef.current.lastPosition.y)
      .divideScalar(elapsed)
      .clampLength(0, 3.2);
    interactionRef.current.lastPosition.set(x, y);
    interactionRef.current.lastAt = now;
    interactionRef.current.position.set(x, y);
    interactionRef.current.active = inside;
    if (interactionRef.current.down) {
      const distance = interactionRef.current.position.distanceTo(interactionRef.current.downPosition);
      if (distance > 0.035) {
        interactionRef.current.dragging = true;
        if (!interactionRef.current.dragReported) {
          interactionRef.current.dragReported = true;
          onSolInteraction?.("dragStart");
        }
      }
    }
  };

  const releasePointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    updatePointer(event);
    interactionRef.current.suppressClick = shouldSuppressClickAfterDrag(
      interactionRef.current.position.distanceTo(interactionRef.current.downPosition),
    );
    if (interactionRef.current.dragging) onSolInteraction?.("dragEnd");
    interactionRef.current.down = false;
    interactionRef.current.dragging = false;
    interactionRef.current.dragReported = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  useEffect(() => {
    const handleVisibility = () => setVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (!webGLAvailable) return <FallbackField />;

  return (
    <WebGLErrorBoundary>
      <div
        className="absolute inset-0 touch-none bg-black"
        aria-hidden="true"
        onPointerEnter={(event) => {
          updatePointer(event);
          onSolInteraction?.("pointer");
        }}
        onPointerMove={updatePointer}
        onPointerLeave={() => {
          interactionRef.current.active = false;
          interactionRef.current.velocity.set(0, 0);
        }}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          updatePointer(event);
          interactionRef.current.down = true;
          interactionRef.current.dragging = false;
          interactionRef.current.dragReported = false;
          interactionRef.current.downPosition.copy(interactionRef.current.position);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={releasePointer}
        onPointerCancel={(event) => {
          releasePointer(event);
          interactionRef.current.active = false;
          interactionRef.current.velocity.set(0, 0);
        }}
        onClick={(event) => {
          if (interactionRef.current.suppressClick) {
            interactionRef.current.suppressClick = false;
            return;
          }
          updatePointer(event);
          interactionRef.current.ripplePosition.copy(interactionRef.current.position);
          interactionRef.current.rippleAt = performance.now();
          onSolInteraction?.("click");
        }}
        onDoubleClick={(event) => {
          updatePointer(event);
          interactionRef.current.ripplePosition.copy(interactionRef.current.position);
          interactionRef.current.rippleAt = performance.now();
          onSolInteraction?.("doubleClick");
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 45, near: 0.1, far: 30 }}
          dpr={[1, maxDpr]}
          frameloop={visible ? "always" : "demand"}
          gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.setClearColor("#000000", 1)}
        >
          <SolWeatherSystem
            scene={scene}
            weather={weather}
            musicTrackId={musicTrackId}
            musicStatus={musicStatus}
            musicTime={musicTime}
            musicIntensity={musicIntensity}
            interactionRef={interactionRef}
            count={count}
            reducedMotion={reducedMotion}
          />
          <ParticleSystem
            scene={scene}
            generating={generating}
            experienceMode={experienceMode}
            voiceActivity={voiceActivity}
            audioLevel={audioLevel}
            musicTrackId={musicTrackId}
            musicStatus={musicStatus}
            musicTime={musicTime}
            musicIntensity={musicIntensity}
            solPresence={solPresence}
            solEmotion={solEmotion}
            solAutonomy={solAutonomy}
            weather={weather}
            memoryResonance={memoryResonance}
            interactionRef={interactionRef}
            count={count}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
