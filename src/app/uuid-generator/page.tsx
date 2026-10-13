import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "UUID Generator - Generate UUID v4 Online",
  description: "Generate UUID v4 values in bulk with standard hyphens or uppercase formatting. Created locally in your browser. Free, no sign-up required.",
  keywords: "UUID generator, UUID v4 generator, generate UUID online, GUID generator free, unique ID generator",
  alternates: {
    canonical: `${BASE}/uuid-generator`,
  },
  openGraph: {
    title: "UUID Generator - Generate UUID v4 Online",
    description: "Generate UUID v4 values in bulk with standard hyphens or uppercase formatting. Created locally in your browser.",
    url: `${BASE}/uuid-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "UUID Generator by Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator - Generate UUID v4 Online",
    description: "Generate UUID v4 values in bulk with standard hyphens or uppercase formatting. Created locally in your browser.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="UUID Generator" url={`${BASE}/uuid-generator`} description="Generate UUID v4 values in bulk with standard hyphens or uppercase formatting, locally in your browser." faqs={getSeoContent("uuid-generator", "UUID Generator").faqs} />
      <ClientPage />
    </>
  );
}
