# GROUP BY and HAVING

In SQL, the `GROUP BY` and `HAVING` clauses group and filter query results. They are used a lot to build summary reports and statistics. Let's look at what each clause does and how to write it:

## 1. GROUP BY

The `GROUP BY` clause groups the query results by the specified columns. Rows within each group share the same values, and it is often combined with aggregate functions such as `SUM`, `AVG`, `COUNT`, `MIN` and `MAX` to summarise the data in each group.

**Syntax**:
```sql
SELECT column_name1, aggregate_function(column_name2)
FROM table_name
GROUP BY column_name1;
```

**Example**:
```sql
-- 按部门统计每个部门的员工数量
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;
```

In this example, `GROUP BY department_id` groups the rows of the employees table by the `department_id` column, then counts the employees in each department.

## 2. HAVING

The `HAVING` clause filters the grouped results. It is similar to the `WHERE` clause, but `WHERE` applies before grouping and `HAVING` applies after grouping. `HAVING` is usually combined with aggregate functions to filter on aggregated results.

**Syntax**:
```sql
SELECT column_name1, aggregate_function(column_name2)
FROM table_name
GROUP BY column_name1
HAVING aggregate_function(column_name2) condition;
```

**Example**:
```sql
-- 找出员工数量大于10的部门
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 10;
```

In this example, `HAVING COUNT(*) > 10` filters for the departments that have more than 10 employees.

## Using GROUP BY with HAVING

`GROUP BY` and `HAVING` are usually used together: first group the data, then filter the grouped results. This combination lets you pull more precise statistics and summaries out of the data.

**Example**:
```sql
-- 计算每个部门的平均薪资，并找出平均薪资高于5000的部门
SELECT department_id, AVG(salary) AS average_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 5000;
```

In this example, `GROUP BY department_id` groups the employee records by department, and `HAVING AVG(salary) > 5000` keeps only the departments whose average salary exceeds 5000.

## Summary

- The `GROUP BY` clause groups a result set by one or more columns.
- The `HAVING` clause filters the grouped results, usually together with aggregate functions.
- `GROUP BY` combined with `HAVING` gives you detailed grouping and filtering over data, producing useful summary reports and statistics.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · GROUP BY Handling](https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html)
- [MySQL 8.0 Reference Manual · GROUP BY Modifiers](https://dev.mysql.com/doc/refman/8.0/en/group-by-modifiers.html)
- [MySQL 8.0 Reference Manual · GROUP BY Functional Dependence](https://dev.mysql.com/doc/refman/8.0/en/group-by-functional-dependence.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
