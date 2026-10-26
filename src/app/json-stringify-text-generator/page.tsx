import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JSON Stringify Text Generator — Free Online Tool",
  description: "Generate JSON.stringify() output from any plain text. Escapes all special characters for safe use in code. Free online tool.",
  alternates: {
    canonical: `${BASE}/json-stringify-text-generator`,
  },
  openGraph: {
    title: "JSON Stringify Text Generator — Free Online Tool",
    description: "Generate JSON.stringify() output from any plain text. Escapes all special characters for safe use in code. Free online tool.",
    url: `${BASE}/json-stringify-text-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JSON Stringify Text Generator — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Stringify Text Generator — Free Online Tool",
    description: "Generate JSON.stringify() output from any plain text. Escapes all special characters for safe use in code. Free online tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="JSON Stringify Text Generator" url={`${BASE}/json-stringify-text-generator`} description="Generate JSON.stringify() output from any plain text. Escapes all special characters for safe use in code. Free online tool." faqs={getSeoContent("json-stringify-text-generator", "JSON Stringify Text Generator").faqs} />
      <ClientPage />
    </>
  );
}
