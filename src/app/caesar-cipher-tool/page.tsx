import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Caesar Cipher Tool — Free Online Encoder/Decoder",
  description: "Encrypt and decrypt text using the Caesar cipher with custom shift value (1–25). Free online Caesar cipher encoder and decoder tool.",
  keywords: "caesar cipher, caesar cipher encoder decoder, ROT cipher, shift cipher tool online free",
  alternates: {
    canonical: `${BASE}/caesar-cipher-tool`,
  },
  openGraph: {
    title: "Caesar Cipher Tool — Free Online Encoder/Decoder",
    description: "Encrypt and decrypt text using the Caesar cipher with custom shift value (1–25). Free online Caesar cipher encoder and decoder tool.",
    url: `${BASE}/caesar-cipher-tool`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Caesar Cipher Tool — Free Online Encoder/Decoder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caesar Cipher Tool — Free Online Encoder/Decoder",
    description: "Encrypt and decrypt text using the Caesar cipher with custom shift value (1–25). Free online Caesar cipher encoder and decoder tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Caesar Cipher Tool" url={`${BASE}/caesar-cipher-tool`} description="Encrypt and decrypt text using the Caesar cipher with custom shift value (1–25). Free online Caesar cipher encoder and decoder tool." faqs={getSeoContent("caesar-cipher-tool", "Caesar Cipher Tool").faqs} />
      <ClientPage />
    </>
  );
}
