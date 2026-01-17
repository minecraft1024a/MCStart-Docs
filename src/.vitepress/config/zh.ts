import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-CN',
  description: '基于Python的类人思考智能体的启动器',

  themeConfig: {
    nav: nav(),

    sidebar: sidebarGuide(),

    editLink: {
      pattern: 'https://github.com/MaiCore-Start/MCStart-Docs/edit/main/src/:path',
      text: '在 GitHub 上编辑此页面'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '快速开始',
      link: '/guide/start-install',
      activeMatch: '/guide/'
    },
    {
      text: '关于',
      link: '/other/about',
      activeMatch: '/other/about'
    },
  ]
}

function sidebarGuide(): DefaultTheme.Sidebar {
  return [
    {
      text: '快速开始',
      base: '/guide',
      collapsed: false,
      items: [
        { text: '目录导航', link: '/start-install' },
        { text: '什么是 MCStart', link: '/MCStart' },
        { text: '安装与启动', link: '/install' },
      ]
    },
    {
      text: '使用',
      base: '/use',
      collapsed: false,
      items: [
        { text: '新手使用指南', link: '/use' },
        { text: '实例部署', link: '/deployment' },
        { text: '实例启动', link: '/startup' },
        { text: 'FAQ', link: '/FAQ' },
      ]
    },
    {
      text: '功能详解',
      base: '/function',
      collapsed: false,
      items: [
        { text: '[A] 运行实例/实例多开', link: '/start' },
        {
          text: '[B] 配置管理', 
          base: 'function/config',
          collapsed: true,
          items: [
            { text: '[A] 自动检索', link: '/automatic' },
            { text: '[B] 手动配置', link: '/manual' },
            { text: '[C] 配置管理', link: '/config_manage' },
          ],
        },
        { text: '[C] 知识库构建', link: '/lpmm' },
        { text: '[D] 数据库迁移', link: '/mongodb_to_sqlite' },
        { text: '[F] 实例部署辅助系统', link: '/instance_deployment' },
        { text: '[G] 查看运行状态', link: '/state' },
        { text: '[H] 杂项',
          base: 'function/miscellaneous',
          collapsed: true,
          items: [
            { text: '[A] 关于本程序', link: '/about.md' },
            { text: '[B] 程序设置', link: '/settings' },
            { text: '[C] 组件下载', link: '/components' },
            { text: '[D] 查看实例运行数据', link: '/instance_data' },
          ],
        },
      ]
    },
    {
      text: '其他',
      base: '/other',
      collapsed: false,
      items: [
        { text: '联系', link: '/about' },
        { text: 'README', link: '/README.md' }
      ]
    },
  ]
}
