# 下载我们的软件

## V4.2.1

- 优化新手引导，添加API获取教程
- 优化配置集UI，添加批量管理功能

<br>
<NCard title="📥 下载V4.2.1版本" link="./MaiCoreStart-v4.2.1-beta-Install.exe">
安装 MCStart 的V4.2.1版本
</NCard>

## V4.2.0
- 实现基于Git的部署逻辑
- 更新适配器选择逻辑，统一使用最新版启动器（main分支）
- 新增新手引导任务
- 添加基于Git的插件管理逻辑（仅支持MaiBot）

<br>
<NCard title="📥 下载V4.2.0版本" link="./MaiCoreStart-v4.2.0-beta-Install.exe">
安装 MCStart 的V4.2.0版本
</NCard>

## V4.1.5

### 实现内置/外部 WebUI 检测的复合 WebUI 管理系统

- 添加用于外部 WebUI 安装的 WebUI 下载器组件
- 实现基于版本的内置 WebUI 检测（>=0.12.2/main/dev 分支）
- 重构 WebUI 启动流程：内置版本使用代理端口 8001，外部版本使用独立端口 
- 使用 Rich 组件和重试机制增强下载进度显示 
- 更新组件管理器以支持新的 WebUI 下载器
- 改进部署和配置系统中对机器人类型的识别
- 为内置 WebUI 版本添加多实例端口冲突解决方案
- 更新 MoFox-Core 和存储库引用
- 增强启动器以区分内置和外部 WebUI 的处理方式
- 修复并优化细节

::: note 重大变更
WebUI 配置处理方式已重构。内置 WebUI 版本自动使用代理端口 8001，而外部 WebUI 版本沿用之前的独立端口模型。现有配置将根据版本检测自动进行适配。
:::

<br>
<NCard title="📥 下载V4.1.5版本" link="./MaiCoreStart-v4.1.5-beta-Install.exe">
安装 MCStart 的V4.1.5版本
</NCard>

## V4.1.4
### **修复了上一版本的C++依赖问题，这次采用C语言编写，更节省空间**
- **添加MoFoxWebUI的部署功能**
- 优化MoFox部署逻辑
- 修复无法打开MoFox的内置适配器配置文件打不开的问题
- 添加打开实例所在目录的功能

<br>
<NCard title="📥 下载V4.1.4版本" link="./MaiCoreStart-v4.1.4-beta-Install.exe">
安装 MCStart 的V4.1.4版本
</NCard>

## V4.1.3
- 使用C++编写的启动程序和虚拟环境创建程序，缩小程序体积
- 优化部分菜单文本

:::caution 警告！
### 当前版本由于启动模块使用C++编写，依赖C++运行库，因此缺失本地C++运行库的计算机可能无法正常使用。
### 修复版将在下次更新时推出。
:::

<NCard title="📥 下载V4.1.3版本" link="./MaiCoreStart-v4.1.3-beta-Install.exe">
安装 MCStart 的V4.1.3版本
</NCard>

## V4.1.2

### V4.1.1+V4.1.2

**优化改进**
- 修复Windows通知的依赖库需要本地编译的问题
- 添加进程监控的刷新频率设置 #4 
- 修复MaiBot控制面板的部署BUG

**新增功能**
- 添加更加严格的Python版本检测机制
- 新增实例多开功能，智能分配端口

<NCard title="📥 下载V4.1.2版本" link="./MaiCoreStart-v4.1.2-beta-Install.exe">
安装 MCStart 的V4.1.2版本
</NCard>

## V4.1.0

**架构升级**
- 重构为面向对象设计
- 引入模块化组件系统
- 使用 structlog 记录结构化日志
- 基于 rich 的现代化命令行 UI

**新增功能**
- Web 控制面板支持（Dashboard）
- 系统托盘最小化
- Windows 通知集成
- 组件下载管理器（Python / Node.js / MongoDB 等）
- 实例运行数据统计

**优化改进**
- 启动速度提升约 30%+
- 内存占用降低约 20%
- 错误诊断信息更完整、定位更精准
- 配置验证流程更完善，减少配置类错误

:::caution 警告！
 ### 当前版本由于Windows通知中心所使用的依赖库需要本地编译，因此缺失本地C++编译环境的计算机可能无法正常使用。
 ### 修复版将在下次更新时推出。
:::

<NCard title="📥 下载V4.1.2版本" link="./MaiCoreStart-v4.1.0-beta-Install.exe">
安装 MCStart 的V4.1.2版本
</NCard>

## V4.0.0.3新生代 (Next-Gen)

**V4.0.0.3** 标志着 MaiMbot Initiate 的一次彻底进化。我们告别了传统的脚本模式，迎来了一个基于 Python 的、完全模块化的、面向对象的应用程序架构。这不仅仅是一次版本更新，更是一次新生的重构，旨在提供前所未有的稳定性、可扩展性和用户体验。

---

##### **核心亮点**

