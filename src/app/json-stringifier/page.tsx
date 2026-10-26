import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "JSON Stringifier Online – Escape & Stringify JSON Strings | Casetivo",
  description:
    "Convert JSON objects and raw text into properly escaped JSON strings online. Escape double quotes, newlines, tabs, and backslashes for API payloads, .env files, and cURL commands with 100% browser privacy.",
  keywords: [
    "json stringifier",
    "json stringify online",
    "escape json string",
    "json escape tool",
    "stringify json online",
    "unescape json string",
    "convert json to escaped string",
    "escape quotes in json",
    "json stringify text",
  ],
  alternates: {
    canonical: `${BASE}/json-stringifier`,
  },
  openGraph: {
    title: "JSON Stringifier Online – Escape & Stringify JSON Strings | Casetivo",
    description:
      "Convert JSON objects and raw text into properly escaped JSON strings online. Escape double quotes, newlines, tabs, and backslashes for API payloads, .env files, and cURL commands with 100% browser privacy.",
    url: `${BASE}/json-stringifier`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JSON Stringifier Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Stringifier Online – Escape & Stringify JSON Strings | Casetivo",
    description:
      "Convert JSON objects and raw text into properly escaped JSON strings online. Escape double quotes, newlines, tabs, and backslashes for API payloads, .env files, and cURL commands with 100% browser privacy.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("jsonStringifier", "JSON Stringifier");

  return (
    <>
      <SchemaMarkup
        toolName="JSON Stringifier"
        url={`${BASE}/json-stringifier`}
        description="Escape and stringify raw text and JSON objects online. Features custom quote wrapping, unescape mode, live escape count telemetry, and complete client-side privacy."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
