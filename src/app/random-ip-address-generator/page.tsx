import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random IP Address Generator — IPv4 & IPv6 Free",
  description: "Generate random IPv4 or IPv6 addresses for testing and development. Bulk generation supported. Free online IP address generator.",
  keywords: "random IP address generator, fake IP address, generate IPv4 IPv6, random IP generator online free",
  alternates: {
    canonical: `${BASE}/random-ip-address-generator`,
  },
  openGraph: {
    title: "Random IP Address Generator — IPv4 & IPv6 Free",
    description: "Generate random IPv4 or IPv6 addresses for testing and development. Bulk generation supported. Free online IP address generator.",
    url: `${BASE}/random-ip-address-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random IP Address Generator — IPv4 & IPv6 Free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random IP Address Generator — IPv4 & IPv6 Free",
    description: "Generate random IPv4 or IPv6 addresses for testing and development. Bulk generation supported. Free online IP address generator.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <SchemaMarkup toolName="Random IP Address Generator" url={`${BASE}/random-ip-address-generator`} description="Generate random IPv4 or IPv6 addresses for testing and development. Bulk generation supported. Free online IP address generator." faqs={getSeoContent("random-ip-address-generator", "Random IP Address Generator").faqs} />
      <ClientPage />
    </>
  );
}
