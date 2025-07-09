import type { Meta, StoryObj } from '@storybook/react-vite';
import MessageBubble from '../components/MessageBubble';

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
  args: {
    message: '你好，这是一条普通消息。',
    isOwn: true,
    userName: '用户',
    userAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=user',
    timestamp: Date.now(),
  },
};

export const ReceiverMessage: Story = {
  args: {
    message: '你好，我是接收方。这条消息没有背景色，也没有头像。',
    isOwn: false,
    userName: 'Assistant',
    userAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=assistant',
    timestamp: Date.now(),
  },
};

export const FailedMessage: Story = {
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

export const MarkdownMessage: Story = {
  args: {
    message: `# Markdown 支持

这是一个支持 **Markdown** 的消息气泡。

## 功能列表
- 支持 **粗体** 和 *斜体*
- 支持 [链接](https://example.com)
- 支持代码块

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

还支持行内代码：\`const x = 42;\`

> 这是一个引用块
> 可以有多行`,
    isOwn: false,
    timestamp: Date.now(),
  },
};

export const ReasoningMessage: Story = {
  args: {
    message: `我来帮你分析这个问题。

<reasoning title="分析过程" expanded="true">
首先，我们需要理解问题的核心。
这个问题涉及到多个方面：
1. 技术实现
2. 用户体验
3. 性能优化
</reasoning>

基于以上分析，我建议采用以下方案...`,
    isOwn: false,
    timestamp: Date.now(),
  },
};

export const MultipleReasoningBlocks: Story = {
  args: {
    message: `让我分步骤解决这个问题。

<reasoning title="步骤 1: 问题分析">
首先需要理解问题的本质。
这是一个复杂的技术挑战。
</reasoning>

<reasoning title="步骤 2: 方案设计">
基于分析，我们可以设计如下方案：
- 使用虚拟滚动优化性能
- 实现缓存机制
- 优化渲染流程
</reasoning>

<reasoning title="步骤 3: 实施计划" expanded="true">
具体的实施步骤如下：
1. 第一阶段：基础功能实现
2. 第二阶段：性能优化
3. 第三阶段：测试和部署
</reasoning>

以上就是完整的解决方案。`,
    isOwn: false,
    timestamp: Date.now(),
  },
};
