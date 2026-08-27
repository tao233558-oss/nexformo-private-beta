# Nexformo Living Canvas

An immersive generative website that turns language, mood, and conversation into a real-time WebGL particle presence. The particle engine runs locally in the browser. It never swaps to a prerecorded particle video.

Phase 3 turns that presence into a desktop-first AI companion. Typed and spoken turns share one persistent emotional state and one Sol reasoning path. Explicit requests such as `变成爱心`, `become a helix`, or `open into a flower` morph the same particle body deterministically into a volumetric heart, helix, or bloom. Current-information questions can selectively use web search and show real source links.

Phase 4 adds a focused desktop music experience: ask Sol to search for a song, choose a result, play it through the official visible YouTube player, and follow synchronized LRCLIB lyrics when available. Text and Doubao voice commands share the same player state. Music adds a transient rhythm layer to the particles without modifying the saved world.

Phase 5 turns that layer into a companion performance: playback requests automatically prepare the first result, the official player can expand, collapse to a policy-safe mini player, or close-and-pause, and synchronized lyrics now float beneath the particle body. Sol also has a separate bounded presence controller with autonomous motifs, pointer touch/drag reactions, a do-not-disturb mode, and manual autonomy controls that never pollute the saved world timeline.

Phase 7 makes the official player a viewport-safe draggable window and presents Sol's latest answer as a concise stage subtitle while the right rail remains the full transcript. Manual player placement is allowed at every viewport edge and corner; interface overlap produces a warning instead of forcing the player back to the center. Lyrics use LRCLIB synchronized or plain-text versions with explicit candidate selection when matching is ambiguous.

Phase 8 adds Sol's transient emotional weather system. Rain, click ripples, pointer-driven wind, and the warm firefly clearing transition are procedural WebGL effects rendered independently from Sol's particle body. Weather can follow Sol's mood or remain manually locked, persists through music pause and normal world edits, and intentionally resets when a new browser session or world begins.

Phase 9 adds Sol's versioned emotional core. Conversation cues, returning visits, music, voice, weather, idle time, and particle interaction now enter one bounded local reducer before becoming smoothly damped particle body language. Long-term warmth, trust, curiosity, and connection persist separately from raw conversation text; music, voice, and rain remain temporary modifiers. Priority is explicit user control, accessibility, voice, music, recent conversation, persistent baseline, and finally rare autonomous behavior.

## Start locally

```powershell
cd E:\ChatGPT\wangzhan
npm.cmd install
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000).

## DeepSeek and optional OpenAI setup

The site works without an API key through its deterministic local visual engine and typed companion fallback. DeepSeek can power the companion's conversation, emotional state, particle interpretation, and server-side live web search. OpenAI remains optional.

To use DeepSeek:

1. Copy `.env.example` to `.env`.
2. Set `AI_PROVIDER=deepseek` and add `DEEPSEEK_API_KEY`.
3. Keep `DEEPSEEK_MODEL=deepseek-v4-flash` for responsive conversation, or choose another currently supported DeepSeek model.
4. Restart the server.

For premium OpenAI Realtime voice, also add `OPENAI_API_KEY`. Doubao ASR and TTS can be configured independently with the `DOUBAO_*` values in `.env.example`. True Chinese singing uses the separate Volcengine Audio Technology / SAMI MemeSong credentials; without them, the browser uses Nexformo's melodic Doubao-TTS rendition.

API keys are read only by the Express server and are never included in the browser bundle. For OpenAI Realtime, the browser receives only a short-lived credential after the user clicks the voice control. Microphone permission is requested only after that click.

## 配置音乐搜索与播放

音乐搜索使用 YouTube Data API v3，播放使用官方可见的 YouTube 嵌入播放器。歌词由服务端查询 LRCLIB；找不到歌词不会影响播放。

1. 在 Google Cloud 控制台创建或选择一个项目。
2. 在“API 和服务”中启用 **YouTube Data API v3**。
3. 创建 API Key，并将它的 API 使用范围限制为 YouTube Data API v3。
4. 在本项目的 `.env` 中加入 `YOUTUBE_API_KEY=你的密钥`。不要使用 `VITE_` 前缀，也不要把密钥粘贴到聊天或提交到 Git。
5. 重新启动开发服务器，然后进入一个世界，在右侧对话框输入“播放周杰伦的晴天”。

如果服务器所在网络无法直接访问 Google API，可在 `.env` 中加入仅供服务端使用的 HTTP(S) 代理，例如 `YOUTUBE_PROXY_URL=http://127.0.0.1:7890`。代理关闭或端口变化后需要同步更新这一项并重新启动服务器。

如果没有配置密钥，Nexformo 仍可正常聊天、联网回答、使用豆包语音、唱歌和改变粒子形状；只有搜歌时会显示配置提示。

支持的音乐命令包括：

- `播放周杰伦的晴天`、`搜索一些安静的纯音乐`
- `播放第一首`、`上一首`、`下一首`
- `暂停`、`继续播放`、`停止播放`
- `音量调到百分之三十`、`声音大一点`、`声音小一点`
- `显示歌词`、`隐藏歌词`、`歌词快一点`、`歌词慢一点`
- `收起播放器`、`展开播放器`、`关闭播放器`、`打开播放器`
- `换一个律动`、`安静一点`、`活泼一点`、`锁定这个动作`
- `不要主动说话`、`可以主动陪我聊天`

