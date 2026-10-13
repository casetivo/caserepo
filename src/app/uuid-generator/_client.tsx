"use client";
import { useState } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

export default function ClientPage() {
  const [count,setCount]=useState(1); const [hyphens,setHyphens]=useState(true); const [upper,setUpper]=useState(false); const [output,setOutput]=useState("");
  const handleGenerate=()=>{const res=Array.from({length:count},()=>{let u=crypto.randomUUID();if(!hyphens)u=u.replace(/-/g,"");if(upper)u=u.toUpperCase();return u;});setOutput(res.join("\n"));};
  
  const seo = getSeoContent("uuid-generator", "UUID Generator");

  return <RandomToolLayout titleKey="uuidGenerator" subtitleKey="uuidGeneratorSubtitle" actionLabelKey="uuidGeneratorAction" output={output} onGenerate={handleGenerate} onClear={()=>setOutput("")} seoTitle={seo.title} seoContent={seo.content} seoFaqs={seo.faqs} relatedPostSlugs={["what-is-a-uuid", "uuid-v4-vs-auto-increment-ids", "when-to-use-uuid-v4"]} relatedPostsTitle="UUID and Developer Guides">
    <div className="flex flex-wrap items-center justify-center gap-3">
      <label className="text-sm text-foreground font-medium">Quantity:</label><input type="number" min={1} max={500} value={count} onChange={e=>setCount(Math.max(1,Math.min(500,Number(e.target.value))))} className="w-20 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm" />
    </div>
    <div className="flex justify-center gap-4 mt-2">
      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer"><input type="checkbox" checked={hyphens} onChange={e=>setHyphens(e.target.checked)} className="rounded border-border text-primary focus:ring-primary" /> Include Hyphens</label>
      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer"><input type="checkbox" checked={upper} onChange={e=>setUpper(e.target.checked)} className="rounded border-border text-primary focus:ring-primary" /> Uppercase</label>
    </div>
  </RandomToolLayout>;
}
