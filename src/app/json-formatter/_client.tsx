"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [mode,setMode]=useState<"beautify"|"minify">("beautify");
  const handleAction=()=>{try{const p=JSON.parse(input);setOutput(mode==="beautify"?JSON.stringify(p,null,2):JSON.stringify(p));}catch{setOutput("Error: Invalid JSON input.");}};
  return <TextToolLayout titleKey="jsonFormatter" subtitleKey="jsonFormatterSubtitle" actionLabelKey="jsonFormatterAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={handleAction}>
    <div className="flex justify-center gap-2">{(["beautify","minify"] as const).map(m=><button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${mode===m?"bg-primary text-primary-foreground":"bg-card border border-border text-foreground hover:bg-accent"}`}>{m}</button>)}</div>
  </TextToolLayout>;
}
