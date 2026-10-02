### 基本查询语句（SELECT）

`SELECT` 语句是 SQL 中用于从数据库中检索数据的基本命令。以下是 `SELECT` 语句的主要用法和一些常见操作的介绍。

#### 1. **基本 SELECT 查询**

- **选择所有列**
  ```sql
  SELECT * FROM table_name;
  ```
  `*` 表示选择表中的所有列。

- **选择指定列**
  ```sql
  SELECT column1, column2 FROM table_name;
  ```
  只选择指定的列 `column1` 和 `column2`。

#### 2. **条件查询**

- **使用 WHERE 子句**
  ```sql
  SELECT column1, column2 FROM table_name WHERE condition;
  ```
  `condition` 是用于筛选数据的条件。例如：
  ```sql
  SELECT * FROM employees WHERE age > 30;
  ```

- **使用逻辑运算符**
  - **AND**
    ```sql
    SELECT * FROM employees WHERE age > 30 AND department = 'Sales';
    ```
  - **OR**
    ```sql
    SELECT * FROM employees WHERE age < 25 OR age > 60;
    ```
  - **NOT**
    ```sql
    SELECT * FROM employees WHERE NOT department = 'HR';
    ```

- **使用比较运算符**
  - `=`, `<`, `>`, `<=`, `>=`, `<>`
    ```sql
    SELECT * FROM products WHERE price >= 100;
    ```

- **使用 LIKE 进行模糊查询**
  ```sql
  SELECT * FROM customers WHERE name LIKE 'A%';
  ```
  `LIKE 'A%'` 匹配以字母 'A' 开头的所有名称。

- **使用 IN 子句**
  ```sql
  SELECT * FROM products WHERE category IN ('Electronics', 'Clothing');
  ```

- **使用 BETWEEN 子句**
  ```sql
  SELECT * FROM products WHERE price BETWEEN 50 AND 150;
  ```

- **使用 IS NULL 和 IS NOT NULL**
  ```sql
  SELECT * FROM orders WHERE delivery_date IS NULL;
  SELECT * FROM orders WHERE delivery_date IS NOT NULL;
  ```

#### 3. **排序**

- **使用 ORDER BY 子句**
  ```sql
  SELECT * FROM table_name ORDER BY column1 [ASC|DESC];
  ```
  - `ASC` 表示升序（默认）
  - `DESC` 表示降序

  示例：
  ```sql
  SELECT * FROM employees ORDER BY age DESC;
  ```

#### 4. **限制结果**

- **使用 LIMIT 子句**
  ```sql
  SELECT * FROM table_name LIMIT number;
  ```
  `number` 是返回的最大行数。例如：
  ```sql
  SELECT * FROM employees LIMIT 10;
  ```

- **使用 OFFSET 子句**
  ```sql
  SELECT * FROM table_name LIMIT number OFFSET offset;
  ```
  `offset` 是开始返回的行数。例如：
  ```sql
  SELECT * FROM employees LIMIT 10 OFFSET 5;
  ```

#### 5. **聚合函数**

- **COUNT()**
  ```sql
  SELECT COUNT(*) FROM employees;
  ```

- **SUM()**
  ```sql
  SELECT SUM(salary) FROM employees;
  ```

- **AVG()**
  ```sql
  SELECT AVG(salary) FROM employees;
  ```

- **MAX()**
  ```sql
  SELECT MAX(salary) FROM employees;
  ```

- **MIN()**
  ```sql
  SELECT MIN(salary) FROM employees;
  ```

#### 6. **分组**

- **使用 GROUP BY 子句**
  ```sql
  SELECT column1, COUNT(*) FROM table_name GROUP BY column1;
  ```
  示例：
  ```sql
  SELECT department, COUNT(*) FROM employees GROUP BY department;
  ```

- **使用 HAVING 子句**
  ```sql
  SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 10;
  ```

#### 7. **连接查询**

- **内连接（INNER JOIN）**
  ```sql
  SELECT table1.column1, table2.column2
  FROM table1
  INNER JOIN table2 ON table1.common_column = table2.common_column;
  ```

- **左连接（LEFT JOIN）**
  ```sql
  SELECT table1.column1, table2.column2
  FROM table1
  LEFT JOIN table2 ON table1.common_column = table2.common_column;
  ```

- **右连接（RIGHT JOIN）**
  ```sql
  SELECT table1.column1, table2.column2
  FROM table1
  RIGHT JOIN table2 ON table1.common_column = table2.common_column;
  ```

- **全连接（FULL JOIN）**
  ```sql
  SELECT table1.column1, table2.column2
  FROM table1
  FULL JOIN table2 ON table1.common_column = table2.common_column;
  ```

了解和掌握这些基本的 `SELECT` 查询语句可以帮助你有效地从 MySQL 数据库中检索和处理数据。