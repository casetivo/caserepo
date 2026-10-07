"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const fmtGQL=(s:string)=>{let d=0,r="";for(const c of s.trim()){if(c==="{"){r+=" {\n"+"  ".repeat(++d);}else if(c==="}"){r+="\n"+"  ".repeat(--d)+"}";}else if(c===","){r+=",\n"+"  ".repeat(d);}else{r+=c;}}return r.trim();};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="graphqlFormatter" subtitleKey="graphqlFormatterSubtitle" actionLabelKey="graphqlFormatterAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(fmtGQL(input))} />;
}
