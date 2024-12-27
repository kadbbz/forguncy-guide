# 基本命令

本节介绍 Nginx 使用的基本命令行命令。

## Nginx 命令

1. 检查配置文件

```bash
nginx -t
```

2. 热加载配置文件（无需重启服务）

```bash
nginx -s reload
```

3. 强制关闭服务

```bash
nginx -s stop
```

4. 优雅关闭服务（等待工作进程处理任务完成后关闭）

```bash
nginx -s quit
```

## 其他命令

1. 查看进程号

```bash
ps -ef | grep nginx
```
2. 