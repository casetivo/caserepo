"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type ViewTab = "html" | "preview";

interface MdStats {
  words: number;
  characters: number;
  headingsCount: number;
  linksCount: number;
  codeBlocksCount: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState<ViewTab>("html");
  const [wrapDocument, setWrapDocument] = useState(false);
  const [stats, setStats] = useState<MdStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const docWrapId = useId();

  // Full-featured GitHub Flavored Markdown (GFM) to HTML parser
  const parseMarkdownToHtml = (md: string, asFullDoc: boolean): string => {
    if (!md.trim()) return "";

    let html = md.replace(/\r\n/g, "\n");

    // 1. Fenced Code Blocks (```lang ... ```)
    html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<pre><code class="language-${lang || 'plaintext'}">${escaped}</code></pre>`;
    });

    // 2. GFM Tables
    html = html.replace(/((?:\|[^\n]+\|\r?\n)+)/g, match => {
      const rows = match.trim().split("\n");
      if (rows.length < 2) return match;

      let tableHtml = "<table>\n";
      let isHeader = true;

      for (let r = 0; r < rows.length; r++) {
        const row = rows[r].trim();
        // Skip delimiter row (e.g. |---|---|)
        if (/^\|[-:\s|]+\|$/.test(row)) {
          isHeader = false;
          continue;
        }

        const cells = row
          .split("|")
          .slice(1, -1)
          .map(c => c.trim());

        const tag = isHeader ? "th" : "td";
        tableHtml += "  <tr>\n";
        cells.forEach(cell => {
          tableHtml += `    <${tag}>${cell}</${tag}>\n`;
        });
        tableHtml += "  </tr>\n";
      }

      tableHtml += "</table>";
      return tableHtml;
    });

    // 3. Headings (# to ######)
    html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
    html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
    html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
    html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

    // 4. Blockquotes
    html = html.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");

    // 5. Horizontal rules
    html = html.replace(/^(\*{3,}|-{3,}|_{3,})$/gm, "<hr />");

    // 6. GFM Task Lists (- [ ] or - [x])
    html = html.replace(/^\s*-\s+\[ \]\s+(.+)$/gm, '<li class="task-list-item"><input type="checkbox" disabled /> $1</li>');
    html = html.replace(/^\s*-\s+\[x\]\s+(.+)$/gmi, '<li class="task-list-item"><input type="checkbox" checked disabled /> $1</li>');

    // 7. Unordered Lists (- or *)
    html = html.replace(/^\s*[-*+]\s+(.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>\n$1\n</ul>");
    html = html.replace(/<\/ul>\s*<ul>/g, ""); // Collapse adjacent list groups

    // 8. Ordered Lists (1. item)
    html = html.replace(/^\s*\d+\.\s+(.+)$/gm, "<ol-item>$1</ol-item>");
    html = html.replace(/(<ol-item>[\s\S]*?<\/ol-item>)/g, "<ol>\n$1\n</ol>");
    html = html.replace(/<\/ol>\s*<ol>/g, "");
    html = html.replace(/<ol-item>/g, "<li>").replace(/<\/ol-item>/g, "</li>");

    // 9. Inline formatting
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    html = html.replace(/_([^_]+)_/g, "<em>$1</em>");
    html = html.replace(/~~([^~]+)~~/g, "<del>$1</del>");

    // 10. Images and Links
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // 11. Paragraph wrapping
    const paragraphs = html.split(/\n\s*\n/);
    const wrapped = paragraphs
      .map(p => {
        const trimmed = p.trim();
        if (!trimmed) return "";
        // Don't wrap elements that are already block tags
        if (/^<(h[1-6]|ul|ol|pre|blockquote|table|hr)/i.test(trimmed)) {
          return trimmed;
        }
        return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
      })
      .filter(Boolean)
      .join("\n\n");

    if (asFullDoc) {
      return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Converted Document</title>\n</head>\n<body>\n${wrapped.split("\n").map(l => "  " + l).join("\n")}\n</body>\n</html>`;
    }

    return wrapped;
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setErrorMsg(null);
      return;
    }

    try {
      const htmlResult = parseMarkdownToHtml(input, wrapDocument);
      setOutput(htmlResult);
      setErrorMsg(null);

      // Compute statistics
      const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
      const headings = (input.match(/^#{1,6}\s+/gm) || []).length;
      const links = (input.match(/\[[^\]]+\]\([^)]+\)/g) || []).length;
      const codeBlocks = (input.match(/```/g) || []).length / 2;

      setStats({
        words: wordCount,
        characters: input.length,
        headingsCount: headings,
        linksCount: links,
        codeBlocksCount: Math.floor(codeBlocks),
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to convert Markdown.");
      setOutput(`<!-- Markdown Parser Error:\n  ${err.message || "Invalid syntax"}\n-->`);
      setStats(null);
    }
  }, [input, wrapDocument]);

  const loadSample = () => {
    const sample = `# Welcome to Casetivo Markdown Converter

Transform your plain text notes into **clean HTML5** code in seconds.

## Feature Highlights
- Fast and **100% private** in-browser processing
- Supports *GitHub Flavored Markdown* (GFM)
- Auto-compiles [code snippets](https://casetivo.com) and tables

| Feature | Supported | Performance |
| :--- | :---: | :--- |
| Tables | Yes | Lightning Fast |
| Task Lists | Yes | Real-Time |
| Code Syntax | Yes | Zero Overhead |

> "Markdown allows you to write using an easy-to-read, easy-to-write plain text format."

\`\`\`typescript
const greeting: string = "Hello, Casetivo!";
console.log(greeting);
\`\`\`

- [x] Write documentation in Markdown
- [x] Convert to semantic HTML
- [ ] Deploy to production`;
    setInput(sample);
  };

  return (
    <TextToolLayout
      titleKey="markdownToHtmlConverter"
      subtitleKey="markdownToHtmlConverterSubtitle"
      actionLabelKey="markdownToHtmlConverterAction"
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
        "how-to-convert-markdown-to-html",
        "how-to-format-and-clean-html",
        "how-to-strip-formatting-and-convert-to-plain-text",
      ]}
      relatedPostsTitle="Markdown, HTML & Content Publishing Guides"
    >
      <div className="flex flex-col gap-4">
        {/* View Switcher & Options Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Tab Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Output View:</span>
            {[
              { id: "html", label: "HTML Source Code" },
              { id: "preview", label: "Live Visual Preview" },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as ViewTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample Markdown
          </button>
        </div>

        {/* Document Wrapping Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          <label htmlFor={docWrapId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
            <input
              id={docWrapId}
              type="checkbox"
              checked={wrapDocument}
              onChange={e => setWrapDocument(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
            />
            <span>Wrap in Full HTML5 Boilerplate (<code>&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;body&gt;</code>)</span>
          </label>

          <span className="text-xs text-muted-foreground">
            Supports GFM Tables, Fenced Code, Strikethrough (~~), &amp; Task Lists
          </span>
        </div>

        {/* Live Preview Render Box (when activeTab is preview) */}
        {activeTab === "preview" && output && (
          <div className="p-5 rounded-xl border border-border bg-card text-foreground prose dark:prose-invert max-w-none text-sm leading-relaxed overflow-x-auto">
            <div dangerouslySetInnerHTML={{ __html: output }} />
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
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 max-w-3xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Word Count</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.words}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Characters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.characters}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Headings</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.headingsCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Hyperlinks</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.linksCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Code Blocks</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.codeBlocksCount}</div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
