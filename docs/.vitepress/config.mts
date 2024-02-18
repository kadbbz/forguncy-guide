import { DefaultTheme, defineConfig } from 'vitepress'
import { baseUrl, github, siteDescription, siteTitle } from './meta.mts'

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
    text: '标准化',
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
            { text: '主题色', link: '/standard/design/theme' },
            { 
              text: '布局',
              collapsed: true,
              items: [
                { text: '总览', link: '/standard/design/layout/' },
                { text: '画布标定', link: '/standard/design/layout/canvas' },
                { text: '适配方案', link: '/standard/design/layout/adapt' },
                { text: '网格单位', link: '/standard/design/layout/grid' },
                { text: '常用模度', link: '/standard/design/layout/modulus' },
              ]
            },
            { text: '字体', link: '/standard/design/typeface' },
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
    // {
    //   text: '团队建设',
    //   link: '/standard/team/index'
    // },
    { text: '常见问题', link: '/standard/question' },
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
    ['link', { rel: 'icon',href: '/favicon.svg' }]
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
    sidebarMenuLabel: '归档',

    nav,

    sidebar,

    // editLink: {
    //   pattern: `${github}/tree/master/docs/:path`,
    //   text: '在 GitHub 上编辑此页'
    // },

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
