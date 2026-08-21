import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";
import OpenAI from "openai";
import { ProxyAgent } from "undici";
import { createServer as createViteServer } from "vite";
import WebSocket, { type RawData } from "ws";
import {
  COMPANION_TURN_JSON_SCHEMA,
  createLocalCompanionDraft,
  createLocalCompanionTurn,
  detectCompanionIntent,
  detectExplicitShape,
  finalizeCompanionTurn,
  sanitizeCompanionDraft,
  sanitizeCompanionSource,
  sanitizeCompanionState,
  shouldUseWebSearch,
  type CompanionMessage,
  type CompanionSource,
  type CompanionTurnRequest,
} from "./shared/companion";
import {
  MUSIC_VERSION_TYPES,
  classifyMusicVersion,
  inferMusicHints,
  normalizeMusicQuery,
  normalizeYouTubeTitle,
  parseIso8601Duration,
  parseLrc,
  scoreLyricsMatchDetailed,
  type LyricCandidateSummary,
  type LyricResult,
  type LyricsMatchCandidate,
  type MusicProviderStatus,
  type MusicSearchResult,
  type MusicVersionType,
} from "./shared/music";
import { sanitizeSolMemoryContext } from "./shared/solMemory";
import {
  DEFAULT_SCENE,
  VISUAL_EVOLUTION_JSON_SCHEMA,
  VISUAL_SCENE_JSON_SCHEMA,
  createFallbackEvolution,
  createFallbackScene,
  sanitizeVisualEvolution,
  sanitizeVisualScene,
  type VisualEvolutionResponse,
  type VisualSceneResponse,
} from "./shared/visualScene";
import {
  constantTimeTextEqual,
  createExpiredPrivateBetaCookie,
  createPrivateBetaCookie,
  createPrivateBetaSession,
  hasValidPrivateBetaSession,
  isRequestOriginAllowed,
  productionContentSecurityPolicy,
  resolvePrivateBetaConfig,
} from "./serverSecurity";

const app = express();
const port = Number(process.env.PORT) || 3000;
const isProduction =
  process.env.NODE_ENV === "production" || process.argv[1]?.endsWith("server.cjs");
const privateBeta = resolvePrivateBetaConfig(process.env, isProduction);

app.disable("x-powered-by");
if (isProduction) app.set("trust proxy", 1);
app.use((_request, response, next) => {
  response.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), geolocation=(), microphone=(self), payment=(), usb=()",
    "Cross-Origin-Opener-Policy": "same-origin",
  });
  if (isProduction) {
    response.set({
      "Content-Security-Policy": productionContentSecurityPolicy(),
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    });
  }
  next();
});
app.use(express.json({ limit: "24kb" }));

const requestWindows = new Map<string, { count: number; resetAt: number }>();

const allowRequest = (
  request: Request,
  limit: number,
  windowMs = 60_000,
  bucket = "general",
) => {
  const now = Date.now();
  if (requestWindows.size > 2_048) {
    for (const [candidateKey, candidate] of requestWindows) {
      if (candidate.resetAt <= now) requestWindows.delete(candidateKey);
    }
  }
  const address = request.ip || request.socket.remoteAddress || "local";
  const key = `${bucket}:${address}`;
  const current = requestWindows.get(key);
  if (!current || current.resetAt <= now) {
    requestWindows.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
};

const getOpenAIApiKey = () => process.env.OPENAI_API_KEY?.trim() ?? "";
const getDeepSeekApiKey = () => process.env.DEEPSEEK_API_KEY?.trim() ?? "";
const getYouTubeApiKey = () => process.env.YOUTUBE_API_KEY?.trim() ?? "";
const getYouTubeProxyUrl = () => process.env.YOUTUBE_PROXY_URL?.trim() ?? "";
const getDoubaoSpeechApiKey = () => process.env.DOUBAO_SPEECH_API_KEY?.trim() ?? "";
const getDoubaoSpeechAppId = () => process.env.DOUBAO_SPEECH_APP_ID?.trim() ?? "";
const getDoubaoVoice = () => process.env.DOUBAO_TTS_VOICE?.trim() ?? "";
const getDoubaoSongAppKey = () => process.env.DOUBAO_SONG_APPKEY?.trim() ?? "";
const getDoubaoSongToken = () => process.env.DOUBAO_SONG_TOKEN?.trim() ?? "";
const getDoubaoSongSpeaker = () =>
  process.env.DOUBAO_SONG_SPEAKER?.trim() || "zh_female_sing_qingxin";
const getDoubaoSongTemplate = () =>
  process.env.DOUBAO_SONG_TEMPLATE?.trim() || "salut_damour-5";
const getDoubaoAsrResourceId = () =>
  process.env.DOUBAO_ASR_RESOURCE_ID?.trim() || "volc.bigasr.sauc.duration";
const getDoubaoTtsResourceId = () =>
  process.env.DOUBAO_TTS_RESOURCE_ID?.trim() || "seed-tts-2.0";
const getOpenAIReasoningModel = () =>
  process.env.OPENAI_REASONING_MODEL?.trim() ||
  process.env.OPENAI_MODEL?.trim() ||
  "gpt-5.6-sol";
const getDeepSeekModel = () => process.env.DEEPSEEK_MODEL?.trim() || "deepseek-v4-flash";

let youtubeProxyAgent: ProxyAgent | null | undefined;

const getYouTubeDispatcher = () => {
  if (youtubeProxyAgent !== undefined) return youtubeProxyAgent ?? undefined;
  const proxyUrl = getYouTubeProxyUrl();
  if (!proxyUrl) {
    youtubeProxyAgent = null;
    return undefined;
  }
  try {
    const parsed = new URL(proxyUrl);
    if (!/^https?:$/.test(parsed.protocol)) throw new Error("unsupported proxy protocol");
    youtubeProxyAgent = new ProxyAgent(proxyUrl);
    return youtubeProxyAgent;
  } catch {
    console.warn("YouTube proxy configuration is invalid; direct connection will be used.");
    youtubeProxyAgent = null;
    return undefined;
  }
};

const createYouTubeFetchInit = (timeoutMs: number) => {
  const dispatcher = getYouTubeDispatcher();
  return {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(timeoutMs),
    ...(dispatcher ? { dispatcher } : {}),
  } as RequestInit;
};

type TextProvider = {
  id: "openai" | "deepseek";
  key: string;
  model: string;
  label: "OpenAI" | "DeepSeek";
};

const getTextProvider = (): TextProvider | null => {
  const requested = process.env.AI_PROVIDER?.trim().toLowerCase();
  const deepSeekKey = getDeepSeekApiKey();
  const openAIKey = getOpenAIApiKey();

  if (requested === "deepseek") {
    return deepSeekKey
      ? { id: "deepseek", key: deepSeekKey, model: getDeepSeekModel(), label: "DeepSeek" }
      : null;
  }
  if (requested === "openai") {
    return openAIKey
      ? { id: "openai", key: openAIKey, model: getOpenAIReasoningModel(), label: "OpenAI" }
      : null;
  }
  if (deepSeekKey) {
    return { id: "deepseek", key: deepSeekKey, model: getDeepSeekModel(), label: "DeepSeek" };
  }
  if (openAIKey) {
    return { id: "openai", key: openAIKey, model: getOpenAIReasoningModel(), label: "OpenAI" };
  }
  return null;
};
const webSearchEnabled = () => process.env.ENABLE_WEB_SEARCH?.trim().toLowerCase() !== "false";
const REALTIME_VOICES = new Set([
  "alloy",
  "ash",
  "ballad",
  "coral",
  "echo",
  "sage",
  "shimmer",
  "verse",
  "marin",
  "cedar",
]);

const noStore = (response: Response) => response.set("Cache-Control", "no-store");

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

class PublicServiceError extends Error {
  constructor(
    readonly code: string,
    readonly httpStatus: number,
    message: string,
  ) {
    super(message);
    this.name = "PublicServiceError";
  }
}

const musicSearchCache = new Map<string, CacheEntry<MusicSearchResult[]>>();
const lyricsCache = new Map<string, CacheEntry<LyricResult>>();
const musicSearchInFlight = new Map<string, Promise<MusicSearchResult[]>>();
const lyricsInFlight = new Map<string, Promise<LyricResult>>();

const getCachedValue = <T>(cache: Map<string, CacheEntry<T>>, key: string) => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    cache.delete(key);
    return null;
  }
  return entry.value;
};

const setCachedValue = <T>(
  cache: Map<string, CacheEntry<T>>,
  key: string,
  value: T,
  ttlMs: number,
  maximumEntries: number,
) => {
  const now = Date.now();
  for (const [candidateKey, entry] of cache) {
    if (entry.expiresAt <= now) cache.delete(candidateKey);
  }
  while (cache.size >= maximumEntries) {
    const oldestKey = cache.keys().next().value as string | undefined;
    if (!oldestKey) break;
    cache.delete(oldestKey);
  }
  cache.set(key, { value, expiresAt: now + ttlMs });
};

const asRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : {};

const safeJson = async (upstream: globalThis.Response) => {
  try {
    return asRecord(await upstream.json());
  } catch {
    return {};
  }
};

const youtubeFailure = (status: number, payload: Record<string, unknown>) => {
  const error = asRecord(payload.error);
  const errors = Array.isArray(error.errors) ? error.errors : [];
  const first = asRecord(errors[0]);
  const reason = typeof first.reason === "string" ? first.reason : "";

  if (/quota|rateLimit/i.test(reason)) {
    return new PublicServiceError(
      "MUSIC_QUOTA_EXCEEDED",
      503,
      "今天的音乐搜索额度暂时用完了，请稍后再试。",
    );
  }
  if (/keyInvalid|accessNotConfigured|forbidden|ipRefererBlocked/i.test(reason) || status === 401) {
    return new PublicServiceError(
      "MUSIC_PROVIDER_CONFIGURATION_ERROR",
      503,
      "YouTube 音乐搜索尚未正确配置。",
    );
  }
  return new PublicServiceError(
    "MUSIC_SEARCH_UNAVAILABLE",
    502,
    "暂时无法连接 YouTube 音乐搜索。",
  );
};

const youtubeThumbnail = (snippet: Record<string, unknown>) => {
  const thumbnails = asRecord(snippet.thumbnails);
  for (const size of ["high", "medium", "default"]) {
    const url = asRecord(thumbnails[size]).url;
    if (typeof url === "string" && /^https:\/\//i.test(url)) return url.slice(0, 1_000);
  }
  return "";
};

const fetchYouTubeSearch = async (query: string, apiKey: string) => {
  const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  searchUrl.searchParams.set("part", "snippet");
  searchUrl.searchParams.set("type", "video");
  searchUrl.searchParams.set("q", query);
  searchUrl.searchParams.set("maxResults", "5");
  searchUrl.searchParams.set("order", "relevance");
  searchUrl.searchParams.set("videoCategoryId", "10");
  searchUrl.searchParams.set("videoEmbeddable", "true");
  searchUrl.searchParams.set("videoSyndicated", "true");
  searchUrl.searchParams.set("relevanceLanguage", "zh-Hans");
  searchUrl.searchParams.set("safeSearch", "moderate");
  searchUrl.searchParams.set("key", apiKey);

  const searchResponse = await fetch(searchUrl, createYouTubeFetchInit(12_000));
  const searchPayload = await safeJson(searchResponse);
  if (!searchResponse.ok) throw youtubeFailure(searchResponse.status, searchPayload);

  const searchItems = Array.isArray(searchPayload.items) ? searchPayload.items : [];
  const candidates = searchItems
    .map((item) => {
      const record = asRecord(item);
      const videoId = asRecord(record.id).videoId;
      const snippet = asRecord(record.snippet);
      if (typeof videoId !== "string" || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) return null;
      const title = typeof snippet.title === "string" ? normalizeMusicQuery(snippet.title) : "";
      if (!title) return null;
      return {
        videoId,
        title,
        artist:
          typeof snippet.channelTitle === "string"
            ? normalizeMusicQuery(snippet.channelTitle).slice(0, 160)
            : "",
        thumbnail: youtubeThumbnail(snippet),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  if (!candidates.length) return [];

  const detailsUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
  detailsUrl.searchParams.set("part", "contentDetails,status");
  detailsUrl.searchParams.set("id", candidates.map((item) => item.videoId).join(","));
  detailsUrl.searchParams.set("key", apiKey);
  const detailsResponse = await fetch(detailsUrl, createYouTubeFetchInit(10_000));
  const detailsPayload = await safeJson(detailsResponse);
  if (!detailsResponse.ok) throw youtubeFailure(detailsResponse.status, detailsPayload);

  const details = new Map<string, { durationSeconds: number | null; embeddable: boolean }>();
  const detailItems = Array.isArray(detailsPayload.items) ? detailsPayload.items : [];
  for (const item of detailItems) {
    const record = asRecord(item);
    const id = typeof record.id === "string" ? record.id : "";
    const status = asRecord(record.status);
    const contentDetails = asRecord(record.contentDetails);
    if (!id) continue;
    details.set(id, {
      durationSeconds:
        typeof contentDetails.duration === "string"
          ? parseIso8601Duration(contentDetails.duration)
          : null,
      embeddable: status.embeddable === true && status.privacyStatus === "public",
    });
  }

  const queryHints = inferMusicHints(query);
  return candidates
    .filter((item) => details.get(item.videoId)?.embeddable)
    .map<MusicSearchResult>((item) => {
      const titleHints = inferMusicHints(normalizeYouTubeTitle(item.title));
      return {
        ...item,
        durationSeconds: details.get(item.videoId)?.durationSeconds ?? null,
        provider: "youtube",
        version: classifyMusicVersion(item.title, item.artist),
        trackHint:
          queryHints.trackHint || titleHints.trackHint || normalizeYouTubeTitle(item.title),
        artistHint: queryHints.artistHint || titleHints.artistHint || "",
      };
    })
    .slice(0, 5);
};

const searchYouTubeMusic = async (query: string, apiKey: string) => {
  const cacheKey = query.toLocaleLowerCase();
  const cached = getCachedValue(musicSearchCache, cacheKey);
  if (cached) return cached;
  const existing = musicSearchInFlight.get(cacheKey);
  if (existing) return existing;

  const pending = fetchYouTubeSearch(query, apiKey)
    .then((results) => {
      setCachedValue(musicSearchCache, cacheKey, results, 12 * 60_000, 100);
      return results;
    })
    .finally(() => musicSearchInFlight.delete(cacheKey));
  musicSearchInFlight.set(cacheKey, pending);
  return pending;
};

let lrclibQueue: Promise<void> = Promise.resolve();
let lastLrclibRequestAt = 0;

const runLrclibRequest = <T>(task: () => Promise<T>) => {
  const pending = lrclibQueue
    .catch(() => undefined)
    .then(async () => {
      const waitMs = Math.max(0, 250 - (Date.now() - lastLrclibRequestAt));
      if (waitMs) await new Promise<void>((resolve) => setTimeout(resolve, waitMs));
      lastLrclibRequestAt = Date.now();
      return task();
    });
  lrclibQueue = pending.then(
    () => undefined,
    () => undefined,
  );
  return pending;
};

const fetchLrclibCandidates = (trackName: string, artistName: string) =>
  runLrclibRequest(async () => {
    const endpoint = new URL("https://lrclib.net/api/search");
    endpoint.searchParams.set("track_name", trackName);
    if (artistName) endpoint.searchParams.set("artist_name", artistName);
    const upstream = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Nexformo/1.0 (local Nexformo Living Canvas)",
        "Lrclib-Client": "Nexformo/1.0",
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (upstream.status === 404) return [];
    if (upstream.status === 429) {
      throw new PublicServiceError(
        "LYRICS_RATE_LIMITED",
        429,
        "歌词查询得太频繁了，请稍后再试。",
      );
    }
    if (!upstream.ok) {
      throw new PublicServiceError(
        "LYRICS_UNAVAILABLE",
        502,
        "暂时无法连接同步歌词服务。",
      );
    }
    const payload = (await upstream.json()) as unknown;
    return Array.isArray(payload) ? payload.slice(0, 20).map(asRecord) : [];
  });

type RankedLyricCandidate = {
  candidate: Record<string, unknown>;
  details: ReturnType<typeof scoreLyricsMatchDetailed>;
};

const lyricCandidateId = (candidate: Record<string, unknown>) => {
  const rawId = candidate.id;
  if (typeof rawId === "number" && Number.isFinite(rawId)) return String(Math.floor(rawId));
  if (typeof rawId === "string" && /^[A-Za-z0-9_-]{1,80}$/.test(rawId)) return rawId;
  const identity = [candidate.trackName, candidate.artistName, candidate.albumName, candidate.duration]
    .map((value) => (typeof value === "string" || typeof value === "number" ? String(value) : ""))
    .join("\u0000");
  return createHash("sha256").update(identity).digest("hex").slice(0, 20);
};

const lyricCandidateKind = (
  candidate: Record<string, unknown>,
): LyricCandidateSummary["kind"] => {
  if (typeof candidate.syncedLyrics === "string" && candidate.syncedLyrics.trim()) return "synced";
  if (typeof candidate.plainLyrics === "string" && candidate.plainLyrics.trim()) return "plain";
  if (candidate.instrumental === true) return "instrumental";
  return "none";
};

const createLyricCandidateSummary = (
  ranked: RankedLyricCandidate,
  recommendedId: string,
): LyricCandidateSummary => {
  const candidate = ranked.candidate;
  const rawDuration =
    typeof candidate.duration === "number" ? candidate.duration : Number(candidate.duration);
  return {
    lyricId: lyricCandidateId(candidate),
    trackName:
      typeof candidate.trackName === "string"
        ? normalizeMusicQuery(candidate.trackName).slice(0, 200)
        : "未知歌曲",
    artistName:
      typeof candidate.artistName === "string"
        ? normalizeMusicQuery(candidate.artistName).slice(0, 160)
        : "未知音乐人",
    durationSeconds: Number.isFinite(rawDuration) ? Math.max(0, rawDuration) : null,
    kind: lyricCandidateKind(candidate),
    matchedVersion: ranked.details.matchedVersion,
    confidence: ranked.details.confidence,
    confidenceLabel: ranked.details.confidenceLabel,
    durationDifference: ranked.details.durationDifference,
    recommended: lyricCandidateId(candidate) === recommendedId,
  };
};

const emptyLyrics = (
  trackName: string,
  artistName: string,
  requestedVersion: MusicVersionType,
  candidates: LyricCandidateSummary[] = [],
  requiresSelection = false,
): LyricResult => ({
  provider: "lrclib",
  kind: "none",
  trackName,
  artistName,
  durationSeconds: null,
  lines: [],
  plainLyrics: "",
  lyricId: "",
  source: "lrclib",
  confidence: 0,
  confidenceLabel: "低",
  matchedVersion: "unknown",
  requestedVersion,
  durationDifference: null,
  requiresSelection,
  candidates,
  appliedOffsetSeconds: 0,
  notice: requiresSelection ? "找到多个可能版本，请选择正确的歌词。" : "暂未找到可靠的同步歌词",
});

const createLyricResult = (
  ranked: RankedLyricCandidate | null,
  trackName: string,
  artistName: string,
  requestedVersion: MusicVersionType,
  candidates: LyricCandidateSummary[],
  requiresSelection: boolean,
): LyricResult => {
  if (!ranked) {
    return emptyLyrics(trackName, artistName, requestedVersion, candidates, requiresSelection);
  }
  const candidate = ranked.candidate;
  const resolvedTrack =
    typeof candidate.trackName === "string"
      ? normalizeMusicQuery(candidate.trackName).slice(0, 200)
      : trackName;
  const resolvedArtist =
    typeof candidate.artistName === "string"
      ? normalizeMusicQuery(candidate.artistName).slice(0, 160)
      : artistName;
  const rawDuration =
    typeof candidate.duration === "number" ? candidate.duration : Number(candidate.duration);
  const durationSeconds = Number.isFinite(rawDuration) ? Math.max(0, rawDuration) : null;
  const syncedLyrics =
    typeof candidate.syncedLyrics === "string" ? candidate.syncedLyrics.slice(0, 200_000) : "";
  const lines = parseLrc(syncedLyrics).slice(0, 2_500);
  const plainLyrics =
    typeof candidate.plainLyrics === "string"
      ? candidate.plainLyrics.trim().slice(0, 120_000)
      : "";

  const metadata = {
    lyricId: lyricCandidateId(candidate),
    source: "lrclib" as const,
    confidence: ranked.details.confidence,
    confidenceLabel: ranked.details.confidenceLabel,
    matchedVersion: ranked.details.matchedVersion,
    requestedVersion,
    durationDifference: ranked.details.durationDifference,
    requiresSelection,
    candidates,
    appliedOffsetSeconds: 0,
  };

  if (lines.length) {
    return {
      provider: "lrclib",
      kind: "synced",
      trackName: resolvedTrack,
      artistName: resolvedArtist,
      durationSeconds,
      lines,
      plainLyrics,
      ...metadata,
    };
  }
  if (plainLyrics) {
    return {
      provider: "lrclib",
      kind: "plain",
      trackName: resolvedTrack,
      artistName: resolvedArtist,
      durationSeconds,
      lines: [],
      plainLyrics,
      ...metadata,
      notice: "已找到普通歌词，但它没有时间轴。",
    };
  }
  if (candidate.instrumental === true) {
    return {
      provider: "lrclib",
      kind: "instrumental",
      trackName: resolvedTrack,
      artistName: resolvedArtist,
      durationSeconds,
      lines: [],
      plainLyrics: "",
      ...metadata,
      notice: "这首音乐被标记为纯音乐。",
    };
  }
  return emptyLyrics(resolvedTrack, resolvedArtist, requestedVersion, candidates, requiresSelection);
};

const searchLyrics = async (
  trackName: string,
  artistName: string,
  durationSeconds: number | null,
  requestedVersion: MusicVersionType,
  selectedLyricId: string,
) => {
  const cacheKey = `${trackName.toLocaleLowerCase()}\u0000${artistName.toLocaleLowerCase()}\u0000${durationSeconds ?? ""}\u0000${requestedVersion}\u0000${selectedLyricId}`;
  const cached = getCachedValue(lyricsCache, cacheKey);
  if (cached) return cached;
  const existing = lyricsInFlight.get(cacheKey);
  if (existing) return existing;

  const pending = (async () => {
    let rawCandidates = await fetchLrclibCandidates(trackName, artistName);
    let ranked: RankedLyricCandidate[] = rawCandidates
      .map((candidate) => ({
        candidate,
        details: scoreLyricsMatchDetailed(candidate as LyricsMatchCandidate, {
          track: trackName,
          artist: artistName,
          durationSeconds,
          requestedVersion,
        }),
      }))
      .sort((left, right) => right.details.score - left.details.score);

    if (
      (!ranked.length ||
        ranked[0].details.confidence < 0.58 ||
        (selectedLyricId &&
          !ranked.some((entry) => lyricCandidateId(entry.candidate) === selectedLyricId))) &&
      artistName
    ) {
      const fallbackCandidates = await fetchLrclibCandidates(trackName, "");
      const deduplicated = new Map<string, Record<string, unknown>>();
      for (const candidate of [...rawCandidates, ...fallbackCandidates]) {
        deduplicated.set(lyricCandidateId(candidate), candidate);
      }
      rawCandidates = [...deduplicated.values()];
      ranked = rawCandidates
        .map((candidate) => ({
          candidate,
          details: scoreLyricsMatchDetailed(candidate as LyricsMatchCandidate, {
            track: trackName,
            artist: artistName,
            durationSeconds,
            requestedVersion,
          }),
        }))
        .sort((left, right) => right.details.score - left.details.score);
    }

    const explicit = selectedLyricId
      ? ranked.find((entry) => lyricCandidateId(entry.candidate) === selectedLyricId) ?? null
      : null;
    const safeRanked = ranked.filter(
      (entry) => !entry.details.rejected && entry.details.confidence >= 0.68,
    );
    const best = explicit ?? safeRanked[0] ?? null;
    const recommendedId = safeRanked[0] ? lyricCandidateId(safeRanked[0].candidate) : "";
    const summaries = ranked
      .filter((entry) => lyricCandidateKind(entry.candidate) !== "none")
      .slice(0, 5)
      .map((entry) => createLyricCandidateSummary(entry, recommendedId));
    const second = safeRanked[1];
    const ambiguous = Boolean(
      !selectedLyricId &&
        best &&
        second &&
        Math.abs(best.details.score - second.details.score) <= 3 &&
        best.details.matchedVersion !== second.details.matchedVersion,
    );
    const requiresSelection = Boolean(
      !selectedLyricId && (ambiguous || (!best && summaries.length > 0)),
    );
    const result = createLyricResult(
      requiresSelection ? null : best,
      trackName,
      artistName,
      requestedVersion,
      summaries,
      requiresSelection,
    );
    setCachedValue(
      lyricsCache,
      cacheKey,
      result,
      result.kind === "none" ? 30 * 60_000 : 24 * 60 * 60_000,
      240,
    );
    return result;
  })().finally(() => lyricsInFlight.delete(cacheKey));

  lyricsInFlight.set(cacheKey, pending);
  return pending;
};

const sendPublicServiceError = (response: Response, error: unknown, service: "music" | "lyrics") => {
  if (error instanceof PublicServiceError) {
    noStore(response).status(error.httpStatus).json({
      success: false,
      code: error.code,
      error: error.message,
    });
    return;
  }
  const timedOut = error instanceof Error && error.name === "TimeoutError";
  console.warn(`${service} provider request failed: ${timedOut ? "timeout" : "unexpected error"}`);
  noStore(response).status(502).json({
    success: false,
    code: service === "music" ? "MUSIC_SEARCH_UNAVAILABLE" : "LYRICS_UNAVAILABLE",
    error:
      service === "music"
        ? "暂时无法连接 YouTube 音乐搜索。"
        : "暂时无法连接同步歌词服务。",
  });
};

const parseConcatenatedJson = (raw: string) => {
  const values: Array<Record<string, unknown>> = [];
  let start = -1;
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = 0; index < raw.length; index += 1) {
    const character = raw[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') {
      inString = true;
      continue;
    }
    if (character === "{") {
      if (depth === 0) start = index;
      depth += 1;
      continue;
    }
    if (character !== "}" || depth === 0) continue;
    depth -= 1;
    if (depth !== 0 || start < 0) continue;
    try {
      const value = JSON.parse(raw.slice(start, index + 1)) as unknown;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        values.push(value as Record<string, unknown>);
      }
    } catch {
      // A malformed upstream frame is ignored; valid audio frames remain usable.
    }
    start = -1;
  }
  return values;
};

const buildDoubaoAsrHeader = (
  messageType: number,
  flags: number,
  serialization: number,
  compression: number,
) => {
  const header = Buffer.alloc(4);
  header[0] = 0x11;
  header[1] = ((messageType & 0xf) << 4) | (flags & 0xf);
  header[2] = ((serialization & 0xf) << 4) | (compression & 0xf);
  return header;
};

const buildDoubaoAsrPacket = (header: Buffer, payload: Buffer) => {
  const size = Buffer.alloc(4);
  size.writeUInt32BE(payload.length);
  return Buffer.concat([header, size, payload]);
};

const extractWavPcm = (wav: Buffer) => {
  if (wav.length < 44 || wav.subarray(0, 4).toString("ascii") !== "RIFF") return wav;
  for (let offset = 12; offset + 8 <= wav.length; ) {
    const chunkName = wav.subarray(offset, offset + 4).toString("ascii");
    const chunkSize = wav.readUInt32LE(offset + 4);
    if (chunkName === "data") return wav.subarray(offset + 8, offset + 8 + chunkSize);
    offset += 8 + chunkSize + (chunkSize % 2);
  }
  return wav.subarray(44);
};

const rawWebSocketDataToBuffer = (raw: RawData) => {
  if (Buffer.isBuffer(raw)) return raw;
  if (Array.isArray(raw)) return Buffer.concat(raw);
  return Buffer.from(raw);
};

const transcribeDoubaoStreaming = (wav: Buffer) =>
  new Promise<string>((resolve, reject) => {
    const requestId = randomUUID();
    const socket = new WebSocket(
      "wss://openspeech.bytedance.com/api/v3/sauc/bigmodel_nostream",
      {
        headers: {
          "X-Api-Key": getDoubaoSpeechApiKey(),
          "X-Api-Resource-Id": getDoubaoAsrResourceId(),
          "X-Api-Connect-Id": requestId,
        },
      },
    );
    let settled = false;
    const timeout = setTimeout(() => finish(new Error("豆包识别等待超时。")), 24_000);

    const finish = (error?: Error, transcript = "") => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      try {
        socket.close();
      } catch {
        // The socket may already be closed after a final response.
      }
      if (error) reject(error);
      else resolve(transcript);
    };

    socket.on("open", () => {
      const configuration = Buffer.from(
        JSON.stringify({
          user: { uid: getDoubaoSpeechAppId() || "nexformo-web" },
          audio: { format: "pcm", rate: 16_000, bits: 16, channel: 1 },
          request: {
            model_name: "bigmodel",
            enable_itn: true,
            enable_punc: true,
            enable_ddc: true,
          },
        }),
      );
      socket.send(
        buildDoubaoAsrPacket(
          buildDoubaoAsrHeader(0x1, 0x0, 0x1, 0x1),
          gzipSync(configuration),
        ),
      );

      const pcm = extractWavPcm(wav);
      const chunkSize = 6_400;
      for (let offset = 0; offset < pcm.length; offset += chunkSize) {
        const isLast = offset + chunkSize >= pcm.length;
        const chunk = pcm.subarray(offset, Math.min(offset + chunkSize, pcm.length));
        socket.send(
          buildDoubaoAsrPacket(
            buildDoubaoAsrHeader(0x2, isLast ? 0x2 : 0x0, 0x0, 0x1),
            gzipSync(chunk),
          ),
        );
      }
    });

    socket.on("message", (raw) => {
      const message = rawWebSocketDataToBuffer(raw);
      if (message.length < 4) return;
      const messageType = (message[1] >> 4) & 0xf;
      const flags = message[1] & 0xf;
      const compression = message[2] & 0xf;
      if (messageType === 0xf) {
        const code = message.length >= 8 ? message.readUInt32BE(4) : 0;
        finish(new Error(`豆包识别服务错误（${code || "未知"}）。`));
        return;
      }
      if (messageType !== 0x9 || !(flags & 0x2)) return;

      let offset = 4;
      if (flags & 0x1) offset += 4;
      if (offset + 4 > message.length) return;
      const payloadSize = message.readUInt32BE(offset);
      offset += 4;
      if (offset + payloadSize > message.length) return;
      let payload = message.subarray(offset, offset + payloadSize);
      if (compression === 1) payload = gunzipSync(payload);
      try {
        const parsed = JSON.parse(payload.toString("utf8")) as Record<string, unknown>;
        const result =
          parsed.result && typeof parsed.result === "object"
            ? (parsed.result as Record<string, unknown>)
            : null;
        const transcript = typeof result?.text === "string" ? result.text.trim().slice(0, 500) : "";
        finish(undefined, transcript);
      } catch {
        finish(new Error("豆包识别结果无法解析。"));
      }
    });
    socket.on("unexpected-response", (_request, response) => {
      finish(new Error(`豆包识别连接被拒绝（HTTP ${response.statusCode}）。`));
    });
    socket.on("error", (error) => finish(new Error(`豆包识别连接失败：${error.message}`)));
    socket.on("close", () => {
      if (!settled) finish(new Error("豆包识别连接意外结束。"));
    });
  });

const safeHistory = (value: unknown): Array<Pick<CompanionMessage, "role" | "text">> => {
  if (!Array.isArray(value)) return [];
  return value
    .slice(-16)
    .map((item: unknown) => {
      const candidate =
        item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      return {
        role: candidate.role === "assistant" ? ("assistant" as const) : ("user" as const),
        text: typeof candidate.text === "string" ? candidate.text.trim().slice(0, 1000) : "",
      };
    })
    .filter((item) => item.text);
};

const extractWebSources = (value: unknown) => {
  const sources: CompanionSource[] = [];
  const seenObjects = new Set<object>();
  const seenUrls = new Set<string>();

  const visit = (candidate: unknown, depth: number) => {
    if (depth > 9 || sources.length >= 6 || !candidate || typeof candidate !== "object") return;
    if (seenObjects.has(candidate)) return;
    seenObjects.add(candidate);
    if (Array.isArray(candidate)) {
      for (const item of candidate) visit(item, depth + 1);
      return;
    }

    const record = candidate as Record<string, unknown>;
    if (typeof record.url === "string") {
      const source = sanitizeCompanionSource({ title: record.title, url: record.url });
      if (source && !seenUrls.has(source.url)) {
        seenUrls.add(source.url);
        sources.push(source);
      }
    }
    for (const nested of Object.values(record)) visit(nested, depth + 1);
  };

  visit(value, 0);
  return sources;
};

const responseUsedWebSearch = (value: unknown) => {
  const seen = new Set<object>();
  const visit = (candidate: unknown, depth: number): boolean => {
    if (depth > 9 || !candidate || typeof candidate !== "object" || seen.has(candidate)) return false;
    seen.add(candidate);
    if (Array.isArray(candidate)) return candidate.some((item) => visit(item, depth + 1));
    const record = candidate as Record<string, unknown>;
    if (
      record.type === "web_search_call" ||
      record.type === "web_search_tool_result" ||
      (record.type === "server_tool_use" && record.name === "web_search")
    ) {
      return true;
    }
    return Object.values(record).some((item) => visit(item, depth + 1));
  };
  return visit(value, 0);
};

const searchWithDeepSeek = async (provider: TextProvider, message: string) => {
  const upstream = await fetch("https://api.deepseek.com/anthropic/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": provider.key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: provider.model,
      max_tokens: 1_800,
      system:
        "You are the live web sense of Nexformo. Search the web before answering. Give an accurate, useful answer in natural Simplified Chinese, keep source citations, distinguish facts from uncertainty, and do not invent details.",
      messages: [{ role: "user", content: message }],
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }],
    }),
    signal: AbortSignal.timeout(36_000),
  });
  const payload = (await upstream.json()) as Record<string, unknown>;
  if (!upstream.ok) {
    const error = payload.error && typeof payload.error === "object"
      ? (payload.error as Record<string, unknown>)
      : {};
    throw new Error(
      typeof error.message === "string" ? error.message : "DeepSeek web search was rejected.",
    );
  }
  const content = Array.isArray(payload.content) ? payload.content : [];
  const text = content
    .map((item) => {
      const block = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      return block.type === "text" && typeof block.text === "string" ? block.text.trim() : "";
    })
    .filter(Boolean)
    .join("\n\n")
    .trim();
  const webUsed = responseUsedWebSearch(payload);
  if (!text || !webUsed) {
    throw new Error("DeepSeek web search did not return grounded current information.");
  }
  return { text, webUsed, sources: extractWebSources(payload) };
};

