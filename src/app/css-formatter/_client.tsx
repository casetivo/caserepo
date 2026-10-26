"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type IndentOption = "2" | "4" | "tab" | "minify";

interface CssStats {
  ruleCount: number;
  selectorCount: number;
  originalBytes: number;
  outputBytes: number;
  compressionRatio: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<IndentOption>("2");
  const [sortProps, setSortProps] = useState(false);
  const [stats, setStats] = useState<CssStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const sortId = useId();

  // Robust CSS Formatter supporting comments, media queries, keyframes, and pseudo-selectors
  const beautifyCss = (css: string, indentMode: IndentOption, shouldSort: boolean): string => {
    let clean = css.trim();
    if (!clean) return "";

    if (indentMode === "minify") {
      // 1. Remove comments
      clean = clean.replace(/\/\*[\s\S]*?\*\//g, "");
      // 2. Collapse whitespace
      clean = clean.replace(/\s+/g, " ");
      // 3. Remove space around structural punctuation
      clean = clean.replace(/\s*([{}:;,>+~])\s*/g, "$1");
      // 4. Remove trailing semicolon before closing brace
      clean = clean.replace(/;}/g, "}");
      return clean.trim();
    }

    const tabStr = indentMode === "tab" ? "\t" : " ".repeat(Number(indentMode));

    // Preserve comments by tokenizing them
    const comments: string[] = [];
    clean = clean.replace(/\/\*[\s\S]*?\*\//g, match => {
      const token = `___CSS_COMMENT_${comments.length}___`;
      comments.push(match.trim());
      return token;
    });

    // Normalize spacing around braces and semicolons
    clean = clean
      .replace(/\s*{\s*/g, " {\n")
      .replace(/;\s*/g, ";\n")
      .replace(/\s*}\s*/g, "\n}\n")
      .replace(/,\s*/g, ", ");

    const lines = clean.split("\n");
    const formattedLines: string[] = [];
    let currentIndentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) continue;

      // Check if closing brace
      if (line.startsWith("}")) {
        currentIndentLevel = Math.max(0, currentIndentLevel - 1);
      }

      // Restore comment tokens
      comments.forEach((comm, idx) => {
        if (line.includes(`___CSS_COMMENT_${idx}___`)) {
          line = line.replace(`___CSS_COMMENT_${idx}___`, comm);
        }
      });

      const prefix = tabStr.repeat(currentIndentLevel);
      formattedLines.push(prefix + line);

      // Check if opening brace
      if (line.endsWith("{")) {
        currentIndentLevel++;
      }
    }

    let result = formattedLines.join("\n");

    // Optional: Sort properties inside each declaration block alphabetically
    if (shouldSort) {
      result = result.replace(/\{([\s\S]*?)\}/g, (match, declarations) => {
        const declLines = declarations
          .split("\n")
          .map((l: string) => l.trim())
          .filter(Boolean);

        const props = declLines.filter((l: string) => l.includes(":") && l.endsWith(";"));
        const others = declLines.filter((l: string) => !l.includes(":") || !l.endsWith(";"));

        props.sort((a: string, b: string) => a.localeCompare(b));

        const combined = [...props, ...others];
        const innerPrefix = tabStr;
        return "{\n" + combined.map((p: string) => innerPrefix + p).join("\n") + "\n}";
      });
    }

    return result.trim();
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setErrorMsg(null);
      return;
    }

    try {
      const formatted = beautifyCss(input, indent, sortProps);
      setOutput(formatted);
      setErrorMsg(null);

      // Compute statistics
      const rules = (formatted.match(/\{/g) || []).length;
      const selectors = (formatted.match(/([^{}]+)\{/g) || []).length;
      const origSize = new Blob([input]).size;
      const outSize = new Blob([formatted]).size;
      const ratio = origSize > 0 ? Math.round(((origSize - outSize) / origSize) * 100) : 0;

      setStats({
        ruleCount: rules,
        selectorCount: selectors,
        originalBytes: origSize,
        outputBytes: outSize,
        compressionRatio: ratio,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to format CSS.");
      setOutput(`/* CSS Formatting Error:\n * ${err.message || "Invalid syntax"}\n */`);
      setStats(null);
    }
  }, [input, indent, sortProps]);

  const loadSample = () => {
    const sample = `/* Global Header Component */
.header-nav{display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;background:#ffffff;border-bottom:1px solid #e5e7eb}
.header-nav .brand-title{font-size:1.5rem;font-weight:700;color:#111827;text-decoration:none}
.header-nav .brand-title:hover{color:#2563eb}
@media (max-width:768px){.header-nav{flex-direction:column;padding:1rem}}`;
    setInput(sample);
  };

  return (
    <TextToolLayout
      titleKey="cssFormatter"
      subtitleKey="cssFormatterSubtitle"
      actionLabelKey="cssFormatterAction"
      inputText={input}
      onInputChange={t => {
        setInput(t);
        if (!t) {
          setOutput("");
          setStats(null);
          setErrorMsg(null);
        }
      }}
      outputText={output}
      onAction={handleAction}
      relatedPostSlugs={[
        "how-to-format-and-beautify-css",
        "how-to-format-json-online",
        "how-to-strip-formatting-and-convert-to-plain-text",
      ]}
      relatedPostsTitle="CSS, Web Architecture & Code Optimization Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Indentation & Minify Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Indent Mode */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Formatting:</span>
            {[
              { id: "2", label: "2 Spaces" },
              { id: "4", label: "4 Spaces" },
              { id: "tab", label: "Tab" },
              { id: "minify", label: "Minify (Compact)" },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndent(item.id as IndentOption)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  indent === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample CSS
          </button>
        </div>

        {/* Options Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          <label htmlFor={sortId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
            <input
              id={sortId}
              type="checkbox"
              checked={sortProps}
              onChange={e => setSortProps(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
            />
            <span>Sort CSS Properties Alphabetically</span>
          </label>

          <span className="text-xs text-muted-foreground">
            Supports @media queries, keyframes, CSS variables, &amp; pseudo-classes
          </span>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Error:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Metrics Telemetry Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">CSS Rules / Blocks</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.ruleCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Original Size</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {(stats.originalBytes / 1024).toFixed(2)} KB
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Output Size</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {(stats.outputBytes / 1024).toFixed(2)} KB
              </div>
            </div>
            <div
              className={`p-2.5 rounded-lg border ${
                indent === "minify"
                  ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
                  : "border-border bg-card text-foreground"
              }`}
            >
              <div className="text-xs font-medium">
                {indent === "minify" ? "Bandwidth Saved" : "Size Delta"}
              </div>
              <div className="text-base sm:text-lg font-bold">
                {indent === "minify" ? `${stats.compressionRatio}%` : `${(stats.outputBytes - stats.originalBytes > 0 ? "+" : "") + (stats.outputBytes - stats.originalBytes)} B`}
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
