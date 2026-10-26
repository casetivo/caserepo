import type { Metadata } from "next";
import { getSortedPostsData } from "@/lib/blog";
import { BookOpen } from "lucide-react";
import ToolHeader from "@/components/ToolHeader";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog — Text Tools Tips & Tutorials",
  description: "Read articles and tutorials about text processing, formatting tools, coding utilities, and productivity tips from the Casetivo team.",
  keywords: "text tools blog, coding tutorials, text formatting tips, developer tools articles",
  alternates: { canonical: "https://www.casetivo.com/blog" },
  openGraph: {
    title: "Blog — Text Tools Tips & Tutorials | Casetivo",
    description: "Articles and tutorials about text processing, formatting tools, and developer utilities.",
    url: "https://www.casetivo.com/blog",
    siteName: "Casetivo",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Casetivo Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Casetivo",
    description: "Articles and tutorials about text processing, formatting tools, and developer utilities.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  const posts = getSortedPostsData();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": ["Blog", "ItemList"],
    "name": "Casetivo Blog",
    "url": "https://www.casetivo.com/blog",
    "description": "Articles and tutorials about text processing, formatting tools, and developer utilities.",
    "publisher": {
      "@type": "Organization",
      "name": "Casetivo",
      "url": "https://www.casetivo.com"
    },
    "itemListElement": posts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": post.title,
      "url": `https://www.casetivo.com/blog/${post.slug}`
    }))
  };
  const breadcrumb = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com"}, {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.casetivo.com/blog"}]};

  // Serialize posts for the client component
  const serializedPosts = posts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    publish_date: post.publish_date || undefined,
    meta_description: post.meta_description || undefined,
    featured_image_url: post.featured_image_url || undefined,
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="min-h-screen bg-background flex flex-col">
        <ToolHeader icon={<BookOpen />} title="Blog" />
        <main className="container mx-auto px-4 py-8 max-w-6xl flex-1">
          <BlogList posts={serializedPosts} />
        </main>
        <Footer />
      </div>
    </>
  );
}

