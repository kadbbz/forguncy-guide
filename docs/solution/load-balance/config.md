# 配置设置

本节介绍活字格集群的负载均衡配置。

## 开启负载均衡

安装成功后的活字格访问和单点下几乎没有区别，唯一的变化就是活字格服务器默认的 `22345` 端口成为了内部端口。您需要通过 集群提供的 service 暴露出来的端口进行访问管理控制台。

> [!NOTE] 访问管理控制台
> 查看活字格集群提供的服务端口：
>
> ```bash
> kubectl get svc -n fgc-system
> ```
>
> 在浏览器中访问地址：`http://<nodeIP>:<svcPort>/UserService/AdminPortal/` 进入控制台
>
> -   `nodeIP` : 集群中任意节点的 IP 地址。
> -   `svcPort` : 活字格集群对外暴露的 service 端口号。

进入控制台中，跳转至「设置 -> 负载均衡设置」，开启负载均衡。

-   请务必将用户数据切换至外联库
-   redis 服务请设置为 `fgc-server-redis-service:6379`
    > [!IMPORTANT] redis 服务访问
    > 如无特殊需求，请直接配置 `fgc-server-redis-service:6379`。
    >
    > `fgc-server-redis-service` 是活字格集群启动的 redis 服务，在 Kubernetes 中，Pod 会随时被销毁，为确保准确找到服务，请使用 service 名称而非 Pod IP。端口号为默认 6379。

配置完成后，重启管理控制台服务。之后为集群加入授权，就可以动态调整集群的副本数了。

```bash
# 将活字格集群的 pod 数量变为 5 个节点
kubectl scale deployment fgc-deploy --replicas=5
```

## 应用发布

> [!IMPORTANT] 务必留意
> 集群下的活字格应用强制要求数据库必须使用外联库！！！

集群下的应用发布和单点的操作完全一致，只有配置服务器的地址时需要留意：

> [!NOTE] 服务器地址请按照如下规则配置
> `<nodeIP>:<svcPort>`

如果 Kubernetes 集群外侧挂载了网关，那么直接配置网关地址即可。网关内部按照 `<nodeIP>:<svcPort>` 进行路由配置。
