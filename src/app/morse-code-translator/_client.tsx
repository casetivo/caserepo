"use client";

import { useState, useCallback, useRef, useEffect, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

// ITU International Morse Code Dictionary
const MORSE_MAP: Record<string, string> = {
  // Letters
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  // Numbers
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  // Punctuation & Symbols
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
};

// Reverse Dictionary for Morse -> Text
const REVERSE_MORSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([char, code]) => [code, char])
);

type ConversionMode = "auto" | "text-to-morse" | "morse-to-text";

interface MorseStats {
  inputChars: number;
  wordCount: number;
  ditsCount: number;
  dahsCount: number;
  audioDurationSec: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<ConversionMode>("auto");
  const [wpm, setWpm] = useState<number>(18);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [stats, setStats] = useState<MorseStats | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopAudioRef = useRef<boolean>(false);
  const modeId = useId();
  const wpmId = useId();

  // Detect whether string is primarily Morse code
  const isMorseCode = useCallback((text: string): boolean => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    // Allow dots, dashes, slashes, spaces, and underscores (sometimes used as dashes)
    const validMorseChars = trimmed.replace(/[.\-_/ ]/g, "");
    return validMorseChars.length === 0;
  }, []);

  // Compute timing based on Standard PARIS (PARIS = 50 units)
  const getDitDurationMs = useCallback((speedWpm: number): number => {
    return (60 / (50 * speedWpm)) * 1000;
  }, []);

  // Perform translation
  const translate = useCallback(
    (source: string, selectedMode: ConversionMode, currentWpm: number) => {
      const trimmed = source.trim();
      if (!trimmed) {
        setOutput("");
        setStats(null);
        setErrorNotice(null);
        return;
      }

      const activeDirection =
        selectedMode === "auto"
          ? isMorseCode(source)
            ? "morse-to-text"
            : "text-to-morse"
          : selectedMode;

      let result = "";
      let unknownCount = 0;
      let dits = 0;
      let dahs = 0;

      if (activeDirection === "text-to-morse") {
        // Text -> Morse
        const words = source.trim().split(/\s+/);
        result = words
          .map((word) => {
            return word
              .toUpperCase()
              .split("")
              .map((char) => {
                const code = MORSE_MAP[char];
                if (code) {
                  return code;
                }
                unknownCount++;
                return `[${char}]`;
              })
              .join(" ");
          })
          .join(" / ");

        // Calculate dits and dahs
        dits = (result.match(/\./g) || []).length;
        dahs = (result.match(/-/g) || []).length;
      } else {
        // Morse -> Text
        // Support both '/' and multiple spaces as word separators
        const normalizedMorse = source.replace(/[_]/g, "-").replace(/[\u2013\u2014]/g, "-");
        const words = normalizedMorse.trim().split(/\s*\/\s*|\s{3,}/);

        result = words
          .map((word) => {
            const symbols = word.trim().split(/\s+/);
            return symbols
              .map((symbol) => {
                if (!symbol) return "";
                const char = REVERSE_MORSE_MAP[symbol];
                if (char) {
                  return char;
                }
                unknownCount++;
                return `[?]`;
              })
              .join("");
          })
          .join(" ");

        dits = (normalizedMorse.match(/\./g) || []).length;
        dahs = (normalizedMorse.match(/-/g) || []).length;
      }

      setOutput(result);

      if (unknownCount > 0) {
        setErrorNotice(
          `${unknownCount} character(s) could not be mapped to standard International Morse Code.`
        );
      } else {
        setErrorNotice(null);
      }

      // Compute estimated audio duration in seconds using standard timing
      const ditMs = getDitDurationMs(currentWpm);
      // Each dit = 1 unit + 1 unit pause = 2 units
      // Each dah = 3 units + 1 unit pause = 4 units
      const totalUnits = dits * 2 + dahs * 4;
      const estimatedSec = Math.round((totalUnits * ditMs) / 1000);

      setStats({
        inputChars: source.length,
        wordCount: source.trim().split(/\s+/).filter(Boolean).length,
        ditsCount: dits,
        dahsCount: dahs,
        audioDurationSec: Math.max(1, estimatedSec),
      });
    },
    [isMorseCode, getDitDurationMs]
  );

  // Trigger translation when input, mode, or wpm change
  const handleInputChange = (val: string) => {
    setInput(val);
    translate(val, mode, wpm);
  };

  const handleModeChange = (newMode: ConversionMode) => {
    setMode(newMode);
    translate(input, newMode, wpm);
  };

  const handleWpmChange = (newWpm: number) => {
    setWpm(newWpm);
    translate(input, mode, newWpm);
  };

  // Audio Player via Web Audio API
  const playMorseAudio = async () => {
    if (isPlayingAudio) {
      stopAudioRef.current = true;
      setIsPlayingAudio(false);
      return;
    }

    const morseCodeToPlay =
      mode === "text-to-morse" || isMorseCode(output)
        ? output
        : isMorseCode(input)
        ? input
        : "";

    if (!morseCodeToPlay.trim()) {
      setErrorNotice("No valid Morse code sequence available to play.");
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      stopAudioRef.current = false;
      setIsPlayingAudio(true);

      const ditDurationSec = getDitDurationMs(wpm) / 1000;
      const dahDurationSec = ditDurationSec * 3;
      const elementGapSec = ditDurationSec;
      const letterGapSec = ditDurationSec * 3;
      const wordGapSec = ditDurationSec * 7;
      const frequency = 650; // standard 650 Hz audio tone

      const sleep = (sec: number) =>
        new Promise((resolve) => setTimeout(resolve, sec * 1000));

      const playTone = (durationSec: number) => {
        return new Promise<void>((resolve) => {
          if (stopAudioRef.current) {
            resolve();
            return;
          }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(frequency, ctx.currentTime);

          // Smooth attack and release to eliminate clicks
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.005);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + durationSec - 0.005);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + durationSec);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + durationSec);
          osc.onended = () => resolve();
        });
      };

      const words = morseCodeToPlay.split(/\s*\/\s*|\s{3,}/);

      for (let w = 0; w < words.length; w++) {
        if (stopAudioRef.current) break;
        const letters = words[w].trim().split(/\s+/);

        for (let l = 0; l < letters.length; l++) {
          if (stopAudioRef.current) break;
          const symbols = letters[l].split("");

          for (let s = 0; s < symbols.length; s++) {
            if (stopAudioRef.current) break;
            const sym = symbols[s];

            if (sym === ".") {
              await playTone(ditDurationSec);
              await sleep(elementGapSec);
            } else if (sym === "-" || sym === "_") {
              await playTone(dahDurationSec);
              await sleep(elementGapSec);
            }
          }

          if (l < letters.length - 1 && !stopAudioRef.current) {
            await sleep(letterGapSec);
          }
        }

        if (w < words.length - 1 && !stopAudioRef.current) {
          await sleep(wordGapSec);
        }
      }
    } catch (err) {
      console.error("Audio playback error:", err);
      setErrorNotice("Audio playback failed. Please check browser permissions.");
    } finally {
      setIsPlayingAudio(false);
      stopAudioRef.current = false;
    }
  };

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopAudioRef.current = true;
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Quick preset loaders
  const loadPreset = (presetText: string) => {
    setInput(presetText);
    translate(presetText, mode, wpm);
  };

  return (
    <TextToolLayout
      titleKey="morseCodeTranslator"
      subtitleKey="morseCodeTranslatorSubtitle"
      actionLabelKey="morseCodeTranslatorAction"
      inputText={input}
      onInputChange={handleInputChange}
      outputText={output}
      onAction={() => translate(input, mode, wpm)}
      relatedPostSlugs={["how-to-translate-morse-code"]}
    >
      <div className="flex flex-col gap-4 mt-2">
        {/* Controls Bar */}
        <div className="p-4 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Direction Selection */}
            <div className="flex items-center gap-2">
              <label htmlFor={modeId} className="text-xs font-semibold text-foreground">
                Mode:
              </label>
              <select
                id={modeId}
                value={mode}
                onChange={(e) => handleModeChange(e.target.value as ConversionMode)}
                className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="auto">Auto-Detect Direction</option>
                <option value="text-to-morse">Text → Morse Code</option>
                <option value="morse-to-text">Morse Code → Text</option>
              </select>
            </div>

            {/* WPM Transmission Speed */}
            <div className="flex items-center gap-2">
              <label htmlFor={wpmId} className="text-xs font-semibold text-foreground">
                Speed:
              </label>
              <select
                id={wpmId}
                value={wpm}
                onChange={(e) => handleWpmChange(Number(e.target.value))}
                className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value={10}>10 WPM (Beginner)</option>
                <option value={15}>15 WPM (Moderate)</option>
                <option value={18}>18 WPM (Standard Amateur)</option>
                <option value={22}>22 WPM (Advanced)</option>
                <option value={28}>28 WPM (High Speed CW)</option>
              </select>
            </div>
          </div>

          {/* Audio Synthesizer Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={playMorseAudio}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm ${
                isPlayingAudio
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 animate-pulse"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
                  Stop Audio
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                  Play Audio Tone
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium">Quick Samples:</span>
          <button
            type="button"
            onClick={() => loadPreset("SOS ... --- ...")}
            className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
          >
            SOS Distress
          </button>
          <button
            type="button"
            onClick={() => loadPreset("CQ CQ CQ DE CASETIVO K")}
            className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
          >
            Ham Radio CQ Call
          </button>
          <button
            type="button"
            onClick={() => loadPreset("The quick brown fox jumps over the lazy dog")}
            className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
          >
            Alphabet Pangram
          </button>
        </div>

        {/* Error / Warning Notice */}
        {errorNotice && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Notice:</span>
            <span>{errorNotice}</span>
          </div>
        )}

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Input Characters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.inputChars}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Words</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.wordCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Dits (Dots)</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.ditsCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Dahs (Dashes)</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.dahsCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Est. Audio Time</div>
              <div className="text-base sm:text-lg font-bold text-foreground">~{stats.audioDurationSec}s</div>
            </div>
          </div>
        )}

        {/* Related Cryptographic & Encoding Utilities */}
        <div className="mt-2 p-3.5 rounded-xl border border-border bg-muted/20 text-xs flex flex-wrap items-center justify-between gap-3">
          <span className="text-muted-foreground">Related Encoders &amp; Ciphers:</span>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/binary-code-translator" className="text-primary hover:underline font-medium">
              Binary Code Translator
            </a>
            <span className="text-border">•</span>
            <a href="/caesar-cipher-tool" className="text-primary hover:underline font-medium">
              Caesar Cipher Tool
            </a>
            <span className="text-border">•</span>
            <a href="/rot13-encoder-decoder" className="text-primary hover:underline font-medium">
              ROT13 Cipher
            </a>
            <span className="text-border">•</span>
            <a href="/hex-to-text-converter" className="text-primary hover:underline font-medium">
              Hex to Text
            </a>
            <span className="text-border">•</span>
            <a href="/blog/how-to-translate-morse-code" className="text-primary hover:underline font-medium">
              Morse Code Guide
            </a>
          </div>
        </div>
      </div>
    </TextToolLayout>
  );
}
