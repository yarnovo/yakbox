# yakbox

一个现代化、高性能的 React 聊天窗口组件，基于虚拟滚动技术和 shadcn/ui 设计系统，提供流畅的聊天体验。

[![Storybook](https://github.com/yarnovo/yakbox/actions/workflows/storybook-deploy.yml/badge.svg)](https://github.com/yarnovo/yakbox/actions/workflows/storybook-deploy.yml)
[![npm version](https://img.shields.io/npm/v/yakbox.svg)](https://www.npmjs.com/package/yakbox)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

📚 **[在线文档 (Storybook)](https://yarnovo.github.io/yakbox/)**

## 🌟 特性

- 🚀 **高性能虚拟滚动** - 基于 @virtuoso.dev/message-list，可处理海量消息
- 📱 **响应式设计** - 自适应各种屏幕尺寸
- 🎨 **现代化 UI** - 基于 shadcn/ui 设计系统，支持主题定制
- 💬 **消息状态管理** - 支持发送、接收、重试等多种状态
- 🔄 **实时更新** - 消息状态实时同步，体验流畅
- 📦 **ESM 格式** - 原生 ES 模块，更好的 Tree Shaking
- 🛡️ **TypeScript 支持** - 完整的类型定义，开发体验极佳
- 🎯 **图标系统** - 使用 lucide-react，丰富的图标选择

## 📦 安装

### 使用 npm/yarn/pnpm

```bash
# npm
npm install yakbox

# yarn
yarn add yakbox

# pnpm
pnpm add yakbox
```

## 🚀 快速开始

### 基本使用

```tsx
import { ChatWindow } from 'yakbox';
import type { ChatMessage } from 'yakbox';

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

## 📖 API 文档

### ChatWindow Props

| 属性            | 类型                             | 默认值                | 描述                                          |
| --------------- | -------------------------------- | --------------------- | --------------------------------------------- |
| `title`         | `string`                         | `"Chat Window"`       | 聊天窗口标题                                  |
| `placeholder`   | `string`                         | `"Type a message..."` | 输入框占位符文本                              |
| `currentUserId` | `string`                         | `"user-1"`            | 当前用户 ID，用于区分消息发送方               |
| `licenseKey`    | `string`                         | `""`                  | @virtuoso.dev/message-list 许可证密钥（可选） |
| `onSendMessage` | `(message: ChatMessage) => void` | -                     | 消息发送回调函数                              |

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
  send: (message: string) => string; // 发送消息，返回消息 ID
  receive: (data: ReceiveData) => string; // 接收消息，返回消息 ID
  update: (id: string, data: UpdateData) => void; // 更新消息状态
}
```

#### 使用示例

```tsx
import { useRef } from 'react';
import { ChatWindow, MessageListMethods } from 'yakbox';

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
        avatar: 'https://example.com/bot-avatar.png',
      },
      message: '你好！有什么可以帮助您的吗？',
    });

    // 更新消息状态
    if (messageId) {
      messageListRef.current?.update(messageId, { failed: false });
    }

    // 也可以更新接收到的消息
    if (receivedMessageId) {
      // 例如：标记消息已读、添加反应等
      messageListRef.current?.update(receivedMessageId, {
        /* 更新内容 */
      });
    }
  };

  return <ChatWindow ref={messageListRef} />;
}
```

## 🎨 主题定制

组件基于 shadcn/ui 设计系统，支持完整的主题定制：

### CSS 变量

组件使用 CSS 变量来控制颜色，你可以通过覆盖这些变量来自定义主题：

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... 更多暗色主题变量 */
}
```

### 样式组件

所有组件都遵循 shadcn/ui 的设计规范，确保视觉一致性。

## 📏 最佳实践

### 组件尺寸设置

#### Q: 如何让 ChatWindow 组件撑满父容器？

ChatWindow 组件默认会自适应父容器的尺寸。要实现撑满父容器的效果，需要确保：

1. **父容器必须有明确的尺寸**

```tsx
// 方式1：使用固定高度
<div style={{ height: '600px', width: '100%' }}>
  <ChatWindow />
</div>

// 方式2：使用 vh/vw 单位
<div style={{ height: '100vh', width: '100vw' }}>
  <ChatWindow />
</div>

// 方式3：使用 flex 布局
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <header>头部内容</header>
  <div style={{ flex: 1, overflow: 'hidden' }}>
    <ChatWindow />
  </div>
</div>
```

2. **父容器为空（高度为 0）的处理**

如果父容器没有内容导致高度为 0，ChatWindow 将无法显示。解决方案：

```tsx
// 确保父容器有最小高度
<div style={{ minHeight: '400px', height: '100%' }}>
  <ChatWindow />
</div>
```

3. **在复杂布局中使用**

```tsx
// Grid 布局示例
<div
  style={{
    display: 'grid',
    gridTemplateRows: '60px 1fr 60px',
    height: '100vh',
  }}
>
  <header>顶部导航</header>
  <main style={{ overflow: 'hidden' }}>
    <ChatWindow />
  </main>
  <footer>底部信息</footer>
</div>
```

#### 注意事项

- ChatWindow 内部使用虚拟滚动，需要父容器有确定的高度才能正常工作
- 避免在没有高度约束的容器中使用，否则可能导致滚动异常
- 建议在父容器上设置 `overflow: hidden` 防止出现双重滚动条

## 📄 许可证

MIT © Course Gen

## 🐛 问题反馈

如果您发现任何问题或有改进建议，请在 [GitHub Issues](https://github.com/your-org/chat-window/issues) 中提出。
