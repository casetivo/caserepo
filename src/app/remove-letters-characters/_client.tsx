"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [chars,setChars]=useState("");
  const handleAction=useCallback(()=>{
    if(!chars){setOutput(input);return;}
    const escaped=chars.split("").map(c=>c.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|");
    setOutput(input.replace(new RegExp(escaped,"g"),""));
  },[input,chars]);
  return <TextToolLayout titleKey="removeLettersCharacters" subtitleKey="removeLettersCharactersSubtitle" actionLabelKey="removeLettersCharactersAction"
    inputText={input} onInputChange={t=>{setInput(t);setOutput("");}} outputText={output} onAction={handleAction}>
    <div className="flex items-center gap-3 justify-center">
      <label className="text-sm font-medium text-foreground">Characters to remove:</label>
      <input type="text" value={chars} onChange={e=>setChars(e.target.value)} placeholder="e.g. @#$" className="w-48 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40" />
    </div>
  </TextToolLayout>;
}
