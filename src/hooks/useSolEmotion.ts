import { useCallback, useEffect, useMemo, useState } from "react";
import {
  canOfferSolWelcome,
  createSolEmotionalState,
  inferSolEmotionCue,
  reduceSolEmotion,
  sanitizeSolEmotionalState,
  serializeSolEmotionalState,
  type SolEmotionCue,
  type SolEmotionEvent,
} from "../../shared/solEmotion";

const SOL_EMOTION_STORAGE_KEY = "nexformo.sol.emotional-core.v1";

type LoadedEmotion = {
  state: ReturnType<typeof createSolEmotionalState>;
  welcomeAvailable: boolean;
};

function loadEmotion(): LoadedEmotion {
  const now = Date.now();
  if (typeof window === "undefined") {
    return { state: createSolEmotionalState(now), welcomeAvailable: false };
  }
  try {
    const raw = window.localStorage.getItem(SOL_EMOTION_STORAGE_KEY);
    if (!raw) return { state: createSolEmotionalState(now), welcomeAvailable: false };
    const state = sanitizeSolEmotionalState(JSON.parse(raw), now);
    return { state, welcomeAvailable: canOfferSolWelcome(state, now) };
  } catch {
    return { state: createSolEmotionalState(now), welcomeAvailable: false };
  }
}

export function useSolEmotion() {
  const [initial] = useState(loadEmotion);
  const [state, setState] = useState(initial.state);
  const [welcomeAvailable, setWelcomeAvailable] = useState(initial.welcomeAvailable);

  const dispatch = useCallback((event: SolEmotionEvent) => {
    setState((current) => reduceSolEmotion(current, event));
  }, []);

  useEffect(() => {
    dispatch({ type: "SESSION_STARTED", now: Date.now() });
  }, [dispatch]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SOL_EMOTION_STORAGE_KEY, serializeSolEmotionalState(state));
    } catch {
      // The emotional core remains active in memory when persistence is unavailable.
    }
  }, [state]);

  const noteUserMessage = useCallback((message: string) => {
    const cue = inferSolEmotionCue(message);
    dispatch({ type: "USER_MESSAGE", cue, now: Date.now() });
    return cue;
  }, [dispatch]);

  const noteSolReply = useCallback((cue?: SolEmotionCue) => {
    dispatch({ type: "SOL_REPLIED", cue, now: Date.now() });
  }, [dispatch]);

  const noteInteraction = useCallback((intensity = 0.4) => {
    dispatch({ type: "INTERACTION_WITH_PARTICLES", intensity, now: Date.now() });
  }, [dispatch]);

  const noteManualShape = useCallback(() => {
    dispatch({ type: "MANUAL_SHAPE_SELECTED", now: Date.now() });
  }, [dispatch]);

  const noteManualWeather = useCallback(() => {
    dispatch({ type: "MANUAL_WEATHER_SELECTED", now: Date.now() });
  }, [dispatch]);

  const consumeWelcome = useCallback(() => {
    if (!welcomeAvailable) return false;
    const now = Date.now();
    setState((current) => reduceSolEmotion(current, {
      type: "USER_RETURNED",
      now,
      absenceMs: Math.max(0, now - current.lastVisitAt),
    }));
    setWelcomeAvailable(false);
    return true;
  }, [welcomeAvailable]);

  const reset = useCallback(() => {
    const now = Date.now();
    setState(createSolEmotionalState(now));
    setWelcomeAvailable(false);
    try {
      window.localStorage.removeItem(SOL_EMOTION_STORAGE_KEY);
    } catch {
      // The in-memory reset still succeeds.
    }
  }, []);

  const values = useMemo(() => ({
    valence: state.valence,
    energy: state.energy,
    warmth: state.warmth,
    trust: state.trust,
    curiosity: state.curiosity,
    connection: state.connection,
    confidence: state.confidence,
  }), [state]);

  return {
    state,
    values,
    welcomeAvailable,
    dispatch,
    noteUserMessage,
    noteSolReply,
    noteInteraction,
    noteManualShape,
    noteManualWeather,
    consumeWelcome,
    reset,
  };
}

export type UseSolEmotionResult = ReturnType<typeof useSolEmotion>;

