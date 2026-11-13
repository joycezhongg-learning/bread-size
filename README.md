# 这个面包有多大？ 🍞

网上的 bakery 只写克数，买家想象不出面包实际有多大，也很难判断划不划算。
这个网页让你输入**面包种类 + 克数 + 价格**，然后看到：

- 和参照物（iPhone）并排的尺寸图
- 大约能切几片
- 每 100g 的价格

手机优先、单页、纯 HTML / CSS / JavaScript，不需要安装任何东西。

## 项目结构

```
index.html       页面结构
style.css        样式（手机优先）
app.js           计算 + 画图 + 交互
data/breads.js   面包种类和比容数据（待实测校准）
```

## 本地预览

直接双击 `index.html` 用浏览器打开即可。
想在手机上看：在电脑上运行 `python3 -m http.server 8000`，手机连同一个 Wi-Fi，打开 `http://电脑的IP:8000`。

## 上线（GitHub Pages，免费）

1. 把代码推到 GitHub 仓库
2. 仓库 → Settings → Pages → Source 选 `main` 分支、`/ (root)`
3. 几分钟后网址会是 `https://<你的用户名>.github.io/<仓库名>/`

## 路线图

- [x] v0：项目骨架，基本计算能跑
- [ ] 实测 4–5 种常买面包的比容（称重 + 量尺寸），替换 `data/breads.js` 里的估计值
- [ ] 设计尺寸图：侧视图、可切换参照物（手掌 / iPhone / 信用卡）
- [ ] 真实 1:1 尺寸模式（用信用卡校准屏幕）
- [ ] 多家 bakery 对比（同时输入几个面包，比每 100g 价格）
- [ ] AR 预览（`<model-viewer>`，iOS 需要 USDZ 模型）
