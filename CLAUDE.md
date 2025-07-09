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
- **版本管理**: bumpster 0.1.2 (语义化版本验证工具)

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
├── .storybook/                  # Storybook 配置
│   └── license.ts               # License Key 配置
├── .github/                     # GitHub 配置
│   └── workflows/               # GitHub Actions 工作流
│       ├── ci-cd.yml            # CI/CD 流程
│       └── storybook-deploy.yml # Storybook 部署
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
- `npm run build`: 构建生产版本
- `npm run storybook`: 启动 Storybook 开发服务器
- `npm run build-storybook`: 构建 Storybook 静态文件

### 开发流程

1. 使用 Storybook 进行组件开发和文档编写
2. 通过 Husky + lint-staged 确保代码质量
3. 使用 Vitest 进行单元测试
4. 使用 Playwright 进行浏览器测试

## CI/CD 配置

### GitHub Actions 工作流

1. **ci-cd.yml**
   - 质量检查：所有推送和 PR 触发
   - NPM 发布：版本标签触发（v\*）
   - 使用 bumpster 验证版本格式

2. **storybook-deploy.yml**
   - 版本标签触发自动部署
   - 支持手动触发部署
   - 部署到 GitHub Pages

### 必需的 GitHub Secrets

- **NPM_TOKEN**: NPM 发布权限
- **VITE_VIRTUOSO_LICENSE_KEY**: Storybook 部署用 License Key

## License Key 配置

### 概述

项目使用 @virtuoso.dev/message-list 作为虚拟滚动引擎，生产环境需要 License Key。

### 配置策略

1. **本地开发**: 不需要 License Key
2. **Storybook 部署**: 使用 GitHub Secret `VITE_VIRTUOSO_LICENSE_KEY`
3. **生产环境**: 通过组件 props 传入 `licenseKey`

### 相关文件

- `.storybook/license.ts` - Storybook 专用 License Key 配置
- `.env.example` - 环境变量示例
- `docs/license-key-setup.md` - 详细配置指南

## 项目发布信息

- **NPM 包名**: yakbox
- **Git 仓库**: https://github.com/yarnovo/yakbox
- **当前版本**: 0.1.0-dev.0
- **Storybook 文档**: https://yarnovo.github.io/yakbox/

### 发布流程

1. **NPM 发布**
   - 创建版本标签触发自动发布
   - 支持正式版和预发布版（alpha、beta、rc）
   - 使用 bumpster 验证版本号

2. **Storybook 部署**
   - 版本标签触发自动部署
   - 支持手动触发更新
   - 需要配置 License Key Secret
   - **注意**: GitHub Pages 环境默认有保护规则，需要在仓库设置中允许标签部署

### GitHub Pages 环境保护问题

**问题**: 标签触发部署时出现 "Tag is not allowed to deploy to github-pages" 错误

**原因**: GitHub Pages 环境默认配置了保护规则，不允许通过标签触发部署

**解决方案**:

1. 进入仓库 Settings → Environments → github-pages
2. 在 "Deployment branches and tags" 中添加标签规则 `v*`
3. 或修改 workflow 让标签触发时不使用受保护的环境

## 项目特点

- 专业级聊天组件库
- 现代前端开发最佳实践
- 完整的类型定义和文档
- 高性能虚拟滚动技术
- 企业级应用适用
- 自动化 CI/CD 流程
- 完善的文档和示例

## 重要实现细节

### ChatWindow 主题系统

**发现时间**: 2025-07-09

**功能**: 为 ChatWindow 组件增加主题系统，支持默认主题和无边框主题

**实现方案**:

1. **类型定义**:
   - 新增 `ChatWindowTheme` 类型：`'default' | 'borderless'`
   - 在 `ChatWindowProps` 中添加 `theme?: ChatWindowTheme` 参数
   - 默认值为 `'default'`

2. **主题样式**:
   - **默认主题**: `rounded-lg border shadow-sm` - 有边框、圆角、阴影
   - **无边框主题**: 移除外边框、圆角、阴影，保留内部分割线
   - 头部和输入区域的分割线在两种主题中都保留

3. **使用场景**:
   - **默认主题**: 适合独立使用，具有明确的视觉边界
   - **无边框主题**: 适合嵌入到其他布局中，与周围环境融合

4. **Storybook 支持**:
   - 添加主题选择控件
   - 新增"无边框主题"和"主题对比"故事
   - 完整的文档说明和使用示例

**技术细节**:

- 组件位置：`src/components/ChatWindow.tsx:65-78`
- 主题样式通过 `themeStyles` 对象管理
- 支持所有原有功能，仅改变视觉样式
- 向后兼容，不影响现有使用

### 组件尺寸使用方式差异

**发现时间**: 2025-07-09

