# Master-Slave Replication

Master-Slave Replication is a common database replication technique used to improve data availability, scalability and performance. In this architecture, one database instance (the master server or primary database) handles all write operations, while one or more database instances (replica servers or replica databases) handle read operations and provide backups.

## 1. Master-Slave Replication Overview

- **Master server**:
  - The master server is the database instance that handles all write operations (INSERT, UPDATE, DELETE). All modification operations are executed on the master server and propagated to the replica servers through the replication mechanism.

- **Replica server**:
  - A replica server is one or more copies used to handle read operations (SELECT) and provide data backup. They receive data changes from the master server and keep the data in sync.

## 2. How Master-Slave Replication Works

The basic working principle of master-slave replication is as follows:

1. **Log recording**:
   - When executing write operations, the master server records these operations in the Binary Log.

2. **Log transmission**:
   - The replication I/O thread on the replica server (replica) establishes a long connection with the master server; the Binlog Dump thread on the master continuously pushes binary log events to the replica as they are produced, and the replica writes them into its local Relay Log.

3. **Log application**:
   - The SQL (Applier) thread on the replica server reads the relay log and replays the transactions in it, keeping its data in sync with the master server.

4. **Data synchronization**:
   - The replica server's database state stays consistent with the master server, ensuring read operations retrieve the latest data.

## 3. Advantages of Master-Slave Replication

- **Load balancing**:
  - By spreading read operations across multiple replica servers, the load on the master server is reduced and the overall system performance improves.

- **High availability**:
  - Replica servers can serve as backups; when the master server fails, you can quickly switch to a replica server to keep the system running.

- **Data backup**:
  - Replica servers provide data backup, enabling recovery when data on the master server is lost or corrupted.

## 4. Disadvantages of Master-Slave Replication

- **Data lag**:
  - Data synchronization on the replica server may be delayed, so the data on the replica can lag slightly behind the master.

- **Complexity**:
  - Configuring and maintaining multiple database instances increases system complexity.

- **Failover**:
  - Automated failover is complex and requires additional management tools and monitoring to achieve high availability.

## 5. Configuring Master-Slave Replication

Configuring master-slave replication usually involves the following steps:

1. **Configure the master server** (`my.cnf`):

   ```ini
   [mysqld]
   server_id = 1
   log_bin = mysql-bin
   # 推荐启用 GTID，便于主从切换与故障转移
   gtid_mode = ON
   enforce_gtid_consistency = ON
   ```

   And create a dedicated replication account with privileges:

   ```sql
   CREATE USER 'repl'@'192.168.1.%' IDENTIFIED BY 'Repl@123456';
   GRANT REPLICATION SLAVE ON *.* TO 'repl'@'192.168.1.%';
   ```

2. **Configure the replica server**:

   ```ini
   [mysqld]
   server_id = 2
   relay_log = relay-bin
   read_only = ON
   ```

   In 8.0.23 and later, use `CHANGE REPLICATION SOURCE TO` (older versions use `CHANGE MASTER TO`, still available in 8.0):

   ```sql
   CHANGE REPLICATION SOURCE TO
     SOURCE_HOST = '192.168.1.10',
     SOURCE_PORT = 3306,
     SOURCE_USER = 'repl',
     SOURCE_PASSWORD = 'Repl@123456',
     SOURCE_AUTO_POSITION = 1;
   START REPLICA;   -- 旧版本为 START SLAVE
   ```

3. **Check and monitor**:
   - Regularly check the synchronization state of the master and replica servers and the health of the replication process:

     ```sql
     SHOW REPLICA STATUS\G
     -- 重点关注 Replica_IO_Running、Replica_SQL_Running、Seconds_Behind_Source
     -- （旧版本列名为 Slave_IO_Running、Slave_SQL_Running、Seconds_Behind_Master）
     ```

   - Monitor lag and performance issues to keep the system running properly.

## 6. Replication Modes: Asynchronous and Semi-Synchronous Replication

MySQL uses asynchronous replication by default: the source does not wait for replica acknowledgment after committing a transaction, so transactions not yet sent to the replica may be lost if the master goes down.

Semi-Synchronous Replication requires the source to wait for at least one replica to write the transaction into its relay log and acknowledge at commit time, which significantly reduces the risk of data loss during failover. The plugin and variable names in MySQL 8.0.26 and later are as follows (older versions used `rpl_semi_sync_master_*` / `rpl_semi_sync_slave_*`):

```sql
-- 源库
INSTALL PLUGIN rpl_semi_sync_source SONAME 'semisync_source.so';
SET GLOBAL rpl_semi_sync_source_enabled = 1;

-- 从库
INSTALL PLUGIN rpl_semi_sync_replica SONAME 'semisync_replica.so';
SET GLOBAL rpl_semi_sync_replica_enabled = 1;
```

Common parameters:

- `rpl_semi_sync_source_wait_for_replica_count` (old name `rpl_semi_sync_master_wait_for_slave_count`): the number of replicas whose acknowledgment must be waited for; defaults to 1.
- `rpl_semi_sync_source_timeout` (old name `rpl_semi_sync_master_timeout`): the timeout for waiting on acknowledgment, default 10000 milliseconds; after the timeout, semi-synchronous replication automatically degrades to asynchronous to avoid blocking the master.
- `rpl_semi_sync_source_wait_point` (old name `rpl_semi_sync_master_wait_point`): `AFTER_SYNC` (default; the source writes the binlog first, then commits after receiving replica acknowledgment, i.e. "lossless semi-synchronous") or `AFTER_COMMIT`.

## 7. Common Problems and Solutions

- **Lag issues**:
  - Adjust the replica server's replication settings and optimize network and disk performance to reduce lag.

- **Replication interruption**:
  - Monitor the replication process, set up alerting, and handle replication interruptions promptly.

- **Data inconsistency**:
  - Perform regular data consistency checks to ensure the master and replica servers are in sync.

## Summary

Master-slave replication is an effective technique for improving the performance and availability of a database system. By assigning read operations to replica servers and backing up the master server's data, it achieves load balancing and high availability. Although it brings some management complexity and data lag issues, proper configuration and maintenance can significantly improve system reliability and performance.

## References

- [MySQL 8.0 Reference Manual · Replication](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [MySQL 8.0 Reference Manual · Backup and Recovery](https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html)
- [MySQL 8.0 Reference Manual · Replication Implementation](https://dev.mysql.com/doc/refman/8.0/en/replication-implementation.html)
- [MySQL 8.0 Reference Manual · Replication Formats](https://dev.mysql.com/doc/refman/8.0/en/replication-formats.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
- [knowledge](/knowledge.md)
