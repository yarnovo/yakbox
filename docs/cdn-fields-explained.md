# package.json 中的 CDN 字段说明

## CDN 字段配置

在 `package.json` 中，我们配置了两个 CDN 相关的字段：

```json
{
  "unpkg": "./dist/chat-window.umd.js",
  "jsdelivr": "./dist/chat-window.umd.js"
}
```

## 字段说明

### unpkg 字段
- **作用**：告诉 unpkg CDN 服务默认提供哪个文件
- **访问方式**：`https://unpkg.com/chat-window`
- **特点**：
  - 自动从 npm 同步
  - 支持版本锁定：`https://unpkg.com/chat-window@1.0.0`
  - 可以浏览包内所有文件：`https://unpkg.com/browse/chat-window/`

### jsdelivr 字段
- **作用**：告诉 jsDelivr CDN 服务默认提供哪个文件
- **访问方式**：`https://cdn.jsdelivr.net/npm/chat-window`
- **特点**：
  - 全球 CDN，中国可访问
  - 自动压缩和优化
  - 支持版本锁定：`https://cdn.jsdelivr.net/npm/chat-window@1.0.0`
  - 支持版本范围：`https://cdn.jsdelivr.net/npm/chat-window@^1.0.0`

## 为什么都指向 UMD 文件？

因为 CDN 使用场景通常是：
- 通过 `<script>` 标签直接引入
- 无需构建工具
- 需要立即可用

UMD 格式正好满足这些需求。

## 使用示例

### unpkg
```html
<!-- 最新版本 -->
<script src="https://unpkg.com/chat-window"></script>

<!-- 指定版本 -->
<script src="https://unpkg.com/chat-window@1.0.0"></script>

<!-- 访问其他文件 -->
<script src="https://unpkg.com/chat-window/dist/chat-window.es.js"></script>
```

### jsDelivr
```html
<!-- 最新版本 -->
<script src="https://cdn.jsdelivr.net/npm/chat-window"></script>

<!-- 指定版本 -->
<script src="https://cdn.jsdelivr.net/npm/chat-window@1.0.0"></script>

<!-- 压缩版 -->
<script src="https://cdn.jsdelivr.net/npm/chat-window/dist/chat-window.umd.min.js"></script>
```

## 选择建议

| 特性 | unpkg | jsDelivr |
|------|-------|----------|
| 速度 | 快 | 更快 |
| 中国访问 | 可能受限 | 正常 |
| 自动压缩 | 否 | 是 |
| 版本支持 | 完整 | 完整 |

**推荐**：生产环境使用 jsDelivr，开发调试使用 unpkg。