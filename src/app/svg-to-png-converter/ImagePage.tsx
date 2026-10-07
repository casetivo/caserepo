"use client";
import ImageToolLayout from "@/components/ImageToolLayout";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";

const handleProcess = async(file:File,canvas:HTMLCanvasElement)=>new Promise<{resultUrl:string}>((res,rej)=>{const reader=new FileReader();reader.onload=e=>{const img=new window.Image();img.onload=()=>{canvas.width=img.width||800;canvas.height=img.height||600;canvas.getContext("2d")!.drawImage(img,0,0);res({resultUrl:canvas.toDataURL("image/png")});};img.onerror=rej;img.src=e.target?.result as string;};reader.onerror=rej;reader.readAsDataURL(file);});

export default function ImagePage() {
  const t = imageToolTranslationsEn;
  return (
    <ImageToolLayout
      title={String(t.svgToPng)}
      subtitle={String(t.svgToPngSubtitle)}
      acceptFormats="image/svg+xml,.svg"
      actionLabel={String(t.convert)}
      onProcess={handleProcess}
    />
  );
}
