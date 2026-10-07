import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Reverse Text Generator — Free Online Tool",
  description: "Reverse any text string instantly. Mirror your text character by character or word by word. Free online reverse text generator.",
  keywords: "reverse text, mirror text, backwards text generator, reverse string online free",
  alternates: {
    canonical: `${BASE}/reverse-text-generator`,
  },
  openGraph: {
    title: "Reverse Text Generator — Free Online Tool",
    description: "Reverse any text string instantly. Mirror your text character by character or word by word. Free online reverse text generator.",
    url: `${BASE}/reverse-text-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Reverse Text Generator — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reverse Text Generator — Free Online Tool",
    description: "Reverse any text string instantly. Mirror your text character by character or word by word. Free online reverse text generator.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Reverse Text Generator</h1>
      <SchemaMarkup toolName="Reverse Text Generator" url={`${BASE}/reverse-text-generator`} description="Reverse any text string instantly. Mirror your text character by character or word by word. Free online reverse text generator." faqs={getSeoContent("reverse-text-generator", "Reverse Text Generator").faqs} />
      <ClientPage />
    </>
  );
}
