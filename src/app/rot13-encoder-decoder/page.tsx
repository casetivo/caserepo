import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "ROT13 Encoder & Decoder — Free Online Tool",
  description: "Encode or decode text using the ROT13 substitution cipher instantly. Free online ROT13 encoder and decoder — the same operation for both.",
  alternates: {
    canonical: `${BASE}/rot13-encoder-decoder`,
  },
  openGraph: {
    title: "ROT13 Encoder & Decoder — Free Online Tool",
    description: "Encode or decode text using the ROT13 substitution cipher instantly. Free online ROT13 encoder and decoder — the same operation for both.",
    url: `${BASE}/rot13-encoder-decoder`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ROT13 Encoder & Decoder — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ROT13 Encoder & Decoder — Free Online Tool",
    description: "Encode or decode text using the ROT13 substitution cipher instantly. Free online ROT13 encoder and decoder — the same operation for both.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="ROT13 Encoder & Decoder" url={`${BASE}/rot13-encoder-decoder`} description="Encode or decode text using the ROT13 substitution cipher instantly. Free online ROT13 encoder and decoder — the same operation for both." faqs={getSeoContent("rot13-encoder-decoder", "ROT13 Encoder & Decoder").faqs} />
      <ClientPage />
    </>
  );
}
