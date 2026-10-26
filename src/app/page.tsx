import type { Metadata } from "next";
import HomeClientPage from "./_home_client";
import Link from "next/link";
import { Check, Code, Dices, Image as ImageIcon, Wrench } from "lucide-react";
import { getSortedPostsData } from "@/lib/blog";
import { TOOL_CATEGORIES } from "@/lib/tools";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Case Converter: Uppercase, Lowercase & Title Case | Casetivo",
  description: "Convert text to uppercase, lowercase, sentence case, title case, capitalized case, or inverse case. Free, private online case converter, no sign-up.",
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: "Case Converter: Uppercase, Lowercase & Title Case | Casetivo",
    description: "Convert text instantly to uppercase, lowercase, sentence case, title case, capitalized case, or inverse case. Free and private.",
    url: BASE,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Casetivo — Free Online Developer & Text Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Converter: Uppercase, Lowercase & Title Case | Casetivo",
    description: "Convert text instantly to uppercase, lowercase, sentence case, title case, capitalized case, or inverse case. Free and private.",
    images: ["/og-image.png"],
  },
};

const FEATURED_CASE_TOOLS = [
  { href: "/sentence-case", title: "Sentence Case Converter", description: "Capitalize the first word of each sentence and make text easier to read." },
  { href: "/upper-case", title: "Uppercase Converter", description: "Turn any text into capital letters instantly." },
  { href: "/lower-case", title: "Lowercase Converter", description: "Convert capital letters to lowercase in one click." },
  { href: "/title-case", title: "Title Case Converter", description: "Format article titles, headings, and subject lines correctly." },
] as const;

