import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import SubHeaderNav from "@/components/SubHeaderNav";
import SearchButton from "@/components/SearchButton";

export const metadata = {
  title: "Privacy Policy | Casetivo",
  description: "Privacy Policy for Casetivo"
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors">
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
          <p>Last updated: May 15, 2026</p>
          
          <h2>1. Introduction</h2>
          <p>Welcome to Casetivo. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your data when you visit our website.</p>

          <h2>2. Data Collection and Processing</h2>
          <p>Casetivo provides various client-side tools. For the vast majority of our tools, data processing happens entirely within your browser. We do not upload, store, or save your text, images, or files on our servers.</p>

          <h2>3. Cookies and Advertising</h2>
          <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Specifically:</p>
          <ul>
            <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</li>
          </ul>

          <h2>4. Analytics</h2>
          <p>We may use third-party Service Providers to monitor and analyze the use of our Service to improve performance and user experience.</p>

          <h2>5. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h2>6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us through our website.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
