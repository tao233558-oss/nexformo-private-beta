import { useCallback, useEffect, useMemo, useState } from "react";
import type { VisualEvolution, VisualScene } from "../../shared/visualScene";
import {
  cloneScene,
  createId,
  createInitialSession,
  sanitizeWorldSession,
  type EngineSource,
  type WorldSession,
} from "../lib/world";

const ACTIVE_WORLD_KEY = "nexformo.active-world.v2";
const MAX_STATES = 12;

const loadStoredSession = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ACTIVE_WORLD_KEY);
    return raw ? sanitizeWorldSession(JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
};

export function useWorldHistory() {
  const [session, setSession] = useState<WorldSession | null>(loadStoredSession);

  useEffect(() => {
    try {
      if (session) window.localStorage.setItem(ACTIVE_WORLD_KEY, JSON.stringify(session));
      else window.localStorage.removeItem(ACTIVE_WORLD_KEY);
    } catch {
      // The studio remains fully usable when storage is unavailable.
    }
  }, [session]);

  const current = useMemo(
    () => (session ? session.states[session.index] ?? null : null),
    [session],
  );

  const startWorld = useCallback((prompt: string, scene: VisualScene, source: EngineSource) => {
    setSession(createInitialSession(prompt, scene, source));
  }, []);

  const loadSession = useCallback((value: WorldSession) => {
    const next = sanitizeWorldSession(value);
    if (next) setSession(next);
  }, []);

  const pushEvolution = useCallback(
    (instruction: string, evolution: VisualEvolution, source: EngineSource) => {
      setSession((previous) => {
        if (!previous) return previous;
        const branch = previous.states.slice(0, previous.index + 1);
        const nextState = {
          id: createId(),
          title: evolution.title,
          prompt: previous.originalPrompt,
          instruction,
          scene: cloneScene(evolution.scene),
          baselineScene: cloneScene(evolution.scene),
          explanation: evolution.explanation,
          suggestions: [...evolution.suggestions],
          source,
          createdAt: new Date().toISOString(),
        };
        const states = [...branch, nextState].slice(-MAX_STATES);
        return { ...previous, states, index: states.length - 1 };
      });
    },
    [],
  );

  const updateCurrentScene = useCallback((scene: VisualScene) => {
    setSession((previous) => {
      if (!previous) return previous;
      const states = previous.states.map((state, index) =>
        index === previous.index ? { ...state, scene: cloneScene(scene) } : state,
      );
      return { ...previous, states };
    });
  }, []);

  const resetCurrentScene = useCallback(() => {
    setSession((previous) => {
      if (!previous) return previous;
      const states = previous.states.map((state, index) =>
        index === previous.index ? { ...state, scene: cloneScene(state.baselineScene) } : state,
      );
      return { ...previous, states };
    });
  }, []);

  const selectState = useCallback((index: number) => {
    setSession((previous) =>
      previous
        ? { ...previous, index: Math.min(previous.states.length - 1, Math.max(0, index)) }
        : previous,
    );
  }, []);

  const undo = useCallback(() => {
    setSession((previous) =>
      previous ? { ...previous, index: Math.max(0, previous.index - 1) } : previous,
    );
  }, []);

  const redo = useCallback(() => {
    setSession((previous) =>
      previous
        ? { ...previous, index: Math.min(previous.states.length - 1, previous.index + 1) }
        : previous,
    );
  }, []);

  const duplicateCurrent = useCallback(() => {
    setSession((previous) => {
      if (!previous) return previous;
      const currentState = previous.states[previous.index];
      const duplicate = {
        ...currentState,
        id: createId(),
        title: `${currentState.title} / Echo`,
        instruction: "复制的状态",
        scene: cloneScene(currentState.scene),
        baselineScene: cloneScene(currentState.scene),
        suggestions: [...currentState.suggestions],
        createdAt: new Date().toISOString(),
      };
      const branch = previous.states.slice(0, previous.index + 1);
      const states = [...branch, duplicate].slice(-MAX_STATES);
      return { ...previous, states, index: states.length - 1 };
    });
  }, []);

  const clearEvolution = useCallback(() => {
    setSession((previous) => {
      if (!previous) return previous;
      const currentState = previous.states[previous.index];
      return {
        ...previous,
        states: [
          {
            ...currentState,
            id: createId(),
            scene: cloneScene(currentState.scene),
            baselineScene: cloneScene(currentState.scene),
            suggestions: [...currentState.suggestions],
          },
        ],
        index: 0,
      };
    });
  }, []);

  const clearSession = useCallback(() => setSession(null), []);

  return {
    session,
    current,
    startWorld,
    loadSession,
    pushEvolution,
    updateCurrentScene,
    resetCurrentScene,
    selectState,
    undo,
    redo,
    duplicateCurrent,
    clearEvolution,
    clearSession,
    canUndo: Boolean(session && session.index > 0),
    canRedo: Boolean(session && session.index < session.states.length - 1),
  };
}
