import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Plain Text Converter — Free Online Tool",
  description: "Strip all formatting from text instantly. Removes HTML tags, special characters, and smart quotes. Free online plain text converter and cleaner.",
  keywords: "plain text converter, remove formatting, strip HTML, clean text online, text cleaner tool",
  alternates: {
    canonical: `${BASE}/plain-text-converter`,
  },
  openGraph: {
    title: "Plain Text Converter — Free Online Tool",
    description: "Strip all formatting from text instantly. Removes HTML tags, special characters, and smart quotes. Free online plain text converter and cleaner.",
    url: `${BASE}/plain-text-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Plain Text Converter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plain Text Converter — Free Online Tool",
    description: "Strip all formatting from text instantly. Removes HTML tags, special characters, and smart quotes. Free online plain text converter and cleaner.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Plain Text Converter" url={`${BASE}/plain-text-converter`} description="Strip all formatting from text instantly. Removes HTML tags, special characters, and smart quotes. Free online plain text converter and cleaner." faqs={getSeoContent("plain-text-converter", "Plain Text Converter").faqs} />

      <ClientPage />
    </>
  );
}
