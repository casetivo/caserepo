"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const fmtSCSS=(s:string)=>{let d=0,r="";for(const c of s.trim()){if(c==="{"){r+=" {\n"+"  ".repeat(++d);}else if(c==="}"){r+="\n"+"  ".repeat(--d)+"}\n"+"  ".repeat(d);}else if(c===";"){r+=";\n"+"  ".repeat(d);}else{r+=c;}}return r.trim();};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="scssFormatter" subtitleKey="scssFormatterSubtitle" actionLabelKey="scssFormatterAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(fmtSCSS(input))}>
    <p className="text-muted-foreground text-sm sm:text-base text-center mb-6">Format and beautify minified or messy SCSS (Sassy CSS) code instantly. Paste your SCSS and the formatter applies consistent indentation, properly aligns nested rules, and makes your stylesheet human-readable. Ideal for developers who receive minified CSS from build tools, need to debug styles, or want to clean up code before code review.</p>
  </TextToolLayout>;
}
