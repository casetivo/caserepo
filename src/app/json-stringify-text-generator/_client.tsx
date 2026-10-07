"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="jsonStringifyTextGenerator" subtitleKey="jsonStringifyTextGeneratorSubtitle" actionLabelKey="jsonStringifyTextGeneratorAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(JSON.stringify(input))} />;
}
