# 错误代码与解决方案

MySQL 返回的错误信息由错误码（`errno`）、SQLSTATE 和描述文本三部分组成。本节整理最常见的错误码、典型原因与处理思路，排查时可先按错误码定位，再结合错误文本与 `perror` 工具（`perror 1062`）查看详细说明。

## 1. 连接与认证类

| 错误码 | 错误文本 | 常见原因与处理 |
| ------ | -------- | -------------- |
| 1045 | `Access denied for user ...` | 用户名/密码错误、来源主机不在 `'user'@'host'` 允许范围内、密码过期。用 `SELECT user, host FROM mysql.user;` 核对账号与 host 通配符 |
| 1040 | `Too many connections` | 超过 `max_connections`。检查连接泄漏、调大该参数、启用连接池；紧急情况可用 `KILL <id>` 释放空闲连接 |
| 1044/1049 | `Unknown database` / 拒绝访问数据库 | 库名写错或账号无权限，`SHOW DATABASES` 核对 |
| 2002/2003 | `Can't connect to ... (111)` | 服务未启动、端口/套接字不对、防火墙或 `bind-address` 限制、`max_connect_errors` 达到阈值后主机被拉黑（优先执行 `TRUNCATE TABLE performance_schema.host_cache;`，`FLUSH HOSTS` 语句自 8.0.23 起已废弃，`mysqladmin flush-hosts` 仍可用） |
| 1820 | `You must reset your password ...` | 密码已过期，执行 `ALTER USER USER() IDENTIFIED BY '新密码';` |
| 2059 | `Authentication plugin 'caching_sha2_password' cannot be loaded` | 旧客户端不支持 8.0 默认认证插件，升级驱动，或为该账号显式指定 `IDENTIFIED WITH mysql_native_password BY '...'` |

## 2. SQL 与数据类

| 错误码 | 错误文本 | 常见原因与处理 |
| ------ | -------- | -------------- |
| 1054 | `Unknown column 'x' in 'field list'` | 列名/表别名写错；注意保留字需要用反引号包裹 |
| 1062 | `Duplicate entry 'x' for key 'PRIMARY'` | 违反唯一约束。插入前查重、使用 `INSERT ... ON DUPLICATE KEY UPDATE` 或 `INSERT IGNORE`（会跳过重复行） |
| 1064 | `You have an error in your SQL syntax` | SQL 语法错误；8.0 移除了部分语法与函数，从 5.7 迁移的脚本尤其要检查 |
| 1114 | `The table 't' is full` | MEMORY 引擎表达到 `max_heap_table_size` 上限，或磁盘/表空间不足；检查 `SELECT @@tmpdir` 所在分区空间 |
| 1146 | `Table 'db.t' doesn't exist` | 表名大小写问题（`lower_case_table_names` 在 Linux 上默认区分大小写）或表确实不存在 |
| 1193 | `Unknown system variable` | 配置文件或脚本中写了当前版本不存在的变量，例如在 8.0 中使用已移除的 `query_cache_size` |
| 1264/1265 | `Out of range value` / `Data truncated` | 数据超出列范围或被截断；检查 `sql_mode` 中的 `STRICT_TRANS_TABLES` |
| 1406 | `Data too long for column` | 字符串超过列定义长度；注意 `utf8mb4` 下 `VARCHAR(n)` 的 `n` 按字符计算 |
| 1071 | `Specified key was too long` | 索引长度超限。InnoDB 默认行格式下单列索引最长 3072 字节（`utf8mb4` 每字符 4 字节），可用前缀索引或缩短列长 |
| 1118 | `Row size too large` | 行长度超过限制，通常是大字段过多；考虑拆表、改用 `TEXT` 类型或调整行格式 |

## 3. 锁与并发类

| 错误码 | 错误文本 | 常见原因与处理 |
| ------ | -------- | -------------- |
| 1205 | `Lock wait timeout exceeded` | 等待行锁/表锁超时（`innodb_lock_wait_timeout`，默认 50 秒）。通过 `performance_schema.data_lock_waits`、`SHOW ENGINE INNODB STATUS` 定位持锁事务；检查长事务与索引缺失导致的锁范围扩大 |
| 1213 | `Deadlock found when trying to get lock` | 发生死锁，InnoDB 自动回滚其中一个事务。应用需要捕获该错误并重试；从 `SHOW ENGINE INNODB STATUS` 的 `LATEST DETECTED DEADLOCK` 或 `performance_schema.data_locks` 分析加锁顺序，尽量按相同顺序访问资源、为条件列建索引以缩小锁范围 |
| 3572 | `Statement aborted because lock(s) could not be acquired` | 使用了 `NOWAIT` 时无法立即获得锁；按需改为普通等待或 `SKIP LOCKED` |

## 4. 外键与约束类

| 错误码 | 错误文本 | 常见原因与处理 |
| ------ | -------- | -------------- |
| 1215 | `Cannot add foreign key constraint` | 两表列类型/字符集/排序规则不一致，或被引用列不是主键/唯一索引。用 `SHOW ENGINE INNODB STATUS` 的 `LATEST FOREIGN KEY ERROR` 查看细节 |
| 1216/1217 | `Cannot add or update a child row` | 外键引用的父行不存在，先插入父表数据或检查引用值 |
| 1451/1452 | `Cannot delete or update a parent row` / `a child row: a foreign key constraint fails` | 父行被子行引用。按需使用 `ON DELETE CASCADE`、先删除子行，或用事务保证顺序 |
| 3819 | `Check constraint 'xx' is violated` | 违反 `CHECK` 约束（8.0.16 起真正生效） |

## 5. 复制与主从类

| 错误码 | 错误文本 | 常见原因与处理 |
| ------ | -------- | -------------- |
| 1236 | `Could not find first log file name in binary log index file` | 主库 binlog 被清理或位点越界，需要重新搭建从库（或用 `SOURCE_AUTO_POSITION=1` 的 GTID 方式重建） |
| 1062（复制线程） | `Duplicate entry ... on ...` | 从库重复执行事务，常见于重新初始化或跳过事务后；用 GTID 方式重新拉取，谨慎使用 `SET GLOBAL sql_replica_skip_counter` 跳过事务 |
| 13117 | `Replica ... not configured` | 复制未配置或未启动，检查 `CHANGE REPLICATION SOURCE TO` 与 `START REPLICA` |

排查复制问题的标准步骤：

```sql
SHOW REPLICA STATUS\G
-- 关注 Replica_IO_Running / Replica_SQL_Running / Last_Errno / Last_Error
-- 以及 Seconds_Behind_Source（主从延迟）
```

## 6. 排查通用思路

1. **先看错误文本，再看错误码**：文本里通常带上了具体的表名、索引名与值；
2. **用 `perror` 还原错误说明**：`perror 1213` 会输出该错误码的官方描述；
3. **区分会话与全局**：很多问题与 `sql_mode`、字符集、时区的会话级设置有关，`SHOW VARIABLES` 对比会话与全局值；
4. **定位到具体语句**：慢查询日志、`performance_schema.events_statements_summary_by_digest`、`SHOW PROCESSLIST` 三件套；
5. **留证据再动手**：改配置、跳过复制事务、`KILL` 连接之前，先把 `SHOW ENGINE INNODB STATUS`、错误日志、`SHOW REPLICA STATUS` 的输出保存下来。
