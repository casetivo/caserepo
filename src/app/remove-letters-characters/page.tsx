import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Remove Letters & Characters — Free Online Tool",
  description: "Remove any specific letters, numbers, or special characters from your text instantly. Free online character remover tool.",
  keywords: "remove characters, delete letters from text, character remover online, strip characters tool",
  alternates: {
    canonical: `${BASE}/remove-letters-characters`,
  },
  openGraph: {
    title: "Remove Letters & Characters — Free Online Tool",
    description: "Remove any specific letters, numbers, or special characters from your text instantly. Free online character remover tool.",
    url: `${BASE}/remove-letters-characters`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Remove Letters & Characters — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Letters & Characters — Free Online Tool",
    description: "Remove any specific letters, numbers, or special characters from your text instantly. Free online character remover tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Remove Letters & Characters</h1>
      <SchemaMarkup toolName="Remove Letters & Characters" url={`${BASE}/remove-letters-characters`} description="Remove any specific letters, numbers, or special characters from your text instantly. Free online character remover tool." faqs={getSeoContent("remove-letters-characters", "Remove Letters & Characters").faqs} />
      <ClientPage />
    </>
  );
}
