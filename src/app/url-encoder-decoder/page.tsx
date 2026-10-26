import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder Online – Percent-Encoding & Decoding | Casetivo",
  description:
    "Encode and decode URLs and query string parameters online for free. Full support for RFC 3986 percent-encoding, space toggles (%20 vs +), component vs full URI mode, and 100% private in-browser execution.",
  keywords: [
    "url encoder",
    "url decoder",
    "url encode online",
    "url decode online",
    "percent encoding",
    "url encode string",
    "decode url query",
    "encode uricomponent",
    "url escape tool",
  ],
  alternates: {
    canonical: `${BASE}/url-encoder-decoder`,
  },
  openGraph: {
    title: "URL Encoder & Decoder Online – Percent-Encoding & Decoding | Casetivo",
    description:
      "Encode and decode URLs and query string parameters online for free. Full support for RFC 3986 percent-encoding, space toggles (%20 vs +), component vs full URI mode, and 100% private in-browser execution.",
    url: `${BASE}/url-encoder-decoder`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "URL Encoder & Decoder Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encoder & Decoder Online – Percent-Encoding & Decoding | Casetivo",
    description:
      "Encode and decode URLs and query string parameters online for free. Full support for RFC 3986 percent-encoding, space toggles (%20 vs +), component vs full URI mode, and 100% private in-browser execution.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("urlEncoderDecoder", "URL Encoder & Decoder");

  return (
    <>
      <SchemaMarkup
        toolName="URL Encoder & Decoder"
        url={`${BASE}/url-encoder-decoder`}
        description="Encode and decode URLs, query parameters, and URIs online. Features RFC 3986 compliance, space encoding presets (%20 vs +), full URI vs query parameter mode, and live character telemetry."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
