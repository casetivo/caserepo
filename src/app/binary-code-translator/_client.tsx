"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type BinaryMode = "auto" | "text-to-bin" | "bin-to-text";
type ByteSeparator = "space" | "none" | "comma" | "hyphen";

interface BinaryStats {
  charCount: number;
  byteCount: number;
  bitCount: number;
  oneCount: number;
  zeroCount: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<BinaryMode>("auto");
  const [separator, setSeparator] = useState<ByteSeparator>("space");
  const [prefix0b, setPrefix0b] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [stats, setStats] = useState<BinaryStats | null>(null);
  const prefixId = useId();

  // Test if string is purely binary digits and whitespace/delimiters
  const isBinaryString = (str: string): boolean => {
    const cleaned = str.replace(/0b/gi, "").replace(/[\s,|-]/g, "");
    return cleaned.length > 0 && /^[01]+$/.test(cleaned);
  };

  // Convert UTF-8 text into 8-bit binary strings
  const textToBinary = (text: string, sep: ByteSeparator, with0b: boolean): string => {
    // TextEncoder yields true UTF-8 bytes (supporting emojis and international scripts)
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const binArray: string[] = [];

    bytes.forEach(b => {
      const bin = (with0b ? "0b" : "") + b.toString(2).padStart(8, "0");
      binArray.push(bin);
    });

    const joiner = sep === "space" ? " " : sep === "comma" ? ", " : sep === "hyphen" ? "-" : "";
    return binArray.join(joiner);
  };

  // Convert binary digits back into UTF-8 text
  const binaryToText = (rawBin: string): string => {
    // Strip prefixes like 0b, newlines, commas, hyphens
    let cleaned = rawBin.replace(/0b/gi, "").replace(/[\s,|-]+/g, " ").trim();
    if (!cleaned) return "";

    let tokens: string[] = [];

    if (cleaned.includes(" ")) {
      tokens = cleaned.split(" ");
    } else {
      // If continuous string without delimiters, chunk into 8-bit bytes
      const match = cleaned.match(/.{1,8}/g);
      tokens = match ? match : [];
    }

    const uint8Array = new Uint8Array(tokens.length);

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      if (!/^[01]+$/.test(token)) {
        throw new Error(`Invalid binary token "${token}" at position ${i + 1}. Only 0 and 1 are allowed.`);
      }
      uint8Array[i] = parseInt(token, 2);
    }

    // TextDecoder decodes UTF-8 bytes back into proper unicode characters
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(uint8Array);
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setErrorMsg(null);
      setStats(null);
      return;
    }

    try {
      const isBin = isBinaryString(input);
      const shouldDecode = mode === "bin-to-text" || (mode === "auto" && isBin);

      let resultText = "";
      if (shouldDecode) {
        resultText = binaryToText(input);
      } else {
        resultText = textToBinary(input, separator, prefix0b);
      }

      setOutput(resultText);
      setErrorMsg(null);

      // Calculate binary telemetry stats
      const binPayload = shouldDecode ? input : resultText;
      const cleanBits = binPayload.replace(/[^01]/g, "");
      const ones = (cleanBits.match(/1/g) || []).length;
      const zeros = (cleanBits.match(/0/g) || []).length;

      setStats({
        charCount: shouldDecode ? resultText.length : input.length,
        byteCount: Math.ceil(cleanBits.length / 8),
        bitCount: cleanBits.length,
        oneCount: ones,
        zeroCount: zeros,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process binary conversion.");
      setOutput(`// Binary Conversion Error:\n// ${err.message || "Verify your binary inputs and delimiters."}`);
      setStats(null);
    }
  }, [input, mode, separator, prefix0b]);

  const loadSample = () => {
    if (mode === "bin-to-text") {
      setInput("01001000 01100101 01101100 01101100 01101111 00100001");
    } else {
      setInput("Hello! Welcome to Casetivo.");
    }
  };

  return (
    <TextToolLayout
      titleKey="binaryCodeTranslator"
      subtitleKey="binaryCodeTranslatorSubtitle"
      actionLabelKey="binaryCodeTranslatorAction"
      inputText={input}
      onInputChange={t => {
        setInput(t);
        if (!t) {
          setOutput("");
          setErrorMsg(null);
          setStats(null);
        }
      }}
      outputText={output}
      onAction={handleAction}
      relatedPostSlugs={[
        "how-to-translate-binary-code",
        "how-to-encode-and-decode-base64",
        "how-to-format-json-online",
      ]}
      relatedPostsTitle="Binary, Encoding & Computer Architecture Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Mode Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Direction:</span>
            {[
              { id: "auto", label: "Auto-Detect" },
              { id: "text-to-bin", label: "Text → Binary" },
              { id: "bin-to-text", label: "Binary → Text" },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setMode(m.id as BinaryMode);
                  setOutput("");
                  setErrorMsg(null);
                  setStats(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === m.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample
          </button>
        </div>

        {/* Byte Formatting Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          {/* Delimiter Selection */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Byte Separator:</span>
            {[
              { id: "space", label: "Space ( )" },
              { id: "none", label: "None (Continuous)" },
              { id: "comma", label: "Comma (,)" },
              { id: "hyphen", label: "Hyphen (-)" },
            ].map(sep => (
              <button
                key={sep.id}
                type="button"
                onClick={() => setSeparator(sep.id as ByteSeparator)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  separator === sep.id
                    ? "bg-primary/90 text-primary-foreground"
                    : "border border-border/80 bg-background hover:bg-accent text-foreground"
                }`}
              >
                {sep.label}
              </button>
            ))}
          </div>

          {/* 0b Prefix Option */}
          <label htmlFor={prefixId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
            <input
              id={prefixId}
              type="checkbox"
              checked={prefix0b}
              onChange={e => setPrefix0b(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
            />
            <span>Include <code>0b</code> Binary Prefix</span>
          </label>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Error:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Metrics Telemetry Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 max-w-3xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Text Characters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.charCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Bytes (8-Bit)</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.byteCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Total Bits</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.bitCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400">
              <div className="text-xs font-medium">1s (High)</div>
              <div className="text-base sm:text-lg font-bold">{stats.oneCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5 text-primary">
              <div className="text-xs font-medium">0s (Low)</div>
              <div className="text-base sm:text-lg font-bold">{stats.zeroCount}</div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
