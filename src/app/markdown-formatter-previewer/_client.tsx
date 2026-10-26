"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type ViewMode = "format" | "preview" | "split";
type BulletStyle = "-" | "*" | "+";

interface MdFormatStats {
  headingsCount: number;
  wordCount: number;
  tablesCount: number;
  codeBlocksCount: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<ViewMode>("format");
  const [bulletStyle, setBulletStyle] = useState<BulletStyle>("-");
  const [ensureBlankLines, setEnsureBlankLines] = useState(true);
  const [stats, setStats] = useState<MdFormatStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const blankLinesId = useId();

  // Robust Markdown beautification engine
  const formatMarkdown = (md: string, bullet: BulletStyle, blankLines: boolean): string => {
    if (!md.trim()) return "";

    let r = md.replace(/\r\n/g, "\n");

    // 1. Ensure space after heading hashes (# Heading)
    r = r.replace(/^(#{1,6})([^\s#])/gm, "$1 $2");

    // 2. Ensure exactly one blank line before headings
    if (blankLines) {
      r = r.replace(/([^\n])\n(#{1,6}\s+[^\n]+)/g, "$1\n\n$2");
    }

    // 3. Normalize unordered list bullets
    r = r.replace(/^(\s*)[-*+]\s+/gm, `$1${bullet} `);

    // 4. Remove trailing whitespace on lines
    r = r.replace(/[ \t]+$/gm, "");

    // 5. Collapse 3 or more consecutive empty lines to 2
    r = r.replace(/\n{3,}/g, "\n\n");

    // 6. Normalize fenced code block spacing
    r = r.replace(/```([a-zA-Z0-9_-]*)\n\n+/g, "```$1\n");

    return r.trim();
  };

  // Convert markdown to clean rendered preview HTML
  const renderPreviewHtml = (md: string): string => {
    let html = md.replace(/\r\n/g, "\n");

    // Fenced Code
    html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const esc = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<pre class="p-3 my-2 rounded-lg bg-muted font-mono text-xs overflow-x-auto"><code class="language-${lang || 'plaintext'}">${esc}</code></pre>`;
    });

    // Tables
    html = html.replace(/((?:\|[^\n]+\|\r?\n)+)/g, match => {
      const rows = match.trim().split("\n");
      if (rows.length < 2) return match;
      let t = '<table class="w-full my-3 text-xs border-collapse border border-border">\n';
      let isHead = true;
      for (const row of rows) {
        if (/^\|[-:\s|]+\|$/.test(row.trim())) {
          isHead = false;
          continue;
        }
        const cells = row.trim().split("|").slice(1, -1).map(c => c.trim());
        const tag = isHead ? "th" : "td";
        const cellCls = isHead ? "border border-border p-2 bg-muted/60 font-bold text-left" : "border border-border p-2";
        t += `  <tr>${cells.map(c => `<${tag} class="${cellCls}">${c}</${tag}>`).join("")}</tr>\n`;
      }
      return t + "</table>\n";
    });

    // Headings
    html = html.replace(/^######\s+(.+)$/gm, '<h6 class="text-sm font-semibold mt-3 mb-1 text-foreground">$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-sm font-bold mt-4 mb-1 text-foreground">$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-base font-bold mt-4 mb-2 text-foreground">$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-lg font-bold mt-5 mb-2 text-foreground">$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-xl font-bold mt-6 mb-2 border-b border-border/60 pb-1 text-foreground">$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-2xl font-black mt-6 mb-3 border-b border-border pb-1.5 text-foreground">$1</h1>');

    // Blockquotes
    html = html.replace(/^>\s+(.+)$/gm, '<blockquote class="border-l-4 border-primary/50 pl-3 my-2 text-muted-foreground italic text-xs sm:text-sm">$1</blockquote>');

    // Lists
    html = html.replace(/^\s*[-*+]\s+(.+)$/gm, '<li class="ml-4 list-disc text-sm">$1</li>');
    html = html.replace(/(<li[\s\S]*?<\/li>)/g, '<ul class="my-2 space-y-1">\n$1\n</ul>');
    html = html.replace(/<\/ul>\s*<ul class="my-2 space-y-1">/g, "");

    // Inline elements
    html = html.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-muted text-foreground text-xs font-mono">$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:opacity-80" target="_blank" rel="noopener">$1</a>');

    // Paragraphs
    const paras = html.split(/\n\s*\n/).map(p => {
      const tr = p.trim();
      if (!tr) return "";
      if (/^<(h[1-6]|ul|table|pre|blockquote)/i.test(tr)) return tr;
      return `<p class="my-2 text-sm leading-relaxed text-foreground/90">${tr.replace(/\n/g, "<br />")}</p>`;
    });

    return paras.filter(Boolean).join("\n\n");
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setErrorMsg(null);
      return;
    }

    try {
      const formatted = formatMarkdown(input, bulletStyle, ensureBlankLines);
      setOutput(formatted);
      setErrorMsg(null);

      const words = input.trim().split(/\s+/).filter(Boolean).length;
      const headings = (formatted.match(/^#{1,6}\s+/gm) || []).length;
      const tables = (formatted.match(/\|[-:\s|]+\|/g) || []).length;
      const codeBlocks = Math.floor((formatted.match(/```/g) || []).length / 2);

      setStats({
        headingsCount: headings,
        wordCount: words,
        tablesCount: tables,
        codeBlocksCount: codeBlocks,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to format Markdown.");
      setOutput(`// Error: ${err.message || "Invalid syntax"}`);
      setStats(null);
    }
  }, [input, bulletStyle, ensureBlankLines]);

  const loadSample = () => {
    const sample = `# Project Documentation
## Overview
This is an example of poorly formatted Markdown without standard spacing.
### Key Features
* Standardizes heading whitespace
* Normalizes bullet characters
* Clean GFM table alignment

| Tool | Status | Speed |
| :--- | :---: | :--- |
| Formatter | Active | Instant |
| Previewer | Active | Real-Time |

\`\`\`bash
# Install and run
npm install && npm test
\`\`\`

> Writing clean Markdown ensures readability in both raw plain text and compiled HTML.`;
    setInput(sample);
  };

  const renderedPreview = renderPreviewHtml(output || input);

  return (
    <TextToolLayout
      titleKey="markdownFormatterPreviewer"
      subtitleKey="markdownFormatterPreviewerSubtitle"
      actionLabelKey="markdownFormatterPreviewerAction"
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
        "how-to-format-and-preview-markdown",
        "how-to-convert-markdown-to-html",
        "how-to-format-and-clean-html",
      ]}
      relatedPostsTitle="Markdown, README & Technical Writing Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">View:</span>
            {[
              { id: "format", label: "Formatted Markdown" },
              { id: "preview", label: "Rendered Preview" },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id as ViewMode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === m.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample Markdown
          </button>
        </div>

        {/* Formatting Rules Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          {/* Bullet Style */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Bullet Style:</span>
            {(["-", "*", "+"] as const).map(b => (
              <button
                key={b}
                type="button"
                onClick={() => setBulletStyle(b)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  bulletStyle === b
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground hover:bg-accent"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          <label htmlFor={blankLinesId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
            <input
              id={blankLinesId}
              type="checkbox"
              checked={ensureBlankLines}
              onChange={e => setEnsureBlankLines(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
            />
            <span>Ensure Blank Line Before Headings (Standard GFM)</span>
          </label>
        </div>

        {/* Live Visual Preview Container (when preview is active) */}
        {mode === "preview" && (
          <div className="p-5 rounded-xl border border-border bg-card text-foreground text-sm leading-relaxed overflow-x-auto">
            <div dangerouslySetInnerHTML={{ __html: renderedPreview }} />
          </div>
        )}

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
              <div className="text-xs text-muted-foreground font-medium">Total Words</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.wordCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Headings</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.headingsCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">GFM Tables</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.tablesCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Fenced Code Blocks</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.codeBlocksCount}</div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
