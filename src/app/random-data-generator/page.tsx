import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random Data Generator — Synthetic Mock Data & Profiles",
  description: "Generate realistic fake names, RFC-compliant emails, phone numbers, addresses, and UUIDs for UI testing and database staging in JSON, CSV, or text.",
  alternates: {
    canonical: `${BASE}/random-data-generator`,
  },
  openGraph: {
    title: "Random Data Generator — Synthetic Mock Data & Profiles",
    description: "Generate realistic fake names, RFC-compliant emails, phone numbers, addresses, and UUIDs for UI testing and database staging in JSON, CSV, or text.",
    url: `${BASE}/random-data-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random Data Generator — Synthetic Mock Data & Profiles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Data Generator — Synthetic Mock Data & Profiles",
    description: "Generate realistic fake names, RFC-compliant emails, phone numbers, addresses, and UUIDs for UI testing and database staging in JSON, CSV, or text.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seo = getSeoContent("random-data-generator", "Random Data Generator");
  return (
    <>
      <SchemaMarkup
        toolName="Random Data Generator"
        url={`${BASE}/random-data-generator`}
        description="Generate realistic fake names, RFC-compliant emails, phone numbers, addresses, and UUIDs for UI testing and database staging in JSON, CSV, or text."
        faqs={seo.faqs}
      />
      <ClientPage />
    </>
  );
}
