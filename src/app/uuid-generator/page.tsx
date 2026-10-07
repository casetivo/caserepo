import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "UUID Generator — Free UUID v4 Online Tool",
  description: "Generate universally unique identifiers (UUID v4) in bulk. Supports uppercase output. Free online UUID generator — instant results.",
  keywords: "UUID generator, UUID v4 generator, generate UUID online, GUID generator free, unique ID generator",
  alternates: {
    canonical: `${BASE}/uuid-generator`,
  },
  openGraph: {
    title: "UUID Generator — Free UUID v4 Online Tool",
    description: "Generate universally unique identifiers (UUID v4) in bulk. Supports uppercase output. Free online UUID generator — instant results.",
    url: `${BASE}/uuid-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "UUID Generator — Free UUID v4 Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator — Free UUID v4 Online Tool",
    description: "Generate universally unique identifiers (UUID v4) in bulk. Supports uppercase output. Free online UUID generator — instant results.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">UUID Generator</h1>
      <SchemaMarkup toolName="UUID Generator" url={`${BASE}/uuid-generator`} description="Generate universally unique identifiers (UUID v4) in bulk. Supports uppercase output. Free online UUID generator — instant results." faqs={getSeoContent("uuid-generator", "UUID Generator").faqs} />
      <ClientPage />
    </>
  );
}
