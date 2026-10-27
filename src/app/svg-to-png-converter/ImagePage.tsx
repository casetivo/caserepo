"use client";

import { useState, useCallback, useId } from "react";
import ImageToolLayout from "@/components/ImageToolLayout";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";

interface SvgStats {
  fileName: string;
  originalBytes: number;
  convertedBytes?: number;
  width: number;
  height: number;
  scaleFactor: number;
}

export default function ImagePage() {
  const t = imageToolTranslationsEn;
  const [scale, setScale] = useState<number>(2);
  const [stats, setStats] = useState<SvgStats | null>(null);

  const scaleId = useId();

  const handleProcess = useCallback(
    async (file: File, canvas: HTMLCanvasElement) => {
      return new Promise<{ resultUrl: string }>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const rawSvg = e.target?.result as string;
          const svgBlob = new Blob([rawSvg], { type: "image/svg+xml;charset=utf-8" });
          const objectUrl = URL.createObjectURL(svgBlob);
          const img = new window.Image();

          img.onload = () => {
            const baseWidth = img.naturalWidth || img.width || 800;
            const baseHeight = img.naturalHeight || img.height || 600;

            const targetWidth = Math.round(baseWidth * scale);
            const targetHeight = Math.round(baseHeight * scale);

            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("Unable to obtain canvas context"));
              return;
            }

            // Clear canvas to preserve transparency
            ctx.clearRect(0, 0, targetWidth, targetHeight);
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            const dataUrl = canvas.toDataURL("image/png");

            // Approximate file size from base64
            const base64Data = dataUrl.split(",")[1] || "";
            const convertedBytes = Math.round((base64Data.length * 3) / 4);

            setStats({
              fileName: file.name,
              originalBytes: file.size,
              convertedBytes,
              width: targetWidth,
              height: targetHeight,
              scaleFactor: scale,
            });

            URL.revokeObjectURL(objectUrl);
            resolve({ resultUrl: dataUrl });
          };

          img.onerror = (err) => {
            URL.revokeObjectURL(objectUrl);
            reject(err);
          };

          img.src = objectUrl;
        };

        reader.onerror = reject;
        reader.readAsText(file);
      });
    },
    [scale]
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <ImageToolLayout
      title={String(t.svgToPng)}
      subtitle={String(t.svgToPngSubtitle)}
      acceptFormats="image/svg+xml,.svg"
      actionLabel={String(t.convert)}
      onProcess={handleProcess}
    >
      <div className="flex flex-col gap-3">
        {/* Controls Bar */}
        <div className="p-3.5 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor={scaleId} className="text-xs font-semibold text-foreground">
              Resolution Scale:
            </label>
            <select
              id={scaleId}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value={1}>1x (Original Size)</option>
              <option value={2}>2x (Retina HD - Recommended)</option>
              <option value={3}>3x (Ultra HD)</option>
              <option value={4}>4x (Print / 300 DPI Quality)</option>
            </select>
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
            <span>Infinite Vector Scaling to Raster PNG</span>
          </div>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl border border-border bg-card text-center text-xs">
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">SVG Code Size</span>
              <span className="font-bold text-foreground text-sm">{formatFileSize(stats.originalBytes)}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Raster PNG Size</span>
              <span className="font-bold text-foreground text-sm">
                {stats.convertedBytes ? formatFileSize(stats.convertedBytes) : "Processing..."}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Output Resolution</span>
              <span className="font-bold text-foreground text-sm">{stats.width} × {stats.height}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Render Multiplier</span>
              <span className="font-bold text-primary text-sm">{stats.scaleFactor}x Resolution</span>
            </div>
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
