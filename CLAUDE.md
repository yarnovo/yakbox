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

## 文档维护

- README.md 需要与代码保持同步
- 文档中包含组件导出列表、API 说明、使用示例
- README 中添加最新更新章节，链接到 CHANGELOG.md
- 文档示例代码使用中文变量名和注释
- 样式部分必须说明 Tailwind CSS 配置要求（content 或 @source）

## 开发端口

- 开发服务器端口：5274
- Storybook 端口：6106

<!-- 最后更新时间: 2025-07-09T20:14:00+08:00 -->
<!-- 更新说明: 添加技术架构说明，强调 Tailwind CSS 配置要求 -->
