import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JSON Stringifier — Free Online Tool",
  description: "Convert JSON objects to JSON strings with proper escaping. Free online JSON stringifier — the equivalent of JSON.stringify() in your browser.",
  keywords: "JSON stringify online, JSON stringifier, JSON to string, JSON serializer online free",
  alternates: {
    canonical: `${BASE}/json-stringifier`,
  },
  openGraph: {
    title: "JSON Stringifier — Free Online Tool",
    description: "Convert JSON objects to JSON strings with proper escaping. Free online JSON stringifier — the equivalent of JSON.stringify() in your browser.",
    url: `${BASE}/json-stringifier`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JSON Stringifier — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Stringifier — Free Online Tool",
    description: "Convert JSON objects to JSON strings with proper escaping. Free online JSON stringifier — the equivalent of JSON.stringify() in your browser.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">JSON Stringifier</h1>
      <SchemaMarkup toolName="JSON Stringifier" url={`${BASE}/json-stringifier`} description="Convert JSON objects to JSON strings with proper escaping. Free online JSON stringifier — the equivalent of JSON.stringify() in your browser." faqs={getSeoContent("json-stringifier", "JSON Stringifier").faqs} />
      <ClientPage />
    </>
  );
}
