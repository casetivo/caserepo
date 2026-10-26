"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type ColAlign = "left" | "center" | "right";
type DelimType = "auto" | "," | "\t" | "|";

interface TableStats {
  rowsCount: number;
  colsCount: number;
  totalCells: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [align, setAlign] = useState<ColAlign>("left");
  const [delimiter, setDelimiter] = useState<DelimType>("auto");
  const [firstRowHeader, setFirstRowHeader] = useState(true);
  const [activeTab, setActiveTab] = useState<"markdown" | "preview">("markdown");
  const [stats, setStats] = useState<TableStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const headerId = useId();

  // Resolve delimiter automatically if needed
  const detectDelimiter = (text: string, selected: DelimType): string => {
    if (selected !== "auto") return selected;
    const firstLine = text.trim().split("\n")[0] || "";
    if (firstLine.includes("\t")) return "\t";
    if (firstLine.includes("|")) return "|";
    return ",";
  };

  // Generate aligned Markdown Table
  const generateMarkdownTable = (
    rawText: string,
    delim: DelimType,
    alignment: ColAlign,
    isHeader: boolean
  ): string => {
    const lines = rawText.trim().split("\n").filter(l => l.trim().length > 0);
    if (!lines.length) return "";

    const sep = detectDelimiter(rawText, delim);

    // Parse rows based on delimiter
    const rows: string[][] = lines.map(line => {
      let tokens: string[];
      if (sep === "|") {
        tokens = line
          .split("|")
          .map(c => c.trim())
          .filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1);
        if (!tokens.length) {
          tokens = line.split("|").map(c => c.trim());
        }
      } else {
        tokens = line.split(sep).map(c => c.trim().replace(/^"|"$/g, ""));
      }
      return tokens;
    });

    const colCount = Math.max(...rows.map(r => r.length));
    if (colCount === 0) return "";

    // Normalize rows to uniform width
    const normalized = rows.map(r => {
      const rowCopy = [...r];
      while (rowCopy.length < colCount) {
        rowCopy.push("");
      }
      return rowCopy;
    });

    // Calculate maximum width for each column
    const colWidths: number[] = Array.from({ length: colCount }, (_, colIdx) => {
      let maxLen = 3; // minimum width
      normalized.forEach(row => {
        const cellLen = (row[colIdx] || "").length;
        if (cellLen > maxLen) maxLen = cellLen;
      });
      return maxLen;
    });

    // Alignment marker separator generator
    const getAlignMarker = (width: number, colAlignment: ColAlign): string => {
      if (colAlignment === "center") {
        return `:${"-".repeat(Math.max(1, width - 2))}:`;
      }
      if (colAlignment === "right") {
        return `${"-".repeat(Math.max(2, width - 1))}:`;
      }
      // default left
      return `:${"-".repeat(Math.max(2, width - 1))}`;
    };

    const formatRow = (cells: string[]) => {
      return (
        "| " +
        cells
          .map((c, i) => {
            const width = colWidths[i];
            if (alignment === "right") {
              return c.padStart(width);
            }
            if (alignment === "center") {
              const totalPadding = width - c.length;
              const padLeft = Math.floor(totalPadding / 2);
              const padRight = totalPadding - padLeft;
              return " ".repeat(padLeft) + c + " ".repeat(padRight);
            }
            return c.padEnd(width);
          })
          .join(" | ") +
        " |"
      );
    };

    const separatorLine =
      "| " + colWidths.map(w => getAlignMarker(w, alignment)).join(" | ") + " |";

