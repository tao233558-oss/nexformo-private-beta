import {
  ArrowUp,
  CircleDotDashed,
  PanelRightClose,
  PanelRightOpen,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import type {
  CompanionMessage,
  VoiceActivity,
} from "../../../shared/companion";
import type { SolEmotionalState, SolMood } from "../../../shared/solEmotion";
import type { WorldSnapshot } from "../../lib/world";
import SourceChips from "./SourceChips";
import VoiceControl from "./VoiceControl";

type ConversationRailProps = {
  current: WorldSnapshot;
  messages: CompanionMessage[];
  emotionalState: SolEmotionalState;
  busy: boolean;
  error: string;
  voiceActivity: VoiceActivity;
  voiceEnabled: boolean;
  voiceMuted: boolean;
  voiceError: string;
  voiceLabel: string;
  onEvolve: (instruction: string) => Promise<void>;
  onResetMemory: () => void;
  onStartVoice: () => void;
  onStopVoice: () => void;
  onToggleVoiceMuted: () => void;
  onStopSpeaking: () => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
};

const emotionalMoodLabels: Record<SolMood, string> = {
  calm: "平静",
  joyful: "愉悦",
  shy: "害羞",
  curious: "好奇",
  tender: "温柔",
  concerned: "关切",
  lonely: "孤寂",
  tired: "疲惫",
};

export default function ConversationRail({
  current,
  messages,
  emotionalState,
  busy,
  error,
  voiceActivity,
  voiceEnabled,
  voiceMuted,
  voiceError,
  voiceLabel,
  onEvolve,
  onResetMemory,
  onStartVoice,
  onStopVoice,
  onToggleVoiceMuted,
  onStopSpeaking,
  collapsed,
  onCollapsedChange,
}: ConversationRailProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, busy]);

  const submit = async () => {
    const instruction = input.trim();
    if (!instruction || busy) return;
    setInput("");
    await onEvolve(instruction);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void submit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submit();
    }
  };

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => onCollapsedChange(false)}
        className="studio-icon-button pointer-events-auto absolute right-7 top-24 z-20"
        aria-label="打开对话栏"
        title="打开对话栏（C）"
      >
        <PanelRightOpen size={15} strokeWidth={1.4} />
      </button>
    );
  }

  return (
    <aside className="studio-panel pointer-events-auto absolute bottom-28 right-7 top-24 z-20 flex w-[320px] flex-col">
      <div className="flex items-start justify-between border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="studio-eyebrow">Nexformo 生命体</p>
            <span className="presence-pulse" aria-hidden="true" />
          </div>
          <p className="mt-2 text-xs font-light text-white/55">
            {emotionalMoodLabels[emotionalState.primaryMood]}
            <span className="mx-2 text-white/15">/</span>
            连接度 {Math.round(emotionalState.connection * 100)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onResetMemory}
            className="studio-ghost-icon"
            aria-label="重置朋友记忆"
            title="重置朋友记忆"
          >
            <RotateCcw size={13} strokeWidth={1.35} />
          </button>
          <button
            type="button"
            onClick={() => onCollapsedChange(true)}
            className="studio-ghost-icon"
            aria-label="收起对话栏"
            title="收起对话栏（C）"
          >
            <PanelRightClose size={14} strokeWidth={1.35} />
          </button>
          <CircleDotDashed
            className={busy ? "animate-spin text-white/65" : "text-white/25"}
            size={16}
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </div>
      </div>

      <div ref={scrollRef} className="studio-scrollbar min-h-0 flex-1 overflow-y-auto py-5 pl-3 pr-1">
        <div className="conversation-line space-y-6 border-l border-white/12 pl-5">
          {!messages.length && (
            <article className="relative">
              <span className="absolute -left-[23px] top-1 h-[5px] w-[5px] rounded-full bg-white/50" />
              <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-white/30">
                生命体已在线
              </p>
              <p className="mt-2 text-[11px] font-light leading-relaxed text-white/55">
                我在这里。和我说说话，也可以告诉我想变成什么形状。
              </p>
              <p className="mt-2 text-[9px] font-light leading-relaxed text-white/25">
                试试输入“变成一颗会呼吸的爱心”，或者告诉我你今天的感受。
              </p>
            </article>
          )}

          {messages.map((message) => (
            <article
              key={message.id}
              id={`conversation-message-${message.id}`}
              className="relative transition-colors duration-500"
            >
              <span
                className={`absolute -left-[23px] top-1 h-[5px] w-[5px] rounded-full ${
                  message.role === "assistant" ? "bg-white" : "border border-white/40 bg-black"
                }`}
              />
              <div className="flex items-center gap-2">
                <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-white/28">
                  {message.role === "assistant" ? "Nexformo" : "你"}
                </p>
                {message.mode === "voice" && (
                  <span className="text-[7px] uppercase tracking-[0.12em] text-white/18">语音</span>
                )}
                {message.webUsed && (
                  <span className="text-[7px] uppercase tracking-[0.12em] text-white/32">联网感知</span>
                )}
              </div>
              <p
                className={`mt-2 text-[11px] font-light leading-relaxed ${
                  message.role === "assistant" ? "text-white/70" : "text-white/48"
                }`}
              >
                {message.text}
              </p>
              {message.role === "assistant" && <SourceChips sources={message.sources} />}
            </article>
          ))}

          {busy && (
            <article className="relative" aria-live="polite">
              <span className="absolute -left-[24px] top-1 h-[7px] w-[7px] animate-pulse rounded-full border border-white/70" />
              <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-white/35">
                正在思考
              </p>
              <p className="mt-2 text-[11px] font-light text-white/50">
                光、记忆和语言正在聚集……
              </p>
            </article>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <VoiceControl
          activity={voiceActivity}
          enabled={voiceEnabled}
          muted={voiceMuted}
          error={voiceError}
          voiceLabel={voiceLabel}
          onStart={onStartVoice}
          onStop={onStopVoice}
          onToggleMuted={onToggleVoiceMuted}
          onStopSpeaking={onStopSpeaking}
        />

        <div className="mb-3 mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
          {current.suggestions.slice(0, 3).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              disabled={busy}
              onClick={() => setInput(suggestion)}
              className="text-left text-[9px] font-light text-white/35 transition-colors hover:text-white/70 disabled:opacity-30"
            >
              + {suggestion}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-end gap-3 border-b border-white/25 pb-2 focus-within:border-white/70">
          <label htmlFor="companion-instruction" className="sr-only">
            与 Nexformo 对话或描述一种新形态
          </label>
          <textarea
            id="companion-instruction"
            value={input}
            onChange={(event) => setInput(event.target.value.slice(0, 500))}
            onKeyDown={handleKeyDown}
            disabled={busy}
            rows={2}
            maxLength={500}
            className="studio-scrollbar min-h-[42px] flex-1 resize-none bg-transparent text-[11px] font-light leading-relaxed text-white outline-none placeholder:text-white/25"
            placeholder="聊天、搜索，或让这个身体改变形态……"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="studio-icon-button h-8 w-8 disabled:cursor-not-allowed disabled:opacity-25"
            aria-label="发送给 Nexformo"
          >
            <ArrowUp size={13} strokeWidth={1.5} />
          </button>
        </form>
        <p className="mt-2 text-[8px] uppercase tracking-[0.14em] text-white/20" aria-live="polite">
          {error || "按 Enter 发送 · Shift + Enter 换行"}
        </p>
      </div>
    </aside>
  );
}
