export const WEATHER_PROVIDER_ID = "open-meteo" as const;
export const RAINFORM_LOCATION_STORAGE_KEY = "nexformo.rainform.location.v1";

export type ForecastDataStatus = "live" | "stale" | "unavailable";
export type RainformWeatherMode = "demo" | "live";
export type ForecastCondition =
  | "clear"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "heavy_rain"
  | "snow"
  | "thunderstorm"
  | "unknown";

export type WeatherLocation = {
  id: string;
  name: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  source: "search" | "geolocation";
};

export type WeatherCurrent = {
  timestamp: number;
  temperatureC: number | null;
  precipitationMm: number;
  precipitationProbability: number | null;
  weatherCode: number | null;
  condition: ForecastCondition;
  windSpeedKmh: number;
  windDirection: number;
};

export type WeatherHourlyPoint = WeatherCurrent;

export type WeatherForecast = {
  provider: typeof WEATHER_PROVIDER_ID;
  providerLabel: "Open-Meteo";
  providerUrl: "https://open-meteo.com/";
  status: ForecastDataStatus;
  location: WeatherLocation;
  fetchedAt: number;
  issuedAt: number;
  expiresAt: number;
  current: WeatherCurrent;
  hourly: WeatherHourlyPoint[];
  partial: boolean;
};

export type RainformForecastDay = {
  localDate: string;
  timezone: string;
  timelineHour: number;
  timeLabel: string;
  values: Array<number | null>;
  probabilities: Array<number | null>;
  availableHours: boolean[];
  coverage: number;
  partial: boolean;
};

type UnknownRecord = Record<string, unknown>;

const recordOf = (value: unknown): UnknownRecord =>
  value && typeof value === "object" ? (value as UnknownRecord) : {};

const stringValue = (value: unknown, maximum = 120) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maximum) : "";

const finiteNumber = (value: unknown) => {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string" || !value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export function weatherNumber(value: unknown, minimum: number, maximum: number, fallback = 0) {
  const numeric = finiteNumber(value);
  if (numeric === null) return fallback;
  return Number.isFinite(numeric) ? Math.min(maximum, Math.max(minimum, numeric)) : fallback;
}

const nullableWeatherNumber = (value: unknown, minimum: number, maximum: number) => {
  const numeric = finiteNumber(value);
  return numeric === null ? null : Math.min(maximum, Math.max(minimum, numeric));
};

export function isValidTimeZone(value: unknown) {
  if (typeof value !== "string" || value.length > 80) return false;
  try {
    new Intl.DateTimeFormat("en", { timeZone: value }).format(0);
    return true;
  } catch {
    return false;
  }
}

export function normalizeWeatherCondition(code: unknown): ForecastCondition {
  const value = nullableWeatherNumber(code, 0, 99);
  if (value === null) return "unknown";
  if (value === 0 || value === 1) return "clear";
  if (value === 2 || value === 3) return "cloudy";
  if (value === 45 || value === 48) return "fog";
  if (value >= 51 && value <= 57) return "drizzle";
  if (value === 61 || value === 63 || value === 80 || value === 81) return "rain";
  if (value === 65 || value === 66 || value === 67 || value === 82) return "heavy_rain";
  if ((value >= 71 && value <= 77) || value === 85 || value === 86) return "snow";
  if (value >= 95) return "thunderstorm";
  return "unknown";
}

export const FORECAST_CONDITION_LABELS: Record<ForecastCondition, string> = {
  clear: "晴朗",
  cloudy: "多云",
  fog: "有雾",
  drizzle: "细雨",
  rain: "有雨",
  heavy_rain: "较强降雨",
  snow: "降雪",
  thunderstorm: "雷雨",
  unknown: "天气状态未知",
};

