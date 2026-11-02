"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TOOL_CATEGORIES } from "@/lib/tools";

const ALL_TOOLS = TOOL_CATEGORIES.flatMap((cat) =>
  cat.tools.map((tool) => ({
    href: tool.href,
    title: tool.label,
    category: cat.name,
  }))
);

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredTools = useMemo(() => {
    if (!query) return ALL_TOOLS;
    const lowerQuery = query.toLowerCase();
    return ALL_TOOLS.filter(
      (tool) =>
        tool.title.toLowerCase().includes(lowerQuery) ||
        tool.category.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery("");
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center text-foreground hover:text-primary transition-colors cursor-pointer" 
        title="Search tools (Ctrl+K)"
        aria-label="Search tools"
      >
        <Search className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
          <div className="relative z-50 w-full max-w-xl rounded-xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200 mx-4 overflow-hidden flex flex-col max-h-[80vh]">
            <div className="flex items-center border-b border-border px-3">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search tools..."
                aria-label="Search tools"
                className="flex h-14 w-full rounded-md bg-transparent py-3 pl-3 pr-4 text-sm outline-none placeholder:text-muted-foreground text-foreground"
              />
              <button onClick={() => setIsOpen(false)} aria-label="Close search" className="rounded-full p-1.5 hover:bg-accent text-muted-foreground shrink-0 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-2">
              {filteredTools.length === 0 ? (
                <div className="py-14 text-center text-sm text-muted-foreground">
                  No tools found for &quot;{query}&quot;
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {filteredTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        router.push(tool.href);
                      }}
                      className="flex flex-col px-4 py-2.5 hover:bg-accent rounded-lg transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-medium text-foreground">{tool.title}</span>
                      <span className="text-xs text-muted-foreground mt-0.5">{tool.category}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
