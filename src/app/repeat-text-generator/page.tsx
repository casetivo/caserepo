import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Repeat Text Generator — Repeat Words & Lines",
  description: "Repeat any word, string, or text block up to 10,000 times. Customize separators (newlines, spaces, commas), add sequential line numbering, and copy instantly.",
  alternates: {
    canonical: `${BASE}/repeat-text-generator`,
  },
  openGraph: {
    title: "Repeat Text Generator — Repeat Words & Lines",
    description: "Repeat any word, string, or text block up to 10,000 times. Customize separators (newlines, spaces, commas), add sequential line numbering, and copy instantly.",
    url: `${BASE}/repeat-text-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Repeat Text Generator Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Repeat Text Generator — Repeat Words & Lines",
    description: "Repeat any word, string, or text block up to 10,000 times. Customize separators (newlines, spaces, commas), add sequential line numbering, and copy instantly.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seoData = getSeoContent("repeat-text-generator", "Repeat Text Generator");

  return (
    <>
      <SchemaMarkup
        toolName="Repeat Text Generator"
        url={`${BASE}/repeat-text-generator`}
        description="Repeat any word, string, or text block up to 10,000 times. Customize separators (newlines, spaces, commas), add sequential line numbering, and copy instantly."
        faqs={seoData.faqs}
      />
      <ClientPage />
    </>
  );
}
