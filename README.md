<div align="center">

# MCStart-Docs

**MaiCore-Start 官方文档项目**

[![VitePress](https://img.shields.io/badge/VitePress-646CFF?style=flat&logo=vite&logoColor=white)](https://vitepress.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v18.18.0+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](LICENSE)

[English](README_EN.md) | 简体中文

</div>

---

## 项目简介

本项目是 **[MaiCore-Start](https://github.com/MaiCore-Start/MaiCore-Start)** 的官方文档仓库，负责文档的编写、维护、更新和部署。

文档采用 **[VitePress](https://vitepress.dev/zh/)** 构建，提供现代化的阅读体验和强大的文档功能。

## 快速开始

### 环境要求

确保你的开发环境满足以下要求：

- **Node.js**: `>= v20.5.0` 或 `>= v18.18.0`
- **npm**: 最新稳定版本

### 安装依赖

克隆项目后，在项目根目录下执行：

```bash
npm install
```

### 本地开发

启动本地开发服务器：

```bash
npm run docs:dev
```

服务器启动后，访问 `http://localhost:5173` 即可预览文档。

### 生产构建

完成修改后，执行以下命令进行生产构建：

```bash
npm run docs:build
```

构建产物将输出到 `.vitepress/dist` 目录。

## 贡献指南

我们欢迎所有形式的贡献！

### 简单修改

如果只需要修改文字、修正错别字或更新简单内容，可以：

1. 直接编辑对应的 Markdown 文件
2. 提交 Pull Request

### 复杂修改

如果需要进行结构调整、添加新页面或其他复杂修改：

1. **熟悉 VitePress**：阅读 [VitePress 官方文档](https://vitepress.dev/zh/guide/what-is-vitepress)
2. **本地开发**：使用 `npm run docs:dev` 实时预览修改
3. **测试构建**：使用 `npm run docs:build` 确保构建成功
4. **提交 PR**：详细描述你的修改内容和目的

### 提交规范

- 使用清晰的提交信息
- 每次提交只包含一个逻辑变更
- 确保文档构建通过后再提交

## 项目结构

```
MCStart-Docs/
├── docs/              # 文档源文件
├── .vitepress/        # VitePress 配置
│   └── config.js      # 站点配置文件
├── package.json       # 项目依赖
└── README.md         # 项目说明
```

## 贡献者

感谢所有为本项目做出贡献的开发者：

- [@xiaoCZX](https://github.com/xiaoCZX) - 项目创建者与主要维护者

## 致谢

本项目受到以下优秀项目的启发：

- [Karin](https://github.com/KarinJS/Karin) - 高性能 Bot 框架
- [NapCatDocs](https://github.com/NapNeko/NapCatDocs) - 文档组织与呈现方式

## 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

---

<div align="center">

**Made with ❤️ by the MaiCore-Start Team**

</div>
