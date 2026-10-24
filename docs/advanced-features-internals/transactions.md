# Transactions

Transactions are the mechanism in a database management system for managing a series of operations, ensuring the integrity and consistency of the database. Transactions play an important role in database operations: they guarantee that multiple operations either all succeed or all fail, avoiding data inconsistency.

## Key points

A transaction groups a set of database operations into a single unit of work; once committed, the result is durable, and on failure it can be rolled back. Transaction behaviour in MySQL is also affected by isolation level, storage engine and the autocommit setting.

- Transaction definition and ACID: see [Transaction Concepts](./transaction-concepts.md).
- Isolation levels, concurrent reads/writes and locks: see [Isolation Levels and Locks](./isolation-levels-locks.md).
- `BEGIN`, `COMMIT`, `ROLLBACK` and autocommit: see [Using Transactions (BEGIN, COMMIT, ROLLBACK)](./transaction-usage.md).

This page keeps an overview, and records the transaction boundaries I watch for in concrete business scenarios. For the full treatment of each mechanism, the topic pages above are the source of truth.

## 6. Application scenarios

- **Bank transfers**: Transfer operations involving account balances must be atomic, to avoid inconsistency during the transfer.

- **Order processing**: Order processing in e-commerce systems needs to maintain data consistency and integrity, avoiding anomalous order states.

- **Inventory management**: Inventory systems need to ensure transactional consistency of inventory operations, to avoid overselling or stock-out problems.

## Summary

Transactions are an indispensable mechanism in database management. By implementing the ACID properties, transactions ensure the integrity, consistency, isolation and durability of data operations. Using transactions correctly helps manage database operations, handle complex business logic, and guarantee data reliability and consistency.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Transaction Model](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-model.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
