export const SOL_MEMORY_VERSION = 1;
export const SOL_MEMORY_LIMIT = 200;
export const SOL_MEMORY_CONTEXT_LIMIT = 380;

export const SOL_MEMORY_CATEGORIES = [
  "preference",
  "music",
  "place",
  "person",
  "shared_moment",
  "world",
  "note",
] as const;

export const SOL_MEMORY_TONES = [
  "warm",
  "joyful",
  "calm",
  "curious",
  "melancholy",
  "neutral",
] as const;

export type SolMemoryCategory = (typeof SOL_MEMORY_CATEGORIES)[number];
export type SolMemoryTone = (typeof SOL_MEMORY_TONES)[number];
export type SolMemorySource = "explicit" | "suggested" | "world" | "music";

export type SolMemoryCandidate = {
  category: SolMemoryCategory;
  tone: SolMemoryTone;
  title: string;
  summary: string;
  tags: string[];
  importance: number;
  confidence: number;
};

export type SolMemory = SolMemoryCandidate & {
  version: number;
  id: string;
  source: SolMemorySource;
  confirmed: boolean;
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
  lastRecalledAt: number | null;
  recallCount: number;
};

export type SolMemoryContextEntry = Pick<
  SolMemory,
  "id" | "category" | "title" | "summary" | "tags"
>;

export type SolMemoryStore = {
  version: number;
  enabled: boolean;
  memories: SolMemory[];
};

export type SolMemoryCommand =
  | { action: "open" }
  | { action: "close" }
  | { action: "remember"; candidate: SolMemoryCandidate | null; sensitiveReason?: string }
  | { action: "cancel_candidate" }
  | { action: "forget"; query: string }
  | { action: "recall"; query: string }
  | { action: "clear" };

export type SolMemoryResonance = {
  sequence: number;
  memoryId: string | null;
  tone: SolMemoryTone;
  kind: "confirmed" | "recalled" | "corrected";
  startedAt: number;
};

const clamp01 = (value: unknown, fallback: number) => {
  const numeric = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.min(1, Math.max(0, numeric));
};

const recordOf = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" ? value as Record<string, unknown> : null;

const compact = (value: unknown, maximum: number) =>
  typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, maximum)
    : "";

export function normalizeMemoryText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[\s\p{P}\p{S}]+/gu, "")
    .replace(/^(?:请|帮我|可以)?(?:记住|记得)/, "")
    .replace(/(?:这件事|一下|吧|呀|哦|啊|呢)$/g, "");
}

const sensitiveRules: Array<[RegExp, string]> = [
  [/(?:密码|口令|pass(?:word)?|pwd)\s*(?:是|为|[:：=])?/i, "密码不适合存入长期记忆"],
  [/(?:api\s*key|密钥|秘钥|access\s*token|refresh\s*token|令牌)/i, "密钥或令牌不会被记忆"],
  [/(?:验证码|校验码|verification\s*code|短信码)/i, "验证码不会被记忆"],
  [/(?:银行卡|信用卡|cvv|支付密码|银行账号)/i, "支付与银行信息不会被记忆"],
  [/(?:身份证|护照号|社会保障号|social\s*security)/i, "身份号码不会被记忆"],
  [/(?:详细地址|家庭住址|门牌号|住址是)/i, "精确地址不会被记忆"],
  [/\bsk-[a-z0-9_-]{12,}\b/i, "看起来像密钥的内容不会被记忆"],
  [/\b(?:\d[ -]?){16,19}\b/, "看起来像账号或卡号的内容不会被记忆"],
];

export function getSensitiveMemoryReason(value: string) {
  const text = compact(value, 800);
  return sensitiveRules.find(([pattern]) => pattern.test(text))?.[1] ?? "";
}

const categoryFromText = (text: string): SolMemoryCategory => {
  if (/(?:歌|音乐|歌手|乐队|专辑|旋律|听.*歌)/.test(text)) return "music";
  if (/(?:地方|城市|国家|公园|海边|山里|故乡|家乡|旅行)/.test(text)) return "place";
  if (/(?:叫我|称呼我|名字是|朋友|家人|老师)/.test(text)) return "person";
  if (/(?:世界|画布|粒子|形态|星图|创作)/.test(text)) return "world";
  if (/(?:我们|一起|那次|上次|纪念|第一次)/.test(text)) return "shared_moment";
  if (/(?:喜欢|最爱|偏爱|不喜欢|讨厌|习惯|希望|想要)/.test(text)) return "preference";
  return "note";
};

