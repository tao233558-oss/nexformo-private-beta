import { Copy, Eye, EyeOff, Redo2, Trash2, Undo2 } from "lucide-react";
import type { WorldSession } from "../../lib/world";

type EvolutionTimelineProps = {
  session: WorldSession;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onSelect: (index: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onDuplicate: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

export default function EvolutionTimeline({
  session,
  visible,
  onVisibleChange,
  onSelect,
  onUndo,
  onRedo,
  onDuplicate,
  onClear,
  canUndo,
  canRedo,
}: EvolutionTimelineProps) {
  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => onVisibleChange(true)}
        className="studio-icon-button pointer-events-auto absolute bottom-6 left-7 z-20"
        aria-label="显示演化时间线"
        title="显示演化时间线（H）"
      >
        <Eye size={14} strokeWidth={1.4} />
      </button>
    );
  }

  return (
    <section className="timeline-shell pointer-events-auto absolute bottom-5 left-7 right-7 z-20 flex h-[74px] items-center gap-6">
      <div className="flex w-[246px] shrink-0 items-center gap-1 border-r border-white/10 pr-5">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="timeline-tool"
          aria-label="撤销"
          title="撤销（Ctrl/Cmd + Z）"
        >
          <Undo2 size={13} />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className="timeline-tool"
          aria-label="重做"
          title="重做（Ctrl/Cmd + Shift + Z）"
        >
          <Redo2 size={13} />
        </button>
        <button
          type="button"
          onClick={onDuplicate}
          className="timeline-tool"
          aria-label="复制当前状态"
          title="复制当前状态"
        >
          <Copy size={13} />
        </button>
        <button
          type="button"
          onClick={onClear}
          disabled={session.states.length <= 1}
          className="timeline-tool"
          aria-label="清除演化历史"
          title="清除演化历史"
        >
          <Trash2 size={13} />
        </button>
      </div>

      <div className="studio-scrollbar min-w-0 flex-1 overflow-x-auto">
        <div className="flex min-w-max items-center gap-0 pr-4">
          {session.states.map((state, index) => (
            <div key={state.id} className="flex items-center">
              {index > 0 && <span className="h-px w-7 bg-white/15" />}
              <button
                type="button"
                onClick={() => onSelect(index)}
                className={`timeline-node ${session.index === index ? "is-active" : ""}`}
                aria-current={session.index === index ? "step" : undefined}
              >
                <span className="timeline-node-dot" />
                <span className="text-[8px] uppercase tracking-[0.15em] text-white/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block max-w-32 truncate text-[9px] font-light text-white/55">
                  {state.title}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onVisibleChange(false)}
        className="timeline-tool shrink-0"
        aria-label="隐藏演化时间线"
        title="隐藏演化时间线（H）"
      >
        <EyeOff size={13} />
      </button>
    </section>
  );
}
