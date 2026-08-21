import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowRight, ArrowUp, Menu, X } from "lucide-react";
import {
  DEFAULT_SCENE,
  createFallbackScene,
  sanitizeVisualScene,
  type ParticleForm,
  type VisualScene,
  type VisualSceneResponse,
} from "../shared/visualScene";
import type {
  CompanionInputMode,
  CompanionMood,
  CompanionTurnResponse,
} from "../shared/companion";
import { deriveSolExpression } from "../shared/solEmotion";
import StudioMode from "./components/studio/StudioMode";
import MusicExperience from "./components/studio/MusicExperience";
import SolPresenceControls from "./components/studio/SolPresenceControls";
import SolEmotionDebugPanel from "./components/studio/SolEmotionDebugPanel";
import MemoryConstellation from "./components/studio/MemoryConstellation";
import WorldArchive from "./components/studio/WorldArchive";
import { usePrivateBeta } from "./components/PrivateBetaGate";
import { useWorldArchive } from "./hooks/useWorldArchive";
import { useCompanion } from "./hooks/useCompanion";
import { useMusicPlayer } from "./hooks/useMusicPlayer";
import { useSolEmotion } from "./hooks/useSolEmotion";
import { useSolMemory } from "./hooks/useSolMemory";
import { useSolPresence } from "./hooks/useSolPresence";
import { useSolWeather } from "./hooks/useSolWeather";
import { useRealtimeVoice } from "./hooks/useRealtimeVoice";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useWorldHistory } from "./hooks/useWorldHistory";
import type { EngineSource, WorldArchiveEntry } from "./lib/world";
import { shouldAllowProactiveMessage } from "./lib/solPresenceController";

const ParticleCanvas = lazy(() => import("./components/ParticleCanvas"));

type ExperienceStatus =
  | "idle"
  | "typing"
  | "generating"
  | "transforming"
  | "complete"
  | "fallback";

type ExperienceMode = "hero" | "entering" | "studio";

const examples = [
  "一场由记忆构成的风暴",
  "一座在海底做梦的城市",
  "安静智慧的形状",
];

const menuLinks = [
  { label: "创意工作室", href: "#studios" },
  { label: "实验室", href: "#labs" },
  { label: "创作过程", href: "#process" },
  { label: "联系我们", href: "#connect" },
];

const formLabels: Record<ParticleForm, string> = {
  wave: "波浪",
  sphere: "球体",
  torus: "圆环",
  spiral: "螺旋",
  constellation: "星云",
  heart: "爱心",
  helix: "双螺旋",
  bloom: "花朵",
};

const moodLabels: Record<CompanionMood, string> = {
  serene: "平静",
  curious: "好奇",
  joyful: "愉悦",
  tender: "温柔",
  melancholy: "低落",
  tense: "紧张",
  playful: "顽皮",
  awe: "敬畏",
};

const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

function Brand() {
  return (
    <a
      href="#"
      className="text-xl font-medium tracking-tight text-white transition-opacity hover:opacity-70"
      aria-label="Nexformo 首页"
    >
      Nexform<span className="ml-0.5 align-super text-[10px]">o</span>
    </a>
  );
}

