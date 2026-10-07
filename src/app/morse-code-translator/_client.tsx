"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const ctm:Record<string,string>={A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..",0:"-----",1:".----",2:"..---",3:"...--",4:"....-",5:".....",6:"-....",7:"--...",8:"---..",9:"----."," ":"/"};
const mtc=Object.fromEntries(Object.entries(ctm).map(([k,v])=>[v,k]));
const t2m=(t:string)=>t.toUpperCase().split("").map(c=>ctm[c]||c).join(" ");
const m2t=(m:string)=>m.split(" ").map(c=>c==="/"?" ":mtc[c]||c).join("");
const isMorse=(t:string)=>/^[.\-/ ]+$/.test(t.trim());
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="morseCodeTranslator" subtitleKey="morseCodeTranslatorSubtitle" actionLabelKey="morseCodeTranslatorAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(isMorse(input)?m2t(input):t2m(input))} />;
}