* **🚀 全新架构**：从底层完全重写，采用现代化的面向对象设计，代码结构更清晰，可维护性大幅提升。
* **🧩 组件化启动**：将麦麦本体、适配器、NapCat、MongoDB、WebUI 等核心服务抽象为独立的“可启动组件”，实现按需、动态、灵活的启动组合。
* **🌐 可视化配置**：引入基于 Web 的可视化配置编辑器，现在您可以在浏览器中轻松管理和修改所有实例配置（可能吧）。
* **📊 进程状态管理**：新增独立的进程状态监控面板，可以实时查看由启动器启动的所有相关进程（如 `bot.py`, `mongod.exe` 等）的运行状态，并支持一键全部终止(没人测试,有问题记得报告)。
* **🎨 现代化 UI**：全面拥抱 `rich` 库，重制了所有命令行界面，提供更美观、更直观的彩色输出、表格和交互提示。

---

##### **详细变更列表**

**一、 架构与核心**

* **语言与范式迁移**：
  * 从过程式的 Python 脚本 (`main_refactored.py`) 演进为完全的面向对象应用程序 (`class MaiMaiLauncher`)。
  * 引入结构化日志系统 (`structlog`)，所有操作均有详细、规范的日志记录，极大地方便了问题排查。
* **模块化设计**：
  * **UI 分离**：将界面（`src/ui`）、核心逻辑（`src/modules`）和工具函数（`src/utils`）完全解耦。
  * **配置管理**：`config_manager.py` 专职负责 TOML 文件的读写与管理。
  * **启动逻辑**：`launcher.py` 内部实现了高度封装的组件启动与进程管理逻辑。

**二、 功能增强**

* **动态启动菜单**：
  * 启动器会根据您当前实例的配置，动态生成启动选项。例如，只有在配置了 `adapter_path` 后，才会出现“启动麦麦 + 适配器”的选项。
  * 新增“全栈启动”模式，一键启动当前实例所有已配置的可用组件。
* **WebUI 支持**：
  * 正式将 WebUI 纳入启动器管理体系，可作为独立组件与其他服务一同启动。
* **虚拟环境支持**：
  * 启动器会自动检测并优先使用项目目录（或指定路径）下的 Python 虚拟环境，保证了运行环境的纯净与隔离。
* **插件管理框架 (预览)**：
  * 虽然功能尚在开发中，但已内置了完整的插件管理UI流程框架，包括为指定实例安装、卸载和浏览插件，为未来的功能扩展奠定了基础(4.1会有的会有的)。

**三、 用户体验 (UI/UX) 优化**

* **界面重制**：
  * 所有菜单、提示信息、表格均使用 `rich` 库重新渲染，视觉效果和可读性显著提升。
  * 引入了统一的颜色与符号主题 (`src/ui/theme.py`)，界面风格一致且专业。
* **交互改进**：
  * 使用 `rich.prompt` 替代原生 `input()`，提供更友好的输入体验。
  * 关键操作（如删除、迁移）均有二次确认，防止误操作。
* **清晰的组件状态**：
  * 在启动菜单中，会清晰地展示每个组件（如 NapCat, WebUI）是否已配置和可用。

---

##### **已知问题**

* **插件管理**：插件管理功能目前仅包含用户界面和交互流程，尚未与后端逻辑完全对接，将在后续版本中逐步完善。

---

##### V4.0.0.1 - V4.0.0.3

- 向后兼容，优化安装包
- 添加新建虚拟环境时的winerror5的问题解决补丁
- 解决了那些把程序安装到C盘结果权限不足的入的问题

<NCard title="📥 下载V4.0.0.3版本" link="./MaiCoreStart-v4.0.0.3-beta-Install.exe">
安装 MCStart 的V4.0.0.3版本
</NCard>

## 版本集合

| 版本号 | 描述 | 下载 |
| --- | --- | --- |
| V4.2.1 | 最新版本，推荐 | [MaiCoreStart-v4.2.1-beta-Install.exe](./MaiCoreStart-v4.2.1-beta-Install.exe) |
| V4.2.0 | 旧版本 | [MaiCoreStart-v4.2.0-beta-Install.exe](./MaiCoreStart-v4.2.0-beta-Install.exe) |
| V4.1.5 | 旧版本 | [MaiCoreStart-v4.1.5-beta-Install.exe](./MaiCoreStart-v4.1.5-beta-Install.exe) |
| V4.1.4 | 旧版本 | [MaiCoreStart-v4.1.4-beta-Install.exe](./MaiCoreStart-v4.1.4-beta-Install.exe) |
| V4.1.3 | 旧版本，不推荐 | [MaiCoreStart-v4.1.3-beta-Install.exe](./MaiCoreStart-v4.1.3-beta-Install.exe) |
| V4.1.2 | 旧版本 | [MaiCoreStart-v4.1.2-beta-Install.exe](./MaiCoreStart-v4.1.2-beta-Install.exe) |
| V4.1.0 | 旧版本，不推荐 | [MaiCoreStart-v4.1.0-beta-Install.exe](./MaiCoreStart-v4.1.0-beta-Install.exe) |
| V4.0.0.3 | 旧版本 | [MaiCoreStart-v4.0.0.3-beta-Install.exe](./MaiCoreStart-v4.0.0.3-beta-Install.exe) |
|

