# Nexformo 公网私测部署手册

本阶段面向少量受邀测试者。音乐保持为 YouTube Data API 搜索与官方可见 IFrame 播放，不接入其他音乐提供方，也不代理、提取、缓存或转发任何 YouTube 音视频流。

## 1. 当前部署目标

仓库根目录的 `render.yaml` 描述一个 Render Node Web Service：

- 套餐：Free，适合少量受邀测试；空闲后可能休眠，首次唤醒会较慢。
- 构建：`npm ci && npm run build`
- 启动：`npm run start`
- 健康检查：`GET /api/health`
- Node.js：由 `package.json` 限定为 `>=20 <25`，避免未来自动升级到不兼容的大版本。

Blueprint 只保存变量名和非敏感默认值。邀请码、AI/音乐/语音密钥不写入源码；生产会话密钥由 Render 生成随机 256 位值。

## 2. 运行条件

- Node.js 20 或更高版本
- 一个支持长期运行 Node/Express 服务、HTTPS 和环境变量的平台
- 一个可选的自定义域名
- 生产服务器能够访问已配置的 AI、语音、YouTube Data API 与 LRCLIB 服务

Render、Railway、Fly.io 或一台普通云服务器都可以。构建命令为 `npm.cmd run build`（Linux 平台使用 `npm run build`），启动命令为 `npm.cmd run start`（Linux 使用 `npm run start`）。服务监听平台提供的 `PORT`。

## 3. 必需与可选环境变量

从 `.env.example` 复制变量名到部署平台的秘密管理界面，不要上传本机 `.env`，也不要把本机代理地址复制到 Render。

私测入口：

- `PUBLIC_ORIGIN=https://你的服务名.onrender.com`：生产站点的精确来源，不带路径，部署后必须改成实际地址。
- `BETA_ACCESS_CODE`：只在 Render Dashboard 输入并私下发给测试者。留空即关闭入口限制。
- `BETA_SESSION_SECRET`：Blueprint 会生成 256 位随机值；手工配置时至少使用 32 字节随机值，不要复用任何 API 密钥。
- `APP_BUILD_ID`：非敏感构建标记，例如发布日期或提交短标识。

在线服务：

- `AI_PROVIDER`、`DEEPSEEK_API_KEY` 或 `OPENAI_API_KEY`
- `YOUTUBE_API_KEY`
- 需要豆包语音时配置相应的 `DOUBAO_*` 变量
- `ENABLE_WEB_SEARCH=true` 可开启需要实时信息时的联网能力

所有密钥只应存在于部署平台的服务端环境变量中。不要使用 `VITE_` 前缀，不要写入前端代码、截图、聊天记录或版本库。

`render.yaml` 默认声明当前私测需要的 DeepSeek、YouTube 和豆包语音变量。OpenAI Realtime、MemeSong 或其他可选能力只有在确实使用时，才从 `.env.example` 将对应变量名手工加入 Render；不要提交真实值。

## 4. YouTube 上线准备

1. 在 Google Cloud 项目中启用 YouTube Data API v3。
2. 将 API Key 的 API 范围限制为 YouTube Data API v3。
3. 如果部署平台提供固定出口 IP，可再使用服务端 IP 限制；若出口 IP 会变化，不要误设浏览器来源限制，因为 Data API 请求来自 Express 服务器。
4. 从生产服务器确认可访问 `https://www.googleapis.com/youtube/v3/`。
5. 从测试者浏览器确认可加载 `https://www.youtube.com/iframe_api` 和官方播放器域名。

服务器能搜索不代表每个用户都能播放：官方 IFrame 仍要求用户网络可以访问 YouTube。地区限制、年龄限制、视频被删除、禁止嵌入和浏览器自动播放策略都可能导致单曲失败。Nexformo 会等待播放器就绪、在当前候选失败时最多自动尝试一次下一结果，并提供“选择其他版本”“重新连接”或“在 YouTube 打开”。在不更换音乐提供方的前提下，无法通过服务器代理来绕过用户网络或 YouTube 限制。

## 5. 首次公网部署

