import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Markdown Formatter & Previewer Online – Clean & Preview GFM | Casetivo",
  description:
    "Format messy Markdown documents and view real-time rendered previews online. Normalizes heading spacing, list bullet alignment, GFM tables, and code fences with 100% browser privacy.",
  keywords: [
    "markdown formatter",
    "markdown previewer",
    "format markdown online",
    "markdown editor online",
    "github flavored markdown preview",
    "clean markdown text",
    "gfm formatter",
    "markdown live preview",
  ],
  alternates: {
    canonical: `${BASE}/markdown-formatter-previewer`,
  },
  openGraph: {
    title: "Markdown Formatter & Previewer Online – Clean & Preview GFM | Casetivo",
    description:
      "Format messy Markdown documents and view real-time rendered previews online. Normalizes heading spacing, list bullet alignment, GFM tables, and code fences with 100% browser privacy.",
    url: `${BASE}/markdown-formatter-previewer`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Markdown Formatter & Previewer Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Formatter & Previewer Online – Clean & Preview GFM | Casetivo",
    description:
      "Format messy Markdown documents and view real-time rendered previews online. Normalizes heading spacing, list bullet alignment, GFM tables, and code fences with 100% browser privacy.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("markdownFormatterPreviewer", "Markdown Formatter & Previewer");

  return (
    <>
      <SchemaMarkup
        toolName="Markdown Formatter & Previewer"
        url={`${BASE}/markdown-formatter-previewer`}
        description="Format and live preview GitHub Flavored Markdown (GFM) documents online. Standardizes heading spacing, bullet points, table alignments, and code blocks with complete client-side privacy."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
