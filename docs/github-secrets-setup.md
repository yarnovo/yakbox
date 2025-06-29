# GitHub Actions 环境变量配置指南

本文档说明了 GitHub Actions 工作流中使用的所有环境变量和 Secrets 配置。

## 必需的 GitHub Secrets

以下是需要在 GitHub 仓库中配置的 Secrets：

### 1. NPM_TOKEN

- **用途**: 用于自动发布包到 NPM
- **使用位置**: `.github/workflows/release.yml` - 第 107 行
- **获取方法**:
  1. 登录 [npmjs.com](https://www.npmjs.com/)
  2. 进入 Account Settings → Access Tokens
  3. 生成 "Automation" 类型的 token
  4. 复制 token 值

### 2. CLOUDFLARE_API_TOKEN

- **用途**: 用于部署静态文件到 Cloudflare Pages CDN
- **使用位置**: `.github/workflows/release.yml` - 第 235 行
- **获取方法**:
  1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
  2. 进入 My Profile → API Tokens
  3. 创建自定义 token，权限需要：
     - Account → Cloudflare Pages:Edit
     - Zone → Zone:Read
     - Zone → DNS:Read

### 3. CLOUDFLARE_ACCOUNT_ID

- **用途**: 标识 Cloudflare 账户
- **使用位置**: `.github/workflows/release.yml` - 第 236 行
- **获取方法**:
  1. 在 Cloudflare Dashboard 右侧栏查看
  2. 直接复制 "Account ID" 值

## 自动提供的 Secrets

以下 Secrets 由 GitHub 自动提供，无需手动配置：

### GITHUB_TOKEN

- **用途**: 创建 GitHub Release、上传构建产物
- **使用位置**: 
  - `.github/workflows/release.yml` - 第 239 行（Cloudflare 部署）
  - `.github/workflows/release.yml` - 第 300 行（创建 Release）
- **说明**: GitHub Actions 运行时自动注入

## 工作流中使用的环境变量

### 内置变量

这些变量由 GitHub Actions 自动提供：

- `github.ref_name`: Git 标签名（如 v1.0.0）
- `github.repository`: 仓库名（如 owner/repo）
- `github.event.repository.name`: 仓库名称部分（如 repo）
- `github.server_url`: GitHub 服务器 URL

### 计算得出的变量

- `needs.validate-tag.outputs.version`: 从标签中提取的版本号（去除 v 前缀）
  - 例如：v1.0.0 → 1.0.0

## 配置步骤

### 在 GitHub 仓库中添加 Secrets

1. 进入仓库的 Settings 页面
2. 在左侧菜单选择 "Secrets and variables" → "Actions"
3. 点击 "New repository secret"
4. 分别添加上述三个必需的 Secrets：
   - Name: `NPM_TOKEN`
   - Name: `CLOUDFLARE_API_TOKEN`
   - Name: `CLOUDFLARE_ACCOUNT_ID`

### 验证配置

推送一个测试标签验证配置：

```bash
# 创建测试标签
git tag v0.0.1-test
git push origin v0.0.1-test

# 在 GitHub Actions 页面查看运行情况
# 如果失败，检查错误日志中的 Secret 相关信息
```

## 注意事项

1. **Secret 安全性**:
   - 不要在日志中打印 Secret 值
   - 定期轮换 token
   - 限制 token 权限到最小必需

2. **Cloudflare Pages 项目名**:
   - 工作流中使用的项目名是 `chat-window-cdn`
   - 如果使用不同名称，需要修改 `.github/workflows/release.yml` 第 237 行

3. **NPM 包名**:
   - 确保包名 `chat-window` 未被占用
   - 如果需要发布到组织，修改 package.json 中的 name 字段

## 故障排查

### Secret 未找到错误

```
Error: Input required and not supplied: xxx
```
解决：检查对应的 Secret 是否已添加

### NPM 发布权限错误

```
npm ERR! 403 Forbidden
```
解决：确认 NPM_TOKEN 是 "Automation" 类型

### Cloudflare API 权限错误

```
Error: Unauthorized
```
解决：检查 API Token 权限是否包含 Cloudflare Pages:Edit