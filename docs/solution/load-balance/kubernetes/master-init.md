# 初始化控制平面

本节介绍通过 kubeadm 初始化集群的控制平面。

> [!TIP]
> 🎯 本节操作面向控制平面节点。

## 配置信息（可选）

1. 使用 kubeadm 命令生成默认的配置文件

```bash
kubeadm config print init-defaults > kubeadm-config.yaml
```

2. 请关注/修改如下配置项：
    - `advertiseAddress`：修改为控制面板节点的 IP。
    ```yaml{2}
    localAPIEndpoint:
      advertiseAddress: 192.168.1.4,
      bindPort: 6443
    ```
    - `imageRepository`：修改为您的仓库地址。
    ```yaml{1}
    imageRepository: hzg.harbor.local/google_containers
    kind: ClusterConfiguration
    ```
    - `kubernetesVersion`：修改为您要安装的 Kubernetes 版本号。
    ```yaml{1}
    kubernetesVersion: 1.31.3
    ```
    - `serviceSubnet` 与 `podSubnet`：分配网络地址。我们需要为集群内部的服务和 Pod 分配对应的网段。{#pod-subent-anchor}
    ```yaml{3,4}
    networking:
      dnsDomain: cluster.local
      serviceSubnet: 192.168.0.0/16
      podSubnet: 192.169.0.0/16
    ```
3. 修改完成后保存配置，并提前预拉取镜像。

```bash
kubeadm config images pull --config=kubeadm-config.yaml
```

## 初始化控制平面

直接执行如下命令，指定配置文件初始化控制平面：

```bash
kubeadm init --config=kubeadm-config.yaml
```

当然，如果您未在第一步初始化配置文件，也可以直接通过命令行参数，将配置在命令行中进行指定：

```bash
kubeadm init \
--apiserver-advertise-address=192.168.1.4  \
--control-plane-endpoint=k8s-master \
--kubernetes-version=v1.31.3 \
--service-cidr=192.168.0.0/16 \
--pod-network-cidr=192.169.0.0/16 \
--cri-socket=unix:///run/containerd/containerd.sock \
--image-repository=hzg.harbor.local/google_containers
```

初始化成功后，您会在控制台中看到如下信息：

```bash{4-6,10}
Your Kubernetes control-plane has initialized successfully!
To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.0.163:6443 --token abcdef.0123456789abcdef \
--discovery-token-ca-cert-hash
sha256:50b63996388eb4bd55819701e2d53aa34ad892842b7009837c100f4632f25e08
```

其中，高亮的部分表示您需要按照提示，在您的控制平面节点下执行的命令。

至此，您的 Kubernetes 集群中控制平面初始化顺利完成。您可以通过 `kubectl` 命令查看集群状态了。

```bash
kubectl get nodes
```
