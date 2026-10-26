import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPostData, getSortedPostsData } from "@/lib/blog";
import { ArrowLeft, Calendar, User, Clock, ArrowUpRight, Share2, Twitter, Linkedin, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { getAuthor } from "@/data/authors";

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
    title: post.title,
    description: post.meta_description,
    alternates: {
      canonical: `https://www.casetivo.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.meta_description,
      url: `https://www.casetivo.com/blog/${slug}`,
      type: "article",
      siteName: "Casetivo",
      publishedTime: post.publish_date,
      modifiedTime: post.updated_date || post.publish_date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.meta_description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);
  
  if (!post) {
    notFound();
  }

  const author = getAuthor(post.author);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "url": `https://www.casetivo.com/blog/${slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.casetivo.com/blog/${slug}`
    },
    "image": [`https://www.casetivo.com/blog/${slug}/opengraph-image`],
    "datePublished": post.publish_date,
    "dateModified": post.updated_date || post.publish_date,
    "description": post.meta_description,
    "author": author
      ? { "@type": "Person", "name": author.name, "jobTitle": author.role, "description": author.bio, "sameAs": author.sameAs }
      : { "@type": "Organization", "name": "Casetivo", "url": "https://www.casetivo.com" },
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

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.casetivo.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.casetivo.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.casetivo.com/blog/${slug}` },
    ],
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const wasUpdated = Boolean(post.updated_date && post.updated_date !== post.publish_date);
  // Every post currently points at the site-wide OG image; don't show it as a hero.
  const heroImage = post.featured_image_url && post.featured_image_url !== "/og-image.png" ? post.featured_image_url : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b bg-card">
          <div className="container mx-auto flex items-center gap-3 px-4 py-4 max-w-3xl">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/blog" aria-label="Back to blog"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publish_date}>{formatDate(post.publish_date)}</time>
              {wasUpdated && (
                <span>· Updated <time dateTime={post.updated_date}>{formatDate(post.updated_date!)}</time></span>
              )}
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-10 max-w-3xl flex-1">
          <article>
            <h1 className="text-4xl font-extrabold mb-6 tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              {post.title}
            </h1>

            {author && (
              <p className="-mt-2 mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>By <span className="font-semibold text-foreground">{author.name}</span> · {author.role}</span>
              </p>
            )}

            {heroImage && (
              <Image src={heroImage} alt={post.title} width={800} height={400} className="w-full rounded-2xl mb-10 object-cover border border-border shadow-sm max-h-[400px]" />
            )}
            
            <div 
              className="prose prose-neutral dark:prose-invert max-w-none 
                prose-headings:font-display prose-headings:tracking-tight 
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:border prose-img:border-border
                prose-pre:bg-muted prose-pre:border prose-pre:border-border"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {author && (
              <aside id="about-the-author" aria-label="About the author" className="mt-12 flex gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground" aria-hidden="true">
                  {author.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Written by</p>
                  <p className="mt-1 text-lg font-bold text-foreground">{author.name}</p>
                  <p className="text-sm text-muted-foreground">{author.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
                  {author.sameAs.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-4 text-sm">
                      {author.sameAs.map((url) => (
                        <li key={url}>
                          <a href={url} rel="me noopener" target="_blank" className="font-medium text-primary hover:underline">
                            {new URL(url).hostname.replace(/^www\./, "")}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </aside>
            )}
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
