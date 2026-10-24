# Execution Plan Analysis (EXPLAIN)

`EXPLAIN` is a MySQL tool for analysing the execution plan of an SQL query. By analysing the execution plan, database administrators and developers can see how MySQL will run a query, which helps identify performance bottlenecks and optimise the query. Below are the fields and judgement calls I focus on when reading `EXPLAIN` output.

## 1. Basic Usage

Prepend the `EXPLAIN` keyword to a query to view its execution plan.

```sql
EXPLAIN SELECT * FROM employees WHERE department_id = 1;
```

## 2. Execution Plan Output Fields

`EXPLAIN` output contains several fields, each providing different information about the query execution:

- **`id`**: a unique identifier for the query. For complex queries, `id` indicates the execution order. The same `id` means different parts of the same query.
- **`select_type`**: the type of query. Common values include:
  - `SIMPLE`: a simple query with no subqueries.
  - `PRIMARY`: the primary query.
  - `UNION`: the second and subsequent parts of a UNION query.
  - `SUBQUERY`: a subquery.
  - `DERIVED`: a derived table (a subquery result used as a temporary table).
- **`table`**: the table being accessed.
- **`type`**: the join type. Common types include:
  - `ALL`: a full table scan, poor performance.
  - `index`: an index scan, better performance.
  - `range`: a range scan, better performance.
  - `ref`: a reference scan, better performance.
  - `eq_ref`: an equality reference, best performance.
  - `const`: a constant table, best performance.
- **`possible_keys`**: a list of indexes that might be used.
- **`key`**: the index actually used.
- **`key_len`**: the length of the index used.
- **`ref`**: how the column matches the index. For example, `const` means a constant.
- **`rows`**: the estimated number of rows scanned.
- **`filtered`**: the estimated percentage of rows remaining after `WHERE` filtering (8.0 output also includes a `partitions` column, indicating the partitions hit).
- **`Extra`**: extra information. For example, whether a file sort (`Using filesort`) or a temporary table (`Using temporary`) was used.

## 3. Example Analysis

Suppose we have the following query:

```sql
EXPLAIN SELECT first_name, last_name FROM employees WHERE department_id = 1;
```

Suppose the `EXPLAIN` output is:

| id | select_type | table     | type  | possible_keys   | key              | key_len | ref              | rows | Extra       |
|----|-------------|-----------|-------|-----------------|------------------|---------|------------------|------|-------------|
| 1  | SIMPLE      | employees | ref   | department_idx  | department_idx   | 5       | const            | 100  | NULL        |

- **`id`**: 1, indicating this is a simple query.
- **`select_type`**: SIMPLE, indicating this is a simple query with no subqueries.
- **`table`**: employees, indicating the query accesses the `employees` table.
- **`type`**: ref, indicating an equality match through an index, better performance.
- **`possible_keys`**: department_idx, indicating `department_idx` is an index that might be used.
- **`key`**: department_idx, indicating the `department_idx` index was actually used.
- **`key_len`**: 5, indicating an index length of 5 bytes (an `INT` takes 4 bytes, plus 1 extra byte when the column allows `NULL`).
- **`ref`**: const, indicating the value compared against the index is a constant (i.e. `WHERE department_id = 1`).
- **`rows`**: 100, indicating an estimated 100 rows to scan.
- **`Extra`**: NULL, indicating no extra execution actions to note.

## 4. Optimization Suggestions

Analysing the `EXPLAIN` output gives clues for optimising the query:

- **Choose appropriate indexes**: make sure the columns in the query conditions have suitable indexes.
- **Avoid full table scans**: avoid the `ALL` type where possible, use `index`, `range` or `ref` types instead.
- **Reduce rows scanned**: watch the `rows` field and minimise the number of rows scanned.
- **Pay attention to `Extra`**: for example, if `Extra` shows `Using filesort`, the sort operation may need optimisation.

## 5. EXPLAIN for Complex Queries

For more complex queries, `EXPLAIN` can provide a more detailed execution plan, especially for multi-table joins and subqueries. Each part's `id` and `select_type` help understand the query's execution order and structure.

```sql
EXPLAIN SELECT e.first_name, e.last_name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.location = 'New York';
```

Analysing the output with `EXPLAIN` gives a better understanding of the query's execution flow, helps identify performance bottlenecks, and supports query optimisation.

## 6. EXPLAIN Output Formats and EXPLAIN ANALYZE

- **`FORMAT=TRADITIONAL`**: the default table-format output, as introduced above.
- **`FORMAT=JSON`**: JSON-format output with more detailed information including cost estimates (`cost_info`).
- **`FORMAT=TREE`** (from 8.0.16): shows the execution plan as a tree structure, making the nesting of operators visible; scenarios where the optimiser picks one of several algorithms (such as hash joins, window functions, materialisation) show the concrete algorithm chosen.

`EXPLAIN ANALYZE` (introduced in MySQL 8.0.18) **actually executes** the statement and overlays real timings and row counts on the `FORMAT=TREE` execution plan, used to verify the gap between "estimated" and "actual" values:

```sql
EXPLAIN ANALYZE
SELECT * FROM employees WHERE department_id = 1;
```

The output uses an indented tree structure, and each line contains three kinds of information:

- **Estimated values**: `cost=` (the optimiser's estimated cost) and `rows=` (estimated row count);
- **Actual values**: `actual time=...` (in milliseconds; the two values are the real time to fetch the first row and the real time to fetch all rows) and `rows=... loops=...` (rows actually returned per loop and the number of loop executions);
- **Operator and access method**: such as `Index lookup on employees using department_idx`, `Filter: ...`, `Table scan on ...`.

Key points to analyse: if an operator's `actual time` is far greater than the estimate, it usually means the statistics are stale (use `ANALYZE TABLE` to refresh them) or a suitable index is missing; operators with a large `loops` count and small per-iteration time need attention as to whether they are being repeatedly executed inside a loop. Note that `EXPLAIN ANALYZE` executes the statement itself, so use it with care on write statements such as `UPDATE`/`DELETE`.

In addition, `EXPLAIN FOR CONNECTION <thread ID>` (requires the appropriate privileges) can show the execution plan of a statement currently running in another session, often used to investigate long-running queries.

## 7. Summary

`EXPLAIN` is a powerful tool for analysing the execution plan of an SQL query. By understanding `EXPLAIN` output, you can identify performance problems, optimise queries, and improve overall database performance.

## References

- [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [MySQL 8.0 Reference Manual · EXPLAIN](https://dev.mysql.com/doc/refman/8.0/en/explain.html)
- [EXPLAIN output format](https://dev.mysql.com/doc/refman/8.0/en/explain-output.html)
- [EXPLAIN EXTENDED](https://dev.mysql.com/doc/refman/8.0/en/explain-extended.html)
- [EXPLAIN FOR CONNECTION](https://dev.mysql.com/doc/refman/8.0/en/explain-for-connection.html)

## Related pages

- [README](README.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [glossary](/glossary.md)
- [knowledge](/knowledge.md)
- [README](README.md)
