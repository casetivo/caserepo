import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random Number Generator — Free Online Tool",
  description: "Generate random numbers within any range. Set min, max, and count. Ideal for lotteries, games, and statistics. Free online random number generator.",
  alternates: {
    canonical: `${BASE}/random-number-generator`,
  },
  openGraph: {
    title: "Random Number Generator — Free Online Tool",
    description: "Generate random numbers within any range. Set min, max, and count. Ideal for lotteries, games, and statistics. Free online random number generator.",
    url: `${BASE}/random-number-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random Number Generator — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Number Generator — Free Online Tool",
    description: "Generate random numbers within any range. Set min, max, and count. Ideal for lotteries, games, and statistics. Free online random number generator.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Random Number Generator" url={`${BASE}/random-number-generator`} description="Generate random numbers within any range. Set min, max, and count. Ideal for lotteries, games, and statistics. Free online random number generator." faqs={getSeoContent("random-number-generator", "Random Number Generator").faqs} />
      <ClientPage />
    </>
  );
}
