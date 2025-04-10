<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '../avatar-gerald.jpeg',
    name: 'Gerald Zhang',
    title: 'Creator',
  },
	{
    avatar: '../avatar-eric.png',
    name: 'Eric Liang',
    title: 'Developer',
  },
	{
    avatar: '../avatar-jack.png',
    name: 'Jack Cheng',
    title: 'Developer',
  },
	{
    avatar: '../avatar-joseph.png',
    name: 'Joseph Wang',
    title: 'Developer',
  }
]
</script>

# 常见问题

## 谁在维护该文档？

本文档目前由 GrapeCity 中技术咨询团队负责维护。

<VPTeamMembers size="small" :members="members" />

如果您对文档中的描述存在问题，或者希望为文档的内容贡献自己的力量，请联系我们～


## 应该如何提升自己的前置能力？

面对不同背景、不同基础的用户，我们提供了不同路径下的 [产品能力学习路线](https://www.grapecity.com.cn/solutions/huozige/learningplan)。您可以根据您实际的情况选择合适的路线进行学习。

::: info 📍 INFO
活字格的产品学习资源非常丰富，包括但不限于：
- [新手训练营](https://www.grapecity.com.cn/solutions/huozige/xunlianying)；
- [资源中心](https://www.grapecity.com.cn/solutions/huozige/help#resources)；
- [官方论坛](https://gcdn.grapecity.com.cn/forum.php?mod=forumdisplay&fid=194)；
- [葡萄城市场](https://marketplace.grapecity.com.cn/huozige_home)。
:::

## 不推荐使用的功能为什么不从设计器中删除？

为了保证历史版本的兼容性，活字格在功能迭代时，会优先选择将历史的特性进行保留。不过从实践的角度出发，新特性是更优选择。

