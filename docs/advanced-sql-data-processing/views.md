# Views

A view is a virtual table created on the result set of a SQL query. A view stores no actual data but generates it dynamically. Views simplify complex queries, improve data security and provide a more flexible way to represent data.

## 1. Creating a view

Use the `CREATE VIEW` statement to create a view.

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

Example:

```sql
CREATE VIEW employee_view AS
SELECT name, department_id, salary
FROM employees
WHERE salary > 50000;
```

## 2. Using a view

You use a view the same way you use a table: just run a `SELECT` query.

```sql
SELECT * FROM view_name;
```

Example:

```sql
SELECT * FROM employee_view;
```

## 3. Updating a view

Views can be updated, with some limitations. An update to a view affects the data in the base table.

```sql
UPDATE view_name
SET column1 = value1
WHERE condition;
```

Example:

```sql
UPDATE employee_view
SET salary = salary * 1.1
WHERE department_id = 2;
```

## 4. Dropping a view

Use the `DROP VIEW` statement to drop a view.

```sql
DROP VIEW view_name;
```

Example:

```sql
DROP VIEW employee_view;
```

## 5. Advantages of views

- **Simplifying complex queries**: a view wraps up complex query logic, keeping the query itself shorter.
- **Data security**: a view restricts which columns a user can reach, which improves data security.
- **Data abstraction**: a view offers a different representation of the data to suit different business needs.

## 6. Limitations of views

- **Performance**: a view generates its data dynamically from a query, which can hurt performance, especially for views with complex computation.
- **Update limits**: not every view can be updated, especially views that contain aggregate functions, subqueries or `JOIN`.

## 7. Example: using a view to simplify a query

Suppose we have two tables: `employees` and `departments`.

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department_id INT,
    salary DECIMAL(10, 2)
);

CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);
```

Create a view that shows each employee's name and their department name:

```sql
CREATE VIEW employee_department_view AS
SELECT e.name AS employee_name, d.name AS department_name, e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id;
```

Query through the view:

```sql
SELECT * FROM employee_department_view;
```

## 8. Example of updating a view

Suppose you want to raise every employee's salary in a department by 10%. You can update the base table through the view:

```sql
UPDATE employee_department_view
SET salary = salary * 1.1
WHERE department_name = 'Sales';
```

All in all, views are a powerful tool in SQL: they simplify queries, strengthen security and give you a flexible way to represent data. But mind the performance and update limits when using them.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Views](https://dev.mysql.com/doc/refman/8.0/en/views.html)
- [CREATE VIEW](https://dev.mysql.com/doc/refman/8.0/en/create-view.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
