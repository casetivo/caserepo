import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Markdown Table Generator Online – Convert CSV or Excel to MD Table | Casetivo",
  description:
    "Generate perfectly aligned GitHub Flavored Markdown (GFM) tables online. Convert CSV, TSV, or spreadsheet paste into clean pipe tables with custom column alignments (left, center, right) and 100% browser privacy.",
  keywords: [
    "markdown table generator",
    "generate markdown table",
    "csv to markdown table",
    "excel to markdown table",
    "gfm table generator",
    "markdown table align",
    "convert spreadsheet to markdown table",
    "markdown pipe table generator",
  ],
  alternates: {
    canonical: `${BASE}/markdown-table-generator`,
  },
  openGraph: {
    title: "Markdown Table Generator Online – Convert CSV or Excel to MD Table | Casetivo",
    description:
      "Generate perfectly aligned GitHub Flavored Markdown (GFM) tables online. Convert CSV, TSV, or spreadsheet paste into clean pipe tables with custom column alignments (left, center, right) and 100% browser privacy.",
    url: `${BASE}/markdown-table-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Markdown Table Generator Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Table Generator Online – Convert CSV or Excel to MD Table | Casetivo",
    description:
      "Generate perfectly aligned GitHub Flavored Markdown (GFM) tables online. Convert CSV, TSV, or spreadsheet paste into clean pipe tables with custom column alignments (left, center, right) and 100% browser privacy.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("markdownTableGenerator", "Markdown Table Generator");

  return (
    <>
      <SchemaMarkup
        toolName="Markdown Table Generator"
        url={`${BASE}/markdown-table-generator`}
        description="Convert spreadsheet cells, CSV, and TSV data into perfectly aligned Markdown pipe tables. Features column alignment options, live HTML preview, and complete client-side privacy."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
