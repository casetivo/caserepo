"use client";
import { useState } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

export default function ClientPage() {
  const [items,setItems]=useState("Apple\nBanana\nCherry\nDate\nElderberry");
  const [output,setOutput]=useState("");
  const handleGenerate=()=>{const c=items.split("\n").map(s=>s.trim()).filter(Boolean);if(!c.length){setOutput("Please enter at least one choice.");return;}setOutput(c[Math.floor(Math.random()*c.length)]);};
  
  const seo = getSeoContent("random-choice-generator", "Random Choice Generator");

  return <RandomToolLayout titleKey="randomChoiceGenerator" subtitleKey="randomChoiceGeneratorSubtitle" actionLabelKey="randomChoiceGeneratorAction" output={output} onGenerate={handleGenerate} onClear={()=>setOutput("")} seoTitle={seo.title} seoContent={seo.content} seoFaqs={seo.faqs}>
    <p className="text-muted-foreground text-sm sm:text-base text-center mb-6">Can&apos;t decide? Enter your options — one per line — and let the random picker choose for you. Use it to settle debates, pick a restaurant, assign tasks randomly, or make any decision where you want an unbiased result. Add as many choices as you need and click to pick a winner instantly.</p>
    <textarea value={items} onChange={e=>setItems(e.target.value)} placeholder="Enter one choice per line..." className="w-full min-h-[160px] rounded-xl border border-border bg-card p-5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 resize-y text-base leading-relaxed" style={{fontFamily:"var(--font-mono)"}} />
  </RandomToolLayout>;
}
