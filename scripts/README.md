# 发布脚本

## 简介

`release.js` 是一个现代化的交互式命令行工具，用于自动化版本发布流程。它使用 `prompts` 库（与 Vite 相同）提供友好的用户界面，支持多种预发布版本类型，确保发布过程的一致性和可靠性。

## 职责

该脚本负责以下任务：

1. **版本管理**
   - 自动计算下一个版本号
   - 支持语义化版本规范 (SemVer)
   - 处理预发布版本升级路径

2. **质量保证**
   - 执行代码质量检查（lint）
   - 执行类型检查（typecheck）
   - 运行测试套件
   - 构建项目验证

3. **Git 操作**
   - 创建版本提交
   - 创建版本标签
   - 推送代码和标签到远程仓库

4. **发布触发**
   - 触发 GitHub Actions 工作流
   - 自动发布到 NPM
   - 部署到 CDN

## 使用方式

### 基本用法

```bash
npm run release
```

### 支持的版本类型

1. **正式版本 (Production)**
   - 稳定版本，适用于生产环境
   - 版本格式：`1.0.0`
   - NPM 标签：`latest`

2. **Alpha 版本**
   - 内部测试版本
   - 版本格式：`1.0.0-alpha.0`
   - NPM 标签：`alpha`
   - 安装：`npm install @course-gen/chat-window@alpha`

3. **Beta 版本**
   - 公开测试版本
   - 版本格式：`1.0.0-beta.0`
   - NPM 标签：`beta`
   - 安装：`npm install @course-gen/chat-window@beta`

4. **RC 版本 (Release Candidate)**
   - 候选发布版本
   - 版本格式：`1.0.0-rc.0`
   - NPM 标签：`rc`
   - 安装：`npm install @course-gen/chat-window@rc`

### 版本升级路径

预发布版本遵循以下升级路径：

```
alpha → beta → rc → production
```

### 技术特性

- **现代化交互界面**：使用 `prompts` 库提供美观的选择器和确认框
- **智能版本管理**：根据当前版本状态自动调整可选项
- **彩色输出**：使用 `chalk` 库提供清晰的视觉反馈
- **错误处理**：完善的错误捕获和友好的错误提示
- **中断支持**：支持 Ctrl+C 优雅退出

### 交互流程

1. **环境检查**
   - 显示当前版本和分支
   - 检查工作区状态
   - 如有未提交更改会询问是否继续

2. **选择发布类型**
   - 使用箭头键上下选择
   - 显示每个选项的说明
   - 智能过滤不适用的选项（基于当前版本）

3. **选择版本递增类型**
   - 仅在需要时显示
   - 包含版本变化示例
   - 预发布版本自动处理

4. **确认执行计划**
   - 清晰显示版本变更
   - 列出所有执行步骤
   - 默认选中确认，Enter 键即可继续

### 使用示例

#### 发布 Alpha 版本

```bash
# 从 1.0.0 → 1.1.0-alpha.0
npm run release
# 选择: Alpha 版本 + Minor
```

#### Alpha 升级到 Beta

```bash
# 从 1.1.0-alpha.2 → 1.1.0-beta.0
npm run release
# 选择: Beta 版本
```

#### Beta 升级到 RC

```bash
# 从 1.1.0-beta.3 → 1.1.0-rc.0
npm run release
# 选择: RC 版本
```

#### RC 发布为正式版

```bash
# 从 1.1.0-rc.1 → 1.1.0
npm run release
# 选择: 正式版本
```

### 错误处理

脚本包含以下错误处理机制：

1. **工作区检查**：如有未提交更改会警告
2. **版本格式验证**：确保版本号符合规范
3. **质量检查失败**：任何检查失败都会中止发布
4. **Git 操作失败**：提供清晰的错误信息

### 配置要求

1. **Node.js**: 需要 Node.js 22 或更高版本
2. **Git**: 需要配置好的 Git 环境
3. **NPM**: 需要 NPM 发布权限（通过 GitHub Secrets 配置）

### 相关文档

- [发布流程指南](../docs/release-process.md)
- [GitHub Actions 工作流策略](../docs/github-actions-workflow-strategy.md)
- [GitHub Secrets 配置](../docs/github-secrets-setup.md)
