# Transaction Concepts

This page is the full treatment of the transaction definition and the ACID properties; [Transactions](./transactions.md) keeps a brief overview and application scenarios, and [Using Transactions](./transaction-usage.md) covers operational details.

Transactions are a core concept in a database management system. They cover a series of database operations that either all succeed or all fail. The main purpose of a transaction is to ensure the integrity and consistency of database operations. Below are the transaction concepts and key properties.

## 1. Transaction definition

A transaction is a logical unit of database operations, composed of one or more SQL statements that are treated as a single unit when executed. The main characteristic of a transaction is that all operations performed in it either fully succeed or are not executed at all. Whether a transaction succeeds affects the result of the entire operation, so a transaction is indivisible.

## 2. Transaction properties

A transaction has four important properties, commonly called the ACID properties:

- **Atomicity**:
  - Atomicity ensures that all operations in a transaction either fully complete or do not complete at all. Every operation in the transaction must succeed, otherwise the whole transaction is rolled back to its initial state. For example, in a transfer transaction, if debiting account A succeeds but crediting account B fails, the entire transfer operation is rolled back, keeping both accounts consistent.

- **Consistency**:
  - Consistency guarantees that the database's consistency constraints are not broken before or after the transaction. A transaction never leaves the database in an inconsistent state. For example, the total amount in the database should remain unchanged before and after a transfer.

- **Isolation**:
  - Isolation ensures that a transaction's operations are not interfered with by other transactions. Even in a concurrent environment, each transaction's operations should be independent, as if the other transactions did not exist. Different isolation levels provide different degrees of isolation:
    - **Read Uncommitted**: A transaction can read data that has not been committed, which may lead to dirty reads.
    - **Read Committed**: A transaction can only read data that has been committed, preventing dirty reads but which may lead to non-repeatable reads.
    - **Repeatable Read**: Data seen by a transaction during execution is consistent. Per the SQL standard, phantom reads may occur, but MySQL InnoDB largely avoids phantom reads through MVCC and gap locks / next-key locks.
    - **Serializable**: The highest isolation level; transactions are completely isolated, as if executed one after another.

- **Durability**:
  - Durability guarantees that once a transaction is committed, its modifications to the database are permanent and will not be lost even if the system crashes. For example, once a transfer in a banking system has been successfully committed, the transfer result should persist even if the system fails.

## 3. Transaction operations

Transaction operations usually involve the following steps:

- **Begin transaction (BEGIN)**: Marks the start point of the transaction. All subsequent database operations belong to that transaction.

  ```sql
  BEGIN;
  ```

- **Commit transaction (COMMIT)**: Permanently saves all operations in the transaction to the database. If the transaction succeeds, `COMMIT` writes all changes to the database.

  ```sql
  COMMIT;
  ```

- **Rollback transaction (ROLLBACK)**: Undoes all operations in the transaction, restoring the database to the state before the transaction started. If the transaction fails or an error occurs, `ROLLBACK` undoes all changes.

  ```sql
  ROLLBACK;
  ```

## 4. Transaction management

- **Autocommit**: MySQL enables autocommit by default (`autocommit = 1`), in which case every SQL statement is treated as an independent transaction and committed immediately. Once a transaction is explicitly opened (`BEGIN` / `START TRANSACTION`), autocommit is suspended until `COMMIT` or `ROLLBACK`.

  ```sql
  SET autocommit = 1;
  ```

- **Explicit transactions**: Use the `BEGIN`, `COMMIT` and `ROLLBACK` statements to manage transactions, to ensure the atomicity and consistency of a series of operations.

## 5. Application scenarios

Transactions play a key role in many real-world application scenarios, including but not limited to:

- **Financial transactions**: Operations such as bank transfers and account updates need to guarantee transaction atomicity and consistency.
- **E-commerce systems**: Order processing, inventory management and so on need to guarantee data consistency and integrity.
- **Log recording**: In system logs, transaction handling ensures the integrity and consistency of log records.

## Summary

Transactions are the basic unit of database operations, guaranteeing the atomicity, consistency, isolation and durability of data operations. Understanding and using transactions correctly is critical to the stability of a database system and to data consistency.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Transaction Model](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-model.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
- [knowledge](/knowledge.md)
