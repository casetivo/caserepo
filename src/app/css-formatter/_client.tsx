"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const formatCSS=(css:string)=>{let r=css.replace(/\s*{\s*/g," {\n  ").replace(/;\s*/g,";\n  ").replace(/\s*}\s*/g,"\n}\n").replace(/  \n}/g,"\n}");return r.trim();};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="cssFormatter" subtitleKey="cssFormatterSubtitle" actionLabelKey="cssFormatterAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(formatCSS(input))} />;
}