1. 把本项目提交到一个私有 GitHub 仓库；提交前确认 `.env`、`dist`、`output`、`node_modules` 和任何证书/私钥均未被追踪。
2. 打开 Render Dashboard，选择 **New > Blueprint**，连接该私有仓库并选择仓库根目录的 `render.yaml`。
3. 在首次 Blueprint 创建界面填写所有 `sync: false` 变量。邀请码只填在这里，不写进仓库或文档。
4. 创建服务后，在服务概览复制实际 `https://...onrender.com` 地址，将它原样填入 `PUBLIC_ORIGIN`，然后触发一次重新部署。
5. 确认部署日志中的构建和健康检查成功。日志不得出现 Cookie、邀请码、Authorization、API Key、完整录音或完整对话。
6. 打开 `https://你的实际地址/api/health`，确认返回 `status: "ok"`；它只能暴露功能是否配置的布尔状态，不能返回凭据。
7. 使用无痕窗口完成邀请码、进入世界、聊天、联网、语音、搜歌、播放、歌词与退出测试。

不要在确认实际 HTTPS 地址并完成无痕验证前把链接发给测试者。Render Free 服务空闲后可能休眠；这会造成首次访问等待，但不代表链接失效。

## 6. 本地与生产验证步骤

1. 在干净环境中运行 `npm ci`。
2. 运行 `npm run check`、`npm run test`、`npm run build`。
3. 在平台中保存环境变量并部署。
4. 将健康检查设置为 `GET /api/health`。
5. 访问 `GET /api/health`，确认 `status` 为 `ok`，并仅检查 provider 布尔值；该接口不会返回密钥、模型凭据或邀请码。
6. 使用无痕窗口确认未授权时只显示邀请码页面；输入测试邀请码后确认收到 HttpOnly、SameSite=Lax、生产 HTTPS 下 Secure 的会话 Cookie。
7. 验证退出测试后在线 API 再次被阻止。

## 7. 发布前验收

- 首页、进入世界、粒子形态、鼠标空洞、雨景、侧栏、时间线、档案与记忆正常。
- 文字对话、联网回答、豆包语音/浏览器后备模式按实际配置工作。
- 搜歌默认准备第一项，播放器始终可见，暂停/继续/拖动/收起/关闭正常。
- YouTube 脚本被阻断、播放器超时、地区/嵌入限制和自动播放阻止时都有可恢复提示。
- 歌词缺失或不可靠不会阻止播放。
- 首页和工作室都能打开“测试说明与隐私”。
- 浏览器控制台没有应用自身的未处理异常、WebGL 或着色器错误。
- `dist` 中扫描不到真实密钥格式或 `.env` 内容。

## 8. 测试者操作清单

- 只向受邀测试者发送 HTTPS 地址和邀请码，不发送任何管理后台截图或 API 密钥。
- 建议使用最新版 Edge 或 Chrome 桌面浏览器；首次加载较慢时等待服务唤醒后刷新一次。
- 允许麦克风前先确认地址栏域名正确；不使用语音时可始终保持关闭。
- YouTube Data API 搜索由服务器发起，但官方 IFrame 播放仍依赖测试者网络能够访问 YouTube。
- 遇到问题时只收集发生时间、操作步骤、浏览器版本和不含隐私的截图，不索要 Cookie 或密钥。

## 9. 日志、轮换与回滚

生产日志只保留必要的状态码、上游错误类型和非敏感请求标识。不要记录 Authorization、Cookie、邀请码、API Key、完整录音或完整对话正文。

保留上一份已通过验证的构建。出现严重回归时，在 Render 的 Deploys 页面选择上一份成功部署并执行回滚；密钥疑似泄露时先在对应提供方撤销并轮换，再更新 Render 环境变量和重新部署。

轮换邀请码时同时轮换 `BETA_SESSION_SECRET`，这样旧邀请码产生的会话 Cookie 会立即失效。私测需要临时关闭时，优先在 Render 暂停服务或取消公开域名，不要把邀请码改为空后继续公开运行。

## 10. 部署记录

- GitHub 仓库：等待用户确认目标账号和私有仓库名
- Render 服务：尚未创建
- 公网 HTTPS 地址：尚未生成
- 最近公网验收：尚未执行

只有在实际部署成功并使用干净浏览器完成验收后，才把以上三项更新为真实值。
