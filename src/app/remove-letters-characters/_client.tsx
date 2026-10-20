"use client";

import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [customChars, setCustomChars] = useState("");

  // Preset Filters
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [removePunctuation, setRemovePunctuation] = useState(false);
  const [removeLetters, setRemoveLetters] = useState(false);
  const [removeNonAscii, setRemoveNonAscii] = useState(false);

  // Options
  const [invertMatch, setInvertMatch] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [normalizeSpaces, setNormalizeSpaces] = useState(true);

  const [stats, setStats] = useState<{
    originalLength: number;
    cleanedLength: number;
    removedCount: number;
    percentReduced: number;
  } | null>(null);

  const handleAction = useCallback(() => {
    if (!input) {
      setOutput("");
      setStats(null);
      return;
    }

    const originalLength = input.length;

    // Build matcher function for each character
    const checkIsTarget = (char: string): boolean => {
      // 1. Numbers check
      if (removeNumbers && /[0-9]/.test(char)) return true;

      // 2. Letters check
      if (removeLetters) {
        if (caseSensitive) {
          if (/[a-zA-Z]/.test(char)) return true;
        } else {
          if (/\p{L}/u.test(char)) return true;
        }
      }

      // 3. Punctuation & Symbols check
      if (removePunctuation && /[\p{P}\p{S}]/u.test(char)) return true;

      // 4. Non-ASCII check
      if (removeNonAscii && /[^\x00-\x7F]/.test(char)) return true;

      // 5. Custom characters check
      if (customChars.length > 0) {
        if (caseSensitive) {
          if (customChars.includes(char)) return true;
        } else {
          const lowerChar = char.toLowerCase();
          const lowerCustom = customChars.toLowerCase();
          if (lowerCustom.includes(lowerChar)) return true;
        }
      }

      return false;
    };

    // If no filter selected and no custom chars, do nothing
    const hasFilter =
      removeNumbers ||
      removePunctuation ||
      removeLetters ||
      removeNonAscii ||
      customChars.length > 0;

    if (!hasFilter) {
      setOutput(input);
      setStats({
        originalLength,
        cleanedLength: originalLength,
        removedCount: 0,
        percentReduced: 0,
      });
      return;
    }

    let resultChars: string[] = [];
    const characters = Array.from(input);

    for (const char of characters) {
      const isTarget = checkIsTarget(char);
      // In normal mode: keep if NOT target
      // In invert mode: keep if IS target (always preserve newlines for readability)
      if (invertMatch) {
        if (char === "\n" || char === "\r" || isTarget) {
          resultChars.push(char);
        }
      } else {
        if (!isTarget) {
          resultChars.push(char);
        }
      }
    }

    let result = resultChars.join("");

    if (normalizeSpaces) {
      result = result
        .replace(/[ \t]{2,}/g, " ")
        .split("\n")
        .map(line => line.trim())
        .join("\n")
        .trim();
    }

    const cleanedLength = result.length;
    const removedCount = originalLength - cleanedLength;
    const percentReduced =
      originalLength > 0 ? Math.max(0, Math.round((removedCount / originalLength) * 100)) : 0;

    setOutput(result);
    setStats({
      originalLength,
      cleanedLength,
      removedCount: Math.max(0, removedCount),
      percentReduced,
    });
  }, [
    input,
    customChars,
    removeNumbers,
    removePunctuation,
    removeLetters,
    removeNonAscii,
    invertMatch,
    caseSensitive,
    normalizeSpaces,
  ]);

  const selectPresetOnly = (preset: "numbers" | "punctuation" | "letters" | "nonAscii" | "clear") => {
    if (preset === "clear") {
      setRemoveNumbers(false);
      setRemovePunctuation(false);
      setRemoveLetters(false);
      setRemoveNonAscii(false);
      setCustomChars("");
    } else {
      setRemoveNumbers(preset === "numbers");
      setRemovePunctuation(preset === "punctuation");
      setRemoveLetters(preset === "letters");
      setRemoveNonAscii(preset === "nonAscii");
    }
  };

  return (
    <TextToolLayout
      titleKey="removeLettersCharacters"
      subtitleKey="removeLettersCharactersSubtitle"
      actionLabelKey="removeLettersCharactersAction"
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
        "how-to-strip-formatting-and-convert-to-plain-text",
        "how-to-remove-duplicate-lines-from-text",
        "how-to-find-and-fix-duplicate-words",
      ]}
      relatedPostsTitle="Data Cleaning & Text Formatting Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Quick Filter Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground mr-1">Quick Presets:</span>
          <button
            type="button"
            onClick={() => selectPresetOnly("numbers")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              removeNumbers && !removePunctuation && !removeLetters && !removeNonAscii
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card text-foreground hover:bg-accent"
            }`}
          >
            Numbers (0-9)
          </button>
          <button
            type="button"
            onClick={() => selectPresetOnly("punctuation")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              removePunctuation && !removeNumbers && !removeLetters && !removeNonAscii
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card text-foreground hover:bg-accent"
            }`}
          >
            Punctuation &amp; Symbols
          </button>
          <button
            type="button"
            onClick={() => selectPresetOnly("letters")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              removeLetters && !removeNumbers && !removePunctuation && !removeNonAscii
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card text-foreground hover:bg-accent"
            }`}
          >
            Letters (a-z)
          </button>
          <button
            type="button"
            onClick={() => selectPresetOnly("nonAscii")}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              removeNonAscii && !removeNumbers && !removePunctuation && !removeLetters
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card text-foreground hover:bg-accent"
            }`}
          >
            Non-ASCII &amp; Emojis
          </button>
          <button
            type="button"
            onClick={() => selectPresetOnly("clear")}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground border border-dashed border-border"
          >
            Reset
          </button>
        </div>

        {/* Custom Character Input & Options */}
        <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-card/60">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
              Specific characters to strip:
            </label>
            <input
              type="text"
              value={customChars}
              onChange={e => setCustomChars(e.target.value)}
              placeholder="e.g. ()#$@-_"
              className="flex-1 w-full sm:w-auto rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
                <input
                  type="checkbox"
                  checked={invertMatch}
                  onChange={e => setInvertMatch(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <span className="font-medium text-amber-600 dark:text-amber-400">
                  Invert Match (Keep ONLY these characters)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={e => setCaseSensitive(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <span className="font-medium">Case Sensitive</span>
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
          </div>
        </div>

        {/* Live Metrics Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Original Length</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.originalLength}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Clean Length</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.cleanedLength}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5">
              <div className="text-xs text-muted-foreground font-medium">Removed Count</div>
              <div className="text-base sm:text-lg font-bold text-primary">{stats.removedCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
              <div className="text-xs text-muted-foreground font-medium">Reduction</div>
              <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {stats.percentReduced}%
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