const toneFromText = (text: string): SolMemoryTone => {
  if (/(?:难过|遗憾|想念|低落|悲伤)/.test(text)) return "melancholy";
  if (/(?:开心|快乐|兴奋|幸福|庆祝)/.test(text)) return "joyful";
  if (/(?:温柔|陪伴|喜欢|爱|暖)/.test(text)) return "warm";
  if (/(?:安静|平静|雨天|夜晚|慢慢)/.test(text)) return "calm";
  if (/(?:好奇|想知道|探索|为什么)/.test(text)) return "curious";
  return "neutral";
};

const stopTags = new Set(["我", "你", "我们", "记住", "记得", "这件事", "一个", "以后", "就是"]);

const tagsFromText = (text: string) => {
  const known = text.match(/蓝色|粉色|红色|绿色|紫色|黑色|白色|雨天|晴天|下雨|音乐|歌曲|安静|星空|海边|咖啡|猫|狗|夜晚|周杰伦/g) ?? [];
  const chunks = text
    .replace(/^(?:请|帮我|可以)?(?:记住|记得)/, "")
    .split(/[，。！？、,;；和与及]|但是|而且/)
    .map((item) => item.replace(/^(?:我|你)(?:最)?(?:喜欢|希望|想要|偏爱)?/, "").trim())
    .filter((item) => item.length >= 2 && item.length <= 12 && !stopTags.has(item));
  return [...new Set([...known, ...chunks])].slice(0, 6);
};

const summaryFromExplicitText = (raw: string) => {
  const content = compact(raw, 120)
    .replace(/^(?:请|帮我|可以)?(?:记住|记得)(?:一下)?[：,:，]?\s*/, "")
    .replace(/(?:这件事|一下)[。！!？?]?$/, "")
    .trim();
  if (/^(?:以后)?叫我/.test(content)) {
    return `你希望${content.replace(/^(?:以后)?叫我/, "被称为")}`.slice(0, 120);
  }
  if (/^我的名字是/.test(content)) return `你的名字是${content.slice(5)}`.slice(0, 120);
  if (/^我/.test(content)) return `你${content.slice(1)}`.slice(0, 120);
  return content.slice(0, 120);
};

export function sanitizeSolMemoryCandidate(value: unknown): SolMemoryCandidate | null {
  const record = recordOf(value);
  if (!record) return null;
  const summary = compact(record.summary, 120);
  const title = compact(record.title, 28);
  if (!summary || !title || getSensitiveMemoryReason(`${title} ${summary}`)) return null;
  const rawTags = Array.isArray(record.tags) ? record.tags : [];
  const tags = [...new Set(rawTags.map((tag) => compact(tag, 12)).filter(Boolean))].slice(0, 6);
  return {
    category: SOL_MEMORY_CATEGORIES.includes(record.category as SolMemoryCategory)
      ? record.category as SolMemoryCategory
      : categoryFromText(summary),
    tone: SOL_MEMORY_TONES.includes(record.tone as SolMemoryTone)
      ? record.tone as SolMemoryTone
      : toneFromText(summary),
    title,
    summary,
    tags,
    importance: clamp01(record.importance, 0.55),
    confidence: clamp01(record.confidence, 0.75),
  };
}

export function createExplicitMemoryCandidate(rawText: string): SolMemoryCandidate | null {
  const summary = summaryFromExplicitText(rawText);
  if (!summary || summary.length < 2 || getSensitiveMemoryReason(summary)) return null;
  const category = categoryFromText(summary);
  const title = summary
    .replace(/^(?:你希望被称为|你最喜欢|你喜欢|你偏爱|你不喜欢|你讨厌|你)/, "")
    .replace(/[。！!？?]$/, "")
    .slice(0, 28) || "一段新记忆";
  return sanitizeSolMemoryCandidate({
    category,
    tone: toneFromText(summary),
    title,
    summary: /[。！？]$/.test(summary) ? summary : `${summary}。`,
    tags: tagsFromText(summary),
    importance: /(?:最|一直|以后|特别|重要)/.test(summary) ? 0.72 : 0.58,
    confidence: 0.94,
  });
}

