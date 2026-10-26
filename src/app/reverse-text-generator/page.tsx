import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Reverse Text Generator — Backwards & Upside Down",
  description: "Reverse text character-by-character, flip word order, invert lists line-by-line, or generate upside-down text. Free online palindrome checker included.",
  alternates: {
    canonical: `${BASE}/reverse-text-generator`,
  },
  openGraph: {
    title: "Reverse Text Generator — Backwards & Upside Down",
    description: "Reverse text character-by-character, flip word order, invert lists line-by-line, or generate upside-down text. Free online palindrome checker included.",
    url: `${BASE}/reverse-text-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Reverse Text Generator Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reverse Text Generator — Backwards & Upside Down",
    description: "Reverse text character-by-character, flip word order, invert lists line-by-line, or generate upside-down text. Free online palindrome checker included.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("reverse-text-generator", "Reverse Text Generator");

  return (
    <>
      <SchemaMarkup
        toolName="Reverse Text Generator"
        url={`${BASE}/reverse-text-generator`}
        description="Reverse text character-by-character, flip word order, invert lists line-by-line, or generate upside-down text. Free online palindrome checker included."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
