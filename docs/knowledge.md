# Knowledge Notes

This page pulls the whole site together into one review thread: core concepts, authoritative books, official docs, real-world scenarios and common pitfalls. The `[S#]` markers at the end of each item map to the "Sources" list at the bottom; in-site links go to the full write-up. Items here state only the conclusion — the reasoning and examples live on the linked pages. Every citation used in the main text has been verified; anything I could not back up is not on this page.

## 1. Core Concepts

1. **Storage engines are pluggable, and InnoDB is the default**: each table can use its own storage engine. Transactions, row locks, crash recovery and MVCC all come from the InnoDB layer. MyISAM has no transaction support. [Storage Engines](./advanced-features-internals/storage-engines.md) [S1]
2. **Indexes use B+ trees, not B trees**: a B+ tree is a variant of the B tree where all data lives in the leaf level, internal nodes hold only indexes, and the leaf level is built for range scans. [Index Data Structures](./advanced-features-internals/index-why.md) [S1][S8]
3. **Transactions have the four ACID properties, and isolation comes in four levels**: InnoDB's default is REPEATABLE READ. Isolation levels run from READ UNCOMMITTED up to SERIALIZABLE, trading consistency for concurrency at each step. [Transaction Concepts](./advanced-features-internals/transaction-concepts.md), [ACID Properties](./advanced-features-internals/acid-properties.md), [Isolation Levels and Locks](./advanced-features-internals/isolation-levels-locks.md) [S1]
4. **InnoDB's RR largely avoids phantom reads**: standard SQL says REPEATABLE READ can still produce phantoms. InnoDB blocks newly committed rows with MVCC snapshot reads, then blocks range inserts with gap locks / Next-Key Locks — this is where MySQL diverges from the standard. [Isolation Levels and Locks](./advanced-features-internals/isolation-levels-locks.md)
5. **MVCC = hidden columns + Undo Log version chain + ReadView**: every row carries three hidden columns, DB_TRX_ID, DB_ROLL_PTR and DB_ROW_ID, with older versions hanging off the Undo Log. READ COMMITTED builds a new ReadView per statement; REPEATABLE READ reuses the one created at the start of the transaction. [MVCC](./advanced-features-internals/Multi-Version-Concurrency-Control.md) [S9]
6. **Reads split into snapshot reads and current reads**: a plain SELECT is a snapshot read and takes no locks. SELECT ... FOR UPDATE, SELECT ... LOCK IN SHARE MODE, UPDATE and DELETE are current reads — they read the latest committed version and lock it. [MVCC](./advanced-features-internals/Multi-Version-Concurrency-Control.md)
7. **Each of the three logs does one job**: the Redo Log uses WAL for crash recovery and durability, with innodb_flush_log_at_trx_commit controlling whether a commit flushes to disk immediately. The Undo Log supports rollback (atomicity) and supplies older versions for MVCC. The Binary Log records logical changes and drives replication and point-in-time recovery. [Logs](./advanced-features-internals/logs.md) [S1]
8. **Master-slave replication is a four-step chain**: the primary writes the binlog → a Binlog Dump thread pushes it to the replica → the replica's IO thread writes the local Relay Log → the SQL thread replays it. Both read-scaling and failover build on top of this chain. [Master-Slave Replication](./architecture-deployment/master-slave-replication.md) [S1]
9. **EXPLAIN is the first stop for tuning**: the `type` column improves step by step from ALL (full table scan) through index and range to ref; then check `key` (the index actually used), `rows` (estimated rows scanned) and the hints in `Extra`. [Execution Plans (EXPLAIN)](./performance-tuning/explain.md) [S1]
10. **Normalization and denormalization are one trade-off**: normal forms (from 1NF up) reduce redundancy and preserve integrity; read-heavy workloads denormalize to buy query performance. Only when a single table cannot hold on do you reach for partitioning, sharding and vertical/horizontal splitting. [Normalization and Denormalization](./database-design/normalization-denormalization.md), [Partitioning and Sharding](./database-design/partitioning-sharding.md) [S8]

## 2. Key Points from the Books

1. **High Performance MySQL (4th edition)**: the classic reference across architecture, indexing, replication and tuning. The way the indexing, replication and tuning sections on this site unfold lines up with it. [S8]
2. **Inside the MySQL InnoDB Storage Engine (Jiang Chengyao)**: goes deep into InnoDB internals; it underpins the storage engine, locking, MVCC and logging sections on this site. [S9]
3. **MySQL Crash Course (Ben Forta)**: a quick reference for basic SQL syntax, matching the SQL basics and function sections on this site. [S10]
4. **Designing Data-Intensive Applications (DDIA)**: storage, replication and consistency from a systems perspective; it provides the background framing for replication and how the logs divide up the work. [S11]
5. **O'Reilly Learning SQL**: an introduction to SQL fundamentals and standard syntax, complementing the advanced SQL sections on this site. [S12]

All the books are listed on the [References and Resources](./appendix/references-resources.md) page.

## 3. Key Points from the Official Docs

