# 高级功能与底层原理

这里记录我在排查性能和并发问题时用到的 MySQL 功能与内部机制，包括索引、事务、锁和存储引擎。

## [索引](indexes.md)

索引类型、创建管理和优化方式，以及我在查询排查中关注的性能影响。

- **[索引类型](index-types.md)**  
  不同索引类型（如 B-Tree、哈希索引）及其适用场景。

- **[创建与管理索引](create-manage-indexes.md)**  
  创建、修改和删除索引时的常见操作与注意点。

- **[索引优化](index-optimization.md)**  
  索引调整对查询性能和耗时的影响。

- **[索引的底层数据结构选择](index-why.md)**  
  解释为什么主流选择 B+ 树，以及与哈希、二叉树等结构的取舍。

## [事务](transactions.md)

事务关系到数据一致性和完整性。这里记录事务概念、ACID 特性、事务操作和隔离级别管理。

- **[事务概念](transaction-concepts.md)**  
  事务的定义、作用和 MySQL 中的用法。

- **[ACID特性](acid-properties.md)**  
  事务的四大特性：原子性、一致性、隔离性和持久性。

- **[事务的使用（BEGIN, COMMIT, ROLLBACK）](transaction-usage.md)**  
  在 MySQL 中启动、提交和回滚事务时需要留意的地方。

- **[隔离级别与锁](isolation-levels-locks.md)**  
  探讨事务隔离级别的不同设置及其对数据操作的影响，以及锁机制的应用。

- **[索引与锁](index-and-locks.md)**  
  分析索引对锁范围的影响，理解为什么走对索引能减少行锁冲突。

## [锁机制](locking-mechanisms.md)

锁机制控制并发操作下的数据一致性。这里整理锁的种类、死锁检测处理和锁优化策略。

- **[锁的种类（表锁、行锁）](lock-types.md)**  
  介绍表锁和行锁的区别及其应用场景。

- **[死锁与检测](deadlock-detection.md)**  
  死锁的成因、检测方式和处理思路。

- **[锁的优化策略](lock-optimization.md)**  
  锁优化对数据库并发处理能力的影响。

## [底层原理](internals.md)

我把与性能排查相关的 MySQL 内部机制放在这一节，方便对照实际运行行为。

- **[存储引擎（InnoDB、MyISAM等）](storage-engines.md)**  
  MySQL 中不同存储引擎的特点和适用场景，如 InnoDB 和 MyISAM。

- **[数据页与数据行](data-pages-rows.md)**  
  探索 MySQL 数据存储的基本单元：数据页和数据行。

- **[日志（Redo Log, Undo Log, Binary Log）](logs.md)**  
  了解日志在 MySQL 中的作用，包括重做日志、回滚日志和二进制日志。

- **[MVCC（多版本并发控制）](Multi-Version-Concurrency-Control.md)**  
  讲解快照读与当前读、undo 版本链，以及 MVCC 如何支撑事务隔离级别。

- **[查询优化器](query-optimizer.md)**  
  学习查询优化器的工作原理及其如何帮助提高查询性能。

这些笔记记录了我对 MySQL 高级功能和底层实现的理解，以及它们在管理和优化中的关联。

---

- [知识点整理](../knowledge.md) —— 核心概念、参考书目、官方文档要点、应用场景与常见坑，均带站内链接。

## 参考资料

- [MySQL 8.0 Reference Manual · InnoDB 存储引擎](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB 架构](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)

## 相关页面

- [Multi-Version-Concurrency-Control](Multi-Version-Concurrency-Control.md)

<!-- BACKLINKS-AUTO -->
## 相关页面

- [Multi-Version-Concurrency-Control](Multi-Version-Concurrency-Control.md)
