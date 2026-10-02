# 对比其他数据库的新功能

本章把 MySQL 与其他主流数据库放在一起比较，重点看各自的新能力与定位差异，帮助在选型时做出判断。不同数据库版本变化较快，这里以当前主流版本的公开特性为准，落地前应以各自的最新官方文档为准。

## 1. MySQL vs PostgreSQL

两者都是成熟的关系型开源数据库，定位略有不同：

| 维度 | MySQL | PostgreSQL |
| ---- | ----- | ---------- |
| SQL 标准与扩展性 | 以实用为主，部分 SQL 方言偏离标准 | 对 SQL 标准支持更全面，自定义类型、聚合、操作符等扩展能力极强 |
| 复杂查询 | 窗口函数、CTE 8.0 已具备；优化器更偏“简单直给” | 优化器功能丰富（如支持并行查询、JIT、更强的 CTE 与外连接语义） |
| 数据类型 | JSON、空间、向量（9.x） | 数组、范围（Range）、域、复合类型、JSONB、XML、HStore 等更丰富 |
| 索引 | B+Tree、FULLTEXT、SPATIAL、函数索引、多值索引 | 除上述外还支持 GIN、GiST、BRIN、SP-GiST 等多种访问方法 |
| 扩展性与复制 | 半同步复制、组复制、InnoDB Cluster，读扩展成熟 | 逻辑复制灵活（按表/按发布订阅）、多主方案依赖第三方（如 BDR/Patroni） |
| 生态与工具 | 客户端工具、云厂商支持、人才储备最广 | 生态活跃，插件与周边工具丰富 |

**选择建议**：强调高并发 OLTP、读写分离、生态成熟度与运维人才，选 MySQL；强调复杂查询、数据模型灵活性、标准兼容与扩展性（如自定义类型、地理信息 PostGIS），选 PostgreSQL。

## 2. MySQL vs MariaDB

MariaDB 是 MySQL 原作者 Monty 离开 Oracle 后分叉维护的社区分支，长期保持与 MySQL 的兼容：

- **分叉起始点**：2009 年从 MySQL 5.1 分叉；
- **兼容性**：数据文件与协议基本兼容，多数应用可以互相迁移，但两边的版本号与新特性走向已各自独立；
- **差异示例**：MariaDB 保留了 MySQL 5.x 的查询缓存（MySQL 8.0 已移除）；MariaDB 使用 InnoDB 的增强版（Aria、Tokudb 等自有引擎）以及自己的系统版本表、`sequence` 对象、`RETURNING` 子句等特性；
- **复制与高可用**：MariaDB 用“单线程从库（Slave）/并行复制”等另一套术语与实现，Galera 在 MariaDB 中是内置发行版的一部分。

**选择建议**：新项目若依赖社区版本且想要接近 MySQL 的体验，MySQL 与 MariaDB 都可以；已依赖 MySQL 生态的团队保持 MySQL 更省心，反之亦然。注意不要混用两边的专有 SQL 与配置项。

## 3. MySQL vs Oracle Database / SQL Server

- **Oracle**：功能与性能上限更高（并行、分区、RAC、RMAN 等企业级能力），但授权费用高；MySQL 是其在轻量、开源市场的补充，常作为从 Oracle 迁移到开源的第一步。
- **SQL Server**：Windows 生态与 .NET 集成最佳，工具链统一，商业授权；Linux 上运行的 SQL Server 已成熟，但跨平台与云原生灵活度仍不如 MySQL。
- **与 MySQL 的差异点**：Oracle/SQL Server 的存储过程语言（PL/SQL、T-SQL）与 MySQL 的 `PROCEDURE` 语法不完全兼容，迁移需要改写；分区、触发器、分析函数等能力上 MySQL 8.0 已基本覆盖常规需求，但部分高级特性（物化视图、递归触发、原生的行级安全策略等）仍有差距。

## 4. MySQL vs 分布式/NewSQL（TiDB、CockroachDB、Vitess、OceanBase）

- **水平扩展**：TiDB（兼容 MySQL 协议与语法的分布式数据库）、OceanBase、CockroachDB 等在**跨节点水平扩展**上强于单机 MySQL，天然支持分布式事务与全局一致性；
- **MySQL 生态的分片方案**：Vitess（YouTube 起源、Kubernetes 原生的 MySQL 中间层分片）、ProxySQL/MyCat 等分片中间件，以及“应用层分库分表”；
- **兼容性**：TiDB/OceanBase 等通常对 MySQL 语法有较高兼容度，但与 8.0 仍存在差异（例如某些 DDL、存储引擎相关语法、`information_schema` 细节），迁移前必须做兼容性验证；
- **运维复杂度**：分布式方案的组件更多、排错链路更长，中小规模场景下“单机 + 主从复制 + 分区表”往往成本更低。

**选择建议**：数据量与写入吞吐超出单机上限、需要弹性扩容时考虑分布式方案；否则优先用 MySQL 的分区、分库分表与读写分离。

## 5. MySQL vs 文档型/搜索型（MongoDB、Elasticsearch）

- **MongoDB**：无固定模式，文档嵌套与数组操作灵活，适合结构频繁变化的业务；MySQL 通过 JSON 类型 + 文档存储也能覆盖其中一部分需求，但在 schemaless、嵌套文档索引等场景不如 MongoDB 顺手。事务方面，MongoDB 4.0 起支持多文档事务，MySQL 的 InnoDB 事务与复制生态则更成熟。
- **Elasticsearch**：面向搜索与聚合分析，倒排索引与分布式聚合远强于 MySQL；但事务、外键、复杂关联不是其强项。常见组合是“MySQL 保证事务，ES 提供检索”，通过 binlog 同步保持最终一致。

## 6. 小结

- 需要**标准关系型 + 成熟生态 + 强读扩展**：MySQL 仍是稳妥选择；
- 需要**更强的 SQL 与扩展能力**：PostgreSQL；
- 需要**水平扩展与云原生**：TiDB / Vitess / OceanBase 等；
- 需要**灵活文档模型与全文检索**：MongoDB + Elasticsearch，并与 MySQL 协同；
- 已有大量存量业务、追求稳定演进：在 MySQL 8.0 / 8.4 LTS 上持续升级，再按需引入分片、缓存与搜索组件。

选型没有绝对答案，关键是把“事务一致性、扩展方式、运维成本、团队技能、生态支持”这五项与业务需求对齐。
