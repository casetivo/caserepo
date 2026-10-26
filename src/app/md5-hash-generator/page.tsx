import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "MD5 Hash Generator Online – Generate 128-Bit Checksums | Casetivo",
  description:
    "Generate 128-bit MD5 hashes from any text string online. Fast, secure, and 100% private in-browser cryptographic hashing. Support for uppercase/lowercase output and checksum verification.",
  keywords: [
    "md5 hash generator",
    "md5 generator online",
    "generate md5 hash",
    "md5 checksum tool",
    "md5 encrypt online",
    "string to md5",
    "md5 hash online",
    "128 bit hash generator",
  ],
  alternates: {
    canonical: `${BASE}/md5-hash-generator`,
  },
  openGraph: {
    title: "MD5 Hash Generator Online – Generate 128-Bit Checksums | Casetivo",
    description:
      "Generate 128-bit MD5 hashes from any text string online. Fast, secure, and 100% private in-browser cryptographic hashing. Support for uppercase/lowercase output and checksum verification.",
    url: `${BASE}/md5-hash-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MD5 Hash Generator Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MD5 Hash Generator Online – Generate 128-Bit Checksums | Casetivo",
    description:
      "Generate 128-bit MD5 hashes from any text string online. Fast, secure, and 100% private in-browser cryptographic hashing. Support for uppercase/lowercase output and checksum verification.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("md5HashGenerator", "MD5 Hash Generator");

  return (
    <>
      <SchemaMarkup
        toolName="MD5 Hash Generator"
        url={`${BASE}/md5-hash-generator`}
        description="Generate standard 32-character MD5 checksums online. Features UTF-8 multi-byte encoding, uppercase/lowercase casing, live input metrics, and complete client-side privacy."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
