# 参考书目与在线资源

整理学习与排查问题时最常用的资料。以官方文档为第一手依据，社区资源作为补充。

## 1. 官方文档（第一手资料）

- MySQL 8.0 参考手册：<https://dev.mysql.com/doc/refman/8.0/en/>
- MySQL 8.4 / 9.x 参考手册：<https://dev.mysql.com/doc/>
- MySQL Shell 文档：<https://dev.mysql.com/doc/mysql-shell/8.4/en/>
- X DevAPI 用户指南：<https://dev.mysql.com/doc/x-devapi-userguide/en/>
- Connector 文档（各语言驱动）：<https://dev.mysql.com/doc/connector-odbc/en/> 等各语言分册
- 错误码与消息：<https://dev.mysql.com/doc/mysql-errors/8.0/en/>
- 发布说明（各版本变更与移除项）：<https://dev.mysql.com/doc/relnotes/mysql/8.0/en/>
- Percona XtraBackup 文档：<https://docs.percona.com/percona-xtrabackup/8.0/>
- Percona Toolkit 文档：<https://docs.percona.com/percona-toolkit/>
- MySQL Workbench 文档：<https://dev.mysql.com/doc/workbench/en/>
- phpMyAdmin 文档：<https://docs.phpmyadmin.net/>

阅读提示：遇到“某个参数/语法在什么版本引入、是否被废弃”的问题，直接查参考手册的系统变量表和发布说明，比搜索二手资料更可靠。

## 2. 推荐书目

- 《高性能 MySQL》（High Performance MySQL，第 4 版）：架构、索引、复制、调优的经典参考；
- 《MySQL 技术内幕：InnoDB 存储引擎》（姜承尧）：深入 InnoDB 的实现细节；
- 《MySQL 必知必会》（Ben Forta）：入门 SQL 语法速查；
- 《数据密集型应用系统设计》（Designing Data-Intensive Applications）：从系统视角理解存储、复制与一致性；
- O'Reilly《Learning SQL》：SQL 基础与标准语法入门。

## 3. 工具与实用资源

| 类别 | 工具/资源 | 用途 |
| ---- | --------- | ---- |
| 备份 | Percona XtraBackup、MySQL Enterprise Backup、MySQL Shell `util.dumpInstance` | 物理/逻辑备份 |
| 在线变更 | pt-online-schema-change、gh-ost | 大表在线 DDL |
| 慢查询分析 | pt-query-digest、mysqldumpslow、MySQL Workbench Performance Reports | 定位慢 SQL |
| 监控 | Percona Monitoring and Management（PMM）、Prometheus + Grafana（mysqld_exporter）、MySQL Enterprise Monitor | 指标采集与告警 |
| 高可用 | InnoDB Cluster（Group Replication + MySQL Router + Shell）、Orchestrator、MHA | 自动故障转移 |
| 代理/分片 | ProxySQL、Vitess、MySQL Router | 读写分离、分片 |
| 压测 | sysbench、mysqlslap、TPC-C 类基准 | 容量评估与性能验证 |
| 数据校验 | pt-table-checksum、pt-table-sync | 主从一致性 |
| 升级检查 | MySQL Shell `util.checkForServerUpgrade()` | 版本升级前兼容性检查 |

## 4. 社区与学习渠道

- MySQL 官方博客：<https://blogs.oracle.com/mysql/>
- Percona 博客与网络研讨会：<https://www.percona.com/blog/>
- MySQL 中文社区：知数堂、DBAplus（DBAplus 社群）、InfoQ 数据库频道等技术媒体与社群；
- Stack Overflow 的 `mysql`、`mysql-8.0` 标签，以及 Database Administrators（DBA Stack Exchange）；
- GitHub 上的示例库与工具仓库（gh-ost、my2.sql、mysql-sys 等）。

## 5. 学习路径建议

1. **基础**：SQL 语法、数据类型、表设计范式（对应本书第 1-2 部分）；
2. **进阶**：索引原理（B+Tree）、事务与隔离级别、锁与 MVCC（第 4 部分）；
3. **运维**：备份恢复、复制与高可用（第 5 部分）、监控与调优（第 6 部分）；
4. **工具**：MySQL Shell、EXPLAIN ANALYZE、performance_schema、Percona Toolkit（第 6-7 部分）；
5. **扩展**：分库分表、NewSQL、云原生与 HTAP（第 7 部分）。

建议边学边在本地搭建实验环境（可用 Docker 拉起 MySQL 8.0），用 `EXPLAIN ANALYZE`、`SHOW ENGINE INNODB STATUS`、`performance_schema` 验证书中的结论，形成自己的笔记。
