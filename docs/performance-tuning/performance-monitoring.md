# Performance Monitoring

Performance monitoring is an indispensable part of database administration, aimed at ensuring the health, stability and efficient operation of a database system. Through monitoring, you can obtain database performance metrics in real time, identify potential problems, and make timely adjustments and optimisations. Here are the details on MySQL performance monitoring:

## 1. Goals of MySQL Performance Monitoring

- **Identify performance bottlenecks**: by monitoring the database's runtime state, discover performance bottlenecks early and take measures to optimise them.
- **Ensure system stability**: monitor system resource usage to ensure the stability of the database system.
- **Optimise queries**: identify slow queries and inefficient database operations and optimise query performance.
- **Early warning**: set alerts and thresholds to warn of potential performance problems in time.

## 2. Built-in MySQL Tools

- **SHOW STATUS**:
  - The `SHOW STATUS` command shows database runtime state information such as connection count, query count and cache usage.
  - Commonly used status variables include `Connections` (connection count), `Threads_connected` (current connection count), `Slow_queries` (slow query count), and so on.

- **SHOW PROCESSLIST**:
  - The `SHOW PROCESSLIST` command shows information about the threads currently running, including query state, execution time, lock waits and so on.
  - Commonly used fields include `Id` (thread ID), `User` (user), `Host` (host), `db` (database), `Command` (command), `Time` (execution time), `State` (state), `Info` (query content), and so on.

- **SHOW VARIABLES**:
  - The `SHOW VARIABLES` command shows MySQL server configuration parameters such as memory allocation and buffer settings.
  - Commonly used variables include `innodb_buffer_pool_size` (InnoDB buffer pool size), `max_connections` (maximum connection count), and so on.

## 3. Third-Party Tools

- **Percona Toolkit**:
  - An open-source toolset for MySQL performance analysis and optimisation. Commonly used tools include `pt-query-digest` (query analysis) and `pt-stalk` (performance data collection).

- **MySQL Enterprise Monitor**:
  - An enterprise-level monitoring tool provided by MySQL itself, which can monitor database performance, runtime state, alerts, reports and more. Suitable for enterprise-level performance management and troubleshooting.

- **Nagios**:
  - An open-source monitoring system that can be used to monitor MySQL performance metrics such as connection count, query response time and server load.

- **Grafana + Prometheus**:
  - Combines Grafana and Prometheus to implement real-time performance monitoring of MySQL. Prometheus is used for data collection and storage, while Grafana is used for data visualisation and dashboards.

## 4. performance_schema and the sys Schema

In MySQL 8.0, `performance_schema` is enabled by default (`performance_schema = ON`); combined with the `sys` schema you can locate performance problems directly with SQL — it is the built-in "performance monitoring database":

```sql
-- 最耗时的语句（按累计耗时排序，.Timer 单位为皮秒）
SELECT DIGEST_TEXT, COUNT_STAR,
       ROUND(SUM_TIMER_WAIT / 1e12, 3) AS total_sec,
       ROUND(AVG_TIMER_WAIT / 1e9, 3)  AS avg_ms
FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC
LIMIT 10;

-- 通过 sys schema 视图找出全表扫描的语句
SELECT * FROM sys.statements_with_full_table_scans LIMIT 10;

-- 查看当前正在等待锁的事务（8.0 数据字典表）
SELECT * FROM performance_schema.data_lock_waits\G
```

- `events_statements_summary_by_digest`: execution statistics aggregated by statement fingerprint, the core data source for locating slow queries.
- The `sys` schema is a readable wrapper around `performance_schema`; other commonly used views include `sys.innodb_buffer_stats_by_table`, `sys.io_global_by_file_by_bytes`, `sys.schema_table_statistics`, and so on.
- The older `information_schema.innodb_locks` and `innodb_lock_waits` were replaced in 8.0 by `performance_schema.data_locks` and `data_lock_waits`.

## 5. Performance Metrics

- **Query performance**:
  - **Query response time**: the execution time of each query; excessive response times may indicate inefficient queries.
  - **Slow query log**: records queries whose execution time exceeds a preset threshold, used for analysing and optimising slow queries.

- **Connection count**:
  - **Current connection count**: the database's current number of connections; too many connections can strain resources.
  - **Maximum connection count**: the maximum number of connections the database allows; set an appropriate value based on actual workload.

- **Cache usage**:
  - **InnoDB buffer pool**: the memory region used to cache data and indexes; the cache hit rate affects database performance. The hit rate can be estimated from `Innodb_buffer_pool_read_requests` (logical reads) and `Innodb_buffer_pool_reads` (direct disk reads).
  - **Query cache**: MySQL 8.0 has removed the query cache, so there is no need to monitor `Qcache_*` status variables anymore; caching of repeated query results should be implemented at the application layer (such as Redis).

- **I/O performance**:
  - **Disk read/write speed**: monitor disk read/write speed to ensure disk I/O does not become a performance bottleneck.
  - **Data page read/write**: monitor InnoDB data page read/write activity to ensure database I/O operations are efficient.

- **System resources**:
  - **CPU usage**: monitor CPU usage on the database server to prevent CPU overload.
  - **Memory usage**: monitor memory usage to avoid memory leaks and insufficiency problems.

## 6. Best Practices for Performance Monitoring

- **Set alerts**: set alerts and thresholds based on performance metrics to notify administrators of potential performance problems in time.
- **Regular checks**: review performance reports and monitoring data on a regular basis, carrying out performance analysis and optimisation.
- **Optimise queries**: use the slow query log and query optimisation tools to optimise inefficient queries.
- **Adjust configuration**: adjust database configuration parameters based on performance monitoring data to improve overall database performance.
- **Performance testing**: run performance tests before releasing new features or upgrading the system to ensure the new version does not introduce performance problems.

Through effective performance monitoring, you can ensure the stable operation of a MySQL database, catch and resolve performance problems in time, and improve the overall efficiency of the database system.

## References

- [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [MySQL 8.0 Reference Manual · Performance Schema](https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html)
- [MySQL 8.0 Reference Manual · Slow Query Log](https://dev.mysql.com/doc/refman/8.0/en/slow-query-log.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [glossary](/glossary.md)
- [README](README.md)
