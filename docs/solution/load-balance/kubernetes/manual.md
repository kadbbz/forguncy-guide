# 标准安装

> [!TIP] 我对 Kubernetes 并不熟悉
> 本教程为安装 Kubernetes 集群的标准流程。遵循本流程可以顺利引导构建属于您的 Kubernetes 集群，无需对 Kubernetes 有太多的接触。
>
> 当然，如果您在安装过程中遇到错误，请检查您的操作是否与教程保持一致，并确保您的基础环境和教程相同。或者您对您的环境有准确的把握。

> [!NOTE] 安装流程说明
> 本教程的安装流程遵循官方说明，您可跳转至[官网文档](https://kubernetes.io/zh-cn/docs/setup/production-environment/)做更多了解。

## 示例环境

| 节点名称   | 节点地址    | 功能                                                   |
| :--------- | ----------- | ------------------------------------------------------ |
| k8s-master | 192.168.1.4 | 控制面板节点，负责管理整个集群，包括调度、控制和监控。 |
| k8s-worker | 192.168.1.5 | 工作节点，运行实际的应用工作负载。                     |
| nfs-server | 192.168.1.6 | 文件共享节点，通过 NFS 提供文件共享服务                |
| es-server  | 192.168.1.7 | ElasticSearch 节点，运行日志监控采集分析服务           |

> [!INFO] 系统信息
>
> ```text
>  Distributor ID: Ubuntu
>  Description: Ubuntu 24.04.1 LTS Release: 24.04
>  codename: noble
> ```

## 安装流程

以下是手动安装 Kubernetes 集群的标准流程：

1. 环境初始化

2. 容器运行时

3. 安装工具依赖，包括 kubeadm、kubelet 和 kubectl

4. 初始化控制平面

5. 配置网络插件

6. 添加工作节点

7. 验证集群状态

OK，让我们开始集群的搭建吧！
