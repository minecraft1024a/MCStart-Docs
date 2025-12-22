import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import { InlineLinkPreviewElementTransform } from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import {
  PageProperties,
  PagePropertiesMarkdownSection,
} from '@nolebase/vitepress-plugin-page-properties/vite'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import taskLists from 'markdown-it-task-lists'
import { defineConfig } from 'vitepress'
import timeline from 'vitepress-markdown-timeline'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export const shared = defineConfig({
  title: 'MCStart',
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  vite: {
    ssr: {
      noExternal: ['@nolebase/*'],
    },
    server: {
      port: 8850,
      host: '0.0.0.0',
      cors: true,
      proxy: {
        // 代理API请求，解决跨域问题
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
        // 代理WebSocket连接
        '/ws': {
          target: 'ws://localhost:3000',
          changeOrigin: true,
          ws: true,
        },
      },
    },
    plugins: [
      GitChangelog({
        maxGitLogCount: 2000,
        repoURL: () => 'https://github.com/MaiCore-Start/MCStart-Docs',
      }),
      GitChangelogMarkdownSection({
        exclude: (id) => id.endsWith('index.md'),
        sections: {
          // 禁用页面历史
          disableChangelog: false,
          // 禁用贡献者
          disableContributors: true,
        },
      }) as any,
      PageProperties(),
      PagePropertiesMarkdownSection({
        excludes: ['index.md'],
      }),
      groupIconVitePlugin({
        customIcon: {
          ts: 'logos:typescript',
          js: 'logos:javascript', //js图标
          md: 'logos:markdown', //markdown图标
          css: 'logos:css-3', //css图标
        },
      }),
    ],
  },
  markdown: {
    math: true,
    config: (md) => {
      // 时间线
      md.use(timeline)
      // 任务列表
      md.use(taskLists)
      // 行内链接预览
      md.use(InlineLinkPreviewElementTransform)
      // 代码组图标
      md.use(groupIconMdPlugin)
    },
    codeTransformers: [transformerTwoslash() as any],
    // Explicitly load these languages for types hightlighting
    languages: ['js', 'jsx', 'ts', 'tsx'] as any,
  },

  sitemap: {
    hostname: 'https://docs.mmcstart.cn:8848/',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    },
  },

  /* prettier-ignore */
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/assets/logos/icon_light.png'
      }
    ],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/logos/icon_light.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/logos/icon_light.png' }],
    ['link', { rel: 'mask-icon', href: '/assets/logos/icon_light.png', color: '#5bbad5' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
  ],

  themeConfig: {
    logo: { src: '/assets/logos/icon_light.png', width: 24, height: 24 },
    //开启本地搜索
    search: {
      provider: 'local',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/MaiCore-Start/MaiCore-Start' }],
  },
})
