### 组合查询（UNION, INTERSECT, EXCEPT）

在 SQL 中，`UNION`、`INTERSECT` 和 `EXCEPT`（在 MySQL 中是 `MINUS`）是用于合并和比较多个查询结果集的操作。这些操作使得用户能够处理和分析来自不同查询的数据集合。以下是它们的详细介绍：

#### 1. UNION

`UNION` 操作符用于将两个或多个 `SELECT` 查询的结果集合并成一个结果集。默认情况下，`UNION` 去除重复的记录。如果需要保留所有记录，包括重复记录，可以使用 `UNION ALL`。

**语法**：
```sql
SELECT column_name1, column_name2
FROM table1
UNION
SELECT column_name1, column_name2
FROM table2;
```

**示例**：
```sql
-- 从两个不同的员工表中合并所有员工记录
SELECT employee_id, employee_name
FROM employees_us
UNION
SELECT employee_id, employee_name
FROM employees_eu;
```

在这个例子中，`UNION` 将来自 `employees_us` 和 `employees_eu` 表的员工记录合并在一起，去除重复的记录。

#### 2. INTERSECT

`INTERSECT` 操作符用于找出两个或多个查询结果集的交集，即在所有查询中都存在的记录。注意，`INTERSECT` 在 MySQL 中并不直接支持，可以使用 `INNER JOIN` 或 `EXISTS` 实现类似功能。

**语法**：
```sql
SELECT column_name1, column_name2
FROM table1
INTERSECT
SELECT column_name1, column_name2
FROM table2;
```

**示例**：
```sql
-- 找出同时存在于两个员工表中的员工
SELECT employee_id
FROM employees_us
INTERSECT
SELECT employee_id
FROM employees_eu;
```

在这个例子中，`INTERSECT` 返回同时在 `employees_us` 和 `employees_eu` 表中存在的员工记录。

#### 3. EXCEPT（在 MySQL 中为 MINUS）

`EXCEPT` 操作符用于找出一个查询结果集中的记录，但这些记录不出现在另一个查询结果集中。在 MySQL 中，类似功能可以使用 `LEFT JOIN` 和 `WHERE` 子句来实现。

**语法**：
```sql
SELECT column_name1, column_name2
FROM table1
EXCEPT
SELECT column_name1, column_name2
FROM table2;
```

**示例**：
```sql
-- 找出在 `employees_us` 表中存在但不在 `employees_eu` 表中的员工
SELECT employee_id
FROM employees_us
EXCEPT
SELECT employee_id
FROM employees_eu;
```

在这个例子中，`EXCEPT` 返回那些存在于 `employees_us` 表中但不在 `employees_eu` 表中的员工记录。

### 总结

- **`UNION`**: 合并两个或多个查询结果集，去除重复记录。使用 `UNION ALL` 可以保留所有记录，包括重复记录。
- **`INTERSECT`**: 查找多个查询结果集的交集，返回所有查询中都存在的记录。MySQL 不直接支持 `INTERSECT`，可以使用 `INNER JOIN` 实现。
- **`EXCEPT`**: 查找一个查询结果集中的记录，但不出现在另一个查询结果集中。MySQL 不直接支持 `EXCEPT`，可以使用 `LEFT JOIN` 和 `WHERE` 子句实现类似功能。

这些操作符提供了强大的数据处理能力，可以用来进行复杂的数据分析和报告。