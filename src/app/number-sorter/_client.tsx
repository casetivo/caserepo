"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [order,setOrder]=useState<"asc"|"desc">("asc");
  const handleAction=()=>{const nums=input.match(/-?\d+\.?\d*/g);if(!nums){setOutput("No numbers found.");return;}setOutput(nums.map(Number).sort((a,b)=>order==="asc"?a-b:b-a).join("\n"));};
  return <TextToolLayout titleKey="numberSorter" subtitleKey="numberSorterSubtitle" actionLabelKey="numberSorterAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={handleAction}>
    <p className="text-muted-foreground text-sm sm:text-base text-center mb-6">Paste a list of numbers — integers, decimals, or negatives — and sort them in ascending or descending order instantly. Each number should be on its own line or separated by commas. Ideal for quickly organizing data sets, ranking values, or cleaning up exported spreadsheet columns.</p>
    <div className="flex justify-center gap-2">{(["asc","desc"] as const).map(o=><button key={o} onClick={()=>setOrder(o)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${order===o?"bg-primary text-primary-foreground":"bg-card border border-border text-foreground hover:bg-accent"}`}>{o==="asc"?"Ascending":"Descending"}</button>)}</div>
  </TextToolLayout>;
}
