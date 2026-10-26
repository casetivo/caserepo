import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JSON Formatter, Validator & Minifier — Free Online",
  description: "Format, beautify, validate, and minify JSON data instantly. Handles complex nested JSON. Free online JSON formatter and validator.",
  alternates: {
    canonical: `${BASE}/json-formatter`,
  },
  openGraph: {
    title: "JSON Formatter, Validator & Minifier — Free Online",
    description: "Format, beautify, validate, and minify JSON data instantly. Handles complex nested JSON. Free online JSON formatter and validator.",
    url: `${BASE}/json-formatter`,
    siteName: "Casetivo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter, Validator & Minifier — Free Online",
    description: "Format, beautify, validate, and minify JSON data instantly. Handles complex nested JSON. Free online JSON formatter and validator.",
  },
};

export default function Page() {
  return (
        <>
      <SchemaMarkup toolName="JSON Formatter, Validator & Minifier" url={`${BASE}/json-formatter`} description="Format, beautify, validate, and minify JSON data instantly. Handles complex nested JSON. Free online JSON formatter and validator." faqs={getSeoContent("json-formatter", "JSON Formatter, Validator & Minifier").faqs} />
      <ClientPage />
    </>
  );
}
