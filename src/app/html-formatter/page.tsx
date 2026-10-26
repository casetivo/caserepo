import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "HTML Formatter & Beautifier — Free Online Tool",
  description: "Format and beautify HTML code with proper indentation instantly. Clean up messy HTML markup. Free online HTML formatter and beautifier.",
  keywords: "HTML formatter, HTML beautifier, format HTML online, HTML pretty printer, tidy HTML free",
  alternates: {
    canonical: `${BASE}/html-formatter`,
  },
  openGraph: {
    title: "HTML Formatter & Beautifier — Free Online Tool",
    description: "Format and beautify HTML code with proper indentation instantly. Clean up messy HTML markup. Free online HTML formatter and beautifier.",
    url: `${BASE}/html-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HTML Formatter & Beautifier — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Formatter & Beautifier — Free Online Tool",
    description: "Format and beautify HTML code with proper indentation instantly. Clean up messy HTML markup. Free online HTML formatter and beautifier.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="HTML Formatter & Beautifier" url={`${BASE}/html-formatter`} description="Format and beautify HTML code with proper indentation instantly. Clean up messy HTML markup. Free online HTML formatter and beautifier." faqs={getSeoContent("html-formatter", "HTML Formatter & Beautifier").faqs} />
      <ClientPage />
    </>
  );
}
