import type { DefaultTheme } from 'vitepress'
import { defineUserConfig } from "vitepress-export-pdf"

import userConfig from './config.js'

function extractLinksFromConfig(config: DefaultTheme.Config) {
  const links: string[] = []

  function extractLinks(sidebar: DefaultTheme.SidebarItem[]) {
    for (const item of sidebar) {
      if (item.items)
        extractLinks(item.items)

      else if (item.link)
        links.push(`${item.link}.html`)
    }
  }

  for (const key in config.sidebar)
    extractLinks(config.sidebar[key])
  return links
}

const links = extractLinksFromConfig(userConfig.themeConfig!)

const targetExportPath = ['/standard']

function filterRoutesByPaths(routes: string[], paths: string[]): string[] {
  return routes.filter(route =>
    paths.some(path => route.startsWith(path))
  );
}

const exportPaths = filterRoutesByPaths(links, targetExportPath)

const headerTemplate = `<div style="margin-top: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: center; align-items: center; color: lightgray; border-bottom: solid lightgray 1px; font-size: 10px;">
  <span class="title"></span>
</div>`

const footerTemplate = `<div style="margin-bottom: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: flex-start; align-items: center; color: lightgray; border-top: solid lightgray 1px; font-size: 10px;">
  <span style="margin-left: 15px;" class="url"></span>
</div>`

export default defineUserConfig({
  outFile: '周黑鸭低代码咨询-标准化方案.pdf',
  outDir: 'output-pdf',
  pdfOptions: {
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate,
    footerTemplate,
    margin: {
      bottom: 60,
      left: 25,
      right: 25,
      top: 60,
    },
  },
  // 如果希望 pdf 的外链生效，请释放当前配置
  // urlOrigin: 'https://forguncyse.github.io',
  urlOrigin: 'http://localhost',
  sorter: (pageA, pageB) => {
    // 应用前缀，匹配应用路径。如果前缀修改，请同步修该变量值
    const prefix = "/forguncy-guide"
    const aIndex = exportPaths.findIndex(route => {
      const path = route.endsWith('.html') ? route.slice(0, -5) : route
      return prefix + path === pageA.path
    })
    const bIndex = exportPaths.findIndex(route => {
      const path = route.endsWith('.html') ? route.slice(0, -5) : route
      return prefix + path === pageB.path
    })
    return aIndex - bIndex
  },
  routePatterns: [
    '**',
    '!/forguncy-guide/index',
    // '!/forguncy-guide/standard-index',
    '!/forguncy-guide/standard/question',
    '!/forguncy-guide/guide/**',
    // '!/forguncy-guide/standard/**',

    '!/404.html',
    // '/forguncy-guide/solution/load-balance/kubernetes/minikube'
  ]
});