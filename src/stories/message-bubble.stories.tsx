import type { Meta, StoryObj } from '@storybook/react-vite';
import MessageBubble from '../components/message-bubble';

const meta = {
  title: 'Components/MessageBubble',
  component: MessageBubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '600px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnerMessage: Story = {
  name: '发送方消息',
  args: {
    message: '你好，这是一条普通消息。',
    isOwn: true,
    userName: '用户',
    userAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user',
    timestamp: Date.now(),
  },
};

export const ReceiverMessage: Story = {
  name: '接收方消息',
  args: {
    message: '你好，我是接收方。这条消息没有背景色，也没有头像。',
    isOwn: false,
    userName: 'Assistant',
    userAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=assistant',
    timestamp: Date.now(),
  },
};

export const FailedMessage: Story = {
  name: '发送失败消息',
  args: {
    message: '这条消息发送失败了',
    isOwn: true,
    userName: '用户',
    userAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user',
    timestamp: Date.now(),
    failed: true,
    onRetry: () => console.log('重试发送'),
  },
};

export const LongMessage: Story = {
  name: '长文本消息',
  args: {
    message: `这是一条很长的消息，用来测试消息气泡在处理长文本时的表现。当消息内容很长时，气泡应该能够正确地换行显示，并保持良好的可读性。这条消息包含了足够多的文字，可以用来验证组件的文本换行和布局功能是否正常工作。`,
    isOwn: false,
    timestamp: Date.now(),
  },
};

// 自定义内容渲染示例
const CustomRenderExample = () => {
  const renderContent = (message: string) => {
    // 处理多种格式
    let processed = message;

    // 替换粗体
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 替换链接
    processed = processed.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>'
    );

    // 替换行内代码
    processed = processed.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
    );

    return <div dangerouslySetInnerHTML={{ __html: processed }} />;
  };

  return (
    <MessageBubble
      message="欢迎使用 **yakbox** 🎉！请查看我们的文档: https://yakbox.dev 并使用 `npm install yakbox` 安装。"
      isOwn={false}
      userName="Yakbox Bot"
      userAvatar="https://api.dicebear.com/9.x/avataaars/svg?seed=yakbox"
      timestamp={Date.now()}
      renderContent={renderContent}
    />
  );
};

export const CustomRender: Story = {
  name: '自定义内容渲染',
  render: () => <CustomRenderExample />,
  args: {
    message: '欢迎使用 **yakbox**', // 仅为满足类型要求
    isOwn: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
这个示例展示了如何使用 \`renderContent\` 属性自定义消息内容的渲染方式。

## 支持的格式：
- **粗体文本**：使用 \`**文本**\` 包裹
- **URL 链接**：自动识别 http:// 和 https:// 链接
- **行内代码**：使用 \`\`代码\`\` 包裹
- **表情符号**：直接支持 🎉

## 使用示例：
\`\`\`tsx
const renderContent = (message: string) => {
  // 自定义渲染逻辑
  return <div>{/* 渲染的内容 */}</div>;
};

<MessageBubble 
  message="消息内容"
  renderContent={renderContent}
  // 其他属性...
/>
\`\`\`
        `,
      },
    },
  },
};
