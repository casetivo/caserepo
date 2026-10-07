"use client";
import { useState, useCallback } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const toRoman=(n:number):string=>{if(n<=0||n>3999)return String(n);const vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1];const syms=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];let r="";for(let i=0;i<vals.length;i++){while(n>=vals[i]){r+=syms[i];n-=vals[i];}}return r;};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  const handleAction=useCallback(()=>{
    const parts=input.trim().split(/[\/\-\.]/);
    if(parts.length===3){setOutput(parts.map(p=>toRoman(parseInt(p,10))).join(" / "));return;}
    const n=parseInt(input.trim(),10);
    if(!isNaN(n)){setOutput(toRoman(n));return;}
    setOutput(input.trim().replace(/\d+/g,m=>toRoman(parseInt(m,10))));
  },[input]);
  return <TextToolLayout titleKey="romanNumeralDateConverter" subtitleKey="romanNumeralDateConverterSubtitle" actionLabelKey="romanNumeralDateConverterAction"
    inputText={input} onInputChange={t=>{setInput(t);setOutput("");}} outputText={output} onAction={handleAction} />;
}
