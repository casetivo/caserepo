import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Markdown to HTML Converter — Free Online Tool",
  description: "Convert Markdown text to HTML instantly. Supports headings, bold, italic, lists, links, and code. Free online Markdown to HTML converter.",
  keywords: "markdown to HTML, convert markdown HTML, MD to HTML converter online, markdown parser free",
  alternates: {
    canonical: `${BASE}/markdown-to-html-converter`,
  },
  openGraph: {
    title: "Markdown to HTML Converter — Free Online Tool",
    description: "Convert Markdown text to HTML instantly. Supports headings, bold, italic, lists, links, and code. Free online Markdown to HTML converter.",
    url: `${BASE}/markdown-to-html-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Markdown to HTML Converter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown to HTML Converter — Free Online Tool",
    description: "Convert Markdown text to HTML instantly. Supports headings, bold, italic, lists, links, and code. Free online Markdown to HTML converter.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Markdown to HTML Converter</h1>
      <SchemaMarkup toolName="Markdown to HTML Converter" url={`${BASE}/markdown-to-html-converter`} description="Convert Markdown text to HTML instantly. Supports headings, bold, italic, lists, links, and code. Free online Markdown to HTML converter." faqs={getSeoContent("markdown-to-html-converter", "Markdown to HTML Converter").faqs} />
      <ClientPage />
    </>
  );
}
