"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [order,setOrder]=useState<"asc"|"desc">("asc");
  const handleAction=useCallback(()=>{
    const words=input.trim().split(/\s+/).filter(Boolean);
    setOutput(words.sort((a,b)=>order==="asc"?a.localeCompare(b):b.localeCompare(a)).join("\n"));
  },[input,order]);
  return <TextToolLayout titleKey="sortWordsAlphabetically" subtitleKey="sortWordsAlphabeticallySubtitle" actionLabelKey="sortWordsAlphabeticallyAction"
    inputText={input} onInputChange={t=>{setInput(t);setOutput("");}} outputText={output} onAction={handleAction}>
    <div className="flex justify-center gap-2">
      {(["asc","desc"] as const).map(o=><button key={o} onClick={()=>setOrder(o)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${order===o?"bg-primary text-primary-foreground":"bg-card border border-border text-foreground hover:bg-accent"}`}>{o==="asc"?"A → Z":"Z → A"}</button>)}
    </div>
  </TextToolLayout>;
}
