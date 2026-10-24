# Advanced SQL Queries

Advanced SQL queries cover operations and techniques more complex than basic `SELECT`, including multi-table joins, subqueries, views, stored procedures and so on. These features suit more complex data operations and analysis; the real effect depends on the query structure and the data distribution.

## 1. Complex Queries (JOIN, Subqueries)

**1.1 JOIN operations**

A `JOIN` retrieves data from two or more tables. Depending on the join type you use, you get a different result set.

- **INNER JOIN**: returns only the rows that match in both tables.
- **LEFT JOIN** (or LEFT OUTER JOIN): returns every row from the left table, even when there is no match in the right table.
- **RIGHT JOIN** (or RIGHT OUTER JOIN): returns every row from the right table, even when there is no match in the left table.
- **FULL JOIN** (or FULL OUTER JOIN): returns every row from both tables, including rows that match on neither side. **Note: MySQL does not support the `FULL JOIN` syntax**; you can simulate it with `LEFT JOIN` plus `UNION` plus `RIGHT JOIN`.
- **CROSS JOIN**: returns the Cartesian product of the two tables, pairing every row of the left table with every row of the right table.

**Example**:
```sql
-- INNER JOIN 示例
SELECT employees.name, departments.department_name
FROM employees
INNER JOIN departments ON employees.department_id = departments.id;

-- LEFT JOIN 示例
SELECT employees.name, departments.department_name
FROM employees
LEFT JOIN departments ON employees.department_id = departments.id;

-- CROSS JOIN 示例
SELECT employees.name, projects.project_name
FROM employees
CROSS JOIN projects;
```

**1.2 Subqueries**

A subquery is a query nested inside another query. It can supply an extra filter or a computed result. Subqueries can appear in the `SELECT`, `WHERE`, `FROM` and `HAVING` clauses.

- **Scalar subquery**: returns a single value, used for a condition.
- **Row subquery**: returns a single row.
- **Table subquery**: returns multiple rows and columns, usually used in the `FROM` clause.

**Example**:
```sql
-- 标量子查询示例
SELECT name
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- 表子查询示例
SELECT name
FROM employees
WHERE department_id IN (SELECT id FROM departments WHERE department_name = 'Sales');
```

## 2. Views

A view is a virtual table defined on a query result set. It stores no data, only the query logic. Through a view you can simplify complex queries, encapsulate data and improve security.

**Example**:
```sql
-- 创建视图
CREATE VIEW high_salary_employees AS
SELECT name, salary
FROM employees
WHERE salary > 100000;

-- 查询视图
SELECT * FROM high_salary_employees;
```

A view simplifies complex queries and lets you put a higher level of abstraction and security over the data. When you update data through a view, what actually changes is the base table.

## 3. Stored Procedures and Functions

- **Stored Procedures**: a precompiled block of SQL code that can perform complex operations, including conditional logic, loops and exception handling. A stored procedure can take parameters, execute multiple SQL statements and return results.

**Example**:
```sql
DELIMITER //

CREATE PROCEDURE get_employee_details(IN emp_id INT)
BEGIN
    SELECT name, salary
    FROM employees
    WHERE id = emp_id;
END //

DELIMITER ;
```

- **Functions**: similar to stored procedures, but mainly used to compute and return a value. A function is used as an expression inside a SQL statement and returns one result.

**Example**:
```sql
DELIMITER //

CREATE FUNCTION calculate_bonus(salary DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN salary * 0.1;
END //

DELIMITER ;
```

## 4. Triggers

A trigger is a special stored procedure that runs automatically when a database event (insert, update or delete) happens. Triggers are used for data validation, logging and maintaining data integrity.

**Example**:
```sql
DELIMITER //

-- 创建触发器
CREATE TRIGGER before_employee_insert
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.salary < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Salary cannot be negative';
    END IF;
END //

DELIMITER ;
```

## 5. Cursors

A cursor is used to process a query result set row by row. It lets you read and manipulate data one row at a time inside a stored procedure or function, which fits data processing that needs row-by-row handling.

**Example**:
```sql
DELIMITER //

CREATE PROCEDURE process_employees()
BEGIN
    -- 变量必须在游标之前声明，游标必须在处理器（HANDLER）之前声明
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE emp_id INT;
    DECLARE emp_salary DECIMAL(10,2);
    DECLARE emp_cursor CURSOR FOR SELECT id, salary FROM employees;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN emp_cursor;

    read_loop: LOOP
        FETCH emp_cursor INTO emp_id, emp_salary;
        IF done THEN
            LEAVE read_loop;
        END IF;
        -- 处理数据
        -- UPDATE employees SET salary = emp_salary * 1.1 WHERE id = emp_id;
    END LOOP;

    CLOSE emp_cursor;
END //

DELIMITER ;
```

## Summary

Advanced SQL queries include multi-table joins, subqueries, views, stored procedures, triggers and cursors. These features let you carry out complex data operations and analysis, and improve the flexibility and efficiency of your database. Use them where they fit and you get more efficient data management and business logic handling.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Subqueries](https://dev.mysql.com/doc/refman/8.0/en/subqueries.html)

## Related pages

- [README](README.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
