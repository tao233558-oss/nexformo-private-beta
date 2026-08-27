import { Dices, PanelLeftClose, PanelLeftOpen, RotateCcw } from "lucide-react";
import {
  CAMERA_MOTIONS,
  CAMERA_MOTION_LABELS,
  PARTICLE_FORMS,
  PARTICLE_FORM_LABELS,
  type VisualScene,
} from "../../../shared/visualScene";
import {
  SOL_WEATHER_LABELS,
  SOL_WEATHER_MODES,
} from "../../../shared/weather";
import type { UseSolWeatherResult } from "../../hooks/useSolWeather";
import type { WorldSnapshot } from "../../lib/world";

type SceneDNAPanelProps = {
  current: WorldSnapshot;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  onSceneChange: (scene: VisualScene) => void;
  onReset: () => void;
  weather: UseSolWeatherResult;
};

type NumericSceneKey = "speed" | "turbulence" | "cohesion" | "pointSize" | "brightness";

const controls: Array<{
  key: NumericSceneKey;
  label: string;
  minimum: number;
  maximum: number;
  step: number;
}> = [
  { key: "speed", label: "运动速度", minimum: 0, maximum: 1, step: 0.01 },
  { key: "turbulence", label: "扰动程度", minimum: 0, maximum: 1, step: 0.01 },
  { key: "cohesion", label: "聚合程度", minimum: 0, maximum: 1, step: 0.01 },
  { key: "pointSize", label: "粒子大小", minimum: 0.5, maximum: 3, step: 0.05 },
  { key: "brightness", label: "发光强度", minimum: 0, maximum: 1, step: 0.01 },
];

const randomBetween = (minimum: number, maximum: number) =>
  minimum + Math.random() * (maximum - minimum);

