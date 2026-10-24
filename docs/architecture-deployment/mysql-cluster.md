# Cluster Architecture (MySQL Cluster)

MySQL Cluster is a high-availability, scalable database solution that provides high data availability and performance by organizing multiple database nodes into a cluster. The design goal of MySQL Cluster is to overcome the high-availability and scalability limits of traditional single-instance databases.

## 1. MySQL Cluster Overview

MySQL Cluster is based on the NDB (Network DataBase) storage engine and provides distributed database capabilities. It is suitable for scenarios that need high availability, real-time data access and large-scale data processing, such as telecom, financial services and online transaction processing (OLTP) systems.

> Note: The standard MySQL Community Server distribution does not include the NDB storage engine; you need to use the dedicated NDB Cluster (MySQL Cluster) distribution. It is a different product form from a regular MySQL 8.0 server.

## 2. Architecture Components

The MySQL Cluster architecture mainly includes the following components:

1. **Data nodes**:
   - Data nodes are responsible for storing the actual data and indexes. Data nodes collaborate through a distributed storage mechanism to ensure data availability and consistency.

2. **Management nodes**:
   - Management nodes are responsible for cluster management and configuration, including starting and stopping the cluster, managing nodes and monitoring node status. Management nodes do not store data and do not handle user queries.

3. **SQL nodes**:
   - SQL nodes are the interface for users to interact with the cluster, handling users' SQL query requests. SQL nodes can connect to one or more data nodes to read or modify data.

## 3. How It Works

The working principle of MySQL Cluster can be summarized in the following steps:

1. **Data distribution**:
   - Data is distributed across data nodes, typically using hash partitioning to allocate the data. This distribution mechanism ensures load balancing and data availability.

2. **Data replication**:
   - Each data node maintains multiple copies of the data (usually two) to provide data availability. Data copies are kept in sync through a synchronization mechanism.

3. **Failure recovery**:
   - If a data node fails, MySQL Cluster automatically migrates the failed node's data copies to other healthy data nodes, ensuring the system keeps running.

4. **Load balancing**:
   - SQL nodes distribute query requests across multiple data nodes through load balancing strategies to optimize performance and response time.

## 4. Advantages of MySQL Cluster

- **High availability**:
  - Through multi-copy data storage and automatic failure recovery, MySQL Cluster provides a highly available data storage solution.

- **Horizontal scaling**:
  - The cluster can be scaled out by adding more data nodes to handle larger data volumes and higher loads.

- **Real-time performance**:
  - Optimized by design for real-time data access, suitable for high-throughput, low-latency scenarios.

- **Transparency**:
  - SQL nodes and applications do not need to know the details of the underlying data distribution, simplifying application development and maintenance.

## 5. MySQL Cluster Configuration and Management

- **Cluster configuration**:
  - You need to configure the network connections of data nodes, management nodes and SQL nodes, and set the appropriate parameters to achieve data distribution and replication.

- **Monitoring and management**:
  - Use the tools provided by the management node (such as `ndb_mgm`) to monitor cluster status, check node health and perform configuration and adjustments.

- **Performance tuning**:
  - Adjust cluster configuration parameters (such as cache size, data distribution strategies) based on the application's load and data access patterns to optimize performance and response time.

## 6. Common Problems and Solutions

- **Node failure**:
  - If a data node fails, check network connections, disk status and node configuration. Use the management tools to inspect cluster status and perform failure recovery operations.

- **Performance bottlenecks**:
  - Analyze the cluster's performance metrics, checking the load balancing of data nodes and the query performance of SQL nodes. Adjust the cluster configuration and optimize queries as needed.

- **Data consistency**:
  - Ensure consistency across all data copies. Configure appropriate replication and synchronization mechanisms and monitor the data synchronization state.

## Summary

MySQL Cluster provides a high-availability, scalable database solution suitable for scenarios that need high performance and high availability. By distributing data across multiple data nodes and using replication and failure recovery mechanisms, MySQL Cluster can provide stable service. However, its configuration and management are relatively complex, requiring a deep understanding of its architecture and performance tuning strategies.

## References

- [MySQL 8.0 Reference Manual · Replication](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [MySQL 8.0 Reference Manual · Backup and Recovery](https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html)
- [MySQL 8.0 Reference Manual · MySQL Cluster](https://dev.mysql.com/doc/refman/8.0/en/mysql-cluster.html)
- [MySQL 8.0 Reference Manual · MySQL Cluster Overview](https://dev.mysql.com/doc/refman/8.0/en/mysql-cluster-overview.html)
- [MySQL 8.0 Reference Manual · MySQL Cluster General Information](https://dev.mysql.com/doc/refman/8.0/en/mysql-cluster-general-info.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
