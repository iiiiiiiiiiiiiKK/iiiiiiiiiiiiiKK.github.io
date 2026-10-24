import React from "react";
import { getBlogPosts } from "@/lib/mdx";
import BlogListClient from "./blog-list-client";

export const metadata = {
  title: "开源观察 | Adam",
  description:
    "GitHub 上翻到的开源项目，跑过、拆过、还留在机器上用的，写清楚它解决什么问题、谁该用、哪里不行。",
};

export default function BlogPage() {
  const posts = getBlogPosts()
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map((post) => ({
      slug: post.slug,
      metadata: post.metadata,
      wordCount: post.content.trim().split(/\s+/).length,
    }));

  return <BlogListClient posts={posts} />;
}
