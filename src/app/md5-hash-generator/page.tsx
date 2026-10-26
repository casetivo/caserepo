import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "MD5 Hash Generator — Free Online Tool",
  description: "Generate MD5 hash from any text string instantly. Free online MD5 hash generator — secure, fast, works entirely in your browser.",
  keywords: "MD5 hash generator, MD5 checksum, generate MD5 online, MD5 encoder free, text to MD5",
  alternates: {
    canonical: `${BASE}/md5-hash-generator`,
  },
  openGraph: {
    title: "MD5 Hash Generator — Free Online Tool",
    description: "Generate MD5 hash from any text string instantly. Free online MD5 hash generator — secure, fast, works entirely in your browser.",
    url: `${BASE}/md5-hash-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MD5 Hash Generator — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MD5 Hash Generator — Free Online Tool",
    description: "Generate MD5 hash from any text string instantly. Free online MD5 hash generator — secure, fast, works entirely in your browser.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="MD5 Hash Generator" url={`${BASE}/md5-hash-generator`} description="Generate MD5 hash from any text string instantly. Free online MD5 hash generator — secure, fast, works entirely in your browser." faqs={getSeoContent("md5-hash-generator", "MD5 Hash Generator").faqs} />
      <ClientPage />
    </>
  );
}
