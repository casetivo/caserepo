"use client";
import ImageToolLayout from "@/components/ImageToolLayout";
import { imageToolTranslationsEn } from "@/i18n/imageToolTranslationsEn";

const handleProcess = async(file:File,canvas:HTMLCanvasElement)=>new Promise<{resultText:string}>(resolve=>{const ASCII_CHARS="@%#*+=-:. ";const img=new window.Image();img.onload=()=>{const scale=Math.min(100/img.width,1);const w=Math.floor(img.width*scale),h=Math.floor(img.height*scale*0.5);canvas.width=w;canvas.height=h;const ctx=canvas.getContext("2d")!;ctx.drawImage(img,0,0,w,h);const px=ctx.getImageData(0,0,w,h).data;let ascii="";for(let y=0;y<h;y++){for(let x=0;x<w;x++){const i=(y*w+x)*4;const br=(px[i]*299+px[i+1]*587+px[i+2]*114)/1000;ascii+=ASCII_CHARS[Math.floor((br/255)*(ASCII_CHARS.length-1))];}ascii+="\n";}resolve({resultText:ascii});};img.src=URL.createObjectURL(file);});

export default function ImagePage() {
  const t = imageToolTranslationsEn;
  return (
    <ImageToolLayout
      title={String(t.asciiArtGenerator)}
      subtitle={String(t.asciiArtGeneratorSubtitle)}
      acceptFormats="image/*"
      actionLabel={String(t.generate)}
      onProcess={handleProcess}
    />
  );
}
