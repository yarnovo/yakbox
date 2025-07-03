# 发布流程指南

本文档说明如何使用交互式发布脚本进行版本发布。

## 快速开始

```bash
npm run release
```

## 发布类型

### 1. 正式版本 (Production)

- 稳定版本，供生产环境使用
- 版本格式：`v1.0.0`
- NPM 标签：`latest`

### 2. Alpha 版本

- 内部测试版本，功能可能不完整
- 版本格式：`v1.0.0-alpha.0`
- NPM 标签：`alpha`
- 适用场景：新功能的早期开发阶段

### 3. Beta 版本

- 公开测试版本，功能基本完整
- 版本格式：`v1.0.0-beta.0`
- NPM 标签：`beta`
- 适用场景：功能完成但需要更多测试

### 4. RC 版本 (Release Candidate)

- 候选发布版本，即将成为正式版
- 版本格式：`v1.0.0-rc.0`
- NPM 标签：`rc`
- 适用场景：最终测试阶段

## 版本号迭代规则

### 正式版本迭代

- **Major (主版本号)**: 重大更新，可能包含不兼容的更改
  - `1.2.3` → `2.0.0`
- **Minor (次版本号)**: 新功能，向后兼容
  - `1.2.3` → `1.3.0`
- **Patch (修订号)**: 错误修复
  - `1.2.3` → `1.2.4`

### 预发布版本迭代

#### 同类型递增

- **Alpha → Alpha**: `1.0.0-alpha.0` → `1.0.0-alpha.1`
- **Beta → Beta**: `1.0.0-beta.0` → `1.0.0-beta.1`
- **RC → RC**: `1.0.0-rc.0` → `1.0.0-rc.1`

#### 升级路径

- **Alpha → Beta**: `1.0.0-alpha.3` → `1.0.0-beta.0`
- **Beta → RC**: `1.0.0-beta.2` → `1.0.0-rc.0`
- **RC → 正式版**: `1.0.0-rc.1` → `1.0.0`

#### 版本升级顺序

```
alpha → beta → rc → production
```

## 发布流程步骤

1. **环境检查**
   - 显示当前版本号
   - 显示当前分支
   - 检查工作区状态

2. **选择发布类型**
   - 正式版本或预发布版本

3. **选择版本号类型**（仅正式版本需要）
   - Major/Minor/Patch

4. **执行质量检查**
   - Lint 检查
   - 类型检查
   - 测试运行
   - 项目构建

5. **版本发布**
   - 更新 package.json 版本号
   - 创建 Git 提交
   - 创建版本标签
   - 推送到远程仓库

6. **自动化流程**
   - GitHub Actions 自动执行
   - 发布到 NPM
   - 自动同步到 jsDelivr CDN
   - 创建 GitHub Release

## 使用示例

### 发布正式版本

```bash
$ npm run release

🚀 发布脚本

📦 当前版本: 1.0.0
🌿 当前分支: main

选择发布类型:
1. 正式版本 (Production)
2. 预发布版本 (Beta)
请选择 (1/2): 1

选择版本号迭代类型:
1. Major (主版本号) - 重大更新，可能不兼容
2. Minor (次版本号) - 新功能，向后兼容
3. Patch (修订号) - 错误修复
请选择 (1/2/3): 3

📋 执行计划:
  当前版本: 1.0.0 → 新版本: 1.0.1
  标签名称: v1.0.1
  发布类型: 正式版本
```

### 发布 Beta 版本

```bash
$ npm run release

🚀 发布脚本

📦 当前版本: 1.0.0
🌿 当前分支: main

选择发布类型:
1. 正式版本 (Production)
2. 预发布版本 (Beta)
请选择 (1/2): 2

选择版本号迭代类型:
1. Major (主版本号) - 重大更新，可能不兼容
2. Minor (次版本号) - 新功能，向后兼容
3. Patch (修订号) - 错误修复
请选择 (1/2/3): 2

📋 执行计划:
  当前版本: 1.0.0 → 新版本: 1.1.0-beta.0
  标签名称: v1.1.0-beta.0
  发布类型: 预发布版本 (Beta)
```

### Beta 版本转正式版

```bash
$ npm run release

🚀 发布脚本

📦 当前版本: 1.1.0-beta.2
🌿 当前分支: main

选择发布类型:
1. 正式版本 (Production)
2. 预发布版本 (Beta)
请选择 (1/2): 1

当前是 Beta 版本，将发布为正式版本

📋 执行计划:
  当前版本: 1.1.0-beta.2 → 新版本: 1.1.0
  标签名称: v1.1.0
  发布类型: 正式版本
```

## 安装不同版本

### 安装最新正式版

```bash
npm install @course-gen/chat-window
```

### 安装最新 Alpha 版

```bash
npm install @course-gen/chat-window@alpha
```

### 安装最新 Beta 版

```bash
npm install @course-gen/chat-window@beta
```

### 安装最新 RC 版

```bash
npm install @course-gen/chat-window@rc
```

### 安装特定版本

```bash
npm install @course-gen/chat-window@1.0.0
npm install @course-gen/chat-window@1.1.0-beta.0
```

## 注意事项

1. **发布前确认**
   - 确保所有代码已提交
   - 确保在正确的分支上（通常是 main）
   - 确保所有测试通过

2. **版本号规范**
   - 遵循语义化版本规范 (SemVer)
   - Beta 版本用于测试新功能
   - 正式版本应该是稳定的

3. **回滚操作**
   如果发布失败，可以删除标签重新发布：

   ```bash
   # 删除本地标签
   git tag -d v1.0.1

   # 删除远程标签
   git push origin :refs/tags/v1.0.1
   ```

## 常见问题

### Q: 发布过程中断了怎么办？

A: 检查当前状态，如果标签已创建但未推送，可以手动推送：

```bash
git push origin main
git push origin v1.0.1
```

### Q: 如何查看发布进度？

A: 访问 GitHub Actions 页面查看工作流状态

### Q: Beta 版本会影响正式版用户吗？

A: 不会。Beta 版本使用独立的 NPM 标签，正式版用户不会自动更新到 Beta 版本
