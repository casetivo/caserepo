import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JSON Formatter, Validator & Minifier — Free Online",
  description: "Format, beautify, validate, and minify JSON data instantly. Handles complex nested JSON. Free online JSON formatter and validator.",
  keywords: "JSON formatter, JSON validator, JSON beautifier, minify JSON, pretty print JSON online free",
  alternates: {
    canonical: `${BASE}/json-formatter`,
  },
  openGraph: {
    title: "JSON Formatter, Validator & Minifier — Free Online",
    description: "Format, beautify, validate, and minify JSON data instantly. Handles complex nested JSON. Free online JSON formatter and validator.",
    url: `${BASE}/json-formatter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JSON Formatter, Validator & Minifier — Free Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter, Validator & Minifier — Free Online",
    description: "Format, beautify, validate, and minify JSON data instantly. Handles complex nested JSON. Free online JSON formatter and validator.",
    images: ["/og-image.png"],
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
