# KubeKey

本节介绍使用第三方工具：由 [KubeSphere](../dashboard#kubesphere) 提供的脚手架 KubeKey 进行 Kubernetes 集群的安装。

> [!IMPORTANT]需要留意
> 从标准化与流程化出发，当前 KubeKey 支持一键安装的 Kubernetes 版本号仅支持到 V1.28.0，且对于安装机器的要求版本也较低。如果您希望安装更新版本的 Kubernetes，请选择[标准安装](./manual)的方式。

您可以使用任何节点作为任务机来执行安装任务，也可以在安装之前或之后根据需要新增节点（例如，为了实现高可用性）。

-   **Control plane node**：主节点，通常托管控制平面，控制和管理整个系统。
-   **Worker node**：工作节点，运行部署在工作节点上的实际应用程序。

## 准备机器

### 系统要求

-   Ubuntu 16.04，18.04，20.04
-   Debian Buster，Stretch
-   CentOS 7.x
-   Red Hat Enterprise Linux 7
-   SUSE Linux Enterprise Server 15 /openSUSE Leap 15.2

### 节点要求

-   所有节点必须都能通过 `SSH` 访问。
-   所有节点时间同步。
-   所有节点都应使用 `sudo`/`curl`/`openssl`/`tar`。

### 容器运行时

集群必须有一个可用的容器运行时。如果您使用 KubeKey 搭建集群，KubeKey 会默认安装最新版本的 Docker。或者，您也可以在创建集群前手动安装 Docker 或其他容器运行时。

| 容器运行时 | 版本号  |
| ---------- | ------- |
| Docker     | 19.3.8+ |
| containerd | 最新版  |

### 网络和 DNS

-   请确保 `/etc/resolv.conf` 中的 DNS 地址可用，否则，可能会导致集群中的 DNS 出现问题。
-   请关闭防火墙，或者配置特定的端口通信。
-   支持的 CNI 插件：Calico 和 Flannel。

本示例包括以下两台主机，其中主节点作为任务机：

| 主机 IP        | 主机名     | 角色                |
| :------------- | :--------- | :------------------ |
| 198.19.249.234 | k8s-master | control plane, etcd |
| 198.19.249.72  | k8s-node   | worker              |

## 下载 KubeKey

```bash
# 可以正常访问 Github
curl -sfL https://get-kk.kubesphere.io | VERSION=v3.0.7 sh -

# 否则
export KKZONE=cn
curl -sfL https://get-kk.kubesphere.io | VERSION=v3.0.7 sh -
```

## 安装依赖项

```bash
sudo apt install socat conntrack ebtables ipset -y
```

## 创建并修改配置项

1. 创建配置文件。如果不指定版本号，默认为 v1.23.10

    ```bash
    ./kk create config --with-kubernetes v1.23.10
    ```

2. 编辑配置文件。关于配置的详细说明，请参考[官方文档](https://github.com/kubesphere/kubekey/blob/master/docs/config-example.md)

```yaml
apiVersion: kubekey.kubesphere.io/v1alpha2
kind: Cluster
metadata:
    name: kube-fgc
spec:
    hosts:
        - {
              name: k8s-master,
              address: 198.19.249.234,
              internalAddress: 198.19.249.234,
              user: gerald,
              password: "your-password",
          }
        - {
              name: k8s-node,
              address: 198.19.249.72,
              internalAddress: 198.19.249.72,
              user: gerald,
              password: "your-password",
          }
    roleGroups:
        etcd:
            - k8s-master
        control-plane:
            - k8s-master
        worker:
            - k8s-node
        registry:
            - k8s-master
    controlPlaneEndpoint:
        domain: lb.kubesphere.local
        address: ""
        port: 6443
    kubernetes:
        version: v1.23.10
        clusterName: cluster.local
        autoRenewCerts: true
        containerManager: docker
    etcd:
        type: kubekey
    network:
        plugin: calico
        kubePodsCIDR: 10.233.64.0/18
        kubeServiceCIDR: 10.233.0.0/18
        multusCNI:
            enabled: false
    registry:
        privateRegistry: ""
        namespaceOverride: ""
        registryMirrors: ["your-registry-mirrors"]
        insecureRegistries: []
    addons: []
```

## 执行安装脚本

```bash
./kk create cluster -f config-sample.yaml
```

## 卸载集群

如果您希望卸载由 KubeKey 安装的集群。请务必使用安装时的脚本，否则卸载过程中会出现不可预估的问题。

```bash
./kk delete cluster -f config-sample.yaml
```
