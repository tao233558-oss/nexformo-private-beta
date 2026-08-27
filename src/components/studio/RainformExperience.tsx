import {
  ArrowLeft,
  CloudRain,
  ExternalLink,
  LoaderCircle,
  LocateFixed,
  MapPin,
  Mic,
  RefreshCw,
  Search,
  Square,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VoiceActivity } from "../../../shared/companion";
import {
  FORECAST_CONDITION_LABELS,
  FORECAST_TREND_LABELS,
  buildRainformForecastDay,
  calculateForecastTrend,
  interpolateForecastValue,
  type RainformWeatherMode,
  type WeatherForecast,
} from "../../../shared/liveWeather";
import { useRainformWeather } from "../../hooks/useRainformWeather";
import {
  RAINFORM_AUDIO_STORAGE_KEY,
  RAINFORM_BRIDGE_CHANNEL,
  isRainformForecastBridgePayload,
  isRainformBridgeMessage,
  parseRainformAudioPreference,
  rainformDuckFactor,
  rainformVoiceState,
} from "../../lib/rainformControls";

type RainformExperienceProps = {
  open: boolean;
  voiceModeOpen: boolean;
  voiceActivity: VoiceActivity;
  voiceEnabled: boolean;
  voiceError: string;
  voiceAudioLevel: number;
  voiceLabel: string;
  onVoiceModeOpenChange: (open: boolean) => void;
  onStartVoice: () => Promise<void>;
  onStopVoice: () => void;
  onStopSpeaking: () => void;
  onForecastChange?: (forecast: WeatherForecast | null) => void;
  onClose: () => void;
};

const voiceCopy = {
  idle: { title: "和 Sol 说话", hint: "轻点后开始，只保留声音" },
  connecting: { title: "正在连接 Sol", hint: "正在准备麦克风与语音服务" },
  listening: { title: "Sol 在听", hint: "自然说话，停顿后会自动发送" },
  thinking: { title: "Sol 在想", hint: "雨声已自动压低" },
  speaking: { title: "Sol 正在回答", hint: "轻点可以停止播放" },
  error: { title: "暂时无法使用语音", hint: "检查麦克风权限后可重试" },
} as const;

function formatForecastTime(timestamp: number, timezone: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      timeZone: timezone,
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(timestamp);
  } catch {
    return "时间未知";
  }
}

