import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getSeoContent } from "@/data/seoContent";
import RecentBlogPosts from "@/components/RecentBlogPosts";
import ClientPage from "./_client";

const BASE = "https://www.casetivo.com";

export const metadata: Metadata = {
  title: "Random Month Generator — Calendar Picker & Quarterly Scheduler",
  description: "Pick random months of the year for compliance audits, quarterly planning, or event scheduling. Supports unique sampling, Roman numerals, and fiscal filters.",
  alternates: {
    canonical: `${BASE}/random-month-generator`,
  },
  openGraph: {
    title: "Random Month Generator — Calendar Picker & Quarterly Scheduler",
    description: "Pick random months of the year for compliance audits, quarterly planning, or event scheduling. Supports unique sampling, Roman numerals, and fiscal filters.",
    url: `${BASE}/random-month-generator`,
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Random Month Generator — Calendar Picker & Quarterly Scheduler" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Month Generator — Calendar Picker & Quarterly Scheduler",
    description: "Pick random months of the year for compliance audits, quarterly planning, or event scheduling. Supports unique sampling, Roman numerals, and fiscal filters.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const seo = getSeoContent("random-month-generator", "Random Month Generator");
  return (
    <>
      <SchemaMarkup
        toolName="Random Month Generator"
        url={`${BASE}/random-month-generator`}
        description="Pick random months of the year for compliance audits, quarterly planning, or event scheduling. Supports unique sampling, Roman numerals, and fiscal filters."
        faqs={seo.faqs}
      />
      <ClientPage
        seoTitle={seo.title}
        seoContent={seo.content}
        seoFaqs={seo.faqs}
        recentBlogPostsSlot={
          <RecentBlogPosts
            postSlugs={["how-to-pick-random-months", "how-to-make-random-choices-online", "how-to-generate-random-numbers"]}
            title="Calendar Scheduling & Decision Guides"
          />
        }
      />
    </>
  );
}
