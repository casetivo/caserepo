"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [pattern,setPattern]=useState(""); const [replacement,setReplacement]=useState("");
  const [mode,setMode]=useState<"match"|"replace">("match");
  const handleAction=()=>{try{const rx=new RegExp(pattern,"gm");setOutput(mode==="match"?(input.match(rx)||["No matches found."]).join("\n"):input.replace(rx,replacement));}catch(e){setOutput("Invalid regex: "+(e as Error).message);}};
  return <TextToolLayout titleKey="regexTextTool" subtitleKey="regexTextToolSubtitle" actionLabelKey="regexTextToolAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={handleAction}>
    <div className="flex flex-col gap-3 max-w-xl mx-auto w-full">
      <div className="flex justify-center gap-2">{(["match","replace"] as const).map(m=><button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${mode===m?"bg-primary text-primary-foreground":"bg-card border border-border text-foreground hover:bg-accent"}`}>{m}</button>)}</div>
      <input value={pattern} onChange={e=>setPattern(e.target.value)} placeholder="Regex pattern (e.g. \d+)" className="w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40" style={{fontFamily:"var(--font-mono)"}} />
      {mode==="replace"&&<input value={replacement} onChange={e=>setReplacement(e.target.value)} placeholder="Replacement text" className="w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40" />}
    </div>
  </TextToolLayout>;
}
