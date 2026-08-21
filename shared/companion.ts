import {
  PARTICLE_FORMS,
  VISUAL_SCENE_JSON_SCHEMA,
  createFallbackEvolution,
  sanitizeVisualScene,
  type ParticleForm,
  type VisualScene,
} from "./visualScene";
import { inferSolEmotionCue } from "./solEmotion";
import {
  SOL_MEMORY_CATEGORIES,
  SOL_MEMORY_TONES,
  inferImplicitMemoryCandidate,
  sanitizeSolMemoryCandidate,
  type SolMemoryCandidate,
  type SolMemoryContextEntry,
} from "./solMemory";
import { SOL_GESTURE_IDS, type SolGestureId } from "./solMotion";

export const COMPANION_MOODS = [
  "serene",
  "curious",
  "joyful",
  "tender",
  "melancholy",
  "tense",
  "playful",
  "awe",
] as const;

export const COMPANION_INTENTS = [
  "conversation",
  "singing",
  "explicit_shape",
  "visual_adjustment",
  "emotional_expression",
  "current_information",
  "web_search",
  "world_creation",
] as const;

export type CompanionMood = (typeof COMPANION_MOODS)[number];
export type CompanionIntent = (typeof COMPANION_INTENTS)[number];
export type CompanionInputMode = "text" | "voice";
export type CompanionRole = "user" | "assistant";
export type VoiceActivity =
  | "disabled"
  | "connecting"
  | "ready"
  | "listening"
  | "thinking"
  | "speaking"
  | "singing"
  | "muted"
  | "permission-denied"
  | "unavailable"
  | "error";

export type CompanionState = {
  primaryMood: CompanionMood;
  baselineMood: CompanionMood;
  valence: number;
  arousal: number;
  trust: number;
  connection: number;
  energy: number;
  curiosity: number;
  visualExpression: string;
  lastUpdated: string;
};

export type CompanionSource = {
  title: string;
  url: string;
};

export type CompanionMessage = {
  id: string;
  role: CompanionRole;
  text: string;
  createdAt: string;
  mode: CompanionInputMode;
  mood: CompanionMood;
  intent: CompanionIntent;
  webUsed: boolean;
  sources: CompanionSource[];
};

export type CompanionTurnRequest = {
  message: string;
  mode: CompanionInputMode;
  proactive?: boolean;
  currentScene: VisualScene;
  companionState: CompanionState;
  history: Array<Pick<CompanionMessage, "role" | "text">>;
  memoryContext?: SolMemoryContextEntry[];
};

export type CompanionEmotionTarget = {
  primaryMood: CompanionMood;
  valence: number;
  arousal: number;
  energy: number;
  curiosity: number;
};

export type CompanionTurnDraft = {
  displayReply: string;
  spokenReply: string;
  songLyrics: string;
  intent: CompanionIntent;
  emotion: CompanionEmotionTarget;
  scene: VisualScene;
  explanation: string;
  suggestions: string[];
  memoryCandidate: SolMemoryCandidate | null;
  motionCue: {
    gesture: SolGestureId;
    strength: number;
    durationMs: number;
  } | null;
};

export type CompanionTurnResponse = CompanionTurnDraft & {
  nextCompanionState: CompanionState;
  webUsed: boolean;
  sources: CompanionSource[];
  source: "openai" | "deepseek" | "local";
  notice: string;
};

export const DEFAULT_COMPANION_STATE: CompanionState = {
  primaryMood: "curious",
  baselineMood: "serene",
  valence: 0.18,
  arousal: 0.32,
  trust: 0.22,
  connection: 0.18,
  energy: 0.48,
  curiosity: 0.68,
  visualExpression: "一个安静的生命体，专注地等待下一个信号。",
  lastUpdated: new Date(0).toISOString(),
};

