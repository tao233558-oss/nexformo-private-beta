import { Mic, MicOff, Square, Volume2, VolumeX } from "lucide-react";
import type { VoiceActivity } from "../../../shared/companion";

type VoiceControlProps = {
  activity: VoiceActivity;
  enabled: boolean;
  muted: boolean;
  error: string;
  voiceLabel: string;
  onStart: () => void;
  onStop: () => void;
  onToggleMuted: () => void;
  onStopSpeaking: () => void;
};

const labels: Record<VoiceActivity, string> = {
  disabled: "语音已关闭",
  connecting: "正在连接",
  ready: "随时可以说话",
  listening: "正在聆听",
  thinking: "正在思考",
  speaking: "正在回应",
  singing: "正在唱歌",
  muted: "声音已静音",
  "permission-denied": "麦克风权限被拒绝",
  unavailable: "语音不可用",
  error: "连接已结束",
};

export default function VoiceControl({
  activity,
  enabled,
  muted,
  error,
  voiceLabel,
  onStart,
  onStop,
  onToggleMuted,
  onStopSpeaking,
}: VoiceControlProps) {
  const active = ["connecting", "ready", "listening", "thinking", "speaking", "singing"].includes(activity);
  return (
    <div className="voice-shell" data-voice-activity={activity}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={`voice-orb ${active ? "is-active" : ""}`}
          onClick={enabled ? onStop : onStart}
          aria-label={enabled ? "关闭实时语音" : "开启实时语音"}
          title={enabled ? "关闭实时语音" : "开启实时语音"}
        >
          <span className="voice-orb-ring" aria-hidden="true" />
          {enabled ? <Mic size={13} strokeWidth={1.4} /> : <MicOff size={13} strokeWidth={1.4} />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/55" aria-live="polite">
            {muted && enabled ? "声音已静音" : labels[activity]}
          </p>
          <p className="mt-1 truncate text-[8px] font-light text-white/25">
            {voiceLabel || "AI 大脑 / 实时语音"}
          </p>
        </div>
        {enabled && (
          <button
            type="button"
            onClick={onToggleMuted}
            className="studio-ghost-icon h-7 w-7"
            aria-label={muted ? "取消静音" : "静音"}
            title={muted ? "取消静音" : "静音"}
          >
            {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        )}
        {(activity === "speaking" || activity === "singing") && (
          <button
            type="button"
            onClick={onStopSpeaking}
            className="studio-ghost-icon h-7 w-7"
            aria-label="停止语音回应"
            title="停止说话"
          >
            <Square size={10} fill="currentColor" />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-[8px] font-light leading-relaxed text-white/40" role="status">
          {error}
        </p>
      )}
      <p className="mt-2 text-[7px] uppercase tracking-[0.12em] text-white/18">
        AI 生成 · 豆包负责聆听与发声 · DeepSeek 负责思考、情绪与粒子变化
      </p>
    </div>
  );
}
