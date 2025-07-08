# CDN 使用示例

## UMD 格式使用（推荐用于快速集成）

### 基础示例

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chat Window CDN 示例</title>

    <!-- 引入依赖 -->
    <script
      crossorigin
      src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"
    ></script>

    <!-- 引入 Tailwind CSS (组件样式依赖) -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- 引入 Chat Window 组件 -->
    <script src="https://cdn.jsdelivr.net/npm/yakbox@latest/dist/chat-window.umd.js"></script>
  </head>
  <body>
    <div id="app"></div>

    <script>
      const { ChatWindow } = window.ChatWindow;
      const { createElement } = React;
      const { createRoot } = ReactDOM;

      // 创建应用
      const App = () => {
        return createElement(ChatWindow, {
          title: '在线客服',
          placeholder: '请输入您的问题...',
          onSendMessage: (message) => {
            console.log('发送消息:', message);
          },
        });
      };

      // 渲染到页面
      const root = createRoot(document.getElementById('app'));
      root.render(createElement(App));
    </script>
  </body>
</html>
```

### 使用 JSX（需要 Babel）

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- 引入 Babel 用于解析 JSX -->
    <script src="https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"></script>

    <!-- 其他依赖同上 -->
    <script
      crossorigin
      src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"
    ></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chat-window@latest/dist/chat-window.umd.js"></script>
  </head>
  <body>
    <div id="app"></div>

    <script type="text/babel">
      const { ChatWindow } = window.ChatWindow;

      function App() {
        const handleSend = (message) => {
          console.log('Message sent:', message);
          // 这里可以发送到服务器
        };

        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <ChatWindow
              title="技术支持"
              placeholder="描述您遇到的问题..."
              currentUserId="user-123"
              onSendMessage={handleSend}
            />
          </div>
        );
      }

      const root = ReactDOM.createRoot(document.getElementById('app'));
      root.render(<App />);
    </script>
  </body>
</html>
```

## ESM 格式使用（现代浏览器）

### 使用 ES Modules

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Chat Window ESM 示例</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="app"></div>

    <script type="module">
      // 使用 ESM 格式
      import React from 'https://esm.sh/react@18';
      import ReactDOM from 'https://esm.sh/react-dom@18/client';
      import { ChatWindow } from 'https://esm.sh/chat-window';

      const App = () => {
        return React.createElement(ChatWindow, {
          title: 'ESM 示例',
          onSendMessage: console.log,
        });
      };

      const root = ReactDOM.createRoot(document.getElementById('app'));
      root.render(React.createElement(App));
    </script>
  </body>
</html>
```

## 在各种平台中使用

### CodePen 示例

```html
<!-- HTML -->
<div id="root"></div>

<!-- CSS -->
<!-- 添加 Tailwind CSS CDN -->

<!-- JS (Babel) -->
const { ChatWindow } = window.ChatWindow; function App() { return
<ChatWindow title="CodePen Demo" />; } ReactDOM.render(<App />, document.getElementById('root'));
```

### WordPress 集成

```php
// functions.php
function add_chat_widget() {
    // 依赖
    wp_enqueue_script('react',
        'https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js'
    );
    wp_enqueue_script('react-dom',
        'https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js'
    );

    // Chat Window
    wp_enqueue_script('chat-window',
        'https://cdn.jsdelivr.net/npm/chat-window/dist/chat-window.umd.js',
        array('react', 'react-dom')
    );

    // 初始化脚本
    wp_add_inline_script('chat-window', '
        document.addEventListener("DOMContentLoaded", function() {
            const { ChatWindow } = window.ChatWindow;
            const container = document.getElementById("wp-chat-widget");
            if (container) {
                const root = ReactDOM.createRoot(container);
                root.render(React.createElement(ChatWindow, {
                    title: "WordPress 客服"
                }));
            }
        });
    ');
}
add_action('wp_enqueue_scripts', 'add_chat_widget');
```

## CDN 选择建议

1. **jsDelivr** (推荐): `https://cdn.jsdelivr.net/npm/chat-window@latest/dist/chat-window.umd.js`
   - 中国可访问
   - 更快的全球 CDN
   - 自动压缩
   - 自动从 npm 同步
   - 支持版本锁定

2. **自托管**: 下载文件到自己的服务器
   - 完全控制
   - 无外部依赖
   - 适合内网环境