**问题**: 用户反映 MessageList 组件在 Storybook 中显示宽度很窄，需要澄清组件尺寸使用方式

**解决方案**:

1. **组件尺寸分析**:
   - **ChatWindow**: 使用 `h-full w-full` - 高度和宽度都是 100%，需要父容器提供确定尺寸
   - **MessageList**: 使用 `h-full` - 仅高度是 100%，宽度自适应内容

2. **文档更新**:
   - 在 MessageList.stories.tsx 中添加"组件尺寸使用方式"说明
   - 明确父容器要求和布局建议
   - 对比 ChatWindow 和 MessageList 的差异

3. **Storybook 样式调整**:
   - 布局从 `fullscreen` 改为 `centered`
   - 容器尺寸从 `100vh × 100%` 改为 `600px × 400px`
   - 添加 `padding: 20px` 留出空间

**技术细节**:

- ChatWindow 位置：`src/components/ChatWindow.tsx:61` - `h-full w-full`
- MessageList 位置：`src/components/MessageList.tsx:137` - `h-full`
- 原因：MessageList 没有设置宽度类，导致宽度自适应内容

### ChatWindow 组件纯净化

**问题**: 组件导出后包含 demo 逻辑，会自动模拟消息发送和接收
**解决时间**: 2025-01-08

已移除的 demo 代码：

1. **模拟发送失败**: 移除了随机 20% 失败率的模拟逻辑
2. **自动回复**: 移除了发送消息后自动生成回复的逻辑
3. **硬编码日志**: 移除了 console.log 调试信息

现在 ChatWindow 是纯净的生产组件：

- 通过 `onSendMessage` 回调处理消息发送
- 不含任何模拟或 demo 逻辑
- 完全由使用者控制消息流程

### 空状态滚动条优化

**问题**: 没有消息时显示"暂无消息"但出现不必要的滚动条
**解决时间**: 2025-01-08

修复内容：

- 移除 EmptyPlaceholder 中的 `h-full` 类
- 改用 `py-16` 进行垂直填充
- 避免空状态下组件占满全高度导致滚动条

技术细节：

- 位置：`src/components/MessageList.tsx:48`
- 原样式：`h-full` 导致占满容器高度
- 新样式：`py-16` 提供合适的垂直间距

### MessageList 组件 initialMessages 参数

**添加时间**: 2025-07-08

新增功能：

1. **initialMessages 参数**: 为 MessageList 组件添加了 `initialMessages?: ChatMessage[]` 参数
2. **参数透传**: 参数正确透传到内部 VirtuosoMessageList 组件的 `initialData` 属性
3. **默认值处理**: 设置默认值为空数组，确保兼容性

技术细节：

- 位置：`src/components/MessageList.tsx:64`
- 接口定义：`initialMessages?: ChatMessage[]`
- 透传实现：`initialData={initialMessages}`
- 默认值：`initialMessages = []`

用途：

- 加载历史消息
- 显示预设对话内容
- 支持从服务器获取消息列表后初始化组件

Storybook 文档更新：

- 新增 "带有初始消息" 故事演示
- 更新 API 文档说明
- 添加使用示例代码

### MessageBubble 组件长文本换行问题修复

**问题**: MessageBubble 组件在显示长文本时不会自动换行，导致气泡宽度被撑爆
**解决时间**: 2025-07-09

**修复内容**:

1. **气泡容器优化**: 在气泡容器中添加 `inline-block max-w-full` 类，确保容器不会被内容撑爆
2. **文本换行增强**: 在 `<p>` 标签中添加 `whitespace-pre-wrap` 类，支持换行符和自动换行

**技术细节**:

- 位置：`src/components/MessageBubble.tsx:37`
- 原样式：`px-4 py-2 rounded-lg relative`
- 新样式：`px-4 py-2 rounded-lg relative inline-block max-w-full`
- 文本样式：`text-sm break-words whitespace-pre-wrap`

**解决效果**:

- 长文本会正确换行，不会撑爆气泡宽度
- 支持用户输入的换行符显示
- 保持气泡样式的完整性

**Storybook 测试用例**:

- 新增"超长消息测试"故事，验证极长文本换行
- 新增"带换行符的消息"故事，验证换行符显示

### ChatWindow 和 MessageInput 组件自适应高度优化

**问题**: ChatWindow 底部输入区域高度固定，无法根据用户输入内容自动调整
**解决时间**: 2025-07-09

**优化内容**:

1. **MessageInput 组件自适应高度**:
   - 添加 `maxHeight` 属性，支持自定义最大高度限制
   - 使用 `useRef` 和 `useEffect` 监听内容变化
   - 自动调整 textarea 高度，超过最大高度时显示滚动条
   - 设置 `min-h-[40px]` 保证最小高度

