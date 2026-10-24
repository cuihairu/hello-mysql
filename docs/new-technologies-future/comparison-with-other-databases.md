# Comparison with Other Databases

This chapter puts MySQL side by side with other mainstream databases, focusing on their newer capabilities and how their positioning differs, to help with the choice. Database versions change fast, so this uses the publicly available features of current mainstream releases — before committing, check each one's latest official documentation.

## 1. MySQL vs PostgreSQL

Both are mature, open-source relational databases with slightly different positioning:

| Dimension | MySQL | PostgreSQL |
| ---- | ----- | ---------- |
| SQL standard and extensibility | Pragmatic first, with some dialect features that deviate from the standard | Broader SQL standard support, with very strong extension capabilities for custom types, aggregates, operators and more |
| Complex queries | Window functions and CTEs are available in 8.0; the optimizer leans "simple and direct" | A feature-rich optimizer (parallel query, JIT, stronger CTE and outer join semantics) |
| Data types | JSON, spatial, vector (9.x) | Arrays, ranges, domains, composite types, JSONB, XML, HStore and more — richer overall |
| Indexes | B+Tree, FULLTEXT, SPATIAL, functional indexes, multi-valued indexes | All of the above, plus GIN, GiST, BRIN, SP-GiST and other access methods |
| Scalability and replication | Semi-sync replication, Group Replication, InnoDB Cluster; read scaling is mature | Logical replication is flexible (per-table, pub/sub); multi-primary relies on third parties (such as BDR/Patroni) |
| Ecosystem and tools | The broadest client tooling, cloud vendor support and talent pool | An active ecosystem with rich plugins and peripheral tooling |

**Choice**: pick MySQL when you need high-concurrency OLTP, read/write splitting, ecosystem maturity and operational talent; pick PostgreSQL when you need complex queries, flexible data modeling, standard compliance and extensibility (such as custom types and PostGIS geospatial).

## 2. MySQL vs MariaDB

MariaDB is the community fork maintained by MySQL's original author Monty after he left Oracle, and it has long maintained compatibility with MySQL:

- **Fork point**: forked from MySQL 5.1 in 2009;
- **Compatibility**: data files and protocol are largely compatible, and most applications can migrate between them, but the two sides' version numbers and new feature directions are now independent;
- **Differences**: MariaDB kept the MySQL 5.x query cache (removed in MySQL 8.0); MariaDB uses an enhanced InnoDB (plus its own Aria, Tokudb and other engines) along with its own system version tables, the `sequence` object, the `RETURNING` clause and other features;
- **Replication and high availability**: MariaDB uses a different set of terms and implementations, such as "single-threaded slave / parallel replication", and Galera is part of the built-in MariaDB distribution.

**Choice**: for a new project that depends on a community release and wants something close to the MySQL experience, either MySQL or MariaDB works; teams already invested in the MySQL ecosystem are better off staying with MySQL, and vice versa. Be careful not to mix the proprietary SQL and configuration options from both sides.

## 3. MySQL vs Oracle Database / SQL Server

- **Oracle**: higher ceilings for features and performance (parallelism, partitioning, RAC, RMAN and other enterprise capabilities), but with high licensing costs; MySQL is its complement in the lightweight, open-source market and is often the first step when migrating from Oracle to open source.
- **SQL Server**: best integration with the Windows ecosystem and .NET, a unified tool chain, commercial licensing; SQL Server on Linux is now mature, but it's still less flexible than MySQL across platforms and for cloud native.
- **Differences from MySQL**: the stored procedure languages of Oracle/SQL Server (PL/SQL, T-SQL) are not fully compatible with MySQL's `PROCEDURE` syntax, so migration requires rewriting; MySQL 8.0 now covers the routine needs for partitioning, triggers and analytic functions, but there are still gaps in some advanced features (materialized views, recursive triggers, native row-level security policies, and so on).

## 4. MySQL vs distributed/NewSQL (TiDB, CockroachDB, Vitess, OceanBase)

- **Horizontal scaling**: TiDB (a distributed database compatible with the MySQL protocol and syntax), OceanBase, CockroachDB and others are stronger than single-node MySQL at **cross-node horizontal scaling**, and natively support distributed transactions and global consistency;
- **Sharding options for the MySQL ecosystem**: Vitess (originating from YouTube, a Kubernetes-native MySQL middleware for sharding), ProxySQL/MyCat and other sharding middleware, plus "sharding at the application layer";
- **Compatibility**: TiDB/OceanBase and others usually have high compatibility with MySQL syntax, but there are still differences from 8.0 (for example some DDL, storage engine related syntax and `information_schema` details), so compatibility must be validated before migrating;
- **Operational complexity**: distributed solutions have more components and longer troubleshooting chains; at small to medium scale, "single node + replication + partitioned tables" is often cheaper.

**Choice**: consider a distributed solution when data volume and write throughput exceed the single-node ceiling and you need elastic scaling; otherwise prefer MySQL's partitioning, sharding and read/write splitting.

## 5. MySQL vs document/search (MongoDB, Elasticsearch)

- **MongoDB**: no fixed schema, with flexible document nesting and array operations, suitable for business where the structure changes often. MySQL can also cover part of that need via the JSON type plus document storage, but it's less comfortable than MongoDB for schemaless work and indexing nested documents. On transactions, MongoDB has supported multi-document transactions since 4.0, while MySQL's InnoDB transaction and replication ecosystem is more mature.
- **Elasticsearch**: built for search and aggregation analysis, with inverted indexes and distributed aggregation far stronger than MySQL; transactions, foreign keys and complex relational access are not its strengths. The common combination is "MySQL guarantees transactions, ES provides retrieval", kept eventually consistent via binlog synchronization.

## 6. Summary

- Needing **standard relational + mature ecosystem + strong read scaling**: MySQL is still a safe choice;
- Needing **stronger SQL and extensibility**: PostgreSQL;
- Needing **horizontal scaling and cloud native**: TiDB / Vitess / OceanBase and others;
- Needing **flexible document modeling and full-text retrieval**: MongoDB + Elasticsearch, working alongside MySQL;
- A large installed base of business and a preference for stable evolution: keep upgrading on MySQL 8.0 / 8.4 LTS, then add sharding, caching and search components as needed.

There is no absolute answer to selection — the key is aligning those five factors: "transactional consistency, scaling approach, operational cost, team skills, ecosystem support" with the actual business needs.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)

## Related pages

- [README](README.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [knowledge](/knowledge.md)
- [README](README.md)
