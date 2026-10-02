# MySQL 8.0及以上版本的新特性

MySQL 8.0 于 2018 年 4 月正式 GA，是继 5.7 之后变化最大的一次版本升级：数据字典重写、原子 DDL、窗口函数与 CTE、全新的默认字符集和默认认证插件，同时移除了一批旧特性。本章按主题梳理这些变化，并标注具体的版本归属。

## 1. 数据字典与 DDL

- **事务型数据字典**：8.0 把表结构、索引、视图、存储过程等元数据存放在 InnoDB 数据字典表中，彻底移除了 `.frm` 文件。元数据的读写有了事务保证，`INFORMATION_SCHEMA` 的部分表也改为直接查询数据字典的动态视图，速度更快。
- **原子 DDL**：`CREATE TABLE`、`DROP TABLE`、`ALTER TABLE` 等 DDL 语句要么完整成功、要么完全回滚，不再出现“表删了一半、字典还留着记录”的中间状态。DDL 的安全性与崩溃恢复由 InnoDB 的 DDL 日志保证。
- **在线 DDL 与 INSTANT 算法**：
  - 8.0.12 起，`ALTER TABLE ... ADD COLUMN` 支持 `ALGORITHM=INSTANT`，只修改元数据，不重建表、不复制数据，秒级完成。
  - 8.0.29 进一步把 INSTANT 算法扩展到在任意位置添加、删除、重命名列等更多操作。
  - 常见操作建议先查 `Online DDL` 支持矩阵，无法 INSTANT 的可考虑 INPLACE，仍不行的用 `pt-online-schema-change` 或 `gh-ost`。

## 2. SQL 能力

- **窗口函数**：`ROW_NUMBER()`、`RANK()`、`DENSE_RANK()`、`LAG()`、`LEAD()`、`SUM() OVER (...)` 等，配合 `PARTITION BY` / `ORDER BY` 完成排名、环比、累计统计等过去必须用变量或子查询才能实现的计算。
- **公用表表达式（CTE）**：`WITH ... AS (...)` 可以给子查询命名、复用；`WITH RECURSIVE` 支持递归查询，常用于处理组织架构树、物料清单等层级数据。
- **集合操作**：8.0.31 起支持 `INTERSECT` 和 `EXCEPT`（此前只有 `UNION`）。
- **JSON 增强**：
  - `JSON_TABLE()` 把 JSON 文档转换为关系表后再参与查询；
  - `JSON_SCHEMA_VALID()` / `JSON_SCHEMA_VALIDATION_REPORT()`（8.0.17 起）用 JSON Schema 做 `CHECK` 约束校验；
  - 多值索引（Multi-Valued Index，8.0.17 起）可以在 JSON 数组上建索引，配合 `MEMBER OF`、`JSON_CONTAINS` 加速查询。
- **正则与字符串函数**：`REGEXP_LIKE()`、`REGEXP_REPLACE()`、`REGEXP_SUBSTR()`、`REGEXP_INSTR()` 提供了完整的正则能力。
- **参数化能力**：8.0.19 起支持 `TABLE` 语句和 `VALUES` 语句，`SELECT` 可以直接引用它们的输出。

## 3. 索引与查询执行

- **降序索引**：`CREATE INDEX idx ON t(a DESC, b ASC)` 真正按降序存储，之前版本只是忽略 `DESC`。对“一列升序、一列降序”的 `ORDER BY` 场景能避免额外的 filesort。
- **不可见索引**：`ALTER TABLE t ALTER INDEX idx INVISIBLE` 可以在不删除索引的情况下让优化器忽略它，是清理冗余索引前的安全验证手段。
- **哈希连接**：8.0.18 起优化器在无可用索引的等值连接上使用 Hash Join，不再退化为多次全表扫描的块嵌套循环。
- **执行计划工具**：
  - `EXPLAIN FORMAT=TREE`（8.0.16 起）以树形输出执行计划；
  - `EXPLAIN ANALYZE`（8.0.18 起）真实执行语句并给出每个算子的实际耗时与行数；
  - `EXPLAIN FOR CONNECTION <id>` 查看其他会话正在执行的语句的计划。
- **直方图统计信息**：`ANALYZE TABLE t UPDATE HISTOGRAM ON col WITH n BUCKETS;` 为没有索引的列建立直方图，帮助优化器更准确地估算行数。
- **跳过锁与不等待**：`SELECT ... FOR UPDATE SKIP LOCKED` / `NOWAIT`（8.0.1 起）让行级锁的争用变得可控，常用于实现轻量级任务队列。

## 4. 字符集与排序规则

- **默认字符集改为 `utf8mb4`**，默认排序规则为 `utf8mb4_0900_ai_ci`（5.x 版本的默认值是 `latin1`/`utf8mb3`）。
- 新增基于 Unicode 9.0.0 的 `utf8mb4_0900_*` 系列排序规则，并提供重音不敏感（`ai`）、大小写不敏感（`ci`）、二进制（`bin`）等多种选择。
- 升级时要注意：旧表如果还是 `utf8mb3`（即 `utf8`），建议迁移到 `utf8mb4`；同时老版本生成的 `utf8mb4_general_ci` 与 `utf8mb4_0900_ai_ci` 的索引不能直接互换，相关表需要重建。

## 5. 安全与账号管理

