# High-Availability Architecture (MHA, Galera Cluster)

High-availability architecture is very important in database systems because it ensures the system can keep serving requests when failures occur. MySQL offers several high-availability approaches, the most common of which are MHA (Master High Availability Manager and Tools) and Galera Cluster. Below I record the main characteristics of these two architectures:

## 1. MHA (Master High Availability Manager and Tools)

MHA is a high-availability solution for MySQL databases, aimed at providing automatic failover and fast recovery when the primary node fails.

### 1.1 MHA Overview

- **Main function**: automatic failover and primary node switching
- **Architecture components**:
  - **MHA Manager**: manages and monitors the database cluster, handling primary node failures and switching operations.
  - **MHA Node**: installed on MySQL data nodes, responsible for communicating with the MHA Manager and executing switching operations.

### 1.2 How It Works

1. **Monitoring**:
   - The MHA Manager periodically checks the health of the primary node. If it detects a primary failure, the MHA Manager triggers the failover process.

2. **Failover**:
   - When the MHA Manager detects a primary failure, it selects a new primary node (usually the most recent replica) and promotes it to the new primary.
   - During switching, MHA handles data synchronization issues to ensure the new primary stays consistent with the other replicas.

3. **Data synchronization**:
   - After the primary switch completes, the MHA Manager updates the replica configurations so they point to the new primary.

4. **Recovery**:
   - Once recovery is complete, the MHA Manager continues monitoring the system to ensure the post-failover system runs stably.

### 1.3 Pros and Cons

- **Pros**:
  - Automated failover and primary node switching.
  - Relatively simple configuration and management.
  - Compatible with existing MySQL environments.

- **Cons**:
  - The switching process may cause a brief service interruption.
  - Does not support multi-primary configurations; only supports master-replica replication architecture.

## 2. Galera Cluster

Galera Cluster is a multi-primary high-availability solution that provides database cluster services based on synchronous replication.

### 2.1 Galera Cluster Overview

- **Main function**: synchronous replication and multi-primary support
- **Architecture components**:
  - **Data nodes**: each data node can read and write data, supporting multi-primary.
  - **Galera software**: runs on each data node, responsible for handling synchronous replication and data consistency between nodes.

### 2.2 How It Works

1. **Synchronous replication**:
   - Galera Cluster uses a synchronous replication mechanism; data on all data nodes is updated synchronously during write operations. This ensures the data on all nodes always stays consistent.

2. **Multi-primary**:
   - Galera Cluster supports a multi-primary configuration; any node can perform read and write operations. Write operations are synchronized to all other nodes, guaranteeing data consistency.

3. **Node join and leave**:
   - When a node joins the cluster, Galera performs data synchronization to ensure the new node's data matches the other nodes.
   - When a node leaves the cluster, Galera handles the node exit and redistributes the data.

4. **Conflict resolution**:
   - Galera Cluster has built-in conflict detection and resolution mechanisms to handle write conflicts and data consistency issues.

### 2.3 Pros and Cons

- **Pros**:
  - Supports multi-primary, allowing multiple nodes to handle read and write operations simultaneously.
  - Uses synchronous replication to ensure data consistency.
  - Strong high availability and scalability, suitable for high-load and high-concurrency scenarios.

- **Cons**:
  - Relatively high performance overhead, especially under heavy write loads.
  - More complex configuration and management.
  - Sensitive to network latency, which may affect cluster performance.

## 3. Group Replication and InnoDB Cluster (Official MySQL 8.0 Approach)

MySQL 8.0 built high availability into the server itself: Group Replication (MGR), with InnoDB Cluster provided on top of it as a complete solution.

### 3.1 Group Replication Overview

- **Architecture components**: runs as a plugin (`group_replication.so`); multiple MySQL Servers form a replication group, and a Paxos-based majority consensus within the group decides whether a transaction can commit.
- **Operating modes**:
  - **Single-primary mode** (default): the group automatically elects one primary to accept writes; the rest are read-only replicas, with automatic primary re-election when the primary fails.
  - **Multi-primary mode**: all nodes can write, relying on optimistic concurrency control and conflict detection to handle write conflicts (transactions that detect a conflict at commit time are rolled back).
- **Data synchronization**: GTID-based replication, combined with Binlog and the Certification (transaction certification) mechanism to keep data consistent within the group.

### 3.2 Basic Deployment Requirements

- All nodes use the InnoDB storage engine, and every table must have a primary key.
- Enable the binary log and turn on GTID: `gtid_mode = ON`, `enforce_gtid_consistency = ON`.
- Row-based binary logging is required: `binlog_format = ROW`, and keep `log_replica_updates = ON` (enabled by default in 8.0).
- Install the plugin with `INSTALL PLUGIN group_replication SONAME 'group_replication.so'`, then start it with `START GROUP_REPLICATION`.

### 3.3 InnoDB Cluster

InnoDB Cluster = **Group Replication + MySQL Shell (AdminAPI) + MySQL Router**:

- Use MySQL Shell's AdminAPI to create and manage the cluster, for example:
  ```javascript
  // mysqlsh（JavaScript 模式）
  dba.createCluster('myCluster');          // 创建集群
  var cluster = dba.getCluster('myCluster');
  cluster.addInstance('icadmin@node2:3306'); // 添加实例
  cluster.status();                          // 查看集群状态
  ```
- MySQL Router acts as a lightweight middleware, performing read-write splitting and failover transparently to the application.
- Compared with MHA, this approach needs no extra scripts or external components, and is the officially recommended high-availability solution for MySQL 8.0 environments.

### 3.4 Solution Comparison

| Solution | Replication mode | Automatic failover | Multi-primary support | Notes |
| -------- | ---------------- | ------------------ | --------------------- | ----- |
| Asynchronous replication + MHA | Asynchronous | Yes (external tool) | No | MHA has not been updated for a long time; maintained via a community fork |
| Semi-synchronous replication + Orchestrator/MHA | Semi-synchronous | Yes (external tool) | No | Lower data loss risk than asynchronous replication |
| Galera Cluster | Synchronous | Yes | Yes | Requires distributions such as Percona XtraDB Cluster / MariaDB Galera |
| Group Replication / InnoDB Cluster | Quasi-synchronous (majority) | Yes | Optional | Officially built into MySQL 8.0 |

## Summary

MHA and Galera Cluster are two common MySQL high-availability architecture options, each with its own characteristics and use cases. MHA suits scenarios that need automatic primary switching, while Galera Cluster suits scenarios that need multi-primary and high consistency. Choosing the right high-availability architecture depends on the specific application needs, load characteristics and system complexity.

## References

- [MySQL 8.0 Reference Manual · Replication](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [MySQL 8.0 Reference Manual · Backup and Recovery](https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html)
- [MySQL 8.0 Reference Manual · Group Replication](https://dev.mysql.com/doc/refman/8.0/en/group-replication.html)
- [MySQL 8.0 Reference Manual · InnoDB Cluster](https://dev.mysql.com/doc/refman/8.0/en/mysql-innodb-cluster-introduction.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
