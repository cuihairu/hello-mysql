# Slow Query Log

The slow query log is an important feature provided by MySQL, used to record queries whose execution time exceeds a specified threshold. This log helps database administrators identify performance bottlenecks, optimise queries and improve database response speed and overall performance.

## 1. Enabling the Slow Query Log

The slow query log needs to be configured in the MySQL configuration file (`my.cnf` or `my.ini`). You can use the following parameters to enable and configure the slow query log:

```ini
[mysqld]
slow_query_log = 1
slow_query_log_file = /path/to/slow-query.log
long_query_time = 2
```

- **`slow_query_log`**: set to `1` to enable the slow query log, `0` to disable it.
- **`slow_query_log_file`**: specifies the path of the slow query log file.
- **`long_query_time`**: sets the threshold at which a query is considered slow; decimals are supported (down to microsecond precision, such as `0.1`). For example, `long_query_time = 2` means queries that take more than 2 seconds to execute will be recorded.

Two other commonly used parameters:

```ini
[mysqld]
# 记录未使用索引的查询（即使执行时间没有超过 long_query_time）
log_queries_not_using_indexes = 1
# 对这类记录做限速，避免日志暴涨（每分钟最多记录的条数）
log_throttle_queries_not_using_indexes = 60
```

The above parameters can also be modified at runtime with `SET GLOBAL` without a restart:

```sql
SET GLOBAL slow_query_log = ON;
SET GLOBAL long_query_time = 2;
```

## 2. Viewing and Analysing the Slow Query Log

The slow query log records each slow query's execution time, the query statement and other useful information. You can use the following command to view the slow query log:

```bash
cat /path/to/slow-query.log
```

Or use the MySQL-provided tool `mysqldumpslow` to analyse and summarise the log contents:

```bash
mysqldumpslow -s t /path/to/slow-query.log
```

`-s t` means sort by time.

## 3. Slow Query Log Format

Each entry in the slow query log typically includes the following information:

- **Query time**: the query's execution time.
- **Query statement**: the SQL query statement that was recorded.
- **Execution count**: how many times the same query was executed (if applicable).
- **Lock time**: the time spent locking tables or rows during query execution.
- **Rows scanned**: the number of rows the query scanned.

## 4. Optimising Slow Queries

By analysing the slow query log, you can identify performance bottlenecks and take the following measures to optimise them:

- **Create indexes**: for queries that appear frequently in the slow query log, check whether they are missing indexes. Creating appropriate indexes based on the query conditions can significantly improve query performance.
- **Optimise query statements**: rewrite queries to avoid full table scans and reduce the number of rows scanned. For example, use `JOIN` instead of subqueries and avoid `SELECT *`.
- **Adjust database configuration**: check whether the database configuration parameters are appropriate. For example, increase caches, adjust the connection pool size, and so on.
- **Analyse execution plans**: use `EXPLAIN` to analyse the execution plan of slow queries and find performance bottlenecks.

## 5. Automated Slow Query Analysis

You can use third-party tools and plugins to automate slow query analysis and optimisation:

- **Percona Toolkit**: provides the `pt-query-digest` tool, which can perform in-depth analysis of slow query logs and generate visual reports.
- **MySQL Enterprise Monitor**: provides a graphical slow query analysis tool that helps identify and optimise performance problems.

## 6. Example

Suppose the slow query log contains the following entry:

```
# Time: 2024-08-06T10:15:00.123456Z
# User@Host: root[root] @ localhost []  Id: 12345
# Query_time: 5.678123  Lock_time: 0.000456 Rows_sent: 100  Rows_examined: 1000
SET timestamp=1722939300;
SELECT * FROM employees WHERE department_id = 1;
```

Analysing this log entry reveals:

- **`Query_time`**: the query execution time is 5.678 seconds, exceeding the configured `long_query_time` threshold.
- **`Rows_examined`**: 1000 rows of data were scanned, which may need index optimisation.
- **`Lock_time`**: the lock time is very short, indicating that locking is not the bottleneck.

## 7. Summary

The slow query log is a powerful tool that helps identify performance bottlenecks in a database. By enabling and analysing the slow query log, database administrators can understand how queries are executing, find and optimise slow queries, and thereby improve overall database performance.

## References

- [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [MySQL 8.0 Reference Manual · Slow Query Log](https://dev.mysql.com/doc/refman/8.0/en/slow-query-log.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [glossary](/glossary.md)
- [README](README.md)
