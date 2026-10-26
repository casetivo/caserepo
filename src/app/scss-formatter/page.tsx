import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "SCSS Formatter & Beautifier — Free Online Tool",
  description: "Format and beautify SCSS code with proper indentation and nesting. Free online SCSS formatter and beautifier tool.",
  alternates: {
    canonical: `${BASE}/scss-formatter`,
  },
  openGraph: {
    title: "SCSS Formatter & Beautifier — Free Online Tool",
    description: "Format and beautify SCSS code with proper indentation and nesting. Free online SCSS formatter and beautifier tool.",
    url: `${BASE}/scss-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SCSS Formatter & Beautifier — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SCSS Formatter & Beautifier — Free Online Tool",
    description: "Format and beautify SCSS code with proper indentation and nesting. Free online SCSS formatter and beautifier tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="SCSS Formatter & Beautifier" url={`${BASE}/scss-formatter`} description="Format and beautify SCSS code with proper indentation and nesting. Free online SCSS formatter and beautifier tool." faqs={getSeoContent("scss-formatter", "SCSS Formatter & Beautifier").faqs} />

      <ClientPage />
    </>
  );
}
