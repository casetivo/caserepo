import type { Metadata } from "next";
import InvoiceGeneratorClient from "./_client";
import InvoiceSeo, { INVOICE_FAQS } from "./_seo";

const BASE = "https://www.casetivo.com";
const URL = `${BASE}/invoice-generator`;
const TITLE = "Free Invoice Generator – Create PDF Invoices Online";
const DESCRIPTION =
  "Free invoice generator: create professional PDF invoices online with your logo, tax, discount and 20 currencies. Download instantly, no sign-up.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Google ignores the keywords meta tag; kept for other engines and tools.
  keywords: [
    "invoice generator",
    "free invoice generator",
    "invoice maker",
    "invoice generator online",
    "create invoice online",
    "online invoice generator",
    "pdf invoice generator",
    "invoice template",
    "free invoice template",
    "freelance invoice generator",
    "invoice generator no sign up",
    "simple invoice generator",
    "invoice creator",
    "make an invoice",
    "billing invoice",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Free Invoice Generator — Casetivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Invoice Generator",
    url: URL,
    description: DESCRIPTION,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", "@id": `${BASE}/#organization`, name: "Casetivo", url: BASE, logo: `${BASE}/icon-512.png` },
    featureList: ["Live invoice preview", "PDF download", "20 currencies", "Tax and discount", "Logo and color branding", "Auto-saved drafts"],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Invoice Generator", item: URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to create an invoice online",
    step: [
      { "@type": "HowToStep", name: "Add your business details", text: "Enter your name or company, contact details and address, and optionally upload a logo." },
      { "@type": "HowToStep", name: "Fill in your client", text: "Add the client you are billing." },
      { "@type": "HowToStep", name: "Set the invoice number, dates and currency", text: "Choose a payment term such as Net 30 to fill in the due date." },
      { "@type": "HowToStep", name: "List your items or services", text: "Add a description, quantity and rate for each line." },
      { "@type": "HowToStep", name: "Add tax, discount, notes and payment details", text: "Include tax, a discount and how the client should pay." },
      { "@type": "HowToStep", name: "Download your PDF", text: "Click Download PDF and choose Save as PDF in the print dialog." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INVOICE_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
];

export default function InvoiceGeneratorPage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <InvoiceGeneratorClient>
        <InvoiceSeo />
      </InvoiceGeneratorClient>
    </>
  );
}
