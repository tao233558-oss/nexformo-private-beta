import { Heart, Lock, LockOpen, Moon, Sparkles, X } from "lucide-react";
import { useState } from "react";
import type { UseSolPresenceResult } from "../../hooks/useSolPresence";
import type {
  SolAutonomyLevel,
  SolCompanionMode,
  SolPresenceMotif,
} from "../../lib/solPresenceController";
import { SOL_GESTURE_LABELS } from "../../../shared/solMotion";

const motifLabels: Record<SolPresenceMotif, string> = {
  breathing: "呼吸",
  gentleSway: "轻摆",
  shyGather: "害羞聚拢",
  affectionateBloom: "温柔绽放",
  heartPulse: "心跳",
  playfulBounce: "俏皮跳跃",
  softOrbit: "柔和环绕",
  sparkleBurst: "星光闪烁",
  energeticDance: "活力舞步",
  calmFloat: "安静漂浮",
  listeningStillness: "专注聆听",
  comfortingEmbrace: "拥抱",
  sleepyDrift: "困倦漫游",
};

const autonomyLabels: Record<SolAutonomyLevel, string> = {
  off: "关",
  low: "轻",
  medium: "中",
  high: "强",
};

const modeLabels: Record<SolCompanionMode, string> = {
  quiet: "安静",
  tender: "温柔",
  playful: "活泼",
};

export default function SolPresenceControls({
  presence,
  onResetEmotionMemory,
}: {
  presence: UseSolPresenceResult;
  onResetEmotionMemory: () => void;
}) {
  const [open, setOpen] = useState(false);
  const currentGesture = SOL_GESTURE_LABELS[presence.state.motionPlan.primary.gesture];
  const nextGesture = SOL_GESTURE_LABELS[presence.state.motionPlan.ambientGesture];
  return (
    <div className="pointer-events-auto fixed left-1/2 top-[82px] z-[49] -translate-x-1/2" data-sol-motif={presence.state.currentMotif} data-sol-gesture={presence.state.motionPlan.primary.gesture} data-music-ritual={presence.state.musicRitual.ritual}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[8px] tracking-[0.12em] text-white/42 backdrop-blur-lg transition hover:border-white/25 hover:text-white/75"
        aria-expanded={open}
        aria-label="Sol 状态"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-200/75" />
        Sol · {currentGesture}
      </button>

      {open && (
        <section className="absolute left-full top-0 ml-3 w-[286px] border border-white/12 bg-black/88 p-3 shadow-2xl backdrop-blur-xl" aria-label="Sol 状态设置">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-[0.18em] text-white/28">Sol 状态</p>
              <p className="mt-1 text-[10px] font-light text-white/68">正在进行：{currentGesture}</p>
              <p className="mt-1 text-[8px] text-white/25">接下来：{nextGesture}</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="p-1 text-white/30 hover:text-white/70" aria-label="关闭 Sol 状态设置"><X size={11} /></button>
          </div>

          <div className="space-y-3 border-t border-white/8 pt-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[8px] text-white/28">自主律动</span>
              <div className="flex items-center gap-1">
                {(Object.keys(autonomyLabels) as SolAutonomyLevel[]).map((level) => (
                  <button key={level} type="button" onClick={() => presence.setAutonomy(level)} className={`h-6 min-w-7 px-1 text-[8px] ${presence.preferences.autonomy === level ? "bg-white text-black" : "text-white/30 hover:text-white/70"}`} aria-pressed={presence.preferences.autonomy === level}>{autonomyLabels[level]}</button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-[8px] text-white/28">陪伴模式</span>
              <div className="flex items-center gap-1">
                {(Object.keys(modeLabels) as SolCompanionMode[]).map((mode) => (
                  <button key={mode} type="button" onClick={() => presence.setCompanionMode(mode)} className={`h-6 px-2 text-[8px] ${presence.preferences.companionMode === mode ? "bg-white text-black" : "text-white/30 hover:text-white/70"}`} aria-pressed={presence.preferences.companionMode === mode}>{modeLabels[mode]}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-white/8 pt-3">
              <button type="button" onClick={presence.nextMotif} className="flex items-center justify-center gap-2 border border-white/10 py-2 text-[8px] text-white/45 transition hover:border-white/30 hover:text-white"><Sparkles size={10} /> 换个律动</button>
              <button type="button" onClick={() => presence.setMotifLocked(!presence.preferences.motifLocked)} className="flex items-center justify-center gap-2 border border-white/10 py-2 text-[8px] text-white/45 transition hover:border-white/30 hover:text-white">
                {presence.preferences.motifLocked ? <Lock size={10} /> : <LockOpen size={10} />}{presence.preferences.motifLocked ? "已锁定" : "锁定律动"}
              </button>
              <button type="button" onClick={() => presence.setDoNotDisturb(!presence.preferences.doNotDisturb)} className="col-span-2 flex items-center justify-center gap-2 border border-white/10 py-2 text-[8px] text-white/45 transition hover:border-white/30 hover:text-white">
                {presence.preferences.doNotDisturb ? <Moon size={10} /> : <Heart size={10} />}{presence.preferences.doNotDisturb ? "勿扰模式已开启" : "允许温柔主动聊天"}
              </button>
              <button type="button" onClick={() => presence.setComfortEasterEggEnabled(!presence.preferences.comfortEasterEggEnabled)} className="col-span-2 flex items-center justify-center gap-2 border border-white/10 py-2 text-[8px] text-white/45 transition hover:border-white/30 hover:text-white">
                <Sparkles size={10} />{presence.preferences.comfortEasterEggEnabled ? "口袋星光已开启" : "口袋星光已关闭"}
              </button>
              <button type="button" onClick={onResetEmotionMemory} className="col-span-2 flex items-center justify-center gap-2 border border-rose-100/10 py-2 text-[8px] text-rose-100/35 transition hover:border-rose-100/30 hover:text-rose-50">
                重置情感记忆
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
