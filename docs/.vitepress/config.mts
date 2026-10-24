import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import sidebarEn from './sidebar.en.json'
import sidebarZh from './sidebar.zh.json'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  lang: 'en-US',
  title: 'Hello MySQL',
  description: 'MySQL development notes and practice: SQL, database design, storage internals, architecture, performance tuning and tooling',
  base: '/hello-mysql/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/hello-mysql/favicon.svg' }]
  ],

  // mdbook 遗留的目录文件保留在仓库作映射底稿，不作为页面构建
  srcExclude: ['**/SUMMARY.md'],

  locales: {
    root: { label: 'English', lang: 'en-US' },
    zh: { label: '简体中文', lang: 'zh-CN', link: '/zh/' }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Hello MySQL',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cuihairu/hello-mysql' }
    ],

    footer: {
      message: 'Hello MySQL',
      copyright: '© 2025 cuihairu'
    },

    locales: {
      root: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Basics', link: '/basics/README' },
          { text: 'Database Design', link: '/database-design/README' },
          { text: 'Advanced SQL', link: '/advanced-sql-data-processing/README' },
          { text: 'Internals', link: '/advanced-features-internals/README' },
          { text: 'Architecture', link: '/architecture-deployment/README' },
          { text: 'Performance', link: '/performance-tuning/README' },
          { text: 'Tools', link: '/tools-practice/README' },
          { text: 'Appendix', link: '/appendix/README' },
          { text: 'Knowledge Notes', link: '/knowledge' }
        ],

        sidebar: sidebarEn as never,

        outline: {
          label: 'On this page',
          level: [2, 3]
        },

        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },

        lastUpdated: {
          text: 'Last updated'
        },

        returnToTopLabel: 'Back to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',

        search: {
          provider: 'local',
          options: {
            translations: {
              button: { buttonText: 'Search docs', buttonAriaLabel: 'Search' },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear search query',
                footer: { selectText: 'Select', navigateText: 'Navigate', closeText: 'Close' }
              }
            }
          }
        }
      },

      zh: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '基础笔记', link: '/zh/basics/README' },
          { text: '数据库设计', link: '/zh/database-design/README' },
          { text: '高级SQL', link: '/zh/advanced-sql-data-processing/README' },
          { text: '底层原理', link: '/zh/advanced-features-internals/README' },
          { text: '架构部署', link: '/zh/architecture-deployment/README' },
          { text: '性能调优', link: '/zh/performance-tuning/README' },
          { text: '工具记录', link: '/zh/tools-practice/README' },
          { text: '附录', link: '/zh/appendix/README' },
          { text: '知识点整理', link: '/zh/knowledge' }
        ],

        // 由 mdbook SUMMARY.md 结构映射而来（vitepress-migration/parse_summary.py），
        // 7 个部分 + 未入目录散页归入「附录 · 未入目录」
        sidebar: sidebarZh as never,

        outline: {
          label: '页面导航',
          level: [2, 3]
        },

        docFooter: {
          prev: '上一篇',
          next: '下一篇'
        },

        lastUpdated: {
          text: '最后更新'
        },

        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',

        search: {
          provider: 'local',
          options: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索' },
              modal: {
                noResultsText: '没有找到结果',
                resetButtonTitle: '清除查询条件',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    }
  },

  markdown: {
    lineNumbers: false
  }
}))