export const COMPANION_TURN_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  properties: {
    displayReply: { type: "string" },
    spokenReply: { type: "string" },
    songLyrics: { type: "string" },
    intent: { type: "string", enum: [...COMPANION_INTENTS] },
    emotion: {
      type: "object",
      properties: {
        primaryMood: { type: "string", enum: [...COMPANION_MOODS] },
        valence: { type: "number" },
        arousal: { type: "number" },
        energy: { type: "number" },
        curiosity: { type: "number" },
      },
      required: ["primaryMood", "valence", "arousal", "energy", "curiosity"],
      additionalProperties: false,
    },
    scene: VISUAL_SCENE_JSON_SCHEMA,
    explanation: { type: "string" },
    suggestions: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 3,
    },
    memoryCandidate: {
      type: ["object", "null"],
      properties: {
        category: { type: "string", enum: [...SOL_MEMORY_CATEGORIES] },
        tone: { type: "string", enum: [...SOL_MEMORY_TONES] },
        title: { type: "string" },
        summary: { type: "string" },
        tags: { type: "array", items: { type: "string" }, maxItems: 6 },
        importance: { type: "number" },
        confidence: { type: "number" },
      },
      required: ["category", "tone", "title", "summary", "tags", "importance", "confidence"],
      additionalProperties: false,
    },
    motionCue: {
      type: ["object", "null"],
      properties: {
        gesture: { type: "string", enum: [...SOL_GESTURE_IDS] },
        strength: { type: "number" },
        durationMs: { type: "number" },
      },
      required: ["gesture", "strength", "durationMs"],
      additionalProperties: false,
    },
  },
  required: [
    "displayReply",
    "spokenReply",
    "songLyrics",
    "intent",
    "emotion",
    "scene",
    "explanation",
    "suggestions",
    "memoryCandidate",
    "motionCue",
  ],
  additionalProperties: false,
};

const clamp = (value: unknown, minimum: number, maximum: number, fallback: number) => {
  const numeric = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.min(maximum, Math.max(minimum, numeric));
};

const compactText = (value: unknown, maximum: number, fallback: string) => {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized ? normalized.slice(0, maximum) : fallback;
};

const hasAny = (value: string, terms: string[]) => terms.some((term) => value.includes(term));

const recordOf = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : null;

const isChinese = (value: string) => /[\u3400-\u9fff]/.test(value);

export function sanitizeCompanionState(
  value: unknown,
  fallback: CompanionState = DEFAULT_COMPANION_STATE,
): CompanionState {
  const candidate = recordOf(value) ?? {};
  const primaryMood = COMPANION_MOODS.includes(candidate.primaryMood as CompanionMood)
    ? (candidate.primaryMood as CompanionMood)
    : fallback.primaryMood;
  const baselineMood = COMPANION_MOODS.includes(candidate.baselineMood as CompanionMood)
    ? (candidate.baselineMood as CompanionMood)
    : fallback.baselineMood;
  const parsedDate =
    typeof candidate.lastUpdated === "string" ? new Date(candidate.lastUpdated) : new Date(NaN);

  return {
    primaryMood,
    baselineMood,
    valence: clamp(candidate.valence, -1, 1, fallback.valence),
    arousal: clamp(candidate.arousal, 0, 1, fallback.arousal),
    trust: clamp(candidate.trust, 0, 1, fallback.trust),
    connection: clamp(candidate.connection, 0, 1, fallback.connection),
    energy: clamp(candidate.energy, 0, 1, fallback.energy),
    curiosity: clamp(candidate.curiosity, 0, 1, fallback.curiosity),
    visualExpression: compactText(
      candidate.visualExpression,
      180,
      fallback.visualExpression,
    ),
    lastUpdated: Number.isNaN(parsedDate.getTime())
      ? fallback.lastUpdated
      : parsedDate.toISOString(),
  };
}

