"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const jsonToYaml=(obj:unknown,indent=0):string=>{const pad="  ".repeat(indent);if(obj===null)return"null";if(typeof obj==="boolean"||typeof obj==="number")return String(obj);if(typeof obj==="string")return obj.includes("\n")?`|\n${obj.split("\n").map(l=>pad+"  "+l).join("\n")}`:obj;if(Array.isArray(obj))return obj.map(v=>`${pad}- ${jsonToYaml(v,indent+1)}`).join("\n");if(typeof obj==="object")return Object.entries(obj as Record<string,unknown>).map(([k,v])=>{const val=jsonToYaml(v,indent+1);return typeof v==="object"&&v!==null?`${pad}${k}:\n${val}`:`${pad}${k}: ${val}`;}).join("\n");return String(obj);};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const handleAction=()=>{try{setOutput(jsonToYaml(JSON.parse(input)));}catch{setOutput("Error: Invalid JSON.");}};
  return <TextToolLayout titleKey="jsonToYamlConverter" subtitleKey="jsonToYamlConverterSubtitle" actionLabelKey="jsonToYamlConverterAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={handleAction} />;
}