export function inferImplicitMemoryCandidate(rawText: string): SolMemoryCandidate | null {
  const text = compact(rawText, 500);
  if (!text || /[？?]$/.test(text) || getSensitiveMemoryReason(text)) return null;
  if (!/(?:^|[，。！])(?:我最喜欢|我喜欢|我偏爱|我不喜欢|我讨厌|以后叫我|请叫我|我的名字是)/.test(text)) {
    return null;
  }
  const candidate = createExplicitMemoryCandidate(`记住${text}`);
  return candidate ? { ...candidate, confidence: Math.min(candidate.confidence, 0.82) } : null;
}

export function parseSolMemoryCommand(rawText: string): SolMemoryCommand | null {
  const text = compact(rawText, 500);
  const normalized = text.toLowerCase();
  if (!text) return null;
  if (/^(?:打开|进入|看看|查看).{0,6}(?:记忆星图|记忆星空|我们的记忆)$/.test(normalized)) return { action: "open" };
  if (/^(?:关闭|退出).{0,6}(?:记忆星图|记忆星空|我们的记忆)$/.test(normalized)) return { action: "close" };
  if (/^(?:不要记|别记|忽略)(?:这个|这件事|它)?[。！!]?$/i.test(normalized)) return { action: "cancel_candidate" };
  if (/^(?:清空|删除|抹掉)(?:所有|全部)?(?:长期)?记忆[。！!]?$/i.test(normalized)) return { action: "clear" };
  if (/^(?:你)?(?:还)?记得(?:我)?(?:喜欢)?什么|^(?:你)?都记得些?什么|^说说你记得的事/i.test(normalized)) {
    return { action: "recall", query: text };
  }
  const forget = text.match(/^(?:请)?(?:忘掉|忘记|删除记忆|移除记忆)(.+)$/);
  if (forget) return { action: "forget", query: compact(forget[1], 120).replace(/这件事$/, "") };
  if (/^(?:请|帮我|可以)?(?:记住|记得)(?:一下)?[：,:，]?/i.test(text)) {
    const reason = getSensitiveMemoryReason(text);
    return {
      action: "remember",
      candidate: reason ? null : createExplicitMemoryCandidate(text),
      sensitiveReason: reason || undefined,
    };
  }
  return null;
}

export function createSolMemory(
  candidateValue: unknown,
  source: SolMemorySource,
  now = Date.now(),
  id = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `memory-${now}-${Math.random().toString(36).slice(2, 9)}`,
): SolMemory | null {
  const candidate = sanitizeSolMemoryCandidate(candidateValue);
  if (!candidate) return null;
  return {
    version: SOL_MEMORY_VERSION,
    ...candidate,
    id: compact(id, 100) || `memory-${now}`,
    source,
    confirmed: true,
    pinned: false,
    createdAt: now,
    updatedAt: now,
    lastRecalledAt: null,
    recallCount: 0,
  };
}

export function sanitizeSolMemory(value: unknown): SolMemory | null {
  const record = recordOf(value);
  if (!record) return null;
  const candidate = sanitizeSolMemoryCandidate(record);
  const id = compact(record.id, 100);
  if (!candidate || !id || record.confirmed !== true) return null;
  const createdAt = typeof record.createdAt === "number" && Number.isFinite(record.createdAt)
    ? Math.max(0, record.createdAt)
    : Date.now();
  const updatedAt = typeof record.updatedAt === "number" && Number.isFinite(record.updatedAt)
    ? Math.max(createdAt, record.updatedAt)
    : createdAt;
  return {
    version: SOL_MEMORY_VERSION,
    ...candidate,
    id,
    source: ["explicit", "suggested", "world", "music"].includes(String(record.source))
      ? record.source as SolMemorySource
      : "explicit",
    confirmed: true,
    pinned: record.pinned === true,
    createdAt,
    updatedAt,
    lastRecalledAt: typeof record.lastRecalledAt === "number" && Number.isFinite(record.lastRecalledAt)
      ? Math.max(0, record.lastRecalledAt)
      : null,
    recallCount: typeof record.recallCount === "number" && Number.isFinite(record.recallCount)
      ? Math.max(0, Math.min(10_000, Math.floor(record.recallCount)))
      : 0,
  };
}

