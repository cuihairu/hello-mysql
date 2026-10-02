### 高可用架构（MHA, Galera Cluster）

高可用架构在数据库系统中非常重要，因为它确保了系统在发生故障时能够继续提供服务。MySQL 提供了多种高可用架构方案，其中最常见的包括 MHA（Master High Availability Manager and Tools）和 Galera Cluster。以下是对这两种架构的详细介绍：

#### 1. **MHA（Master High Availability Manager and Tools）**

MHA 是一种用于 MySQL 数据库的高可用性解决方案，旨在提供主节点故障的自动切换和快速恢复功能。

##### 1.1 **MHA 概述**

- **主要功能**：自动故障转移和主节点切换
- **架构组成**：
  - **MHA Manager**：管理和监控数据库集群，处理主节点故障和切换操作。
  - **MHA Node**：安装在 MySQL 数据节点上，负责与 MHA Manager 进行通信，执行切换操作。

##### 1.2 **工作原理**

1. **监控**：
   - MHA Manager 定期检查主节点的健康状态。如果检测到主节点发生故障，MHA Manager 会触发故障转移过程。

2. **故障转移**：
   - 当 MHA Manager 检测到主节点故障时，它会选择一个新的主节点（通常是最近的从节点）并将其提升为新的主节点。
   - 切换过程中，MHA 会处理数据同步问题，确保新的主节点与其他从节点保持一致。

3. **数据同步**：
   - 在主节点切换完成后，MHA Manager 会更新从节点的配置，使其指向新的主节点。

4. **恢复**：
   - 恢复完成后，MHA Manager 会继续监控系统，确保故障转移后的系统稳定运行。

##### 1.3 **优点与缺点**

- **优点**：
  - 自动化的故障转移和主节点切换。
  - 配置和管理相对简单。
  - 可以与现有的 MySQL 环境兼容使用。

- **缺点**：
  - 切换过程可能会导致短暂的服务中断。
  - 不支持多主节点配置，仅支持主从复制架构。

#### 2. **Galera Cluster**

Galera Cluster 是一个多主节点的高可用性解决方案，提供了基于同步复制的数据库集群服务。

##### 2.1 **Galera Cluster 概述**

- **主要功能**：同步复制和多主节点支持
- **架构组成**：
  - **数据节点**：每个数据节点都可以读写数据，支持多主节点。
  - **Galera 软件**：运行在每个数据节点上，负责处理同步复制和节点之间的数据一致性。

##### 2.2 **工作原理**

1. **同步复制**：
   - Galera Cluster 使用同步复制机制，所有数据节点上的数据在写操作时都会被同步更新。这确保了所有节点上的数据始终保持一致。

2. **多主节点**：
   - Galera Cluster 支持多主节点配置，任何节点都可以进行读写操作。写操作会被同步到所有其他节点，保证数据一致性。

3. **节点加入与离开**：
   - 当节点加入集群时，Galera 会进行数据同步，确保新节点的数据与其他节点一致。
   - 节点离开集群时，Galera 会处理节点的退出和数据重新分布。

4. **冲突解决**：
   - Galera Cluster 内置了冲突检测和解决机制，处理写操作冲突和数据一致性问题。

##### 2.3 **优点与缺点**

- **优点**：
  - 支持多主节点，允许多个节点同时处理读写操作。
  - 使用同步复制，确保数据一致性。
  - 高可用性和扩展性强，适用于高负载和高并发的场景。

- **缺点**：
  - 性能开销较大，特别是在高写入负载的情况下。
  - 配置和管理复杂度较高。
  - 对网络延迟较为敏感，可能影响集群的性能。

#### 3. **Group Replication 与 InnoDB Cluster（MySQL 8.0 官方方案）**

MySQL 8.0 把高可用能力内置到了服务器中，即组复制（Group Replication，MGR），并在其之上提供了 InnoDB Cluster 这一整套解决方案。

##### 3.1 **Group Replication 概述**

- **架构组成**：以插件形式运行（`group_replication.so`），多个 MySQL Server 组成一个复制组，组内通过基于 Paxos 协议的多数派共识来决定事务是否可以提交。
- **工作模式**：
  - **单主模式**（默认）：组内自动选出一台主节点接受写入，其余节点为只读副本，主节点故障时自动选主。
  - **多主模式**：所有节点都可以写入，依靠乐观并发控制和冲突检测来处理写冲突（提交时检测到冲突的事务会被回滚）。
- **数据同步**：基于 GTID 的复制，配合 Binlog 和 Certification（事务认证）机制保证组内数据一致。

##### 3.2 **部署的基本要求**

- 所有节点使用 InnoDB 存储引擎，且每张表必须有主键。
- 开启二进制日志并启用 GTID：`gtid_mode = ON`、`enforce_gtid_consistency = ON`。
- 必须使用基于行的二进制日志：`binlog_format = ROW`，并保持 `log_replica_updates = ON`（8.0 默认开启）。
- 通过 `INSTALL PLUGIN group_replication SONAME 'group_replication.so'` 安装插件，再用 `START GROUP_REPLICATION` 启动。

##### 3.3 **InnoDB Cluster**

InnoDB Cluster = **Group Replication + MySQL Shell（AdminAPI）+ MySQL Router**：

- 使用 MySQL Shell 的 AdminAPI 创建和管理集群，例如：
  ```javascript
  // mysqlsh（JavaScript 模式）
  dba.createCluster('myCluster');          // 创建集群
  var cluster = dba.getCluster('myCluster');
  cluster.addInstance('icadmin@node2:3306'); // 添加实例
  cluster.status();                          // 查看集群状态
  ```
- MySQL Router 作为轻量级中间件，对应用透明地完成读写分离和故障转移。
- 该方案与 MHA 相比不需要额外的脚本和外部组件，是 MySQL 8.0 环境下官方推荐的高可用方案。

##### 3.4 **方案对比**

| 方案 | 复制方式 | 是否自动故障转移 | 是否支持多主 | 说明 |
| ---- | -------- | ---------------- | ------------ | ---- |
| 异步复制 + MHA | 异步 | 是（外部工具） | 否 | MHA 已较长时间未更新，社区分支维护 |
| 半同步复制 + Orchestrator/MHA | 半同步 | 是（外部工具） | 否 | 数据丢失风险低于异步复制 |
| Galera Cluster | 同步 | 是 | 是 | 需 Percona XtraDB Cluster / MariaDB Galera 等发行版 |
| Group Replication / InnoDB Cluster | 准同步（多数派） | 是 | 可选 | MySQL 8.0 官方内置方案 |

### 总结

MHA 和 Galera Cluster 是两种常见的 MySQL 高可用架构方案，各有其特点和适用场景。MHA 适合需要主节点自动切换的场景，而 Galera Cluster 适合需要多主节点和高一致性的场景。选择合适的高可用架构取决于具体的应用需求、负载特性以及系统的复杂性。