export default function RainformExperience({
  open,
  voiceModeOpen,
  voiceActivity,
  voiceEnabled,
  voiceError,
  voiceAudioLevel,
  voiceLabel,
  onVoiceModeOpenChange,
  onStartVoice,
  onStopVoice,
  onStopSpeaking,
  onForecastChange,
  onClose,
}: RainformExperienceProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [bridgeReady, setBridgeReady] = useState(false);
  const [audioPanelOpen, setAudioPanelOpen] = useState(false);
  const [rainMuted, setRainMuted] = useState(true);
  const [locationPickerOpen, setLocationPickerOpen] = useState(false);
  const [weatherClock, setWeatherClock] = useState(() => Date.now());
  const [rainVolume, setRainVolume] = useState(() => {
    if (typeof window === "undefined") return 0.45;
    return parseRainformAudioPreference(window.localStorage.getItem(RAINFORM_AUDIO_STORAGE_KEY)).volume;
  });

  const voiceState = rainformVoiceState(voiceActivity, voiceModeOpen);
  const voiceText = voiceCopy[voiceState];
  const duckFactor = useMemo(() => rainformDuckFactor(voiceActivity), [voiceActivity]);
  const weather = useRainformWeather(open);
  const forecastDay = useMemo(
    () => weather.forecast ? buildRainformForecastDay(weather.forecast, weatherClock) : null,
    [weather.forecast, weatherClock],
  );
  const currentRainfall = forecastDay
    ? interpolateForecastValue(forecastDay.values, forecastDay.timelineHour)
    : null;
  const currentProbability = forecastDay
    ? interpolateForecastValue(forecastDay.probabilities, forecastDay.timelineHour)
    : null;
  const forecastTrend = forecastDay
    ? calculateForecastTrend(forecastDay.values, forecastDay.timelineHour)
    : null;

  const postBridge = useCallback((type: string, payload: Record<string, unknown> = {}) => {
    const target = iframeRef.current?.contentWindow;
    if (!target || typeof window === "undefined") return;
    target.postMessage({ channel: RAINFORM_BRIDGE_CHANNEL, type, ...payload }, window.location.origin);
  }, []);

  useEffect(() => {
    if (open) return;
    setLoaded(false);
    setBridgeReady(false);
    setAudioPanelOpen(false);
    setLocationPickerOpen(false);
    setRainMuted(true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setWeatherClock(Date.now());
    const timer = window.setInterval(() => setWeatherClock(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    onForecastChange?.(weather.forecast);
  }, [onForecastChange, open, weather.forecast]);

  useEffect(() => {
    if (!open) return;
    const receiveBridgeMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (!isRainformBridgeMessage(event.data)) return;
      if (event.data.type === "rainform.ready") setBridgeReady(true);
      if (event.data.type === "rainform.audio.state" && typeof event.data.enabled === "boolean") {
        setRainMuted(!event.data.enabled);
      }
    };
    window.addEventListener("message", receiveBridgeMessage);
    return () => window.removeEventListener("message", receiveBridgeMessage);
  }, [open]);

  useEffect(() => {
    if (!open || !bridgeReady) return;
    postBridge("rainform.audio.configure", { masterVolume: rainVolume, muted: true, duckFactor });
    // Configuration runs only for a fresh iframe. Subsequent volume changes
    // use dedicated bridge messages so they never re-apply the initial mute.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bridgeReady, open, postBridge]);

  useEffect(() => {
    if (!open || !bridgeReady) return;
    postBridge("rainform.audio.setDucking", { duckFactor });
  }, [bridgeReady, duckFactor, open, postBridge]);

  useEffect(() => {
    if (!open || !bridgeReady) return;
    postBridge("rainform.weather.setMode", { mode: weather.mode });
  }, [bridgeReady, open, postBridge, weather.mode]);

  useEffect(() => {
    if (!open || !bridgeReady || weather.mode !== "live" || !weather.forecast || !forecastDay) return;
    const payload = {
      status: weather.forecast.status,
      locationLabel: [weather.forecast.location.name, weather.forecast.location.region].filter(Boolean).join(" · "),
      conditionLabel: FORECAST_CONDITION_LABELS[weather.forecast.current.condition],
      day: forecastDay,
    };
    if (isRainformForecastBridgePayload(payload)) postBridge("rainform.weather.setForecast", payload);
  }, [bridgeReady, forecastDay, open, postBridge, weather.forecast, weather.mode]);

  useEffect(() => {
    if (!open) return;
    return () => postBridge("rainform.audio.stop");
  }, [open, postBridge]);

  const toggleRainSound = useCallback(() => {
    const nextMuted = !rainMuted;
    setRainMuted(nextMuted);
    postBridge("rainform.audio.setMuted", { muted: nextMuted, userGesture: true });
  }, [postBridge, rainMuted]);

  const changeRainVolume = useCallback((value: number) => {
    const nextVolume = Math.min(1, Math.max(0, value));
    setRainVolume(nextVolume);
    window.localStorage.setItem(RAINFORM_AUDIO_STORAGE_KEY, JSON.stringify({ volume: nextVolume }));
    setRainMuted(false);
    postBridge("rainform.audio.setVolume", { masterVolume: nextVolume, unmute: true, userGesture: true });
  }, [postBridge]);

  const handleVoicePrimary = useCallback(async () => {
    if (voiceState === "speaking") {
      onStopSpeaking();
      return;
    }
    if (voiceModeOpen && voiceEnabled) {
      onStopVoice();
      onVoiceModeOpenChange(false);
      return;
    }
    if (voiceModeOpen) onStopVoice();
    onVoiceModeOpenChange(true);
    await onStartVoice();
  }, [onStartVoice, onStopSpeaking, onStopVoice, onVoiceModeOpenChange, voiceEnabled, voiceModeOpen, voiceState]);

  const closeVoiceMode = useCallback(() => {
    onStopVoice();
    onVoiceModeOpenChange(false);
  }, [onStopVoice, onVoiceModeOpenChange]);

  const closeExperience = useCallback(() => {
    postBridge("rainform.audio.stop");
    closeVoiceMode();
    onClose();
  }, [closeVoiceMode, onClose, postBridge]);

  const changeWeatherMode = useCallback((mode: RainformWeatherMode) => {
    weather.setMode(mode);
    if (mode === "live" && !weather.forecast) setLocationPickerOpen(true);
  }, [weather]);

  const chooseLocation = useCallback((location: Parameters<typeof weather.selectLocation>[0]) => {
    weather.selectLocation(location);
    setLocationPickerOpen(false);
  }, [weather]);

  if (!open) return null;

  return (
    <section
      className="fixed inset-0 z-[120] overflow-hidden bg-black text-white"
      data-rainform-overlay="active"
      data-rainform-voice-state={voiceState}
      aria-label="Rainform 数据成雨非商业实验模式"
    >
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black" role="status">
          <div className="text-center">
            <span className="mx-auto block h-7 w-7 animate-spin rounded-full border border-white/15 border-t-white/70" />
            <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-white/45">正在生成数据雨幕</p>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src="/rainform/index.html?lang=zh-CN"
        title="Rainform 数据成雨"
        className="h-full w-full border-0 bg-black"
        allow="fullscreen"
        onLoad={() => setLoaded(true)}
      />

      <div className="pointer-events-none absolute left-5 top-5 z-20 flex max-w-[min(560px,calc(100vw-40px))] flex-col items-start gap-3">
        <button
          type="button"
          onClick={closeExperience}
          className="pointer-events-auto flex h-10 items-center gap-2 rounded-full border border-white/15 bg-black/55 px-4 text-[10px] tracking-[0.12em] text-white/75 backdrop-blur-xl transition-colors hover:border-white/35 hover:text-white"
          aria-label="返回 Nexformo"
        >
          <ArrowLeft size={13} strokeWidth={1.5} />
          返回 Nexformo
        </button>

        <div className="hidden rounded-full border border-white/10 bg-black/45 px-4 py-2.5 text-[9px] leading-relaxed text-white/50 backdrop-blur-xl md:block">
          <span className="mr-2 text-white/75">非商业实验接入</span>
          Rainform / 数据成雨 © 2026 afterimage
          <a
            href="https://rainform.pages.dev/"
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto ml-2 inline-flex items-center gap-1 text-white/70 transition-colors hover:text-white"
          >
            原项目 <ExternalLink size={9} />
          </a>
        </div>
      </div>

      <aside
        className="pointer-events-auto absolute right-3 top-16 z-30 max-h-[calc(100vh-5rem)] w-[min(360px,calc(100vw-24px))] overflow-y-auto rounded-2xl border border-white/15 bg-black/68 p-3.5 shadow-2xl backdrop-blur-2xl md:right-5"
        aria-label="Rainform 天气数据模式"
        data-weather-panel={weather.mode}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.12em] text-white/72">
            <CloudRain size={14} strokeWidth={1.5} aria-hidden="true" />
            天气数据
          </div>
          <div className="flex rounded-full border border-white/10 bg-white/[0.04] p-0.5" role="group" aria-label="天气数据模式">
            {(["demo", "live"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => changeWeatherMode(mode)}
                aria-pressed={weather.mode === mode}
                className={`rounded-full px-3 py-1.5 text-[9px] tracking-[0.1em] transition ${
                  weather.mode === mode ? "bg-white/14 text-white" : "text-white/42 hover:text-white/75"
                }`}
              >
                {mode === "demo" ? "创意演示" : "实时预报"}
              </button>
            ))}
          </div>
        </div>

        {weather.mode === "demo" ? (
          <div className="mt-3 border-t border-white/8 pt-3">
            <p className="text-[11px] text-white/72">演示数据 · 可自由编辑</p>
            <p className="mt-1 text-[9px] leading-relaxed text-white/38">
              当前曲线用于创意体验，不代表真实天气。右上角编辑按钮可调整 00–24 时的降雨形态。
            </p>
          </div>
        ) : (
          <div className="mt-3 border-t border-white/8 pt-3">
            {weather.forecast ? (
              <div data-weather-card={weather.forecast.status}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[12px] text-white/88">
                      {[weather.forecast.location.name, weather.forecast.location.region].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-1 text-[9px] text-white/42">
                      {forecastDay?.timeLabel ?? "--:--"} · {weather.forecast.location.timezone} ·{" "}
                      {FORECAST_CONDITION_LABELS[weather.forecast.current.condition]}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-1 text-[8px] tracking-[0.08em] ${
                    weather.forecast.status === "stale"
                      ? "bg-amber-300/10 text-amber-100/70"
                      : "bg-cyan-300/10 text-cyan-100/72"
                  }`}>
                    {weather.forecast.status === "stale" ? "缓存数据，可能已过期" : "实时预报"}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-white/8 bg-white/[0.035] p-2.5">
                    <p className="text-[8px] tracking-[0.1em] text-white/36">当前时段降水</p>
                    <p className="mt-1 text-lg font-light text-white/90">
                      {currentRainfall === null ? "--" : currentRainfall.toFixed(1)}
                      <span className="ml-1 text-[9px] text-white/42">mm/h</span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-white/[0.035] p-2.5">
                    <p className="text-[8px] tracking-[0.1em] text-white/36">降水概率</p>
                    <p className="mt-1 text-lg font-light text-white/90">
                      {currentProbability === null ? "--" : Math.round(currentProbability)}
                      <span className="ml-1 text-[9px] text-white/42">%</span>
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-[9px] leading-relaxed text-white/48">
                  {forecastTrend ? FORECAST_TREND_LABELS[forecastTrend] : "当前时段的趋势数据不完整。"}
                </p>
                {(weather.forecast.partial || forecastDay?.partial) && (
                  <p className="mt-1.5 text-[8px] leading-relaxed text-amber-50/48" role="status">
                    部分时段缺少预报数据，时间轴仅呈现可用范围。
                  </p>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[8px] text-white/32">
                  <span>更新于 {formatForecastTime(weather.forecast.fetchedAt, weather.forecast.location.timezone)}</span>
                  <span aria-hidden="true">·</span>
                  <a
                    href={weather.forecast.providerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/52 underline-offset-2 hover:text-white hover:underline"
                  >
                    Open-Meteo 数据源
                  </a>
                  {weather.forecast.location.source === "search" && (
                    <>
                      <span aria-hidden="true">·</span>
                      <a
                        href="https://www.geonames.org/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/52 underline-offset-2 hover:text-white hover:underline"
                      >
                        GeoNames 城市数据
                      </a>
                    </>
                  )}
                  {weather.forecast.location.source === "geolocation" && (
                    <>
                      <span aria-hidden="true">·</span>
                      <a
                        href="https://www.openstreetmap.org/copyright"
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/52 underline-offset-2 hover:text-white hover:underline"
                      >
                        © OpenStreetMap 地名
                      </a>
                    </>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setLocationPickerOpen((value) => !value)}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] text-white/55 transition hover:border-white/25 hover:text-white"
                    aria-expanded={locationPickerOpen}
                  >
                    更换城市
                  </button>
                  {weather.forecastStatus === "loading" && (
                    <span className="flex items-center gap-1.5 text-[8px] text-white/38" role="status">
                      <LoaderCircle size={10} className="animate-spin" /> 正在刷新
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[10px] text-white/54" role="status">
                {weather.forecastStatus === "loading" ? <LoaderCircle size={13} className="animate-spin" /> : <MapPin size={13} />}
                {weather.forecastStatus === "loading" ? "正在获取天气预报…" : "选择城市，或明确授权当前位置。"}
              </div>
            )}

            {(locationPickerOpen || !weather.forecast) && (
              <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-2.5" data-location-picker="open">
                <label htmlFor="rainform-city-search" className="sr-only">搜索城市</label>
                <div className="flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-2.5 focus-within:border-white/28">
                  <Search size={12} className="shrink-0 text-white/35" aria-hidden="true" />
                  <input
                    id="rainform-city-search"
                    value={weather.query}
                    onChange={(event) => weather.setQuery(event.currentTarget.value)}
                    placeholder="搜索城市，例如：杭州"
                    autoComplete="off"
                    aria-controls="rainform-city-results"
                    aria-expanded={weather.results.length > 0}
                    className="h-9 min-w-0 flex-1 bg-transparent text-[10px] text-white/82 outline-none placeholder:text-white/28"
                  />
                  {weather.searchStatus === "loading" && <LoaderCircle size={11} className="animate-spin text-white/38" aria-label="正在搜索" />}
                </div>
                {weather.results.length > 0 && (
                  <div id="rainform-city-results" className="mt-2 max-h-36 overflow-y-auto" role="listbox" aria-label="城市搜索结果">
                    {weather.results.map((location) => (
                      <button
                        key={location.id}
                        type="button"
                        role="option"
                        aria-selected="false"
                        onClick={() => chooseLocation(location)}
                        className="flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left transition hover:bg-white/[0.07] focus:bg-white/[0.07] focus:outline-none"
                      >
                        <MapPin size={11} className="mt-0.5 shrink-0 text-white/35" />
                        <span className="min-w-0">
                          <span className="block truncate text-[10px] text-white/75">{location.name}</span>
                          <span className="block truncate text-[8px] text-white/34">
                            {[location.region, location.country].filter(Boolean).join(" · ")}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={weather.useCurrentLocation}
                  disabled={weather.geolocationDenied || weather.forecastStatus === "loading"}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-[9px] text-white/52 transition hover:border-white/24 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <LocateFixed size={11} /> 使用当前位置（天气与城市识别）
                </button>
              </div>
            )}

            {weather.error && (
              <div className="mt-2 flex items-start justify-between gap-2 rounded-lg bg-amber-200/[0.06] px-2.5 py-2" role="status" aria-live="polite">
                <p className="text-[8px] leading-relaxed text-amber-50/60">{weather.error}</p>
                {weather.selectedLocation && weather.forecastStatus === "error" && (
                  <button type="button" onClick={weather.retry} className="shrink-0 text-amber-50/70" aria-label="重试天气预报">
                    <RefreshCw size={11} />
                  </button>
                )}
              </div>
            )}
            <p className="mt-2 text-[8px] leading-relaxed text-white/28">
              时间轴使用所选位置的当地时间；预报存在延迟与误差，仅供参考。实时模式下曲线只读。
            </p>
          </div>
        )}
      </aside>

      <div className="pointer-events-none absolute bottom-5 right-5 z-30 flex items-end gap-2">
        {audioPanelOpen && (
          <div className="pointer-events-auto mb-12 w-56 rounded-2xl border border-white/15 bg-black/70 p-4 shadow-2xl backdrop-blur-2xl">
            <div className="mb-3 flex items-center justify-between text-[10px] tracking-[0.12em] text-white/70">
              <span>雨声音量</span><span>{Math.round(rainVolume * 100)}%</span>
            </div>
            <input
              className="rainform-volume-range"
              type="range"
              min="0"
              max="100"
              step="1"
              value={Math.round(rainVolume * 100)}
              onChange={(event) => changeRainVolume(Number(event.currentTarget.value) / 100)}
              aria-label="雨声音量"
            />
            <p className="mt-3 text-[9px] leading-relaxed text-white/38">音量会保存在此浏览器中；Sol 聆听和回答时会自动降低雨声。</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => setAudioPanelOpen((value) => !value)}
          className="pointer-events-auto absolute bottom-0 right-12 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/58 text-white/70 backdrop-blur-xl transition hover:border-white/35 hover:text-white"
          aria-label={audioPanelOpen ? "收起雨声音量" : "调节雨声音量"}
          aria-expanded={audioPanelOpen}
        >
          <Volume2 size={15} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={toggleRainSound}
          className="pointer-events-auto absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/58 text-white/70 backdrop-blur-xl transition hover:border-white/35 hover:text-white"
          aria-label={rainMuted ? "开启雨声" : "关闭雨声"}
          aria-pressed={!rainMuted}
        >
          {rainMuted ? <VolumeX size={15} strokeWidth={1.5} /> : <Volume2 size={15} strokeWidth={1.5} />}
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-30 flex justify-center px-20">
        <div className="pointer-events-auto flex flex-col items-center" role="group" aria-label="Sol 语音模式">
          <div className="relative flex items-center justify-center">
            <span className="rainform-sol-orb__halo" aria-hidden="true" />
            <span
              className="rainform-sol-orb__level"
              aria-hidden="true"
              style={{ transform: `scale(${1 + Math.min(1, voiceAudioLevel) * 0.42})` }}
            />
            <button
              type="button"
              className="rainform-sol-orb"
              onClick={() => void handleVoicePrimary()}
              aria-label={voiceText.title}
              aria-pressed={voiceModeOpen}
            >
              {voiceState === "speaking" || (voiceModeOpen && voiceEnabled) ? (
                <Square size={14} fill="currentColor" strokeWidth={1.2} />
              ) : (
                <Mic size={17} strokeWidth={1.4} />
              )}
            </button>
            {voiceModeOpen && (
              <button
                type="button"
                onClick={closeVoiceMode}
                className="absolute -right-9 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/45 transition hover:border-white/25 hover:text-white"
                aria-label="关闭 Sol 语音模式"
              >
                <X size={12} />
              </button>
            )}
          </div>
          <div className="mt-3 rounded-full border border-white/10 bg-black/48 px-4 py-2 text-center backdrop-blur-xl">
            <p className="text-[10px] tracking-[0.12em] text-white/80">{voiceText.title}</p>
            <p className="mt-1 max-w-64 text-[9px] text-white/38">
              {voiceState === "error" && voiceError ? voiceError : voiceText.hint}
            </p>
            {voiceModeOpen && voiceLabel && <span className="sr-only">{voiceLabel}</span>}
          </div>
          <span className="sr-only" role="status" aria-live="polite">{voiceText.title}</span>
        </div>
      </div>
    </section>
  );
}
