"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const rewrite = (text: string) => {
  const sents = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[text];
  return sents.map(s=>{let r=s.trim();r=r.replace(/\b(very|really|just|basically|actually|literally|totally)\b\s*/gi,"");r=r.replace(/\s{2,}/g," ");return r.charAt(0).toUpperCase()+r.slice(1);}).join(" ");
};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="sentenceRewriter" subtitleKey="sentenceRewriterSubtitle" actionLabelKey="sentenceRewriterAction"
    inputText={input} onInputChange={t=>{setInput(t);setOutput("");}} outputText={output} onAction={()=>setOutput(rewrite(input))}>
    <p className="text-muted-foreground text-sm sm:text-base text-center mb-6">Tighten your writing by removing weak filler words and hedging language. Paste your text and the tool automatically strips out overused words like &quot;very&quot;, &quot;basically&quot;, &quot;literally&quot;, &quot;just&quot;, and &quot;actually&quot; that dilute the strength of your sentences. Great for polishing blog posts, professional emails, cover letters, and any writing where clarity and confidence matter.</p>
  </TextToolLayout>;
}
