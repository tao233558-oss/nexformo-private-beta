import assert from "node:assert/strict";
import test from "node:test";
import {
  RAINFORM_LOCATION_STORAGE_KEY,
  buildRainformForecastDay,
  calculateForecastTrend,
  calculateLiveRainAudioIntensity,
  formatSolForecastContext,
  interpolateForecastValue,
  isForecastQuestion,
  normalizeOpenMeteoForecast,
  normalizeReverseGeocodingResponse,
  normalizeWeatherSearchResponse,
  parseRainformLocationPreference,
  sanitizeWeatherForecast,
  selectRainformWeatherMode,
  serializeRainformLocationPreference,
  shouldAcceptWeatherResponse,
  type WeatherForecast,
  type WeatherHourlyPoint,
  type WeatherLocation,
} from "../shared/liveWeather";
import {
  WeatherProviderError,
  createMinimumIntervalScheduler,
  createReverseGeocodingResolver,
  fetchOpenMeteoForecast,
  resolveWeatherLocationWithFallback,
  reverseGeocodeLocation,
  searchOpenMeteoLocations,
} from "../serverWeather";

const shanghai: WeatherLocation = {
  id: "1796236",
  name: "上海",
  region: "上海",
  country: "中国",
  countryCode: "CN",
  latitude: 31.22222,
  longitude: 121.45806,
  timezone: "Asia/Shanghai",
  source: "search",
};

const point = (timestamp: number, precipitationMm: number, probability: number | null = 40): WeatherHourlyPoint => ({
  timestamp,
  temperatureC: 24,
  precipitationMm,
  precipitationProbability: probability,
  weatherCode: precipitationMm > 0 ? 61 : 1,
  condition: precipitationMm > 0 ? "rain" : "clear",
  windSpeedKmh: 8,
  windDirection: 120,
});

function shanghaiForecast(status: "live" | "stale" = "live"): WeatherForecast {
  const localMidnightUtc = Date.UTC(2026, 7, 23, 16);
  const hourly = Array.from({ length: 25 }, (_, hour) => point(localMidnightUtc + hour * 3_600_000, hour, hour * 4));
  return {
    provider: "open-meteo",
    providerLabel: "Open-Meteo",
    providerUrl: "https://open-meteo.com/",
    status,
    location: shanghai,
    fetchedAt: Date.UTC(2026, 7, 24, 4),
    issuedAt: Date.UTC(2026, 7, 24, 4),
    expiresAt: Date.UTC(2026, 7, 24, 4, 15),
    current: point(Date.UTC(2026, 7, 24, 4), 12, 48),
    hourly,
    partial: false,
  };
}

test("city results are normalized, bounded, de-duplicated and privacy-safe", () => {
  const results = normalizeWeatherSearchResponse({
    results: [
      { ...shanghai, admin1: "上海", country_code: "cn", source: "search" },
      { ...shanghai, name: "duplicate" },
      { id: "bad", name: "invalid", latitude: 999, longitude: 0 },
    ],
  });
  assert.equal(results.length, 1);
  assert.equal(results[0].countryCode, "CN");
  assert.equal(results[0].source, "search");
  assert.equal(parseRainformLocationPreference("not-json"), null);
  assert.equal(parseRainformLocationPreference('{"version":1,"source":"geolocation"}'), null);
  assert.equal(serializeRainformLocationPreference({ ...shanghai, source: "geolocation" }), null);
  assert.equal(RAINFORM_LOCATION_STORAGE_KEY, "nexformo.rainform.location.v1");
  assert.match(serializeRainformLocationPreference(shanghai) ?? "", /"version":1/);
});

test("reverse geocoding turns an explicit browser location into a safe city label", () => {
  const currentLocation: WeatherLocation = {
    ...shanghai,
    id: "current-location",
    name: "当前位置",
    region: "",
    country: "",
    countryCode: "",
    source: "geolocation",
  };
  const resolved = normalizeReverseGeocodingResponse({
    address: { city: "上海市", state: "上海市", country: "中国", country_code: "cn" },
  }, currentLocation);
  assert.equal(resolved.name, "上海市");
  assert.equal(resolved.region, "");
  assert.equal(resolved.country, "中国");
  assert.equal(resolved.countryCode, "CN");
  assert.equal(resolved.source, "geolocation");
  assert.equal(serializeRainformLocationPreference(resolved), null);
  assert.equal(normalizeReverseGeocodingResponse({}, currentLocation).name, "当前位置");
});