支持的本地天气命令包括：

- `下雨`、`细雨`、`来一场骤雨`、`星雨`
- `停止下雨`、`雨大一点`、`雨小一点`
- `往左吹`、`往右吹`
- `天气自主`、`手动天气`、`锁定天气`、`解锁天气`
- `进入雨中`、`退出雨景`

这些命令只更新瞬时天气状态，不调用在线模型，也不会修改 Sol 的粒子形态或增加世界演化节点。左侧“环境天气”区域可直接调节模式、雨势和风向。

浏览器可能阻止未经点击触发的自动播放，此时播放器会显示“点击开始播放”。部分视频也可能因为地区、年龄或禁止嵌入而无法在站内播放。YouTube 嵌入播放器不会向网页暴露原始音频样本，因此当前粒子律动是依据已确认的播放状态、播放时间和歌曲 ID 生成的确定性节奏动画，不是 FFT 音频频谱分析。

## Companion behavior

- Text and voice use the same message history, emotional state, scene interpreter, and evolution timeline.
- Emotion changes are gradual: affection, melancholy, tension, curiosity, energy, and connection decay and move over time instead of resetting every turn.
- Direct shape commands are deterministic even when an online model is unavailable.
- Web search is reserved for explicit or time-sensitive questions. DeepSeek and OpenAI both support grounded search, and source chips are created only from returned URLs.
- Singing requests create short original lyrics. Configured MemeSong credentials produce true singing; otherwise the local melodic performance remains available.
- The Realtime model handles listening and speech delivery; substantive replies are produced by the Sol companion endpoint before they are spoken.
- Voice can be muted, stopped mid-reply, disconnected, or replaced by typing at any time.

## Privacy and fallback

- The OpenAI API key and full Realtime session configuration stay on the server.
- Typed companion memory is stored only in this browser under `nexformo.companion-memory.v1` and can be cleared with the reset control.
- Sol's sanitized emotional continuity is stored separately under `nexformo.sol.emotional-core.v1`; it contains only bounded values, enums, and timestamps, never raw messages or transcripts.
- World history and archives are also stored locally in the browser.
- The app does not record microphone audio or write audio to local storage.
- When the API key, network, microphone permission, or live voice is unavailable, typed interaction and deterministic shape control continue to work.

## Studio shortcuts

- `F`: toggle Focus Mode
- `D`: toggle Scene DNA
- `H`: toggle the evolution timeline
- `Escape`: close the active overlay or leave Focus Mode
- `Ctrl/Cmd + Z`: undo
- `Ctrl/Cmd + Shift + Z`: redo
- `Ctrl + Shift + E`: toggle the development-only Sol emotional-state inspector
- `Enter`: submit the focused prompt
- `Shift + Enter`: add a line break

Export a saved world as a `.nexformo.json` file to move it between browsers.

## Commands

```powershell
npm.cmd run check
npm.cmd run test
npm.cmd run build
npm.cmd run start
```

`npm.cmd run start` serves the production build after `npm.cmd run build`.

## Rainform noncommercial experiment

The optional “数据成雨” studio mode embeds a separately identified, locally hosted build derived from
[Rainform / 数据成雨](https://github.com/afterimage-lab/Rainform) by afterimage. It is included only for
noncommercial evaluation under the PolyForm Noncommercial License 1.0.0 and is not an official collaboration.
The preserved source, license, notices, integration policy, and commercial-use policy live in
[`vendor/rainform`](./vendor/rainform). Rainform-derived material must not be used commercially without
written permission from its maintainer.

### Real-weather data and location privacy

Rainform starts in **Creative Demo** mode, whose editable rainfall curve is fictional and clearly labelled.
The optional **Real Weather** mode obtains city search and hourly/current forecasts through the Nexformo
server from Open-Meteo; city-search names use GeoNames data. After an explicit click, browser coordinates
may also be sent to the Nexformo server for the same forecast and for a human-readable place-name lookup.
Geolocation-derived coordinates are not written to localStorage or included in Sol's memory context. If the
place-name lookup fails, the forecast can still load under the calm `当前位置` fallback.

Reverse-geocoded names currently come from the public OpenStreetMap Nominatim service and are attributed in
the interface. Requests are serialized to at most one upstream call per second, rounded-coordinate lookups
are deduplicated and cached for seven days, and no bulk, autocomplete, periodic, or background lookup is
performed. `NEXFORMO_REVERSE_GEOCODING_URL` can replace the endpoint, and the existing server proxy is reused
when configured. Public Nominatim is appropriate only for this small noncommercial private beta: use a
self-hosted or contracted provider before commercial launch or high traffic. Forecasts may be live, cached
and stale, or unavailable; every state remains labelled and weather information is for reference only.

## Private beta deployment

The optional production access gate, privacy disclosure, security headers, safe health check, YouTube failure recovery, Render Blueprint, and release checklist are documented in [DEPLOYMENT_PRIVATE_BETA.md](./DEPLOYMENT_PRIVATE_BETA.md). Leave `BETA_ACCESS_CODE` empty for ordinary local development. Production secrets belong only in the hosting dashboard; `render.yaml` never contains an invitation code or API key value.
