import { useCallback, useEffect, useRef, useState } from "react";
import {
  SOL_MEMORY_LIMIT,
  SOL_MEMORY_VERSION,
  buildSolMemoryContext,
  createSolMemory,
  findDuplicateMemory,
  findMatchingMemories,
  parseSolMemoryCommand,
  sanitizeSolMemory,
  sanitizeSolMemoryCandidate,
  sanitizeSolMemoryStore,
  selectRelevantMemories,
  type SolMemory,
  type SolMemoryCandidate,
  type SolMemoryResonance,
  type SolMemorySource,
  type SolMemoryStore,
} from "../../shared/solMemory";

export const SOL_MEMORY_STORAGE_KEY = "nexformo.sol-memory.v1";

export type SolMemoryExecutionResult = {
  handled: boolean;
  action:
    | "none"
    | "open"
    | "close"
    | "saved"
    | "duplicate"
    | "recalled"
    | "forget_request"
    | "clear_request"
    | "cancelled"
    | "rejected";
  message: string;
  targetIds: string[];
  memory: SolMemory | null;
};

const emptyResult = (): SolMemoryExecutionResult => ({
  handled: false,
  action: "none",
  message: "",
  targetIds: [],
  memory: null,
});

const loadMemoryStore = (): SolMemoryStore => {
  if (typeof window === "undefined") return { version: SOL_MEMORY_VERSION, enabled: true, memories: [] };
  try {
    const raw = window.localStorage.getItem(SOL_MEMORY_STORAGE_KEY);
    return raw
      ? sanitizeSolMemoryStore(JSON.parse(raw) as unknown)
      : { version: SOL_MEMORY_VERSION, enabled: true, memories: [] };
  } catch {
    return { version: SOL_MEMORY_VERSION, enabled: true, memories: [] };
  }
};

const recallSentence = (memories: SolMemory[]) => {
  if (!memories.length) return "这里还没有能回答这个问题的星星。你可以告诉我想记住什么。";
  const summaries = memories.map((memory) => memory.summary.replace(/[。！!?？]$/, ""));
  return summaries.length === 1
    ? `我记得，${summaries[0]}。`
    : `我记得这些：${summaries.join("；")}。`;
};

