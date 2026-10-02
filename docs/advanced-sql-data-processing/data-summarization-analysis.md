### 数据汇总与分析

数据汇总与分析是数据库查询的重要功能之一，能够帮助用户从大量数据中提取有价值的信息。通过各种SQL技术，用户可以对数据进行聚合、分类、过滤和组合，以满足业务需求和分析目的。

#### 1. 聚合函数（SUM, AVG, COUNT, MIN, MAX）

聚合函数用于对一组值进行汇总计算，常用于报告和数据分析。以下是常见的聚合函数及其用途：

- **SUM**：计算一组值的总和。
- **AVG**：计算一组值的平均值。
- **COUNT**：计算记录的数量。
- **MIN**：返回一组值中的最小值。
- **MAX**：返回一组值中的最大值。

**示例**：
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

#### 2. GROUP BY 和 HAVING

`GROUP BY`子句用于将结果集按一个或多个列进行分组，聚合函数可以在这些分组上进行计算。`HAVING`子句用于过滤分组结果，它类似于`WHERE`子句，但适用于分组后的数据。

**示例**：
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

#### 3. 组合查询（UNION, INTERSECT, EXCEPT）

组合查询用于将多个查询的结果合并在一起。常用的组合查询操作包括：

- **UNION**：合并两个或更多查询的结果集，去除重复的记录。
- **INTERSECT**：返回两个查询结果集的交集，即两个结果集中都存在的记录。
- **EXCEPT**：返回一个查询结果集中存在但另一个结果集中不存在的记录。

**示例**：
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

#### 4. SQL函数

SQL函数用于对数据进行操作和转换，包括字符串处理、数学计算、日期时间操作和条件判断等。以下是一些常用的SQL函数：

- **字符串函数**：`CONCAT`、`SUBSTRING`、`LENGTH`、`REPLACE`
- **数学函数**：`ROUND`、`FLOOR`、`CEIL`、`RAND`
- **日期和时间函数**：`NOW`、`DATEADD`、`DATEDIFF`、`YEAR`
- **条件判断函数**：`IF`、`CASE`

**示例**：
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

### 总结

数据汇总与分析涉及到通过聚合函数、分组、组合查询等技术来提取和分析数据中的关键信息。掌握这些技术可以帮助用户高效地处理数据，生成报告，并支持决策过程。通过合理使用这些SQL功能，用户可以深入理解数据并做出更具信息化的决策。