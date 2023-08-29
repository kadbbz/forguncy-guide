import { DefaultTheme, defineConfig } from 'vitepress'
import {baseUrl, siteTitle, siteDescription, docsVersion, github} from './meta'
 
// https://vitepress.dev/reference/site-config
export default defineConfig({

  base: baseUrl,
  title: siteTitle,
  description: siteDescription,
  
  lastUpdated: true,
  cleanUrls: true,

  markdown: {
    lineNumbers: true,
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: './favicon.svg',
    outline: {
      level: 'deep',
      label: '当前页导航'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '归档',
    
    nav: nav(),
    
    sidebar: {
      '/primary/': { base: '/primary/', items: sidebarGuide() },
      '/reference/': { base: '/reference/', items: sidebarReference() }
    },

    editLink: {
      pattern: `${ github }/tree/master/docs/:path`,
      text: '在 GitHub 上编辑此页'
    },
    
    lastUpdated: {
      text: '最后更新'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    },
  },
  
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '指南',
      link: '/primary/getting-started',
      activeMatch: '/primary/'
    },
    {
      text: '进阶',
      link: '/advanced/index',
      activeMatch: '/advanced/'
    },
    {
      text: '参考',
      link: '/reference/site-config',
      activeMatch: '/reference/'
    },
    {
      text: '活字格官网',
      link: 'https://www.grapecity.com.cn/solutions/huozige'
    },
    {
      text: `v${docsVersion}`,
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
        },
        {
          text: 'Contributing',
          link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md'
        }
      ]
    },
  ]  
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is VitePress?', link: 'what-is-vitepress' },
        { text: 'Getting Started', link: 'getting-started' },
        { text: 'Routing', link: 'routing' },
        { text: 'Deploy', link: 'deploy' }
      ]
    },
    {
      text: 'Writing',
      collapsed: false,
      items: [
        { text: 'Markdown Extensions', link: 'markdown' },
        { text: 'Asset Handling', link: 'asset-handling' },
        { text: 'Frontmatter', link: 'frontmatter' },
        { text: 'Using Vue in Markdown', link: 'using-vue' },
        { text: 'Internationalization', link: 'i18n' }
      ]
    },
    {
      text: 'Customization',
      collapsed: false,
      items: [
        { text: 'Using a Custom Theme', link: 'custom-theme' },
        { text: 'Extending the Default Theme', link: 'extending-default-theme' },
        { text: 'Build-Time Data Loading', link: 'data-loading' },
        { text: 'SSR Compatibility', link: 'ssr-compat' },
        { text: 'Connecting to a CMS', link: 'cms' }
      ]
    },
    {
      text: 'Experimental',
      collapsed: false,
      items: [
        { text: 'MPA Mode', link: 'mpa-mode' },
        { text: 'Sitemap Generation', link: 'sitemap-generation' }
      ]
    },
    { text: 'Config & API Reference', base: '/reference/', link: 'site-config' }
  ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Reference',
      items: [
        { text: 'Site Config', link: 'site-config' },
        { text: 'Frontmatter Config', link: 'frontmatter-config' },
        { text: 'Runtime API', link: 'runtime-api' },
        { text: 'CLI', link: 'cli' },
        {
          text: 'Default Theme',
          base: '/reference/default-theme-',
          items: [
            { text: 'Overview', link: 'config' },
            { text: 'Nav', link: 'nav' },
            { text: 'Sidebar', link: 'sidebar' },
            { text: 'Home Page', link: 'home-page' },
            { text: 'Footer', link: 'footer' },
            { text: 'Layout', link: 'layout' },
            { text: 'Badge', link: 'badge' },
            { text: 'Team Page', link: 'team-page' },
            { text: 'Prev / Next Links', link: 'prev-next-links' },
            { text: 'Edit Link', link: 'edit-link' },
            { text: 'Last Updated Timestamp', link: 'last-updated' },
            { text: 'Search', link: 'search' },
            { text: 'Carbon Ads', link: 'carbon-ads' }
          ]
        }
      ]
    }
  ]
}