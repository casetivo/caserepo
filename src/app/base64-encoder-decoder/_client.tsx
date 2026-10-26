"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type Base64Mode = "encode" | "decode";

interface Base64Stats {
  inputChars: number;
  inputBytes: number;
  outputChars: number;
  outputBytes: number;
  sizeRatioPercent: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Base64Mode>("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [splitLines, setSplitLines] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [stats, setStats] = useState<Base64Stats | null>(null);
  const urlSafeId = useId();
  const splitLinesId = useId();

  // UTF-8 safe encode with URL-safe option and line wrapping
  const encodeBase64 = (str: string, isUrlSafe: boolean, wrap76: boolean): string => {
    // encodeURIComponent converts UTF-8 multi-byte characters into %XX hex tokens
    // unescape converts %XX into raw byte strings which btoa can handle safely
    const utf8Bytes = unescape(encodeURIComponent(str));
    let base64 = btoa(utf8Bytes);

    if (isUrlSafe) {
      base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    if (wrap76) {
      // Standard MIME RFC 2045 wrapping at 76 characters
      base64 = base64.match(/.{1,76}/g)?.join("\n") || base64;
    }

    return base64;
  };

  // UTF-8 safe decode supporting URL-safe and stripped padding
  const decodeBase64 = (b64: string): string => {
    let cleaned = b64.trim().replace(/\s+/g, ""); // remove linebreaks / whitespace

    // Convert URL-safe characters back to standard Base64
    cleaned = cleaned.replace(/-/g, "+").replace(/_/g, "/");

    // Add back missing '=' padding if stripped
    while (cleaned.length % 4 !== 0) {
      cleaned += "=";
    }

    // Validate standard Base64 characters
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(cleaned)) {
      throw new Error("Invalid Base64 sequence. Input contains non-Base64 characters.");
    }

    const decodedRaw = atob(cleaned);
    try {
      // Decode UTF-8 bytes back to unicode
      return decodeURIComponent(escape(decodedRaw));
    } catch {
      // Fallback if raw binary data cannot be mapped to UTF-8
      return decodedRaw;
    }
  };

  const handleAction = useCallback(() => {
    if (!input) {
      setOutput("");
      setErrorMsg(null);
      setStats(null);
      return;
    }

    try {
      let result = "";
      if (mode === "encode") {
        result = encodeBase64(input, urlSafe, splitLines);
      } else {
        result = decodeBase64(input);
      }

      setOutput(result);
      setErrorMsg(null);

      const inBytes = new Blob([input]).size;
      const outBytes = new Blob([result]).size;
      const ratio = inBytes > 0 ? Math.round((outBytes / inBytes) * 100) : 100;

      setStats({
        inputChars: input.length,
        inputBytes: inBytes,
        outputChars: result.length,
        outputBytes: outBytes,
        sizeRatioPercent: ratio,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process Base64 operation.");
      setOutput(`// Error: ${err.message || "Invalid Base64 data."}\n// Please verify your input characters and try again.`);
      setStats(null);
    }
  }, [input, mode, urlSafe, splitLines]);

  const loadSample = () => {
    if (mode === "encode") {
      setInput("Hello, world! 🚀 Welcome to Casetivo's Developer Tools.");
    } else {
      setInput("SGVsbG8sIHdvcmxkISDwn5qAIFdlbGNvbWUgdG8gQ2FzZXRpdm8ncyBEZXZlbG9wZXIgVG9vbHMu");
    }
  };

  return (
    <TextToolLayout
      titleKey="base64EncoderDecoder"
      subtitleKey="base64EncoderDecoderSubtitle"
      actionLabelKey="base64EncoderDecoderAction"
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
        "how-to-encode-and-decode-base64",
        "what-is-json-formatter",
        "how-to-format-json-online",
      ]}
      relatedPostsTitle="Base64, Encoding & Developer Tutorials"
    >
      <div className="flex flex-col gap-4">
        {/* Operation Mode Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Mode:</span>
            {(["encode", "decode"] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setOutput("");
                  setErrorMsg(null);
                  setStats(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                  mode === m
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {m === "encode" ? "Encode to Base64" : "Decode to Text"}
              </button>
            ))}
          </div>

          {/* Quick Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample {mode === "encode" ? "Text" : "Base64"}
          </button>
        </div>

        {/* Encoding Specific Options */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          <div className="flex items-center gap-5">
            <label htmlFor={urlSafeId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
              <input
                id={urlSafeId}
                type="checkbox"
                checked={urlSafe}
                onChange={e => setUrlSafe(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
              />
              <span>URL-Safe Base64 (RFC 4648 <code>-_</code> instead of <code>+/</code>)</span>
            </label>

            {mode === "encode" && (
              <label htmlFor={splitLinesId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
                <input
                  id={splitLinesId}
                  type="checkbox"
                  checked={splitLines}
                  onChange={e => setSplitLines(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
                />
                <span>MIME 76-Char Line Breaks</span>
              </label>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            UTF-8 Multi-byte Compliant (Emojis, Asian &amp; Cyrillic Safe)
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Input Characters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.inputChars}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Input Size</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.inputBytes > 1024
                  ? `${(stats.inputBytes / 1024).toFixed(1)} KB`
                  : `${stats.inputBytes} B`}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Output Characters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.outputChars}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Size Change</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.sizeRatioPercent}%
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