    if (isHeader) {
      const headerRow = formatRow(normalized[0]);
      const dataRows = normalized.slice(1).map(formatRow);
      return [headerRow, separatorLine, ...dataRows].join("\n");
    } else {
      const genericHeaders = Array.from({ length: colCount }, (_, i) => `Col ${i + 1}`);
      const headerRow = formatRow(genericHeaders);
      const dataRows = normalized.map(formatRow);
      return [headerRow, separatorLine, ...dataRows].join("\n");
    }
  };

  // Simple HTML renderer for preview tab
  const renderPreviewTable = (mdTable: string): string => {
    const lines = mdTable.trim().split("\n");
    if (lines.length < 2) return "";

    let html = '<table class="w-full my-2 text-xs border-collapse border border-border">\n';
    let isHeader = true;

    for (let r = 0; r < lines.length; r++) {
      const line = lines[r].trim();
      if (/^\|[-:\s|]+\|$/.test(line)) {
        isHeader = false;
        continue;
      }

      const cells = line
        .split("|")
        .slice(1, -1)
        .map(c => c.trim());

      const tag = isHeader ? "th" : "td";
      const cls = isHeader
        ? "border border-border p-2.5 bg-muted/70 font-bold text-foreground text-left"
        : "border border-border p-2 text-foreground/90";

      html += `  <tr>${cells.map(c => `<${tag} class="${cls}">${c}</${tag}>`).join("")}</tr>\n`;
    }

    html += "</table>";
    return html;
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setErrorMsg(null);
      return;
    }

    try {
      const table = generateMarkdownTable(input, delimiter, align, firstRowHeader);
      setOutput(table);
      setErrorMsg(null);

      const lines = input.trim().split("\n").filter(l => l.trim().length > 0);
      const sep = detectDelimiter(input, delimiter);
      const firstLineCols = lines[0]?.split(sep).length || 0;

      setStats({
        rowsCount: firstRowHeader ? Math.max(0, lines.length - 1) : lines.length,
        colsCount: firstLineCols,
        totalCells: lines.length * firstLineCols,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to parse table data.");
      setOutput(`<!-- Error generating table: ${err.message || "Check delimiters"} -->`);
      setStats(null);
    }
  }, [input, delimiter, align, firstRowHeader]);

  const loadSample = () => {
    const sample = `Feature,Supported,Performance,Notes
Pipe Tables,Yes,Instant,GFM standard
Column Alignment,Yes,Real-time,Left / Center / Right
CSV Import,Yes,100% Client-side,Zero server latency
Spreadsheet Paste,Yes,Instant,Copy straight from Excel`;
    setInput(sample);
  };

  return (
    <TextToolLayout
      titleKey="markdownTableGenerator"
      subtitleKey="markdownTableGeneratorSubtitle"
      actionLabelKey="markdownTableGeneratorAction"
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
        "how-to-create-markdown-tables",
        "how-to-format-and-preview-markdown",
        "how-to-convert-markdown-to-html",
      ]}
      relatedPostsTitle="Markdown, Tables & Documentation Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Alignment Selection */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Align Columns:</span>
            {[
              { id: "left", label: "Left (:---)" },
              { id: "center", label: "Center (:---:)" },
              { id: "right", label: "Right (---:)" },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAlign(item.id as ColAlign)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  align === item.id
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
            Load Sample CSV
          </button>
        </div>

        {/* Delimiter & Options Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          {/* Delimiter Selection */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Input Format:</span>
            {[
              { id: "auto", label: "Auto-Detect" },
              { id: ",", label: "CSV (,)" },
              { id: "\t", label: "Excel / TSV (Tab)" },
              { id: "|", label: "Pipes (|)" },
            ].map(d => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDelimiter(d.id as DelimType)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  delimiter === d.id
                    ? "bg-primary/90 text-primary-foreground"
                    : "border border-border/80 bg-background hover:bg-accent text-foreground"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor={headerId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
              <input
                id={headerId}
                type="checkbox"
                checked={firstRowHeader}
                onChange={e => setFirstRowHeader(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
              />
              <span>First Line is Header</span>
            </label>

            {/* View Switcher */}
            <div className="flex items-center border border-border rounded-lg p-0.5 bg-background">
              <button
                type="button"
                onClick={() => setActiveTab("markdown")}
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  activeTab === "markdown" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                Markdown Code
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  activeTab === "preview" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                Visual Preview
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Render Box (when activeTab is preview) */}
        {activeTab === "preview" && output && (
          <div className="p-5 rounded-xl border border-border bg-card text-foreground text-sm leading-relaxed overflow-x-auto">
            <div dangerouslySetInnerHTML={{ __html: renderPreviewTable(output) }} />
          </div>
        )}

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Notice:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-w-xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Data Rows</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.rowsCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Columns Count</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.colsCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Total Table Cells</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.totalCells}</div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
