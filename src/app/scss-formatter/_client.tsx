"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type IndentType = "2" | "4" | "tab";
type FormatterMode = "beautify" | "minify";

interface ScssStats {
  rulesCount: number;
  varsCount: number;
  atRulesCount: number;
  linesCount: number;
  rawBytes: number;
  formattedBytes: number;
}

const SAMPLE_SCSS = `$primary-color: #3b82f6;
$border-radius: 12px;
$transition-speed: 200ms;

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background-color: #ffffff;
  border-radius: $border-radius;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform $transition-speed ease;

  &:hover {
    transform: translateY(-4px);
  }

  &__header {
    @include flex-center;
    margin-bottom: 1rem;

    .title {
      font-size: 1.25rem;
      font-weight: 700;
      color: $primary-color;
    }
  }

  &--featured {
    border: 2px solid $primary-color;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
}`;

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<IndentType>("2");
  const [mode, setMode] = useState<FormatterMode>("beautify");
  const [stats, setStats] = useState<ScssStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const indentId = useId();

  // Minify SCSS
  const minifyScss = (code: string): string => {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove block comments
      .replace(/\/\/.*$/gm, "") // remove inline comments
      .replace(/\s+/g, " ") // collapse multiple spaces
      .replace(/\s*([{};:,])\s*/g, "$1") // trim spaces around delimiters
      .replace(/;}/g, "}") // remove trailing semicolon before closing brace
      .trim();
  };

  // Beautify SCSS
  const beautifyScss = (code: string, indentStyle: IndentType): string => {
    const indentStr = indentStyle === "tab" ? "\t" : " ".repeat(Number(indentStyle));
    let depth = 0;
    const lines: string[] = [];

    // Tokenize lines while protecting string literals and comments
    // Normalize newlines and clean whitespace
    const rawLines = code.split("\n");
    let inBlockComment = false;

    for (let rawLine of rawLines) {
      let trimmed = rawLine.trim();
      if (!trimmed) continue;

      if (inBlockComment) {
        lines.push(`${indentStr.repeat(depth)}${trimmed}`);
        if (trimmed.includes("*/")) {
          inBlockComment = false;
        }
        continue;
      }

      if (trimmed.startsWith("/*")) {
        lines.push(`${indentStr.repeat(depth)}${trimmed}`);
        if (!trimmed.includes("*/")) {
          inBlockComment = true;
        }
        continue;
      }

      // Check single line comments
      if (trimmed.startsWith("//")) {
        lines.push(`${indentStr.repeat(depth)}${trimmed}`);
        continue;
      }

      // Handle closing braces at start of line
      while (trimmed.startsWith("}")) {
        depth = Math.max(0, depth - 1);
        trimmed = trimmed.substring(1).trim();
        lines.push(`${indentStr.repeat(depth)}}`);
      }

      if (!trimmed) continue;

      // Handle multiple declarations or braces on one line
      // Expand tokens around '{', '}', ';'
      const parts = trimmed
        .replace(/\{/g, " {\n")
        .replace(/\}/g, "\n}\n")
        .replace(/;(?!\s*})/g, ";\n")
        .split("\n");

      for (let part of parts) {
        let p = part.trim();
        if (!p) continue;

        if (p === "}") {
          depth = Math.max(0, depth - 1);
          lines.push(`${indentStr.repeat(depth)}}`);
        } else if (p.endsWith("{")) {
          // Rule or at-rule header
          const ruleHeader = p.slice(0, -1).trim();
          lines.push(`${indentStr.repeat(depth)}${ruleHeader} {`);
          depth++;
        } else {
          // Property declaration or statement
          if (p.includes(":") && !p.startsWith("@") && !p.startsWith("$") && !p.startsWith("&")) {
            const colonIdx = p.indexOf(":");
            const prop = p.substring(0, colonIdx).trim();
            const val = p.substring(colonIdx + 1).trim();
            p = `${prop}: ${val}`;
          }
          lines.push(`${indentStr.repeat(depth)}${p}`);
        }
      }
    }

    return lines.join("\n");
  };

  // Compute telemetry
  const computeStats = (raw: string, formatted: string): ScssStats => {
    const varsCount = (raw.match(/\$[a-zA-Z0-9_-]+\s*:/g) || []).length;
    const atRulesCount = (raw.match(/@(mixin|include|extend|function|media|keyframes|use|forward)\b/g) || []).length;
    const rulesCount = (raw.match(/\{/g) || []).length;
    const linesCount = formatted.split("\n").length;

    return {
      rulesCount,
      varsCount,
      atRulesCount,
      linesCount,
      rawBytes: new Blob([raw]).size,
      formattedBytes: new Blob([formatted]).size,
    };
  };

  // Main format handler
  const formatCode = useCallback(
    (source: string, currentMode: FormatterMode, currentIndent: IndentType) => {
      const trimmed = source.trim();
      if (!trimmed) {
        setOutput("");
        setStats(null);
        setErrorMsg(null);
        return;
      }

      try {
        setErrorMsg(null);
        let result = "";
        if (currentMode === "minify") {
          result = minifyScss(trimmed);
        } else {
          result = beautifyScss(trimmed, currentIndent);
        }

        setOutput(result);
        setStats(computeStats(trimmed, result));
      } catch (err) {
        setErrorMsg((err as Error).message || "Failed to parse SCSS stylesheet.");
      }
    },
    []
  );

  const handleInputChange = (val: string) => {
    setInput(val);
    formatCode(val, mode, indent);
  };

  const handleModeChange = (newMode: FormatterMode) => {
    setMode(newMode);
    formatCode(input, newMode, indent);
  };

  const handleIndentChange = (newIndent: IndentType) => {
    setIndent(newIndent);
    formatCode(input, mode, newIndent);
  };

  const loadPreset = (presetText: string) => {
    setInput(presetText);
    formatCode(presetText, mode, indent);
  };

  return (
    <TextToolLayout
      titleKey="scssFormatter"
      subtitleKey="scssFormatterSubtitle"
      actionLabelKey="scssFormatterAction"
      inputText={input}
      onInputChange={handleInputChange}
      outputText={output}
      onAction={() => formatCode(input, mode, indent)}
      relatedPostSlugs={["how-to-format-scss"]}
    >
      <div className="flex flex-col gap-4 mt-2">
        {/* Controls Bar */}
        <div className="p-4 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Mode Switcher */}
            <div className="flex items-center border border-border rounded-lg p-0.5 bg-background">
              <button
                type="button"
                onClick={() => handleModeChange("beautify")}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  mode === "beautify"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Beautify &amp; Indent
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("minify")}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  mode === "minify"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Minify SCSS
              </button>
            </div>

            {/* Indentation Selector (only when beautifying) */}
            {mode === "beautify" && (
              <div className="flex items-center gap-2">
                <label htmlFor={indentId} className="text-xs font-semibold text-foreground">
                  Indentation:
                </label>
                <select
                  id={indentId}
                  value={indent}
                  onChange={(e) => handleIndentChange(e.target.value as IndentType)}
                  className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="2">2 Spaces</option>
                  <option value="4">4 Spaces</option>
                  <option value="tab">Tabs</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadPreset(SAMPLE_SCSS)}
              className="px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground text-xs font-medium transition-colors"
            >
              Load Sample SCSS
            </button>
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
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">CSS Rules / Blocks</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.rulesCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">SCSS Variables ($)</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.varsCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Mixins &amp; At-Rules</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.atRulesCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Total Lines</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.linesCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">File Size</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.formattedBytes} B
                {mode === "minify" && stats.rawBytes > stats.formattedBytes && (
                  <span className="text-xs text-green-500 font-normal ml-1">
                    (-{Math.round(((stats.rawBytes - stats.formattedBytes) / stats.rawBytes) * 100)}%)
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Related Web Styling Tools */}
        <div className="mt-2 p-3.5 rounded-xl border border-border bg-muted/20 text-xs flex flex-wrap items-center justify-between gap-3">
          <span className="text-muted-foreground">Related Styling Tools:</span>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/css-formatter" className="text-primary hover:underline font-medium">
              CSS Formatter &amp; Beautifier
            </a>
            <span className="text-border">•</span>
            <a href="/html-formatter" className="text-primary hover:underline font-medium">
              HTML Formatter
            </a>
            <span className="text-border">•</span>
            <a href="/javascript-formatter" className="text-primary hover:underline font-medium">
              JavaScript Formatter
            </a>
            <span className="text-border">•</span>
            <a href="/blog/how-to-format-scss" className="text-primary hover:underline font-medium">
              SCSS Best Practices
            </a>
          </div>
        </div>
      </div>
    </TextToolLayout>
  );
}
