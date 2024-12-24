# kubectl

kubectl 是使用 Kubernetes API 与 Kubernetes 集群的控制面板进行通信的命令行工具。

您可以通过 kubect 在命令行中直接对 Kubernetes 集群进行交互。

## 安装方式

如果您没有提前安装 kubectl 的话，请在开启 Kubernetes 前进行 kubectl 的安装。

### 包管理器（推荐）

::: code-group

```bash [Red Hat/CentOS]
sudo yum install -y kubectl
```

```bash [Debian/Ubuntu]
sudo apt-get install -y kubectl
```

```bash [MacOS]
brew install kubernetes-cli
```

:::

如果您的系统是 Windows，推荐访问 [Kubernetes 发布页面](https://kubernetes.io/releases/download/#binaries)直接下载特定于您体系结构（如 amd64、arm64 等）下的安装程序。

### 二进制文件安装

```bash
# x86-64
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# arm64
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/arm64/kubectl"

# 安装
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

### 验证

安装完成后，可执行如下命令验证：

```bash
kubectl version --client
```

## 指向环境

如果您拥有不只一个 Kubernetes 环境，例如本地同时安装了 minikube 与 Docker Desktop。可以通过更改上下文信息，确保 kubectl 指向您希望访问的集群环境。

```bash
# 查看当前的上下文列表
kubectl config get-contexts

# 切换上下文指向 从 minikube 转向 docker desktop
kubectl config use-context docker-desktop
```

> [!TIP] 便捷工具
> [kubectx](https://github.com/ahmetb/kubectx) 是一个用于在 kubectl 中更快地在不同上下文（集群）之间切换的工具。
>
> 其效果等价于 `kubectl config use-context`

## 常用命令

常用命令可参考如下示例，更多详情请参考官网：[命令行工具 (kubectl)](https://kubernetes.io/zh-cn/docs/reference/kubectl/)

> [!INFO] 留意
> 在使用命令时需留意当前所在的命名空间。否则 kubectl 默认只获取 default 命名空间下的资源

-   查看集群节点

    ```bash
    kubectl get node
    ```

-   获取集群下的所有命名空间

    ```bash
    kubectl get namespace
    ```

-   查看集群中的 pods，其余资源类似

    ```bash
    kubectl get pod -n <your namespace>
    ```

-   查看资源的运行情况

    ```bash
    kubectl describe pod <pod name> -n <your namespace>
    ```

-   对于已经运行的容器，查看日志

    ```bash
    kubectl logs <pod name> -n <your namespace>
    ```

-   扩容缩容 Pod 数量

    ```bash
    kubectl scale --replicas=3 deploy <deployment name>
    ```
