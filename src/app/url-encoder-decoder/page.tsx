import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder — Free Online Tool",
  description: "Encode URLs for safe transmission or decode URL-encoded strings back to plain text. Free online URL encoder and decoder tool.",
  keywords: "URL encoder decoder, percent encode URL, URL decode online, URI encoder decoder free",
  alternates: {
    canonical: `${BASE}/url-encoder-decoder`,
  },
  openGraph: {
    title: "URL Encoder & Decoder — Free Online Tool",
    description: "Encode URLs for safe transmission or decode URL-encoded strings back to plain text. Free online URL encoder and decoder tool.",
    url: `${BASE}/url-encoder-decoder`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "URL Encoder & Decoder — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encoder & Decoder — Free Online Tool",
    description: "Encode URLs for safe transmission or decode URL-encoded strings back to plain text. Free online URL encoder and decoder tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">URL Encoder & Decoder</h1>
      <SchemaMarkup toolName="URL Encoder & Decoder" url={`${BASE}/url-encoder-decoder`} description="Encode URLs for safe transmission or decode URL-encoded strings back to plain text. Free online URL encoder and decoder tool." faqs={getSeoContent("url-encoder-decoder", "URL Encoder & Decoder").faqs} />
      <ClientPage />
    </>
  );
}
