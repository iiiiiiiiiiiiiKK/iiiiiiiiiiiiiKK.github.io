# Adam · 个人站点

基于 [Naresh-Khatri/3d-portfolio](https://github.com/Naresh-Khatri/3d-portfolio)（MIT）改造的 3D 交互式个人站，
纯静态导出，部署在 **GitHub Pages**，自定义域名 `321.market`。

- 站点：<https://321.market>
- 备用（Cloudflare Pages）：<https://adam-portfolio.pages.dev>

## 技术栈

Next.js 16（`output: "export"` 静态导出）· React 19 · TypeScript · Tailwind CSS · GSAP · Motion ·
Three.js / React Three Fiber（`@chibi3d/runtime` 3D 键盘）

## 本地开发

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # 产出静态文件到 out/
```

Node 20.9+ / pnpm 11。

## 内容在哪

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、职位、邮箱、社交链接、站点域名 | `src/data/config.ts` |
| 3D 键盘上的技能键帽 | `src/data/constants.ts` → `SKILLS` |
| 经历时间线 | `src/data/constants.ts` → `EXPERIENCE` |
| 项目卡片 | `src/data/projects.tsx` |
| 博客 | `src/content/blogs/*.mdx`（frontmatter：`title` / `publishedAt` / `summary`） |
| 导航、页脚 | `src/components/header/config.ts`、`src/components/footer/config.ts` |
| 项目截图 / 卡片底图 | `public/assets/projects-screenshots/<id>/`、`public/assets/backgrounds/<id>.jpg` |

## 部署

推送到 `main` 即自动构建并发布到 GitHub Pages（`.github/workflows/deploy-pages.yml`）。

首次需要在仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。

自定义域名与 DNS 记录见 [`DOMAIN-321.market.md`](./DOMAIN-321.market.md)。

## 与上游模板的差异

- `output: "export"` 静态导出（不需要 Node 运行时）
- 字体自托管（`public/fonts`，构建不依赖 Google Fonts）
- 移除原作者的 `/api/*`、`/resume`、主机名上报脚本；联系表单改为 `mailto:`
- 技能图标、项目卡片底图全部本地化（原模板依赖 jsdelivr CDN，国内经常 403）
- 界面文案中文化，`<html lang="zh-CN">`

## 许可

上游模板为 MIT。若继续分发，请保留原仓库署名与链接。
