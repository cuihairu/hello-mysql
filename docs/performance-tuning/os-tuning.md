# OS-Level Tuning

OS-level tuning is an important step in optimising database performance; by adjusting the operating system's settings and configuration, you can improve the overall performance of the database. Here are some key OS-level tuning strategies:

## 1. Memory Management

### 1.1 Virtual Memory Settings

- **Swap space**: configuring enough swap space prevents the system from suffering performance problems when memory runs out. However, relying too heavily on swap can lower performance, so adjust its size based on actual needs.

- **Swap file location**: placing the swap file on fast storage (such as an SSD) improves its performance. Avoid placing the swap file on the main disk to reduce disk I/O contention.

### 1.2 Memory Allocation

- **Memory limits**: allocate enough memory to the database process, avoiding both overuse and memory shortages. Optimise memory usage by adjusting the database configuration file (such as `innodb_buffer_pool_size`) and the OS memory limits.

- **Shared memory configuration**: in multi-process or multi-threaded applications, configure the size and access permissions of shared memory sensibly to improve memory access efficiency.

## 2. I/O Performance

### 2.1 Disk I/O Tuning

- **I/O scheduler**: choosing a suitable block-device I/O scheduler optimises disk I/O performance. For SSD/NVMe, `none` or `mq-deadline` is usually recommended; for mechanical hard disks, `mq-deadline` or `bfq` works. Note that `noop`, `deadline` and `cfq` are names from older kernels (the blk scheduling framework); `cfq` was removed from Linux 4.20 onwards, and modern kernels (multi-queue blk-mq) use `none`, `mq-deadline`, `kyber`, `bfq`. Use `cat /sys/block/<device>/queue/scheduler` to view and switch.

- **File system**: choosing a high-performance file system (such as XFS, ZFS or ext4) improves disk I/O performance. When configuring the file system, adjust the relevant parameters (such as log mode, block size) based on actual application needs.

### 2.2 Cache Management

- **File system cache**: the OS improves file I/O performance through file system caching (such as the page cache). Make sure the system has enough memory for caching to reduce disk I/O operations.

- **Adjusting cache parameters**: adjust OS cache parameters (such as `vm.swappiness`, `vm.dirty_ratio`) based on the actual workload to optimise cache performance.

## 3. Network Configuration

### 3.1 Network Bandwidth

- **Network interfaces**: make sure the server has enough network bandwidth; choose appropriate network interface cards (such as 1GbE, 10GbE) to meet the database's network needs.

- **Network buffers**: adjust the size of network buffers (such as `net.core.rmem_max` and `net.core.wmem_max`) to improve network data transfer efficiency.

### 3.2 Network Latency

- **TCP parameters**: optimising TCP parameters (such as `tcp_fin_timeout`, `tcp_tw_reuse`) reduces network latency and improves database responsiveness.

- **Network optimisation**: configuring sensible network optimisation strategies (such as disabling unnecessary services, using a firewall) reduces network load and improves database performance.

## 4. Process and Thread Management

### 4.1 Process Scheduling

- **Priority settings**: adjust the priority of the database process (using the `nice` or `renice` commands) to ensure the database process gets enough CPU time.

- **CPU affinity**: setting CPU affinity (such as with the `taskset` command) binds the database process to specific CPU cores, improving cache coherence and reducing context switches.

### 4.2 Thread Management

- **Thread count configuration**: adjust the OS thread count limit (such as `ulimit -u`) based on database load to support high-concurrency database operations.

- **Thread scheduling policy**: adjust the thread scheduling policy (such as using a real-time scheduling policy) to optimise thread execution efficiency.

## 5. System Security and Stability

### 5.1 Security Configuration

- **Firewall settings**: configure the firewall to restrict network access to the database and prevent potential security threats. Allow only trusted IP addresses to access the database.

- **SELinux**: on systems using SELinux, make sure SELinux policies are configured correctly to avoid interfering with normal database operation.

### 5.2 System Updates

- **Patch management**: regularly apply security patches for the OS and database to fix known vulnerabilities and issues, ensuring system security and stability.

- **Monitoring and logging**: configure system monitoring and logging to catch and resolve system performance problems in time. Use tools such as `top`, `vmstat`, `iostat` to monitor system resource usage.

## 6. Summary

OS-level tuning is crucial for improving database performance. By optimising memory management, I/O performance, network configuration, process and thread management and system security and stability, you can significantly improve the database's response time and throughput. Monitor and adjust OS settings regularly based on actual application needs to keep the database in optimal operating condition.

## References

- [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
