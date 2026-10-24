# System Tuning

System tuning involves adjusting a MySQL database's configuration, hardware, operating system and so on to optimise overall performance. The goal of system tuning is to improve the database's response speed, processing capacity and stability, ensuring the system continues to run normally under high load. Below are the details of system tuning.

## 1. Parameter Optimization (my.cnf Configuration File)

`my.cnf` is MySQL's main configuration file, containing the settings for various database parameters. Optimising these parameters can significantly improve MySQL performance.

### 1.1 Memory-related Parameters

- **`innodb_buffer_pool_size`**: sets the size of the InnoDB buffer pool; it is recommended to set it to 60%-80% of total memory. This is the primary memory region used by the InnoDB storage engine to cache data and indexes.
  
  ```ini
  innodb_buffer_pool_size = 4G
  ```

- **`key_buffer_size`**: sets the key cache size for the MyISAM storage engine. For systems using the MyISAM storage engine, increasing this value improves index caching efficiency.
  
  ```ini
  key_buffer_size = 512M
  ```

- **Query cache**: MySQL 8.0 has removed the query cache; the `query_cache_size` variable no longer exists, so do not leave it in 8.0's `my.cnf` (otherwise the server will fail to start because of `unknown variable`). Caching repeated query results should be handled by application-layer caches.
  
  ```ini
  # MySQL 8.0 无此配置，如从旧版本升级，请删除 query_cache_size/query_cache_type
  ```

### 1.2 Connection and Thread Parameters

- **`max_connections`**: sets the maximum number of connections allowed. Adjust based on the actual workload; a value that is too low will cause connection refusals, while one that is too high may waste resources.
  
  ```ini
  max_connections = 500
  ```

- **`thread_cache_size`**: sets the size of the thread cache, reducing the overhead of creating and destroying threads.
  
  ```ini
  thread_cache_size = 50
  ```

### 1.3 Log-related Parameters

- **`slow_query_log`**: enables the slow query log, which records queries whose execution time exceeds a threshold, helping discover and optimise performance bottlenecks.
  
  ```ini
  slow_query_log = 1
  slow_query_log_file = /var/log/mysql/slow.log
  long_query_time = 2
  ```

- **`general_log`**: enables the general query log, which records all queries. Useful for debugging and monitoring, but usually not recommended in production environments.
  
  ```ini
  general_log = 0
  ```

## 2. Hardware Tuning

Hardware configuration directly affects database performance. Here are some key hardware tuning suggestions:

### 2.1 Memory

- **Increase memory capacity**: more memory allows larger buffer pools and caches, which improves performance.
- **Memory bandwidth**: choosing higher-bandwidth memory improves the system's data processing capacity.

### 2.2 Storage

- **Use SSDs**: solid-state drives (SSDs) have faster read/write speeds than traditional mechanical hard disks (HDDs) and can significantly improve database performance.
- **RAID configuration**: databases usually choose RAID 10 (striping + mirroring), which balances read/write performance with fault tolerance; RAID 0 only provides the performance gain of striping, **has no redundancy, and a single disk failure loses all data**, so it is generally not used for storing production data.

### 2.3 CPU

- **Multi-core processors**: choosing a multi-core CPU improves the database's concurrent processing capacity.
- **CPU performance**: choosing a high-clock CPU helps improve computing power and processing speed.

## 3. OS-Level Tuning

The configuration and optimisation of the operating system have an important impact on database performance. Here are some OS-level tuning suggestions:

### 3.1 File System

- **Choose a suitable file system**: such as XFS or ext4, making sure the file system configuration suits the database's use case.
- **Adjust file system parameters**: for example, adjust the block device I/O scheduler (such as `none`, `mq-deadline`, `kyber`, `bfq`) to optimise disk I/O performance; SSD/NVMe is recommended to use `none` or `mq-deadline`. The early `cfq` and `noop` schedulers have been removed in newer kernel versions (`noop` is equivalent to `none`).

### 3.2 Network Settings

- **Network bandwidth**: make sure network bandwidth is sufficient to avoid becoming a performance bottleneck.
- **TCP parameters**: adjust TCP parameters such as `net.core.somaxconn` and `net.ipv4.tcp_fin_timeout` to optimise network connection handling capacity.

### 3.3 Process Management

- **Adjust process priority**: use the `nice` and `renice` commands to adjust the priority of database processes, ensuring the database gets enough computing resources.
- **Resource limits**: use the `ulimit` command to adjust file descriptor limits, avoiding problems caused by resource exhaustion.

## 4. Monitoring and Tuning

Regularly monitor system performance and load, and tune based on the monitoring data:

- **Monitoring tools**: use tools such as `top`, `htop`, `vmstat`, `iostat`, `netstat` and `sar` to monitor system resource usage.
- **Performance analysis tools**: use MySQL performance analysis tools such as `MySQL Enterprise Monitor`, `Percona Monitoring and Management (PMM)` and so on to obtain detailed performance data and recommendations.

## 5. Summary

System tuning is a comprehensive process involving database configuration, hardware selection, operating system settings and more. By optimising the `my.cnf` configuration file, configuring hardware resources appropriately, making OS-level adjustments and carrying out regular performance monitoring and analysis, you can significantly improve the overall performance and stability of a MySQL database. Tune the system regularly to ensure it remains efficient and stable under high load.

## References

- [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
