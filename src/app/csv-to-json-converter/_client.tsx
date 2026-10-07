"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const csvToJson=(csv:string):string=>{
  const lines=csv.trim().split("\n");if(!lines.length)return"{}";
  const headers=lines[0].split(",").map(h=>h.trim().replace(/^"|"$/g,""));
  const data=lines.slice(1).map(line=>{const vals=line.split(",").map(v=>v.trim().replace(/^"|"$/g,""));const obj:Record<string,string>={};headers.forEach((h,i)=>obj[h]=vals[i]||"");return obj;});
  return JSON.stringify(data,null,2);
};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="csvToJsonConverter" subtitleKey="csvToJsonConverterSubtitle" actionLabelKey="csvToJsonConverterAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>{ try{setOutput(csvToJson(input));}catch{setOutput("Error: Invalid CSV.");} }}>
    <p className="text-muted-foreground text-sm sm:text-base text-center">Convert CSV (Comma-Separated Values) data to a structured JSON array in one click. Paste your spreadsheet export or CSV file contents and instantly get a properly formatted JSON output. The first row is treated as the header, becoming the key names in each JSON object. Ideal for developers working with APIs, data pipelines, or migrating tabular data to NoSQL databases.</p>
  </TextToolLayout>;
}
