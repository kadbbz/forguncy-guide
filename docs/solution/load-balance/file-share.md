# 文件共享

本节介绍活字格集群下的文件共享。

## 共享路径

活字格负载均衡服务基于共享文件的方式实现，不同服务器访问的是同一份文件数据。在运行活字格服务的容器内部，存放文件数据的路径说明如下：

| 容器内部路径               | 数据说明                   | 共享 或本机 |
| -------------------------- | -------------------------- | ----------- |
| /opt/ForguncyAttach        | 业务系统上传的附件保存路径 | 共享存储    |
| /opt/ForguncyLogs          | 系统日志保存路径           | 共享存储    |
| /opt/ForguncyRestore       | 系统备份数据保存路径       | 共享存储    |
| /opt/ForguncySites         | APP 应用数据保存路径       | 共享存储    |
| /opt/ForguncySitesBin      | APP 程序运行路径           | 共享存储    |
| /opt/ForguncyServer        | 主服务程序运行文件路径     | Pod 独享    |
| /opt/ForguncyServerLBCache | 插件缓存路径               | Pod 独享    |

-   使用共享存储的路径，必须使用共享文件服务器进行持久化存储，放置 Pod 漂移或重启时数据丢失。
-   Pod 独享的路径，请不要存储任何业务数据。

> [!IMPORTANT] 务必留意
> Pod 作为 Kubernetes 运行的最小单位，随时会被销毁、重启以及转移，因此您的任何业务数据都不应当存储在 Pod 中。

## 文件共享服务器

在生产环境下，为确保数据可以更为安全的持久化存储，您需要提供文件共享服务。本节教程将引导您构建基于 NFS 的文件共享服务。

> [!NOTE] NFS
> NFS（Network File System，网络文件系统）是一种分布式文件系统协议。它允许不同机器上的用户通过网络像访问本地文件一样访问远程文件系统。NFS 通常用于共享文件数据，使得多台计算机能够访问同一文件系统。

### NFS 服务器

1. 您需要在您的文件共享服务器上安装 NFS 的服务器程序。

    ::: code-group

    ```bash [CentOS]
    yum install nfs-utils -y
    ```

    ```bash [Ubuntu]
    apt install nfs-kernel-server
    ```

    :::

2. 将您需要共享的目录导出。

    ```bash{10}
    # 创建共享目录
    mkdir -p /nfs_share

    # 为目录配置权限
    chmod -R 777 /nfs_share

    # 编辑 /etc/exports 文件来定义哪些目录将被共享以及如何共享它们：
    vim /etc/exports

    /nfs_share *(rw,sync,no_subtree_check)
    ```

    - `*` ：允许所有客户端访问，也可以用特定的 IP 地址或子网（如 `192.168.1.0/24`）。
    - `rw` ：允许读写访问。
    - `sync` ：数据同步写入磁盘。
    - `no_subtree_check` ：减少子树检查，提高性能。

3. 启动 NFS 服务并设置开机自启

    ```bash
    systemctl start nfs-server
    systemctl enable nfs-server
    systemctl status nfs-serve
    ```

4. 使用 `exportfs` 命令来查看当前导出的文件系统，确认配置正确：

    ```bash
    exportfs -v

    ```

5. 创建活字格集群所需要的共享目录

    > [!IMPORTANT] 共享目录映射
    > 我们需要将活字格 Pod 中 5 个需要共享的路径映射到我们的共享文件目录上。您可以随意命名路径名称，但该路径需要与 Chart 的[配置文件](./chart-install#标准配置)中保持一致。

    ```bash
    mkdir /nfs_share/Forguncy/ForguncyAttach
    mkdir /nfs_share/Forguncy/ForguncyLogs
    mkdir /nfs_share/Forguncy/ForguncyRestore
    mkdir /nfs_share/Forguncy/ForguncySites
    mkdir /nfs_share/Forguncy/ForguncySitesBin
    chmod -R 777 /nfs_share/*
    ```

### NFS 客户端

1. 客户端需要在自身节点上安装 nfs 客户端服务。这里的客户端节点为活字格集群中的所有节点。
   ::: code-group

    ```bash [CentOS]
    yum install nfs-utils -y
    ```

    ```bash [Ubuntu]
    apt install nfs-common -y
    ```

    :::

2. 选择一个需要挂载共享目录的路径，这里直接创建一个路径 `/nfs_share_client`。

    ```bash
    mkdir -p /nfs_share_client
    ```

3. 将共享服务器导出的共享目录挂载至上一步指定的路径上。
    ```bash
    # 10.158.37.76 为示例共享服务器 IP
    mount 10.158.37.76:/nfs_share /nfs_share_client
    ```
4. 进入到共享目录中，查看是否存在创建的活字格映射目录
    ```bash
    ls /nfs_share_client | grep Forguncy
    ```

> [!TIP] 需要移除挂载？
>
> ```bash
> umount /nfs_share_client
> ```
