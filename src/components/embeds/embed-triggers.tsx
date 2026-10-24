"use client";

import * as React from "react";
import { Gamepad2, MessageCircle } from "lucide-react";
import { EmbedModal } from "./embed-modal";
import { cn } from "@/lib/utils";

/**
 * 页头右上角的两个入口：
 *  - 游戏：整站嵌入 chengzuopeng/game-space 的街机厅（60 款 H5 小游戏）
 *  - 聊天：嵌入 Chitchatter 的公共房间（P2P，无账号、无后端）
 *
 * 两者都只是 iframe 容器 —— 原模板里那套 socket.io 前端（聊天 / 僵尸游戏）
 * 需要一个服务端才活得了，静态托管跑不起来，所以入口改成嵌第三方。
 */

const ARCADE_URL = "https://games.linkdiary.cn/";
const CHAT_ROOM = "d484f76c-026c-4f9f-9ce5-c392d6055753";
const CHAT_URL = `https://chitchatter.im/public/${CHAT_ROOM}?embed=1&getSdkConfig=&parentDomain=${encodeURIComponent("https://321.market")}`;

const TRIGGER_BASE =
  "relative flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white/30 bg-background/20 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-background/80";

export function EmbedTriggers({ className }: { className?: string }) {
  const [arcade, setArcade] = React.useState(false);
  const [chat, setChat] = React.useState(false);

  return (
    <>
      <div className={cn("flex items-center gap-2", className)}>
        <button
          onClick={() => setArcade(true)}
          aria-label="打开街机厅"
          title="街机厅 · 60 款小游戏"
          data-no-custom-cursor="true"
          className={TRIGGER_BASE}
        >
          <Gamepad2 className="h-5 w-5" />
        </button>

        <button
          onClick={() => setChat(true)}
          aria-label="打开聊天室"
          title="聊天室"
          data-no-custom-cursor="true"
          className={TRIGGER_BASE}
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>

      <EmbedModal
        open={arcade}
        onClose={() => setArcade(false)}
        title="街机厅"
        subtitle="60 款开源 H5 小游戏 · 由 chengzuopeng/game-space 提供"
        src={ARCADE_URL}
        externalHref={ARCADE_URL}
        allow="fullscreen;autoplay;gamepad"
        accent="amber"
      />

      <EmbedModal
        open={chat}
        onClose={() => setChat(false)}
        title="公共聊天室"
        subtitle="P2P 加密直连 · 无账号、无服务器"
        src={CHAT_URL}
        externalHref={`https://chitchatter.im/#/public/${CHAT_ROOM}`}
        allow="camera;microphone;display-capture;fullscreen;clipboard-write"
        accent="lime"
      />
    </>
  );
}