export function sanitizeWeatherLocation(value: unknown): WeatherLocation | null {
  const candidate = recordOf(value);
  const name = stringValue(candidate.name, 80);
  const latitude = finiteNumber(candidate.latitude);
  const longitude = finiteNumber(candidate.longitude);
  if (
    !name
    || latitude === null
    || longitude === null
    || latitude < -90
    || latitude > 90
    || longitude < -180
    || longitude > 180
  ) return null;
  const timezone = isValidTimeZone(candidate.timezone) ? String(candidate.timezone) : "UTC";
  const providerId = stringValue(candidate.id, 40);
  return {
    id: providerId || `${latitude.toFixed(5)},${longitude.toFixed(5)}`,
    name,
    region: stringValue(candidate.region ?? candidate.admin1, 80),
    country: stringValue(candidate.country, 80),
    countryCode: stringValue(candidate.countryCode ?? candidate.country_code, 2).toUpperCase(),
    latitude,
    longitude,
    timezone,
    source: candidate.source === "geolocation" ? "geolocation" : "search",
  };
}

export function normalizeWeatherSearchResponse(value: unknown): WeatherLocation[] {
  const results = Array.isArray(recordOf(value).results) ? (recordOf(value).results as unknown[]) : [];
  const normalized: WeatherLocation[] = [];
  const ids = new Set<string>();
  for (const raw of results) {
    const location = sanitizeWeatherLocation(raw);
    if (!location || ids.has(location.id)) continue;
    ids.add(location.id);
    normalized.push({ ...location, source: "search" });
    if (normalized.length >= 8) break;
  }
  return normalized;
}

export function normalizeReverseGeocodingResponse(
  value: unknown,
  requestedLocation: WeatherLocation,
): WeatherLocation {
  const root = recordOf(value);
  const address = recordOf(root.address);
  const name = stringValue(
    address.city
      ?? address.town
      ?? address.village
      ?? address.municipality
      ?? address.county
      ?? address.state,
    80,
  );
  if (!name) return requestedLocation;

  const regionCandidate = stringValue(
    address.city_district
      ?? address.district
      ?? address.state
      ?? address.county,
    80,
  );
  const region = regionCandidate.localeCompare(name, undefined, { sensitivity: "base" }) === 0
    ? ""
    : regionCandidate;
  const rawCountryCode = stringValue(address.country_code, 8);
  return sanitizeWeatherLocation({
    ...requestedLocation,
    name,
    region,
    country: stringValue(address.country, 80),
    countryCode: /^[a-z]{2}$/i.test(rawCountryCode) ? rawCountryCode.toUpperCase() : "",
    source: "geolocation",
  }) ?? requestedLocation;
}

const sanitizeNormalizedWeatherPoint = (value: unknown): WeatherHourlyPoint | null => {
  const candidate = recordOf(value);
  const timestamp = nullableWeatherNumber(candidate.timestamp, 0, 4_102_444_800_000);
  const precipitationMm = nullableWeatherNumber(candidate.precipitationMm, 0, 500);
  if (timestamp === null || precipitationMm === null) return null;
  const weatherCode = nullableWeatherNumber(candidate.weatherCode, 0, 99);
  return {
    timestamp,
    temperatureC: nullableWeatherNumber(candidate.temperatureC, -90, 70),
    precipitationMm,
    precipitationProbability: nullableWeatherNumber(candidate.precipitationProbability, 0, 100),
    weatherCode,
    condition: normalizeWeatherCondition(weatherCode),
    windSpeedKmh: weatherNumber(candidate.windSpeedKmh, 0, 500, 0),
    windDirection: weatherNumber(candidate.windDirection, 0, 360, 0) % 360,
  };
};

