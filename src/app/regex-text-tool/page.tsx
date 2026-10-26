import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Regex Text Tool — Match & Replace Online Free",
  description: "Test regex patterns against text, find matches, and replace using regular expressions. Free online regex text tool with match and replace modes.",
  alternates: {
    canonical: `${BASE}/regex-text-tool`,
  },
  openGraph: {
    title: "Regex Text Tool — Match & Replace Online Free",
    description: "Test regex patterns against text, find matches, and replace using regular expressions. Free online regex text tool with match and replace modes.",
    url: `${BASE}/regex-text-tool`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Regex Text Tool — Match & Replace Online Free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Text Tool — Match & Replace Online Free",
    description: "Test regex patterns against text, find matches, and replace using regular expressions. Free online regex text tool with match and replace modes.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Regex Text Tool" url={`${BASE}/regex-text-tool`} description="Test regex patterns against text, find matches, and replace using regular expressions. Free online regex text tool with match and replace modes." faqs={getSeoContent("regex-text-tool", "Regex Text Tool").faqs} />
      <ClientPage />
    </>
  );
}
