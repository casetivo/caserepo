"use client";
import { useState, useCallback, useMemo } from "react";
import TextToolLayout from "@/components/TextToolLayout";

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false);
  const [stats, setStats] = useState<{ original: number; unique: number; removed: number } | null>(null);

  const handleAction = useCallback(() => {
    if (!input) {
      setOutput("");
      setStats(null);
      return;
    }

    const rawLines = input.split(/\r?\n/);
    const seen = new Set<string>();
    const uniqueLines: string[] = [];
    let emptyCount = 0;

    for (const rawLine of rawLines) {
      const processed = trimWhitespace ? rawLine.trim() : rawLine;
      const isEmpty = processed === "";

      if (isEmpty) {
        emptyCount++;
        if (removeEmptyLines) {
          continue;
        }
      }

      // Check key based on case sensitivity
      const lookupKey = caseSensitive ? processed : processed.toLowerCase();

      if (!seen.has(lookupKey)) {
        seen.add(lookupKey);
        uniqueLines.push(processed);
      }
    }

    const result = uniqueLines.join("\n");
    setOutput(result);
    setStats({
      original: rawLines.length,
      unique: uniqueLines.length,
      removed: rawLines.length - uniqueLines.length,
    });
  }, [input, caseSensitive, trimWhitespace, removeEmptyLines]);

  return (
    <TextToolLayout
      titleKey="duplicateLineRemover"
      subtitleKey="duplicateLineRemoverSubtitle"
      actionLabelKey="duplicateLineRemoverAction"
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
        "how-to-sort-words-alphabetically",
        "how-to-convert-csv-to-json",
      ]}
      relatedPostsTitle="Helpful List & Data Cleaning Guides"
    >
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm sm:text-base text-center max-w-2xl mx-auto">
          Instantly remove duplicate lines from any list, document, or dataset. The tool keeps the first occurrence, preserves your original sequence, and discards all repeated copies.
        </p>

        {/* Configuration Options */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 p-4 rounded-xl border border-border bg-card/60 text-sm">
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
              checked={trimWhitespace}
              onChange={e => setTrimWhitespace(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Trim Whitespace</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={removeEmptyLines}
              onChange={e => setRemoveEmptyLines(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Remove Empty Lines</span>
          </label>
        </div>

        {/* Live Deduplication Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Original Lines</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.original}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5">
              <div className="text-xs text-muted-foreground font-medium">Unique Lines</div>
              <div className="text-base sm:text-lg font-bold text-primary">{stats.unique}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-destructive/30 bg-destructive/5">
              <div className="text-xs text-muted-foreground font-medium">Duplicates Removed</div>
              <div className="text-base sm:text-lg font-bold text-destructive">{stats.removed}</div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
