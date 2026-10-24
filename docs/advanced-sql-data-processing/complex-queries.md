# Complex Queries (JOIN, Subqueries)

A complex query in SQL refers to a data retrieval operation that involves multiple tables or multiple steps. Common complex queries include `JOIN` and subqueries (`Subquery`). These let you pull related data from several tables, or nest one query inside another for multi-level data processing.

## 1. JOIN operations

A `JOIN` combines multiple tables in a SQL query. Common `JOIN` types include `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN` and `FULL JOIN`.

- **INNER JOIN**

  An `INNER JOIN` returns the rows that match in both tables.

  ```sql
  SELECT columns
  FROM table1
  INNER JOIN table2 ON table1.column = table2.column;
  ```

  Example:
  ```sql
  SELECT employees.name, departments.name
  FROM employees
  INNER JOIN departments ON employees.department_id = departments.id;
  ```

- **LEFT JOIN**

  A `LEFT JOIN` returns all rows from the left table, plus the matching rows from the right table. If there is no match on the right, the result is `NULL`.

  ```sql
  SELECT columns
  FROM table1
  LEFT JOIN table2 ON table1.column = table2.column;
  ```

  Example:
  ```sql
  SELECT employees.name, departments.name
  FROM employees
  LEFT JOIN departments ON employees.department_id = departments.id;
  ```

- **RIGHT JOIN**

  A `RIGHT JOIN` returns all rows from the right table, plus the matching rows from the left table. If there is no match on the left, the result is `NULL`.

  ```sql
  SELECT columns
  FROM table1
  RIGHT JOIN table2 ON table1.column = table2.column;
  ```

  Example:
  ```sql
  SELECT employees.name, departments.name
  FROM employees
  RIGHT JOIN departments ON employees.department_id = departments.id;
  ```

- **FULL JOIN**

  A `FULL JOIN` returns all rows from both the left and the right table. If there is no match, the result is `NULL`.

  ```sql
  SELECT columns
  FROM table1
  FULL JOIN table2 ON table1.column = table2.column;
  ```

  MySQL does not support `FULL JOIN`; use `UNION` to achieve it.

  ```sql
  SELECT employees.name, departments.name
  FROM employees
  LEFT JOIN departments ON employees.department_id = departments.id
  UNION
  SELECT employees.name, departments.name
  FROM employees
  RIGHT JOIN departments ON employees.department_id = departments.id;
  ```

## 2. Subqueries

A subquery is a query nested inside another query. A subquery can be used in `SELECT`, `INSERT`, `UPDATE` or `DELETE` statements, and also in the `WHERE`, `FROM` and `HAVING` clauses.

- **Using a subquery in the `SELECT` clause**

  ```sql
  SELECT column1,
         (SELECT column2 FROM table2 WHERE table2.column = table1.column) AS alias
  FROM table1;
  ```

  Example:
  ```sql
  SELECT name,
         (SELECT COUNT(*) FROM orders WHERE orders.employee_id = employees.id) AS order_count
  FROM employees;
  ```

- **Using a subquery in the `WHERE` clause**

  ```sql
  SELECT columns
  FROM table1
  WHERE column = (SELECT column FROM table2 WHERE condition);
  ```

  Example:
  ```sql
  SELECT name
  FROM employees
  WHERE department_id = (SELECT id FROM departments WHERE name = 'Sales');
  ```

- **Using a subquery in the `FROM` clause**

  ```sql
  SELECT columns
  FROM (SELECT columns FROM table WHERE condition) AS alias;
  ```

  Example:
  ```sql
  SELECT employee_name, order_total
  FROM (SELECT employees.name AS employee_name, SUM(orders.amount) AS order_total
        FROM employees
        INNER JOIN orders ON employees.id = orders.employee_id
        GROUP BY employees.name) AS employee_orders;
  ```

- **Using a subquery in the `HAVING` clause**

  ```sql
  SELECT columns
  FROM table
  GROUP BY columns
  HAVING aggregate_function(column) > (SELECT aggregate_function(column) FROM table WHERE condition);
  ```

  Example:
  ```sql
  SELECT department_id, COUNT(*)
  FROM employees
  GROUP BY department_id
  HAVING COUNT(*) > (SELECT AVG(employee_count) FROM (SELECT department_id, COUNT(*) AS employee_count
                                                      FROM employees
                                                      GROUP BY department_id) AS department_counts);
  ```

`JOIN` and subqueries fit pulling data across multiple tables and doing complex analysis and processing; the exact form depends on data volume and the execution plan.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Subqueries](https://dev.mysql.com/doc/refman/8.0/en/subqueries.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
