# 图标库集成指南

## 问题背景

当组件库需要使用图标时，在 UMD 打包格式下需要考虑如何处理图标库的依赖问题。

## 解决方案

### 方案一：内联 SVG（推荐用于组件库）

直接在组件中内联 SVG 代码，不依赖外部图标库。

**优点：**

- 无外部依赖
- 打包后体积可控
- 使用方无需额外安装图标库

**缺点：**

- 需要手动复制 SVG 代码
- 图标更新不方便

**示例：**

```tsx
const Icon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);
```

### 方案二：将图标库作为外部依赖

在 vite.config.ts 中配置为外部依赖，让使用方自行引入。

**优点：**

- 组件库体积小
- 使用方可以选择自己的图标库版本

**缺点：**

- 使用方需要额外安装和配置图标库
- UMD 格式下需要确保全局变量正确

**配置示例：**

```ts
// vite.config.ts
rollupOptions: {
  external: ['react', 'react-dom', '@virtuoso.dev/message-list', 'uuid', 'lucide-react'],
  output: {
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      '@virtuoso.dev/message-list': 'VirtuosoMessageList',
      'uuid': 'uuid',
      'lucide-react': 'LucideReact'
    }
  }
}
```

### 方案三：创建图标组件接口

允许使用方传入自己的图标组件。

**优点：**

- 最灵活
- 不限制使用特定图标库

**缺点：**

- API 设计复杂
- 使用方需要额外配置

**示例：**

```tsx
interface MessageBubbleProps {
  // ... 其他 props
  retryIcon?: React.ComponentType<{ className?: string }>;
}

const MessageBubble = ({ retryIcon: RetryIcon = DefaultRetryIcon, ...props }) => {
  // 使用传入的图标组件
  return <RetryIcon className="w-5 h-5" />;
};
```

## 推荐方案

对于当前的聊天窗口组件库，推荐使用**方案一（内联 SVG）**，原因如下：

1. 组件库只需要少量图标（如重试、发送等）
2. 避免引入额外的依赖
3. 确保组件库的独立性和易用性
4. UMD 打包不会有额外的配置问题

## 图标库对比

| 图标库      | UMD 支持    | 包大小 | 特点              |
| ----------- | ----------- | ------ | ----------------- |
| Lucide      | ✅ 官方支持 | 中等   | 提供官方 UMD 构建 |
| Radix Icons | ❌          | 小     | 需要构建工具      |
| Heroicons   | ❌          | 小     | 需要构建工具      |
| React Icons | ⚠️          | 大     | 包含多个图标集    |

## 实施建议

1. 对于必需的图标，使用内联 SVG
2. 提供 props 允许自定义图标组件
3. 在文档中说明如何替换默认图标
4. 考虑提供一个独立的图标包作为可选依赖