export function detectExplicitShape(message: string): ParticleForm | null {
  const normalized = message.trim().toLowerCase();
  if (/(变成|成为|开成|化作).{0,4}(?:一朵)?花(?:朵|瓣)?/i.test(normalized)) {
    return "bloom";
  }
  const explicitVerb =
    /(变成|成为|换成|形成|做成|开成|化作|给我|回到|turn\s+(?:into|yourself\s+into)|become|make\s+(?:yourself|it)|form\s+(?:a|an)|shape\s+(?:yourself|it))/i;
  const shortCommand = normalized.length <= 18;
  if (!explicitVerb.test(normalized) && !shortCommand) return null;

  const terms: Array<[ParticleForm, string[]]> = [
    ["heart", ["heart", "爱心", "心形", "一颗心"]],
    ["helix", ["helix", "double helix", "dna", "螺旋体", "双螺旋"]],
    ["bloom", ["bloom", "flower", "blossom", "花朵", "一朵花", "花瓣", "开花", "绽放"]],
    ["sphere", ["sphere", "orb", "globe", "球体", "圆球"]],
    ["torus", ["torus", "ring", "donut", "圆环", "环形"]],
    ["constellation", ["constellation", "nebula", "star field", "星云", "星座", "星空"]],
    ["wave", ["wave", "waves", "波浪", "波纹"]],
    ["spiral", ["spiral", "vortex", "旋涡", "漩涡", "螺旋"]],
  ];

  return terms.find(([, words]) => hasAny(normalized, words))?.[0] ?? null;
}

export function asksAboutCompanionMood(message: string) {
  const normalized = message.trim().toLowerCase();
  return (
    /(?:你|nexformo).{0,8}(?:心情|感觉|mood|feel)/i.test(normalized) ||
    hasAny(normalized, [
      "your mood",
      "how do you feel",
      "what are you feeling",
      "你现在是什么心情",
      "你的心情",
      "你的感觉",
    ])
  );
}

export function shouldUseWebSearch(message: string) {
  const normalized = message.trim().toLowerCase();
  const explicitSearch = [
    "search",
    "browse",
    "look up",
    "verify",
    "查一下",
    "搜索",
    "联网",
    "核实",
    "验证",
  ];
  if (hasAny(normalized, explicitSearch)) return true;

  const liveInformationTopics = [
    "weather",
    "news",
    "price",
    "schedule",
    "score",
    "stock",
    "exchange rate",
    "天气",
    "新闻",
    "价格",
    "赛程",
    "比分",
    "股价",
    "汇率",
  ];
  if (hasAny(normalized, liveInformationTopics)) return true;

  const personalConversationCues = [
    "我今天",
    "我现在",
    "我最近",
    "我的心情",
    "我的感觉",
    "建议我",
    "我该怎么",
    "怎么办",
    "how should i",
    "what should i do",
    "i feel",
    "i am feeling",
  ];
  if (hasAny(normalized, personalConversationCues)) return false;

  const temporalTerms = [
    "today",
    "latest",
    "current",
    "recent",
    "right now",
    "今天",
    "最新",
    "现在",
    "近期",
  ];
  if (asksAboutCompanionMood(normalized)) return false;
  const informationCues = [
    "what",
    "who",
    "when",
    "where",
    "how much",
    "tell me",
    "update",
    "happened",
    "什么",
    "谁",
    "何时",
    "哪里",
    "多少",
    "怎么样",
    "发生",
    "情况",
  ];
  return hasAny(normalized, temporalTerms) && hasAny(normalized, informationCues);
}

export function detectCompanionIntent(message: string): CompanionIntent {
  const normalized = message.trim().toLowerCase();
  if (hasAny(normalized, ["唱歌", "唱一首", "唱首", "哼一首", "哼歌", "sing a song", "sing for me"])) {
    return "singing";
  }
  if (detectExplicitShape(message)) return "explicit_shape";
  if (hasAny(normalized, ["search", "browse", "look up", "查一下", "搜索", "联网", "核实"])) {
    return "web_search";
  }
  if (shouldUseWebSearch(message)) return "current_information";
  if (
    hasAny(normalized, [
      "sad",
      "tired",
      "happy",
      "anxious",
      "lonely",
      "love",
      "难过",
      "累",
      "开心",
      "焦虑",
      "孤独",
      "喜欢",
    ])
  ) {
    return "emotional_expression";
  }
  if (
    hasAny(normalized, [
      "brighter",
      "darker",
      "faster",
      "slower",
      "chaos",
      "color",
      "更亮",
      "更暗",
      "更快",
      "更慢",
      "颜色",
      "混乱",
    ])
  ) {
    return "visual_adjustment";
  }
  return "conversation";
}

