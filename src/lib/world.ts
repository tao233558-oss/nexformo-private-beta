import {
  CAMERA_MOTIONS,
  PARTICLE_FORMS,
  sanitizeVisualScene,
  type VisualScene,
} from "../../shared/visualScene";

export type EngineSource = "openai" | "deepseek" | "local";

export type WorldSnapshot = {
  id: string;
  title: string;
  prompt: string;
  instruction: string;
  scene: VisualScene;
  baselineScene: VisualScene;
  explanation: string;
  suggestions: string[];
  source: EngineSource;
  createdAt: string;
};

export type WorldSession = {
  id: string;
  originalPrompt: string;
  createdAt: string;
  states: WorldSnapshot[];
  index: number;
};

export type WorldArchiveEntry = {
  id: string;
  title: string;
  originalPrompt: string;
  message: string;
  scene: VisualScene;
  createdAt: string;
  evolutionCount: number;
  session: WorldSession;
};

export type NexformoArchiveFile = {
  kind: "nexformo-world";
  version: 1;
  entry: WorldArchiveEntry;
};

const recordOf = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : null;

export const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `nex-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
};

export const cloneScene = (scene: VisualScene): VisualScene => ({
  ...scene,
  palette: [...scene.palette],
});

export const createWorldTitle = (prompt: string) => {
  const normalized = prompt.trim().replace(/\s+/g, " ");
  if (!normalized) return "未命名世界";
  if (!normalized.includes(" ")) return normalized.slice(0, 20);

  const title = normalized
    .replace(/^(a|an|the)\s+/i, "")
    .split(" ")
    .slice(0, 5)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
  return title || "未命名世界";
};

export function createInitialSession(
  prompt: string,
  scene: VisualScene,
  source: EngineSource,
): WorldSession {
  const createdAt = new Date().toISOString();
  const title = createWorldTitle(prompt);
  const safeScene = cloneScene(scene);
  return {
    id: createId(),
    originalPrompt: prompt,
    createdAt,
    index: 0,
    states: [
      {
        id: createId(),
        title,
        prompt,
        instruction: "初始解析",
        scene: safeScene,
        baselineScene: cloneScene(safeScene),
        explanation: "根据最初的世界描述生成的第一版视觉形态。",
        suggestions: [
          "让它更寒冷、更遥远",
          "加入人造生命的痕迹",
          "让结构缓慢坍塌",
        ],
        source,
        createdAt,
      },
    ],
  };
}

const isVisualScene = (value: unknown) => {
  const scene = recordOf(value);
  if (!scene) return false;
  return (
    typeof scene.message === "string" &&
    PARTICLE_FORMS.includes(scene.form as (typeof PARTICLE_FORMS)[number]) &&
    Array.isArray(scene.palette) &&
    scene.palette.length >= 2 &&
    scene.palette.every((color) => typeof color === "string") &&
    typeof scene.speed === "number" &&
    typeof scene.turbulence === "number" &&
    typeof scene.cohesion === "number" &&
    typeof scene.pointSize === "number" &&
    typeof scene.brightness === "number" &&
    CAMERA_MOTIONS.includes(scene.cameraMotion as (typeof CAMERA_MOTIONS)[number])
  );
};

const sanitizeSnapshot = (value: unknown): WorldSnapshot | null => {
  const snapshot = recordOf(value);
  if (!snapshot || !isVisualScene(snapshot.scene)) return null;
  const scene = sanitizeVisualScene(snapshot.scene);
  const baselineScene = isVisualScene(snapshot.baselineScene)
    ? sanitizeVisualScene(snapshot.baselineScene, scene)
    : cloneScene(scene);
  const suggestions = Array.isArray(snapshot.suggestions)
    ? snapshot.suggestions.filter((item): item is string => typeof item === "string").slice(0, 3)
    : [];

  return {
    id: typeof snapshot.id === "string" ? snapshot.id : createId(),
    title: typeof snapshot.title === "string" ? snapshot.title.slice(0, 80) : "未命名世界",
    prompt: typeof snapshot.prompt === "string" ? snapshot.prompt.slice(0, 500) : "",
    instruction:
      typeof snapshot.instruction === "string" ? snapshot.instruction.slice(0, 500) : "导入的状态",
    scene,
    baselineScene,
    explanation:
      typeof snapshot.explanation === "string" ? snapshot.explanation.slice(0, 400) : "导入的状态",
    suggestions,
    source:
      snapshot.source === "openai"
        ? "openai"
        : snapshot.source === "deepseek"
          ? "deepseek"
          : "local",
    createdAt:
      typeof snapshot.createdAt === "string" ? snapshot.createdAt : new Date().toISOString(),
  };
};

export const sanitizeWorldSession = (value: unknown): WorldSession | null => {
  const session = recordOf(value);
  if (!session || !Array.isArray(session.states)) return null;
  const states = session.states.map(sanitizeSnapshot).filter((item): item is WorldSnapshot => Boolean(item));
  if (!states.length) return null;
  const rawIndex = typeof session.index === "number" ? Math.floor(session.index) : states.length - 1;

  return {
    id: typeof session.id === "string" ? session.id : createId(),
    originalPrompt:
      typeof session.originalPrompt === "string" ? session.originalPrompt.slice(0, 500) : states[0].prompt,
    createdAt: typeof session.createdAt === "string" ? session.createdAt : states[0].createdAt,
    states: states.slice(-12),
    index: Math.min(states.slice(-12).length - 1, Math.max(0, rawIndex)),
  };
};

export const createArchiveEntry = (session: WorldSession): WorldArchiveEntry => {
  const current = session.states[session.index];
  return {
    id: createId(),
    title: current.title,
    originalPrompt: session.originalPrompt,
    message: current.scene.message,
    scene: cloneScene(current.scene),
    createdAt: new Date().toISOString(),
    evolutionCount: Math.max(0, session.states.length - 1),
    session: {
      ...session,
      states: session.states.map((state) => ({
        ...state,
        scene: cloneScene(state.scene),
        baselineScene: cloneScene(state.baselineScene),
        suggestions: [...state.suggestions],
      })),
    },
  };
};

export const sanitizeArchiveEntry = (value: unknown): WorldArchiveEntry | null => {
  const entry = recordOf(value);
  if (!entry) return null;
  const session = sanitizeWorldSession(entry.session);
  if (!session) return null;
  const current = session.states[session.index];

  return {
    id: typeof entry.id === "string" ? entry.id : createId(),
    title: typeof entry.title === "string" ? entry.title.slice(0, 80) : current.title,
    originalPrompt:
      typeof entry.originalPrompt === "string" ? entry.originalPrompt.slice(0, 500) : session.originalPrompt,
    message: typeof entry.message === "string" ? entry.message.slice(0, 240) : current.scene.message,
    scene: isVisualScene(entry.scene) ? sanitizeVisualScene(entry.scene, current.scene) : cloneScene(current.scene),
    createdAt: typeof entry.createdAt === "string" ? entry.createdAt : new Date().toISOString(),
    evolutionCount:
      typeof entry.evolutionCount === "number"
        ? Math.max(0, Math.floor(entry.evolutionCount))
        : Math.max(0, session.states.length - 1),
    session,
  };
};

export const parseArchiveFile = (value: unknown): WorldArchiveEntry | null => {
  const file = recordOf(value);
  if (!file || file.kind !== "nexformo-world" || file.version !== 1) return null;
  const entry = sanitizeArchiveEntry(file.entry);
  return entry ? { ...entry, id: createId(), createdAt: new Date().toISOString() } : null;
};

export const formatWorldDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未知日期";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
