# 漫阅 PWA V3 + Cloudflare Worker

这版针对“封面可显示，但章节图片仍加载失败”：

- PWA 新增“设置 → 专用代理 → Worker 地址”。
- MangaDex API、封面、章节图片都优先走你自己的 Cloudflare Worker。
- Worker 服务端代取图片，不受 Safari/PWA 的 CORS 与 Referer 限制。
- Worker 仅允许你的 GitHub Pages 来源 `https://overfl0w1.github.io` 调用。
- Cloudflare Workers Free 当前提供 100,000 次请求/天，响应体没有 Worker 层面的大小上限，个人漫画阅读足够使用。

## 1. 更新 GitHub Pages
把除了 `worker.js` 之外的 PWA 文件覆盖上传到原 GitHub 仓库。

## 2. 手机上创建 Cloudflare Worker
1. Safari 打开 Cloudflare Dashboard，注册/登录免费账号。
2. Workers & Pages → Create application → Create Worker → Deploy。
3. 打开 Worker → Edit Code。
4. 删除示例代码，粘贴本包 `worker.js` 全部内容。
5. Deploy。
6. Cloudflare 会给出类似：
   `https://manyue-proxy.<你的子域>.workers.dev`

## 3. 漫阅里设置
打开漫阅 → 设置 → 专用代理 → 粘贴上述 `https://...workers.dev` → 保存代理。

之后重新搜索并打开章节。

如果你的 GitHub 用户名不是 `overfl0w1`，需要把 `worker.js` 中：
`https://overfl0w1.github.io`
改成你实际的 `https://用户名.github.io`。
