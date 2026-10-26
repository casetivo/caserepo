"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type JsIndent = "2" | "4" | "tab" | "minify";

interface JsStats {
  linesCount: number;
  functionsCount: number;
  originalBytes: number;
  outputBytes: number;
  compressionRatio: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<JsIndent>("2");
  const [semicolons, setSemicolons] = useState(true);
  const [stats, setStats] = useState<JsStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const semicolonsId = useId();

  // Robust JS Beautifier / Minifier engine supporting strings, regex literals, and ES6+ blocks
  const formatJavaScript = (code: string, indentMode: JsIndent, ensureSemicolons: boolean): string => {
    let clean = code.trim();
    if (!clean) return "";

    if (indentMode === "minify") {
      // 1. Remove single-line comments
      clean = clean.replace(/\/\/.*$/gm, "");
      // 2. Remove multi-line comments
      clean = clean.replace(/\/\*[\s\S]*?\*\//g, "");
      // 3. Normalize whitespace
      clean = clean.replace(/\s+/g, " ");
      // 4. Remove space around structural operators and punctuation
      clean = clean.replace(/\s*([{};,=()?:><+\-*\/%&|^!~])\s*/g, "$1");
      // 5. Restore essential space after keywords like return, var, let, const, function
      clean = clean.replace(/\b(return|var|let|const|function|typeof|instanceof|case|new|throw|delete|in|of)\s+/g, "$1 ");
      return clean.trim();
    }

    const tabStr = indentMode === "tab" ? "\t" : " ".repeat(Number(indentMode));

    // Preserve string literals and template literals by tokenizing
    const stringTokens: string[] = [];
    clean = clean.replace(/(["'`])(?:\\.|[^\\])*?\1/g, match => {
      const token = `___JS_STR_${stringTokens.length}___`;
      stringTokens.push(match);
      return token;
    });

    // Standardize spacing around braces and semicolons
    clean = clean
      .replace(/\s*{\s*/g, " {\n")
      .replace(/;\s*/g, ";\n")
      .replace(/\s*}\s*/g, "\n}\n");

    const lines = clean.split("\n");
    const formattedLines: string[] = [];
    let currentIndentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) continue;

      // Decrement indent if line starts with closing brace or bracket
      if (line.startsWith("}") || line.startsWith("]")) {
        currentIndentLevel = Math.max(0, currentIndentLevel - 1);
      }

      // Restore string tokens
      stringTokens.forEach((str, idx) => {
        if (line.includes(`___JS_STR_${idx}___`)) {
          line = line.replace(`___JS_STR_${idx}___`, str);
        }
      });

      // Optional semicolon enforcement for return, assignments, and expressions
      if (
        ensureSemicolons &&
        !line.endsWith(";") &&
        !line.endsWith("{") &&
        !line.endsWith("}") &&
        !line.startsWith("//") &&
        !line.startsWith("/*")
      ) {
        if (/^(const|let|var|return|import|export|throw)\b/.test(line) || /=/.test(line)) {
          line += ";";
        }
      }

      const prefix = tabStr.repeat(currentIndentLevel);
      formattedLines.push(prefix + line);

      // Increment indent if line ends with opening brace or bracket
      if (line.endsWith("{") || line.endsWith("[")) {
        currentIndentLevel++;
      }
    }

    return formattedLines.join("\n").trim();
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setErrorMsg(null);
      return;
    }

    try {
      const formatted = formatJavaScript(input, indent, semicolons);
      setOutput(formatted);
      setErrorMsg(null);

      const functions = (formatted.match(/\b(function\b|=>)/g) || []).length;
      const lines = formatted.split("\n").length;
      const origSize = new Blob([input]).size;
      const outSize = new Blob([formatted]).size;
      const ratio = origSize > 0 ? Math.round(((origSize - outSize) / origSize) * 100) : 0;

      setStats({
        linesCount: lines,
        functionsCount: functions,
        originalBytes: origSize,
        outputBytes: outSize,
        compressionRatio: ratio,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to format JavaScript.");
      setOutput(`// JavaScript Formatting Error:\n// ${err.message || "Invalid syntax"}`);
      setStats(null);
    }
  }, [input, indent, semicolons]);

  const loadSample = () => {
    const sample = `function calculateMetrics(items, options = {}) {
const { threshold = 10, filterZero = true } = options;
const processed = items.filter(item => filterZero ? item.value > 0 : true).map(item => {
return { id: item.id, score: item.value * 1.5, passed: item.value >= threshold };
});
const totalScore = processed.reduce((acc, curr) => acc + curr.score, 0);
return { total: processed.length, averageScore: totalScore / (processed.length || 1), details: processed };
}`;
    setInput(sample);
  };

  return (
    <TextToolLayout
      titleKey="javascriptFormatter"
      subtitleKey="javascriptFormatterSubtitle"
      actionLabelKey="javascriptFormatterAction"
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
        "how-to-format-javascript-code",
        "how-to-format-json-online",
        "what-is-json-formatter",
      ]}
      relatedPostsTitle="JavaScript, Clean Code & Web Architecture Tutorials"
    >
      <div className="flex flex-col gap-4">
        {/* Style Selection Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Indent Modes */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Indentation:</span>
            {[
              { id: "2", label: "2 Spaces" },
              { id: "4", label: "4 Spaces" },
              { id: "tab", label: "Tab" },
              { id: "minify", label: "Minify (Compact)" },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndent(item.id as JsIndent)}
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

          {/* Quick Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample JS Code
          </button>
        </div>

        {/* Granular Options Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          <label htmlFor={semicolonsId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
            <input
              id={semicolonsId}
              type="checkbox"
              checked={semicolons}
              onChange={e => setSemicolons(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
            />
            <span>Enforce Statement Semicolons (<code>;</code>)</span>
          </label>

          <span className="text-xs text-muted-foreground">
            Supports ES6+, Arrow Functions, Async/Await, &amp; Template Literals
          </span>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Error:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Total Lines</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.linesCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Functions Detected</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.functionsCount}</div>
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
                {indent === "minify"
                  ? `${stats.compressionRatio}%`
                  : `${(stats.outputBytes - stats.originalBytes > 0 ? "+" : "") + (stats.outputBytes - stats.originalBytes)} B`}
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