export default function SceneDNAPanel({
  current,
  collapsed,
  onCollapsedChange,
  onSceneChange,
  onReset,
  weather,
}: SceneDNAPanelProps) {
  const scene = current.scene;

  const updateNumber = (key: NumericSceneKey, value: number) => {
    onSceneChange({ ...scene, palette: [...scene.palette], [key]: value });
  };

  const randomize = () => {
    const form = PARTICLE_FORMS[Math.floor(Math.random() * PARTICLE_FORMS.length)];
    const cameraMotion = CAMERA_MOTIONS[Math.floor(Math.random() * CAMERA_MOTIONS.length)];
    onSceneChange({
      ...scene,
      form,
      cameraMotion,
      palette: [...scene.palette],
      speed: randomBetween(0.12, 0.68),
      turbulence: randomBetween(0.08, 0.72),
      cohesion: randomBetween(0.36, 0.9),
      pointSize: randomBetween(0.9, 1.65),
      brightness: randomBetween(0.58, 0.9),
    });
  };

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => onCollapsedChange(false)}
        className="studio-icon-button pointer-events-auto absolute left-7 top-24 z-20"
        aria-label="打开场景参数"
        title="打开场景参数（D）"
      >
        <PanelLeftOpen size={15} strokeWidth={1.4} />
      </button>
    );
  }

  return (
    <aside className="studio-panel pointer-events-auto absolute bottom-28 left-7 top-24 z-20 flex w-[270px] flex-col overflow-hidden">
      <div className="flex items-start justify-between border-b border-white/10 pb-4">
        <div>
          <p className="studio-eyebrow">场景参数</p>
          <h2 className="mt-2 max-w-[190px] text-xl font-light leading-tight tracking-[-0.02em]">
            {current.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onCollapsedChange(true)}
          className="studio-ghost-icon"
          aria-label="收起场景参数"
          title="收起场景参数（D）"
        >
          <PanelLeftClose size={15} strokeWidth={1.4} />
        </button>
      </div>

      <div className="studio-scrollbar min-h-0 flex-1 overflow-y-auto pr-2 pt-4">
        <p className="mb-5 border-l border-white/20 pl-3 text-[11px] font-light leading-relaxed text-white/55">
          {scene.message}
        </p>

        <div className="mb-5">
          <p className="studio-field-label">粒子形态</p>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
            {PARTICLE_FORMS.map((form) => (
              <button
                key={form}
                type="button"
                onClick={() => onSceneChange({ ...scene, palette: [...scene.palette], form })}
                className={`studio-text-option ${scene.form === form ? "is-active" : ""}`}
              >
                {PARTICLE_FORM_LABELS[form]}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <p className="studio-field-label">色彩光谱</p>
          <div className="mt-2 flex h-7 overflow-hidden border border-white/10">
            {scene.palette.map((color, index) => (
              <span
                key={`${color}-${index}`}
                className="h-full flex-1"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[8px] uppercase tracking-[0.12em] text-white/25">
            {scene.palette.map((color) => (
              <span key={color}>{color}</span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {controls.map((control) => (
            <label key={control.key} className="block">
              <span className="flex items-center justify-between">
                <span className="studio-field-label">{control.label}</span>
                <span className="font-mono text-[9px] text-white/45">
                  {scene[control.key].toFixed(2)}
                </span>
              </span>
              <input
                className="dna-range mt-2 w-full"
                type="range"
                min={control.minimum}
                max={control.maximum}
                step={control.step}
                value={scene[control.key]}
                onChange={(event) => updateNumber(control.key, Number(event.target.value))}
                aria-label={control.label}
              />
            </label>
          ))}
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="studio-field-label">镜头运动</p>
          <div className="mt-2 flex gap-4">
            {CAMERA_MOTIONS.map((motion) => (
              <button
                key={motion}
                type="button"
                onClick={() =>
                  onSceneChange({ ...scene, palette: [...scene.palette], cameraMotion: motion })
                }
                className={`studio-text-option ${scene.cameraMotion === motion ? "is-active" : ""}`}
              >
                {CAMERA_MOTION_LABELS[motion]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4" data-weather-controls="active">
          <div className="flex items-center justify-between">
            <p className="studio-field-label">环境天气</p>
            <div className="text-right font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
              <span className="block">{weather.state.locked ? "已锁定" : weather.state.autonomyEnabled ? "Sol 自主" : "手动"}</span>
              <span className="mt-0.5 block text-white/20">演示天气数据</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
            {SOL_WEATHER_MODES.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => weather.setMode(mode)}
                className={`studio-text-option ${weather.state.mode === mode ? "is-active" : ""}`}
                data-weather-option={mode}
              >
                {SOL_WEATHER_LABELS[mode]}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="flex items-center justify-between">
                <span className="studio-field-label">雨势</span>
                <span className="font-mono text-[9px] text-white/45">{weather.state.intensity.toFixed(2)}</span>
              </span>
              <input
                className="dna-range mt-2 w-full"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={weather.state.intensity}
                onChange={(event) => weather.setIntensity(Number(event.target.value))}
                aria-label="天气雨势"
              />
            </label>
            <label className="block">
              <span className="flex items-center justify-between">
                <span className="studio-field-label">横向风</span>
                <span className="font-mono text-[9px] text-white/45">{weather.state.wind.toFixed(2)}</span>
              </span>
              <input
                className="dna-range mt-2 w-full"
                type="range"
                min={-1}
                max={1}
                step={0.01}
                value={weather.state.wind}
                onChange={(event) => weather.setWind(Number(event.target.value))}
                aria-label="天气横向风"
              />
            </label>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`studio-text-option ${weather.state.autonomyEnabled ? "is-active" : ""}`}
              onClick={() => weather.setAutonomyEnabled(!weather.state.autonomyEnabled)}
            >
              天气自主
            </button>
            <button
              type="button"
              className={`studio-text-option ${weather.state.locked ? "is-active" : ""}`}
              onClick={() => weather.setLocked(!weather.state.locked)}
            >
              {weather.state.locked ? "解锁天气" : "锁定天气"}
            </button>
          </div>
          <button type="button" onClick={weather.stopRain} className="studio-action-link mt-3">
            停止下雨
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-t border-white/10 bg-black/70 pb-1 pt-3 backdrop-blur-md">
        <button type="button" onClick={onReset} className="studio-action-link">
          <RotateCcw size={12} /> 重置
        </button>
        <button type="button" onClick={randomize} className="studio-action-link">
          <Dices size={12} /> 随机
        </button>
      </div>
    </aside>
  );
}
