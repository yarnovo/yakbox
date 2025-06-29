# GitHub Actions 工作流策略

本文档介绍 chat-window 项目的 CI/CD 工作流策略和设计理念。

## 工作流概览

我们使用两个主要的 GitHub Actions 工作流：

1. **CI 工作流** (`.github/workflows/ci.yml`) - 持续集成
2. **Release 工作流** (`.github/workflows/release.yml`) - 版本发布

## CI 工作流策略

### 触发条件
- 推送到 `main` 分支
- 针对 `main` 分支的 Pull Request

### 执行步骤
**质量检查** (quality-check) - 单一任务包含所有检查：
- Lint 检查：确保代码风格一致
- 类型检查：TypeScript 类型正确性
- 构建测试：验证项目能正确构建
- 构建产物验证：确保生成所需文件
- 单元测试：运行所有测试用例

### 设计理念
- **快速反馈**：每次代码变更都进行完整检查
- **质量保证**：在合并前发现并修复问题
- **简化流程**：所有检查在一个任务中完成，减少复杂性

## Release 工作流策略

### 触发条件
- 推送符合 `v*.*.*` 格式的标签（如 v1.0.0）

### 执行步骤

1. **标签验证** (validate-tag)
   - 验证标签格式正确性
   - 提取版本号（去除 v 前缀）

2. **质量检查** (quality-check)
   - 执行所有 CI 步骤（lint、typecheck、test、build）
   - 确保发布版本的代码质量

3. **NPM 发布** (publish-npm)
   - 自动更新 package.json 版本号
   - 发布到 NPM 公共仓库
   - 验证发布成功

4. **CDN 部署** (publish-cloudflare)
   - 仅部署 UMD 格式的构建文件
   - 创建版本化路径（如 /v1.0.0/chat-window.umd.js）
   - 更新 latest 路径指向最新版本

5. **GitHub Release 创建** (create-release)
   - 生成发布说明
   - 上传构建产物作为 Release 资源
   - 提供多种使用方式的文档

### 设计理念
- **自动化发布**：减少人为错误，提高发布效率
- **版本管理**：严格的版本控制和标签验证
- **多渠道分发**：同时支持 NPM 包管理器和 CDN 直接引用
- **可追溯性**：每个版本都有对应的 GitHub Release 记录

## CDN 策略

### 为什么需要 CDN？
1. **快速集成**：用户无需安装依赖，直接通过 script 标签使用
2. **版本控制**：支持指定版本和最新版本两种方式
3. **全球加速**：利用 Cloudflare 的全球节点提供快速访问

### CDN 部署内容
- **仅部署 UMD 文件**：专注于浏览器直接使用场景
- **版本化路径**：
  - `/latest/chat-window.umd.js` - 始终指向最新版本
  - `/v1.0.0/chat-window.umd.js` - 特定版本，永不改变

### 多 CDN 支持
除了 Cloudflare Pages，NPM 发布后自动支持：
- **unpkg**: 自动从 NPM 同步
- **jsDelivr**: 自动从 NPM 同步，提供更好的国内访问

## 安全性考虑

1. **Secrets 管理**
   - 所有敏感信息通过 GitHub Secrets 管理
   - 最小权限原则：每个 token 只授予必需权限

2. **发布保护**
   - 只有符合格式的标签才能触发发布
   - 发布前必须通过所有质量检查

3. **构建隔离**
   - 每次构建在独立环境中执行
   - 使用固定版本的 Node.js (v22) 确保一致性

## 最佳实践

1. **版本发布流程**
   ```bash
   # 1. 确保所有更改已提交
   git status
   
   # 2. 更新版本号并创建标签
   npm version patch/minor/major
   
   # 3. 推送代码和标签
   git push origin main
   git push origin --tags
   ```

2. **紧急修复**
   - 创建 hotfix 分支
   - 修复后合并到 main
   - 立即发布补丁版本

3. **版本规划**
   - Patch (x.x.1): 错误修复
   - Minor (x.1.x): 新功能（向后兼容）
   - Major (1.x.x): 重大更改（可能不兼容）

## 监控和通知

- **Actions 页面**：查看所有工作流运行状态
- **Release 页面**：查看所有发布版本
- **失败通知**：GitHub 自动发送邮件通知

## 故障恢复

如果发布失败：
1. 检查 Actions 日志定位问题
2. 修复问题后删除失败的标签
3. 重新创建标签触发发布

```bash
# 删除远程标签
git push origin :refs/tags/v1.0.0

# 删除本地标签
git tag -d v1.0.0

# 修复后重新创建
git tag v1.0.0
git push origin v1.0.0
```