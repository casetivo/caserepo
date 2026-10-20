"use client";

import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type RewriterMode = "concise" | "executive" | "plain";

const FILLER_WORDS = [
  "very",
  "really",
  "basically",
  "actually",
  "literally",
  "totally",
  "just",
  "completely",
  "quite",
  "simply",
  "somewhat",
  "honestly",
  "obviously",
  "essentially",
  "practically",
];

const WORDY_PHRASES: [RegExp, string][] = [
  [/\bin order to\b/gi, "to"],
  [/\bdue to the fact that\b/gi, "because"],
  [/\bat this point in time\b/gi, "currently"],
  [/\bat the present time\b/gi, "now"],
  [/\bin the event that\b/gi, "if"],
  [/\bwith reference to\b/gi, "regarding"],
  [/\bwith regard to\b/gi, "regarding"],
  [/\bin spite of the fact that\b/gi, "although"],
  [/\btake into consideration\b/gi, "consider"],
  [/\bgive consideration to\b/gi, "consider"],
  [/\bmake a decision\b/gi, "decide"],
  [/\bcome to an agreement\b/gi, "agree"],
  [/\bconduct an investigation of\b/gi, "investigate"],
  [/\bhas the capability to\b/gi, "can"],
  [/\bis able to\b/gi, "can"],
  [/\ba large number of\b/gi, "many"],
  [/\ba greater number of\b/gi, "more"],
  [/\bprior to\b/gi, "before"],
  [/\bsubsequent to\b/gi, "after"],
  [/\bfor the purpose of\b/gi, "to"],
  [/\bin close proximity to\b/gi, "near"],
  [/\bas a matter of fact\b/gi, "in fact"],
  [/\bit is necessary that\b/gi, "must"],
  [/\bfor the reason that\b/gi, "because"],
];

const REDUNDANCIES: [RegExp, string][] = [
  [/\bfuture plans\b/gi, "plans"],
  [/\bunexpected surprise\b/gi, "surprise"],
  [/\bclose proximity\b/gi, "proximity"],
  [/\bend result\b/gi, "result"],
  [/\bbasic fundamentals\b/gi, "fundamentals"],
  [/\bfree gift\b/gi, "gift"],
  [/\bpast history\b/gi, "history"],
  [/\bcompletely finished\b/gi, "finished"],
  [/\bfinal outcome\b/gi, "outcome"],
  [/\btrue facts\b/gi, "facts"],
  [/\badded bonus\b/gi, "bonus"],
  [/\bcurrent status\b/gi, "status"],
];

