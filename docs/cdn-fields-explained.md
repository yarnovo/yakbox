# package.json 中的 CDN 字段说明

## CDN 字段配置

在 `package.json` 中，我们配置了 CDN 相关的字段：

```json
{
  "jsdelivr": "./dist/chat-window.umd.js"
}
```

## 字段说明

### jsdelivr 字段

- **作用**：告诉 jsDelivr CDN 服务默认提供哪个文件
- **访问方式**：`https://cdn.jsdelivr.net/npm/@course-gen/chat-window`
- **特点**：
  - 全球 CDN，中国可访问
  - 自动压缩和优化
  - 支持版本锁定：`https://cdn.jsdelivr.net/npm/@course-gen/chat-window@1.0.0`
  - 支持版本范围：`https://cdn.jsdelivr.net/npm/@course-gen/chat-window@^1.0.0`

## 为什么都指向 UMD 文件？

因为 CDN 使用场景通常是：

- 通过 `<script>` 标签直接引入
- 无需构建工具
- 需要立即可用

UMD 格式正好满足这些需求。

## 使用示例

### jsDelivr

```html
<!-- 最新版本 -->
<script src="https://cdn.jsdelivr.net/npm/@course-gen/chat-window"></script>

<!-- 指定版本 -->
<script src="https://cdn.jsdelivr.net/npm/@course-gen/chat-window@1.0.0"></script>

<!-- 访问其他文件 -->
<script src="https://cdn.jsdelivr.net/npm/@course-gen/chat-window/dist/chat-window.es.js"></script>
```

## jsDelivr 优势

- **全球访问**：包括中国大陆
- **自动优化**：自动压缩和优化
- **高可用性**：多 CDN 提供商冗余
- **版本管理**：支持版本锁定和版本范围
- **零配置**：自动从 npm 同步
