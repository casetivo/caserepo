import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JSON to YAML Converter Online – Convert JSON to Clean YAML | Casetivo",
  description:
    "Convert JSON data to clean YAML format online for free. Support for custom indentation (2 or 4 spaces), multiline string blocks, Kubernetes manifests, and 100% private in-browser conversion.",
  keywords: [
    "json to yaml",
    "json to yaml converter",
    "convert json to yaml online",
    "json to yml",
    "json to kubernetes yaml",
    "convert json to yaml file",
    "json yaml parser",
    "format json as yaml",
  ],
  alternates: {
    canonical: `${BASE}/json-to-yaml-converter`,
  },
  openGraph: {
    title: "JSON to YAML Converter Online – Convert JSON to Clean YAML | Casetivo",
    description:
      "Convert JSON data to clean YAML format online for free. Support for custom indentation (2 or 4 spaces), multiline string blocks, Kubernetes manifests, and 100% private in-browser conversion.",
    url: `${BASE}/json-to-yaml-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JSON to YAML Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to YAML Converter Online – Convert JSON to Clean YAML | Casetivo",
    description:
      "Convert JSON data to clean YAML format online for free. Support for custom indentation (2 or 4 spaces), multiline string blocks, Kubernetes manifests, and 100% private in-browser conversion.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("jsonToYamlConverter", "JSON to YAML Converter");

  return (
    <>
      <SchemaMarkup
        toolName="JSON to YAML Converter"
        url={`${BASE}/json-to-yaml-converter`}
        description="Convert JSON data structures into clean, idiomatic YAML configurations online. Features indentation controls, multiline string handling, key-value statistics, and complete client-side privacy."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
