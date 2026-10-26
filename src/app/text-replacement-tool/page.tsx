import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Text Replacement Tool — Batch Find & Replace",
  description: "Find and replace words and phrases online with whole-word matching, regex support, case sensitivity, and batch replacement rules. Free & private.",
  alternates: {
    canonical: `${BASE}/text-replacement-tool`,
  },
  openGraph: {
    title: "Text Replacement Tool — Batch Find & Replace",
    description: "Find and replace words and phrases online with whole-word matching, regex support, case sensitivity, and batch replacement rules. Free & private.",
    url: `${BASE}/text-replacement-tool`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Text Replacement Tool Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Replacement Tool — Batch Find & Replace",
    description: "Find and replace words and phrases online with whole-word matching, regex support, case sensitivity, and batch replacement rules. Free & private.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("text-replacement-tool", "Text Replacement Tool");

  return (
    <>
      <SchemaMarkup
        toolName="Text Replacement Tool"
        url={`${BASE}/text-replacement-tool`}
        description="Find and replace words and phrases online with whole-word matching, regex support, case sensitivity, and batch replacement rules. Free & private."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
