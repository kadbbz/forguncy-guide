# 数据治理

## 数据库

【<font color="#1677FF">推荐</font>】为保证安全性，请将数据库服务器和活字格应用服务器放到一个内网中，仅允许应用服务器的 IP 地址访问数据库。

【<font color="#1677FF">推荐</font>】对于不同的数据库类型，请使用不同的用户模式。

::: info 📍 INFO

Microsoft SQL Server中，如果能熟练配置 Windows 身份认证（SSPI），优先使用 Windows 身份认证，而不是用户名 + 密码的方式访问数据库。

:::

【<font color="#1677FF">推荐</font>】请为活字格应用服务创建专门的数据库账户并分配合适的权限。禁止使用 root 用户或者具有 root 权限的用户访问数据库。

【<font color="#1677FF">推荐</font>】使用外联库时，请维护数据库差分脚本，做好数据库的变更记录管理。

::: info 📍 INFO
数据库的版本管理需要重点关注数据库差分脚本，即将一个版本的数据库结构升级到另一个版本结构所需执行的SQL脚本。差分脚本中通常需要包含的内容如下：

- 表操作
- 列操作
- 主键操作
- 约束操作
- 内置数据

单独维护的差分脚本有如下优势：

- 内部审查（Pear review）便利：可以针对每个数据库结构上的修改，及时组织审查，相比于版本开发完成时统一做，审查的效率更高。
- 质量风险小：引入 CI/CD 后，在测试数据库上执行差分脚本，意味着每次脚本都是经过测试的。
:::

【<font color="#1677FF">推荐</font>】无论您使用的是内置库还是外联库，请务必启用自动备份。