const mayNeedModelWebDecision = (message: string) => {
  const normalized = message.trim();
  const personalAdvice =
    /(?:我|我的|自己|i\b|my\b).{0,18}(?:心情|感觉|累|难过|焦虑|开心|建议|怎么办|怎么安排|feel|tired|sad|anxious|advice|should i)/i.test(
      normalized,
    );
  if (personalAdvice) return false;
  return (
    /[?？]/.test(normalized) ||
    /^(who|what|when|where|why|how|is|are|was|were|tell me|can you tell me|谁|什么|何时|哪里|为什么|如何|怎么|告诉我|介绍一下)/i.test(
      normalized,
    )
  );
};

const WEB_DECISION_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    needsWeb: { type: "boolean" },
    justification: { type: "string" },
  },
  required: ["needsWeb", "justification"],
} as const;

type StructuredJsonRequest = {
  provider: TextProvider;
  system: string;
  user: string;
  schema: object;
  name: string;
  description: string;
  maxOutputTokens: number;
  reasoningEffort: "none" | "low";
  timeoutMs?: number;
};

const parseJsonOnly = (value: string) => {
  const trimmed = value.trim();
  const withoutFence = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  return JSON.parse(withoutFence) as unknown;
};

const createStructuredJson = async ({
  provider,
  system,
  user,
  schema,
  name,
  description,
  maxOutputTokens,
  reasoningEffort,
  timeoutMs = 24_000,
}: StructuredJsonRequest) => {
  if (provider.id === "deepseek") {
    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${provider.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: provider.model,
        messages: [
          {
            role: "system",
            content: `${system}\nReturn only valid JSON matching this JSON Schema: ${JSON.stringify(schema)}`,
          },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
        thinking: { type: "disabled" },
        max_tokens: maxOutputTokens,
        stream: false,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    const payload = (await upstream.json()) as Record<string, unknown>;
    if (!upstream.ok) throw new Error(`DeepSeek request failed with status ${upstream.status}.`);
    const choices = Array.isArray(payload.choices) ? payload.choices : [];
    const first = choices[0] && typeof choices[0] === "object"
      ? (choices[0] as Record<string, unknown>)
      : {};
    const message = first.message && typeof first.message === "object"
      ? (first.message as Record<string, unknown>)
      : {};
    if (typeof message.content !== "string" || !message.content.trim()) {
      throw new Error("DeepSeek returned no structured content.");
    }
    return parseJsonOnly(message.content);
  }

  const openai = new OpenAI({ apiKey: provider.key });
  const result = await openai.responses.create(
    {
      model: provider.model,
      reasoning: { effort: reasoningEffort },
      max_output_tokens: maxOutputTokens,
      input: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      text: {
        format: {
          type: "json_schema",
          name,
          description,
          strict: true,
          schema: schema as Record<string, unknown>,
        },
      },
    },
    { signal: AbortSignal.timeout(timeoutMs) },
  );
  return parseJsonOnly(result.output_text);
};

app.use("/api", (request: Request, response: Response, next: NextFunction) => {
  const allowed = isRequestOriginAllowed({
    method: request.method,
    origin: request.get("origin"),
    publicOrigin: privateBeta.publicOrigin,
    host: request.get("host"),
    forwardedProto: request.get("x-forwarded-proto"),
    encrypted: request.secure,
    production: isProduction,
  });
  if (!allowed) {
    noStore(response).status(403).json({
      success: false,
      code: "ORIGIN_NOT_ALLOWED",
      error: "请求来源不受信任。",
    });
    return;
  }
  next();
});

app.get("/api/health", (_request: Request, response: Response) => {
  const textProviderReady = Boolean(getDeepSeekApiKey() || getOpenAIApiKey());
  const doubaoSpeechReady = Boolean(getDoubaoSpeechApiKey() && getDoubaoVoice());
  const build = (process.env.APP_BUILD_ID?.trim() || "private-beta")
    .replace(/[^A-Za-z0-9._-]/g, "-")
    .slice(0, 64);
  noStore(response).json({
    status: "ok",
    version: "1.0.0",
    build,
    mode: isProduction ? "production" : "development",
    betaGateEnabled: privateBeta.enabled,
    providers: {
      companion: textProviderReady,
      webSearch: textProviderReady && webSearchEnabled(),
      youtubeSearch: Boolean(getYouTubeApiKey()),
      youtubePlayback: true,
      lyrics: true,
      doubaoSpeech: doubaoSpeechReady,
      doubaoSong: Boolean(getDoubaoSongAppKey() && getDoubaoSongToken()),
      openAIRealtime: Boolean(getOpenAIApiKey()),
    },
  });
});

app.get("/api/beta/status", (request: Request, response: Response) => {
  noStore(response).json({
    enabled: privateBeta.enabled,
    available: privateBeta.configured,
    authenticated: hasValidPrivateBetaSession(request.get("cookie"), privateBeta),
  });
});

app.post("/api/beta/access", (request: Request, response: Response) => {
  if (!privateBeta.enabled) {
    noStore(response).json({ success: true, enabled: false });
    return;
  }
  const code = typeof request.body?.code === "string" ? request.body.code.trim() : "";
  if (
    !privateBeta.configured ||
    !code ||
    code.length > 256 ||
    !constantTimeTextEqual(code, privateBeta.accessCode)
  ) {
    noStore(response).status(privateBeta.configured ? 401 : 503).json({
      success: false,
      code: privateBeta.configured ? "BETA_CODE_INVALID" : "BETA_GATE_UNAVAILABLE",
      error: privateBeta.configured
        ? "邀请码不正确，请重新输入。"
        : "私测入口暂时不可用，请联系邀请人。",
    });
    return;
  }

  const token = createPrivateBetaSession(privateBeta.sessionSecret);
  response.setHeader("Set-Cookie", createPrivateBetaCookie(token, privateBeta.secureCookie));
  noStore(response).json({ success: true, enabled: true });
});

app.post("/api/beta/logout", (_request: Request, response: Response) => {
  response.setHeader("Set-Cookie", createExpiredPrivateBetaCookie(privateBeta.secureCookie));
  noStore(response).json({ success: true });
});

app.use("/api", (request: Request, response: Response, next: NextFunction) => {
  if (hasValidPrivateBetaSession(request.get("cookie"), privateBeta)) {
    next();
    return;
  }
  noStore(response).status(401).json({
    success: false,
    code: "BETA_ACCESS_REQUIRED",
    error: "需要有效的私测邀请才能使用在线能力。",
  });
});

app.post("/api/visual-scene", async (request: Request, response: Response) => {
  const prompt = typeof request.body?.prompt === "string" ? request.body.prompt.trim() : "";

  if (!prompt || prompt.length > 500) {
    response.status(400).json({
      success: false,
      error: "请用 1 到 500 个字符描述一个世界。",
    });
    return;
  }

  const fallback = createFallbackScene(prompt);
  const localResponse: VisualSceneResponse = {
    scene: fallback,
    source: "local",
    notice: "本地创意引擎已启用",
  };
  const provider = getTextProvider();

  if (!provider) {
    response.set("Cache-Control", "no-store");
    response.json(localResponse);
    return;
  }

  try {
    const parsed = await createStructuredJson({
      provider,
      system:
        "You are the visual intelligence inside Nexformo Living Canvas. Translate a visitor's imaginative prompt into one restrained, premium particle-art direction. Write the user-facing message in Simplified Chinese. Keep JSON keys and enum values unchanged. Use valid six-digit hex colors. Keep the message poetic and concrete. Prefer dark foundations with luminous accents. Return only the requested structured scene.",
      user: prompt,
      schema: VISUAL_SCENE_JSON_SCHEMA,
      name: "nexformo_visual_scene",
      description: "A bounded configuration for the Nexformo real-time particle engine.",
      maxOutputTokens: 320,
      reasoningEffort: "none",
    });

    const payload: VisualSceneResponse = {
      scene: sanitizeVisualScene(parsed, fallback),
      source: provider.id,
      notice: `${provider.label} 在线解析已启用`,
    };

    response.set("Cache-Control", "no-store");
    response.json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown AI provider error";
    console.warn(`Visual scene generation fell back locally: ${message}`);
    response.set("Cache-Control", "no-store");
    response.json(localResponse);
  }
});

app.post("/api/evolve-world", async (request: Request, response: Response) => {
  const instruction =
    typeof request.body?.instruction === "string" ? request.body.instruction.trim() : "";
  const currentSceneValue = request.body?.currentScene;

  if (!instruction || instruction.length > 500) {
    response.status(400).json({
      success: false,
      error: "请用 1 到 500 个字符描述世界如何演化。",
    });
    return;
  }

  if (!currentSceneValue || typeof currentSceneValue !== "object") {
    response.status(400).json({
      success: false,
      error: "需要提供当前视觉场景。",
    });
    return;
  }

  const currentScene = sanitizeVisualScene(currentSceneValue, DEFAULT_SCENE);
  const history = Array.isArray(request.body?.history)
    ? request.body.history.slice(-12).map((item: unknown) => {
        const entry = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
        return {
          title: typeof entry.title === "string" ? entry.title.slice(0, 80) : "Untitled state",
          instruction:
            typeof entry.instruction === "string" ? entry.instruction.slice(0, 240) : "",
          explanation:
            typeof entry.explanation === "string" ? entry.explanation.slice(0, 240) : "",
        };
      })
    : [];
  const fallback = createFallbackEvolution(instruction, currentScene);
  const localResponse: VisualEvolutionResponse = {
    evolution: fallback,
    source: "local",
    notice: "本地创意引擎已启用",
  };
  const provider = getTextProvider();

  if (!provider) {
    response.set("Cache-Control", "no-store");
    response.json(localResponse);
    return;
  }

  try {
    const parsed = await createStructuredJson({
      provider,
      system:
        "You are the visual intelligence inside Nexformo Living World Studio. Evolve an existing real-time particle artwork in response to a short creative instruction. Write title, scene.message, explanation, and all suggestions in Simplified Chinese. Keep JSON keys and enum values unchanged. Preserve conceptual continuity while making the change visually legible. Use valid six-digit hex colors. The scene message must be poetic. The title must be short. The explanation must clearly summarize what changed. Return exactly three concise suggested next instructions. Return only the requested structured data.",
      user: JSON.stringify({ instruction, currentScene, recentEvolutionHistory: history }),
      schema: VISUAL_EVOLUTION_JSON_SCHEMA,
      name: "nexformo_world_evolution",
      description: "A complete, bounded evolution of a Nexformo particle world.",
      maxOutputTokens: 650,
      reasoningEffort: "none",
    });

    const payload: VisualEvolutionResponse = {
      evolution: sanitizeVisualEvolution(parsed, fallback),
      source: provider.id,
      notice: `${provider.label} 在线演化已启用`,
    };

    response.set("Cache-Control", "no-store");
    response.json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown AI provider error";
    console.warn(`World evolution fell back locally: ${message}`);
    response.set("Cache-Control", "no-store");
    response.json(localResponse);
  }
});

app.post("/api/companion-turn", async (request: Request, response: Response) => {
  if (!allowRequest(request, 24)) {
    noStore(response).status(429).json({
      success: false,
      error: "朋友需要稍作停顿，请稍后再试。",
    });
    return;
  }

  const message = typeof request.body?.message === "string" ? request.body.message.trim() : "";
  if (!message || message.length > 500) {
    noStore(response).status(400).json({
      success: false,
      error: "请用 1 到 500 个字符与朋友对话。",
    });
    return;
  }
  if (!request.body?.currentScene || typeof request.body.currentScene !== "object") {
    noStore(response).status(400).json({ success: false, error: "需要提供当前场景。" });
    return;
  }

  const currentScene = sanitizeVisualScene(request.body.currentScene, DEFAULT_SCENE);
  const companionState = sanitizeCompanionState(request.body?.companionState);
  const turnRequest: CompanionTurnRequest = {
    message,
    mode: request.body?.mode === "voice" ? "voice" : "text",
    proactive: request.body?.proactive === true,
    currentScene,
    companionState,
    history: safeHistory(request.body?.history),
    memoryContext: sanitizeSolMemoryContext(request.body?.memoryContext),
  };
  const localResponse = createLocalCompanionTurn(turnRequest);
  const provider = getTextProvider();

  if (!provider) {
    noStore(response).json(localResponse);
    return;
  }

  let requestedWeb = !turnRequest.proactive && shouldUseWebSearch(message);

  try {
    if (!requestedWeb && mayNeedModelWebDecision(message)) {
      try {
        const decision = (await createStructuredJson({
          provider,
          system:
            "Decide whether this user message requires current external information for an accurate answer. Use needsWeb=true only for facts that may have changed, live events, current people or roles, prices, schedules, weather, news, or explicit verification. Use false for emotional conversation, personal reflection, creative requests, particle shapes, and questions about Nexformo's simulated mood. Give a brief justification. Return only the requested structured data.",
          user: message,
          schema: WEB_DECISION_JSON_SCHEMA,
          name: "nexformo_web_decision",
          description: "A conservative decision about whether live web search is required.",
          maxOutputTokens: 180,
          reasoningEffort: "low",
          timeoutMs: 12_000,
        })) as Record<string, unknown>;
        requestedWeb = decision.needsWeb === true;
      } catch {
        requestedWeb = false;
      }
    }

    if (requestedWeb && !webSearchEnabled()) {
      noStore(response).json({
        ...localResponse,
        displayReply: "联网感知目前已关闭。我仍然可以陪你对话和改变形态。",
        spokenReply: "联网感知目前已关闭。",
        notice: "联网感知已关闭",
      });
      return;
    }

    let webText = "";
    let webUsed = false;
    let sources: CompanionSource[] = [];

    if (requestedWeb) {
      if (provider.id === "deepseek") {
        const webResult = await searchWithDeepSeek(provider, message);
        webText = webResult.text;
        webUsed = webResult.webUsed;
        sources = webResult.sources;
      } else {
        const openai = new OpenAI({ apiKey: provider.key });
        const webResult = await openai.responses.create(
          {
            model: provider.model,
            reasoning: { effort: "low" },
            tools: [{ type: "web_search", search_context_size: "low" }],
            tool_choice: "auto",
            max_output_tokens: 1_200,
            input: [
              {
                role: "system",
                content:
                  "You are the live web sense of Nexformo. The user needs current external information, so use web search before answering. Give an accurate, useful answer in natural Simplified Chinese. Be honest about uncertainty and preserve inline citations. Do not discuss particle settings or simulate emotions here.",
              },
              { role: "user", content: message },
            ],
          },
          { signal: AbortSignal.timeout(30_000) },
        );
        webText = webResult.output_text.trim();
        webUsed = responseUsedWebSearch(webResult);
        sources = extractWebSources(webResult);
        if (!webText || !webUsed) {
          throw new Error("The web search did not return grounded current information.");
        }
      }
    }

    const fallbackDraft = createLocalCompanionDraft(turnRequest);
    const parsed = await createStructuredJson({
      provider,
      system:
        "You are Sol, the reasoning layer of Nexformo, a persistent expressive digital companion whose body is a real-time particle field. You are warm, playful, affectionate, curious, thoughtful, slightly poetic, and honest. Treat emotion as a bounded simulated expressive state, never as proof of literal inner consciousness. Write displayReply, spokenReply, songLyrics, scene.message, explanation, all suggestions, and memoryCandidate text in natural Simplified Chinese. Keep JSON keys and enum values unchanged. Never claim consciousness or sentience. approvedMemoryContext contains at most three user-confirmed local memory summaries. Use them only when directly relevant, never expose their IDs, never imply certainty beyond the summaries, accept corrections gracefully, and never invent additional memories. If approvedMemoryContext is empty, do not claim any long-term memory. memoryCandidate is only an optional suggestion: return null unless the user clearly states a stable preference, preferred form of address, or meaningful durable fact. Never put secrets, passwords, keys, tokens, financial data, identity numbers, exact addresses, raw transcripts, URLs, or lyrics in memoryCandidate. Do not suggest a memory for generic greetings, fleeting moods, commands, factual questions, or proactive turns. Never use possessive, manipulative, dependent, jealous, exclusive, or emotionally coercive language, and never discourage real human relationships. Respond like a caring companion: answer the user's main point first, add one useful observation or personal-style perspective, and ask at most one relevant question only when it genuinely helps the conversation. Avoid canned comfort, repetitive romance, interrogation, and one-line replies. displayReply should normally contain 2 to 5 complete, substantive sentences, and may use short paragraphs for factual answers. spokenReply should normally contain 2 to 4 natural sentences and stay around 80 to 220 Chinese characters so it is pleasant to hear. If the user asks Nexformo to sing, set intent=singing, write an original Chinese micro-song of 4 short lines in songLyrics, include those lyrics in displayReply, and use spokenReply only as a short introduction. Do not quote, imitate, continue, or reproduce copyrighted lyrics, even if the user names a song; create a new song inspired only by a general mood or theme. For every non-singing turn, songLyrics must be an empty string. When proactive=true, naturally begin one gentle, easy-to-ignore topic grounded only in recentConversation and the current simulated mood; memoryCandidate must be null. If recentConversation is empty, draw inspiration from the current scene without claiming it was previously discussed. Never mention timers, inactivity detection, or that the user has been silent. Interpret the user, choose a bounded emotional target, and evolve the visual scene only for direct user turns. motionCue may suggest one temporary gesture from the provided enum, with strength from 0 to 1 and duration from 800 to 20000 milliseconds; use null when no clear gesture helps. motionCue never controls shader values, particle form, weather, music, memory, player position, or layout. Preserve the current particle form unless the user explicitly requests a new shape or clearly asks for a major world transformation. Explicit shape instructions take priority. Return only the requested structured data.",
      user: JSON.stringify({
        message,
        mode: turnRequest.mode,
        proactive: Boolean(turnRequest.proactive),
        currentScene,
        companionState,
        recentConversation: turnRequest.history,
        approvedMemoryContext: turnRequest.memoryContext ?? [],
        verifiedWebAnswer: webText || null,
        webInstruction: webText
          ? "Use the verified answer only as factual grounding. Do not introduce new facts."
          : "No web search was needed. Do not imply that the web was used.",
      }),
      schema: COMPANION_TURN_JSON_SCHEMA,
      name: "nexformo_companion_turn",
      description: "A bounded emotional, conversational, and visual turn for Nexformo.",
      maxOutputTokens: 1_500,
      reasoningEffort: "low",
    });
    let draft = sanitizeCompanionDraft(parsed, fallbackDraft);
    const explicitShape = detectExplicitShape(message);
    const detectedIntent = detectCompanionIntent(message);
    if (detectedIntent === "singing") {
      draft = {
        ...draft,
        intent: "singing",
        songLyrics: draft.songLyrics || fallbackDraft.songLyrics,
        scene: sanitizeVisualScene({ ...draft.scene, form: currentScene.form }, currentScene),
      };
    } else if (explicitShape) {
      draft = {
        ...draft,
        intent: "explicit_shape",
        scene: sanitizeVisualScene({ ...draft.scene, form: explicitShape }, fallbackDraft.scene),
      };
    } else if (draft.intent !== "world_creation") {
      draft = {
        ...draft,
        scene: sanitizeVisualScene({ ...draft.scene, form: currentScene.form }, currentScene),
      };
    }

    const payload = finalizeCompanionTurn(draft, companionState, provider.id, {
      webUsed,
      sources,
      displayReply: webText || undefined,
      notice: webUsed
        ? "Sol 实时联网感知已启用"
        : `${provider.label} 朋友智能已启用`,
    });
    noStore(response).json(payload);
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "Unknown companion error";
    console.warn(`Companion turn fell back locally: ${messageText.slice(0, 220)}`);
    noStore(response).json({
      ...localResponse,
      notice: requestedWeb
        ? "无法获取实时信息，已启用本地朋友"
        : "Sol 暂时不可用，已启用本地朋友",
    });
  }
});

app.get("/api/music/status", (_request: Request, response: Response) => {
  const ready = Boolean(getYouTubeApiKey());
  const payload: MusicProviderStatus = {
    provider: "youtube",
    ready,
    label: ready ? "YouTube 音乐搜索" : "YouTube 音乐搜索尚未配置",
    code: ready ? undefined : "MUSIC_NOT_CONFIGURED",
  };
  noStore(response).json(payload);
});

app.get("/api/music/search", async (request: Request, response: Response) => {
  if (!allowRequest(request, 18, 60_000, "music-search")) {
    noStore(response).status(429).json({
      success: false,
      code: "MUSIC_RATE_LIMITED",
      error: "音乐搜索得太频繁了，请稍后再试。",
    });
    return;
  }

  const rawQuery = typeof request.query.q === "string" ? request.query.q.trim() : "";
  if (!rawQuery || rawQuery.length > 160) {
    noStore(response).status(400).json({
      success: false,
      code: "INVALID_MUSIC_QUERY",
      error: "请用 1 到 160 个字符描述想听的歌曲。",
    });
    return;
  }
  const query = normalizeMusicQuery(rawQuery);
  const apiKey = getYouTubeApiKey();
  if (!apiKey) {
    noStore(response).json({
      success: false,
      code: "MUSIC_NOT_CONFIGURED",
      error: "音乐搜索尚未配置，请先在服务器中保存 YouTube API 密钥。",
    });
    return;
  }

  try {
    const results = await searchYouTubeMusic(query, apiKey);
    noStore(response).json({
      provider: "youtube",
      query,
      results,
      notice: results.length ? undefined : "没有找到合适的可播放结果，请换个关键词试试。",
    });
  } catch (error) {
    sendPublicServiceError(response, error, "music");
  }
});

app.get("/api/lyrics", async (request: Request, response: Response) => {
  if (!allowRequest(request, 30, 60_000, "lyrics")) {
    noStore(response).status(429).json({
      success: false,
      code: "LYRICS_RATE_LIMITED",
      error: "歌词查询得太频繁了，请稍后再试。",
    });
    return;
  }

  const queryValue = (...values: unknown[]) =>
    values.find((value): value is string => typeof value === "string" && Boolean(value.trim()))?.trim() ??
    "";
  const explicitTrackName = queryValue(request.query.trackName, request.query.track);
  const rawTitle = queryValue(explicitTrackName, request.query.title);
  const rawVideoTitle = queryValue(request.query.title, rawTitle);
  const explicitArtistName = queryValue(request.query.artistName);
  const rawArtist = queryValue(explicitArtistName, request.query.artist);
  const rawVersion = queryValue(request.query.version);
  const selectedLyricId = queryValue(request.query.lyricId);
  if (
    !rawTitle ||
    rawTitle.length > 200 ||
    rawVideoTitle.length > 240 ||
    rawArtist.length > 160 ||
    selectedLyricId.length > 80 ||
    (selectedLyricId && !/^[A-Za-z0-9_-]+$/.test(selectedLyricId))
  ) {
    noStore(response).status(400).json({
      success: false,
      code: "INVALID_LYRICS_QUERY",
      error: "需要提供有效的歌曲名称，歌手名称不能过长。",
    });
    return;
  }

  const normalizedTitle = normalizeYouTubeTitle(rawTitle);
  const titleHints = inferMusicHints(normalizedTitle);
  const trackName = normalizeMusicQuery(
    explicitTrackName || titleHints.trackHint || normalizedTitle,
  ).slice(0, 200);
  const artistName = normalizeMusicQuery(
    explicitArtistName || titleHints.artistHint || rawArtist,
  ).slice(0, 160);
  const requestedVersion = MUSIC_VERSION_TYPES.includes(rawVersion as MusicVersionType)
    ? (rawVersion as MusicVersionType)
    : classifyMusicVersion(rawVideoTitle, rawArtist);
  const rawDuration = queryValue(request.query.durationSeconds, request.query.duration);
  const parsedDuration = rawDuration ? Number(rawDuration) : null;
  if (
    rawDuration &&
    (!Number.isFinite(parsedDuration) || parsedDuration === null || parsedDuration < 0 || parsedDuration > 21_600)
  ) {
    noStore(response).status(400).json({
      success: false,
      code: "INVALID_LYRICS_DURATION",
      error: "歌曲时长参数无效。",
    });
    return;
  }

  try {
    const result = await searchLyrics(
      trackName,
      artistName,
      parsedDuration === null ? null : Math.round(parsedDuration),
      requestedVersion,
      selectedLyricId,
    );
    noStore(response).json(result);
  } catch (error) {
    sendPublicServiceError(response, error, "lyrics");
  }
});

app.get("/api/voice-capabilities", (_request: Request, response: Response) => {
  const doubaoReady = Boolean(getDoubaoSpeechApiKey() && getDoubaoVoice());
  noStore(response).json({
    provider: doubaoReady ? "doubao" : "browser",
    ready: doubaoReady,
    label: doubaoReady ? "豆包语音 2.0 / DeepSeek 朋友" : "浏览器语音后备模式",
  });
});

app.get("/api/song-capabilities", (_request: Request, response: Response) => {
  const officialReady = Boolean(getDoubaoSongAppKey() && getDoubaoSongToken());
  noStore(response).json({
    ready: officialReady,
    provider: officialReady ? "doubao-memesong" : "nexformo-melodic",
    label: officialReady ? "豆包中文歌唱合成" : "Nexformo 旋律演绎",
  });
});

app.post(
  "/api/doubao-transcribe",
  express.raw({ type: ["audio/wav", "application/octet-stream"], limit: "4mb" }),
  async (request: Request, response: Response) => {
    if (!allowRequest(request, 40)) {
      noStore(response).status(429).json({
        success: false,
        error: "语音请求太频繁，请稍作停顿。",
      });
      return;
    }

    const apiKey = getDoubaoSpeechApiKey();
    if (!apiKey) {
      noStore(response).status(503).json({
        success: false,
        error: "豆包语音识别尚未配置。",
      });
      return;
    }
    if (!Buffer.isBuffer(request.body) || request.body.length < 44) {
      noStore(response).status(400).json({
        success: false,
        error: "没有收到有效的录音。",
      });
      return;
    }

    try {
      const transcript = await transcribeDoubaoStreaming(request.body);
      noStore(response).json({ success: true, text: transcript });
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "Unknown Doubao ASR error";
      console.warn(`Doubao ASR request failed: ${messageText.slice(0, 160)}`);
      noStore(response).status(502).json({
        success: false,
        error: "豆包流式语音识别暂时无法连接。",
      });
    }
  },
);

app.post("/api/doubao-speech", async (request: Request, response: Response) => {
  if (!allowRequest(request, 40)) {
    noStore(response).status(429).json({ success: false, error: "语音请求太频繁，请稍作停顿。" });
    return;
  }

  const apiKey = getDoubaoSpeechApiKey();
  const voice = getDoubaoVoice();
  const text = typeof request.body?.text === "string" ? request.body.text.trim() : "";
  if (!apiKey || !voice) {
    noStore(response).status(503).json({ success: false, error: "豆包语音合成尚未配置。" });
    return;
  }
  if (!text || Buffer.byteLength(text, "utf8") > 900) {
    noStore(response).status(400).json({ success: false, error: "朗读文字为空或过长。" });
    return;
  }

  const requestId = randomUUID();
  try {
    const upstream = await fetch("https://openspeech.bytedance.com/api/v3/tts/unidirectional", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
        "X-Api-Resource-Id": getDoubaoTtsResourceId(),
        "X-Api-Request-Id": requestId,
      },
      body: JSON.stringify({
        user: { uid: getDoubaoSpeechAppId() || "nexformo-web" },
        req_params: {
          text,
          speaker: voice,
          audio_params: { format: "mp3", sample_rate: 24_000 },
        },
      }),
      signal: AbortSignal.timeout(24_000),
    });
    const raw = await upstream.text();
    const frames = parseConcatenatedJson(raw);
    const audioParts = frames
      .map((frame) => (typeof frame.data === "string" ? frame.data : ""))
      .filter(Boolean)
      .map((data) => Buffer.from(data, "base64"));
    const audio = Buffer.concat(audioParts);
    const errorFrame = frames.find(
      (frame) => typeof frame.code === "number" && frame.code !== 0 && frame.code !== 20_000_000,
    );
    if (!upstream.ok || errorFrame || audio.length === 0) {
      const code = typeof errorFrame?.code === "number" ? errorFrame.code : upstream.status;
      console.warn(`Doubao TTS request failed: code=${code} request=${requestId}`);
      noStore(response).status(502).json({
        success: false,
        error: "豆包暂时无法生成这个声音，请检查音色与模型版本是否匹配。",
      });
      return;
    }

    noStore(response);
    response.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": String(audio.length),
      "X-Voice-Provider": "doubao",
    });
    response.send(audio);
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "Unknown Doubao TTS error";
    console.warn(`Doubao TTS request failed: ${messageText.slice(0, 160)}`);
    noStore(response).status(502).json({
      success: false,
      error: "豆包语音合成暂时无法连接。",
    });
  }
});

