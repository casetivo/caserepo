"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
import { ReactNode } from "react";
import { FAQ } from "@/components/SeoContentBlock";

interface ClientPageProps {
  seoTitle?: string;
  seoContent?: ReactNode;
  seoFaqs?: FAQ[];
}

export default function ClientPage({ seoTitle, seoContent, seoFaqs }: ClientPageProps) {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [mode,setMode]=useState<"encode"|"decode">("encode");
  const handleAction=()=>{
    try{setOutput(mode==="encode"?btoa(unescape(encodeURIComponent(input))):decodeURIComponent(escape(atob(input))));}
    catch{setOutput("Error: Invalid input for "+mode);}
  };
  return <TextToolLayout titleKey="base64EncoderDecoder" subtitleKey="base64EncoderDecoderSubtitle" actionLabelKey="base64EncoderDecoderAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={handleAction}
    seoTitle={seoTitle} seoContent={seoContent} seoFaqs={seoFaqs}>
    <div className="flex justify-center gap-2">
      {(["encode","decode"] as const).map(m=><button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${mode===m?"bg-primary text-primary-foreground":"bg-card border border-border text-foreground hover:bg-accent"}`}>{m}</button>)}
    </div>
  </TextToolLayout>;
}
