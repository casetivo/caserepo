import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "ROT13 Encoder & Decoder Online – ROT5, ROT18 & ROT47 Cipher | Casetivo",
  description:
    "Encode and decode text using the reciprocal ROT13 Caesar cipher. Supports ROT5 for numbers, ROT18, and ROT47 ASCII rotation with real-time character telemetry and zero server transmission.",
  keywords: [
    "rot13 encoder decoder",
    "rot13 cipher",
    "rot13 online",
    "rot5",
    "rot18",
    "rot47",
    "caesar cipher rot13",
    "decrypt rot13",
    "geocaching rot13 hint decoder",
    "reciprocal cipher",
  ],
  alternates: {
    canonical: `${BASE}/rot13-encoder-decoder`,
  },
  openGraph: {
    title: "ROT13 Encoder & Decoder Online – ROT5, ROT18 & ROT47 Cipher | Casetivo",
    description:
      "Encode and decode text using the reciprocal ROT13 Caesar cipher. Supports ROT5, ROT18, and ROT47 with real-time character telemetry and zero server transmission.",
    url: `${BASE}/rot13-encoder-decoder`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ROT13 Encoder & Decoder Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ROT13 Encoder & Decoder Online – ROT5, ROT18 & ROT47 Cipher | Casetivo",
    description:
      "Encode and decode text using the reciprocal ROT13 Caesar cipher. Supports ROT5, ROT18, and ROT47 with real-time character telemetry and zero server transmission.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("rot13EncoderDecoder", "ROT13 Encoder & Decoder");

  return (
    <>
      <SchemaMarkup
        toolName="ROT13 Encoder & Decoder"
        url={`${BASE}/rot13-encoder-decoder`}
        description="Encode or decode text using the reciprocal ROT13 substitution cipher. Features ROT5 numbers rotation, ROT18 alphanumeric, and ROT47 ASCII rotation with live character metrics."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
