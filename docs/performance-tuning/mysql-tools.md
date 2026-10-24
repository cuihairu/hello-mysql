# MySQL Built-in Tools

This article focuses on server observability techniques such as `SHOW STATUS` and `SHOW PROCESSLIST` when troubleshooting performance issues; for general client and tool categories see [MySQL Tools Overview](../tools-practice/mysql-tools.md).

MySQL provides a variety of built-in tools and commands for monitoring database runtime state and performance. Here are two commonly used tools with detailed explanations:

## 1. SHOW STATUS

The `SHOW STATUS` command is used to view the status information of a MySQL server. It provides information about the database's runtime state, performance metrics and activity. Running this command returns the various status variables of the current MySQL instance along with their values.

### Commonly Used Status Variables

- **Connections**: the total number of connections from MySQL startup to the current time.
- **Threads_connected**: the current number of client threads connected to the MySQL server.
- **Threads_running**: the number of threads currently executing queries.
- **Slow_queries**: the total number of queries whose execution time exceeded the `long_query_time` setting.
- **Uptime**: the runtime of the MySQL server since its last start (in seconds).
- **Com_select**: the number of SELECT statements executed.
- **Com_insert**: the number of INSERT statements executed.
- **Com_update**: the number of UPDATE statements executed.
- **Com_delete**: the number of DELETE statements executed.
- **Innodb_buffer_pool_read_requests**: the number of logical reads on the InnoDB buffer pool (read requests that hit the buffer pool).
- **Innodb_buffer_pool_reads**: the number of times a data page could not be served from the buffer pool and was read directly from disk. Together they let you estimate the buffer pool hit rate: `1 - Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests`.

### Example Usage

```sql
SHOW STATUS;
```

This command returns all status variables and their current values. You can filter for specific status variables to focus on the information of interest.

```sql
SHOW STATUS LIKE 'Connections';
```

This command shows only status information related to connections.

## 2. SHOW PROCESSLIST

The `SHOW PROCESSLIST` command is used to view information about the threads currently running on the MySQL server. It provides each thread's state, the query being executed and other related information. This command is very useful for diagnosing performance problems, detecting long-running queries and identifying operations that may cause lock contention.

### Commonly Used Fields

- **Id**: the thread ID.
- **User**: the user the thread belongs to.
- **Host**: the host the thread comes from (including IP address and port number).
- **db**: the database the thread is currently operating on.
- **Command**: the type of command the thread is executing, such as `Query`, `Sleep`, `Connect`.
- **Time**: how long the thread has been in its current state (in seconds).
- **State**: the thread's current state, for example `Waiting for table metadata lock` (waiting for a metadata lock), `Sorting result` (sorting), `Sending data`; from 8.0.17, SQL execution-stage states may also appear as `executing`. The state tells you whether the thread is waiting on a lock, disk I/O or a sort.
- **Info**: the query statement currently being executed (if any).

### Example Usage

```sql
SHOW PROCESSLIST;
```

This command shows information about all current threads, including each thread's state and the query being executed.

```sql
SHOW FULL PROCESSLIST;
```

This command is the same as `SHOW PROCESSLIST`, but the `Info` column shows the full query statement rather than truncated content.

### Filtering Specific Threads

`SHOW PROCESSLIST` does not support a `WHERE` clause; to filter, query `information_schema.processlist` or `performance_schema.threads` instead:

```sql
-- 只查看正在执行查询的线程
SELECT * FROM information_schema.processlist WHERE command = 'Query';

-- 更完整的信息（含线程内部 ID、事务/锁等关联数据）
SELECT thread_id, processlist_user, processlist_host,
       processlist_db, processlist_command, processlist_time,
       processlist_state, processlist_info
FROM performance_schema.threads
WHERE processlist_command = 'Query';
```

## Summary

- **`SHOW STATUS`** provides a snapshot of the overall health and performance of the MySQL server, suitable for getting the server's health status and statistics.
- **`SHOW PROCESSLIST`** provides information about currently active threads, suitable for monitoring active queries and diagnosing potential performance bottlenecks.

With these tools, database administrators can effectively monitor and manage MySQL server performance, catching and resolving potential problems early.

## References

- [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [MySQL 8.0 Reference Manual · mysqladmin](https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html)
- [MySQL 8.0 Reference Manual · mysqlcheck](https://dev.mysql.com/doc/refman/8.0/en/mysqlcheck.html)
- [MySQL 8.0 Reference Manual · mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
