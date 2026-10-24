# Lock Types (Table Locks, Row Locks)

This page focuses on the characteristics and usage of table locks, row locks and other lock types; for the overall locking mechanism in MySQL concurrency control, see [Locking Mechanisms](./locking-mechanisms.md).

In a database system, the types of locks directly affect concurrent access to data, performance and consistency. The main lock types include table locks and row locks. Below are the characteristics, applicable scenarios and examples of these two lock types.

## 1. Table Lock

**Definition**: A table lock is a mechanism that locks an entire table. When a table lock is taken in `WRITE` mode, other sessions can neither read nor write the table (only the session holding the lock can read and write); when a table lock is taken in `READ` mode, all sessions (including the one holding the lock) can only read, not write, until the lock is released.

**Characteristics**:
- **Whole-table locking**: While a write table lock is held, the entire table is inaccessible to other sessions.
- **Simple and easy to use**: Relatively simple to implement and manage, suitable for scenarios where the whole table is operated on.
- **Performance bottleneck**: In high-concurrency environments, a table lock can cause performance problems, because it blocks other transactions' access to the table.

**Applicable scenarios**:
- When a whole table needs to be bulk updated or maintained, a table lock can effectively prevent data conflicts.
- Suitable for cases where the entire table must be operated on and concurrency performance is not a concern.

**Example**:
```sql
-- 锁定整个表，进行写操作
LOCK TABLES accounts WRITE;
-- 执行对表的写操作
UPDATE accounts SET balance = balance + 100 WHERE account_id = 'A';
-- 释放锁
UNLOCK TABLES;
```

## 2. Row Lock

**Definition**: A row lock is a mechanism that locks specific rows of a table. When a row lock is acquired within a transaction, other transactions can only access rows that are not locked. Row locks enable finer-grained concurrency control.

**Characteristics**:
- **Fine-grained control**: Locks only specific rows of the table, improving concurrency performance.
- **Supports transaction isolation**: Provided mainly by the InnoDB storage engine, to achieve higher concurrency and data consistency.
- **Higher complexity**: Compared with table locks, row locks are more complex to manage and implement, but can significantly improve concurrency performance.

**Applicable scenarios**:
- Suitable for scenarios that need to operate on a small number of rows, such as updating a single record.
- Performs well in high-concurrency environments, because it locks only the necessary rows, avoiding the performance bottleneck of locking the whole table.

**Example**:
```sql
BEGIN;
-- 对特定行进行更新操作，锁定该行
UPDATE accounts SET balance = balance - 100 WHERE account_id = 'A';
-- 提交事务，释放行锁
COMMIT;
```

## Comparison of table locks and row locks

| Feature          | Table Lock               | Row Lock                   |
|------------------|--------------------------|----------------------------|
| Lock scope       | Entire table             | Specific rows in the table |
| Performance      | Bottleneck under high concurrency | Performs well under high concurrency |
| Complexity       | Simple                   | More complex               |
| Applicable scenario | Whole-table operations | Operations on specific records |
| Engines supporting it | All storage engines  | Provided mainly by InnoDB  |

## Summary

- **Table lock**: Suitable for whole-table operations, but may cause performance problems under high concurrency. Its advantage is that it is simple and easy to use, suitable for scenarios where the entire table must be operated on.
- **Row lock**: Provides finer-grained concurrency control, suitable for scenarios that need to operate on specific rows. Although it is more complex to implement and manage, it can improve performance and data consistency in high-concurrency environments.

Understanding the characteristics and applicable scenarios of table locks and row locks is crucial to designing an efficient database system, handling concurrent transactions and optimising performance.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)
- [MySQL 8.0 Reference Manual · InnoDB Lock Types](https://dev.mysql.com/doc/refman/8.0/en/innodb-locks-set.html)
- [MySQL 8.0 Reference Manual · InnoDB Next-Key Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-next-key-locking.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
