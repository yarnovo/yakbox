# Cloudflare 集成指南

## 概述
本指南介绍如何将 Chat Window 组件库与 Cloudflare 的各种服务集成，实现高性能的全球分发。

## 方案一：Cloudflare Pages + 自动构建

### 1. 项目结构调整
```
chat-window/
├── dist/                 # 构建输出
├── docs/                 # 文档
├── demo/                 # 演示站点
│   ├── index.html       # CDN 使用示例
│   └── playground.html  # 在线试用
└── package.json
```

### 2. 创建演示站点
```html
<!-- demo/index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Chat Window - Cloudflare CDN</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="app"></div>
  
  <!-- 从 Cloudflare Pages 加载 -->
  <script src="https://your-project.pages.dev/dist/chat-window.umd.js"></script>
  <script>
    // 使用组件
  </script>
</body>
</html>
```

### 3. Cloudflare Pages 配置
```yaml
# .cloudflare/pages.json
{
  "build": {
    "command": "npm run build",
    "directory": "dist"
  },
  "headers": {
    "/*": {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=31536000"
    }
  }
}
```

## 方案二：Cloudflare R2 + 自定义域名

### 1. 上传到 R2
```bash
# 使用 Wrangler CLI
npm install -g wrangler

# 配置 R2 bucket
wrangler r2 bucket create chat-window-cdn

# 上传构建文件
wrangler r2 object put chat-window-cdn/dist/chat-window.umd.js --file=./dist/chat-window.umd.js
wrangler r2 object put chat-window-cdn/dist/chat-window.es.js --file=./dist/chat-window.es.js
```

### 2. 配置自定义域名
```
# 在 Cloudflare Dashboard 中
1. R2 > chat-window-cdn > Settings
2. Custom Domains > Connect Domain
3. 输入: cdn.yourdomain.com
```

### 3. 使用方式
```html
<!-- 从你的 CDN 加载 -->
<script src="https://cdn.yourdomain.com/dist/chat-window.umd.js"></script>
```

## 方案三：Cloudflare Workers 动态 CDN

### 1. 创建 Worker
```javascript
// workers/cdn.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 版本路由
    const version = url.pathname.match(/v(\d+\.\d+\.\d+)/)?.[1] || 'latest';
    
    // 从 R2 或 npm 获取文件
    let response;
    if (version === 'latest') {
      // 从 npm 获取最新版本
      response = await fetch(`https://unpkg.com/chat-window@latest${url.pathname}`);
    } else {
      // 从 R2 获取特定版本
      const object = await env.R2.get(`chat-window@${version}${url.pathname}`);
      if (object) {
        response = new Response(object.body, {
          headers: {
            'Content-Type': 'application/javascript',
            'Cache-Control': 'public, max-age=31536000',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }
    
    return response || new Response('Not found', { status: 404 });
  }
};
```

### 2. 部署 Worker
```bash
# wrangler.toml
name = "chat-window-cdn"
main = "workers/cdn.js"
compatibility_date = "2024-01-01"

[[r2_buckets]]
binding = "R2"
bucket_name = "chat-window-cdn"

[routes]
pattern = "cdn.yourdomain.com/*"
zone_name = "yourdomain.com"
```

## 方案四：GitHub Actions + Cloudflare 自动部署

### 1. GitHub Actions 配置
```yaml
# .github/workflows/deploy-cdn.yml
name: Deploy to Cloudflare

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
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
          
      - name: Upload to R2
        run: |
          npm install -g wrangler
          wrangler r2 object put chat-window-cdn/v${{ github.ref_name }}/chat-window.umd.js --file=./dist/chat-window.umd.js
          wrangler r2 object put chat-window-cdn/v${{ github.ref_name }}/chat-window.es.js --file=./dist/chat-window.es.js
          wrangler r2 object put chat-window-cdn/latest/chat-window.umd.js --file=./dist/chat-window.umd.js
          wrangler r2 object put chat-window-cdn/latest/chat-window.es.js --file=./dist/chat-window.es.js
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 使用示例

### 1. 基础使用
```html
<!-- 从 Cloudflare CDN 加载 -->
<script src="https://cdn.yourdomain.com/latest/chat-window.umd.js"></script>

<!-- 或指定版本 -->
<script src="https://cdn.yourdomain.com/v1.0.0/chat-window.umd.js"></script>
```

### 2. ESM 使用
```javascript
// 使用 ES Modules
import { ChatWindow } from 'https://cdn.yourdomain.com/latest/chat-window.es.js';
```

### 3. 带版本锁定
```html
<!-- 生产环境建议锁定版本 -->
<script 
  src="https://cdn.yourdomain.com/v1.2.3/chat-window.umd.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous">
</script>
```

## 性能优化

### 1. Cloudflare 页面规则
```
# 为 CDN 路径设置规则
URL: cdn.yourdomain.com/*
设置:
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
- Browser Cache TTL: 1 year
```

### 2. 智能路由
```javascript
// 在 Worker 中实现智能路由
const REGIONS = {
  'CN': 'https://cdn-cn.yourdomain.com',
  'US': 'https://cdn-us.yourdomain.com',
  'EU': 'https://cdn-eu.yourdomain.com'
};

export default {
  async fetch(request, env) {
    const country = request.cf?.country || 'US';
    const region = country === 'CN' ? 'CN' : 
                   ['GB', 'FR', 'DE'].includes(country) ? 'EU' : 'US';
    
    const cdnUrl = REGIONS[region];
    return fetch(`${cdnUrl}${new URL(request.url).pathname}`);
  }
};
```

## 监控和分析

### 1. Cloudflare Analytics
- 查看 CDN 使用情况
- 监控加载性能
- 分析地理分布

### 2. 自定义追踪
```javascript
// Worker 中添加使用统计
export default {
  async fetch(request, env) {
    // 记录使用情况
    await env.ANALYTICS.put(
      `usage:${Date.now()}`,
      JSON.stringify({
        url: request.url,
        country: request.cf?.country,
        timestamp: Date.now()
      })
    );
    
    // 处理请求...
  }
};
```

## 最佳实践

1. **版本管理**
   - 使用语义化版本号
   - 保留多个版本供用户选择
   - latest 始终指向最新稳定版

2. **缓存策略**
   - 版本化文件设置长期缓存
   - latest 路径设置短期缓存
   - 使用 ETag 进行验证

3. **安全性**
   - 启用 CORS
   - 实施 SRI (子资源完整性)
   - 监控异常请求

4. **备份方案**
   - 主 CDN: Cloudflare
   - 备份: unpkg/jsDelivr
   - 自动故障转移