export function sanitizeWeatherForecast(value: unknown): WeatherForecast | null {
  const candidate = recordOf(value);
  const location = sanitizeWeatherLocation(candidate.location);
  const current = sanitizeNormalizedWeatherPoint(candidate.current);
  if (!location || !current) return null;
  const points = new Map<number, WeatherHourlyPoint>();
  for (const rawPoint of Array.isArray(candidate.hourly) ? candidate.hourly.slice(0, 96) : []) {
    const point = sanitizeNormalizedWeatherPoint(rawPoint);
    if (point) points.set(point.timestamp, point);
  }
  const hourly = [...points.values()].sort((left, right) => left.timestamp - right.timestamp);
  if (!hourly.length) return null;
  const status: ForecastDataStatus = candidate.status === "stale"
    ? "stale"
    : candidate.status === "unavailable" ? "unavailable" : "live";
  return {
    provider: WEATHER_PROVIDER_ID,
    providerLabel: "Open-Meteo",
    providerUrl: "https://open-meteo.com/",
    status,
    location,
    fetchedAt: weatherNumber(candidate.fetchedAt, 0, 4_102_444_800_000, Date.now()),
    issuedAt: weatherNumber(candidate.issuedAt, 0, 4_102_444_800_000, current.timestamp),
    expiresAt: weatherNumber(candidate.expiresAt, 0, 4_102_444_800_000, Date.now()),
    current,
    hourly,
    partial: candidate.partial === true || hourly.length < 25,
  };
}

const arrayValue = (value: unknown) => (Array.isArray(value) ? value : []);

const normalizeTimestamp = (value: unknown) => {
  const seconds = nullableWeatherNumber(value, 0, 4_102_444_800);
  return seconds === null ? null : Math.round(seconds * 1_000);
};

const normalizeCurrent = (value: unknown, fallbackTimestamp: number): WeatherCurrent => {
  const candidate = recordOf(value);
  const code = nullableWeatherNumber(candidate.weather_code, 0, 99);
  return {
    timestamp: normalizeTimestamp(candidate.time) ?? fallbackTimestamp,
    temperatureC: nullableWeatherNumber(candidate.temperature_2m, -90, 70),
    precipitationMm: weatherNumber(candidate.precipitation, 0, 500, 0),
    precipitationProbability: nullableWeatherNumber(candidate.precipitation_probability, 0, 100),
    weatherCode: code,
    condition: normalizeWeatherCondition(code),
    windSpeedKmh: weatherNumber(candidate.wind_speed_10m, 0, 500, 0),
    windDirection: weatherNumber(candidate.wind_direction_10m, 0, 360, 0) % 360,
  };
};

export function normalizeOpenMeteoForecast(
  value: unknown,
  requestedLocation: WeatherLocation,
  status: ForecastDataStatus = "live",
  now = Date.now(),
): WeatherForecast {
  const root = recordOf(value);
  const hourly = recordOf(root.hourly);
  const times = arrayValue(hourly.time);
  const precipitation = arrayValue(hourly.precipitation);
  const probability = arrayValue(hourly.precipitation_probability);
  const temperature = arrayValue(hourly.temperature_2m);
  const weatherCodes = arrayValue(hourly.weather_code);
  const windSpeed = arrayValue(hourly.wind_speed_10m);
  const windDirection = arrayValue(hourly.wind_direction_10m);
  const points = new Map<number, WeatherHourlyPoint>();

  for (let index = 0; index < times.length && index < 96; index += 1) {
    const timestamp = normalizeTimestamp(times[index]);
    const precipitationMm = nullableWeatherNumber(precipitation[index], 0, 500);
    if (timestamp === null || precipitationMm === null) continue;
    const code = nullableWeatherNumber(weatherCodes[index], 0, 99);
    points.set(timestamp, {
      timestamp,
      temperatureC: nullableWeatherNumber(temperature[index], -90, 70),
      precipitationMm,
      precipitationProbability: nullableWeatherNumber(probability[index], 0, 100),
      weatherCode: code,
      condition: normalizeWeatherCondition(code),
      windSpeedKmh: weatherNumber(windSpeed[index], 0, 500, 0),
      windDirection: weatherNumber(windDirection[index], 0, 360, 0) % 360,
    });
  }

  const timezone = isValidTimeZone(root.timezone)
    ? String(root.timezone)
    : isValidTimeZone(requestedLocation.timezone)
      ? requestedLocation.timezone
      : "UTC";
  const normalizedHourly = [...points.values()].sort((left, right) => left.timestamp - right.timestamp);
  if (!normalizedHourly.length) throw new Error("天气服务没有返回可用的逐小时预报。");
  const current = normalizeCurrent(root.current, normalizedHourly[0].timestamp);
  const issuedAt = current.timestamp || now;

  return {
    provider: WEATHER_PROVIDER_ID,
    providerLabel: "Open-Meteo",
    providerUrl: "https://open-meteo.com/",
    status,
    location: { ...requestedLocation, timezone },
    fetchedAt: Math.max(0, now),
    issuedAt,
    expiresAt: Math.max(0, now) + 15 * 60_000,
    current,
    hourly: normalizedHourly,
    partial: normalizedHourly.length < 25,
  };
}

