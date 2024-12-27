# Helm

[Helm](https://helm.sh/zh/docs/) 是 Kubernetes 的包管理器，就像 CentOS 中的 `yum` 或者 Ubuntu 中的 `apt` 一样，帮助开发者和运维人员更为高效便捷地定义、安装和管理 Kubernetes 应用。

Helm 使用一种称为 `Chart` 的打包格式来描述应用的 Kubernetes 资源和相关的元信息，简单来说，Helm 中的应用都是`Chart`格式。通过管理 `Chart`包，简化了复杂应用的部署流程。

## 安装

> [!IMPORTANT]
> 想成功和正确地使用 Helm，需要以下前置条件：
>
> -   一个 Kubernetes 集群
> -   本地的 `kubectl`

> [!TIP]
> 为了更为便捷的管理 Kubernetes 中的应用，建议将 Helm 安装在控制平面所在的节点上。

Helm 项目提供了两种获取和安装 Helm 的方式。这是官方提供的获取 Helm 发布版本的方法。另外，Helm 社区提供了通过不同包管理器安装 Helm 的方法。

### 二进制安装（推荐）

1. 下载[需要的版本](https://github.com/helm/helm/releases)。
2. 解压文件。
    ```bash
    tar -zxvf helm-v3.0.0-linux-amd64.tar.gz
    ```
3. 在解压目录中找到 helm 程序，移动到指定目录 `/usr/local/bin/helm` 中
    ```bash
    mv linux-amd64/helm /usr/local/bin/helm
    ```
4. 验证是否安装成功
    ```bash
    helm version
    ```

### 使用脚本安装

Helm 提供了安装脚本，可以自动拉取最新版本并本地安装

```bash
$ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

### 包管理器安装

Helm 社区提供了通过操作系统包管理器安装 Helm 的方式。您可以参阅[官方文档](https://helm.sh/zh/docs/intro/install/#%E9%80%9A%E8%BF%87%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8%E5%AE%89%E8%A3%85)。

## 使用

在 Helm 中存在三大概念：

-   `Chart` 代表着 Helm 包，它包含了运行在 Kubernetes 中应用所具有的所有资源定义。
-   `Repository` 用来存放和共享 Chart 的地方。您可以把它理解为线上的共享仓库。
-   `Release` 是运行在 Kubernetes 集群中的 Chart 实例。每次安装/升级，都会生成一个新的 release。

概括来说：Helm 会安装 charts 到 Kubernetes 集群中，每次安装都会创建一个新的 release。您可以在 repository 找到您想要安装的 chart。

### 常用命令

您可以通过如下命令对 Kubernetes 的应用进行管理。活字格的服务也是通过这些 Helm 命令完成安装与升级的工作。

-   `helm install`：安装一个 helm 包。

```bash
helm install <release 名称> <chart 名称 或者 包地址>
```

-   `helm uninstall`：卸载 release。

```bash
helm uninstall <release 名称>
```

-   `helm upgrade` 与 `helm rollback`：升级 release 和失败时回滚。

```bash
helm upgrade -f <要更新的配置文件> <release 名称> <chart 名称 或者 包地址>
```

-   `helm repo` 与 `helm search`：配置 helm 的仓库以及在仓库中查询应用包。

```bash
# 查询仓库列表
helm repo list

# 添加新的仓库
helm repo add <仓库地址>

# 移除仓库
helm repo remove <仓库地址>
```
