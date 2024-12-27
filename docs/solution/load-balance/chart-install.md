# Chart 安装

本节介绍活字格在集群下的安装。

> [!TIP]
> 活字格的集群安装依赖于包管理器 Helm，如果您还未安装，可以参阅[这里](./helm)进行 Helm 的安装工作。

## 活字格 chart

您可以在活字格的[官方文档](https://www.grapecity.com.cn/solutions/huozige/help/docs/loadbalance/install)下载活字格最新版本的 chart 包。解压后，会得到如下目录：

```text
.
├── Chart.yaml
├── charts
├── templates
│   ├── deployment-fgc.yaml
│   ├── deployment-influx.yaml
│   ├── deployment-redis.yaml
│   ├── pvcs.yaml
│   ├── pvs.yaml
│   ├── service-fgc.yml
│   ├── service-influx.yml
│   └── service-redis.yml
└── values.yaml

```

> [!TIP]
> chart 是 Kubernetes 应用所需要的全部资源定义，因此其本质是全部配置文件的整合。活字格集群所需要的全部资源都被定义在当前目录下的多个文件中。关于 chart 目录以及更详细的说明，可参阅 Helm [官方文档](https://helm.sh/zh/docs/topics/charts/)

### 标准配置

对于活字格的 chart 目录，官方已经定义为标准模板。因此，如果您对于集群本身没有自定义资源的需求，仅需修改`values.yaml` 即可。

```yaml
image:
    repository: armdocker.hzgcloud.com/fgclb/fgc_k8s_arm # 镜像仓库地址
    tag: latest # 镜像仓库中镜像的tag
persistentVolume:
    storage: "100Gi" #存储数据大小
    nfs_atach:
        path: "/nfs_share_client/Forguncy/ForguncyAttach" #附件存储路径
        server: "<your-nfs-server>"
    nfs_log:
        path: "/nfs_share_client/nfs-share/Forguncy/ForguncyLogs" #日志存储路径
        server: "<your-nfs-server>"
    nfs_restore:
        path: "/nfs_share_client/Forguncy/ForguncyRestore" #备份存储路径
        server: "<your-nfs-server>"
    nfs_site:
        path: "/nfs_share_client/Forguncy/ForguncySites" #网站存储路径
        server: "<your-nfs-server>"
    nfs_bin:
        path: "/nfs_share_client/Forguncy/ForguncySitesBin" #网站可执行文件存储路径
        server: "<your-nfs-server>"
```

> [!IMPORTANT]
>
> -   `values.yaml` 文件中的五个 `path` 字段，请配置为您在集群节点上挂载共享目录中对应的路径。
> -   请确保与 nfs 服务器通信正常。

### 自定义配置

-   如果您希望调整 chart 本身的配置信息，请修改 `Chart.yaml`。
-   如果您对于活字格集群资源上有自定义需求，可自行修改目录中的 `templates` 文件夹下的配置。
    -   如果您希望调整活字格服务本身的资源配置，请修改 `deployment-fgc.yaml`。
    -   如果您希望调整内部缓存共享服务 redis 的资源配置，请修改 `deployment-redis.yaml`。
    -   如果您希望调整日志模块的资源配置，请修改 `deployment-influx.yaml`。
    -   如果您希望调整集群中存储卷的配置，请修改 `pv*.yaml`相关的配置文件。
    -   如果您希望调整活字格服务访问相关的配置，请修改 `service*.yaml`相关的配置文件。

> [!NOTE]
> chart 的配置规则完全遵循 Kubernetes 的资源描述。因此配置方式您可以参阅 kubernetes [官方文档](https://kubernetes.io/zh-cn/docs/concepts/)。

## 安装

借助于 Helm 的能力，活字格的安装非常简单，仅需在控制平面节点上执行如下命令即可：

```bash
helm install fgc-server <chartname>.tgz -n fgc-system --create-namespace
```

-   `fgc-server`：release 名称，可自定义。
-   `<chartname>.tgz`：chart 名称。配置文件打包后的产物。当然，您也可以传入 chart 文件所在的路径，如当前目录 `.`。
    > [!TIP]
    > 进入包含 chart 的目录，并运行以下命令：
    >
    > ```bash
    > helm package mychart
    > ```
    >
    > -   mychart 是 chart 的目录名称。
    > -   如果命令执行成功，会在当前目录生成一个 .tgz 文件，例如 mychart-1.0.0.tgz。
-   `-n fgc-system --create-namespace`：指定活字格集群所在的命名空间。如果您已经在指定的命名空间下，可忽略该参数。如果您的命名空间已存在，可忽略后缀 `--create-namespace`。

命令执行成功后，便可查看活字格集群的各个资源初始化情况：

```bash
kubectl get pods,svc -n fgc-system

NAME                                           READY   STATUS    RESTARTS   AGE
pod/fgc-server-forguncy-pod-5f8dcf76fb-ndhsf   1/1     Running   0          9h
pod/fgc-server-influx-pod-65b56f44c8-nm6bm     1/1     Running   0          9h
pod/fgc-server-redis-pod-5684b45b75-fdllr      1/1     Running   0          9h

NAME                                  TYPE       CLUSTER-IP        EXTERNAL-IP   PORT(S)           AGE
service/fgc-server-forguncy-service   NodePort   192.168.194.189   <none>        80:31291/TCP      9h
service/fgc-server-redis-service      NodePort   192.168.194.219   <none>        6379:30918/TCP    9h
service/fgc-server-influx-service     NodePort   192.168.194.245   <none>        22348:30133/TCP   9h
```

当集群中所有 Pod 的状态都为 `Running` 且 Ready 均符合当前的标准数，此时安装顺利完成。现在您可以访问 `fgc-server-forguncy-service` 对外暴露的 `31291` 端口访问活字格服务了。{#expose_service}

> [!NOTE]
> 除非您在 chart 中的 service 配置中明确指定端口，否则 `fgc-server-forguncy-service` 对外暴露的端口是随机的。

### 集群初始化失败

如果您的集群在最后初始化失败，可通过如下方式进行问题的调查：

-   查看 pv，pvc 的初始化情况：

    ```bash
    kubect get pv,pvc -n fgc-system

    ```

    如果您的共享目录配置异常，或者集群中缺少默认的 StorageClass，都可能导致在初始化时申请存储卷时出现错误。

-   查看 Pod 的初始化描述：

    ```bash
    kubect describe pod <pod 名称> -n fgc-system

    ```

    除了 pod，pv、pvc、deployment、node 等各种资源都可以通过 `describe` 命令来查看状态。重点关注最后的 `events` 内容。

-   查看 Pod 内部的日志：

    ```bash
    kubectl logs <pod 名称> -n fgc-system

    ```

    此命令需要 Pod 初始化完成，输出的日志信息为 Pod 内部运行的业务日志信息，例如活字格服务器初始化时的相关日志。
