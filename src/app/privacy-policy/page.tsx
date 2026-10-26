import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import SubHeaderNav from "@/components/SubHeaderNav";
import SearchButton from "@/components/SearchButton";

export const metadata = {
  title: "Privacy Policy",
  description: "Read Casetivo's Privacy Policy to learn how our browser-based tools process data and protect your privacy.",
  alternates: {
    canonical: "https://www.casetivo.com/privacy-policy",
  },
  openGraph: {
    description: "Read Casetivo's Privacy Policy to learn how our browser-based tools process data and protect your privacy.",
    title: "Privacy Policy | Casetivo",
    url: "https://www.casetivo.com/privacy-policy",
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Privacy Policy | Casetivo" }],
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Back to all tools" className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/" className="text-lg font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Casetivo
            </Link>
          </div>
          <div className="hidden xl:flex flex-1 justify-center px-4 overflow-hidden">
            <SubHeaderNav />
          </div>
          <div className="flex items-center gap-2">
            <SearchButton />
          </div>
        </div>
        <div className="xl:hidden border-t border-border/60 bg-card/30 py-1 px-4">
          <SubHeaderNav />
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p>Last updated: October 26, 2026</p>

          <h2>1. Introduction</h2>
          <p>Welcome to Casetivo. We respect your privacy and are committed to protecting your personal data. This privacy policy explains what happens to your data when you visit our website and use our tools.</p>

          <h2>2. Data Collection and Processing</h2>
          <p>All Casetivo tools run entirely in your browser. The text, code, images, and files you enter are processed on your device and are never uploaded to, stored on, or saved by our servers.</p>

          <h2>3. Data Stored in Your Browser</h2>
          <p>Some features save data locally in your own browser so they work the next time you visit. This data stays on your device, is not sent to us, and can be removed at any time by clearing your browser&apos;s site data:</p>
          <ul>
            <li><strong>Theme preference:</strong> whether you chose light or dark mode.</li>
            <li><strong>Invoice Generator:</strong> invoices you save, so you can edit and download them later.</li>
            <li><strong>Image to Text (OCR):</strong> the text-recognition language data, cached so later extractions start faster.</li>
          </ul>

          <h2>4. Cookies, Advertising, and Analytics</h2>
          <p>Casetivo does not use cookies, does not show advertising, and does not use analytics or tracking tools. If we add any of these in the future, we will update this policy before doing so.</p>

          <h2>5. Third-Party Services</h2>
          <ul>
            <li><strong>Hosting:</strong> our website is hosted by Vercel. Like any web host, Vercel processes standard request information such as your IP address and browser type in order to deliver pages and protect against abuse.</li>
            <li><strong>OCR files:</strong> the first time you use the Image to Text tool, your browser downloads the open-source text-recognition engine and language data from the public jsDelivr CDN. Your image is not sent to the CDN or anywhere else.</li>
          </ul>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h2>7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us through our website.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
