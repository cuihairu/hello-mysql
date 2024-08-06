### 复杂查询（JOIN、子查询）

复杂查询在 SQL 中是指涉及多个表或多个步骤的数据检索操作。常见的复杂查询包括 `JOIN` 和子查询（`Subquery`）。这些查询可以帮助我们从多个表中获取相关数据，或者在一个查询中嵌套另一个查询来进行多层次的数据处理。

#### 1. **JOIN 操作**

`JOIN` 操作用于在 SQL 查询中结合多个表。常见的 `JOIN` 类型包括：`INNER JOIN`、`LEFT JOIN`、`RIGHT JOIN` 和 `FULL JOIN`。

- **INNER JOIN**

  `INNER JOIN` 返回两个表中匹配的记录。

  ```sql
  SELECT columns
  FROM table1
  INNER JOIN table2 ON table1.column = table2.column;
  ```

  示例：
  ```sql
  SELECT employees.name, departments.name
  FROM employees
  INNER JOIN departments ON employees.department_id = departments.id;
  ```

- **LEFT JOIN**

  `LEFT JOIN` 返回左表中的所有记录，以及右表中匹配的记录。如果右表中没有匹配，则结果为 `NULL`。

  ```sql
  SELECT columns
  FROM table1
  LEFT JOIN table2 ON table1.column = table2.column;
  ```

  示例：
  ```sql
  SELECT employees.name, departments.name
  FROM employees
  LEFT JOIN departments ON employees.department_id = departments.id;
  ```

- **RIGHT JOIN**

  `RIGHT JOIN` 返回右表中的所有记录，以及左表中匹配的记录。如果左表中没有匹配，则结果为 `NULL`。

  ```sql
  SELECT columns
  FROM table1
  RIGHT JOIN table2 ON table1.column = table2.column;
  ```

  示例：
  ```sql
  SELECT employees.name, departments.name
  FROM employees
  RIGHT JOIN departments ON employees.department_id = departments.id;
  ```

- **FULL JOIN**

  `FULL JOIN` 返回左表和右表中的所有记录。如果没有匹配，则结果为 `NULL`。

  ```sql
  SELECT columns
  FROM table1
  FULL JOIN table2 ON table1.column = table2.column;
  ```

  MySQL 不支持 `FULL JOIN`，可以通过 `UNION` 实现。

  ```sql
  SELECT employees.name, departments.name
  FROM employees
  LEFT JOIN departments ON employees.department_id = departments.id
  UNION
  SELECT employees.name, departments.name
  FROM employees
  RIGHT JOIN departments ON employees.department_id = departments.id;
  ```

#### 2. **子查询**

子查询是嵌套在另一个查询中的查询。子查询可以在 `SELECT`、`INSERT`、`UPDATE` 或 `DELETE` 语句中使用，也可以在 `WHERE`、`FROM` 和 `HAVING` 子句中使用。

- **在 `SELECT` 子句中使用子查询**

  ```sql
  SELECT column1,
         (SELECT column2 FROM table2 WHERE table2.column = table1.column) AS alias
  FROM table1;
  ```

  示例：
  ```sql
  SELECT name,
         (SELECT COUNT(*) FROM orders WHERE orders.employee_id = employees.id) AS order_count
  FROM employees;
  ```

- **在 `WHERE` 子句中使用子查询**

  ```sql
  SELECT columns
  FROM table1
  WHERE column = (SELECT column FROM table2 WHERE condition);
  ```

  示例：
  ```sql
  SELECT name
  FROM employees
  WHERE department_id = (SELECT id FROM departments WHERE name = 'Sales');
  ```

- **在 `FROM` 子句中使用子查询**

  ```sql
  SELECT columns
  FROM (SELECT columns FROM table WHERE condition) AS alias;
  ```

  示例：
  ```sql
  SELECT employee_name, order_total
  FROM (SELECT employees.name AS employee_name, SUM(orders.amount) AS order_total
        FROM employees
        INNER JOIN orders ON employees.id = orders.employee_id
        GROUP BY employees.name) AS employee_orders;
  ```

- **在 `HAVING` 子句中使用子查询**

  ```sql
  SELECT columns
  FROM table
  GROUP BY columns
  HAVING aggregate_function(column) > (SELECT aggregate_function(column) FROM table WHERE condition);
  ```

  示例：
  ```sql
  SELECT department_id, COUNT(*)
  FROM employees
  GROUP BY department_id
  HAVING COUNT(*) > (SELECT AVG(employee_count) FROM (SELECT department_id, COUNT(*) AS employee_count
                                                      FROM employees
                                                      GROUP BY department_id) AS department_counts);
  ```

通过学习和掌握 `JOIN` 和子查询，可以更灵活地从多个表中获取数据，并进行复杂的数据分析和处理。