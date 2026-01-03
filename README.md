# 壁纸世界

一个精美的壁纸网站，提供各类高清壁纸免费下载。

## 项目简介

壁纸世界是一个纯静态的壁纸分享网站，提供多种分类的高清壁纸下载，包括风景、动漫、电影、游戏、水墨画等。网站界面简洁美观，响应式设计，支持多种设备访问。

## 功能特性

- 多种壁纸分类：风景、动漫、电影、游戏、水墨画、其他
- 精美的轮播图展示
- 响应式设计，支持移动端和桌面端
- 搜索功能（UI 已实现）
- 分类浏览
- 关于页面介绍

## 技术栈

- HTML5
- CSS3（自定义样式 + Bootstrap 4.4.1）
- JavaScript（jQuery 3.7.1）
- Bootstrap 4.4.1

## 项目结构

```
.
├── index.html              # 首页
├── categories.html         # 分类页
├── about.html              # 关于页
├── anime.html              # 动漫分类
├── game.html               # 游戏分类
├── movie.html              # 电影分类
├── ink.html                # 水墨画分类
├── other.html              # 其他分类
├── scenery.html            # 风景分类
├── assets/
│   ├── css/
│   │   └── style.css       # 自定义样式
│   └── js/
│       └── main.js         # 主要 JavaScript
├── bootstrap-4.4.1-dist/   # Bootstrap 框架文件
├── js/
│   └── jQuery-3.7.1.js     # jQuery 库
└── image/                  # 壁纸图片资源
    ├── 动漫/
    ├── 游戏/
    ├── 电影/
    ├── 水墨画/
    ├── 风景/
    └── 其他/
```

## 使用方法

1. 克隆或下载本项目
2. 直接在浏览器中打开 `index.html` 文件
3. 或使用本地服务器运行（推荐）

### 使用本地服务器

可以使用以下方式启动本地服务器：

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js (http-server):**
```bash
npx http-server
```

然后在浏览器中访问 `http://localhost:8000`

## 浏览器支持

- Chrome（推荐）
- Firefox
- Safari
- Edge
- 其他现代浏览器

## 作者

2375351829

## 许可证

本项目仅供学习交流使用。

## 更新日志

- 初始版本发布
