"use client";

import { useState, useCallback } from "react";
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
  const [stats, setStats] = useState<ImageStats | null>(null);

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

          // Clear canvas so transparent pixels in WebP remain transparent in PNG
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          const dataUrl = canvas.toDataURL("image/png");

          // Calculate file size from base64
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
    []
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <ImageToolLayout
      title={String(t.webpToPng)}
      subtitle={String(t.webpToPngSubtitle)}
      acceptFormats="image/webp,.webp"
      actionLabel={String(t.convert)}
      onProcess={handleProcess}
    >
      <div className="flex flex-col gap-3">
        {/* Information Notice */}
        <div className="p-3.5 rounded-xl border border-border bg-card flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <span className="font-semibold text-foreground">Lossless PNG Output</span>
          </div>
          <span className="text-muted-foreground text-[11px]">
            Alpha transparency preserved for editing in Photoshop, Figma &amp; GIMP
          </span>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl border border-border bg-card text-center text-xs">
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">WebP Source</span>
              <span className="font-bold text-foreground text-sm">{formatFileSize(stats.originalBytes)}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">PNG File Size</span>
              <span className="font-bold text-foreground text-sm">
                {stats.convertedBytes ? formatFileSize(stats.convertedBytes) : "Processing..."}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Resolution</span>
              <span className="font-bold text-foreground text-sm">{stats.width} × {stats.height}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Compatibility</span>
              <span className="font-bold text-primary text-sm">Universal 100%</span>
            </div>
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
