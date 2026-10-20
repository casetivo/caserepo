import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Text Replacement Tool — Find & Replace Online",
  description: "Find and replace any word or phrase in your text instantly. No regex needed — simple find and replace. Free online text replacement tool.",
  keywords: "find and replace text, text replacement tool, word replacer online, substitute text free",
  alternates: {
    canonical: `${BASE}/text-replacement-tool`,
  },
  openGraph: {
    title: "Text Replacement Tool — Find & Replace Online",
    description: "Find and replace any word or phrase in your text instantly. No regex needed — simple find and replace. Free online text replacement tool.",
    url: `${BASE}/text-replacement-tool`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Text Replacement Tool — Find & Replace Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Replacement Tool — Find & Replace Online",
    description: "Find and replace any word or phrase in your text instantly. No regex needed — simple find and replace. Free online text replacement tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Text Replacement Tool" url={`${BASE}/text-replacement-tool`} description="Find and replace any word or phrase in your text instantly. No regex needed — simple find and replace. Free online text replacement tool." faqs={getSeoContent("text-replacement-tool", "Text Replacement Tool").faqs} />
      <ClientPage />
    </>
  );
}
