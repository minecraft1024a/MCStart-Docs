# 实例部署辅助系统

这个功能是本程序的核心模块之一，也是最重要的功能之一。

## 实例部署
选项`[F] 实例部署`

程序会自动检查网络链接状态（检测DNS是否可达），然后会要求你选择要部署的实例类型
```

 实例部署助手
 ----------
ℹ️ 检查网络连接...
✅ 网络连接正常

[🤖 Bot类型选择]
请选择要部署的Bot类型：
 [1] MaiBot (默认)
 [2] MoFox_bot
请选择Bot类型 (1/2):  ():
```
- <mark>如果你选择的是 MaiBot （麦麦）</mark>，那么可供你下载的组件有：MaiBot本体（你本体都不下的话，那你部署个啥呢）、适配器（MaiBot-Napcat-Adapter）（虽然目前MaiBot的适配器还是外置的，但据说很快就要合并到主程序里了）、NapCat、MongoDB（前朝余孽）、WebUI（MaiBot-Dashboard，MaiBot控制面板）。
- <mark>如果你选择 MoFox_bot （墨狐）</mark>，那么可供你下载的组件有：MoFox_bot本体、适配器（MoFox_bot-Napcat-Adapter）（墨狐的适配器早就内置了，甭下载，浪费时间）、NapCat、、~~WebUI（等着）~~
- 更多外置组件去看[组件下载](./miscellaneous/components)

::: tip
下载主程序、NapCat、WebUI的时候，会从通过 GitHub API 获取版本列表，如果失败的话，可以尝试<mark>关掉代理软件再手动重试</mark>，获取到版本列表后再打开。如果还是失败，那多半是触碰到速率上线了，等几秒再试。
:::

部署新实例时，会提示你输入实例名称、序列号、QQ号、等参数用于创建配置集。

部署完成时，会询问你是否在文本编辑器中打开实例的配置集文件，如果选择是，程序会自动在文本编辑器中打开实例配置文件，文本编辑器<mark>优先选择 VS Code ，若未安装VS Code，将在 Notepad（记事本）中打开</mark>。关于实例的配置文件，可以参考[📝 配置文件说明](../use/deployment#📝-配置文件说明)。

详细的配置文件配制方法及解释，请在官方文档中心查看

<NCard title="📖 MaiBot" link="https://docs.mai-mai.org/manual/configuration/">
MaiBot （麦麦）的配置与安装简介
</NCard>

<NCard title="📖 MoFox_bot" link="https://docs.mofox-sama.com/docs/guides/bot_config_guide.html">
MoFox-Bot（墨狐）配置文件 (bot_config.toml) 究极详细指南
</NCard>

::: info
VS Code 是一个由微软开发的轻量级开源的代码编辑器，可以免费下载，你可以从[这里](https://code.visualstudio.com/download)下载，也可以用本程序的[组件下载](./miscellaneous/components#VSCode)功能下载安装。
:::

实例部署完成后，你就可以用主程序的选项[**<u>`[A] 运行实例`</u>**](../function/start.md)来启动这个实例了。

::: tip 关于Windows通知
由于 GitHub 服务器在境外，所以在没有代理软件时，部署可能会十分缓慢，为了照顾没有代理软件的用户，方便使用，我们开发了一个 Windows 通知功能，当缓慢的部署流程结束，或出现任何意外情况、需要您做出选择时，我们会向Windows通知中心发送通知以提醒您，这样您既可以在部署期间做您的其他事情，也不会错过任何重要信息。这个功能您可以在[程序设置](../function/miscellaneous/settings#Windows通知)中关闭。
:::
更多详细介绍请查看[实例部署](../use/deployment.md)。