"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type StringifyMode = "stringify" | "unescape";

interface StringifyStats {
  inputChars: number;
  outputChars: number;
  escapedQuotesCount: number;
  escapedNewlinesCount: number;
  escapedBackslashesCount: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<StringifyMode>("stringify");
  const [wrapQuotes, setWrapQuotes] = useState(true);
  const [stats, setStats] = useState<StringifyStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const wrapQuotesId = useId();

  // Robust stringify & escape logic
  const processStringify = (text: string, isStringify: boolean, shouldWrap: boolean): string => {
    if (!text) return "";

    if (isStringify) {
      // Check if text is valid JSON object/array first
      let contentToEscape = text;
      try {
        const parsed = JSON.parse(text);
        // Minify the JSON first so we don't have unnecessary formatting whitespace
        contentToEscape = JSON.stringify(parsed);
      } catch {
        // Plain text or unparseable JSON: treat as literal raw string
        contentToEscape = text;
      }

      // JSON stringify the raw string
      let stringified = JSON.stringify(contentToEscape);

      if (!shouldWrap && stringified.startsWith('"') && stringified.endsWith('"')) {
        stringified = stringified.slice(1, -1);
      }

      return stringified;
    } else {
      // Unescape mode
      let target = text.trim();
      // If user provided a string wrapped in quotes, attempt JSON.parse
      if (target.startsWith('"') && target.endsWith('"')) {
        try {
          return JSON.parse(target);
        } catch {
          // Fall through to manual unescaping
        }
      }

      // Manual unescape
      return target
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, "\\")
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "\r")
        .replace(/\\t/g, "\t");
    }
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setErrorMsg(null);
      return;
    }

    try {
      const result = processStringify(input, mode === "stringify", wrapQuotes);
      setOutput(result);
      setErrorMsg(null);

      // Compute escape character counts
      const quotes = (result.match(/\\"/g) || []).length;
      const newlines = (result.match(/\\n/g) || []).length;
      const backslashes = (result.match(/\\\\/g) || []).length;

      setStats({
        inputChars: input.length,
        outputChars: result.length,
        escapedQuotesCount: quotes,
        escapedNewlinesCount: newlines,
        escapedBackslashesCount: backslashes,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process stringification.");
      setOutput(`// Error: ${err.message || "Invalid input sequence"}`);
      setStats(null);
    }
  }, [input, mode, wrapQuotes]);

  const loadSample = () => {
    if (mode === "stringify") {
      const sample = `{
  "name": "Casetivo Platform",
  "version": "2.4.0",
  "description": "High-performance \\"in-browser\\" developer tools with 100% privacy.",
  "features": [
    "JSON Formatter",
    "Base64 & Hex Converters",
    "Markdown to HTML"
  ]
}`;
      setInput(sample);
    } else {
      setInput('{\\"name\\":\\"Casetivo Platform\\",\\"description\\":\\"High-performance \\\\\\"in-browser\\\\\\" tools.\\"}');
    }
  };

  return (
    <TextToolLayout
      titleKey="jsonStringifier"
      subtitleKey="jsonStringifierSubtitle"
      actionLabelKey="jsonStringifierAction"
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
        "how-to-escape-and-stringify-json",
        "what-is-json-formatter",
        "how-to-format-json-online",
      ]}
      relatedPostsTitle="JSON, String Escaping & API Payload Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Operation Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Mode:</span>
            {(["stringify", "unescape"] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setOutput("");
                  setStats(null);
                  setErrorMsg(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                  mode === m
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {m === "stringify" ? "Stringify & Escape" : "Unescape to Plain Text"}
              </button>
            ))}
          </div>

          {/* Quick Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample {mode === "stringify" ? "JSON" : "Escaped String"}
          </button>
        </div>

        {/* Options Bar */}
        {mode === "stringify" && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
            <label htmlFor={wrapQuotesId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
              <input
                id={wrapQuotesId}
                type="checkbox"
                checked={wrapQuotes}
                onChange={e => setWrapQuotes(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
              />
              <span>Wrap Result in Outer Double Quotes (<code>&quot;...&quot;</code>)</span>
            </label>

            <span className="text-xs text-muted-foreground">
              Automatically escapes <code>\&quot;</code>, <code>\n</code>, <code>\t</code>, &amp; <code>\\</code>
            </span>
          </div>
        )}

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
              <div className="text-xs text-muted-foreground font-medium">Input Length</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.inputChars}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Output Length</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.outputChars}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Escaped Quotes (<code>\&quot;</code>)</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.escapedQuotesCount}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Escaped Newlines (<code>\n</code>)</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.escapedNewlinesCount}
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