test("reverse geocoding uses safe city-to-state fallbacks and removes duplicate regions", () => {
  const currentLocation: WeatherLocation = {
    ...shanghai,
    id: "current-location",
    name: "当前位置",
    region: "",
    country: "",
    countryCode: "",
    source: "geolocation",
  };
  const candidates = [
    ["city", "上海市"],
    ["town", "乌镇镇"],
    ["village", "宏村"],
    ["municipality", "重庆市"],
    ["county", "德清县"],
    ["state", "浙江省"],
  ] as const;
  for (const [field, expected] of candidates) {
    const resolved = normalizeReverseGeocodingResponse({
      address: { [field]: expected, state: expected, country: "中国", country_code: "cn" },
    }, currentLocation);
    assert.equal(resolved.name, expected);
    assert.equal(resolved.region, "");
  }

  const oversized = normalizeReverseGeocodingResponse({
    address: {
      city: `城市${"名".repeat(200)}`,
      state: `地区${"名".repeat(200)}`,
      country: `国家${"名".repeat(200)}`,
      country_code: "chn-long-invalid",
    },
  }, currentLocation);
  assert.equal(oversized.name.length, 80);
  assert.equal(oversized.region.length, 80);
  assert.equal(oversized.country.length, 80);
  assert.equal(oversized.countryCode, "");
  assert.deepEqual(normalizeReverseGeocodingResponse({ address: { city: { unsafe: true } } }, currentLocation), currentLocation);
  assert.deepEqual(normalizeReverseGeocodingResponse({ name: "不应作为城市名的兴趣点" }, currentLocation), currentLocation);
});

test("reverse geocoding cache deduplicates concurrent rounded coordinates and expires deterministically", async () => {
  let currentTime = 1_000;
  let lookups = 0;
  let releaseFirst = () => {};
  const firstGate = new Promise<void>((resolve) => {
    releaseFirst = resolve;
  });
  const resolver = createReverseGeocodingResolver(async (location) => {
    lookups += 1;
    if (lookups === 1) await firstGate;
    return { ...location, name: "上海市" };
  }, { now: () => currentTime, ttlMs: 5_000 });
  const currentLocation: WeatherLocation = {
    ...shanghai,
    id: "current-location",
    name: "当前位置",
    source: "geolocation",
  };

  const first = resolver(currentLocation);
  const duplicate = resolver({ ...currentLocation, latitude: currentLocation.latitude + 0.0001 });
  assert.equal(lookups, 1);
  releaseFirst();
  const [firstResult, duplicateResult] = await Promise.all([first, duplicate]);
  assert.equal(firstResult.name, "上海市");
  assert.strictEqual(firstResult, duplicateResult);
  assert.equal((await resolver(currentLocation)).name, "上海市");
  assert.equal(lookups, 1);

  currentTime += 5_001;
  assert.equal((await resolver(currentLocation)).name, "上海市");
  assert.equal(lookups, 2);
});

test("reverse geocoding requests are serialized and start at least one interval apart", async () => {
  let currentTime = 0;
  const waits: number[] = [];
  const starts: number[] = [];
  let releaseFirst = () => {};
  const firstGate = new Promise<void>((resolve) => {
    releaseFirst = resolve;
  });
  const schedule = createMinimumIntervalScheduler({
    intervalMs: 1_100,
    now: () => currentTime,
    wait: async (milliseconds) => {
      waits.push(milliseconds);
      currentTime += milliseconds;
    },
  });
  const first = schedule(async () => {
    starts.push(currentTime);
    await firstGate;
    return "first";
  });
  const second = schedule(async () => {
    starts.push(currentTime);
    return "second";
  });
  await Promise.resolve();
  assert.deepEqual(starts, [0]);
  releaseFirst();
  assert.deepEqual(await Promise.all([first, second]), ["first", "second"]);
  assert.deepEqual(waits, [1_100]);
  assert.deepEqual(starts, [0, 1_100]);
});

