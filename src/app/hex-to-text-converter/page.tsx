import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Hex to Text Converter Online – Convert Hex to Text & Text to Hex | Casetivo",
  description:
    "Convert hexadecimal values to human-readable text and encode plain text to hex online. Features UTF-8 multi-byte support, custom delimiters (spaces, commas, none), 0x prefix toggles, uppercase/lowercase casing, and 100% private in-browser execution.",
  keywords: [
    "hex to text",
    "text to hex",
    "hex to text converter",
    "convert hex to string",
    "hexadecimal to text online",
    "hex decoder",
    "hex encoder",
    "ascii to hex",
    "hex to ascii converter",
  ],
  alternates: {
    canonical: `${BASE}/hex-to-text-converter`,
  },
  openGraph: {
    title: "Hex to Text Converter Online – Convert Hex to Text & Text to Hex | Casetivo",
    description:
      "Convert hexadecimal values to human-readable text and encode plain text to hex online. Features UTF-8 multi-byte support, custom delimiters (spaces, commas, none), 0x prefix toggles, uppercase/lowercase casing, and 100% private in-browser execution.",
    url: `${BASE}/hex-to-text-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Hex to Text Converter Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hex to Text Converter Online – Convert Hex to Text & Text to Hex | Casetivo",
    description:
      "Convert hexadecimal values to human-readable text and encode plain text to hex online. Features UTF-8 multi-byte support, custom delimiters (spaces, commas, none), 0x prefix toggles, uppercase/lowercase casing, and 100% private in-browser execution.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("hexToTextConverter", "Hex to Text Converter");

  return (
    <>
      <SchemaMarkup
        toolName="Hex to Text Converter"
        url={`${BASE}/hex-to-text-converter`}
        description="Convert hexadecimal code (base-16) to readable plain text or encode text into hex format. Supports UTF-8 emojis, custom delimiters, 0x prefixes, and live byte metrics."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