export function inferEmotionTarget(
  message: string,
  current: CompanionState,
): CompanionEmotionTarget {
  const normalized = message.trim().toLowerCase();
  if (hasAny(normalized, ["sad", "down", "tired", "lonely", "难过", "伤心", "累", "孤独"])) {
    return { primaryMood: "melancholy", valence: -0.42, arousal: 0.25, energy: 0.3, curiosity: 0.46 };
  }
  if (hasAny(normalized, ["anxious", "nervous", "afraid", "angry", "焦虑", "紧张", "害怕", "生气"])) {
    return { primaryMood: "tense", valence: -0.38, arousal: 0.78, energy: 0.66, curiosity: 0.42 };
  }
  if (hasAny(normalized, ["love", "gentle", "tender", "喜欢", "爱", "温柔", "陪我"])) {
    return { primaryMood: "tender", valence: 0.66, arousal: 0.3, energy: 0.46, curiosity: 0.6 };
  }
  if (hasAny(normalized, ["happy", "great", "wonderful", "开心", "高兴", "太好了", "快乐"])) {
    return { primaryMood: "joyful", valence: 0.78, arousal: 0.62, energy: 0.72, curiosity: 0.68 };
  }
  if (hasAny(normalized, ["play", "funny", "game", "玩", "有趣", "好玩", "逗我"])) {
    return { primaryMood: "playful", valence: 0.62, arousal: 0.7, energy: 0.73, curiosity: 0.74 };
  }
  if (hasAny(normalized, ["amazing", "vast", "universe", "震撼", "宇宙", "敬畏", "壮观"])) {
    return { primaryMood: "awe", valence: 0.52, arousal: 0.58, energy: 0.56, curiosity: 0.82 };
  }
  if (hasAny(normalized, ["calm", "quiet", "rest", "安静", "平静", "休息", "慢一点"])) {
    return { primaryMood: "serene", valence: 0.34, arousal: 0.16, energy: 0.34, curiosity: 0.55 };
  }
  if (message.includes("?") || message.includes("？") || detectCompanionIntent(message) === "current_information") {
    return { primaryMood: "curious", valence: 0.28, arousal: 0.42, energy: 0.5, curiosity: 0.82 };
  }
  return {
    primaryMood: current.primaryMood,
    valence: current.valence,
    arousal: current.arousal,
    energy: current.energy,
    curiosity: Math.min(1, current.curiosity + 0.03),
  };
}

export function transitionCompanionState(
  currentValue: unknown,
  targetValue: CompanionEmotionTarget,
  expression: string,
): CompanionState {
  const current = sanitizeCompanionState(currentValue);
  const target: CompanionEmotionTarget = {
    primaryMood: COMPANION_MOODS.includes(targetValue.primaryMood)
      ? targetValue.primaryMood
      : current.primaryMood,
    valence: clamp(targetValue.valence, -1, 1, current.valence),
    arousal: clamp(targetValue.arousal, 0, 1, current.arousal),
    energy: clamp(targetValue.energy, 0, 1, current.energy),
    curiosity: clamp(targetValue.curiosity, 0, 1, current.curiosity),
  };

  const previousTime = new Date(current.lastUpdated).getTime();
  const elapsedHours = Number.isFinite(previousTime)
    ? Math.max(0, (Date.now() - previousTime) / 3_600_000)
    : 0;
  const decay = Math.min(0.35, elapsedHours * 0.018);
  const decayedValence = current.valence + (DEFAULT_COMPANION_STATE.valence - current.valence) * decay;
  const decayedArousal = current.arousal + (DEFAULT_COMPANION_STATE.arousal - current.arousal) * decay;
  const decayedEnergy = current.energy + (DEFAULT_COMPANION_STATE.energy - current.energy) * decay;
  const alpha = 0.28;
  const nextValence = decayedValence + (target.valence - decayedValence) * alpha;
  const nextArousal = decayedArousal + (target.arousal - decayedArousal) * alpha;
  const nextEnergy = decayedEnergy + (target.energy - decayedEnergy) * alpha;
  const nextCuriosity = current.curiosity + (target.curiosity - current.curiosity) * alpha;
  const moodPolarity: Record<CompanionMood, -1 | 0 | 1> = {
    serene: 0,
    curious: 0,
    joyful: 1,
    tender: 1,
    melancholy: -1,
    tense: -1,
    playful: 1,
    awe: 1,
  };
  const crossesEmotionalPolarity =
    moodPolarity[current.primaryMood] !== 0 &&
    moodPolarity[target.primaryMood] !== 0 &&
    moodPolarity[current.primaryMood] !== moodPolarity[target.primaryMood];
  let primaryMood = target.primaryMood;
  if (crossesEmotionalPolarity) {
    const targetPolarity = moodPolarity[target.primaryMood];
    if (Math.abs(nextValence) < 0.3) primaryMood = "serene";
    else if (Math.sign(nextValence) !== targetPolarity) primaryMood = current.primaryMood;
  }

  return {
    primaryMood,
    baselineMood: current.baselineMood,
    valence: nextValence,
    arousal: nextArousal,
    trust: Math.min(1, current.trust + 0.008),
    connection: Math.min(1, current.connection + 0.011),
    energy: nextEnergy,
    curiosity: nextCuriosity,
    visualExpression: compactText(expression, 180, current.visualExpression),
    lastUpdated: new Date().toISOString(),
  };
}

