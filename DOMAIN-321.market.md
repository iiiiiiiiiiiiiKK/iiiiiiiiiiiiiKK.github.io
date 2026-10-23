# 让 321.market 打开你的站点

站点代码已推到 GitHub，Pages 已构建成功，自定义域名也已在仓库设置里填好 `321.market`。
**现在只差 DNS 记录** —— `321.market` 的 DNS 在 DNSPod（`archery.dnspod.net` / `ellipse.dnspod.net`），
我没有 DNSPod 的登录/API 凭据，所以最后这一步需要你点一下。

---

## 一、现在是什么状态

| 项目 | 状态 |
| --- | --- |
| 仓库 | <https://github.com/iiiiiiiiiiiiiKK/iiiiiiiiiiiiiKK.github.io>（用户主页仓库） |
| Pages | 已开启，Source = GitHub Actions，build 成功 |
| 自定义域名 | 已设为 `321.market`（Pages 设置里已生效） |
| 自动部署 | push 到 `main` 即触发（`.github/workflows/deploy-pages.yml`） |
| `321.market` 解析 | ❌ 还没记录（这一步要你做） |
| 备用地址 | <https://adam-portfolio.pages.dev>（Cloudflare Pages，仍然可用） |

GitHub Pages 的自定义域名是「全站生效」的，所以现在访问 `iiiiiiiiiiiiiKK.github.io` 会 301 跳到 `321.market`。
DNS 配好后两者等价。

---

## 二、你要做的：在 DNSPod 加 4+1 条记录

登录 <https://console.dnspod.cn/> → 域名 `321.market` → **记录管理** → 添加记录：

| 类型 | 主机记录 | 记录值 | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 600 |
| A | `@` | `185.199.109.153` | 600 |
| A | `@` | `185.199.110.153` | 600 |
| A | `@` | `185.199.111.153` | 600 |
| CNAME | `www` | `iiiiiiiiiiiiiKK.github.io` | 600 |

> 裸域名（`@`）必须用 4 条 A 记录，不能用 CNAME —— 这是 DNS 规范限制，不是配置问题。
> `www` 指向 `iiiiiiiiiiiiiKK.github.io` 后，GitHub 会自动 301 到裸域名。

### 已有子域名不要动

这些已经在 DNSPod 里、指向 GitHub Pages 的子域名，加 A 记录不影响它们：

- `worddna.321.market` → WordDNA 项目站
- `cyberhuman.321.market` → CyberHuman 项目站
- `web.321.market` → Web3-Tools-Nav 项目站

它们各自仓库的 Pages 设置里也各自填了 CNAME，互不冲突。

---

## 三、加完之后

1. 等 5–30 分钟（DNSPod TTL 600）
2. GitHub → 仓库 Settings → Pages，等 `321.market` 的 DNS check 变绿
3. 勾上 **Enforce HTTPS**（GitHub 会自动申请 `321.market` 的 Let's Encrypt 证书，通常几分钟）

验证命令：

```bash
# 应该返回 185.199.108.153 等 4 个 IP
nslookup 321.market 223.5.5.5

# 应该返回 200 和你的站点 HTML
curl -I https://321.market
```

如果 30 分钟后还不行，去 DNSPod 确认记录类型选的是 `A` 而不是 `CNAME`（DNSPod 的「显性/隐性 URL」记录不算 A 记录）。

---

## 四、以后怎么改内容

```bash
cd site-3d
# 改完内容后
git add -A
git commit -m "update"
git push
```

推上去会自动构建并发布，不需要本地构建。

> 本机 push 需要代理（`github.com:443` 直连不通）：
> `git -c http.sslVerify=false push origin main`，且仓库已配置 `http.proxy=127.0.0.1:7897`。

---

## 五、如果不想用 GitHub Pages

- **Cloudflare Pages**（已验证可用）：<https://adam-portfolio.pages.dev>，需要把 `321.market` 整个 zone 迁到 Cloudflare 才能绑裸域名。
- **Vercel**：`site-3d/vercel.json` 已写好，需要 Vercel Token 才能部署。

切回 Cloudflare 的话，把 GitHub 仓库 Settings → Pages 里的 Custom domain 清空，再按 `README-DEPLOY.md` 第 4 节操作。
