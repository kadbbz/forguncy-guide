# 基础平台

活字格集群在负载均衡的方案选择上，仍遵循主流开发的标准实践，所依赖的基础平台为 [Kubernetes](https://kubernetes.io/zh-cn/)。

> [!NOTE] Kubernetes
> Kubernetes（简称 K8s）是一个开源的容器编排平台，用于自动化部署、扩展和管理容器化应用。它通过统一的 API 和灵活的架构，支持跨多云和本地环境的高效应用管理，现已成为最为主流的集群构建基础平台框架。活字格集群的部署运维也是依赖于 Kubernetes 进行实现。

## 本地环境

一个标准的 Kubernetes 集群无论是需要的资源还是安装复杂度都较高。在学习和测试的过程中，准备一个轻量的 Kubernetes 环境是很有必要的。

现在存在许多为学习者订制的 Kubernetes 学习环境，其中

-   [minikube](./kubernetes/minikube)
-   [Docker Desktop](./kubernetes/docker-desktop)

以其简单易用的特点成为最受欢迎的两个选择。这两个平台都支持单节点下运行 Kubernetes 环境，并提供与生产环境一致的 Kubernetes 功能，适合学习与调试功能。

## 在线环境

除了本地环境之外，您也可以通过一些 web 服务，在线体验与学习 Kubernetes。

-   [killercoda for kubernetes](https://killercoda.com/playgrounds/scenario/kubernetes)

-   [Play with k8s](https://labs.play-with-k8s.com/)

这些网站会为您提供限时的多节点 Kubernetes 集群体验环境，对于初步接触 Kubernetes 和测试功能的场景提供了较大的便利。

## 集群环境

在生产环境中，可以选择以下安装方式：

-   [标准安装](./kubernetes/manual)

    遵照官方文档标准流程执行安装操作。流程可控，灵活性高，但操作流程复杂。

-   [KubeKey](./kubernetes/kubekey)

    借助第三方工具 KubeKey 进行自动化安装。安装流程简单，但安装版本会有延后。

## 直接开始

如果您已经拥有了自己的 Kubernetes 环境，请开启下一章的学习。