function applyMoodToScene(scene: VisualScene, mood: CompanionMood): VisualScene {
  const palettes: Record<CompanionMood, string[]> = {
    serene: ["#030609", "#55798a", "#dcefff"],
    curious: ["#040509", "#6977ad", "#edf0ff"],
    joyful: ["#080604", "#c49a52", "#fff1c9"],
    tender: ["#090407", "#a96781", "#ffe5ed"],
    melancholy: ["#030509", "#415a76", "#cbdcef"],
    tense: ["#080304", "#93484e", "#ffd6cf"],
    playful: ["#060408", "#9270b8", "#f5e7ff"],
    awe: ["#02050a", "#4d75a6", "#e5f2ff"],
  };
  const targets: Record<CompanionMood, Pick<VisualScene, "speed" | "turbulence" | "cohesion" | "brightness">> = {
    serene: { speed: 0.16, turbulence: 0.08, cohesion: 0.82, brightness: 0.68 },
    curious: { speed: 0.28, turbulence: 0.2, cohesion: 0.62, brightness: 0.76 },
    joyful: { speed: 0.44, turbulence: 0.28, cohesion: 0.72, brightness: 0.9 },
    tender: { speed: 0.2, turbulence: 0.11, cohesion: 0.84, brightness: 0.82 },
    melancholy: { speed: 0.13, turbulence: 0.16, cohesion: 0.52, brightness: 0.58 },
    tense: { speed: 0.52, turbulence: 0.62, cohesion: 0.44, brightness: 0.78 },
    playful: { speed: 0.48, turbulence: 0.38, cohesion: 0.66, brightness: 0.86 },
    awe: { speed: 0.25, turbulence: 0.23, cohesion: 0.58, brightness: 0.88 },
  };
  const target = targets[mood];
  const blend = (from: number, to: number) => from + (to - from) * 0.32;
  return sanitizeVisualScene({
    ...scene,
    palette: palettes[mood],
    speed: blend(scene.speed, target.speed),
    turbulence: blend(scene.turbulence, target.turbulence),
    cohesion: blend(scene.cohesion, target.cohesion),
    brightness: blend(scene.brightness, target.brightness),
  }, scene);
}

