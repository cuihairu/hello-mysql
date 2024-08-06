### 使用 `WHERE` 子句

`WHERE` 子句是 SQL 查询中最基本和最常用的组件之一，用于指定检索数据的条件。它过滤掉不满足条件的记录，只返回符合条件的结果集。

#### 语法

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

- `column1, column2, ...`：指定要检索的列。
- `table_name`：指定要查询的表。
- `condition`：用于过滤数据的条件。

#### 示例

1. **基本使用**

   ```sql
   SELECT *
   FROM employees
   WHERE department = 'Sales';
   ```
   *此查询将返回部门为 `'Sales'` 的所有员工记录。*

2. **多条件过滤**

   可以使用逻辑运算符（`AND`、`OR`、`NOT`）将多个条件组合在一起。

   ```sql
   SELECT name, salary
   FROM employees
   WHERE department = 'Sales' AND salary > 50000;
   ```
   *此查询将返回部门为 `'Sales'` 且薪资高于 50,000 的员工姓名和薪资。*

   ```sql
   SELECT name
   FROM employees
   WHERE department = 'Sales' OR department = 'Marketing';
   ```
   *此查询将返回部门为 `'Sales'` 或 `'Marketing'` 的员工姓名。*

   ```sql
   SELECT name
   FROM employees
   WHERE NOT department = 'HR';
   ```
   *此查询将返回部门不是 `'HR'` 的员工姓名。*

3. **使用通配符**

   `LIKE` 运算符用于模式匹配。它常与通配符（`%`、`_`）一起使用，以执行模糊查询。

   ```sql
   SELECT name
   FROM employees
   WHERE name LIKE 'J%';
   ```
   *此查询将返回所有名字以 `'J'` 开头的员工姓名。*

   ```sql
   SELECT email
   FROM users
   WHERE email LIKE '%@example.com';
   ```
   *此查询将返回所有电子邮件地址以 `'@example.com'` 结尾的用户记录。*

4. **使用 `IN` 运算符**

   `IN` 运算符用于检查一个值是否在一个指定的集合中。

   ```sql
   SELECT name
   FROM employees
   WHERE department IN ('Sales', 'Marketing');
   ```
   *此查询将返回部门为 `'Sales'` 或 `'Marketing'` 的所有员工姓名。*

5. **使用 `BETWEEN` 运算符**

   `BETWEEN` 运算符用于在两个值之间进行范围查询。

   ```sql
   SELECT name, salary
   FROM employees
   WHERE salary BETWEEN 40000 AND 60000;
   ```
   *此查询将返回薪资在 40,000 到 60,000 之间的员工姓名和薪资。*

6. **使用 `EXISTS` 运算符**

   `EXISTS` 运算符用于检查子查询是否返回任何记录。如果子查询返回至少一条记录，`EXISTS` 返回 `TRUE`。

   ```sql
   SELECT name
   FROM employees e
   WHERE EXISTS (
       SELECT 1
       FROM departments d
       WHERE d.manager_id = e.id
   );
   ```
   *此查询将返回那些有管理部门的员工姓名。*

7. **使用 `IS NULL` 和 `IS NOT NULL`**

   用于检查字段是否为 `NULL`。

   ```sql
   SELECT name
   FROM employees
   WHERE manager_id IS NULL;
   ```
   *此查询将返回没有经理的员工姓名。*

   ```sql
   SELECT name
   FROM employees
   WHERE manager_id IS NOT NULL;
   ```
   *此查询将返回有经理的员工姓名。*

#### 总结

`WHERE` 子句是 SQL 查询中最常用的工具，用于精确控制检索数据的条件。通过使用逻辑运算符、模式匹配、集合检查和范围查询，可以有效地筛选出所需的数据。掌握 `WHERE` 子句的使用方法，对于编写高效的 SQL 查询至关重要。