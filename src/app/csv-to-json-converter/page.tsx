import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "CSV to JSON Converter — Free Online Tool",
  description: "Convert CSV data to JSON format instantly. Paste your CSV and get properly structured JSON output. Free online CSV to JSON converter.",
  keywords: "CSV to JSON converter, convert CSV JSON online, CSV JSON tool, parse CSV to JSON free",
  alternates: {
    canonical: `${BASE}/csv-to-json-converter`,
  },
  openGraph: {
    title: "CSV to JSON Converter — Free Online Tool",
    description: "Convert CSV data to JSON format instantly. Paste your CSV and get properly structured JSON output. Free online CSV to JSON converter.",
    url: `${BASE}/csv-to-json-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CSV to JSON Converter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to JSON Converter — Free Online Tool",
    description: "Convert CSV data to JSON format instantly. Paste your CSV and get properly structured JSON output. Free online CSV to JSON converter.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="CSV to JSON Converter" url={`${BASE}/csv-to-json-converter`} description="Convert CSV data to JSON format instantly. Paste your CSV and get properly structured JSON output. Free online CSV to JSON converter." faqs={getSeoContent("csv-to-json-converter", "CSV to JSON Converter").faqs} />

      <ClientPage />
    </>
  );
}
