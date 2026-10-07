"use client";
import { useState } from "react";
import TextToolLayout from "@/components/TextToolLayout";
const mdToHtml=(md:string)=>{let h=md;h=h.replace(/^######\s+(.+)$/gm,"<h6>$1</h6>");h=h.replace(/^#####\s+(.+)$/gm,"<h5>$1</h5>");h=h.replace(/^####\s+(.+)$/gm,"<h4>$1</h4>");h=h.replace(/^###\s+(.+)$/gm,"<h3>$1</h3>");h=h.replace(/^##\s+(.+)$/gm,"<h2>$1</h2>");h=h.replace(/^#\s+(.+)$/gm,"<h1>$1</h1>");h=h.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>");h=h.replace(/\*(.+?)\*/g,"<em>$1</em>");h=h.replace(/`(.+?)`/g,"<code>$1</code>");h=h.replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2">$1</a>');h=h.replace(/^\s*[-*+]\s+(.+)$/gm,"<li>$1</li>");h=h.replace(/^---$/gm,"<hr />");h=h.replace(/^>\s+(.+)$/gm,"<blockquote>$1</blockquote>");h=h.replace(/\n\n/g,"</p><p>");h="<p>"+h+"</p>";return h;};
export default function ClientPage() {
  const [input,setInput]=useState(""); const [output,setOutput]=useState("");
  return <TextToolLayout titleKey="markdownToHtmlConverter" subtitleKey="markdownToHtmlConverterSubtitle" actionLabelKey="markdownToHtmlConverterAction"
    inputText={input} onInputChange={setInput} outputText={output} onAction={()=>setOutput(mdToHtml(input))} />;
}
