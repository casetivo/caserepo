"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const fmtJS=(code:string)=>{let d=0,r="",inStr=false,strChar="";for(let i=0;i<code.length;i++){const c=code[i];if(!inStr&&(c==='"'||c==="'"||c==="`")){inStr=true;strChar=c;r+=c;}else if(inStr&&c===strChar&&code[i-1]!=="\\"){inStr=false;r+=c;}else if(!inStr&&(c==="{"||c==="["||c==="(")){r+=c+"\n"+"  ".repeat(++d);}else if(!inStr&&(c==="}"||c==="]"||c===")")){r+="\n"+"  ".repeat(--d)+c;}else if(!inStr&&c===";"){r+=c+"\n"+"  ".repeat(d);}else{r+=c;}}return r.trim();};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="javascriptFormatter" subtitleKey="javascriptFormatterSubtitle" actionLabelKey="javascriptFormatterAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(fmtJS(input))} />;
}
