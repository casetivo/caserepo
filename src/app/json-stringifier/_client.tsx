"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const handleAction=()=>{try{const p=JSON.parse(input);setOutput(JSON.stringify(JSON.stringify(p)));}catch{try{setOutput(JSON.stringify(input));}catch{setOutput("Error: Could not stringify input.");}}};
  return <TextToolLayout titleKey="jsonStringifier" subtitleKey="jsonStringifierSubtitle" actionLabelKey="jsonStringifierAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={handleAction} />;
}
