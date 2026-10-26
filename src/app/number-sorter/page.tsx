import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Number Sorter Online – Sort Numbers in Ascending or Descending Order | Casetivo",
  description:
    "Sort numbers online instantly in ascending or descending order. Supports integers, negative numbers, decimals, scientific notation, deduplication, and statistical summaries (min, max, mean, median).",
  keywords: [
    "number sorter",
    "sort numbers online",
    "ascending order",
    "descending order",
    "sort numbers with decimals",
    "numeric sort list",
    "deduplicate numbers",
    "number list sorter",
    "sort negative numbers",
  ],
  alternates: {
    canonical: `${BASE}/number-sorter`,
  },
  openGraph: {
    title: "Number Sorter Online – Sort Numbers in Ascending or Descending Order | Casetivo",
    description:
      "Sort numbers online instantly in ascending or descending order. Supports integers, negative numbers, decimals, scientific notation, deduplication, and statistical summaries.",
    url: `${BASE}/number-sorter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Number Sorter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Number Sorter Online – Sort Numbers in Ascending or Descending Order | Casetivo",
    description:
      "Sort numbers online instantly in ascending or descending order. Supports integers, negative numbers, decimals, scientific notation, deduplication, and statistical summaries.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("numberSorter", "Number Sorter");

  return (
    <>
      <SchemaMarkup
        toolName="Number Sorter"
        url={`${BASE}/number-sorter`}
        description="Sort numeric data lists in ascending or descending order. Handles decimals, negative values, deduplication, and calculates real-time statistics including sum, mean, and median."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
