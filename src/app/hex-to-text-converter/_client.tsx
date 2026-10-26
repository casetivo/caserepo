"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type HexMode = "auto" | "text-to-hex" | "hex-to-text";
type HexDelimiter = "space" | "none" | "comma" | "colon";
type HexCase = "upper" | "lower";

interface HexStats {
  charCount: number;
  byteCount: number;
  hexChars: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<HexMode>("auto");
  const [delimiter, setDelimiter] = useState<HexDelimiter>("space");
  const [hexCase, setHexCase] = useState<HexCase>("upper");
  const [include0x, setInclude0x] = useState(false);
  const [stats, setStats] = useState<HexStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const prefixId = useId();

  // Test if input is primarily hexadecimal characters
  const isHexPayload = (str: string): boolean => {
    const cleaned = str.replace(/0x/gi, "").replace(/[\s,:-]/g, "");
    return cleaned.length > 0 && cleaned.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(cleaned);
  };

  // Convert UTF-8 text to Hex
  const textToHex = (text: string, delim: HexDelimiter, casing: HexCase, withPrefix: boolean): string => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const hexArr: string[] = [];

    bytes.forEach(b => {
      let hex = b.toString(16).padStart(2, "0");
      if (casing === "upper") hex = hex.toUpperCase();
      if (withPrefix) hex = `0x${hex}`;
      hexArr.push(hex);
    });

    const sep = delim === "space" ? " " : delim === "comma" ? ", " : delim === "colon" ? ":" : "";
    return hexArr.join(sep);
  };

  // Convert Hex to UTF-8 text
  const hexToText = (rawHex: string): string => {
    // Strip prefixes (0x), whitespace, commas, colons
    let cleaned = rawHex.replace(/0x/gi, "").replace(/[\s,:-]/g, "");
    if (!cleaned) return "";

    if (!/^[0-9a-fA-F]+$/.test(cleaned)) {
      throw new Error("Invalid character detected. Hexadecimal only permits digits 0-9 and letters A-F.");
    }

    if (cleaned.length % 2 !== 0) {
      throw new Error("Odd number of hex characters. Each byte requires exactly 2 hexadecimal digits.");
    }

    const byteLength = cleaned.length / 2;
    const uint8Array = new Uint8Array(byteLength);

    for (let i = 0; i < byteLength; i++) {
      const hexByte = cleaned.substr(i * 2, 2);
      uint8Array[i] = parseInt(hexByte, 16);
    }

    const decoder = new TextDecoder("utf-8");
    return decoder.decode(uint8Array);
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setErrorMsg(null);
      return;
    }

    try {
      const isHex = isHexPayload(input);
      const shouldDecode = mode === "hex-to-text" || (mode === "auto" && isHex);

      let result = "";
      if (shouldDecode) {
        result = hexToText(input);
      } else {
        result = textToHex(input, delimiter, hexCase, include0x);
      }

      setOutput(result);
      setErrorMsg(null);

      const hexData = shouldDecode ? input : result;
      const cleanHexDigits = hexData.replace(/0x/gi, "").replace(/[^0-9a-fA-F]/g, "");

      setStats({
        charCount: shouldDecode ? result.length : input.length,
        byteCount: Math.ceil(cleanHexDigits.length / 2),
        hexChars: cleanHexDigits.length,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to convert hexadecimal.");
      setOutput(`// Hex Conversion Error:\n// ${err.message || "Check your hex characters and try again."}`);
      setStats(null);
    }
  }, [input, mode, delimiter, hexCase, include0x]);

  const loadSample = () => {
    if (mode === "hex-to-text") {
      setInput("48 65 6C 6C 6F 2C 20 57 6F 72 6C 64 21 20 F0 9F 9A 80");
    } else {
      setInput("Hello, World! 🚀 Welcome to Casetivo.");
    }
  };

  return (
    <TextToolLayout
      titleKey="hexToTextConverter"
      subtitleKey="hexToTextConverterSubtitle"
      actionLabelKey="hexToTextConverterAction"
      inputText={input}
      onInputChange={t => {
        setInput(t);
        if (!t) {
          setOutput("");
          setStats(null);
          setErrorMsg(null);
        }
      }}
      outputText={output}
      onAction={handleAction}
      relatedPostSlugs={[
        "how-to-convert-hex-to-text",
        "how-to-translate-binary-code",
        "how-to-encode-and-decode-base64",
      ]}
      relatedPostsTitle="Hexadecimal, Binary & Low-Level Encoding Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Direction Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Direction:</span>
            {[
              { id: "auto", label: "Auto-Detect" },
              { id: "text-to-hex", label: "Text → Hex" },
              { id: "hex-to-text", label: "Hex → Text" },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setMode(m.id as HexMode);
                  setOutput("");
                  setStats(null);
                  setErrorMsg(null);
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

          {/* Quick Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample
          </button>
        </div>

        {/* Formatting Options Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          {/* Delimiter Selection */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Byte Separator:</span>
            {[
              { id: "space", label: "Space ( )" },
              { id: "none", label: "None" },
              { id: "comma", label: "Comma (,)" },
              { id: "colon", label: "Colon (:)" },
            ].map(d => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDelimiter(d.id as HexDelimiter)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  delimiter === d.id
                    ? "bg-primary/90 text-primary-foreground"
                    : "border border-border/80 bg-background hover:bg-accent text-foreground"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Casing & 0x Prefix */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border border-border rounded-lg p-0.5 bg-background">
              {(["upper", "lower"] as const).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setHexCase(c)}
                  className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                    hexCase === c ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <label htmlFor={prefixId} className="flex items-center gap-1.5 cursor-pointer select-none text-xs text-foreground">
              <input
                id={prefixId}
                type="checkbox"
                checked={include0x}
                onChange={e => setInclude0x(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
              />
              <span><code>0x</code> Prefix</span>
            </label>
          </div>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Error:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-w-xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Text Characters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.charCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Total Bytes</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.byteCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Hex Digits (Nibbles)</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.hexChars}</div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
