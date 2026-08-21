import {
  Download,
  Edit3,
  Filter,
  Import,
  LocateFixed,
  Pin,
  PinOff,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent,
} from "react";
import {
  SOL_MEMORY_CATEGORIES,
  SOL_MEMORY_TONES,
  getMemoryStarPosition,
  parseSolMemoryArchive,
  type SolMemory,
  type SolMemoryCandidate,
  type SolMemoryCategory,
  type SolMemoryTone,
} from "../../../shared/solMemory";
import type { UseSolMemoryResult } from "../../hooks/useSolMemory";

type Props = {
  open: boolean;
  focusMemoryId?: string | null;
  memory: UseSolMemoryResult;
  onClose: () => void;
  onEvent?: (kind: "confirmed" | "recalled" | "corrected" | "removed", memory: SolMemory | null) => void;
  onToast?: (message: string) => void;
};

const categoryLabels: Record<SolMemoryCategory, string> = {
  preference: "偏好",
  music: "音乐",
  place: "地方",
  person: "称呼与人物",
  shared_moment: "共同片段",
  world: "世界",
  note: "札记",
};

const toneLabels: Record<SolMemoryTone, string> = {
  warm: "温暖",
  joyful: "明亮",
  calm: "安静",
  curious: "好奇",
  melancholy: "微澜",
  neutral: "中性",
};

const toneColors: Record<SolMemoryTone, string> = {
  warm: "#ffb8d0",
  joyful: "#ffe7a8",
  calm: "#b8d7ff",
  curious: "#c8bdff",
  melancholy: "#8497bb",
  neutral: "#e7edf6",
};

const formatDate = (value: number | null) => {
  if (!value) return "尚未唤起";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const connectedPairs = (memories: SolMemory[]) => {
  const pairs: Array<[SolMemory, SolMemory]> = [];
  for (let left = 0; left < memories.length; left += 1) {
    for (let right = left + 1; right < memories.length; right += 1) {
      if (pairs.length >= 60) return pairs;
      const tags = new Set(memories[left].tags.map((tag) => tag.toLowerCase()));
      if (memories[right].tags.some((tag) => tags.has(tag.toLowerCase()))) {
        pairs.push([memories[left], memories[right]]);
      }
    }
  }
  return pairs;
};

function CandidateCard({
  memory,
  onEvent,
  onToast,
}: Pick<Props, "memory" | "onEvent" | "onToast">) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<SolMemoryCandidate | null>(memory.candidate);

  useEffect(() => {
    setDraft(memory.candidate);
    setEditing(false);
  }, [memory.candidate]);

  if (!memory.candidate || !draft) return null;

  const confirm = () => {
    const saved = memory.confirmCandidate(draft, "suggested");
    if (!saved) {
      onToast?.("这段记忆没有被保存");
      return;
    }
    onEvent?.("confirmed", saved);
    onToast?.("新的星星已加入记忆星图");
  };

  return (
    <section className="memory-candidate-card fixed bottom-24 left-1/2 z-[66] w-[420px] -translate-x-1/2 border border-white/15 bg-black/85 px-5 py-4 backdrop-blur-2xl">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0 flex-1">
          <p className="studio-eyebrow">Sol 想记住</p>
          {editing ? (
            <div className="mt-3 space-y-2">
              <input
                value={draft.title}
                maxLength={28}
                onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                className="memory-input w-full"
                aria-label="记忆标题"
              />
              <textarea
                value={draft.summary}
                maxLength={120}
                rows={2}
                onChange={(event) => setDraft({ ...draft, summary: event.target.value })}
                className="memory-input w-full resize-none"
                aria-label="记忆摘要"
              />
            </div>
          ) : (
            <p className="mt-2 text-[12px] font-light leading-relaxed text-white/72">{draft.summary}</p>
          )}
        </div>
        <button type="button" onClick={memory.ignoreCandidate} className="studio-ghost-icon" aria-label="忽略记忆建议">
          <X size={13} />
        </button>
      </div>
      <div className="mt-4 flex items-center gap-4 text-[9px] text-white/45">
        <button type="button" onClick={confirm} className="memory-action-primary">记住</button>
        <button type="button" onClick={() => setEditing((value) => !value)} className="memory-action-link">
          {editing ? "完成编辑" : "编辑"}
        </button>
        <button type="button" onClick={memory.ignoreCandidate} className="memory-action-link">忽略</button>
      </div>
    </section>
  );
}

