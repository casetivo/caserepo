"use client";

import { useState, useCallback, useId } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

type SortMode = "none" | "asc" | "desc";
type DelimiterType = "newline" | "comma" | "space";

interface NumberStats {
  count: number;
  min: number;
  max: number;
  sum: number;
  mean: number;
}

export default function ClientPage() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [count, setCount] = useState<number>(5);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<SortMode>("none");
  const [delimiter, setDelimiter] = useState<DelimiterType>("newline");
  const [output, setOutput] = useState<string>("");
  const [stats, setStats] = useState<NumberStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const minId = useId();
  const maxId = useId();
  const countId = useId();
  const sortId = useId();
  const delimId = useId();
  const dupId = useId();

  // CSPRNG Integer generator with rejection sampling to eliminate modulo bias
  const getSecureRandomInt = (minVal: number, maxVal: number): number => {
    const range = maxVal - minVal + 1;
    if (range <= 0) return minVal;

    const maxUint32 = 0x100000000;
    const limit = Math.floor(maxUint32 / range) * range;
    const buffer = new Uint32Array(1);

    do {
      window.crypto.getRandomValues(buffer);
    } while (buffer[0] >= limit);

    return minVal + (buffer[0] % range);
  };

  const handleGenerate = useCallback(() => {
    if (min > max) {
      setErrorMsg("Minimum value cannot be greater than maximum value.");
      setOutput("");
      setStats(null);
      return;
    }

    const rangeSize = max - min + 1;
    if (!allowDuplicates && count > rangeSize) {
      setErrorMsg(
        `Cannot generate ${count} unique numbers from a range of only ${rangeSize} possibilities. Please increase the range or allow duplicates.`
      );
      setOutput("");
      setStats(null);
      return;
    }

    setErrorMsg(null);
    const results: number[] = [];

    if (!allowDuplicates) {
      const picked = new Set<number>();
      while (picked.size < count) {
        picked.add(getSecureRandomInt(min, max));
      }
      results.push(...Array.from(picked));
    } else {
      for (let i = 0; i < count; i++) {
        results.push(getSecureRandomInt(min, max));
      }
    }

    // Apply sorting if requested
    if (sortOrder === "asc") {
      results.sort((a, b) => a - b);
    } else if (sortOrder === "desc") {
      results.sort((a, b) => b - a);
    }

    let sep = "\n";
    if (delimiter === "comma") sep = ", ";
    if (delimiter === "space") sep = " ";

    setOutput(results.join(sep));

    // Calculate telemetry
    const sumVal = results.reduce((a, b) => a + b, 0);
    setStats({
      count: results.length,
      min: Math.min(...results),
      max: Math.max(...results),
      sum: sumVal,
      mean: Number((sumVal / results.length).toFixed(2)),
    });
  }, [min, max, count, allowDuplicates, sortOrder, delimiter]);

  const seo = getSeoContent("random-number-generator", "Random Number Generator");

  return (
    <RandomToolLayout
      titleKey="randomNumberGenerator"
      subtitleKey="randomNumberGeneratorSubtitle"
      actionLabelKey="randomNumberGeneratorAction"
      output={output}
      onGenerate={handleGenerate}
      onClear={() => {
        setOutput("");
        setStats(null);
        setErrorMsg(null);
      }}
      seoTitle={seo.title}
      seoContent={seo.content}
      seoFaqs={seo.faqs}
      relatedPostSlugs={["how-to-generate-random-numbers", "how-to-sort-numbers-online", "strong-password-generator"]}
      relatedPostsTitle="Randomness and Statistical Guides"
    >
      <div className="flex flex-col gap-3.5">
        {/* Controls Bar */}
        <div className="p-4 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
          {/* Min, Max, Count Inputs */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <label htmlFor={minId} className="text-xs font-semibold text-foreground">
                Min:
              </label>
              <input
                id={minId}
                type="number"
                value={min}
                onChange={(e) => setMin(Number(e.target.value))}
                className="w-20 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <label htmlFor={maxId} className="text-xs font-semibold text-foreground">
                Max:
              </label>
              <input
                id={maxId}
                type="number"
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
                className="w-24 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <label htmlFor={countId} className="text-xs font-semibold text-foreground">
                Quantity:
              </label>
              <input
                id={countId}
                type="number"
                min={1}
                max={5000}
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(5000, Number(e.target.value))))}
                className="w-20 px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Options: Duplicates, Sort, Delimiter */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <label htmlFor={sortId} className="text-xs font-semibold text-foreground">
                Sort:
              </label>
              <select
                id={sortId}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortMode)}
                className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="none">Random Draw Order</option>
                <option value="asc">Ascending (1 &rarr; 9)</option>
                <option value="desc">Descending (9 &rarr; 1)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <label htmlFor={delimId} className="text-xs font-semibold text-foreground">
                Format:
              </label>
              <select
                id={delimId}
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value as DelimiterType)}
                className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="newline">New Line (\n)</option>
                <option value="comma">Comma (, )</option>
                <option value="space">Space ( )</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                id={dupId}
                type="checkbox"
                checked={!allowDuplicates}
                onChange={(e) => setAllowDuplicates(!e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary h-4 w-4 cursor-pointer"
              />
              <label htmlFor={dupId} className="text-xs font-semibold text-foreground cursor-pointer select-none">
                Unique (No Repeats)
              </label>
            </div>
          </div>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Notice:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Statistical Telemetry Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-3.5 rounded-xl border border-border bg-card text-center text-xs">
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Generated Count</span>
              <span className="font-bold text-foreground text-sm">{stats.count}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Minimum Drawn</span>
              <span className="font-bold text-foreground text-sm">{stats.min}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Maximum Drawn</span>
              <span className="font-bold text-foreground text-sm">{stats.max}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Sum Total</span>
              <span className="font-bold text-foreground text-sm">{stats.sum.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Average (Mean)</span>
              <span className="font-bold text-primary text-sm">{stats.mean}</span>
            </div>
          </div>
        )}
      </div>
    </RandomToolLayout>
  );
}
