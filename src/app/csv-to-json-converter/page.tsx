import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "CSV to JSON Converter Online – Transform CSV to JSON Array | Casetivo",
  description:
    "Convert CSV tabular data to structured JSON arrays online for free. Support for custom delimiters, nested headers, data type parsing, and 100% private in-browser conversion.",
  keywords: [
    "csv to json",
    "csv to json converter",
    "convert csv to json online",
    "csv to json array",
    "excel to json",
    "spreadsheet to json converter",
    "parse csv to json",
    "csv parser online",
    "tsv to json",
  ],
  alternates: {
    canonical: `${BASE}/csv-to-json-converter`,
  },
  openGraph: {
    title: "CSV to JSON Converter Online – Transform CSV to JSON Array | Casetivo",
    description:
      "Convert CSV tabular data to structured JSON arrays online for free. Support for custom delimiters, nested headers, data type parsing, and 100% private in-browser conversion.",
    url: `${BASE}/csv-to-json-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CSV to JSON Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to JSON Converter Online – Transform CSV to JSON Array | Casetivo",
    description:
      "Convert CSV tabular data to structured JSON arrays online for free. Support for custom delimiters, nested headers, data type parsing, and 100% private in-browser conversion.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("csvToJsonConverter", "CSV to JSON Converter");

  return (
    <>
      <SchemaMarkup
        toolName="CSV to JSON Converter"
        url={`${BASE}/csv-to-json-converter`}
        description="Convert CSV data to structured JSON format instantly. Support for custom delimiters, type coercion, array of objects, and tabular matrix output with 100% browser privacy."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
