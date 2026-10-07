"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const handleAction = useCallback(() => {
    const lines = input.split("\n");
    const seen = new Set<string>();
    setOutput(lines.filter(line => { const t = line.trim(); if(t===""||!seen.has(t)){seen.add(t);return true;}return false; }).join("\n"));
  }, [input]);
  return <TextToolLayout titleKey="duplicateLineRemover" subtitleKey="duplicateLineRemoverSubtitle" actionLabelKey="duplicateLineRemoverAction"
    inputText={input} onInputChange={t=>{setInput(t);setOutput("");}} outputText={output} onAction={handleAction}>
    <p className="text-muted-foreground text-sm sm:text-base text-center mb-6">Instantly remove duplicate lines from any list, document, or dataset. Paste your text and the tool scans every line, keeps the first occurrence, and discards all repeated copies — preserving the original order. Perfect for cleaning email lists, deduplicating CSV exports, removing accidental copy-paste repetitions, or sanitizing raw data before importing into a spreadsheet or database.</p>
  </TextToolLayout>;
}
