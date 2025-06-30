# 项目开发规范

## 代码质量检查

### 例行检查（必须执行）
每次代码改动后都必须执行以下三项检查：

1. **Lint 检查**
   - 执行 `npm run lint` 进行代码质量检查
   - 如果有 lint 错误，必须立即修复
   
2. **类型检查**
   - 执行 `npm run typecheck` 进行 TypeScript 类型检查
   - 确保所有类型定义正确，没有类型错误

3. **测试**
   - 执行 `npm test` 运行所有测试用例
   - 包括 Storybook 组件测试（使用 Vitest + Playwright）
   - 确保所有测试通过

### 常用命令
```bash
# 执行 lint 检查
npm run lint

# 自动修复部分 lint 问题
npm run lint -- --fix

# 执行类型检查
npm run typecheck

# 执行测试
npm test

# 同时执行所有检查（推荐）
npm run lint && npm run typecheck && npm test
```

## 项目结构
- 组件放在 `src/components/` 目录
- Story 文件放在 `src/stories/` 目录
- 所有组件都需要创建对应的 Storybook 文档

## 依赖管理
- 开发依赖使用 `npm install --save-dev`
- 生产依赖使用 `npm install`
- 外部依赖需要在 `vite.config.ts` 中配置

## 关键技术栈
- React + TypeScript
- Vite 构建工具
- Tailwind CSS 样式
- Storybook 9.0 组件文档
- @virtuoso.dev/message-list 虚拟滚动
- uuid 生成唯一标识符

## 图标处理策略
- 使用内联 SVG 组件而不是外部图标库（如 lucide-react）
- 避免增加额外的依赖（lucide-react 完整包约 7MB）
- 确保 UMD 打包的兼容性和体积控制
- 所有图标组件在 `src/components/icons/` 目录
- 详见 `docs/icon-library-guide.md` 和 `docs/icon-size-comparison.md`

## 构建和发布策略
- **双格式输出**：同时提供 UMD 和 ESM 格式
- **类型文件**：使用 vite-plugin-dts 自动生成 TypeScript 类型定义
- **UMD 用途**：CDN 使用、快速集成、在线演示
- **ESM 用途**：现代项目、Tree Shaking、更好性能
- **CDN 友好**：配置了 jsdelivr 字段，自动同步到 jsDelivr CDN
- **构建产物**：
  - `dist/chat-window.umd.js` - UMD 格式 (~6.3KB, gzip ~2.7KB)
  - `dist/chat-window.es.js` - ESM 格式 (~8.1KB, gzip ~2.8KB)
  - `dist/index.d.ts` - TypeScript 类型定义 (~1.7KB)
- 详见 `docs/umd-cdn-guide.md` 和 `docs/cdn-usage-examples.md`