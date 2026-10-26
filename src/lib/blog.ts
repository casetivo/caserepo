import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/data/blog");

export interface BlogPostMeta {
  id: string;
  title: string;
  publish_date: string;
  updated_date?: string;
  meta_description: string;
  featured_image_url?: string;
  slug: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

export function getSortedPostsData(): BlogPostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id/slug
    const id = fileName.replace(/\.md$/, "");
    const slug = id;

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      slug,
      ...(matterResult.data as Omit<BlogPostMeta, "id" | "slug">),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.publish_date < b.publish_date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id: slug,
    slug,
    contentHtml,
    ...(matterResult.data as Omit<BlogPostMeta, "id" | "slug">),
  };
}
