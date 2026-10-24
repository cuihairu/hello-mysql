# ACID Properties

ACID is the four fundamental properties of database transaction management, used to ensure the reliability and consistency of the database. ACID stands for Atomicity, Consistency, Isolation and Durability. Below is a detailed explanation of each property:

## 1. Atomicity

**Definition**: Atomicity guarantees that all operations within a transaction either fully complete or are not executed at all. A transaction is a single unit of database operations: it either succeeds completely or fails completely, with no intermediate state.

**Implementation**:
- **Start transaction**: All transaction operations are marked as a single unit; a transaction context is created when the transaction begins.
- **Commit transaction**: If all operations succeed, `COMMIT` applies all changes in the transaction to the database.
- **Rollback transaction**: If an error occurs, `ROLLBACK` undoes all operations in the transaction, restoring the state before the transaction started.

**Example**:
In a bank transfer, moving money from account A to account B is a single transaction. If debiting account A succeeds but crediting account B fails, the entire operation is rolled back, ensuring both accounts stay consistent.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 'A';
UPDATE accounts SET balance = balance + 100 WHERE account_id = 'B';
COMMIT;
```

## 2. Consistency

**Definition**: Consistency guarantees that the database's integrity constraints are not violated before or after a transaction. A transaction should move the database from one consistent state to another.

**Implementation**:
- **Data integrity**: Database constraints (such as primary keys, foreign keys and unique constraints) ensure data correctness.
- **Business rules**: The transaction should ensure all business rules and data integrity constraints remain valid after the operation.

**Example**:
In order processing, the transaction should ensure that when an order is created, the inventory count is updated correctly, maintaining inventory accuracy and consistency.

```sql
BEGIN;
INSERT INTO orders (order_id, customer_id, total_amount) VALUES ('O123', 'C456', 250);
UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 'P789';
COMMIT;
```

## 3. Isolation

**Definition**: Isolation guarantees that a transaction's operations are not affected by other transactions; each transaction's operations are invisible to others. Even in a concurrent environment, transactions should be isolated from each other.

**Implementation**:
- **Isolation levels**: Database systems provide different isolation levels to control the degree of isolation between transactions. Common isolation levels include:
  - **Read Uncommitted**: A transaction can read data that has not been committed by other transactions, which may lead to dirty reads.
  - **Read Committed**: A transaction can only read data that has been committed by other transactions, preventing dirty reads but which may lead to non-repeatable reads.
  - **Repeatable Read**: Data seen by a transaction during execution is consistent. Per the SQL standard, phantom reads may occur, but MySQL InnoDB largely avoids phantom reads through MVCC and gap locks / next-key locks.
  - **Serializable**: The highest isolation level; transactions are completely isolated, as if executed one after another.

**Example**:
When two transactions try to modify the same record at the same time, isolation ensures that one transaction's modification is invisible to the other until the first transaction completes.

```sql
-- 事务A
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 'A';

-- 事务B
BEGIN;
SELECT balance FROM accounts WHERE account_id = 'A';  -- 事务B看到的余额可能未被事务A的修改影响
COMMIT;
```

## 4. Durability

**Definition**: Durability guarantees that once a transaction is committed, all its modifications to the database are permanent and will not be lost due to system failures or other errors. The results of the transaction are saved to the database's non-volatile storage.

**Implementation**:
- **Logs**: The database system uses logs to record all transaction operations. Once a transaction is committed, the logs record all changes made by that transaction and are used during recovery to redo those operations.
- **Data storage**: Even if the system crashes, modifications from committed transactions are recovered through data files and logs, ensuring data consistency and integrity.

**Example**:
After an order is created, even if the database crashes, the order information and related data remain in the database.

```sql
BEGIN;
INSERT INTO orders (order_id, customer_id, total_amount) VALUES ('O123', 'C456', 250);
COMMIT;  -- 即使系统崩溃，订单也会被记录在数据库中
```

## Summary

The ACID properties ensure the reliability and consistency of database transactions. Understanding and applying these properties when designing and implementing database transactions helps ensure data integrity, accuracy and stability.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Transaction Model](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-model.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
- [knowledge](/knowledge.md)
