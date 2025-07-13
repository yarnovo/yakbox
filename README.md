# yakbox

一个专注于聊天界面交互逻辑的现代化 React 组件库，基于虚拟滚动技术和 shadcn/ui 设计系统，提供流畅的聊天体验。

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
- ⌨️ **智能输入框** - 自适应高度，支持长文本输入
- 📜 **历史消息** - 支持加载和显示历史对话记录
- 📦 **ESM 格式** - 原生 ES 模块，更好的 Tree Shaking
- 🛡️ **TypeScript 支持** - 完整的类型定义，开发体验极佳
- 🎯 **图标系统** - 使用 lucide-react，丰富的图标选择
- 🌏 **本地化支持** - 界面文案支持中文

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

### 自定义消息内容渲染

```tsx
import { ChatWindow } from 'yakbox';
import type { ChatMessage } from 'yakbox';

function App() {
  // 自定义消息内容渲染函数
  const renderMessageContent = (message: string): React.ReactNode => {
    // 将 URL 转换为可点击的链接
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.split(urlRegex);

    return (
      <div>
        {parts.map((part, index) => {
          if (urlRegex.test(part)) {
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {part}
              </a>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <ChatWindow
      title="智能聊天"
      placeholder="请输入消息..."
      currentUserId="user-123"
      onSendMessage={handleSendMessage}
      renderMessageContent={renderMessageContent}
    />
  );
}
```

### 加载历史消息

```tsx
import { ChatWindow } from 'yakbox';
import type { ChatMessage } from 'yakbox';

function App() {
  // 历史消息数据
  const historyMessages: ChatMessage[] = [
    {
      id: '1',
      user: {
        id: 'user-123',
        name: '张三',
        avatar: 'https://example.com/avatar1.png',
      },
      message: '你好，请问有什么可以帮助您的吗？',
      timestamp: new Date('2025-01-09T10:00:00'),
    },
    {
      id: '2',
      user: {
        id: 'bot-1',
        name: '客服小助手',
        avatar: 'https://example.com/bot-avatar.png',
      },
      message: '您好！很高兴为您服务。',
      timestamp: new Date('2025-01-09T10:01:00'),
    },
  ];

  return (
    <ChatWindow
      title="客服聊天"
      placeholder="请输入消息..."
      currentUserId="user-123"
      initialMessages={historyMessages}
      onSendMessage={handleSendMessage}
    />
  );
}
```

## 📖 API 文档

### ChatWindow Props

| 属性                   | 类型                                   | 默认值                | 描述                                          |
| ---------------------- | -------------------------------------- | --------------------- | --------------------------------------------- |
| `title`                | `string`                               | `"Chat Window"`       | 聊天窗口标题                                  |
| `placeholder`          | `string`                               | `"Type a message..."` | 输入框占位符文本                              |
| `currentUserId`        | `string`                               | `"user-1"`            | 当前用户 ID，用于区分消息发送方               |
| `licenseKey`           | `string`                               | `""`                  | @virtuoso.dev/message-list 许可证密钥（可选） |
| `onSendMessage`        | `(message: ChatMessage) => void`       | -                     | 消息发送回调函数                              |
| `theme`                | `"default" \| "borderless"`            | `"default"`           | 窗口主题样式                                  |
| `initialMessages`      | `ChatMessage[]`                        | -                     | 初始消息列表，用于加载历史对话                |
| `renderMessageContent` | `(message: string) => React.ReactNode` | -                     | 自定义消息内容渲染函数                        |

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

## 🧩 组件导出

yakbox 导出以下组件和类型：

### 组件

- `ChatWindow` - 主聊天窗口组件
- `MessageList` - 消息列表组件
- `MessageBubble` - 消息气泡组件
- `MessageInput` - 消息输入组件

### 类型定义

- `ChatWindowProps` - ChatWindow 组件属性
- `MessageListProps` - MessageList 组件属性
- `MessageListMethods` - MessageList ref 方法
- `MessageBubbleProps` - MessageBubble 组件属性
- `MessageInputProps` - MessageInput 组件属性
- `ChatMessage` - 消息数据类型
- `ChatUser` - 用户数据类型

## 🎨 样式和主题

yakbox 基于 shadcn/ui 设计系统构建，完美继承您项目的主题设置。

### 重要：Tailwind CSS 配置

由于 yakbox 组件使用了 Tailwind CSS 类名，您需要在 `tailwind.config.js` 中添加以下配置，让 Tailwind 能够正确提取组件样式：

```js
module.exports = {
  content: [
    // ... 您的其他内容路径
    './node_modules/yakbox/dist/*.js', // 添加这行
  ],
  // ... 其他配置
};
```

或者使用 Tailwind CSS v4 的新语法：

```css
/* 在您的主 CSS 文件中添加 */
@source "../node_modules/yakbox/dist/*.js";
```

### 主题集成

yakbox 组件会自动使用您项目中 shadcn/ui 的主题变量，包括：

- 颜色系统（primary、secondary、destructive 等）
- 边框样式
- 圆角大小
- 阴影效果

这意味着当您修改项目的 shadcn/ui 主题时，yakbox 组件会自动适配新的样式。

### 窗口主题模式

ChatWindow 组件提供两种布局模式：

```tsx
// 默认模式 - 带边框和阴影
<ChatWindow theme="default" />

// 无边框模式 - 适合嵌入其他容器
<ChatWindow theme="borderless" />
```

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

## 🚀 最新更新

查看 [CHANGELOG.md](./CHANGELOG.md) 了解最新的功能更新和改进。

### v0.2.0-dev.0 亮点

- ✨ 新增 MessageInput 智能输入组件
- 📜 支持加载历史消息
- 🌏 完善本地化支持
- 💄 优化样式和交互体验

## 📄 许可证

MIT © Course Gen

## 🐛 问题反馈

如果您发现任何问题或有改进建议，请在 [GitHub Issues](https://github.com/yarnovo/yakbox/issues) 中提出。
