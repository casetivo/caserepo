import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/blog";
import { ALL_TOOL_HREFS, OTHER_ROUTES } from "@/lib/tools";

const BASE_URL = "https://www.casetivo.com";

// Google ignores priority and changefreq, and distrusts lastmod values that
// change on every deploy. Static pages therefore omit lastmod; blog posts use
// their real publish/update dates from front matter.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = ["", ...ALL_TOOL_HREFS, ...OTHER_ROUTES].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const blogPages: MetadataRoute.Sitemap = getSortedPostsData().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_date || post.publish_date).toISOString(),
  }));

  return [...staticPages, ...blogPages];
}
