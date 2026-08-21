import { useCallback, useEffect, useRef, useState } from "react";
import type { CompanionState, VoiceActivity } from "../../shared/companion";
import type {
  MusicPlaybackStatus,
  MusicRhythmIntensity,
} from "../../shared/music";
import type { SolEmotionalState } from "../../shared/solEmotion";
import type { SolMemoryResonance } from "../../shared/solMemory";
import {
  createSolMotionCue,
  samplePocketStarlight,
  type SolGestureId,
} from "../../shared/solMotion";
import {
  detectsExplicitComfortMusicIntent,
  shouldTriggerLyricRipple,
} from "../../shared/solMusicRitual";
import { sampleMusicRhythm } from "../lib/musicRhythm";
import {
  DEFAULT_SOL_PREFERENCES,
  SOL_AUTONOMY_LEVELS,
  SOL_COMPANION_MODES,
  applySolConversationCue,
  applySolInteraction,
  applySolMotionCue,
  applySuggestedSolGesture,
  createSolPresenceState,
  forceNextSolMotif,
  markComfortMusicIntent,
  parseSolPresenceCommand,
  requestPocketStarlight,
  setSolMusicRitual,
  stepSolPresence,
  type SolAutonomyLevel,
  type SolCompanionMode,
  type SolInteraction,
  type SolPresenceContext,
  type SolPresencePreferences,
} from "../lib/solPresenceController";

const PREFERENCES_KEY = "nexformo.sol.presence.preferences.v1";

const loadPreferences = (): SolPresencePreferences => {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PREFERENCES_KEY) || "null") as Partial<SolPresencePreferences> | null;
    return {
      autonomy: SOL_AUTONOMY_LEVELS.includes(parsed?.autonomy as SolAutonomyLevel)
        ? (parsed?.autonomy as SolAutonomyLevel)
        : DEFAULT_SOL_PREFERENCES.autonomy,
      companionMode: SOL_COMPANION_MODES.includes(parsed?.companionMode as SolCompanionMode)
        ? (parsed?.companionMode as SolCompanionMode)
        : DEFAULT_SOL_PREFERENCES.companionMode,
      doNotDisturb: parsed?.doNotDisturb === true,
      motifLocked: parsed?.motifLocked === true,
      comfortEasterEggEnabled: parsed?.comfortEasterEggEnabled !== false,
    };
  } catch {
    return { ...DEFAULT_SOL_PREFERENCES };
  }
};

type UseSolPresenceOptions = {
  companion: CompanionState;
  musicStatus: MusicPlaybackStatus;
  musicTrackId: string | null;
  musicTime: number;
  musicIntensity: MusicRhythmIntensity;
  emotion: SolEmotionalState;
  voiceActivity: VoiceActivity;
  activeLyricIndex: number;
  lyricKind: "synced" | "plain" | "instrumental" | "none" | null;
  memoryResonance: SolMemoryResonance | null;
  reducedMotion: boolean;
};

