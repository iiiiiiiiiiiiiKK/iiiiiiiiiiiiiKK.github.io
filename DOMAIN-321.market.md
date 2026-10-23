# 321.market 绑定记录（已完成）

站点主域：<https://321.market>
仓库：<https://github.com/iiiiiiiiiiiiiKK/iiiiiiiiiiiiiKK.github.io>
备用：<https://adam-portfolio.pages.dev>（Cloudflare Pages，同一份构建产物）

---

## 当前生效状态

| 项目 | 状态 |
| --- | --- |
| DNS 托管 | DNSPod（`archery.dnspod.net` / `ellipse.dnspod.net`），NS 未改动 |
| `321.market` | A → `185.199.108.153`、`185.199.109.153` |
| `www.321.market` | CNAME → `iiiiiiiiiiiiiKK.github.io` |
| HTTPS 证书 | Let's Encrypt，CN=`321.market`，SAN 含 `www.321.market`，有效期至 2027-01-21 |
| 强制 HTTPS | 已开启（`http://` 一律 301 到 `https://`） |
| 自动部署 | push 到 `main` 触发 GitHub Actions |

## 已验证

```
http://321.market/               301 -> https://321.market/
https://321.market/              200   (338ms，缓存 HIT)
http://www.321.market/           301 -> https://321.market/
https://www.321.market/          301 -> https://321.market/
https://321.market/blogs/        200
https://321.market/blogs/rebuilding-my-site-as-a-keyboard/  200
https://321.market/sitemap.xml   200（3 条 URL，canonical 全部指向 321.market）
https://321.market/robots.txt    200
https://321.market/nope-404/     404（中文 404 页）
```

浏览器实测（Chrome headless，1440×900）：首页 / 技术栈 / 项目 / 联系四个区块均正常渲染，控制台无 404 资源。

## 建议补的两条记录（可选，提升容灾）

目前只配了两台 GitHub Pages 的 IP。建议在 DNSPod 再补两条 A 记录，凑齐 GitHub 官方推荐的四台：

| 类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

不加也能正常工作，只是少了两台冗余。

## 未改动的子域名（都指向 GitHub Pages，互不影响）

| 子域名 | 用途 |
| --- | --- |
| `worddna.321.market` | WordDNA 项目站 |
| `cyberhuman.321.market` | CyberHuman 项目站 |
| `web.321.market` | Web3-Tools-Nav 项目站 |

> 它们的 CNAME 分别在各自仓库的 Pages 设置里，与主站共存，无需调整。

## 以后改内容

```bash
cd site-3d
git add -A
git commit -m "update"
git push          # 本机需代理：git -c http.sslVerify=false push origin main
```

推送后约 1 分钟自动构建发布。

## 排障记录

- **证书第一次签发失败**：DNS 记录生效后等了约 20 分钟仍是 `*.github.io` 的默认证书。
  解决办法是把 Pages 的自定义域名清空再重新设置（`PUT /pages` 传 `cname: null` 后再设回 `321.market`），
  重新触发 ACME 签发，约 2 分钟后拿到证书。
- **本机 curl 报 `SEC_E_UNTRUSTED_ROOT`**：这是本机 Windows schannel 根证书链的问题，
  不是站点证书问题。用 Node 的 `fetch`（走内置 CA 包）或 `curl -k` 验证均正常，浏览器访问也正常。
- **push 失败 `remote unpack failed`**：上游模板带着原作者的 git 历史，重整成单条初始提交后推送成功。
