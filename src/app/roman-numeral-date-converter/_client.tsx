"use client";

import { useState, useCallback, useEffect } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type DateOrder = "MDY" | "DMY" | "YMD";
type DelimiterType = "dot" | "slash" | "hyphen" | "space" | "period";

const toRoman = (num: number): string => {
  if (isNaN(num) || num <= 0 || num > 3999) return "";
  const lookup: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let result = "";
  let n = num;
  for (const [val, roman] of lookup) {
    while (n >= val) {
      result += roman;
      n -= val;
    }
  }
  return result;
};

const fromRoman = (roman: string): number => {
  const romanMap: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  const clean = roman.toUpperCase().trim();
  let total = 0;
  for (let i = 0; i < clean.length; i++) {
    const current = romanMap[clean[i]];
    const next = romanMap[clean[i + 1]];
    if (!current) return 0;
    if (next && next > current) {
      total += next - current;
      i++;
    } else {
      total += current;
    }
  }
  return total;
};

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [datePickerVal, setDatePickerVal] = useState("");
  const [order, setOrder] = useState<DateOrder>("MDY");
  const [delimiter, setDelimiter] = useState<DelimiterType>("dot");

  const getDelimiterString = useCallback(() => {
    switch (delimiter) {
      case "dot":
        return " · ";
      case "slash":
        return " / ";
      case "hyphen":
        return " - ";
      case "space":
        return " ";
      case "period":
        return " . ";
      default:
        return " · ";
    }
  }, [delimiter]);

  const convertDateComponents = useCallback(
    (month: number, day: number, year: number) => {
      const rM = toRoman(month);
      const rD = toRoman(day);
      const rY = toRoman(year);
      const delim = getDelimiterString();

      if (order === "MDY") return `${rM}${delim}${rD}${delim}${rY}`;
      if (order === "DMY") return `${rD}${delim}${rM}${delim}${rY}`;
      return `${rY}${delim}${rM}${delim}${rD}`;
    },
    [order, getDelimiterString]
  );

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    const trimmed = input.trim();

    // Check if input is a pure Roman Numeral to convert to Arabic
    if (/^[IVXLCDMivxlcdm]+$/.test(trimmed)) {
      const arabic = fromRoman(trimmed);
      if (arabic > 0) {
        setOutput(`${trimmed.toUpperCase()} = ${arabic}`);
        return;
      }
    }

    // Check for standard 3-part calendar date
    const parts = trimmed.split(/[\/\-\.\s]+/);
    if (parts.length === 3) {
      const p1 = parseInt(parts[0], 10);
      const p2 = parseInt(parts[1], 10);
      const p3 = parseInt(parts[2], 10);

      if (!isNaN(p1) && !isNaN(p2) && !isNaN(p3)) {
        let m = p1;
        let d = p2;
        let y = p3;

        // If format is YYYY-MM-DD
        if (p1 > 31) {
          y = p1;
          m = p2;
          d = p3;
        } else if (order === "DMY" && p1 <= 31 && p2 <= 12) {
          d = p1;
          m = p2;
        }

        const res = convertDateComponents(m, d, y);
        setOutput(res);
        return;
      }
    }

    // Check for standalone single number
    const singleNum = parseInt(trimmed, 10);
    if (!isNaN(singleNum) && String(singleNum) === trimmed) {
      setOutput(toRoman(singleNum));
      return;
    }

    // Replace all embedded numbers with Roman numerals
    const replaced = trimmed.replace(/\d+/g, m => toRoman(parseInt(m, 10)));
    setOutput(replaced);
  }, [input, order, convertDateComponents]);

  // Sync datepicker with input
  const handleDatePicked = (val: string) => {
    setDatePickerVal(val);
    if (!val) return;
    const [yStr, mStr, dStr] = val.split("-");
    const y = parseInt(yStr, 10);
    const m = parseInt(mStr, 10);
    const d = parseInt(dStr, 10);
    const dateStr = order === "DMY" ? `${d}/${m}/${y}` : `${m}/${d}/${y}`;
    setInput(dateStr);

    const converted = convertDateComponents(m, d, y);
    setOutput(converted);
  };

  const setPresetDate = (type: "today" | "2026" | "2025" | "2024" | "2000" | "1999") => {
    const now = new Date();
    if (type === "today") {
      const y = now.getFullYear();
      const m = now.getMonth() + 1;
      const d = now.getDate();
      const formatted = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      handleDatePicked(formatted);
    } else {
      setInput(type);
      setOutput(toRoman(parseInt(type, 10)));
    }
  };

  return (
    <TextToolLayout
      titleKey="romanNumeralDateConverter"
      subtitleKey="romanNumeralDateConverterSubtitle"
      actionLabelKey="romanNumeralDateConverterAction"
      inputText={input}
      onInputChange={t => {
        setInput(t);
        if (!t) setOutput("");
      }}
      outputText={output}
      onAction={handleAction}
      relatedPostSlugs={[
        "how-to-strip-formatting-and-convert-to-plain-text",
        "how-to-remove-duplicate-lines-from-text",
        "how-to-sort-words-alphabetically",
      ]}
      relatedPostsTitle="Formatting & Conversion Guides"
    >
      <div className="flex flex-col gap-5">
        {/* Quick Date Picker & Preset Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-foreground">Select Calendar Date:</span>
            <input
              type="date"
              value={datePickerVal}
              onChange={e => handleDatePicked(e.target.value)}
              className="bg-background border border-border text-xs rounded-md px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "today", label: "Today" },
              { id: "2026", label: "2026" },
              { id: "2025", label: "2025" },
              { id: "2024", label: "2024" },
              { id: "2000", label: "2000" },
              { id: "1999", label: "1999" },
            ].map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPresetDate(p.id as any)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium border border-border bg-card text-foreground hover:bg-accent transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Formatting Configuration Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-border bg-card/60 text-sm">
          {/* Delimiter Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">
              Separator Style (Tattoo &amp; Engraving):
            </label>
            <select
              value={delimiter}
              onChange={e => setDelimiter(e.target.value as DelimiterType)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="dot">Middle Dot &middot; (Tattoo Classic: X &middot; XXIV &middot; MMXXVI)</option>
              <option value="slash">Slash / (X / XXIV / MMXXVI)</option>
              <option value="hyphen">Hyphen - (X - XXIV - MMXXVI)</option>
              <option value="period">Period . (X.XXIV.MMXXVI)</option>
              <option value="space">Space (X XXIV MMXXVI)</option>
            </select>
          </div>

          {/* Date Order */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">Date Format Order:</label>
            <select
              value={order}
              onChange={e => setOrder(e.target.value as DateOrder)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="MDY">Month / Day / Year (US: X &middot; XXIV &middot; MMXXVI)</option>
              <option value="DMY">Day / Month / Year (UK/World: XXIV &middot; X &middot; MMXXVI)</option>
              <option value="YMD">Year / Month / Day (ISO: MMXXVI &middot; X &middot; XXIV)</option>
            </select>
          </div>
        </div>

        {/* Tattoo & Inscription Visualizer Card */}
        {output && (
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-center flex flex-col items-center justify-center gap-1.5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tattoo &amp; Engraving Preview
            </div>
            <div className="font-serif tracking-widest text-lg sm:text-2xl font-bold text-foreground py-1">
              {output}
            </div>
            <div className="text-xs text-muted-foreground">
              Clean Roman numeral typography ready for inking, jewelry, and invitations.
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
