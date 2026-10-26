"use client";
import { useCallback, useState } from "react";
import ImageToolLayout from "@/components/ImageToolLayout";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";

// Tesseract language codes. Language data is downloaded once and cached by the browser.
const OCR_LANGUAGES = [
  ["eng", "English"], ["spa", "Spanish"], ["fra", "French"], ["deu", "German"],
  ["por", "Portuguese"], ["ita", "Italian"], ["nld", "Dutch"], ["pol", "Polish"],
  ["tur", "Turkish"], ["hin", "Hindi"], ["ara", "Arabic"], ["urd", "Urdu"],
] as const;

export default function ImagePage() {
  const t = imageToolTranslationsEn;
  const [lang, setLang] = useState<string>("eng");

  // OCR runs entirely in the browser; the image is never uploaded.
  const handleProcess = useCallback(async (file: File) => {
    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker(lang);
    try {
      const { data } = await worker.recognize(file);
      const text = data.text.trim();
      return { resultText: text || "No text was detected. Try a sharper, higher-contrast image or pick the correct language." };
    } finally {
      await worker.terminate();
    }
  }, [lang]);

  return (
    <ImageToolLayout
      title={String(t.aiImageToText)}
      subtitle={String(t.aiImageToTextSubtitle)}
      acceptFormats="image/png,image/jpeg,image/webp,image/bmp,image/gif"
      actionLabel={String(t.extract)}
      onProcess={handleProcess}
    >
      <div className="flex items-center justify-center gap-3 text-sm">
        <label htmlFor="ocr-language" className="text-muted-foreground font-medium">Text language</label>
        <select
          id="ocr-language"
          value={lang}
          onChange={e => setLang(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
        >
          {OCR_LANGUAGES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
        </select>
      </div>
    </ImageToolLayout>
  );
}
