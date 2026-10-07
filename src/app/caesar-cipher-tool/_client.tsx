"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const cipher=(t:string,s:number)=>t.replace(/[a-zA-Z]/g,c=>{const b=c<="Z"?65:97;return String.fromCharCode(((c.charCodeAt(0)-b+s)%26+26)%26+b);});
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [shift,setShift]=useState(3); const [mode,setMode]=useState<"encrypt"|"decrypt">("encrypt");
  return <TextToolLayout titleKey="caesarCipherTool" subtitleKey="caesarCipherToolSubtitle" actionLabelKey="caesarCipherToolAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(cipher(input,mode==="encrypt"?shift:-shift))}>
    <div className="flex flex-wrap justify-center gap-3 items-center">
      <div className="flex gap-2">{(["encrypt","decrypt"] as const).map(m=><button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${mode===m?"bg-primary text-primary-foreground":"bg-card border border-border text-foreground hover:bg-accent"}`}>{m}</button>)}</div>
      <label className="flex items-center gap-2 text-sm text-foreground">Shift:<input type="number" min={1} max={25} value={shift} onChange={e=>setShift(Number(e.target.value))} className="w-16 px-2 py-1.5 rounded-lg border border-border bg-card text-foreground text-center" /></label>
    </div>
  </TextToolLayout>;
}