const PLAIN_ENGLISH_WORDS: [RegExp, string][] = [
  [/\butilize\b/gi, "use"],
  [/\butilizes\b/gi, "uses"],
  [/\butilized\b/gi, "used"],
  [/\butilizing\b/gi, "using"],
  [/\bcommence\b/gi, "start"],
  [/\bcommences\b/gi, "starts"],
  [/\bcommenced\b/gi, "started"],
  [/\bcommencing\b/gi, "starting"],
  [/\bterminate\b/gi, "end"],
  [/\bterminates\b/gi, "ends"],
  [/\bterminated\b/gi, "ended"],
  [/\bterminating\b/gi, "ending"],
  [/\bendeavor\b/gi, "try"],
  [/\bendeavors\b/gi, "tries"],
  [/\bendeavored\b/gi, "tried"],
  [/\bendeavoring\b/gi, "trying"],
  [/\bfacilitate\b/gi, "help"],
  [/\bfacilitates\b/gi, "helps"],
  [/\bfacilitated\b/gi, "helped"],
  [/\bfacilitating\b/gi, "helping"],
  [/\btransmit\b/gi, "send"],
  [/\btransmits\b/gi, "sends"],
  [/\btransmitted\b/gi, "sent"],
  [/\btransmitting\b/gi, "sending"],
  [/\bdemonstrate\b/gi, "show"],
  [/\bdemonstrates\b/gi, "shows"],
  [/\bdemonstrated\b/gi, "showed"],
  [/\bdemonstrating\b/gi, "showing"],
  [/\battempt\b/gi, "try"],
  [/\battempts\b/gi, "tries"],
  [/\battempted\b/gi, "tried"],
  [/\battempting\b/gi, "trying"],
];

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<RewriterMode>("concise");

  // Granular Toggles
  const [stripFillers, setStripFillers] = useState(true);
  const [trimWordyPhrases, setTrimWordyPhrases] = useState(true);
  const [removeRedundant, setRemoveRedundant] = useState(true);
  const [usePlainEnglish, setUsePlainEnglish] = useState(false);
  const [capitalizeStarts, setCapitalizeStarts] = useState(true);

  const [stats, setStats] = useState<{
    originalWords: number;
    cleanedWords: number;
    wordsTrimmed: number;
    fluffReductionPercent: number;
  } | null>(null);

  const countWords = (text: string) => {
    const tokens = text.match(/[\p{L}\p{N}'-]+/gu);
    return tokens ? tokens.length : 0;
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      return;
    }

    const origWordCount = countWords(input);
    let text = input;

    // 1. Trim Wordy Phrases
    if (trimWordyPhrases || mode === "executive" || mode === "concise") {
      for (const [pattern, replacement] of WORDY_PHRASES) {
        text = text.replace(pattern, replacement);
      }
    }

    // 2. Remove Redundant Doublets
    if (removeRedundant || mode === "concise") {
      for (const [pattern, replacement] of REDUNDANCIES) {
        text = text.replace(pattern, replacement);
      }
    }

    // 3. Plain English Substitutions
    if (usePlainEnglish || mode === "plain") {
      for (const [pattern, replacement] of PLAIN_ENGLISH_WORDS) {
        text = text.replace(pattern, replacement);
      }
    }

    // 4. Strip Filler Words
    if (stripFillers || mode === "concise") {
      const fillerRegex = new RegExp(`\\b(${FILLER_WORDS.join("|")})\\b\\s*`, "gi");
      text = text.replace(fillerRegex, "");
    }

    // 5. Clean multi-spaces & normalize spacing around punctuation
    text = text
      .replace(/[ \t]{2,}/g, " ")
      .replace(/\s+([.,;:!?])/g, "$1")
      .trim();

    // 6. Capitalize sentence starts if enabled
    if (capitalizeStarts) {
      const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
      text = sentences
        .map(s => {
          const trimmed = s.trim();
          if (!trimmed) return "";
          return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        })
        .join(" ");
    }

    const cleanWordCount = countWords(text);
    const wordsTrimmed = Math.max(0, origWordCount - cleanWordCount);
    const percent =
      origWordCount > 0 ? Math.max(0, Math.round((wordsTrimmed / origWordCount) * 100)) : 0;

    setOutput(text);
    setStats({
      originalWords: origWordCount,
      cleanedWords: cleanWordCount,
      wordsTrimmed,
      fluffReductionPercent: percent,
    });
  }, [
    input,
    mode,
    stripFillers,
    trimWordyPhrases,
    removeRedundant,
    usePlainEnglish,
    capitalizeStarts,
  ]);

  const handleSelectMode = (newMode: RewriterMode) => {
    setMode(newMode);
    if (newMode === "concise") {
      setStripFillers(true);
      setTrimWordyPhrases(true);
      setRemoveRedundant(true);
      setUsePlainEnglish(false);
    } else if (newMode === "executive") {
      setStripFillers(true);
      setTrimWordyPhrases(true);
      setRemoveRedundant(true);
      setUsePlainEnglish(true);
    } else if (newMode === "plain") {
      setStripFillers(false);
      setTrimWordyPhrases(true);
      setRemoveRedundant(false);
      setUsePlainEnglish(true);
    }
  };

  return (
    <TextToolLayout
      titleKey="sentenceRewriter"
      subtitleKey="sentenceRewriterSubtitle"
      actionLabelKey="sentenceRewriterAction"
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
        "how-to-rewrite-sentences-for-clarity-and-impact",
        "how-to-find-and-fix-duplicate-words",
        "how-to-strip-formatting-and-convert-to-plain-text",
      ]}
      relatedPostsTitle="Writing & Self-Editing Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Style Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground mr-1">Style Mode:</span>
          {[
            { id: "concise", label: "Concise & Direct" },
            { id: "executive", label: "Executive & Confident" },
            { id: "plain", label: "Plain English (Jargon Cutter)" },
          ].map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectMode(item.id as RewriterMode)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                mode === item.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-foreground hover:bg-accent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Cleaning Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 rounded-xl border border-border bg-card/60 text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={stripFillers}
              onChange={e => setStripFillers(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Cut Filler Adverbs (very, really, basically)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={trimWordyPhrases}
              onChange={e => setTrimWordyPhrases(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Trim Wordy Phrases (in order to &rarr; to)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={removeRedundant}
              onChange={e => setRemoveRedundant(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Remove Redundancies (future plans &rarr; plans)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={usePlainEnglish}
              onChange={e => setUsePlainEnglish(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Plain English Words (utilize &rarr; use)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground sm:col-span-2">
            <input
              type="checkbox"
              checked={capitalizeStarts}
              onChange={e => setCapitalizeStarts(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Capitalize Sentence Starts &amp; Clean Punctuation</span>
          </label>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Original Words</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.originalWords}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Cleaned Words</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.cleanedWords}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5">
              <div className="text-xs text-muted-foreground font-medium">Words Trimmed</div>
              <div className="text-base sm:text-lg font-bold text-primary">{stats.wordsTrimmed}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
              <div className="text-xs text-muted-foreground font-medium">Fluff Reduced</div>
              <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {stats.fluffReductionPercent}%
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
