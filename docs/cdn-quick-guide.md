# CDN 快速指南

## 发布到 npm 后自动可用的 CDN

### jsDelivr（推荐）

```html
<!-- 自动获取 package.json 中 jsdelivr 字段指定的文件 -->
<script src="https://cdn.jsdelivr.net/npm/@course-gen/chat-window"></script>

<!-- 指定版本 -->
<script src="https://cdn.jsdelivr.net/npm/@course-gen/chat-window@1.0.0"></script>
```

## 完整使用示例

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- 依赖 -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Chat Window 组件 -->
    <script src="https://cdn.jsdelivr.net/npm/@course-gen/chat-window"></script>
  </head>
  <body>
    <div id="app"></div>

    <script>
      const { ChatWindow } = window.ChatWindow;
      const root = ReactDOM.createRoot(document.getElementById('app'));

      root.render(
        React.createElement(ChatWindow, {
          title: '在线客服',
          placeholder: '请输入消息...',
        })
      );
    </script>
  </body>
</html>
```

## TypeScript 项目使用

```bash
npm install @course-gen/chat-window
```

```typescript
import { ChatWindow } from '@course-gen/chat-window';
import type { ChatMessage, ChatWindowProps } from '@course-gen/chat-window';

// TypeScript 类型自动可用
const props: ChatWindowProps = {
  title: '聊天窗口',
  onSendMessage: (message: ChatMessage) => {
    console.log(message);
  },
};
```

## 构建产物说明

| 文件               | 用途                | 大小   | Gzip   |
| ------------------ | ------------------- | ------ | ------ |
| chat-window.umd.js | CDN/浏览器直接使用  | ~6.3KB | ~2.7KB |
| chat-window.es.js  | 现代构建工具使用    | ~8.1KB | ~2.8KB |
| index.d.ts         | TypeScript 类型定义 | ~1.7KB | -      |

## 注意事项

1. CDN 版本需要先引入 React 和 ReactDOM
2. 组件使用 Tailwind CSS 样式，需要引入 Tailwind
3. 首次发布到 npm 后，jsDelivr 会在几分钟内自动同步
4. jsDelivr 提供全球 CDN 加速，包括中国大陆
