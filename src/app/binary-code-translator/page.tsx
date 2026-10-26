import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Binary Code Translator — Text to Binary Free",
  description: "Convert text to binary code (0s and 1s) or translate binary back to text. Free online binary code translator tool.",
  alternates: {
    canonical: `${BASE}/binary-code-translator`,
  },
  openGraph: {
    title: "Binary Code Translator — Text to Binary Free",
    description: "Convert text to binary code (0s and 1s) or translate binary back to text. Free online binary code translator tool.",
    url: `${BASE}/binary-code-translator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Binary Code Translator — Text to Binary Free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binary Code Translator — Text to Binary Free",
    description: "Convert text to binary code (0s and 1s) or translate binary back to text. Free online binary code translator tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Binary Code Translator" url={`${BASE}/binary-code-translator`} description="Convert text to binary code (0s and 1s) or translate binary back to text. Free online binary code translator tool." faqs={getSeoContent("binary-code-translator", "Binary Code Translator").faqs} />
      <ClientPage />
    </>
  );
}
