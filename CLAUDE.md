# yakbox 项目记忆

## 本地化偏好

- 界面文案使用中文
- Storybook 故事名称使用中文描述
- 注释和文档优先使用中文

## 版本管理

- 使用语义化版本号 (semantic versioning)
- 开发版本使用 `-dev.X` 后缀
- 更新日志文件名为 `CHANGELOG.md`
- 更新日志使用中文编写，包含功能分类（新增功能、修复、样式优化等）
- 版本标签格式：`v0.1.0`, `v0.2.0-dev.0`
- 通过 `git log v0.1.0..v0.2.0-dev.0 --oneline` 查看版本间差异
- 更新日志包含表情符号分类（🎯、✨、🐛、💄、📝、🔧、⚡、🎉）

## 项目定位

- 专注于聊天界面交互逻辑
- 已移除内容渲染相关组件
- 核心组件：ChatWindow、MessageBubble、MessageInput、MessageList

## 技术架构

- 基于 shadcn/ui 设计系统
- 使用 Tailwind CSS 构建样式
- 组件样式依赖宿主项目的 shadcn/ui 主题变量
- 需要在宿主项目配置 Tailwind 以提取组件样式

## 组件功能

### 自定义消息内容渲染

- ChatWindow 组件支持 `renderMessageContent` 属性
- MessageList 组件支持 `renderMessageContent` 属性
- MessageBubble 组件支持 `renderContent` 属性
- 可以自定义消息内容的渲染方式，如 Markdown、链接、代码块等
- 已在 Storybook 中添加相关演示

## 文档维护

- README.md 需要与代码保持同步
- 文档中包含组件导出列表、API 说明、使用示例
- README 中添加最新更新章节，链接到 CHANGELOG.md
- 文档示例代码使用中文变量名和注释
- 样式部分必须说明 Tailwind CSS 配置要求（content 或 @source）

## 开发端口

- 开发服务器端口：5274
- Storybook 端口：6106

## 代码质量工具

- ESLint 集成 Prettier 进行代码格式化
- 使用 eslint-config-prettier 和 eslint-plugin-prettier
- lint-staged 仅运行 eslint --fix，Prettier 通过 ESLint 规则自动执行
- 配置位置：eslint.config.js（Flat Config 格式）

## 文件命名规范

- 所有组件文件使用小写中划线格式（kebab-case）
  - 示例：`chat-window.tsx`, `message-list.tsx`
- Storybook 故事文件也使用小写中划线格式
  - 示例：`chat-window.stories.tsx`
- 故事文件统一存放在 `src/stories/` 目录下
- 主应用文件也使用小写格式
  - 示例：`app.tsx`, `app.css`

## 版本控制最佳实践

- 对于已在版本库中的文件重命名，必须使用 `git mv` 命令
  - 避免因文件系统大小写不敏感导致的 Git 识别问题
  - 确保 Git 能正确跟踪文件重命名历史
  - 示例：`git mv src/App.tsx src/app.tsx`

## 目录结构规范

- 组件文件存放在 `src/components/`
- 故事文件统一存放在 `src/stories/`
- Storybook 配置仅扫描 `src/stories/` 目录
- 所有文件重命名后需要同步更新相关导入路径

<!-- 最后更新时间: 2025-01-13T15:51:00+08:00 -->
<!-- 更新说明: 新增自定义消息内容渲染功能记录 -->
