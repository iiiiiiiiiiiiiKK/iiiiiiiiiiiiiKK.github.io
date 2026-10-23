const config = {
  title: "Adam | 扫地僧 · Full-Stack Builder",
  description: {
    long: "Adam（扫地僧）的个人站点：全栈开发、AI Agent 工具、量化数据平台与本地优先的独立产品。这里是我做过的东西，也是我还在折腾的东西。",
    short:
      "Adam（扫地僧）的个人站点 — 全栈开发、AI Agent 工具与独立产品。",
  },
  keywords: [
    "Adam",
    "扫地僧",
    "portfolio",
    "full-stack developer",
    "AI agent",
    "quant trading",
    "TypeScript",
    "React",
    "Next.js",
    "Cloudflare",
    "Python",
    "独立开发者",
  ],
  author: "Adam",
  role: "扫地僧 · Full-Stack Builder",
  email: "changyuansex@gmail.com",
  site: "https://321.market",

  // github stars button (leave both empty to hide it)
  githubUsername: "",
  githubRepo: "",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/0xkillcoin",
    linkedin: "https://x.com/0xkillcoin",
    github: "https://github.com/iiiiiiiiiiiiiKK",
  },
};
export { config };
