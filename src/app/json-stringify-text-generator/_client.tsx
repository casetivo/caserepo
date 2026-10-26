"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

interface TextStringifyStats {
  inputLines: number;
  inputChars: number;
  outputChars: number;
  escapedNewlines: number;
  escapedQuotes: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [wrapQuotes, setWrapQuotes] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(false);
  const [escapeUnicode, setEscapeUnicode] = useState(false);
  const [stats, setStats] = useState<TextStringifyStats | null>(null);
  const wrapQuotesId = useId();
  const trimId = useId();
  const unicodeId = useId();

  // Escape arbitrary plain text into a valid JSON string literal
  const stringifyText = (
    text: string,
    withQuotes: boolean,
    trimEdges: boolean,
    toUnicode: boolean
  ): string => {
    if (!text) return "";

    let processed = trimEdges ? text.trim() : text;

    // Standard JSON.stringify handles \", \\, \n, \r, \t, etc.
    let result = JSON.stringify(processed);

    // Optional: convert non-ASCII characters (e.g. emojis or foreign scripts) to \uXXXX
    if (toUnicode) {
      result = result.replace(/[\u007F-\uFFFF]/g, chr => {
        return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4);
      });
    }

    if (!withQuotes && result.startsWith('"') && result.endsWith('"')) {
      result = result.slice(1, -1);
    }

    return result;
  };

  const handleAction = useCallback(() => {
    if (!input) {
      setOutput("");
      setStats(null);
      return;
    }

    try {
      const result = stringifyText(input, wrapQuotes, trimWhitespace, escapeUnicode);
      setOutput(result);

      const lines = input.split("\n").length;
      const newlinesCount = (result.match(/\\n/g) || []).length;
      const quotesCount = (result.match(/\\"/g) || []).length;

      setStats({
        inputLines: lines,
        inputChars: input.length,
        outputChars: result.length,
        escapedNewlines: newlinesCount,
        escapedQuotes: quotesCount,
      });
    } catch {
      setOutput("// Error stringifying text input.");
      setStats(null);
    }
  }, [input, wrapQuotes, trimWhitespace, escapeUnicode]);

  const loadSample = () => {
    const sample = `Dear Engineering Team,

We are excited to announce Casetivo 2.0!
Here are the latest updates:
- Added "100% in-browser" execution for all tools
- Improved JSON & Markdown parsers
- Fixed "escaped quotes" and line break issues

Check it out at: https://casetivo.com

Best regards,
The Developer Team`;
    setInput(sample);
  };

  return (
    <TextToolLayout
      titleKey="jsonStringifyTextGenerator"
      subtitleKey="jsonStringifyTextGeneratorSubtitle"
      actionLabelKey="jsonStringifyTextGeneratorAction"
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
        "how-to-escape-and-stringify-json",
        "what-is-json-formatter",
        "how-to-format-json-online",
      ]}
      relatedPostsTitle="JSON Text Escaping & String Manipulation Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Formatting Options Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Checkboxes */}
          <div className="flex flex-wrap items-center gap-4">
            <label htmlFor={wrapQuotesId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
              <input
                id={wrapQuotesId}
                type="checkbox"
                checked={wrapQuotes}
                onChange={e => setWrapQuotes(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
              />
              <span>Wrap in Outer Quotes (<code>&quot;...&quot;</code>)</span>
            </label>

            <label htmlFor={trimId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
              <input
                id={trimId}
                type="checkbox"
                checked={trimWhitespace}
                onChange={e => setTrimWhitespace(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
              />
              <span>Trim Leading/Trailing Space</span>
            </label>

            <label htmlFor={unicodeId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
              <input
                id={unicodeId}
                type="checkbox"
                checked={escapeUnicode}
                onChange={e => setEscapeUnicode(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
              />
              <span>Escape Unicode (<code>\uXXXX</code>)</span>
            </label>
          </div>

          {/* Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample Multiline Text
          </button>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 max-w-3xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Input Lines</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.inputLines}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Input Chars</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.inputChars}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Output Chars</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.outputChars}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Converted <code>\n</code></div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.escapedNewlines}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Escaped <code>\&quot;</code></div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.escapedQuotes}</div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
