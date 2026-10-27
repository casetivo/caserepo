"use client";

import { useState, useCallback } from "react";
import ImageToolLayout from "@/components/ImageToolLayout";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";

interface ImageStats {
  fileName: string;
  originalBytes: number;
  width: number;
  height: number;
  convertedBytes?: number;
}

export default function ImagePage() {
  const t = imageToolTranslationsEn;
  const [stats, setStats] = useState<ImageStats | null>(null);

  const handleProcess = useCallback(async (file: File, canvas: HTMLCanvasElement) => {
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

        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");

        // Calculate converted size from dataUrl
        const base64Data = dataUrl.split(",")[1] || "";
        const convertedBytes = Math.round((base64Data.length * 3) / 4);

        setStats({
          fileName: file.name,
          originalBytes: file.size,
          width: canvas.width,
          height: canvas.height,
          convertedBytes,
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
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <ImageToolLayout
      title={String(t.jpgToPng)}
      subtitle={String(t.jpgToPngSubtitle)}
      acceptFormats="image/jpeg,.jpg,.jpeg"
      actionLabel={String(t.convert)}
      onProcess={handleProcess}
    >
      <div className="flex flex-col gap-3">
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl border border-border bg-card text-center text-xs">
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Original Size</span>
              <span className="font-bold text-foreground text-sm">{formatFileSize(stats.originalBytes)}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Resolution</span>
              <span className="font-bold text-foreground text-sm">{stats.width} × {stats.height}</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Megapixels</span>
              <span className="font-bold text-foreground text-sm">{((stats.width * stats.height) / 1_000_000).toFixed(1)} MP</span>
            </div>
            <div className="p-2 rounded-lg bg-background border border-border">
              <span className="text-muted-foreground block text-[11px]">Output Format</span>
              <span className="font-bold text-primary text-sm">PNG (Lossless)</span>
            </div>
          </div>
        )}
      </div>
    </ImageToolLayout>
  );
}
