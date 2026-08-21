import { useCallback, useEffect, useState } from "react";
import {
  COMPANION_INTENTS,
  COMPANION_MOODS,
  DEFAULT_COMPANION_STATE,
  createLocalCompanionDraft,
  finalizeCompanionTurn,
  sanitizeCompanionDraft,
  sanitizeCompanionSource,
  sanitizeCompanionState,
  type CompanionInputMode,
  type CompanionIntent,
  type CompanionMessage,
  type CompanionMood,
  type CompanionTurnRequest,
  type CompanionTurnResponse,
} from "../../shared/companion";
import type { VisualScene } from "../../shared/visualScene";
import type { SolMemoryContextEntry } from "../../shared/solMemory";
import { createId } from "../lib/world";

const COMPANION_MEMORY_KEY = "nexformo.companion-memory.v1";
const MAX_MESSAGES = 40;

type StoredCompanionMemory = {
  state: unknown;
  messages: unknown;
};

const sanitizeMessage = (value: unknown): CompanionMessage | null => {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Record<string, unknown>;
  if (candidate.role !== "user" && candidate.role !== "assistant") return null;
  if (typeof candidate.text !== "string" || !candidate.text.trim()) return null;
  const mood = COMPANION_MOODS.includes(candidate.mood as CompanionMood)
    ? (candidate.mood as CompanionMood)
    : DEFAULT_COMPANION_STATE.primaryMood;
  const intent = COMPANION_INTENTS.includes(candidate.intent as CompanionIntent)
    ? (candidate.intent as CompanionIntent)
    : "conversation";
  const rawSources = Array.isArray(candidate.sources) ? candidate.sources : [];

  return {
    id: typeof candidate.id === "string" ? candidate.id : createId(),
    role: candidate.role,
    text: candidate.text.trim().slice(0, 4000),
    createdAt:
      typeof candidate.createdAt === "string"
        ? candidate.createdAt
        : new Date().toISOString(),
    mode: candidate.mode === "voice" ? "voice" : "text",
    mood,
    intent,
    webUsed: Boolean(candidate.webUsed),
    sources: rawSources
      .map(sanitizeCompanionSource)
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .slice(0, 6),
  };
};

const loadMemory = () => {
  if (typeof window === "undefined") {
    return { state: DEFAULT_COMPANION_STATE, messages: [] as CompanionMessage[] };
  }
  try {
    const raw = window.localStorage.getItem(COMPANION_MEMORY_KEY);
    if (!raw) return { state: DEFAULT_COMPANION_STATE, messages: [] as CompanionMessage[] };
    const parsed = JSON.parse(raw) as StoredCompanionMemory;
    const messages = Array.isArray(parsed.messages)
      ? parsed.messages
          .map(sanitizeMessage)
          .filter((item): item is CompanionMessage => Boolean(item))
          .slice(-MAX_MESSAGES)
      : [];
    return { state: sanitizeCompanionState(parsed.state), messages };
  } catch {
    return { state: DEFAULT_COMPANION_STATE, messages: [] as CompanionMessage[] };
  }
};

const sanitizeServerTurn = (
  value: unknown,
  request: CompanionTurnRequest,
): CompanionTurnResponse => {
  const fallbackDraft = createLocalCompanionDraft(request);
  const fallback = finalizeCompanionTurn(fallbackDraft, request.companionState, "local");
  if (!value || typeof value !== "object") return fallback;
  const candidate = value as Record<string, unknown>;
  const draft = sanitizeCompanionDraft(candidate, fallbackDraft);
  const rawSources = Array.isArray(candidate.sources) ? candidate.sources : [];
  const sources = rawSources
    .map(sanitizeCompanionSource)
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 6);
  const serverState = sanitizeCompanionState(candidate.nextCompanionState, fallback.nextCompanionState);

  return {
    ...draft,
    nextCompanionState: serverState,
    webUsed: Boolean(candidate.webUsed),
    sources,
    source:
      candidate.source === "openai"
        ? "openai"
        : candidate.source === "deepseek"
          ? "deepseek"
          : "local",
    notice:
      typeof candidate.notice === "string" ? candidate.notice.slice(0, 180) : fallback.notice,
  };
};

