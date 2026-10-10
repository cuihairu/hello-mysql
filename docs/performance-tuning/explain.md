# 执行计划分析（EXPLAIN）

`EXPLAIN` 是 MySQL 提供的一个用于分析 SQL 查询执行计划的工具。通过分析执行计划，数据库管理员和开发人员可以了解 MySQL 如何执行查询，帮助识别性能瓶颈并优化查询。以下是对 `EXPLAIN` 的详细介绍。

## 1. 基本用法

在查询语句前加上 `EXPLAIN` 关键字，即可查看该查询的执行计划。

```sql
EXPLAIN SELECT * FROM employees WHERE department_id = 1;
```

## 2. 执行计划输出字段

`EXPLAIN` 的输出结果包括多个字段，每个字段提供了查询执行过程中的不同信息：

- **`id`**：查询的唯一标识符。对于复杂查询，`id` 表示查询的执行顺序。相同的 `id` 表示同一查询的不同部分。
- **`select_type`**：查询的类型。常见的值包括：
  - `SIMPLE`：简单查询，没有子查询。
  - `PRIMARY`：主查询。
  - `UNION`：UNION 查询的第二部分及后续部分。
  - `SUBQUERY`：子查询。
  - `DERIVED`：派生表（子查询的结果作为临时表）。
- **`table`**：正在访问的表。
- **`type`**：连接类型。常见的类型有：
  - `ALL`：全表扫描，性能较差。
  - `index`：索引扫描，性能较好。
  - `range`：范围扫描，性能较好。
  - `ref`：引用扫描，性能较好。
  - `eq_ref`：等值引用，性能最好。
  - `const`：常量表，性能最好。
- **`possible_keys`**：可能使用的索引列表。
- **`key`**：实际使用的索引。
- **`key_len`**：使用的索引长度。
- **`ref`**：列与索引的匹配方式。例如 `const` 表示常量。
- **`rows`**：估算的扫描行数。
- **`filtered`**：经过 `WHERE` 条件过滤后剩余行的百分比估算（8.0 输出还包含 `partitions` 列，表示命中的分区）。
- **`Extra`**：额外信息。例如是否使用了文件排序（`Using filesort`）或临时表（`Using temporary`）。

## 3. 示例分析

假设我们有以下查询：

```sql
EXPLAIN SELECT first_name, last_name FROM employees WHERE department_id = 1;
```

假设 `EXPLAIN` 的输出如下：

| id | select_type | table     | type  | possible_keys   | key              | key_len | ref              | rows | Extra       |
|----|-------------|-----------|-------|-----------------|------------------|---------|------------------|------|-------------|
| 1  | SIMPLE      | employees | ref   | department_idx  | department_idx   | 5       | const            | 100  | NULL        |

- **`id`**：1，表示这是一个简单查询。
- **`select_type`**：SIMPLE，表示这是一个简单查询，没有子查询。
- **`table`**：employees，表示查询访问了 `employees` 表。
- **`type`**：ref，表示通过索引进行等值匹配，性能较好。
- **`possible_keys`**：department_idx，表示 `department_idx` 是可能使用的索引。
- **`key`**：department_idx，表示实际使用了 `department_idx` 索引。
- **`key_len`**：5，表示索引长度为5字节（`INT` 占 4 字节，列允许 `NULL` 时额外 1 字节）。
- **`ref`**：const，表示与索引比较的是一个常量值（即 `WHERE department_id = 1`）。
- **`rows`**：100，表示估算需要扫描100行。
- **`Extra`**：NULL，表示没有需要额外提示的执行动作。

## 4. 优化建议

通过分析 `EXPLAIN` 输出，我们可以获得优化查询的线索：

- **选择合适的索引**：确保查询条件中的列有合适的索引。
- **避免全表扫描**：尽量避免 `ALL` 类型，使用 `index`、`range` 或 `ref` 类型。
- **减少扫描行数**：关注 `rows` 字段，尽可能减少扫描的行数。
- **关注 `Extra` 信息**：例如，如果 `Extra` 中显示 `Using filesort`，可能需要优化排序操作。

## 5. 复杂查询的 EXPLAIN

对于更复杂的查询，`EXPLAIN` 可以提供更详细的执行计划，尤其是多表连接、子查询等。每个部分的 `id` 和 `select_type` 会帮助理解查询的执行顺序和结构。

```sql
EXPLAIN SELECT e.first_name, e.last_name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.location = 'New York';
```

通过 `EXPLAIN` 分析输出，可以更好地理解查询的执行流程，识别性能瓶颈，并据此优化查询。

## 6. EXPLAIN 的输出格式与 EXPLAIN ANALYZE

- **`FORMAT=TRADITIONAL`**：默认的表格式输出，即上文介绍的形式。
- **`FORMAT=JSON`**：JSON 格式输出，包含成本估算（`cost_info`）等更详细的信息。
- **`FORMAT=TREE`**（8.0.16 起）：以树形结构展示执行计划，能直观看出各算子的嵌套关系，优化器多选一的场景（如哈希连接、窗口函数、物化）会显示具体算法。

`EXPLAIN ANALYZE`（MySQL 8.0.18 引入）会**真实执行**语句，并在 `FORMAT=TREE` 的执行计划上叠加实际的耗时和行数，用来验证“估算值”与“实际值”的偏差：

```sql
EXPLAIN ANALYZE
SELECT * FROM employees WHERE department_id = 1;
```

输出采用缩进树形结构，每一行都包含三类信息：

- **估算值**：`cost=`（优化器估算成本）与 `rows=`（估算行数）；
- **实际值**：`actual time=...`（单位毫秒，两个值分别为取到第一行和取到全部行的实际耗时）与 `rows=... loops=...`（每次循环实际返回的行数与循环执行次数）；
- **算子与访问方式**：如 `Index lookup on employees using department_idx`、`Filter: ...`、`Table scan on ...`。

分析要点：某算子的 `actual time` 远大于估算值，通常说明统计信息过期（可用 `ANALYZE TABLE` 更新）或缺少合适的索引；`loops` 很大而单次耗时很小的算子，需要关注它是否在循环中被反复执行。注意 `EXPLAIN ANALYZE` 会执行语句本身，对 `UPDATE`/`DELETE` 等写语句慎用。

此外，`EXPLAIN FOR CONNECTION <线程ID>`（需有相应权限）可以查看另一个会话中正在执行的语句的执行计划，常用于排查正在运行的长查询。

## 7. 总结

`EXPLAIN` 是一个强大的工具，用于分析 SQL 查询的执行计划。通过理解 `EXPLAIN` 的输出，可以识别性能问题，优化查询，并提高数据库的整体性能。