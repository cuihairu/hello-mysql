# Percona Toolkit

Percona Toolkit is a set of open source tools, designed specifically for MySQL database management and optimisation. It provides a broad range of features for monitoring, analysing, maintaining and optimising MySQL databases. Percona Toolkit is developed by Percona, and is intended to help database administrators solve common database management and performance problems.

## Main tools and features

1. **pt-archiver**
   - **Features**: used to archive and delete outdated records, avoiding the impact of large-table bloat on database performance.
   - **Usage**: archive old data into another table or database, or delete it from the original table.

2. **pt-online-schema-change**
   - **Features**: change table structure online without locking the table, thereby avoiding impact on the production environment.
   - **Usage**: modify table structure, such as adding or deleting columns, without interrupting database service.

3. **pt-table-checksum**
   - **Features**: check data consistency between primary and replica databases in a replication environment.
   - **Usage**: compute table checksums to ensure data consistency between the primary and the replica.

4. **pt-table-sync**
   - **Features**: synchronise data differences between primary and replica databases, resolving data inconsistency.
   - **Usage**: synchronise the data of the primary and the replica to ensure their data is consistent.

5. **pt-query-digest**
   - **Features**: analyse and optimise slow query logs, identifying performance bottlenecks.
   - **Usage**: analyse slow query logs and generate query reports, helping to identify and optimise slow queries.

6. **pt-stalk**
   - **Features**: collect diagnostic information when a performance problem occurs, helping to analyse and solve it.
   - **Usage**: automatically collect system and database status information, for subsequent fault investigation.

7. **pt-sift**
   - **Features**: filter out important information from large volumes of logs, simplifying the log analysis process.
   - **Usage**: filter and extract key information from logs, helping to locate problems quickly.

8. **pt-kill**
   - **Features**: automatically terminate long-running queries, avoiding impact on system performance.
   - **Usage**: automatically terminate queries that have been running too long, according to configured rules.

9. **pt-config-diff**
   - **Features**: compare the configuration files of two MySQL instances and find configuration differences.
   - **Usage**: check and compare the configuration of two MySQL instances to ensure consistency.

10. **pt-diskstats**
    - **Features**: monitor disk I/O performance and identify potential performance bottlenecks.
    - **Usage**: collect disk I/O performance data and analyse disk usage.

## Advantages

- **Open source and free**: Percona Toolkit is open source software, and can be used and modified freely.
- **Rich in features**: provides a series of powerful tools covering database management, optimisation, monitoring and more.
- **Community support**: has active community support and a wide user base, so you can get rich usage experience and solutions.
- **Strong expertise**: developed by Percona and focused on MySQL database performance optimisation and management, with a high degree of specialisation.

## Use cases

- **Performance optimisation**: use the tools to analyse and optimise slow queries, and resolve performance bottlenecks.
- **Data consistency**: check and synchronise data consistency between primary and replica databases.
- **Table structure management**: modify table structure online, reducing impact on the production environment.
- **Troubleshooting**: collect system and database diagnostic information, helping to analyse and solve problems.
- **Log analysis**: filter and analyse logs, locating and solving problems quickly.

## Installation and usage

1. **Install Percona Toolkit**:
   - Percona Toolkit can be installed from Percona's official repository or with package management tools.
   - On Debian/Ubuntu systems, you can install it with the `apt-get` command:
     ```bash
     sudo apt-get install percona-toolkit
     ```
   - On CentOS/RHEL systems, you can install it with the `yum` command:
     ```bash
     sudo yum install percona-toolkit
     ```

2. **Use Percona Toolkit**:
   - **Run tools**: run tools in Percona Toolkit from the command line, for example (migrate data from a year ago into an archive table and delete it from the source table):
     ```bash
     pt-archiver --source h=localhost,D=mydb,t=mytable \
       --dest h=localhost,D=mydb_archive,t=mytable \
       --where 'created_at < NOW() - INTERVAL 1 YEAR' \
       --limit 1000 --commit-each --statistics
     ```
     `pt-archiver` has no `--archive` option; archiving behaviour is determined by choosing one (or a combination) of `--dest` (write to a target table), `--file` (write to a file) or `--purge` (delete only). It is recommended to check the statements that will be executed first with `--dry-run`.
   - **View help**: use the `--help` parameter to see a tool's usage instructions, for example:
     ```bash
     pt-archiver --help
     ```

Percona Toolkit is a powerful and flexible set of tools, and provides important support for MySQL database performance optimisation, management and troubleshooting. By using these tools properly, you can improve the performance and stability of your database.

## References

- [MySQL 8.0 Reference Manual · Programs](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
- [MySQL 8.0 Reference Manual · Optimisation](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [glossary](/glossary.md)
- [README](README.md)
