### 数据过滤与条件

在 SQL 查询中，数据过滤与条件用于控制从数据库中检索到的数据。这可以通过 `WHERE` 子句、模糊查询、范围查询和存在性检查等方式实现。以下是主要的数据过滤与条件技术：

#### 1. 使用 `WHERE` 子句

**功能**: `WHERE` 子句用于指定检索数据的条件，只返回满足条件的记录。

**语法**:
```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

**示例**:
```sql
SELECT *
FROM employees
WHERE department = 'Sales';
```
*此查询将返回部门为 `'Sales'` 的所有员工记录。*

```sql
SELECT name, salary
FROM employees
WHERE salary > 50000;
```
*此查询将返回薪资高于 50,000 的员工的姓名和薪资。*

#### 2. 模糊查询（LIKE）

**功能**: `LIKE` 运算符用于进行模糊匹配查询，可以用来查找包含指定模式的记录。

**语法**:
```sql
SELECT column1, column2, ...
FROM table_name
WHERE column LIKE pattern;
```

**常用通配符**:
- `%`：表示零个或多个字符。
- `_`：表示一个字符。

**示例**:
```sql
SELECT name
FROM employees
WHERE name LIKE 'J%';
```
*此查询将返回所有以 `'J'` 开头的员工姓名。*

```sql
SELECT email
FROM users
WHERE email LIKE '%@example.com';
```
*此查询将返回所有电子邮件地址以 `'@example.com'` 结尾的用户记录。*

#### 3. 使用 `IN` 和 `NOT IN`

**功能**: `IN` 和 `NOT IN` 运算符用于检查一个值是否在一组指定的值中。

**语法**:
```sql
SELECT column1, column2, ...
FROM table_name
WHERE column IN (value1, value2, ...);
```

**示例**:
```sql
SELECT name
FROM employees
WHERE department IN ('Sales', 'Marketing');
```
*此查询将返回部门为 `'Sales'` 或 `'Marketing'` 的所有员工姓名。*

```sql
SELECT name
FROM employees
WHERE department NOT IN ('HR', 'Finance');
```
*此查询将返回部门不是 `'HR'` 或 `'Finance'` 的员工姓名。*

#### 4. 使用 `BETWEEN` 和 `NOT BETWEEN`

**功能**: `BETWEEN` 和 `NOT BETWEEN` 用于在指定的范围内检索记录。

**语法**:
```sql
SELECT column1, column2, ...
FROM table_name
WHERE column BETWEEN value1 AND value2;
```

**示例**:
```sql
SELECT name, salary
FROM employees
WHERE salary BETWEEN 40000 AND 60000;
```
*此查询将返回薪资在 40,000 到 60,000 之间的员工姓名和薪资。*

```sql
SELECT name
FROM employees
WHERE hire_date NOT BETWEEN '2020-01-01' AND '2022-12-31';
```
*此查询将返回在 2020 年 1 月 1 日到 2022 年 12 月 31 日之外聘用的员工姓名。*

#### 5. 使用 `EXISTS` 和 `NOT EXISTS`

**功能**: `EXISTS` 和 `NOT EXISTS` 用于检查子查询是否返回记录。

**语法**:
```sql
SELECT column1, column2, ...
FROM table_name
WHERE EXISTS (subquery);
```

**示例**:
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

```sql
SELECT name
FROM employees e
WHERE NOT EXISTS (
    SELECT 1
    FROM projects p
    WHERE p.employee_id = e.id
);
```
*此查询将返回没有参与任何项目的员工姓名。*

### 总结

数据过滤与条件是 SQL 查询中关键的操作，用于限制查询结果的范围和精确度。通过使用 `WHERE` 子句、模糊查询、`IN`、`BETWEEN`、`EXISTS` 等条件，可以实现复杂的数据筛选和检索，确保从数据库中获取到符合需求的记录。