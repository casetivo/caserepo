"use client";
import { useState } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

const fn=["James","Mary","John","Patricia","Robert","Jennifer","Michael","Linda","David","Elizabeth"];
const ln=["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez"];
const dm=["gmail.com","yahoo.com","outlook.com","example.com"];
const st=["Main St","Oak Ave","Maple Dr","Cedar Ln","Elm St"];
const ct=["New York","Los Angeles","Chicago","Houston","Phoenix"];
const r=<T,>(a:T[])=>a[Math.floor(Math.random()*a.length)];
const ri=(mn:number,mx:number)=>Math.floor(Math.random()*(mx-mn+1))+mn;
export default function ClientPage() {
  const [count,setCount]=useState(5); const [output,setOutput]=useState("");
  const handleGenerate=()=>{
    setOutput(Array.from({length:count},()=>{const f=r(fn),l=r(ln);return `Name: ${f} ${l}\nEmail: ${f.toLowerCase()}.${l.toLowerCase()}${ri(1,99)}@${r(dm)}\nPhone: (${ri(200,999)}) ${ri(200,999)}-${ri(1000,9999)}\nAddress: ${ri(100,9999)} ${r(st)}, ${r(ct)}`;}).join("\n\n---\n\n"));
  };
  
  const seo = getSeoContent("random-data-generator", "Random Data Generator");

  return <RandomToolLayout titleKey="randomDataGenerator" subtitleKey="randomDataGeneratorSubtitle" actionLabelKey="randomDataGeneratorAction" output={output} onGenerate={handleGenerate} onClear={()=>setOutput("")} seoTitle={seo.title} seoContent={seo.content} seoFaqs={seo.faqs}>
    <div className="flex items-center justify-center gap-3"><label className="text-sm text-foreground font-medium">Count:</label><input type="number" min={1} max={50} value={count} onChange={e=>setCount(Math.max(1,Math.min(50,Number(e.target.value))))} className="w-20 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" /></div>
  </RandomToolLayout>;
}
