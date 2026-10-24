# References and Resources

The material I look up most often when learning and troubleshooting. The official documentation is the primary source; community resources are the supplement.

## 1. Official documentation (primary sources)

- MySQL 8.0 Reference Manual: <https://dev.mysql.com/doc/refman/8.0/en/>
- MySQL 8.4 / 9.x Reference Manual: <https://dev.mysql.com/doc/>
- MySQL Shell documentation: <https://dev.mysql.com/doc/mysql-shell/8.4/en/>
- X DevAPI User Guide: <https://dev.mysql.com/doc/x-devapi-userguide/en/>
- Connector documentation (per-language drivers): <https://dev.mysql.com/doc/connector-odbc/en/> and the corresponding volumes for each language
- Error codes and messages: <https://dev.mysql.com/doc/mysql-errors/8.0/en/>
- Release notes (changes and removals per version): <https://dev.mysql.com/doc/relnotes/mysql/8.0/en/>
- Percona XtraBackup documentation: <https://docs.percona.com/percona-xtrabackup/8.0/>
- Percona Toolkit documentation: <https://docs.percona.com/percona-toolkit/>
- MySQL Workbench documentation: <https://dev.mysql.com/doc/workbench/en/>
- phpMyAdmin documentation: <https://docs.phpmyadmin.net/>

Reading tip: when a question is "in which version was this parameter/syntax introduced, and is it deprecated", go straight to the system variable tables in the Reference Manual and the release notes — more reliable than digging through secondary material.

## 2. Recommended books

- *High Performance MySQL* (4th edition): the classic reference on architecture, indexing, replication and tuning;
- *MySQL Technology Insight: InnoDB Storage Engine* (Jiang Chengyao): a deep dive into the implementation details of InnoDB;
- *MySQL Crash Course* (Ben Forta): a quick reference for getting into SQL syntax;
- *Designing Data-Intensive Applications*: storage, replication and consistency from a systems perspective;
- O'Reilly *Learning SQL*: SQL fundamentals and the basics of the standard syntax.

## 3. Tools and practical resources

| Category | Tool/resource | Use case |
| ---- | --------- | ---- |
| Backup | Percona XtraBackup, MySQL Enterprise Backup, MySQL Shell `util.dumpInstance` | Physical/logical backup |
| Online schema change | pt-online-schema-change, gh-ost | Online DDL on large tables |
| Slow query analysis | pt-query-digest, mysqldumpslow, MySQL Workbench Performance Reports | Locate slow SQL |
| Monitoring | Percona Monitoring and Management (PMM), Prometheus + Grafana (mysqld_exporter), MySQL Enterprise Monitor | Metric collection and alerting |
| High availability | InnoDB Cluster (Group Replication + MySQL Router + Shell), Orchestrator, MHA | Automatic failover |
| Proxy/sharding | ProxySQL, Vitess, MySQL Router | Read/write splitting, sharding |
| Load testing | sysbench, mysqlslap, TPC-C style benchmarks | Capacity assessment and performance validation |
| Data verification | pt-table-checksum, pt-table-sync | Master/replica consistency |
| Upgrade check | MySQL Shell `util.checkForServerUpgrade()` | Compatibility check before a version upgrade |

## 4. Community and learning channels

- MySQL official blog: <https://blogs.oracle.com/mysql/>
- Percona blog and webinars: <https://www.percona.com/blog/>
- Chinese MySQL community: technical media and communities such as ZhiShuTang, DBAplus (DBAplus community) and the InfoQ database channel;
- The `mysql` and `mysql-8.0` tags on Stack Overflow, plus Database Administrators (DBA Stack Exchange);
- Sample repositories and tool repos on GitHub (gh-ost, my2.sql, mysql-sys, and others).

## 5. My order of reference

1. **Basics**: SQL syntax, data types, table design normal forms (parts 1-2 of this book);
2. **Advanced**: how indexes work (B+Tree), transactions and isolation levels, locks and MVCC (part 4);
3. **Operations**: backup and recovery, replication and high availability (part 5), monitoring and tuning (part 6);
4. **Tools**: MySQL Shell, EXPLAIN ANALYZE, performance_schema, Percona Toolkit (parts 6-7);
5. **Extensions**: sharding, NewSQL, cloud native and HTAP (part 7).

I usually spin up a local experiment environment (Docker can pull up MySQL 8.0), then use `EXPLAIN ANALYZE`, `SHOW ENGINE INNODB STATUS` and `performance_schema` to verify what the book says, and write up my own notes.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [knowledge](/knowledge.md)
