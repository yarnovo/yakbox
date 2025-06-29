import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useEffect } from 'react';
import MessageList from '../components/MessageList';
import type { MessageListMethods } from '../components/MessageList';

const meta = {
  title: 'Components/MessageList',
  component: MessageList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## 简介

MessageList 是一个高性能的消息列表组件，专为聊天应用设计。它基于 @virtuoso.dev/message-list 构建，提供了虚拟滚动功能，能够流畅地处理大量消息。

## 主要职责

- **虚拟滚动渲染**：使用虚拟滚动技术，即使有数千条消息也能保持流畅的性能
- **消息状态管理**：支持消息的发送、接收和更新状态（包括失败状态）
- **自动滚动控制**：智能处理新消息到达时的滚动行为
- **消息区分显示**：根据发送者身份区分显示不同样式的消息气泡
- **失败重试机制**：支持消息发送失败后的重试功能

## 基本用法

\`\`\`tsx
import { useRef } from 'react';
import MessageList from './components/MessageList';
import type { MessageListMethods } from './components/MessageList';

function App() {
  const messageListRef = useRef<MessageListMethods>(null);

  // 发送消息（返回消息ID）
  const handleSend = (text: string) => {
    const messageId = messageListRef.current?.send(text);
    console.log('发送的消息ID:', messageId);
  };

  // 接收消息（返回消息ID）
  const handleReceive = () => {
    const messageId = messageListRef.current?.receive({
      user: {
        id: 'user-2',
        name: 'Other User',
        avatar: 'https://example.com/avatar.jpg'
      },
      message: 'Hello!'
    });
    console.log('接收的消息ID:', messageId);
  };

  // 更新消息状态（如标记为失败）
  const markMessageFailed = (messageId: string) => {
    messageListRef.current?.update(messageId, { failed: true });
  };

  // 处理重试
  const handleRetry = (messageId: string) => {
    // 先更新状态为成功
    messageListRef.current?.update(messageId, { failed: false });
    // 然后重新发送到服务器
    console.log('重试发送消息:', messageId);
  };

  return (
    <MessageList
      ref={messageListRef}
      currentUserId="user-1"
      onSend={(message) => {
        console.log('Message sent:', message);
        // 发送到服务器
      }}
      onRetry={handleRetry}
    />
  );
}
\`\`\`

## API 说明

### Props

- **currentUserId** (string): 当前用户的ID，用于区分消息是自己发送的还是他人发送的
- **licenseKey** (string, 可选): VirtuosoMessageList 的许可证密钥
- **onSend** (function, 可选): 消息发送时的回调函数，接收发送的消息对象作为参数
- **onRetry** (function, 可选): 重试发送消息的回调函数，接收消息ID作为参数

### Ref Methods

通过 ref 可以访问以下方法：

- **send(message: string): string** - 发送一条消息，返回消息ID
- **receive(message: Omit<ChatMessage, 'id' | 'timestamp'>): string** - 接收一条消息，返回消息ID
- **update(messageId: string, updates: Partial<ChatMessage>): void** - 更新指定消息的状态

### 数据类型

\`\`\`typescript
interface ChatUser {
  id: string;
  name: string;
  avatar: string;
}

interface ChatMessage {
  id: string;
  user: ChatUser;
  message: string;
  timestamp: number;
  failed?: boolean;
}
\`\`\`

## 新特性

### 乐观更新

消息发送时立即显示在界面上，无需等待服务器响应。如果发送失败，可以通过 update 方法标记消息为失败状态。

### 失败重试

当消息发送失败时，用户可以点击重试按钮重新发送。通过 onRetry 回调处理重试逻辑。
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentUserId: {
      control: 'text',
      description: '当前用户ID，用于区分消息发送者',
    },
    licenseKey: {
      control: 'text',
      description: 'VirtuosoMessageList 许可证密钥',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', width: '100%', backgroundColor: '#f3f4f6' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MessageList>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveMessageList = ({ currentUserId = 'user-1' }: { currentUserId?: string }) => {
  const messageListRef = useRef<MessageListMethods>(null);

  useEffect(() => {
    // 初始化一些示例消息
    setTimeout(() => {
      if (messageListRef.current) {
        const id1 = messageListRef.current.receive({
          user: {
            id: 'assistant-1',
            name: 'Assistant',
            avatar: 'https://i.pravatar.cc/30?u=assistant',
          },
          message: '你好！欢迎使用聊天窗口组件。'
        });
        console.log('接收消息ID:', id1);
      }
    }, 500);

    setTimeout(() => {
      if (messageListRef.current) {
        const id2 = messageListRef.current.send('谢谢！这个组件看起来很不错。');
        console.log('发送消息ID:', id2);
      }
    }, 1500);

    setTimeout(() => {
      if (messageListRef.current) {
        const id3 = messageListRef.current.receive({
          user: {
            id: 'assistant-1',
            name: 'Assistant',
            avatar: 'https://i.pravatar.cc/30?u=assistant',
          },
          message: '是的，它支持流畅的滚动和消息状态管理。'
        });
        console.log('接收消息ID:', id3);
      }
    }, 2500);

    // 模拟一条消息发送失败
    setTimeout(() => {
      if (messageListRef.current) {
        const id4 = messageListRef.current.send('这条消息会发送失败');
        
        // 1秒后标记为失败
        setTimeout(() => {
          messageListRef.current?.update(id4, { failed: true });
        }, 1000);
      }
    }, 3500);
  }, []);

  const handleRetry = (messageId: string) => {
    console.log('重试发送消息:', messageId);
    // 模拟重试成功
    setTimeout(() => {
      messageListRef.current?.update(messageId, { failed: false });
    }, 500);
  };

  return (
    <MessageList
      ref={messageListRef}
      currentUserId={currentUserId}
      onSend={(message) => {
        console.log('Message sent:', message);
      }}
      onRetry={handleRetry}
    />
  );
};

export const Default: Story = {
  args: {
    currentUserId: 'user-1',
  },
};

export const Interactive: Story = {
  args: {
    currentUserId: 'user-1',
  },
  render: () => <InteractiveMessageList />,
};

export const WithDifferentUser: Story = {
  args: {
    currentUserId: 'user-2',
  },
  render: () => <InteractiveMessageList currentUserId="user-2" />,
};

export const WithFailedMessages: Story = {
  args: {
    currentUserId: 'user-1',
  },
  render: () => {
    const FailedMessagesDemo = () => {
      const messageListRef = useRef<MessageListMethods>(null);

      useEffect(() => {
        if (messageListRef.current) {
          // 添加一些成功的消息
          messageListRef.current.receive({
            user: {
              id: 'user-2',
              name: 'John',
              avatar: 'https://i.pravatar.cc/30?u=john',
            },
            message: '这是一条正常的消息'
          });

          // 添加一条失败的消息
          const failedId = messageListRef.current.send('这条消息发送失败了');
          setTimeout(() => {
            messageListRef.current?.update(failedId, { failed: true });
          }, 100);

          // 再添加一条正常消息
          messageListRef.current.receive({
            user: {
              id: 'user-2',
              name: 'John',
              avatar: 'https://i.pravatar.cc/30?u=john',
            },
            message: '后续的消息正常显示'
          });
        }
      }, []);

      const handleRetry = (messageId: string) => {
        alert(`重试发送消息: ${messageId}`);
        // 模拟重试成功
        setTimeout(() => {
          messageListRef.current?.update(messageId, { failed: false });
        }, 500);
      };

      return (
        <MessageList
          ref={messageListRef}
          currentUserId="user-1"
          onRetry={handleRetry}
        />
      );
    };

    return <FailedMessagesDemo />;
  },
};