export function findDuplicateMemory(candidateValue: unknown, memories: SolMemory[]) {
  const candidate = sanitizeSolMemoryCandidate(candidateValue);
  if (!candidate) return null;
  const target = normalizeMemoryText(`${candidate.title}${candidate.summary}`);
  const targetTags = new Set(candidate.tags.map(normalizeMemoryText));
  return memories.find((memory) => {
    const current = normalizeMemoryText(`${memory.title}${memory.summary}`);
    if (current === target || current.includes(target) || target.includes(current)) return true;
    const overlap = memory.tags.filter((tag) => targetTags.has(normalizeMemoryText(tag))).length;
    return overlap >= 2 && overlap >= Math.min(memory.tags.length, candidate.tags.length) * 0.66;
  }) ?? null;
}

export function sanitizeSolMemoryStore(value: unknown): SolMemoryStore {
  const record = recordOf(value) ?? {};
  const memories = Array.isArray(record.memories)
    ? record.memories
        .map(sanitizeSolMemory)
        .filter((item): item is SolMemory => Boolean(item))
        .filter((memory, index, all) => all.findIndex((item) => item.id === memory.id) === index)
        .slice(0, SOL_MEMORY_LIMIT)
    : [];
  return {
    version: SOL_MEMORY_VERSION,
    enabled: record.enabled !== false,
    memories,
  };
}

export function parseSolMemoryArchive(value: unknown) {
  const record = recordOf(value);
  if (!record || !Array.isArray(record.memories)) return null;
  return sanitizeSolMemoryStore(record);
}

const keywordSet = (value: string) => {
  const normalized = compact(value, 500).toLowerCase().normalize("NFKC");
  const words = normalized.match(/[a-z0-9]{2,}|[\u3400-\u9fff]{2,}/g) ?? [];
  const set = new Set<string>();
  for (const word of words) {
    set.add(word);
    if (/^[\u3400-\u9fff]+$/.test(word)) {
      for (let index = 0; index < word.length - 1; index += 1) set.add(word.slice(index, index + 2));
    }
  }
  return set;
};

const isGenericConversation = (text: string) =>
  /^(?:你好|嗨|哈喽|在吗|早上好|下午好|晚上好|谢谢|好的|嗯|哦|hello|hi)[呀啊哦呢！!。\s]*$/i.test(text.trim());

export function selectRelevantMemories(
  rawMessage: string,
  rawMemories: SolMemory[],
  maximum = 3,
) {
  const message = compact(rawMessage, 500);
  if (!message || isGenericConversation(message)) return [];
  const memories = rawMemories.map(sanitizeSolMemory).filter((item): item is SolMemory => Boolean(item));
  const queryTerms = keywordSet(message);
  const recallAll = /(?:喜欢什么|都记得|记得些?什么|有哪些记忆|了解我多少)/.test(message);
  const musicQuery = /(?:音乐|歌曲|歌手|听歌|播放)/.test(message);
  const placeQuery = /(?:地方|城市|旅行|去过|家乡)/.test(message);

  return memories
    .map((memory) => {
      const searchable = `${memory.title} ${memory.summary} ${memory.tags.join(" ")}`;
      const terms = keywordSet(searchable);
      let overlap = 0;
      for (const term of queryTerms) if (terms.has(term)) overlap += term.length > 2 ? 0.16 : 0.08;
      let relevance = Math.min(0.72, overlap);
      if (normalizeMemoryText(searchable).includes(normalizeMemoryText(message))) relevance += 0.5;
      if (recallAll) relevance += memory.category === "preference" ? 0.34 : 0.18;
      if (musicQuery && memory.category === "music") relevance += 0.38;
      if (placeQuery && memory.category === "place") relevance += 0.36;
      if (relevance <= 0.08) return { memory, score: 0 };
      const score = relevance
        + memory.importance * 0.12
        + memory.confidence * 0.08
        + (memory.pinned ? 0.12 : 0)
        + (memory.lastRecalledAt ? Math.max(0, 0.04 - (Date.now() - memory.lastRecalledAt) / 2.592e9 * 0.04) : 0);
      return { memory, score };
    })
    .filter((item) => item.score > 0.16)
    .sort((left, right) => right.score - left.score || left.memory.id.localeCompare(right.memory.id))
    .slice(0, Math.max(0, Math.min(3, maximum)))
    .map((item) => item.memory);
}

