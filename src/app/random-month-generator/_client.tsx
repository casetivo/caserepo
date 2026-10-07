"use client";
import { useState } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
export default function ClientPage() {
  const [count,setCount]=useState(1); const [output,setOutput]=useState("");
  
  const seo = getSeoContent("random-month-generator", "Random Month Generator");

  return <RandomToolLayout titleKey="randomMonthGenerator" subtitleKey="randomMonthGeneratorSubtitle" actionLabelKey="randomMonthGeneratorAction" output={output} onGenerate={()=>setOutput(Array.from({length:count},()=>months[Math.floor(Math.random()*12)]).join("\n"))} onClear={()=>setOutput("")} seoTitle={seo.title} seoContent={seo.content} seoFaqs={seo.faqs}>
    <div className="flex items-center justify-center gap-3"><label className="text-sm text-foreground font-medium">Count:</label><input type="number" min={1} max={100} value={count} onChange={e=>setCount(Math.max(1,Math.min(100,Number(e.target.value))))} className="w-20 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm" /></div>
  </RandomToolLayout>;
}
