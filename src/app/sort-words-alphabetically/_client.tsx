"use client";

import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sortMode, setSortMode] = useState<"line" | "word">("line");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [naturalSort, setNaturalSort] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [ignoreArticles, setIgnoreArticles] = useState(false);
  const [stats, setStats] = useState<{
    total: number;
    unique: number;
    outputCount: number;
  } | null>(null);

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      return;
    }

    let items: string[] = [];
    if (sortMode === "line") {
      items = input
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(Boolean);
    } else {
      // Split words by whitespace, commas, or semicolons
      items = (input.match(/[\p{L}\p{N}'-]+/gu) || [])
        .map(w => w.replace(/^['-]+|['-]+$/g, ""))
        .filter(Boolean);
    }

    const total = items.length;
    const unique = new Set(items.map(i => (caseSensitive ? i : i.toLowerCase()))).size;

    let processingItems = [...items];
    if (removeDuplicates) {
      const seen = new Set<string>();
      processingItems = processingItems.filter(item => {
        const key = caseSensitive ? item : item.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    const getComparisonKey = (item: string) => {
      let key = item;
      if (ignoreArticles) {
        key = key.replace(/^(the|a|an)\s+/i, "");
      }
      return key;
    };

    const collator = new Intl.Collator(undefined, {
      numeric: naturalSort,
      sensitivity: caseSensitive ? "variant" : "base",
    });

    processingItems.sort((a, b) => {
      const keyA = getComparisonKey(a);
      const keyB = getComparisonKey(b);
      const cmp = collator.compare(keyA, keyB);
      return order === "asc" ? cmp : -cmp;
    });

    setOutput(processingItems.join("\n"));
    setStats({
      total,
      unique,
      outputCount: processingItems.length,
    });
  }, [input, sortMode, order, naturalSort, caseSensitive, removeDuplicates, ignoreArticles]);

  return (
    <TextToolLayout
      titleKey="sortWordsAlphabetically"
      subtitleKey="sortWordsAlphabeticallySubtitle"
      actionLabelKey="sortWordsAlphabeticallyAction"
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
        "how-to-sort-words-alphabetically",
        "how-to-remove-duplicate-lines-from-text",
        "how-to-find-and-fix-duplicate-words",
      ]}
      relatedPostsTitle="Organization & List Sorting Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Sorting Direction & Unit Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex rounded-lg border border-border p-1 bg-card/60">
            <button
              type="button"
              onClick={() => setSortMode("line")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                sortMode === "line"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Line by Line
            </button>
            <button
              type="button"
              onClick={() => setSortMode("word")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                sortMode === "word"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Word by Word
            </button>
          </div>

          <div className="inline-flex rounded-lg border border-border p-1 bg-card/60">
            <button
              type="button"
              onClick={() => setOrder("asc")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                order === "asc"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              A &rarr; Z (Ascending)
            </button>
            <button
              type="button"
              onClick={() => setOrder("desc")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                order === "desc"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Z &rarr; A (Descending)
            </button>
          </div>
        </div>

        {/* Sorting Options / Checkboxes */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 p-4 rounded-xl border border-border bg-card/60 text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={naturalSort}
              onChange={e => setNaturalSort(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Natural Numeric Sort (Item 2 before 10)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={removeDuplicates}
              onChange={e => setRemoveDuplicates(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Remove Duplicates</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={ignoreArticles}
              onChange={e => setIgnoreArticles(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Ignore Leading Articles (A, An, The)</span>
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
        </div>

        {/* Live Metrics */}
        {stats && (
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Total Items</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.total}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Unique Items</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.unique}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5">
              <div className="text-xs text-muted-foreground font-medium">Sorted Output</div>
              <div className="text-base sm:text-lg font-bold text-primary">{stats.outputCount}</div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
