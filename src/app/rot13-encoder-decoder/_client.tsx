"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const rot13=(t:string)=>t.replace(/[a-zA-Z]/g,c=>{const b=c<="Z"?65:97;return String.fromCharCode(((c.charCodeAt(0)-b+13)%26)+b);});
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="rot13EncoderDecoder" subtitleKey="rot13EncoderDecoderSubtitle" actionLabelKey="rot13EncoderDecoderAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(rot13(input))} />;
}
