# kubeadm、kubelet 与 kubectl

本节介绍 Kubernetes 基础软件包：kubeadm、kubelet 与 kubectl 的安装。

> [!TIP] 🎯 目标节点
> 所有操作面向集群所有节点

## 安装

您需要在每台节点机器上安装以下的软件包：

-   kubeadm：用来初始化集群的指令。

-   kubelet：在集群中的每个节点上用来启动 Pod 和容器等。

-   kubectl：用来与集群通信的命令行工具。

> [!NOTE] 务必留意
>
> 三个软件包的版本请确保一致，避免因为版本偏差导致一些预料之外的错误和问题。
>
> 此外，如果您的包管理器未配置 Kubernetes 的仓库地址，请参阅[这里](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#installing-kubeadm-kubelet-and-kubectl)进行配置。

::: code-group

```bash [Ubuntu]
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
# 锁定版本号避免自动更新
sudo apt-mark hold kubelet kubeadm kubectl

# 设置开机启动
sudo systemctl enable --now kubelet
```

```bash [CentOS]
sudo yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes

# 设置开机启动
sudo systemctl enable --now kubelet
```

:::

此时 kubelet 每隔几秒就会重启，因为它陷入了一个等待 kubeadm 指令的死循环。这是正常现象，当我们将集群的控制平面初始化成功后，kubelet 的状态就会恢复正常。
