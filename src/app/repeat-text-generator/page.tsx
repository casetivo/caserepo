import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Repeat Text Generator — Free Online Tool",
  description: "Repeat any text multiple times with custom separator. Set repetitions from 1 to 1000. Free online repeat text generator tool.",
  keywords: "repeat text generator, duplicate text, repeat text multiple times, text repeater online",
  alternates: {
    canonical: `${BASE}/repeat-text-generator`,
  },
  openGraph: {
    title: "Repeat Text Generator — Free Online Tool",
    description: "Repeat any text multiple times with custom separator. Set repetitions from 1 to 1000. Free online repeat text generator tool.",
    url: `${BASE}/repeat-text-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Repeat Text Generator — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Repeat Text Generator — Free Online Tool",
    description: "Repeat any text multiple times with custom separator. Set repetitions from 1 to 1000. Free online repeat text generator tool.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Repeat Text Generator" url={`${BASE}/repeat-text-generator`} description="Repeat any text multiple times with custom separator. Set repetitions from 1 to 1000. Free online repeat text generator tool." faqs={getSeoContent("repeat-text-generator", "Repeat Text Generator").faqs} />
      <ClientPage />
    </>
  );
}
