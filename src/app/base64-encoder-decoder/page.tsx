import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder — Free Online Tool",
  description: "Encode text to Base64 or decode Base64 strings back to plain text instantly. Free online Base64 encoder and decoder with one click.",
  keywords: "base64 encoder decoder, base64 encode decode online, base64 converter, encode text base64 free",
  alternates: {
    canonical: `${BASE}/base64-encoder-decoder`,
  },
  openGraph: {
    title: "Base64 Encoder & Decoder — Free Online Tool",
    description: "Encode text to Base64 or decode Base64 strings back to plain text instantly. Free online Base64 encoder and decoder with one click.",
    url: `${BASE}/base64-encoder-decoder`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Base64 Encoder & Decoder — Free Online Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder & Decoder — Free Online Tool",
    description: "Encode text to Base64 or decode Base64 strings back to plain text instantly. Free online Base64 encoder and decoder with one click.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Base64 Encoder & Decoder", "url": "https://www.casetivo.com/base64-encoder-decoder", "description": "Encode text to Base64 or decode Base64 strings back to plain text instantly. Free online Base64 encoder and decoder with one click.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "All", "browserRequirements": "Requires JavaScript", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "publisher": { "@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com" }, "featureList": ["base64 encoder decoder", "base64 encode decode online", "base64 converter"] }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com" }, { "@type": "ListItem", "position": 2, "name": "Base64 Encoder & Decoder", "item": "https://www.casetivo.com/base64-encoder-decoder" }] }) }}
      />
      <ClientPage
        seoTitle="How does the Base64 Encoder & Decoder work?"
        seoContent={<><p>The Base64 encoder converts binary data into a text format that can be safely transmitted over channels designed for text, such as email or URLs. It replaces binary values with 64 distinct printable ASCII characters, making the data safe to copy, paste, and transmit without corruption.</p><p className="mt-4">Conversely, the decoder reverses the process, converting the encoded text back into its original binary format, allowing you to restore images, videos, or any other data that was encoded.</p></>}
        seoFaqs={[{ question: "Can it handle special characters?", answer: "Yes, the converter only affects letters (A-Z). Special characters, numbers, and symbols are left unchanged." }, { question: "Is the conversion permanent?", answer: "The tool provides the converted text as output, but it does not modify your original text unless you choose to copy it back." }]}
      />
    </>
  );
}
