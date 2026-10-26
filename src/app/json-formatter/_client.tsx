"use client";

import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type FormatIndent = "2" | "4" | "tab" | "minify";

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<FormatIndent>("2");
  const [errorDetails, setErrorDetails] = useState<{
    message: string;
    line?: number;
    column?: number;
  } | null>(null);

  const [stats, setStats] = useState<{
    originalBytes: number;
    outputBytes: number;
    isValid: boolean;
    keyCount?: number;
    sizeChangePercent?: number;
  } | null>(null);

  const formatWithIndent = (parsed: any, style: FormatIndent): string => {
    if (style === "minify") return JSON.stringify(parsed);
    if (style === "tab") return JSON.stringify(parsed, null, "\t");
    const spaces = Number(style);
    return JSON.stringify(parsed, null, spaces);
  };

  const countKeys = (obj: any): number => {
    if (!obj || typeof obj !== "object") return 0;
    let count = 0;
    for (const k in obj) {
      count++;
      if (typeof obj[k] === "object") {
        count += countKeys(obj[k]);
      }
    }
    return count;
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setErrorDetails(null);
      setStats(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = formatWithIndent(parsed, indent);
      setOutput(formatted);
      setErrorDetails(null);

      const origBytes = new Blob([input]).size;
      const outBytes = new Blob([formatted]).size;
      const diff = origBytes - outBytes;
      const percent = origBytes > 0 ? Math.round((diff / origBytes) * 100) : 0;

      setStats({
        originalBytes: origBytes,
        outputBytes: outBytes,
        isValid: true,
        keyCount: countKeys(parsed),
        sizeChangePercent: percent,
      });
    } catch (err: any) {
      const rawMsg = err.message || "Invalid JSON syntax.";
      let line: number | undefined;
      let column: number | undefined;

      const posMatch = rawMsg.match(/position\s+(\d+)/i);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const textBefore = input.slice(0, pos);
        const lines = textBefore.split("\n");
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }

      setErrorDetails({
        message: rawMsg,
        line,
        column,
      });

      setOutput(
        `// ❌ JSON Syntax Error:\n// ${rawMsg}${
          line ? `\n// Location: Line ${line}, Column ${column}` : ""
        }\n\n// Tip: Click "Auto-Fix Common Errors" below to clean trailing commas or single quotes automatically.`
      );

      setStats({
        originalBytes: new Blob([input]).size,
        outputBytes: 0,
        isValid: false,
      });
    }
  }, [input, indent]);

  const handleAutoFix = () => {
    if (!input.trim()) return;

    let fixed = input;
    // 1. Remove single-line JS comments
    fixed = fixed.replace(/\/\/.*$/gm, "");
    // 2. Remove multi-line JS comments
    fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, "");
    // 3. Replace single quotes around keys and values with double quotes
    fixed = fixed.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');
    // 4. Remove trailing commas before closing braces and brackets
    fixed = fixed.replace(/,\s*([}\]])/g, "$1");

    setInput(fixed);

    // Try parsing fixed version
    try {
      const parsed = JSON.parse(fixed);
      const formatted = formatWithIndent(parsed, indent);
      setOutput(formatted);
      setErrorDetails(null);

      const origBytes = new Blob([fixed]).size;
      const outBytes = new Blob([formatted]).size;

      setStats({
        originalBytes: origBytes,
        outputBytes: outBytes,
        isValid: true,
        keyCount: countKeys(parsed),
      });
    } catch (err: any) {
      handleAction();
    }
  };

  return (
    <TextToolLayout
      titleKey="jsonFormatter"
      subtitleKey="jsonFormatterSubtitle"
      actionLabelKey="jsonFormatterAction"
      inputText={input}
      onInputChange={t => {
        setInput(t);
        if (!t) {
          setOutput("");
          setErrorDetails(null);
          setStats(null);
        }
      }}
      outputText={output}
      onAction={handleAction}
      relatedPostSlugs={[
        "how-to-format-json-online",
        "what-is-json-formatter",
        "how-to-convert-csv-to-json",
      ]}
      relatedPostsTitle="JSON & Developer Data Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Formatting Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Indentation:</span>
            {[
              { id: "2", label: "2 Spaces" },
              { id: "4", label: "4 Spaces" },
              { id: "tab", label: "Tab" },
              { id: "minify", label: "Minify (Compact)" },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndent(item.id as FormatIndent)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  indent === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAutoFix}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
            title="Converts single quotes, strips trailing commas, and removes comments"
          >
            <span>✨</span> Auto-Fix Common Errors
          </button>
        </div>

        {/* Syntax Error Notification Banner */}
        {errorDetails && (
          <div className="p-3.5 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs sm:text-sm flex flex-col gap-1">
            <div className="font-bold flex items-center gap-1.5">
              <span>⚠️</span> JSON Syntax Error Detected
            </div>
            <div className="text-muted-foreground dark:text-destructive-foreground/90 font-mono text-xs">
              {errorDetails.message}
              {errorDetails.line && (
                <span className="ml-2 px-1.5 py-0.5 rounded bg-destructive/20 font-semibold">
                  Line {errorDetails.line}, Col {errorDetails.column}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Original Size</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {(stats.originalBytes / 1024).toFixed(1)} KB
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Output Size</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {(stats.outputBytes / 1024).toFixed(1)} KB
              </div>
            </div>
            <div
              className={`p-2.5 rounded-lg border ${
                stats.isValid
                  ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
                  : "border-destructive/30 bg-destructive/5 text-destructive"
              }`}
            >
              <div className="text-xs font-medium">Validation</div>
              <div className="text-base sm:text-lg font-bold">
                {stats.isValid ? "Valid JSON" : "Invalid"}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5">
              <div className="text-xs text-muted-foreground font-medium">
                {indent === "minify" ? "Bandwidth Saved" : "Total Keys"}
              </div>
              <div className="text-base sm:text-lg font-bold text-primary">
                {indent === "minify"
                  ? `${stats.sizeChangePercent || 0}%`
                  : stats.keyCount || 0}
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
