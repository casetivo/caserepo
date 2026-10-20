"use client";

import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type ReplacementMode =
  | "hyphen-spaced"
  | "hyphen"
  | "double-hyphen"
  | "comma"
  | "space"
  | "delete"
  | "custom";

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<ReplacementMode>("hyphen-spaced");
  const [customReplacement, setCustomReplacement] = useState(" - ");
  const [targetEmDash, setTargetEmDash] = useState(true);
  const [targetEnDash, setTargetEnDash] = useState(true);
  const [targetDoubleHyphen, setTargetDoubleHyphen] = useState(true);
  const [normalizeSpaces, setNormalizeSpaces] = useState(true);

  const [stats, setStats] = useState<{
    emDashes: number;
    enDashes: number;
    doubleHyphens: number;
    totalReplaced: number;
  } | null>(null);

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      return;
    }

    // Count occurrences before replacement
    const emMatches = input.match(/[—―]/g) || [];
    const enMatches = input.match(/–/g) || [];
    const dblMatches = input.match(/--/g) || [];

    let countEm = targetEmDash ? emMatches.length : 0;
    let countEn = targetEnDash ? enMatches.length : 0;
    let countDbl = targetDoubleHyphen ? dblMatches.length : 0;

    let result = input;

    let rep = " - ";
    if (mode === "hyphen-spaced") rep = " - ";
    else if (mode === "hyphen") rep = "-";
    else if (mode === "double-hyphen") rep = "--";
    else if (mode === "comma") rep = ", ";
    else if (mode === "space") rep = " ";
    else if (mode === "delete") rep = "";
    else if (mode === "custom") rep = customReplacement;

    // Apply replacements according to selection
    if (targetEmDash) {
      if (mode === "hyphen-spaced" || mode === "comma" || mode === "space") {
        result = result.replace(/\s*[—―]\s*/g, rep);
      } else {
        result = result.replace(/[—―]/g, rep);
      }
    }

    if (targetEnDash) {
      if (mode === "hyphen-spaced" || mode === "comma" || mode === "space") {
        result = result.replace(/\s*–\s*/g, rep);
      } else {
        result = result.replace(/–/g, rep);
      }
    }

    if (targetDoubleHyphen) {
      if (mode === "hyphen-spaced" || mode === "comma" || mode === "space") {
        result = result.replace(/\s*--\s*/g, rep);
      } else {
        result = result.replace(/--/g, rep);
      }
    }

    if (normalizeSpaces) {
      result = result
        .replace(/[ \t]{2,}/g, " ")
        .replace(/\s*([,.;:!?])\s*/g, "$1 ")
        .replace(/\(\s+/g, "(")
        .replace(/\s+\)/g, ")")
        .trim();
    }

    setOutput(result);
    setStats({
      emDashes: countEm,
      enDashes: countEn,
      doubleHyphens: countDbl,
      totalReplaced: countEm + countEn + countDbl,
    });
  }, [
    input,
    mode,
    customReplacement,
    targetEmDash,
    targetEnDash,
    targetDoubleHyphen,
    normalizeSpaces,
  ]);

  return (
    <TextToolLayout
      titleKey="emDashRemover"
      subtitleKey="emDashRemoverSubtitle"
      actionLabelKey="emDashRemoverAction"
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
        "how-to-find-and-fix-duplicate-words",
        "how-to-sort-words-alphabetically",
        "how-to-remove-duplicate-lines-from-text",
      ]}
      relatedPostsTitle="Writing & Clean Text Polish Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Preset Replacement Options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <label className="text-xs sm:text-sm font-semibold text-muted-foreground">
            Replace dashes with:
          </label>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "hyphen-spaced", label: "Spaced Hyphen ( - )" },
              { id: "hyphen", label: "Hyphen (-)" },
              { id: "comma", label: "Comma (, )" },
              { id: "double-hyphen", label: "Double Hyphen (--)" },
              { id: "space", label: "Single Space" },
              { id: "delete", label: "Completely Remove" },
              { id: "custom", label: "Custom" },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id as ReplacementMode)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  mode === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input Field (visible when custom selected) */}
        {mode === "custom" && (
          <div className="flex items-center justify-center gap-2 max-w-sm mx-auto w-full">
            <span className="text-xs text-muted-foreground">Custom string:</span>
            <input
              type="text"
              value={customReplacement}
              onChange={e => setCustomReplacement(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g.  |  or ..."
            />
          </div>
        )}

        {/* Target Scope & Cleaning Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 p-4 rounded-xl border border-border bg-card/60 text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={targetEmDash}
              onChange={e => setTargetEmDash(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Em Dashes (&mdash;)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={targetEnDash}
              onChange={e => setTargetEnDash(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">En Dashes (&ndash;)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={targetDoubleHyphen}
              onChange={e => setTargetDoubleHyphen(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Double Hyphens (--)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={normalizeSpaces}
              onChange={e => setNormalizeSpaces(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Clean Extra Spaces</span>
          </label>
        </div>

        {/* Live Metrics */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Em Dashes (&mdash;)</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.emDashes}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">En Dashes (&ndash;)</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.enDashes}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Double Hyphens (--)</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.doubleHyphens}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5">
              <div className="text-xs text-muted-foreground font-medium">Total Cleaned</div>
              <div className="text-base sm:text-lg font-bold text-primary">{stats.totalReplaced}</div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
