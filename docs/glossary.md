# Glossary

English terms for MySQL's core vocabulary, with one-line definitions, authoritative sources and related pages.

**Maintenance rule**: every new entry must cite a clickable authoritative source. If there is none, write "no authoritative source found (to be verified)" — never invent a link from memory.

## Basic Concepts

### Database
A repository that stores, organises and manages data in a structured form. A single MySQL instance can hold multiple databases.
**Source**: [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
**Related pages**: [What is MySQL](/basics/what-is-mysql), [Introduction](/basics/introduction)

### Table
The two-dimensional organisation of data in a relational database, made up of rows and columns, and the basic unit of data storage in MySQL.
**Source**: [MySQL 8.0 Reference Manual · CREATE TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
**Related pages**: [Creating and Deleting Databases and Tables](/basics/creating-modifying-deleting-databases-tables), [Table Design](/database-design/table-design)

### Row
A single record in a table, holding the complete data for one instance of an entity.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Row Formats](https://dev.mysql.com/doc/refman/8.0/en/innodb-row-format.html)
**Related pages**: [Data Pages and Rows](/advanced-features-internals/data-pages-rows), [Table Design](/database-design/table-design)

### Column
A field in a table that defines the name, type and constraints of the data.
**Source**: [MySQL 8.0 Reference Manual · Data Types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)
**Related pages**: [Column Design](/database-design/column-design), [Data Types](/basics/data-types)

### Schema
The structural definition of a database: the logical organisation of objects such as tables, columns, indexes and constraints.
**Source**: [INFORMATION_SCHEMA · SCHEMATA](https://dev.mysql.com/doc/refman/8.0/en/information-schema-schemata-table.html)
**Related pages**: [Database Schema](/database-design/database-schema), [Overview](/database-design/overview)

### SQL (Structured Query Language)
The standard language for managing and querying relational databases. MySQL supports most of the standard syntax.
**Source**: [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
**Related pages**: [SQL Basics](/basics/sql-basics), [What is MySQL](/basics/what-is-mysql)

### Relational Database
A database that organises data around the relational model (tables, rows, columns). MySQL is the representative example.
**Source**: [MySQL 8.0 Reference Manual · Introduction to MySQL](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
**Related pages**: [What is MySQL](/basics/what-is-mysql), [NoSQL, SQL, and MySQL](/basics/nosql-sql-mysql)

## Data Types

### Integer Types
TINYINT / SMALLINT / MEDIUMINT / INT / BIGINT — store whole numbers, with an optional UNSIGNED modifier that extends the positive range.
**Source**: [MySQL 8.0 Reference Manual · Integer Types](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)
**Related pages**: [Data Types](/basics/data-types), [Column Design](/database-design/column-design)

### String Types
The CHAR / VARCHAR / TEXT family — store character data. CHAR is fixed length, VARCHAR is variable length.
**Source**: [MySQL 8.0 Reference Manual · String Types](https://dev.mysql.com/doc/refman/8.0/en/char.html)
**Related pages**: [Data Types](/basics/data-types), [Column Design](/database-design/column-design)

### Binary String Types
The BINARY / VARBINARY / BLOB family — store binary data, with BLOB used for large objects.
**Source**: [MySQL 8.0 Reference Manual · BLOB](https://dev.mysql.com/doc/refman/8.0/en/blob.html)
**Related pages**: [Data Types](/basics/data-types), [Column Design](/database-design/column-design)

### Date and Time Types
DATE / TIME / DATETIME / TIMESTAMP / YEAR — store date and time values.
**Source**: [MySQL 8.0 Reference Manual · DATETIME](https://dev.mysql.com/doc/refman/8.0/en/datetime.html)
**Related pages**: [Data Types](/basics/data-types), [Date and Time Functions](/advanced-sql-data-processing/date-time-functions)

### JSON Type
The native JSON type introduced in MySQL 5.7.8+, with binary storage and JSON function support.
**Source**: [MySQL 8.0 Reference Manual · JSON](https://dev.mysql.com/doc/refman/8.0/en/json.html)
**Related pages**: [Data Types](/basics/data-types), [JSON Functions](/advanced-sql-data-processing/json-functions)

### ENUM and SET
ENUM is a single-choice string set, SET is a multi-choice string set; both are stored as integer indexes.
**Source**: [MySQL 8.0 Reference Manual · ENUM](https://dev.mysql.com/doc/refman/8.0/en/enum.html)
**Source**: [MySQL 8.0 Reference Manual · SET](https://dev.mysql.com/doc/refman/8.0/en/set.html)
**Related pages**: [Data Types](/basics/data-types), [Column Design](/database-design/column-design)

### Floating-Point Types
FLOAT / DOUBLE / DECIMAL — DECIMAL gives exact decimals and suits financial calculations.
**Source**: [MySQL 8.0 Reference Manual · Floating-Point Types](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html)
**Related pages**: [Data Types](/basics/data-types), [Column Design](/database-design/column-design)

## SQL Statements

### SELECT
The basic SQL statement for retrieving data from a database, supporting clauses such as WHERE, GROUP BY, ORDER BY and LIMIT.
**Source**: [MySQL 8.0 Reference Manual · SELECT](https://dev.mysql.com/doc/refman/8.0/en/select.html)
**Related pages**: [Basic SELECT Statements](/basics/basic-query-statements-select), [Advanced SQL Queries](/advanced-sql-data-processing/advanced-sql-queries)

### INSERT
The SQL statement for inserting new rows into a table.
**Source**: [MySQL 8.0 Reference Manual · INSERT](https://dev.mysql.com/doc/refman/8.0/en/insert.html)
**Related pages**: [Inserting Data (INSERT)](/basics/inserting-data), [SQL Basics](/basics/sql-basics)

### UPDATE
The SQL statement for modifying existing rows in a table.
**Source**: [MySQL 8.0 Reference Manual · UPDATE](https://dev.mysql.com/doc/refman/8.0/en/update.html)
**Related pages**: [Updating Data (UPDATE)](/basics/updating-data), [SQL Basics](/basics/sql-basics)

### DELETE
The SQL statement for deleting rows from a table.
**Source**: [MySQL 8.0 Reference Manual · DELETE](https://dev.mysql.com/doc/refman/8.0/en/delete.html)
**Related pages**: [Deleting Data (DELETE)](/basics/deleting-data), [SQL Basics](/basics/sql-basics)

### Subquery
A query nested inside another SQL statement, usable in WHERE, FROM and SELECT clauses.
**Source**: [MySQL 8.0 Reference Manual · Subqueries](https://dev.mysql.com/doc/refman/8.0/en/subqueries.html)
**Related pages**: [Complex Queries (JOINs and Subqueries)](/advanced-sql-data-processing/complex-queries), [EXISTS and NOT EXISTS](/advanced-sql-data-processing/exists-not-exists)

### UNION
A set operation that combines two or more SELECT result sets, removing duplicates automatically; UNION ALL keeps them.
**Source**: [MySQL 8.0 Reference Manual · UNION](https://dev.mysql.com/doc/refman/8.0/en/union.html)
**Related pages**: [Set Operations (UNION, INTERSECT, EXCEPT)](/advanced-sql-data-processing/set-operations), [Advanced SQL Queries](/advanced-sql-data-processing/advanced-sql-queries)

### View
A virtual table based on a SQL query. It stores no actual data and is used to simplify complex queries and control access.
**Source**: [MySQL 8.0 Reference Manual · Views](https://dev.mysql.com/doc/refman/8.0/en/views.html)
**Related pages**: [Views](/advanced-sql-data-processing/views), [Advanced SQL Queries](/advanced-sql-data-processing/advanced-sql-queries)

### Stored Procedure
A precompiled block of SQL code stored in the database, callable repeatedly, with parameter and control-flow support.
**Source**: [MySQL 8.0 Reference Manual · Stored Routines](https://dev.mysql.com/doc/refman/8.0/en/stored-routines.html)
**Related pages**: [Stored Procedures and Functions](/advanced-sql-data-processing/stored-procedures-functions), [SQL Functions](/advanced-sql-data-processing/sql-functions)

### Trigger
A special stored routine associated with a table that runs automatically before or after an INSERT / UPDATE / DELETE event.
**Source**: [MySQL 8.0 Reference Manual · Triggers](https://dev.mysql.com/doc/refman/8.0/en/triggers.html)
**Related pages**: [Triggers](/advanced-sql-data-processing/triggers), [Stored Procedures and Functions](/advanced-sql-data-processing/stored-procedures-functions)

### Cursor
A mechanism for walking a result set row by row inside a stored procedure, used to process query results one at a time.
**Source**: [MySQL 8.0 Reference Manual · Cursors](https://dev.mysql.com/doc/refman/8.0/en/cursors.html)
**Related pages**: [Cursors](/advanced-sql-data-processing/cursors), [Stored Procedures and Functions](/advanced-sql-data-processing/stored-procedures-functions)

### Window Function
A function that performs aggregation or ranking over a "window" of the result set, such as ROW_NUMBER, RANK and SUM OVER.
**Source**: [MySQL 8.0 Reference Manual · Window Functions](https://dev.mysql.com/doc/refman/8.0/en/window-functions.html)
**Related pages**: [Window Functions](/advanced-sql-data-processing/window-functions), [Aggregation and Analysis](/advanced-sql-data-processing/data-summarization-analysis)

### Aggregate Function
A function that computes and returns a single value from a set of values, such as COUNT, SUM, AVG, MIN and MAX.
**Source**: [MySQL 8.0 Reference Manual · Aggregate Functions](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html)
**Related pages**: [Aggregate Functions (SUM, AVG, COUNT, MIN, MAX)](/advanced-sql-data-processing/aggregate-functions), [GROUP BY and HAVING](/advanced-sql-data-processing/group-by-having)

## Transactions and Concurrency

### Transaction
A sequence of SQL operations that cannot be split, satisfying ACID and controlled by BEGIN / COMMIT / ROLLBACK.
**Source**: [MySQL 8.0 Reference Manual · The InnoDB Transaction Model](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-model.html)
**Related pages**: [Transactions](/advanced-features-internals/transactions), [Transaction Concepts](/advanced-features-internals/transaction-concepts)

### ACID
The four properties of transactions: Atomicity, Consistency, Isolation and Durability.
**Source**: [MySQL 8.0 Reference Manual · The InnoDB Transaction Model](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-model.html)
**Related pages**: [ACID Properties](/advanced-features-internals/acid-properties), [Transactions](/advanced-features-internals/transactions)

### Isolation Level
The four standard levels defining visibility between transactions: READ UNCOMMITTED / READ COMMITTED / REPEATABLE READ / SERIALIZABLE.
**Source**: [MySQL 8.0 Reference Manual · SET TRANSACTION](https://dev.mysql.com/doc/refman/8.0/en/set-transaction.html)
**Related pages**: [Isolation Levels and Locks](/advanced-features-internals/isolation-levels-locks), [Transactions](/advanced-features-internals/transactions)

### MVCC (Multi-Version Concurrency Control)
Multi-version concurrency control: keeping multiple versions of data rows so that reads do not block writes and writes do not block reads.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html)
**Related pages**: [MVCC](/advanced-features-internals/Multi-Version-Concurrency-Control), [Isolation Levels and Locks](/advanced-features-internals/isolation-levels-locks)

### Lock
A concurrency control mechanism that prevents multiple transactions from modifying the same data at the same time, split into table locks and row locks.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)
**Related pages**: [Locking Mechanisms](/advanced-features-internals/locking-mechanisms), [Lock Types](/advanced-features-internals/lock-types)

### Deadlock
A state where two or more transactions each wait for the other to release a lock, so none of them can proceed.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Deadlocks](https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html)
**Related pages**: [Deadlocks and Detection](/advanced-features-internals/deadlock-detection), [Lock Optimization](/advanced-features-internals/lock-optimization)

### Redo Log
InnoDB's physical log. It records physical changes to data pages and is used to replay committed transactions after a crash.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Redo Log](https://dev.mysql.com/doc/refman/8.0/en/innodb-redo-log.html)
**Related pages**: [Logs (Redo Log, Undo Log, Binary Log)](/advanced-features-internals/logs), [Transactions](/advanced-features-internals/transactions)

### Undo Log
InnoDB's logical log. It records the old values before a data change and is used for rollbacks and for MVCC consistent reads.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Undo Logs](https://dev.mysql.com/doc/refman/8.0/en/innodb-undo-logs.html)
**Related pages**: [Logs (Redo Log, Undo Log, Binary Log)](/advanced-features-internals/logs), [MVCC](/advanced-features-internals/Multi-Version-Concurrency-Control)

### Binary Log (binlog)
A logical log at the server layer that records all data-modifying SQL statements, used for replication and PITR recovery.
**Source**: [MySQL 8.0 Reference Manual · Binary Logging](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html)
**Related pages**: [Logs (Redo Log, Undo Log, Binary Log)](/advanced-features-internals/logs), [Master-Slave Replication](/architecture-deployment/master-slave-replication)

## Indexes and Optimization

### B+ Tree
The underlying data structure of InnoDB indexes: a multi-way balanced search tree with all data in the leaf nodes, which supports range queries.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Indexes](https://dev.mysql.com/doc/refman/8.0/en/innodb-indexes.html)
**Related pages**: [Index Data Structures](/advanced-features-internals/index-why), [Index Types](/advanced-features-internals/index-types)

### Clustered Index
In an InnoDB table the rows themselves are stored in primary key order, so the primary key index is the clustered index — one per table.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Indexes](https://dev.mysql.com/doc/refman/8.0/en/innodb-indexes.html)
**Related pages**: [Index Types](/advanced-features-internals/index-types), [Indexes](/advanced-features-internals/indexes)

### Secondary Index
A non-clustered index whose leaf nodes hold the indexed column value and the primary key value; a query may need to look the row back up in the clustered index.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Indexes](https://dev.mysql.com/doc/refman/8.0/en/innodb-indexes.html)
**Related pages**: [Index Types](/advanced-features-internals/index-types), [Indexes](/advanced-features-internals/indexes)

### Covering Index
An index that already contains every column the query needs, so the result can be returned without a lookup back into the table.
**Source**: [MySQL 8.0 Reference Manual · Optimizing Indexes](https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html)
**Related pages**: [Index Optimization](/advanced-features-internals/index-optimization), [Indexes](/advanced-features-internals/indexes)

### Execution Plan
The execution plan the optimizer generates for a SQL statement, viewable with EXPLAIN and used to analyse query performance.
**Source**: [MySQL 8.0 Reference Manual · EXPLAIN](https://dev.mysql.com/doc/refman/8.0/en/explain.html)
**Related pages**: [Execution Plans (EXPLAIN)](/performance-tuning/explain), [Query Optimization](/performance-tuning/query-optimization)

### Slow Query Log
A log of SQL statements whose execution time exceeds a threshold — a key data source for performance tuning.
**Source**: [MySQL 8.0 Reference Manual · Slow Query Log](https://dev.mysql.com/doc/refman/8.0/en/slow-query-log.html)
**Related pages**: [Slow Query Log](/performance-tuning/slow-query-log), [Performance Monitoring](/performance-tuning/performance-monitoring)

### Query Optimizer
An internal MySQL component that chooses the best execution plan for a SQL statement, including which indexes to use and the join order.
**Source**: [MySQL 8.0 Reference Manual · Optimizer Tracing](https://dev.mysql.com/doc/refman/8.0/en/optimizer-tracing.html)
**Related pages**: [Query Optimizer](/advanced-features-internals/query-optimizer), [Query Optimization](/performance-tuning/query-optimization)

## Storage Engines

### InnoDB
MySQL's default storage engine. It supports transactions, row-level locking, foreign keys and crash recovery, and suits OLTP workloads.
**Source**: [MySQL 8.0 Reference Manual · The InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
**Related pages**: [Storage Engines](/advanced-features-internals/storage-engines), [Internals](/advanced-features-internals/internals)

### MyISAM
MySQL's early default storage engine. It has no transactions or row-level locking and uses table locks, suiting read-heavy workloads.
**Source**: [MySQL 8.0 Reference Manual · The MyISAM Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html)
**Related pages**: [Storage Engines](/advanced-features-internals/storage-engines), [Internals](/advanced-features-internals/internals)

### Data Page
The basic unit of disk I/O in InnoDB, 16KB by default. Rows are stored in pages, and pages make up extents, segments and tablespaces.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Row Formats](https://dev.mysql.com/doc/refman/8.0/en/innodb-row-format.html)
**Related pages**: [Data Pages and Rows](/advanced-features-internals/data-pages-rows), [Internals](/advanced-features-internals/internals)

### Buffer Pool
InnoDB's in-memory cache for data pages and index pages. It reduces disk I/O and is a core performance tuning parameter.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Buffer Pool](https://dev.mysql.com/doc/refman/8.0/en/innodb-buffer-pool.html)
**Related pages**: [Internals](/advanced-features-internals/internals), [Parameter Optimization (my.cnf)](/performance-tuning/parameter-optimization)

### Adaptive Hash Index
A hash index InnoDB builds automatically on hot B+ tree index pages to speed up equality lookups, with no manual management needed.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Adaptive Hash](https://dev.mysql.com/doc/refman/8.0/en/innodb-adaptive-hash.html)
**Related pages**: [Index Optimization](/advanced-features-internals/index-optimization), [Indexes](/advanced-features-internals/indexes)

## Architecture and Deployment

### Master-Slave Replication
Synchronises data changes from a primary to one or more replicas via the binary log, enabling read-write splitting and failover.
**Source**: [MySQL 8.0 Reference Manual · Replication](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
**Related pages**: [Master-Slave Replication](/architecture-deployment/master-slave-replication), [Database Architecture](/architecture-deployment/database-architecture)

### Group Replication
A MySQL high-availability approach built on the Paxos protocol, providing multi-primary replication with automatic failure detection and membership management.
**Source**: [MySQL 8.0 Reference Manual · Group Replication](https://dev.mysql.com/doc/refman/8.0/en/group-replication.html)
**Related pages**: [High-Availability Architectures (MHA, Galera Cluster)](/architecture-deployment/high-availability-architecture), [MySQL Cluster](/architecture-deployment/mysql-cluster)

### InnoDB Cluster
MySQL's official high-availability solution, combining Group Replication, MySQL Router and MySQL Shell to provide automatic failover.
**Source**: [MySQL 8.0 Reference Manual · InnoDB Cluster](https://dev.mysql.com/doc/refman/8.0/en/mysql-innodb-cluster-introduction.html)
**Related pages**: [High-Availability Architectures (MHA, Galera Cluster)](/architecture-deployment/high-availability-architecture), [MySQL Cluster](/architecture-deployment/mysql-cluster)

### Logical Backup
A backup that exports SQL statements or text format, such as mysqldump. It is portable across versions but restores more slowly.
**Source**: [MySQL 8.0 Reference Manual · mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
**Related pages**: [Logical Backup (mysqldump, MySQL Workbench)](/architecture-deployment/logical-backup), [Backup and Recovery](/architecture-deployment/backup-recovery)

### Physical Backup
A backup that copies the data files directly. It is fast but depends on the storage engine and version — for example XtraBackup.
**Source**: [MySQL 8.0 Reference Manual · Backup Methods](https://dev.mysql.com/doc/refman/8.0/en/backup-methods.html)
**Related pages**: [Physical Backup (Cold and Hot)](/architecture-deployment/physical-backup), [Backup and Recovery](/architecture-deployment/backup-recovery)

### Partitioning
Splits a large table's data into multiple physical partitions by rule, improving query performance and manageability.
**Source**: [MySQL 8.0 Reference Manual · Partitioning](https://dev.mysql.com/doc/refman/8.0/en/partitioning.html)
**Related pages**: [Partitioning and Sharding](/database-design/partitioning-sharding), [Performance and Scaling](/database-design/performance-scaling)

### Sharding
Distributes data across multiple database instances by rule, breaking through the storage and performance limits of a single instance.
**Source**: [MySQL 8.0 Reference Manual · Partitioning](https://dev.mysql.com/doc/refman/8.0/en/partitioning.html)
**Related pages**: [Partitioning and Sharding](/database-design/partitioning-sharding), [Vertical and Horizontal Splitting](/database-design/vertical-horizontal-splitting)

## Tools

### mysqldump
MySQL's official logical backup tool. It exports SQL statements and supports single-database, full-instance and selective backups.
**Source**: [MySQL 8.0 Reference Manual · mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
**Related pages**: [Logical Backup (mysqldump, MySQL Workbench)](/architecture-deployment/logical-backup), [MySQL Tools](/tools-practice/mysql-tools)

### mysqladmin
A MySQL server administration tool used for creating and deleting databases, checking status, shutting down the server and other administrative tasks.
**Source**: [MySQL 8.0 Reference Manual · mysqladmin](https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html)
**Related pages**: [MySQL Tools](/tools-practice/mysql-tools), [Common Commands](/appendix/common-commands)

### mysqlcheck
A MySQL table maintenance tool used to check, repair, analyse and optimise MyISAM and InnoDB tables.
**Source**: [MySQL 8.0 Reference Manual · mysqlcheck](https://dev.mysql.com/doc/refman/8.0/en/mysqlcheck.html)
**Related pages**: [MySQL Tools](/tools-practice/mysql-tools), [Common Commands](/appendix/common-commands)

### MySQL Shell
MySQL's official command-line client, with JavaScript / Python / SQL modes, used for administration and development.
**Source**: [MySQL 8.0 Reference Manual · MySQL Shell](https://dev.mysql.com/doc/refman/8.0/en/mysql-shell-tutorial-python.html)
**Related pages**: [MySQL Shell](/tools-practice/mysql-shell), [MySQL Tools](/tools-practice/mysql-tools)

### MySQL Workbench
MySQL's official graphical administration tool, supporting modelling, development, administration and database design.
**Source**: [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
**Related pages**: [MySQL Workbench](/tools-practice/mysql-workbench), [MySQL Tools](/tools-practice/mysql-tools)

### phpMyAdmin
A web-based MySQL administration tool for running SQL and managing databases from a browser.
**Source**: [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
**Related pages**: [phpMyAdmin](/tools-practice/phpmyadmin), [MySQL Tools](/tools-practice/mysql-tools)

### Percona Toolkit
A set of advanced MySQL command-line tools maintained by Percona, including pt-query-digest and pt-online-schema-change.
**Source**: [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
**Related pages**: [Percona Toolkit](/tools-practice/percona-toolkit), [Real-World Cases](/tools-practice/real-world-cases)

<!-- BACKLINKS-AUTO -->
## Related pages

- [knowledge](knowledge.md)
