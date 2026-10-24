# Parameter Optimization (my.cnf Configuration File)

`my.cnf` is the main configuration file for a MySQL database, controlling the behaviour and performance of the database server. Optimising the parameters in `my.cnf` can significantly improve MySQL database performance. Below are some key parameters and their optimisation suggestions:

## 1. Memory-related Parameters

### 1.1 InnoDB Buffer Pool

- **`innodb_buffer_pool_size`**: sets the size of the InnoDB buffer pool, the primary memory region used by the InnoDB storage engine to cache data and indexes. It is generally recommended to set this to 60%-80% of total system memory.

```ini
  innodb_buffer_pool_size = 4G
```

### 1.2 MyISAM Key Cache

- **`key_buffer_size`**: sets the key cache size for the MyISAM storage engine. For systems using the MyISAM storage engine, increasing this value improves the efficiency of index caching. For the InnoDB storage engine, it is usually set to a lower value.

```ini
  key_buffer_size = 512M
```

### 1.3 Query Cache (removed in MySQL 8.0)

MySQL 8.0 **removed** the query cache and no longer provides the `query_cache_size` and `query_cache_type` variables (it is not a matter of "set them to 0"; they simply do not exist), and writing them into `my.cnf` under 8.0 will cause an `unknown variable` error at server startup. Remove the original query cache configuration from the configuration file; caching of repeated query results should be handled by application-layer tools such as Redis and Memcached.

### 1.4 Connections and Threads

- **`max_connections`**: sets the maximum number of connections allowed. Adjust based on the actual workload; a value that is too low will cause connection refusals, while one that is too high may waste resources.

```ini
  max_connections = 500
```

- **`thread_cache_size`**: sets the size of the thread cache, reducing the overhead of creating and destroying threads. For high-concurrency systems, increasing it appropriately can improve performance.

```ini
  thread_cache_size = 50
```

- **`thread_handling`**: how threads map to connections, taking the values `one-thread-per-connection` (default, one thread per connection), `no-threads` (disables threads, for debugging only) or `loaded-dynamically` (thread handling is taken over by a dynamically loaded thread pool plugin). Once MySQL Enterprise's Thread Pool plugin is loaded it sets this to `loaded-dynamically`, which significantly reduces thread overhead and context switching in scenarios with many short-lived connections.

```ini
  # 社区版默认值
  thread_handling = one-thread-per-connection
```

## 2. Log-related Parameters

### 2.1 Slow Query Log

- **`slow_query_log`**: enables the slow query log, which records queries whose execution time exceeds a threshold, helping discover and optimise performance bottlenecks.

```ini
  slow_query_log = 1
  slow_query_log_file = /var/log/mysql/slow.log
  long_query_time = 2
```

### 2.2 General Query Log

- **`general_log`**: enables the general query log, which records all queries. Useful for debugging and monitoring, but usually not recommended in production environments because it generates large amounts of log data.

```ini
  general_log = 0
```

## 3. InnoDB Parameters

### 3.1 InnoDB Logs

- **`innodb_log_file_size`**: sets the size of each InnoDB redo log file. Increasing the log file size reduces disk I/O operations, but needs to be adjusted together with `innodb_log_buffer_size`. Note: from MySQL 8.0.30 onward this variable is deprecated, and redo log total capacity is controlled uniformly by `innodb_redo_log_capacity` (default 104857600, i.e. 100 MB); new deployments should use the latter.

```ini
  innodb_log_file_size = 256M
```

- **`innodb_log_buffer_size`**: sets the size of the InnoDB log buffer. Increasing the buffer reduces the frequency of log writes and suits write-intensive applications.

```ini
  innodb_log_buffer_size = 8M
```

### 3.2 Other InnoDB Parameters

- **`innodb_flush_log_at_trx_commit`**: controls the flushing strategy for transaction logs; `1` flushes the log on every commit, while `2` and `0` reduce disk I/O but introduce a risk of data loss.

```ini
  innodb_flush_log_at_trx_commit = 1
```

- **`innodb_file_per_table`**: enables each table to use its own data file, reducing data file fragmentation and making management easier.

```ini
  innodb_file_per_table = 1
```

## 4. Caches and Buffers

### 4.1 Temporary Tables

- **`tmp_table_size`** and **`max_heap_table_size`**: set the size upper limit for internal temporary tables in memory. The smaller of the two takes effect; in-memory temporary tables that exceed this limit are converted to disk temporary tables. Increasing them appropriately reduces temporary tables spilling to disk and lowers disk I/O.

```ini
  tmp_table_size = 64M
  max_heap_table_size = 64M
```

### 4.2 Sort and Join Buffers

- **`sort_buffer_size`**: sets the buffer size used for sort operations. Increasing this value improves sort operation performance, but an excessively large value increases memory consumption.

```ini
  sort_buffer_size = 4M
```

- **`join_buffer_size`**: sets the buffer size used for join operations. Increasing this value improves join operation efficiency.

```ini
  join_buffer_size = 4M
```

## 5. Other Parameters

### 5.1 File System

- **`innodb_io_capacity`**: sets the I/O capacity of the InnoDB storage engine, affecting data page read and write performance. Adjust based on disk performance.

```ini
  innodb_io_capacity = 200
```

- **`innodb_flush_method`**: sets the flushing method for InnoDB data and logs. Adjusting appropriately can improve performance.

```ini
  innodb_flush_method = O_DIRECT
```

## 6. Summary

By adjusting the parameters in the `my.cnf` configuration file, you can significantly improve MySQL database performance and stability. Parameter optimisation needs to be adjusted according to actual workload and hardware configuration. Monitor database performance regularly and adjust according to actual usage to keep the database at its best performance.

## References

- [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [MySQL 8.0 Reference Manual · Server System Variables](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html)
- [MySQL 8.0 Reference Manual · InnoDB Parameters](https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [glossary](/glossary.md)
- [README](README.md)
