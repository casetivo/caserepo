import { NextResponse } from "next/server";
import { getSortedPostsData } from "@/lib/blog";

export async function GET() {
  const posts = getSortedPostsData().slice(0, 3);
  return NextResponse.json(posts);
}
