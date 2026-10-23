# 让 321.market 打开你的站点

站点已经可以访问：<https://adam-portfolio.pages.dev>
现在只剩「域名指向谁」这一步。`321.market` 的 DNS 在 **DNSPod**（`archery.dnspod.net` / `ellipse.dnspod.net`），
所以下面所有方案**都只需要在 DNSPod 加记录**，不用换 NS、不用动邮箱。

---

## 先说结论：三条路，选一条

`321.market` 是**裸域名（apex）**。裸域名不能用 CNAME（DNS 规范限制），只能：

| 方案 | 裸域名怎么指 | 需要什么 | 国内访问 |
| --- | --- | --- | --- |
| **A. Cloudflare Pages**（现在这套） | 必须把 `321.market` 整个 zone 迁到 Cloudflare，换 NS | Cloudflare 面板加站点（当前令牌无 `zone:create` 权限） | 较好 |
| **B. Vercel** | DNSPod 加 A 记录 `76.76.21.21` | Vercel Token（你没有给，我拿不到） | 一般，偶尔被墙 |
| **C. GitHub Pages** | DNSPod 加 4 条 A 记录 `185.199.108-111.153` | GitHub Token（你没有给，我拿不到） | 不稳定 |

**如果只是想马上能用**：先绑子域名 —— DNSPod 加一条 `www` CNAME → `adam-portfolio.pages.dev`，
`www.321.market` 立刻就能打开，裸域名继续留空或用 DNSPod 的「显性 URL 转发」跳到 www。

---

## 方案 A：迁到 Cloudflare（推荐，站点已经在这）

1. Cloudflare 控制台 → **Add a site** → `321.market` → Free → 拿到两条 NS
   （我的 API 令牌没有建 zone 权限，所以这一步只能你在面板点；点完把 NS 发我，我接着做完）
2. DNSPod → 域名 `321.market` → **DNS 服务器**（不是记录）→ 改成 Cloudflare 那两条
3. Cloudflare 里补回原有解析，**别丢**：
   | 类型 | 主机记录 | 值 | 用途 |
   | --- | --- | --- | --- |
   | CNAME | `worddna` | `iiiiiiiiiiiiikk.github.io` | 你的 WordDNA 站点，丢了就打不开 |
4. 等 zone 变 Active，`321.market` / `www.321.market` 会自动生效（我已经在 Pages 里加好了，现在是 pending）

---

## 方案 B：Vercel

我已经写好 `site-3d/vercel.json`（静态导出 + 安全头 + 构建命令），只需要一个 Token：

```powershell
# 拿到 Token：https://vercel.com/account/tokens  然后：
$env:VERCEL_TOKEN = "xxxx"
cd site-3d
npx vercel deploy --prod --yes --token $env:VERCEL_TOKEN
npx vercel domains add 321.market --token $env:VERCEL_TOKEN
```

DNSPod 加记录：

| 类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

> 具体 A 值以 Vercel 项目 Domains 页显示为准（新版有时给 `216.198.79.1`，以面板为准）。

---

## 方案 C：GitHub Pages

我已经写好 `site-3d/.github/workflows/deploy-pages.yml`（push 到 main 自动构建并发布，CNAME 设为 `321.market`）。

1. 建仓库（例如 `iiiiiiiiiiiiiKK/portfolio`）并推送 `site-3d`
2. 仓库 Settings → Pages → Source 选 **GitHub Actions**
3. DNSPod 加记录：

| 类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `iiiiiiiiiiiiiKK.github.io` |

---

## 我在等什么

- 方案 A：你在 Cloudflare 点「Add a site」拿到的两条 NS（然后我验证并收尾）
- 方案 B / C：一个对应平台的 Token（我直接部署 + 加域名 + 校验）
- 或者：你只想先要 `www.321.market` 能开 → DNSPod 加 `www` CNAME 到 `adam-portfolio.pages.dev`，5 分钟后就能用