const zonedFormatterCache = new Map<string, Intl.DateTimeFormat>();

function zonedParts(timestamp: number, timeZone: string) {
  let formatter = zonedFormatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    zonedFormatterCache.set(timeZone, formatter);
  }
  const parts = Object.fromEntries(formatter.formatToParts(timestamp).map((part) => [part.type, part.value]));
  const hour = Number(parts.hour) === 24 ? 0 : Number(parts.hour);
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hour,
    minute: Number(parts.minute),
  };
}

function nextCalendarDate(localDate: string) {
  const [year, month, day] = localDate.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + 1));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}-${String(next.getUTCDate()).padStart(2, "0")}`;
}

export function buildRainformForecastDay(forecast: WeatherForecast, now = Date.now()): RainformForecastDay {
  const timezone = isValidTimeZone(forecast.location.timezone) ? forecast.location.timezone : "UTC";
  const current = zonedParts(now, timezone);
  const nextDate = nextCalendarDate(current.date);
  const buckets = new Map<number, WeatherHourlyPoint[]>();
  for (const point of forecast.hourly) {
    const parts = zonedParts(point.timestamp, timezone);
    const timelineHour = parts.date === current.date ? parts.hour : parts.date === nextDate && parts.hour === 0 ? 24 : -1;
    if (timelineHour < 0) continue;
    const bucket = buckets.get(timelineHour) ?? [];
    bucket.push(point);
    buckets.set(timelineHour, bucket);
  }

  const values: Array<number | null> = [];
  const probabilities: Array<number | null> = [];
  for (let hour = 0; hour <= 24; hour += 1) {
    const bucket = buckets.get(hour) ?? [];
    if (!bucket.length) {
      values.push(null);
      probabilities.push(null);
      continue;
    }
    values.push(bucket.reduce((sum, point) => sum + point.precipitationMm, 0) / bucket.length);
    const availableProbability = bucket
      .map((point) => point.precipitationProbability)
      .filter((value): value is number => value !== null);
    probabilities.push(
      availableProbability.length
        ? availableProbability.reduce((sum, value) => sum + value, 0) / availableProbability.length
        : null,
    );
  }
  const availableHours = values.map((value) => value !== null);
  const coverage = availableHours.filter(Boolean).length;
  return {
    localDate: current.date,
    timezone,
    timelineHour: current.hour + current.minute / 60,
    timeLabel: `${String(current.hour).padStart(2, "0")}:${String(current.minute).padStart(2, "0")}`,
    values,
    probabilities,
    availableHours,
    coverage,
    partial: coverage < 25,
  };
}

export function interpolateForecastValue(values: readonly (number | null)[], timelineHour: number) {
  if (!values.length) return null;
  const hour = weatherNumber(timelineHour, 0, Math.max(0, values.length - 1), 0);
  const leftIndex = Math.floor(hour);
  const rightIndex = Math.min(values.length - 1, leftIndex + 1);
  const left = values[leftIndex];
  const right = values[rightIndex];
  if (left === null || left === undefined) return null;
  if (right === null || right === undefined) return hour === leftIndex ? left : null;
  return left + (right - left) * (hour - leftIndex);
}

export type ForecastTrend = "dry" | "increasing" | "decreasing" | "steady";

export function calculateForecastTrend(
  values: readonly (number | null)[],
  timelineHour: number,
): ForecastTrend | null {
  const current = interpolateForecastValue(values, timelineHour);
  const next = interpolateForecastValue(values, Math.min(24, timelineHour + 1));
  if (current === null || next === null) return null;
  if (current < 0.1 && next < 0.1) return "dry";
  if (next - current >= 0.25) return "increasing";
  if (current - next >= 0.25) return "decreasing";
  return "steady";
}

export const FORECAST_TREND_LABELS: Record<ForecastTrend, string> = {
  dry: "未来一小时暂无明显降水",
  increasing: "未来一小时雨势可能增强",
  decreasing: "未来一小时雨势可能减弱",
  steady: "未来一小时雨势预计较稳定",
};

export function calculateLiveRainAudioIntensity(input: {
  currentPrecipitation: number | null;
  precipitationProbability: number | null;
  nextHourPrecipitation: number | null;
  masterVolume: number;
  duckFactor: number;
}) {
  const current = weatherNumber(input.currentPrecipitation, 0, 80, 0);
  const next = weatherNumber(input.nextHourPrecipitation, 0, 80, current);
  const probability = weatherNumber(input.precipitationProbability, 0, 100, current > 0 ? 100 : 0) / 100;
  const precipitationStrength = Math.min(1, Math.sqrt(current / 12));
  const trendStrength = Math.min(1, Math.sqrt(next / 12));
  const weatherStrength = precipitationStrength * 0.68 + trendStrength * 0.2 + probability * 0.12;
  return weatherStrength
    * weatherNumber(input.masterVolume, 0, 1, 0.45)
    * weatherNumber(input.duckFactor, 0, 1, 1);
}

export function parseRainformLocationPreference(raw: string | null): WeatherLocation | null {
  if (!raw) return null;
  try {
    const candidate = recordOf(JSON.parse(raw));
    if (candidate.version !== 1 || candidate.source !== "search") return null;
    const locations = normalizeWeatherSearchResponse({ results: [candidate] });
    return locations[0] ?? null;
  } catch {
    return null;
  }
}

export function serializeRainformLocationPreference(location: WeatherLocation) {
  if (location.source !== "search") return null;
  return JSON.stringify({
    version: 1,
    id: location.id,
    name: location.name,
    admin1: location.region,
    country: location.country,
    country_code: location.countryCode,
    latitude: Number(location.latitude.toFixed(5)),
    longitude: Number(location.longitude.toFixed(5)),
    timezone: location.timezone,
    source: "search",
  });
}

export function shouldAcceptWeatherResponse(requestId: number, latestRequestId: number, active: boolean) {
  return active && requestId === latestRequestId;
}

export function isForecastQuestion(text: string) {
  return /天气|预报|下雨|雨势|降水|温度|气温|刮风|风速|weather|forecast|rain|temperature/i.test(text.trim());
}

export function formatSolForecastContext(forecast: WeatherForecast, now = Date.now()) {
  const day = buildRainformForecastDay(forecast, now);
  const currentPrecipitation = interpolateForecastValue(day.values, day.timelineHour);
  const probability = interpolateForecastValue(day.probabilities, day.timelineHour);
  const trend = calculateForecastTrend(day.values, day.timelineHour);
  const location = [forecast.location.name, forecast.location.region].filter(Boolean).join(" · ");
  const stale = forecast.status === "stale" ? "这是一份缓存预报，可能已经过期。" : "这是最新获取的天气预报。";
  const rainText = currentPrecipitation === null
    ? "当前时段缺少可用的降水数据"
    : `当前时段预计降水 ${currentPrecipitation.toFixed(1)} mm/h`;
  const probabilityText = probability === null ? "" : `，降水概率约 ${Math.round(probability)}%`;
  const trendText = trend ? `；${FORECAST_TREND_LABELS[trend]}` : "";
  return `${location || "所选位置"}：${FORECAST_CONDITION_LABELS[forecast.current.condition]}，${rainText}${probabilityText}${trendText}。${stale}天气预报仅供参考。`;
}

export function selectRainformWeatherMode(
  mode: RainformWeatherMode,
  _hasForecast: boolean,
): RainformWeatherMode {
  return mode;
}
