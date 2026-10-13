"use client";
import SearchButton from "@/components/SearchButton";
import Footer from "@/components/Footer";
import { useState, useCallback, ReactNode, memo } from "react";
import { toast } from "sonner";
import { Copy, Trash2, ArrowLeft, Globe, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SubHeaderNav from "@/components/SubHeaderNav";
import SeoContentBlock, { FAQ } from "@/components/SeoContentBlock";
import { localeNames, localeCountryCodes } from "@/i18n/translations";
import type { RandomToolTranslationKeys } from "@/i18n/randomToolTranslationsEn";
import { useI18n } from "@/hooks/useI18n";
import { ThemeToggle } from "@/components/theme-toggle";
import RelatedTools from "@/components/RelatedTools";
import RecentBlogPosts from "@/components/RecentBlogPosts";
import { usePathname } from "next/navigation";

interface RandomToolLayoutProps {
  titleKey: keyof RandomToolTranslationKeys;
  subtitleKey: keyof RandomToolTranslationKeys;
  actionLabelKey: keyof RandomToolTranslationKeys;
  output: string;
  children?: ReactNode;
  onGenerate: () => void;
  onClear?: () => void;
  seoTitle?: string;
  seoContent?: ReactNode;
  seoFaqs?: FAQ[];
  relatedPostSlugs?: string[];
  relatedPostsTitle?: string;
}

const RandomToolLayout = memo(({ titleKey, subtitleKey, actionLabelKey, output, children, onGenerate, onClear, seoTitle, seoContent, seoFaqs, relatedPostSlugs, relatedPostsTitle }: RandomToolLayoutProps) => {
  const { locale, setLocale, t } = useI18n("random");
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  }, [output]);

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
            {t[titleKey]}
          </h1>
          <p className="text-muted-foreground text-base">{t[subtitleKey]}</p>
        </div>
        {children}
        <div className="flex justify-center">
          <button onClick={onGenerate}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground text-base font-semibold hover:opacity-90 active:scale-[0.97] transition-all shadow-sm">
            {t[actionLabelKey]}
          </button>
        </div>
        {output && (
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground mb-2 font-medium">Result</p>
            <pre className="whitespace-pre-wrap text-foreground text-base leading-relaxed select-all" style={{ fontFamily: "var(--font-mono)" }}>{output}</pre>
          </div>
        )}
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={handleCopy} disabled={!output} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <Copy className="w-4 h-4" /> Copy
          </button>
          {onClear && (
            <button onClick={onClear} disabled={!output} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-destructive/30 bg-card text-destructive text-sm font-medium hover:bg-destructive/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
        <SeoContentBlock 
          title={seoTitle ?? `How does the ${t[titleKey]} work?`} 
          content={seoContent || (
            <>
              <p>The <strong>{t[titleKey]}</strong> is a fast, free, and easy-to-use online tool designed to help you generate random data instantly.</p>
              <p className="mt-4">Whether you are testing an application, creating strong passwords, or rolling dice for a game, this tool simplifies your workflow. Simply configure your options and click generate.</p>
            </>
          )} 
          faqs={seoFaqs || [
            { question: `Is the ${t[titleKey]} free to use?`, answer: `Yes, the ${t[titleKey]} is 100% free with no limits, no ads, and no registration required.` },
            { question: `Is my data secure when using the ${t[titleKey]}?`, answer: `Absolutely. All generation happens entirely in your browser. We do not store, track, or save your generated data on our servers.` }
          ]} 
        />
        <RelatedTools 
          tools={[
            { href: "/random-choice-generator", title: "Random Choice Generator", description: "Pick a random choice from a list." },
            { href: "/random-number-generator", title: "Random Number Generator", description: "Generate highly secure random numbers." },
            { href: "/uuid-generator", title: "UUID Generator", description: "Generate secure UUIDs instantly." },
            { href: "/strong-password-generator", title: "Strong Password Generator", description: "Create highly secure passwords to protect your accounts." },
            { href: "/random-data-generator", title: "Random Data Generator", description: "Generate mock data for testing." },
            { href: "/random-ip-address-generator", title: "Random IP Generator", description: "Generate random IPv4/IPv6 addresses." },
            { href: "/random-letter-generator", title: "Random Letter Generator", description: "Generate random alphabetic characters." },
            { href: "/random-month-generator", title: "Random Month Generator", description: "Pick a random month of the year." }
          ].filter(t => t.href !== pathname).slice(0, 8)} 
        />
        <RecentBlogPosts postSlugs={relatedPostSlugs} title={relatedPostsTitle} />
      </main>
      <Footer />
    </div>
  );
});
RandomToolLayout.displayName = "RandomToolLayout";
export default RandomToolLayout;
