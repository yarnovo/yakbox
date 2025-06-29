# Cloudflare CDN 部署指南

## 概述
本指南专注于如何将 Chat Window 组件库部署到 Cloudflare CDN。

## 方案一：Cloudflare Pages（推荐）

### 1. 准备构建文件
```bash
# 构建库
npm run build

# 构建产物在 dist/ 目录
dist/
├── chat-window.es.js    # ESM 格式
└── chat-window.umd.js   # UMD 格式
```

### 2. 连接 GitHub 仓库
1. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 点击"Create a project"
3. 连接 GitHub 仓库
4. 配置构建设置：
   - Build command: `npm run build`
   - Build output directory: `dist`

### 3. 自动部署后访问
```html
<!-- 从 Cloudflare Pages 加载 -->
<script src="https://your-project.pages.dev/chat-window.umd.js"></script>
```

## 方案二：Cloudflare R2 + 自定义域名

### 1. 创建 R2 存储桶
```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 创建 R2 bucket
wrangler r2 bucket create chat-window-cdn
```

### 2. 上传文件
```bash
# 上传构建文件
wrangler r2 object put chat-window-cdn/chat-window.umd.js --file=./dist/chat-window.umd.js
wrangler r2 object put chat-window-cdn/chat-window.es.js --file=./dist/chat-window.es.js
```

### 3. 配置公开访问
在 Cloudflare Dashboard：
1. R2 > chat-window-cdn > Settings
2. Public Access > Allow public access
3. Custom Domains > 添加 `cdn.yourdomain.com`

### 4. 使用 CDN
```html
<script src="https://cdn.yourdomain.com/chat-window.umd.js"></script>
```

## 自动化部署脚本

### GitHub Actions 配置
```yaml
# .github/workflows/deploy-cdn.yml
name: Deploy to Cloudflare CDN

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install & Build
        run: |
          npm ci
          npm run build
          
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: chat-window-cdn
          directory: dist
```

## CDN 使用示例

### 基础使用
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Chat Window CDN Example</title>
  
  <!-- React 依赖 -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Chat Window (从 Cloudflare CDN) -->
  <script src="https://your-cdn.pages.dev/chat-window.umd.js"></script>
</head>
<body>
  <div id="app"></div>
  
  <script>
    const { ChatWindow } = window.ChatWindow;
    const root = ReactDOM.createRoot(document.getElementById('app'));
    
    root.render(
      React.createElement(ChatWindow, {
        title: '在线客服',
        placeholder: '请输入消息...'
      })
    );
  </script>
</body>
</html>
```

### 版本管理建议

1. **目录结构**
```
cdn.yourdomain.com/
├── latest/
│   ├── chat-window.umd.js
│   └── chat-window.es.js
├── v1.0.0/
│   ├── chat-window.umd.js
│   └── chat-window.es.js
└── v1.0.1/
    ├── chat-window.umd.js
    └── chat-window.es.js
```

2. **使用方式**
```html
<!-- 最新版本 -->
<script src="https://cdn.yourdomain.com/latest/chat-window.umd.js"></script>

<!-- 指定版本 -->
<script src="https://cdn.yourdomain.com/v1.0.0/chat-window.umd.js"></script>
```

## 性能优化

### 1. 启用压缩
在 Cloudflare Dashboard 中启用自动压缩：
- Speed > Optimization > Auto Minify
- 勾选 JavaScript

### 2. 缓存设置
```javascript
// 页面规则
URL: cdn.yourdomain.com/*
设置:
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
```

### 3. HTTP/3 支持
在 Network 设置中启用 HTTP/3 (QUIC) 以提升性能。

## 监控

使用 Cloudflare Analytics 查看：
- 请求数量
- 带宽使用
- 地理分布
- 性能指标

## 注意事项

1. **CORS 配置**：确保设置 `Access-Control-Allow-Origin: *`
2. **HTTPS**：Cloudflare 默认提供 SSL 证书
3. **备份方案**：建议同时发布到 npm，作为 unpkg/jsDelivr 的备份