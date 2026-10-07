"use client";
import SearchButton from "@/components/SearchButton";
import Footer from "@/components/Footer";
import { useState, useCallback, memo } from "react";
import { toast } from "sonner";
import { Copy, Download, Trash2, Globe, ArrowLeft, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SubHeaderNav from "@/components/SubHeaderNav";
import SeoContentBlock, { FAQ } from "@/components/SeoContentBlock";
import { getSeoContent } from "@/data/seoContent";
import RelatedTools from "@/components/RelatedTools";
import RecentBlogPosts from "@/components/RecentBlogPosts";
import { usePathname } from "next/navigation";
import { localeNames, localeCountryCodes } from "@/i18n/translations";
import { useI18n } from "@/hooks/useI18n";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  toSentenceCase, toLowerCaseText, toUpperCaseText,
  toCapitalizedCase, toTitleCase, toInverseCase,
} from "@/lib/caseConverters";

export type ConverterKey = "sentenceCase" | "lowerCase" | "upperCase" | "capitalizedCase" | "titleCase" | "inverseCase";

const converterMap: Record<ConverterKey, (t: string) => string> = {
  sentenceCase: toSentenceCase,
  lowerCase: toLowerCaseText,
  upperCase: toUpperCaseText,
  capitalizedCase: toCapitalizedCase,
  titleCase: toTitleCase,
  inverseCase: toInverseCase,
};

interface SingleCaseConverterProps {
  converterKey: ConverterKey;
  downloadName: string;
  subtitle?: string;
  seoTitle?: string;
  seoContent?: React.ReactNode;
  seoFaqs?: FAQ[];
}

const SingleCaseConverter = memo(({ converterKey, downloadName, subtitle, seoTitle, seoContent, seoFaqs }: SingleCaseConverterProps) => {
  const { locale, setLocale, t } = useI18n("base");
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [text, setText] = useState("");

  const title = t[converterKey as keyof typeof t] as string;
  const centralizedSeo = getSeoContent(converterKey, title);
  const finalSeoTitle = seoTitle || centralizedSeo.title;
  const finalSeoContent = seoContent || centralizedSeo.content;
  const finalSeoFaqs = seoFaqs || centralizedSeo.faqs;

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const sentenceCount = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
  const lineCount = text.trim() ? text.split(/\n/).length : 0;

  const handleConvert = useCallback(() => setText(prev => converterMap[converterKey](prev)), [converterKey]);
  const handleCopy = useCallback(() => { navigator.clipboard.writeText(text); toast.success(t.copied); }, [text, t]);
  const handleDownload = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = downloadName; a.click(); URL.revokeObjectURL(url);
  }, [text, downloadName]);
  const handleClear = useCallback(() => { setText(""); toast(t.cleared); }, [t]);



  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <Link href="/" className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link> */}
            <Image src="/icon-512.png" alt="Casetivo" width={28} height={28} className="rounded-lg object-contain" />
            <Link href="/" className="text-lg font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Casetivo
            </Link>
          </div>
          <div className="hidden xl:flex flex-1 justify-center px-4 overflow-hidden">
            <SubHeaderNav />
          </div>
          <div className="flex items-center gap-2">
            <SearchButton />
            <ThemeToggle />
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-accent transition-colors">
                <Image src={`https://flagcdn.com/w20/${localeCountryCodes[locale]}.png`} width={16} height={12} alt="" className="rounded-[2px] object-cover shadow-sm" />
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 top-full mt-2 z-30 w-52 rounded-xl border border-border bg-card shadow-xl py-2 max-h-80 overflow-y-auto">
                  {(Object.keys(localeNames) as (keyof typeof localeNames)[]).map(l => (
                    <button key={l} onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={`flex items-center gap-3 w-full text-left px-4 py-2 text-sm transition-colors hover:bg-accent ${l === locale ? "text-primary font-semibold bg-accent" : "text-foreground"}`}>
                      <Image src={`https://flagcdn.com/w20/${localeCountryCodes[l]}.png`} width={16} height={12} alt="" className="rounded-[2px] object-cover shadow-sm" />{localeNames[l]}
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
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
            {title}
          </h1>
          <p className="text-muted-foreground text-base">{subtitle || t.subtitle}</p>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder={t.placeholder}
          className="w-full min-h-[220px] rounded-xl border border-border bg-card p-5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 resize-y text-base leading-relaxed transition-shadow"
          style={{ fontFamily: "var(--font-mono)" }} />
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground select-none">
          <span>{t.charCount}: <strong className="text-foreground">{charCount}</strong></span>
          <span className="text-border">|</span>
          <span>{t.wordCount}: <strong className="text-foreground">{wordCount}</strong></span>
          <span className="text-border">|</span>
          <span>{t.sentenceCount}: <strong className="text-foreground">{sentenceCount}</strong></span>
          <span className="text-border">|</span>
          <span>{t.lineCount}: <strong className="text-foreground">{lineCount}</strong></span>
        </div>
        <div className="flex justify-center">
          <button onClick={handleConvert} className="px-8 py-3 rounded-lg bg-primary text-primary-foreground text-base font-semibold hover:opacity-90 active:scale-[0.97] transition-all shadow-sm">
            {title}
          </button>
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
        <SeoContentBlock 
          title={finalSeoTitle} 
          content={finalSeoContent} 
          faqs={finalSeoFaqs} 
        />
        <RelatedTools 
          tools={[
            { href: "/sentence-case", title: "Sentence Case", description: "Capitalize the first letter of a sentence and leave all other letters as lowercase." },
            { href: "/lower-case", title: "Lower Case", description: "Convert all your text into lowercase letters." },
            { href: "/upper-case", title: "Upper Case", description: "Convert all your text into uppercase letters." },
            { href: "/title-case", title: "Title Case", description: "Capitalize the first letter of each word." },
            { href: "/inverse-case", title: "Inverse Case", description: "Reverse the case of each letter." }
          ].filter(t => t.href !== pathname)} 
        />
        <RecentBlogPosts />
      </main>
      <Footer />
    </div>
  );
});
SingleCaseConverter.displayName = "SingleCaseConverter";
export default SingleCaseConverter;
