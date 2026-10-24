# New Features and Version Updates

MySQL version numbers change frequently, and the "version attribution" of many new features is easy to get wrong. This chapter walks the major versions and key features along the timeline, and gives advice on selection and upgrade.

## 1. Version timeline

| Version | GA date | Positioning | Key features |
| ---- | ------- | ---- | -------- |
| 5.5 | 2010-10 | Transition release | InnoDB becomes the default storage engine, semi-sync replication introduced |
| 5.6 | 2013-02 | Mature release | GTID and the beginnings of multi-threaded replication, Online DDL, a major InnoDB performance improvement |
| 5.7 | 2015-10 | Classic release | Native JSON type, generated columns, parallel replication (LOGICAL_CLOCK), `sys` schema, dynamic buffer pool resize |
| 8.0 | 2018-04 | Current mainstream | Transactional data dictionary, atomic DDL, window functions, CTE, roles, default utf8mb4, default authentication plugin caching_sha2_password |
| 8.4 | 2024-04 | LTS (Long Term Support) | A batch of deprecated items cleaned up: `mysql_native_password` disabled by default, further unification of replication and option naming |
| 9.x | from 2024-07 | Innovation release | The `VECTOR` type and vector search, JavaScript stored procedures and other capabilities for new scenarios |

Note: MySQL uses a dual "LTS + Innovation" release model — innovation releases come out quarterly and only get fixes until the next release; LTS releases get long-term support. Production environments usually pick an LTS or a mature release like 8.0, and innovation releases are used to validate new features ahead of time.

## 2. Version attributions that are easy to mix up

The following features are regularly misattributed, so here are the correct versions:

- **Window functions, common table expressions (CTE), recursive CTE**: only in MySQL **8.0**; not supported in 5.7.
- **JSON data type**: introduced in **5.7.8**, with 8.0 adding `JSON_TABLE()`, JSON Schema validation, multi-valued indexes and more.
- **Generated columns**: introduced in **5.7.6**; functional indexes can be achieved from 8.0.13 by "indexing a function expression" (underneath that is an invisible generated column plus an index).
- **GTID**: introduced in **5.6**. In 8.0 the defaults for `gtid_mode` and `enforce_gtid_consistency` **are still `OFF`** and need to be enabled manually; don't treat "GTID on by default" as an 8.0 feature.
- **Default character set `utf8mb4`**: from **8.0** (default collation `utf8mb4_0900_ai_ci`). The 5.x default character set is `latin1`; `utf8` is really `utf8mb3`, capped at 3 bytes, and cannot store 4-byte characters like Emoji.
- **Default authentication plugin `caching_sha2_password`**: from **8.0**. From 8.4 the `mysql_native_password` plugin is disabled by default.
- **`SET PERSIST` (persistent system variables)**: from **8.0**.
- **Query cache**: already discouraged in 5.7 (off by default), and **completely removed in 8.0**; variables like `query_cache_size` no longer exist.
- **InnoDB becomes the default storage engine**: **5.5**; in 8.0 the system tables also all move to InnoDB (transactional data dictionary).
- **Semi-sync replication**: introduced in **5.5**, and from 8.0.26 the plugin and variable names were renamed from `rpl_semi_sync_master_*` to `rpl_semi_sync_source_*`.
- **Alternatives to `SHOW PROCESSLIST`**: both `performance_schema.threads` and `information_schema.processlist` work; `SHOW PROCESSLIST` itself **does not support a `WHERE` clause**.
- **`EXPLAIN ANALYZE`**: **8.0.18**; `EXPLAIN FORMAT=TREE`: **8.0.16**.
- **Hash join**: **8.0.18**.
- **INSTANT add column (`ADD COLUMN` without a table rebuild)**: **8.0.12**, extended to more DDL operations in 8.0.29.
- **Clone plugin**: **8.0.17**.
- **Group Replication**: **8.0** (5.7 had a lab version; GA came with 8.0).
- **`INTERSECT` / `EXCEPT`**: **8.0.31** (previously only `UNION`).

## 3. Upgrade path advice

1. **Run a compatibility check first**: use MySQL Shell's `util.checkForServerUpgrade()` to check for deprecated options, reserved word conflicts and incompatible SQL usage; in particular confirm that removed variables like `query_cache_size` and `query_cache_type` are no longer left in the config file.
2. **Upgrade one version at a time**: an in-place upgrade from 5.7 → 8.0 is officially supported; crossing multiple major versions (such as 5.6 → 8.0) should be done in steps.
3. **Validate the application and drivers first**:
   - The default authentication plugin becomes `caching_sha2_password`, so old drivers and connection pools need upgrading or you'll hit authentication errors;
   - The default character set becomes `utf8mb4`, so watch out for implicit conversion, index length (`utf8mb4` is 4 bytes per character) and collation differences;
   - The replication terminology renames in 8.0 (`source`/`replica`) affect variable names in scripts and monitoring.
4. **Before the upgrade**: a full backup (I'd recommend one physical backup with XtraBackup plus one logical backup with mysqldump), upgrade and validate the replica first, and have a rollback plan.
5. **Pick an LTS**: for production, choose a release like 8.0 or 8.4; innovation releases are for testing and trying things out.

## 4. Version support cycles

Oracle provides Premier Support and Extended Support for each GA version; the exact number of years is governed by the official [Oracle Lifetime Support Policy](https://www.oracle.com/support/lifetime-support/) and the MySQL release notes. When planning an upgrade, it's worth factoring in "is the current version still within its support window": versions past end of support get no security patches, and keeping them in use carries compliance and security risk.

## Summary

Mapping versions to features helps you avoid the common "treating 5.7 as 8.0" mistake when reading docs, writing SQL and assessing an upgrade. A few lines to remember: 8.0 is the watershed (data dictionary, window functions, utf8mb4, query cache removed), 8.4 is the LTS, 9.x is the innovation release; GTID came in 5.6 but is off by default, the default authentication plugin changed in 8.0 and tightened in 8.4.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [MySQL 8.0 Reference Manual · Added/deprecated/removed](https://dev.mysql.com/doc/refman/8.0/en/added-deprecated-removed.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
