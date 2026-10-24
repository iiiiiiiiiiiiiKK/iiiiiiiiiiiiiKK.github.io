const config = {
  title: "Adam | 扫地僧 · Full-Stack Builder",
  description: {
    long: "Adam（扫地僧）的个人站点：金融与量化、跨境电商增长、全栈开发与 AI Agent 工具。这里是我做过的东西，也是我还在折腾的东西。",
    short:
      "Adam（扫地僧）的个人站点 — 金融与量化、跨境电商、全栈开发与独立产品。",
  },
  keywords: [
    "Adam",
    "扫地僧",
    "portfolio",
    "full-stack developer",
    "quant trading",
    "cross-border e-commerce",
    "AI agent",
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

  /**
   * GitHub 星标按钮。
   * - `stars` 是直接写死的展示数字（不请求 API，构建期与运行期都不发网络请求）。
   * - `link` 是点击后跳转的地址。
   * 想接真实数据：把 stars 设为空，并填上 githubUsername / githubRepo，
   * 组件会在构建时请求一次 GitHub API。
   */
  github: {
    stars: 5280,
    link: "https://github.com/iiiiiiiiiiiiiKK",
    username: "iiiiiiiiiiiiiKK",
    repo: "",
  },

  /** 联系区块的标题与说明，改这里即可，不用动组件。 */
  contact: {
    titleLines: ["找我聊点", "正经事"],
    cardTitle: "联系我",
    descriptionPrefix: "直接发邮件到",
    descriptionSuffix: "，或者在下面留个话。",
    formNote: "点击发送会调用你自己的邮件客户端，内容不经过任何第三方服务。",
  },

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
