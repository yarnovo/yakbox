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

### 2025-01-08 (第一次更新)

- **包名变更**: 从 @course-gen/chat-window 改为 yakbox
- **目录重构**:
  - 创建 references 文件夹，用于存放内部参考文档
  - 保留 docs 文件夹作为对外文档目录

### 2025-01-08 (第二次更新)

- **Git 远程仓库变更**:
  - 从 `git@github.com:ai-app-base/chat-window.git` 改为 `git@github.com:yarnovo/yakbox.git`
- **版本重置**: 版本号重置为 0.0.0，清理所有历史 git tags
- **依赖更新**:
  - 移除 `@ai-app-base/bump-version-js`
  - 添加 `bumpster@^0.1.2` 作为版本验证工具
- **CI/CD 更新**:
  - 更新 GitHub Actions 工作流中的包名引用
  - 更新版本验证命令为使用 bumpster

### 2025-01-08 (第三次更新)

- **Storybook 部署配置**:
  - 新增 `.github/workflows/storybook-deploy.yml` 工作流
  - 配置自动部署到 GitHub Pages
  - 在推送到 main 分支时自动触发部署
  - 支持手动触发部署
- **文档更新**:
  - 在 README 中添加 Storybook 徽章和在线文档链接
  - 将 Storybook 部署文档整合到 DEPLOYMENT.md 中

### 2025-01-08 (第四次更新)

- **License Key 管理方案**:
  - 创建 `src/config/license.ts` 管理 License Key 配置
  - 支持三层配置策略：本地开发(.env.local)、Storybook 部署(GitHub Secrets)、生产使用(组件 props)
  - 新增 `.env.example` 作为环境变量模板
  - 更新 `.gitignore` 排除敏感配置文件
- **GitHub Actions 更新**:
  - 在 Storybook 构建步骤添加 `VITE_VIRTUOSO_LICENSE_KEY` 环境变量注入
  - 新增 GitHub Secret 配置要求
- **Storybook Stories 更新**:
  - 修改 ChatWindow 和 MessageList 的 stories 文件，自动从环境变量读取 License Key
  - 使用 `getVirtuosoLicenseKey()` 函数统一管理
- **文档新增**:
  - 创建 `docs/LICENSE_KEY_SETUP.md` 详细说明配置方法
  - 更新 `DEPLOYMENT.md` 添加 License Key 相关的 Secret 配置说明

## 项目发布信息

- **NPM 包名**: yakbox
- **Git 仓库**: https://github.com/yarnovo/yakbox
- **当前版本**: 0.0.0
- **发布方式**: 通过 GitHub tag 触发自动发布到 NPM
- **Storybook 文档**: https://yarnovo.github.io/yakbox/

## 部署说明

### NPM 发布

- 通过创建版本标签（如 `v1.0.0`）触发自动发布
- 支持正式版和预发布版（alpha、beta、rc）

### Storybook 部署

- 推送版本标签时自动部署到 GitHub Pages（例如 `v1.0.0`）
- 支持手动触发部署
- 需要在仓库设置中启用 GitHub Pages，Source 选择 "GitHub Actions"
- 部署地址：https://yarnovo.github.io/yakbox/
- 需要配置 `VITE_VIRTUOSO_LICENSE_KEY` Secret 用于生产环境

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

<!-- 最后更新时间: 2025-01-08T08:36:15.789Z -->
