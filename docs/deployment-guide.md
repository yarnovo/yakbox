# 部署指南

本指南将帮助您配置 GitHub Actions 自动化部署流程，实现代码推送后自动发布到 NPM 和 Cloudflare Pages。

## 前置要求

1. GitHub 仓库已创建
2. NPM 账号（用于发布包）
3. Cloudflare 账号（用于 CDN 部署）

## 配置 GitHub Secrets

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中添加以下 secrets：

### 1. NPM_TOKEN

获取 NPM token 用于自动发布包：

1. 登录 [npmjs.com](https://www.npmjs.com/)
2. 点击右上角头像 → Access Tokens
3. 点击 "Generate New Token" → "Classic Token"
4. 选择 "Automation" 类型
5. 复制生成的 token
6. 在 GitHub 添加 secret：
   - Name: `NPM_TOKEN`
   - Value: 复制的 token

### 2. CLOUDFLARE_API_TOKEN

获取 Cloudflare API token 用于部署 Pages：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 "My Profile" → "API Tokens"
3. 点击 "Create Token"
4. 使用 "Custom token" 创建：
   - Token name: `GitHub Actions Deploy`
   - Permissions:
     - Account → Cloudflare Pages:Edit
     - Zone → Zone:Read
     - Zone → DNS:Read
   - Account resources: Include → Your account
   - Zone resources: Include → All zones
5. 点击 "Continue to summary" → "Create Token"
6. 复制生成的 token
7. 在 GitHub 添加 secret：
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: 复制的 token

### 3. CLOUDFLARE_ACCOUNT_ID

获取 Cloudflare 账号 ID：

1. 在 Cloudflare Dashboard 右侧栏找到 "Account ID"
2. 复制 Account ID
3. 在 GitHub 添加 secret：
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: 复制的 Account ID

## 配置 Cloudflare Pages

### 创建 Pages 项目

1. 在 Cloudflare Dashboard 进入 "Pages"
2. 点击 "Create a project"
3. 选择 "Direct Upload"
4. 项目名称设置为 `chat-window-cdn`（与 workflow 中的名称一致）
5. 上传任意文件完成创建（后续会被 GitHub Actions 覆盖）

### 项目说明

Cloudflare Pages 项目仅用于托管 UMD 格式的 CDN 文件，不包含演示页面或文档。

## 发布流程

### 1. 首次发布

```bash
# 确保 package.json 中的版本号正确
npm version 1.0.0

# 创建并推送标签
git tag v1.0.0
git push origin v1.0.0
```

### 2. 后续版本发布

```bash
# 更新版本号（自动创建 commit 和 tag）
npm version patch  # 1.0.0 → 1.0.1
# 或
npm version minor  # 1.0.0 → 1.1.0
# 或
npm version major  # 1.0.0 → 2.0.0

# 推送代码和标签
git push origin main
git push origin --tags
```

### 3. 查看部署状态

1. 在 GitHub 仓库的 "Actions" 页面查看工作流运行状态
2. 成功后可以访问：
   - NPM: `https://www.npmjs.com/package/@course-gen/chat-window`
   - CDN Latest: `https://chat-window-cdn.pages.dev/latest/chat-window.umd.js`
   - CDN Version: `https://chat-window-cdn.pages.dev/v1.0.0/chat-window.umd.js`

## CDN 使用方式

发布成功后，用户可以通过以下方式使用：

### NPM CDN（自动同步）

```html
<!-- unpkg -->
<script src="https://unpkg.com/@course-gen/chat-window@1.0.0/dist/chat-window.umd.js"></script>

<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@course-gen/chat-window@1.0.0/dist/chat-window.umd.js"></script>
```

### Cloudflare Pages CDN

```html
<!-- 最新版本 -->
<script src="https://chat-window-cdn.pages.dev/latest/chat-window.umd.js"></script>

<!-- 指定版本 -->
<script src="https://chat-window-cdn.pages.dev/v1.0.0/chat-window.umd.js"></script>
```

## 故障排查

### NPM 发布失败

1. 检查 NPM_TOKEN 是否正确配置
2. 确认 token 类型为 "Automation"
3. 检查包名是否已被占用

### Cloudflare 部署失败

1. 检查 API Token 权限是否正确
2. 确认 Account ID 是否正确
3. 验证 Pages 项目名称是否匹配

### 版本标签格式错误

1. 标签必须符合 `v*.*.*` 格式（如 v1.0.0）
2. 使用 `npm version` 命令自动生成正确格式

## 维护建议

1. **定期更新依赖**：使用 `npm audit` 检查安全问题
2. **版本号规范**：遵循语义化版本规范（SemVer）
3. **测试覆盖**：发布前确保所有测试通过
4. **更新日志**：维护 CHANGELOG.md 记录版本变更

## 相关链接

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [NPM 发布文档](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)