test("weather location calmly falls back when optional reverse geocoding fails", async () => {
  const currentLocation: WeatherLocation = {
    ...shanghai,
    id: "current-location",
    name: "当前位置",
    source: "geolocation",
  };
  let reported = false;
  const resolved = await resolveWeatherLocationWithFallback(
    currentLocation,
    async () => { throw new WeatherProviderError("UNAVAILABLE", "offline"); },
    () => { reported = true; },
  );
  assert.strictEqual(resolved, currentLocation);
  assert.equal(reported, true);
  const forecast = normalizeOpenMeteoForecast({
    timezone: "Asia/Shanghai",
    current: { time: 1_777_000_000, precipitation: 0, weather_code: 1, wind_speed_10m: 2, wind_direction_10m: 90 },
    hourly: {
      time: [1_777_000_000],
      precipitation: [0],
      precipitation_probability: [10],
      temperature_2m: [20],
      weather_code: [1],
      wind_speed_10m: [2],
      wind_direction_10m: [90],
    },
  }, resolved, "live", 10_000);
  assert.equal(forecast.status, "live");
  assert.equal(forecast.location.name, "当前位置");
});

test("Open-Meteo payload normalization skips missing hours instead of inventing zero rain", () => {
  const payload = {
    timezone: "Asia/Shanghai",
    current: {
      time: 1_777_000_000,
      temperature_2m: 20,
      precipitation: 0.4,
      precipitation_probability: 65,
      weather_code: 61,
      wind_speed_10m: 12,
      wind_direction_10m: 361,
    },
    hourly: {
      time: [1_777_000_000, 1_777_003_600, 1_777_007_200],
      precipitation: [0.2, null, 2.6],
      precipitation_probability: [20, 40, 110],
      temperature_2m: [20, 21, 22],
      weather_code: [51, 61, 95],
      wind_speed_10m: [2, 3, 4],
      wind_direction_10m: [20, 30, 40],
    },
  };
  const forecast = normalizeOpenMeteoForecast(payload, shanghai, "live", 1234);
  assert.equal(forecast.hourly.length, 2);
  assert.deepEqual(forecast.hourly.map((hour) => hour.precipitationMm), [0.2, 2.6]);
  assert.equal(forecast.hourly[1].precipitationProbability, 100);
  assert.equal(forecast.current.condition, "rain");
  assert.equal(forecast.current.windDirection, 0);
});

test("selected-location local time maps exactly onto the 00-24 Rainform timeline", () => {
  const now = Date.UTC(2026, 7, 24, 4, 30);
  const day = buildRainformForecastDay(shanghaiForecast(), now);
  assert.equal(day.localDate, "2026-08-24");
  assert.equal(day.timeLabel, "12:30");
  assert.equal(day.timelineHour, 12.5);
  assert.equal(day.coverage, 25);
  assert.equal(day.values[0], 0);
  assert.equal(day.values[24], 24);
  assert.equal(interpolateForecastValue(day.values, day.timelineHour), 12.5);
  assert.equal(interpolateForecastValue([1, null, 3], 0.5), null);
});

test("DST duplicate and missing local hours remain honest", () => {
  const newYork: WeatherLocation = { ...shanghai, id: "nyc", name: "New York", timezone: "America/New_York" };
  const forecast: WeatherForecast = {
    ...shanghaiForecast(),
    location: newYork,
    hourly: [
      point(Date.UTC(2026, 10, 1, 5), 1, 20),
      point(Date.UTC(2026, 10, 1, 6), 3, 40),
      point(Date.UTC(2026, 10, 1, 8), 8, 80),
    ],
    partial: true,
  };
  const day = buildRainformForecastDay(forecast, Date.UTC(2026, 10, 1, 17));
  assert.equal(day.localDate, "2026-11-01");
  assert.equal(day.values[1], 2);
  assert.equal(day.probabilities[1], 30);
  assert.equal(day.values[2], null);
  assert.equal(day.availableHours[2], false);
  assert.equal(day.partial, true);
});

test("current-period trend and audio intensity respond to forecast rather than daily mean", () => {
  assert.equal(calculateForecastTrend([0, 0, 2], 1), "increasing");
  assert.equal(calculateForecastTrend([3, 1, 1], 0), "decreasing");
  const quiet = calculateLiveRainAudioIntensity({
    currentPrecipitation: 0,
    precipitationProbability: 0,
    nextHourPrecipitation: 0,
    masterVolume: 1,
    duckFactor: 1,
  });
  const raining = calculateLiveRainAudioIntensity({
    currentPrecipitation: 8,
    precipitationProbability: 90,
    nextHourPrecipitation: 12,
    masterVolume: 1,
    duckFactor: 1,
  });
  const ducked = calculateLiveRainAudioIntensity({
    currentPrecipitation: 8,
    precipitationProbability: 90,
    nextHourPrecipitation: 12,
    masterVolume: 1,
    duckFactor: 0.08,
  });
  assert.equal(quiet, 0);
  assert.ok(raining > 0.8);
  assert.ok(ducked < raining * 0.09);
});

