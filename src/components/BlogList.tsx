"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight, Search } from "lucide-react";

export interface BlogPostMeta {
  id: string;
  slug: string;
  title: string;
  publish_date?: string;
  meta_description?: string;
  featured_image_url?: string;
}

export default function BlogList({ posts }: { posts: BlogPostMeta[] }) {
  const [query, setQuery] = useState("");

  const filtered = posts.filter(post => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      (post.meta_description && post.meta_description.toLowerCase().includes(q))
    );
  });

  return (
    <>
      {/* Search Bar */}
      <div className="relative mb-8 max-w-md mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search articles..."
          aria-label="Search blog articles"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 text-sm transition-shadow"
        />
      </div>

      {/* Blog Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          {query.trim() ? `No articles found for "${query}".` : "No articles published yet."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block group h-full">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                {post.featured_image_url && (
                  <Image src={post.featured_image_url} alt={post.title} width={800} height={192} className="w-full h-48 object-cover shrink-0" />
                )}
                <CardContent className="p-6 flex flex-col flex-1">
                  <h2 className="text-lg font-bold mb-2 group-hover-brand transition-colors" style={{ fontFamily: "var(--font-display)" }}>{post.title}</h2>
                  {post.meta_description && <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{post.meta_description}</p>}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.publish_date && new Date(post.publish_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </div>
                    <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all font-medium">Read more <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
