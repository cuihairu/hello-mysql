# Using Transactions (BEGIN, COMMIT, ROLLBACK)

In a database management system, a transaction is a set of SQL statements executed as a single operation: the operations either fully succeed or fully fail. The basic transaction operations are `BEGIN`, `COMMIT` and `ROLLBACK`, which control the transaction lifecycle.

## 1. BEGIN

**Definition**: `BEGIN` starts a new transaction. It marks the beginning of the transaction; from this point on, all operations within the transaction are treated as a single unit until the transaction ends (`COMMIT` or `ROLLBACK`).

**Syntax**:
```sql
BEGIN;
```

**Example**:
```sql
BEGIN;
-- 事务中的操作
```

## 2. COMMIT

**Definition**: `COMMIT` commits the current transaction. It permanently saves all changes in the transaction to the database, making them visible to other transactions. If all operations execute successfully, `COMMIT` makes those operations take effect.

**Syntax**:
```sql
COMMIT;
```

**Example**:
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 'A';
UPDATE accounts SET balance = balance + 100 WHERE account_id = 'B';
COMMIT;
```

In this example, `BEGIN` opens a transaction, the two `UPDATE` operations are contained in the transaction, and `COMMIT` ensures that these operations either all succeed or are all committed.

## 3. ROLLBACK

**Definition**: `ROLLBACK` undoes all operations in the current transaction. It restores the database to the state before the transaction began. It is typically used to undo all operations when an error occurs during a transaction, to maintain data consistency.

**Syntax**:
```sql
ROLLBACK;
```

**Example**:
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 'A';
UPDATE accounts SET balance = balance + 100 WHERE account_id = 'B';

-- 如果在此处发生了错误，执行 ROLLBACK
ROLLBACK;
```

In this example, if an error occurs during the transaction, `ROLLBACK` undoes all the `UPDATE` operations, keeping the database in the state it was in before the transaction started.

## Application scenarios for transaction operations

1. **Bank transfer**: Ensures that moving funds from one account to another is complete and consistent.
   ```sql
   BEGIN;
   UPDATE accounts SET balance = balance - 100 WHERE account_id = 'A';
   UPDATE accounts SET balance = balance + 100 WHERE account_id = 'B';
   COMMIT;
   ```

2. **Order processing**: Ensures that the order insertion and the inventory update either both succeed or both are undone.
   ```sql
   BEGIN;
   INSERT INTO orders (order_id, customer_id, total_amount) VALUES ('O123', 'C456', 250);
   UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 'P789';
   COMMIT;
   ```

3. **Batch data update**: Ensures consistency when performing complex data updates.
   ```sql
   BEGIN;
   UPDATE employees SET salary = salary * 1.1 WHERE department_id = 10;
   UPDATE department SET budget = budget - 10000 WHERE department_id = 10;
   COMMIT;
   ```

## Summary

- **`BEGIN`**: Starts a new transaction.
- **`COMMIT`**: Commits all operations in the transaction, making them permanently effective.
- **`ROLLBACK`**: Undoes all operations in the transaction, restoring the state before the transaction began.

Using transactions correctly helps maintain data integrity and consistency, which is essential when handling complex operations.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · COMMIT](https://dev.mysql.com/doc/refman/8.0/en/commit.html)
- [MySQL 8.0 Reference Manual · SAVEPOINT](https://dev.mysql.com/doc/refman/8.0/en/savepoint.html)
- [MySQL 8.0 Reference Manual · SET TRANSACTION](https://dev.mysql.com/doc/refman/8.0/en/set-transaction.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
