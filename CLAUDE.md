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

<!-- 最后更新时间: 2025-07-09T01:24:06+08:00 -->
