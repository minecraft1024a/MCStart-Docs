import type { FooterData } from '@theojs/lumen'

export const Footer_Data: FooterData = {
  author: { name: 'MaiCore-Start', link: 'https://github.com/MaiCore-Start' },
  group: [
    {
      title: '友情链接',
      icon: 'fa-solid fa-lightbulb',
      links: [
        { name: '麦麦（MaiCore）文档中心', link: 'https://docs.mai-mai.org' },
        { name: '墨狐（MoFox_bot）文档中心', link: 'https://docs.mofox-sama.com/' },
        { name: '硅基流动（SiliconFlow）', link: 'https://cloud.siliconflow.cn/i/JSydmfX7' },
      ],
    },
    {
      title: 'bot插件',
      icon: 'fa-solid fa-puzzle-piece',
      links: [
        { name: '麦麦插件市场', link: 'https://plugins.maibot.chat/' },
        { name: '墨狐插件市场', link: 'https://plugin.mofox-sama.com/' },
      ],
    },
    {
      title: '社区',
      icon: 'fa-solid fa-expand',
      links: [
        { name: 'MaiCore 答疑一群', link: 'https://qm.qq.com/q/jaR1OEuwhO' },
        { name: 'MaiCore 答疑二群', link: 'https://qm.qq.com/q/MZJYVYEP0i' },
        { name: '墨狐交流群', link: 'https://qm.qq.com/q/AKoGi0u8ta' },
        { name: '麦麦测试交流群', link: 'https://qm.qq.com/q/k0fh8rXEu4' },
      ],
    },
  ],
}
