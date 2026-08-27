import {
  normalizeOpenMeteoForecast,
  normalizeReverseGeocodingResponse,
  normalizeWeatherSearchResponse,
  type ForecastDataStatus,
  type WeatherForecast,
  type WeatherLocation,
} from "./shared/liveWeather";

const OPEN_METEO_FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const OPEN_METEO_GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const DEFAULT_REVERSE_GEOCODING_URL = "https://nominatim.openstreetmap.org/reverse";
const NOMINATIM_REQUEST_INTERVAL_MS = 1_100;
const REVERSE_GEOCODING_CACHE_TTL_MS = 7 * 24 * 60 * 60_000;
const REVERSE_GEOCODING_CACHE_MAX_ENTRIES = 200;

type Wait = (milliseconds: number) => Promise<void>;
type ReverseGeocodingLookup = (
  location: WeatherLocation,
  fetchInit?: RequestInit,
) => Promise<WeatherLocation>;

export class WeatherProviderError extends Error {
  constructor(
    readonly code: "TIMEOUT" | "UNAVAILABLE" | "INVALID_RESPONSE",
    message: string,
  ) {
    super(message);
    this.name = "WeatherProviderError";
  }
}

export function createMinimumIntervalScheduler(options: {
  intervalMs: number;
  now?: () => number;
  wait?: Wait;
}) {
  const intervalMs = Math.max(0, options.intervalMs);
  const now = options.now ?? Date.now;
  const wait = options.wait ?? ((milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)));
  let queue: Promise<void> = Promise.resolve();
  let lastStartedAt = Number.NEGATIVE_INFINITY;

  return async <T>(task: () => Promise<T>): Promise<T> => {
    let releaseQueue = () => {};
    const previous = queue;
    queue = new Promise<void>((resolve) => {
      releaseQueue = resolve;
    });
    await previous;
    try {
      const waitMs = Math.max(0, lastStartedAt + intervalMs - now());
      if (waitMs > 0) await wait(waitMs);
      lastStartedAt = now();
      return await task();
    } finally {
      releaseQueue();
    }
  };
}

export function createReverseGeocodingResolver(
  lookup: ReverseGeocodingLookup,
  options: {
    now?: () => number;
    ttlMs?: number;
    maximumEntries?: number;
  } = {},
) {
  const now = options.now ?? Date.now;
  const ttlMs = Math.max(0, options.ttlMs ?? REVERSE_GEOCODING_CACHE_TTL_MS);
  const maximumEntries = Math.max(1, options.maximumEntries ?? REVERSE_GEOCODING_CACHE_MAX_ENTRIES);
  const cache = new Map<string, { value: WeatherLocation; expiresAt: number }>();
  const inFlight = new Map<string, Promise<WeatherLocation>>();

  return async (location: WeatherLocation, fetchInit: RequestInit = {}) => {
    if (location.source !== "geolocation") return location;
    const cacheKey = `${location.latitude.toFixed(3)},${location.longitude.toFixed(3)}`;
    const cached = cache.get(cacheKey);
    if (cached && cached.expiresAt > now()) return cached.value;
    if (cached) cache.delete(cacheKey);

    const existing = inFlight.get(cacheKey);
    if (existing) return existing;

    const pending = lookup(location, fetchInit)
      .then((resolved) => {
        const currentTime = now();
        for (const [candidateKey, entry] of cache) {
          if (entry.expiresAt <= currentTime) cache.delete(candidateKey);
        }
        while (cache.size >= maximumEntries) {
          const oldestKey = cache.keys().next().value as string | undefined;
          if (!oldestKey) break;
          cache.delete(oldestKey);
        }
        cache.set(cacheKey, { value: resolved, expiresAt: currentTime + ttlMs });
        return resolved;
      })
      .finally(() => inFlight.delete(cacheKey));
    inFlight.set(cacheKey, pending);
    return pending;
  };
}

