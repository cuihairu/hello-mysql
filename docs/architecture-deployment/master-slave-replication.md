# 主从复制（Master-Slave Replication）

主从复制（Master-Slave Replication）是一种常见的数据库复制技术，用于提高数据的可用性、可扩展性和性能。在这种架构中，一个数据库实例（主服务器或主数据库）负责处理所有的写操作，而一个或多个数据库实例（从服务器或从数据库）负责处理读操作和备份。

## 1. 主从复制概述

- **主服务器（Master）**：
  - 主服务器是处理所有写操作（INSERT、UPDATE、DELETE）的数据库实例。所有的修改操作都在主服务器上执行，并通过复制机制传播到从服务器。

- **从服务器（Slave）**：
  - 从服务器是一个或多个副本，用于处理读操作（SELECT）和提供数据备份。它们从主服务器接收数据更改并保持数据的同步。

## 2. 主从复制的工作原理

主从复制的基本工作原理如下：

1. **日志记录**：
   - 主服务器在执行写操作时，会将这些操作记录到二进制日志（Binary Log）中。

2. **日志传输**：
   - 从服务器（副本）上的复制 I/O 线程与主服务器建立一条长连接，主服务器的 Binlog Dump 线程在二进制日志事件产生后持续推送给从服务器，从服务器将其写入本地的中继日志（Relay Log）。

3. **日志应用**：
   - 从服务器上的 SQL（Applier）线程读取中继日志并重放其中的事务，使其与主服务器的数据保持同步。

4. **数据同步**：
   - 从服务器的数据库状态与主服务器保持一致，确保读操作获取的数据是最新的。

## 3. 主从复制的优点

- **负载均衡**：
  - 通过将读操作分散到多个从服务器上，可以减轻主服务器的负担，提高系统的整体性能。

- **高可用性**：
  - 从服务器可以用作备份，当主服务器发生故障时，可以迅速切换到从服务器，以确保系统的持续运行。

- **数据备份**：
  - 从服务器提供了数据备份的功能，能够在主服务器数据丢失或损坏时进行恢复。

## 4. 主从复制的缺点

- **数据延迟**：
  - 从服务器的数据同步可能会有延迟，导致从服务器上的数据略有滞后于主服务器。

- **复杂性**：
  - 需要配置和维护多个数据库实例，增加了系统的复杂性。

- **故障切换**：
  - 自动化故障切换机制复杂，需要额外的管理工具和监控来实现高可用性。

## 5. 主从复制的配置

配置主从复制通常涉及以下步骤：

1. **配置主服务器**（`my.cnf`）：

   ```ini
   [mysqld]
   server_id = 1
   log_bin = mysql-bin
   # 推荐启用 GTID，便于主从切换与故障转移
   gtid_mode = ON
   enforce_gtid_consistency = ON
   ```

   并创建复制专用账号并授权：

   ```sql
   CREATE USER 'repl'@'192.168.1.%' IDENTIFIED BY 'Repl@123456';
   GRANT REPLICATION SLAVE ON *.* TO 'repl'@'192.168.1.%';
   ```

2. **配置从服务器**：

   ```ini
   [mysqld]
   server_id = 2
   relay_log = relay-bin
   read_only = ON
   ```

   在 8.0.23 及以后版本使用 `CHANGE REPLICATION SOURCE TO`（旧版本为 `CHANGE MASTER TO`，8.0 中仍可用）：

   ```sql
   CHANGE REPLICATION SOURCE TO
     SOURCE_HOST = '192.168.1.10',
     SOURCE_PORT = 3306,
     SOURCE_USER = 'repl',
     SOURCE_PASSWORD = 'Repl@123456',
     SOURCE_AUTO_POSITION = 1;
   START REPLICA;   -- 旧版本为 START SLAVE
   ```

3. **检查和监控**：
   - 定期检查主从服务器的同步状态和复制进程的健康状况：

     ```sql
     SHOW REPLICA STATUS\G
     -- 重点关注 Replica_IO_Running、Replica_SQL_Running、Seconds_Behind_Source
     -- （旧版本列名为 Slave_IO_Running、Slave_SQL_Running、Seconds_Behind_Master）
     ```

   - 监控延迟和性能问题，确保系统正常运行。

## 6. 复制模式：异步复制与半同步复制

MySQL 默认使用异步复制：源库提交事务后不会等待从库确认，主库宕机时可能丢失尚未传送到从库的事务。

半同步复制（Semi-Synchronous Replication）要求源库在提交时至少等待一个从库把事务写入其中继日志并确认，可显著降低故障切换时丢数据的风险。MySQL 8.0.26 及以后版本的插件与变量命名如下（旧版本为 `rpl_semi_sync_master_*` / `rpl_semi_sync_slave_*`）：

```sql
-- 源库
INSTALL PLUGIN rpl_semi_sync_source SONAME 'semisync_source.so';
SET GLOBAL rpl_semi_sync_source_enabled = 1;

-- 从库
INSTALL PLUGIN rpl_semi_sync_replica SONAME 'semisync_replica.so';
SET GLOBAL rpl_semi_sync_replica_enabled = 1;
```

常用参数：

- `rpl_semi_sync_source_wait_for_replica_count`（旧名 `rpl_semi_sync_master_wait_for_slave_count`）：需要等待确认的从库数量，默认为 1。
- `rpl_semi_sync_source_timeout`（旧名 `rpl_semi_sync_master_timeout`）：等待确认的超时时间，默认 10000 毫秒；超时后半同步会自动退化为异步复制，避免阻塞主库。
- `rpl_semi_sync_source_wait_point`（旧名 `rpl_semi_sync_master_wait_point`）：`AFTER_SYNC`（默认，源库先写 binlog、等从库确认后再提交，即“无损半同步”）或 `AFTER_COMMIT`。

## 7. 常见问题及解决方案

- **延迟问题**：
  - 调整从服务器的复制设置，优化网络和磁盘性能，减少延迟。

- **复制中断**：
  - 监控复制进程，设置报警机制，及时处理复制中断问题。

- **数据不一致**：
  - 定期进行数据一致性检查，确保主从服务器的数据同步。

## 总结

主从复制是提高数据库系统性能和可用性的有效技术，通过将读操作分配给从服务器和备份主服务器的数据来实现负载均衡和高可用性。虽然它带来了一些管理复杂性和数据延迟问题，但正确配置和维护可以显著提升系统的可靠性和性能。