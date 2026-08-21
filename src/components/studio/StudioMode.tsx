import { Archive, Bookmark, Focus, LogOut, Sparkles, X } from "lucide-react";
import type {
  CompanionMessage,
  VoiceActivity,
} from "../../../shared/companion";
import type { VisualScene } from "../../../shared/visualScene";
import type { SolEmotionalState } from "../../../shared/solEmotion";
import type { EngineSource, WorldSession, WorldSnapshot } from "../../lib/world";
import type { UseSolWeatherResult } from "../../hooks/useSolWeather";
import ConversationRail from "./ConversationRail";
import EvolutionTimeline from "./EvolutionTimeline";
import SceneDNAPanel from "./SceneDNAPanel";
import { usePrivateBeta } from "../PrivateBetaGate";

type StudioModeProps = {
  session: WorldSession;
  current: WorldSnapshot;
  entering: boolean;
  busy: boolean;
  emotionalState: SolEmotionalState;
  companionMessages: CompanionMessage[];
  companionError: string;
  voiceActivity: VoiceActivity;
  voiceEnabled: boolean;
  voiceMuted: boolean;
  voiceError: string;
  voiceLabel: string;
  engineSource: EngineSource;
  focusMode: boolean;
  cursorVisible: boolean;
  dnaCollapsed: boolean;
  conversationCollapsed: boolean;
  timelineVisible: boolean;
  centerCaptionHidden: boolean;
  canUndo: boolean;
  canRedo: boolean;
  weather: UseSolWeatherResult;
  onDnaCollapsedChange: (collapsed: boolean) => void;
  onConversationCollapsedChange: (collapsed: boolean) => void;
  onTimelineVisibleChange: (visible: boolean) => void;
  onSceneChange: (scene: VisualScene) => void;
  onResetScene: () => void;
  onEvolve: (instruction: string) => Promise<void>;
  onResetCompanionMemory: () => void;
  onStartVoice: () => void;
  onStopVoice: () => void;
  onToggleVoiceMuted: () => void;
  onStopSpeaking: () => void;
  onSelectState: (index: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onDuplicateState: () => void;
  onClearHistory: () => void;
  onOpenArchive: () => void;
  onOpenMemory: () => void;
  onSaveWorld: () => void;
  onFocusModeChange: (focus: boolean) => void;
  onNewWorld: () => void;
};

function StudioBrand() {
  return (
    <div className="text-lg font-medium tracking-tight text-white">
      Nexform<span className="ml-0.5 align-super text-[9px]">o</span>
    </div>
  );
}

export default function StudioMode({
  session,
  current,
  entering,
  busy,
  emotionalState,
  companionMessages,
  companionError,
  voiceActivity,
  voiceEnabled,
  voiceMuted,
  voiceError,
  voiceLabel,
  engineSource,
  focusMode,
  cursorVisible,
  dnaCollapsed,
  conversationCollapsed,
  timelineVisible,
  centerCaptionHidden,
  canUndo,
  canRedo,
  weather,
  onDnaCollapsedChange,
  onConversationCollapsedChange,
  onTimelineVisibleChange,
  onSceneChange,
  onResetScene,
  onEvolve,
  onResetCompanionMemory,
  onStartVoice,
  onStopVoice,
  onToggleVoiceMuted,
  onStopSpeaking,
  onSelectState,
  onUndo,
  onRedo,
  onDuplicateState,
  onClearHistory,
  onOpenArchive,
  onOpenMemory,
  onSaveWorld,
  onFocusModeChange,
  onNewWorld,
}: StudioModeProps) {
  const privateBeta = usePrivateBeta();
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-20 min-w-[1100px] ${
        focusMode && !cursorVisible ? "cursor-none" : ""
      }`}
      data-studio-mode="active"
    >
      {!focusMode && (
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            entering ? "scale-[0.985] opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <header className="pointer-events-auto absolute left-7 right-7 top-6 z-30 flex items-start justify-between border-b border-white/10 pb-4">
            <div className="flex w-[310px] items-center gap-7">
              <StudioBrand />
              <span className="h-4 w-px bg-white/15" />
              <div>
                <p className="studio-eyebrow">生命世界工作室</p>
                <p className="mt-1 text-[9px] text-white/30">
                  {engineSource === "openai"
                    ? "Sol 朋友智能"
                    : engineSource === "deepseek"
                      ? "DeepSeek 朋友智能"
                      : "本地朋友引擎"}
                </p>
              </div>
            </div>

            <div className="absolute left-1/2 top-0 -translate-x-1/2 text-center">
              <p className="studio-eyebrow">当前世界</p>
              <p className="mt-1 max-w-[360px] truncate text-xs font-light text-white/70">
                {current.title}
              </p>
            </div>

            <div className="flex items-center gap-5 text-[9px] uppercase tracking-[0.13em] text-white/40">
              <button type="button" onClick={privateBeta.openDisclosure} className="studio-header-link">
                私测说明
              </button>
              <button type="button" onClick={onSaveWorld} className="studio-header-link">
                <Bookmark size={12} /> 保存
              </button>
              <button type="button" onClick={onOpenArchive} className="studio-header-link">
                <Archive size={12} /> 档案
              </button>
              <button type="button" onClick={onOpenMemory} className="studio-header-link">
                <Sparkles size={12} /> 记忆
              </button>
              <button type="button" onClick={() => onFocusModeChange(true)} className="studio-header-link">
                <Focus size={12} /> 沉浸
              </button>
              <button type="button" onClick={onNewWorld} className="studio-header-link text-white/25 hover:text-white/70">
                <LogOut size={12} /> 新世界
              </button>
              {privateBeta.enabled && (
                <button type="button" onClick={() => void privateBeta.logout()} className="studio-header-link text-white/25 hover:text-white/70">
                  退出测试
                </button>
              )}
            </div>
          </header>

          <SceneDNAPanel
            current={current}
            weather={weather}
            collapsed={dnaCollapsed}
            onCollapsedChange={onDnaCollapsedChange}
            onSceneChange={onSceneChange}
            onReset={onResetScene}
          />

          <ConversationRail
            current={current}
            messages={companionMessages}
            emotionalState={emotionalState}
            busy={busy}
            error={companionError}
            voiceActivity={voiceActivity}
            voiceEnabled={voiceEnabled}
            voiceMuted={voiceMuted}
            voiceError={voiceError}
            voiceLabel={voiceLabel}
            onEvolve={onEvolve}
            onResetMemory={onResetCompanionMemory}
            onStartVoice={onStartVoice}
            onStopVoice={onStopVoice}
            onToggleVoiceMuted={onToggleVoiceMuted}
            onStopSpeaking={onStopSpeaking}
            collapsed={conversationCollapsed}
            onCollapsedChange={onConversationCollapsedChange}
          />

          {!centerCaptionHidden && (
            <div
              className={`absolute bottom-32 text-center transition-[left,right] duration-500 ${
                dnaCollapsed ? "left-[76px]" : "left-[330px]"
              } ${conversationCollapsed ? "right-[76px]" : "right-[370px]"}`}
            >
              <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-white/55 [text-shadow:0_2px_14px_#000]">
                {current.scene.message}
              </p>
              <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-white/20">
                {busy ? "世界正在演化" : current.explanation}
              </p>
            </div>
          )}

          <EvolutionTimeline
            session={session}
            visible={timelineVisible}
            onVisibleChange={onTimelineVisibleChange}
            onSelect={onSelectState}
            onUndo={onUndo}
            onRedo={onRedo}
            onDuplicate={onDuplicateState}
            onClear={onClearHistory}
            canUndo={canUndo}
            canRedo={canRedo}
          />
        </div>
      )}

      {focusMode && (
        <div className="pointer-events-none absolute inset-0 z-40">
          <button
            type="button"
            onClick={() => onFocusModeChange(false)}
            className={`studio-icon-button pointer-events-auto absolute right-7 top-7 transition-opacity duration-500 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
            aria-label="退出沉浸模式"
            title="退出沉浸模式（F 或 Escape）"
          >
            <X size={14} strokeWidth={1.4} />
          </button>
          <div className="absolute bottom-12 left-1/2 w-full max-w-2xl -translate-x-1/2 text-center">
            <p className="text-[9px] uppercase tracking-[0.24em] text-white/25">{current.title}</p>
            <p className="mt-4 text-base font-light leading-relaxed text-white/70 [text-shadow:0_2px_18px_#000]">
              {current.scene.message}
            </p>
          </div>
        </div>
      )}

      <div
        className={`pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-black/10 transition-all duration-[1800ms] ${
          entering ? "opacity-100" : "invisible scale-110 opacity-0"
        }`}
        aria-hidden={!entering}
      >
        <div className="text-center">
          <p className="studio-eyebrow">正在进入世界</p>
          <p className="mt-4 text-5xl font-light tracking-[-0.04em]">{current.title}</p>
          <div className="mx-auto mt-7 h-px w-40 overflow-hidden bg-white/10">
            <span className="entering-line block h-full bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
