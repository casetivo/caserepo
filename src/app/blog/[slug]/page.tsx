import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPostData, getSortedPostsData } from "@/lib/blog";
import { ArrowLeft, Calendar, User, Clock, ArrowUpRight, Share2, Twitter, Linkedin, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }
  
  return {
    title: `${post.title} | Casetivo Blog`,
    description: post.meta_description,
    alternates: {
      canonical: `https://www.casetivo.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.meta_description,
      url: `https://www.casetivo.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publish_date,
      images: post.featured_image_url ? [{ url: post.featured_image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.meta_description,
      images: post.featured_image_url ? [post.featured_image_url] : ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);
  
  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "url": `https://www.casetivo.com/blog/${slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.casetivo.com/blog/${slug}`
    },
    "image": post.featured_image_url ? [post.featured_image_url] : [`https://www.casetivo.com/og-image.png`],
    "datePublished": post.publish_date,
    "dateModified": post.updated_date || post.publish_date,
    "description": post.meta_description,
    "author": { "@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com" },
    "publisher": {
      "@type": "Organization",
      "name": "Casetivo",
      "url": "https://www.casetivo.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.casetivo.com/icon-192.png",
        "width": 192,
        "height": 192
      }
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b bg-card">
          <div className="container mx-auto flex items-center gap-3 px-4 py-4 max-w-3xl">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/blog"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publish_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-10 max-w-3xl flex-1">
          <article>
            <h1 className="text-4xl font-extrabold mb-6 tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              {post.title}
            </h1>
            
            {post.featured_image_url && (
              <Image src={post.featured_image_url} alt={post.title} width={800} height={400} className="w-full rounded-2xl mb-10 object-cover border border-border shadow-sm max-h-[400px]" />
            )}
            
            <div 
              className="prose prose-neutral dark:prose-invert max-w-none 
                prose-headings:font-display prose-headings:tracking-tight 
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:border prose-img:border-border
                prose-pre:bg-muted prose-pre:border prose-pre:border-border"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
