import type { Metadata } from "next";
import HomeClientPage from "./_home_client";
import Link from "next/link";
import { Type, Wrench, Code, Image as ImageIcon, Dices } from "lucide-react";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Free Online Case Converter & 60+ Text Tools | Casetivo",
  description: "Casetivo's free online case converter instantly changes text to uppercase, lowercase, sentence case, and more. Format text quickly for docs, coding & blogs.",
  keywords: "case converter, convert case, uppercase to lowercase, sentence case, title case, toggle case, free online tools, text case converter, Casetivo",
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: "Free Online Case Converter & 60+ Text Tools | Casetivo",
    description: "Casetivo's free online case converter instantly changes text to uppercase, lowercase, sentence case, and more. Format text quickly for docs, coding & blogs.",
    url: BASE,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Casetivo — Free Online Developer & Text Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Case Converter & 60+ Text Tools | Casetivo",
    description: "Casetivo's free online case converter instantly changes text to uppercase, lowercase, sentence case, and more. Format text quickly for docs, coding & blogs.",
    images: ["/og-image.png"],
  },
};

const TEXT_TOOLS = [
  ["/sentence-case","Sentence Case"],["/lower-case","lower case"],
  ["/upper-case","UPPER CASE"],["/capitalized-case","Capitalized Case"],
  ["/title-case","Title Case"],["/inverse-case","iNVERSE cASE"],
  ["/duplicate-line-remover","Duplicate Line Remover"],["/duplicate-word-finder","Duplicate Word Finder"],
  ["/em-dash-remover","Em Dash Remover"],["/plain-text-converter","Plain Text Converter"],
  ["/remove-letters-characters","Remove Letters & Characters"],["/sentence-rewriter","Sentence Rewriter"],
  ["/repeat-text-generator","Repeat Text Generator"],["/reverse-text-generator","Reverse Text Generator"],
  ["/roman-numeral-date-converter","Roman Numeral Date Converter"],["/sort-words-alphabetically","Sort Words Alphabetically"],
  ["/text-replacement-tool","Text Replacement Tool"],
] as const;

const CODE_TOOLS = [
  ["/base64-encoder-decoder","Base64 Encoder & Decoder"],["/binary-code-translator","Binary Code Translator"],
  ["/css-formatter","CSS Formatter"],["/csv-to-json-converter","CSV to JSON Converter"],
  ["/caesar-cipher-tool","Caesar Cipher Tool"],["/graphql-formatter","GraphQL Formatter"],
  ["/html-formatter","HTML Formatter"],["/hex-to-text-converter","Hex to Text Converter"],
  ["/json-formatter","JSON Formatter"],["/url-encoder-decoder","URL Encoder & Decoder"],
  ["/markdown-to-html-converter","Markdown to HTML"],["/json-stringifier","JSON Stringifier"],
  ["/json-to-yaml-converter","JSON to YAML"],["/javascript-formatter","JavaScript Formatter"],
  ["/md5-hash-generator","MD5 Hash Generator"],["/markdown-formatter-previewer","Markdown Formatter"],
  ["/markdown-table-generator","Markdown Table Generator"],["/morse-code-translator","Morse Code Translator"],
  ["/number-sorter","Number Sorter"],["/rot13-encoder-decoder","ROT13 Encoder & Decoder"],
  ["/regex-text-tool","Regex Text Tool"],["/scss-formatter","SCSS Formatter"],
] as const;

const IMAGE_TOOLS = [
  ["/ai-image-to-text","AI Image to Text"],["/ascii-art-generator","ASCII Art Generator"],
  ["/jpg-to-png-converter","JPG to PNG"],["/jpg-to-webp-converter","JPG to WebP"],
  ["/png-to-jpg-converter","PNG to JPG"],["/png-to-webp-converter","PNG to WebP"],
  ["/svg-to-png-converter","SVG to PNG"],["/webp-to-png-converter","WebP to PNG"],
  ["/webp-to-jpg-converter","WebP to JPG"],
] as const;

const RANDOM_TOOLS = [
  ["/random-choice-generator","Random Choice Generator"],["/random-data-generator","Random Data Generator"],
  ["/random-ip-address-generator","Random IP Generator"],["/random-letter-generator","Random Letter Generator"],
  ["/random-month-generator","Random Month Generator"],["/random-number-generator","Random Number Generator"],
  ["/strong-password-generator","Password Generator"],["/uuid-generator","UUID Generator"],
] as const;

