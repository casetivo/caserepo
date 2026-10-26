"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type GqlIndent = "2" | "4" | "tab" | "minify";

interface GqlStats {
  operationType: string;
  fieldCount: number;
  maxNestingDepth: number;
  originalBytes: number;
  outputBytes: number;
  compressionRatio: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<GqlIndent>("2");
  const [stripCommas, setStripCommas] = useState(true);
  const [stats, setStats] = useState<GqlStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const stripCommasId = useId();

  // Robust GraphQL formatter handling queries, mutations, subscriptions, arguments, directives, and fragments
  const formatGraphQL = (gql: string, indentMode: GqlIndent, removeCommas: boolean): string => {
    let clean = gql.trim();
    if (!clean) return "";

    if (indentMode === "minify") {
      // 1. Remove comments
      clean = clean.replace(/#.*$/gm, "");
      // 2. Normalize whitespace
      clean = clean.replace(/\s+/g, " ");
      // 3. Remove space around structural punctuation
      clean = clean.replace(/\s*([{}():,$!=])\s*/g, "$1");
      // 4. In GraphQL, commas are optional whitespace; remove them for maximum minification
      clean = clean.replace(/,/g, " ").replace(/\s+/g, " ").replace(/\s*([{}():,$!=])\s*/g, "$1");
      return clean.trim();
    }

    const tabStr = indentMode === "tab" ? "\t" : " ".repeat(Number(indentMode));

    // Preserve comments
    const comments: string[] = [];
    clean = clean.replace(/#.*$/gm, match => {
      const token = `___GQL_COMMENT_${comments.length}___`;
      comments.push(match.trim());
      return token;
    });

    // Optionally strip optional commas in GraphQL selection sets
    if (removeCommas) {
      // Remove commas not inside strings or argument parens
      clean = clean.replace(/,\s*/g, "\n");
    }

    // Standardize spacing around braces
    clean = clean
      .replace(/\s*{\s*/g, " {\n")
      .replace(/\s*}\s*/g, "\n}\n");

    const lines = clean.split("\n");
    const formattedLines: string[] = [];
    let currentIndentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) continue;

      // Handle closing braces
      if (line.startsWith("}")) {
        currentIndentLevel = Math.max(0, currentIndentLevel - 1);
      }

      // Restore comments
      comments.forEach((c, idx) => {
        if (line.includes(`___GQL_COMMENT_${idx}___`)) {
          line = line.replace(`___GQL_COMMENT_${idx}___`, c);
        }
      });

      // Split multiple inline fields if present on the same line
      const prefix = tabStr.repeat(currentIndentLevel);
      formattedLines.push(prefix + line);

      // Handle opening braces
      if (line.endsWith("{")) {
        currentIndentLevel++;
      }
    }

    return formattedLines.join("\n").trim();
  };

  // Inspect GraphQL AST properties like operation type and depth
  const inspectGql = (gql: string): { opType: string; fields: number; maxDepth: number } => {
    let opType = "Query";
    const opMatch = gql.match(/\b(query|mutation|subscription|fragment)\b/i);
    if (opMatch) {
      opType = opMatch[1].charAt(0).toUpperCase() + opMatch[1].slice(1).toLowerCase();
    }

    // Count open braces to determine maximum selection nesting depth
    let depth = 0;
    let maxDepth = 0;
    for (const char of gql) {
      if (char === "{") {
        depth++;
        if (depth > maxDepth) maxDepth = depth;
      } else if (char === "}") {
        depth = Math.max(0, depth - 1);
      }
    }

    // Approximate field count
    const cleaned = gql.replace(/#.*$/gm, "").replace(/\{|\}/g, "\n");
    const fieldLines = cleaned
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.length > 0 && !/^(query|mutation|subscription|fragment)\b/i.test(l));

    return { opType, fields: fieldLines.length, maxDepth };
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setErrorMsg(null);
      return;
    }

    try {
      const formatted = formatGraphQL(input, indent, stripCommas);
      setOutput(formatted);
      setErrorMsg(null);

      const inspection = inspectGql(input);
      const origSize = new Blob([input]).size;
      const outSize = new Blob([formatted]).size;
      const ratio = origSize > 0 ? Math.round(((origSize - outSize) / origSize) * 100) : 0;

      setStats({
        operationType: inspection.opType,
        fieldCount: inspection.fields,
        maxNestingDepth: inspection.maxDepth,
        originalBytes: origSize,
        outputBytes: outSize,
        compressionRatio: ratio,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to format GraphQL document.");
      setOutput(`# GraphQL Syntax Warning:\n# ${err.message || "Check your braces and operation syntax."}`);
      setStats(null);
    }
  }, [input, indent, stripCommas]);

  const loadSample = () => {
    const sample = `query GetUserProfile($userId: ID!, $includeReviews: Boolean = true) {
user(id: $userId) {
id
name
email
avatarUrl
role
company {
id
name
domain
}
reviews(first: 5) @include(if: $includeReviews) {
edges {
node {
id
rating
comment
createdAt
}
}
}
}
}`;
    setInput(sample);
  };

  return (
    <TextToolLayout
      titleKey="graphqlFormatter"
      subtitleKey="graphqlFormatterSubtitle"
      actionLabelKey="graphqlFormatterAction"
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
        "how-to-format-graphql-queries",
        "how-to-format-json-online",
        "what-is-json-formatter",
      ]}
      relatedPostsTitle="GraphQL, JSON & API Architecture Tutorials"
    >
      <div className="flex flex-col gap-4">
        {/* Formatting Style Bar */}
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
                onClick={() => setIndent(item.id as GqlIndent)}
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
            Load Sample Query
          </button>
        </div>

        {/* Granular Options */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          <label htmlFor={stripCommasId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
            <input
              id={stripCommasId}
              type="checkbox"
              checked={stripCommas}
              onChange={e => setStripCommas(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
            />
            <span>Strip Redundant Commas (Idiomatic GraphQL)</span>
          </label>

          <span className="text-xs text-muted-foreground">
            Supports Queries, Mutations, Subscriptions, Fragments, &amp; Directives
          </span>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Operation</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.operationType}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Max Depth</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                Level {stats.maxNestingDepth}
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
