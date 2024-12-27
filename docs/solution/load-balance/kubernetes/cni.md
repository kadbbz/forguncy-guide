# 网络插件

本节介绍为您的 Kubernetes 集群配置容器网络接口（CNI）。

> [!TIP]
> 🎯 本节操作面向控制平面节点。

## CNI

CNI (Container Network Interface) 是 Kubernetes 网络的重要组成部分。其定义了网络插件需要实现的接口，使容器运行时能够与网络插件进行交互。主要负责在 Pod 创建时配置网络，在 Pod 删除时清理网络。

目前常见的 CNI 插件有：

-   Calico
-   Flannel
-   Canal

本节教程介绍的是 Calico 的安装。

> [!IMPORTANT]
> 您必须部署一个基于 Pod 网络插件的容器网络接口（CNI）， 以便集群中的 Pod 可以相互通信。在安装网络之前，集群 DNS (CoreDNS) 将不会启动。

## Calico

Calico 是一套开源的网络和网络安全方案，用于容器、虚拟机、宿主机之间的网络连接，可以用在 Kubernetes 平台上。

您已经在上一节将控制平台初始化成功，这意味安装 Calico 时，可以直接利用 Kubernetes 的配置安装能力。关于更为详细的安装说明，可参阅[官方文档](https://docs.tigera.io/calico/latest/getting-started/kubernetes/quickstart#install-calico)。

### tigera-operator

Calico 在新版更新后，已经弃用直接通过配置文件的方式初始化本体了。需要先安装 `tigera-operator` 作为 Calico 的控制器。`tigera-operator` 会管理 Calico 相关组件的部署、配置与升级。

```bash
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.29.1/manifests/tigera-operator.yaml
```

> [!TIP]
> 上述命令是直接调用官方线上的配置文件进行安装。如果无法访问线上的配置地址，可访问该[地址](https://docs.projectcalico.org/manifests/tigera-operator.yaml)，将其配置内容保存至您的设备上的 `yaml` 文件。

### 自定义配置

下载默认配置，按照您的集群信息修改配置内容：

```bash
wget https://raw.githubusercontent.com/projectcalico/calico/v3.29.1/manifests/custom-resources.yaml
```

> [!TIP]
> 如果命令失败，可切换成如下命令进行下载：
>
> ```bash
> curl https://projectcalico.docs.tigera.io/manifests/custom-resources.yaml -O
> ```

请确保配置的 `cidr`的值，和您在初始化控制平台时，指定的 Pod 的 [IP 网段（`podSubnet`）](./master-init#pod-subent-anchor) 保持一致。

```yaml{7}
...上文配置...
spec:
  calicoNetwork:
    ipPools:
    - name: default-ipv4-ippool
      blockSize: 26
      cidr: 192.169.0.0/16
...下文配置...
```

### 安装

配置完成后，直接运行如下命令进行安装：

```bash
kubectl apply -f custom-resources.yaml

# 稍等片刻后，查看 Pod 运行情况
kubectl get pod -A
```
