import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "CSS Formatter & Beautifier — Free Online Tool",
  description: "Format and beautify CSS code with proper indentation instantly. Clean messy CSS in one click. Free online CSS formatter and beautifier.",
  alternates: {
    canonical: `${BASE}/css-formatter`,
  },
  openGraph: {
    title: "CSS Formatter & Beautifier — Free Online Tool",
    description: "Format and beautify CSS code with proper indentation instantly. Clean messy CSS in one click. Free online CSS formatter and beautifier.",
    url: `${BASE}/css-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CSS Formatter & Beautifier — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Formatter & Beautifier — Free Online Tool",
    description: "Format and beautify CSS code with proper indentation instantly. Clean messy CSS in one click. Free online CSS formatter and beautifier.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="CSS Formatter & Beautifier" url={`${BASE}/css-formatter`} description="Format and beautify CSS code with proper indentation instantly. Clean messy CSS in one click. Free online CSS formatter and beautifier." faqs={getSeoContent("css-formatter", "CSS Formatter & Beautifier").faqs} />
      <ClientPage />
    </>
  );
}
