import { useEffect, useState } from "react";
import type { SolExpressionModifiers, SolMood, SolBodyMotif } from "../../../shared/solEmotion";
import type { UseSolEmotionResult } from "../../hooks/useSolEmotion";

const moodLabels: Record<SolMood, string> = {
  calm: "平静",
  joyful: "愉悦",
  shy: "害羞",
  curious: "好奇",
  tender: "温柔",
  concerned: "关切",
  lonely: "孤寂",
  tired: "疲惫",
};

const motifLabels: Record<SolBodyMotif, string> = {
  quiet_hold: "安静停驻",
  warm_orbit: "温暖环绕",
  shy_fold: "害羞收拢",
  attentive_glow: "专注微光",
  joyful_bloom: "愉悦绽放",
  tender_breathe: "温柔呼吸",
  tired_drift: "疲惫漂游",
  protective_halo: "守护光环",
};

const eventLabels: Record<string, string> = {
  USER_COMPLIMENT: "收到夸奖",
  USER_SAD: "用户难过",
  USER_RETURNED: "用户回来",
  MUSIC_STARTED: "开始音乐",
  MUSIC_PAUSED: "暂停音乐",
  IDLE_ELAPSED: "空闲一小时",
};

type Props = {
  emotion: UseSolEmotionResult;
  modifiers: SolExpressionModifiers;
};

export default function SolEmotionDebugPanel({ emotion, modifiers }: Props) {
  const [open, setOpen] = useState(false);
  const developmentMode = (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV === true;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!developmentMode || !event.ctrlKey || !event.shiftKey || event.key.toLowerCase() !== "e") return;
      const target = event.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable) return;
      event.preventDefault();
      setOpen((current) => !current);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [developmentMode]);

  if (!developmentMode || !open) return null;

  const now = Date.now();
  const values = Object.entries(emotion.values) as Array<[keyof typeof emotion.values, number]>;
  const valueLabels: Record<keyof typeof emotion.values, string> = {
    valence: "情绪明亮度",
    energy: "能量",
    warmth: "温暖",
    trust: "信任",
    curiosity: "好奇",
    connection: "连接",
    confidence: "自信",
  };
  const modifierText = [
    modifiers.music && "音乐",
    modifiers.voice && "语音",
    modifiers.rain && "雨境",
    modifiers.reducedMotion && "减少动态",
  ].filter(Boolean).join(" · ") || "无";

  const simulate = (type: string) => {
    const at = Date.now();
    if (type === "USER_RETURNED") emotion.dispatch({ type, now: at, absenceMs: 24 * 3_600_000 });
    else if (type === "IDLE_ELAPSED") emotion.dispatch({ type, now: Math.max(at, emotion.state.lastInteractionAt + 3_600_001) });
    else if (type === "USER_COMPLIMENT") emotion.dispatch({ type, now: at, intensity: 0.75 });
    else if (type === "USER_SAD") emotion.dispatch({ type, now: at, intensity: 0.75 });
    else if (type === "MUSIC_STARTED") emotion.dispatch({ type, now: at });
    else if (type === "MUSIC_PAUSED") emotion.dispatch({ type, now: at });
  };

  return (
    <aside
      className="pointer-events-auto fixed bottom-24 left-5 z-[90] w-[300px] border border-rose-200/20 bg-black/88 p-4 shadow-2xl backdrop-blur-xl"
      data-sol-emotion-debug="visible"
      aria-label="Sol 情绪调试"
    >
      <div className="flex items-start justify-between border-b border-white/10 pb-3">
        <div>
          <p className="text-[8px] uppercase tracking-[0.2em] text-rose-100/45">开发工具 / Sol 情绪内核</p>
          <p className="mt-1 text-xs text-white/75">{moodLabels[emotion.state.primaryMood]} · {motifLabels[emotion.state.activeMotif]}</p>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="text-[9px] text-white/35 hover:text-white">关闭</button>
      </div>

      <div className="mt-3 space-y-2">
        {values.map(([key, value]) => (
          <div key={key} className="grid grid-cols-[68px_1fr_28px] items-center gap-2 text-[8px] text-white/38">
            <span>{valueLabels[key]}</span>
            <span className="h-px bg-white/10"><i className="block h-px bg-rose-100/65" style={{ width: `${Math.round(value * 100)}%` }} /></span>
            <span className="font-mono text-white/52">{value.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-1 border-t border-white/8 pt-3 text-[8px] leading-relaxed text-white/32">
        <p>次级情绪：{emotion.state.secondaryMood ? moodLabels[emotion.state.secondaryMood] : "无"}</p>
        <p>临时修饰：{modifierText}</p>
        <p>最近事件：{emotion.state.lastEvent}</p>
        <p>律动锁定：{Math.max(0, Math.ceil((emotion.state.motifLockUntil - now) / 1000))} 秒</p>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-white/8 pt-3">
        {Object.entries(eventLabels).map(([type, label]) => (
          <button key={type} type="button" onClick={() => simulate(type)} className="border border-white/10 px-1 py-2 text-[7px] text-white/42 hover:border-white/30 hover:text-white">{label}</button>
        ))}
        <button type="button" onClick={emotion.reset} className="col-span-3 border border-rose-200/15 px-2 py-2 text-[7px] text-rose-100/55 hover:border-rose-100/40">重置测试状态</button>
      </div>
    </aside>
  );
}
