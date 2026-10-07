import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random Letter Generator — Free Online Tool",
  description: "Generate random letters from the alphabet in uppercase, lowercase, or mixed case. Customizable count. Free online random letter generator.",
  keywords: "random letter generator, random alphabet letter, generate random letters online, letter picker free",
  alternates: {
    canonical: `${BASE}/random-letter-generator`,
  },
  openGraph: {
    title: "Random Letter Generator — Free Online Tool",
    description: "Generate random letters from the alphabet in uppercase, lowercase, or mixed case. Customizable count. Free online random letter generator.",
    url: `${BASE}/random-letter-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random Letter Generator — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Letter Generator — Free Online Tool",
    description: "Generate random letters from the alphabet in uppercase, lowercase, or mixed case. Customizable count. Free online random letter generator.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Random Letter Generator" url={`${BASE}/random-letter-generator`} description="Generate random letters from the alphabet in uppercase, lowercase, or mixed case. Customizable count. Free online random letter generator." faqs={getSeoContent("random-letter-generator", "Random Letter Generator").faqs} />

      <ClientPage />
    </>
  );
}