function FeaturedCaseTools() {
  return (
    <section className="mt-10" aria-labelledby="featured-case-tools">
      <div className="flex flex-col items-center text-center mb-6">
        <h2 id="featured-case-tools" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          Choose a Case Converter
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Pick the exact text format you need, or use the converter above to switch between all six formats.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURED_CASE_TOOLS.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/60 hover:shadow-md">
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{tool.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">Try tool →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    "Paste or type your text into the converter.",
    "Choose the case format you want to apply.",
    "Copy or download the converted text instantly.",
  ];

  return (
    <section className="mt-16 pt-8 border-t border-border/40" aria-labelledby="how-it-works">
      <div className="max-w-3xl mx-auto text-center">
        <h2 id="how-it-works" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          How to Convert Text Case
        </h2>
        <ol className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {steps.map((step, index) => (
            <li key={step} className="rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
              <span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-primary" /> Free to use, no sign-up, and processed in your browser.</p>
      </div>
    </section>
  );
}

function LatestGuides() {
  const posts = getSortedPostsData().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-border/40" aria-labelledby="latest-guides">
      <div className="flex flex-col items-center text-center mb-6">
        <h2 id="latest-guides" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>Latest Text &amp; Formatting Guides</h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">Helpful guides for choosing the right format and using text tools well.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <article key={post.id} className="rounded-xl border border-border bg-card p-5 flex flex-col">
            <p className="text-xs text-muted-foreground">{new Date(post.publish_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
            <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground"><Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link></h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">{post.meta_description}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 text-sm font-medium text-primary hover:underline">Read guide →</Link>
          </article>
        ))}
      </div>
      <div className="mt-6 text-center"><Link href="/blog" className="text-sm font-semibold text-primary hover:underline">View all articles →</Link></div>
    </section>
  );
}

function HomeSeoSection() {
  return (
    <section className="mt-16 pt-8 border-t border-border/40">
      <div className="max-w-3xl mx-auto text-center px-4 mb-10">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
          A Free Online Case Converter That Keeps Your Text Private
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Paste your text above and change it to sentence case, lowercase, UPPERCASE, Title Case, Capitalized Case, or iNVERSE cASE in one click. Casetivo runs in your browser, so the text you convert stays on your device. It is free to use, needs no account, and works on desktop and mobile.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Need one specific format? Try our <Link href="/sentence-case" className="text-primary hover:underline">Sentence Case Converter</Link>, <Link href="/upper-case" className="text-primary hover:underline">Uppercase Converter</Link>, <Link href="/lower-case" className="text-primary hover:underline">Lowercase Converter</Link>, or <Link href="/title-case" className="text-primary hover:underline">Title Case Converter</Link>.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto px-4 mb-10">
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <div className="text-2xl font-extrabold text-primary mb-1" style={{ fontFamily: "var(--font-display)" }}>55+</div>
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
            <h3 className="font-semibold text-foreground mb-1"><Link href="/json-formatter" className="hover:text-primary">JSON Formatter</Link></h3>
            <p className="text-muted-foreground">Paste minified or broken JSON and instantly format it with proper indentation, syntax highlighting, and error detection.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1"><Link href="/base64-encoder-decoder" className="hover:text-primary">Base64 Encoder &amp; Decoder</Link></h3>
            <p className="text-muted-foreground">Encode any string to Base64 or decode Base64 back to plain text. Supports UTF-8 and binary data.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1"><Link href="/uuid-generator" className="hover:text-primary">UUID Generator</Link></h3>
            <p className="text-muted-foreground">Generate RFC 4122 compliant UUIDs (v1 and v4) in bulk. Copy individual or all at once for use in databases and APIs.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1"><Link href="/sentence-case" className="hover:text-primary">Case Converters</Link></h3>
            <p className="text-muted-foreground">Convert text to sentence case, UPPER CASE, lower case, Title Case, Capitalized Case, or iNVERSE cASE in one click.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1"><Link href="/jpg-to-webp-converter" className="hover:text-primary">Image Converters</Link></h3>
            <p className="text-muted-foreground">Convert between JPG, PNG, WebP, and SVG formats directly in your browser. No file size limits, no server uploads.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1"><Link href="/duplicate-line-remover" className="hover:text-primary">Duplicate Line Remover</Link></h3>
            <p className="text-muted-foreground">Remove duplicate lines from any list or dataset, preserving original order. Ideal for email list cleaning and data deduplication.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: "What is an online case converter?",
    a: "An online case converter changes the capitalization of pasted text. You can turn text into uppercase, lowercase, sentence case, title case, capitalized case, or inverse case without retyping it."
  },
  {
    q: "How do I convert text to uppercase or lowercase?",
    a: "Paste or type your text into the converter at the top of this page, then choose UPPER CASE or lower case. Your converted text appears instantly and can be copied or downloaded."
  },
  {
    q: "What is the difference between sentence case and title case?",
    a: "Sentence case capitalizes the first word of a sentence and proper nouns. Title case capitalizes the major words in a heading or title. Use sentence case for regular writing and title case for article headings, book titles, and subject lines."
  },
  {
    q: "Which text cases can I convert to?",
    a: "You can convert text to sentence case, lowercase, UPPERCASE, Capitalized Case, Title Case, and iNVERSE cASE."
  },
  {
    q: "Is this case converter free and private?",
    a: "Yes. Casetivo is free, requires no sign-up, and processes your text locally in your browser. Your text is not uploaded to our servers."
  },
  {
    q: "Does the case converter work on mobile?",
    a: "Yes. You can paste, convert, copy, and download text from a phone, tablet, or desktop browser."
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

const CATEGORY_ICONS = [Wrench, Code, ImageIcon, Dices];

function ToolsDirectory() {
  return (
    <div className="mt-16 pt-8 border-t border-border/40">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-8 text-center whitespace-nowrap" style={{ fontFamily: "var(--font-display)" }}>
        All Free Developer &amp; Text Tools
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {TOOL_CATEGORIES.map((category, i) => {
          const Icon = CATEGORY_ICONS[i];
          return (
            <div key={category.name}>
              <div className="flex items-center gap-2 mb-3 text-primary">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <h3 className="font-semibold text-sm sm:text-base text-foreground">{category.name}</h3>
              </div>
              <ul className="space-y-1.5">
                {category.tools.map(({ href, label }) => (
                  <li key={href}><Link href={href} className="text-sm text-muted-foreground hover-brand transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    "name": "Casetivo",
    "url": BASE,
    "description": "Free online text tools — case converters, JSON formatter, image converters, and more.",
    "publisher": { "@id": `${BASE}/#organization` }
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    "name": "Casetivo",
    "url": BASE,
    "logo": `${BASE}/icon-512.png`,
    "email": "casetivo@gmail.com",
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
              Free Online Case Converter
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Convert text instantly to uppercase, lowercase, sentence case, title case, capitalized case, or inverse case free, private, and no sign-up required.
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground" aria-label="Case converter benefits">
              <li>Free forever</li>
              <li>No sign-up</li>
              <li>Private browser processing</li>
              <li>Works on mobile</li>
            </ul>
          </div>
        }
      >
        <FeaturedCaseTools />
        <HowItWorks />
        <HomeSeoSection />
        <HomeFaqSection />
        <LatestGuides />
        <ToolsDirectory />
      </HomeClientPage>
    </>
  );
}
