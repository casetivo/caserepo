import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Number Sorter — Sort Numbers Online Free",
  description: "Sort a list of numbers in ascending or descending order instantly. Handles integers, decimals, and negative numbers. Free online number sorter.",
  keywords: "number sorter, sort numbers online, ascending descending sort, numerical sort tool free",
  alternates: {
    canonical: `${BASE}/number-sorter`,
  },
  openGraph: {
    title: "Number Sorter — Sort Numbers Online Free",
    description: "Sort a list of numbers in ascending or descending order instantly. Handles integers, decimals, and negative numbers. Free online number sorter.",
    url: `${BASE}/number-sorter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Number Sorter — Sort Numbers Online Free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Number Sorter — Sort Numbers Online Free",
    description: "Sort a list of numbers in ascending or descending order instantly. Handles integers, decimals, and negative numbers. Free online number sorter.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Number Sorter" url={`${BASE}/number-sorter`} description="Sort a list of numbers in ascending or descending order instantly. Handles integers, decimals, and negative numbers. Free online number sorter." faqs={getSeoContent("number-sorter", "Number Sorter").faqs} />

      <ClientPage />
    </>
  );
}
