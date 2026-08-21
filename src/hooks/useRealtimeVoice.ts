import { useCallback, useEffect, useRef, useState } from "react";
import type { CompanionTurnResponse, VoiceActivity } from "../../shared/companion";

type UseRealtimeVoiceOptions = {
  onVoiceTurn: (message: string) => Promise<CompanionTurnResponse | null>;
};

type VoiceCapabilities = {
  ready?: boolean;
  provider?: string;
  label?: string;
};

type SongCapabilities = {
  ready?: boolean;
};

type TranscriptResponse = {
  success?: boolean;
  text?: string;
  error?: string;
};

type BrowserSpeechAlternative = { transcript: string };
type BrowserSpeechResult = {
  readonly isFinal: boolean;
  readonly length: number;
  readonly [index: number]: BrowserSpeechAlternative;
};
type BrowserSpeechResultList = {
  readonly length: number;
  readonly [index: number]: BrowserSpeechResult;
};
type BrowserSpeechEvent = Event & {
  readonly resultIndex: number;
  readonly results: BrowserSpeechResultList;
};
type BrowserSpeechErrorEvent = Event & { readonly error: string };
type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: BrowserSpeechEvent) => void) | null;
  onerror: ((event: BrowserSpeechErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

const TARGET_SAMPLE_RATE = 16_000;
const SPEECH_THRESHOLD = 0.018;
const SILENCE_TO_SEND_MS = 850;
const MIN_SPEECH_MS = 320;
const MAX_SPEECH_MS = 18_000;

const getBrowserSpeechRecognition = () => {
  const speechWindow = window as typeof window & {
    SpeechRecognition?: BrowserSpeechRecognitionConstructor;
    webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor;
  };
  return speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition || null;
};

const mergeAndResample = (chunks: Float32Array[], inputRate: number) => {
  const inputLength = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const input = new Float32Array(inputLength);
  let offset = 0;
  for (const chunk of chunks) {
    input.set(chunk, offset);
    offset += chunk.length;
  }
  if (inputRate === TARGET_SAMPLE_RATE) return input;

  const outputLength = Math.max(1, Math.round((input.length * TARGET_SAMPLE_RATE) / inputRate));
  const output = new Float32Array(outputLength);
  const ratio = inputRate / TARGET_SAMPLE_RATE;
  for (let index = 0; index < output.length; index += 1) {
    const position = index * ratio;
    const left = Math.floor(position);
    const right = Math.min(input.length - 1, left + 1);
    const weight = position - left;
    output[index] = input[left] * (1 - weight) + input[right] * weight;
  }
  return output;
};

const encodeWav = (samples: Float32Array) => {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeText = (offset: number, value: string) => {
    for (let index = 0; index < value.length; index += 1) {
      view.setUint8(offset + index, value.charCodeAt(index));
    }
  };

  writeText(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeText(8, "WAVE");
  writeText(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, TARGET_SAMPLE_RATE, true);
  view.setUint32(28, TARGET_SAMPLE_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeText(36, "data");
  view.setUint32(40, samples.length * 2, true);

  for (let index = 0; index < samples.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, samples[index]));
    view.setInt16(44 + index * 2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }
  return buffer;
};

const responseError = async (response: Response, fallback: string) => {
  try {
    const payload = (await response.json()) as { error?: string };
    return payload.error || fallback;
  } catch {
    return fallback;
  }
};

export function useRealtimeVoice({ onVoiceTurn }: UseRealtimeVoiceOptions) {
  const [activity, setActivity] = useState<VoiceActivity>("disabled");
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);
  const [voiceLabel, setVoiceLabel] = useState("");

  const onVoiceTurnRef = useRef(onVoiceTurn);
  const mountedRef = useRef(true);
  const enabledRef = useRef(false);
  const mutedRef = useRef(false);
  const busyRef = useRef(false);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const microphoneSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const microphoneAnalyserRef = useRef<AnalyserNode | null>(null);
  const browserRecognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const speechChunksRef = useRef<Float32Array[]>([]);
  const preRollRef = useRef<Float32Array[]>([]);
  const speechStartedRef = useRef(false);
  const speechStartedAtRef = useRef(0);
  const lastVoiceAtRef = useRef(0);
  const playbackSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const playbackGainRef = useRef<GainNode | null>(null);
  const playbackMeterRef = useRef<number | null>(null);
  const officialSongReadyRef = useRef<boolean | null>(null);
  const submitRecordingRef = useRef<(chunks: Float32Array[], sampleRate: number) => void>(() => {});

  useEffect(() => {
    onVoiceTurnRef.current = onVoiceTurn;
  }, [onVoiceTurn]);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const setReady = useCallback(() => {
    if (!mountedRef.current || !enabledRef.current) return;
    setActivity("ready");
    setAudioLevel(0);
  }, []);

  const stopPlaybackMeter = useCallback(() => {
    if (playbackMeterRef.current !== null) cancelAnimationFrame(playbackMeterRef.current);
    playbackMeterRef.current = null;
  }, []);

  const stop = useCallback(() => {
    enabledRef.current = false;
    busyRef.current = false;
    speechStartedRef.current = false;
    speechChunksRef.current = [];
    preRollRef.current = [];
    browserRecognitionRef.current?.abort();
    browserRecognitionRef.current = null;
    window.speechSynthesis?.cancel();
    stopPlaybackMeter();
    try {
      playbackSourceRef.current?.stop();
    } catch {
      // The source may already have completed naturally.
    }
    playbackSourceRef.current = null;
    playbackGainRef.current = null;
    if (processorRef.current) {
      processorRef.current.onaudioprocess = null;
      processorRef.current.disconnect();
    }
    processorRef.current = null;
    microphoneSourceRef.current?.disconnect();
    microphoneSourceRef.current = null;
    microphoneAnalyserRef.current?.disconnect();
    microphoneAnalyserRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      void audioContextRef.current.close();
    }
    audioContextRef.current = null;
    if (mountedRef.current) {
      setEnabled(false);
      setActivity("disabled");
      setAudioLevel(0);
    }
  }, [stopPlaybackMeter]);

  const speakWithBrowser = useCallback(
    (text: string) =>
      new Promise<void>((resolve, reject) => {
        if (!window.speechSynthesis) {
          reject(new Error("当前浏览器无法播放语音。"));
          return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = /[\u3400-\u9fff]/.test(text) ? "zh-CN" : navigator.language;
        utterance.rate = 0.96;
        utterance.onstart = () => setActivity("speaking");
        utterance.onend = () => resolve();
        utterance.onerror = () => reject(new Error("浏览器无法朗读这条回应。"));
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }),
    [],
  );

  const playDoubaoReply = useCallback(
    async (text: string) => {
      const response = await fetch("/api/doubao-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: AbortSignal.timeout(26_000),
      });
      if (!response.ok) throw new Error(await responseError(response, "豆包声音生成失败。"));
      const encodedAudio = await response.arrayBuffer();
      if (!encodedAudio.byteLength) throw new Error("豆包没有返回声音。");

      const context = audioContextRef.current;
      if (!context || context.state === "closed") throw new Error("声音播放器已经关闭。");
      if (context.state === "suspended") await context.resume();
      const decodedAudio = await context.decodeAudioData(encodedAudio.slice(0));
      if (!enabledRef.current) return;

      await new Promise<void>((resolve, reject) => {
        const source = context.createBufferSource();
        const gain = context.createGain();
        const analyser = context.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.76;
        gain.gain.value = mutedRef.current ? 0 : 1;
        source.buffer = decodedAudio;
        source.connect(gain);
        gain.connect(analyser);
        analyser.connect(context.destination);
        playbackSourceRef.current = source;
        playbackGainRef.current = gain;
        setActivity("speaking");

        const samples = new Uint8Array(analyser.frequencyBinCount);
        const measure = () => {
          if (playbackSourceRef.current !== source) return;
          analyser.getByteFrequencyData(samples);
          const energy = samples.reduce((sum, value) => sum + value, 0) / samples.length / 255;
          setAudioLevel(Math.min(1, energy * 2.9));
          playbackMeterRef.current = requestAnimationFrame(measure);
        };
        measure();

        source.onended = () => {
          stopPlaybackMeter();
          if (playbackSourceRef.current === source) playbackSourceRef.current = null;
          if (playbackGainRef.current === gain) playbackGainRef.current = null;
          source.disconnect();
          gain.disconnect();
          analyser.disconnect();
          resolve();
        };
        try {
          source.start();
        } catch (playError) {
          reject(playError);
        }
      });
    },
    [stopPlaybackMeter],
  );

  const playSonglikeReply = useCallback(
    async (text: string) => {
      if (officialSongReadyRef.current === null) {
        try {
          const capabilityResponse = await fetch("/api/song-capabilities", {
            signal: AbortSignal.timeout(8_000),
          });
          const capabilities = (await capabilityResponse.json()) as SongCapabilities;
          officialSongReadyRef.current = capabilityResponse.ok && capabilities.ready === true;
        } catch {
          officialSongReadyRef.current = false;
        }
      }

      let officialSong = officialSongReadyRef.current === true;
      let response: Response;
      if (officialSong) {
        response = await fetch("/api/doubao-song", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
          signal: AbortSignal.timeout(62_000),
        });
        if (!response.ok) {
          officialSong = false;
          officialSongReadyRef.current = false;
        }
      } else {
        response = new Response(null, { status: 204 });
      }
      if (!officialSong) {
        response = await fetch("/api/doubao-speech", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
          signal: AbortSignal.timeout(26_000),
        });
      }
      if (!response.ok) throw new Error(await responseError(response, "歌声生成失败。"));
      const encodedAudio = await response.arrayBuffer();
      if (!encodedAudio.byteLength) throw new Error("歌声服务没有返回声音。");

      const AudioContextConstructor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextConstructor) throw new Error("当前浏览器无法播放歌声。");
      let context = audioContextRef.current;
      if (!context || context.state === "closed") {
        context = new AudioContextConstructor();
        audioContextRef.current = context;
      }
      if (context.state === "suspended") await context.resume();
      const decodedAudio = await context.decodeAudioData(encodedAudio.slice(0));

      await new Promise<void>((resolve, reject) => {
        const source = context.createBufferSource();
        const vocalGain = context.createGain();
        const analyser = context.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.72;
        vocalGain.gain.value = mutedRef.current ? 0 : officialSong ? 1 : 0.92;
        source.buffer = decodedAudio;

        const harmony: OscillatorNode[] = [];
        let harmonyGain: GainNode | null = null;
        if (!officialSong) {
          source.playbackRate.value = 0.94;
          const noteSteps = [0, 180, 320, 180, 0, -120, 120, 0];
          const startAt = context.currentTime;
          for (let index = 0; index < decodedAudio.duration / 0.8; index += 1) {
            source.detune.linearRampToValueAtTime(
              noteSteps[index % noteSteps.length],
              startAt + index * 0.8,
            );
          }
          harmonyGain = context.createGain();
          harmonyGain.gain.value = mutedRef.current ? 0 : 0.025;
          for (const frequency of [196, 246.94, 293.66]) {
            const oscillator = context.createOscillator();
            oscillator.type = "sine";
            oscillator.frequency.value = frequency;
            oscillator.connect(harmonyGain);
            harmony.push(oscillator);
          }
          harmonyGain.connect(vocalGain);
        }

        source.connect(vocalGain);
        vocalGain.connect(analyser);
        analyser.connect(context.destination);
        playbackSourceRef.current = source;
        playbackGainRef.current = vocalGain;
        setActivity("singing");

        const samples = new Uint8Array(analyser.frequencyBinCount);
        const measure = () => {
          if (playbackSourceRef.current !== source) return;
          analyser.getByteFrequencyData(samples);
          const energy = samples.reduce((sum, value) => sum + value, 0) / samples.length / 255;
          setAudioLevel(Math.min(1, energy * 3.1));
          playbackMeterRef.current = requestAnimationFrame(measure);
        };
        measure();

        source.onended = () => {
          stopPlaybackMeter();
          harmony.forEach((oscillator) => {
            try {
              oscillator.stop();
            } catch {
              // A completed oscillator is already stopped.
            }
            oscillator.disconnect();
          });
          harmonyGain?.disconnect();
          if (playbackSourceRef.current === source) playbackSourceRef.current = null;
          if (playbackGainRef.current === vocalGain) playbackGainRef.current = null;
          source.disconnect();
          vocalGain.disconnect();
          analyser.disconnect();
          if (!enabledRef.current && mountedRef.current) {
            setActivity("disabled");
            setAudioLevel(0);
          }
          resolve();
        };
        try {
          harmony.forEach((oscillator) => oscillator.start());
          source.start();
        } catch (playError) {
          reject(playError);
        }
      });
    },
    [stopPlaybackMeter],
  );

  const submitRecording = useCallback(
    async (chunks: Float32Array[], sampleRate: number) => {
      if (!enabledRef.current || busyRef.current) return;
      const samples = mergeAndResample(chunks, sampleRate);
      if (samples.length < TARGET_SAMPLE_RATE * (MIN_SPEECH_MS / 1000)) {
        setReady();
        return;
      }

      busyRef.current = true;
      setActivity("thinking");
      setAudioLevel(0);
      try {
        const response = await fetch("/api/doubao-transcribe", {
          method: "POST",
          headers: { "Content-Type": "audio/wav" },
          body: encodeWav(samples),
          signal: AbortSignal.timeout(26_000),
        });
        const transcript = (await response.json()) as TranscriptResponse;
        if (!response.ok || !transcript.success) {
          throw new Error(transcript.error || "豆包没有识别这段语音。");
        }
        const message = transcript.text?.trim().slice(0, 500) || "";
        if (!message) {
          setError("我没有听清，请再说一次。");
          return;
        }
        if (!enabledRef.current) return;

        setError("");
        const result = await onVoiceTurnRef.current(message);
        if (!result || !enabledRef.current || !result.spokenReply.trim()) {
          if (!result) setError("这次回应没有完成，请再试一次。");
          return;
        }
        if (mutedRef.current) return;

        try {
          if (result.intent === "singing" && result.songLyrics.trim()) {
            await playSonglikeReply(result.songLyrics);
          } else {
            await playDoubaoReply(result.spokenReply);
          }
        } catch (doubaoError) {
          const messageText = doubaoError instanceof Error ? doubaoError.message : "豆包声音生成失败。";
          setError(`${messageText} 已临时使用浏览器声音。`);
          await speakWithBrowser(result.spokenReply);
        }
      } catch (turnError) {
        setError(turnError instanceof Error ? turnError.message : "语音交互暂时无法完成。");
      } finally {
        busyRef.current = false;
        setReady();
      }
    },
    [playDoubaoReply, playSonglikeReply, setReady, speakWithBrowser],
  );

  const speak = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || !enabledRef.current || mutedRef.current || busyRef.current) return false;
      busyRef.current = true;
      setError("");
      setActivity("thinking");
      try {
        await playDoubaoReply(text);
        return true;
      } catch (doubaoError) {
        const messageText = doubaoError instanceof Error ? doubaoError.message : "豆包声音生成失败。";
        setError(`${messageText} 已临时使用浏览器声音。`);
        try {
          await speakWithBrowser(text);
          return true;
        } catch {
          setError("这次主动回应已显示为文字，但声音播放失败了。");
          return false;
        }
      } finally {
        busyRef.current = false;
        setReady();
      }
    },
    [playDoubaoReply, setReady, speakWithBrowser],
  );

  const sing = useCallback(
    async (rawLyrics: string) => {
      const lyrics = rawLyrics.trim();
      if (!lyrics || mutedRef.current || busyRef.current) return false;
      busyRef.current = true;
      setError("");
      setActivity("thinking");
      try {
        await playSonglikeReply(lyrics);
        return true;
      } catch (songError) {
        setError(songError instanceof Error ? songError.message : "这次歌声没有生成成功。");
        return false;
      } finally {
        busyRef.current = false;
        if (enabledRef.current) setReady();
        else if (mountedRef.current) setActivity("disabled");
      }
    },
    [playSonglikeReply, setReady],
  );

  useEffect(() => {
    submitRecordingRef.current = (chunks, sampleRate) => {
      void submitRecording(chunks, sampleRate);
    };
  }, [submitRecording]);

  const startBrowserFallback = useCallback(() => {
    const Recognition = getBrowserSpeechRecognition();
    if (!Recognition || !window.speechSynthesis) return false;

    const recognition = new Recognition();
    recognition.lang = "zh-CN";
    recognition.continuous = true;
    recognition.interimResults = false;
    browserRecognitionRef.current = recognition;
    enabledRef.current = true;
    setEnabled(true);
    setVoiceLabel("浏览器语音 / DeepSeek 朋友");
    setError("豆包语音不可用，已切换到浏览器后备模式。");

    const restart = () => {
      if (browserRecognitionRef.current !== recognition || busyRef.current) return;
      window.setTimeout(() => {
        if (browserRecognitionRef.current !== recognition || busyRef.current) return;
        try {
          recognition.start();
        } catch {
          // The browser may already be restarting recognition.
        }
      }, 250);
    };

    recognition.onstart = () => setActivity("ready");
    recognition.onresult = (event) => {
      if (busyRef.current) return;
      let transcript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        if (result?.isFinal && result[0]?.transcript) transcript += ` ${result[0].transcript}`;
      }
      const message = transcript.trim().slice(0, 500);
      if (!message) return;
      busyRef.current = true;
      setActivity("thinking");
      try {
        recognition.stop();
      } catch {
        // Some browsers stop recognition automatically.
      }
      void (async () => {
        try {
          const result = await onVoiceTurnRef.current(message);
          if (result?.spokenReply.trim() && !mutedRef.current) {
            if (result.intent === "singing" && result.songLyrics.trim()) {
              await playSonglikeReply(result.songLyrics);
            } else {
              await speakWithBrowser(result.spokenReply);
            }
          }
        } catch {
          setError("浏览器语音未能完成这次回应。");
        } finally {
          busyRef.current = false;
          setReady();
          restart();
        }
      })();
    };
    recognition.onerror = (event) => {
      if (event.error === "no-speech" || event.error === "aborted") return;
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        browserRecognitionRef.current = null;
        enabledRef.current = false;
        setEnabled(false);
        setActivity("permission-denied");
        setError("麦克风权限被拒绝，请在浏览器地址栏允许使用麦克风。");
        return;
      }
      setError("浏览器语音识别已暂停，正在尝试恢复。");
    };
    recognition.onend = () => {
      if (browserRecognitionRef.current === recognition && !busyRef.current) restart();
    };

    try {
      recognition.start();
      return true;
    } catch {
      browserRecognitionRef.current = null;
      enabledRef.current = false;
      setEnabled(false);
      return false;
    }
  }, [playSonglikeReply, setReady, speakWithBrowser]);

  const start = useCallback(async () => {
    if (enabledRef.current) return;
    setActivity("connecting");
    setError("");
    try {
      const capabilityResponse = await fetch("/api/voice-capabilities", {
        signal: AbortSignal.timeout(8_000),
      });
      const capabilities = (await capabilityResponse.json()) as VoiceCapabilities;
      if (!capabilityResponse.ok || !capabilities.ready || capabilities.provider !== "doubao") {
        if (startBrowserFallback()) return;
        throw new Error("豆包语音尚未完成配置，当前浏览器也没有可用的后备语音。");
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        if (startBrowserFallback()) return;
        throw new Error("当前浏览器不支持麦克风录音。");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      const AudioContextConstructor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextConstructor) {
        stream.getTracks().forEach((track) => track.stop());
        throw new Error("当前浏览器无法处理麦克风声音。");
      }

      if (audioContextRef.current && !streamRef.current && audioContextRef.current.state !== "closed") {
        await audioContextRef.current.close();
        audioContextRef.current = null;
      }
      const context = new AudioContextConstructor();
      if (context.state === "suspended") await context.resume();
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      const processor = context.createScriptProcessor(4096, 1, 1);
      source.connect(analyser);
      source.connect(processor);
      processor.connect(context.destination);

      streamRef.current = stream;
      audioContextRef.current = context;
      microphoneSourceRef.current = source;
      microphoneAnalyserRef.current = analyser;
      processorRef.current = processor;
      enabledRef.current = true;
      setEnabled(true);
      setVoiceLabel(capabilities.label || "豆包语音 2.0 / DeepSeek 朋友");
      setActivity("ready");

      processor.onaudioprocess = (event) => {
        if (!enabledRef.current) return;
        const input = event.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let index = 0; index < input.length; index += 1) sum += input[index] * input[index];
        const level = Math.sqrt(sum / input.length);
        if (!busyRef.current) setAudioLevel(Math.min(1, level * 8));
        if (busyRef.current) {
          preRollRef.current = [];
          return;
        }

        const now = performance.now();
        const copy = new Float32Array(input);
        if (!speechStartedRef.current) {
          preRollRef.current.push(copy);
          if (preRollRef.current.length > 4) preRollRef.current.shift();
          if (level < SPEECH_THRESHOLD) return;
          speechStartedRef.current = true;
          speechStartedAtRef.current = now;
          lastVoiceAtRef.current = now;
          speechChunksRef.current = [...preRollRef.current];
          preRollRef.current = [];
          setActivity("listening");
          return;
        }

        speechChunksRef.current.push(copy);
        if (level >= SPEECH_THRESHOLD) lastVoiceAtRef.current = now;
        const speechLength = now - speechStartedAtRef.current;
        const silenceLength = now - lastVoiceAtRef.current;
        if (
          speechLength < MIN_SPEECH_MS ||
          (silenceLength < SILENCE_TO_SEND_MS && speechLength < MAX_SPEECH_MS)
        ) {
          return;
        }

        const completedChunks = speechChunksRef.current;
        speechChunksRef.current = [];
        speechStartedRef.current = false;
        preRollRef.current = [];
        submitRecordingRef.current(completedChunks, context.sampleRate);
      };
    } catch (startError) {
      const errorName = startError instanceof DOMException ? startError.name : "";
      stop();
      if (errorName === "NotAllowedError" || errorName === "SecurityError") {
        setActivity("permission-denied");
        setError("麦克风权限被拒绝，请点击地址栏旁的权限图标并选择允许。");
      } else if (errorName === "NotFoundError") {
        setActivity("unavailable");
        setError("没有找到可用的麦克风。");
      } else {
        setActivity("unavailable");
        setError(startError instanceof Error ? startError.message : "无法启动语音。");
      }
    }
  }, [startBrowserFallback, stop]);

  const toggleMuted = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      mutedRef.current = next;
      if (playbackGainRef.current) playbackGainRef.current.gain.value = next ? 0 : 1;
      if (next && browserRecognitionRef.current) window.speechSynthesis.cancel();
      return next;
    });
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    try {
      playbackSourceRef.current?.stop();
    } catch {
      // The source may have just completed.
    }
    playbackSourceRef.current = null;
    playbackGainRef.current = null;
    stopPlaybackMeter();
    if (enabledRef.current) setReady();
    else {
      setActivity("disabled");
      setAudioLevel(0);
    }
  }, [setReady, stopPlaybackMeter]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stop();
    };
  }, [stop]);

  return {
    activity,
    enabled,
    muted,
    error,
    audioLevel,
    voiceLabel,
    start,
    stop,
    toggleMuted,
    stopSpeaking,
    speak,
    sing,
  };
}
