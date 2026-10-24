# Third-Party Tools

Besides the tools that come with MySQL, many third-party tools can also help users monitor, manage and optimise a MySQL database. Below are two commonly used third-party tools:

## 1. Percona Toolkit

Percona Toolkit is an open-source database toolset that provides a series of practical tools for MySQL and MariaDB databases. It is mainly used for database maintenance, monitoring, performance optimisation and troubleshooting. Here are some commonly used Percona Toolkit tools:

### Commonly Used Tools

- **`pt-query-digest`**: analyses MySQL slow query logs, general query logs or connection logs and generates reports on query performance. This helps identify performance bottlenecks and optimise queries.
  
  ```bash
  pt-query-digest /path/to/slow.log
  ```

- **`pt-online-schema-change`**: safely modifies a table schema without locking the table. This is very useful for modifying table schemas in a production database online.
  
  ```bash
  pt-online-schema-change --alter "ADD COLUMN new_column INT" D=mydatabase,t=mytable --execute
  ```

- **`pt-table-checksum`**: used to compare table data between master and slave databases to verify master-slave data consistency. It has no `--execute` option (once the parameters are given it will execute; use `--explain` to only print the checksum statements that would run); by default results are written to the `percona.checksums` table on the source database.
  
  ```bash
  pt-table-checksum --databases mydatabase h=localhost,u=root,p=xxxx
  ```

- **`pt-table-sync`**: used to synchronise data between master and slave databases or between different databases, resolving data consistency problems.
  
  ```bash
  pt-table-sync --execute h=master_db,D=mydatabase,t=mytable h=slave_db,D=mydatabase,t=mytable
  ```

- **`pt-duplicate-key-checker`**: checks whether a table has duplicate indexes (redundant indexes), which helps identify and clean up useless duplicate indexes. This tool only outputs the check results and the recommended `DROP KEY` statements; it itself has no `--execute` option and will not modify table schemas directly.

  ```bash
  pt-duplicate-key-checker --databases mydatabase --tables mytable h=localhost,u=root,p=xxxx
  ```

### Installation

Percona Toolkit can be installed via a package manager (such as `apt`, `yum`) or downloaded from the [official Percona website](https://www.percona.com/downloads/percona-toolkit/).

```bash
sudo apt-get install percona-toolkit
```

```bash
sudo yum install percona-toolkit
```

## 2. MySQL Enterprise Monitor

MySQL Enterprise Monitor is a commercial tool provided by MySQL Inc. for monitoring and managing MySQL databases. It provides real-time monitoring, alerting, diagnostics and reporting functionality. Here are some key features of MySQL Enterprise Monitor:

### Key Features

- **Real-time monitoring**: provides real-time database performance data and system health monitoring, including query performance, server load, network activity and so on.
  
- **Automatic alerting**: automatically sends alert notifications to database administrators based on predefined thresholds and conditions. For example, alerts are triggered when server load is too high or query response time is too long.

- **Performance analysis**: generates detailed performance reports and historical trend analysis, helping identify performance bottlenecks and optimise the database.

- **Query analysis**: provides in-depth analysis of SQL queries, including query execution plans, slow query analysis and recommended optimisation solutions.

- **Visual dashboards**: displays database performance and health through visual dashboards, making monitoring and management more intuitive and convenient.

- **Backup and recovery**: integrates backup management functionality, providing backup status monitoring and recovery operation support.

### Installation and Usage

MySQL Enterprise Monitor is part of MySQL Enterprise Edition and requires a purchased licence. You can learn more and apply for a trial or purchase from the [official MySQL website](https://www.mysql.com/products/enterprise/).

```bash
# 安装 MySQL Enterprise Monitor 需要根据官方文档进行详细操作
```

## Summary

- **Percona Toolkit** provides a powerful set of open-source tools that help database administrators carry out performance optimisation, data consistency checks and online maintenance.
- **MySQL Enterprise Monitor** provides comprehensive monitoring and management functionality, suitable for commercial environments that need in-depth analysis and high availability.

Choose the appropriate tool based on your specific needs to help improve database performance and management efficiency.

## References

- [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
