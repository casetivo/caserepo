import Link from "next/link";
import { Home, Search } from "lucide-react";
import Footer from "@/components/Footer";

const POPULAR_TOOLS = [
  { href: "/sentence-case", label: "Sentence Case Converter" },
  { href: "/json-formatter", label: "JSON Formatter" },
  { href: "/base64-encoder-decoder", label: "Base64 Encoder & Decoder" },
  { href: "/uuid-generator", label: "UUID Generator" },
  { href: "/strong-password-generator", label: "Password Generator" },
  { href: "/ai-image-to-text", label: "Image to Text (OCR)" },
] as const;

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="text-center max-w-lg mx-auto">
          <div className="relative mb-6">
            <p className="text-[10rem] sm:text-[12rem] font-bold leading-none tracking-tighter text-primary/10 select-none" style={{ fontFamily: "var(--font-display)" }} aria-hidden="true">404</p>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-16 w-16 text-primary/40" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>Page Not Found</h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link href="/" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all min-w-[180px] justify-center">
              <Home className="h-4 w-4" />Back to Home
            </Link>
          </div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Popular tools</h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {POPULAR_TOOLS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
