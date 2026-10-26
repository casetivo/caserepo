import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random Data Generator — Names, Emails & Addresses",
  description: "Generate random fake names, email addresses, phone numbers, and addresses for testing. Free online random data generator.",
  keywords: "random data generator, fake data generator, random name email generator, test data generator online free",
  alternates: {
    canonical: `${BASE}/random-data-generator`,
  },
  openGraph: {
    title: "Random Data Generator — Names, Emails & Addresses",
    description: "Generate random fake names, email addresses, phone numbers, and addresses for testing. Free online random data generator.",
    url: `${BASE}/random-data-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random Data Generator — Names, Emails & Addresses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Data Generator — Names, Emails & Addresses",
    description: "Generate random fake names, email addresses, phone numbers, and addresses for testing. Free online random data generator.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Random Data Generator" url={`${BASE}/random-data-generator`} description="Generate random fake names, email addresses, phone numbers, and addresses for testing. Free online random data generator." faqs={getSeoContent("random-data-generator", "Random Data Generator").faqs} />
      <ClientPage />
    </>
  );
}