export default function MemoryConstellation({
  open,
  focusMemoryId,
  memory,
  onClose,
  onEvent,
  onToast,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SolMemoryCategory | "all">("all");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editDraft, setEditDraft] = useState<SolMemory | null>(null);
  const [importPreview, setImportPreview] = useState<ReturnType<typeof parseSolMemoryArchive>>(null);
  const [undoVisible, setUndoVisible] = useState(false);
  const dragRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const importRef = useRef<HTMLInputElement>(null);

  const selected = memory.memories.find((item) => item.id === selectedId) ?? null;
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return memory.memories.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      return !normalized || `${item.title} ${item.summary} ${item.tags.join(" ")}`.toLowerCase().includes(normalized);
    });
  }, [category, memory.memories, query]);
  const lines = useMemo(() => connectedPairs(filtered), [filtered]);

  useEffect(() => {
    if (!open) return;
    if (focusMemoryId && memory.memories.some((item) => item.id === focusMemoryId)) setSelectedId(focusMemoryId);
  }, [focusMemoryId, memory.memories, open]);

  useEffect(() => {
    setEditMode(false);
    setEditDraft(selected);
  }, [selected]);

  useEffect(() => {
    if (!memory.lastSaved) return;
    setUndoVisible(true);
    const timer = window.setTimeout(() => setUndoVisible(false), 8_000);
    return () => window.clearTimeout(timer);
  }, [memory.lastSaved?.id]);

  const handlePointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.button !== 0 || (event.target as Element).closest("[data-memory-star]")) return;
    setDragging(true);
    dragRef.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!dragging) return;
    const scale = 1600 / Math.max(1, event.currentTarget.getBoundingClientRect().width);
    setPan({
      x: dragRef.current.panX + (event.clientX - dragRef.current.x) * scale,
      y: dragRef.current.panY + (event.clientY - dragRef.current.y) * scale,
    });
  };

  const finishDrag = (event: ReactPointerEvent<SVGSVGElement>) => {
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleWheel = (event: WheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    setZoom((value) => Math.max(0.65, Math.min(2.4, value * (event.deltaY > 0 ? 0.9 : 1.1))));
  };

  const recall = (item: SolMemory) => {
    const recalled = memory.recallMemory(item.id);
    if (!recalled) return;
    onEvent?.("recalled", recalled);
    onToast?.(`已唤起“${item.title}”`);
  };

  const saveEdit = () => {
    if (!editDraft || !selected) return;
    memory.updateMemory(selected.id, editDraft);
    onEvent?.("corrected", { ...selected, ...editDraft });
    setEditMode(false);
    onToast?.("这颗星已经重新写清楚了");
  };

  const removeSelected = () => {
    if (!selected || !window.confirm(`确定移除“${selected.title}”吗？这不会影响 Sol 的情绪。`)) return;
    memory.removeMemory(selected.id);
    onEvent?.("removed", selected);
    setSelectedId(null);
    onToast?.("已经移除了。你随时可以决定 Sol 记住什么");
  };

  const exportMemories = () => {
    const blob = new Blob([JSON.stringify(memory.exportStore(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `nexformo-memory-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    onToast?.("记忆文件已导出，不包含任何密钥");
  };

  const readImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const preview = parseSolMemoryArchive(JSON.parse(await file.text()) as unknown);
      setImportPreview(preview);
      if (!preview) onToast?.("无法识别这个记忆文件");
    } catch {
      setImportPreview(null);
      onToast?.("记忆文件格式不正确");
    }
  };

  const applyImport = () => {
    if (!importPreview) return;
    const before = memory.memories.length;
    memory.importStore(importPreview);
    setImportPreview(null);
    onToast?.(`已检查 ${importPreview.memories.length} 颗星星；重复内容会被自动跳过`);
    if (!before && importPreview.memories[0]) setSelectedId(importPreview.memories[0].id);
  };

  return (
    <>
      <CandidateCard memory={memory} onEvent={onEvent} onToast={onToast} />

      {undoVisible && memory.lastSaved && (
        <div className="fixed bottom-10 left-1/2 z-[67] flex -translate-x-1/2 items-center gap-5 border border-white/12 bg-black/80 px-4 py-2 text-[9px] text-white/55 backdrop-blur-xl">
          <span>“{memory.lastSaved.title}”已保存</span>
          <button
            type="button"
            className="text-white/85 hover:text-white"
            onClick={() => {
              memory.undoLastSave();
              setUndoVisible(false);
              onEvent?.("removed", memory.lastSaved);
              onToast?.("刚才保存的记忆已撤销");
            }}
          >
            撤销
          </button>
        </div>
      )}

      <section
        className={`memory-constellation fixed inset-0 z-[65] overflow-hidden bg-[#020204]/95 backdrop-blur-xl transition-all duration-500 ${
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        inert={open ? undefined : true}
      >
        <header className="absolute left-7 right-7 top-6 z-30 flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <Sparkles size={13} className="text-rose-100/65" />
              <p className="text-sm tracking-[0.18em] text-white/80">记忆星图</p>
            </div>
            <p className="mt-2 text-[9px] font-light text-white/32">
              记忆默认保存在当前浏览器。对话时，只会把少量相关记忆摘要发送给当前 AI 服务。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-[9px] text-white/42">
              <input
                type="checkbox"
                checked={memory.enabled}
                onChange={(event) => memory.setEnabled(event.target.checked)}
                className="accent-white"
              />
              长期记忆
            </label>
            <button type="button" onClick={exportMemories} className="archive-header-action"><Download size={12} /> 导出</button>
            <button type="button" onClick={() => importRef.current?.click()} className="archive-header-action"><Import size={12} /> 导入</button>
            <input ref={importRef} type="file" accept="application/json,.json" onChange={readImport} className="hidden" />
            <button type="button" onClick={onClose} className="studio-icon-button" aria-label="关闭记忆星图"><X size={14} /></button>
          </div>
        </header>

        <div className="absolute left-7 top-28 z-30 w-[250px] space-y-3">
          <label className="flex items-center gap-2 border-b border-white/12 pb-2 text-white/45">
            <Search size={12} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索一颗星……"
              className="w-full bg-transparent text-[10px] text-white/70 placeholder:text-white/25"
            />
          </label>
          <div className="flex items-center gap-2">
            <Filter size={11} className="text-white/25" />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as SolMemoryCategory | "all")}
              className="memory-select"
              aria-label="记忆分类筛选"
            >
              <option value="all">全部星群</option>
              {SOL_MEMORY_CATEGORIES.map((item) => <option key={item} value={item}>{categoryLabels[item]}</option>)}
            </select>
          </div>
          <p className="text-[8px] tracking-[0.12em] text-white/20">{filtered.length} / {memory.memories.length} 颗星</p>
        </div>

        <button
          type="button"
          onClick={() => { setPan({ x: 0, y: 0 }); setZoom(1); }}
          className="studio-icon-button absolute bottom-8 left-8 z-30"
          aria-label="重置星图视角"
          title="重置视角"
        >
          <LocateFixed size={14} />
        </button>

        <svg
          viewBox="0 0 1600 900"
          className={`absolute inset-0 h-full w-full touch-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onWheel={handleWheel}
          aria-label="可拖动和缩放的记忆星图"
        >
          <defs>
            <radialGradient id="memory-space-glow">
              <stop offset="0" stopColor="#613649" stopOpacity="0.18" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            <filter id="memory-star-glow" x="-200%" y="-200%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width="1600" height="900" fill="url(#memory-space-glow)" />
          <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`} style={{ transformOrigin: "800px 450px" }}>
            {lines.map(([left, right]) => {
              const a = getMemoryStarPosition(left);
              const b = getMemoryStarPosition(right);
              return <line key={`${left.id}-${right.id}`} x1={a.x * 1600} y1={a.y * 900} x2={b.x * 1600} y2={b.y * 900} stroke="rgba(205,218,255,0.1)" strokeWidth={0.7} />;
            })}
            {filtered.map((item) => {
              const position = getMemoryStarPosition(item);
              const active = selectedId === item.id || memory.resonance?.memoryId === item.id;
              const radius = 3.2 + item.importance * 5;
              return (
                <g
                  key={item.id}
                  data-memory-star
                  role="button"
                  tabIndex={0}
                  aria-label={`打开记忆：${item.title}`}
                  transform={`translate(${position.x * 1600} ${position.y * 900})`}
                  className="memory-star cursor-pointer"
                  onClick={(event) => { event.stopPropagation(); setSelectedId(item.id); }}
                  onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedId(item.id); }}
                >
                  {(item.pinned || active) && <circle r={radius + (active ? 12 : 8)} fill="none" stroke={toneColors[item.tone]} strokeOpacity={active ? 0.42 : 0.2} strokeWidth={0.8} className={active ? "memory-star-resonating" : ""} />}
                  <circle r={radius} fill={toneColors[item.tone]} fillOpacity={0.9} filter="url(#memory-star-glow)" />
                  <circle r={Math.max(1, radius * 0.28)} fill="#fff" />
                  <text y={radius + 16} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" className="pointer-events-none select-none">{item.title}</text>
                </g>
              );
            })}
          </g>
        </svg>

        {!memory.memories.length && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
            <div>
              <Sparkles size={26} className="mx-auto text-white/18" />
              <p className="mt-5 text-sm font-light text-white/48">这里还没有星星。</p>
              <p className="mt-2 text-[10px] text-white/25">你可以对 Sol 说：“记住我喜欢雨天。”</p>
            </div>
          </div>
        )}

        {selected && editDraft && (
          <aside className="absolute bottom-7 right-7 top-24 z-40 flex w-[370px] flex-col border border-white/10 bg-black/78 p-6 backdrop-blur-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="studio-eyebrow">{categoryLabels[selected.category]} / {toneLabels[selected.tone]}</p>
                {editMode ? (
                  <input value={editDraft.title} maxLength={28} onChange={(event) => setEditDraft({ ...editDraft, title: event.target.value })} className="memory-input mt-3 w-full text-base" />
                ) : (
                  <h2 className="mt-3 text-xl font-light text-white/85">{selected.title}</h2>
                )}
              </div>
              <button type="button" onClick={() => setSelectedId(null)} className="studio-ghost-icon" aria-label="关闭记忆详情"><X size={13} /></button>
            </div>

            <div className="studio-scrollbar mt-6 min-h-0 flex-1 overflow-y-auto pr-2">
              {editMode ? (
                <div className="space-y-4">
                  <label className="block"><span className="studio-field-label">摘要</span><textarea value={editDraft.summary} maxLength={120} rows={4} onChange={(event) => setEditDraft({ ...editDraft, summary: event.target.value })} className="memory-input mt-2 w-full resize-none" /></label>
                  <label className="block"><span className="studio-field-label">分类</span><select value={editDraft.category} onChange={(event) => setEditDraft({ ...editDraft, category: event.target.value as SolMemoryCategory })} className="memory-select mt-2 w-full">{SOL_MEMORY_CATEGORIES.map((item) => <option key={item} value={item}>{categoryLabels[item]}</option>)}</select></label>
                  <label className="block"><span className="studio-field-label">色调</span><select value={editDraft.tone} onChange={(event) => setEditDraft({ ...editDraft, tone: event.target.value as SolMemoryTone })} className="memory-select mt-2 w-full">{SOL_MEMORY_TONES.map((item) => <option key={item} value={item}>{toneLabels[item]}</option>)}</select></label>
                  <label className="block"><span className="studio-field-label">标签（用逗号分隔）</span><input value={editDraft.tags.join("，")} onChange={(event) => setEditDraft({ ...editDraft, tags: event.target.value.split(/[，,]/).map((item) => item.trim()).filter(Boolean).slice(0, 6) })} className="memory-input mt-2 w-full" /></label>
                </div>
              ) : (
                <>
                  <p className="text-[13px] font-light leading-[1.9] text-white/68">{selected.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{selected.tags.map((tag) => <span key={tag} className="border border-white/10 px-2 py-1 text-[8px] text-white/35">#{tag}</span>)}</div>
                  <dl className="mt-8 space-y-4 border-t border-white/8 pt-5 text-[9px]">
                    <div className="flex justify-between gap-4"><dt className="text-white/25">创建时间</dt><dd className="text-white/48">{formatDate(selected.createdAt)}</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-white/25">上次唤起</dt><dd className="text-white/48">{formatDate(selected.lastRecalledAt)}</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-white/25">唤起次数</dt><dd className="text-white/48">{selected.recallCount}</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-white/25">存储位置</dt><dd className="text-white/48">仅当前浏览器</dd></div>
                  </dl>
                </>
              )}
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              {editMode ? (
                <div className="flex gap-3"><button type="button" onClick={saveEdit} className="memory-action-primary">保存修改</button><button type="button" onClick={() => { setEditDraft(selected); setEditMode(false); }} className="memory-action-link">取消</button></div>
              ) : (
                <div className="flex flex-wrap items-center gap-4">
                  <button type="button" onClick={() => recall(selected)} className="memory-action-primary"><Sparkles size={11} /> 唤起这段记忆</button>
                  <button type="button" onClick={() => setEditMode(true)} className="memory-action-link"><Edit3 size={11} /> 编辑</button>
                  <button type="button" onClick={() => memory.togglePin(selected.id)} className="memory-action-link">{selected.pinned ? <PinOff size={11} /> : <Pin size={11} />} {selected.pinned ? "取消固定" : "固定"}</button>
                  <button type="button" onClick={removeSelected} className="memory-action-link text-rose-100/45"><Trash2 size={11} /> 移除</button>
                </div>
              )}
            </div>
          </aside>
        )}

        <button
          type="button"
          className="absolute bottom-8 right-8 z-30 flex items-center gap-2 text-[8px] text-rose-100/30 hover:text-rose-100/65"
          onClick={() => {
            if (!memory.memories.length || !window.confirm("永久清空整个记忆星图吗？情感记忆和当前世界不会被删除。")) return;
            memory.clearMemories();
            setSelectedId(null);
            onEvent?.("removed", null);
            onToast?.("记忆星图已清空；Sol 的情绪和当前世界保持不变");
          }}
        >
          <Trash2 size={11} /> 清空所有记忆
        </button>

        {importPreview && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-[420px] border border-white/12 bg-[#050506] p-6">
              <p className="studio-eyebrow">导入预览</p>
              <p className="mt-4 text-sm font-light text-white/65">文件中有 {importPreview.memories.length} 颗经过安全校验的星星。</p>
              <p className="mt-2 text-[9px] leading-relaxed text-white/30">导入时会保留当前记忆，重复内容和超过容量的内容会被跳过。</p>
              <div className="mt-6 flex gap-4"><button type="button" onClick={applyImport} className="memory-action-primary">确认导入</button><button type="button" onClick={() => setImportPreview(null)} className="memory-action-link">取消</button></div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

