# Isolation Levels and Locks

This page explains isolation levels and their relationship with locks from the perspective of transaction concurrency; for lock types and implementation details, see [Locking Mechanisms](./locking-mechanisms.md) and [Lock Types](./lock-types.md).

In a database management system, isolation levels and locking mechanisms are key components for ensuring the correctness of transaction processing and data consistency. Isolation levels define the degree of isolation between transactions during concurrent execution, while locking mechanisms are used to control concurrent access to data.

## Isolation levels

An isolation level defines how visible one transaction is to other transactions; different isolation levels affect transaction concurrency behaviour and data consistency. MySQL provides the following four isolation levels (InnoDB's default level is REPEATABLE READ):

1. **READ UNCOMMITTED**

   - **Definition**: A transaction can read data that other transactions have not yet committed.
   - **Characteristics**: Allows "dirty reads", meaning a transaction can read modifications made by other transactions that have not yet been committed. This can lead to data inconsistency.
   - **Use cases**: Suitable for scenarios that do not require strict data consistency, such as log recording.

   **Example**:
   ```sql
   SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
   BEGIN;
   -- Perform read operations
   ```

2. **READ COMMITTED**

   - **Definition**: A transaction can only read data that other transactions have already committed.
   - **Characteristics**: Prevents "dirty reads", but "non-repeatable reads" may occur, meaning data read within the same transaction may change because other transactions commit.
   - **Use cases**: Suitable for most applications, balancing data consistency and concurrency.

   **Example**:
   ```sql
   SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
   BEGIN;
   -- Perform read operations
   ```

3. **REPEATABLE READ**

   - **Definition**: Reads of the same data by a transaction are consistent throughout its lifecycle, even if other transactions commit modifications.
   - **Characteristics**: Prevents "dirty reads" and "non-repeatable reads". Per the SQL standard, "phantom reads" may still occur; however, in MySQL InnoDB, MVCC snapshot reads and gap locks / next-key locks largely avoid phantom reads.
   - **Use cases**: Suitable for scenarios that need to guarantee read consistency, such as report generation.

   **Example**:
   ```sql
   SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
   BEGIN;
   -- Perform read operations
   ```

4. **SERIALIZABLE**

   - **Definition**: Transactions are completely isolated, simulating the effect of serial execution, meaning there is no concurrent interference between transactions.
   - **Characteristics**: Prevents all concurrency problems, including "dirty reads", "non-repeatable reads" and "phantom reads". The performance overhead is large, because it requires transactions to be completely serialised.
   - **Use cases**: Suitable for scenarios with extremely high data consistency requirements, such as bank transactions.

   **Example**:
   ```sql
   SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
   BEGIN;
   -- Perform read operations
   ```

## Locking mechanism

Locking mechanisms are used to control concurrent access to the same data by multiple transactions. MySQL supports several lock types:

1. **Table lock**

   - **Definition**: Locks the entire table; other transactions cannot perform write operations on that table, but may be able to read (depending on the lock type).
   - **Characteristics**: Simple and easy to use, suitable for whole-table operations, but may cause performance bottlenecks under high concurrency.
   - **Example**:
     ```sql
     LOCK TABLES accounts WRITE;
     -- Perform table-level operations
     UNLOCK TABLES;
     ```

2. **Row lock**

   - **Definition**: Locks specific rows in a table; only the locked rows are locked, and other transactions can access other rows in the table.
   - **Characteristics**: Improves concurrency performance, but lock management is more complex. Provided mainly by the InnoDB storage engine.
   - **Example**:
     ```sql
     BEGIN;
     UPDATE accounts SET balance = balance - 100 WHERE account_id = 'A';
     -- Row-level lock
     COMMIT;
     ```

3. **Intention lock**

   - **Definition**: Used to indicate a transaction's intention to lock certain rows or a table; mainly used to coordinate table-level and row-level locks.
   - **Characteristics**: Used mainly by storage engines that support row locking, such as InnoDB.

4. **Gap lock**

   - **Definition**: Locks the gap between two values in an index, preventing other transactions from inserting new records in that gap.
   - **Characteristics**: Used to prevent the phantom read problem.
   - **Example**:
     ```sql
     BEGIN;
     -- A current read (locking read) applies next-key locks / gap locks to the scanned records and their gaps
     SELECT * FROM accounts WHERE balance BETWEEN 1000 AND 2000 FOR UPDATE;
     COMMIT;
     ```
     Note: An ordinary `SELECT` (snapshot read) reads a consistent view based on MVCC and does not take gap locks; gap locks appear only in locking reads (`SELECT ... FOR UPDATE` / `FOR SHARE`) and in current read operations such as `UPDATE` and `DELETE`.

5. **Shared lock and exclusive lock**

   - **Shared lock**: A transaction holding an S lock can read data, other transactions can still take an S lock, but cannot take an X lock or modify the data.
   - **Exclusive lock**: A transaction holding an X lock can read and write data; other transactions cannot take any lock on that row or modify it. Note that in InnoDB, an ordinary consistent non-locking read (snapshot read) is not blocked by an X lock and can still read snapshot data; what is blocked are locking reads and write operations.

   **Example**:
   ```sql
   -- Shared lock
   LOCK TABLES accounts READ;
   -- Perform read operations
   UNLOCK TABLES;

   -- Exclusive lock
   LOCK TABLES accounts WRITE;
   -- Perform write operations
   UNLOCK TABLES;
   ```

## Summary

- **Isolation levels**: Define how visible one transaction is to other transactions, including `READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ` and `SERIALIZABLE`.
- **Locking mechanism**: Includes table locks, row locks, intention locks, gap locks, shared locks and exclusive locks, used to control concurrent transaction access to data.

Understanding isolation levels and locking mechanisms is an important foundation for optimising database performance, maintaining data consistency and handling concurrent transactions.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Transaction Model](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-model.html)
- [MySQL 8.0 Reference Manual · SET TRANSACTION](https://dev.mysql.com/doc/refman/8.0/en/set-transaction.html)
- [MySQL 8.0 Reference Manual · InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
- [knowledge](/knowledge.md)
