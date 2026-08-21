import type { CompanionMessage, CompanionMood, VoiceActivity } from "../../../shared/companion";
import { createStageReplyExcerpt } from "../../lib/stagePresentation";

const moodLabels: Record<CompanionMood, string> = {
  serene: "平静",
  curious: "好奇",
  joyful: "愉悦",
  tender: "温柔",
  melancholy: "低落",
  tense: "专注",
  playful: "俏皮",
  awe: "惊喜",
};

const activityLabels: Partial<Record<VoiceActivity, string>> = {
  connecting: "正在靠近",
  listening: "正在聆听",
  thinking: "正在思考",
  speaking: "正在说话",
  singing: "正在轻唱",
};

export default function StageSolReply({
  message,
  visible,
  voiceActivity,
  lyricsPrimary,
}: {
  message: CompanionMessage | null;
  visible: boolean;
  voiceActivity: VoiceActivity;
  lyricsPrimary: boolean;
}) {
  if (!message || !visible) return null;
  const excerpt = createStageReplyExcerpt(message.text);
  if (!excerpt.text) return null;
  const activity = activityLabels[voiceActivity];

  const showFullReply = () => {
    const target = document.getElementById(`conversation-message-${message.id}`);
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    target?.classList.add("conversation-message-highlight");
    window.setTimeout(() => target?.classList.remove("conversation-message-highlight"), 1_400);
  };

  return (
    <section
      className={`stage-sol-reply pointer-events-auto fixed left-1/2 z-[45] -translate-x-1/2 text-center ${
        lyricsPrimary ? "bottom-[190px] w-[min(620px,calc(100vw-800px))]" : "bottom-[116px] w-[min(680px,calc(100vw-760px))]"
      }`}
      data-stage-sol-reply="visible"
      data-stage-over-lyrics={lyricsPrimary ? "true" : "false"}
    >
      <div className="flex items-center justify-center gap-2 text-[7px] uppercase tracking-[0.2em] text-white/24">
        <span>SOL</span>
        <span className="h-px w-5 bg-white/12" />
        <span>{moodLabels[message.mood]}</span>
        {activity && <span>· {activity}</span>}
      </div>
      <p
        className={`mx-auto mt-2 font-light leading-relaxed text-white [text-shadow:0_2px_18px_#000] ${
          lyricsPrimary ? "max-w-lg text-[11px] text-white/48" : "max-w-2xl text-[15px] text-white/72"
        }`}
        aria-hidden="true"
      >
        {excerpt.text}
      </p>
      {excerpt.truncated && (
        <button
          type="button"
          onClick={showFullReply}
          className="mt-2 text-[8px] tracking-[0.08em] text-white/28 transition hover:text-white/68"
          aria-label="在右侧对话记录中查看 Sol 的完整回答"
        >
          查看完整回答
        </button>
      )}
    </section>
  );
}