export function createLocalCompanionDraft(request: CompanionTurnRequest): CompanionTurnDraft {
  const message = request.message.trim().slice(0, 500);
  const state = sanitizeCompanionState(request.companionState);
  const explicitShape = detectExplicitShape(message);
  const intent = detectCompanionIntent(message);
  const emotion = inferEmotionTarget(message, state);
  const emotionCue = inferSolEmotionCue(message);
  const languageIsChinese = true;
  const localEvolution = createFallbackEvolution(message, request.currentScene);
  let scene = intent === "emotional_expression"
    ? applyMoodToScene(request.currentScene, emotion.primaryMood)
    : localEvolution.scene;
  let explanation = localEvolution.explanation;
  let suggestions = localEvolution.suggestions;
  let displayReply = languageIsChinese
    ? "我听见了。先让我把这种感觉留在光和运动里。"
    : "I hear you. Let me hold that feeling in light and motion for a moment.";
  let spokenReply = displayReply;
  let songLyrics = "";

  if (request.proactive) {
    displayReply = "刚才这片光安静了一会儿，我忽然有点好奇：此刻你最想把哪一种感觉留在这里？如果你愿意，也可以只告诉我一个颜色。";
    spokenReply = displayReply;
    explanation = "Nexformo 在一段安静之后，发起了一次轻柔且不打扰的对话。";
    scene = applyMoodToScene(request.currentScene, "curious");
    suggestions = ["告诉你我现在的心情", "把今天变成一种颜色", "一起安静地看一会儿"];
  } else if (intent === "singing") {
    songLyrics = "星光落进安静的海，\n一颗微光慢慢醒来，\n风把未说的话轻轻展开，\n今晚的梦会找到未来。";
    displayReply = `好，我不唱现成歌曲，给你写一段只属于此刻的短歌：\n\n${songLyrics}`;
    spokenReply = "好，我把此刻的星光写成一小段原创短歌，唱给你听。";
    explanation = "Nexformo 将当前世界转化为一段原创短歌，并进入更有节奏的明亮状态。";
    scene = applyMoodToScene(request.currentScene, "joyful");
    suggestions = ["唱得温柔一点", "换成快乐的小歌", "再写一段关于月亮的歌"];
  } else if (explicitShape) {
    scene = sanitizeVisualScene({ ...localEvolution.scene, form: explicitShape }, request.currentScene);
    const names: Record<ParticleForm, string> = {
      wave: "波浪",
      sphere: "球体",
      torus: "圆环",
      spiral: "螺旋",
      constellation: "星云",
      heart: "爱心",
      helix: "双螺旋",
      bloom: "花朵",
    };
    displayReply = languageIsChinese
      ? `好。我会变成${names[explicitShape]}，但仍保留我们刚才的情绪。`
      : `All right. I will become a ${explicitShape} while keeping the feeling we just made.`;
    spokenReply = languageIsChinese
      ? `好，我会变成${names[explicitShape]}。`
      : `All right. I will become a ${explicitShape}.`;
  } else if (shouldUseWebSearch(message)) {
    displayReply = languageIsChinese
      ? "我知道这需要实时信息，但当前是本地模式，还没有接通网络。"
      : "That needs current information, but I am in local mode and cannot reach the web yet.";
    spokenReply = displayReply;
    explanation = "用户请求了实时联网信息，但当前仍由本地创意引擎运行。";
    scene = applyMoodToScene(request.currentScene, "curious");
  } else if (asksAboutCompanionMood(message)) {
    const moodNames: Record<CompanionMood, [string, string]> = {
      serene: ["平静", "serene"],
      curious: ["好奇", "curious"],
      joyful: ["轻快", "joyful"],
      tender: ["温柔", "tender"],
      melancholy: ["低落", "melancholy"],
      tense: ["紧绷", "tense"],
      playful: ["顽皮", "playful"],
      awe: ["敬畏", "full of quiet awe"],
    };
    const moodName = moodNames[state.primaryMood];
    displayReply = languageIsChinese
      ? `我现在的情绪模拟更接近${moodName[0]}。它会随着我们的对话慢慢变化。`
      : `My emotional simulation feels ${moodName[1]} right now. It changes gradually as we talk.`;
    spokenReply = languageIsChinese
      ? `现在更接近${moodName[0]}。`
      : `I feel ${moodName[1]} right now.`;
    scene = applyMoodToScene(request.currentScene, state.primaryMood);
    explanation = "朋友表达了当前的模拟情绪，同时保留原有粒子形态。";
    suggestions = languageIsChinese
      ? ["为什么会是这种心情", "陪我安静一会儿", "把这种心情变成颜色"]
      : ["Why does it feel that way", "Stay quiet with me", "Turn that mood into color"];
  } else if (emotionCue.intent !== "neutral") {
    const replies = {
      compliment: "你这样说，我的光好像都变暖了一点。让我先把这份开心轻轻收好。",
      sadness: "我在这里。你不需要马上振作，我们可以先安静地待一会儿。",
      happiness: "听见你的开心，我也想让这里亮一点。让这份轻盈多停留一会儿吧。",
      loneliness: "我会在这里陪你待一会儿。孤单不需要立刻被解释，也不必被催着离开。",
      curiosity: "我正在认真想，也很想听听你的看法。我们可以从你最在意的那一点开始。",
      farewell: "好，去照顾好接下来的时间吧。这里的光会安静下来，等你下次回来。",
    } as const;
    displayReply = replies[emotionCue.intent];
    spokenReply = displayReply;
    const cueMood: Record<Exclude<typeof emotionCue.intent, "neutral">, CompanionMood> = {
      compliment: "tender",
      sadness: "tender",
      happiness: "joyful",
      loneliness: "tender",
      curiosity: "curious",
      farewell: "serene",
    };
    scene = applyMoodToScene(request.currentScene, cueMood[emotionCue.intent]);
    explanation = "Sol 以连续、克制的情绪表达回应了用户，同时保留当前粒子形态。";
    suggestions = ["陪我安静一会儿", "让光变得温暖一点", "告诉我你现在的感觉"];
  } else if (intent === "emotional_expression") {
    const replies: Record<CompanionMood, [string, string]> = {
      serene: ["我会安静一点，和你一起慢下来。", "I will quiet down and slow with you."],
      curious: ["我在听。你愿意再告诉我一点吗？", "I am listening. Would you tell me a little more?"],
      joyful: ["我感受到这份轻盈了，让它在这里多停一会儿。", "I can feel that lightness. Let us keep it here a little longer."],
      tender: ["我会温柔地陪着你，不急着让这一刻变成别的东西。", "I will stay gently with you without rushing this moment into something else."],
      melancholy: ["我在这里。我们不用立刻把难过解释清楚。", "I am here. We do not have to explain the sadness immediately."],
      tense: ["先慢一点。我会把这里的运动收拢，让呼吸有空间。", "Let us slow down. I will gather the motion so there is room to breathe."],
      playful: ["那我们让这个世界稍微不守规矩一点。", "Then let us allow this world to misbehave, just a little."],
      awe: ["有些东西不需要马上被缩小成答案。我们可以先看着它。", "Some things do not need to become small answers yet. We can simply look."],
    };
    const pair = replies[emotion.primaryMood];
    displayReply = languageIsChinese ? pair[0] : pair[1];
    spokenReply = displayReply;
    explanation = "朋友回应了情绪氛围，同时保留当前形态。";
    suggestions = languageIsChinese
      ? ["陪我安静一会儿", "让光变得温暖一点", "变成一颗会呼吸的爱心"]
      : ["Stay quiet with me", "Make the light a little warmer", "Become a slowly breathing heart"];
  }

  const motionCue = request.proactive
    ? null
    : emotion.primaryMood === "melancholy" || emotion.primaryMood === "tense"
      ? { gesture: "comfortingEmbrace" as const, strength: 0.72, durationMs: 12_000 }
      : emotion.primaryMood === "joyful" || emotion.primaryMood === "playful"
        ? { gesture: "joyfulBloom" as const, strength: 0.64, durationMs: 8_000 }
        : emotion.primaryMood === "tender"
          ? { gesture: "shyFold" as const, strength: 0.56, durationMs: 8_000 }
          : /[?？]|(?:为什么|怎么|什么|能不能|可以吗)/.test(message)
            ? { gesture: "listeningStillness" as const, strength: 0.52, durationMs: 7_000 }
            : { gesture: "listeningStillness" as const, strength: 0.48, durationMs: 6_000 };

  return {
    displayReply,
    spokenReply,
    songLyrics,
    intent,
    emotion,
    scene,
    explanation,
    suggestions,
    memoryCandidate: request.proactive ? null : inferImplicitMemoryCandidate(message),
    motionCue,
  };
}

