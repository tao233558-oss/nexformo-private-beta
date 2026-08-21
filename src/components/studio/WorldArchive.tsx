import {
  Check,
  Copy,
  Download,
  FolderOpen,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { CAMERA_MOTION_LABELS, PARTICLE_FORM_LABELS } from "../../../shared/visualScene";
import { formatWorldDate, type WorldArchiveEntry, type WorldSession } from "../../lib/world";

type WorldArchiveProps = {
  open: boolean;
  entries: WorldArchiveEntry[];
  currentSession: WorldSession;
  onClose: () => void;
  onSave: (session: WorldSession) => WorldArchiveEntry;
  onOpenEntry: (entry: WorldArchiveEntry) => void;
  onRename: (id: string, title: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (entry: WorldArchiveEntry) => void;
  onImport: (value: unknown) => WorldArchiveEntry | null;
};

function ArchivePreview({ entry }: { entry: WorldArchiveEntry }) {
  return (
    <div
      className="archive-preview relative h-28 overflow-hidden border border-white/10 bg-black"
      style={{
        background: `radial-gradient(circle at 55% 48%, ${entry.scene.palette[1]}22 0%, #000000 58%)`,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: 42 }, (_, index) => {
        const angle = index * 2.399;
        const radius = Math.sqrt(index) * 6.2;
        const left = 52 + Math.cos(angle) * radius;
        const top = 50 + Math.sin(angle) * radius * 0.58;
        const color = entry.scene.palette[index % entry.scene.palette.length];
        return (
          <span
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: index % 5 === 0 ? 2 : 1,
              height: index % 5 === 0 ? 2 : 1,
              backgroundColor: color,
              boxShadow: `0 0 6px ${color}`,
              opacity: 0.35 + (index % 6) * 0.1,
            }}
          />
        );
      })}
      <span className="absolute bottom-3 left-3 text-[8px] uppercase tracking-[0.18em] text-white/25">
        {PARTICLE_FORM_LABELS[entry.scene.form]} / {CAMERA_MOTION_LABELS[entry.scene.cameraMotion]}
      </span>
    </div>
  );
}

export default function WorldArchive({
  open,
  entries,
  currentSession,
  onClose,
  onSave,
  onOpenEntry,
  onRename,
  onDuplicate,
  onDelete,
  onExport,
  onImport,
}: WorldArchiveProps) {
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [notice, setNotice] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const saveCurrent = () => {
    const entry = onSave(currentSession);
    setNotice(`“${entry.title}”已保存到此浏览器。`);
  };

  const importFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const value = JSON.parse(await file.text()) as unknown;
      const entry = onImport(value);
      setNotice(entry ? `“${entry.title}”已导入。` : "这不是有效的 Nexformo 世界文件。");
    } catch {
      setNotice("无法将所选文件读取为 Nexformo 世界。");
    }
  };

  const beginRename = (entry: WorldArchiveEntry) => {
    setRenamingId(entry.id);
    setRenameValue(entry.title);
  };

  const commitRename = () => {
    if (!renamingId) return;
    onRename(renamingId, renameValue);
    setRenamingId(null);
  };

  return (
    <div
      className={`archive-overlay fixed inset-0 z-50 bg-[#030303]/95 backdrop-blur-2xl transition-all duration-500 ${
        open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal={open ? true : undefined}
      aria-label="世界档案"
      inert={open ? undefined : true}
    >
      <div className="flex h-full flex-col px-12 py-9">
        <header className="flex items-start justify-between border-b border-white/10 pb-6">
          <div>
            <p className="studio-eyebrow">Nexformo / 本地收藏</p>
            <h2 className="mt-3 text-4xl font-light tracking-[-0.035em]">世界档案</h2>
            <p className="mt-3 max-w-lg text-xs font-light leading-relaxed text-white/40">
              内容仅保存在当前浏览器。你可以导出世界，把它的视觉记忆带到其他地方。
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={saveCurrent} className="archive-header-action">
              <Plus size={13} /> 保存当前世界
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="archive-header-action"
            >
              <Upload size={13} /> 导入 JSON
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              onChange={(event) => void importFile(event)}
              className="sr-only"
              tabIndex={open ? 0 : -1}
            />
            <button type="button" onClick={onClose} className="studio-icon-button ml-4" aria-label="关闭档案">
              <X size={15} strokeWidth={1.4} />
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col pt-7">
          <div className="mb-4 flex min-h-5 items-center justify-between">
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
              已保存 {entries.length} 个世界
            </p>
            <p className="text-[9px] font-light text-white/35" aria-live="polite">
              {notice}
            </p>
          </div>

          <div className="studio-scrollbar grid min-h-0 flex-1 grid-cols-3 content-start gap-x-5 gap-y-9 overflow-y-auto pr-2 pb-10">
            {entries.length === 0 && (
              <div className="col-span-3 flex min-h-[320px] items-center justify-center border border-dashed border-white/10">
                <div className="text-center">
                  <FolderOpen className="mx-auto text-white/20" size={24} strokeWidth={1.1} />
                  <p className="mt-4 text-sm font-light text-white/45">还没有保存任何世界。</p>
                  <button type="button" onClick={saveCurrent} className="studio-action-link mx-auto mt-4">
                    <Plus size={12} /> 保存当前世界
                  </button>
                </div>
              </div>
            )}

            {entries.map((entry, index) => (
              <article key={entry.id} className="archive-entry group">
                <button type="button" onClick={() => onOpenEntry(entry)} className="block w-full text-left">
                  <ArchivePreview entry={entry} />
                </button>

                <div className="mt-3 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {renamingId === entry.id ? (
                      <div className="flex items-center gap-2 border-b border-white/30 pb-1">
                        <input
                          autoFocus
                          value={renameValue}
                          onChange={(event) => setRenameValue(event.target.value.slice(0, 80))}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") commitRename();
                            if (event.key === "Escape") setRenamingId(null);
                          }}
                          className="min-w-0 flex-1 bg-transparent text-sm font-light text-white outline-none"
                          aria-label="世界标题"
                        />
                        <button type="button" onClick={commitRename} aria-label="保存世界标题">
                          <Check size={13} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenEntry(entry)}
                        className="max-w-full truncate text-left text-sm font-light text-white/80 transition-colors hover:text-white"
                      >
                        {entry.title}
                      </button>
                    )}
                    <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-white/25">
                      {String(index + 1).padStart(2, "0")} · {formatWorldDate(entry.createdAt)} · 演化 {entry.evolutionCount} 次
                    </p>
                    <p className="mt-2 line-clamp-2 text-[10px] font-light leading-relaxed text-white/35">
                      {entry.message}
                    </p>
                  </div>

                  <div className="flex gap-2 text-white/25 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                    <button type="button" onClick={() => beginRename(entry)} aria-label={`重命名 ${entry.title}`} title="重命名">
                      <Pencil size={12} />
                    </button>
                    <button type="button" onClick={() => onDuplicate(entry.id)} aria-label={`复制 ${entry.title}`} title="复制">
                      <Copy size={12} />
                    </button>
                    <button type="button" onClick={() => onExport(entry)} aria-label={`导出 ${entry.title}`} title="导出 JSON">
                      <Download size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`从此浏览器删除“${entry.title}”吗？`)) onDelete(entry.id);
                      }}
                      aria-label={`删除 ${entry.title}`}
                      title="删除"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
