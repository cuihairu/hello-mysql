# Window Functions

Window functions are a major capability introduced in MySQL 8.0. The key difference from `GROUP BY` is this: an aggregate function combined with `GROUP BY` folds multiple rows into one, while a window function keeps the row count intact and attaches, to every row, a value computed over a "window" (a set of related rows). So for queries where "every row needs to see where it stands relative to the whole" — ranking, running totals, period-over-period comparisons — window functions are the most direct tool.

The examples on this page all use the table below:

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

## 1. Basic syntax: the OVER clause

A window function goes in the field list of `SELECT`, and `OVER` declares the window range:

```sql
-- 每一行都附带全公司的薪资总和
SELECT name, salary,
       SUM(salary) OVER () AS company_total
FROM employees;
```

`OVER ()` means the window is the whole table. `company_total` is the same value on every row, but the row count stays unchanged — that is exactly the dividing line between window functions and `GROUP BY`.

## 2. PARTITION BY: opening a window per group

`PARTITION BY` slices the data into a number of "partitions", and the window function computes independently inside each partition:

```sql
-- 每个部门的薪资总和，附在每一行上
SELECT name, dept, salary,
       SUM(salary) OVER (PARTITION BY dept) AS dept_total
FROM employees;
```

All three `sales` rows see 25500, and all three `dev` rows see 36500. Compared with `GROUP BY` first and then `JOIN`ing back to the base table, one statement gets it done.

## 3. Ranking functions: ROW_NUMBER, RANK, DENSE_RANK

The difference between the three ranking functions is how they treat ties:

```sql
-- 部门内按薪资从高到低排名
SELECT name, dept, salary,
       ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn,
       RANK()       OVER (PARTITION BY dept ORDER BY salary DESC) AS rk,
       DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dr
FROM employees;
```

In the `sales` department Bob earns 9500, while Alice and Carol tie at 8000:

| Function | Bob | Alice | Carol | Meaning |
| --- | --- | --- | --- | --- |
| ROW_NUMBER | 1 | 2 | 3 | Strict row number; ties are forced into an order |
| RANK | 1 | 2 | 2 | Ties share the same rank, then the next number is skipped (next is 4) |
| DENSE_RANK | 1 | 2 | 2 | Ties share the same rank, no skipping (next is 3) |

To pick "the highest-paid person per department", pair it with a subquery:

```sql
SELECT name, dept, salary
FROM (
  SELECT name, dept, salary,
         ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
  FROM employees
) t
WHERE rn = 1;
```

`ROW_NUMBER` is non-deterministic when there are ties. For a stable result, add a unique column (such as `id`) to `ORDER BY` as a tiebreaker.

## 4. Grouped aggregation: SUM / AVG / COUNT OVER

An aggregate function with `OVER` becomes its window version, which is common for share-of-total and running calculations:

```sql
-- 部门内每个人的薪资占比
SELECT name, dept, salary,
       ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY dept), 1) AS pct
FROM employees;
```

## 5. Window frames with ROWS BETWEEN: running totals and sliding windows

A window with `ORDER BY` defaults to the frame `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, that is "running from the start of the partition to the current row". To control exactly which rows take part in the calculation, declare the frame explicitly with `ROWS`:

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

Common frame keywords: `UNBOUNDED PRECEDING` (start of the partition), `n PRECEDING` (n rows before the current row), `CURRENT ROW`, `n FOLLOWING`, `UNBOUNDED FOLLOWING` (end of the partition).

## 6. Previous and next rows and bucketing: LAG, LEAD, NTILE, FIRST_VALUE, LAST_VALUE

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

`FIRST_VALUE` / `LAST_VALUE` return the first and the last row of the window frame. Watch out for the common `LAST_VALUE` trap: the default frame only reaches the current row, so without an explicit frame clause it usually returns "the current row itself". To get the value at the end of the partition you must extend the frame to the end of the partition:

```sql
-- 与本部门最高薪资的差额
SELECT name, dept, salary,
       salary - LAST_VALUE(salary) OVER (
         PARTITION BY dept ORDER BY salary
         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       ) AS gap_to_top
FROM employees;
```

## 7. Limits and things to watch out for

- Window functions require MySQL 8.0 or later; 5.7 and earlier do not support them.
- Window functions can only appear in `SELECT`, `ORDER BY` and window subclauses — not directly in `WHERE`, `GROUP BY` or `HAVING`. Filter with `WHERE` first, then open the window over the result; to change the computed result based on a condition, build a window expression with `CASE`.
- `LIMIT` is not supported inside the `OVER` clause; for "the top N per group" use `ROW_NUMBER` with a subquery filter.
- You cannot index a window function to speed it up; ordering and partitioning are computed at runtime. On large datasets narrow the range with `WHERE` first, or build regular indexes on the columns used in `PARTITION BY` / `ORDER BY` to cut down sorting cost.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Window Functions](https://dev.mysql.com/doc/refman/8.0/en/window-functions.html)
- [Window Function Frames](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html)
- [Named Windows](https://dev.mysql.com/doc/refman/8.0/en/window-functions-named-windows.html)
- [Using Window Functions](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
