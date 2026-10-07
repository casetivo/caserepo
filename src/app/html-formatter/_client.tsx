"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const fmtHTML=(html:string)=>{let d=0,r="";html.replace(/<!--[\s\S]*?-->|<\/?[^>]+>|[^<]+/g,m=>{if(/^<!--/.test(m)){r+="  ".repeat(d)+m+"\n";}else if(/^<\//.test(m)){r+="  ".repeat(--d)+m+"\n";}else if(/^<[^!]/.test(m)&&!/\/>$/.test(m)&&!/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i.test(m)){r+="  ".repeat(d)+m+"\n";d++;}else if(/^</.test(m)){r+="  ".repeat(d)+m+"\n";}else{const t=m.trim();if(t)r+="  ".repeat(d)+t+"\n";}return m;});return r.trim();};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="htmlFormatter" subtitleKey="htmlFormatterSubtitle" actionLabelKey="htmlFormatterAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(fmtHTML(input))} />;
}
