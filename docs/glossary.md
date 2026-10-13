# 术语表

MySQL 核心术语的中英对照、一句话定义、权威出处与相关页。

**维护口径**：新增条目必须给出可点的权威出处；查不到就写「未找到权威出处（待核）」，不得凭印象编造链接。

## 基础概念

### 数据库（Database）
按数据结构存储、组织和管理数据的仓库，MySQL 中一个实例可含多个数据库。
**出处**：[MySQL 8.0 Reference Manual · 数据库对象](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
**相关页**：[什么是MySQL](/basics/what-is-mysql)、[简介](/basics/introduction)

### 数据表（Table）
关系数据库中数据的二维组织形式，由行和列组成，是 MySQL 存储数据的基本单位。
**出处**：[MySQL 8.0 Reference Manual · CREATE TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
**相关页**：[数据库和表的创建、修改与删除](/basics/creating-modifying-deleting-databases-tables)、[表的设计](/database-design/table-design)

### 行（Row）
数据表中的一条记录，对应一个实体实例的完整数据。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 行格式](https://dev.mysql.com/doc/refman/8.0/en/innodb-row-format.html)
**相关页**：[数据页与数据行](/advanced-features-internals/data-pages-rows)、[表的设计](/database-design/table-design)

### 列（Column）
数据表中的一个字段，定义了数据的名称、类型和约束。
**出处**：[MySQL 8.0 Reference Manual · 数据类型](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)
**相关页**：[字段的设计](/database-design/column-design)、[MySQL 基础知识：数据类型](/basics/data-types)

### 模式（Schema）
数据库的结构定义，包括表、列、索引、约束等对象的逻辑组织。
**出处**：[INFORMATION_SCHEMA · SCHEMATA](https://dev.mysql.com/doc/refman/8.0/en/information-schema-schemata-table.html)
**相关页**：[数据库模式](/database-design/database-schema)、[数据库设计概述](/database-design/overview)

### SQL（Structured Query Language）
用于管理和查询关系数据库的标准语言，MySQL 支持其大部分标准语法。
**出处**：[MySQL 8.0 Reference Manual · SQL 语句](https://dev.mysql.com/doc/refman/8.0/en/select.html)
**相关页**：[SQL基础 简介](/basics/sql-basics)、[什么是MySQL](/basics/what-is-mysql)

### 关系型数据库（Relational Database）
基于关系模型（表、行、列）组织数据的数据库，MySQL 是其中的代表。
**出处**：[MySQL 8.0 Reference Manual · MySQL 简介](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
**相关页**：[什么是MySQL](/basics/what-is-mysql)、[NoSQL、SQL 和 MySQL 的关系](/basics/nosql-sql-mysql)

## 数据类型

### 整数类型（Integer Types）
TINYINT / SMALLINT / MEDIUMINT / INT / BIGINT，存储整数值，可选 UNSIGNED 扩展正数范围。
**出处**：[MySQL 8.0 Reference Manual · 整数类型](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)
**相关页**：[MySQL 基础知识：数据类型](/basics/data-types)、[字段的设计](/database-design/column-design)

### 字符串类型（String Types）
CHAR / VARCHAR / TEXT 系列，存储字符数据，CHAR 定长、VARCHAR 变长。
**出处**：[MySQL 8.0 Reference Manual · 字符串类型](https://dev.mysql.com/doc/refman/8.0/en/char.html)
**相关页**：[MySQL 基础知识：数据类型](/basics/data-types)、[字段的设计](/database-design/column-design)

### 二进制字符串类型（Binary String Types）
BINARY / VARBINARY / BLOB 系列，存储二进制数据，BLOB 用于大对象。
**出处**：[MySQL 8.0 Reference Manual · BLOB](https://dev.mysql.com/doc/refman/8.0/en/blob.html)
**相关页**：[MySQL 基础知识：数据类型](/basics/data-types)、[字段的设计](/database-design/column-design)

### 日期时间类型（Date and Time Types）
DATE / TIME / DATETIME / TIMESTAMP / YEAR，存储日期和时间值。
**出处**：[MySQL 8.0 Reference Manual · DATETIME](https://dev.mysql.com/doc/refman/8.0/en/datetime.html)
**相关页**：[MySQL 基础知识：数据类型](/basics/data-types)、[日期和时间函数](/advanced-sql-data-processing/date-time-functions)

### JSON 类型（JSON Type）
MySQL 5.7.8+ 引入的原生 JSON 类型，支持二进制存储和 JSON 函数操作。
**出处**：[MySQL 8.0 Reference Manual · JSON](https://dev.mysql.com/doc/refman/8.0/en/json.html)
**相关页**：[MySQL 基础知识：数据类型](/basics/data-types)、[JSON 函数](/advanced-sql-data-processing/json-functions)

### ENUM 与 SET（ENUM and SET）
ENUM 为单选字符串集合，SET 为多选字符串集合，均以整数索引存储。
**出处**：[MySQL 8.0 Reference Manual · ENUM](https://dev.mysql.com/doc/refman/8.0/en/enum.html)
**出处**：[MySQL 8.0 Reference Manual · SET](https://dev.mysql.com/doc/refman/8.0/en/set.html)
**相关页**：[MySQL 基础知识：数据类型](/basics/data-types)、[字段的设计](/database-design/column-design)

### 浮点类型（Floating-Point Types）
FLOAT / DOUBLE / DECIMAL，DECIMAL 为精确小数，适合财务计算。
**出处**：[MySQL 8.0 Reference Manual · 浮点类型](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html)
**相关页**：[MySQL 基础知识：数据类型](/basics/data-types)、[字段的设计](/database-design/column-design)

## SQL 语句

### SELECT（SELECT）
从数据库中检索数据的基本 SQL 语句，支持 WHERE、GROUP BY、ORDER BY、LIMIT 等子句。
**出处**：[MySQL 8.0 Reference Manual · SELECT](https://dev.mysql.com/doc/refman/8.0/en/select.html)
**相关页**：[基本查询语句（SELECT）](/basics/basic-query-statements-select)、[高级SQL查询](/advanced-sql-data-processing/advanced-sql-queries)

### INSERT（INSERT）
向数据表中插入新行的 SQL 语句。
**出处**：[MySQL 8.0 Reference Manual · INSERT](https://dev.mysql.com/doc/refman/8.0/en/insert.html)
**相关页**：[插入数据（INSERT）](/basics/inserting-data)、[SQL基础 简介](/basics/sql-basics)

### UPDATE（UPDATE）
修改数据表中已有行的 SQL 语句。
**出处**：[MySQL 8.0 Reference Manual · UPDATE](https://dev.mysql.com/doc/refman/8.0/en/update.html)
**相关页**：[更新数据（UPDATE）](/basics/updating-data)、[SQL基础 简介](/basics/sql-basics)

### DELETE（DELETE）
从数据表中删除行的 SQL 语句。
**出处**：[MySQL 8.0 Reference Manual · DELETE](https://dev.mysql.com/doc/refman/8.0/en/delete.html)
**相关页**：[删除数据（DELETE）](/basics/deleting-data)、[SQL基础 简介](/basics/sql-basics)

### 子查询（Subquery）
嵌套在另一个 SQL 语句内部的查询，可用于 WHERE、FROM、SELECT 子句。
**出处**：[MySQL 8.0 Reference Manual · 子查询](https://dev.mysql.com/doc/refman/8.0/en/subqueries.html)
**相关页**：[复杂查询（JOIN、子查询）](/advanced-sql-data-processing/complex-queries)、[EXISTS 和 NOT EXISTS](/advanced-sql-data-processing/exists-not-exists)

### UNION（UNION）
合并两个或多个 SELECT 结果集的集合操作，自动去重；UNION ALL 保留重复。
**出处**：[MySQL 8.0 Reference Manual · UNION](https://dev.mysql.com/doc/refman/8.0/en/union.html)
**相关页**：[组合查询（UNION, INTERSECT, EXCEPT）](/advanced-sql-data-processing/set-operations)、[高级SQL查询](/advanced-sql-data-processing/advanced-sql-queries)

### 视图（View）
基于 SQL 查询的虚拟表，不存储实际数据，简化复杂查询和安全控制。
**出处**：[MySQL 8.0 Reference Manual · 视图](https://dev.mysql.com/doc/refman/8.0/en/views.html)
**相关页**：[视图（Views）](/advanced-sql-data-processing/views)、[高级SQL查询](/advanced-sql-data-processing/advanced-sql-queries)

### 存储过程（Stored Procedure）
预编译的 SQL 代码块，存储在数据库中，可重复调用，支持参数和流程控制。
**出处**：[MySQL 8.0 Reference Manual · 存储例程](https://dev.mysql.com/doc/refman/8.0/en/stored-routines.html)
**相关页**：[存储过程与函数（Stored Procedures and Functions）](/advanced-sql-data-processing/stored-procedures-functions)、[SQL函数](/advanced-sql-data-processing/sql-functions)

### 触发器（Trigger）
与表关联的特殊存储例程，在 INSERT / UPDATE / DELETE 事件前后自动执行。
**出处**：[MySQL 8.0 Reference Manual · 触发器](https://dev.mysql.com/doc/refman/8.0/en/triggers.html)
**相关页**：[触发器（Triggers）](/advanced-sql-data-processing/triggers)、[存储过程与函数（Stored Procedures and Functions）](/advanced-sql-data-processing/stored-procedures-functions)

### 游标（Cursor）
在存储过程中逐行遍历结果集的机制，用于逐条处理查询结果。
**出处**：[MySQL 8.0 Reference Manual · 游标](https://dev.mysql.com/doc/refman/8.0/en/cursors.html)
**相关页**：[游标（Cursors）](/advanced-sql-data-processing/cursors)、[存储过程与函数（Stored Procedures and Functions）](/advanced-sql-data-processing/stored-procedures-functions)

### 窗口函数（Window Function）
在结果集的「窗口」上执行聚合或排名计算的函数，如 ROW_NUMBER、RANK、SUM OVER。
**出处**：[MySQL 8.0 Reference Manual · 窗口函数](https://dev.mysql.com/doc/refman/8.0/en/window-functions.html)
**相关页**：[窗口函数（Window Functions）](/advanced-sql-data-processing/window-functions)、[数据汇总与分析](/advanced-sql-data-processing/data-summarization-analysis)

### 聚合函数（Aggregate Function）
对一组值计算并返回单一值的函数，如 COUNT、SUM、AVG、MIN、MAX。
**出处**：[MySQL 8.0 Reference Manual · 聚合函数](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html)
**相关页**：[聚合函数（SUM, AVG, COUNT, MIN, MAX）](/advanced-sql-data-processing/aggregate-functions)、[GROUP BY 和 HAVING](/advanced-sql-data-processing/group-by-having)

## 事务与并发

### 事务（Transaction）
一组不可分割的 SQL 操作序列，满足 ACID 特性，通过 BEGIN / COMMIT / ROLLBACK 控制。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 事务模型](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-model.html)
**相关页**：[事务](/advanced-features-internals/transactions)、[事务概念](/advanced-features-internals/transaction-concepts)

### ACID（ACID）
事务的四个特性：原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 事务模型](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-model.html)
**相关页**：[ACID特性](/advanced-features-internals/acid-properties)、[事务](/advanced-features-internals/transactions)

### 隔离级别（Isolation Level）
定义事务间可见性的四个标准级别：READ UNCOMMITTED / READ COMMITTED / REPEATABLE READ / SERIALIZABLE。
**出处**：[MySQL 8.0 Reference Manual · SET TRANSACTION](https://dev.mysql.com/doc/refman/8.0/en/set-transaction.html)
**相关页**：[隔离级别与锁](/advanced-features-internals/isolation-levels-locks)、[事务](/advanced-features-internals/transactions)

### MVCC（Multi-Version Concurrency Control）
多版本并发控制：通过保存数据行的多个版本，实现读不阻塞写、写不阻塞读。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 多版本](https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html)
**相关页**：[MVCC（多版本并发控制）](/advanced-features-internals/Multi-Version-Concurrency-Control)、[隔离级别与锁](/advanced-features-internals/isolation-levels-locks)

### 锁（Lock）
并发控制机制，防止多个事务同时修改同一数据导致冲突，分为表锁和行锁。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 锁](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)
**相关页**：[锁机制](/advanced-features-internals/locking-mechanisms)、[锁的种类（表锁、行锁）](/advanced-features-internals/lock-types)

### 死锁（Deadlock）
两个或多个事务互相等待对方释放锁，导致所有事务都无法继续执行的状态。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 死锁](https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html)
**相关页**：[死锁与检测](/advanced-features-internals/deadlock-detection)、[锁的优化策略](/advanced-features-internals/lock-optimization)

### 重做日志（Redo Log）
InnoDB 的物理日志，记录数据页的物理修改，用于崩溃恢复时重放已提交事务。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 重做日志](https://dev.mysql.com/doc/refman/8.0/en/innodb-redo-log.html)
**相关页**：[日志（Redo Log, Undo Log, Binary Log）](/advanced-features-internals/logs)、[事务](/advanced-features-internals/transactions)

### 撤销日志（Undo Log）
InnoDB 的逻辑日志，记录数据修改前的旧值，用于回滚事务和 MVCC 一致性读。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 撤销日志](https://dev.mysql.com/doc/refman/8.0/en/innodb-undo-logs.html)
**相关页**：[日志（Redo Log, Undo Log, Binary Log）](/advanced-features-internals/logs)、[MVCC（多版本并发控制）](/advanced-features-internals/Multi-Version-Concurrency-Control)

### 二进制日志（Binary Log (binlog)）
Server 层的逻辑日志，记录所有修改数据的 SQL 语句，用于主从复制和 PITR 恢复。
**出处**：[MySQL 8.0 Reference Manual · 二进制日志](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html)
**相关页**：[日志（Redo Log, Undo Log, Binary Log）](/advanced-features-internals/logs)、[主从复制（Master-Slave Replication）](/architecture-deployment/master-slave-replication)

## 索引与优化

### B+树（B+ Tree）
InnoDB 索引的底层数据结构，多路平衡搜索树，所有数据存于叶子节点，支持范围查询。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 索引](https://dev.mysql.com/doc/refman/8.0/en/innodb-indexes.html)
**相关页**：[B-树和 B+树的数据结构图示](/advanced-features-internals/index-why)、[索引类型及其底层实现](/advanced-features-internals/index-types)

### 聚簇索引（Clustered Index）
InnoDB 中数据行本身按主键顺序存储的索引，主键索引即聚簇索引，一张表仅一个。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 索引](https://dev.mysql.com/doc/refman/8.0/en/innodb-indexes.html)
**相关页**：[索引类型及其底层实现](/advanced-features-internals/index-types)、[索引](/advanced-features-internals/indexes)

### 二级索引（Secondary Index）
非聚簇索引，叶子节点存储索引列值和主键值，查询时可能需要回表。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 索引](https://dev.mysql.com/doc/refman/8.0/en/innodb-indexes.html)
**相关页**：[索引类型及其底层实现](/advanced-features-internals/index-types)、[索引](/advanced-features-internals/indexes)

### 覆盖索引（Covering Index）
查询所需的所有列都包含在索引中，无需回表即可返回结果的索引。
**出处**：[MySQL 8.0 Reference Manual · 优化索引](https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html)
**相关页**：[索引优化](/advanced-features-internals/index-optimization)、[索引](/advanced-features-internals/indexes)

### 执行计划（Execution Plan）
优化器为 SQL 语句生成的执行方案，通过 EXPLAIN 查看，用于分析查询性能。
**出处**：[MySQL 8.0 Reference Manual · EXPLAIN](https://dev.mysql.com/doc/refman/8.0/en/explain.html)
**相关页**：[执行计划分析（EXPLAIN）](/performance-tuning/explain)、[查询优化](/performance-tuning/query-optimization)

### 慢查询日志（Slow Query Log）
记录执行时间超过阈值的 SQL 语句的日志，是性能调优的重要数据源。
**出处**：[MySQL 8.0 Reference Manual · 慢查询日志](https://dev.mysql.com/doc/refman/8.0/en/slow-query-log.html)
**相关页**：[慢查询日志](/performance-tuning/slow-query-log)、[性能监控](/performance-tuning/performance-monitoring)

### 查询优化器（Query Optimizer）
MySQL 内部组件，负责为 SQL 语句选择最优执行计划，包括索引选择和连接顺序。
**出处**：[MySQL 8.0 Reference Manual · 优化器追踪](https://dev.mysql.com/doc/refman/8.0/en/optimizer-tracing.html)
**相关页**：[查询优化器](/advanced-features-internals/query-optimizer)、[查询优化](/performance-tuning/query-optimization)

## 存储引擎

### InnoDB（InnoDB）
MySQL 默认存储引擎，支持事务、行级锁、外键和崩溃恢复，适合 OLTP 场景。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 存储引擎](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
**相关页**：[存储引擎](/advanced-features-internals/storage-engines)、[底层原理](/advanced-features-internals/internals)

### MyISAM（MyISAM）
MySQL 早期默认存储引擎，不支持事务和行级锁，以表锁为主，适合读多写少场景。
**出处**：[MySQL 8.0 Reference Manual · MyISAM 存储引擎](https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html)
**相关页**：[存储引擎](/advanced-features-internals/storage-engines)、[底层原理](/advanced-features-internals/internals)

### 数据页（Data Page）
InnoDB 磁盘 I/O 的基本单位，默认 16KB，数据行存储在页中，页组成区、段、表空间。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 行格式](https://dev.mysql.com/doc/refman/8.0/en/innodb-row-format.html)
**相关页**：[数据页与数据行](/advanced-features-internals/data-pages-rows)、[底层原理](/advanced-features-internals/internals)

### 缓冲池（Buffer Pool）
InnoDB 的内存缓存区域，缓存数据页和索引页，减少磁盘 I/O，是性能调优的核心参数。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 缓冲池](https://dev.mysql.com/doc/refman/8.0/en/innodb-buffer-pool.html)
**相关页**：[底层原理](/advanced-features-internals/internals)、[参数优化（my.cnf 配置文件）](/performance-tuning/parameter-optimization)

### 自适应哈希索引（Adaptive Hash Index）
InnoDB 自动为热点 B+树索引页构建的哈希索引，加速等值查询，无需手动管理。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 自适应哈希索引](https://dev.mysql.com/doc/refman/8.0/en/innodb-adaptive-hash.html)
**相关页**：[索引优化](/advanced-features-internals/index-optimization)、[索引](/advanced-features-internals/indexes)

## 架构与部署

### 主从复制（Master-Slave Replication）
将主库的数据变更通过二进制日志同步到一个或多个从库，实现读写分离和故障转移。
**出处**：[MySQL 8.0 Reference Manual · 复制](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
**相关页**：[主从复制（Master-Slave Replication）](/architecture-deployment/master-slave-replication)、[数据库架构](/architecture-deployment/database-architecture)

### 组复制（Group Replication）
MySQL 高可用方案，基于 Paxos 协议的多主复制，支持自动故障检测和成员管理。
**出处**：[MySQL 8.0 Reference Manual · 组复制](https://dev.mysql.com/doc/refman/8.0/en/group-replication.html)
**相关页**：[高可用架构（MHA, Galera Cluster）](/architecture-deployment/high-availability-architecture)、[集群架构（MySQL Cluster）](/architecture-deployment/mysql-cluster)

### InnoDB Cluster（InnoDB Cluster）
MySQL 官方高可用解决方案，整合组复制、MySQL Router 和 MySQL Shell，提供自动故障转移。
**出处**：[MySQL 8.0 Reference Manual · InnoDB 集群](https://dev.mysql.com/doc/refman/8.0/en/mysql-innodb-cluster-introduction.html)
**相关页**：[高可用架构（MHA, Galera Cluster）](/architecture-deployment/high-availability-architecture)、[集群架构（MySQL Cluster）](/architecture-deployment/mysql-cluster)

### 逻辑备份（Logical Backup）
导出 SQL 语句或文本格式的备份方式，如 mysqldump，跨版本兼容但恢复较慢。
**出处**：[MySQL 8.0 Reference Manual · mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
**相关页**：[逻辑备份（mysqldump, MySQL Workbench）](/architecture-deployment/logical-backup)、[备份与恢复](/architecture-deployment/backup-recovery)

### 物理备份（Physical Backup）
直接复制数据文件的备份方式，速度快但依赖存储引擎和版本，如 XtraBackup。
**出处**：[MySQL 8.0 Reference Manual · 备份方法](https://dev.mysql.com/doc/refman/8.0/en/backup-methods.html)
**相关页**：[物理备份（冷备、热备）](/architecture-deployment/physical-backup)、[备份与恢复](/architecture-deployment/backup-recovery)

### 分区（Partitioning）
将大表数据按规则分散到多个物理分区中，提升查询性能和管理效率。
**出处**：[MySQL 8.0 Reference Manual · 分区](https://dev.mysql.com/doc/refman/8.0/en/partitioning.html)
**相关页**：[分区与分片](/database-design/partitioning-sharding)、[性能与扩展](/database-design/performance-scaling)

### 分片（Sharding）
将数据按规则分布到多个数据库实例中，突破单实例存储和性能瓶颈。
**出处**：[MySQL 8.0 Reference Manual · 分区](https://dev.mysql.com/doc/refman/8.0/en/partitioning.html)
**相关页**：[分区与分片](/database-design/partitioning-sharding)、[垂直与水平拆分](/database-design/vertical-horizontal-splitting)

## 工具

### mysqldump（mysqldump）
MySQL 官方逻辑备份工具，导出 SQL 语句，支持单库、全库和选择性备份。
**出处**：[MySQL 8.0 Reference Manual · mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
**相关页**：[逻辑备份（mysqldump, MySQL Workbench）](/architecture-deployment/logical-backup)、[MySQL工具](/tools-practice/mysql-tools)

### mysqladmin（mysqladmin）
MySQL 服务器管理工具，用于创建/删除数据库、查看状态、关闭服务器等管理操作。
**出处**：[MySQL 8.0 Reference Manual · mysqladmin](https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html)
**相关页**：[MySQL工具](/tools-practice/mysql-tools)、[常用命令参考](/appendix/common-commands)

### mysqlcheck（mysqlcheck）
MySQL 表维护工具，用于检查、修复、分析和优化 MyISAM 及 InnoDB 表。
**出处**：[MySQL 8.0 Reference Manual · mysqlcheck](https://dev.mysql.com/doc/refman/8.0/en/mysqlcheck.html)
**相关页**：[MySQL工具](/tools-practice/mysql-tools)、[常用命令参考](/appendix/common-commands)

### MySQL Shell（MySQL Shell）
MySQL 官方命令行客户端，支持 JavaScript / Python / SQL 三种模式，用于管理和开发。
**出处**：[MySQL 8.0 Reference Manual · MySQL Shell](https://dev.mysql.com/doc/refman/8.0/en/mysql-shell-tutorial-python.html)
**相关页**：[MySQL Shell](/tools-practice/mysql-shell)、[MySQL工具](/tools-practice/mysql-tools)

### MySQL Workbench（MySQL Workbench）
MySQL 官方图形化管理工具，支持建模、开发、管理和数据库设计。
**出处**：[MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
**相关页**：[MySQL Workbench](/tools-practice/mysql-workbench)、[MySQL工具](/tools-practice/mysql-tools)

### phpMyAdmin（phpMyAdmin）
基于 Web 的 MySQL 管理工具，通过浏览器执行 SQL 和管理数据库。
**出处**：[MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
**相关页**：[phpMyAdmin](/tools-practice/phpmyadmin)、[MySQL工具](/tools-practice/mysql-tools)

### Percona Toolkit（Percona Toolkit）
Percona 维护的 MySQL 高级命令行工具集，包含 pt-query-digest、pt-online-schema-change 等。
**出处**：[MySQL 8.0 Reference Manual · 优化](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
**相关页**：[Percona Toolkit](/tools-practice/percona-toolkit)、[Percona Toolkit 实际案例](/tools-practice/real-world-cases)

<!-- BACKLINKS-AUTO -->
## 相关页面

- [knowledge](knowledge.md)
