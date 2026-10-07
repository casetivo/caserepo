"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [count,setCount]=useState(3); const [sep,setSep]=useState("\n");
  const handleAction = useCallback(()=>{
    const s=sep==="\\n"?"\n":sep==="\\t"?"\t":sep;
    setOutput(Array(count).fill(input).join(s));
  },[input,count,sep]);
  return <TextToolLayout titleKey="repeatTextGenerator" subtitleKey="repeatTextGeneratorSubtitle" actionLabelKey="repeatTextGeneratorAction"
    inputText={input} onInputChange={t=>{setInput(t);setOutput("");}} outputText={output} onAction={handleAction}>
    <div className="flex flex-wrap items-center justify-center gap-4">
      <label className="flex items-center gap-2 text-sm text-foreground">Repeat count:
        <input type="number" min={1} max={1000} value={count} onChange={e=>setCount(Math.max(1,Math.min(1000,Number(e.target.value))))} className="w-20 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground" />
      </label>
      <label className="flex items-center gap-2 text-sm text-foreground">Separator:
        <select value={sep} onChange={e=>setSep(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
          <option value="\n">New Line</option><option value=" ">Space</option><option value="\t">Tab</option><option value=", ">Comma</option><option value="">None</option>
        </select>
      </label>
    </div>
  </TextToolLayout>;
}
