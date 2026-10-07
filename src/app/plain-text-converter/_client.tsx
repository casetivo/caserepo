"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const handleAction = useCallback(() => {
    let t = input.replace(/<[^>]*>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/&quot;/g,'"').replace(/—/g,"-").replace(/–/g,"-").replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/  +/g," ").trim();
    setOutput(t);
  }, [input]);
  return <TextToolLayout titleKey="plainTextConverter" subtitleKey="plainTextConverterSubtitle" actionLabelKey="plainTextConverterAction"
    inputText={input} onInputChange={t=>{setInput(t);setOutput("");}} outputText={output} onAction={handleAction}>
    <p className="text-muted-foreground text-sm sm:text-base text-center mb-6">Strip all rich formatting from text in one click. Removes HTML tags, smart quotes, em dashes, special Unicode characters, and invisible formatting marks — leaving you with clean, plain ASCII text. Perfect for pasting content into plain-text editors, sanitizing input before inserting into databases, cleaning up copy-pasted content from Word or PDFs, or preparing text for APIs that don&apos;t support rich formatting.</p>
  </TextToolLayout>;
}
