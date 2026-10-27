"use client";

import { useState, useCallback, useId } from "react";
import ImageToolLayout from "@/components/ImageToolLayout";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";

interface ImageStats {
  fileName: string;
  originalBytes: number;
  convertedBytes?: number;
  width: number;
  height: number;
}

export default function ImagePage() {
  const t = imageToolTranslationsEn;
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [quality, setQuality] = useState<number>(0.92);
  const [stats, setStats] = useState<ImageStats | null>(null);

  const bgId = useId();
  const qualityId = useId();

  const handleProcess = useCallback(
    async (file: File, canvas: HTMLCanvasElement) => {
      return new Promise<{ resultUrl: string }>((resolve, reject) => {
        const img = new window.Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Unable to obtain canvas context"));
            return;
          }

          // Fill canvas background to replace transparency
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          const dataUrl = canvas.toDataURL("image/jpeg", quality);

          // Approximate converted file size from base64
          const base64Data = dataUrl.split(",")[1] || "";
          const convertedBytes = Math.round((base64Data.length * 3) / 4);

          setStats({
            fileName: file.name,
            originalBytes: file.size,
            convertedBytes,
            width: canvas.width,
            height: canvas.height,
          });

          URL.revokeObjectURL(objectUrl);
          resolve({ resultUrl: dataUrl });
        };

        img.onerror = (err) => {
          URL.revokeObjectURL(objectUrl);
          reject(err);
        };

        img.src = objectUrl;
      });
    },
    [bgColor, quality]
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <ImageToolLayout
      title={String(t.pngToJpg)}
      subtitle={String(t.pngToJpgSubtitle)}
      acceptFormats="image/png,.png"
      actionLabel={String(t.convert)}
      onProcess={handleProcess}
    >
      <div className="flex flex-col gap-3">
        {/* Interactive Controls Bar */}
        <div className="p-3.5 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-4">
          {/* Transparency Background Fill */}
          <div className="flex items-center gap-2">
            <label htmlFor={bgId} className="text-xs font-semibold text-foreground">
              Background Fill:
            </label>
            <select
              id={bgId}
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="#ffffff">White (#ffffff)</option>
              <option value="#000000">Black (#000000)</option>
              <option value="#f3f4f6">Light Gray (#f3f4f6)</option>
              <option value="#1e293b">Dark Slate (#1e293b)</option>
            </select>
          </div>

          {/* JPEG Quality Slider */}
          <div className="flex items-center gap-2">
            <label htmlFor={qualityId} className="text-xs font-semibold text-foreground">
              JPEG Quality:
            </label>
            <select
              id={qualityId}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value={1.0}>100% (Maximum Quality)</option>
              <option value={0.92}>92% (High Quality - Recommended)</option>
              <option value={0.82}>82% (Balanced Web)</option>
              <option value={0.7}>70% (Small File Size)</option>
            </select>
          </div>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl border border-border bg-card text-center text-xs">
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Original PNG</span>
              <span className="font-bold text-foreground text-sm">{formatFileSize(stats.originalBytes)}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Converted JPG</span>
              <span className="font-bold text-foreground text-sm">
                {stats.convertedBytes ? formatFileSize(stats.convertedBytes) : "Processing..."}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Resolution</span>
              <span className="font-bold text-foreground text-sm">{stats.width} × {stats.height}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Storage Delta</span>
              <span className="font-bold text-sm text-green-500">
                {stats.convertedBytes && stats.originalBytes > stats.convertedBytes
                  ? `-${Math.round(((stats.originalBytes - stats.convertedBytes) / stats.originalBytes) * 100)}%`
                  : "Optimized"}
              </span>
            </div>
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
