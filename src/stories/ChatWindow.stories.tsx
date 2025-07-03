import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, userEvent, within, expect } from 'storybook/test';
import { useRef, useState } from 'react';
import { ChatWindow } from '../components/ChatWindow';
import type { MessageListMethods } from '../components/MessageList';

const meta = {
  title: 'Components/ChatWindow',
  component: ChatWindow,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 简介

ChatWindow 是一个完整的聊天窗口组件，集成了消息列表和输入框功能。它提供了一个开箱即用的聊天界面，适用于各种聊天应用场景，如客服系统、AI 对话界面等。

## 主要职责

- **完整的聊天界面**：包含标题栏、消息列表和输入区域的完整聊天窗口
- **消息管理**：内部集成了 MessageList 组件，提供消息的发送、接收和状态管理功能
- **用户交互**：提供友好的输入界面，支持键盘快捷键（Enter 发送消息）
- **样式美观**：使用 Tailwind CSS 提供现代化的界面设计，支持响应式布局

## 基本用法

\`\`\`tsx
import { ChatWindow } from './components/ChatWindow';

function App() {
  const handleSendMessage = (message: ChatMessage) => {
    console.log('用户发送了消息:', message);
    // 在这里处理消息发送逻辑
    // 例如：发送到服务器、保存到数据库等
  };

  return (
    <ChatWindow
      title="客服支持"
      placeholder="请输入您的问题..."
      currentUserId="user-123"
      onSendMessage={handleSendMessage}
    />
  );
}
\`\`\`

## 高级用法

### 与后端集成

\`\`\`tsx
import { ChatWindow } from './components/ChatWindow';
import { useWebSocket } from './hooks/useWebSocket';

function ChatApp() {
  const { sendMessage, onMessage } = useWebSocket('wss://chat-server.com');
  const chatWindowRef = useRef(null);

  // 监听来自服务器的消息
  useEffect(() => {
    onMessage((message) => {
      // 通过 ref 调用 MessageList 的方法
      // 注意：需要扩展 ChatWindow 组件以暴露内部 MessageList 的 ref
    });
  }, []);

  const handleSendMessage = async (message: ChatMessage) => {
    // 发送消息到服务器
    await sendMessage({
      text: message.message,
      userId: message.user.id,
      timestamp: message.timestamp
    });
  };

  return (
    <ChatWindow
      title="在线聊天"
      currentUserId="user-123"
      onSendMessage={handleSendMessage}
    />
  );
}
\`\`\`

## API 说明

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| **title** | string | "Chat Window" | 聊天窗口的标题 |
| **placeholder** | string | "Type a message..." | 输入框的占位符文本 |
| **onSendMessage** | function | - | 消息发送时的回调函数，接收 ChatMessage 对象 |
| **currentUserId** | string | "user-1" | 当前用户的ID |
| **licenseKey** | string | "" | VirtuosoMessageList 的许可证密钥 |

### 回调函数

**onSendMessage(message: ChatMessage): void**

当用户发送消息时触发。message 参数包含：
- \`id\`: 消息ID（初始为 null）
- \`localId\`: 本地临时ID
- \`user\`: 发送者信息
- \`message\`: 消息内容
- \`timestamp\`: 时间戳
- \`delivered\`: 发送状态

## 特性说明

### 模拟消息交互

组件内置了消息交互的模拟功能，便于开发和测试：

1. **自动回复**：发送消息后会在 1 秒后收到模拟回复
2. **发送状态**：消息会显示"发送中"状态，0.5 秒后更新为已发送
3. **消息气泡**：自己发送的消息显示在右侧（蓝色），接收的消息显示在左侧（灰色）

### 键盘快捷键

- **Enter**: 发送消息
- **Shift + Enter**: 换行（当前版本输入框为单行，此功能预留）

## 样式定制

组件使用 Tailwind CSS 类名，可以通过以下方式定制样式：

1. **修改颜色主题**：调整标题栏的渐变色、消息气泡颜色等
2. **调整尺寸**：修改窗口高度、宽度限制等
3. **响应式设计**：组件已支持响应式，可根据需要调整断点行为

## 注意事项

- 组件需要在支持 Tailwind CSS 的项目中使用
- MessageList 基于商业许可的 @virtuoso.dev/message-list，生产环境使用需要购买许可证
- 组件高度固定为 600px，可根据需要调整或改为弹性高度
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '聊天窗口标题',
    },
    placeholder: {
      control: 'text',
      description: '输入框占位符文本',
    },
    currentUserId: {
      control: 'text',
      description: '当前用户ID',
    },
    licenseKey: {
      control: 'text',
      description: 'VirtuosoMessageList 许可证密钥',
    },
  },
  args: {
    onSendMessage: fn(),
  },
} satisfies Meta<typeof ChatWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认样式',
  args: {
    title: '聊天窗口',
    placeholder: '输入消息...',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 等待组件渲染
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 查找输入框和发送按钮
    const input = canvas.getByPlaceholderText('输入消息...');
    const sendButton = canvas.getByRole('button');

    // 测试输入和发送消息
    await userEvent.type(input, '你好，这是一条测试消息');
    await userEvent.click(sendButton);

    // 验证输入框已清空
    expect(input).toHaveValue('');

    // 验证 onSendMessage 被调用
    expect(args.onSendMessage).toHaveBeenCalled();

    // 等待消息出现在列表中
    await new Promise((resolve) => setTimeout(resolve, 500));
    const message = await canvas.findByText('你好，这是一条测试消息');
    expect(message).toBeInTheDocument();
  },
};

export const CustomTitle: Story = {
  name: '自定义标题',
  args: {
    title: '客服支持',
    placeholder: '请描述您的问题...',
  },
};

export const EnglishVersion: Story = {
  name: '英文版本',
  args: {
    title: 'Chat Support',
    placeholder: 'Type your message here...',
    currentUserId: 'user-en',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 等待组件渲染
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 测试使用 Enter 键发送消息
    const input = canvas.getByPlaceholderText('Type your message here...');

    await userEvent.type(input, 'Hello, I need help!');
    await userEvent.keyboard('{Enter}');

    // 验证输入框已清空
    expect(input).toHaveValue('');

    // 验证消息出现
    await new Promise((resolve) => setTimeout(resolve, 500));
    const message = await canvas.findByText('Hello, I need help!');
    expect(message).toBeInTheDocument();

    // 等待模拟回复
    await new Promise((resolve) => setTimeout(resolve, 1600));
    const reply = await canvas.findByText(/收到消息.*Hello, I need help!/);
    expect(reply).toBeInTheDocument();
  },
};

export const WithLongTitle: Story = {
  name: '长标题',
  args: {
    title: '这是一个非常长的标题用于测试标题栏的显示效果',
    placeholder: '输入消息...',
  },
};

const InteractiveChatWindow = () => {
  return (
    <ChatWindow
      title="交互式聊天窗口"
      placeholder="输入消息并查看控制台..."
      onSendMessage={(message) => {
        console.log('发送的消息:', message);
        alert(`消息已发送: ${message.message}`);
      }}
    />
  );
};

export const Interactive: Story = {
  name: '交互式窗口',
  render: () => <InteractiveChatWindow />,
};

const AdvancedChatWindow = () => {
  const messageListRef = useRef<MessageListMethods>(null);
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  const handleReceiveAndUpdate = () => {
    if (!messageListRef.current) return;

    // 接收一条消息并获取其 ID
    const messageId = messageListRef.current.receive({
      user: {
        id: 'assistant-1',
        name: 'AI Assistant',
        avatar: 'https://i.pravatar.cc/30?u=assistant',
      },
      message: '正在处理您的请求...',
    });

    // 保存消息 ID
    setReceivedMessages((prev) => [...prev, messageId]);

    // 2秒后更新消息内容
    setTimeout(() => {
      messageListRef.current?.update(messageId, {
        message: '✅ 请求已处理完成！这是更新后的消息。',
      });
    }, 2000);

    // 4秒后再次更新，展示更复杂的状态
    setTimeout(() => {
      messageListRef.current?.update(messageId, {
        message: '✅ 请求已处理完成！这是更新后的消息。\n\n📊 处理结果：成功\n⏱️ 耗时：3.5秒',
      });
    }, 4000);
  };

  const handleSimulateTyping = () => {
    if (!messageListRef.current) return;

    // 接收"正在输入"消息
    const typingMessageId = messageListRef.current.receive({
      user: {
        id: 'assistant-2',
        name: 'Support Agent',
        avatar: 'https://i.pravatar.cc/30?u=support',
      },
      message: '正在输入...',
    });

    // 模拟逐字输入效果
    const fullMessage = '您好！我是客服代表，很高兴为您服务。请问有什么可以帮助您的吗？';
    let currentText = '';
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < fullMessage.length) {
        currentText += fullMessage[index];
        messageListRef.current?.update(typingMessageId, {
          message: currentText + '▊',
        });
        index++;
      } else {
        // 输入完成，移除光标
        messageListRef.current?.update(typingMessageId, {
          message: currentText,
        });
        clearInterval(typeInterval);
      }
    }, 50);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={handleReceiveAndUpdate}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          接收并更新消息
        </button>
        <button
          onClick={handleSimulateTyping}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          模拟打字效果
        </button>
      </div>
      <ChatWindow
        ref={messageListRef}
        title="高级聊天功能演示"
        placeholder="试试发送消息或点击上方按钮..."
        onSendMessage={(message) => {
          console.log('发送的消息:', message);
        }}
      />
      {receivedMessages.length > 0 && (
        <div className="text-sm text-gray-600">已接收的消息 ID: {receivedMessages.join(', ')}</div>
      )}
    </div>
  );
};

export const AdvancedFeatures: Story = {
  name: '高级功能',
  render: () => <AdvancedChatWindow />,
  parameters: {
    docs: {
      description: {
        story: `
这个示例展示了如何使用 receive 方法的返回值来更新消息：

1. **接收并更新消息**：点击按钮接收一条消息，然后使用返回的 ID 多次更新消息内容
2. **模拟打字效果**：展示如何创建逐字显示的打字动画效果

关键代码：
\`\`\`tsx
// 接收消息并获取 ID
const messageId = messageListRef.current.receive({
  user: { id: 'bot', name: 'Bot' },
  message: '初始消息'
});

// 使用 ID 更新消息
messageListRef.current.update(messageId, {
  message: '更新后的消息'
});
\`\`\`
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 等待组件渲染
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 点击"接收并更新消息"按钮
    const receiveUpdateButton = canvas.getByText('接收并更新消息');
    await userEvent.click(receiveUpdateButton);

    // 验证初始消息出现
    await new Promise((resolve) => setTimeout(resolve, 500));
    const initialMessage = await canvas.findByText('正在处理您的请求...');
    expect(initialMessage).toBeInTheDocument();

    // 等待第一次更新
    await new Promise((resolve) => setTimeout(resolve, 2100));
    const updatedMessage = await canvas.findByText('✅ 请求已处理完成！这是更新后的消息。');
    expect(updatedMessage).toBeInTheDocument();

    // 等待第二次更新
    await new Promise((resolve) => setTimeout(resolve, 2100));
    const finalMessage = await canvas.findByText(/处理结果：成功/);
    expect(finalMessage).toBeInTheDocument();

    // 测试打字效果
    const typingButton = canvas.getByText('模拟打字效果');
    await userEvent.click(typingButton);

    // 验证打字开始 - 检查是否有带光标的文本
    await new Promise((resolve) => setTimeout(resolve, 500));
    // 查找包含光标符号的元素
    const typingMessage = await canvas.findByText((content) => {
      return content.includes('▊');
    });
    expect(typingMessage).toBeInTheDocument();

    // 等待打字完成
    await new Promise((resolve) => setTimeout(resolve, 4000));
    const completedMessage = await canvas.findByText(
      '您好！我是客服代表，很高兴为您服务。请问有什么可以帮助您的吗？'
    );
    expect(completedMessage).toBeInTheDocument();
  },
};