2. **ChatWindow 组件布局优化**:
   - 移除 MessageInput 的固定高度限制（`h-24`）
   - 设置 `maxHeight={150}` 作为合理的最大高度
   - 底部输入区域现在会根据内容自动调整

**技术细节**:

- MessageInput 位置：`src/components/MessageInput.tsx:25-37`
- ChatWindow 位置：`src/components/ChatWindow.tsx:92`
- 关键函数：`adjustHeight()` - 自动调整高度逻辑
- 样式变更：移除固定高度，添加最小高度和滚动条控制

**使用效果**:

- 用户输入少量文字时，输入框保持最小高度
- 用户输入多行文字时，输入框高度自动增长
- 达到最大高度后，输入框内显示滚动条
- 整个聊天窗口底部区域随输入框高度变化

**API 更新**:

- MessageInput 新增 `maxHeight?: number` 属性
- 默认最大高度为 200px
- ChatWindow 中设置为 150px

### ChatWindow 初始消息功能实现

**添加时间**: 2025-07-09

**功能描述**: 为 ChatWindow 组件增加初始消息加载能力，支持展示历史对话记录

**实现方案**:

1. **API 设计**:
   - ChatWindowProps 新增 `initialMessages?: ChatMessage[]` 参数
   - 参数透传到内部 MessageList 组件的 `initialMessages` 属性
   - 保持向后兼容，参数为可选

2. **使用方式**:

   ```tsx
   // 定义初始消息（如从数据库加载）
   const initialMessages: ChatMessage[] = [
     {
       id: '1',
       user: { id: 'assistant-1', name: 'AI Assistant', avatar: '🤖' },
       message: '您好！有什么可以帮助您的吗？',
       timestamp: Date.now() - 300000,
     },
     // ... 更多历史消息
   ];

   // 使用组件
   <ChatWindow initialMessages={initialMessages} onSendMessage={handleSendMessage} />;
   ```

3. **流式回复集成**:
   - 使用 `ref.current.receive()` 接收新消息，返回消息 ID
   - 使用 `ref.current.update(messageId, { message: content })` 更新消息
   - 通过 `setInterval` 实现逐字更新效果

**技术细节**:

- ChatWindow 接口定义：`src/components/ChatWindow.tsx:15`
- 参数透传实现：`src/components/ChatWindow.tsx:87`
- 示例应用：`src/App.tsx` - 展示流式回复实现
- Storybook 故事：`WithInitialMessages` - 完整功能演示

**应用场景**:

- **会话恢复**: 用户重新打开聊天窗口时加载之前的对话
- **客服系统**: 展示历史工单和对话记录
- **AI 对话**: 保持上下文连续性
- **演示场景**: 预设对话内容进行功能展示

**最佳实践**:

- 初始消息应包含完整的 ChatMessage 结构
- 虚拟滚动会自动定位到最新消息
- 结合 ref 方法可实现复杂的消息更新逻辑
- 适合与后端 API 集成实现持久化

### MessageInput 发送按钮 UI 优化

**优化时间**: 2025-07-09

**优化内容**:

1. **按钮形状调整**: 从方形改为圆形
2. **图标更换**: 从 `Send` 图标改为 `ArrowUp` 向上箭头图标

**技术细节**:

- 位置：`src/components/MessageInput.tsx:87-94`
- 图标导入：`import { ArrowUp } from 'lucide-react'`
- 样式变更：`rounded-full w-8 h-8 p-0`（圆形、固定尺寸、无内边距）
- 图标尺寸：`h-4 w-4`

**设计理念**:

- 更符合现代聊天应用的设计风格
- 圆形按钮提供更好的视觉体验
- 向上箭头暗示"发送"或"提交"动作

### MessageInput 组件细节优化

**优化时间**: 2025-07-09

**优化内容**:

1. **初始高度调整**: 将最小高度从 40px 调整为 100px
2. **最大高度配置**: ChatWindow 中设置为 300px，提供更大的增长空间
3. **阴影效果**: 添加 `shadow-sm` 类，增强视觉层次感

**关键配置**:

- **最小高度**: `min-h-[100px]` - 提供更舒适的初始输入空间
- **最大高度**: `maxHeight={300}` - 在 ChatWindow 中配置，允许更多行文本
- **阴影样式**: `shadow-sm` - 轻微阴影，增强立体感

**高度控制逻辑**:

- MessageInput 默认 maxHeight = 200px
- ChatWindow 传入 maxHeight = 300px（实际生效值）
- 最小高度 100px → 最大高度 300px，增长空间 200px

**视觉效果**:

- 输入框有更大的初始可视区域
- 输入长文本时有充足的扩展空间
- 阴影效果让输入框在界面中更突出

<!-- 最后更新时间: 2025-07-09T14:17:00+08:00 -->
