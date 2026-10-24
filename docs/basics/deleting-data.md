# Deleting Data (DELETE)

The `DELETE` statement is used to remove existing data from a MySQL table. Below are the main uses of the `DELETE` statement along with some examples.

## 1. Basic DELETE Statements

- **Delete a single row matching the condition**
  ```sql
  DELETE FROM table_name
  WHERE condition;
  ```
  Example:
  ```sql
  DELETE FROM employees
  WHERE id = 1;
  ```

- **Delete multiple rows matching the condition**
  ```sql
  DELETE FROM table_name
  WHERE condition;
  ```
  Example:
  ```sql
  DELETE FROM employees
  WHERE department = 'Sales';
  ```

## 2. Deleting All Data

- **Delete all data from a table**
  ```sql
  DELETE FROM table_name;
  ```
  Example:
  ```sql
  DELETE FROM employees;
  ```
  Note: This operation deletes all rows from the table but does not remove the table structure.

## 3. Using LIMIT to Restrict the Number of Deleted Rows

- **Limit the number of rows deleted**
  ```sql
  DELETE FROM table_name
  WHERE condition
  LIMIT number;
  ```
  Example:
  ```sql
  DELETE FROM employees
  WHERE department = 'Temporary'
  LIMIT 5; -- delete the first 5 rows matching the condition
  ```

## 4. Safety When Deleting Data

- **Avoid accidentally deleting all data**
  Make sure the `WHERE` clause condition is correct when running `DELETE`, to avoid accidentally deleting the whole table's data. For example:
  ```sql
  DELETE FROM employees; -- dangerous: no WHERE clause, deletes all rows in the table
  ```

- **Using transaction handling**
  When running `DELETE` operations, you can use transactions to ensure data consistency. If the operation goes wrong, you can roll back the transaction. For example:
  ```sql
  START TRANSACTION;
  DELETE FROM employees
  WHERE department = 'Sales';
  -- if there is an error, you can use ROLLBACK to roll back
  COMMIT; -- commit the changes
  ```

## 5. Deleting Data Based on a Subquery

- **Using a subquery to delete data**
  ```sql
  DELETE FROM table1
  WHERE column1 IN (SELECT column2 FROM table2 WHERE condition);
  ```
  Example:
  ```sql
  DELETE FROM employees
  WHERE id IN (SELECT employee_id FROM terminated_employees);
  ```

## 6. Deleting Data and Foreign Key Constraints

- **Handling foreign key constraints**
  When deleting data, foreign key constraints between tables may affect the delete operation. You can specify cascading deletes with `ON DELETE CASCADE` when creating the foreign key. For example:
  ```sql
  CREATE TABLE orders (
    id INT PRIMARY KEY,
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
  );
  ```
  In this case, when a record is deleted from the `employees` table, the corresponding records in the `orders` table are deleted as well.

## 7. Deleting Data and Handling Errors

- **Checking the delete result**
  To confirm whether a `DELETE` operation succeeded, you can check the number of affected rows.
  ```sql
  DELETE FROM employees
  WHERE id = 999; -- assuming this ID does not exist
  SELECT ROW_COUNT(); -- check the number of affected rows
  ```

## 8. Deleting Data and Performance Optimization

- **Optimizing large-scale delete operations**
  For large-scale delete operations, delete in batches to avoid table locks and performance issues. For example:
  ```sql
  DELETE FROM employees
  WHERE department = 'Temporary'
  LIMIT 1000;
  ```
  Then repeat until all matching records have been deleted.

These uses of `DELETE` remove data from a table. Confirm the filter conditions before running, to avoid accidental deletion.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [MySQL 8.0 Reference Manual · DELETE](https://dev.mysql.com/doc/refman/8.0/en/delete.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
