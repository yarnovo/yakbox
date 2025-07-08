# yakbox 项目记忆

## 项目基本信息

**项目名称**: yakbox  
**类型**: React 聊天窗口组件库  
**定位**: 现代化、高性能的专业级聊天组件

## 技术栈

### 核心技术

- **框架**: React 19.1.0 + TypeScript 5.8.3
- **构建工具**: Vite 7.0.0 + Rollup
- **样式**: Tailwind CSS 4.1.11 + shadcn/ui 设计系统
- **模块格式**: ESM (ES Module)

### 开发工具链

- **代码质量**: ESLint 9.29.0 + Prettier 3.6.2
- **测试**: Vitest 3.2.4 + Playwright 1.53.1
- **文档**: Storybook 9.0.14
- **Git 工作流**: Husky 9.1.7 + lint-staged 16.1.2

### 主要依赖

- **虚拟滚动**: @virtuoso.dev/message-list 1.12.3
- **UI 组件**: @radix-ui/react-slot 1.2.3
- **图标**: lucide-react 0.525.0
- **样式工具**: class-variance-authority + clsx + tailwind-merge
- **工具库**: uuid 11.1.0

## 项目结构

```
yakbox/
├── src/                          # 源代码目录
│   ├── components/              # 组件目录
│   │   ├── ChatWindow.tsx       # 主聊天窗口组件
│   │   ├── MessageBubble.tsx    # 消息气泡组件
│   │   ├── MessageList.tsx      # 消息列表组件
│   │   └── ui/                  # UI 基础组件
│   ├── stories/                 # Storybook 故事文件
│   ├── lib/                     # 工具函数
│   ├── index.ts                 # 导出入口
│   └── main.tsx                 # 开发时入口
├── docs/                        # 对外文档目录
├── references/                  # 内部参考文档目录
├── dist/                        # 构建输出目录
├── scripts/                     # 脚本文件
│   └── check-report.js          # 检查报告脚本
├── .storybook/                  # Storybook 配置
├── public/                      # 静态资源
└── workers/                     # Web Workers
```

## 核心功能模块

### 1. 聊天组件

- **ChatWindow**: 主聊天窗口组件，提供完整的聊天界面
- **MessageList**: 基于虚拟滚动的消息列表组件，支持海量消息处理
- **MessageBubble**: 消息气泡组件，支持不同状态（发送中、失败、成功）

### 2. 设计系统

- **shadcn/ui 设计系统**: 提供一致的视觉体验
- **Tailwind CSS**: 实用优先的样式框架
- **响应式设计**: 自适应各种屏幕尺寸

## 特色功能

1. **高性能虚拟滚动**: 使用 @virtuoso.dev/message-list 处理海量消息
2. **实时消息状态**: 支持发送、接收、重试等状态管理
3. **主题定制**: 基于 CSS 变量的主题系统
4. **可访问性**: 支持 a11y 标准
5. **组件化设计**: 可独立使用各个组件

## 开发规范

### 检查命令

- `npm run check-report`: 运行完整的检查报告（lint + 类型检查 + 测试）
- `npm run lint`: 代码格式检查
- `npm run typecheck`: TypeScript 类型检查

### 开发流程

1. 使用 Storybook 进行组件开发和文档编写
2. 通过 Husky + lint-staged 确保代码质量
3. 使用 Vitest 进行单元测试
4. 使用 Playwright 进行浏览器测试

## 项目特点

- 专业级聊天组件库
- 现代前端开发最佳实践
- 完整的类型定义和文档
- 高性能虚拟滚动技术
- 企业级应用适用

## 项目变更记录

### 2025-01-08

- **包名变更**: 从 @course-gen/chat-window 改为 yakbox
- **目录重构**:
  - 创建 references 文件夹，用于存放内部参考文档
  - 保留 docs 文件夹作为对外文档目录

<!-- 最后更新时间: 2025-01-08T05:24:02.895Z -->
