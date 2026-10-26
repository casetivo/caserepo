"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { t } = useI18n("base");
  const { t: tt } = useI18n("text");
  const { t: it } = useI18n("image");
  const { t: rt } = useI18n("random");

  const allTools = useMemo(() => {
    return [
      // Text Tools
      { href: "/sentence-case", title: t.sentenceCase as string, category: tt.textTools as string },
      { href: "/lower-case", title: t.lowerCase as string, category: tt.textTools as string },
      { href: "/upper-case", title: t.upperCase as string, category: tt.textTools as string },
      { href: "/capitalized-case", title: t.capitalizedCase as string, category: tt.textTools as string },
      { href: "/title-case", title: t.titleCase as string, category: tt.textTools as string },
      { href: "/inverse-case", title: t.inverseCase as string, category: tt.textTools as string },

      // Text Tools
      ...([
        ["duplicate-line-remover", "duplicateLineRemover"], ["duplicate-word-finder", "duplicateWordFinder"], ["em-dash-remover", "emDashRemover"], ["plain-text-converter", "plainTextConverter"], ["remove-letters-characters", "removeLettersCharacters"], ["sentence-rewriter", "sentenceRewriter"], ["repeat-text-generator", "repeatTextGenerator"], ["reverse-text-generator", "reverseTextGenerator"], ["roman-numeral-date-converter", "romanNumeralDateConverter"], ["sort-words-alphabetically", "sortWordsAlphabetically"], ["text-replacement-tool", "textReplacementTool"]
      ] as const).map(([href, key]) => ({ href: `/${href}`, title: tt[key] as string, category: tt.textTools as string })),

      // Code & Data
      ...([
        ["base64-encoder-decoder", "base64EncoderDecoder"], ["binary-code-translator", "binaryCodeTranslator"], ["css-formatter", "cssFormatter"], ["csv-to-json-converter", "csvToJsonConverter"], ["caesar-cipher-tool", "caesarCipherTool"], ["graphql-formatter", "graphqlFormatter"], ["html-formatter", "htmlFormatter"], ["hex-to-text-converter", "hexToTextConverter"], ["json-formatter", "jsonFormatter"], ["url-encoder-decoder", "urlEncoderDecoder"], ["markdown-to-html-converter", "markdownToHtmlConverter"], ["json-stringifier", "jsonStringifier"], ["json-to-yaml-converter", "jsonToYamlConverter"], ["json-stringify-text-generator", "jsonStringifyTextGenerator"], ["javascript-formatter", "javascriptFormatter"], ["md5-hash-generator", "md5HashGenerator"], ["markdown-formatter-previewer", "markdownFormatterPreviewer"], ["markdown-table-generator", "markdownTableGenerator"], ["morse-code-translator", "morseCodeTranslator"], ["number-sorter", "numberSorter"], ["rot13-encoder-decoder", "rot13EncoderDecoder"], ["regex-text-tool", "regexTextTool"], ["scss-formatter", "scssFormatter"]
      ] as const).map(([href, key]) => ({ href: `/${href}`, title: tt[key] as string, category: tt.codeAndData as string })),

      // Image
      { href: "/ai-image-to-text", title: it.aiImageToText as string, category: it.imageAndMedia as string },
      { href: "/ascii-art-generator", title: it.asciiArtGenerator as string, category: it.imageAndMedia as string },
      { href: "/jpg-to-png-converter", title: it.jpgToPng as string, category: it.imageAndMedia as string },
      { href: "/jpg-to-webp-converter", title: it.jpgToWebp as string, category: it.imageAndMedia as string },
      { href: "/png-to-jpg-converter", title: it.pngToJpg as string, category: it.imageAndMedia as string },
      { href: "/png-to-webp-converter", title: it.pngToWebp as string, category: it.imageAndMedia as string },
      { href: "/svg-to-png-converter", title: it.svgToPng as string, category: it.imageAndMedia as string },
      { href: "/webp-to-png-converter", title: it.webpToPng as string, category: it.imageAndMedia as string },
      { href: "/webp-to-jpg-converter", title: it.webpToJpg as string, category: it.imageAndMedia as string },

      // Random
      { href: "/random-choice-generator", title: rt.randomChoiceGenerator as string, category: rt.randomGenerators as string },
      { href: "/random-data-generator", title: rt.randomDataGenerator as string, category: rt.randomGenerators as string },
      { href: "/random-ip-address-generator", title: rt.randomIpAddressGenerator as string, category: rt.randomGenerators as string },
      { href: "/random-letter-generator", title: rt.randomLetterGenerator as string, category: rt.randomGenerators as string },
      { href: "/random-month-generator", title: rt.randomMonthGenerator as string, category: rt.randomGenerators as string },
      { href: "/random-number-generator", title: rt.randomNumberGenerator as string, category: rt.randomGenerators as string },
      { href: "/strong-password-generator", title: rt.strongPasswordGenerator as string, category: rt.randomGenerators as string },
      { href: "/uuid-generator", title: rt.uuidGenerator as string, category: rt.randomGenerators as string },
    ];
  }, [t, tt, it, rt]);

  const filteredTools = useMemo(() => {
    if (!query) return allTools;
    const lowerQuery = query.toLowerCase();
    return allTools.filter(tool => 
      String(tool.title).toLowerCase().includes(lowerQuery) || 
      String(tool.category).toLowerCase().includes(lowerQuery)
    );
  }, [query, allTools]);

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
