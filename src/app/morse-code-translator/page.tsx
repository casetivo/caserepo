import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Morse Code Translator — Text to Morse Free",
  description: "Convert text to Morse code or translate Morse code back to text instantly. Supports all letters, numbers, and punctuation. Free online Morse code translator.",
  keywords: "morse code translator, text to morse code, morse code decoder, morse code converter online free",
  alternates: {
    canonical: `${BASE}/morse-code-translator`,
  },
  openGraph: {
    title: "Morse Code Translator — Text to Morse Free",
    description: "Convert text to Morse code or translate Morse code back to text instantly. Supports all letters, numbers, and punctuation. Free online Morse code translator.",
    url: `${BASE}/morse-code-translator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Morse Code Translator — Text to Morse Free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morse Code Translator — Text to Morse Free",
    description: "Convert text to Morse code or translate Morse code back to text instantly. Supports all letters, numbers, and punctuation. Free online Morse code translator.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Morse Code Translator</h1>
      <SchemaMarkup toolName="Morse Code Translator" url={`${BASE}/morse-code-translator`} description="Convert text to Morse code or translate Morse code back to text instantly. Supports all letters, numbers, and punctuation. Free online Morse code translator." faqs={getSeoContent("morse-code-translator", "Morse Code Translator").faqs} />
      <ClientPage />
    </>
  );
}