export function useCompanion() {
  const [initial] = useState(loadMemory);
  const [state, setState] = useState(initial.state);
  const [messages, setMessages] = useState(initial.messages);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      window.localStorage.setItem(
        COMPANION_MEMORY_KEY,
        JSON.stringify({ state, messages: messages.slice(-MAX_MESSAGES) }),
      );
    } catch {
      // Persistence is optional; the active session remains usable without it.
    }
  }, [messages, state]);

  const sendTurn = useCallback(
    async (
      rawMessage: string,
      currentScene: VisualScene,
      mode: CompanionInputMode = "text",
      memoryContext: SolMemoryContextEntry[] = [],
    ) => {
      const message = rawMessage.trim().slice(0, 500);
      if (!message || busy) return null;
      setBusy(true);
      setError("");

      const request: CompanionTurnRequest = {
        message,
        mode,
        currentScene,
        companionState: state,
        history: messages.slice(-16).map((item) => ({ role: item.role, text: item.text })),
        memoryContext,
      };
      const userMessage: CompanionMessage = {
        id: createId(),
        role: "user",
        text: message,
        createdAt: new Date().toISOString(),
        mode,
        mood: state.primaryMood,
        intent: "conversation",
        webUsed: false,
        sources: [],
      };
      setMessages((previous) => [...previous, userMessage].slice(-MAX_MESSAGES));

      let result: CompanionTurnResponse;
      try {
        const response = await fetch("/api/companion-turn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
          signal: AbortSignal.timeout(52_000),
        });
        if (!response.ok) throw new Error("朋友请求未被接受。");
        result = sanitizeServerTurn(await response.json(), request);
      } catch (requestError) {
        result = finalizeCompanionTurn(
          createLocalCompanionDraft(request),
          request.companionState,
          "local",
          { notice: "连接不可用，本地朋友已启用" },
        );
        setError(
          requestError instanceof Error && requestError.name === "TimeoutError"
            ? "在线回应等待时间过长，已继续使用本地朋友。"
            : "在线智能暂时不可用，已继续使用本地朋友。",
        );
      }

      const assistantMessage: CompanionMessage = {
        id: createId(),
        role: "assistant",
        text: result.displayReply,
        createdAt: new Date().toISOString(),
        mode,
        mood: result.nextCompanionState.primaryMood,
        intent: result.intent,
        webUsed: result.webUsed,
        sources: result.sources,
      };
      setState(result.nextCompanionState);
      setMessages((previous) => [...previous, assistantMessage].slice(-MAX_MESSAGES));
      setBusy(false);
      return result;
    },
    [busy, messages, state],
  );

  const sendProactiveTurn = useCallback(
    async (currentScene: VisualScene) => {
      if (busy) return null;
      setBusy(true);
      setError("");

      const request: CompanionTurnRequest = {
        message: "根据我们最近的对话和你现在的模拟情绪，自然地发起一个轻松的新话题。",
        mode: "text",
        proactive: true,
        currentScene,
        companionState: state,
        history: messages.slice(-16).map((item) => ({ role: item.role, text: item.text })),
      };

      let result: CompanionTurnResponse;
      try {
        const response = await fetch("/api/companion-turn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
          signal: AbortSignal.timeout(42_000),
        });
        if (!response.ok) throw new Error("主动回应未被接受。");
        result = sanitizeServerTurn(await response.json(), request);
      } catch {
        result = finalizeCompanionTurn(
          createLocalCompanionDraft(request),
          request.companionState,
          "local",
          { notice: "已使用本地主动回应" },
        );
      }

      const assistantMessage: CompanionMessage = {
        id: createId(),
        role: "assistant",
        text: result.displayReply,
        createdAt: new Date().toISOString(),
        mode: "text",
        mood: result.nextCompanionState.primaryMood,
        intent: result.intent,
        webUsed: result.webUsed,
        sources: result.sources,
      };
      setState(result.nextCompanionState);
      setMessages((previous) => [...previous, assistantMessage].slice(-MAX_MESSAGES));
      setBusy(false);
      return result;
    },
    [busy, messages, state],
  );

  const appendLocalExchange = useCallback(
    (
      rawMessage: string,
      rawReply: string,
      mode: CompanionInputMode = "text",
    ) => {
      const message = rawMessage.trim().slice(0, 500);
      const reply = rawReply.trim().slice(0, 4000);
      if (!message || !reply) return;
      const createdAt = new Date().toISOString();
      const exchange: CompanionMessage[] = [
        {
          id: createId(),
          role: "user",
          text: message,
          createdAt,
          mode,
          mood: state.primaryMood,
          intent: "conversation",
          webUsed: false,
          sources: [],
        },
        {
          id: createId(),
          role: "assistant",
          text: reply,
          createdAt,
          mode,
          mood: state.primaryMood,
          intent: "conversation",
          webUsed: false,
          sources: [],
        },
      ];
      setError("");
      setMessages((previous) => [...previous, ...exchange].slice(-MAX_MESSAGES));
    },
    [state.primaryMood],
  );

  const appendLocalAssistantMessage = useCallback((rawReply: string) => {
    const reply = rawReply.trim().slice(0, 4000);
    if (!reply) return;
    const message: CompanionMessage = {
      id: createId(),
      role: "assistant",
      text: reply,
      createdAt: new Date().toISOString(),
      mode: "text",
      mood: state.primaryMood,
      intent: "conversation",
      webUsed: false,
      sources: [],
    };
    setError("");
    setMessages((previous) => [...previous, message].slice(-MAX_MESSAGES));
  }, [state.primaryMood]);

  const resetMemory = useCallback(() => {
    setState({ ...DEFAULT_COMPANION_STATE, lastUpdated: new Date().toISOString() });
    setMessages([]);
    setError("");
    try {
      window.localStorage.removeItem(COMPANION_MEMORY_KEY);
    } catch {
      // The in-memory reset is still complete.
    }
  }, []);

  return {
    state,
    messages,
    busy,
    error,
    sendTurn,
    sendProactiveTurn,
    appendLocalExchange,
    appendLocalAssistantMessage,
    resetMemory,
  };
}
