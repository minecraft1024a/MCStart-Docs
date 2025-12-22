# 手动配置

进入方式：

主菜单`[B] 🔧 配置管理（新建/修改/检查配置）` → `[B] 📝 手动配置`

这是用于创建您已部署完成的实例的配置集的，使得您可以将其托管在 MCStart 启动器中。

你只需要按照提示，输入一些信息，如配置集名称、QQ号、序列号、版本号、适配器、NapCat、MongoDB、WebUI 的安装情况，以及主程序根目录、适配器根目录。像这样：
```
请选择操作 (): b
请输入新配置集名称： (): test
ℹ️ 开始手动配置...
请输入版本号（如0.7.0或classical,main,dev）： (): 0.11.6
请输入麦麦本体路径： (): D:\MaiCore-Start\test\MaiBot

[🔧 组件安装选择]
请选择需要安装的组件：
是否安装了适配器？(0.6+需要) [y/n]: y
是否安装了NapCat？(QQ连接组件) [y/n]: y
是否安装了MongoDB？(数据库) [y/n]: n
是否安装了WebUI？(Web管理界面) [y/n]: y
请输入适配器路径： (): D:\MaiCore-Start\test\MaiBot-Napcat-Adapter
请输入NapCat路径(NapCatWinBootMain.exe)（可为空）： (): D:\MaiCore-Start\test\NapCat
ℹ️ 跳过MongoDB安装
请输入WebUI路径（可为空）： (): D:\MaiCore-Start\test\MaiBot-Dashboard
请输入配置昵称： (): test
请输入用户序列号： (): test
请输入QQ账号： (): 114514
✅ 配置 'test' 创建成功！
按回车键继续...
```
全部配置完成后，将会自动录入配置集的保存文件，此时返回主菜单，你就可以通过选项[**<u>`[A] 运行实例`</u>**](../start.md)来启动这个实例了。