"use client";
import { useEffect, useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight, FileText } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

interface RecentBlogPostsProps {
  postSlugs?: string[];
  title?: string;
}

const RecentBlogPosts = memo(({ postSlugs, title = "Latest from the Blog" }: RecentBlogPostsProps) => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = postSlugs?.length ? `?slugs=${encodeURIComponent(postSlugs.join(","))}` : "";
    fetch(`/api/blog/recent${query}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [postSlugs]);

  if (loading || posts.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border/60">
      <h3 className="text-2xl font-bold tracking-tight text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-border bg-card h-full flex flex-col hover:border-primary/50">
              {post.featured_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <Image src={post.featured_image_url} alt={post.title} width={400} height={160} className="w-full h-40 object-cover border-b border-border" />
              ) : (
                <div className="w-full h-40 bg-muted/50 flex items-center justify-center border-b border-border">
                  <FileText className="w-10 h-10 text-muted-foreground/30" />
                </div>
              )}
              <CardContent className="p-5 flex-1 flex flex-col">
                <h4 className="text-lg font-bold mb-2 group-hover-brand transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display)" }}>
                  {post.title}
                </h4>
                {post.meta_description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {post.meta_description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.publish_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </div>
                  <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-border hover:border-primary/50 shadow-sm"
        >
          View All Articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
});

RecentBlogPosts.displayName = "RecentBlogPosts";
export default RecentBlogPosts;
