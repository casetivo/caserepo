"use client";

import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";

interface ReplaceRule {
  id: string;
  find: string;
  replace: string;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [rules, setRules] = useState<ReplaceRule[]>([
    { id: "1", find: "", replace: "" },
  ]);

  // Options
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(true);
  const [useRegex, setUseRegex] = useState(false);

  const [stats, setStats] = useState<{
    matchesCount: number;
    originalLength: number;
    outputLength: number;
  } | null>(null);

  const addRule = () => {
    setRules(prev => [...prev, { id: String(Date.now()), find: "", replace: "" }]);
  };

  const removeRule = (id: string) => {
    if (rules.length <= 1) return;
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const updateRule = (id: string, field: "find" | "replace", val: string) => {
    setRules(prev =>
      prev.map(r => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const applyPreset = (preset: "spacesToCommas" | "commasToLines" | "linesToCommas" | "doubleSpaces" | "underscoreToHyphen") => {
    if (preset === "doubleSpaces") {
      setRules([{ id: "1", find: "  ", replace: " " }]);
      setUseRegex(false);
      setWholeWord(false);
    } else if (preset === "spacesToCommas") {
      setRules([{ id: "1", find: " ", replace: ", " }]);
      setUseRegex(false);
      setWholeWord(false);
    } else if (preset === "commasToLines") {
      setRules([{ id: "1", find: ",\\s*", replace: "\\n" }]);
      setUseRegex(true);
      setWholeWord(false);
    } else if (preset === "linesToCommas") {
      setRules([{ id: "1", find: "\\n+", replace: ", " }]);
      setUseRegex(true);
      setWholeWord(false);
    } else if (preset === "underscoreToHyphen") {
      setRules([{ id: "1", find: "_", replace: "-" }]);
      setUseRegex(false);
      setWholeWord(false);
    }
  };

  const handleAction = useCallback(() => {
    if (!input) {
      setOutput("");
      setStats(null);
      return;
    }

    let result = input;
    let totalMatches = 0;

    for (const rule of rules) {
      if (!rule.find) continue;

      try {
        let regex: RegExp;
        const flags = caseSensitive ? "g" : "gi";

        if (useRegex) {
          // Unescape \n or \t in replacement string if entered
          const safeReplacement = rule.replace
            .replace(/\\n/g, "\n")
            .replace(/\\t/g, "\t");

          regex = new RegExp(rule.find, flags);
          const found = result.match(regex);
          if (found) totalMatches += found.length;
          result = result.replace(regex, safeReplacement);
        } else {
          // Literal string match with optional whole-word boundary
          let escaped = rule.find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          if (wholeWord) {
            escaped = `\\b${escaped}\\b`;
          }
          regex = new RegExp(escaped, flags);

          const found = result.match(regex);
          if (found) totalMatches += found.length;
          result = result.replace(regex, rule.replace);
        }
      } catch (err) {
        // If invalid regex is typed, skip rule gracefully
        console.error("Invalid regex:", err);
      }
    }

    setOutput(result);
    setStats({
      matchesCount: totalMatches,
      originalLength: input.length,
      outputLength: result.length,
    });
  }, [input, rules, caseSensitive, wholeWord, useRegex]);

  return (
    <TextToolLayout
      titleKey="textReplacementTool"
      subtitleKey="textReplacementToolSubtitle"
      actionLabelKey="textReplacementToolAction"
      inputText={input}
      onInputChange={t => {
        setInput(t);
        if (!t) {
          setOutput("");
          setStats(null);
        }
      }}
      outputText={output}
      onAction={handleAction}
      relatedPostSlugs={[
        "how-to-strip-formatting-and-convert-to-plain-text",
        "how-to-remove-duplicate-lines-from-text",
        "how-to-rewrite-sentences-for-clarity-and-impact",
      ]}
      relatedPostsTitle="Text Transformation & Clean Tools"
    >
      <div className="flex flex-col gap-4">
        {/* Quick Helper Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground mr-1">Quick Presets:</span>
          {[
            { id: "doubleSpaces", label: "Double Spaces &rarr; Single" },
            { id: "commasToLines", label: "Commas &rarr; Newlines" },
            { id: "linesToCommas", label: "Newlines &rarr; Commas" },
            { id: "underscoreToHyphen", label: "_ Underscore &rarr; - Hyphen" },
          ].map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p.id as any)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium border border-border bg-card text-foreground hover:bg-accent transition-all"
              dangerouslySetInnerHTML={{ __html: p.label }}
            />
          ))}
        </div>

        {/* Find & Replace Rules Box */}
        <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-card/60">
          <div className="flex items-center justify-between pb-1 border-b border-border/60">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider">
              Replacement Rules
            </span>
            <button
              type="button"
              onClick={addRule}
              className="px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-all"
            >
              + Add Rule
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {rules.map((rule, idx) => (
              <div
                key={rule.id}
                className="flex flex-col sm:flex-row items-center gap-2.5 w-full"
              >
                <div className="flex items-center gap-2 w-full sm:flex-1">
                  <span className="text-xs font-semibold text-muted-foreground w-12 text-right">
                    Find {rules.length > 1 ? `#${idx + 1}` : ""}:
                  </span>
                  <input
                    type="text"
                    value={rule.find}
                    onChange={e => updateRule(rule.id, "find", e.target.value)}
                    placeholder="Word or phrase to find..."
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:flex-1">
                  <span className="text-xs font-semibold text-muted-foreground w-14 text-right">
                    Replace:
                  </span>
                  <input
                    type="text"
                    value={rule.replace}
                    onChange={e => updateRule(rule.id, "replace", e.target.value)}
                    placeholder="Replacement text (leave empty to delete)..."
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  {rules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRule(rule.id)}
                      className="px-2 py-1 text-xs text-muted-foreground hover:text-destructive rounded border border-border hover:border-destructive/40 transition-all"
                      title="Remove this rule"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Configuration Toggles */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 border-t border-border/60 text-xs sm:text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
              <input
                type="checkbox"
                checked={wholeWord}
                disabled={useRegex}
                onChange={e => setWholeWord(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer disabled:opacity-40"
              />
              <span className={`font-medium ${useRegex ? "opacity-40" : ""}`}>
                Match Whole Words Only (Prevent &quot;cat&quot; in &quot;category&quot;)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={e => setCaseSensitive(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-medium">Case Sensitive</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none text-foreground">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={e => setUseRegex(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-medium text-amber-600 dark:text-amber-400">
                Regular Expression (Regex)
              </span>
            </label>
          </div>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-primary/30 bg-primary/5">
              <div className="text-xs text-muted-foreground font-medium">Matches Replaced</div>
              <div className="text-base sm:text-lg font-bold text-primary">
                {stats.matchesCount}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Original Length</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.originalLength}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Output Length</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.outputLength}
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
