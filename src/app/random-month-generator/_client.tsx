"use client";

import { useState, useCallback, useId } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

type MonthFormat = "full" | "abbr" | "number" | "roman";
type SeasonFilter = "all" | "q1" | "q2" | "q3" | "q4";

interface MonthInfo {
  index: number;
  name: string;
  abbr: string;
  roman: string;
  season: string;
  quarter: number;
}

const MONTH_DATA: MonthInfo[] = [
  { index: 1, name: "January", abbr: "Jan", roman: "I", season: "Winter", quarter: 1 },
  { index: 2, name: "February", abbr: "Feb", roman: "II", season: "Winter", quarter: 1 },
  { index: 3, name: "March", abbr: "Mar", roman: "III", season: "Spring", quarter: 1 },
  { index: 4, name: "April", abbr: "Apr", roman: "IV", season: "Spring", quarter: 2 },
  { index: 5, name: "May", abbr: "May", roman: "V", season: "Spring", quarter: 2 },
  { index: 6, name: "June", abbr: "Jun", roman: "VI", season: "Summer", quarter: 2 },
  { index: 7, name: "July", abbr: "Jul", roman: "VII", season: "Summer", quarter: 3 },
  { index: 8, name: "August", abbr: "Aug", roman: "VIII", season: "Summer", quarter: 3 },
  { index: 9, name: "September", abbr: "Sep", roman: "IX", season: "Autumn", quarter: 3 },
  { index: 10, name: "October", abbr: "Oct", roman: "X", season: "Autumn", quarter: 4 },
  { index: 11, name: "November", abbr: "Nov", roman: "XI", season: "Autumn", quarter: 4 },
  { index: 12, name: "December", abbr: "Dec", roman: "XII", season: "Winter", quarter: 4 },
];

export default function ClientPage() {
  const [count, setCount] = useState<number>(1);
  const [format, setFormat] = useState<MonthFormat>("full");
  const [season, setSeason] = useState<SeasonFilter>("all");
  const [unique, setUnique] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const [stats, setStats] = useState<{ total: number; quarters: Record<number, number> } | null>(null);

  const countId = useId();
  const formatId = useId();
  const seasonId = useId();
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
    let sourcePool = [...MONTH_DATA];
    if (season === "q1") sourcePool = sourcePool.filter((m) => m.quarter === 1);
    else if (season === "q2") sourcePool = sourcePool.filter((m) => m.quarter === 2);
    else if (season === "q3") sourcePool = sourcePool.filter((m) => m.quarter === 3);
    else if (season === "q4") sourcePool = sourcePool.filter((m) => m.quarter === 4);

    const targetCount = unique ? Math.min(count, sourcePool.length) : count;
    const selected: MonthInfo[] = [];
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

    const quarterCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };

    const formattedLines = selected.map((m) => {
      quarterCounts[m.quarter] = (quarterCounts[m.quarter] || 0) + 1;
      if (format === "abbr") return m.abbr;
      if (format === "number") return m.index.toString().padStart(2, "0");
      if (format === "roman") return m.roman;
      return m.name;
    });

    setOutput(formattedLines.join("\n"));
    setStats({
      total: formattedLines.length,
      quarters: quarterCounts,
    });
  }, [count, format, season, unique]);

  const seo = getSeoContent("random-month-generator", "Random Month Generator");

  const maxAllowed = unique ? (season === "all" ? 12 : 3) : 100;

  return (
    <RandomToolLayout
      titleKey="randomMonthGenerator"
      subtitleKey="randomMonthGeneratorSubtitle"
      actionLabelKey="randomMonthGeneratorAction"
      output={output}
      onGenerate={handleGenerate}
      onClear={() => {
        setOutput("");
        setStats(null);
      }}
      seoTitle={seo.title}
      seoContent={seo.content}
      seoFaqs={seo.faqs}
      relatedPostSlugs={["how-to-pick-random-months", "how-to-make-random-choices-online", "how-to-generate-random-numbers"]}
      relatedPostsTitle="Calendar Scheduling & Decision Guides"
    >
      <div className="space-y-4 max-w-xl mx-auto">
        {/* Controls Grid */}
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
            <label htmlFor={formatId} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Display Format
            </label>
            <select
              id={formatId}
              value={format}
              onChange={(e) => setFormat(e.target.value as MonthFormat)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            >
              <option value="full">Full Name (e.g. October)</option>
              <option value="abbr">3-Letter Abbr (e.g. Oct)</option>
              <option value="number">Numeric (01 - 12)</option>
              <option value="roman">Roman Numeral (I - XII)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={seasonId} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Fiscal / Season Filter
            </label>
            <select
              id={seasonId}
              value={season}
              onChange={(e) => setSeason(e.target.value as SeasonFilter)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            >
              <option value="all">Entire Year (Jan - Dec)</option>
              <option value="q1">Q1 / Winter-Spring (Jan - Mar)</option>
              <option value="q2">Q2 / Spring-Summer (Apr - Jun)</option>
              <option value="q3">Q3 / Summer-Autumn (Jul - Sep)</option>
              <option value="q4">Q4 / Autumn-Winter (Oct - Dec)</option>
            </select>
          </div>
        </div>

        {/* Unique Switch */}
        <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-card/50">
          <label htmlFor={uniqueId} className="text-xs font-medium text-foreground cursor-pointer select-none">
            Unique Months Only (Sampling without replacement / no repeats)
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
        {stats && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-md bg-accent/40 border border-border/60 text-xs text-muted-foreground">
            <span>
              Picked <strong>{stats.total}</strong> month{stats.total > 1 ? "s" : ""} (Q1: {stats.quarters[1]} | Q2: {stats.quarters[2]} | Q3: {stats.quarters[3]} | Q4: {stats.quarters[4]})
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
