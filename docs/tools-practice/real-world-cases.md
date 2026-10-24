# Percona Toolkit real-world cases

Below are a few real cases showing how Percona Toolkit tools solve real problems and optimise MySQL databases.

## 1. Case 1: Changing table structure online

**Scenario**: a large production database needs a table structure change (for example adding a new column). Changing the table structure directly may cause a long lock, which would affect the performance of the production system.

**Solution**:
use the `pt-online-schema-change` tool to change the table structure online without affecting normal database operation.

**Steps**:
1. **Install Percona Toolkit** (if not already installed):
   ```bash
   sudo apt-get install percona-toolkit
   ```
   
2. **Perform the table structure change**:
   Suppose we want to add a new column called `department_id` to the `employees` table:
   ```bash
   pt-online-schema-change --alter "ADD COLUMN department_id INT" D=mydb,t=employees --execute
   ```
   This command creates a new table in the background, migrates the data from the original table into the new table, and then replaces the original table without locking the database.

**Effect**: the table structure was changed online successfully, the production system stayed available, and the impact on users was minimised.

## 2. Case 2: Checking data consistency between primary and replica

**Scenario**: in a primary-replica environment, it is found that the primary and replica data may be inconsistent, and the data differences need to be checked and fixed.

**Solution**:
use the `pt-table-checksum` and `pt-table-sync` tools to check and fix data consistency.

**Steps**:
1. **Check data consistency with `pt-table-checksum`**:
   ```bash
   pt-table-checksum --user=root --password=yourpassword \
     --host=master-host --databases mydb
   ```
   This command computes the checksum of each table on the primary in blocks, writes the results into the `percona.checksums` table on the source (the default database name is `percona` and the table name is `checksums`, created automatically if it does not exist), and then transmits the checksum statements to the replica through replication to be replayed, thereby comparing out the primary-replica differences. Note: this tool depends on statement-based replication, and automatically switches `binlog_format` to `STATEMENT` at session level (which requires the `SUPER` or `SESSION_VARIABLES_ADMIN` privilege, and managed cloud instances are often restricted). Afterwards you can use `pt-table-sync --replicate=percona.checksums ...` to fix the differing blocks precisely.

2. **Fix data consistency with `pt-table-sync`**:
   ```bash
   pt-table-sync --user=root --password=yourpassword \
     --execute h=master-host,D=mydb h=slave-host,D=mydb
   ```
   `pt-table-sync` needs at least two DSNs, source and target (or use `--replicate` to reuse the results of `pt-table-checksum`, `--sync-to-source` to use the replica as the entry point); writing only `--execute D=mydb` is incomplete. Adding `--execute` is what actually runs the repair statements; by default it only prints the SQL, so it is recommended to drop `--execute` first and preview with `--print`.

**Effect**: the data of the primary and replica is ensured to be consistent, and the data synchronisation problem is resolved.

## 3. Case 3: Analysing and optimising slow queries

**Scenario**: the database has multiple slow queries, causing system performance to drop. The slow queries need to be analysed and optimised.

**Solution**:
use the `pt-query-digest` tool to analyse slow query logs.

**Steps**:
1. **Analyse the slow query log**:
   ```bash
   pt-query-digest /path/to/slowquery.log
   ```
   This command generates a slow query report, helping to identify the slowest queries and their execution plans.

2. **Optimise queries**:
   According to the suggestions in the report, optimise the slow queries, for example by adding indexes, rewriting queries, or adjusting the database configuration to improve query performance.

**Effect**: slow queries were identified and optimised successfully, and database performance improved.

## 4. Case 4: Automatically terminating long-running queries

**Scenario**: in a heavily loaded production environment, some long-running queries are affecting system performance. These queries need to be terminated automatically.

**Solution**:
use the `pt-kill` tool to automatically terminate long-running queries.

**Steps**:
1. **Terminate long-running queries**:
   ```bash
   pt-kill --user=root --password=yourpassword --host=localhost \
     --interval=5 --busy-time=60 --kill
   ```
   `pt-kill` uses `--busy-time` (judged by the Time value from `SHOW PROCESSLIST`) rather than `--long-query-time` (which is the server variable for the MySQL slow query log), and the action must be given explicitly: `--kill` actually terminates the connection, while `--print` only prints the `KILL` statements that would be executed. This command checks every 5 seconds, and any query running longer than 60 seconds is terminated.

**Effect**: long-running queries were terminated automatically and normal system performance was restored.

## 5. Case 5: Collecting system diagnostic information

**Scenario**: the system has a performance problem, and diagnostic information needs to be collected for analysis.

**Solution**:
use the `pt-stalk` tool to automatically collect system and database status information.

**Steps**:
1. **Configure and run `pt-stalk`**:
   ```bash
   pt-stalk --user=root --password=yourpassword --host=localhost \
     --variable Threads_running --threshold 25 --cycles 5 \
     --iterations 2 --dest /var/lib/pt-stalk
   ```
   `pt-stalk`'s `--collect` is a switch option (enabled by default and taking no value), so it must not be written as `--collect "processlist,innodb_status"`. By default it uses `Threads_running` from `SHOW GLOBAL STATUS` as the trigger condition: if it exceeds `--threshold` (default 25) for `--cycles` consecutive times, collection is triggered, and snapshots of `SHOW FULL PROCESSLIST`, `SHOW ENGINE INNODB STATUS`, lock waits, transaction information and system-level state (`vmstat`, `iostat` and so on) are saved to the `--dest` directory. `--iterations` limits the number of collections, avoiding repeated triggering.

2. **Analyse the diagnostic information**:
   The collected information can be used to analyse the root cause of the performance problem, and to take corresponding optimisation measures.

**Effect**: system and database status information was collected successfully, helping to diagnose and solve the performance problem.

## Summary

Percona Toolkit provides a powerful set of tools that help database administrators solve all kinds of real problems, including online table structure changes, data consistency checking and repair, slow query optimisation, automatic termination of long-running queries, and collection of system diagnostic information. With these tools, the performance, stability and maintainability of MySQL databases can be effectively improved.

## References

- [MySQL 8.0 Reference Manual · Programs](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
- [MySQL 8.0 Reference Manual · Optimisation](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [glossary](/glossary.md)
- [README](README.md)
