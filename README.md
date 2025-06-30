# @course-gen/chat-window

一个现代化、高性能的 React 聊天窗口组件，基于虚拟滚动技术，提供流畅的聊天体验。

## 🌟 特性

- 🚀 **高性能虚拟滚动** - 基于 @virtuoso.dev/message-list，可处理海量消息
- 📱 **响应式设计** - 自适应各种屏幕尺寸
- 🎨 **现代化 UI** - 基于 Tailwind CSS，界面美观大方
- 💬 **消息状态管理** - 支持发送、接收、重试等多种状态
- 🔄 **实时更新** - 消息状态实时同步，体验流畅
- 📦 **多格式导出** - 同时提供 UMD 和 ESM 格式，支持 CDN 和 npm 使用
- 🛡️ **TypeScript 支持** - 完整的类型定义，开发体验极佳
- ⚡ **轻量级** - 打包体积小（UMD ~6.3KB gzipped）

## 📦 安装

### 使用 npm/yarn/pnpm

```bash
# npm
npm install @course-gen/chat-window

# yarn
yarn add @course-gen/chat-window

# pnpm
pnpm add @course-gen/chat-window
```

### 使用 CDN

您可以通过 CDN 直接在 HTML 中使用：

```html
<!-- React 和 ReactDOM（必需） -->
<script crossorigin src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>

<!-- ChatWindow 组件 -->
<script src="https://cdn.jsdelivr.net/npm/@course-gen/chat-window/dist/chat-window.umd.js"></script>

<!-- 样式 -->
<style>
  /* 包含必要的 Tailwind CSS 样式 */
</style>
```

## 🚀 快速开始

### ESM 方式使用

```tsx
import { ChatWindow } from '@course-gen/chat-window';
import type { ChatMessage } from '@course-gen/chat-window';

function App() {
  const handleSendMessage = (message: ChatMessage) => {
    console.log('发送消息:', message);
    // 在这里处理消息发送逻辑
  };

  return (
    <ChatWindow
      title="客服聊天"
      placeholder="请输入消息..."
      currentUserId="user-123"
      onSendMessage={handleSendMessage}
    />
  );
}
```

### UMD 方式使用

```html
<div id="chat-root"></div>

<script>
  const { ChatWindow } = window.ChatWindow;
  const root = ReactDOM.createRoot(document.getElementById('chat-root'));
  
  root.render(
    React.createElement(ChatWindow, {
      title: "客服聊天",
      placeholder: "请输入消息...",
      currentUserId: "user-123",
      onSendMessage: (message) => {
        console.log('发送消息:', message);
      }
    })
  );
</script>
```

## 📖 API 文档

### ChatWindow Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | `string` | `"Chat Window"` | 聊天窗口标题 |
| `placeholder` | `string` | `"Type a message..."` | 输入框占位符文本 |
| `currentUserId` | `string` | `"user-1"` | 当前用户 ID，用于区分消息发送方 |
| `licenseKey` | `string` | `""` | @virtuoso.dev/message-list 许可证密钥（可选） |
| `onSendMessage` | `(message: ChatMessage) => void` | - | 消息发送回调函数 |

### ChatMessage 类型

```typescript
interface ChatMessage {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  message: string;
  timestamp: Date;
  failed?: boolean;
}
```

### MessageList Ref Methods

通过 ref 可以访问以下方法：

```typescript
interface MessageListMethods {
  send: (message: string) => string;      // 发送消息，返回消息 ID
  receive: (data: ReceiveData) => string; // 接收消息，返回消息 ID
  update: (id: string, data: UpdateData) => void; // 更新消息状态
}
```

#### 使用示例

```tsx
import { useRef } from 'react';
import { ChatWindow, MessageListMethods } from '@course-gen/chat-window';

function AdvancedChat() {
  const messageListRef = useRef<MessageListMethods>(null);

  const handleCustomAction = () => {
    // 手动发送消息
    const messageId = messageListRef.current?.send('Hello!');
    
    // 模拟接收消息
    const receivedMessageId = messageListRef.current?.receive({
      user: {
        id: 'bot-1',
        name: 'AI Assistant',
        avatar: 'https://example.com/bot-avatar.png'
      },
      message: '你好！有什么可以帮助您的吗？'
    });
    
    // 更新消息状态
    if (messageId) {
      messageListRef.current?.update(messageId, { failed: false });
    }
    
    // 也可以更新接收到的消息
    if (receivedMessageId) {
      // 例如：标记消息已读、添加反应等
      messageListRef.current?.update(receivedMessageId, { /* 更新内容 */ });
    }
  };

  return (
    <ChatWindow ref={messageListRef} />
  );
}
```

## 🎨 自定义样式

组件使用 Tailwind CSS 构建，您可以通过以下方式自定义样式：

1. **覆盖 CSS 变量**
```css
:root {
  --chat-primary-color: #3b82f6;
  --chat-bg-color: #f9fafb;
  /* 更多自定义变量... */
}
```

2. **使用自定义 className**
```tsx
<div className="custom-chat-wrapper">
  <ChatWindow />
</div>
```

## 🛠️ 开发

### 环境准备

```bash
# 克隆仓库
git clone https://github.com/your-org/chat-window.git
cd chat-window

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 启动 Storybook
npm run storybook
```

### 脚本命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run lint` - 运行代码检查
- `npm run typecheck` - 运行类型检查
- `npm test` - 运行测试
- `npm run storybook` - 启动 Storybook 文档

## 📄 许可证

MIT © Course Gen

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](CONTRIBUTING.md) 了解详情。

## 🐛 问题反馈

如果您发现任何问题或有改进建议，请在 [GitHub Issues](https://github.com/your-org/chat-window/issues) 中提出。