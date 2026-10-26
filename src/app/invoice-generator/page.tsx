import type { Metadata } from "next";
import InvoiceGeneratorClient from "./_client";

export const metadata: Metadata = {
  title: "Free Invoice Generator — Create PDF Invoices",
  description: "Create professional PDF invoices free. 20+ currencies including USD, EUR, GBP, PKR, and INR, with line items, tax, discount, and custom branding.",
  alternates: { canonical: "https://www.casetivo.com/invoice-generator" },
  openGraph: {
    title: "Free Invoice Generator — Create PDF Invoices",
    description: "Create professional PDF invoices with 20+ currencies. Add items, tax, discount, notes and download as PDF instantly.",
    url: "https://www.casetivo.com/invoice-generator",
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Invoice Generator — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice Generator — Free PDF Invoice Maker",
    description: "Create professional invoices with 20+ currencies and download as PDF instantly.",
    images: ["/og-image.png"],
  },
};

export default function InvoiceGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Invoice Generator",
    "url": "https://www.casetivo.com/invoice-generator",
    "description": "Free online invoice generator. Create professional PDF invoices with multiple currency support.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "publisher": { "@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com" },
    "featureList": ["PDF Export", "20+ Currencies", "Tax & Discount", "Custom Branding", "Save & Edit"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InvoiceGeneratorClient />
    </>
  );
}
