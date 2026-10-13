import { NextRequest, NextResponse } from "next/server";
import { getSortedPostsData } from "@/lib/blog";

export async function GET(request: NextRequest) {
  const requestedSlugs = request.nextUrl.searchParams.get("slugs")?.split(",").filter(Boolean) ?? [];
  const allPosts = getSortedPostsData();
  const posts = requestedSlugs.length > 0
    ? requestedSlugs.map((slug) => allPosts.find((post) => post.slug === slug)).filter(Boolean)
    : allPosts.slice(0, 3);
  return NextResponse.json(posts);
}
