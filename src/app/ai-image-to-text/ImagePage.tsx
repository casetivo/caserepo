"use client";
import ImageToolLayout from "@/components/ImageToolLayout";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";

const handleProcess = async(file:File,canvas:HTMLCanvasElement)=>new Promise<{resultText:string}>(resolve=>{const img=new window.Image();img.onload=()=>{canvas.width=img.width;canvas.height=img.height;const ctx=canvas.getContext("2d")!;ctx.drawImage(img,0,0);const d=ctx.getImageData(0,0,canvas.width,canvas.height).data;let r=0,g=0,b=0;const n=d.length/4;for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2];}const ar=Math.round(r/n),ag=Math.round(g/n),ab=Math.round(b/n);resolve({resultText:["Image Analysis Results","━━━━━━━━━━━━━━━━━━━━━","",`Dimensions: ${img.width} × ${img.height} pixels`,`File: ${file.name}`,`Size: ${(file.size/1024).toFixed(1)} KB`,`Type: ${file.type}`,"",`Avg RGB: rgb(${ar},${ag},${ab})`,`Hex: #${ar.toString(16).padStart(2,"0")}${ag.toString(16).padStart(2,"0")}${ab.toString(16).padStart(2,"0")}`,`Brightness: ${Math.round((ar*299+ag*587+ab*114)/1000)}/255`,"","Note: Full OCR requires a dedicated OCR API."].join("\n")}); };img.src=URL.createObjectURL(file);});

export default function ImagePage() {
  const t = imageToolTranslationsEn;
  return (
    <ImageToolLayout
      title={String(t.aiImageToText)}
      subtitle={String(t.aiImageToTextSubtitle)}
      acceptFormats="image/*"
      actionLabel={String(t.extract)}
      onProcess={handleProcess}
    />
  );
}
