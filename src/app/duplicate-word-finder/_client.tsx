"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const handleAction = useCallback(() => {
    const words = input.toLowerCase().match(/\b\w+\b/g) || [];
    const freq: Record<string,number> = {};
    words.forEach(w => freq[w] = (freq[w]||0)+1);
    const dupes = Object.entries(freq).filter(([,c])=>c>1).sort((a,b)=>b[1]-a[1]);
    setOutput(dupes.length ? dupes.map(([w,c])=>`"${w}" — ${c} times`).join("\n") : "No duplicate words found.");
  }, [input]);
  return <TextToolLayout titleKey="duplicateWordFinder" subtitleKey="duplicateWordFinderSubtitle" actionLabelKey="duplicateWordFinderAction"
    inputText={input} onInputChange={t=>{setInput(t);setOutput("");}} outputText={output} onAction={handleAction} />;
}
