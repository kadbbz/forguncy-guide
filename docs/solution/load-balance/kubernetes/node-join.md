# 添加工作节点

本节介绍为您的 Kubernetes 集群加入控制节点。

> [!TIP] 🎯 目标节点
> 本节操作面向工作节点。

## 加入集群

当您初始化控制平台成功后，控制台会输出如下信息：

```bash{3-5}
Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.0.163:6443 --token abcdef.0123456789abcdef \
--discovery-token-ca-cert-hash
sha256:50b63996388eb4bd55819701e2d53aa34ad892842b7009837c100f4632f25e08
```

高亮的命令就是您需要复制到工作节点中执行的命令。该命令将当前的节点加入到 Kubernetes 集群中。

> [!IMPORTANT] 务必留意
> 请确保您的工作节点已经完成[环境准备](./env-init)、[containerd](./container-running.md)、[kubeadm](./base-tools.md)、[kubelet](./base-tools.md) 以及 [kubectl](./base-tools.md) 的安装工作。

在当前节点执行完 join 命令后，可回到控制平台节点，执行如下命令查看是否加入成功：

```bash
kubectl get node
```
