# New Features in MySQL 8.0 and Later

MySQL 8.0 went GA in April 2018 and is the biggest version jump since 5.7: a rewritten data dictionary, atomic DDL, window functions and CTEs, a new default character set and default authentication plugin, plus a batch of removed features. This chapter works through those changes by theme and marks out which version each belongs to.

## 1. Data dictionary and DDL

- **Transactional data dictionary**: 8.0 stores metadata for tables, indexes, views and stored procedures in InnoDB data dictionary tables, and removes the `.frm` files entirely. Metadata reads and writes are now transactionally safe, and some `INFORMATION_SCHEMA` tables became dynamic views over the data dictionary, which makes them faster.
- **Atomic DDL**: DDL statements such as `CREATE TABLE`, `DROP TABLE` and `ALTER TABLE` either succeed completely or roll back completely — there is no more half-deleted table with a leftover dictionary entry. DDL safety and crash recovery are guaranteed by InnoDB's DDL log.
- **Online DDL and the INSTANT algorithm**:
  - Since 8.0.12, `ALTER TABLE ... ADD COLUMN` supports `ALGORITHM=INSTANT`, which only changes metadata — no table rebuild, no data copy, done in seconds.
  - 8.0.29 extends INSTANT to adding, dropping and renaming columns at any position.
  - For common operations, check the `Online DDL` support matrix first; if INSTANT isn't available try INPLACE, and if that still doesn't work use `pt-online-schema-change` or `gh-ost`.

## 2. SQL capabilities

