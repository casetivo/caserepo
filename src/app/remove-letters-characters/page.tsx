import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Remove Letters & Characters Online — Strip Numbers, Symbols & Text",
  description: "Remove specific letters, numbers, punctuation, or symbols from text instantly. Features one-click presets, extract mode, and case-sensitive filtering. Free and 100% private.",
  keywords: "remove characters from text, delete letters online, remove numbers from text, strip punctuation, character remover tool, extract numbers from text",
  alternates: {
    canonical: `${BASE}/remove-letters-characters`,
  },
  openGraph: {
    title: "Remove Letters & Characters Online — Strip Numbers, Symbols & Text",
    description: "Remove specific letters, numbers, punctuation, or symbols from text instantly. Features one-click presets, extract mode, and case-sensitive filtering. Free and 100% private.",
    url: `${BASE}/remove-letters-characters`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Remove Letters & Characters Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Letters & Characters Online — Strip Numbers, Symbols & Text",
    description: "Remove specific letters, numbers, punctuation, or symbols from text instantly. Features one-click presets, extract mode, and case-sensitive filtering. Free and 100% private.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("remove-letters-characters", "Remove Letters & Characters");

  return (
    <>
      <SchemaMarkup
        toolName="Remove Letters & Characters"
        url={`${BASE}/remove-letters-characters`}
        description="Remove specific letters, numbers, punctuation, or symbols from text instantly. Features one-click presets, extract mode, and case-sensitive filtering. Free and 100% private."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
