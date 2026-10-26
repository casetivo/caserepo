"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type CipherMode = "encrypt" | "decrypt" | "brute-force";

interface CipherStats {
  letterCount: number;
  wordCount: number;
  mostFrequentChar: string;
  shiftUsed: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<CipherMode>("encrypt");
  const [preserveCase, setPreserveCase] = useState(true);
  const [stats, setStats] = useState<CipherStats | null>(null);
  const [allShifts, setAllShifts] = useState<{ shift: number; text: string }[] | null>(null);
  const preserveCaseId = useId();

  // Core Caesar shift algorithm
  const applyShift = (text: string, shiftVal: number, keepCase: boolean): string => {
    const s = ((shiftVal % 26) + 26) % 26; // Normalize negative or >25 shifts

    return text.replace(/[a-zA-Z]/g, char => {
      const isUpper = char <= "Z";
      const base = isUpper ? 65 : 97;
      const charCode = char.charCodeAt(0) - base;
      const shifted = (charCode + s) % 26;
      const resultChar = String.fromCharCode(shifted + base);

      if (!keepCase) {
        return resultChar.toLowerCase();
      }
      return resultChar;
    });
  };

  // Find most frequent letter in text to aid frequency analysis
  const getMostFrequentLetter = (text: string): string => {
    const counts: Record<string, number> = {};
    const letters = text.toLowerCase().match(/[a-z]/g) || [];
    if (!letters.length) return "N/A";

    letters.forEach(l => {
      counts[l] = (counts[l] || 0) + 1;
    });

    let maxChar = letters[0] || "E";
    let maxCount = 0;
    Object.entries(counts).forEach(([char, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxChar = char;
      }
    });

    return `${maxChar.toUpperCase()} (${maxCount}x)`;
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setAllShifts(null);
      return;
    }

    if (mode === "brute-force") {
      // Generate all 25 possible shifts
      const shifts: { shift: number; text: string }[] = [];
      const lines: string[] = [];

      for (let s = 1; s <= 25; s++) {
        // In decode brute-force, shift backwards by s
        const decoded = applyShift(input, -s, preserveCase);
        shifts.push({ shift: s, text: decoded });
        lines.push(`Shift ${s.toString().padStart(2, "0")}: ${decoded}`);
      }

      setAllShifts(shifts);
      setOutput(lines.join("\n"));

      const letters = input.match(/[a-zA-Z]/g) || [];
      const words = input.trim().split(/\s+/).filter(Boolean).length;

      setStats({
        letterCount: letters.length,
        wordCount: words,
        mostFrequentChar: getMostFrequentLetter(input),
        shiftUsed: 0,
      });
      return;
    }

    setAllShifts(null);
    const effectiveShift = mode === "encrypt" ? shift : -shift;
    const result = applyShift(input, effectiveShift, preserveCase);
    setOutput(result);

    const letters = input.match(/[a-zA-Z]/g) || [];
    const words = input.trim().split(/\s+/).filter(Boolean).length;

    setStats({
      letterCount: letters.length,
      wordCount: words,
      mostFrequentChar: getMostFrequentLetter(input),
      shiftUsed: shift,
    });
  }, [input, mode, shift, preserveCase]);

  const loadSample = () => {
    if (mode === "decrypt") {
      setInput("Khoor, Zruog! Wklv lv d VHFUHW phvvdjh hqfrghg zlwk Fdhvdu Flskhu.");
      setShift(3);
    } else if (mode === "brute-force") {
      setInput("Uryyb, Jbeyq! Pelcgbtencul vf snfpvangvat.");
    } else {
      setInput("Hello, World! This is a SECRET message encoded with Caesar Cipher.");
      setShift(3);
    }
  };

  return (
    <TextToolLayout
      titleKey="caesarCipherTool"
      subtitleKey="caesarCipherToolSubtitle"
      actionLabelKey="caesarCipherToolAction"
      inputText={input}
      onInputChange={t => {
        setInput(t);
        if (!t) {
          setOutput("");
          setStats(null);
          setAllShifts(null);
        }
      }}
      outputText={output}
      onAction={handleAction}
      relatedPostSlugs={[
        "how-to-solve-caesar-cipher",
        "how-to-translate-binary-code",
        "how-to-encode-and-decode-base64",
      ]}
      relatedPostsTitle="Cryptography, Ciphers & Security Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Operation Mode Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Mode:</span>
            {[
              { id: "encrypt", label: "Encrypt (Encode)" },
              { id: "decrypt", label: "Decrypt (Decode)" },
              { id: "brute-force", label: "Crack / All 25 Shifts" },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setMode(m.id as CipherMode);
                  setOutput("");
                  setStats(null);
                  setAllShifts(null);
                }}
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
            Load Sample Text
          </button>
        </div>

        {/* Shift Controls & Presets */}
        {mode !== "brute-force" && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
            {/* Shift Slider and Number */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground">
                Shift Key (K): <strong className="text-primary font-mono text-sm ml-1">{shift}</strong>
              </span>
              <input
                type="range"
                min={1}
                max={25}
                value={shift}
                onChange={e => setShift(Number(e.target.value))}
                className="w-24 sm:w-36 cursor-pointer accent-primary"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground mr-1">Presets:</span>
              {[
                { label: "Caesar (3)", val: 3 },
                { label: "ROT13 (13)", val: 13 },
                { label: "ROT1 (1)", val: 1 },
                { label: "Shift 7", val: 7 },
              ].map(p => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setShift(p.val)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    shift === p.val
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background hover:bg-accent text-foreground"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Preserve Case Toggle */}
            <label htmlFor={preserveCaseId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
              <input
                id={preserveCaseId}
                type="checkbox"
                checked={preserveCase}
                onChange={e => setPreserveCase(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
              />
              <span>Preserve Letter Case</span>
            </label>
          </div>
        )}

        {/* Brute-Force Explanation Note */}
        {mode === "brute-force" && (
          <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 text-xs text-muted-foreground">
            <strong className="text-foreground">Automated Cipher Solver:</strong> Tests all 25 possible alphabet shifts simultaneously. Scan the output window to easily spot the one shift that produces legible English words.
          </div>
        )}

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Shift Offset</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {mode === "brute-force" ? "All 25 Tested" : `+${stats.shiftUsed} (mod 26)`}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Alphabet Letters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.letterCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Total Words</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.wordCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Top Frequency</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.mostFrequentChar}
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
