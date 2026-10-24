# Query Optimization

Query optimisation is a key part of improving database performance; it involves improving the efficiency and response time of SQL queries. Effective query optimisation can significantly reduce database load and improve the user experience. Below are several key aspects of query optimisation:

## 1. Execution Plan Analysis (EXPLAIN)

The `EXPLAIN` statement is used to analyse and display the execution plan of a MySQL query, helping you understand how the database processes SQL statements.

- **Usage**: prepend the `EXPLAIN` keyword to a query statement.
  
  ```sql
  EXPLAIN SELECT * FROM employees WHERE department_id = 1;
  ```

- **Output fields**:
  - `id`: a unique identifier for the query.
  - `select_type`: the type of query (such as `SIMPLE`, `PRIMARY`, `UNION`).
  - `table`: the table being accessed.
  - `type`: the join type (such as `ALL`, `index`, `range`).
  - `possible_keys`: indexes that might be used.
  - `key`: the index actually used.
  - `key_len`: the length of the index.
  - `ref`: how the column matches the index.
  - `rows`: the number of rows scanned.
  - `Extra`: extra information (such as whether a file sort was used).

- **Optimisation strategies**:
  - Check whether appropriate indexes are being used.
  - Make sure the join type is not `ALL`, avoiding full table scans.
  - Watch the `rows` field and reduce the number of rows scanned.

## 2. Slow Query Log

The slow query log records queries whose execution time exceeds a preset threshold, helping identify performance bottlenecks.

- **Enabling the slow query log**:
  
  ```sql
  SET GLOBAL slow_query_log = 'ON';
  SET GLOBAL long_query_time = 2; -- 设置阈值为2秒
  ```

- **Viewing the log**:
  - It is written to the configured log file, for example `/var/log/mysql/mysql-slow.log`.
  - Use tools such as `mysqldumpslow` or `pt-query-digest` to analyse the log file.

- **Optimisation strategies**:
  - Identify and optimise queries that take a long time to execute.
  - Check for and add necessary indexes.
  - Avoid complex calculations or subqueries in queries.

## 3. Query Rewriting and Optimization

Rewriting and optimising queries can improve query performance.

- **Avoid SELECT ***: only select the columns you need, reducing the amount of data transferred.
  
  ```sql
  SELECT first_name, last_name FROM employees WHERE department_id = 1;
  ```

- **Use indexes**: make sure the columns in query conditions are indexed, avoiding full table scans.

  ```sql
  CREATE INDEX idx_department_id ON employees(department_id);
  ```

- **Avoid complex subqueries**: use JOINs instead of subqueries to improve query performance.

  ```sql
  -- 使用JOIN代替子查询
  SELECT e.first_name, e.last_name
  FROM employees e
  JOIN departments d ON e.department_id = d.id
  WHERE d.name = 'Sales';
  ```

- **Avoid functions in WHERE clauses**: functions may prevent index usage, causing a full table scan.

  ```sql
  -- 不推荐
  SELECT * FROM employees WHERE YEAR(hire_date) = 2024;
  
  -- 推荐
  SELECT * FROM employees WHERE hire_date BETWEEN '2024-01-01' AND '2024-12-31';
  ```

## 4. Using Appropriate Indexes

Indexes can speed up queries, but too many or inappropriate indexes hurt performance.

- **Creating indexes**:
  
  ```sql
  CREATE INDEX idx_employee_name ON employees(last_name, first_name);
  ```

- **Dropping unnecessary indexes**:

  ```sql
  DROP INDEX idx_old_index ON employees;
  ```

- **Index optimisation**:
  - Make sure the columns in common query conditions are indexed.
  - Use composite indexes to optimise multi-column queries.

## 5. Caching Mechanisms

Using caches can reduce database load and speed up response times.

- **Query cache (removed)**:
  - MySQL 8.0 has completely removed the query cache; there are no longer any `query_cache_type` or `query_cache_size` configuration items, and you should not configure anything for it anymore.
  
- **InnoDB buffer pool**:
  - Setting a sufficiently large `innodb_buffer_pool_size` (generally 60%-80% of server memory) to cache data pages and indexes is the most effective form of "cache optimisation".

- **Application-layer caching**:
  - Use Redis, Memcached and similar tools to cache the results of commonly used queries.

## 6. Optimising Database Structure

Sometimes optimising the database structure can improve query performance.

- **Splitting large tables**: split large tables into smaller tables to improve query speed.
- **Normalisation**: reduce redundant data through normalisation to improve query efficiency.

## Summary

Query optimisation is an important task for improving MySQL performance. Through execution plan analysis, the slow query log, query rewriting, appropriate indexes, caching mechanisms and database structure optimisation, you can effectively improve database query efficiency and response speed. Continuously monitoring and adjusting query performance is the key to keeping the database running efficiently.

## References

- [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [MySQL 8.0 Reference Manual · SELECT Optimization](https://dev.mysql.com/doc/refman/8.0/en/select-optimization.html)
- [MySQL 8.0 Reference Manual · Subquery Optimization](https://dev.mysql.com/doc/refman/8.0/en/subquery-optimization.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [glossary](/glossary.md)
- [README](README.md)
