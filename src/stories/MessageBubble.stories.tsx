import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import MessageBubble from '../components/MessageBubble';

const meta = {
  title: 'Components/MessageBubble',
  component: MessageBubble,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## 简介

MessageBubble 是一个可复用的消息气泡组件，用于在聊天界面中显示单条消息。它支持区分自己和他人的消息，显示用户头像、时间戳，以及处理消息发送失败的状态。

## 主要职责

- **消息展示**：以气泡形式展示消息内容
- **身份区分**：通过不同的样式和位置区分自己和他人的消息
- **失败状态处理**：支持显示消息发送失败状态，并提供重试功能
- **用户信息展示**：可选显示用户头像和时间戳

## 基本用法

\`\`\`tsx
import MessageBubble from './components/MessageBubble';

// 自己发送的消息
<MessageBubble
  message="你好，这是我发送的消息"
  isOwn={true}
  userAvatar="https://example.com/my-avatar.jpg"
  timestamp={Date.now()}
/>

// 他人发送的消息
<MessageBubble
  message="你好，这是别人发送的消息"
  isOwn={false}
  userName="张三"
  userAvatar="https://example.com/other-avatar.jpg"
  timestamp={Date.now()}
/>

// 发送失败的消息
<MessageBubble
  message="这条消息发送失败了"
  isOwn={true}
  failed={true}
  onRetry={() => console.log('重试发送')}
/>
\`\`\`

## API 说明

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| **message** | string | - | 消息内容（必需） |
| **isOwn** | boolean | - | 是否是自己发送的消息（必需） |
| **userName** | string | - | 用户名称 |
| **userAvatar** | string | - | 用户头像 URL |
| **timestamp** | number | - | 消息时间戳 |
| **failed** | boolean | false | 消息是否发送失败 |
| **onRetry** | function | - | 重试发送的回调函数 |

## 特性说明

### 样式区分

- **自己的消息**：蓝色背景，白色文字，位于右侧，右下角无圆角
- **他人的消息**：灰色背景，深色文字，位于左侧，左下角无圆角
- **失败的消息**：红色背景，显示警告图标和"发送失败"文字

### 失败状态处理

当消息发送失败时（failed=true）：
1. 消息气泡变为红色
2. 左侧显示警告图标按钮
3. 下方显示"发送失败"文字
4. 点击警告图标触发 onRetry 回调

### 响应式设计

- 消息最大宽度为容器的 70%
- 长文本自动换行
- 头像固定大小，不会被挤压
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: '消息内容',
    },
    isOwn: {
      control: 'boolean',
      description: '是否是自己发送的消息',
    },
    userName: {
      control: 'text',
      description: '用户名称',
    },
    userAvatar: {
      control: 'text',
      description: '用户头像 URL',
    },
    timestamp: {
      control: 'date',
      description: '消息时间戳',
    },
    failed: {
      control: 'boolean',
      description: '消息是否发送失败',
    },
  },
  args: {
    onRetry: fn(),
  },
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnMessage: Story = {
  name: '自己的消息',
  args: {
    message: '你好，这是我发送的消息',
    isOwn: true,
    userAvatar: 'https://i.pravatar.cc/30?u=user1',
    timestamp: Date.now(),
  },
};

export const OtherMessage: Story = {
  name: '他人的消息',
  args: {
    message: '你好，这是别人发送的消息',
    isOwn: false,
    userName: '张三',
    userAvatar: 'https://i.pravatar.cc/30?u=user2',
    timestamp: Date.now(),
  },
};

export const LongMessage: Story = {
  name: '长消息',
  args: {
    message:
      '这是一条非常长的消息，用于测试消息气泡的换行效果。当消息内容超过一定长度时，应该能够自动换行，并且保持良好的可读性。消息气泡的最大宽度应该被限制在容器的70%以内。',
    isOwn: true,
    userAvatar: 'https://i.pravatar.cc/30?u=user3',
    timestamp: Date.now(),
  },
};

export const FailedMessage: Story = {
  name: '失败的消息',
  args: {
    message: '这条消息发送失败了',
    isOwn: true,
    userAvatar: 'https://i.pravatar.cc/30?u=user4',
    timestamp: Date.now(),
    failed: true,
  },
};

export const NoAvatar: Story = {
  name: '无头像',
  args: {
    message: '这条消息没有头像',
    isOwn: false,
    timestamp: Date.now(),
  },
};

export const NoTimestamp: Story = {
  name: '无时间戳',
  args: {
    message: '这条消息没有时间戳',
    isOwn: true,
    userAvatar: 'https://i.pravatar.cc/30?u=user5',
  },
};

export const MessageGroup: Story = {
  name: '消息组',
  args: {
    message: '示例消息',
    isOwn: true,
  },
  render: () => (
    <div className="space-y-1 p-4 bg-gray-50">
      <MessageBubble
        message="你好！"
        isOwn={false}
        userAvatar="https://i.pravatar.cc/30?u=other"
        timestamp={Date.now() - 120000}
      />
      <MessageBubble
        message="你好，有什么可以帮助你的吗？"
        isOwn={true}
        userAvatar="https://i.pravatar.cc/30?u=me"
        timestamp={Date.now() - 60000}
      />
      <MessageBubble
        message="我想了解一下你们的产品"
        isOwn={false}
        userAvatar="https://i.pravatar.cc/30?u=other"
        timestamp={Date.now() - 30000}
      />
      <MessageBubble
        message="当然，我很乐意为您介绍"
        isOwn={true}
        userAvatar="https://i.pravatar.cc/30?u=me"
        timestamp={Date.now() - 15000}
        failed={true}
        onRetry={() => alert('重新发送消息')}
      />
    </div>
  ),
};