- **默认认证插件为 `caching_sha2_password`**（5.7 默认是 `mysql_native_password`）。旧的连接驱动若不支持该插件会报认证错误，可在账号上显式指定 `IDENTIFIED WITH mysql_native_password BY '...'` 作为过渡（注意：MySQL 8.4 起该插件默认被禁用）。
- **角色（Roles）**：`CREATE ROLE`、`GRANT role TO user`、`SET DEFAULT ROLE`、`SET ROLE`，可以把权限打包后再授权，简化批量账号管理。
- **更细的动态权限**：如 `BACKUP_ADMIN`、`SYSTEM_USER`、`REPLICATION_APPLIER`、`SENSITIVE_VARIABLES_OBSERVER` 等。
- **密码策略增强**：口令重用限制、`FAILED_LOGIN_ATTEMPTS` 与 `PASSWORD_LOCK_TIME`（8.0.19 起）实现连续失败锁定。

## 6. InnoDB 改进

- **`innodb_dedicated_server`**：设置为 `ON` 时自动按服务器内存大小配置 `innodb_buffer_pool_size`、`innodb_redo_log_capacity` 等，适合专用数据库服务器。
- **自增计数器持久化**：重启后自增最大值不再回退，避免了“删除最大 ID 记录后重启导致主键重复”的问题。
- **UNDO 表空间独立管理**：8.0 起 undo 默认放在独立的 undo 表空间中（`innodb_undo_tablespaces` 默认为 2），支持在线收缩（`innodb_undo_log_truncate`），长事务造成的膨胀可以自动回收。
- **临时表引擎**：内部临时表改用 TempTable 引擎（`internal_tmp_mem_storage_engine`），对大结果集的排序、分组更友好。
- **死锁相关**：`innodb_deadlock_detect` 可在高并发热点场景关闭死锁检测、改用 `innodb_lock_wait_timeout` 兜底；`data_locks`、`data_lock_waits` 取代了 5.7 的 `information_schema.innodb_locks` / `innodb_lock_waits`。
- **重做日志**：8.0.30 起用 `innodb_redo_log_capacity` 动态控制 redo 总容量，`innodb_log_file_size` / `innodb_log_files_in_group` 被弃用。
- **克隆插件（Clone Plugin）**：8.0.17 起内置本地与远程克隆能力，可用于快速搭建/重建从库，也是 InnoDB Clone 备份的基础。

## 7. 复制与高可用

- **二进制日志默认开启**：8.0 起 `log_bin` 默认为 `ON`。
- **GTID 支持**：`gtid_mode` 与 `enforce_gtid_consistency` 的默认值仍是 `OFF`，需要显式开启；8.0 对 GTID 的事务支持更完整，配合 `SOURCE_AUTO_POSITION=1` 可以简化搭建与切换。
- **并行复制增强**：`replica_parallel_workers`、`replica_parallel_type=LOGICAL_CLOCK`，配合 `binlog_transaction_dependency_tracking=WRITESET` 可以显著提高从库回放并行度，缩小主从延迟。
- **术语与语法更名**：
  - 8.0.22 起 `SHOW SLAVE STATUS` → `SHOW REPLICA STATUS`、`START SLAVE` → `START REPLICA`；
  - 8.0.23 起 `CHANGE MASTER TO` → `CHANGE REPLICATION SOURCE TO`、`log_slave_updates` → `log_replica_updates`；
  - 8.0.26 起 `master_*` 相关变量名大量更名为 `source_*`（如半同步插件的 `rpl_semi_sync_source_*`）。
  旧名称目前仍可用（作为别名），但新代码建议使用新名称。
- **组复制（Group Replication）与 InnoDB Cluster**：基于 Paxos 变体的多数派共识，是 8.0 官方内置的高可用方案，详见“高可用架构”一章。

## 8. 管理与运维

- **`SET PERSIST`**：`SET PERSIST max_connections = 1000;` 会把修改写入 `mysqld-auto.cnf` 并在重启后生效，避免“改了配置文件忘重启”的问题；`SET PERSIST_ONLY` 只写文件不立即生效。
- **资源组（Resource Groups）**：8.0.3 起，可以把线程绑定到指定 CPU 或调整线程优先级，用于隔离批处理任务与在线交易。
- **性能与监控**：`performance_schema` 默认开启，`sys` schema 内置；`SHOW ENGINE INNODB STATUS` 之外的锁信息可直接从 `performance_schema` 查询。
- **被移除的特性**：查询缓存（Query Cache）整体移除，`query_cache_size` / `query_cache_type` 不再存在；`.frm` 文件、`mysqlhotcopy`（5.7.5 已移除）、旧式密码插件、`ENCRYPT()` 等函数以及 `innodb_file_format`、`innodb_large_prefix` 等相关变量一并删除。从 5.7 升级前建议先用 MySQL Shell 的 `util.checkForServerUpgrade()` 做兼容性检查。

## 9. 8.0.x 之后：8.4 LTS 与创新版

- MySQL 的发布模型从 8.0 时代改为“LTS（长期支持版）+ 创新版（Innovation）”双轨：创新版按季度发布、只维护到下一个版本，LTS 版本提供长期支持。
- **MySQL 8.4**（2024 年 4 月 GA）是 8.0 之后的第一个 LTS 版本，主要变化包括：`mysql_native_password` 插件默认禁用、一批不推荐的配置项被移除、复制相关变量命名进一步统一。
- 9.x 系列为创新版，引入了 `VECTOR` 向量数据类型与向量检索能力等面向 AI 场景的特性。选择版本时，生产环境建议优先考虑 LTS 版本，创新版可用于验证新特性。

## 总结

MySQL 8.0 是一次“内功”升级：数据字典与原子 DDL 解决了元数据的一致性问题，窗口函数与 CTE 补齐了 SQL 能力，utf8mb4 与 caching_sha2_password 提升了默认安全性，同时移除了查询缓存等历史包袱。后续的 8.4 LTS 与 9.x 创新版在这条路线上继续演进。理解这些变化及其版本归属，是做好升级评估和性能调优的前提。
