"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type SortOrder = "asc" | "desc";
type SortCriterion = "numeric" | "absolute" | "length";
type OutputDelimiter = "newline" | "comma" | "semicolon" | "space";

interface NumberStats {
  totalCount: number;
  uniqueCount: number;
  minVal: number;
  maxVal: number;
  sumVal: number;
  meanVal: number;
  medianVal: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [order, setOrder] = useState<SortOrder>("asc");
  const [criterion, setCriterion] = useState<SortCriterion>("numeric");
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [delimiter, setDelimiter] = useState<OutputDelimiter>("newline");
  const [stats, setStats] = useState<NumberStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const orderId = useId();
  const criterionId = useId();
  const delimiterId = useId();
  const dedupId = useId();

  // Extract and parse numbers from arbitrary raw text
  const parseNumbers = useCallback((raw: string): number[] => {
    // Regex matches integers, decimals, negatives, and scientific notation (e.g. -12.34e+5)
    const regex = /[-+]?(?:\d*\.?\d+(?:[eE][-+]?\d+)?)/g;
    const matches = raw.match(regex);
    if (!matches) return [];

    return matches
      .map((str) => Number(str))
      .filter((n) => !isNaN(n) && isFinite(n));
  }, []);

  // Compute statistical metrics
  const computeStats = (sortedNums: number[]): NumberStats => {
    const totalCount = sortedNums.length;
    const uniqueCount = new Set(sortedNums).size;
    const minVal = Math.min(...sortedNums);
    const maxVal = Math.max(...sortedNums);
    const sumVal = sortedNums.reduce((acc, curr) => acc + curr, 0);
    const meanVal = sumVal / totalCount;

    // Calculate median
    let medianVal: number;
    const mid = Math.floor(sortedNums.length / 2);
    if (sortedNums.length % 2 === 0) {
      medianVal = (sortedNums[mid - 1] + sortedNums[mid]) / 2;
    } else {
      medianVal = sortedNums[mid];
    }

    return {
      totalCount,
      uniqueCount,
      minVal,
      maxVal,
      sumVal: Number(sumVal.toFixed(6)),
      meanVal: Number(meanVal.toFixed(4)),
      medianVal: Number(medianVal.toFixed(4)),
    };
  };

  // Perform sort
  const sortNumbers = useCallback(
    (
      rawInput: string,
      selectedOrder: SortOrder,
      selectedCriterion: SortCriterion,
      dedup: boolean,
      delim: OutputDelimiter
    ) => {
      const trimmed = rawInput.trim();
      if (!trimmed) {
        setOutput("");
        setStats(null);
        setErrorMsg(null);
        return;
      }

      let nums = parseNumbers(rawInput);
      if (nums.length === 0) {
        setOutput("");
        setStats(null);
        setErrorMsg("No valid numbers found in the input text.");
        return;
      }

      setErrorMsg(null);

      // Deduplicate if checked
      if (dedup) {
        nums = Array.from(new Set(nums));
      }

      // Sort according to criterion and order
      nums.sort((a, b) => {
        let diff = 0;
        if (selectedCriterion === "numeric") {
          diff = a - b;
        } else if (selectedCriterion === "absolute") {
          diff = Math.abs(a) - Math.abs(b);
        } else if (selectedCriterion === "length") {
          diff = String(a).length - String(b).length;
        }

        return selectedOrder === "asc" ? diff : -diff;
      });

      // Format output based on delimiter
      let sep = "\n";
      if (delim === "comma") sep = ", ";
      if (delim === "semicolon") sep = "; ";
      if (delim === "space") sep = " ";

      setOutput(nums.join(sep));
      setStats(computeStats(nums));
    },
    [parseNumbers]
  );

  const handleInputChange = (val: string) => {
    setInput(val);
    sortNumbers(val, order, criterion, removeDuplicates, delimiter);
  };

  const handleOrderChange = (newOrder: SortOrder) => {
    setOrder(newOrder);
    sortNumbers(input, newOrder, criterion, removeDuplicates, delimiter);
  };

  const handleCriterionChange = (newCrit: SortCriterion) => {
    setCriterion(newCrit);
    sortNumbers(input, order, newCrit, removeDuplicates, delimiter);
  };

  const handleDedupChange = (newDedup: boolean) => {
    setRemoveDuplicates(newDedup);
    sortNumbers(input, order, criterion, newDedup, delimiter);
  };

  const handleDelimiterChange = (newDelim: OutputDelimiter) => {
    setDelimiter(newDelim);
    sortNumbers(input, order, criterion, removeDuplicates, newDelim);
  };