test("forecast sanitization, cancellation guards and mode fallback reject unsafe state", () => {
  const forecast = shanghaiForecast();
  assert.ok(sanitizeWeatherForecast(forecast));
  assert.equal(sanitizeWeatherForecast({ ...forecast, hourly: [] }), null);
  assert.equal(shouldAcceptWeatherResponse(4, 4, true), true);
  assert.equal(shouldAcceptWeatherResponse(3, 4, true), false);
  assert.equal(shouldAcceptWeatherResponse(4, 4, false), false);
  assert.equal(selectRainformWeatherMode("live", false), "live");
  assert.equal(selectRainformWeatherMode("live", true), "live");
  assert.equal(sanitizeWeatherForecast({ ...forecast, status: "unavailable" })?.status, "unavailable");
});

test("Sol answers forecast questions from the selected shared snapshot and labels stale data", () => {
  const message = formatSolForecastContext(shanghaiForecast("stale"), Date.UTC(2026, 7, 24, 4, 30));
  assert.equal(isForecastQuestion("Sol，上海接下来会下雨吗？"), true);
  assert.equal(isForecastQuestion("播放一首歌"), false);
  assert.match(message, /上海/);
  assert.match(message, /缓存预报/);
  assert.match(message, /仅供参考/);
  assert.doesNotMatch(message, /31\.22222|121\.45806/);
  assert.equal(shanghaiForecast().providerLabel, "Open-Meteo");
  assert.equal(shanghaiForecast().providerUrl, "https://open-meteo.com/");
});

test("server-only providers normalize timeout and unavailable errors", { concurrency: false }, async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () => { throw new DOMException("timed out", "TimeoutError"); };
    await assert.rejects(
      searchOpenMeteoLocations("上海"),
      (error: unknown) => error instanceof WeatherProviderError && error.code === "TIMEOUT",
    );

    globalThis.fetch = async () => new Response("service unavailable", { status: 503 });
    await assert.rejects(
      searchOpenMeteoLocations("上海"),
      (error: unknown) => error instanceof WeatherProviderError && error.code === "UNAVAILABLE",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("server-only provider adapter sends documented forecast and geocoding parameters", { concurrency: false }, async () => {
  const originalFetch = globalThis.fetch;
  const requested: URL[] = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    requested.push(url);
    if (url.hostname === "nominatim.openstreetmap.org") {
      assert.match(String(new Headers(init?.headers).get("User-Agent")), /Nexformo/);
      return new Response(JSON.stringify({
        address: { city: "上海市", state: "上海市", country: "中国", country_code: "cn" },
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.hostname.startsWith("geocoding-api")) {
      return new Response(JSON.stringify({ results: [{ ...shanghai, country_code: "CN" }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({
      timezone: "Asia/Shanghai",
      current: { time: 1_777_000_000, precipitation: 0, weather_code: 1, wind_speed_10m: 2, wind_direction_10m: 90 },
      hourly: {
        time: [1_777_000_000, 1_777_003_600],
        precipitation: [0, 1],
        precipitation_probability: [10, 50],
        temperature_2m: [20, 21],
        weather_code: [1, 61],
        wind_speed_10m: [2, 3],
        wind_direction_10m: [90, 100],
      },
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  };
  try {
    const results = await searchOpenMeteoLocations("上海");
    const forecast = await fetchOpenMeteoForecast(shanghai, "live", 10_000);
    const currentLocation = await reverseGeocodeLocation({ ...shanghai, source: "geolocation", name: "当前位置" });
    assert.equal(results[0].name, "上海");
    assert.equal(forecast.location.timezone, "Asia/Shanghai");
    assert.equal(requested[0].searchParams.get("language"), "zh");
    assert.equal(requested[1].searchParams.get("timezone"), "auto");
    assert.equal(requested[1].searchParams.get("timeformat"), "unixtime");
    assert.match(requested[1].searchParams.get("hourly") ?? "", /precipitation_probability/);
    assert.equal(currentLocation.name, "上海市");
    assert.equal(requested[2].searchParams.get("zoom"), "10");
    assert.equal(requested[2].searchParams.get("format"), "jsonv2");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
