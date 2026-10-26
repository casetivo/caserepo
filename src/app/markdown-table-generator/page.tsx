import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Markdown Table Generator — Free Online Tool",
  description: "Generate Markdown tables from CSV, tab-separated, or pipe-delimited data. Auto-aligns columns. Free online Markdown table generator.",
  alternates: {
    canonical: `${BASE}/markdown-table-generator`,
  },
  openGraph: {
    title: "Markdown Table Generator — Free Online Tool",
    description: "Generate Markdown tables from CSV, tab-separated, or pipe-delimited data. Auto-aligns columns. Free online Markdown table generator.",
    url: `${BASE}/markdown-table-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Markdown Table Generator — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Table Generator — Free Online Tool",
    description: "Generate Markdown tables from CSV, tab-separated, or pipe-delimited data. Auto-aligns columns. Free online Markdown table generator.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Markdown Table Generator" url={`${BASE}/markdown-table-generator`} description="Generate Markdown tables from CSV, tab-separated, or pipe-delimited data. Auto-aligns columns. Free online Markdown table generator." faqs={getSeoContent("markdown-table-generator", "Markdown Table Generator").faqs} />
      <ClientPage />
    </>
  );
}
