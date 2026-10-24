# Locking Mechanisms

This page organises locks from the perspective of concurrency control mechanisms; for the effect of transaction isolation levels on concurrent reads and writes, see [Isolation Levels and Locks](./isolation-levels-locks.md), and for the difference between table locks and row locks, see [Lock Types](./lock-types.md).

Locking mechanisms are an important means of controlling concurrent access to data in a database system. They ensure data consistency and integrity by managing access to the data, preventing data conflicts and inconsistency. Common locking mechanisms in MySQL include table locks, row locks, intention locks, gap locks, shared locks and exclusive locks. Below these locking mechanisms are organised by type:

## 1. Table Lock

**Definition**: A table lock locks an entire table, preventing other transactions from performing write operations on that table. A table lock can be shared or exclusive.

**Characteristics**:
- **Shared table lock**: Allows multiple transactions to read the same table, but does not allow write operations.
- **Exclusive table lock**: Prevents other transactions from accessing the table in any form, including reading and writing.

**Use cases**:
- Suitable for scenarios where the entire table needs to be operated on, such as bulk updates.
- In high-concurrency environments, it can cause performance bottlenecks, because the entire table is locked.

**Example**:
```sql
LOCK TABLES accounts WRITE;
-- 执行对表的写操作
UNLOCK TABLES;
```

## 2. Row Lock

**Definition**: A row lock locks specific rows of a table rather than the entire table. Other transactions can access other rows of the table, but cannot access the locked rows.

**Characteristics**:
- **Fine-grained control**: Improves concurrency performance, because only some rows of the table are locked.
- **Supports transaction isolation**: Provided mainly by the InnoDB storage engine, to achieve higher concurrency and data consistency.

**Use cases**:
- Suitable for scenarios that need to operate on specific records, such as single-row updates.
- Performs well in high-concurrency environments, because the locked range is smaller.

**Example**:
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 'A';
-- 行级锁定
COMMIT;
```

## 3. Intention Lock

**Definition**: An intention lock is used to indicate a transaction's intention to lock rows or a table. It is used mainly to coordinate the relationship between table-level and row-level locks.

**Characteristics**:
- **Coordination mechanism**: Used by storage engines that support row locking (such as InnoDB) to ensure the compatibility of table-level and row-level locks.
- **Types**: Includes the intention shared lock (IS) and the intention exclusive lock (IX).

**Use cases**:
- When row-level locks need to be placed on certain rows of a table, intention locks help coordinate and manage those locks.

**Example**:
```sql
-- 意向锁的应用主要在行锁操作中自动管理，用户无需直接操作意向锁。
```

## 4. Gap Lock

**Definition**: A gap lock locks the gap between two values in an index, preventing other transactions from inserting new records in that gap.

**Characteristics**:
- **Prevents phantom reads**: Used to prevent the phantom read problem, ensuring the dataset seen by a transaction during execution remains consistent.
- **Automatic management**: Managed automatically by MySQL; users do not need to set it explicitly.

**Use cases**:
- Used in scenarios where it is necessary to ensure that no new records are inserted in the gap of a query condition.

**Example**:
```sql
BEGIN;
-- 加锁读（当前读）会对扫描到的记录及间隙加临键锁/间隙锁
SELECT * FROM accounts WHERE balance BETWEEN 1000 AND 2000 FOR UPDATE;
COMMIT;
```
Note: An ordinary `SELECT` (snapshot read) reads a consistent view based on MVCC and does not take gap locks; only locking reads (`SELECT ... FOR UPDATE` / `FOR SHARE`) and current read operations such as `UPDATE` and `DELETE` use gap locks.

## 5. Shared Lock and Exclusive Lock

**Definition**:
- **Shared lock**: Allows other transactions to read the data, but not to write. Multiple transactions can hold a shared lock simultaneously.
- **Exclusive lock**: Other transactions cannot lock or modify the data; only one transaction can hold an exclusive lock. Note that in InnoDB, an ordinary consistent non-locking read (snapshot read) is not blocked by an X lock and can still read snapshot data.

**Characteristics**:
- **Shared lock**: Suitable for read-only operations, ensuring the data read is not modified during the transaction.
- **Exclusive lock**: Suitable for operations that need to modify data, ensuring the data is not accessed by other transactions during the transaction.

**Use cases**:
- **Shared lock**: Suitable for scenarios where data needs to be read without modification.
- **Exclusive lock**: Suitable for scenarios where data needs to be modified.

**Example**:
```sql
-- 共享锁
LOCK TABLES accounts READ;
-- 执行读取操作
UNLOCK TABLES;

-- 排他锁
LOCK TABLES accounts WRITE;
-- 执行写入操作
UNLOCK TABLES;
```

## Summary

- **Table lock**: Locks the entire table, suitable for whole-table operations but may cause performance bottlenecks.
- **Row lock**: Locks specific rows, improving concurrency performance; provided mainly by InnoDB.
- **Intention lock**: Used to indicate a transaction's intention to lock data, supporting the row locking mechanism.
- **Gap lock**: Locks index gaps, preventing phantom reads.
- **Shared lock and exclusive lock**: Control data reading and modification, ensuring data consistency.

Understanding and using locking mechanisms is crucial to optimising database performance, maintaining data consistency and handling concurrent transactions.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)
- [MySQL 8.0 Reference Manual · InnoDB Lock Types](https://dev.mysql.com/doc/refman/8.0/en/innodb-locks-set.html)
- [MySQL 8.0 Reference Manual · Internal Locking](https://dev.mysql.com/doc/refman/8.0/en/internal-locking.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