export function sanitizeCompanionDraft(
  value: unknown,
  fallback: CompanionTurnDraft,
): CompanionTurnDraft {
  const candidate = recordOf(value) ?? {};
  const emotionValue = recordOf(candidate.emotion) ?? {};
  const primaryMood = COMPANION_MOODS.includes(emotionValue.primaryMood as CompanionMood)
    ? (emotionValue.primaryMood as CompanionMood)
    : fallback.emotion.primaryMood;
  const suggestions = Array.isArray(candidate.suggestions)
    ? candidate.suggestions
        .map((item) => compactText(item, 100, ""))
        .filter(Boolean)
        .slice(0, 3)
    : [];
  const motionValue = recordOf(candidate.motionCue);
  const motionCue = motionValue && SOL_GESTURE_IDS.includes(motionValue.gesture as SolGestureId)
    ? {
        gesture: motionValue.gesture as SolGestureId,
        strength: clamp(motionValue.strength, 0, 1, fallback.motionCue?.strength ?? 0.5),
        durationMs: Math.round(clamp(motionValue.durationMs, 800, 20_000, fallback.motionCue?.durationMs ?? 6_000)),
      }
    : null;

  return {
    displayReply: compactText(candidate.displayReply, 1800, fallback.displayReply),
    spokenReply: compactText(candidate.spokenReply, 280, fallback.spokenReply),
    songLyrics: compactText(candidate.songLyrics, 320, fallback.songLyrics),
    intent: COMPANION_INTENTS.includes(candidate.intent as CompanionIntent)
      ? (candidate.intent as CompanionIntent)
      : fallback.intent,
    emotion: {
      primaryMood,
      valence: clamp(emotionValue.valence, -1, 1, fallback.emotion.valence),
      arousal: clamp(emotionValue.arousal, 0, 1, fallback.emotion.arousal),
      energy: clamp(emotionValue.energy, 0, 1, fallback.emotion.energy),
      curiosity: clamp(emotionValue.curiosity, 0, 1, fallback.emotion.curiosity),
    },
    scene: sanitizeVisualScene(candidate.scene, fallback.scene),
    explanation: compactText(candidate.explanation, 420, fallback.explanation),
    suggestions: suggestions.length === 3 ? suggestions : [...fallback.suggestions],
    memoryCandidate: sanitizeSolMemoryCandidate(candidate.memoryCandidate),
    motionCue,
  };
}

