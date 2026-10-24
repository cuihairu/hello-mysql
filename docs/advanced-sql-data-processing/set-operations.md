# Set Operations (UNION, INTERSECT, EXCEPT)

In SQL, `UNION`, `INTERSECT` and `EXCEPT` are operations that merge and compare the result sets of multiple queries. They let you work with and analyse datasets that come from different queries. Watch out for version differences: **from MySQL 8.0.31 onwards, `INTERSECT` and `EXCEPT` are natively supported**; earlier versions need to be simulated with `INNER JOIN` / `EXISTS` and `LEFT JOIN` / `NOT EXISTS`. Also, MySQL does not support Oracle's `MINUS` operator (`MINUS` is equivalent to `EXCEPT`, but in MySQL you write `EXCEPT`). Below is how they compare:

## 1. UNION

The `UNION` operator merges the result sets of two or more `SELECT` queries into a single result set. By default `UNION` removes duplicate rows. To keep every row, including duplicates, use `UNION ALL`.

**Syntax**:
```sql
SELECT column_name1, column_name2
FROM table1
UNION
SELECT column_name1, column_name2
FROM table2;
```

**Example**:
```sql
-- 从两个不同的员工表中合并所有员工记录
SELECT employee_id, employee_name
FROM employees_us
UNION
SELECT employee_id, employee_name
FROM employees_eu;
```

In this example, `UNION` merges the employee records from the `employees_us` and `employees_eu` tables and removes duplicate rows.

## 2. INTERSECT

The `INTERSECT` operator finds the intersection of two or more query result sets, that is, the rows that exist in all of the queries. `INTERSECT` is natively supported from **MySQL 8.0.31** onwards; on earlier versions you can use `INNER JOIN` or `EXISTS` for the same effect.

**Syntax**:
```sql
SELECT column_name1, column_name2
FROM table1
INTERSECT
SELECT column_name1, column_name2
FROM table2;
```

**Example**:
```sql
-- 找出同时存在于两个员工表中的员工
SELECT employee_id
FROM employees_us
INTERSECT
SELECT employee_id
FROM employees_eu;
```

In this example, `INTERSECT` returns the employees that exist in both the `employees_us` and `employees_eu` tables.

## 3. EXCEPT

The `EXCEPT` operator finds the rows in one query result set that do not appear in another query result set. `EXCEPT` is likewise natively supported from **MySQL 8.0.31** onwards (MySQL does not support Oracle's `MINUS` syntax); on earlier versions you can use a `LEFT JOIN` with a `WHERE` clause, or `NOT EXISTS`, for the same effect.

**Syntax**:
```sql
SELECT column_name1, column_name2
FROM table1
EXCEPT
SELECT column_name1, column_name2
FROM table2;
```

**Example**:
```sql
-- 找出在 `employees_us` 表中存在但不在 `employees_eu` 表中的员工
SELECT employee_id
FROM employees_us
EXCEPT
SELECT employee_id
FROM employees_eu;
```

In this example, `EXCEPT` returns the employees that exist in the `employees_us` table but not in the `employees_eu` table.

## Summary

- **`UNION`**: merges two or more query result sets and removes duplicate rows. `UNION ALL` keeps every row, including duplicates.
- **`INTERSECT`**: finds the intersection of multiple query result sets and returns the rows that exist in all of them. Natively supported from MySQL 8.0.31; earlier versions can use `INNER JOIN` or `EXISTS`.
- **`EXCEPT`**: finds the rows in one query result set that do not appear in another. Natively supported from MySQL 8.0.31; earlier versions can use `LEFT JOIN`, `WHERE` or `NOT EXISTS` for a similar effect (MySQL does not support `MINUS`).

These operators give you powerful data-processing ability for complex analysis and reporting.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · UNION](https://dev.mysql.com/doc/refman/8.0/en/union.html)
- [MySQL 8.0 Reference Manual · INTERSECT](https://dev.mysql.com/doc/refman/8.0/en/intersect.html)
- [MySQL 8.0 Reference Manual · EXCEPT](https://dev.mysql.com/doc/refman/8.0/en/except.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
