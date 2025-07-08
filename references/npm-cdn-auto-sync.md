# NPM CDN 自动同步说明

## 工作原理

### 1. 配置 package.json

```json
{
  "name": "yakbox",
  "version": "1.0.0",
  "jsdelivr": "./dist/chat-window.umd.js"
}
```

### 2. 发布到 npm

```bash
npm publish
```

### 3. 自动可用！

发布后几分钟内，自动可以通过 jsDelivr CDN 访问：

- **jsDelivr**: `https://cdn.jsdelivr.net/npm/yakbox`

## 就是这么简单！

**无需额外操作**：

- ✅ 不需要单独上传到 CDN
- ✅ 不需要额外配置
- ✅ 版本自动同步
- ✅ 全球自动分发

## 时间线

1. `npm publish` → 发布包到 npm
2. 5-10 分钟 → jsDelivr 自动同步
3. 完成！全球可用（包括中国大陆）

## 版本访问

发布后自动支持所有版本访问：

```html
<!-- 最新版本 -->
<script src="https://cdn.jsdelivr.net/npm/yakbox"></script>

<!-- 指定版本（自动可用） -->
<script src="https://cdn.jsdelivr.net/npm/yakbox@1.0.0"></script>

<!-- 版本范围（jsDelivr 特有） -->
<script src="https://cdn.jsdelivr.net/npm/yakbox@^1.0.0"></script>
```

## 注意事项

1. **首次发布**：可能需要 10-15 分钟
2. **私有包**：不会同步（需要 package.json 中 `"private": false`）
3. **文件大小**：单文件不要超过 50MB

## 总结

是的，就是这么简单：

1. 在 package.json 添加 `jsdelivr` 字段
2. `npm publish`
3. 自动同步到全球 CDN！

不需要任何其他操作！