export function useSolMemory() {
  const [initial] = useState(loadMemoryStore);
  const [enabled, setEnabledState] = useState(initial.enabled);
  const [memories, setMemories] = useState<SolMemory[]>(initial.memories);
  const [candidate, setCandidate] = useState<SolMemoryCandidate | null>(null);
  const [lastSaved, setLastSaved] = useState<SolMemory | null>(null);
  const [resonance, setResonance] = useState<SolMemoryResonance | null>(null);
  const sequenceRef = useRef(0);
  const lastCandidateAt = useRef(0);
  const ignoredCandidates = useRef(new Set<string>());

  useEffect(() => {
    try {
      const payload: SolMemoryStore = { version: SOL_MEMORY_VERSION, enabled, memories };
      window.localStorage.setItem(SOL_MEMORY_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // The active memory constellation remains available when persistence is unavailable.
    }
  }, [enabled, memories]);

  const triggerResonance = useCallback((
    memory: SolMemory | null,
    kind: SolMemoryResonance["kind"],
  ) => {
    sequenceRef.current += 1;
    setResonance({
      sequence: sequenceRef.current,
      memoryId: memory?.id ?? null,
      tone: memory?.tone ?? "warm",
      kind,
      startedAt: Date.now(),
    });
  }, []);

  const confirmCandidate = useCallback((
    rawCandidate: unknown,
    source: SolMemorySource = "suggested",
  ) => {
    if (!enabled || memories.length >= SOL_MEMORY_LIMIT) return null;
    const sanitized = sanitizeSolMemoryCandidate(rawCandidate);
    if (!sanitized) return null;
    const duplicate = findDuplicateMemory(sanitized, memories);
    if (duplicate) {
      setCandidate(null);
      triggerResonance(duplicate, "recalled");
      return duplicate;
    }
    const memory = createSolMemory(sanitized, source);
    if (!memory) return null;
    setMemories((current) => [...current, memory].slice(0, SOL_MEMORY_LIMIT));
    setCandidate(null);
    setLastSaved(memory);
    triggerResonance(memory, "confirmed");
    return memory;
  }, [enabled, memories, triggerResonance]);

  const offerCandidate = useCallback((value: unknown) => {
    if (!enabled || candidate || Date.now() - lastCandidateAt.current < 180_000) return false;
    const sanitized = sanitizeSolMemoryCandidate(value);
    if (!sanitized || findDuplicateMemory(sanitized, memories)) return false;
    const signature = `${sanitized.category}:${sanitized.title}:${sanitized.summary}`;
    if (ignoredCandidates.current.has(signature)) return false;
    lastCandidateAt.current = Date.now();
    setCandidate(sanitized);
    return true;
  }, [candidate, enabled, memories]);

  const ignoreCandidate = useCallback(() => {
    if (candidate) ignoredCandidates.current.add(`${candidate.category}:${candidate.title}:${candidate.summary}`);
    setCandidate(null);
  }, [candidate]);

  const editCandidate = useCallback((value: unknown) => {
    const sanitized = sanitizeSolMemoryCandidate(value);
    if (sanitized) setCandidate(sanitized);
    return sanitized;
  }, []);

  const undoLastSave = useCallback(() => {
    if (!lastSaved) return false;
    setMemories((current) => current.filter((memory) => memory.id !== lastSaved.id));
    setLastSaved(null);
    return true;
  }, [lastSaved]);

  const updateMemory = useCallback((id: string, patch: Partial<SolMemory>) => {
    const current = memories.find((memory) => memory.id === id);
    if (!current) return null;
    const updated = sanitizeSolMemory({
      ...current,
      ...patch,
      id: current.id,
      confirmed: true,
      createdAt: current.createdAt,
      updatedAt: Date.now(),
    });
    if (!updated) return null;
    setMemories((items) => items.map((memory) => memory.id === id ? updated : memory));
    triggerResonance(updated, "corrected");
    return updated;
  }, [memories, triggerResonance]);

  const togglePin = useCallback((id: string) => {
    setMemories((current) => current.map((memory) =>
      memory.id === id ? { ...memory, pinned: !memory.pinned, updatedAt: Date.now() } : memory,
    ));
  }, []);

  const removeMemory = useCallback((id: string) => {
    let removed = false;
    setMemories((current) => {
      removed = current.some((memory) => memory.id === id);
      return current.filter((memory) => memory.id !== id);
    });
    if (lastSaved?.id === id) setLastSaved(null);
    return removed;
  }, [lastSaved?.id]);

  const clearMemories = useCallback(() => {
    setMemories([]);
    setCandidate(null);
    setLastSaved(null);
    setResonance(null);
  }, []);

  const recallMemory = useCallback((id: string) => {
    const memory = memories.find((item) => item.id === id) ?? null;
    if (!memory) return null;
    const now = Date.now();
    const recalled = { ...memory, lastRecalledAt: now, recallCount: memory.recallCount + 1 };
    setMemories((current) => current.map((item) => item.id === id ? recalled : item));
    triggerResonance(recalled, "recalled");
    return recalled;
  }, [memories, triggerResonance]);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
    if (!value) setCandidate(null);
  }, []);

  const contextFor = useCallback((message: string) =>
    enabled ? buildSolMemoryContext(message, memories) : [], [enabled, memories]);

  const importStore = useCallback((value: unknown) => {
    const imported = sanitizeSolMemoryStore(value);
    const next = [...memories];
    let added = 0;
    let skipped = 0;
    for (const memory of imported.memories) {
      if (next.length >= SOL_MEMORY_LIMIT) {
        skipped += 1;
        continue;
      }
      if (next.some((item) => item.id === memory.id) || findDuplicateMemory(memory, next)) {
        skipped += 1;
        continue;
      }
      next.push(memory);
      added += 1;
    }
    setMemories(next);
    return { added, skipped };
  }, [memories]);

  const executeText = useCallback((rawText: string): SolMemoryExecutionResult => {
    const command = parseSolMemoryCommand(rawText);
    if (!command) return emptyResult();
    if (command.action === "open") return { handled: true, action: "open", message: "记忆星图已经为你打开。", targetIds: [], memory: null };
    if (command.action === "close") return { handled: true, action: "close", message: "记忆星图已经收好。", targetIds: [], memory: null };
    if (command.action === "cancel_candidate") {
      ignoreCandidate();
      return { handled: true, action: "cancelled", message: "好，这件事不会被保存。", targetIds: [], memory: null };
    }
    if (command.action === "clear") {
      return { handled: true, action: "clear_request", message: "清空记忆需要你的再次确认。", targetIds: memories.map((memory) => memory.id), memory: null };
    }
    if (command.action === "remember") {
      if (!enabled) return { handled: true, action: "rejected", message: "长期记忆目前已关闭。你可以先在记忆星图里重新开启。", targetIds: [], memory: null };
      if (command.sensitiveReason) return { handled: true, action: "rejected", message: `${command.sensitiveReason}。为了安全，我没有保存它。`, targetIds: [], memory: null };
      if (!command.candidate) return { handled: true, action: "rejected", message: "我还没能把这句话整理成一颗清晰的星星。你可以说得更具体一点。", targetIds: [], memory: null };
      const duplicate = findDuplicateMemory(command.candidate, memories);
      if (duplicate) {
        triggerResonance(duplicate, "recalled");
        return { handled: true, action: "duplicate", message: `“${duplicate.title}”已经在记忆星图里了。`, targetIds: [duplicate.id], memory: duplicate };
      }
      const memory = confirmCandidate(command.candidate, "explicit");
      if (!memory) return { handled: true, action: "rejected", message: memories.length >= SOL_MEMORY_LIMIT ? "记忆星图已经装满了。你可以先整理一些星星。" : "这段内容没有被保存。", targetIds: [], memory: null };
      return { handled: true, action: "saved", message: "我会把这件事放进我们的星图里。", targetIds: [memory.id], memory };
    }
    if (command.action === "forget") {
      const matches = findMatchingMemories(command.query, memories);
      return matches.length
        ? { handled: true, action: "forget_request", message: matches.length === 1 ? `找到了“${matches[0].title}”。请在星图中确认是否移除。` : `找到了 ${matches.length} 颗可能相关的星星，请选择要移除的那一颗。`, targetIds: matches.map((memory) => memory.id), memory: matches[0] }
        : { handled: true, action: "rejected", message: "我没有找到与这句话相符的记忆。", targetIds: [], memory: null };
    }
    if (command.action === "recall") {
      const relevant = selectRelevantMemories(command.query, memories, 3);
      if (relevant[0]) {
        const ids = new Set(relevant.map((memory) => memory.id));
        const now = Date.now();
        setMemories((current) => current.map((memory) => ids.has(memory.id)
          ? { ...memory, lastRecalledAt: now, recallCount: memory.recallCount + 1 }
          : memory));
        triggerResonance(relevant[0], "recalled");
      }
      return { handled: true, action: "recalled", message: recallSentence(relevant), targetIds: relevant.map((memory) => memory.id), memory: relevant[0] ?? null };
    }
    return emptyResult();
  }, [confirmCandidate, enabled, ignoreCandidate, memories, triggerResonance]);

  return {
    enabled,
    memories,
    candidate,
    lastSaved,
    resonance,
    executeText,
    contextFor,
    offerCandidate,
    ignoreCandidate,
    editCandidate,
    confirmCandidate,
    undoLastSave,
    updateMemory,
    togglePin,
    removeMemory,
    clearMemories,
    recallMemory,
    setEnabled,
    importStore,
    exportStore: (): SolMemoryStore => ({ version: SOL_MEMORY_VERSION, enabled, memories }),
  };
}

export type UseSolMemoryResult = ReturnType<typeof useSolMemory>;
