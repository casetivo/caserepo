"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type RegexMode = "match" | "replace";

interface RegexStats {
  matchCount: number;
  groupsCount: number;
  inputLength: number;
  hasMatches: boolean;
}

const REGEX_PRESETS = [
  {
    name: "Email Addresses",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "g",
    description: "Matches standard RFC 5322 email patterns",
  },
  {
    name: "URLs / Links",
    pattern: "https?:\\/\\/[^\\s/$.?#].[^\\s]*",
    flags: "g",
    description: "Matches HTTP and HTTPS web addresses",
  },
  {
    name: "IPv4 Addresses",
    pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
    flags: "g",
    description: "Matches 4-octet IP addresses",
  },
  {
    name: "Dates (YYYY-MM-DD)",
    pattern: "\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b",
    flags: "g",
    description: "Matches ISO 8601 calendar date formats",
  },
  {
    name: "Hex Colors",
    pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b",
    flags: "g",
    description: "Matches 3-digit and 6-digit hex color codes",
  },
  {
    name: "Phone Numbers",
    pattern: "\\b(?:\\+?\\d{1,3}[-.\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}\\b",
    flags: "g",
    description: "Matches US and international phone formats",
  },
];

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [pattern, setPattern] = useState("");
  const [replacement, setReplacement] = useState("");
  const [mode, setMode] = useState<RegexMode>("match");

  // Regex Flags
  const [flagG, setFlagG] = useState(true);
  const [flagI, setFlagI] = useState(false);
  const [flagM, setFlagM] = useState(false);
  const [flagS, setFlagS] = useState(false);
  const [flagU, setFlagU] = useState(false);

  const [stats, setStats] = useState<RegexStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const patternId = useId();
  const replacementId = useId();

  // Assemble active flag string
  const getActiveFlags = useCallback(
    (g: boolean, i: boolean, m: boolean, s: boolean, u: boolean): string => {
      let flags = "";
      if (g) flags += "g";
      if (i) flags += "i";
      if (m) flags += "m";
      if (s) flags += "s";
      if (u) flags += "u";
      return flags;
    },
    []
  );

  // Execute Regex Match or Replace
  const executeRegex = useCallback(
    (
      text: string,
      pat: string,
      rep: string,
      currMode: RegexMode,
      g: boolean,
      i: boolean,
      m: boolean,
      s: boolean,
      u: boolean
    ) => {
      if (!text.trim()) {
        setOutput("");
        setStats(null);
        setErrorMsg(null);
        return;
      }

      if (!pat.trim()) {
        setOutput("");
        setStats(null);
        setErrorMsg("Please enter a regular expression pattern.");
        return;
      }

      try {
        const flagStr = getActiveFlags(g, i, m, s, u);
        const rx = new RegExp(pat, flagStr);
        setErrorMsg(null);

        if (currMode === "match") {
          // Match mode: extract matches
          if (g) {
            const matches = Array.from(text.matchAll(rx));
            if (!matches.length) {
              setOutput("No matches found.");
              setStats({
                matchCount: 0,
                groupsCount: 0,
                inputLength: text.length,
                hasMatches: false,
              });
              return;
            }

            const formatted = matches
              .map((m, idx) => {
                const fullMatch = `[Match ${idx + 1}]: ${m[0]}`;
                if (m.length > 1) {
                  const groups = m
                    .slice(1)
                    .map((gVal, gIdx) => `  Group ${gIdx + 1}: ${gVal !== undefined ? gVal : "[undefined]"}`)
                    .join("\n");
                  return `${fullMatch}\n${groups}`;
                }
                return fullMatch;
              })
              .join("\n\n");

            const totalGroups = matches.reduce((acc, curr) => acc + Math.max(0, curr.length - 1), 0);

            setOutput(formatted);
            setStats({
              matchCount: matches.length,
              groupsCount: totalGroups,
              inputLength: text.length,
              hasMatches: true,
            });
          } else {
            const match = text.match(rx);
            if (!match) {
              setOutput("No matches found.");
              setStats({
                matchCount: 0,
                groupsCount: 0,
                inputLength: text.length,
                hasMatches: false,
              });
              return;
            }

            let formatted = `[Match 1]: ${match[0]}`;
            if (match.length > 1) {
              const groups = match
                .slice(1)
                .map((gVal, gIdx) => `  Group ${gIdx + 1}: ${gVal !== undefined ? gVal : "[undefined]"}`)
                .join("\n");
              formatted += `\n${groups}`;
            }

            setOutput(formatted);
            setStats({
              matchCount: 1,
              groupsCount: Math.max(0, match.length - 1),
              inputLength: text.length,
              hasMatches: true,
            });
          }
        } else {
          // Replace mode
          // Compute match count first for telemetry
          const countMatches = (text.match(rx) || []).length;
          const replaced = text.replace(rx, rep);

          setOutput(replaced);
          setStats({
            matchCount: countMatches,
            groupsCount: 0,
            inputLength: text.length,
            hasMatches: countMatches > 0,
          });
        }
      } catch (err) {
        setOutput("");
        setStats(null);
        setErrorMsg((err as Error).message || "Invalid regular expression syntax.");
      }
    },
    [getActiveFlags]
  );

  const handleInputChange = (val: string) => {
    setInput(val);
    executeRegex(val, pattern, replacement, mode, flagG, flagI, flagM, flagS, flagU);
  };

  const handlePatternChange = (val: string) => {
    setPattern(val);
    executeRegex(input, val, replacement, mode, flagG, flagI, flagM, flagS, flagU);
  };

  const handleReplacementChange = (val: string) => {
    setReplacement(val);
    executeRegex(input, pattern, val, mode, flagG, flagI, flagM, flagS, flagU);
  };

  const handleModeChange = (newMode: RegexMode) => {
    setMode(newMode);
    executeRegex(input, pattern, replacement, newMode, flagG, flagI, flagM, flagS, flagU);
  };

  const handleFlagToggle = (
    which: "g" | "i" | "m" | "s" | "u",
    currentVal: boolean
  ) => {
    const newVal = !currentVal;
    let g = flagG,
      i = flagI,
      m = flagM,
      s = flagS,
      u = flagU;

    if (which === "g") {
      setFlagG(newVal);
      g = newVal;
    } else if (which === "i") {
      setFlagI(newVal);
      i = newVal;
    } else if (which === "m") {
      setFlagM(newVal);
      m = newVal;
    } else if (which === "s") {
      setFlagS(newVal);
      s = newVal;
    } else if (which === "u") {
      setFlagU(newVal);
      u = newVal;
    }

    executeRegex(input, pattern, replacement, mode, g, i, m, s, u);
  };

  const loadPreset = (preset: (typeof REGEX_PRESETS)[0]) => {
    setPattern(preset.pattern);
    setFlagG(preset.flags.includes("g"));
    setFlagI(preset.flags.includes("i"));
    executeRegex(
      input,
      preset.pattern,
      replacement,
      mode,
      preset.flags.includes("g"),
      preset.flags.includes("i"),
      flagM,
      flagS,
      flagU
    );
  };

  return (
    <TextToolLayout
      titleKey="regexTextTool"
      subtitleKey="regexTextToolSubtitle"
      actionLabelKey="regexTextToolAction"
      inputText={input}
      onInputChange={handleInputChange}
      outputText={output}
      onAction={() =>
        executeRegex(input, pattern, replacement, mode, flagG, flagI, flagM, flagS, flagU)
      }
      relatedPostSlugs={["how-to-test-regular-expressions"]}
    >
      <div className="flex flex-col gap-4 mt-2">
        {/* Controls Bar */}
        <div className="p-4 rounded-xl border border-border bg-card flex flex-col gap-3">
          {/* Top row: Mode selector + Flags */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Mode Switcher */}
            <div className="flex items-center border border-border rounded-lg p-0.5 bg-background">
              <button
                type="button"
                onClick={() => handleModeChange("match")}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  mode === "match"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Match &amp; Extract
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("replace")}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  mode === "replace"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Search &amp; Replace
              </button>
            </div>

            {/* Interactive Flag Checkboxes */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground font-semibold">Flags:</span>
              <button
                type="button"
                onClick={() => handleFlagToggle("g", flagG)}
                className={`px-2 py-0.5 rounded font-mono text-xs border transition-colors ${
                  flagG
                    ? "bg-primary/10 border-primary text-primary font-bold"
                    : "bg-background border-border text-muted-foreground"
                }`}
                title="Global match"
              >
                g (global)
              </button>
              <button
                type="button"
                onClick={() => handleFlagToggle("i", flagI)}
                className={`px-2 py-0.5 rounded font-mono text-xs border transition-colors ${
                  flagI
                    ? "bg-primary/10 border-primary text-primary font-bold"
                    : "bg-background border-border text-muted-foreground"
                }`}
                title="Case-insensitive"
              >
                i (ignore case)
              </button>
              <button
                type="button"
                onClick={() => handleFlagToggle("m", flagM)}
                className={`px-2 py-0.5 rounded font-mono text-xs border transition-colors ${
                  flagM
                    ? "bg-primary/10 border-primary text-primary font-bold"
                    : "bg-background border-border text-muted-foreground"
                }`}
                title="Multiline (^ and $ match line boundaries)"
              >
                m (multiline)
              </button>
              <button
                type="button"
                onClick={() => handleFlagToggle("s", flagS)}
                className={`px-2 py-0.5 rounded font-mono text-xs border transition-colors ${
                  flagS
                    ? "bg-primary/10 border-primary text-primary font-bold"
                    : "bg-background border-border text-muted-foreground"
                }`}
                title="dotAll (. matches newline)"
              >
                s (dotAll)
              </button>
              <button
                type="button"
                onClick={() => handleFlagToggle("u", flagU)}
                className={`px-2 py-0.5 rounded font-mono text-xs border transition-colors ${
                  flagU
                    ? "bg-primary/10 border-primary text-primary font-bold"
                    : "bg-background border-border text-muted-foreground"
                }`}
                title="Unicode full code points"
              >
                u (unicode)
              </button>
            </div>
          </div>

          {/* Regex Pattern Input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor={patternId} className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Regular Expression Pattern:</span>
              <span className="text-[11px] font-mono text-muted-foreground">
                /{pattern || "..."}/{getActiveFlags(flagG, flagI, flagM, flagS, flagU)}
              </span>
            </label>
            <input
              id={patternId}
              type="text"
              value={pattern}
              onChange={(e) => handlePatternChange(e.target.value)}
              placeholder="e.g. \b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-xs font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Replacement Input (Only visible in Replace mode) */}
          {mode === "replace" && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor={replacementId} className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Replacement String:</span>
                <span className="text-[11px] text-muted-foreground">Supports $1, $2, $&amp; capture references</span>
              </label>
              <input
                id={replacementId}
                type="text"
                value={replacement}
                onChange={(e) => handleReplacementChange(e.target.value)}
                placeholder="e.g. [REDACTED EMAIL] or $1-$2"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-xs font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
        </div>

        {/* Quick Pattern Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium">Common Patterns:</span>
          {REGEX_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => loadPreset(preset)}
              className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Syntax Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Regex Syntax Error:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Matches Found</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.matchCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Capture Groups</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.groupsCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Input Characters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.inputLength}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Match Status</div>
              <div
                className={`text-base sm:text-lg font-bold ${
                  stats.hasMatches ? "text-green-500" : "text-muted-foreground"
                }`}
              >
                {stats.hasMatches ? "Matched" : "No Match"}
              </div>
            </div>
          </div>
        )}

        {/* Related Code & Data Utilities */}
        <div className="mt-2 p-3.5 rounded-xl border border-border bg-muted/20 text-xs flex flex-wrap items-center justify-between gap-3">
          <span className="text-muted-foreground">Related Code Utilities:</span>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/javascript-formatter" className="text-primary hover:underline font-medium">
              JavaScript Formatter
            </a>
            <span className="text-border">•</span>
            <a href="/json-formatter" className="text-primary hover:underline font-medium">
              JSON Formatter
            </a>
            <span className="text-border">•</span>
            <a href="/html-formatter" className="text-primary hover:underline font-medium">
              HTML Formatter
            </a>
            <span className="text-border">•</span>
            <a href="/csv-to-json-converter" className="text-primary hover:underline font-medium">
              CSV to JSON
            </a>
            <span className="text-border">•</span>
            <a href="/blog/how-to-test-regular-expressions" className="text-primary hover:underline font-medium">
              Regex Guide
            </a>
          </div>
        </div>
      </div>
    </TextToolLayout>
  );
}
