import { DefaultTheme, defineConfig } from 'vitepress'
import { baseUrl, siteDescription, siteTitle } from './meta'

/* 顶部的导航菜单 */
const nav: DefaultTheme.Config['nav'] = [
  {
    text: '开发规约',
    link: '/standard/introduction',
    activeMatch: '^/standard'
  },
  {
    text: `关于`,
    items: [
      {
        text: '活字格官网',
        link: 'https://www.grapecity.com.cn/solutions/huozige'
      },
      {
        text: '开发者学堂',
        link: 'https://learn.grapecity.com.cn/'
      },
      {
        text: '葡萄城市场',
        link: 'https://marketplace.grapecity.com.cn/'
      }
    ]
  },
]

/* 左侧菜单 */
const sidebar: DefaultTheme.Config['sidebar'] = {
  '/standard/': siderbarStandard(),
}

// 标准化的左侧菜单
function siderbarStandard() {
  return [
    { text: '简介', link: '/standard/introduction' },
    { text: '术语说明', link: '/standard/idioms' },
    {
      text: '架构',
      items: [
        { text: '系统架构', link: '/standard/arch/sys-arch' },
        { text: '生命周期', link: '/standard/arch/life-cycle' },
        { text: '部署方案', link: '/standard/arch/deployment' },
        { text: '可用性', link: '/standard/arch/robustness' },
      ]
    },
    {
      text: 'UI & UX',
      items: [
        { text: '设计原则', link: '/standard/design/principle' },
        {
          text: '样式',
          collapsed: true,
          items: [
            { text: '主题色', link: '/standard/design/style/theme' },
            { text: '布局', link: '/standard/design/style/layout' },
            { text: '字体', link: '/standard/design/style/typeface' },
          ]
        },
        {
          text: '模式',
          collapsed: true,
          items: [
            { text: '距离', link: '/standard/design/model/distance' },
            { text: '对齐', link: '/standard/design/model/alignment' },
            { text: '页面', link: '/standard/design/model/page' },
            { text: '反馈', link: '/standard/design/model/feedback' },
          ]
        },
      ]
    },
    {
      text: '开发',
      items: [
        { text: '开发原则', link: '/standard/dev/principle' },
        {
          text: '基础规约',
          collapsed: true,
          items: [
            { text: '命名风格', link: '/standard/dev/base/naming-style' },
            { text: '界面设计', link: '/standard/dev/base/page-design' },
            { text: '业务处理', link: '/standard/dev/base/business' },
            { text: '异常捕获', link: '/standard/dev/base/exception' },
            { text: '组件复用', link: '/standard/dev/base/component' },
            { text: '文档注释', link: '/standard/dev/base/docs' },
          ],
        },
        {
          text: '数据库',
          collapsed: true,
          items: [
            { text: '类型选择', link: '/standard/dev/database/selection' },
            { text: '模型设计', link: '/standard/dev/database/domain' },
            { text: '数据检索', link: '/standard/dev/database/retrieval' }
          ],
        },
        { text: '工程扩展', link: '/standard/dev/expansion' },
        { text: '协同开发', link: '/standard/dev/cooperation' },
        {
          text: '配置管理',
          collapsed: true,
          items: [
            { text: '用户权限', link: '/standard/dev/configuration/permission' },
            { text: '应用配置', link: '/standard/dev/configuration/application' },
          ],
        },

      ]
    },
    {
      text: '运维',
      items: [
        { text: '系统维护', link: '/standard/operation/system' },
        { text: '数据治理', link: '/standard/operation/data' },
        { text: '服务配置', link: '/standard/operation/service' },
      ],
    },
    { text: '常见问题', link: '/standard/question' },
  ]
}

/* 网站配置 */
export default defineConfig({

  base: baseUrl,
  title: siteTitle,
  description: siteDescription,

  head: [
    ['link', { rel: 'icon', href: '/forguncy-icon.png' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-JPQJY2Z57W' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JPQJY2Z57W');`
    ]
  ],

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    container: {
      tipLabel: 'TIP',
      warningLabel: 'WANNING',
      dangerLabel: 'DANGER',
      infoLabel: 'NOTE',
      detailsLabel: 'DETAILS'
    },
    lineNumbers: true,
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    },
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,
    logo: '/forguncy-icon.png',
    search: {
      provider: 'local',
    },

    /* 当前页右侧导航目录 */
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
    sidebarMenuLabel: '目录',

    nav,

    sidebar,

    lastUpdated: {
      text: '最后更新'
    },
    footer: {
      message: '<span>Released under the MIT License.</span>',
      copyright: 'Copyright © 2023-present GrapeCity Software'
    },
  },
})
