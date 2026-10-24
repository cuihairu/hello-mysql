# Data Summarization and Analysis

Data summarization and analysis is one of the key functions of database queries. It helps you extract useful information out of large amounts of data. With various SQL techniques you can aggregate, categorize, filter and combine data to meet business and analysis needs.

## 1. Aggregate functions (SUM, AVG, COUNT, MIN, MAX)

Aggregate functions total a set of values and are used a lot in reporting and data analysis. Here are the common ones and what they do:

- **SUM**: totals a set of values.
- **AVG**: averages a set of values.
- **COUNT**: counts the number of rows.
- **MIN**: returns the smallest value in a set.
- **MAX**: returns the largest value in a set.

**Example**:
```sql
-- 计算员工的总薪资
SELECT SUM(salary) AS total_salary
FROM employees;

-- 计算员工的平均薪资
SELECT AVG(salary) AS average_salary
FROM employees;

-- 计算员工的数量
SELECT COUNT(*) AS employee_count
FROM employees;

-- 找出员工的最高薪资
SELECT MAX(salary) AS highest_salary
FROM employees;

-- 找出员工的最低薪资
SELECT MIN(salary) AS lowest_salary
FROM employees;
```

## 2. GROUP BY and HAVING

The `GROUP BY` clause splits a result set into groups based on one or more columns, and aggregate functions can be computed over those groups. The `HAVING` clause filters the grouped results. It works like the `WHERE` clause but applies to data after grouping.

**Example**:
```sql
-- 按部门计算每个部门的员工总数
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;

-- 按部门计算每个部门的平均薪资，并筛选出平均薪资大于50000的部门
SELECT department_id, AVG(salary) AS average_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 50000;
```

## 3. Set operations (UNION, INTERSECT, EXCEPT)

Set operations merge the results of multiple queries (`INTERSECT` and `EXCEPT` are natively supported from MySQL 8.0.31 onwards). The common set operations are:

- **UNION**: combines the result sets of two or more queries and removes duplicate rows.
- **INTERSECT**: returns the intersection of two query result sets, that is, the rows that exist in both result sets.
- **EXCEPT**: returns the rows that exist in one query result set but not in the other.

**Example**:
```sql
-- 使用UNION合并两个查询结果
SELECT name FROM employees WHERE department_id = 1
UNION
SELECT name FROM employees WHERE department_id = 2;

-- 使用INTERSECT找到两个查询结果集的交集
SELECT name FROM employees WHERE department_id = 1
INTERSECT
SELECT name FROM employees WHERE salary > 60000;

-- 使用EXCEPT找到一个查询结果集中存在但另一个查询结果集中不存在的记录
SELECT name FROM employees WHERE department_id = 1
EXCEPT
SELECT name FROM employees WHERE department_id = 2;
```

## 4. SQL functions

SQL functions operate on and transform data, including string handling, math calculations, date and time operations and conditional logic. Here are some common SQL functions:

- **String functions**: `CONCAT`, `SUBSTRING`, `LENGTH`, `REPLACE`
- **Math functions**: `ROUND`, `FLOOR`, `CEIL`, `RAND`
- **Date and time functions**: `NOW`, `DATE_ADD`, `DATEDIFF`, `YEAR` (MySQL has no `DATEADD` function; use `DATE_ADD(date, INTERVAL n unit)` to add or subtract dates)
- **Conditional functions**: `IF`, `CASE`

**Example**:
```sql
-- 使用字符串函数连接名字和姓氏
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM employees;

-- 计算薪资的四舍五入值
SELECT ROUND(salary, 2) AS rounded_salary
FROM employees;

-- 计算两日期之间的天数
SELECT DATEDIFF(NOW(), hire_date) AS days_since_hired
FROM employees;

-- 使用CASE进行条件判断
SELECT name,
       CASE
           WHEN salary > 50000 THEN 'High'
           WHEN salary BETWEEN 30000 AND 50000 THEN 'Medium'
           ELSE 'Low'
       END AS salary_category
FROM employees;
```

## Summary

Data summarization and analysis is about extracting and analysing the key information in data with techniques such as aggregate functions, grouping and set operations. These techniques are used for processing data, generating reports and supporting decisions; the real effect depends on the shape of the data and how the query is written.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Aggregate Functions](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html)
- [MySQL 8.0 Reference Manual · Window Functions](https://dev.mysql.com/doc/refman/8.0/en/window-functions.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
