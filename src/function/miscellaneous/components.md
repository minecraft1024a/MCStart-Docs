# 组件下载

没啥好说的，<mark>建议先下载个 VSCode </mark>
```

 组件下载中心
 ----------
                             可下载组件
┏━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━┓
┃  选项  ┃ 组件                 ┃ 描述                 ┃    状态    ┃
┡━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━┩
│  [1]   │ 🟢 Node.js           │ JavaScript运行时环境 │ ✅ 可下载  │
│  [2]   │ 🔵 Visual Studio     │ 轻量级代码编辑器     │ ✅ 可下载  │
│        │ Code                 │                      │            │
│  [3]   │ 🟠 Git               │ 分布式版本控制系统   │ ✅ 可下载  │
│  [4]   │ 💙 Go                │ Go编程语言           │ ✅ 可下载  │
│  [5]   │ 🐍 Python            │ Python编程语言       │ ✅ 可下载  │
│  [6]   │ 🟢 MongoDB           │ NoSQL数据库          │ ✅ 可下载  │
│  [7]   │ 🗄️ SQLiteStudio       │ SQLite数据库管理工具 │ ✅ 可下载  │
│  [8]   │ 🐱 NapCat            │ QQ机器人适配器       │ ✅ 可下载  │
└────────┴──────────────────────┴──────────────────────┴────────────┘

[Q] 返回上级菜单
请选择要下载的组件： ():
```
## 组件官网

- [Node.js](https://nodejs.org/zh-cn/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)
- [Go](https://go.dev/)（我也不知道我为什么要添加它，我也不知道为什么我不添加Rust）
- [Python](https://www.python.org/)
- [MongoDB](https://www.mongodb.com/)
- [SQLiteStudio](https://sqlitestudio.pl/)
- [NapCat](https://napneko.github.io/)

## 主要讲一下 VSCode

<a href="https://code.visualstudio.com/">
    <img src="./VSCode.png" alt="VSCode" width="20%" height="20%">
</a>


### 安装
你可以从官网下载安装包，也可以使用 本程序的组件下载功能安装，VSCode分为User 和 System 两个版本，User版本是安装在用户目录下的，System版本是可以自定义目录的，System版本安装需要是管理员权限，User版本不能以管理员权限安装，<mark>普通本地用户建议安装User版本，服务器上（系统：Windows Server，账户名：Administrator）建议安装System版本</mark>。Linux服务器可以直接用Vim。

### 汉化
安装完成后，打开VSCode，你会发现界面是英文的，这时你需要安装一个插件，

点击左边菜单栏的`扩展`

<div>
    <img src="./VSCode_Extensions.svg" alt="VSCode_Extensions" width="10%" height="10%">
</div>

，搜索`Chinese (Simplified)(简体中文)`插件并安装，安装完成后，重启VSCode，界面就会变成中文了。

### Toml语法高亮

bot的配置文件是toml格式的，但VSCode默认不支持高亮Toml格式的语法（全白文本），所以为了方便你配置文件，你需要安装一个插件。在扩展中搜索`Even Better TOML`并安装，安装完成后，重启VSCode，Toml文件就会有高亮效果（彩色文本）了。

### SQLite 文件支持

这个一般用不上，这个是用于查看SQLite数据库文件（.db文件，也就是bot的数据库文件，如果你需要查看数据库文件，可以安装这个插件）的，在扩展中搜索`SQLite Viewer`并安装，安装完成后，重启VSCode，.db文件就能在VSCode中打开了，这个扩展已经能完全代替SQLiteStudio了。