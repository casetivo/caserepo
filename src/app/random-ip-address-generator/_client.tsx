"use client";
import { useState } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

const ri=(mn:number,mx:number)=>Math.floor(Math.random()*(mx-mn+1))+mn;
const rh=()=>ri(0,65535).toString(16).padStart(4,"0");
export default function ClientPage() {
  const [mode,setMode]=useState<"ipv4"|"ipv6">("ipv4"); const [count,setCount]=useState(5); const [output,setOutput]=useState("");
  const handleGenerate=()=>{setOutput(Array.from({length:count},()=>mode==="ipv4"?`${ri(1,255)}.${ri(0,255)}.${ri(0,255)}.${ri(1,254)}`:Array.from({length:8},rh).join(":")).join("\n"));};
  
  const seo = getSeoContent("random-ip-address-generator", "Random IP Address Generator");

  return <RandomToolLayout titleKey="randomIpAddressGenerator" subtitleKey="randomIpAddressGeneratorSubtitle" actionLabelKey="randomIpAddressGeneratorAction" output={output} onGenerate={handleGenerate} onClear={()=>setOutput("")} seoTitle={seo.title} seoContent={seo.content} seoFaqs={seo.faqs}>
    <div className="flex items-center justify-center gap-3">
      {(["ipv4","ipv6"] as const).map(m=><button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${mode===m?"bg-primary text-primary-foreground":"bg-card border border-border text-foreground hover:bg-accent"}`}>{m.toUpperCase()}</button>)}
      <label className="text-sm text-foreground font-medium ml-4">Count:</label>
      <input type="number" min={1} max={100} value={count} onChange={e=>setCount(Math.max(1,Math.min(100,Number(e.target.value))))} className="w-20 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm" />
    </div>
  </RandomToolLayout>;
}
