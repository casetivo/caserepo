"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Link, Image, Code, Quote } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface RichTextEditorProps { value: string; onChange: (value: string) => void; }

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const exec = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };
  const insertTag = (tag: string) => {
    const selection = window.getSelection();
    if (!selection || !editorRef.current) return;
    if (tag === "h1" || tag === "h2" || tag === "h3") exec("formatBlock", `<${tag}>`);
    else if (tag === "blockquote") exec("formatBlock", "<blockquote>");
    else if (tag === "code") exec("insertHTML", `<pre><code>${selection.toString() || "code"}</code></pre>`);
    else if (tag === "link") { const url = prompt("Enter URL:"); if (url) exec("createLink", url); }
    else if (tag === "image") { const url = prompt("Enter image URL:"); if (url) exec("insertImage", url); }
  };
  const tools = [
    { icon: Bold, action: () => exec("bold"), label: "Bold" },
    { icon: Italic, action: () => exec("italic"), label: "Italic" },
    { icon: Heading1, action: () => insertTag("h1"), label: "Heading 1" },
    { icon: Heading2, action: () => insertTag("h2"), label: "Heading 2" },
    { icon: Heading3, action: () => insertTag("h3"), label: "Heading 3" },
    { icon: List, action: () => exec("insertUnorderedList"), label: "Bullet List" },
    { icon: ListOrdered, action: () => exec("insertOrderedList"), label: "Numbered List" },
    { icon: Quote, action: () => insertTag("blockquote"), label: "Quote" },
    { icon: Code, action: () => insertTag("code"), label: "Code" },
    { icon: Link, action: () => insertTag("link"), label: "Link" },
    { icon: Image, action: () => insertTag("image"), label: "Image" },
  ];
  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/50">
        {tools.map(tool => (
          <Tooltip key={tool.label}>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={tool.action}>
                <tool.icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{tool.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div
        ref={editorRef} contentEditable
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded [&_img]:max-w-full [&_img]:rounded"
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={() => { if (editorRef.current) onChange(editorRef.current.innerHTML); }}
      />
    </div>
  );
};
export default RichTextEditor;
