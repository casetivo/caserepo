import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder — Free Online Tool",
  description: "Encode text to Base64 or decode Base64 strings back to plain text instantly. Free online Base64 encoder and decoder with one click.",
  alternates: {
    canonical: `${BASE}/base64-encoder-decoder`,
  },
  openGraph: {
    title: "Base64 Encoder & Decoder — Free Online Tool",
    description: "Encode text to Base64 or decode Base64 strings back to plain text instantly. Free online Base64 encoder and decoder with one click.",
    url: `${BASE}/base64-encoder-decoder`,
    siteName: "Casetivo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder & Decoder — Free Online Tool",
    description: "Encode text to Base64 or decode Base64 strings back to plain text instantly. Free online Base64 encoder and decoder with one click.",
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Base64 Encoder & Decoder" url={`${BASE}/base64-encoder-decoder`} description="Encode text to Base64 or decode Base64 strings back to plain text instantly. Free online Base64 encoder and decoder with one click." faqs={getSeoContent("base64EncoderDecoder", "Base64 Encoder & Decoder").faqs} />
      <ClientPage />
    </>
  );
}
