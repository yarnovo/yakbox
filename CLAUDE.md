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

<!-- 最后更新时间: 2025-01-08T09:16:00.000Z -->
