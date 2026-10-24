# MVCC (Multi-Version Concurrency Control)

MVCC (Multi-Version Concurrency Control) is a technique for concurrency control that achieves efficient concurrent access by maintaining multiple versions of data. The main goal of MVCC is to resolve read/write conflicts in the database, so that read operations do not block write operations, and write operations do not block read operations. The InnoDB storage engine is the typical example of MVCC in MySQL.

## 1. Basic principles of MVCC

MVCC provides isolation by giving each transaction a snapshot of the data, which means each transaction sees the data as it was when the transaction started. This mechanism allows transactions to read old versions of data without being affected by new data written by other transactions, thereby enabling non-blocking reads.

- **Data versions**: Each row of data creates a new version when updated, while retaining the old version. The new version is assigned a unique transaction ID (Transaction ID), used to identify which transaction created that version.
- **Snapshot reads**: When reading data, a transaction determines which version to read based on the data's transaction ID and its own transaction ID. Snapshot reads avoid read/write conflicts and enable non-blocking reads.
- **Consistent view**: Each transaction reads data based on a consistent view (Read View, containing the data versions the transaction can see at that moment), thereby achieving snapshot isolation. Under the REPEATABLE READ isolation level, the read view is created when the transaction performs its first consistent read and is reused for the entire transaction; under the READ COMMITTED isolation level, a new read view is created for every query statement.

## 2. MVCC implementation mechanism

The InnoDB storage engine implements MVCC by maintaining the undo log and hidden columns.

- **Undo log**: The undo log records old version information of data. When a transaction performs an update operation, InnoDB saves the old version of the data to the undo log, so that the old version can be provided when needed. These undo logs are also used for transaction rollback operations.
- **Hidden columns**: InnoDB adds three hidden columns to each row of data: `DB_TRX_ID` (the transaction ID of the last transaction that inserted or updated the row), `DB_ROLL_PTR` (rollback pointer, pointing to the old version record of the row in the undo log, used to trace back the version chain), and `DB_ROW_ID` (used as the clustered index row ID when a table has no primary key and no non-null unique index). Through these hidden columns and the version chain in the undo log, InnoDB can determine which data version a transaction should see when reading data.

## 3. MVCC read operations

MVCC supports two types of read operations: snapshot reads and current reads.

- **Snapshot Read**: A snapshot read reads an old version of the data, enabling non-blocking reads. Most SELECT queries are snapshot reads. For example:
  ```sql
  SELECT * FROM employees WHERE id = 1;
  ```

- **Current Read**: A current read reads the latest version of the data and may lock the data to prevent other transactions from modifying it. Common current read operations include SELECT ... FOR UPDATE, SELECT ... LOCK IN SHARE MODE, UPDATE and DELETE. For example:
  ```sql
  SELECT * FROM employees WHERE id = 1 FOR UPDATE;
  ```

## 4. MVCC write operations

Write operations (INSERT, UPDATE, DELETE) create new versions of data and save the old versions in the undo log. Write operations require acquiring row-level locks to prevent other transactions from modifying the same data concurrently.

- **INSERT**: When inserting new data, InnoDB assigns a unique transaction ID to the new row and stores that transaction ID in the hidden column.
- **UPDATE**: When updating data, InnoDB saves the old version of the data to the undo log, creates a new version, and updates the transaction ID in the hidden column.
- **DELETE**: When deleting data, InnoDB does not physically delete the row immediately; instead it marks the row as deleted (delete mark) and writes the old version to the undo log, so that other transactions still reading the old version can continue accessing it; once the relevant transactions finish, a background thread (purge) cleans it up.

## 5. Advantages of MVCC

- **High concurrency**: MVCC allows transactions to not block write operations when reading, achieving high-concurrency access.
- **Consistent view**: Each transaction reads data based on a consistent view, guaranteeing read consistency and avoiding dirty reads and non-repeatable reads.
- **Transaction isolation**: InnoDB uses MVCC to implement consistent reads under both the REPEATABLE READ (default isolation level) and READ COMMITTED isolation levels; it is the foundation of these two isolation levels.

## 6. Limitations of MVCC

- **Storage overhead**: Because MVCC needs to maintain multiple versions of data, it increases storage overhead, especially under frequent updates.
- **Complexity**: The MVCC implementation mechanism is relatively complex, requiring management of undo logs and hidden columns, as well as handling relationships between versions.

## Summary

MVCC is a powerful concurrency control technique that achieves efficient read/write concurrency by maintaining multiple versions of data. The InnoDB storage engine implements MVCC through undo logs and hidden columns, providing non-blocking read operations and a consistent view, effectively improving the database's concurrency performance and data consistency. However, MVCC also brings additional storage overhead and implementation complexity. In practice, using the MVCC mechanism appropriately can significantly improve the performance and scalability of the database system.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html)

## Related pages

- [README](README.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
- [knowledge](/knowledge.md)
