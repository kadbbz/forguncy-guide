# 漏洞修复

在安全性要求高的运维场景中，活字格集群在安装后，仍需要做额外的安全配置以应对环境安全漏洞扫描。本节介绍活字格集群在安装后，可能会遇到的安全漏洞扫描类型以及相应的解决方案。

> [!NOTE]
> 此场景下的安全漏洞扫描并非产品本身的安全漏洞，而是在不同的安全策略下，运维环境可能存在的隐患。具体场景是否并定义为安全漏洞应当取决于实际的运维场景安全策略。

## Redis 未授权访问

### 漏洞描述
redis端口对外开放并且没有配置认证选项，未授权用户可直接获取数据库中所有信息，造成严重的信息泄露。

> [!NOTE]
> 活字格集群中的 redis服务，默认没有配置认证选项。可以自行在配置文件中增加认证配置。

### 解决方案

1. 修改活字格 chart 文件中关于 redis 的配置文件`deployment-redis.yaml`，增加高亮部分
    ```yaml{22-26}
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: {{ .Release.Name }}-redis-pod
      labels:
        app.kubernetes.io/managed-by: Helm
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: {{ .Release.Name }}-redis-app
      template:
        metadata:
          labels:
            app: {{ .Release.Name }}-redis-app
        spec:
          containers:
          - name: {{ .Release.Name }}-redis-app
            image: redis:latest
            ports:
            - containerPort: 6379
            env:
              - name: REDIS_PASSWORD
                value: {{ .Values.redis.redis_password | quote }}
            command: ["redis-server"]
            args: ["--requirepass", "$(REDIS_PASSWORD)"]
    ```
2. 修改活字格 chart 文件中的 `values.yaml` 文件内容，增加密码配置项。
    ```yaml
    redis:
      redis_password: your password
    ```
3. 在管理控制台页面的负载均衡页面，设置 redis 的密码并保存。
4. 使用 helm 更新 chart，并重新设置副本数量。

## 目标主机 `showmount -e` 信息泄露
### 漏洞描述
可以对目标主机进行"showmount -e"操作，此操作将泄露目标主机大量敏感信息，比如目录结构。更糟糕的是，如果访问控制不严的话，攻击者有可能直接访问到目标主机上的数据。

> [!NOTE]
> 此漏洞针对的是 NFS 的服务器。

### 解决方案
在 NFS 服务器上（示例 IP：`192.168.1.100`）的 `/etc/hosts.allow` 和 `/etc/hosts.deny` 文件中添加如下内容即可解决该问题。

- hosts.allow
```txt
# 添加客户端 IP 地址，类似于白名单。
mountd:192.168.1.101
```
- hosts.deny
```txt
# 添加如下配置，类似于黑名单。
mountd:all
```
配置添加完成后，无需重启 NFS 服务器即可生效。

可在任意测试机器上输入如下命令进行测试：
```bash
showmount -e 192.168.1.100
```
如果在配置了 allow 的机器（`192.168.1.101`）上测试， 会正常输出共享路径。

如果在其他机器上测试，会提示鉴权错误：
```txt
rpc mount export: RPC: Authentication error; why = Failed (unspecified error)
```