"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type DelimiterType = "auto" | "," | ";" | "\t" | "|";
type OutputFormat = "array-of-objects" | "array-of-arrays" | "keyed-object";

interface ConversionStats {
  rowCount: number;
  colCount: number;
  detectedDelimiter: string;
  outputSizeKB: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState<DelimiterType>("auto");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("array-of-objects");
  const [hasHeader, setHasHeader] = useState(true);
  const [parseTypes, setParseTypes] = useState(true);
  const [stats, setStats] = useState<ConversionStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const headerId = useId();
  const typesId = useId();

  // Detect delimiter automatically if set to "auto"
  const resolveDelimiter = (text: string, selected: DelimiterType): string => {
    if (selected !== "auto") return selected;
    const firstLine = text.trim().split("\n")[0] || "";
    const counts = {
      ",": (firstLine.match(/,/g) || []).length,
      "\t": (firstLine.match(/\t/g) || []).length,
      ";": (firstLine.match(/;/g) || []).length,
      "|": (firstLine.match(/\|/g) || []).length,
    };
    let maxDelim = ",";
    let maxCount = -1;
    (Object.keys(counts) as Array<keyof typeof counts>).forEach(d => {
      if (counts[d] > maxCount) {
        maxCount = counts[d];
        maxDelim = d;
      }
    });
    return maxCount > 0 ? maxDelim : ",";
  };

  // Robust RFC 4180 CSV parser supporting escaped quotes and commas inside cells
  const parseCsvRows = (text: string, sep: string): string[][] => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentCell = "";
    let insideQuotes = false;
    let i = 0;

    const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    while (i < normalized.length) {
      const char = normalized[i];
      const nextChar = normalized[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          // Escaped double quote ("")
          currentCell += '"';
          i += 2;
          continue;
        } else {
          // Toggle quote state
          insideQuotes = !insideQuotes;
          i++;
          continue;
        }
      }

      if (!insideQuotes) {
        if (char === sep) {
          currentRow.push(currentCell.trim());
          currentCell = "";
          i++;
          continue;
        }

        if (char === "\n") {
          currentRow.push(currentCell.trim());
          if (currentRow.some(c => c.length > 0)) {
            rows.push(currentRow);
          }
          currentRow = [];
          currentCell = "";
          i++;
          continue;
        }
      }

