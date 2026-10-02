### GROUP BY 和 HAVING

在 SQL 中，`GROUP BY` 和 `HAVING` 子句用于对查询结果进行分组和过滤，常用于生成汇总报告和统计数据。以下是这两个子句的详细介绍：

#### 1. GROUP BY

`GROUP BY` 子句用于将查询结果按指定列分组。每个分组内的记录都具有相同的值，常与聚合函数一起使用，例如 `SUM`、`AVG`、`COUNT`、`MIN` 和 `MAX`，以便对每个分组的数据进行汇总计算。

**语法**：
```sql
SELECT column_name1, aggregate_function(column_name2)
FROM table_name
GROUP BY column_name1;
```

**示例**：
```sql
-- 按部门统计每个部门的员工数量
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;
```

在这个例子中，`GROUP BY department_id` 将员工表中的记录按 `department_id` 列分组，然后计算每个部门的员工数量。

#### 2. HAVING

`HAVING` 子句用于对分组后的结果进行过滤。它类似于 `WHERE` 子句，但 `WHERE` 子句在分组之前应用，`HAVING` 子句在分组之后应用。`HAVING` 子句通常与聚合函数一起使用，以过滤聚合后的结果。

**语法**：
```sql
SELECT column_name1, aggregate_function(column_name2)
FROM table_name
GROUP BY column_name1
HAVING aggregate_function(column_name2) condition;
```

**示例**：
```sql
-- 找出员工数量大于10的部门
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 10;
```

在这个例子中，`HAVING COUNT(*) > 10` 过滤出那些员工数量大于10的部门。

### GROUP BY 和 HAVING 的结合使用

`GROUP BY` 和 `HAVING` 通常一起使用，以便首先对数据进行分组，然后对分组结果进行筛选。这种组合查询能够帮助用户从数据中提取更精确的统计信息和汇总结果。

**示例**：
```sql
-- 计算每个部门的平均薪资，并找出平均薪资高于5000的部门
SELECT department_id, AVG(salary) AS average_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 5000;
```

在这个例子中，`GROUP BY department_id` 按部门分组员工记录，`HAVING AVG(salary) > 5000` 过滤出平均薪资超过5000的部门。

### 总结

- `GROUP BY` 子句用于将结果集按一个或多个列进行分组。
- `HAVING` 子句用于对分组后的结果进行过滤，通常与聚合函数一起使用。
- `GROUP BY` 和 `HAVING` 的组合使得用户能够对数据进行详细的分组和筛选操作，生成有用的汇总报告和统计结果。