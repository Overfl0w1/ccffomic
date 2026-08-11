# 漫阅 PWA V2

本版修复 GitHub Pages 上 MangaDex 搜索显示 `Load failed`：

- MangaDex API：直连失败后自动尝试 `corsproxy.io`。
- 第二备用：`AllOrigins raw`。
- 图片仍保留 no-referrer 与图片代理回退。
- Service Worker 缓存版本升级为 `manyue-pwa-v2`，避免旧页面缓存。

更新 GitHub Pages 时，把本 ZIP 解压后的文件覆盖上传到仓库根目录，然后等待 Pages 重新部署。
如果 Safari 仍显示旧版本，可刷新两次；已经“添加到主屏幕”的旧 PWA 可完全关闭后重新打开。