- **Window functions**: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LAG()`, `LEAD()`, `SUM() OVER (...)` and more, combined with `PARTITION BY` / `ORDER BY` to do ranking, period-over-period and running totals that previously required variables or subqueries.
- **Common table expressions (CTE)**: `WITH ... AS (...)` names and reuses subqueries; `WITH RECURSIVE` supports recursive queries, commonly used for hierarchical data like org charts and bill of materials.
- **Set operations**: since 8.0.31, `INTERSECT` and `EXCEPT` are supported (previously only `UNION`).
- **JSON enhancements**:
  - `JSON_TABLE()` converts a JSON document into a relation before it takes part in the query;
  - `JSON_SCHEMA_VALID()` / `JSON_SCHEMA_VALIDATION_REPORT()` (since 8.0.17) validate against a JSON Schema as a `CHECK` constraint;
  - Multi-valued indexes (since 8.0.17) can index a JSON array, and combined with `MEMBER OF` and `JSON_CONTAINS` they speed up queries.
- **Regular expression and string functions**: `REGEXP_LIKE()`, `REGEXP_REPLACE()`, `REGEXP_SUBSTR()` and `REGEXP_INSTR()` give full regular expression support.
- **Parametrization**: since 8.0.19, `TABLE` statements and `VALUES` statements are supported, and `SELECT` can reference their output directly.

## 3. Indexes and query execution

- **Descending indexes**: `CREATE INDEX idx ON t(a DESC, b ASC)` stores data in descending order for real — earlier versions just ignored `DESC`. This avoids an extra filesort for `ORDER BY` with one column ascending and another descending.
- **Invisible indexes**: `ALTER TABLE t ALTER INDEX idx INVISIBLE` lets the optimizer ignore an index without deleting it, a safe way to verify before cleaning up redundant indexes.
- **Hash join**: since 8.0.18, the optimizer uses a hash join for equi-joins with no usable index, instead of degrading to a multi-pass block nested loop with full table scans.
- **Execution plan tools**:
  - `EXPLAIN FORMAT=TREE` (since 8.0.16) prints the plan as a tree;
  - `EXPLAIN ANALYZE` (since 8.0.18) actually runs the statement and reports the real time and row count for each operator;
  - `EXPLAIN FOR CONNECTION <id>` inspects the plan of a statement running in another session.
- **Histogram statistics**: `ANALYZE TABLE t UPDATE HISTOGRAM ON col WITH n BUCKETS;` builds a histogram for a column without an index, helping the optimizer estimate row counts more accurately.
- **Skip locks and no wait**: `SELECT ... FOR UPDATE SKIP LOCKED` / `NOWAIT` (since 8.0.1) make row lock contention controllable, and are commonly used to build lightweight task queues.

## 4. Character sets and collations

- **Default character set is now `utf8mb4`**, with `utf8mb4_0900_ai_ci` as the default collation (5.x defaulted to `latin1`/`utf8mb3`).
- New `utf8mb4_0900_*` collations based on Unicode 9.0.0, with options for accent insensitivity (`ai`), case insensitivity (`ci`) and binary (`bin`).
- Things to watch on upgrade: if old tables are still `utf8mb3` (i.e. `utf8`), migrate them to `utf8mb4`; also, indexes built with the legacy `utf8mb4_general_ci` and `utf8mb4_0900_ai_ci` are not interchangeable, so the relevant tables need rebuilding.

## 5. Security and account management

- **Default authentication plugin is `caching_sha2_password`** (5.7 defaulted to `mysql_native_password`). Older client drivers that don't support this plugin will hit an authentication error; you can explicitly set `IDENTIFIED WITH mysql_native_password BY '...'` on an account as a transition (note: since MySQL 8.4 the plugin is disabled by default).
- **Roles**: `CREATE ROLE`, `GRANT role TO user`, `SET DEFAULT ROLE`, `SET ROLE` let you bundle privileges and grant them as a unit, simplifying bulk account management.
- **Finer-grained dynamic privileges**: such as `BACKUP_ADMIN`, `SYSTEM_USER`, `REPLICATION_APPLIER` and `SENSITIVE_VARIABLES_OBSERVER`.
- **Password policy enhancements**: password reuse restrictions, plus `FAILED_LOGIN_ATTEMPTS` and `PASSWORD_LOCK_TIME` (since 8.0.19) for locking accounts after repeated failures.

## 6. InnoDB improvements

- **`innodb_dedicated_server`**: set to `ON` and `innodb_buffer_pool_size`, `innodb_redo_log_capacity` and others are sized automatically from the server's memory — a good fit for a dedicated database server.
- **Persistent auto-increment counter**: the auto-increment maximum no longer resets after a restart, avoiding "delete the max ID row, restart, and get a duplicate primary key".
- **Separately managed undo tablespaces**: since 8.0, undo lives in dedicated undo tablespaces by default (`innodb_undo_tablespaces` defaults to 2) and supports online shrinking (`innodb_undo_log_truncate`), so bloat from long transactions can be reclaimed automatically.
- **Temporary table engine**: internal temporary tables use the TempTable engine (`internal_tmp_mem_storage_engine`), which is friendlier to sorting and grouping large result sets.
- **Deadlocks**: `innodb_deadlock_detect` can be turned off in high-concurrency hotspot scenarios and `innodb_lock_wait_timeout` used as a backstop; `data_locks` and `data_lock_waits` replace 5.7's `information_schema.innodb_locks` / `innodb_lock_waits`.
- **Redo log**: since 8.0.30, `innodb_redo_log_capacity` controls total redo capacity dynamically, and `innodb_log_file_size` / `innodb_log_files_in_group` are deprecated.
- **Clone plugin**: since 8.0.17, local and remote clone are built in, usable for fast replica setup and rebuild, and the foundation for InnoDB Clone backup.

## 7. Replication and high availability

- **Binary log on by default**: since 8.0, `log_bin` defaults to `ON`.
- **GTID support**: the defaults for `gtid_mode` and `enforce_gtid_consistency` are still `OFF` and need to be turned on explicitly; 8.0's GTID transaction support is more complete, and combined with `SOURCE_AUTO_POSITION=1` it simplifies setup and failover.
- **Parallel replication enhancements**: `replica_parallel_workers` and `replica_parallel_type=LOGICAL_CLOCK`, combined with `binlog_transaction_dependency_tracking=WRITESET`, significantly raise replica replay parallelism and reduce replication lag.
- **Terminology and syntax renamed**:
  - Since 8.0.22, `SHOW SLAVE STATUS` → `SHOW REPLICA STATUS`, `START SLAVE` → `START REPLICA`;
  - Since 8.0.23, `CHANGE MASTER TO` → `CHANGE REPLICATION SOURCE TO`, `log_slave_updates` → `log_replica_updates`;
  - Since 8.0.26, most `master_*` variables were renamed to `source_*` (such as the semi-sync plugin's `rpl_semi_sync_source_*`).
  The old names still work (as aliases), but new code should use the new names.
- **Group Replication and InnoDB Cluster**: based on a Paxos-style majority consensus, this is the official built-in high availability solution in 8.0; see the "High Availability Architecture" chapter for details.

## 8. Administration and operations

- **`SET PERSIST`**: `SET PERSIST max_connections = 1000;` writes the change to `mysqld-auto.cnf` and it survives a restart, avoiding "edited the config file but forgot to restart"; `SET PERSIST_ONLY` writes the file without applying it immediately.
- **Resource groups**: since 8.0.3, threads can be pinned to specific CPUs or given priority adjustments, used to isolate batch jobs from online transactions.
- **Performance and monitoring**: `performance_schema` is on by default and the `sys` schema is built in; lock information beyond `SHOW ENGINE INNODB STATUS` can be queried directly from `performance_schema`.
- **Removed features**: the query cache is removed entirely, and `query_cache_size` / `query_cache_type` no longer exist; `.frm` files, `mysqlhotcopy` (removed in 5.7.5), legacy password plugins, functions such as `ENCRYPT()`, and related variables such as `innodb_file_format` and `innodb_large_prefix` were all deleted. Before upgrading from 5.7, it's worth running MySQL Shell's `util.checkForServerUpgrade()` for a compatibility check.

## 9. After 8.0.x: 8.4 LTS and the innovation releases

- MySQL's release model changed from the 8.0 era to a dual track of "LTS (Long Term Support) + Innovation" releases: innovation releases come out quarterly and are only maintained until the next release, while LTS releases get long-term support.
- **MySQL 8.4** (GA April 2024) is the first LTS release after 8.0. The main changes include: the `mysql_native_password` plugin is disabled by default, a batch of discouraged options are removed, and replication variable naming is unified further.
- The 9.x line is the innovation release, introducing the `VECTOR` data type and vector search capabilities aimed at AI scenarios. When choosing a version, production environments should prefer LTS releases; innovation releases are suitable for validating new features.

## Summary

MySQL 8.0 is an upgrade to the internals: the data dictionary and atomic DDL solve metadata consistency, window functions and CTEs fill in the SQL gaps, and utf8mb4 with caching_sha2_password raise the default security bar, while the query cache and other legacy baggage are removed. The subsequent 8.4 LTS and 9.x innovation releases continue along this line. Understanding these changes and which version they belong to is the prerequisite for doing upgrade assessment and performance tuning well.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [MySQL 8.0 Reference Manual · JSON](https://dev.mysql.com/doc/refman/8.0/en/json.html)
- [MySQL 8.0 Reference Manual · Window functions](https://dev.mysql.com/doc/refman/8.0/en/window-functions.html)
- [MySQL 8.0 Reference Manual · Atomic DDL](https://dev.mysql.com/doc/refman/8.0/en/atomic-ddl.html)
- [MySQL 8.0 Reference Manual · Descending indexes](https://dev.mysql.com/doc/refman/8.0/en/descending-indexes.html)
- [MySQL 8.0 Reference Manual · Invisible indexes](https://dev.mysql.com/doc/refman/8.0/en/invisible-indexes.html)
- [MySQL 8.0 Reference Manual · Roles](https://dev.mysql.com/doc/refman/8.0/en/roles.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [knowledge](/knowledge.md)
- [README](README.md)
