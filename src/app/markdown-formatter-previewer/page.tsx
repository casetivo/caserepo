import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Markdown Formatter & Previewer — Free Online Tool",
  description: "Format Markdown with consistent spacing and preview as HTML output. Free online Markdown formatter and live previewer tool.",
  keywords: "markdown formatter, markdown previewer, format markdown online, markdown beautifier, markdown to HTML preview",
  alternates: {
    canonical: `${BASE}/markdown-formatter-previewer`,
  },
  openGraph: {
    title: "Markdown Formatter & Previewer — Free Online Tool",
    description: "Format Markdown with consistent spacing and preview as HTML output. Free online Markdown formatter and live previewer tool.",
    url: `${BASE}/markdown-formatter-previewer`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Markdown Formatter & Previewer — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Formatter & Previewer — Free Online Tool",
    description: "Format Markdown with consistent spacing and preview as HTML output. Free online Markdown formatter and live previewer tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Markdown Formatter & Previewer" url={`${BASE}/markdown-formatter-previewer`} description="Format Markdown with consistent spacing and preview as HTML output. Free online Markdown formatter and live previewer tool." faqs={getSeoContent("markdown-formatter-previewer", "Markdown Formatter & Previewer").faqs} />
      <ClientPage />
    </>
  );
}
