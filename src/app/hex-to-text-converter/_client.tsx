"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const isHex=(t:string)=>/^[0-9a-fA-F\s]+$/.test(t.trim());
const toHex=(t:string)=>t.split("").map(c=>c.charCodeAt(0).toString(16).padStart(2,"0")).join(" ");
const fromHex=(t:string)=>{try{return t.trim().split(/\s+/).map(h=>String.fromCharCode(parseInt(h,16))).join("");}catch{return "Invalid hex input.";}};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="hexToTextConverter" subtitleKey="hexToTextConverterSubtitle" actionLabelKey="hexToTextConverterAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(isHex(input)?fromHex(input):toHex(input))}>
    <p className="text-muted-foreground text-sm sm:text-base text-center mb-6">Convert hexadecimal values to readable plain text, or encode plain text into its hexadecimal representation. Hex encoding is commonly used in programming, networking, color codes, and low-level data inspection. Paste your hex string (e.g. <code className="font-mono text-xs bg-muted px-1 rounded">48 65 6C 6C 6F</code>) and decode it to ASCII text, or go the other direction and encode any string to hex instantly.</p>
  </TextToolLayout>;
}
