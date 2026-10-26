import { ImageResponse } from "next/og";
import { getPostData, getSortedPostsData } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Casetivo Blog";

export function generateStaticParams() {
  return getSortedPostsData().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);
  const title = post?.title ?? "Casetivo Blog";

  return new ImageResponse(
    <div style={{ background: "#0F1E1C", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "70px" }}>
      <div style={{ color: "#4FD1C5", fontSize: "24px", fontWeight: 600, marginBottom: "24px" }}>casetivo.com/blog</div>
      <div style={{ color: "white", fontSize: title.length > 60 ? "52px" : "62px", fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
      <div style={{ position: "absolute", bottom: "50px", left: "70px", color: "#9CA3AF", fontSize: "24px" }}>Guides for text, code &amp; data tools</div>
    </div>,
    { ...size }
  );
}
