import { useCallback, useEffect, useState } from "react";
import {
  createArchiveEntry,
  createId,
  parseArchiveFile,
  sanitizeArchiveEntry,
  type NexformoArchiveFile,
  type WorldArchiveEntry,
  type WorldSession,
} from "../lib/world";

const ARCHIVE_KEY = "nexformo.world-archive.v2";
const MAX_ARCHIVED_WORLDS = 30;

const loadArchive = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ARCHIVE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(sanitizeArchiveEntry)
      .filter((entry): entry is WorldArchiveEntry => Boolean(entry))
      .slice(0, MAX_ARCHIVED_WORLDS);
  } catch {
    return [];
  }
};

const safeFilename = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "nexformo-world";

export function useWorldArchive() {
  const [entries, setEntries] = useState<WorldArchiveEntry[]>(loadArchive);

  useEffect(() => {
    try {
      window.localStorage.setItem(ARCHIVE_KEY, JSON.stringify(entries));
    } catch {
      // Saving remains optional when browser storage is unavailable.
    }
  }, [entries]);

  const saveSession = useCallback((session: WorldSession) => {
    const entry = createArchiveEntry(session);
    setEntries((previous) => [entry, ...previous].slice(0, MAX_ARCHIVED_WORLDS));
    return entry;
  }, []);

  const renameEntry = useCallback((id: string, title: string) => {
    const cleanTitle = title.trim().slice(0, 80);
    if (!cleanTitle) return;
    setEntries((previous) =>
      previous.map((entry) => (entry.id === id ? { ...entry, title: cleanTitle } : entry)),
    );
  }, []);

  const duplicateEntry = useCallback((id: string) => {
    setEntries((previous) => {
      const source = previous.find((entry) => entry.id === id);
      if (!source) return previous;
      const duplicate: WorldArchiveEntry = {
        ...source,
        id: createId(),
        title: `${source.title} / Copy`,
        createdAt: new Date().toISOString(),
        session: {
          ...source.session,
          id: createId(),
        },
      };
      return [duplicate, ...previous].slice(0, MAX_ARCHIVED_WORLDS);
    });
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((previous) => previous.filter((entry) => entry.id !== id));
  }, []);

  const exportEntry = useCallback((entry: WorldArchiveEntry) => {
    const file: NexformoArchiveFile = {
      kind: "nexformo-world",
      version: 1,
      entry,
    };
    const blob = new Blob([JSON.stringify(file, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${safeFilename(entry.title)}.nexformo.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }, []);

  const importEntry = useCallback((value: unknown) => {
    const entry = parseArchiveFile(value);
    if (!entry) return null;
    setEntries((previous) => [entry, ...previous].slice(0, MAX_ARCHIVED_WORLDS));
    return entry;
  }, []);

  return {
    entries,
    saveSession,
    renameEntry,
    duplicateEntry,
    deleteEntry,
    exportEntry,
    importEntry,
  };
}
