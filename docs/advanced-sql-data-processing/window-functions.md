# 窗口函数（Window Functions）

窗口函数是 MySQL 8.0 引入的重要能力。它与 GROUP BY 的关键区别在于：聚合函数配合 GROUP BY 会把多行"折叠"成一行，而窗口函数在不改变行数的前提下，为每一行附加基于"窗口"（一组相关行）计算出的结果。因此排名、累计值、环比值这类"每行都要看到自己在整体中的位置"的查询，用窗口函数最直接。

本文示例统一使用下面这张表：

```sql
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  dept VARCHAR(20),
  salary INT
);

INSERT INTO employees VALUES
  (1, 'Alice',  'sales', 8000),
  (2, 'Bob',    'sales', 9500),
  (3, 'Carol',  'sales', 8000),
  (4, 'Dave',   'dev',  12000),
  (5, 'Eve',    'dev',  11000),
  (6, 'Frank',  'dev',  13500);
```

## 1. 基本语法：OVER 子句

窗口函数写在 `SELECT` 的字段列表里，通过 `OVER` 指定窗口的范围：

```sql
-- 每一行都附带全公司的薪资总和
SELECT name, salary,
       SUM(salary) OVER () AS company_total
FROM employees;
```

`OVER ()` 表示窗口是整张表的全部行。`company_total` 对每一行都相同，但行数保持不变——这正是窗口函数与 `GROUP BY` 的分水岭。

## 2. PARTITION BY：按分组开窗

`PARTITION BY` 把数据切成若干"分区"，窗口函数在每个分区内独立计算：

```sql
-- 每个部门的薪资总和，附在每一行上
SELECT name, dept, salary,
       SUM(salary) OVER (PARTITION BY dept) AS dept_total
FROM employees;
```

`sales` 的三行都会看到 25500，`dev` 的三行都会看到 36500。相比先 `GROUP BY` 再 `JOIN` 回原表，一条语句即可完成。

## 3. 排名函数：ROW_NUMBER、RANK、DENSE_RANK

三个排名函数的区别在于并列值的处理方式：

```sql
-- 部门内按薪资从高到低排名
SELECT name, dept, salary,
       ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn,
       RANK()       OVER (PARTITION BY dept ORDER BY salary DESC) AS rk,
       DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dr
FROM employees;
```

`sales` 部门中 Bob 是 9500，Alice 和 Carol 并列 8000：

| 函数 | Bob | Alice | Carol | 含义 |
| --- | --- | --- | --- | --- |
| ROW_NUMBER | 1 | 2 | 3 | 严格行号，并列也强行分先后 |
| RANK | 1 | 2 | 2 | 并列同名次，之后跳号（下一个为 4） |
| DENSE_RANK | 1 | 2 | 2 | 并列同名次，之后不跳号（下一个为 3） |

需要"每部门取薪资最高的一个人"时，配合子查询即可：

```sql
SELECT name, dept, salary
FROM (
  SELECT name, dept, salary,
         ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
  FROM employees
) t
WHERE rn = 1;
```

并列取舍上 `ROW_NUMBER` 是非确定性的；要求稳定结果时，`ORDER BY` 加上唯一列（如 `id`）作为次级排序键。

## 4. 分组聚合：SUM / AVG / COUNT OVER

聚合函数加上 `OVER` 就变成窗口版本，常用于占比、累计等分析：

```sql
-- 部门内每个人的薪资占比
SELECT name, dept, salary,
       ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY dept), 1) AS pct
FROM employees;
```

## 5. 窗口帧 ROWS BETWEEN：累计与滑动窗口

带 `ORDER BY` 的窗口默认帧是 `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`，即"从分区开头累计到当前行"。要精确控制参与计算的行范围，用 `ROWS` 子句显式声明：

```sql
-- 按入职顺序的累计薪资
SELECT id, name, salary,
       SUM(salary) OVER (ORDER BY id
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total
FROM employees;

-- 最近 3 行（含当前行）的平均薪资
SELECT id, name, salary,
       ROUND(AVG(salary) OVER (ORDER BY id
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 1) AS moving_avg
FROM employees;
```

常用帧关键字：`UNBOUNDED PRECEDING`（分区开头）、`n PRECEDING`（当前行前 n 行）、`CURRENT ROW`、`n FOLLOWING`、`UNBOUNDED FOLLOWING`（分区结尾）。

## 6. 取前后行与分桶：LAG、LEAD、NTILE、FIRST_VALUE、LAST_VALUE

```sql
-- 与上一人的薪资差额（环比）
SELECT id, name, salary,
       salary - LAG(salary, 1) OVER (ORDER BY id) AS diff_prev,
       LEAD(salary, 1) OVER (ORDER BY id) AS next_salary
FROM employees;

-- 把全公司按薪资分成 3 桶
SELECT name, salary,
       NTILE(3) OVER (ORDER BY salary DESC) AS bucket
FROM employees;
```

`FIRST_VALUE` / `LAST_VALUE` 取窗口帧的第一行和最后一行。注意 `LAST_VALUE` 的常见陷阱：默认帧只到当前行，所以不加帧子句时它返回的往往是"当前行自己"。要取分区末尾的值，必须把帧展开到分区结尾：

```sql
-- 与本部门最高薪资的差额
SELECT name, dept, salary,
       salary - LAST_VALUE(salary) OVER (
         PARTITION BY dept ORDER BY salary
         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       ) AS gap_to_top
FROM employees;
```

## 7. 限制与注意事项

- 窗口函数需要 MySQL 8.0 及以上版本，5.7 及更早版本不支持。
- 窗口函数只能出现在 `SELECT`、`ORDER BY` 和窗口化子句中，`WHERE`、`GROUP BY`、`HAVING` 里不能直接使用。先用 `WHERE` 过滤、再对结果开窗；需要按条件改变计算结果时用 `CASE` 构造窗口内表达式。
- `OVER` 子句内不支持 `LIMIT`；"每组取前 N"要用 `ROW_NUMBER` 加子查询过滤。
- 窗口函数不能建索引直接加速，排序和分区是运行时计算。数据量大时先用 `WHERE` 缩小范围，或对 `PARTITION BY` / `ORDER BY` 涉及的列建好普通索引，减少排序开销。