export async function resolveWeatherLocationWithFallback(
  location: WeatherLocation,
  resolveLocation: (location: WeatherLocation) => Promise<WeatherLocation>,
  reportError: (error: unknown) => void = () => {},
) {
  if (location.source !== "geolocation") return location;
  try {
    return await resolveLocation(location);
  } catch (error) {
    reportError(error);
    return location;
  }
}

const scheduleReverseGeocoding = createMinimumIntervalScheduler({
  intervalMs: NOMINATIM_REQUEST_INTERVAL_MS,
});

async function providerJson(
  url: URL,
  timeoutMs: number,
  headers: Record<string, string> = {},
  fetchInit: RequestInit = {},
) {
  let response: globalThis.Response;
  try {
    response = await fetch(url, {
      ...fetchInit,
      headers: { Accept: "application/json", "User-Agent": "Nexformo/1.0 weather experiment", ...headers },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    throw new WeatherProviderError(
      timedOut ? "TIMEOUT" : "UNAVAILABLE",
      timedOut ? "天气服务响应超时。" : "暂时无法连接天气服务。",
    );
  }
  if (!response.ok) {
    throw new WeatherProviderError("UNAVAILABLE", `天气服务暂时不可用（${response.status}）。`);
  }
  try {
    return await response.json() as unknown;
  } catch {
    throw new WeatherProviderError("INVALID_RESPONSE", "天气服务返回了无法识别的数据。");
  }
}

async function queuedReverseGeocodingJson(url: URL, fetchInit: RequestInit) {
  return scheduleReverseGeocoding(() => providerJson(url, 8_000, {
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.6",
    Referer: process.env.PUBLIC_ORIGIN?.trim() || "https://nexformo-private-beta.onrender.com/",
    "User-Agent": "Nexformo/1.0 (+https://nexformo-private-beta.onrender.com)",
  }, fetchInit));
}

export async function searchOpenMeteoLocations(query: string) {
  const url = new URL(OPEN_METEO_GEOCODING_URL);
  url.searchParams.set("name", query);
  url.searchParams.set("count", "8");
  url.searchParams.set("language", "zh");
  url.searchParams.set("format", "json");
  const payload = await providerJson(url, 8_000);
  return normalizeWeatherSearchResponse(payload);
}

export async function reverseGeocodeLocation(location: WeatherLocation, fetchInit: RequestInit = {}) {
  const configuredUrl = process.env.NEXFORMO_REVERSE_GEOCODING_URL?.trim();
  const url = new URL(configuredUrl || DEFAULT_REVERSE_GEOCODING_URL);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(location.latitude));
  url.searchParams.set("lon", String(location.longitude));
  url.searchParams.set("zoom", "10");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("accept-language", "zh-CN,zh,en");
  const payload = await queuedReverseGeocodingJson(url, fetchInit);
  return normalizeReverseGeocodingResponse(payload, location);
}

export const resolveReverseGeocodedLocation = createReverseGeocodingResolver(reverseGeocodeLocation);

export async function fetchOpenMeteoForecast(
  location: WeatherLocation,
  status: ForecastDataStatus = "live",
  now = Date.now(),
): Promise<WeatherForecast> {
  const url = new URL(OPEN_METEO_FORECAST_URL);
  url.searchParams.set("latitude", String(location.latitude));
  url.searchParams.set("longitude", String(location.longitude));
  url.searchParams.set(
    "current",
    "temperature_2m,precipitation,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m",
  );
  url.searchParams.set(
    "hourly",
    "temperature_2m,precipitation,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m",
  );
  url.searchParams.set("forecast_days", "2");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("timeformat", "unixtime");
  const payload = await providerJson(url, 10_000);
  try {
    return normalizeOpenMeteoForecast(payload, location, status, now);
  } catch (error) {
    throw new WeatherProviderError(
      "INVALID_RESPONSE",
      error instanceof Error ? error.message : "天气预报数据不完整。",
    );
  }
}
