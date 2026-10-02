### 删除数据（DELETE）

`DELETE` 语句用于从 MySQL 表中删除现有的数据。以下是 `DELETE` 语句的主要用法和一些示例。

#### 1. **基本 DELETE 语句**

- **删除符合条件的单行数据**
  ```sql
  DELETE FROM table_name
  WHERE condition;
  ```
  示例：
  ```sql
  DELETE FROM employees
  WHERE id = 1;
  ```

- **删除符合条件的多行数据**
  ```sql
  DELETE FROM table_name
  WHERE condition;
  ```
  示例：
  ```sql
  DELETE FROM employees
  WHERE department = 'Sales';
  ```

#### 2. **删除所有数据**

- **删除表中的所有数据**
  ```sql
  DELETE FROM table_name;
  ```
  示例：
  ```sql
  DELETE FROM employees;
  ```
  注意：这种操作会删除表中的所有行，但不会删除表结构。

#### 3. **使用 LIMIT 限制删除的行数**

- **限制删除的行数**
  ```sql
  DELETE FROM table_name
  WHERE condition
  LIMIT number;
  ```
  示例：
  ```sql
  DELETE FROM employees
  WHERE department = 'Temporary'
  LIMIT 5; -- 删除前5行符合条件的数据
  ```

#### 4. **删除数据时的安全性**

- **避免不小心删除所有数据**
  确保在执行 `DELETE` 操作时，`WHERE` 子句条件正确，防止意外删除整个表的数据。例如：
  ```sql
  DELETE FROM employees; -- 确认条件是否正确
  ```

- **使用事务处理**
  在执行 `DELETE` 操作时，可以使用事务来确保数据一致性。如果操作出错，可以回滚事务。例如：
  ```sql
  START TRANSACTION;
  DELETE FROM employees
  WHERE department = 'Sales';
  -- 如果有错误，可以使用 ROLLBACK 回滚
  COMMIT; -- 提交更改
  ```

#### 5. **基于子查询删除数据**

- **使用子查询删除数据**
  ```sql
  DELETE FROM table1
  WHERE column1 IN (SELECT column2 FROM table2 WHERE condition);
  ```
  示例：
  ```sql
  DELETE FROM employees
  WHERE id IN (SELECT employee_id FROM terminated_employees);
  ```

#### 6. **删除数据与外键约束**

- **处理外键约束**
  在删除数据时，如果表之间存在外键约束，可能会影响删除操作。可以使用 `ON DELETE CASCADE` 在创建外键时指定级联删除。例如：
  ```sql
  CREATE TABLE orders (
    id INT PRIMARY KEY,
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
  );
  ```
  在这种情况下，当从 `employees` 表中删除记录时，相关的 `orders` 表中的记录也会被删除。

#### 7. **删除数据并处理异常**

- **检查删除结果**
  确认 `DELETE` 操作是否成功，可以检查受影响的行数。
  ```sql
  DELETE FROM employees
  WHERE id = 999; -- 假设该ID不存在
  SELECT ROW_COUNT(); -- 检查受影响的行数
  ```

#### 8. **删除数据与性能优化**

- **大数据量删除操作的优化**
  对于大数据量删除操作，可以分批次删除，以避免锁表和性能问题。例如：
  ```sql
  DELETE FROM employees
  WHERE department = 'Temporary'
  LIMIT 1000;
  ```
  然后重复执行直到所有符合条件的记录被删除。

了解 `DELETE` 语句的这些用法可以帮助你有效地从表中删除数据，并确保操作的安全性和准确性。