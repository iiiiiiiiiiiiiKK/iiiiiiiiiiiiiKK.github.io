"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowUpRight, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

type Post = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    author?: string;
    tags?: string[];
  };
  wordCount: number;
};

/** 每页文章数（首页会额外显示一篇置顶，不占页码配额） */
const PAGE_SIZE = 24;

function readTime(wordCount: number) {
  return Math.max(1, Math.ceil(wordCount / 400));
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const [page, setPage] = React.useState(0);
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  // 标签：按出现频率取前 12 个
  const tags = React.useMemo(() => {
    const counter = new Map<string, number>();
    posts.forEach((p) => p.metadata.tags?.forEach((t) => counter.set(t, (counter.get(t) || 0) + 1)));
    return [...counter.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([t]) => t);
  }, [posts]);

  const filtered = React.useMemo(
    () => (activeTag ? posts.filter((p) => p.metadata.tags?.includes(activeTag)) : posts),
    [posts, activeTag]
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageItems = rest.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const goPage = (next: number) => {
    setPage(Math.max(0, Math.min(totalPages - 1, next)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pickTag = (tag: string | null) => {
    setActiveTag(tag);
    setPage(0);
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Decorative background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[hsl(20,100%,70%)]/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(20,100%,70%)]/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-24 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-[hsl(20,100%,70%)]" />
            <span className="text-[hsl(20,100%,70%)] text-sm font-medium tracking-[0.2em] uppercase font-sans">
              开源观察
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl leading-[0.95] tracking-tight">
            挖到好东西，<br />
            <span className="text-[hsl(20,100%,70%)]">就想讲清楚</span>
          </h1>
          <p className="mt-6 text-muted-foreground text-lg max-w-lg leading-relaxed font-sans">
            GitHub 上翻到的开源项目，我跑过、拆过、还留在机器上用的，写清楚它解决什么问题、谁该用、哪里不行。
          </p>
          <p className="mt-2 text-sm text-muted-foreground/70 font-sans">
            共 {posts.length} 篇 · 当前 {filtered.length} 篇
          </p>
        </motion.div>

        {/* Tag filter */}
        {tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            <button
              onClick={() => pickTag(null)}
              className={`text-xs rounded-full px-3 py-1 border transition-colors ${
                activeTag === null
                  ? "border-[hsl(20,100%,70%)] text-[hsl(20,100%,70%)] bg-[hsl(20,100%,70%)]/10"
                  : "border-border/60 text-muted-foreground hover:border-[hsl(20,100%,70%)]/40"
              }`}
            >
              全部
            </button>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => pickTag(t)}
                className={`text-xs rounded-full px-3 py-1 border transition-colors ${
                  activeTag === t
                    ? "border-[hsl(20,100%,70%)] text-[hsl(20,100%,70%)] bg-[hsl(20,100%,70%)]/10"
                    : "border-border/60 text-muted-foreground hover:border-[hsl(20,100%,70%)]/40"
                }`}
              >
                {t}
              </button>
            ))}
          </motion.div>
        )}

        {/* Featured post (only on first page, no active filter) */}
        {featured && safePage === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <Link href={`/blogs/${featured.slug}`} className="group block">
              <div className="relative border border-border/50 rounded-2xl p-8 md:p-12 overflow-hidden transition-colors hover:border-[hsl(20,100%,70%)]/30 bg-card/20 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[hsl(20,100%,70%)]/5 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6 text-xs font-sans">
                    <span className="bg-[hsl(20,100%,70%)] text-black font-semibold px-2.5 py-1 rounded-full">
                      置顶
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {formatDate(featured.metadata.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {readTime(featured.wordCount)} 分钟读完
                    </span>
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-4 group-hover:text-[hsl(20,100%,70%)] transition-colors duration-300">
                    {featured.metadata.title}
                  </h2>

                  <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-8 font-sans">
                    {featured.metadata.summary}
                  </p>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {featured.metadata.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-border/50 text-muted-foreground text-[10px] rounded-full px-2 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="flex items-center gap-1.5 text-sm text-[hsl(20,100%,70%)] font-sans whitespace-nowrap">
                      读全文
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Divider */}
        {pageItems.length > 0 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16 origin-left"
          />
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pageItems.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: Math.min(0.35 + index * 0.04, 0.9),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href={`/blogs/${post.slug}`} className="group block h-full">
                <div className="h-full border border-border/50 rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-[hsl(20,100%,70%)]/30 hover:bg-card/40 bg-card/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground font-sans">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-3 h-3" />
                      {formatDate(post.metadata.publishedAt)}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {readTime(post.wordCount)} 分钟
                    </span>
                  </div>

                  <h3 className="font-display text-lg md:text-xl leading-tight mb-3 group-hover:text-[hsl(20,100%,70%)] transition-colors duration-300">
                    {post.metadata.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 font-sans">
                    {post.metadata.summary}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-1.5 flex-wrap">
                      {post.metadata.tags?.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-border/50 text-muted-foreground text-[10px] rounded-full px-2 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(20,100%,70%)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => goPage(safePage - 1)}
              disabled={safePage === 0}
              className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg border border-border/60 text-muted-foreground transition-colors hover:text-foreground hover:border-border disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
              上一页
            </button>

            {Array.from({ length: totalPages }, (_, i) => i)
              .filter((i) => i === 0 || i === totalPages - 1 || Math.abs(i - safePage) <= 2)
              .map((i, arr, list) => {
                const prev = list[arr - 1];
                const gap = prev !== undefined && i - prev > 1;
                return (
                  <React.Fragment key={i}>
                    {gap && <span className="text-muted-foreground/50 px-1">…</span>}
                    <button
                      onClick={() => goPage(i)}
                      className={`min-w-9 h-9 text-sm rounded-lg border transition-colors ${
                        i === safePage
                          ? "border-[hsl(20,100%,70%)] text-[hsl(20,100%,70%)] bg-[hsl(20,100%,70%)]/10"
                          : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
                      }`}
                    >
                      {i + 1}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              onClick={() => goPage(safePage + 1)}
              disabled={safePage >= totalPages - 1}
              className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg border border-border/60 text-muted-foreground transition-colors hover:text-foreground hover:border-border disabled:opacity-40 disabled:pointer-events-none"
            >
              下一页
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-24"
          >
            <p className="text-muted-foreground text-lg font-sans">还没有文章，过几天再来。</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
