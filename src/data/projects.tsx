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
  vanilla: textMark("Vanilla JS", "JS"),
  ws: textMark("WebSocket", "WS"),
  recharts: textMark("Recharts", "Chart"),
  canvas: textMark("Canvas 2D", "Canvas"),
  playwright: textMark("Playwright", "PW"),
  localFirst: textMark("Local-first", "Local"),
  css3: textMark("CSS3", "CSS"),
  ocr: textMark("OCR 识别", "OCR"),
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
    category: "量化数据平台",
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
    id: "fullyhedged",
    category: "交易终端",
    title: "@oAdam TERMINAL",
    src: `${BASE_PATH}/fullyhedged/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.vanilla, PROJECT_SKILLS.canvas, PROJECT_SKILLS.css3],
      backend: [PROJECT_SKILLS.ws, PROJECT_SKILLS.ocr],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/Fully-Hedged",
    live: "https://fully-hedged.vercel.app",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            给自己造的交易舱：双所行情、动态风险敞口、强平预警，一屏看完。
          </TypographyP>
          <TypographyP className="font-mono">
            一个纯前端的加密货币实时监控与策略模拟终端。Binance / OKX
            双所切换，70+ 币种 WebSocket 毫秒级推送，多空仓位独立与合并计算。
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">为什么要自己做</TypographyH3>
          <p className="font-mono mb-2">
            交易所自带的仓位页面不会告诉你「再跌多少就爆」，也不会把净 Delta
            和强平距离放在一起看。这个终端只解决一件事：把「危险还有多远」变成
            一个随时可读的数字。
          </p>

          <TypographyH3 className="my-4 mt-8">几个自己会用的细节</TypographyH3>
          <p className="font-mono mb-2">
            OCR 识别截图里的仓位数据，省掉手抄均价和数量；战术模拟器实时推演
            加仓后的均价与强平价变化；策略矩阵自动标注三级支撑与三级阻力；
            三套主题（暗黑 / 明亮 / 像素）随时切换。
          </p>
        </div>
      );
    },
  },
  {
    id: "lifeledger",
    category: "本地优先工具",
    title: "人生账本 Life Ledger",
    src: `${BASE_PATH}/lifeledger/landing.png`,
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.vite,
        PROJECT_SKILLS.recharts,
      ],
      backend: [PROJECT_SKILLS.localFirst, PROJECT_SKILLS.pwa],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/life-ledger",
    live: "https://321.market/life-ledger/",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            把每天的时间当账记：时间资产、时间负债、时间净值、时间现金流。
          </TypographyP>
          <TypographyP className="font-mono">
            一个记账工具，不是待办清单。待办记「我要做什么」，它记「我实际把时间
            花在哪、值不值、耗不耗神」，然后把这笔投入转成四张报表。
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">口径自己定</TypographyH3>
          <p className="font-mono mb-2">
            休息、娱乐、家庭陪伴默认是中性，系统不会替你判定成负债 —— 只有你亲手
            把某个分类标为「负债」，它才计入负债。另加两条辅助指标：注意力成本
            （Σ 时长 × 精力消耗 ÷ 3）与长期目标投入。
          </p>

          <TypographyH3 className="my-4 mt-8">数据不出浏览器</TypographyH3>
          <p className="font-mono mb-2">
            本地优先，无账号、无后端、无埋点。所有数字只来自你亲手写下的记录，
            存在自己的浏览器里。
          </p>
        </div>
      );
    },
  },
  {
    id: "baokuan",
    category: "内容工具",
    title: "爆款配图",
    src: `${BASE_PATH}/baokuan/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.canvas],
      backend: [PROJECT_SKILLS.staticSite],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/baokuan-poster",
    live: "https://321.market/baokuan-poster/",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            一句话变成配图 —— 中文文字排版工作台，预览即导出。
          </TypographyP>
          <TypographyP className="font-mono">
            写完一段话，不用再开设计软件调字距、找配色、对齐基线。10
            套差异化模板，Canvas 单一渲染源，屏幕上看到什么，导出的 PNG 就是什么。
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">单一渲染源</TypographyH3>
          <p className="font-mono mb-2">
            预览和导出走同一段 Canvas 绘制代码，不存在「预览好看、导出错位」——
            这类工具最常见的翻车点直接被结构性地消掉了。
          </p>

          <TypographyH3 className="my-4 mt-8">为中文排版做的取舍</TypographyH3>
          <p className="font-mono mb-2">
            中文字重、行高、标点挤压和西文完全不是一套规则。模板里把这几项分别
            当成独立参数处理，而不是指望浏览器默认表现。
          </p>
        </div>
      );
    },
  },
  {
    id: "photostudio",
    category: "开发者工具",
    title: "开源项目照相馆",
    src: `${BASE_PATH}/photostudio/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.canvas],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.playwright],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/open-source-photo-studio",
    live: "https://321.market/open-source-photo-studio/",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            输入仓库地址，自动产出中文介绍、亮点摘要和一张能发出去的展示图。
          </TypographyP>
          <TypographyP className="font-mono">
            开源项目最难的一步往往不是写代码，是「怎么跟别人说清楚这是什么」。
            给它一个 GitHub 仓库或官网地址，它会真的打开页面、截真图、读内容，
            再套进模板出图。
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">真截图，不是拼贴</TypographyH3>
          <p className="font-mono mb-2">
            用 Playwright 实际渲染目标站点再截图，六套模板 ×
            三种比例，出来的图里是项目真实的样子，而不是占位框。
          </p>

          <TypographyH3 className="my-4 mt-8">一键导出</TypographyH3>
          <p className="font-mono mb-2">
            生成结果直接导出 PNG，可以贴进 README、社交媒体、或产品 Hunt
            页面，不用再过一遍设计。
          </p>
        </div>
      );
    },
  },
  {
    id: "absurd",
    category: "娱乐实验",
    title: "离谱创业模拟器",
    src: `${BASE_PATH}/absurd/landing.png`,
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts],
      backend: [PROJECT_SKILLS.staticSite],
    },
    github: "https://github.com/iiiiiiiiiiiiiKK/absurd-startup-lab",
    live: "https://321.market/absurd-startup-lab/",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            下一个改变世界的项目，可能很荒唐。
          </TypographyP>
          <TypographyP className="font-mono">
            7200+ 组合的荒诞创业提案生成器：随机撞出一个你从没想过、但仔细想想
            好像真能做的点子。
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">不需要 API Key</TypographyH3>
          <p className="font-mono mb-2">
            全部组合在本地生成，点开就能玩，不登录、不填 Key、不发请求。
            断网也能一直摇。
          </p>

          <TypographyH3 className="my-4 mt-8">能带走</TypographyH3>
          <p className="font-mono mb-2">
            看中的点子可以导出成海报、Markdown 或 JSON —— 拿去发朋友圈，或者
            真的开工。
          </p>
        </div>
      );
    },
  },
];

export default projects;
