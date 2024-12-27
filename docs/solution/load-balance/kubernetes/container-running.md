# 容器运行时

容器运行时是容器生态中的一个核心组件，它负责容器的具体运行和管理。它抽象了底层操作系统资源，提供了一种轻量级的方式来启动和管理应用程序容器。我们所熟悉的 docker，只是容器运行时的一种。

主流容器运行时

-   Docker Engine：曾是容器运行时的标准实现，集镜像管理和容器运行于一体。
-   containerd：从 Docker 项目中分离出来的轻量级运行时，专注于核心运行功能。
-   CRI-O：专为 Kubernetes 的 CRI（容器运行时接口）设计的运行时，轻量、专注。
-   runc：OCI（开放容器标准）规范的低级容器运行时，执行容器的创建和管理。

Kubernetes 在早期版本支持 Docker 作为默认的容器运行时，但其架构逐渐过渡为支持 CRI（Container Runtime Interface），以支持多种运行时并增强灵活性。因此，在现在的主流 Kubernetes 版本中，官方已经推荐使用 containerd 作为标准的容器运行时了。

本节介绍容器运行时 containerd 的安装。

> [!TIP]
> 🎯 所有操作面向集群所有节点

## containerd 安装

[containerd 官方](https://github.com/containerd/containerd/blob/main/docs/getting-started.md)推荐了两种安装方式：

-   二进制安装
-   包管理器安装

### 二进制安装

> [!NOTE]
> 如果您的安装环境是离线环境，请选择本方式进行安装，否则推荐[包管理器](#包管理器安装)。

如果您选择使用二进制的方式进行安装，请确保下载并安装如下 3 个二进制包，下载时请确认您的版本和架构信息：

-   [containerd](https://github.com/containerd/containerd/releases)：containerd 的主程序

    > [!IMPORTANT]
    >
    > 1. 下载后请将二进制包解压至指定路径 `/usr/local`
    >     ```bash
    >     tar Cxzvf /usr/local containerd-1.6.2-linux-amd64.tar.gz
    >     ```
    > 2. Kubernetes 要求使用 systemd 来启动容器运行时，因此，我们务必要下载 [`containerd.service`](https://raw.githubusercontent.com/containerd/containerd/main/containerd.service)，并将其导至 `/usr/local/lib/systemd/system/containerd.service`。之后运行如下命令：
    >     ```bash
    >     systemctl daemon-reload
    >     systemctl enable --now containerd
    >     ```

-   [runc](https://github.com/opencontainers/runc/releases)：用来执行容器的创建和管理
    > [!IMPORTANT]
    >
    > 下载后请将安装包直接安装到路径 `/usr/local/sbin/runc`
    >
    > ```bash
    > install -m 755 runc.amd64 /usr/local/sbin/runc
    > ```
-   [CNI 插件](https://github.com/containernetworking/plugins/releases)：容器之间的网络通信插件
    > [!IMPORTANT]
    >
    > 下载后请将安装包解压至指定路径 `/opt/cni/bin`
    >
    > ```bash
    > $ mkdir -p /opt/cni/bin
    > $ tar Cxzvf /opt/cni/bin cni-plugins-linux-amd64-v1.1.1.tgz
    > ```

### 包管理器安装

::: code-group

```bash [CentOS]
sudo dnf install containerd.io
```

```bash [Ubuntu]
sudo apt install containerd.io
```

:::

> [!NOTE]
>
> `containerd.io` 软件包包含 `runc`，但不包含 CNI 插件。

> [!TIP]
>
> containerd.io 的 DEB 和 RPM 格式软件包由 Docker（而非 containerd 项目）分发。您需要设置 `apt-get` 或 `dnf/yum` 的存储库才可以安装 containerd.io 软件包。具体配置的方法请参阅 Docker 的[帮助手册](https://docs.docker.com/engine/install/#supported-platforms)

## 启动 containerd 服务

安装完成后，输入如下命令启动 containerd：

```bash
sudo systemctl enable containerd

sudo systemctl start containerd
```

可通过如下方式进行验证：

```bash
# 查看 containerd 状态
systemctl status containerd

# 查看 ctr 的版本信息
sudo ctr version
```

## 修改配置属性

此时的 containerd 虽然已经运行起来，但是如果希望和 Kubernetes 集群配合使用，您仍需要做一些配置上的调整。

1. 生成一份默认的配置文件

```bash
sudo mkdir -p /etc/containerd && \
    sudo containerd config default > /etc/containerd/config.toml
```

2. 进入配置文件中，修改配置信息

```bash
vim /etc/containerd/config.toml
```

3. 配置文件中有如下几处需要留意/修改：

    - `sandbox_image`：该属性用于配置 Kubernetes 的 pause 镜像地址。请将版本变更为您需要安装的对应版本地址。

    ```bash
    sandbox_image = "registry.k8s.io/pause:3.9"
    ```

    - `SystemdCgroup`：Kubernetes 的 cgroup 需要与操作系统、容器运行时保持一致，默认统一为 systemd，需要 containerd 开启 systemd。

    ```bash{2}
    [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
    SystemdCgroup = true
    ```

    > [!TIP]
    >
    > 在 containerd 的最新几个版本中，已经默认为 systemd。如果您的配置文件中没有 SystemdCgroup 属性且您不确定的话，可以手动添加该属性。需要留意其所在的层级。

    - `config_path`：配置镜像加速地址（可选）。
      containerd 默认从 docker.io 进行镜像的拉取。如果您的网络访问 docker.io 不便，需要手动配置您自己的镜像加速地址：{#containerd-registry}

    ```bash{2}
    [plugins."io.containerd.grpc.v1.cri".registry]
    config_path = "/etc/containerd/certs.d"
    ```

    > [!NOTE]
    >
    > 配置项 `/etc/containerd/certs.d` 是手动在 `/etc/containerd` 目录下创建的目录。此规则是 containerd 提供的自定义镜像源方式：即在配置文件的目录下自定义 registry server 目录。`certs.d` 中存放的都是需要代理的仓库源，每个源一个路径，具体的配置保存在 `hosts.toml` 中。更多说明请参考[官方文档](https://github.com/containerd/containerd/blob/main/docs/hosts.md)。
    >
    > 这里直接使用 `_default` 配置默认镜像加速，镜像加速为私有化仓库 [Harbor](../offline#harbor) ，您可以变更为您自己的加速地址。示例如下：
    >
    > ```bash
    >  # 创建默认加速目录
    >  mkdir -p /etc/containerd/certs.d/_default
    >
    >  # 将仓库地址写入到配置文件 hosts.toml 中
    >  cat > /etc/containerd/certs.d/_default/hosts.toml << EOF
    >  [host."https://hzg.harbor.local"]
    >    capabilities = ["pull", "resolve"]
    >    # 如果是 http，请置为 true
    >    skip_verify = false
    >  EOF
    > ```

4. 配置完成后，重启 containerd 服务

```bash
systemctl restart containerd

# 拉取镜像进行测试
ctr i pull docker.io/library/nginx:alpine
```
