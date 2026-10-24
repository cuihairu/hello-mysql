# Basic SELECT Statements

The `SELECT` statement is the basic command in SQL for retrieving data from a database. Below are the main uses and common operations of `SELECT`.

## 1. Basic SELECT Queries

- **Select all columns**
  ```sql
  SELECT * FROM table_name;
  ```
  `*` means select all columns in the table.

- **Select specified columns**
  ```sql
  SELECT column1, column2 FROM table_name;
  ```
  Select only the specified columns `column1` and `column2`.

## 2. Conditional Queries

- **Using the WHERE clause**
  ```sql
  SELECT column1, column2 FROM table_name WHERE condition;
  ```
  `condition` is the condition used to filter data. For example:
  ```sql
  SELECT * FROM employees WHERE age > 30;
  ```

- **Using logical operators**
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

- **Using comparison operators**
  - `=`, `<`, `>`, `<=`, `>=`, `<>`
    ```sql
    SELECT * FROM products WHERE price >= 100;
    ```

- **Using LIKE for fuzzy matching**
  ```sql
  SELECT * FROM customers WHERE name LIKE 'A%';
  ```
  `LIKE 'A%'` matches all names starting with the letter 'A'.

- **Using the IN clause**
  ```sql
  SELECT * FROM products WHERE category IN ('Electronics', 'Clothing');
  ```

- **Using the BETWEEN clause**
  ```sql
  SELECT * FROM products WHERE price BETWEEN 50 AND 150;
  ```

- **Using IS NULL and IS NOT NULL**
  ```sql
  SELECT * FROM orders WHERE delivery_date IS NULL;
  SELECT * FROM orders WHERE delivery_date IS NOT NULL;
  ```

## 3. Sorting

- **Using the ORDER BY clause**
  ```sql
  SELECT * FROM table_name ORDER BY column1 [ASC|DESC];
  ```
  - `ASC` means ascending order (default)
  - `DESC` means descending order

  Example:
  ```sql
  SELECT * FROM employees ORDER BY age DESC;
  ```

## 4. Limiting Results

- **Using the LIMIT clause**
  ```sql
  SELECT * FROM table_name LIMIT number;
  ```
  `number` is the maximum number of rows returned. For example:
  ```sql
  SELECT * FROM employees LIMIT 10;
  ```

- **Using the OFFSET clause**
  ```sql
  SELECT * FROM table_name LIMIT number OFFSET offset;
  ```
  `offset` is the number of rows to skip before returning results. For example:
  ```sql
  SELECT * FROM employees LIMIT 10 OFFSET 5;
  ```

## 5. Aggregate Functions

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

## 6. Grouping

- **Using the GROUP BY clause**
  ```sql
  SELECT column1, COUNT(*) FROM table_name GROUP BY column1;
  ```
  Example:
  ```sql
  SELECT department, COUNT(*) FROM employees GROUP BY department;
  ```

- **Using the HAVING clause**
  ```sql
  SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 10;
  ```

## 7. Join Queries

- **Inner join (INNER JOIN)**
  ```sql
  SELECT table1.column1, table2.column2
  FROM table1
  INNER JOIN table2 ON table1.common_column = table2.common_column;
  ```

- **Left join (LEFT JOIN)**
  ```sql
  SELECT table1.column1, table2.column2
  FROM table1
  LEFT JOIN table2 ON table1.common_column = table2.common_column;
  ```

- **Right join (RIGHT JOIN)**
  ```sql
  SELECT table1.column1, table2.column2
  FROM table1
  RIGHT JOIN table2 ON table1.common_column = table2.common_column;
  ```

- **Full join (FULL JOIN)**
  MySQL does not support the `FULL JOIN` (`FULL OUTER JOIN`) syntax. To achieve the effect of a full outer join, you can combine `LEFT JOIN` and `RIGHT JOIN` with `UNION`:
  ```sql
  SELECT table1.column1, table2.column2
  FROM table1
  LEFT JOIN table2 ON table1.common_column = table2.common_column
  UNION
  SELECT table1.column1, table2.column2
  FROM table1
  RIGHT JOIN table2 ON table1.common_column = table2.common_column;
  ```

These basic `SELECT` statements are used to retrieve and process data from a MySQL database.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [MySQL 8.0 Reference Manual · SELECT](https://dev.mysql.com/doc/refman/8.0/en/select.html)

## Related pages

- [README](README.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