      currentCell += char;
      i++;
    }

    if (currentCell.length > 0 || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      if (currentRow.some(c => c.length > 0)) {
        rows.push(currentRow);
      }
    }

    return rows;
  };

  // Convert string token to native boolean, number, null, or string
  const coerceValue = (val: string, shouldCoerce: boolean): any => {
    if (!shouldCoerce) return val;
    if (val === "") return null;
    if (val.toLowerCase() === "true") return true;
    if (val.toLowerCase() === "false") return false;
    if (val.toLowerCase() === "null") return null;

    // Strict numeric check (avoid converting phone numbers with leading zeroes like "0123")
    if (!/^0\d+/.test(val) && !isNaN(Number(val)) && val.trim() !== "") {
      return Number(val);
    }
    return val;
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setErrorMsg(null);
      return;
    }

    try {
      const actualDelimiter = resolveDelimiter(input, delimiter);
      const rows = parseCsvRows(input, actualDelimiter);

      if (rows.length === 0) {
        setOutput("[]");
        setErrorMsg("No valid data rows found in input.");
        return;
      }

      let jsonResult: any;

      if (outputFormat === "array-of-arrays") {
        jsonResult = rows.map(r => r.map(cell => coerceValue(cell, parseTypes)));
      } else if (!hasHeader) {
        // No header: output array of objects with generic keys (col1, col2, ...)
        const colLength = Math.max(...rows.map(r => r.length));
        jsonResult = rows.map(row => {
          const obj: Record<string, any> = {};
          for (let c = 0; c < colLength; c++) {
            obj[`column_${c + 1}`] = coerceValue(row[c] || "", parseTypes);
          }
          return obj;
        });
      } else {
        // Standard array of objects with first row as headers
        const headers = rows[0].map((h, idx) => (h ? h : `field_${idx + 1}`));
        const dataRows = rows.slice(1);

        if (outputFormat === "keyed-object") {
          // First column acts as primary key
          const keyedObj: Record<string, any> = {};
          dataRows.forEach((row, rowIdx) => {
            const primaryKey = row[0] || `row_${rowIdx + 1}`;
            const rowData: Record<string, any> = {};
            headers.slice(1).forEach((header, colIdx) => {
              rowData[header] = coerceValue(row[colIdx + 1] || "", parseTypes);
            });
            keyedObj[primaryKey] = rowData;
          });
          jsonResult = keyedObj;
        } else {
          // Standard Array of Objects
          jsonResult = dataRows.map(row => {
            const obj: Record<string, any> = {};
            headers.forEach((header, colIdx) => {
              obj[header] = coerceValue(row[colIdx] || "", parseTypes);
            });
            return obj;
          });
        }
      }

      const formattedJson = JSON.stringify(jsonResult, null, 2);
      setOutput(formattedJson);
      setErrorMsg(null);

      const delimiterLabel =
        actualDelimiter === "\t"
          ? "Tab"
          : actualDelimiter === ","
          ? "Comma (,)"
          : actualDelimiter === ";"
          ? "Semicolon (;)"
          : "Pipe (|)";

      setStats({
        rowCount: hasHeader && outputFormat !== "array-of-arrays" ? rows.length - 1 : rows.length,
        colCount: rows[0]?.length || 0,
        detectedDelimiter: delimiterLabel,
        outputSizeKB: parseFloat((new Blob([formattedJson]).size / 1024).toFixed(2)),
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to parse CSV.");
      setOutput(`// Error parsing CSV:\n// ${err.message || "Check your quotes and delimiters."}`);
      setStats(null);
    }
  }, [input, delimiter, outputFormat, hasHeader, parseTypes]);

  const loadSampleCsv = () => {
    const sample = `id,product_name,category,price,in_stock,rating
1,"Ultra Wireless Headphones",Electronics,129.99,true,4.8
2,"Mechanical Gaming Keyboard",Electronics,89.50,true,4.6
3,"Ergonomic Desk Chair, Black Edition",Furniture,249.00,false,4.7
4,"Ceramic Coffee Mug (16oz)",Kitchen,14.25,true,4.9`;
    setInput(sample);
  };

  return (
    <TextToolLayout
      titleKey="csvToJsonConverter"
      subtitleKey="csvToJsonConverterSubtitle"
      actionLabelKey="csvToJsonConverterAction"
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
        "how-to-convert-csv-to-json",
        "what-is-json-formatter",
        "how-to-format-json-online",
      ]}
      relatedPostsTitle="CSV, JSON & Data Transformation Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Settings Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Delimiter Selection */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Delimiter:</span>
            {[
              { id: "auto", label: "Auto-Detect" },
              { id: ",", label: "Comma (,)" },
              { id: ";", label: "Semicolon (;)" },
              { id: "\t", label: "Tab (TSV)" },
              { id: "|", label: "Pipe (|)" },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setDelimiter(item.id as DelimiterType)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  delimiter === item.id
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
            onClick={loadSampleCsv}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample CSV
          </button>
        </div>

        {/* Structure & Coercion Options */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          {/* Output Format */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Structure:</span>
            {[
              { id: "array-of-objects", label: "Array of Objects [ { } ]" },
              { id: "array-of-arrays", label: "Matrix [ [ ] ]" },
              { id: "keyed-object", label: "Keyed by 1st Column" },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setOutputFormat(item.id as OutputFormat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  outputFormat === item.id
                    ? "bg-primary/90 text-primary-foreground"
                    : "border border-border/80 bg-background hover:bg-accent text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-4">
            <label htmlFor={headerId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
              <input
                id={headerId}
                type="checkbox"
                checked={hasHeader}
                onChange={e => setHasHeader(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
              />
              <span>First Row is Header</span>
            </label>

            <label htmlFor={typesId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
              <input
                id={typesId}
                type="checkbox"
                checked={parseTypes}
                onChange={e => setParseTypes(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
              />
              <span>Parse Numbers &amp; Booleans</span>
            </label>
          </div>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Error:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Statistics Bar */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Data Records</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.rowCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Columns / Fields</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.colCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Delimiter Used</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.detectedDelimiter}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">JSON Size</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.outputSizeKB} KB
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
