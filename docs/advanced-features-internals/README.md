# Internals and Advanced Features

My notes on the MySQL features and internal mechanics I reach for when debugging performance and concurrency problems: indexes, transactions, locking and storage engines.

## [Indexes](indexes.md)

Index types, how to create and manage them, and the performance effects I watch for while investigating queries.

- **[Index Types](index-types.md)**  
  The different index types (B-tree, hash index and so on) and where each applies.

- **[Creating and Managing Indexes](create-manage-indexes.md)**  
  Common operations and things to watch out for when creating, altering and dropping indexes.

- **[Index Optimization](index-optimization.md)**  
  How changing indexes affects query performance and execution time.

- **[Index Data Structures](index-why.md)**  
  Why B+ trees are the mainstream choice, and the trade-offs against hash tables, binary trees and others.

## [Transactions](transactions.md)

Transactions are what keep data consistent and intact. This section covers transaction concepts, ACID, transaction operations and isolation levels.

- **[Transaction Concepts](transaction-concepts.md)**  
  What transactions are, what they are for, and how they are used in MySQL.

- **[ACID Properties](acid-properties.md)**  
  The four properties of transactions: atomicity, consistency, isolation and durability.

- **[Using Transactions (BEGIN, COMMIT, ROLLBACK)](transaction-usage.md)**  
  Things to be careful about when starting, committing and rolling back transactions in MySQL.

- **[Isolation Levels and Locks](isolation-levels-locks.md)**  
  The different isolation level settings, how they affect data operations, and where locking comes in.

- **[Indexes and Locks](index-and-locks.md)**  
  How indexes affect lock scope, and why taking an index correctly reduces row-lock contention.

## [Locking Mechanisms](locking-mechanisms.md)

Locks keep data consistent under concurrent access. This section covers lock types, deadlock detection and handling, and lock optimisation.

- **[Lock Types (Table Locks, Row Locks)](lock-types.md)**  
  The difference between table locks and row locks, and where each applies.

- **[Deadlocks and Detection](deadlock-detection.md)**  
  What causes deadlocks, how they are detected and how to deal with them.

- **[Lock Optimization](lock-optimization.md)**  
  How lock tuning affects the database's ability to handle concurrency.

## [Internals](internals.md)

The MySQL internals I keep close when debugging performance, so I can cross-check against actual runtime behaviour.

- **[Storage Engines (InnoDB, MyISAM, and others)](storage-engines.md)**  
  The characteristics of the different storage engines and where each applies, such as InnoDB and MyISAM.

- **[Data Pages and Rows](data-pages-rows.md)**  
  The basic units of storage in MySQL: data pages and rows.

- **[Logs (Redo Log, Undo Log, Binary Log)](logs.md)**  
  What the logs do in MySQL: the redo log, undo log and binary log.

- **[MVCC (Multi-Version Concurrency Control)](Multi-Version-Concurrency-Control.md)**  
  Snapshot reads versus current reads, the undo version chain, and how MVCC supports the transaction isolation levels.

- **[Query Optimizer](query-optimizer.md)**  
  How the query optimizer works and how it helps improve query performance.

These notes record my understanding of MySQL's advanced features and internals, and how they relate to day-to-day administration and tuning.

---

- [Knowledge Notes](../knowledge.md) —— Core concepts, references, key points from the official docs, use cases and common pitfalls, all with in-site links.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)

## Related pages

- [Multi-Version-Concurrency-Control](Multi-Version-Concurrency-Control.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [Multi-Version-Concurrency-Control](Multi-Version-Concurrency-Control.md)
