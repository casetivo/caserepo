"use client";

import { useCallback, useState } from "react";
import ImageToolLayout from "@/components/ImageToolLayout";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";

// Tesseract language codes. Language data is downloaded once and cached by the browser.
const OCR_LANGUAGES = [
  ["eng", "English"],
  ["spa", "Spanish (Español)"],
  ["fra", "French (Français)"],
  ["deu", "German (Deutsch)"],
  ["por", "Portuguese (Português)"],
  ["ita", "Italian (Italiano)"],
  ["nld", "Dutch (Nederlands)"],
  ["pol", "Polish (Polski)"],
  ["tur", "Turkish (Türkçe)"],
  ["hin", "Hindi (हिन्दी)"],
  ["ara", "Arabic (العربية)"],
  ["urd", "Urdu (اردو)"],
] as const;

interface OcrStats {
  charactersCount: number;
  wordsCount: number;
  linesCount: number;
  languageUsed: string;
}

export default function ImagePage() {
  const t = imageToolTranslationsEn;
  const [lang, setLang] = useState<string>("eng");
  const [stats, setStats] = useState<OcrStats | null>(null);

  // OCR runs entirely in the browser; the image is never uploaded.
  const handleProcess = useCallback(
    async (file: File) => {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker(lang);
      try {
        const { data } = await worker.recognize(file);
        const text = data.text.trim();

        if (text) {
          const words = text.split(/\s+/).filter(Boolean).length;
          const lines = text.split("\n").filter((l) => l.trim().length > 0).length;
          const selectedLangLabel = OCR_LANGUAGES.find(([code]) => code === lang)?.[1] || lang;

          setStats({
            charactersCount: text.length,
            wordsCount: words,
            linesCount: lines,
            languageUsed: selectedLangLabel,
          });
        } else {
          setStats(null);
        }

        return {
          resultText:
            text ||
            "No text was detected. Try uploading a sharper, higher-contrast image or verify the selected language.",
        };
      } finally {
        await worker.terminate();
      }
    },
    [lang]
  );

  return (
    <ImageToolLayout
      title={String(t.aiImageToText)}
      subtitle={String(t.aiImageToTextSubtitle)}
      acceptFormats="image/png,image/jpeg,image/webp,image/bmp,image/gif"
      actionLabel={String(t.extract)}
      onProcess={handleProcess}
    >
      <div className="flex flex-col gap-3">
        {/* Controls Bar */}
        <div className="p-3.5 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs">
            <label htmlFor="ocr-language" className="text-foreground font-semibold">
              OCR Engine Language:
            </label>
            <select
              id="ocr-language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {OCR_LANGUAGES.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            <span>Client-Side WebAssembly OCR Engine</span>
          </div>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl border border-border bg-card text-center text-xs">
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Characters Extracted</span>
              <span className="font-bold text-foreground text-sm">{stats.charactersCount.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Word Count</span>
              <span className="font-bold text-foreground text-sm">{stats.wordsCount.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Lines Detected</span>
              <span className="font-bold text-foreground text-sm">{stats.linesCount}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Language Model</span>
              <span className="font-bold text-primary text-sm truncate">{stats.languageUsed.split(" ")[0]}</span>
            </div>
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
