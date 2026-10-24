# Updating Data (UPDATE)

The `UPDATE` statement is used to modify existing data in a MySQL table. Below are the main uses of the `UPDATE` statement along with some examples.

## 1. Basic UPDATE Statements

- **Updating a single column**
  ```sql
  UPDATE table_name
  SET column1 = value1
  WHERE condition;
  ```
  Example:
  ```sql
  UPDATE employees
  SET department = 'Marketing'
  WHERE id = 1;
  ```

- **Updating multiple columns**
  ```sql
  UPDATE table_name
  SET column1 = value1, column2 = value2
  WHERE condition;
  ```
  Example:
  ```sql
  UPDATE employees
  SET department = 'Marketing', age = 32
  WHERE id = 1;
  ```

## 2. Updating Multiple Rows That Match a Condition

- **Using the WHERE clause to update multiple rows**
  ```sql
  UPDATE table_name
  SET column1 = value1
  WHERE condition;
  ```
  Example:
  ```sql
  UPDATE employees
  SET department = 'HR'
  WHERE department = 'Sales';
  ```

## 3. Safety When Updating Data

- **Avoiding accidentally updating all rows**
  When updating all rows, make sure the `WHERE` clause condition is correct to avoid accidentally modifying the entire table's data. For example:
  ```sql
  UPDATE employees
  SET department = 'Unknown';  -- don't forget the WHERE clause
  ```

- **Using transaction handling**
  When running `UPDATE` operations, you can use transactions to ensure data consistency. If the operation goes wrong, you can roll back the transaction. For example:
  ```sql
  START TRANSACTION;
  UPDATE employees
  SET department = 'IT'
  WHERE id = 2;
  -- if there is an error, you can use ROLLBACK to roll back
  COMMIT; -- commit the changes
  ```

## 4. Updating Based on a Subquery

- **Using a subquery to update data**
  ```sql
  UPDATE table1
  SET column1 = (SELECT value FROM table2 WHERE condition)
  WHERE condition;
  ```
  Example:
  ```sql
  UPDATE employees
  SET department = (SELECT department FROM departments WHERE id = employees.dept_id)
  WHERE id = 2;
  ```

## 5. Conditional Updates and SQL Injection

- **Avoiding SQL injection**
  When performing update operations in an application, using parameterized queries or prepared statements prevents SQL injection attacks. For example, when using PHP and MySQL:
  ```php
  $stmt = $mysqli->prepare("UPDATE employees SET department = ? WHERE id = ?");
  $stmt->bind_param("si", $department, $id);
  $stmt->execute();
  ```

## 6. Updating Data and Handling Errors

- **Checking the update result**
  To confirm whether an `UPDATE` operation succeeded, you can check the number of affected rows.
  ```sql
  UPDATE employees
  SET department = 'Sales'
  WHERE id = 999; -- assuming this ID does not exist
  SELECT ROW_COUNT(); -- check the number of affected rows
  ```

## 7. Updating Data and Using LIMIT

- **Limiting the number of rows updated**
  You can use the `LIMIT` clause to limit the number of rows updated:
  ```sql
  UPDATE employees
  SET department = 'Sales'
  WHERE department = 'HR'
  LIMIT 10; -- update the first 10 rows
  ```

These uses of `UPDATE` modify data in a table. Confirm the filter conditions and the number of affected rows before running.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [MySQL 8.0 Reference Manual · UPDATE](https://dev.mysql.com/doc/refman/8.0/en/update.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
