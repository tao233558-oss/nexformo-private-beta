import type { LyricDisplayState, MusicPlaybackStatus } from "../../shared/music";

export type StageContentKind =
  | "playback_error"
  | "needs_selection"
  | "lyrics"
  | "sol_reply"
  | "idle";

const SENTENCE_END = /[。！？!?；;\n]/;

export function createStageReplyExcerpt(rawText: string, maximum = 120) {
  const text = rawText.replace(/\s+/g, " ").trim();
  if (!text) return { text: "", truncated: false };
  const boundedMaximum = Math.max(40, Math.min(160, maximum));
  let sentenceCount = 0;
  let usefulEnd = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (!SENTENCE_END.test(text[index])) continue;
    sentenceCount += 1;
    usefulEnd = index + 1;
    if (sentenceCount >= 2 || usefulEnd >= boundedMaximum * 0.72) break;
  }
  const candidateEnd = usefulEnd > 0 ? usefulEnd : text.length;
  if (candidateEnd <= boundedMaximum && candidateEnd === text.length) {
    return { text, truncated: false };
  }
  if (candidateEnd <= boundedMaximum && sentenceCount > 0) {
    return { text: text.slice(0, candidateEnd), truncated: candidateEnd < text.length };
  }
  const slice = text.slice(0, boundedMaximum);
  const punctuation = Math.max(
    slice.lastIndexOf("。"),
    slice.lastIndexOf("！"),
    slice.lastIndexOf("？"),
    slice.lastIndexOf("，"),
    slice.lastIndexOf("；"),
  );
  const end = punctuation >= Math.floor(boundedMaximum * 0.58) ? punctuation + 1 : boundedMaximum;
  return { text: `${slice.slice(0, end).trimEnd()}…`, truncated: true };
}

export function isStageReplyVisible(
  createdAt: number,
  now: number,
  durationMs = 11_000,
) {
  if (!Number.isFinite(createdAt) || !Number.isFinite(now)) return false;
  return now >= createdAt && now - createdAt < Math.max(0, durationMs);
}

export function resolveStageContentPriority(input: {
  playbackStatus: MusicPlaybackStatus;
  lyricDisplayState: LyricDisplayState | null;
  lyricsVisible: boolean;
  hasStageReply: boolean;
}) : StageContentKind {
  if (input.playbackStatus === "error" || input.lyricDisplayState === "playback_error") {
    return "playback_error";
  }
  if (input.lyricDisplayState === "needs_selection") return "needs_selection";
  if (
    input.lyricsVisible &&
    input.playbackStatus === "playing" &&
    (input.lyricDisplayState === "active" || input.lyricDisplayState === "instrumental_intro")
  ) {
    return "lyrics";
  }
  if (input.hasStageReply) return "sol_reply";
  return "idle";
}

export function shouldCreateEvolutionNodeForTurn(input: {
  localMusicHandled: boolean;
  localPresenceHandled: boolean;
  localWeatherHandled?: boolean;
  localMemoryHandled?: boolean;
}) {
  return !input.localMusicHandled
    && !input.localPresenceHandled
    && !input.localWeatherHandled
    && !input.localMemoryHandled;
}