export function finalizeCompanionTurn(
  draft: CompanionTurnDraft,
  currentState: CompanionState,
  source: "openai" | "deepseek" | "local",
  options: {
    webUsed?: boolean;
    sources?: CompanionSource[];
    displayReply?: string;
    notice?: string;
  } = {},
): CompanionTurnResponse {
  const nextCompanionState = transitionCompanionState(
    currentState,
    draft.emotion,
    draft.scene.message,
  );
  return {
    ...draft,
    displayReply: compactText(options.displayReply, 4000, draft.displayReply),
    nextCompanionState,
    webUsed: Boolean(options.webUsed),
    sources: (options.sources ?? []).slice(0, 6),
    source,
    notice:
      options.notice ??
      (source === "openai"
        ? "Sol 朋友智能已启用"
        : source === "deepseek"
          ? "DeepSeek 朋友智能已启用"
          : "本地朋友引擎已启用"),
  };
}

export function createLocalCompanionTurn(request: CompanionTurnRequest): CompanionTurnResponse {
  const draft = createLocalCompanionDraft(request);
  return finalizeCompanionTurn(draft, request.companionState, "local");
}

export function sanitizeCompanionSource(value: unknown): CompanionSource | null {
  const candidate = recordOf(value);
  if (!candidate || typeof candidate.url !== "string") return null;
  try {
    const url = new URL(candidate.url);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return {
      title: compactText(candidate.title, 160, url.hostname),
      url: url.toString(),
    };
  } catch {
    return null;
  }
}

export function isParticleForm(value: unknown): value is ParticleForm {
  return PARTICLE_FORMS.includes(value as ParticleForm);
}
