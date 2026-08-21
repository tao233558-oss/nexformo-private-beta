export const PARTICLE_FORMS = [
  "wave",
  "sphere",
  "torus",
  "spiral",
  "constellation",
  "heart",
  "helix",
  "bloom",
] as const;

export const CAMERA_MOTIONS = ["still", "drift", "orbit"] as const;

export type ParticleForm = (typeof PARTICLE_FORMS)[number];
export type CameraMotion = (typeof CAMERA_MOTIONS)[number];

export const PARTICLE_FORM_LABELS: Record<ParticleForm, string> = {
  wave: "波浪",
  sphere: "球体",
  torus: "圆环",
  spiral: "螺旋",
  constellation: "星云",
  heart: "爱心",
  helix: "双螺旋",
  bloom: "花朵",
};

export const CAMERA_MOTION_LABELS: Record<CameraMotion, string> = {
  still: "静止",
  drift: "漂移",
  orbit: "环绕",
};

export type VisualScene = {
  message: string;
  form: ParticleForm;
  palette: string[];
  speed: number;
  turbulence: number;
  cohesion: number;
  pointSize: number;
  brightness: number;
  cameraMotion: CameraMotion;
};

export type VisualSceneResponse = {
  scene: VisualScene;
  source: "openai" | "deepseek" | "local";
  notice: string;
};

export type VisualEvolution = {
  title: string;
  scene: VisualScene;
  explanation: string;
  suggestions: string[];
};

export type VisualEvolutionResponse = {
  evolution: VisualEvolution;
  source: "openai" | "deepseek" | "local";
  notice: string;
};

export const VISUAL_SCENE_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  properties: {
    message: { type: "string" },
    form: { type: "string", enum: [...PARTICLE_FORMS] },
    palette: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 4,
    },
    speed: { type: "number" },
    turbulence: { type: "number" },
    cohesion: { type: "number" },
    pointSize: { type: "number" },
    brightness: { type: "number" },
    cameraMotion: { type: "string", enum: [...CAMERA_MOTIONS] },
  },
  required: [
    "message",
    "form",
    "palette",
    "speed",
    "turbulence",
    "cohesion",
    "pointSize",
    "brightness",
    "cameraMotion",
  ],
  additionalProperties: false,
};

export const VISUAL_EVOLUTION_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  properties: {
    title: { type: "string" },
    scene: VISUAL_SCENE_JSON_SCHEMA,
    explanation: { type: "string" },
    suggestions: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 3,
    },
  },
  required: ["title", "scene", "explanation", "suggestions"],
  additionalProperties: false,
};

export const DEFAULT_SCENE: VisualScene = {
  message: "一片安静的星云，等待语言赋予它引力。",
  form: "constellation",
  palette: ["#050509", "#b8c6ff", "#f4f7ff"],
  speed: 0.22,
  turbulence: 0.18,
  cohesion: 0.58,
  pointSize: 1.15,
  brightness: 0.72,
  cameraMotion: "drift",
};

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

const clamp = (value: unknown, minimum: number, maximum: number, fallback: number) => {
  const numeric = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.min(maximum, Math.max(minimum, numeric));
};

