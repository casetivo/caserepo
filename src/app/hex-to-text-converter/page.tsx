import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Hex to Text Converter — Free Online Tool",
  description: "Convert hexadecimal to text or text to hexadecimal code instantly. Free online hex to text and text to hex converter tool.",
  alternates: {
    canonical: `${BASE}/hex-to-text-converter`,
  },
  openGraph: {
    title: "Hex to Text Converter — Free Online Tool",
    description: "Convert hexadecimal to text or text to hexadecimal code instantly. Free online hex to text and text to hex converter tool.",
    url: `${BASE}/hex-to-text-converter`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Hex to Text Converter — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hex to Text Converter — Free Online Tool",
    description: "Convert hexadecimal to text or text to hexadecimal code instantly. Free online hex to text and text to hex converter tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Hex to Text Converter" url={`${BASE}/hex-to-text-converter`} description="Convert hexadecimal to text or text to hexadecimal code instantly. Free online hex to text and text to hex converter tool." faqs={getSeoContent("hex-to-text-converter", "Hex to Text Converter").faqs} />

      <ClientPage />
    </>
  );
}
