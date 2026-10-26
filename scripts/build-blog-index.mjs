// Writes src/data/blog-index.json (post metadata only) so client components can
// render blog cards into the server HTML without fetching an API at runtime.
// Runs automatically before `next dev` and `next build` (see package.json).
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/data/blog");
const outFile = path.join(process.cwd(), "src/data/blog-index.json");

const posts = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const { data } = matter(fs.readFileSync(path.join(postsDir, fileName), "utf8"));
    return {
      id: slug,
      slug,
      title: data.title,
      publish_date: data.publish_date,
      meta_description: data.meta_description,
      ...(data.featured_image_url ? { featured_image_url: data.featured_image_url } : {}),
    };
  })
  .sort((a, b) => (a.publish_date < b.publish_date ? 1 : -1));

fs.writeFileSync(outFile, JSON.stringify(posts, null, 2) + "\n");
console.log(`blog-index: wrote ${posts.length} posts`);