  const loadPreset = (presetText: string) => {
    setInput(presetText);
    sortNumbers(presetText, order, criterion, removeDuplicates, delimiter);
  };

  return (
    <TextToolLayout
      titleKey="numberSorter"
      subtitleKey="numberSorterSubtitle"
      actionLabelKey="numberSorterAction"
      inputText={input}
      onInputChange={handleInputChange}
      outputText={output}
      onAction={() => sortNumbers(input, order, criterion, removeDuplicates, delimiter)}
      relatedPostSlugs={["how-to-sort-numbers-online"]}
    >
      <div className="flex flex-col gap-4 mt-2">
        {/* Controls Bar */}
        <div className="p-4 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Sort Order */}
            <div className="flex items-center gap-2">
              <label htmlFor={orderId} className="text-xs font-semibold text-foreground">
                Sort Order:
              </label>
              <select
                id={orderId}
                value={order}
                onChange={(e) => handleOrderChange(e.target.value as SortOrder)}
                className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="asc">Ascending (Lowest → Highest)</option>
                <option value="desc">Descending (Highest → Lowest)</option>
              </select>
            </div>

            {/* Sort Criterion */}
            <div className="flex items-center gap-2">
              <label htmlFor={criterionId} className="text-xs font-semibold text-foreground">
                Method:
              </label>
              <select
                id={criterionId}
                value={criterion}
                onChange={(e) => handleCriterionChange(e.target.value as SortCriterion)}
                className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="numeric">Numerical Value</option>
                <option value="absolute">Absolute Magnitude (|x|)</option>
                <option value="length">Digit Length</option>
              </select>
            </div>

            {/* Output Delimiter */}
            <div className="flex items-center gap-2">
              <label htmlFor={delimiterId} className="text-xs font-semibold text-foreground">
                Delimiter:
              </label>
              <select
                id={delimiterId}
                value={delimiter}
                onChange={(e) => handleDelimiterChange(e.target.value as OutputDelimiter)}
                className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="newline">New Line (\n)</option>
                <option value="comma">Comma Separated (, )</option>
                <option value="semicolon">Semicolon (; )</option>
                <option value="space">Space ( )</option>
              </select>
            </div>
          </div>

          {/* Remove Duplicates Checkbox */}
          <div className="flex items-center gap-2">
            <input
              id={dedupId}
              type="checkbox"
              checked={removeDuplicates}
              onChange={(e) => handleDedupChange(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary h-4 w-4 cursor-pointer"
            />
            <label htmlFor={dedupId} className="text-xs font-semibold text-foreground cursor-pointer select-none">
              Deduplicate Unique Only
            </label>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium">Quick Samples:</span>
          <button
            type="button"
            onClick={() => loadPreset("42, -18, 0, 99, -3, 15, 27, -50, 105, 42")}
            className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
          >
            Mixed Integers &amp; Negatives
          </button>
          <button
            type="button"
            onClick={() => loadPreset("3.14159, -0.05, 2.718, 1.414, -2.5, 0.99, 12.345")}
            className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
          >
            Floating-Point Decimals
          </button>
          <button
            type="button"
            onClick={() => loadPreset("1e-4, 5.2e3, -2.1e2, 8.9e-1, 100, -0.005")}
            className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
          >
            Scientific Notation
          </button>
        </div>

        {/* Error / Warning Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Notice:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Mathematical Telemetry Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Total Count</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.totalCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Unique Values</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.uniqueCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Minimum</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.minVal}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Maximum</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.maxVal}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Sum Total</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.sumVal}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Mean (Average)</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.meanVal}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Median</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.medianVal}</div>
            </div>
          </div>
        )}

        {/* Related Data Utilities */}
        <div className="mt-2 p-3.5 rounded-xl border border-border bg-muted/20 text-xs flex flex-wrap items-center justify-between gap-3">
          <span className="text-muted-foreground">Related Data Tools:</span>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/csv-to-json-converter" className="text-primary hover:underline font-medium">
              CSV to JSON Converter
            </a>
            <span className="text-border">•</span>
            <a href="/random-number-generator" className="text-primary hover:underline font-medium">
              Random Number Generator
            </a>
            <span className="text-border">•</span>
            <a href="/binary-code-translator" className="text-primary hover:underline font-medium">
              Binary Code Translator
            </a>
            <span className="text-border">•</span>
            <a href="/blog/how-to-sort-numbers-online" className="text-primary hover:underline font-medium">
              Numeric Sorting Guide
            </a>
          </div>
        </div>
      </div>
    </TextToolLayout>
  );
}
