import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "UUID Generator - Generate UUID v4 Online",
  description: "Generate UUID v4 values in bulk with standard hyphens or uppercase formatting. Created locally in your browser. Free, no sign-up required.",
  alternates: {
    canonical: `${BASE}/uuid-generator`,
  },
  openGraph: {
    title: "UUID Generator - Generate UUID v4 Online",
    description: "Generate UUID v4 values in bulk with standard hyphens or uppercase formatting. Created locally in your browser.",
    url: `${BASE}/uuid-generator`,
    siteName: "Casetivo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator - Generate UUID v4 Online",
    description: "Generate UUID v4 values in bulk with standard hyphens or uppercase formatting. Created locally in your browser.",
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
