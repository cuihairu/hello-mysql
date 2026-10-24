# Error Codes and Solutions

An error returned by MySQL consists of three parts: an error code (`errno`), a SQLSTATE and a description string. This section collects the most common codes, their typical causes and how to handle them. When troubleshooting, locate the problem by error code first, then read the error text and check the official description with the `perror` tool (`perror 1062`).

## 1. Connection and authentication

| Error code | Error message | Common causes and handling |
| ------ | -------- | -------------- |
| 1045 | `Access denied for user ...` | Wrong username/password, the source host is outside the allowed `'user'@'host'` range, or the password has expired. Use `SELECT user, host FROM mysql.user;` to check the account and host wildcards |
| 1040 | `Too many connections` | Exceeded `max_connections`. Check for connection leaks, raise the parameter, enable a connection pool; in an emergency use `KILL <id>` to free idle connections |
| 1044/1049 | `Unknown database` / access to the database denied | Database name typo or the account lacks privileges; check with `SHOW DATABASES` |
| 2002/2003 | `Can't connect to ... (111)` | Service not started, wrong port/socket, firewall or `bind-address` restriction, or the host was blacklisted after `max_connect_errors` reached its threshold (run `TRUNCATE TABLE performance_schema.host_cache;` first; the `FLUSH HOSTS` statement has been deprecated since 8.0.23, and `mysqladmin flush-hosts` still works) |
| 1820 | `You must reset your password ...` | Password has expired; run `ALTER USER USER() IDENTIFIED BY '新密码';` |
| 2059 | `Authentication plugin 'caching_sha2_password' cannot be loaded` | An older client does not support the 8.0 default authentication plugin; upgrade the driver, or explicitly set `IDENTIFIED WITH mysql_native_password BY '...'` for that account |

## 2. SQL and data

| Error code | Error message | Common causes and handling |
| ------ | -------- | -------------- |
| 1054 | `Unknown column 'x' in 'field list'` | Column name or table alias typo; note that reserved words need backticks |
| 1062 | `Duplicate entry 'x' for key 'PRIMARY'` | Violated a unique constraint. Check for duplicates before inserting, or use `INSERT ... ON DUPLICATE KEY UPDATE` or `INSERT IGNORE` (which skips duplicate rows) |
| 1064 | `You have an error in your SQL syntax` | SQL syntax error; 8.0 removed some syntax and functions, so scripts migrated from 5.7 need extra checking |
| 1114 | `The table 't' is full` | A MEMORY engine table hit the `max_heap_table_size` limit, or the disk/tablespace is out of space; check the free space on the partition behind `SELECT @@tmpdir` |
| 1146 | `Table 'db.t' doesn't exist` | Table name case sensitivity (`lower_case_table_names` is case-sensitive by default on Linux) or the table genuinely does not exist |
| 1193 | `Unknown system variable` | The config file or script references a variable that does not exist in the current version, for example using the removed `query_cache_size` in 8.0 |
| 1264/1265 | `Out of range value` / `Data truncated` | Data is outside the column range or was truncated; check `STRICT_TRANS_TABLES` in `sql_mode` |
| 1406 | `Data too long for column` | String longer than the column definition; note that under `utf8mb4` the `n` in `VARCHAR(n)` counts characters |
| 1071 | `Specified key was too long` | Index length exceeds the limit. With the InnoDB default row format a single-column index is at most 3072 bytes (`utf8mb4` uses 4 bytes per character); use a prefix index or shorten the column |
| 1118 | `Row size too large` | Row size exceeds the limit, usually too many large fields; consider splitting the table, switching to `TEXT`, or changing the row format |

## 3. Locks and concurrency

| Error code | Error message | Common causes and handling |
| ------ | -------- | -------------- |
| 1205 | `Lock wait timeout exceeded` | Timed out waiting on a row or table lock (`innodb_lock_wait_timeout`, default 50 seconds). Find the transaction holding the lock via `performance_schema.data_lock_waits` and `SHOW ENGINE INNODB STATUS`; check for long transactions and missing indexes that widen the lock range |
| 1213 | `Deadlock found when trying to get lock` | A deadlock occurred and InnoDB rolled back one of the transactions automatically. The application needs to catch this error and retry; analyze the lock ordering from `LATEST DETECTED DEADLOCK` in `SHOW ENGINE INNODB STATUS` or from `performance_schema.data_locks`, access resources in the same order, and index the condition columns to shrink the lock range |
| 3572 | `Statement aborted because lock(s) could not be acquired` | Used `NOWAIT` and the lock could not be acquired immediately; switch to a normal wait or `SKIP LOCKED` as needed |

## 4. Foreign keys and constraints

| Error code | Error message | Common causes and handling |
| ------ | -------- | -------------- |
| 1215 | `Cannot add foreign key constraint` | Column type, character set or collation mismatch between the two tables, or the referenced column is not a primary key or unique index. Look at `LATEST FOREIGN KEY ERROR` in `SHOW ENGINE INNODB STATUS` for details |
| 1216/1217 | `Cannot add or update a child row` | The referenced parent row does not exist; insert the parent row first or check the referenced value |
| 1451/1452 | `Cannot delete or update a parent row` / `a child row: a foreign key constraint fails` | The parent row is referenced by child rows. Use `ON DELETE CASCADE` as needed, delete the child rows first, or use a transaction to enforce ordering |
| 3819 | `Check constraint 'xx' is violated` | Violated a `CHECK` constraint (enforced for real since 8.0.16) |

## 5. Replication and master/replica

| Error code | Error message | Common causes and handling |
| ------ | -------- | -------------- |
| 1236 | `Could not find first log file name in binary log index file` | The primary's binlog was purged or the position is out of range; the replica needs to be rebuilt (or rebuilt with GTID using `SOURCE_AUTO_POSITION=1`) |
| 1062 (replication thread) | `Duplicate entry ... on ...` | The replica re-applied a transaction, common after re-initializing or skipping transactions; re-pull using GTID, and use `SET GLOBAL sql_replica_skip_counter` to skip transactions with care |
| 13117 | `Replica ... not configured` | Replication is not configured or not started; check `CHANGE REPLICATION SOURCE TO` and `START REPLICA` |

The standard steps for troubleshooting replication:

```sql
SHOW REPLICA STATUS\G
-- 关注 Replica_IO_Running / Replica_SQL_Running / Last_Errno / Last_Error
-- 以及 Seconds_Behind_Source（主从延迟）
```

## 6. General troubleshooting approach

1. **Read the error message before the error code**: the text usually carries the specific table name, index name and values;
2. **Use `perror` to get the official description**: `perror 1213` prints the official description for that code;
3. **Distinguish session from global**: many problems relate to session-level settings for `sql_mode`, character set and time zone; use `SHOW VARIABLES` to compare session and global values;
4. **Pin down the exact statement**: the slow query log, `performance_schema.events_statements_summary_by_digest` and `SHOW PROCESSLIST` together;
5. **Capture evidence before acting**: before changing configuration, skipping replication transactions or `KILL`-ing connections, save the output of `SHOW ENGINE INNODB STATUS`, the error log and `SHOW REPLICA STATUS`.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [knowledge](/knowledge.md)