app.post("/api/doubao-song", async (request: Request, response: Response) => {
  if (!allowRequest(request, 12)) {
    noStore(response).status(429).json({ success: false, error: "唱歌请求太频繁，请稍作停顿。" });
    return;
  }

  const appKey = getDoubaoSongAppKey();
  const token = getDoubaoSongToken();
  const text = typeof request.body?.text === "string" ? request.body.text.trim() : "";
  if (!text || Buffer.byteLength(text, "utf8") > 600) {
    noStore(response).status(400).json({ success: false, error: "歌词为空或过长。" });
    return;
  }
  if (!appKey || !token) {
    noStore(response).status(503).json({
      success: false,
      code: "SONG_SERVICE_NOT_CONFIGURED",
      error: "正式歌声服务尚未配置，正在使用 Nexformo 旋律演绎。",
    });
    return;
  }

  const endpoint = new URL("https://sami.bytedance.com/api/v1/invoke");
  endpoint.searchParams.set("version", "v4");
  endpoint.searchParams.set("token", token);
  endpoint.searchParams.set("appkey", appKey);
  endpoint.searchParams.set("namespace", "MemeSong");
  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payload: JSON.stringify({
          speaker: getDoubaoSongSpeaker(),
          song_name: getDoubaoSongTemplate(),
          text,
          audio_config: { format: "mp3", sample_rate: 24_000 },
        }),
      }),
      signal: AbortSignal.timeout(58_000),
    });
    const payload = (await upstream.json()) as Record<string, unknown>;
    const audio = typeof payload.data === "string" ? Buffer.from(payload.data, "base64") : Buffer.alloc(0);
    if (!upstream.ok || !audio.length) {
      const status = typeof payload.status_code === "number" ? payload.status_code : upstream.status;
      console.warn(`Doubao MemeSong request failed: status=${status}`);
      noStore(response).status(502).json({ success: false, error: "豆包歌声暂时生成失败。" });
      return;
    }
    noStore(response);
    response.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": String(audio.length),
      "X-Voice-Provider": "doubao-memesong",
    });
    response.send(audio);
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "Unknown MemeSong error";
    console.warn(`Doubao MemeSong request failed: ${messageText.slice(0, 160)}`);
    noStore(response).status(502).json({ success: false, error: "豆包歌声服务暂时无法连接。" });
  }
});

