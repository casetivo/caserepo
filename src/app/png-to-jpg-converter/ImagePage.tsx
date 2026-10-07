"use client";
import ImageToolLayout from "@/components/ImageToolLayout";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";

const handleProcess = async(file:File,canvas:HTMLCanvasElement)=>new Promise<{resultUrl:string}>((res,rej)=>{const img=new window.Image();img.onload=()=>{canvas.width=img.width;canvas.height=img.height;const ctx=canvas.getContext("2d")!;ctx.fillStyle="#ffffff";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0);res({resultUrl:canvas.toDataURL("image/jpeg",0.92)});};img.onerror=rej;img.src=URL.createObjectURL(file);});

export default function ImagePage() {
  const t = imageToolTranslationsEn;
  return (
    <ImageToolLayout
      title={String(t.pngToJpg)}
      subtitle={String(t.pngToJpgSubtitle)}
      acceptFormats="image/png,.png"
      actionLabel={String(t.convert)}
      onProcess={handleProcess}
    />
  );
}
