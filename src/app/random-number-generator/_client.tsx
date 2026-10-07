"use client";
import { useState } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

export default function ClientPage() {
  const [min,setMin]=useState(1); const [max,setMax]=useState(100); const [count,setCount]=useState(1); const [output,setOutput]=useState("");
  
  const seo = getSeoContent("random-number-generator", "Random Number Generator");

  return <RandomToolLayout titleKey="randomNumberGenerator" subtitleKey="randomNumberGeneratorSubtitle" actionLabelKey="randomNumberGeneratorAction" output={output} onGenerate={()=>setOutput(Array.from({length:count},()=>Math.floor(Math.random()*(max-min+1))+min).join("\n"))} onClear={()=>setOutput("")} seoTitle={seo.title} seoContent={seo.content} seoFaqs={seo.faqs}>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <label className="text-sm text-foreground font-medium">Min:</label><input type="number" value={min} onChange={e=>setMin(Number(e.target.value))} className="w-24 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm" />
      <label className="text-sm text-foreground font-medium">Max:</label><input type="number" value={max} onChange={e=>setMax(Number(e.target.value))} className="w-24 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm" />
      <label className="text-sm text-foreground font-medium">Count:</label><input type="number" min={1} max={1000} value={count} onChange={e=>setCount(Math.max(1,Math.min(1000,Number(e.target.value))))} className="w-20 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm" />
    </div>
  </RandomToolLayout>;
}