function App() {
  const privateBeta = usePrivateBeta();
  const worldHistory = useWorldHistory();
  const worldArchive = useWorldArchive();
  const companion = useCompanion();
  const music = useMusicPlayer();
  const emotion = useSolEmotion();
  const solMemory = useSolMemory();
  const reducedMotion = useReducedMotion();
  const [voiceMotionActivity, setVoiceMotionActivity] = useState<import("../shared/companion").VoiceActivity>("disabled");
  const presence = useSolPresence({
    companion: companion.state,
    musicStatus: music.playback.status,
    musicTrackId: music.playback.currentTrack?.videoId ?? null,
    musicTime: music.playback.currentTime,
    musicIntensity: music.rhythmIntensity,
    emotion: emotion.state,
    voiceActivity: voiceMotionActivity,
    activeLyricIndex: music.activeLyricIndex,
    lyricKind: music.lyrics?.kind ?? null,
    memoryResonance: solMemory.resonance,
    reducedMotion,
  });
  const [mode, setMode] = useState<ExperienceMode>(() =>
    worldHistory.session ? "studio" : "hero",
  );
  const [heroScene, setHeroScene] = useState<VisualScene>(DEFAULT_SCENE);
  const [input, setInput] = useState("");
  const [pendingPrompt, setPendingPrompt] = useState("");
  const [status, setStatus] = useState<ExperienceStatus>("idle");
  const [engineSource, setEngineSource] = useState<EngineSource>(
    worldHistory.current?.source ?? "local",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [memoryFocusId, setMemoryFocusId] = useState<string | null>(null);
  const [evolutionBusy, setEvolutionBusy] = useState(false);
  const [dnaCollapsed, setDnaCollapsed] = useState(false);
  const [conversationCollapsed, setConversationCollapsed] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [toast, setToast] = useState("");
  const [stageReplyVisible, setStageReplyVisible] = useState(false);
  const completionTimer = useRef<number | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const cursorTimer = useRef<number | null>(null);
  const toastTimer = useRef<number | null>(null);
  const lastConversationAt = useRef(Date.now());
  const proactiveCount = useRef(0);
  const proactiveBusy = useRef(false);
  const stageReplyTimer = useRef<number | null>(null);
  const lastStageReplyId = useRef("");
  const weather = useSolWeather({
    companion: companion.state,
    emotion: emotion.state,
    doNotDisturb: presence.preferences.doNotDisturb,
    overlayOpen: menuOpen || archiveOpen || memoryOpen,
    busy: evolutionBusy || companion.busy,
    studioActive: mode === "studio",
    onManualChange: emotion.noteManualWeather,
  });

  const session = worldHistory.session;
  const current = worldHistory.current;
  const activeScene = current?.scene ?? heroScene;
  const heroBusy = status === "generating" || status === "transforming";
  const worldReady = Boolean(pendingPrompt) && (status === "complete" || status === "fallback");

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2400);
  }, []);

  useEffect(() => {
    const latest = [...companion.messages]
      .reverse()
      .find((message) => message.role === "assistant");
    if (!latest || latest.id === lastStageReplyId.current) return;
    lastStageReplyId.current = latest.id;
    setStageReplyVisible(true);
    if (stageReplyTimer.current !== null) window.clearTimeout(stageReplyTimer.current);
    stageReplyTimer.current = window.setTimeout(() => {
      setStageReplyVisible(false);
      stageReplyTimer.current = null;
    }, 11_000);
    return () => {
      if (stageReplyTimer.current !== null) window.clearTimeout(stageReplyTimer.current);
    };
  }, [companion.messages]);

  const handleCompanionTurn = useCallback(
    async (
      rawInstruction: string,
      inputMode: CompanionInputMode = "text",
    ): Promise<CompanionTurnResponse | null> => {
      const instruction = rawInstruction.trim();
      const activeSnapshot = worldHistory.current;
      if (!instruction || !activeSnapshot || evolutionBusy || companion.busy) return null;
      lastConversationAt.current = Date.now();
      proactiveCount.current = 0;
      setEvolutionBusy(true);
      try {
        const result = await companion.sendTurn(
          instruction,
          activeSnapshot.scene,
          inputMode,
          solMemory.contextFor(instruction),
        );
        if (!result) return null;
        if (result.memoryCandidate) solMemory.offerCandidate(result.memoryCandidate);
        presence.applyMotionSuggestion(result.motionCue);
        emotion.noteSolReply();
        const title =
          result.intent === "singing"
            ? "星声短歌"
            : result.intent === "explicit_shape"
            ? `${formLabels[result.scene.form]}形态`
            : `${moodLabels[result.nextCompanionState.primaryMood]}回应`;
        worldHistory.pushEvolution(
          instruction,
          {
            title,
            scene: result.scene,
            explanation: result.explanation,
            suggestions: result.suggestions,
          },
          result.source,
        );
        setEngineSource(result.source);
        return result;
      } finally {
        setEvolutionBusy(false);
      }
    },
    [companion.busy, companion.sendTurn, emotion.noteSolReply, evolutionBusy, presence.applyMotionSuggestion, solMemory.contextFor, solMemory.offerCandidate, worldHistory.current, worldHistory.pushEvolution],
  );

  const handleUserTurn = useCallback(
    async (
      rawInstruction: string,
      inputMode: CompanionInputMode = "text",
    ): Promise<CompanionTurnResponse | null> => {
      const instruction = rawInstruction.trim();
      if (!instruction) return null;
      const activeSnapshot = worldHistory.current;
      if (!activeSnapshot) return null;
      const memoryResult = solMemory.executeText(instruction);
      if (memoryResult.handled) {
        let memoryMessage = memoryResult.message;
        if (memoryResult.action === "open") {
          setMemoryFocusId(null);
          setMemoryOpen(true);
        } else if (memoryResult.action === "close") {
          setMemoryOpen(false);
        } else if (memoryResult.action === "forget_request") {
          setMemoryFocusId(memoryResult.targetIds[0] ?? null);
          setMemoryOpen(true);
        } else if (memoryResult.action === "clear_request") {
          setMemoryOpen(true);
          if (solMemory.memories.length && window.confirm("永久清空整个记忆星图吗？情感记忆和当前世界不会被删除。")) {
            solMemory.clearMemories();
            emotion.dispatch({ type: "MEMORY_REMOVED", now: Date.now() });
            memoryMessage = "记忆星图已经清空。Sol 的情绪和当前世界仍然保留。";
            showToast("记忆星图已清空；Sol 的情绪和当前世界保持不变");
          } else if (!solMemory.memories.length) {
            memoryMessage = "记忆星图现在是空的，没有需要清除的星星。";
          }
        } else if (memoryResult.action === "saved") {
          emotion.dispatch({ type: "MEMORY_CONFIRMED", now: Date.now() });
          showToast("新的星星已加入记忆星图 · 8 秒内可撤销");
        } else if (memoryResult.action === "recalled" || memoryResult.action === "duplicate") {
          emotion.dispatch({ type: "MEMORY_RECALLED", now: Date.now() });
        }
        lastConversationAt.current = Date.now();
        proactiveCount.current = 0;
        companion.appendLocalExchange(instruction, memoryMessage, inputMode);
        const companionState = companion.state;
        return {
          displayReply: memoryMessage,
          spokenReply: "",
          songLyrics: "",
          intent: "conversation",
          emotion: {
            primaryMood: companionState.primaryMood,
            valence: companionState.valence,
            arousal: companionState.arousal,
            energy: companionState.energy,
            curiosity: companionState.curiosity,
          },
          scene: activeSnapshot.scene,
          explanation: "长期记忆由本地确定性系统处理，当前世界形态保持不变。",
          suggestions: activeSnapshot.suggestions,
          memoryCandidate: null,
          motionCue: null,
          nextCompanionState: companionState,
          webUsed: false,
          sources: [],
          source: "local",
          notice: "Sol 本地记忆系统",
        };
      }
      emotion.noteUserMessage(instruction);
      const weatherResult = weather.executeText(instruction);
      if (typeof weatherResult.focusMode === "boolean") setFocusMode(weatherResult.focusMode);
      const presenceResult = weatherResult.handled
        ? { handled: false, message: "" }
        : presence.executeText(instruction);
      const musicResult = weatherResult.handled || presenceResult.handled
        ? null
        : await music.executeText(instruction);
      if (!weatherResult.handled && !presenceResult.handled && !musicResult?.handled) {
        presence.noteUserTurn(instruction);
        return handleCompanionTurn(instruction, inputMode);
      }
      if (musicResult?.handled) presence.noteMusicRequest(instruction);

      const message = weatherResult.handled
        ? weatherResult.message
        : presenceResult.handled
          ? presenceResult.message
          : musicResult?.message ?? "";
      lastConversationAt.current = Date.now();
      proactiveCount.current = 0;
      companion.appendLocalExchange(instruction, message, inputMode);
      const companionState = companion.state;
      return {
        displayReply: message,
        spokenReply: "",
        songLyrics: "",
        intent: "conversation",
        emotion: {
          primaryMood: companionState.primaryMood,
          valence: companionState.valence,
          arousal: companionState.arousal,
          energy: companionState.energy,
          curiosity: companionState.curiosity,
        },
        scene: activeSnapshot.scene,
        explanation: weatherResult.handled
          ? "天气层已独立更新，当前 Sol 粒子形态与世界演化保持不变。"
          : presenceResult.handled
            ? "Sol 的瞬时陪伴状态已更新，当前世界形态保持不变。"
            : "音乐控制保持当前世界形态不变。",
        suggestions: activeSnapshot.suggestions,
        memoryCandidate: null,
        motionCue: null,
        nextCompanionState: companionState,
        webUsed: false,
        sources: [],
        source: "local",
        notice: weatherResult.handled
          ? "Sol 情绪天气控制"
          : presenceResult.handled
            ? "Sol 自主陪伴控制"
            : "Sol 音乐控制",
      };
    },
    [
      companion.appendLocalExchange,
      companion.state,
      emotion.noteUserMessage,
      emotion.dispatch,
      handleCompanionTurn,
      music.executeText,
      presence.executeText,
      presence.noteUserTurn,
      presence.noteMusicRequest,
      showToast,
      solMemory.clearMemories,
      solMemory.executeText,
      solMemory.memories.length,
      weather.executeText,
      worldHistory.current,
    ],
  );

  const voice = useRealtimeVoice({
    onVoiceTurn: (message) => handleUserTurn(message, "voice"),
  });

  useEffect(() => setVoiceMotionActivity(voice.activity), [voice.activity]);

  const previousMusicStatus = useRef(music.playback.status);
  const previousVoiceActivity = useRef(voice.activity);
  const previousWeatherMode = useRef(weather.state.mode);
  const voiceEmotionActive = ["connecting", "listening", "thinking", "speaking", "singing"].includes(voice.activity);
  const emotionExpression = useMemo(() => deriveSolExpression(emotion.state, {
    musicPlaying: music.playback.status === "playing",
    voiceActive: voiceEmotionActive,
    raining: weather.state.mode !== "clear",
    reducedMotion,
  }), [emotion.state, music.playback.status, reducedMotion, voiceEmotionActive, weather.state.mode]);

  useEffect(() => {
    const previous = previousMusicStatus.current;
    const current = music.playback.status;
    if (current === previous) return;
    previousMusicStatus.current = current;
    emotion.dispatch({
      type: current === "playing" ? "MUSIC_STARTED" : current === "paused" ? "MUSIC_PAUSED" : "MUSIC_STOPPED",
      now: Date.now(),
    });
  }, [emotion.dispatch, music.playback.status]);

  useEffect(() => {
    const previous = previousVoiceActivity.current;
    if (previous === voice.activity) return;
    previousVoiceActivity.current = voice.activity;
    const previousActive = ["connecting", "listening", "thinking", "speaking", "singing"].includes(previous);
    if (previousActive === voiceEmotionActive) return;
    emotion.dispatch({ type: voiceEmotionActive ? "VOICE_STARTED" : "VOICE_ENDED", now: Date.now() });
  }, [emotion.dispatch, voice.activity, voiceEmotionActive]);

  useEffect(() => {
    if (previousWeatherMode.current === weather.state.mode) return;
    previousWeatherMode.current = weather.state.mode;
    emotion.dispatch({ type: "WEATHER_CHANGED", now: Date.now() });
  }, [emotion.dispatch, weather.state.mode]);

  useEffect(() => {
    if (mode !== "studio") return;
    lastConversationAt.current = Date.now();
    proactiveCount.current = 0;
  }, [mode]);

  useEffect(() => {
    if (mode !== "studio" || !emotion.welcomeAvailable) return;
    if (!emotion.consumeWelcome()) return;
    companion.appendLocalAssistantMessage("你回来啦。这里还保留着我们上次留下的光。");
  }, [companion.appendLocalAssistantMessage, emotion.consumeWelcome, emotion.welcomeAvailable, mode]);

  useEffect(() => {
    if (music.playback.status !== "playing") return;
    voice.stopSpeaking();
    if (voice.enabled) voice.stop();
  }, [music.playback.status, voice.enabled, voice.stop, voice.stopSpeaking]);

  useEffect(() => {
    if ((menuOpen || archiveOpen) && music.playback.status === "playing") music.pause();
  }, [archiveOpen, menuOpen, music.pause, music.playback.status]);

  useEffect(() => {
    if (mode !== "studio") return;
    const timer = window.setInterval(() => {
      const activeSnapshot = worldHistory.current;
      const waitTime = proactiveCount.current === 0 ? 480_000 : 720_000;
      const voiceOccupied = ["connecting", "listening", "thinking", "speaking", "singing"].includes(
        voice.activity,
      );
      const conversationInput = document.getElementById("companion-instruction") as HTMLTextAreaElement | null;
      const userTyping = Boolean(conversationInput?.value.trim());
      if (
        !activeSnapshot ||
        document.visibilityState !== "visible" ||
        companion.busy ||
        proactiveBusy.current ||
        proactiveCount.current >= 2 ||
        voiceOccupied ||
        userTyping ||
        !shouldAllowProactiveMessage({
          now: Date.now(),
          lastConversationAt: lastConversationAt.current,
          cooldownMs: waitTime,
          doNotDisturb: presence.preferences.doNotDisturb,
          musicStatus: music.playback.status,
          overlayOpen: menuOpen || archiveOpen || memoryOpen,
          busy: evolutionBusy,
        })
      ) {
        return;
      }

      proactiveBusy.current = true;
      lastConversationAt.current = Date.now();
      void (async () => {
        try {
          const result = await companion.sendProactiveTurn(activeSnapshot.scene);
          if (!result) return;
          proactiveCount.current += 1;
          if (voice.enabled && !voice.muted) await voice.speak(result.spokenReply);
        } finally {
          proactiveBusy.current = false;
        }
      })();
    }, 5_000);
    return () => window.clearInterval(timer);
  }, [
    archiveOpen,
    companion.busy,
    companion.sendProactiveTurn,
    evolutionBusy,
    menuOpen,
    memoryOpen,
    mode,
    voice.activity,
    voice.enabled,
    voice.muted,
    voice.speak,
    music.playback.status,
    presence.preferences.doNotDisturb,
    worldHistory.current,
  ]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (menuOpen || archiveOpen || memoryOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [archiveOpen, memoryOpen, menuOpen]);

  useEffect(() => {
    if (!focusMode) {
      setCursorVisible(true);
      if (cursorTimer.current) window.clearTimeout(cursorTimer.current);
      return;
    }

    const revealCursor = () => {
      setCursorVisible(true);
      if (cursorTimer.current) window.clearTimeout(cursorTimer.current);
      cursorTimer.current = window.setTimeout(() => setCursorVisible(false), 2100);
    };
    revealCursor();
    window.addEventListener("mousemove", revealCursor);
    return () => {
      window.removeEventListener("mousemove", revealCursor);
      if (cursorTimer.current) window.clearTimeout(cursorTimer.current);
    };
  }, [focusMode]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

      if (event.key === "Escape") {
        if (memoryOpen) setMemoryOpen(false);
        else if (archiveOpen) setArchiveOpen(false);
        else if (menuOpen) setMenuOpen(false);
        else if (focusMode) setFocusMode(false);
        return;
      }

      if (typing || mode !== "studio") return;

      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        setFocusMode((value) => !value);
      } else if (event.key.toLowerCase() === "d") {
        event.preventDefault();
        setDnaCollapsed((value) => !value);
      } else if (event.key.toLowerCase() === "c") {
        event.preventDefault();
        setConversationCollapsed((value) => !value);
      } else if (event.key.toLowerCase() === "h") {
        event.preventDefault();
        setTimelineVisible((value) => !value);
      } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) worldHistory.redo();
        else worldHistory.undo();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [archiveOpen, focusMode, memoryOpen, menuOpen, mode, worldHistory.redo, worldHistory.undo]);

  useEffect(
    () => () => {
      if (completionTimer.current) window.clearTimeout(completionTimer.current);
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
      if (cursorTimer.current) window.clearTimeout(cursorTimer.current);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    },
    [],
  );

  const generateScene = async (rawPrompt: string) => {
    const prompt = rawPrompt.trim();
    if (!prompt || heroBusy) return;

    if (completionTimer.current) window.clearTimeout(completionTimer.current);
    setInput(prompt);
    setPendingPrompt("");
    setStatus("generating");

    let result: VisualSceneResponse;
    try {
      const [response] = await Promise.all([
        fetch("/api/visual-scene", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }),
        delay(720),
      ]);

      if (!response.ok) throw new Error("场景请求未被接受。");
      result = (await response.json()) as VisualSceneResponse;
      const fallback = createFallbackScene(prompt);
      result = {
        ...result,
        source:
          result.source === "openai"
            ? "openai"
            : result.source === "deepseek"
              ? "deepseek"
              : "local",
        scene: sanitizeVisualScene(result.scene, fallback),
      };
    } catch {
      result = {
        scene: createFallbackScene(prompt),
        source: "local",
        notice: "本地创意引擎已启用",
      };
    }

    setHeroScene(result.scene);
    setEngineSource(result.source);
    setStatus("transforming");
    completionTimer.current = window.setTimeout(() => {
      setPendingPrompt(prompt);
      setStatus(result.source === "local" ? "fallback" : "complete");
    }, 2250);
  };

  const enterWorld = () => {
    if (!pendingPrompt || !worldReady) return;
    worldHistory.startWorld(pendingPrompt, heroScene, engineSource);
    setMode("entering");
    transitionTimer.current = window.setTimeout(() => setMode("studio"), 1950);
  };

  const evolveWorld = async (rawInstruction: string) => {
    const result = await handleUserTurn(rawInstruction, "text");
    if (result?.intent === "singing" && result.songLyrics.trim()) {
      await voice.sing(result.songLyrics);
    }
  };

  const handleHeroSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void generateScene(input);
  };

  const handleHeroKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void generateScene(input);
    }
  };

  const saveCurrentWorld = () => {
    if (!session) return;
    const entry = worldArchive.saveSession(session);
    showToast(`“${entry.title}”已保存到档案`);
  };

  const openArchivedWorld = (entry: WorldArchiveEntry) => {
    worldHistory.loadSession(entry.session);
    setEngineSource(entry.session.states[entry.session.index]?.source ?? "local");
    setArchiveOpen(false);
    setFocusMode(false);
    setConversationCollapsed(false);
    setMode("studio");
    showToast(`“${entry.title}”已恢复`);
  };

  const startNewWorld = () => {
    if (!window.confirm("离开当前世界，返回新的空白画布吗？")) return;
    voice.stop();
    music.stop();
    weather.reset();
    worldHistory.clearSession();
    setHeroScene(DEFAULT_SCENE);
    setInput("");
    setPendingPrompt("");
    setStatus("idle");
    setFocusMode(false);
    setArchiveOpen(false);
    setMemoryOpen(false);
    setMode("hero");
  };

  const resetCompanionMemory = () => {
    if (!window.confirm("重置朋友的情绪状态和最近对话吗？")) return;
    companion.resetMemory();
    showToast("朋友记忆已重置");
  };

  const resetEmotionMemory = () => {
    if (!window.confirm("永久重置 Sol 的长期情绪连接吗？最近对话和当前世界不会被删除。")) return;
    emotion.reset();
    showToast("Sol 的情感记忆已重置");
  };

  const clearEvolutionHistory = () => {
    if (session && session.states.length > 1 && window.confirm("只保留当前世界状态吗？")) {
      worldHistory.clearEvolution();
      showToast("演化历史已清除");
    }
  };

  const statusLabel =
    status === "generating"
      ? "正在理解你的语言"
      : status === "transforming"
        ? "正在生成新的形态"
        : engineSource === "openai"
          ? "OpenAI / 在线解析"
          : engineSource === "deepseek"
            ? "DeepSeek / 在线解析"
            : "本地创意引擎";

  return (
    <section
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-black font-geist text-white"
      data-engine-mode={engineSource}
      data-experience-status={mode === "studio" ? "studio" : status}
      data-weather-mode={weather.state.mode}
      data-weather-transition={weather.state.transition}
      data-sol-gesture={presence.state.motionPlan.primary.gesture}
      data-sol-motion-source={presence.state.motionPlan.primary.source}
      data-sol-music-ritual={presence.state.musicRitual.ritual}
      data-pocket-starlight={presence.pocketVisual.phase}
      data-reduced-motion={reducedMotion ? "true" : "false"}
    >
      <Suspense fallback={<div className="absolute inset-0 bg-black" aria-hidden="true" />}>
        <ParticleCanvas
          scene={activeScene}
          generating={status === "generating" || evolutionBusy}
          experienceMode={focusMode ? "focus" : mode}
          voiceActivity={voice.activity}
          audioLevel={voice.audioLevel}
          musicTrackId={music.playback.currentTrack?.videoId ?? null}
          musicStatus={music.playback.status}
          musicTime={music.playback.currentTime}
          musicIntensity={music.rhythmIntensity}
          solPresence={presence.state}
          solEmotion={emotion.state}
          solAutonomy={presence.preferences.autonomy}
          weather={weather.state}
          memoryResonance={solMemory.resonance}
          onSolInteraction={(interaction) => {
            presence.noteInteraction(interaction);
            emotion.noteInteraction(interaction === "doubleClick" ? 0.8 : 0.35);
          }}
        />
      </Suspense>

      {mode !== "studio" && (
        <div
          className={`pointer-events-none absolute inset-0 z-10 flex h-full min-w-[1100px] flex-col px-16 transition-all duration-[1500ms] ${
            mode === "entering" ? "scale-[1.025] opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <nav className="pointer-events-auto flex items-center justify-between pt-7" aria-label="主导航">
            <Brand />
            <div className="flex items-center gap-12">
              <a href="#studios" className="text-sm font-light tracking-wide text-white transition-opacity hover:opacity-70">
                创意工作室—
              </a>
              <a href="#labs" className="text-sm font-light tracking-wide text-white transition-opacity hover:opacity-70">
                实验室
              </a>
              <button type="button" onClick={privateBeta.openDisclosure} className="text-sm font-light tracking-wide text-white/55 transition-opacity hover:text-white">
                私测说明
              </button>
              {privateBeta.enabled && (
                <button type="button" onClick={() => void privateBeta.logout()} className="text-sm font-light tracking-wide text-white/35 transition-opacity hover:text-white/70">
                  退出测试
                </button>
              )}
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/60"
              onClick={() => setMenuOpen(true)}
              aria-label="打开菜单"
              aria-expanded={menuOpen}
            >
              <Menu size={15} strokeWidth={1.5} />
            </button>
          </nav>

          <main className="flex min-h-0 flex-1 items-center pb-4 pt-4">
            <div className="living-copy pointer-events-auto max-w-2xl">
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-white/55">
                Nexformo / 生命画布
              </p>
              <h1 className="max-w-2xl text-[4.25rem] font-light leading-[1.05] tracking-[-0.035em] text-white">
                描述一个世界。
                <br />
                看它生成形态。
              </h1>
              <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-white/55">
                一场关于语言、运动与生成系统的互动实验。
              </p>
              <div className="mt-7 min-h-10 max-w-lg border-l border-white/20 pl-4">
                <p
                  className={`text-sm font-light leading-relaxed text-white/75 transition-all duration-700 ${
                    status === "generating" ? "translate-y-1 opacity-45" : "translate-y-0 opacity-100"
                  }`}
                  aria-live="polite"
                >
                  {heroScene.message}
                </p>
              </div>

              {worldReady && (
                <button
                  type="button"
                  onClick={enterWorld}
                  className="group mt-8 flex animate-[studio-reveal_700ms_ease-out_both] items-center gap-4 text-[9px] font-medium uppercase tracking-[0.22em] text-white"
                  aria-label="进入这个世界"
                >
                  进入这个世界
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 transition-all group-hover:border-white group-hover:bg-white group-hover:text-black">
                    <ArrowRight size={13} strokeWidth={1.4} />
                  </span>
                </button>
              )}
            </div>
          </main>

          <div className="pointer-events-auto mx-auto w-full max-w-3xl pb-4">
            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-white/30">试试看</span>
              {examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => void generateScene(example)}
                  disabled={heroBusy}
                  className="text-[10px] font-light text-white/45 transition-colors hover:text-white/80 disabled:cursor-wait disabled:opacity-30"
                >
                  {example}
                </button>
              ))}
            </div>

            <form
              onSubmit={handleHeroSubmit}
              className="flex items-end gap-3 border-b border-white/25 pb-2 transition-colors focus-within:border-white/70"
              aria-busy={heroBusy}
            >
              <label htmlFor="world-prompt" className="sr-only">
                描述一个世界、一种情绪或不可能的想法
              </label>
              <textarea
                id="world-prompt"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value.slice(0, 500));
                  setPendingPrompt("");
                  if (!heroBusy) setStatus(event.target.value ? "typing" : "idle");
                }}
                onKeyDown={handleHeroKeyDown}
                disabled={heroBusy}
                rows={1}
                maxLength={500}
                placeholder="描述一种情绪、一个地方或不可能的想法……"
                className="living-textarea min-h-7 flex-1 resize-none bg-transparent py-1 text-base font-light leading-5 text-white outline-none placeholder:text-white/35 disabled:cursor-wait"
              />
              <button
                type="submit"
                disabled={heroBusy || !input.trim()}
                className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:border-white/70 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="生成视觉世界"
              >
                <ArrowUp size={14} strokeWidth={1.5} />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
              <p aria-live="polite">{statusLabel}</p>
              <p>{heroBusy ? "请稍候" : "按 Enter 生成 / Shift + Enter 换行"}</p>
            </div>
          </div>

          <footer className="pb-6">
            <div className="mb-3 flex items-center justify-between">
              {["2", "H", "W"].map((marker) => (
                <span key={marker} className="text-[10px] font-light text-white/35">{marker}</span>
              ))}
            </div>
            <div className="flex items-end justify-between border-t border-white/10 pt-3">
              <p className="max-w-sm text-[10px] font-light leading-relaxed text-white/30">
                用语言、运动与算法打磨，
                <br />塑造会回应你的世界。
              </p>
              <p className="text-right text-[10px] font-light uppercase leading-relaxed tracking-wider text-white/35">
                hello@nexform.studio
                <br />+1 (424) 800-7700
              </p>
            </div>
          </footer>
        </div>
      )}

      {session && current && mode !== "hero" && (
        <StudioMode
          session={session}
          current={current}
          entering={mode === "entering"}
          busy={evolutionBusy || companion.busy}
          emotionalState={emotion.state}
          companionMessages={companion.messages}
          companionError={companion.error}
          voiceActivity={voice.activity}
          voiceEnabled={voice.enabled}
          voiceMuted={voice.muted}
          voiceError={voice.error}
          voiceLabel={voice.voiceLabel}
          engineSource={engineSource}
          focusMode={focusMode}
          cursorVisible={cursorVisible}
          dnaCollapsed={dnaCollapsed}
          conversationCollapsed={conversationCollapsed}
          timelineVisible={timelineVisible}
          centerCaptionHidden={Boolean(music.playback.currentTrack && music.lyricsVisible)}
          canUndo={worldHistory.canUndo}
          canRedo={worldHistory.canRedo}
          weather={weather}
          onDnaCollapsedChange={setDnaCollapsed}
          onConversationCollapsedChange={setConversationCollapsed}
          onTimelineVisibleChange={setTimelineVisible}
          onSceneChange={(scene) => {
            if (scene.form !== current.scene.form) emotion.noteManualShape();
            worldHistory.updateCurrentScene(scene);
          }}
          onResetScene={worldHistory.resetCurrentScene}
          onEvolve={evolveWorld}
          onResetCompanionMemory={resetCompanionMemory}
          onStartVoice={() => {
            if (music.playback.status === "playing") music.pause();
            void voice.start();
          }}
          onStopVoice={voice.stop}
          onToggleVoiceMuted={voice.toggleMuted}
          onStopSpeaking={voice.stopSpeaking}
          onSelectState={worldHistory.selectState}
          onUndo={worldHistory.undo}
          onRedo={worldHistory.redo}
          onDuplicateState={worldHistory.duplicateCurrent}
          onClearHistory={clearEvolutionHistory}
          onOpenArchive={() => {
            setMemoryOpen(false);
            setArchiveOpen(true);
          }}
          onOpenMemory={() => {
            setArchiveOpen(false);
            setMemoryFocusId(null);
            setMemoryOpen(true);
          }}
          onSaveWorld={saveCurrentWorld}
          onFocusModeChange={setFocusMode}
          onNewWorld={startNewWorld}
        />
      )}

      {mode === "studio" && (
        <>
          <MusicExperience
            music={music}
            companionMessages={companion.messages}
            voiceActivity={voice.activity}
            stageReplyVisible={stageReplyVisible || voice.activity === "speaking"}
            timelineVisible={timelineVisible}
            focusMode={focusMode}
            motionStageLine={presence.stageLine}
          />
          {!focusMode && <SolPresenceControls presence={presence} onResetEmotionMemory={resetEmotionMemory} />}
          <SolEmotionDebugPanel emotion={emotion} modifiers={emotionExpression.modifiers} />
          <MemoryConstellation
            open={memoryOpen}
            focusMemoryId={memoryFocusId}
            memory={solMemory}
            onClose={() => setMemoryOpen(false)}
            onToast={showToast}
            onEvent={(kind) => {
              emotion.dispatch({
                type:
                  kind === "confirmed"
                    ? "MEMORY_CONFIRMED"
                    : kind === "recalled"
                      ? "MEMORY_RECALLED"
                      : kind === "corrected"
                        ? "MEMORY_CORRECTED"
                        : "MEMORY_REMOVED",
                now: Date.now(),
              });
            }}
          />
        </>
      )}

      {session && (
        <WorldArchive
          open={archiveOpen}
          entries={worldArchive.entries}
          currentSession={session}
          onClose={() => setArchiveOpen(false)}
          onSave={(value) => {
            const entry = worldArchive.saveSession(value);
            showToast(`“${entry.title}”已保存到档案`);
            return entry;
          }}
          onOpenEntry={openArchivedWorld}
          onRename={worldArchive.renameEntry}
          onDuplicate={worldArchive.duplicateEntry}
          onDelete={worldArchive.deleteEntry}
          onExport={worldArchive.exportEntry}
          onImport={worldArchive.importEntry}
        />
      )}

      <div
        className={`pointer-events-none fixed left-1/2 top-7 z-[70] -translate-x-1/2 border border-white/15 bg-black/70 px-4 py-2 text-[9px] uppercase tracking-[0.15em] text-white/60 backdrop-blur-md transition-all ${
          toast ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
        aria-live="polite"
      >
        {toast}
      </div>

      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          menuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
        inert={menuOpen ? undefined : true}
      >
        <button
          type="button"
          className="absolute inset-0 h-full w-full cursor-default bg-black/90 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
          aria-label="关闭菜单"
          tabIndex={-1}
        />
        <div className="pointer-events-none relative z-10 flex h-full flex-col px-8 pt-8">
          <div className="pointer-events-auto flex items-center justify-between">
            <Brand />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30"
              onClick={() => setMenuOpen(false)}
              aria-label="关闭菜单"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center" aria-label="菜单导航">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="pointer-events-auto py-3 text-5xl font-light tracking-tight text-white hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export default App;
