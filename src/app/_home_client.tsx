"use client";
import { useState, useCallback } from "react";
import SearchButton from "@/components/SearchButton";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { toSentenceCase, toLowerCaseText, toUpperCaseText, toCapitalizedCase, toTitleCase, toInverseCase } from "@/lib/caseConverters";
import { localeNames, localeCountryCodes } from "@/i18n/translations";
import { useI18n } from "@/hooks/useI18n";
import { Copy, Dices, ImageIcon, Search, Trash2, Wrench, Globe, Download, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SubHeaderNav from "@/components/SubHeaderNav";
import { ThemeToggle } from "@/components/theme-toggle";

const caseButtons = [
  { key: "sentenceCase", fn: toSentenceCase }, { key: "lowerCase", fn: toLowerCaseText },
  { key: "upperCase", fn: toUpperCaseText }, { key: "capitalizedCase", fn: toCapitalizedCase },
  { key: "titleCase", fn: toTitleCase }, { key: "inverseCase", fn: toInverseCase },
] as const;

export default function HomeClientPage({ children, heading }: { children?: React.ReactNode, heading?: React.ReactNode }) {
  const [text, setText] = useState("");
  const { locale, setLocale, t } = useI18n("base");
  const { t: tt } = useI18n("text");
  const { t: it } = useI18n("image");
  const { t: rt } = useI18n("random");
  const [langOpen, setLangOpen] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const sentenceCount = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
  const lineCount = text.trim() ? text.split(/\n/).length : 0;

  const applyCase = useCallback((fn: (s: string) => string) => setText(prev => fn(prev)), []);
  const handleCopy = useCallback(() => { navigator.clipboard.writeText(text); toast.success(t.copied); }, [text, t]);
  const handleDownload = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "converted-text.txt"; a.click(); URL.revokeObjectURL(url);
  }, [text]);
  const handleClear = useCallback(() => { setText(""); toast(t.cleared); }, [t]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between xl:justify-start gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <Image src="/icon-512.png" alt="Casetivo" width={28} height={28} className="rounded-lg object-contain" />
            <Link href="/" className="text-lg font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Casetivo
            </Link>
          </div>
          
          <div className="hidden xl:flex flex-1 justify-center">
            <SubHeaderNav>
              <li className="shrink-0 flex items-center">
                <SearchButton />
              </li>
              <li className="text-border/60 select-none px-1">|</li>
              <li className="shrink-0 flex items-center">
                <ThemeToggle />
              </li>
              <li className="text-border/60 select-none px-1">|</li>
              <li className="shrink-0 flex items-center">
                <div className="relative">
                  <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 p-2 rounded-md text-sm font-medium text-foreground hover:bg-accent transition-colors cursor-pointer">
                <Image src={`https://flagcdn.com/w20/${localeCountryCodes[locale]}.png`} width={16} height={12} alt="Language Flag" className="rounded-[2px] object-cover shadow-sm" />
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
                  {langOpen && (
                    <>
                      <div className="fixed inset-0 z-20" onClick={() => setLangOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 z-30 w-52 rounded-xl border border-border bg-card shadow-xl py-2 max-h-80 overflow-y-auto">
                        {(Object.keys(localeNames) as (keyof typeof localeNames)[]).map(l => (
                          <button key={l} onClick={() => { setLocale(l); setLangOpen(false); }}
                            className={`flex items-center gap-3 w-full text-left px-4 py-2 text-sm transition-colors hover:bg-accent ${l === locale ? "text-primary font-semibold bg-accent" : "text-foreground"}`}>
                            <Image src={`https://flagcdn.com/w20/${localeCountryCodes[l]}.png`} width={16} height={12} alt="Language Flag" className="rounded-[2px] object-cover shadow-sm" />{localeNames[l]}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </li>
            </SubHeaderNav>
          </div>

          <div className="flex xl:hidden items-center gap-2 shrink-0">
            <SearchButton />
            <ThemeToggle />
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 p-2 rounded-md text-sm font-medium text-foreground hover:bg-accent transition-colors cursor-pointer">
                <Image src={`https://flagcdn.com/w20/${localeCountryCodes[locale]}.png`} width={16} height={12} alt="Language Flag" className="rounded-[2px] object-cover shadow-sm" />
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-30 w-52 rounded-xl border border-border bg-card shadow-xl py-2 max-h-80 overflow-y-auto">
                    {(Object.keys(localeNames) as (keyof typeof localeNames)[]).map(l => (
                      <button key={l} onClick={() => { setLocale(l); setLangOpen(false); }}
                        className={`flex items-center gap-3 w-full text-left px-4 py-2 text-sm transition-colors hover:bg-accent ${l === locale ? "text-primary font-semibold bg-accent" : "text-foreground"}`}>
                        <Image src={`https://flagcdn.com/w20/${localeCountryCodes[l]}.png`} width={16} height={12} alt="Language Flag" className="rounded-[2px] object-cover shadow-sm" />{localeNames[l]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="xl:hidden border-t border-border/60 bg-card/30 py-1 px-4">
          <SubHeaderNav />
        </div>
      </header>

      <main id="main-content" className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        {heading || (
          <div className="text-center mb-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Free Online Text, Code &amp; Image Tools
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        )}
        <div className="relative">
          <textarea aria-label="Input text" value={text} onChange={e => setText(e.target.value)} placeholder={t.placeholder}
            className="w-full min-h-[220px] rounded-xl border border-border bg-card p-5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 resize-y text-base leading-relaxed transition-shadow"
            style={{ fontFamily: "var(--font-mono)" }} />
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground select-none">
          <span>{t.charCount}: <strong className="text-foreground">{charCount}</strong></span>
          <span className="text-border">|</span>
          <span>{t.wordCount}: <strong className="text-foreground">{wordCount}</strong></span>
          <span className="text-border">|</span>
          <span>{t.sentenceCount}: <strong className="text-foreground">{sentenceCount}</strong></span>
          <span className="text-border">|</span>
          <span>{t.lineCount}: <strong className="text-foreground">{lineCount}</strong></span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {caseButtons.map(({ key, fn }) => (
            <button key={key} onClick={() => applyCase(fn)}
              className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all shadow-sm">
              {t[key as keyof typeof t]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={handleCopy} disabled={!text} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <Copy className="w-4 h-4" />{t.copy}
          </button>
          <button onClick={handleDownload} disabled={!text} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <Download className="w-4 h-4" />{t.download}
          </button>
          <button onClick={handleClear} disabled={!text} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-destructive/30 bg-card text-destructive text-sm font-medium hover:bg-destructive/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <Trash2 className="w-4 h-4" />{t.clear}
          </button>
        </div>
        {children}
      </main>

      <Footer />
    </div>
  );
}
