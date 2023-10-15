import { DefaultTheme, defineConfig } from 'vitepress'
import { baseUrl, github, siteDescription, siteTitle } from './meta'

/* 顶部的导航菜单 */
const nav : DefaultTheme.Config['nav'] = [
  {
    text: '学习指南',
    items: [
      { text: '基础入门', link: '/guide/introduction' },
      { text: '进阶演练', link: '/guide/advanced/server-command' },
      { text: '高阶技巧', link: '/guide/higher/component' },
    ],
    activeMatch: '^/guide'
  },
  {
    text: '最佳实践',
    link: '/standard/introduction',
    activeMatch: '^/standard'
  },
  {
    text: '解决方案',
    link: '/solution/index',
    activeMatch: '^/solution'
  },
  {
    text: `关于`,
    items: [
      {
        text: '活字格官网',
        link: 'https://www.grapecity.com.cn/solutions/huozige'
      },
      {
        text: '葡萄城学院',
        link: 'https://gcdn.grapecity.com.cn/webinars'
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
  '/guide/': [
    {
      text: '开始',
      items: [
        { text: '简介', link: '/guide/introduction' },
        { text: '快速开始', link: '/guide/quick-start' }
      ]
    },
    {
      text: '基础入门',
      items: [
        { text: '数据表', link: '/guide/primary/data-table' },
        { text: '页面设计', link: '/guide/primary/page-design' },
        { text: '布局', link: '/guide/primary/layout' },
        { text: '命令', link: '/guide/primary/command' },
        { text: '值传递', link: '/guide/primary/value-pass' },
        { text: '母版页', link: '/guide/primary/master-page' },
        { text: '数据校验', link: '/guide/primary/verification' },
        { text: '移动端', link: '/guide/primary/mobile' },
        { text: '用户与组织', link: '/guide/primary/user' },
      ]
    },
    {
      text: '进阶演练',
      items: [
        { text: '服务端命令', link: '/guide/advanced/server-command' },
        { text: '计划任务', link: '/guide/advanced/schedule' },
        { text: '工作流', link: '/guide/advanced/workflow' },
        { text: '报表', link: '/guide/advanced/report' },
        { text: '服务端通知', link: '/guide/advanced/websocket' },
        { text: '权限', link: '/guide/advanced/permission' },
        { text: '应用发布', link: '/guide/advanced/release' },
        { text: '服务端管理', link: '/guide/advanced/user-service' },
      ]
    },
    {
      text: '高阶技巧',
      items: [
        { text: '组件', link: '/guide/higher/component' },
        { text: '插件', link: '/guide/higher/plugin' },
        { text: '安全提供程序', link: '/guide/higher/third-support' },
        { text: '自定义编程', link: '/guide/higher/programming' },
        { text: '服务集成', link: '/guide/higher/service-integration' },
      ]
    },
  ],
  '/standard/': [
    { text: '简介', link: '/standard/introduction' },
    { text: '架构设计', link: '/standard/architecture' },
    {
      text: 'UX',
      items: [
        { text: '全局样式', link: '/standard/ux/global-style' },
        { text: '设计模式', link: '/standard/ux/design-pattern' },
        { text: '可视化', link: '/standard/ux/visualization' },
        { text: '图形化', link: '/standard/ux/graphical' }
      ]
    },
    {
      text: '开发',
      items: [
        {
          text: '基础规约',
          items: [
            { text: '命名风格', link: '/standard/dev/naming-style' },
            { text: '数据处理', link: '/standard/dev/data-processing' },
            { text: '异常与日志', link: '/standard/dev/exception-and-log' },
            { text: '注释', link: '/standard/dev/annotation' },
            { text: '组件', link: '/standard/dev/component' },
            { text: '服务端通知', link: '/standard/dev/websocket' },
            { text: '报表', link: '/standard/dev/report' },
            { text: '工作流', link: '/standard/dev/workflow' },
            { text: '文档', link: '/standard/dev/docs' },
          ],
        },
        { text: '数据库',
          items: [
            { text: '选型', link: '/standard/dev/database-selection' },
            { text: '建表规约', link: '/standard/dev/table-created' },
            { text: '索引规约', link: '/standard/dev/table-index' },
            { text: '数据检索', link: '/standard/dev/data-retrieval' }
          ],
        },
        { text: '工程结构', link: '/standard/dev/structure' },
        { text: '协作与版本控制', link: '/standard/dev/cooperation-and-version' },
        { text: '安全性', link: '/standard/dev/safe' },
        { text: '配置管理', link: '/standard/dev/configuration ' }
      ]
    },
    {
      text: '运维',
      link: '/standard/operation/index'
    },
    {
      text: '团队建设',
      link: '/standard/team/index'
    },
    { text: '其他', link: '/standard/other' },
  ],
  '/solution/': [
    { text: '简介', link: '/solution/index' },
  ]
}

/* 网站配置 */
export default defineConfig({

  base: baseUrl,
  title: siteTitle,
  description: siteDescription,
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }]
  ],
  

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
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
    logo: '/favicon.svg',
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
    sidebarMenuLabel: '归档',

    nav,

    sidebar,

    editLink: {
      pattern: `${github}/tree/master/docs/:path`,
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新'
    },

    socialLinks: [
      {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present GrapeCity'
    },
  },
})
