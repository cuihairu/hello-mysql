# Aggregate Functions (SUM, AVG, COUNT, MIN, MAX)

Aggregate functions compute a value over a group of rows and give you summary information. They are used a lot in reporting and analysis, to get a quick overall picture of the data. Here are the common ones and how to use them:

## 1. SUM
`SUM` adds up a set of values. Use it to total a column, for example total sales or total salary.

**Syntax**:
```sql
SELECT SUM(column_name) AS total
FROM table_name;
```

**Example**:
```sql
-- 计算所有员工的总薪资
SELECT SUM(salary) AS total_salary
FROM employees;
```

## 2. AVG
`AVG` returns the average of a set of values. Use it for a column average, for example average salary or average sales.

**Syntax**:
```sql
SELECT AVG(column_name) AS average
FROM table_name;
```

**Example**:
```sql
-- 计算所有员工的平均薪资
SELECT AVG(salary) AS average_salary
FROM employees;
```

## 3. COUNT
`COUNT` counts the rows in a table, or the rows that meet a condition. It can count every row or just the rows that match a condition.

**Syntax**:
```sql
SELECT COUNT(column_name) AS count
FROM table_name;
```

**Example**:
```sql
-- 计算员工总数
SELECT COUNT(*) AS employee_count
FROM employees;

-- 计算有薪资信息的员工数量
SELECT COUNT(salary) AS count_with_salary
FROM employees;
```

## 4. MIN
`MIN` finds the smallest value in a set. Use it for the lowest salary or the lowest sales figure.

**Syntax**:
```sql
SELECT MIN(column_name) AS minimum
FROM table_name;
```

**Example**:
```sql
-- 找出所有员工中的最低薪资
SELECT MIN(salary) AS lowest_salary
FROM employees;
```

## 5. MAX
`MAX` finds the largest value in a set. Use it for the highest salary or the highest sales figure.

**Syntax**:
```sql
SELECT MAX(column_name) AS maximum
FROM table_name;
```

**Example**:
```sql
-- 找出所有员工中的最高薪资
SELECT MAX(salary) AS highest_salary
FROM employees;
```

## Combining aggregate functions

Aggregate functions are often used together with the `GROUP BY` clause so you get a summary per group. For example, total and average salary per department:

```sql
-- 按部门计算总薪资和平均薪资
SELECT department_id,
       SUM(salary) AS total_salary,
       AVG(salary) AS average_salary
FROM employees
GROUP BY department_id;
```

## Summary

Aggregate functions are very useful in database queries. They let you pull summary and statistical data out of large sets. With them you can get totals, averages, counts, minimums and maximums quickly, which makes it easier to analyse and understand the data.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Aggregate Functions](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
