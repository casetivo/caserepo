import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Casetivo, our mission, and our commitment to privacy and fast, local processing for developers and creators.',
  alternates: {
    canonical: 'https://www.casetivo.com/about',
  },
  openGraph: {
    description: "Learn about Casetivo, our mission, and our commitment to privacy and fast, local processing for developers and creators.",
    title: "About Casetivo",
    url: "https://www.casetivo.com/about",
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Casetivo" }],
  },
};

export default function AboutPage() {
  return (
    <>
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-4xl">
      <div className="space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            About <span className="text-primary">Casetivo</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We build lightning-fast, privacy-first web utilities for developers, writers, and creators. No tracking, no server uploads, just instant results.
          </p>
        </div>

        {/* Mission Section */}
        <section className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            In a world where simple tools require you to create an account, view intrusive ads, or unknowingly upload sensitive data to remote servers, we wanted to build something better. Casetivo is a collection of essential daily utilities designed with a single philosophy: <strong>tools should just work, instantly and securely.</strong>
          </p>
        </section>

        {/* Core Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:border-primary/50 transition-colors">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Privacy First</h3>
            <p className="text-sm text-muted-foreground">
              Everything happens in your browser. We never upload your text, code, or images to our servers. Your data stays yours.
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:border-primary/50 transition-colors">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              By leveraging client-side processing, our tools operate with zero network latency. Get your results in milliseconds.
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:border-primary/50 transition-colors">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Free & Open</h3>
            <p className="text-sm text-muted-foreground">
              No paywalls, no limits, no subscriptions. Access more than 55 formatting and generation tools completely free.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="prose prose-neutral dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-foreground mb-4">The Story</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Casetivo started as a simple case converter tool for a small team of developers tired of fixing capitalization errors in large JSON payloads. When we realized that most online tools were either logging our data or bombarding us with pop-ups, we decided to expand the project.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Today, Casetivo hosts more than 55 specialized utilities ranging from Markdown parsers and Base64 encoders to random generators and image converters. Every single tool is built using modern web standards (React and Next.js) to ensure maximum performance and accessibility.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you are formatting a 10,000-line JSON file, decoding an encoded URL, or simply fixing the capitalization in your latest blog post, Casetivo is here to help you get the job done quickly and move on with your day.
          </p>
        </section>

        {/* Call to Action */}
        <div className="text-center pt-8 border-t border-border/60">
          <h2 className="text-2xl font-bold text-foreground mb-6">Ready to get started?</h2>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore All Tools
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
