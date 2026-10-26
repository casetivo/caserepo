import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JavaScript Formatter & Beautifier Online",
  description: "Format and beautify JavaScript code with proper indentation. Clean up minified or messy JS instantly. Free online JavaScript formatter.",
  alternates: {
    canonical: `${BASE}/javascript-formatter`,
  },
  openGraph: {
    title: "JavaScript Formatter & Beautifier Online",
    description: "Format and beautify JavaScript code with proper indentation. Clean up minified or messy JS instantly. Free online JavaScript formatter.",
    url: `${BASE}/javascript-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JavaScript Formatter & Beautifier Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Formatter & Beautifier Online",
    description: "Format and beautify JavaScript code with proper indentation. Clean up minified or messy JS instantly. Free online JavaScript formatter.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="JavaScript Formatter & Beautifier" url={`${BASE}/javascript-formatter`} description="Format and beautify JavaScript code with proper indentation. Clean up minified or messy JS instantly. Free online JavaScript formatter." faqs={getSeoContent("javascript-formatter", "JavaScript Formatter & Beautifier").faqs} />
      <ClientPage />
    </>
  );
}
