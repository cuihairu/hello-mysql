# Master-Master Replication

Master-Master Replication is a database replication technique in which two or more database instances act as both primary and replica servers. This architecture can improve the availability and scalability of a database system, but it also brings some challenges, such as data conflicts and complex synchronization management.

## 1. Master-Master Replication Overview

In a master-master replication architecture, every database instance can handle both write and read operations. Each master database is also a replica of the other master databases, which enables bidirectional data synchronization.

- **Master server**:
  - Every master server can handle write operations (INSERT, UPDATE, DELETE) and records these operations in the binary log.

- **Replica server**:
  - Every master server is also a replica of the other master servers, responsible for receiving and applying the binary logs from the other master servers.

## 2. How Master-Master Replication Works

The basic working principle of master-master replication is as follows:

1. **Log recording**:
   - Every master server records the write operations it executes in the binary log.

2. **Log transmission**:
   - Every master server sends the updated binary logs to the other master servers.

3. **Log application**:
   - The receiving master server applies the binary log to its local database, keeping its data in sync with the other master servers.

4. **Data synchronization**:
   - The data state of all master servers stays consistent, achieving bidirectional data synchronization.

## 3. Advantages of Master-Master Replication

- **High availability**:
  - Since every master server can handle read and write operations, the system has greater fault tolerance. When one master server fails, the other master servers can continue handling requests.

- **Load balancing**:
  - Read and write operations can be spread across multiple master servers, improving the overall performance and responsiveness of the system.

- **Data backup**:
  - Master-master replication provides data backup; each master server is a complete copy of the data.

## 4. Disadvantages of Master-Master Replication

- **Data conflicts**:
  - Since every master server can handle write operations, data conflicts or inconsistency may occur. For example, if two master servers modify the same data at the same time, this can lead to conflicts.

- **Management complexity**:
  - Configuring and maintaining a master-master replication system is more complex than a master-replica system, requiring additional management tools and strategies to handle conflicts and synchronization issues.

- **Performance overhead**:
  - Bidirectional replication brings extra performance overhead, increasing the system's network bandwidth and disk I/O load.

## 5. Configuring Master-Master Replication

Configuring master-master replication usually involves the following steps:

1. **Configure the master servers**:
   - Enable the binary log.
   - Set the server ID (unique identifier).
   - Create a dedicated replication user and grant it privileges.
   - Configure the master servers to allow bidirectional replication.

2. **Configure the replica servers**:
   - Set the replica server's server ID.
   - Specify the connection details of the other master server (host, port, user, password).
   - Start the replication process and synchronize the data.

3. **Conflict resolution**:
   - Design and implement conflict resolution mechanisms, such as timestamp-based conflict resolution or application-level conflict resolution strategies.
   - If both sides write to tables with auto-increment primary keys, you need to configure `auto_increment_increment` and `auto_increment_offset` so the two nodes use different auto-increment ranges, or switch to globally unique IDs (such as snowflake IDs or UUIDs) to avoid primary key conflicts.
   - Set `log_replica_updates = ON` (`log_slave_updates` before 8.0.23) between the two primaries, otherwise changes replicated in from the other node will not be written to this node's binary log, and cascading links will have missing data.
   - A safer approach in practice is "dual primary but only write to one side" (primary-backup mode): normally only one node accepts write requests, and the write target switches only during failover, reducing write conflicts at the root.

4. **Check and monitor**:
   - Regularly check the status and performance of master-master replication, monitoring for potential issues during data synchronization.

## 6. Common Problems and Solutions

- **Data conflicts**:
  - Implement conflict detection and resolution mechanisms to ensure data consistency. You can use timestamps, version numbers or application-level logic to resolve conflicts.

- **Replication lag**:
  - Optimize network and disk performance to reduce replication lag. Monitor replication lag and adjust as needed.

- **Configuration issues**:
  - Ensure all master servers have consistent configuration to avoid replication problems caused by configuration mismatches.

## Summary

Master-master replication is an effective technique for improving the availability and scalability of a database system. By allowing every master server to handle read and write operations and bidirectional data synchronization, it achieves high availability and load balancing. However, it also brings data conflicts and management complexity, requiring careful design and management to ensure system stability and data consistency.

## References

- [MySQL 8.0 Reference Manual · Replication](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [MySQL 8.0 Reference Manual · Backup and Recovery](https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html)
- [MySQL 8.0 Reference Manual · Replication Configuration](https://dev.mysql.com/doc/refman/8.0/en/replication-configuration.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
