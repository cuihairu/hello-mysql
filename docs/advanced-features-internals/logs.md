# Logs (Redo Log, Undo Log, Binary Log)

In MySQL, logs are a key component of database management and recovery. They are used to record changes to the database, support transaction processing, and guarantee data consistency and durability. Below are the three main log types and their functions and use cases:

## 1. Redo Log

- **Definition**:
  - The Redo Log records all modification operations on the database, so that these operations can be reapplied after a system crash. It ensures data durability, allowing data to be recovered even after a failure.

- **Functions**:
  - **Persistence**: Records all modification operations on the database (the physical modifications to data pages from INSERT, UPDATE, DELETE) and writes these operations to the log files.
  - **Crash recovery**: After a database crash, the system can use the Redo Log to replay modifications that were committed but not yet written to the data files; for uncommitted transactions, it rolls back using the Undo Log, thereby guaranteeing database consistency.

- **Working mechanism**:
  - **Write method**: Before a transaction is committed, the database first writes the operations to the Redo Log, and then updates the data files.
  - **Flushing**: The Redo Log is flushed to disk periodically to reduce the overhead of persistence operations. Whether to flush to disk immediately at commit time is controlled by the parameter `innodb_flush_log_at_trx_commit` (the default value is 1, meaning flush to disk at every commit, guaranteeing durability).

- **File structure**:
  - **Log Buffer**: An in-memory log buffer used to temporarily store log records.
  - **Redo Log Files**: Log files on disk that store all log records.

- **Use cases**:
  - **Crash recovery**: After a system crash or unexpected power loss, the Redo Log is used to recover the un-flushed modifications of committed transactions.
  - **Data durability**: Ensures all committed transactions can be recovered from persistent storage, even after a failure.

## 2. Undo Log

- **Definition**:
  - The Undo Log records all modification operations on the database, so that these operations can be undone during transaction rollback. It ensures transaction atomicity, meaning all operations in a transaction either fully succeed or fully fail.

- **Functions**:
  - **Transaction rollback**: When a transaction fails or is explicitly rolled back by the user, the Undo Log is used to undo all modifications the transaction made to data, restoring the state before the transaction began.
  - **MVCC support**: Supports Multi-Version Concurrency Control (MVCC), allowing concurrent transactions to see a consistent snapshot of data without being disturbed by other transactions.

- **Working mechanism**:
  - **Log recording**: Each time a modification operation is made to the database, the Undo Log records the information needed to undo those operations.
  - **Rollback operation**: When rolling back a transaction, the information in the Undo Log is used to restore the data to the state before the transaction began.

- **File structure**:
  - **Undo Log Segments**: Storage segments of the Undo Log, recording the undo operations of each transaction.

- **Use cases**:
  - **Transaction rollback**: When a transaction fails or the user actively requests a rollback, the Undo Log is used to recover the data.
  - **Concurrency control**: Under Multi-Version Concurrency Control, the Undo Log supports consistent read operations.

## 3. Binary Log

- **Definition**:
  - The Binary Log records all modification operations on the database, including DDL (Data Definition Language) and DML (Data Manipulation Language) operations. It is used for data replication and recovery operations.

- **Functions**:
  - **Data replication**: A key component of master-slave replication. The master server records modification operations to the Binary Log, and the slave server reads these logs and applies them to its own data, maintaining data consistency.
  - **Data recovery**: By reading the Binary Log, a user can restore the database to a specific point in time or state.

- **Working mechanism**:
  - **Log recording**: Each time a data modification operation occurs, the Binary Log records those operations, including the SQL statements and the changed data. The Binary Log has three formats: STATEMENT (records SQL statements), ROW (records the actual changes to rows, the default in MySQL 8.0) and MIXED (hybrid mode), controlled by the parameter `binlog_format`.
  - **Backup and recovery**: The Binary Log can be used for incremental backups and data recovery, restoring the database to a specific point in time.

- **File structure**:
  - **Binary Log Files**: Log files containing all recorded modification operations.
  - **Index File**: An index file recording the list and order of Binary Log files.

- **Use cases**:
  - **Master-slave replication**: In a master-slave replication setup, the master server uses the Binary Log to pass changes to the slave server.
  - **Data recovery**: Uses the Binary Log to restore the database to a specific point in time, enabling incremental backups and point-in-time recovery.

## Summary

The MySQL log system (Redo Log, Undo Log and Binary Log) is an important component of database management and recovery. Different log types have different functions and working mechanisms:

- **Redo Log**: Used to persist transaction changes, ensuring data consistency after a crash.
- **Undo Log**: Used for transaction rollback and MVCC support, ensuring data consistency and concurrency control.
- **Binary Log**: Used for master-slave replication and data recovery, supporting incremental backups and point-in-time recovery.

Understanding the working mechanism and use cases of these logs helps optimise database performance, guarantee data integrity, and perform effective data backup and recovery.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Redo Log](https://dev.mysql.com/doc/refman/8.0/en/innodb-redo-log.html)
- [MySQL 8.0 Reference Manual · InnoDB Undo Logs](https://dev.mysql.com/doc/refman/8.0/en/innodb-undo-logs.html)
- [MySQL 8.0 Reference Manual · Binary Log](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
- [knowledge](/knowledge.md)
