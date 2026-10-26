"use client";
import SearchButton from "@/components/SearchButton";
import Footer from "@/components/Footer";
import { useState, useCallback, useRef, ReactNode, memo } from "react";
import { toast } from "sonner";
import { ArrowLeft, Globe, Upload, Download, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SubHeaderNav from "@/components/SubHeaderNav";
import SeoContentBlock, { FAQ } from "@/components/SeoContentBlock";
import { getSeoContent } from "@/data/seoContent";
import SchemaMarkup from "@/components/SchemaMarkup";
import RelatedTools from "@/components/RelatedTools";
import RecentBlogPosts from "@/components/RecentBlogPosts";
import { usePathname } from "next/navigation";
import { localeNames, localeCountryCodes, SHOW_LANGUAGE_SWITCHER } from "@/i18n/translations";
import { useI18n } from "@/hooks/useI18n";
import { ThemeToggle } from "@/components/theme-toggle";

interface ImageToolLayoutProps {
  title: string;
  subtitle: string;
  acceptFormats: string;
  actionLabel: string;
  onProcess: (file: File, canvas: HTMLCanvasElement) => Promise<{ resultUrl?: string; resultText?: string }>;
  children?: ReactNode;
  toolKey?: string;
  seoTitle?: string;
  seoContent?: ReactNode;
  seoFaqs?: FAQ[];
}

const ImageToolLayout = memo(({ toolKey, title, subtitle, acceptFormats, actionLabel, onProcess, children, seoTitle, seoContent, seoFaqs }: ImageToolLayoutProps) => {
  const { locale, setLocale, t } = useI18n("image");
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [resultText, setResultText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const defaultToolKey = pathname.replace(/^\/+/, "").replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  const centralizedSeo = getSeoContent(toolKey || defaultToolKey, title);
  const finalSeoTitle = seoTitle || centralizedSeo.title;
  const finalSeoContent = seoContent || centralizedSeo.content;
  const finalSeoFaqs = seoFaqs || centralizedSeo.faqs;
  const handleFile = useCallback((f: File) => {
    setFile(f); setResultUrl(""); setResultText("");
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleAction = useCallback(async () => {
    if (!file || !canvasRef.current) return;
    setProcessing(true);
    try {
      const result = await onProcess(file, canvasRef.current);
      if (result.resultUrl) setResultUrl(result.resultUrl);
      if (result.resultText) setResultText(result.resultText);
      toast.success(t.conversionComplete);
    } catch { toast.error("Error processing image"); }
    finally { setProcessing(false); }
  }, [file, onProcess, t]);

  const handleDownload = useCallback(() => {
    if (!resultUrl) return;
    const a = document.createElement("a"); a.href = resultUrl;
    a.download = `converted.${resultUrl.includes("image/png") ? "png" : resultUrl.includes("image/webp") ? "webp" : "jpg"}`;
    a.click();
  }, [resultUrl]);

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
            {SHOW_LANGUAGE_SWITCHER && (
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
            )}
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
          <p className="text-muted-foreground text-base">{subtitle}</p>
        </div>
        {children}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent/30"}`}>
          <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground text-sm">{t.dropOrClick}</p>
          <p className="text-muted-foreground/50 text-xs mt-1">{acceptFormats.toUpperCase()}</p>
          <input ref={fileInputRef} type="file" accept={acceptFormats} className="hidden"
            onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
        </div>
        {preview && (
          <div className="rounded-xl border border-border bg-card p-4 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="max-h-64 rounded-lg object-contain" />
          </div>
        )}
        <div className="flex justify-center">
          <button onClick={handleAction} disabled={!file || processing}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground text-base font-semibold hover:opacity-90 active:scale-[0.97] transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">
            {processing ? t.processing : actionLabel}
          </button>
        </div>
        {resultUrl && (
          <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resultUrl} alt="Result" className="max-h-64 rounded-lg object-contain" />
            <button onClick={handleDownload} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all">
              <Download className="w-4 h-4" /> {t.downloadResult}
            </button>
          </div>
        )}
        {resultText && (
          <div className="rounded-xl border border-border bg-card p-5">
            <pre className="whitespace-pre-wrap text-foreground text-sm leading-relaxed font-mono">{resultText}</pre>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
        <SeoContentBlock 
          title={finalSeoTitle} 
          content={finalSeoContent} 
          faqs={finalSeoFaqs} 
        />
        <RelatedTools 
          tools={[
            { href: "/jpg-to-png-converter", title: "JPG to PNG", description: "Convert JPG images to PNG with transparency." },
            { href: "/png-to-jpg-converter", title: "PNG to JPG", description: "Convert PNG images to JPG format." },
            { href: "/webp-to-png-converter", title: "WebP to PNG", description: "Convert WebP images to PNG." },
            { href: "/ai-image-to-text", title: "AI Image to Text", description: "Extract text from images using AI." },
            { href: "/jpg-to-webp-converter", title: "JPG to WebP", description: "Convert JPG to WebP for faster loading." },
            { href: "/png-to-webp-converter", title: "PNG to WebP", description: "Convert PNG to WebP to save space." },
            { href: "/svg-to-png-converter", title: "SVG to PNG", description: "Convert SVG vectors to PNG format." },
            { href: "/ascii-art-generator", title: "ASCII Art Generator", description: "Turn any image into ASCII text art." }
          ].filter(t => t.href !== pathname).slice(0, 8)} 
        />
        <RecentBlogPosts />
      </main>
      <Footer />
    </div>
  );
});
ImageToolLayout.displayName = "ImageToolLayout";
export default ImageToolLayout;