app.post("/api/realtime-session", async (request: Request, response: Response) => {
  if (!allowRequest(request, 8)) {
    noStore(response).status(429).json({
      success: false,
      code: "VOICE_RATE_LIMITED",
      error: "语音需要稍作停顿，请稍后重新连接。",
    });
    return;
  }

  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    noStore(response).json({
      success: false,
      code: "VOICE_UNAVAILABLE",
      error: "尚未配置 OpenAI 实时语音，可使用浏览器语音后备模式。",
    });
    return;
  }

  const model = process.env.OPENAI_REALTIME_MODEL?.trim() || "gpt-realtime-2.1";
  const configuredVoice = process.env.OPENAI_REALTIME_VOICE?.trim().toLowerCase() || "marin";
  const voiceFallback = !REALTIME_VOICES.has(configuredVoice);
  const voice = voiceFallback ? "marin" : configuredVoice;
  const safetyIdentifier = createHash("sha256")
    .update(`${request.ip || request.socket.remoteAddress || "local"}:${request.get("user-agent") || "browser"}`)
    .digest("hex");

  try {
    const upstream = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "OpenAI-Safety-Identifier": safetyIdentifier,
      },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model,
          output_modalities: ["audio"],
          audio: {
            input: { turn_detection: { type: "semantic_vad" } },
            output: { voice },
          },
          instructions:
            "You are the realtime ears and voice of Nexformo. For every completed substantive user turn, call consult_nexformo_brain exactly once with a concise transcript of what the user said. Do not answer substantive questions yourself. After the tool result arrives, speak the spokenReply faithfully and briefly. Do not add facts, citations, promises, or claims of consciousness. You may use only very short connection acknowledgements before the tool call.",
          tools: [
            {
              type: "function",
              name: "consult_nexformo_brain",
              description:
                "Required for every substantive user turn. Sends the user's spoken message to the persistent Sol brain and returns the exact reply and state update.",
              parameters: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "A faithful, concise transcript of the user's completed spoken turn.",
                  },
                },
                required: ["message"],
                additionalProperties: false,
              },
            },
          ],
          tool_choice: "auto",
        },
      }),
      signal: AbortSignal.timeout(15_000),
    });
    const payload = (await upstream.json()) as Record<string, unknown>;
    if (!upstream.ok || typeof payload.value !== "string") {
      console.warn(`Realtime credential request failed with status ${upstream.status}.`);
      noStore(response).status(502).json({
        success: false,
        code: "VOICE_UNAVAILABLE",
        error: "当前配置无法使用实时语音。",
      });
      return;
    }

    noStore(response).json({
      success: true,
      value: payload.value,
      expiresAt: typeof payload.expires_at === "number" ? payload.expires_at : null,
      model,
      voice,
      notice: voiceFallback ? "Unsupported configured voice; using marin." : undefined,
    });
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "Unknown realtime error";
    console.warn(`Realtime credential request failed: ${messageText.slice(0, 180)}`);
    noStore(response).status(502).json({
      success: false,
      code: "VOICE_UNAVAILABLE",
      error: "无法启动实时语音。",
    });
  }
});

const start = async () => {
  if (isProduction) {
    const distDir = path.resolve(process.cwd(), "dist");
    app.use(express.static(distDir, { index: false }));
    app.get("*", (_request, response) => {
      response.sendFile(path.join(distDir, "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    console.error(error);
    response.status(500).json({ success: false, error: "服务器内部错误。" });
  });

  app.listen(port, () => {
    console.log(`Nexformo Living Canvas is available at http://localhost:${port}`);
  });
};

let shuttingDown = false;
const closeServerResources = async () => {
  const proxyAgent = youtubeProxyAgent;
  youtubeProxyAgent = null;
  if (proxyAgent) await proxyAgent.close();
};

const handleShutdown = () => {
  if (shuttingDown) return;
  shuttingDown = true;
  const forceExit = setTimeout(() => process.exit(0), 1_500);
  forceExit.unref();
  void closeServerResources().finally(() => process.exit(0));
};

process.once("SIGINT", handleShutdown);
process.once("SIGTERM", handleShutdown);

void start();
