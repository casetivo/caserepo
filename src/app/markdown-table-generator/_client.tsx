"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const genTable=(input:string)=>{const lines=input.trim().split("\n").filter(l=>l.trim());if(!lines.length)return"";const rows=lines.map(l=>l.split(/[,\t|]/).map(c=>c.trim()));const cols=Math.max(...rows.map(r=>r.length));const norm=rows.map(r=>{while(r.length<cols)r.push("");return r;});const widths=Array.from({length:cols},(_,i)=>Math.max(3,...norm.map(r=>r[i].length)));const fmtRow=(r:string[])=>"| "+r.map((c,i)=>c.padEnd(widths[i])).join(" | ")+" |";const sep="| "+widths.map(w=>"-".repeat(w)).join(" | ")+" |";return[fmtRow(norm[0]),sep,...norm.slice(1).map(fmtRow)].join("\n");};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="markdownTableGenerator" subtitleKey="markdownTableGeneratorSubtitle" actionLabelKey="markdownTableGeneratorAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(genTable(input))} />;
}
