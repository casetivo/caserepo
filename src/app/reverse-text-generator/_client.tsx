"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="reverseTextGenerator" subtitleKey="reverseTextGeneratorSubtitle" actionLabelKey="reverseTextGeneratorAction"
    inputText={input} onInputChange={t=>{setInput(t);setOutput("");}} outputText={output} onAction={()=>setOutput(input.split("").reverse().join(""))} />;
}
