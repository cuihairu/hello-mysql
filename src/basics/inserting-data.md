### 插入数据（INSERT）

`INSERT` 语句用于将新数据行插入到 MySQL 表中。以下是 `INSERT` 语句的主要用法和一些示例。

#### 1. **基本 INSERT 语句**

- **插入单行数据**
  ```sql
  INSERT INTO table_name (column1, column2, column3)
  VALUES (value1, value2, value3);
  ```
  示例：
  ```sql
  INSERT INTO employees (name, age, department)
  VALUES ('John Doe', 30, 'Sales');
  ```

#### 2. **插入多行数据**

- **插入多行数据**
  ```sql
  INSERT INTO table_name (column1, column2, column3)
  VALUES (value1a, value2a, value3a),
         (value1b, value2b, value3b),
         (value1c, value2c, value3c);
  ```
  示例：
  ```sql
  INSERT INTO employees (name, age, department)
  VALUES ('Alice', 28, 'HR'),
         ('Bob', 35, 'IT'),
         ('Charlie', 40, 'Finance');
  ```

#### 3. **插入数据从另一个表**

- **使用 SELECT 语句从另一个表插入数据**
  ```sql
  INSERT INTO table1 (column1, column2)
  SELECT column1, column2
  FROM table2
  WHERE condition;
  ```
  示例：
  ```sql
  INSERT INTO new_employees (name, age)
  SELECT name, age
  FROM old_employees
  WHERE department = 'Sales';
  ```

#### 4. **插入数据时指定默认值**

- **不指定某些列的值**
  如果表中的某些列具有默认值，你可以省略这些列，它们将使用默认值。
  ```sql
  INSERT INTO table_name (column1, column2)
  VALUES (value1, value2);
  ```
  示例：
  ```sql
  INSERT INTO employees (name, department)
  VALUES ('David', 'Marketing');
  ```
  如果 `age` 列具有默认值（例如 `0`），则会使用默认值。

#### 5. **插入数据并处理冲突**

- **使用 ON DUPLICATE KEY UPDATE 处理冲突**
  当插入的数据与现有数据的唯一键冲突时，可以更新现有行。
  ```sql
  INSERT INTO table_name (unique_column, column2)
  VALUES (value1, value2)
  ON DUPLICATE KEY UPDATE column2 = value2;
  ```
  示例：
  ```sql
  INSERT INTO employees (id, name, department)
  VALUES (1, 'John Doe', 'Sales')
  ON DUPLICATE KEY UPDATE department = 'Sales';
  ```

#### 6. **插入数据与 SQL 注入**

- **避免 SQL 注入**
  在应用程序中执行插入操作时，使用参数化查询或预处理语句可以防止 SQL 注入攻击。例如，在使用 PHP 和 MySQL 时：
  ```php
  $stmt = $mysqli->prepare("INSERT INTO employees (name, age, department) VALUES (?, ?, ?)");
  $stmt->bind_param("sis", $name, $age, $department);
  $stmt->execute();
  ```

了解这些 `INSERT` 操作可以帮助你有效地将数据添加到 MySQL 数据库中，并处理可能出现的各种情况。