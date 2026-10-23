"use client";

import { useState, useCallback, useMemo } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type ReverseMode = "char" | "words" | "inplace" | "lines" | "upsideDown";

const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
  k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
  u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ſ",
  K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ", S: "S", T: "⊥",
  U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ",
  "8": "8", "9": "6",
  ".": "˙", ",": "'", "'": ",", "\"": "„", "?": "¿", "!": "¡", ";": "؛",
  "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{", "<": ">", ">": "<",
  "&": "⅋", "_": "‾",
};

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<ReverseMode>("char");

  // Palindrome check
  const isPalindrome = useMemo(() => {
    if (!input.trim()) return null;
    const clean = input.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (clean.length < 2) return null;
    const reversed = Array.from(clean).reverse().join("");
    return clean === reversed;
  }, [input]);

  const handleAction = useCallback(() => {
    if (!input) {
      setOutput("");
      return;
    }

    let result = "";

    if (mode === "char") {
      // Full character reversal (Unicode safe)
      result = Array.from(input).reverse().join("");
    } else if (mode === "words") {
      // Reverse word order while preserving word spellings
      const lines = input.split("\n");
      result = lines
        .map(line => {
          const words = line.trim().split(/\s+/).filter(Boolean);
          return words.reverse().join(" ");
        })
        .join("\n");
    } else if (mode === "inplace") {
      // In-place word reversal (words stay in order, letters reversed)
      result = input.replace(/\S+/gu, word => Array.from(word).reverse().join(""));
    } else if (mode === "lines") {
      // Reverse line order (bottom to top)
      result = input.split(/\r?\n/).reverse().join("\n");
    } else if (mode === "upsideDown") {
      // Invert upside down using Unicode mapping
      const chars = Array.from(input);
      const flipped = chars.map(c => UPSIDE_DOWN_MAP[c] || c);
      result = flipped.reverse().join("");
    }

    setOutput(result);
  }, [input, mode]);

  const wordCount = useMemo(() => {
    const tokens = input.match(/[\p{L}\p{N}'-]+/gu);
    return tokens ? tokens.length : 0;
  }, [input]);

  const lineCount = useMemo(() => {
    return input ? input.split(/\r?\n/).length : 0;
  }, [input]);

  return (
    <TextToolLayout
      titleKey="reverseTextGenerator"
      subtitleKey="reverseTextGeneratorSubtitle"
      actionLabelKey="reverseTextGeneratorAction"
      inputText={input}
      onInputChange={t => {
        setInput(t);
        if (!t) setOutput("");
      }}
      outputText={output}
      onAction={handleAction}
      relatedPostSlugs={[
        "how-to-remove-duplicate-lines-from-text",
        "how-to-strip-formatting-and-convert-to-plain-text",
        "how-to-rewrite-sentences-for-clarity-and-impact",
      ]}
      relatedPostsTitle="Text Transformation & Clean Tools"
    >
      <div className="flex flex-col gap-4">
        {/* Reversal Mode Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground mr-1">Reversal Mode:</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "char", label: "Characters (dlroW olleH)" },
              { id: "words", label: "Word Order (World Hello)" },
              { id: "inplace", label: "Each Word (olleH dlroW)" },
              { id: "lines", label: "Line by Line" },
              { id: "upsideDown", label: "Upside Down (plɹoM ollǝH)" },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id as ReverseMode)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  mode === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Palindrome & Text Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto w-full text-center">
          <div className="p-2 rounded-lg border border-border bg-card/60 flex-1 min-w-[100px]">
            <div className="text-xs text-muted-foreground font-medium">Characters</div>
            <div className="text-sm sm:text-base font-bold text-foreground">{input.length}</div>
          </div>
          <div className="p-2 rounded-lg border border-border bg-card/60 flex-1 min-w-[100px]">
            <div className="text-xs text-muted-foreground font-medium">Words</div>
            <div className="text-sm sm:text-base font-bold text-foreground">{wordCount}</div>
          </div>
          <div className="p-2 rounded-lg border border-border bg-card/60 flex-1 min-w-[100px]">
            <div className="text-xs text-muted-foreground font-medium">Lines</div>
            <div className="text-sm sm:text-base font-bold text-foreground">{lineCount}</div>
          </div>

          {/* Palindrome Detector Indicator */}
          {isPalindrome !== null && (
            <div
              className={`p-2 rounded-lg border flex-1 min-w-[140px] flex flex-col justify-center transition-all ${
                isPalindrome
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-border bg-card/60 text-muted-foreground"
              }`}
            >
              <div className="text-xs font-semibold">Palindrome Check</div>
              <div className="text-xs sm:text-sm font-bold">
                {isPalindrome ? "✨ Yes, Palindrome!" : "Not a Palindrome"}
              </div>
            </div>
          )}
        </div>
      </div>
    </TextToolLayout>
  );
}
