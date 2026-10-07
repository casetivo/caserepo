"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const fmt=(md:string)=>{let r=md.replace(/\r\n/g,"\n");r=r.replace(/^(#{1,6})([^\s#])/gm,"$1 $2");r=r.replace(/([^\n])\n(#{1,6}\s)/g,"$1\n\n$2");r=r.replace(/^\s*[*+]\s+/gm,"- ");r=r.replace(/[ \t]+$/gm,"");r=r.replace(/\n{3,}/g,"\n\n");return r.trim();};
const preview=(md:string)=>{let h=md;h=h.replace(/^#{6}\s+(.+)$/gm,"<h6>$1</h6>");h=h.replace(/^#{5}\s+(.+)$/gm,"<h5>$1</h5>");h=h.replace(/^#{4}\s+(.+)$/gm,"<h4>$1</h4>");h=h.replace(/^#{3}\s+(.+)$/gm,"<h3>$1</h3>");h=h.replace(/^#{2}\s+(.+)$/gm,"<h2>$1</h2>");h=h.replace(/^#\s+(.+)$/gm,"<h1>$1</h1>");h=h.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>");h=h.replace(/\*(.+?)\*/g,"<em>$1</em>");h=h.replace(/`(.+?)`/g,"<code>$1</code>");return h;};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const [mode,setMode]=useState<"format"|"preview">("format");
  return <TextToolLayout titleKey="markdownFormatterPreviewer" subtitleKey="markdownFormatterPreviewerSubtitle" actionLabelKey="markdownFormatterPreviewerAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(mode==="format"?fmt(input):preview(input))}>
    <div className="flex justify-center gap-2">{(["format","preview"] as const).map(m=><button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${mode===m?"bg-primary text-primary-foreground":"bg-card border border-border text-foreground hover:bg-accent"}`}>{m==="format"?"Format":"Preview HTML"}</button>)}</div>
  </TextToolLayout>;
}