function HomeSeoSection() {
  return (
    <section className="mt-16 pt-8 border-t border-border/40">
      <div className="max-w-3xl mx-auto text-center px-4 mb-10">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Why People Love Using Casetivo
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Let's be real: sometimes you just need to format a messy JSON file, convert an image to WebP, or quickly change text to UPPERCASE without downloading heavy software. That's exactly why we built Casetivo. It gives you 60+ handy, browser-based utilities that just work. Since everything runs directly on your device, your data stays private and you don't have to deal with annoying server uploads or paywalls. Whether you're a developer pushing code, a writer drafting content, or a student organizing notes, we've got a free tool to save you time.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto px-4 mb-10">
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <div className="text-2xl font-extrabold text-primary mb-1" style={{ fontFamily: "var(--font-display)" }}>60+</div>
          <div className="text-sm font-semibold text-foreground mb-1">Free Tools</div>
          <p className="text-xs text-muted-foreground">Case converters, code formatters, image converters, random generators, and more.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <div className="text-2xl font-extrabold text-primary mb-1" style={{ fontFamily: "var(--font-display)" }}>0</div>
          <div className="text-sm font-semibold text-foreground mb-1">Data Stored</div>
          <p className="text-xs text-muted-foreground">All processing runs locally in your browser. Your text never leaves your device.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <div className="text-2xl font-extrabold text-primary mb-1" style={{ fontFamily: "var(--font-display)" }}>∞</div>
          <div className="text-sm font-semibold text-foreground mb-1">No Limits</div>
          <p className="text-xs text-muted-foreground">No rate limits, no login, no subscription. Paste any amount of text and convert instantly.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Popular Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <h3 className="font-semibold text-foreground mb-1">JSON Formatter</h3>
            <p className="text-muted-foreground">Paste minified or broken JSON and instantly format it with proper indentation, syntax highlighting, and error detection.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Base64 Encoder &amp; Decoder</h3>
            <p className="text-muted-foreground">Encode any string to Base64 or decode Base64 back to plain text. Supports UTF-8 and binary data.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">UUID Generator</h3>
            <p className="text-muted-foreground">Generate RFC 4122 compliant UUIDs (v1 and v4) in bulk. Copy individual or all at once for use in databases and APIs.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Case Converters</h3>
            <p className="text-muted-foreground">Convert text to sentence case, UPPER CASE, lower case, Title Case, Capitalized Case, or iNVERSE cASE in one click.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Image Converters</h3>
            <p className="text-muted-foreground">Convert between JPG, PNG, WebP, and SVG formats directly in your browser. No file size limits, no server uploads.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Duplicate Line Remover</h3>
            <p className="text-muted-foreground">Remove duplicate lines from any list or dataset, preserving original order. Ideal for email list cleaning and data deduplication.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: "What is Casetivo?",
    a: "Casetivo is a free suite of 60+ browser-based utilities, including text case converters, JSON formatters, image converters, and developer tools."
  },
  {
    q: "Who is it for?",
    a: "It's built for developers, copywriters, students, and anyone else who needs to quickly format data, text, or images without installing new software."
  },
  {
    q: "How secure is my data?",
    a: "Extremely secure. All processing runs entirely locally inside your web browser. We never upload your text, files, or data to our servers."
  },
  {
    q: "Can I manage multiple cases?",
    a: "Yes! Our case converter tool supports multiple text formats, including sentence case, UPPER CASE, lower case, Title Case, Capitalized Case, and iNVERSE cASE."
  },
  {
    q: "Does it work on mobile?",
    a: "Absolutely. Casetivo is fully responsive and works seamlessly directly from your smartphone or tablet browser."
  },
  {
    q: "Can I import existing cases?",
    a: "You can easily paste any existing text, code snippets, or data directly into our tools to convert or format them instantly."
  },
  {
    q: "Is there a free trial?",
    a: "You don't need one! Casetivo is 100% free forever. There are no accounts to create, no subscriptions to buy, and no annoying rate limits."
  }
];

function HomeFaqSection() {
  return (
    <section className="mt-16 pt-8 border-t border-border/40 mb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {FAQ_ITEMS.map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-foreground text-base mb-1">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsDirectory() {
  return (
    <div className="mt-16 pt-8 border-t border-border/40">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-8 text-center whitespace-nowrap" style={{ fontFamily: "var(--font-display)" }}>
        All Free Developer &amp; Text Tools
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3 text-primary">
            <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Text Tools</h3>
          </div>
          <ul className="space-y-1.5">
            {TEXT_TOOLS.map(([href, label]) => (
              <li key={href}><Link href={href} className="text-muted-foreground hover-brand transition-colors text-xs">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3 text-primary">
            <Code className="w-4 h-4 sm:w-5 sm:h-5" />
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Code &amp; Data</h3>
          </div>
          <ul className="space-y-1.5">
            {CODE_TOOLS.map(([href, label]) => (
              <li key={href}><Link href={href} className="text-muted-foreground hover-brand transition-colors text-xs">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3 text-primary">
            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Image Tools</h3>
          </div>
          <ul className="space-y-1.5">
            {IMAGE_TOOLS.map(([href, label]) => (
              <li key={href}><Link href={href} className="text-muted-foreground hover-brand transition-colors text-xs">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3 text-primary">
            <Dices className="w-4 h-4 sm:w-5 sm:h-5" />
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Random Generators</h3>
          </div>
          <ul className="space-y-1.5">
            {RANDOM_TOOLS.map(([href, label]) => (
              <li key={href}><Link href={href} className="text-muted-foreground hover-brand transition-colors text-xs">{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Casetivo",
    "url": BASE,
    "description": "Free online text tools — case converters, JSON formatter, image converters, and more.",
    "publisher": { "@type": "Organization", "name": "Casetivo", "url": BASE }
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Casetivo",
    "url": BASE,
    "logo": `${BASE}/icon-512.png`,
    "sameAs": [],
    "description": "Free online text tools, code formatters, image converters, and developer utilities."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClientPage
        heading={
          <div className="text-center mb-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Free Online Tools to Edit, Convert & Optimize Text, Code & Images
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Easily convert text between uppercase, lowercase, title case, sentence case, and other formats instantly. 
            </p>
          </div>
        }
      >
        <HomeSeoSection />
        <HomeFaqSection />
        <ToolsDirectory />
      </HomeClientPage>
    </>
  );
}
