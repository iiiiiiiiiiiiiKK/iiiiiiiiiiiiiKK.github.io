# 部署说明（Adam 个人站）

基于 [Naresh-Khatri/3d-portfolio](https://github.com/Naresh-Khatri/3d-portfolio) 改造。

**主站：GitHub Pages** → <https://github.com/iiiiiiiiiiiiiKK/iiiiiiiiiiiiiKK.github.io>，线上地址 <https://321.market>（已绑定并启用 HTTPS，细节见 [`DOMAIN-321.market.md`](./DOMAIN-321.market.md)）。

**备用：Cloudflare Pages** → 项目 `adam-portfolio`，<https://adam-portfolio.pages.dev>（同一份 `out/`，仍可使用）。

---

## 1. 现在这套代码做了什么改动

| 改动 | 原因 |
| --- | --- |
| `next.config.mjs` → `output: "export"` + `trailingSlash` + `images.unoptimized` | 纯静态导出，直接扔给 Pages，不需要 Worker/Node 运行时 |
| 字体改为自托管（`public/fonts/*.woff2` + `next/font/local`） | 构建时不再访问 Google Fonts，内网/断网也能 build |
| 删除 `src/app/api/*`、`src/app/resume/*`、`src/components/analytics.tsx` | 静态导出不支持 API 路由；简历页属于原作者，且把访客主机名上报到别人的服务器，一并移除 |
| 联系表单改为 `mailto:` | 不再依赖 Resend 密钥，也不经手第三方 |
| `public/_headers` | Pages 上用文件方式声明安全头和缓存策略（`next.config` 的 `headers()` 在静态导出下无效） |
| 技能图标、项目卡片底图改为本地文件（`public/assets/skill-icons`、`public/assets/backgrounds`） | 原模板从 jsdelivr / GitHub 拉图，国内网络经常 403/超时；现在整站零外链依赖 |
| 内容全部换成你的（config / constants / projects / 博客 / OG 图） | — |
| `public/assets/projects-screenshots/*` | 换成 6 个真实项目的 GitHub 社交预览图 |

## 2. 日常改内容

| 想改什么 | 改哪里 |
| --- | --- |
| 名字、职位、邮箱、社交链接、站点域名 | `src/data/config.ts` |
| 技能键帽（3D 键盘上的按键） | `src/data/constants.ts` 的 `SKILLS` |
| 经历时间线 | `src/data/constants.ts` 的 `EXPERIENCE` |
| 项目卡片 | `src/data/projects.tsx` |
| 博客 | 往 `src/content/blogs/` 丢 `.mdx`（frontmatter 必须是 `title` / `publishedAt` / `summary`） |
| 导航、页脚 | `src/components/header/config.ts`、`src/components/footer/config.ts` |
| 项目截图 | `public/assets/projects-screenshots/<项目 id>/landing.png` |

改完推上去就行 —— push 到 `main` 会自动构建并发布到 GitHub Pages：

```powershell
cd site-3d
git add -A
git commit -m "update"
git push            # 本机需要代理：git -c http.sslVerify=false push origin main
```

## 3. 部署到 Cloudflare Pages（备用线路）

一次性准备（仓库外，避免污染前端依赖）：

```powershell
cd deploy-tools
pnpm install        # 已装好 wrangler 4
```

每次发布：

```powershell
$env:CLOUDFLARE_API_TOKEN = "你的 API 令牌"
$env:CLOUDFLARE_ACCOUNT_ID = "6559ab8c7e59a32b779cd824dbaf7f20"
node deploy-tools/node_modules/wrangler/bin/wrangler.js pages deploy site-3d/out `
  --project-name=adam-portfolio --branch=main --commit-dirty=true
```

也可以直接跑仓库根目录的 `deploy.ps1`。

## 4. 绑定 321.market

见专门文档：[`DOMAIN-321.market.md`](./DOMAIN-321.market.md)。

一句话总结：主站走 **GitHub Pages**，需要在 DNSPod 加 4 条 A 记录（`185.199.108-111.153`）+ 1 条 `www` CNAME，不需要动 NS、不影响已有的 `worddna` / `cyberhuman` / `web` 子域名。

如果用 **Cloudflare Pages** 绑裸域名，则必须把 `321.market` 整个 zone 迁到 Cloudflare（换 NS），步骤见上文的 zone 流程。

## 5. R2 备份（可选）

构建产物同时同步到了 R2 bucket `kkmd` 的 `backup/adam-portfolio/` 前缀下（293 个文件，S3 API + SigV4 直传验证通过）。
它只是备份/分发用的静态副本，站点本身不依赖 R2；需要公开访问时给 bucket 开自定义域名或 r2.dev 即可。
`deploy.ps1 -Backup` 会在发布后自动同步。

## 6. 已知限制

- 静态导出：没有 API 路由、没有 ISR、没有服务端重定向（可以用 `public/_redirects` 补）。
- 原作者的多人在线（实时光标 / 聊天 / 小游戏）需要单独的 WebSocket 服务，`NEXT_PUBLIC_WS_URL` 不填就自动关闭，页面不受影响。
- `output: "export"` 下 `next.config.mjs` 的 `headers()` / `redirects()` 不生效，统一写在 `public/_headers`、`public/_redirects`。
