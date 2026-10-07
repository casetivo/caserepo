"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const toBinary=(t:string)=>t.split("").map(c=>c.charCodeAt(0).toString(2).padStart(8,"0")).join(" ");
const fromBinary=(t:string)=>{try{return t.trim().split(/\s+/).map(b=>String.fromCharCode(parseInt(b,2))).join("");}catch{return "Invalid binary input.";}};
const isBinary=(t:string)=>/^[01\s]+$/.test(t.trim());
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="binaryCodeTranslator" subtitleKey="binaryCodeTranslatorSubtitle" actionLabelKey="binaryCodeTranslatorAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(isBinary(input)?fromBinary(input):toBinary(input))} />;
}