export function buildSolMemoryContext(rawMessage: string, memories: SolMemory[]) {
  const selected = selectRelevantMemories(rawMessage, memories, 3);
  const result: SolMemoryContextEntry[] = [];
  let length = 0;
  for (const memory of selected) {
    const entry: SolMemoryContextEntry = {
      id: memory.id,
      category: memory.category,
      title: memory.title,
      summary: memory.summary,
      tags: memory.tags,
    };
    const cost = JSON.stringify(entry).length;
    if (length + cost > SOL_MEMORY_CONTEXT_LIMIT) continue;
    result.push(entry);
    length += cost;
  }
  return result;
}

export function sanitizeSolMemoryContext(value: unknown): SolMemoryContextEntry[] {
  if (!Array.isArray(value)) return [];
  const result: SolMemoryContextEntry[] = [];
  let length = 0;
  for (const item of value.slice(0, 3)) {
    const record = recordOf(item);
    if (!record) continue;
    const id = compact(record.id, 100);
    const title = compact(record.title, 28);
    const summary = compact(record.summary, 120);
    if (!id || !title || !summary || getSensitiveMemoryReason(`${title} ${summary}`)) continue;
    const entry: SolMemoryContextEntry = {
      id,
      category: SOL_MEMORY_CATEGORIES.includes(record.category as SolMemoryCategory)
        ? record.category as SolMemoryCategory
        : "note",
      title,
      summary,
      tags: Array.isArray(record.tags)
        ? [...new Set(record.tags.map((tag) => compact(tag, 12)).filter(Boolean))].slice(0, 6)
        : [],
    };
    const cost = JSON.stringify(entry).length;
    if (length + cost > SOL_MEMORY_CONTEXT_LIMIT) continue;
    result.push(entry);
    length += cost;
  }
  return result;
}

export function findMatchingMemories(query: string, memories: SolMemory[]) {
  const normalized = normalizeMemoryText(query);
  if (!normalized) return [];
  const terms = keywordSet(query);
  return memories
    .map((memory) => {
      const text = `${memory.title}${memory.summary}${memory.tags.join("")}`;
      const candidate = normalizeMemoryText(text);
      let score = candidate.includes(normalized) || normalized.includes(candidate) ? 1 : 0;
      const candidateTerms = keywordSet(text);
      for (const term of terms) if (candidateTerms.has(term)) score += 0.12;
      return { memory, score };
    })
    .filter((item) => item.score >= 0.12)
    .sort((left, right) => right.score - left.score)
    .slice(0, 8)
    .map((item) => item.memory);
}

const hashString = (value: string) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const categoryCenters: Record<SolMemoryCategory, [number, number]> = {
  preference: [0.26, 0.3],
  music: [0.49, 0.2],
  place: [0.75, 0.31],
  person: [0.23, 0.68],
  shared_moment: [0.5, 0.55],
  world: [0.77, 0.7],
  note: [0.5, 0.8],
};

export function getMemoryStarPosition(memory: Pick<SolMemory, "id" | "category">) {
  const center = categoryCenters[memory.category] ?? categoryCenters.note;
  const hashA = hashString(`${memory.id}:x`);
  const hashB = hashString(`${memory.id}:y`);
  const angle = (hashA / 0xffffffff) * Math.PI * 2;
  const radius = 0.035 + (hashB / 0xffffffff) * 0.155;
  return {
    x: Math.min(0.94, Math.max(0.06, center[0] + Math.cos(angle) * radius)),
    y: Math.min(0.9, Math.max(0.1, center[1] + Math.sin(angle) * radius)),
  };
}

export function getMemoryResonanceVisual(reducedMotion: boolean) {
  return reducedMotion
    ? { displacement: 0.025, glow: 0.72, durationMs: 2_800 }
    : { displacement: 0.16, glow: 1, durationMs: 3_800 };
}
