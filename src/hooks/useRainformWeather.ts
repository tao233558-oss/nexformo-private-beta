import { useCallback, useEffect, useRef, useState } from "react";
import {
  RAINFORM_LOCATION_STORAGE_KEY,
  normalizeWeatherSearchResponse,
  parseRainformLocationPreference,
  sanitizeWeatherForecast,
  serializeRainformLocationPreference,
  shouldAcceptWeatherResponse,
  type RainformWeatherMode,
  type WeatherForecast,
  type WeatherLocation,
} from "../../shared/liveWeather";

type AsyncStatus = "idle" | "loading" | "ready" | "error";

const responseError = async (response: Response, fallback: string) => {
  try {
    const payload = await response.json() as { error?: unknown };
    return typeof payload.error === "string" ? payload.error : fallback;
  } catch {
    return fallback;
  }
};

const forecastUrl = (location: WeatherLocation) => {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    id: location.id,
    name: location.name,
    region: location.region,
    country: location.country,
    countryCode: location.countryCode,
    timezone: location.timezone,
    source: location.source,
  });
  return `/api/weather/forecast?${params.toString()}`;
};

export function useRainformWeather(open: boolean) {
  const [mode, setModeState] = useState<RainformWeatherMode>("demo");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WeatherLocation[]>([]);
  const [searchStatus, setSearchStatus] = useState<AsyncStatus>("idle");
  const [forecastStatus, setForecastStatus] = useState<AsyncStatus>("idle");
  const [error, setError] = useState("");
  const [geolocationDenied, setGeolocationDenied] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation | null>(() => {
    if (typeof window === "undefined") return null;
    return parseRainformLocationPreference(window.localStorage.getItem(RAINFORM_LOCATION_STORAGE_KEY));
  });
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const activeRef = useRef(open);
  const searchControllerRef = useRef<AbortController | null>(null);
  const forecastControllerRef = useRef<AbortController | null>(null);
  const searchRequestRef = useRef(0);
  const forecastRequestRef = useRef(0);

  activeRef.current = open;

  useEffect(() => {
    if (open) return;
    activeRef.current = false;
    searchRequestRef.current += 1;
    forecastRequestRef.current += 1;
    searchControllerRef.current?.abort();
    forecastControllerRef.current?.abort();
    setSearchStatus("idle");
    setForecastStatus("idle");
    setResults([]);
    setQuery("");
  }, [open]);

  const loadForecast = useCallback(async (location: WeatherLocation) => {
    const requestId = ++forecastRequestRef.current;
    forecastControllerRef.current?.abort();
    const controller = new AbortController();
    forecastControllerRef.current = controller;
    setForecastStatus("loading");
    setError("");
    try {
      const response = await fetch(forecastUrl(location), {
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(12_000)]),
      });
      if (!response.ok) throw new Error(await responseError(response, "天气预报暂时不可用。"));
      const payload = await response.json() as { forecast?: unknown };
      const normalized = sanitizeWeatherForecast(payload.forecast);
      if (!normalized) throw new Error("天气服务返回了无法识别的数据。");
      if (!shouldAcceptWeatherResponse(requestId, forecastRequestRef.current, activeRef.current)) return;
      setForecast(normalized);
      setSelectedLocation(normalized.location);
      setForecastStatus("ready");
    } catch (requestError) {
      if (controller.signal.aborted || !shouldAcceptWeatherResponse(requestId, forecastRequestRef.current, activeRef.current)) return;
      setForecastStatus("error");
      setError(requestError instanceof Error ? requestError.message : "天气预报暂时不可用。");
    }
  }, []);

  useEffect(() => {
    searchControllerRef.current?.abort();
    const trimmed = query.trim();
    if (!open || trimmed.length < 2) {
      setResults([]);
      setSearchStatus("idle");
      return;
    }
    const requestId = ++searchRequestRef.current;
    const controller = new AbortController();
    searchControllerRef.current = controller;
    setSearchStatus("loading");
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/weather/search?q=${encodeURIComponent(trimmed)}`, {
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10_000)]),
        });
        if (!response.ok) throw new Error(await responseError(response, "城市搜索暂时不可用。"));
        const payload = await response.json() as { results?: unknown };
        const normalized = normalizeWeatherSearchResponse({ results: payload.results });
        if (!shouldAcceptWeatherResponse(requestId, searchRequestRef.current, activeRef.current)) return;
        setResults(normalized);
        setSearchStatus("ready");
        setError(normalized.length ? "" : "没有找到匹配的城市，请尝试更完整的名称。");
      } catch (requestError) {
        if (controller.signal.aborted || !shouldAcceptWeatherResponse(requestId, searchRequestRef.current, activeRef.current)) return;
        setResults([]);
        setSearchStatus("error");
        setError(requestError instanceof Error ? requestError.message : "城市搜索暂时不可用。");
      }
    }, 360);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [open, query]);

  const selectLocation = useCallback((location: WeatherLocation) => {
    setSelectedLocation(location);
    setQuery("");
    setResults([]);
    const serialized = serializeRainformLocationPreference(location);
    try {
      if (serialized) window.localStorage.setItem(RAINFORM_LOCATION_STORAGE_KEY, serialized);
    } catch {
      // Location persistence is optional.
    }
    void loadForecast(location);
  }, [loadForecast]);

  const useCurrentLocation = useCallback(() => {
    if (geolocationDenied) {
      setError("本次访问中定位权限已被拒绝，你仍然可以搜索城市。");
      return;
    }
    if (!navigator.geolocation) {
      setError("当前浏览器无法提供定位，请改用城市搜索。");
      return;
    }
    setForecastStatus("loading");
    setError("正在读取当前位置；位置仅用于本次天气与城市识别请求。");
    const requestId = ++forecastRequestRef.current;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!shouldAcceptWeatherResponse(requestId, forecastRequestRef.current, activeRef.current)) return;
        const location: WeatherLocation = {
          id: "current-location",
          name: "当前位置",
          region: "",
          country: "",
          countryCode: "",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
          source: "geolocation",
        };
        setSelectedLocation(location);
        void loadForecast(location);
      },
      (positionError) => {
        if (!shouldAcceptWeatherResponse(requestId, forecastRequestRef.current, activeRef.current)) return;
        const denied = positionError.code === positionError.PERMISSION_DENIED;
        if (denied) setGeolocationDenied(true);
        setForecastStatus("error");
        setError(
          denied
            ? "定位权限被拒绝；你仍然可以搜索城市。"
            : positionError.code === positionError.TIMEOUT
              ? "定位等待时间过长，请重试或搜索城市。"
              : "暂时无法获取当前位置，请改用城市搜索。",
        );
      },
      { enableHighAccuracy: false, maximumAge: 10 * 60_000, timeout: 10_000 },
    );
  }, [geolocationDenied, loadForecast]);

  const setMode = useCallback((nextMode: RainformWeatherMode) => {
    setModeState(nextMode);
    setError("");
    if (nextMode === "live" && selectedLocation && !forecast) void loadForecast(selectedLocation);
  }, [forecast, loadForecast, selectedLocation]);

  const retry = useCallback(() => {
    if (selectedLocation) void loadForecast(selectedLocation);
  }, [loadForecast, selectedLocation]);

  return {
    mode,
    setMode,
    query,
    setQuery,
    results,
    searchStatus,
    forecastStatus,
    error,
    geolocationDenied,
    selectedLocation,
    forecast,
    selectLocation,
    useCurrentLocation,
    retry,
  };
}
