import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Binary Code Translator Online – Text to Binary & Binary to Text | Casetivo",
  description:
    "Translate plain text to binary code (0s and 1s) and decode binary back to English text online. Supports UTF-8, customizable byte separators (space, none, comma), prefix options (0b), and instant copy.",
  keywords: [
    "binary code translator",
    "text to binary",
    "binary to text",
    "binary translator",
    "convert text to binary online",
    "binary to english converter",
    "binary decoder",
    "binary encoder",
    "8 bit binary translator",
  ],
  alternates: {
    canonical: `${BASE}/binary-code-translator`,
  },
  openGraph: {
    title: "Binary Code Translator Online – Text to Binary & Binary to Text | Casetivo",
    description:
      "Translate plain text to binary code (0s and 1s) and decode binary back to English text online. Supports UTF-8, customizable byte separators (space, none, comma), prefix options (0b), and instant copy.",
    url: `${BASE}/binary-code-translator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Binary Code Translator Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binary Code Translator Online – Text to Binary & Binary to Text | Casetivo",
    description:
      "Translate plain text to binary code (0s and 1s) and decode binary back to English text online. Supports UTF-8, customizable byte separators (space, none, comma), prefix options (0b), and instant copy.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("binaryCodeTranslator", "Binary Code Translator");

  return (
    <>
      <SchemaMarkup
        toolName="Binary Code Translator"
        url={`${BASE}/binary-code-translator`}
        description="Convert English text to 8-bit binary code (0s and 1s) or decode binary sequences back to readable text. Features customizable byte separators, UTF-8 multi-byte support, and live bit metrics."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
