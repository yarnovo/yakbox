# 开发指南

本文档为 yakbox 项目的开发者提供详细的开发指导。

## 📋 目录

- [项目结构](#项目结构)
- [开发环境设置](#开发环境设置)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [组件开发](#组件开发)
- [测试策略](#测试策略)
- [提交规范](#提交规范)
- [发布流程](#发布流程)

## 🏗️ 项目结构

```
chat-window/
├── .github/                 # GitHub 配置
│   └── workflows/          # CI/CD 工作流
├── .storybook/             # Storybook 配置
├── dist/                   # 构建输出目录
├── docs/                   # 项目文档
├── public/                 # 公共静态资源
├── src/                    # 源代码
│   ├── components/         # React 组件
│   │   └── icons/         # 内联 SVG 图标组件
│   ├── stories/           # Storybook 故事文件
│   ├── lib/               # 工具函数库
│   ├── types/             # TypeScript 类型定义
│   └── index.ts           # 主入口文件
├── tests/                  # 测试文件
├── .eslintrc.cjs          # ESLint 配置
├── .prettierrc            # Prettier 配置
├── CLAUDE.md              # 项目开发规则约定
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 构建配置
└── vitest.config.ts       # Vitest 测试配置
```

## 🛠️ 开发环境设置

### 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### 安装步骤

1. **克隆仓库**

   ```bash
   git clone https://github.com/course-gen/chat-window.git
   cd chat-window
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **安装 Playwright 浏览器**（用于 Storybook 测试）

   ```bash
   npx playwright install chromium
   ```

4. **设置 Git hooks**
   ```bash
   # 项目已配置 husky，安装依赖时会自动设置
   ```

### IDE 配置

推荐使用 VS Code，并安装以下扩展：

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense

## 💻 开发流程

### 启动开发服务器

```bash
# 启动 Vite 开发服务器
npm run dev

# 启动 Storybook（推荐用于组件开发）
npm run storybook
```

### 开发工作流

1. **创建功能分支**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **进行开发**
   - 修改代码
   - 实时预览效果
   - 编写/更新测试

3. **运行质量检查**
   ```bash
   npm run check:all
   ```

## 📐 代码规范

### 必须执行的检查

每次代码改动后都必须执行以下检查：

1. **Lint 检查**

   ```bash
   npm run lint
   # 自动修复
   npm run lint -- --fix
   ```

2. **类型检查**

   ```bash
   npm run typecheck
   ```

3. **测试**

   ```bash
   npm test
   ```

4. **一键检查所有**
   ```bash
   npm run check:all
   ```

### 代码风格

- 使用 TypeScript 编写所有代码
- 遵循 ESLint 和 Prettier 配置
- 组件使用函数式组件 + Hooks
- 使用 Tailwind CSS 编写样式
- 避免使用 `any` 类型

### 图标处理

- 使用内联 SVG 组件，不使用外部图标库
- 图标组件放在 `src/components/icons/` 目录
- 确保 UMD 打包的兼容性

## 🧩 组件开发

### 创建新组件

1. **组件文件**

   ```tsx
   // src/components/MyComponent.tsx
   import React from 'react';

   export interface MyComponentProps {
     // 定义 props
   }

   export const MyComponent: React.FC<MyComponentProps> = (props) => {
     // 组件逻辑
     return <div>...</div>;
   };
   ```

2. **创建 Story 文件**

   ```tsx
   // src/stories/MyComponent.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { MyComponent } from '../components/MyComponent';

   const meta: Meta<typeof MyComponent> = {
     title: 'Components/MyComponent',
     component: MyComponent,
   };

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const Default: Story = {
     args: {
       // 默认 props
     },
   };
   ```

3. **导出组件**
   ```tsx
   // src/index.ts
   export { MyComponent } from './components/MyComponent';
   export type { MyComponentProps } from './components/MyComponent';
   ```

### 组件开发原则

- 保持组件的单一职责
- 提供完整的 TypeScript 类型定义
- 编写全面的 Storybook 文档
- 考虑可访问性（a11y）
- 支持主题定制

## 🧪 测试策略

### 测试类型

1. **单元测试**
   - 使用 Vitest
   - 测试组件逻辑和工具函数

2. **集成测试**
   - 使用 Vitest + Playwright
   - 测试 Storybook 中的组件交互

3. **类型测试**
   - TypeScript 编译时检查
   - 确保类型定义正确

### 编写测试

```tsx
// tests/MyComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MyComponent } from '../src/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    const { container } = render(<MyComponent />);
    expect(container).toMatchSnapshot();
  });
});
```

### 运行测试

```bash
# 运行所有测试
npm test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
```

## 📝 提交规范

### 提交消息格式

遵循 Conventional Commits 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型说明

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI/CD 相关改动

### 示例

```bash
# 新功能
git commit -m "feat(chat): add message retry functionality"

# 修复 bug
git commit -m "fix(input): resolve emoji rendering issue"

# 更新文档
git commit -m "docs: update API documentation"
```

### Pre-commit Hooks

项目配置了 husky 和 lint-staged，会在提交前自动：

1. 运行 ESLint
2. 运行 Prettier
3. 运行类型检查

## 🚀 发布流程

### 版本管理

使用语义化版本控制（Semantic Versioning）：

- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 发布步骤

1. **更新版本号**

   ```bash
   # 修订版本（patch）: 1.0.0 -> 1.0.1
   npm version patch

   # 次版本（minor）: 1.0.0 -> 1.1.0
   npm version minor

   # 主版本（major）: 1.0.0 -> 2.0.0
   npm version major

   # 预发布版本
   npm version prerelease --preid=beta
   ```

2. **推送标签**

   ```bash
   git push origin main --tags
   ```

3. **自动发布**
   - GitHub Actions 会自动运行 CI/CD
   - 通过所有检查后自动发布到 NPM

### 预发布版本

支持 alpha、beta、rc 三种预发布版本：

```bash
# Alpha 版本
npm version prerelease --preid=alpha

# Beta 版本
npm version prerelease --preid=beta

# Release Candidate
npm version prerelease --preid=rc
```

## 🤝 贡献指南

### 贡献流程

1. Fork 项目
2. 创建功能分支
3. 提交代码（遵循提交规范）
4. 确保所有测试通过
5. 提交 Pull Request

### PR 要求

- 描述清晰的改动内容
- 包含相关的测试
- 更新相关文档
- 通过所有 CI 检查

### 代码审查

- 至少需要一位维护者审查
- 解决所有评论后才能合并
- 保持代码质量和一致性

## 📚 相关资源

- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vitejs.dev/)
- [Storybook 文档](https://storybook.js.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)

## ❓ 常见问题

### 开发环境问题

**Q: Storybook 启动失败**
A: 确保已安装 Playwright 浏览器：`npx playwright install chromium`

**Q: TypeScript 类型错误**
A: 运行 `npm run typecheck` 查看详细错误，确保所有类型定义正确

### 构建问题

**Q: 构建产物缺失类型文件**
A: 检查 `vite-plugin-dts` 配置，确保 `tsconfig.json` 正确

**Q: UMD 构建体积过大**
A: 检查是否引入了不必要的依赖，使用内联 SVG 替代图标库

## 💬 获取帮助

- 提交 Issue：[GitHub Issues](https://github.com/course-gen/chat-window/issues)
- 讨论区：[GitHub Discussions](https://github.com/course-gen/chat-window/discussions)
- 邮件：dev@course-gen.com
