### 聚合函数（SUM, AVG, COUNT, MIN, MAX）

聚合函数用于对一组数据进行计算，提供汇总信息。它们常用于报告和分析中，以帮助用户快速得到数据的整体概览。以下是一些常见的聚合函数及其用法：

#### 1. SUM
`SUM` 函数用于计算一组数值的总和。适用于对列中所有数值进行汇总计算，例如总销售额或总薪资。

**语法**：
```sql
SELECT SUM(column_name) AS total
FROM table_name;
```

**示例**：
```sql
-- 计算所有员工的总薪资
SELECT SUM(salary) AS total_salary
FROM employees;
```

#### 2. AVG
`AVG` 函数用于计算一组数值的平均值。常用于计算列的平均值，例如平均薪资或平均销售额。

**语法**：
```sql
SELECT AVG(column_name) AS average
FROM table_name;
```

**示例**：
```sql
-- 计算所有员工的平均薪资
SELECT AVG(salary) AS average_salary
FROM employees;
```

#### 3. COUNT
`COUNT` 函数用于计算表中的记录数或特定条件下的记录数。它可以统计所有记录，也可以统计满足特定条件的记录数。

**语法**：
```sql
SELECT COUNT(column_name) AS count
FROM table_name;
```

**示例**：
```sql
-- 计算员工总数
SELECT COUNT(*) AS employee_count
FROM employees;

-- 计算有薪资信息的员工数量
SELECT COUNT(salary) AS count_with_salary
FROM employees;
```

#### 4. MIN
`MIN` 函数用于找出一组数值中的最小值。例如，可以用来找出最低薪资或最低销售额。

**语法**：
```sql
SELECT MIN(column_name) AS minimum
FROM table_name;
```

**示例**：
```sql
-- 找出所有员工中的最低薪资
SELECT MIN(salary) AS lowest_salary
FROM employees;
```

#### 5. MAX
`MAX` 函数用于找出一组数值中的最大值。例如，可以用来找出最高薪资或最高销售额。

**语法**：
```sql
SELECT MAX(column_name) AS maximum
FROM table_name;
```

**示例**：
```sql
-- 找出所有员工中的最高薪资
SELECT MAX(salary) AS highest_salary
FROM employees;
```

### 聚合函数的结合使用

聚合函数常常与 `GROUP BY` 子句一起使用，以便按组计算汇总信息。例如，按部门计算每个部门的总薪资和平均薪资：

```sql
-- 按部门计算总薪资和平均薪资
SELECT department_id,
       SUM(salary) AS total_salary,
       AVG(salary) AS average_salary
FROM employees
GROUP BY department_id;
```

### 总结

聚合函数在数据库查询中非常有用，它们帮助用户从大量数据中提取汇总信息和统计数据。通过使用这些函数，用户可以快速获取总和、平均值、数量、最小值和最大值，从而更好地分析和理解数据。