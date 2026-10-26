"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type CipherMode = "rot13" | "rot5" | "rot18" | "rot47";

interface CipherStats {
  inputChars: number;
  lettersRotated: number;
  numbersRotated: number;
  symbolsPreserved: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<CipherMode>("rot13");
  const [stats, setStats] = useState<CipherStats | null>(null);

  const modeId = useId();

  // ROT13: Letters A-Z, a-z
  const runRot13 = (str: string): string => {
    return str.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
  };

  // ROT5: Digits 0-9
  const runRot5 = (str: string): string => {
    return str.replace(/[0-9]/g, (c) => {
      return String.fromCharCode(((c.charCodeAt(0) - 48 + 5) % 10) + 48);
    });
  };

  // ROT18: Letters + Digits
  const runRot18 = (str: string): string => {
    return runRot5(runRot13(str));
  };

  // ROT47: Printable ASCII 33 ('!') to 126 ('~')
  const runRot47 = (str: string): string => {
    return str.replace(/[\x21-\x7E]/g, (c) => {
      return String.fromCharCode(((c.charCodeAt(0) - 33 + 47) % 94) + 33);
    });
  };

  // Apply rotation
  const applyCipher = useCallback((raw: string, currentMode: CipherMode) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      setOutput("");
      setStats(null);
      return;
    }

    let transformed = "";
    if (currentMode === "rot13") transformed = runRot13(raw);
    else if (currentMode === "rot5") transformed = runRot5(raw);
    else if (currentMode === "rot18") transformed = runRot18(raw);
    else if (currentMode === "rot47") transformed = runRot47(raw);

    setOutput(transformed);

    // Compute character breakdown telemetry
    const letters = (raw.match(/[a-zA-Z]/g) || []).length;
    const digits = (raw.match(/[0-9]/g) || []).length;
    const total = raw.length;

    let lettersRotated = 0;
    let numbersRotated = 0;

    if (currentMode === "rot13") lettersRotated = letters;
    else if (currentMode === "rot5") numbersRotated = digits;
    else if (currentMode === "rot18") {
      lettersRotated = letters;
      numbersRotated = digits;
    } else if (currentMode === "rot47") {
      lettersRotated = letters;
      numbersRotated = digits;
    }

    const symbolsPreserved = Math.max(0, total - (lettersRotated + numbersRotated));

    setStats({
      inputChars: total,
      lettersRotated,
      numbersRotated,
      symbolsPreserved,
    });
  }, []);

  const handleInputChange = (val: string) => {
    setInput(val);
    applyCipher(val, mode);
  };

  const handleModeChange = (newMode: CipherMode) => {
    setMode(newMode);
    applyCipher(input, newMode);
  };

  const loadPreset = (presetText: string, presetMode: CipherMode = "rot13") => {
    setInput(presetText);
    setMode(presetMode);
    applyCipher(presetText, presetMode);
  };

  return (
    <TextToolLayout
      titleKey="rot13EncoderDecoder"
      subtitleKey="rot13EncoderDecoderSubtitle"
      actionLabelKey="rot13EncoderDecoderAction"
      inputText={input}
      onInputChange={handleInputChange}
      outputText={output}
      onAction={() => applyCipher(input, mode)}
      relatedPostSlugs={["what-is-rot13-cipher"]}
    >
      <div className="flex flex-col gap-4 mt-2">
        {/* Controls Bar */}
        <div className="p-4 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Mode Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor={modeId} className="text-xs font-semibold text-foreground">
                Cipher Mode:
              </label>
              <select
                id={modeId}
                value={mode}
                onChange={(e) => handleModeChange(e.target.value as CipherMode)}
                className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="rot13">ROT13 (Letters A-Z, Shift 13)</option>
                <option value="rot5">ROT5 (Numbers 0-9, Shift 5)</option>
                <option value="rot18">ROT18 (Alphanumeric: ROT13 + ROT5)</option>
                <option value="rot47">ROT47 (ASCII Characters, Shift 47)</option>
              </select>
            </div>
          </div>

          {/* Symmetrical / Involutary Cipher Pill Notice */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
            <span>Reciprocal Cipher (Encrypt = Decrypt)</span>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium">Quick Samples:</span>
          <button
            type="button"
            onClick={() => loadPreset("Gur pnpur vf uvqqra oruvaq gur byq bnx gerr.", "rot13")}
            className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
          >
            Geocaching Hint (Encoded)
          </button>
          <button
            type="button"
            onClick={() => loadPreset("Darth Vader is Luke's father!", "rot13")}
            className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
          >
            Usenet Movie Spoiler
          </button>
          <button
            type="button"
            onClick={() => loadPreset("Mission Code: Agent 007 at Area 51", "rot18")}
            className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
          >
            Alphanumeric ROT18
          </button>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Total Characters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.inputChars}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Letters Shifted</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.lettersRotated}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Digits Shifted</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.numbersRotated}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Symbols Preserved</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.symbolsPreserved}</div>
            </div>
          </div>
        )}

        {/* Related Cryptographic Utilities */}
        <div className="mt-2 p-3.5 rounded-xl border border-border bg-muted/20 text-xs flex flex-wrap items-center justify-between gap-3">
          <span className="text-muted-foreground">Related Ciphers &amp; Translators:</span>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/caesar-cipher-tool" className="text-primary hover:underline font-medium">
              Caesar Cipher Tool
            </a>
            <span className="text-border">•</span>
            <a href="/morse-code-translator" className="text-primary hover:underline font-medium">
              Morse Code Translator
            </a>
            <span className="text-border">•</span>
            <a href="/binary-code-translator" className="text-primary hover:underline font-medium">
              Binary Code Translator
            </a>
            <span className="text-border">•</span>
            <a href="/base64-encoder-decoder" className="text-primary hover:underline font-medium">
              Base64 Encoder
            </a>
            <span className="text-border">•</span>
            <a href="/blog/what-is-rot13-cipher" className="text-primary hover:underline font-medium">
              ROT13 Guide
            </a>
          </div>
        </div>
      </div>
    </TextToolLayout>
  );
}