export function useSolPresence(options: UseSolPresenceOptions) {
  const [preferences, setPreferences] = useState<SolPresencePreferences>(loadPreferences);
  const [state, setState] = useState(() => createSolPresenceState(Date.now()));
  const optionsRef = useRef(options);
  const preferencesRef = useRef(preferences);
  optionsRef.current = options;
  preferencesRef.current = preferences;
  const previousPlaybackRef = useRef({ status: options.musicStatus, trackId: options.musicTrackId });
  const previousLyricIndexRef = useRef(options.activeLyricIndex);
  const previousMemorySequenceRef = useRef(options.memoryResonance?.sequence ?? -1);
  const stageTimerRef = useRef<number | null>(null);
  const [stageLine, setStageLine] = useState("");

  const createContext = useCallback((now: number): SolPresenceContext => {
    const current = optionsRef.current;
    const rhythm = sampleMusicRhythm({
      trackId: current.musicTrackId,
      status: current.musicStatus,
      currentTime: current.musicTime,
      intensity: current.musicIntensity,
    });
    return {
      now,
      companion: current.companion,
      musicStatus: current.musicStatus,
      musicTrackId: current.musicTrackId,
      musicEnergy: rhythm.energy,
      preferences: preferencesRef.current,
      emotion: current.emotion,
      voiceActivity: current.voiceActivity,
      activeLyricIndex: current.activeLyricIndex,
      lyricKind: current.lyricKind,
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    } catch {
      // Preferences remain available for the current session.
    }
  }, [preferences]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = Date.now();
      setState((current) => {
        let next = stepSolPresence(current, createContext(now));
        if (next.musicRitual.ritual !== "none" && now >= next.musicRitual.startedAt + next.musicRitual.durationMs) {
          next = setSolMusicRitual(next, "none", "playback", optionsRef.current.musicTrackId, now, 0);
        }
        const pocketExpired = next.pocketStarlight.phase !== "idle"
          && now >= next.pocketStarlight.startedAt + next.pocketStarlight.durationMs;
        if (pocketExpired) {
          next = {
            ...next,
            pocketStarlight: { ...next.pocketStarlight, phase: "idle", startedAt: now, durationMs: 0, consentUntil: now },
          };
        }
        return next;
      });
    }, 3_000);
    return () => window.clearInterval(timer);
  }, [createContext]);

  const showStageLine = useCallback((message: string, durationMs = 8_000) => {
    setStageLine(message);
    if (stageTimerRef.current !== null) window.clearTimeout(stageTimerRef.current);
    stageTimerRef.current = window.setTimeout(() => {
      setStageLine("");
      stageTimerRef.current = null;
    }, durationMs);
  }, []);

  useEffect(() => {
    const current = { status: options.musicStatus, trackId: options.musicTrackId };
    const previous = previousPlaybackRef.current;
    if (current.status === previous.status && current.trackId === previous.trackId) return;
    previousPlaybackRef.current = current;
    const now = Date.now();
    const changedTrackId = current.trackId && previous.trackId && current.trackId !== previous.trackId
      ? current.trackId
      : null;
    if (changedTrackId && current.status !== "playing") {
      setState((value) => setSolMusicRitual(value, "trackTrailTransition", "playback", changedTrackId, now, 0.74));
    }

    if (current.status === "playing") {
      if (changedTrackId) {
        setState((value) => setSolMusicRitual(value, "trackTrailTransition", "playback", changedTrackId, now, 0.74));
      } else if (previous.status === "paused") {
        setState((value) => setSolMusicRitual(value, "resumeHeartbeat", "playback", current.trackId, now, 0.68));
      } else if (previous.status !== "playing") {
        setState((value) => {
          if (value.comfortMusicUntil > now) {
            showStageLine("我陪你听完。", 8_000);
            return setSolMusicRitual(value, "comfortListening", "emotion", current.trackId, now, 0.72);
          }
          return value;
        });
      }
    } else if (current.status === "paused" && previous.status === "playing") {
      setState((value) => {
        if (value.comfortMusicUntil > now) showStageLine("听完了，我还在。", 8_000);
        return setSolMusicRitual(value, "pauseFreeze", "playback", current.trackId, now, 0.72);
      });
    } else if (current.status === "ended" || current.status === "idle") {
      setState((value) => setSolMusicRitual(value, "none", "playback", current.trackId, now, 0));
    }
  }, [options.musicStatus, options.musicTrackId, showStageLine]);

  useEffect(() => {
    const previous = previousLyricIndexRef.current;
    const current = options.activeLyricIndex;
    previousLyricIndexRef.current = current;
    if (!shouldTriggerLyricRipple(previous, current, options.lyricKind)) return;
    const now = Date.now();
    setState((value) => {
      const ritualActive = value.musicRitual.ritual !== "none";
      if (ritualActive && now < value.musicRitual.startedAt + value.musicRitual.durationMs) return value;
      return setSolMusicRitual(value, "lyricRipple", "lyrics", options.musicTrackId, now, 0.52);
    });
  }, [options.activeLyricIndex, options.lyricKind, options.musicTrackId]);

  useEffect(() => {
    const sequence = options.memoryResonance?.sequence ?? -1;
    if (sequence < 0 || sequence === previousMemorySequenceRef.current) return;
    previousMemorySequenceRef.current = sequence;
    const now = Date.now();
    setState((value) => applySolMotionCue(value, createSolMotionCue("memoryEcho", "memory", now, 0.72, 4_000), now));
  }, [options.memoryResonance?.sequence]);

  useEffect(() => () => {
    if (stageTimerRef.current !== null) window.clearTimeout(stageTimerRef.current);
  }, []);

  const setAutonomy = useCallback((autonomy: SolAutonomyLevel) => {
    setPreferences((current) => ({ ...current, autonomy }));
  }, []);

  const setCompanionMode = useCallback((companionMode: SolCompanionMode) => {
    setPreferences((current) => ({ ...current, companionMode }));
  }, []);

  const setDoNotDisturb = useCallback((doNotDisturb: boolean) => {
    setPreferences((current) => ({ ...current, doNotDisturb }));
  }, []);

  const setMotifLocked = useCallback((motifLocked: boolean) => {
    setPreferences((current) => ({ ...current, motifLocked }));
    setState((current) => ({
      ...current,
      motionPlan: { ...current.motionPlan, locked: motifLocked },
    }));
  }, []);

  const setComfortEasterEggEnabled = useCallback((comfortEasterEggEnabled: boolean) => {
    setPreferences((current) => ({ ...current, comfortEasterEggEnabled }));
  }, []);

  const nextMotif = useCallback(() => {
    const now = Date.now();
    setState((current) => forceNextSolMotif(current, createContext(now)));
  }, [createContext]);

  const noteInteraction = useCallback((interaction: SolInteraction) => {
    const now = Date.now();
    setState((current) => {
      if (interaction === "doubleClick" && current.pocketStarlight.phase === "companion" && now < current.pocketStarlight.consentUntil) {
        const next = requestPocketStarlight(current, preferencesRef.current, now, optionsRef.current.reducedMotion);
        if (next !== current) showStageLine("你现在不开心也没关系，我把一点星光留给你。", 8_000);
        return next;
      }
      return applySolInteraction(current, interaction, now);
    });
  }, [showStageLine]);

  const noteUserTurn = useCallback((message: string) => {
    const now = Date.now();
    const vulnerable = /(?:难过|伤心|孤独|焦虑|害怕|累了|不开心)/.test(message.normalize("NFKC"));
    setState((current) => {
      const next = detectsExplicitComfortMusicIntent(message) ? markComfortMusicIntent(current, now) : current;
      return applySolConversationCue(next, message, now);
    });
    if (vulnerable) showStageLine("我不催你开心，我先陪你待一会儿。", 10_000);
  }, [showStageLine]);

  const noteMusicRequest = useCallback((message: string) => {
    if (!detectsExplicitComfortMusicIntent(message)) return;
    const now = Date.now();
    setState((current) => markComfortMusicIntent(current, now));
  }, []);

  const applyMotionSuggestion = useCallback((suggestion: unknown) => {
    const now = Date.now();
    setState((current) => applySuggestedSolGesture(current, suggestion, now));
  }, []);

  const setGesture = useCallback((gesture: SolGestureId, source: "manual" | "conversation" = "manual") => {
    const now = Date.now();
    setState((current) => applySolMotionCue(current, createSolMotionCue(gesture, source, now, 0.72, 10_000), now));
  }, []);

  const executeText = useCallback(
    (message: string) => {
      const command = parseSolPresenceCommand(message);
      if (!command) return { handled: false, message: "" };
      let reply = "";
      switch (command.action) {
        case "presence.nextMotif":
          nextMotif();
          reply = "好呀，我换一种律动陪你。";
          break;
        case "presence.setAutonomy":
          setAutonomy(command.value);
          reply = command.value === "off" ? "自主律动已经关闭。" : "我会调整自己的律动强度。";
          break;
        case "presence.setMode":
          setCompanionMode(command.value);
          reply = command.value === "quiet" ? "好，我安静地陪你听。" : command.value === "playful" ? "收到，我活泼一点陪你。" : "我会温柔一点陪着你。";
          break;
        case "presence.setDnd":
          setDoNotDisturb(command.value);
          reply = command.value ? "勿扰模式已开启，我会安静陪着你。" : "勿扰模式已关闭，我可以偶尔主动和你聊聊。";
          break;
        case "presence.setLocked":
          setMotifLocked(command.value);
          reply = command.value ? "已经锁定现在的律动。" : "已经恢复自主律动。";
          break;
        case "presence.setGesture":
          setGesture(command.value);
          reply = command.value === "listeningStillness"
            ? "我在认真听。"
            : command.value === "comfortingEmbrace"
              ? "好，我轻轻抱住这一刻。"
              : command.value === "joyfulBloom"
                ? "好呀，我让光开心地绽开一点。"
                : command.value === "shyFold"
                  ? "那我就悄悄害羞一点。"
                  : command.value === "idleBreath"
                    ? "好，我们一起轻轻呼吸。"
                    : "我会靠近一点看着你。";
          break;
        case "presence.triggerPocket": {
          const now = Date.now();
          let started = false;
          setState((current) => {
            const next = requestPocketStarlight(current, preferencesRef.current, now, optionsRef.current.reducedMotion);
            started = next !== current;
            return next;
          });
          const cooling = state.pocketStarlight.cooldownUntil > now;
          reply = cooling
            ? "这束口袋星光刚刚亮过，让它先在你身边多停一会儿。"
            : "你现在不开心也没关系，我把一点星光留给你。";
          if (!cooling) showStageLine("你现在不开心也没关系，我把一点星光留给你。", 8_000);
          void started;
          break;
        }
        case "presence.setPocketEnabled":
          setComfortEasterEggEnabled(command.value);
          reply = command.value ? "Sol 的口袋星光已经开启。" : "安慰彩蛋已经关闭，我不会擅自点亮它。";
          break;
      }
      return { handled: true, message: reply };
    },
    [nextMotif, setAutonomy, setCompanionMode, setComfortEasterEggEnabled, setDoNotDisturb, setGesture, setMotifLocked, showStageLine, state.pocketStarlight.cooldownUntil],
  );

  const pocketVisual = samplePocketStarlight(state.pocketStarlight, Date.now(), options.reducedMotion);

  return {
    state,
    preferences,
    executeText,
    nextMotif,
    noteInteraction,
    noteUserTurn,
    noteMusicRequest,
    applyMotionSuggestion,
    setGesture,
    setAutonomy,
    setCompanionMode,
    setDoNotDisturb,
    setMotifLocked,
    setComfortEasterEggEnabled,
    stageLine,
    pocketVisual,
  };
}

export type UseSolPresenceResult = ReturnType<typeof useSolPresence>;
