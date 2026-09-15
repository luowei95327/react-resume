# 一份动态简历

左边"敲"出一份 CSS，右边同时渲染出 Markdown 简历——仿 [strml.net](http://strml.net/) 的动态简历页面，用 React + Redux 实现。

预览： https://luowei95327.github.io/react-resume/

## 特性

- 打字机动画：样式表与简历内容逐字出现，动画中有「跳过动画」按钮，并尊重系统的 `prefers-reduced-motion` 设置
- 样式可编辑：动画结束后左侧 CSS 面板可直接修改，右侧简历实时重排
- 简历内容用 Markdown 书写，渲染结果经过净化，链接自动加上 `rel="noopener noreferrer"`
- 提供打印样式，可以直接 Cmd/Ctrl + P 打印或另存为 PDF

## 环境要求

- Node.js 20 或更高版本（CI 使用 22）
- pnpm（仓库声明了 `packageManager: pnpm@11.19.0`）

## 运行

```bash
pnpm install
pnpm dev        # 本地开发，默认 http://localhost:5173
pnpm build      # 产物输出到 build/
pnpm preview    # 预览 build/ 产物
```

质量检查：

```bash
pnpm lint       # ESLint（含 react-hooks 规则）
pnpm test       # Vitest + jsdom
```

## 定制自己的简历

编辑 `src/assets/data.js`：

- `introduce`：Markdown 格式的简历正文
- `styles`：分三段播放的 CSS，最后一段结束后左侧面板变为可编辑

## 目录结构

```
src/
  assets/data.js              简历内容与样式脚本
  components/
    Resume.jsx                动画编排（requestAnimationFrame）
    StyleSheet.jsx            左侧 CSS 面板（Prism 高亮，可编辑）
    Introduce.jsx             右侧简历面板（Markdown 渲染）
  hooks/useAutoScrollToEnd.js 滚动到底部
  lib/
    markdown.js               marked + DOMPurify 渲染管线
    typing.js                 动画时长与逐字显示计算
  redux/                      内容、样式、渲染模式的状态
```

## 部署

`pnpm build` 生成静态产物到 `build/`，把该目录发布到 GitHub Pages 或任意静态托管即可。注意 `build/` 需要重新生成后再提交/发布，不要直接引用仓库根目录的 `index.html`（那是给 Vite 开发服务器用的入口）。

## 关于安全

marked 会原样透传 Markdown 里的 HTML 与 `javascript:` 链接，且其 `sanitize` 选项已被移除，因此所有渲染都经过 `src/lib/markdown.js` 里的 DOMPurify 白名单。若要接入外部内容（CMS、接口、他人提供的数据），请保持这条管线不变，并考虑在托管层再加一层 CSP。

Fork 自 https://github.com/luowei95327/react-resume
