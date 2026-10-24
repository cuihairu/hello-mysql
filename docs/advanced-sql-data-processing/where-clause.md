# The `WHERE` Clause

The `WHERE` clause is one of the most basic and most used components of an SQL query. It specifies the conditions for retrieving data: it filters out the rows that do not match and returns only the matching result set.

## Syntax

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

- `column1, column2, ...`: the columns to retrieve.
- `table_name`: the table to query.
- `condition`: the condition used to filter the data.

## Examples

1. **Basic usage**

   ```sql
   SELECT *
   FROM employees
   WHERE department = 'Sales';
   ```
   *This query returns every employee record whose department is `'Sales'`.*

2. **Filtering on multiple conditions**

   You can combine multiple conditions with the logical operators (`AND`, `OR`, `NOT`).

   ```sql
   SELECT name, salary
   FROM employees
   WHERE department = 'Sales' AND salary > 50000;
   ```
   *This query returns the names and salaries of employees in `'Sales'` whose salary is above 50,000.*

   ```sql
   SELECT name
   FROM employees
   WHERE department = 'Sales' OR department = 'Marketing';
   ```
   *This query returns the names of employees in `'Sales'` or `'Marketing'`.*

   ```sql
   SELECT name
   FROM employees
   WHERE NOT department = 'HR';
   ```
   *This query returns the names of employees whose department is not `'HR'`.*

3. **Using wildcards**

   The `LIKE` operator does pattern matching. It is usually used with the wildcards (`%`, `_`) for fuzzy matching.

   ```sql
   SELECT name
   FROM employees
   WHERE name LIKE 'J%';
   ```
   *This query returns every employee name that starts with `'J'`.*

   ```sql
   SELECT email
   FROM users
   WHERE email LIKE '%@example.com';
   ```
   *This query returns every user whose email address ends with `'@example.com'`.*

4. **Using the `IN` operator**

   The `IN` operator checks whether a value is in a given set of values.

   ```sql
   SELECT name
   FROM employees
   WHERE department IN ('Sales', 'Marketing');
   ```
   *This query returns every employee name whose department is `'Sales'` or `'Marketing'`.*

5. **Using the `BETWEEN` operator**

   The `BETWEEN` operator queries a range between two values.

   ```sql
   SELECT name, salary
   FROM employees
   WHERE salary BETWEEN 40000 AND 60000;
   ```
   *This query returns the names and salaries of employees with a salary between 40,000 and 60,000.*

6. **Using the `EXISTS` operator**

   The `EXISTS` operator checks whether a subquery returns any rows. If the subquery returns at least one row, `EXISTS` returns `TRUE`.

   ```sql
   SELECT name
   FROM employees e
   WHERE EXISTS (
       SELECT 1
       FROM departments d
       WHERE d.manager_id = e.id
   );
   ```
   *This query returns the names of employees who manage a department.*

7. **Using `IS NULL` and `IS NOT NULL`**

   These check whether a field is `NULL`.

   ```sql
   SELECT name
   FROM employees
   WHERE manager_id IS NULL;
   ```
   *This query returns the names of employees with no manager.*

   ```sql
   SELECT name
   FROM employees
   WHERE manager_id IS NOT NULL;
   ```
   *This query returns the names of employees who have a manager.*

## Summary

The `WHERE` clause is the most used tool in SQL queries for controlling precisely the conditions on retrieved data. With logical operators, pattern matching, set checks and range queries you can filter down to the data you actually need. How you write a `WHERE` condition affects both what gets filtered out and how efficiently the query runs.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
