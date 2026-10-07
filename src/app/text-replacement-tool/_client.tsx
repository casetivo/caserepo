"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [find,setFind]=useState(""); const [replace,setReplace]=useState("");
  const handleAction=useCallback(()=>setOutput(!find?input:input.split(find).join(replace)),[input,find,replace]);
  return <TextToolLayout titleKey="textReplacementTool" subtitleKey="textReplacementToolSubtitle" actionLabelKey="textReplacementToolAction"
    inputText={input} onInputChange={t=>{setInput(t);setOutput("");}} outputText={output} onAction={handleAction}>
    <div className="flex flex-wrap items-center justify-center gap-4">
      <label className="flex items-center gap-2 text-sm text-foreground">Find:<input type="text" value={find} onChange={e=>setFind(e.target.value)} placeholder="Text to find" className="w-40 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60" /></label>
      <label className="flex items-center gap-2 text-sm text-foreground">Replace:<input type="text" value={replace} onChange={e=>setReplace(e.target.value)} placeholder="Replace with" className="w-40 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60" /></label>
    </div>
  </TextToolLayout>;
}