1. **MySQL 8.0 Reference Manual** [S1]: the most-cited authoritative source in this site. Syntax, system variables, and the semantics of locking and replication all follow it.
2. **MySQL 8.0 Release Notes** [S2]: per-version change records. I use them to verify which version each feature on the [MySQL 8.0 Features](./new-technologies-future/mysql-8-0-features.md) page belongs to (the data dictionary rewrite, atomic DDL, window functions and CTEs, INSTANT column additions).
3. **MySQL Error Reference (8.0)** [S3]: the official error code definitions, and the source for the [Error Codes and Solutions](./appendix/error-codes-solutions.md) page.
4. **MySQL Shell 8.4** [S4]: logical backup and migration with util.dumpInstance() / util.loadDump(), which the cloud migration plans use. [MySQL Shell](./tools-practice/mysql-shell.md)
5. **MySQL Workbench** [S5]: the official modelling and administration GUI, covered on the [Workbench](./tools-practice/mysql-workbench.md) page.
6. **X DevAPI User Guide** [S6]: the document store and NoSQL interface, covered on [Integrating with NoSQL](./new-technologies-future/integration-with-nosql.md).
7. **Connector/ODBC** [S7]: the official ODBC driver documentation; entries for the per-language connectors are on [References and Resources](./appendix/references-resources.md).

## 4. Real-World Scenarios

1. **E-commerce**: ER modelling of eight entity kinds — users, products, orders, order items, payments, inventory, logistics and reviews — through to read-write splitting and sharding. [E-Commerce System](./tools-practice/e-commerce-system.md)
2. **Social networking**: data models for users, content, follow relationships and timelines, plus read optimisation for hot data. [Social Network System](./tools-practice/social-network-system.md)
3. **Log processing and analysis**: table design for multi-source ingestion, batch writes and aggregate statistics. [Log Processing and Analysis](./tools-practice/log-processing-analysis.md)
4. **Four shapes of cloud deployment**: self-managed instances, managed RDS-style services, cloud-native variants (Aurora, PolarDB, TDSQL-C, HeatWave), and the Vitess distribution layer. [MySQL in the Cloud](./new-technologies-future/mysql-in-cloud.md)
5. **Choosing a database**: how MySQL's positioning differs from PostgreSQL and others, and how MySQL divides the work with Redis, MongoDB and Elasticsearch for JSON document storage and multi-language persistence. [Comparison with Other Databases](./new-technologies-future/comparison-with-other-databases.md)

## 5. Common Pitfalls

1. **Physical backups usually cannot restore into RDS**: XtraBackup depends on the underlying filesystem, which managed services do not expose. For cloud migration use mysqldump or MySQL Shell logical backups. [MySQL in the Cloud](./new-technologies-future/mysql-in-cloud.md)
2. **Managed services do not grant SUPER**: global parameters, LOAD DATA LOCAL INFILE, UDFs and event scheduling are often restricted. Check the feature list before migrating to the cloud.
3. **innodb_flush_log_at_trx_commit != 1 can lose committed transactions**: the default of 1 flushes on every commit. Setting it to 2 or 0 buys performance, but a crash may lose the most recent commits. [Logs](./advanced-features-internals/logs.md) [S1]
4. **DELETE does not physically delete immediately**: InnoDB first marks the row for deletion, the old version goes into the Undo Log, and the purge background thread cleans it up after the transaction ends. Space is not returned right away after a large delete. [MVCC](./advanced-features-internals/Multi-Version-Concurrency-Control.md)
5. **"RR always has phantoms" is the standard's position, not InnoDB's**: applying SQL standard wording to MySQL is a frequent mistake in interviews and exams. See core concept 4.
6. **Deadlocks are solved by detection and rollback**: when transactions hold locks while waiting on each other, InnoDB detects the deadlock and rolls one of them back. Accessing resources in a fixed order from application code reduces how often it happens. [Deadlocks and Detection](./advanced-features-internals/deadlock-detection.md)

## Sources

- [S1] MySQL 8.0 Reference Manual — <https://dev.mysql.com/doc/refman/8.0/en/>
- [S2] MySQL 8.0 Release Notes — <https://dev.mysql.com/doc/relnotes/mysql/8.0/en/>
- [S3] MySQL 8.0 Error Reference — <https://dev.mysql.com/doc/mysql-errors/8.0/en/>
- [S4] MySQL Shell 8.4 Manual — <https://dev.mysql.com/doc/mysql-shell/8.4/en/>
- [S5] MySQL Workbench Manual — <https://dev.mysql.com/doc/workbench/en/>
- [S6] X DevAPI User Guide — <https://dev.mysql.com/doc/x-devapi-userguide/en/>
- [S7] MySQL Connector/ODBC Developer Guide — <https://dev.mysql.com/doc/connector-odbc/en/>
- [S8] High Performance MySQL (4th edition) — listed on the site's book page
- [S9] Inside the MySQL InnoDB Storage Engine, Jiang Chengyao — listed on the site's book page
- [S10] MySQL Crash Course, Ben Forta — listed on the site's book page
- [S11] Designing Data-Intensive Applications (DDIA) — listed on the site's book page
- [S12] O'Reilly Learning SQL — listed on the site's book page

## References

- No authoritative source found for the key claims on this page (to be verified).

- [Quick term lookup: Glossary](./glossary.md) (Chinese-English pairs, one-line definitions, authoritative sources and related pages).

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](/advanced-features-internals/README.md)
- [README](/advanced-sql-data-processing/README.md)
- [README](/appendix/README.md)
- [README](/architecture-deployment/README.md)
- [README](/basics/README.md)
- [README](/database-design/README.md)
- [README](/new-technologies-future/README.md)
- [README](/performance-tuning/README.md)
- [README](/tools-practice/README.md)