const hashPrompt = (prompt: string) => {
  let hash = 2166136261;
  for (let index = 0; index < prompt.length; index += 1) {
    hash ^= prompt.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const hasAny = (value: string, terms: string[]) => terms.some((term) => value.includes(term));

const limitWords = (value: unknown, maximum: number, fallback: string) => {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized ? normalized.split(" ").slice(0, maximum).join(" ") : fallback;
};

const FALLBACK_PRESETS: VisualScene[] = [
  {
    message: "沉没的城市，在借来的光流里做梦。",
    form: "wave",
    palette: ["#03060d", "#315f86", "#d7f3ff"],
    speed: 0.2,
    turbulence: 0.26,
    cohesion: 0.67,
    pointSize: 1.2,
    brightness: 0.72,
    cameraMotion: "drift",
  },
  {
    message: "记忆化作天气，在发光的场域中归来。",
    form: "spiral",
    palette: ["#090509", "#8f576e", "#ffd9c7"],
    speed: 0.55,
    turbulence: 0.74,
    cohesion: 0.42,
    pointSize: 1.35,
    brightness: 0.82,
    cameraMotion: "orbit",
  },
  {
    message: "当运动学会克制，安静的智慧开始聚集。",
    form: "sphere",
    palette: ["#050609", "#8592b8", "#f6f8ff"],
    speed: 0.12,
    turbulence: 0.09,
    cohesion: 0.86,
    pointSize: 1.05,
    brightness: 0.66,
    cameraMotion: "still",
  },
  {
    message: "一道不可能的轨道，托住思想的建筑。",
    form: "torus",
    palette: ["#060509", "#8067b2", "#eee5ff"],
    speed: 0.34,
    turbulence: 0.31,
    cohesion: 0.73,
    pointSize: 1.25,
    brightness: 0.75,
    cameraMotion: "orbit",
  },
  {
    message: "微小的信号穿过黑暗，发现彼此。",
    form: "constellation",
    palette: ["#030405", "#83a99d", "#e8fff9"],
    speed: 0.25,
    turbulence: 0.22,
    cohesion: 0.54,
    pointSize: 1.4,
    brightness: 0.78,
    cameraMotion: "drift",
  },
];

export function createFallbackScene(prompt: string): VisualScene {
  const normalized = prompt.trim().toLowerCase();
  const hash = hashPrompt(normalized || "nexformo");

  let presetIndex = hash % FALLBACK_PRESETS.length;
  if (hasAny(normalized, ["heart", "love", "爱心", "心形", "一颗心"])) {
    return {
      message: "温柔的脉动聚拢成一颗有生命的光之心。",
      form: "heart",
      palette: ["#090305", "#b94c69", "#ffe5ec"],
      speed: 0.2,
      turbulence: 0.13,
      cohesion: 0.86,
      pointSize: 1.28,
      brightness: 0.84,
      cameraMotion: "drift",
    };
  }
  if (hasAny(normalized, ["helix", "double helix", "dna", "螺旋体", "双螺旋"])) {
    return {
      message: "两股安静的光流，记起如何围绕彼此旋转。",
      form: "helix",
      palette: ["#03070a", "#58a6aa", "#e5ffff"],
      speed: 0.34,
      turbulence: 0.16,
      cohesion: 0.76,
      pointSize: 1.12,
      brightness: 0.76,
      cameraMotion: "orbit",
    };
  }
  if (hasAny(normalized, ["bloom", "flower", "blossom", "花朵", "一朵花", "花瓣", "开花", "绽放"])) {
    return {
      message: "当注视化作温度，一朵花耐心地绽放。",
      form: "bloom",
      palette: ["#070407", "#b178a0", "#ffe9c9"],
      speed: 0.18,
      turbulence: 0.12,
      cohesion: 0.81,
      pointSize: 1.22,
      brightness: 0.8,
      cameraMotion: "drift",
    };
  }
  if (hasAny(normalized, ["sphere", "orb", "globe", "球体", "圆球"])) {
    presetIndex = 2;
  } else if (hasAny(normalized, ["torus", "ring", "donut", "圆环", "环形"])) {
    presetIndex = 3;
  } else if (hasAny(normalized, ["wave", "ocean", "underwater", "sea", "water", "deep", "波浪", "海", "水", "深海"])) {
    presetIndex = 0;
  } else if (hasAny(normalized, ["storm", "memory", "thunder", "风暴", "记忆", "雷"])) {
    presetIndex = 1;
  } else if (hasAny(normalized, ["quiet", "silent", "calm", "intelligence", "安静", "宁静", "智能"])) {
    presetIndex = 2;
  } else if (hasAny(normalized, ["orbit", "ring", "architecture", "轨道", "圆环", "建筑"])) {
    presetIndex = 3;
  } else if (hasAny(normalized, ["city", "signal", "stars", "city", "城市", "星", "信号"])) {
    presetIndex = 4;
  }

  const preset = FALLBACK_PRESETS[presetIndex];
  const variation = ((hash >>> 8) % 17) / 100;

  return {
    ...preset,
    palette: [...preset.palette],
    speed: clamp(preset.speed + variation - 0.08, 0, 1, preset.speed),
    turbulence: clamp(preset.turbulence + variation - 0.08, 0, 1, preset.turbulence),
  };
}

export function sanitizeVisualScene(
  value: unknown,
  fallback: VisualScene = DEFAULT_SCENE,
): VisualScene {
  const candidate = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const rawMessage = typeof candidate.message === "string" ? candidate.message.trim() : "";
  const message = rawMessage
    ? rawMessage.split(/\s+/).slice(0, 14).join(" ")
    : fallback.message;
  const form = PARTICLE_FORMS.includes(candidate.form as ParticleForm)
    ? (candidate.form as ParticleForm)
    : fallback.form;
  const cameraMotion = CAMERA_MOTIONS.includes(candidate.cameraMotion as CameraMotion)
    ? (candidate.cameraMotion as CameraMotion)
    : fallback.cameraMotion;
  const palette = Array.isArray(candidate.palette)
    ? candidate.palette
        .filter((color): color is string => typeof color === "string" && HEX_COLOR.test(color))
        .slice(0, 4)
    : [];

  return {
    message,
    form,
    palette: palette.length >= 2 ? palette : [...fallback.palette],
    speed: clamp(candidate.speed, 0, 1, fallback.speed),
    turbulence: clamp(candidate.turbulence, 0, 1, fallback.turbulence),
    cohesion: clamp(candidate.cohesion, 0, 1, fallback.cohesion),
    pointSize: clamp(candidate.pointSize, 0.5, 3, fallback.pointSize),
    brightness: clamp(candidate.brightness, 0, 1, fallback.brightness),
    cameraMotion,
  };
}

const LOCAL_EVOLUTION_SUGGESTIONS = [
  "让引力变得不确定",
  "加入一个遥远的信号",
  "让结构拥有记忆",
];

export function createFallbackEvolution(
  instruction: string,
  currentScene: VisualScene,
): VisualEvolution {
  const normalized = instruction.trim().toLowerCase();
  const seedScene = createFallbackScene(`${instruction} ${currentScene.form}`);
  let title = "新的氛围状态";
  let message = "世界重新分配重量，发现了另一种内在节奏。";
  let explanation = "运动、结构与光线围绕新的指令重新取得平衡。";
  let suggestions = [...LOCAL_EVOLUTION_SUGGESTIONS];
  let scene: VisualScene = {
    ...seedScene,
    palette: [...seedScene.palette],
    speed: (seedScene.speed + currentScene.speed) / 2,
    turbulence: (seedScene.turbulence + currentScene.turbulence) / 2,
    cohesion: (seedScene.cohesion + currentScene.cohesion) / 2,
    pointSize: (seedScene.pointSize + currentScene.pointSize) / 2,
    brightness: (seedScene.brightness + currentScene.brightness) / 2,
  };

  if (hasAny(normalized, ["heart", "love", "爱心", "心形", "一颗心"])) {
    title = "学会呼吸的爱心";
    message = "温柔的脉动聚拢成一颗有生命的光之心。";
    explanation = "粒子场形成了立体爱心，并保持温暖而克制的脉动。";
    suggestions = [
      "让爱心呼吸得更慢",
      "加入一段安静的金色记忆",
      "让爱心绽放成花朵",
    ];
    scene = {
      ...scene,
      form: "heart",
      palette: ["#090305", "#b94c69", "#ffe5ec"],
      speed: 0.2,
      turbulence: 0.13,
      cohesion: 0.86,
      pointSize: 1.28,
      brightness: 0.84,
      cameraMotion: "drift",
    };
  } else if (hasAny(normalized, ["helix", "double helix", "dna", "螺旋体", "双螺旋"])) {
    title = "记忆中的双螺旋";
    message = "两股安静的光流，记起如何围绕彼此旋转。";
    explanation = "粒子场重组为双螺旋，并以克制的轨道运动。";
    suggestions = [
      "让其中一条光带更温暖",
      "让双螺旋缓慢解开",
      "在两条光带之间藏入信号",
    ];
    scene = {
      ...scene,
      form: "helix",
      palette: ["#03070a", "#58a6aa", "#e5ffff"],
      speed: 0.34,
      turbulence: 0.16,
      cohesion: 0.76,
      pointSize: 1.12,
      brightness: 0.76,
      cameraMotion: "orbit",
    };
  } else if (hasAny(normalized, ["bloom", "flower", "blossom", "花朵", "一朵花", "花瓣", "开花", "绽放"])) {
    title = "耐心绽放的花";
    message = "当注视化作温度，一朵花耐心地绽放。";
    explanation = "粒子展开为层叠花瓣，光线更温暖，运动更平静。";
    suggestions = [
      "让花瓣在黄昏合拢",
      "在中心放入一颗明亮种子",
      "让花朵化作星云",
    ];
    scene = {
      ...scene,
      form: "bloom",
      palette: ["#070407", "#b178a0", "#ffe9c9"],
      speed: 0.18,
      turbulence: 0.12,
      cohesion: 0.81,
      pointSize: 1.22,
      brightness: 0.8,
      cameraMotion: "drift",
    };
  } else if (hasAny(normalized, ["sphere", "orb", "globe", "球体", "圆球"])) {
    title = "安静的球体";
    message = "粒子场轻轻闭合，成为一个完整而凝视着的球体。";
    explanation = "粒子形成连贯的球体，同时保留当前氛围。";
    scene = { ...scene, form: "sphere", cohesion: Math.max(scene.cohesion, 0.78) };
  } else if (hasAny(normalized, ["torus", "ring", "donut", "圆环", "环形"])) {
    title = "无尽的圆环";
    message = "粒子场化作一道看不见起点与终点的轨道。";
    explanation = "粒子形成圆环，并开始缓慢环绕运动。";
    scene = { ...scene, form: "torus", cameraMotion: "orbit" };
  } else if (hasAny(normalized, ["constellation", "nebula", "stars", "星云", "星座", "星空"])) {
    title = "回到星云";
    message = "身体松散成信号，铺展在耐心的黑暗里。";
    explanation = "粒子回到开阔星云，并采用缓慢漂移的镜头。";
    scene = { ...scene, form: "constellation", cohesion: 0.54, cameraMotion: "drift" };
  } else if (hasAny(normalized, ["wave", "waves", "波浪", "波纹"])) {
    title = "聆听的波浪";
    message = "身体展开成一片波浪，在黑暗中聆听。";
    explanation = "粒子展开为宽阔而柔和运动的波面。";
    scene = { ...scene, form: "wave", cameraMotion: "drift" };
  } else if (hasAny(normalized, ["cold", "colder", "distant", "ice", "frozen", "冷", "遥远", "冰"])) {
    title = "遥远的寒意";
    message = "距离进入粒子场，每个信号都冷却成蓝色的寂静。";
    explanation = "色彩变冷、运动减慢，粒子展开为更加遥远的场域。";
    suggestions = [
      "加入一颗微弱的人造太阳",
      "让寒冷开始碎裂",
      "在寂静下藏入一阵脉动",
    ];
    scene = {
      ...scene,
      form: "constellation",
      palette: ["#02050a", "#426f9b", "#dceeff"],
      speed: currentScene.speed * 0.62,
      turbulence: currentScene.turbulence * 0.58,
      cohesion: 0.44,
      brightness: 0.65,
      cameraMotion: "drift",
    };
  } else if (
    hasAny(normalized, ["civilization", "city", "artificial life", "machine", "文明", "城市", "生命"])
  ) {
    title = "信号成为文明";
    message = "微小信号自行组织成耐心而发光的文明。";
    explanation = "粒子场形成网络，变得更明亮、更连贯，并出现有序生命的痕迹。";
    suggestions = [
      "赋予这个文明一种仪式",
      "加入一个被禁止的区域",
      "让一个信号产生自我意识",
    ];
    scene = {
      ...scene,
      form: "constellation",
      palette: ["#020706", "#3f9c83", "#e0fff5"],
      speed: 0.3,
      turbulence: 0.2,
      cohesion: 0.7,
      pointSize: 1.35,
      brightness: 0.84,
      cameraMotion: "orbit",
    };
  } else if (hasAny(normalized, ["reduce", "calm", "less chaos", "restraint", "平静", "减少", "克制"])) {
    title = "不沉默的秩序";
    message = "混乱退去，克制的张力仍悬停在中心。";
    explanation = "扰动降低、聚合增强，同时保留场景深处的张力。";
    suggestions = [
      "在秩序中放入一个缺口",
      "让中心缓慢呼吸",
      "让克制变得脆弱",
    ];
    scene = {
      ...scene,
      form: "sphere",
      speed: Math.min(currentScene.speed, 0.2),
      turbulence: 0.08,
      cohesion: 0.88,
      cameraMotion: "still",
    };
  } else if (hasAny(normalized, ["collapse", "decay", "fall apart", "break", "坍塌", "崩溃", "破碎"])) {
    title = "缓慢坍塌";
    message = "结构记起引力，开始穿过自己的历史向下坠落。";
    explanation = "聚合降低，扰动与环绕运动增强，形成受控坍塌。";
    suggestions = [
      "让坍塌停在半途",
      "揭示中心幸存的事物",
      "让引力短暂反转",
    ];
    scene = {
      ...scene,
      form: "spiral",
      palette: ["#080405", "#8f403d", "#ffd6b8"],
      speed: 0.62,
      turbulence: 0.78,
      cohesion: 0.27,
      brightness: 0.76,
      cameraMotion: "orbit",
    };
  }

  return {
    title,
    scene: sanitizeVisualScene({ ...scene, message }, currentScene),
    explanation,
    suggestions,
  };
}

export function sanitizeVisualEvolution(
  value: unknown,
  fallback: VisualEvolution,
): VisualEvolution {
  const candidate = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const rawSuggestions = Array.isArray(candidate.suggestions) ? candidate.suggestions : [];
  const suggestions = rawSuggestions
    .map((suggestion) => limitWords(suggestion, 10, ""))
    .filter(Boolean)
    .slice(0, 3);

  return {
    title: limitWords(candidate.title, 7, fallback.title),
    scene: sanitizeVisualScene(candidate.scene, fallback.scene),
    explanation: limitWords(candidate.explanation, 28, fallback.explanation),
    suggestions: suggestions.length === 3 ? suggestions : [...fallback.suggestions],
  };
}
