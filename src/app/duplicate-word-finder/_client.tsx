"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";

const STOP_WORDS = new Set([
  "the", "and", "a", "an", "in", "to", "of", "is", "it", "that", "this",
  "for", "with", "as", "on", "at", "by", "from", "or", "are", "be", "was",
  "were", "but", "not", "have", "had", "has", "you", "we", "they", "i",
  "he", "she", "my", "your", "our", "their", "so", "if", "all", "any", "no", "do", "does", "did"
]);

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [ignoreStopWords, setIgnoreStopWords] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [minWordLength, setMinWordLength] = useState<number>(3);
  const [stats, setStats] = useState<{
    totalWords: number;
    uniqueWords: number;
    repeatedCount: number;
    topWord: string;
    topFrequency: number;
  } | null>(null);

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      return;
    }

    // Extract word tokens using unicode-friendly regex
    const rawTokens = input.match(/[\p{L}\p{N}'-]+/gu) || [];
    const totalWords = rawTokens.length;

    const freq: Record<string, number> = {};
    const displayWordMap: Record<string, string> = {};

    for (const rawToken of rawTokens) {
      // Clean leading and trailing hyphens or apostrophes
      const cleaned = rawToken.replace(/^['-]+|['-]+$/g, "");
      if (!cleaned || cleaned.length < minWordLength) continue;

      const lower = cleaned.toLowerCase();
      if (ignoreStopWords && STOP_WORDS.has(lower)) {
        continue;
      }

      const key = caseSensitive ? cleaned : lower;
      freq[key] = (freq[key] || 0) + 1;
      if (!displayWordMap[key]) {
        displayWordMap[key] = cleaned;
      }
    }

    const allEntries = Object.entries(freq);
    const repeated = allEntries
      .filter(([, count]) => count > 1)
      .sort((a, b) => b[1] - a[1]);

    const topItem = repeated[0];

    setStats({
      totalWords,
      uniqueWords: allEntries.length,
      repeatedCount: repeated.length,
      topWord: topItem ? displayWordMap[topItem[0]] : "None",
      topFrequency: topItem ? topItem[1] : 0,
    });

    if (repeated.length === 0) {
      setOutput("No duplicate words found with the current filter settings.");
      return;
    }

    const lines = repeated.map(([key, count], index) => {
      const percentage = ((count / totalWords) * 100).toFixed(1);
      return `${index + 1}. "${displayWordMap[key]}" — ${count} times (${percentage}% of text)`;
    });

    setOutput(lines.join("\n"));
  }, [input, ignoreStopWords, caseSensitive, minWordLength]);

  return (
    <TextToolLayout
      titleKey="duplicateWordFinder"
      subtitleKey="duplicateWordFinderSubtitle"
      actionLabelKey="duplicateWordFinderAction"
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
        "how-to-remove-duplicate-lines-from-text",
        "how-to-sort-words-alphabetically",
      ]}
      relatedPostsTitle="Writing & Text Polish Guides"
    >
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm sm:text-base text-center max-w-2xl mx-auto">
          Identify and count overused vocabulary, crutch words, and accidental duplicate words in your essays, blog posts, and copy.
        </p>

        {/* Configuration Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 p-4 rounded-xl border border-border bg-card/60 text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={ignoreStopWords}
              onChange={e => setIgnoreStopWords(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Ignore Stop Words (the, and, in)</span>
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

          <div className="flex items-center gap-2 text-foreground">
            <span className="font-medium text-xs sm:text-sm">Min Length:</span>
            <select
              value={minWordLength}
              onChange={e => setMinWordLength(Number(e.target.value))}
              className="px-2.5 py-1 rounded-md border border-border bg-card text-foreground text-xs sm:text-sm cursor-pointer"
            >
              <option value={1}>1+ letters</option>
              <option value={2}>2+ letters</option>
              <option value={3}>3+ letters</option>
              <option value={4}>4+ letters</option>
              <option value={5}>5+ letters</option>
            </select>
          </div>
        </div>

        {/* Live Word Count & Repetition Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Total Words</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.totalWords}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Unique Words</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.uniqueWords}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5">
              <div className="text-xs text-muted-foreground font-medium">Repeated Terms</div>
              <div className="text-base sm:text-lg font-bold text-primary">{stats.repeatedCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-500/5">
              <div className="text-xs text-muted-foreground font-medium">Most Repeated</div>
              <div className="text-sm sm:text-base font-bold text-foreground truncate px-1" title={`${stats.topWord} (${stats.topFrequency}x)`}>
                {stats.topWord} {stats.topFrequency > 0 ? `(${stats.topFrequency}x)` : ""}
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
