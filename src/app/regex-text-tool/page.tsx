import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Regex Text Tool Online – Test, Match & Replace Regular Expressions | Casetivo",
  description:
    "Test regular expressions in real time. Extract regex matches, execute search-and-replace with backreferences ($1, $2), toggle flags (g, i, m, s, u), and access prebuilt patterns for emails, URLs, and IPs.",
  keywords: [
    "regex text tool",
    "regex tester",
    "regex online test",
    "regular expression tester",
    "regex match and replace",
    "regex pattern extractor",
    "javascript regex tester",
    "regex replace with backreference",
    "regex flags g i m s u",
  ],
  alternates: {
    canonical: `${BASE}/regex-text-tool`,
  },
  openGraph: {
    title: "Regex Text Tool Online – Test, Match & Replace Regular Expressions | Casetivo",
    description:
      "Test regular expressions in real time. Extract regex matches, execute search-and-replace with backreferences, toggle flags, and access prebuilt patterns for emails, URLs, and IPs.",
    url: `${BASE}/regex-text-tool`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Regex Text Tool Online — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Text Tool Online – Test, Match & Replace Regular Expressions | Casetivo",
    description:
      "Test regular expressions in real time. Extract regex matches, execute search-and-replace with backreferences, toggle flags, and access prebuilt patterns.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("regexTextTool", "Regex Text Tool");

  return (
    <>
      <SchemaMarkup
        toolName="Regex Text Tool"
        url={`${BASE}/regex-text-tool`}
        description="Test, validate, and debug regular expressions online. Supports regex match extraction, pattern replacement with group backreferences, interactive flag toggles, and prebuilt patterns."
        faqs={seoData.faqs}
      />

      <ClientPage />
    </>
  );
}
