"use client";
import ImageToolLayout from "@/components/ImageToolLayout";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";

const handleProcess = async(file:File,canvas:HTMLCanvasElement)=>new Promise<{resultUrl:string}>((res,rej)=>{const img=new window.Image();img.onload=()=>{canvas.width=img.width;canvas.height=img.height;canvas.getContext("2d")!.drawImage(img,0,0);res({resultUrl:canvas.toDataURL("image/png")});};img.onerror=rej;img.src=URL.createObjectURL(file);});

export default function ImagePage() {
  const t = imageToolTranslationsEn;
  return (
    <ImageToolLayout
      title={String(t.jpgToPng)}
      subtitle={String(t.jpgToPngSubtitle)}
      acceptFormats="image/jpeg,.jpg,.jpeg"
      actionLabel={String(t.convert)}
      onProcess={handleProcess}
    />
  );
}
