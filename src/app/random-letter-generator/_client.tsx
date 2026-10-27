"use client";

import { useState, useCallback, useId } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

type CasingMode = "upper" | "lower" | "mixed";
type CharFilter = "all" | "vowels" | "consonants";
type DelimiterType = "space" | "comma" | "newline" | "none";

const VOWELS = ["A", "E", "I", "O", "U"];
const CONSONANTS = [
  "B", "C", "D", "F", "G", "H", "J", "K", "L", "M",
  "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"
];
const ALL_LETTERS = [...VOWELS, ...CONSONANTS].sort();

export default function ClientPage() {
  const [count, setCount] = useState<number>(10);
  const [casing, setCasing] = useState<CasingMode>("upper");
  const [filter, setFilter] = useState<CharFilter>("all");
  const [unique, setUnique] = useState<boolean>(false);
  const [delimiter, setDelimiter] = useState<DelimiterType>("space");
  const [output, setOutput] = useState<string>("");
  const [generatedStats, setGeneratedStats] = useState<{ total: number; vowels: number; consonants: number } | null>(null);

  const countId = useId();
  const filterId = useId();
  const delimId = useId();
  const uniqueId = useId();

  // CSPRNG Rejection Sampling Helper
  const getSecureIndex = (maxRange: number): number => {
    const limit = Math.floor(0x100000000 / maxRange) * maxRange;
    const buffer = new Uint32Array(1);
    do {
      window.crypto.getRandomValues(buffer);
    } while (buffer[0] >= limit);
    return buffer[0] % maxRange;
  };

  const handleGenerate = useCallback(() => {
    let sourcePool = [...ALL_LETTERS];
    if (filter === "vowels") sourcePool = [...VOWELS];
    if (filter === "consonants") sourcePool = [...CONSONANTS];

    const targetCount = unique ? Math.min(count, sourcePool.length) : count;
    const selected: string[] = [];
    const pool = [...sourcePool];

    for (let i = 0; i < targetCount; i++) {
      if (unique) {
        const idx = getSecureIndex(pool.length);
        selected.push(pool.splice(idx, 1)[0]);
      } else {
        const idx = getSecureIndex(sourcePool.length);
        selected.push(sourcePool[idx]);
      }
    }

    const bitBuffer = new Uint8Array(selected.length);
    window.crypto.getRandomValues(bitBuffer);

    let vowelCount = 0;
    let consonantCount = 0;

    const formatted = selected.map((char, idx) => {
      if (VOWELS.includes(char)) vowelCount++;
      else consonantCount++;

      if (casing === "lower") return char.toLowerCase();
      if (casing === "upper") return char.toUpperCase();
      // Mixed casing: 50% uppercase, 50% lowercase via CSPRNG bit
      return bitBuffer[idx] % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    });

    const delimMap: Record<DelimiterType, string> = {
      space: " ",
      comma: ", ",
      newline: "\n",
      none: "",
    };

    setOutput(formatted.join(delimMap[delimiter]));
    setGeneratedStats({
      total: formatted.length,
      vowels: vowelCount,
      consonants: consonantCount,
    });
  }, [count, casing, filter, unique, delimiter]);

  const seo = getSeoContent("random-letter-generator", "Random Letter Generator");

  const maxAllowed = unique ? (filter === "vowels" ? 5 : filter === "consonants" ? 21 : 26) : 500;

  return (
    <RandomToolLayout
      titleKey="randomLetterGenerator"
      subtitleKey="randomLetterGeneratorSubtitle"
      actionLabelKey="randomLetterGeneratorAction"
      output={output}
      onGenerate={handleGenerate}
      onClear={() => {
        setOutput("");
        setGeneratedStats(null);
      }}
      seoTitle={seo.title}
      seoContent={seo.content}
      seoFaqs={seo.faqs}
      relatedPostSlugs={["how-to-generate-random-letters", "how-to-generate-random-numbers", "how-to-make-random-choices-online"]}
      relatedPostsTitle="Combinatorics & Alphabet Guides"
    >
      <div className="space-y-4 max-w-xl mx-auto">
        {/* Case Toggle Buttons */}
        <div className="flex items-center justify-center gap-2">
          {(["upper", "lower", "mixed"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCasing(c)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                casing === c
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-foreground hover:bg-accent"
              }`}
            >
              {c === "upper" ? "Uppercase (A-Z)" : c === "lower" ? "Lowercase (a-z)" : "Mixed Case (Aa)"}
            </button>
          ))}
        </div>

        {/* Configuration Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={countId} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Quantity (1 - {maxAllowed})
            </label>
            <input
              id={countId}
              type="number"
              min={1}
              max={maxAllowed}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(maxAllowed, Number(e.target.value) || 1)))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={filterId} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Alphabet Filter
            </label>
            <select
              id={filterId}
              value={filter}
              onChange={(e) => setFilter(e.target.value as CharFilter)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            >
              <option value="all">Full Alphabet (A-Z)</option>
              <option value="vowels">Vowels Only (A, E, I, O, U)</option>
              <option value="consonants">Consonants Only (21 Letters)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={delimId} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Delimiter
            </label>
            <select
              id={delimId}
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value as DelimiterType)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            >
              <option value="space">Space separated (&quot;A B C&quot;)</option>
              <option value="comma">Comma separated (&quot;A, B, C&quot;)</option>
              <option value="newline">Newlines (One per line)</option>
              <option value="none">None (Continuous string)</option>
            </select>
          </div>
        </div>

        {/* Unique Switch */}
        <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-card/50">
          <label htmlFor={uniqueId} className="text-xs font-medium text-foreground cursor-pointer select-none">
            Unique Letters Only (No duplicates / Sampling without replacement)
          </label>
          <input
            id={uniqueId}
            type="checkbox"
            checked={unique}
            onChange={(e) => {
              setUnique(e.target.checked);
              if (e.target.checked && count > maxAllowed) {
                setCount(maxAllowed);
              }
            }}
            className="rounded border-border text-primary focus:ring-primary/40 h-4 w-4"
          />
        </div>

        {/* Live Telemetry Pill */}
        {generatedStats && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-md bg-accent/40 border border-border/60 text-xs text-muted-foreground">
            <span>
              Generated <strong>{generatedStats.total}</strong> letters (Vowels: <strong>{generatedStats.vowels}</strong>, Consonants: <strong>{generatedStats.consonants}</strong>)
            </span>
            <span className="font-mono uppercase text-[10px] tracking-wide bg-background/80 px-2 py-0.5 rounded border border-border/40">
              Entropy: CSPRNG
            </span>
          </div>
        )}
      </div>
    </RandomToolLayout>
  );
}
