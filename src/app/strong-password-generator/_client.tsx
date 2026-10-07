"use client";
import { useState } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

export default function ClientPage() {
  const [len,setLen]=useState(16); const [upper,setUpper]=useState(true); const [lower,setLower]=useState(true);
  const [nums,setNums]=useState(true); const [syms,setSyms]=useState(true); const [count,setCount]=useState(5); const [output,setOutput]=useState("");
  const handleGenerate=()=>{let c="";if(upper)c+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";if(lower)c+="abcdefghijklmnopqrstuvwxyz";if(nums)c+="0123456789";if(syms)c+="!@#$%^&*()_+-=[]{}|;:,.<>?";if(!c){setOutput("Please select at least one character type.");return;}setOutput(Array.from({length:count},()=>Array.from({length:len},()=>c[Math.floor(Math.random()*c.length)]).join("")).join("\n"));};
  const T=({label,val,set}:{label:string;val:boolean;set:(v:boolean)=>void})=><button onClick={()=>set(!val)} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${val?"bg-primary text-primary-foreground":"bg-card border border-border text-foreground hover:bg-accent"}`}>{label}</button>;
  
  const seo = getSeoContent("strong-password-generator", "Strong Password Generator");

  return <RandomToolLayout titleKey="strongPasswordGenerator" subtitleKey="strongPasswordGeneratorSubtitle" actionLabelKey="strongPasswordGeneratorAction" output={output} onGenerate={handleGenerate} onClear={()=>setOutput("")} seoTitle={seo.title} seoContent={seo.content} seoFaqs={seo.faqs}>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <label className="text-sm text-foreground font-medium">Length:</label><input type="number" min={4} max={128} value={len} onChange={e=>setLen(Math.max(4,Math.min(128,Number(e.target.value))))} className="w-20 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm" />
      <label className="text-sm text-foreground font-medium ml-2">Count:</label><input type="number" min={1} max={50} value={count} onChange={e=>setCount(Math.max(1,Math.min(50,Number(e.target.value))))} className="w-20 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm" />
    </div>
    <div className="flex flex-wrap justify-center gap-2"><T label="A-Z" val={upper} set={setUpper}/><T label="a-z" val={lower} set={setLower}/><T label="0-9" val={nums} set={setNums}/><T label="!@#$" val={syms} set={setSyms}/></div>
  </RandomToolLayout>;
}
