"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [mode,setMode]=useState<"encode"|"decode">("encode");
  const handleAction=()=>{try{setOutput(mode==="encode"?encodeURIComponent(input):decodeURIComponent(input));}catch{setOutput("Error: Invalid input.");}};
  return <TextToolLayout titleKey="urlEncoderDecoder" subtitleKey="urlEncoderDecoderSubtitle" actionLabelKey="urlEncoderDecoderAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={handleAction}>
    <div className="flex justify-center gap-2">{(["encode","decode"] as const).map(m=><button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${mode===m?"bg-primary text-primary-foreground":"bg-card border border-border text-foreground hover:bg-accent"}`}>{m}</button>)}</div>
  </TextToolLayout>;
}
