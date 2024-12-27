# 日志

Nginx 日志分为两种主要类型：访问日志（access log） 和 错误日志（error log），它们记录了服务器的请求处理信息和运行状态。

## 位置

默认情况下，Nginx 日志文件存储在以下路径（可能因安装方式或配置不同而变化）：

-   访问日志（Access Log）: `/var/log/nginx/access.log`
-   错误日志（Error Log）: `/var/log/nginx/error.log`

可以通过配置文件查看或更改日志路径：

```nginx
http {
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
}
```

## 查看

-   如果需要实时查看日志，可以使用 tail 命令：

```bash
# 查看最近 20 行日志
tail -n 20 /var/log/nginx/access.log

# 实时跟踪日志输出
tail -f /var/log/nginx/access.log
```

-   如果需要查看完整日志，可以使用 less 或者 cat 命令。

```bash
# 分页查看
less /var/log/nginx/access.log

# 全部显示
cat /var/log/nginx/access.log
```

> [!NOTE]
> 如果日志文件内容较多，更推荐将日志复制到本地，使用文本编辑器打开检索。

## 分析

Nginx 日志中依照配置的格式，记录了请求所包含的信息。您可以通过如下命令统计常见的分析数据：

-   统计每个 IP 的请求数量：

```bash
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr
```

-   按状态码统计数量：

```bash
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -nr
```

-   查看特定时间的日志：

```bash
grep "27/Dec/2024:14" /var/log/nginx/access.log
```

-   过滤特定的状态码（如 404 错误）：

```bash
grep " 404 " /var/log/nginx/access.log
```

## 管理

### 记录格式

Nginx 的日志记录格式可以自行配置，仅需修改配置文件即可：

```nginx
# 访问日志格式配置
http {
    log_format custom_format '$remote_addr - $remote_user [$time_local] '
                             '"$request" $status $body_bytes_sent '
                             '"$http_referer" "$http_user_agent"';

    access_log /var/log/nginx/access.log custom_format;
}

# 错误日志级别设置
http {
    error_log /var/log/nginx/error.log warn;
}
```

### 轮转压缩

`logrotate` 程序是一个日志文件管理工具。用于分割日志文件，删除旧的日志文件，并创建新的日志文件，起到“转储”作用。Linux 系统默认安装 `logrotate`。

使用 `logrotate` 管理 Nginx 日志文件，避免日志过大：

```bash
sudo vim /etc/logrotate.d/nginx
```

添加一下内容：

```txt
/var/log/nginx/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 nginx adm
    sharedscripts
    postrotate
        [ -s /run/nginx.pid ] && kill -USR1 `cat /run/nginx.pid`
    endscript
}
```

上述配置表示每天轮转 Nginx 日志文件，最多保留 7 个，支持压缩旧日志并确保服务不中断，通过 `postrotate` 通知 Nginx 重新加载日志文件。
