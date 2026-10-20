import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Plain Text Converter Online — Strip Formatting, HTML & Smart Quotes",
  description: "Strip rich formatting, HTML tags, smart quotes, em dashes, and invisible characters from your text instantly. 100% private, free online plain text cleaner.",
  keywords: "plain text converter, remove formatting, strip html tags, clean text online, smart quote converter, remove invisible characters, unformat text",
  alternates: {
    canonical: `${BASE}/plain-text-converter`,
  },
  openGraph: {
    title: "Plain Text Converter Online — Strip Formatting, HTML & Smart Quotes",
    description: "Strip rich formatting, HTML tags, smart quotes, em dashes, and invisible characters from your text instantly. 100% private, free online plain text cleaner.",
    url: `${BASE}/plain-text-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Plain Text Converter Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plain Text Converter Online — Strip Formatting, HTML & Smart Quotes",
    description: "Strip rich formatting, HTML tags, smart quotes, em dashes, and invisible characters from your text instantly. 100% private, free online plain text cleaner.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("plain-text-converter", "Plain Text Converter");

  return (
    <>
      <SchemaMarkup
        toolName="Plain Text Converter"
        url={`${BASE}/plain-text-converter`}
        description="Strip rich formatting, HTML tags, smart quotes, em dashes, and invisible characters from your text instantly. 100% private, free online plain text cleaner."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
