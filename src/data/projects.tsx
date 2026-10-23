import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});

const textMark = (title: string, label: string, size = "text-xs"): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <span className={`${size} font-bold`}>{label}</span>,
});

const PROJECT_SKILLS = {
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  next: brand("Next.js", "nextdotjs-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  redis: brand("Redis / BullMQ", "redis-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  trpc: brand("tRPC", "trpc-mono.svg"),
  drizzle: brand("Drizzle ORM", "drizzle-mono.svg"),
  honey: brand("Hono", "hono-mono.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  vercel: brand("Vercel", "vercel-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  gsap: brand("GSAP", "gsap-mono.svg"),
  zustand: textMark("Zustand", "Zu"),
  vite: textMark("Vite", "Vite"),
  pwa: textMark("PWA", "PWA"),
  timescale: textMark("TimescaleDB", "TSDB"),
  telegram: textMark("Telegram Bot", "TG", "text-base"),
  ffmpeg: textMark("FFmpeg", "FFmpeg"),
  tauri: textMark("Tauri", "Tauri"),
  cli: textMark("CLI", "CLI"),
  sdk: textMark("SDK", "SDK"),
  mcp: textMark("MCP", "MCP"),
  dsh: textMark("DeepSeek Harness", "dsh"),
  staticSite: textMark("Static HTML", "HTML"),
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

const projects: Project[] = [
  {
    id: "tradecat",
    category: "Quant data platform",
    title: "交易猫 TradeCat",
    src: `${BASE_PATH}/tradecat/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.python, PROJECT_SKILLS.telegram],
      backend: [
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.timescale,
        PROJECT_SKILLS.redis,
        PROJECT_SKILLS.docker,
      ],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/tradecat",
    live: "https://x.com/tradecat_ai",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            加密货币量化交易数据平台 —— 实时采集、38 个技术指标、Telegram 信号推送。
          </TypographyP>
          <TypographyP className="font-mono">
            全市场行情持续入库：600+ 币种、约 3.7 亿条 K 线沉淀在 TimescaleDB
            里，指标计算与信号判定跑在同一套时序管道上，边写边算。
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">数据规模</TypographyH3>
          <p className="font-mono mb-2">
            615+ 交易对、3.7 亿条 K 线、38 个指标全量计算。冷热分层存储：时序表按
            chunk 切分并配置压缩策略，历史扫描和实时写入互不阻塞。
          </p>

          <TypographyH3 className="my-4 mt-8">信号链路</TypographyH3>
          <p className="font-mono mb-2">
            采集 → 指标 → 策略判定 → Telegram Bot 推送，整条链路异步解耦，策略侧可
            热插拔新的指标组合而不必回填历史。
          </p>
        </div>
      );
    },
  },
  {
    id: "peach",
    category: "Local-first app",
    title: "Peach 蜜桃",
    src: `${BASE_PATH}/peach/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.tauri],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.ffmpeg],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/peach",
    live: "https://peach.video",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            给自己用的私人影片馆藏：本地硬盘、网盘和关注的创作者，放在一个地方看。
          </TypographyP>
          <TypographyP className="font-mono">
            单用户、本地优先的个人媒体系统。视频不搬家、不上传，索引跑在本地，
            元数据自己攥着。
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">为什么要自己做</TypographyH3>
          <p className="font-mono mb-2">
            现成的媒体库要么逼你把文件托管到别人的服务器上，要么把「你看了什么」
            变成它的数据。Peach 的选择是：文件留在原地，库只记索引；断网也能用，
            关掉联网也照样能翻。
          </p>

          <TypographyH3 className="my-4 mt-8">交付形态</TypographyH3>
          <p className="font-mono mb-2">
            Windows / macOS 双端安装包开箱即用，另有在线演示站。桌面端内嵌
            FFmpeg 做转码、抽帧与封面生成，播放器直读本地文件。
          </p>
        </div>
      );
    },
  },
  {
    id: "worddna",
    category: "Language learning",
    title: "WordDNA",
    src: `${BASE_PATH}/worddna/landing.png`,
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.vite,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.zustand,
        PROJECT_SKILLS.pwa,
      ],
      backend: [],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/WordDNA",
    live: "https://worddna.321.market/",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            拆开一个单词，记住一整个词族 —— 词根词缀驱动的英语词汇平台。
          </TypographyP>
          <TypographyP className="font-mono">
            不再一个词一个词地背，而是把同词根的词绑成一串：看到 spect，就能
            顺出 inspect / respect / perspective / speculate。
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">纯前端、可离线</TypographyH3>
          <p className="font-mono mb-2">
            React + TypeScript + Vite 全静态构建，数据随包一起发；PWA 装到桌面后
            断网依旧可以练。状态用 Zustand 管，进度落在本地。
          </p>

          <TypographyH3 className="my-4 mt-8">词族优先的复习模型</TypographyH3>
          <p className="font-mono mb-2">
            以词根为复习单元，而不是以单词为单位 —— 答对一个词根，整个词族的
            记忆一起被强化。
          </p>
        </div>
      );
    },
  },
  {
    id: "weread",
    category: "Agent skill / SDK",
    title: "weread-omni",
    src: `${BASE_PATH}/weread/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.cli, PROJECT_SKILLS.mcp],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.sdk],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/weread-omni",
    live: "",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            微信读书的全能智能体技能和非官方 SDK —— 40 项读写操作，只有一套实现。
          </TypographyP>
          <TypographyP className="font-mono">
            官方 Skill 只开放 6 项只读能力；weread-omni 把书架、搜索、统计、详情、
            划线、推荐做全，再加写入划线与点评、导入 EPUB / PDF / MOBI / TXT /
            AZW3、公众号文章、微信读书 AI。
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">三个入口，一套内核</TypographyH3>
          <p className="font-mono mb-2">
            命令行每条命令都能吐 JSON；类型完整的 TypeScript SDK；以及仓库自带的
            agent skill。三者共用同一层实现，行为不会漂移。
          </p>

          <TypographyH3 className="my-4 mt-8">接入成本</TypographyH3>
          <p className="font-mono mb-2">
            微信扫码即可用，无需申请 API Key。Node.js ≥ 22.13.0。
          </p>
        </div>
      );
    },
  },
  {
    id: "dshpurge",
    category: "Developer tooling",
    title: "dsh-purge",
    src: `${BASE_PATH}/dshpurge/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.cli],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.dsh],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/dsh-purge",
    live: "",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            DeepSeek Harness 的提示词工程插件：每个模型换一套提示词，可插拔。
          </TypographyP>
          <TypographyP className="font-mono">
            零依赖、无构建步骤的 Node.js 插件，装进 dsh 就能按模型切换提示词集合，
            不用改宿主代码。
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">设计取向</TypographyH3>
          <p className="font-mono mb-2">
            提示词与运行时彻底分离：提示词是数据，不是代码。换模型只需要换一份
            profile，回滚就是把文件换回去。
          </p>
        </div>
      );
    },
  },
  {
    id: "zitie",
    category: "Static site",
    title: "KK 字帖",
    src: `${BASE_PATH}/zitie/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.staticSite, PROJECT_SKILLS.js],
      backend: [],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/zitie",
    live: "https://zitie-acd.pages.dev/",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            零构建、可离线的汉字字帖生成器 —— 7919 个规范汉字随取随用。
          </TypographyP>
          <TypographyP className="font-mono">
            基于《通用规范汉字表（2013）》：选字、选格、选体、标拼音、点笔顺，
            一键打印或导出 PDF。
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">零构建</TypographyH3>
          <p className="font-mono mb-2">
            没有打包步骤，一个静态服务器就能跑；所有能力都在浏览器里完成，
            不上传任何字表。
          </p>

          <TypographyH3 className="my-4 mt-8">能做什么</TypographyH3>
          <p className="font-mono mb-2">
            一二三级字表 / 自定义 / 随机抽字，田字格、米字格、空白格，临写、描红、
            空临三种模式，楷行隶宋黑五体，拼音标注与笔画筛选，A4 竖横排版，
            批量导出 ZIP，点格演示笔顺。
          </p>
        </div>
      );
    },
  },
];

export default projects;
