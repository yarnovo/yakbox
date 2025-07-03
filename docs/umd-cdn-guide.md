# UMD 格式与 CDN 使用指南

## 为什么需要 UMD 格式？

### UMD (Universal Module Definition) 的特点

- **通用性**：可以在多种环境下工作（浏览器、Node.js、AMD）
- **即插即用**：通过 `<script>` 标签直接引入，无需构建工具
- **全局变量**：自动挂载到 window 对象上

### CDN 使用场景对比

#### 1. UMD 格式 + CDN（传统方式）

```html
<!-- 直接在 HTML 中使用 -->
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@course-gen/chat-window@1.0.0/dist/chat-window.umd.js"></script>

<script>
  // 直接使用全局变量
  const { ChatWindow } = window.ChatWindow;
  // 无需构建工具
</script>
```

**优点：**

- ✅ 无需构建工具
- ✅ 快速原型开发
- ✅ 适合简单项目
- ✅ 老旧项目集成方便

**缺点：**

- ❌ 没有 Tree Shaking
- ❌ 体积较大
- ❌ 全局变量污染

#### 2. ESM 格式 + CDN（现代方式）

```html
<!-- 使用 ES Modules -->
<script type="module">
  import { ChatWindow } from 'https://cdn.jsdelivr.net/npm/@course-gen/chat-window@1.0.0/dist/chat-window.es.js';
  // 使用现代 JavaScript
</script>
```

**优点：**

- ✅ 支持 Tree Shaking
- ✅ 原生模块系统
- ✅ 更好的性能
- ✅ 现代浏览器都支持

**缺点：**

- ❌ 需要现代浏览器
- ❌ 需要处理模块依赖
- ❌ 不支持 IE

## 实际应用场景

### 场景一：快速集成到现有项目

```html
<!-- 老项目，无构建工具 -->
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/your-chat-window/dist/chat-window.umd.js"></script>
  </head>
  <body>
    <div id="chat"></div>
    <script>
      // UMD 格式让这种使用方式成为可能
      const chat = new ChatWindow.ChatWindow({
        target: document.getElementById('chat'),
      });
    </script>
  </body>
</html>
```

### 场景二：在线演示/CodePen

```html
<!-- 在 CodePen、JSFiddle 等在线编辑器中 -->
<script src="https://cdn.jsdelivr.net/npm/your-chat-window"></script>
<script>
  // 立即可用，无需配置
</script>
```

### 场景三：WordPress 等 CMS 集成

```php
// WordPress 插件中
function add_chat_widget() {
    wp_enqueue_script('chat-window',
        'https://cdn.jsdelivr.net/npm/your-chat-window/dist/chat-window.umd.js'
    );
}
```

## CDN 服务对比

| CDN 服务 | ESM 支持 | UMD 支持 | 特点                                  |
| -------- | -------- | -------- | ------------------------------------- |
| jsDelivr | ✅       | ✅       | 全球 CDN，中国可访问，自动从 npm 同步 |
| cdnjs    | ⚠️       | ✅       | 需要手动提交                          |
| ESM.sh   | ✅       | ❌       | 专门的 ESM CDN                        |
| Skypack  | ✅       | ❌       | 优化的 ESM CDN                        |

## 建议策略

### 1. 双格式输出（推荐）

```js
// vite.config.ts
build: {
  lib: {
    entry: resolve(__dirname, 'src/index.ts'),
    name: 'ChatWindow',
    formats: ['es', 'umd'],  // 同时输出两种格式
    fileName: (format) => `chat-window.${format}.js`
  }
}
```

### 2. package.json 配置

```json
{
  "name": "your-chat-window",
  "version": "1.0.0",
  "main": "./dist/chat-window.umd.js", // CommonJS/UMD
  "module": "./dist/chat-window.es.js", // ES Module
  "exports": {
    ".": {
      "import": "./dist/chat-window.es.js",
      "require": "./dist/chat-window.umd.js"
    }
  },
  "jsdelivr": "./dist/chat-window.umd.js" // jsDelivr CDN
}
```

## 结论

**是否必须打包 UMD 格式？**

- **不是必须的**，现代 CDN 支持 ESM 格式
- **但强烈建议提供**，因为：
  1. 兼容性更好（老项目、在线编辑器）
  2. 使用更简单（无需处理模块）
  3. 集成更方便（各种 CMS、低代码平台）

**最佳实践：**

1. 同时提供 UMD 和 ESM 格式
2. UMD 用于快速集成和兼容性
3. ESM 用于现代项目和更好的性能
4. 在文档中提供两种使用方式的示例
