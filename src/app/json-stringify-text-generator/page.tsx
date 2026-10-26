import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JSON Stringify Text Generator Online – Escape Text for JSON | Casetivo",
  description:
    "Convert plain text, code snippets, and multiline essays into safely escaped JSON string literals online. Converts newlines to \\n, escapes double quotes and backslashes with 100% browser privacy.",
  keywords: [
    "json stringify text generator",
    "convert text to json string",
    "escape multiline text for json",
    "json string escape online",
    "text to json value",
    "json stringify generator",
    "escape newlines for json",
    "escape quotes in text for json",
  ],
  alternates: {
    canonical: `${BASE}/json-stringify-text-generator`,
  },
  openGraph: {
    title: "JSON Stringify Text Generator Online – Escape Text for JSON | Casetivo",
    description:
      "Convert plain text, code snippets, and multiline essays into safely escaped JSON string literals online. Converts newlines to \\n, escapes double quotes and backslashes with 100% browser privacy.",
    url: `${BASE}/json-stringify-text-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JSON Stringify Text Generator Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Stringify Text Generator Online – Escape Text for JSON | Casetivo",
    description:
      "Convert plain text, code snippets, and multiline essays into safely escaped JSON string literals online. Converts newlines to \\n, escapes double quotes and backslashes with 100% browser privacy.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("jsonStringifyTextGenerator", "JSON Stringify Text Generator");

  return (
    <>
      <SchemaMarkup
        toolName="JSON Stringify Text Generator"
        url={`${BASE}/json-stringify-text-generator`}
        description="Transform multiline text, articles, and code blocks into safely escaped JSON string values. Features custom quote wrapping, whitespace trimming, and live character metrics."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
