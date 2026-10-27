import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random IP Address Generator — IPv4, IPv6 & CIDR Subnets",
  description: "Generate random IPv4 and IPv6 addresses for network testing, WAF benchmarking, and mock server logs. Supports public, RFC 1918 private, and CIDR masks.",
  alternates: {
    canonical: `${BASE}/random-ip-address-generator`,
  },
  openGraph: {
    title: "Random IP Address Generator — IPv4, IPv6 & CIDR Subnets",
    description: "Generate random IPv4 and IPv6 addresses for network testing, WAF benchmarking, and mock server logs. Supports public, RFC 1918 private, and CIDR masks.",
    url: `${BASE}/random-ip-address-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random IP Address Generator — IPv4, IPv6 & CIDR Subnets" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random IP Address Generator — IPv4, IPv6 & CIDR Subnets",
    description: "Generate random IPv4 and IPv6 addresses for network testing, WAF benchmarking, and mock server logs. Supports public, RFC 1918 private, and CIDR masks.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seo = getSeoContent("random-ip-address-generator", "Random IP Address Generator");
  return (
    <>
      <SchemaMarkup
        toolName="Random IP Address Generator"
        url={`${BASE}/random-ip-address-generator`}
        description="Generate random IPv4 and IPv6 addresses for network testing, WAF benchmarking, and mock server logs. Supports public, RFC 1918 private, and CIDR masks."
        faqs={seo.faqs}
      />
      <ClientPage />
    </>
  );
}
