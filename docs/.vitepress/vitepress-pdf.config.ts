import type {DefaultTheme} from 'vitepress'
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
const routeOrder = [
  '/lb-index',
  '/solution/load-balance/introduction',
  '/solution/load-balance/env-base',
  '/solution/load-balance/platform',
  '/solution/load-balance/file-share',
  '/solution/load-balance/chart-install',
  '/solution/load-balance/config',
  '/solution/load-balance/upgrade',
  '/solution/load-balance/gateway',
  '/solution/load-balance/offline',
  '/solution/load-balance/dashboard',
  '/solution/load-balance/kubernetes/minikube',
  '/solution/load-balance/kubernetes/docker-desktop',
  '/solution/load-balance/kubernetes/kubectl',
  '/solution/load-balance/kubernetes/manual',
  '/solution/load-balance/kubernetes/env-init',
  '/solution/load-balance/kubernetes/container-running',
  '/solution/load-balance/kubernetes/base-tools',
  '/solution/load-balance/kubernetes/master-init',
  '/solution/load-balance/kubernetes/cni',
  '/solution/load-balance/kubernetes/node-join',
  '/solution/load-balance/kubernetes/kubekey',
  '/solution/load-balance/helm',
  '/solution/load-balance/mirror',
]



const headerTemplate = `<div style="margin-top: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: center; align-items: center; color: lightgray; border-bottom: solid lightgray 1px; font-size: 10px;">
  <span class="title"></span>
</div>`

const footerTemplate = `<div style="margin-bottom: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: flex-start; align-items: center; color: lightgray; border-top: solid lightgray 1px; font-size: 10px;">
  <span style="margin-left: 15px;" class="url"></span>
</div>`

export default defineUserConfig({
  outFile: 'forguncy-guide.pdf',
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
  urlOrigin: 'https://fgclibrary.cn',
  sorter: (pageA, pageB) => {
    
    const aIndex = routeOrder.findIndex(route => route === pageA.path)
    const bIndex = routeOrder.findIndex(route => route === pageB.path)
    return aIndex - bIndex
  },
  routePatterns: [
    '**',
    '!/index',
    '!/guide/**',
    '!/standard/**',
    '!/solution/reverse-proxy/**',
    '!/solution/log-monitor/**',
    '!/404.html'
  ]
});