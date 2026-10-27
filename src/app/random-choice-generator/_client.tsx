"use client";

import { useState, useCallback, useId } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

const PRESETS = [
  {
    name: "Dinner & Food",
    items: ["Pizza", "Sushi", "Burgers", "Tacos", "Thai Curry", "Pasta", "Ramen", "Salad Bowl"],
  },
  {
    name: "Decision Maker",
    items: ["Yes, absolutely", "No, wait", "Definitely yes", "Better not now", "Ask again tomorrow"],
  },
  {
    name: "Coin Flip",
    items: ["Heads", "Tails"],
  },
  {
    name: "Six-Sided Die",
    items: ["1", "2", "3", "4", "5", "6"],
  },
];

interface ChoiceStats {
  totalOptions: number;
  winnersCount: number;
  oddsPerItem: string;
}

export default function ClientPage() {
  const [itemsText, setItemsText] = useState("Apple\nBanana\nCherry\nDate\nElderberry");
  const [pickCount, setPickCount] = useState<number>(1);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const [stats, setStats] = useState<ChoiceStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const countId = useId();
  const dupId = useId();

  // Cryptographically secure integer selection
  const getSecureIndex = (max: number): number => {
    const maxUint32 = 0x100000000;
    const limit = Math.floor(maxUint32 / max) * max;
    const buffer = new Uint32Array(1);
    do {
      window.crypto.getRandomValues(buffer);
    } while (buffer[0] >= limit);
    return buffer[0] % max;
  };

  const handleGenerate = useCallback(() => {
    const lines = itemsText
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (lines.length === 0) {
      setErrorMsg("Please enter at least one option.");
      setOutput("");
      setStats(null);
      return;
    }

    if (!allowDuplicates && pickCount > lines.length) {
      setErrorMsg(
        `Cannot pick ${pickCount} unique winners from a list of only ${lines.length} items. Please reduce pick count or check 'Allow Repeats'.`
      );
      setOutput("");
      setStats(null);
      return;
    }

    setErrorMsg(null);
    const chosen: string[] = [];

    if (!allowDuplicates) {
      // Fisher-Yates shuffle sampling without replacement
      const pool = [...lines];
      for (let i = 0; i < pickCount; i++) {
        const randIdx = getSecureIndex(pool.length);
        chosen.push(pool[randIdx]);
        pool.splice(randIdx, 1);
      }
    } else {
      // Sampling with replacement
      for (let i = 0; i < pickCount; i++) {
        const randIdx = getSecureIndex(lines.length);
        chosen.push(lines[randIdx]);
      }
    }

    setOutput(chosen.join("\n"));
    setStats({
      totalOptions: lines.length,
      winnersCount: chosen.length,
      oddsPerItem: `1 in ${lines.length} (${((1 / lines.length) * 100).toFixed(1)}%)`,
    });
  }, [itemsText, pickCount, allowDuplicates]);

  const loadPreset = (presetList: string[]) => {
    setItemsText(presetList.join("\n"));
    setOutput("");
    setStats(null);
    setErrorMsg(null);
  };

  const seo = getSeoContent("random-choice-generator", "Random Choice Generator");

  return (
    <RandomToolLayout
      titleKey="randomChoiceGenerator"
      subtitleKey="randomChoiceGeneratorSubtitle"
      actionLabelKey="randomChoiceGeneratorAction"
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
      relatedPostSlugs={["how-to-make-random-choices-online", "how-to-generate-random-numbers", "random-data-generator-testing"]}
      relatedPostsTitle="Decision Making and Random Tools"
    >
      <div className="flex flex-col gap-3.5">
        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium">Quick Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => loadPreset(p.items)}
              className="px-2.5 py-1 rounded-md border border-border bg-card hover:bg-muted text-foreground transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Input Textarea */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Your Options (one per line):</span>
            <span className="text-[11px] text-muted-foreground">
              {itemsText.split("\n").filter((s) => s.trim().length > 0).length} options entered
            </span>
          </label>
          <textarea
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
            placeholder="Type or paste choices here, one item per line..."
            className="w-full min-h-[140px] rounded-xl border border-border bg-card p-4 text-foreground text-sm font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          />
        </div>

        {/* Controls Bar */}
        <div className="p-3.5 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor={countId} className="text-xs font-semibold text-foreground">
              Number of Choices to Pick:
            </label>
            <input
              id={countId}
              type="number"
              min={1}
              max={100}
              value={pickCount}
              onChange={(e) => setPickCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-16 px-2.5 py-1 rounded-lg border border-border bg-background text-foreground text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id={dupId}
              type="checkbox"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary h-4 w-4 cursor-pointer"
            />
            <label htmlFor={dupId} className="text-xs font-semibold text-foreground cursor-pointer select-none">
              Allow Repeats (Sampling with Replacement)
            </label>
          </div>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Notice:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3.5 rounded-xl border border-border bg-card text-center text-xs">
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Total Candidates</span>
              <span className="font-bold text-foreground text-sm">{stats.totalOptions}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Winners Selected</span>
              <span className="font-bold text-foreground text-sm">{stats.winnersCount}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Individual Odds</span>
              <span className="font-bold text-primary text-sm">{stats.oddsPerItem}</span>
            </div>
          </div>
        )}
      </div>
    </RandomToolLayout>
  );
}
