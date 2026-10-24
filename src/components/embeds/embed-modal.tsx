"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 全屏嵌入弹窗：把一个外部站点（街机厅 / 聊天室）用 iframe 装进站点里。
 *
 * 为什么用 iframe 而不是把对方的代码搬进来：
 *  - 对方是完整应用（Construct 2 运行时 / WebTorrent + WebRTC 聊天），
 *    搬代码意味着把它们的构建产物粘到我们仓库里，升级就断。
 *  - iframe 天然隔离第三方存储、权限与脚本，站点 CSP 不受污染。
 * 代价是跨域，无法读取内部状态 —— 所以这里只做「容器 + 兜底」，不做控制。
 */
type EmbedModalProps = {
  open: boolean;
  onClose: () => void;
  /** 弹窗标题 */
  title: string;
  /** 副标题 / 一行说明 */
  subtitle?: string;
  /** iframe 地址 */
  src: string;
  /** 顶部「新窗口打开」的地址（默认同 src） */
  externalHref?: string;
  /** iframe allow 属性 */
  allow?: string;
  /** 顶部状态点颜色 */
  accent?: "lime" | "cyan" | "amber";
};

const ACCENT_CLASS = {
  lime: "bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.7)]",
  cyan: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]",
  amber: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]",
};

export function EmbedModal({
  open,
  onClose,
  title,
  subtitle,
  src,
  externalHref,
  allow = "camera;microphone;display-capture;fullscreen;clipboard-write;autoplay",
  accent = "lime",
}: EmbedModalProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Portal 只能在客户端挂载，否则 SSR 阶段 document 不存在
  React.useEffect(() => setMounted(true), []);

  // 关闭时重置加载态，下次打开重新显示骨架
  React.useEffect(() => {
    if (!open) setLoaded(false);
  }, [open]);

  // ESC 关闭 + 打开时锁背景滚动
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-3 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* 背景遮罩：点击关闭 */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative flex h-[88vh] w-full max-w-[1400px] flex-col overflow-hidden",
              "rounded-xl border border-white/10 bg-[#0a0b12] shadow-2xl"
            )}
          >
            {/* 顶栏 */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={cn("h-2 w-2 shrink-0 rounded-full", ACCENT_CLASS[accent])}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white/90">{title}</p>
                  {subtitle && (
                    <p className="truncate text-[11px] text-white/40">{subtitle}</p>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <a
                  href={externalHref || src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
                >
                  新窗口
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                <button
                  onClick={onClose}
                  aria-label="关闭"
                  className="rounded-md p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 内容区 */}
            <div className="relative flex-1 bg-[#05060b]">
              {!loaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-white/40">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p className="text-xs">正在连接…</p>
                </div>
              )}
              <iframe
                src={src}
                title={title}
                allow={allow}
                onLoad={() => setLoaded(true)}
                className="h-full w-full border-0"
                // 第三方内容不需要 referrer，减少信息泄露
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
