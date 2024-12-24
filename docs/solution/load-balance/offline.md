# 离线安装

本节介绍在离线环境下安装活字格集群。

## 包管理器

请确保您的内网机器中包含包管理器。

-   如果您拥有私有化的镜像包源，请确保内网节点中的包管理器可以正常连接到您的镜像包源。
-   如果您的系统是纯净版，在安装的过程中可能存在部分基础库的缺失，可自行下载相应的安装包手动进行安装。
    -   yum 包管理器对应的包格式为 `rpm`
    -   apt 包管理器对应的包格式为 `dep`

## DNS

请明确您内网的 DNS 地址，确保机器之间的地址解析是正常的。

## 私有化镜像仓库

离线环境最大的问题就是镜像以及相关依赖无法直接从网络上下载，因此您需要提前将依赖包以及镜像进行下载，并带入至离线环境中。

在安装过程中，框架只会从仓库中读取镜像，因此，您需要构建一个本地的镜像仓库，讲下载好的镜像导入镜像仓库中。之后配置仓库地址为私有化的仓库即可。

### Harbor

[Harbor](https://goharbor.io/docs/2.12.0/install-config/) 是一个开源的企业级容器镜像仓库，用于存储、管理和分发容器镜像，同时提供安全性和性能优化的功能。是市面上私有化镜像仓库的首选。

#### 前提条件

-   `Docker`：Harbor 服务对于 docker 是强依赖，因此您需要在镜像仓库节点上优先安装 docker 服务。安装方式可参考[文档](https://docs.docker.com/engine/)。
    > [!NOTE] 无法安装 Docker Desktop？
    > Docker Desktop 是安装 docker 最便捷的方式，但如果您的环境只有终端，那么需要手动安装 docker 的各项依赖，其中，docker engine 与 docker compose 是必须要安装的。
-   `OpenSSL`：安装过程中对 OpenSSL 有依赖，需要提前在节点上进行安装。

-   节点的物理架构：harbor 官方最新版仅提供 amd64 的安装包。如果您的设备是 arm64 架构，需要选择第三方的编译安装包。可访问[地址](https://github.com/wise2c-devops/build-harbor-aarch64/releases)进行下载。

#### 安装

1. 将下载好的离线安装包进行解压

    ```bash
    tar -zxvf harbor-offline-installer-aarch64-v2.10.2.tgz
    ```

2. 将解压后的镜像导入至 docker 中：

    ```bash
    docker load -i harbor.v2.10.2.tar.gz
    ```

3. 按需修改配置文件

    ```bash
    mv harbor.yml.tmpl harbor.yml

    vim harbor.yml
    ```

配置文件中包含了访问的 hostname 与相应服务的密码。密码可以按需修改，也可以后续进入系统中修改。hostname 如配置域名，请提供相关证书。

4. 在 harbor 目录下直接运行脚本

    ```bash
    ./prepare && ./install.sh
    ```

5. 安装成功后可访问定义好的 hostname 进行访问。harbor 默认映射到 80 端口。

#### 开机自启

harbor 的 主容器会自动重启，但是有几个依赖容器并没有加入到重启策略中。因此需要手动触发 docker-compose 来确保所有容器统一重启。

1. 在 `/lib/systemd/system` 中创建 `harbor.service`。

    ```txt
    [Unit]
    Description=Harbor
    After=docker.service systemd-networkd.service systemd-resolved.service
    Requires=docker.service
    Documentation=http://github.com/vmware/harbor

    [Service]
    Type=simple
    Restart=on-failure
    RestartSec=5
    ExecStart=/usr/local/bin/docker-compose -f /opt/harbor/docker-compose.yml up
    ExecStop=/usr/local/bin/docker-compose -f /opt/harbor/docker-compose.yml down

    [Install]
    WantedBy=multi-user.target
    ```

    其中 `/opt/harbor/docker-compose` 为 harbor 的安装目录。

2. 开启 service

    ```bash
    systemctl enable harbor
    systemctl start harbor
    ```

### 推送本地镜像至仓库

已经下载好的本地镜像需要导入到镜像仓库，才能被真正使用。

1.  使用 `docker load` 命令将本地镜像推送至 Docker 中。

    示例，将导出到本地的活字格镜像 `fgc_k8s_arm.tar` 进行导入：

    ```bash
    docker load -i fgc_k8s_arm.tar
    ```

    > [!TIP] 从 docker 导出镜像
    > 可以使用命令 docker save 命令，将 docker 中已有的镜像导出到本地。方便镜像在系统间转移。
    >
    > 示例，将活字格镜像 `armdocker.hzgcloud.com/fgclb/fgc_k8s_arm:10.0.103.0` 保存到 `fgc_k8s_arm.tar` 文件：
    >
    > ```bash
    > docker save -o fgc_k8s_arm.tar armdocker.hzgcloud.com/fgclb/fgc_k8s_arm:10.0.103.0
    > ```

2.  为导入后的镜像打标签。

    示例，为活字格镜像进行标签标记：

    ```bash
    docker tag armdocker.hzgcloud.com/fgclb/fgc_k8s_arm:10.0.103.0 hzg.harbor.local/k8s/fgc_k8s_arm:10.0.103.0
    ```

    -   `armdocker.hzgcloud.com/fgclb/fgc_k8s_arm:10.0.103.0` : 导入的活字格镜像。您也可以直接输入镜像 ID。

    > [!IMPORTANT] 镜像标签
    > 标签是镜像的版本标识。通过标签，您可以明确标识镜像的具体版本以及所归属的环境仓库。镜像标签的命名规则并不是严格的。但为了确保可读性和统一性，需要遵循一些最佳实践：
    >
    > -   标签名的格式通常为：`<repository>:<tag>`。
    >
    >     其中：
    >
    >     -   `<repository>` 是镜像的仓库名（例如 `armdocker.hzgcloud.com/fgclb/fgc_k8s_arm`）。
    >
    >         仓库名需要和实际的路径严格匹配。docker 会根据仓库名去对应的路径获取镜像。
    >
    >     -   `<tag>` 是镜像的标签（例如 `10.0.103.0`, `latest`）。
    >
    > -   标签是大小写敏感的。

    通过 `tag` 命令，将导入的活字格镜像重新标记了新的标签。新标签的仓库名修改为本地的 harbor 仓库对应的路径：`hzg.harbor.local/k8s/fgc_k8s_arm` 。

    标签成功后，您会在 docker 镜像列表中看到两个镜像 ID 相同但名称不同的活字格镜像。因此后续操作请使用 `镜像名称:版本号` 的方式指定镜像，不要使用镜像 ID，避免出现镜像混淆的问题。

3.  将标签后的镜像推送至私有化仓库

    示例，将标签后的活字格镜像推送至 harbor 仓库：

    ```bash
    docker push hzg.harbor.local/k8s/fgc_k8s_arm:10.0.103.0
    ```

    docker 会根据镜像标签，将该镜像推送至仓库 `hzg.harbor.local`中对应的路径 `/k8s`下，命名 `fgc_k8s_arm`，版本号 `10.0.103.0`。

至此，我们可以将安装活字格集群需要的所有镜像，都通过如上的方法导入到私有化镜像仓库中。后续的安装操作和在线操作没有任何区别。
