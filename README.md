# 漫阅 PWA

## iPhone 使用
PWA 不能通过 `file://` 本地文件方式安装，必须通过 HTTPS 打开。

最简单流程：
1. 把本目录全部文件上传到任意 HTTPS 静态托管。
2. iPhone 用 Safari 打开部署后的网址。
3. 点 Safari 的“分享”按钮。
4. 选择“添加到主屏幕”。
5. 以后直接从主屏幕打开“漫阅”。

## 可用的免费静态托管
- GitHub Pages
- Cloudflare Pages
- Netlify / Vercel 的静态站点

## GitHub Pages
把这些文件放到一个 GitHub 仓库根目录，然后在仓库 Settings → Pages 中选择从分支部署即可。
本包已包含 `.nojekyll`，可直接用于 Pages。

## 文件
- `index.html`：漫画 App
- `manifest.webmanifest`：PWA 清单
- `sw.js`：离线 App Shell 缓存
- `icon-192.png` / `icon-512.png`：主屏幕图标

说明：Service Worker 只缓存 PWA 自身文件，不拦截 MangaDex/API/图片域名；漫画网络与章节缓存继续由 App 自己的逻辑处理。
