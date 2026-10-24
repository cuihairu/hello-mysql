# 事务

事务是数据库管理系统中用于管理一系列操作的机制，确保数据库的完整性和一致性。事务在数据库操作中扮演着重要的角色，能够保证多个操作要么全部成功，要么全部失败，从而避免数据的不一致性。

## 要点摘要

事务把一组数据库操作作为一个工作单元；提交后结果持久化，失败时可回滚。MySQL 中的事务行为还受隔离级别、存储引擎和自动提交设置影响。

- 事务定义与 ACID：见[事务概念](./transaction-concepts.md)。
- 隔离级别、并发读写与锁：见[隔离级别与锁](./isolation-levels-locks.md)。
- `BEGIN`、`COMMIT`、`ROLLBACK` 与自动提交：见[事务的使用](./transaction-usage.md)。

本文保留一个总览，并记录我在具体业务场景里关注的事务边界；各机制的完整说明以上述主题页为准。

## 6. 事务的应用场景

- **银行转账**：涉及到账户余额的转账操作必须保证原子性，避免在转账过程中出现不一致的情况。

- **订单处理**：电商系统中的订单处理需要保证数据的一致性和完整性，避免订单状态的异常。

- **库存管理**：在库存系统中，需要确保库存操作的事务一致性，以避免超卖或库存不足的问题。

## 总结

事务是数据库管理中不可或缺的机制，通过实现ACID特性，事务确保了数据操作的完整性、一致性、隔离性和持久性。正确地使用事务，可以有效管理数据库操作，处理复杂的业务逻辑，保障数据的可靠性和一致性。

## 参考资料

- [MySQL 8.0 Reference Manual · InnoDB 存储引擎](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB 架构](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB 事务模型](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-model.html)

<!-- BACKLINKS-AUTO -->
## 相关页面

- [README](README.md)
- [glossary](/zh/glossary.md)
