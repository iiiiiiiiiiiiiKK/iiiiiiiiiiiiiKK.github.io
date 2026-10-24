import type { MetadataRoute } from "next";
import { config } from "@/data/config";
import { getBlogPosts } from "@/lib/mdx";

// Required for `output: "export"` — the post list is fixed at build time.
export const dynamic = "force-static";

// 站点用 trailingSlash: true，带斜杠才是 200（不带会 301）。sitemap 里必须写最终地址。
const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts()
    .sort((a, b) =>
      a.metadata.publishedAt < b.metadata.publishedAt ? 1 : -1,
    )
    .map((post) => ({
      url: withSlash(`${config.site}/blogs/${post.slug}`),
      lastModified: new Date(post.metadata.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }));

  return [
    {
      url: withSlash(config.site),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: withSlash(`${config.site}/blogs`),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts,
  ];
}
