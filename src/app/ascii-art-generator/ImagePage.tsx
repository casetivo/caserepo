"use client";

import { useState, useCallback, useId } from "react";
import ImageToolLayout from "@/components/ImageToolLayout";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";

const PALETTES: Record<string, { label: string; chars: string }> = {
  standard: {
    label: "Standard ASCII",
    chars: "@%#*+=-:. ",
  },
  detailed: {
    label: "Detailed 70-Char",
    chars: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
  },
  blocks: {
    label: "Block Shades",
    chars: "██▓▓▒▒░░  ",
  },
  minimal: {
    label: "Minimalist",
    chars: "#*- ",
  },
};

interface AsciiStats {
  cols: number;
  rows: number;
  totalChars: number;
}

export default function ImagePage() {
  const t = imageToolTranslationsEn;
  const [width, setWidth] = useState<number>(80);
  const [paletteKey, setPaletteKey] = useState<string>("standard");
  const [invert, setInvert] = useState<boolean>(false);
  const [stats, setStats] = useState<AsciiStats | null>(null);

  const widthId = useId();
  const paletteId = useId();
  const invertId = useId();

  const handleProcess = useCallback(
    async (file: File, canvas: HTMLCanvasElement) => {
      return new Promise<{ resultText: string }>((resolve, reject) => {
        const selectedPalette = PALETTES[paletteKey] || PALETTES.standard;
        const charSet = invert
          ? selectedPalette.chars.split("").reverse().join("")
          : selectedPalette.chars;

        const img = new window.Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
          // Terminal characters are typically roughly twice as tall as they are wide (~0.5 aspect ratio)
          const fontAspect = 0.5;
          const targetW = width;
          const targetH = Math.max(1, Math.floor((img.height / img.width) * targetW * fontAspect));

          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Unable to obtain canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, targetW, targetH);
          const px = ctx.getImageData(0, 0, targetW, targetH).data;

          let ascii = "";
          for (let y = 0; y < targetH; y++) {
            for (let x = 0; x < targetW; x++) {
              const i = (y * targetW + x) * 4;
              // ITU-R BT.601 perceptual luminance formula
              const brightness = (px[i] * 299 + px[i + 1] * 587 + px[i + 2] * 114) / 1000;
              const charIdx = Math.floor((brightness / 255) * (charSet.length - 1));
              ascii += charSet[charIdx];
            }
            ascii += "\n";
          }

          setStats({
            cols: targetW,
            rows: targetH,
            totalChars: targetW * targetH,
          });

          URL.revokeObjectURL(objectUrl);
          resolve({ resultText: ascii });
        };

        img.onerror = (err) => {
          URL.revokeObjectURL(objectUrl);
          reject(err);
        };

        img.src = objectUrl;
      });
    },
    [width, paletteKey, invert]
  );

  return (
    <ImageToolLayout
      title={String(t.asciiArtGenerator)}
      subtitle={String(t.asciiArtGeneratorSubtitle)}
      acceptFormats="image/*"
      actionLabel={String(t.generate)}
      onProcess={handleProcess}
    >
      <div className="flex flex-col gap-3">
        {/* Controls Bar */}
        <div className="p-3.5 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Output Width */}
            <div className="flex items-center gap-2">
              <label htmlFor={widthId} className="text-xs font-semibold text-foreground">
                Columns Width:
              </label>
              <select
                id={widthId}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value={60}>60 Columns (Compact)</option>
                <option value={80}>80 Columns (Standard Terminal)</option>
                <option value={100}>100 Columns (Detailed)</option>
                <option value={120}>120 Columns (High Definition)</option>
              </select>
            </div>

            {/* Character Palette */}
            <div className="flex items-center gap-2">
              <label htmlFor={paletteId} className="text-xs font-semibold text-foreground">
                Character Palette:
              </label>
              <select
                id={paletteId}
                value={paletteKey}
                onChange={(e) => setPaletteKey(e.target.value)}
                className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {Object.entries(PALETTES).map(([k, p]) => (
                  <option key={k} value={k}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Invert Brightness Checkbox */}
          <div className="flex items-center gap-2">
            <input
              id={invertId}
              type="checkbox"
              checked={invert}
              onChange={(e) => setInvert(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary h-4 w-4 cursor-pointer"
            />
            <label htmlFor={invertId} className="text-xs font-semibold text-foreground cursor-pointer select-none">
              Invert Luminance (Light on Dark)
            </label>
          </div>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3.5 rounded-xl border border-border bg-card text-center text-xs">
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Grid Dimensions</span>
              <span className="font-bold text-foreground text-sm">{stats.cols} × {stats.rows} chars</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Total Characters</span>
              <span className="font-bold text-foreground text-sm">{stats.totalChars.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Font Compensation</span>
              <span className="font-bold text-primary text-sm">2:1 Vertical Scale</span>
            </div>
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
