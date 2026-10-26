"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type HtmlIndent = "2" | "4" | "tab" | "minify";

interface HtmlStats {
  tagCount: number;
  maxNestingDepth: number;
  originalBytes: number;
  outputBytes: number;
  compressionRatio: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<HtmlIndent>("2");
  const [keepComments, setKeepComments] = useState(true);
  const [stats, setStats] = useState<HtmlStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const commentsId = useId();

  // HTML5 Void elements that do not require or have closing tags
  const VOID_ELEMENTS = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
    "!doctype",
  ]);

  // Robust HTML Beautifier & Minifier
  const formatHtml = (html: string, indentMode: HtmlIndent, preserveComments: boolean): string => {
    let clean = html.trim();
    if (!clean) return "";

    if (indentMode === "minify") {
      // 1. Remove comments if not preserving
      if (!preserveComments) {
        clean = clean.replace(/<!--[\s\S]*?-->/g, "");
      }
      // 2. Collapse multiline whitespace
      clean = clean.replace(/\s+/g, " ");
      // 3. Remove spaces around tag brackets
      clean = clean.replace(/>\s+</g, "><");
      return clean.trim();
    }

    const tabStr = indentMode === "tab" ? "\t" : " ".repeat(Number(indentMode));

    // Tokenize comments
    const comments: string[] = [];
    clean = clean.replace(/<!--[\s\S]*?-->/g, match => {
      if (!preserveComments) return "";
      const token = `___HTML_COMMENT_${comments.length}___`;
      comments.push(match.trim());
      return token;
    });

    // Tokenize text between tags to preserve inline spacing
    const tokens: string[] = [];
    const regex = /(<\/?[a-zA-Z0-9:-]+(?:\s+[^>]*?)?\/?>|___HTML_COMMENT_\d+___|[^<]+)/g;
    let match;
    while ((match = regex.exec(clean)) !== null) {
      const token = match[1];
      if (token.trim().length > 0) {
        tokens.push(token.trim());
      }
    }

    const formattedLines: string[] = [];
    let currentDepth = 0;

    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];

      // Comment token
      if (token.startsWith("___HTML_COMMENT_")) {
        const commentIdx = parseInt(token.replace(/\D/g, ""), 10);
        const originalComment = comments[commentIdx] || "";
        formattedLines.push(tabStr.repeat(currentDepth) + originalComment);
        continue;
      }

      // Closing tag: </tag>
      if (/^<\/[a-zA-Z0-9:-]+>$/i.test(token)) {
        currentDepth = Math.max(0, currentDepth - 1);
        formattedLines.push(tabStr.repeat(currentDepth) + token);
        continue;
      }

      // Opening or self-closing tag
      const openMatch = token.match(/^<([a-zA-Z0-9:-]+)/i);
      if (openMatch) {
        const tagName = openMatch[1].toLowerCase();
        const isSelfClosing = token.endsWith("/>") || VOID_ELEMENTS.has(tagName);

        formattedLines.push(tabStr.repeat(currentDepth) + token);

        if (!isSelfClosing) {
          currentDepth++;
        }
        continue;
      }

      // Text node
      formattedLines.push(tabStr.repeat(currentDepth) + token);
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
      const formatted = formatHtml(input, indent, keepComments);
      setOutput(formatted);
      setErrorMsg(null);

      // Compute HTML DOM metrics
      const tags = (formatted.match(/<[a-zA-Z0-9:-]+/g) || []).length;
      let depth = 0;
      let maxDepth = 0;
      for (const line of formatted.split("\n")) {
        const leadingWhitespace = line.match(/^\s*/)?.[0].length || 0;
        const currentIndentLevel = indent === "tab" ? leadingWhitespace : Math.floor(leadingWhitespace / Number(indent || 2));
        if (currentIndentLevel > maxDepth) maxDepth = currentIndentLevel;
      }

      const origSize = new Blob([input]).size;
      const outSize = new Blob([formatted]).size;
      const ratio = origSize > 0 ? Math.round(((origSize - outSize) / origSize) * 100) : 0;

      setStats({
        tagCount: tags,
        maxNestingDepth: maxDepth,
        originalBytes: origSize,
        outputBytes: outSize,
        compressionRatio: ratio,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to format HTML.");
      setOutput(`<!-- HTML Formatting Error:\n  ${err.message || "Invalid markup"}\n-->`);
      setStats(null);
    }
  }, [input, indent, keepComments]);

  const loadSample = () => {
    const sample = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Modern Web App</title><link rel="stylesheet" href="/styles.css"></head><body><!-- Main Navigation --><header class="site-header"><div class="container"><h1 class="logo"><a href="/">Casetivo</a></h1><nav class="nav-links"><a href="/tools">All Tools</a><a href="/blog">Blog</a><a href="/about">About</a></nav></div></header><main class="content-wrapper"><section class="hero"><h2>Instant Developer Utilities</h2><p>Free, fast, and 100% private in-browser tools for modern creators.</p><button type="button" class="btn-primary">Explore Tools</button></section></main></body></html>`;
    setInput(sample);
  };

  return (
    <TextToolLayout
      titleKey="htmlFormatter"
      subtitleKey="htmlFormatterSubtitle"
      actionLabelKey="htmlFormatterAction"
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
        "how-to-format-and-clean-html",
        "how-to-format-and-beautify-css",
        "how-to-strip-formatting-and-convert-to-plain-text",
      ]}
      relatedPostsTitle="HTML, CSS & Frontend Architecture Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Style Options Bar */}
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
                onClick={() => setIndent(item.id as HtmlIndent)}
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
            Load Sample HTML
          </button>
        </div>

        {/* Granular Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          <label htmlFor={commentsId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
            <input
              id={commentsId}
              type="checkbox"
              checked={keepComments}
              onChange={e => setKeepComments(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
            />
            <span>Preserve HTML Comments (<code>&lt;!-- --&gt;</code>)</span>
          </label>

          <span className="text-xs text-muted-foreground">
            HTML5 Void Elements (img, br, input, meta, hr) Auto-Detected
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
              <div className="text-xs text-muted-foreground font-medium">HTML Elements</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.tagCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">DOM Nesting Depth</div>
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
