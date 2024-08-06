### 更新数据（UPDATE）

`UPDATE` 语句用于修改 MySQL 表中的现有数据。以下是 `UPDATE` 语句的主要用法和一些示例。

#### 1. **基本 UPDATE 语句**

- **更新单个列**
  ```sql
  UPDATE table_name
  SET column1 = value1
  WHERE condition;
  ```
  示例：
  ```sql
  UPDATE employees
  SET department = 'Marketing'
  WHERE id = 1;
  ```

- **更新多个列**
  ```sql
  UPDATE table_name
  SET column1 = value1, column2 = value2
  WHERE condition;
  ```
  示例：
  ```sql
  UPDATE employees
  SET department = 'Marketing', age = 32
  WHERE id = 1;
  ```

#### 2. **更新符合条件的多行数据**

- **使用 WHERE 子句更新多行**
  ```sql
  UPDATE table_name
  SET column1 = value1
  WHERE condition;
  ```
  示例：
  ```sql
  UPDATE employees
  SET department = 'HR'
  WHERE department = 'Sales';
  ```

#### 3. **更新数据时的安全性**

- **避免不小心更新所有行**
  更新所有行时，确保 `WHERE` 子句条件正确，防止意外修改整个表的数据。例如：
  ```sql
  UPDATE employees
  SET department = 'Unknown';  -- 不要忘记 WHERE 子句
  ```

- **使用事务处理**
  在执行 `UPDATE` 操作时，可以使用事务来确保数据一致性。如果操作出错，可以回滚事务。例如：
  ```sql
  START TRANSACTION;
  UPDATE employees
  SET department = 'IT'
  WHERE id = 2;
  -- 如果有错误，可以使用 ROLLBACK 回滚
  COMMIT; -- 提交更改
  ```

#### 4. **基于子查询更新**

- **使用子查询更新数据**
  ```sql
  UPDATE table1
  SET column1 = (SELECT value FROM table2 WHERE condition)
  WHERE condition;
  ```
  示例：
  ```sql
  UPDATE employees
  SET department = (SELECT department FROM departments WHERE id = employees.dept_id)
  WHERE id = 2;
  ```

#### 5. **条件更新与 SQL 注入**

- **避免 SQL 注入**
  在应用程序中执行更新操作时，使用参数化查询或预处理语句可以防止 SQL 注入攻击。例如，在使用 PHP 和 MySQL 时：
  ```php
  $stmt = $mysqli->prepare("UPDATE employees SET department = ? WHERE id = ?");
  $stmt->bind_param("si", $department, $id);
  $stmt->execute();
  ```

#### 6. **更新数据并处理异常**

- **检查更新结果**
  确认 `UPDATE` 操作是否成功，可以检查受影响的行数。
  ```sql
  UPDATE employees
  SET department = 'Sales'
  WHERE id = 999; -- 假设该ID不存在
  SELECT ROW_COUNT(); -- 检查受影响的行数
  ```

#### 7. **更新数据并使用 LIMIT**

- **限制更新的行数**
  可以使用 `LIMIT` 子句来限制更新的行数：
  ```sql
  UPDATE employees
  SET department = 'Sales'
  WHERE department = 'HR'
  LIMIT 10; -- 更新前10行
  ```

了解 `UPDATE` 语句的这些用法可以帮助你灵活地修改表中的数据，并确保操作的安全性和准确性。