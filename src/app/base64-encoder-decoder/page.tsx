import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder Online – Encode & Decode Text or Files | Casetivo",
  description:
    "Encode text to Base64 or decode Base64 strings to readable text online for free. Full support for UTF-8 characters, URL-safe Base64, padding controls, and 100% private in-browser execution.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 encode online",
    "base64 decode online",
    "base64 to text",
    "text to base64",
    "url safe base64",
    "base64 translator",
    "decode base64 string",
  ],
  alternates: {
    canonical: `${BASE}/base64-encoder-decoder`,
  },
  openGraph: {
    title: "Base64 Encoder & Decoder Online – Encode & Decode Text or Files | Casetivo",
    description:
      "Encode text to Base64 or decode Base64 strings to readable text online for free. Full support for UTF-8 characters, URL-safe Base64, padding controls, and 100% private in-browser execution.",
    url: `${BASE}/base64-encoder-decoder`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Base64 Encoder and Decoder Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder & Decoder Online – Encode & Decode Text or Files | Casetivo",
    description:
      "Encode text to Base64 or decode Base64 strings to readable text online for free. Full support for UTF-8 characters, URL-safe Base64, padding controls, and 100% private in-browser execution.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("base64EncoderDecoder", "Base64 Encoder & Decoder");

  return (
    <>
      <SchemaMarkup
        toolName="Base64 Encoder & Decoder"
        url={`${BASE}/base64-encoder-decoder`}
        description="Encode text into Base64 format or decode Base64 strings back to plain text. Features UTF-8 multi-byte support, URL-safe mode, live character metrics, and complete browser privacy."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
