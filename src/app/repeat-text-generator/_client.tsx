"use client";

import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type SeparatorType = "newline" | "space" | "comma" | "semicolon" | "tab" | "none" | "custom";
type NumberingStyle = "none" | "period" | "paren" | "bracket" | "hash";

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [repeatCount, setRepeatCount] = useState<number>(10);
  const [sepType, setSepType] = useState<SeparatorType>("newline");
  const [customSep, setCustomSep] = useState(" | ");
  const [numbering, setNumbering] = useState<NumberingStyle>("none");
  const [startZero, setStartZero] = useState(false);
  const [trimText, setTrimText] = useState(false);

  const [stats, setStats] = useState<{
    repetitions: number;
    charCount: number;
    wordCount: number;
    lineCount: number;
  } | null>(null);

  const handleAction = useCallback(() => {
    if (!input) {
      setOutput("");
      setStats(null);
      return;
    }

    const baseText = trimText ? input.trim() : input;
    const safeCount = Math.max(1, Math.min(10000, Number(repeatCount) || 1));

    let delimiter = "\n";
    if (sepType === "newline") delimiter = "\n";
    else if (sepType === "space") delimiter = " ";
    else if (sepType === "comma") delimiter = ", ";
    else if (sepType === "semicolon") delimiter = "; ";
    else if (sepType === "tab") delimiter = "\t";
    else if (sepType === "none") delimiter = "";
    else if (sepType === "custom") delimiter = customSep;

    const items: string[] = [];
    const startIndex = startZero ? 0 : 1;

    for (let i = 0; i < safeCount; i++) {
      let prefix = "";
      const currentNum = startIndex + i;
      if (numbering === "period") prefix = `${currentNum}. `;
      else if (numbering === "paren") prefix = `${currentNum}) `;
      else if (numbering === "bracket") prefix = `[${currentNum}] `;
      else if (numbering === "hash") prefix = `#${currentNum} `;

      items.push(`${prefix}${baseText}`);
    }

    const result = items.join(delimiter);
    const words = result.match(/[\p{L}\p{N}'-]+/gu) || [];
    const lines = result.split(/\r?\n/).length;

    setOutput(result);
    setStats({
      repetitions: safeCount,
      charCount: result.length,
      wordCount: words.length,
      lineCount: lines,
    });
  }, [input, repeatCount, sepType, customSep, numbering, startZero, trimText]);

  const setPresetCount = (cnt: number) => {
    setRepeatCount(cnt);
  };

  return (
    <TextToolLayout
      titleKey="repeatTextGenerator"
      subtitleKey="repeatTextGeneratorSubtitle"
      actionLabelKey="repeatTextGeneratorAction"
      inputText={input}
      onInputChange={t => {
        setInput(t);
        if (!t) {
          setOutput("");
          setStats(null);
        }
      }}
      outputText={output}
      onAction={handleAction}
      relatedPostSlugs={[
        "how-to-remove-duplicate-lines-from-text",
        "how-to-strip-formatting-and-convert-to-plain-text",
        "how-to-rewrite-sentences-for-clarity-and-impact",
      ]}
      relatedPostsTitle="Text Processing & Formatting Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Quick Repetition Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground mr-1">Quick Count:</span>
          {[10, 50, 100, 500, 1000, 5000].map(cnt => (
            <button
              key={cnt}
              type="button"
              onClick={() => setPresetCount(cnt)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                repeatCount === cnt
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-foreground hover:bg-accent"
              }`}
            >
              {cnt.toLocaleString()}x
            </button>
          ))}
        </div>

        {/* Configuration Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl border border-border bg-card/60 text-sm">
          {/* Repetition Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">
              Repetitions (1 &ndash; 10,000):
            </label>
            <input
              type="number"
              min={1}
              max={10000}
              value={repeatCount}
              onChange={e =>
                setRepeatCount(Math.max(1, Math.min(10000, Number(e.target.value) || 1)))
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Separator Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">Separator:</label>
            <select
              value={sepType}
              onChange={e => setSepType(e.target.value as SeparatorType)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newline">New Line (\n)</option>
              <option value="space">Space</option>
              <option value="comma">Comma &amp; Space (, )</option>
              <option value="semicolon">Semicolon (; )</option>
              <option value="tab">Tab (\t)</option>
              <option value="none">None (Concat)</option>
              <option value="custom">Custom Separator</option>
            </select>
          </div>

          {/* Numbering Style */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">Line Numbering:</label>
            <select
              value={numbering}
              onChange={e => setNumbering(e.target.value as NumberingStyle)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="none">None (No numbering)</option>
              <option value="period">1. Text</option>
              <option value="paren">1) Text</option>
              <option value="bracket">[1] Text</option>
              <option value="hash">#1 Text</option>
            </select>
          </div>

          {/* Custom Separator input if custom selected */}
          {sepType === "custom" && (
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-3">
              <label className="text-xs font-semibold text-foreground">Custom delimiter:</label>
              <input
                type="text"
                value={customSep}
                onChange={e => setCustomSep(e.target.value)}
                placeholder="e.g.  |  or  --- "
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          {/* Toggles */}
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2 lg:col-span-3 pt-2 border-t border-border/60">
            <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
              <input
                type="checkbox"
                checked={startZero}
                onChange={e => setStartZero(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-medium text-xs sm:text-sm">Start numbering at 0 (Zero-indexed)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
              <input
                type="checkbox"
                checked={trimText}
                onChange={e => setTrimText(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-medium text-xs sm:text-sm">Trim text before repeating</span>
            </label>
          </div>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Repetitions</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.repetitions.toLocaleString()}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Characters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.charCount.toLocaleString()}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Total Words</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.wordCount.toLocaleString()}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5">
              <div className="text-xs text-muted-foreground font-medium">Lines</div>
              <div className="text-base sm:text-lg font-bold text-primary">
                {stats.lineCount.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
