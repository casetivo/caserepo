"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const handleAction = useCallback(() => {
    setOutput(input.replace(/—/g,"").replace(/--/g,"").replace(/–/g,"-").replace(/  +/g," ").trim());
  }, [input]);
  return <TextToolLayout titleKey="emDashRemover" subtitleKey="emDashRemoverSubtitle" actionLabelKey="emDashRemoverAction"
    inputText={input} onInputChange={t=>{setInput(t);setOutput("");}} outputText={output} onAction={handleAction} />;
}
