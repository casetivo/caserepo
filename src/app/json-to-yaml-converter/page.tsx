import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JSON to YAML Converter — Free Online Tool",
  description: "Convert JSON data to YAML format instantly. Free online JSON to YAML converter — clean, readable YAML output in one click.",
  alternates: {
    canonical: `${BASE}/json-to-yaml-converter`,
  },
  openGraph: {
    title: "JSON to YAML Converter — Free Online Tool",
    description: "Convert JSON data to YAML format instantly. Free online JSON to YAML converter — clean, readable YAML output in one click.",
    url: `${BASE}/json-to-yaml-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JSON to YAML Converter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to YAML Converter — Free Online Tool",
    description: "Convert JSON data to YAML format instantly. Free online JSON to YAML converter — clean, readable YAML output in one click.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="JSON to YAML Converter" url={`${BASE}/json-to-yaml-converter`} description="Convert JSON data to YAML format instantly. Free online JSON to YAML converter — clean, readable YAML output in one click." faqs={getSeoContent("json-to-yaml-converter", "JSON to YAML Converter").faqs} />
      <ClientPage />
    </>
  );
}
