# Storage Engines

MySQL uses a pluggable storage engine architecture; within the same database, different tables can use different storage engines. The **default storage engine in MySQL 8.0 is InnoDB**, and the `FEDERATED` engine is disabled by default in 8.0 (it needs to be installed and enabled manually). The table below compares the characteristics of common storage engines:

| **Feature/Parameter**     | **InnoDB**                    | **MyISAM**                     | **MEMORY**                    | **CSV**                        | **ARCHIVE**                   | **FEDERATED**                  |
|---------------------------|-------------------------------|--------------------------------|--------------------------------|--------------------------------|--------------------------------|--------------------------------|
| **Transaction support**   | Supported (ACID)              | Not supported                  | Not supported                  | Not supported                  | Not supported                  | Not supported                  |
| **Row-level locking**     | Supported                     | Not supported                  | Not supported                  | Not supported                  | Supported (on INSERT)          | Not supported                  |
| **Table-level locking**   | Supported (but row-level locks are used primarily) | Supported | Supported | Supported | Not supported | Not supported |
| **Foreign key support**   | Supported                     | Not supported                  | Not supported                  | Not supported                  | Not supported                  | Not supported                  |
| **Full-text index**       | Supported                     | Supported                      | Not supported                  | Not supported                  | Not supported                  | Not supported                  |
| **Spatial index**         | Supported                     | Supported                      | Not supported                  | Not supported                  | Not supported                  | Not supported                  |
| **Compression**           | Supported (table and index compression) | Supported (table only) | Not supported | Not supported | Supported (data compression) | Not supported |
| **Crash recovery**        | Supported                     | Not supported                  | Not supported                  | Not supported                  | Not supported                  | Not supported                  |
| **Data storage format**   | Data and indexes are stored together in a tablespace file (such as a per-table `.ibd`) | Data stored in `.MYD` files, indexes stored in `.MYI` files | Stored in memory | Stored as CSV format | Stored as compressed format | Data stored on a remote MySQL server |
| **Applicable scenarios**  | High-concurrency transactional processing, data integrity requirements | Read-heavy/write-light applications, full-text search | Temporary data, cache | Data import/export, data exchange with other systems | Log recording, historical data archiving | Cross-instance data access |

## Detailed explanation

- **InnoDB**:
  - **Transaction support**: Provides full transaction support, ensuring atomicity, consistency, isolation and durability of operations.
  - **Row-level locking**: Supports row-level locks, reducing lock contention and improving concurrency performance; also provides table-level locking mechanisms such as intention locks to coordinate with row-level locks.
  - **Foreign key support**: Supports foreign key constraints, guaranteeing data integrity.
  - **Full-text index**: Supported (InnoDB has supported FULLTEXT indexes since MySQL 5.6).
  - **Spatial index**: Supported (InnoDB has supported SPATIAL indexes since MySQL 5.7).
  - **Compression**: Supports compression of tables and indexes, saving storage space.
  - **Crash recovery**: Provides crash recovery, ensuring data durability.

- **MyISAM**:
  - **Transaction support**: Does not support transaction processing.
  - **Row-level locking**: Not supported; only table-level locks can be used.
  - **Foreign key support**: Not supported.
  - **Full-text index**: Supports full-text indexes, suitable for applications requiring full-text search.
  - **Spatial index**: Supported; it is the first storage engine in MySQL to support spatial indexes.
  - **Compression**: Supports table compression only, not index compression.
  - **Crash recovery**: Does not support crash recovery (the `myisamchk` tool can be used for repair).

- **MEMORY**:
  - **Transaction support**: Does not support transaction processing.
  - **Row-level locking**: Not supported; only table-level locks can be used.
  - **Foreign key support**: Not supported.
  - **Full-text index**: Not supported.
  - **Spatial index**: Not supported.
  - **Compression**: Not supported.
  - **Crash recovery**: Data is lost after the server restarts, suitable for temporary data and cache.

- **CSV**:
  - **Transaction support**: Does not support transaction processing.
  - **Row-level locking**: Not supported; only table-level locks can be used.
  - **Foreign key support**: Not supported.
  - **Full-text index**: Not supported.
  - **Spatial index**: Not supported.
  - **Compression**: Not supported.
  - **Crash recovery**: Data is stored as CSV format files, suitable for data import/export and data exchange with other systems.

- **ARCHIVE**:
  - **Transaction support**: Does not support transaction processing.
  - **Row-level locking**: Supported; the ARCHIVE engine uses row-level locks on INSERT.
  - **Foreign key support**: Not supported.
  - **Full-text index**: Not supported.
  - **Spatial index**: Not supported.
  - **Compression**: Supports data compression, reducing the use of storage space.
  - **Crash recovery**: Does not support crash recovery.

- **FEDERATED**:
  - **Transaction support**: Does not support transaction processing.
  - **Row-level locking**: Not supported; only table-level locks can be used.
  - **Foreign key support**: Not supported.
  - **Full-text index**: Not supported.
  - **Spatial index**: Not supported.
  - **Compression**: Not supported.
  - **Crash recovery**: Does not support crash recovery.

## Summary

- In MySQL 8.0, **InnoDB is the default storage engine**, and the vast majority of OLTP scenarios should prefer it: full transactional support (ACID), row-level locking with MVCC, crash recovery, foreign keys, full-text indexes and spatial indexes are all available.
- **MyISAM** is suitable for read-heavy/write-light, non-transactional scenarios; **MEMORY** is suitable for temporary tables and cache-like data (lost on restart); **CSV** is convenient for data exchange with other systems; **ARCHIVE** is suitable for logging and historical data archiving (supports only INSERT and SELECT, not UPDATE/DELETE); **FEDERATED** is used to access remote tables across instances and is disabled by default in 8.0.
- When choosing a storage engine, weigh transaction requirements, concurrency patterns, data lifecycle and operations cost comprehensively; unless there is a clear reason, it is generally not advisable to deviate from the default InnoDB.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · MyISAM](https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
- [knowledge](/knowledge.md)
