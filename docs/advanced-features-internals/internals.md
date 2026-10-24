# Internals

Understanding the underlying principles of a database helps deeply understand how a database system works and its optimisation strategies. Below are some key aspects of MySQL internals:

## 1. Storage engines

MySQL supports multiple storage engines, each with different implementations for data storage, index management, transaction handling and so on. The main storage engines include:

- **InnoDB**: The default storage engine, supporting transactions, row-level locks, foreign key constraints and so on, and using the MVCC (Multi-Version Concurrency Control) mechanism to improve concurrency performance.
- **MyISAM**: The early default storage engine, which does not support transactions and uses table-level locks. Suitable for read-heavy scenarios.
- **MEMORY**: Stores data in memory, suitable for temporary tables and cached data, but data is lost after a restart.
- **CSV**: Stores data as CSV files, suitable for data exchange with other applications.

## 2. Data pages and data rows

- **Data pages**: InnoDB stores data in data pages, each typically 16 KB in size. Data pages are the basic unit of data storage, and InnoDB uses data pages to achieve efficient data reads and writes.
- **Data rows**: Data rows are stored within data pages. Each data page can contain multiple data rows. Data rows store data according to the table definition, and are compressed and stored as needed.

## 3. Log system

- **Redo Log**: Used to record a transaction's modification operations on the database (physical page-level modifications), to support transaction durability. The Redo Log uses the WAL (Write-Ahead Logging) approach: during transaction execution, modifications are first written to the Log Buffer and flushed to the Redo Log files, after which the data pages are modified, ensuring that committed transactions can be recovered even if the system crashes.
- **Undo Log**: Used to record the reverse operations of a transaction, to support transaction atomicity and isolation. The Undo Log is used during transaction rollback to undo modifications to data.
- **Binary Log**: Records all modification operations on the database, used for scenarios such as data recovery and master-slave replication. The Binary Log records logical operations, not physical data changes.

## 4. Query optimizer

The query optimizer is responsible for generating efficient execution plans. The optimizer analyses the query statement and selects the best execution path. The main optimisation strategies include:

- **Selecting the best index**: The optimizer selects an appropriate index to improve query performance. Index selection considers the index type, selectivity and query conditions.
- **Execution plan**: The optimizer generates different execution plans and selects the one with the lowest cost. An execution plan includes how tables are accessed, which indexes are used, how tables are joined, and so on.
- **Cost estimation**: The optimizer uses a cost estimation model to evaluate the cost of different execution plans, including I/O operations, CPU time, memory consumption and so on.

## 5. Caching mechanisms

- **Query cache**: MySQL 5.7 and earlier versions provided a query cache (Query Cache) used to cache query results and reduce repeated execution of the same query; however, because a change in a table's data invalidates all related cache entries, it became a bottleneck under high-concurrency writes, so **MySQL 8.0 has removed it entirely**.
- **InnoDB buffer pool**: InnoDB uses a buffer pool to cache data pages, index pages and so on, reducing disk I/O operations. The buffer pool improves data access speed.

## 6. Transaction handling

Transaction handling is one of the core functions of a database, ensuring the ACID properties (atomicity, consistency, isolation, durability) of transactions:

- **Transaction logs**: Record transaction operations, to persist data after a transaction is committed or to restore data when a transaction is rolled back.
- **Locking mechanism**: Uses locks to guarantee transaction isolation, preventing concurrent transactions from competing for data. The locking mechanism includes row locks and table locks.
- **MVCC**: InnoDB uses Multi-Version Concurrency Control (MVCC) to support transaction isolation in high-concurrency environments. MVCC allows read operations not to block write operations and write operations not to block read operations.

## 7. Storage structure

- **Tablespaces**: InnoDB stores table and index data in tablespaces. A tablespace can be a single file or a collection of multiple files.
- **Data dictionary**: The data dictionary stores metadata such as tables, columns and indexes, for the database engine to query and manage structure information.

## Summary

MySQL internals cover storage engines, data pages and data rows, the log system, the query optimizer, caching mechanisms, transaction handling and storage structure. Understanding these internals helps deeply master how MySQL works, optimise performance and resolve potential problems.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
