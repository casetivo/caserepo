import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random Month Generator — Free Online Tool",
  description: "Pick one or more random months of the year. Useful for games, decisions, and random sampling. Free online random month generator.",
  keywords: "random month generator, pick random month, random month picker online, month randomizer free",
  alternates: {
    canonical: `${BASE}/random-month-generator`,
  },
  openGraph: {
    title: "Random Month Generator — Free Online Tool",
    description: "Pick one or more random months of the year. Useful for games, decisions, and random sampling. Free online random month generator.",
    url: `${BASE}/random-month-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random Month Generator — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Month Generator — Free Online Tool",
    description: "Pick one or more random months of the year. Useful for games, decisions, and random sampling. Free online random month generator.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Random Month Generator" url={`${BASE}/random-month-generator`} description="Pick one or more random months of the year. Useful for games, decisions, and random sampling. Free online random month generator." faqs={getSeoContent("random-month-generator", "Random Month Generator").faqs} />
      <ClientPage />
    </>
  );
}
