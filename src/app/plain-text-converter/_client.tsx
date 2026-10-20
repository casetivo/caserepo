"use client";

import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // Sanitization Options
  const [stripHtml, setStripHtml] = useState(true);
  const [straightenQuotes, setStraightenQuotes] = useState(true);
  const [normalizeDashes, setNormalizeDashes] = useState(true);
  const [stripInvisibleChars, setStripInvisibleChars] = useState(true);
  const [convertBullets, setConvertBullets] = useState(true);
  const [collapseBlankLines, setCollapseBlankLines] = useState(true);
  const [normalizeWhitespace, setNormalizeWhitespace] = useState(true);

  const [stats, setStats] = useState<{
    originalChars: number;
    cleanedChars: number;
    htmlTagsRemoved: number;
    specialCharsSanitized: number;
    percentSaved: number;
  } | null>(null);

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      return;
    }

    const originalLength = input.length;
    let text = input;

    // Track metrics
    const htmlMatches = input.match(/<[^>]*>/g) || [];
    const htmlCount = htmlMatches.length;

    let specialCharCount = 0;
    const specialMatches = input.match(/[“”‘’«»—–•◦▪⁃✔\u200B\u200C\u200D\uFEFF\u00A0\u00AD]/g) || [];
    specialCharCount = specialMatches.length;

    // 1. Strip HTML tags and decode common entities
    if (stripHtml) {
      // Remove style & script blocks completely along with contents
      text = text.replace(/<style[\s\S]*?<\/style>/gi, "");
      text = text.replace(/<script[\s\S]*?<\/script>/gi, "");
      // Remove all remaining HTML / XML tags
      text = text.replace(/<[^>]+>/g, "");
      // Decode standard HTML entities
      text = text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, " ")
        .replace(/&mdash;/g, "-")
        .replace(/&ndash;/g, "-");
    }

    // 2. Strip invisible Unicode characters & non-breaking spaces
    if (stripInvisibleChars) {
      text = text
        .replace(/[\u200B\u200C\u200D\uFEFF\u00AD]/g, "") // Zero-width spaces, joiners, BOM, soft hyphen
        .replace(/\u00A0/g, " "); // Non-breaking space
    }

    // 3. Straighten typographical smart quotes
    if (straightenQuotes) {
      text = text
        .replace(/[“”«»]/g, '"')
        .replace(/[‘’]/g, "'");
    }

    // 4. Normalize typographical dashes to standard hyphens
    if (normalizeDashes) {
      text = text.replace(/[—―]/g, " - ").replace(/–/g, "-");
    }

    // 5. Convert fancy bullets into standard clean markdown/text hyphens
    if (convertBullets) {
      text = text.replace(/^[ \t]*[•◦▪⁃✔✓*][ \t]+/gm, "- ");
    }

    // 6. Normalize inline spaces and trim per-line whitespace
    if (normalizeWhitespace) {
      text = text
        .split("\n")
        .map(line => line.replace(/[ \t]{2,}/g, " ").trim())
        .join("\n");
    }

    // 7. Collapse excess consecutive blank lines
    if (collapseBlankLines) {
      text = text.replace(/\n{3,}/g, "\n\n");
    }

    text = text.trim();

    const cleanedLength = text.length;
    const diff = originalLength - cleanedLength;
    const percent = originalLength > 0 ? Math.max(0, Math.round((diff / originalLength) * 100)) : 0;

    setOutput(text);
    setStats({
      originalChars: originalLength,
      cleanedChars: cleanedLength,
      htmlTagsRemoved: htmlCount,
      specialCharsSanitized: specialCharCount,
      percentSaved: percent,
    });
  }, [
    input,
    stripHtml,
    straightenQuotes,
    normalizeDashes,
    stripInvisibleChars,
    convertBullets,
    collapseBlankLines,
    normalizeWhitespace,
  ]);

  const applyPreset = (preset: "all" | "html" | "quotes") => {
    if (preset === "all") {
      setStripHtml(true);
      setStraightenQuotes(true);
      setNormalizeDashes(true);
      setStripInvisibleChars(true);
      setConvertBullets(true);
      setCollapseBlankLines(true);
      setNormalizeWhitespace(true);
    } else if (preset === "html") {
      setStripHtml(true);
      setStraightenQuotes(false);
      setNormalizeDashes(false);
      setStripInvisibleChars(true);
      setConvertBullets(false);
      setCollapseBlankLines(false);
      setNormalizeWhitespace(true);
    } else if (preset === "quotes") {
      setStripHtml(false);
      setStraightenQuotes(true);
      setNormalizeDashes(true);
      setStripInvisibleChars(true);
      setConvertBullets(false);
      setCollapseBlankLines(false);
      setNormalizeWhitespace(false);
    }
  };

  return (
    <TextToolLayout
      titleKey="plainTextConverter"
      subtitleKey="plainTextConverterSubtitle"
      actionLabelKey="plainTextConverterAction"
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
        "how-to-strip-formatting-and-convert-to-plain-text",
        "how-to-remove-duplicate-lines-from-text",
        "how-to-find-and-fix-duplicate-words",
      ]}
      relatedPostsTitle="Clean Text & Formatting Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Preset Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground mr-1">Quick Presets:</span>
          <button
            type="button"
            onClick={() => applyPreset("all")}
            className="px-3 py-1 rounded-md text-xs font-medium border border-border bg-card hover:bg-accent text-foreground transition-all"
          >
            Full Deep Clean (Recommended)
          </button>
          <button
            type="button"
            onClick={() => applyPreset("html")}
            className="px-3 py-1 rounded-md text-xs font-medium border border-border bg-card hover:bg-accent text-foreground transition-all"
          >
            Strip HTML &amp; Spans Only
          </button>
          <button
            type="button"
            onClick={() => applyPreset("quotes")}
            className="px-3 py-1 rounded-md text-xs font-medium border border-border bg-card hover:bg-accent text-foreground transition-all"
          >
            Quotes &amp; Dashes Only
          </button>
        </div>

        {/* Cleaning Options Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 rounded-xl border border-border bg-card/60 text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={stripHtml}
              onChange={e => setStripHtml(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Strip HTML &amp; XML Tags</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={straightenQuotes}
              onChange={e => setStraightenQuotes(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Straighten Smart Quotes (&ldquo;&rdquo; &rarr; &quot;)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={normalizeDashes}
              onChange={e => setNormalizeDashes(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Normalize Dashes (&mdash;, &ndash; &rarr; -)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={stripInvisibleChars}
              onChange={e => setStripInvisibleChars(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Remove Invisible &amp; Zero-Width Chars</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={convertBullets}
              onChange={e => setConvertBullets(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Convert Bullets (&bull;) to Hyphens (-)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
            <input
              type="checkbox"
              checked={collapseBlankLines}
              onChange={e => setCollapseBlankLines(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Collapse Excess Blank Lines</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-foreground sm:col-span-2 lg:col-span-3">
            <input
              type="checkbox"
              checked={normalizeWhitespace}
              onChange={e => setNormalizeWhitespace(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span className="font-medium">Normalize Spaces (Trim line edges &amp; collapse multi-spaces)</span>
          </label>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Original Chars</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.originalChars}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Clean Chars</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.cleanedChars}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5">
              <div className="text-xs text-muted-foreground font-medium">HTML &amp; Entities Cut</div>
              <div className="text-base sm:text-lg font-bold text-primary">{stats.htmlTagsRemoved}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
              <div className="text-xs text-muted-foreground font-medium">Special Chars Cleaned</div>
              <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {stats.specialCharsSanitized}
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
