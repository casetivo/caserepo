"use client";
import { useState } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

export default function ClientPage() {
  const [count,setCount]=useState(10); const [ct,setCt]=useState<"upper"|"lower"|"mixed">("mixed"); const [output,setOutput]=useState("");
  const handleGenerate=()=>{setOutput(Array.from({length:count},()=>{const c=String.fromCharCode(Math.floor(Math.random()*26)+65);return ct==="lower"?c.toLowerCase():ct==="upper"?c:Math.random()>0.5?c:c.toLowerCase();}).join(" "));};
  
  const seo = getSeoContent("random-letter-generator", "Random Letter Generator");

  return <RandomToolLayout titleKey="randomLetterGenerator" subtitleKey="randomLetterGeneratorSubtitle" actionLabelKey="randomLetterGeneratorAction" output={output} onGenerate={handleGenerate} onClear={()=>setOutput("")} seoTitle={seo.title} seoContent={seo.content} seoFaqs={seo.faqs}>
    <p className="text-muted-foreground text-sm sm:text-base text-center mb-6">Generate random letters from the English alphabet instantly. Choose between uppercase, lowercase, or mixed case output, and set how many letters you need. Perfect for word games, educational activities, password hints, or testing string-based inputs in software development.</p>
    <div className="flex flex-wrap items-center justify-center gap-3">
      {(["upper","lower","mixed"] as const).map(c=><button key={c} onClick={()=>setCt(c)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${ct===c?"bg-primary text-primary-foreground":"bg-card border border-border text-foreground hover:bg-accent"}`}>{c}</button>)}
      <label className="text-sm text-foreground font-medium ml-4">Count:</label>
      <input type="number" min={1} max={500} value={count} onChange={e=>setCount(Math.max(1,Math.min(500,Number(e.target.value))))} className="w-20 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm" />
    </div>
  </RandomToolLayout>;
}
