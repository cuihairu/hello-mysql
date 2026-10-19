# 架构与部署

这里整理我对 MySQL 架构、部署、备份和恢复的实践记录，包括不同方案的取舍及可靠性相关问题。

## [数据库架构](database-architecture.md)

数据库架构设计对于数据库系统的性能、可靠性和可扩展性至关重要。本节将介绍不同的数据库架构类型和如何根据需求选择合适的架构。

- **[单实例架构](single-instance-architecture.md)**  
  了解单实例架构的基本概念，包括其优点和局限性。这种架构适用于小型到中型的应用场景。

- **[主从复制（Master-Slave Replication）](master-slave-replication.md)**  
  探讨主从复制架构的工作原理、配置方法及其在负载均衡和数据备份中的应用。

- **[主主复制（Master-Master Replication）](master-master-replication.md)**  
  主主复制架构的设计与实现，以及多个主节点间的数据同步和可用性取舍。

- **[集群架构（MySQL Cluster）](mysql-cluster.md)**  
  介绍 MySQL 集群架构，包括其设计原理、优势以及如何配置和管理集群以实现高可用性和可扩展性。

- **[高可用架构（MHA, Galera Cluster）](high-availability-architecture.md)**  
  MHA 和 Galera Cluster 等高可用方案，以及故障场景下的运行方式。

## [备份与恢复](backup-recovery.md)

数据备份和恢复是数据库管理的重要方面。本节将讨论不同的备份方法以及如何在数据丢失或损坏时进行恢复。

- **[物理备份（冷备、热备）](physical-backup.md)**  
  学习物理备份的概念，包括冷备份和热备份的优缺点及其适用场景。

- **[逻辑备份（mysqldump, MySQL Workbench）](logical-backup.md)**  
  逻辑备份工具和方法，包括 mysqldump、MySQL Workbench 及数据完整性方面的注意点。

- **[恢复策略](recovery-strategies.md)**  
  了解不同的数据恢复策略，包括如何制定恢复计划、测试恢复过程及应对数据恢复过程中可能遇到的问题。

这些记录覆盖 MySQL 架构设计与备份恢复，供我回看方案选择和运维细节。

---

- [知识点整理](../knowledge.md) —— 核心概念、参考书目、官方文档要点、应用场景与常见坑，均带站内链接。

## 参考资料

- [MySQL 8.0 Reference Manual · 复制](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [MySQL 8.0 Reference Manual · 备份与恢复](https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html)

## 相关页面

- [backup-recovery](backup-recovery.md)

<!-- BACKLINKS-AUTO -->
## 相关页面

- [backup-recovery](backup-recovery.md)
