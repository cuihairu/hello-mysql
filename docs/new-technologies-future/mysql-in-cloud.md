# MySQL in Cloud Environments

Most MySQL deployments today run in the cloud: either self-managed instances on cloud hosts, or a cloud vendor's managed database service (RDS-style). This chapter covers the typical forms of MySQL in the cloud, the core capabilities managed services provide, and the key points for migration and operations.

## 1. The forms of a cloud deployment

- **Self-managed**: install MySQL yourself on a cloud host (ECS, CVM, EC2 and so on), with full control over version and parameters, but you own backup, high availability and monitoring;
- **Managed database service**: a MySQL-compatible service from a cloud vendor, such as AWS RDS for MySQL, Azure Database for MySQL, Google Cloud SQL for MySQL, Alibaba Cloud RDS for MySQL and TencentDB for MySQL, which automate backup, patching, monitoring and failover;
- **Cloud-native enhanced**: a vendor's own build on top of MySQL, for example AWS Aurora (storage-compute separation, log-as-database), Alibaba Cloud PolarDB, Tencent TDSQL-C, and Oracle's MySQL HeatWave (adding columnar in-memory analytics and machine learning on top of MySQL);
- **Distributed/sharding middleware**: Vitess (commonly deployed on Kubernetes) and various sharding middleware, used to achieve horizontal scaling in the cloud.

## 2. Capabilities a managed service usually provides

Once you pick a managed service, the platform takes on most of the operational work:

- **Automatic backup and PITR (Point-in-Time Recovery)**: daily full backups plus binlog, recoverable to any point in time;
- **High availability and read replicas**: automatic failover for a primary-standby pair (usually based on semi-sync replication or Aurora-style shared storage), plus multiple read replicas to absorb read load;
- **Monitoring and alerting**: collection and alerting on CPU, memory, IOPS, connection count, slow queries, replication lag and more;
- **Parameter templates and security**: parameter groups (some parameters changeable online), whitelists/security groups, TLS in transit, encryption at rest (KMS), audit logs;
- **Elasticity and maintenance windows**: resize up or down, automatic storage expansion, automatic minor version upgrades (major versions usually require manual confirmation).

Limitations to be aware of:

- Usually **no SUPER privilege**, so some global parameters and features such as `LOAD DATA LOCAL INFILE`, UDFs and event scheduling are restricted;
- You cannot access the underlying filesystem directly, so **physical backups produced by XtraBackup generally cannot be restored directly to RDS** — migration into the cloud is mostly logical (mysqldump, MySQL Shell dump) or via a vendor's import tool;
- Some plugins are unavailable, and Group Replication / InnoDB Cluster are typically replaced by a vendor solution (such as RDS multi-AZ deployment).

## 3. Migration approaches

| Method | Applicable scenario | Notes |
| ---- | -------- | ---- |
| Logical backup import | Moderate data volume, tolerable downtime | `mysqldump` / `mysqlsh util.dumpInstance()` + `util.loadDump()`; watch out for character set and `sql_mode` |
| Physical backup | Self-managed to self-managed, homogeneous migration | XtraBackup full backup plus binlog incremental, fast, but generally cannot be restored directly to a managed service |
| Replication-based migration | Zero-downtime cutover | The source is the primary, the cloud instance is the replica; cut over writes once the lag is drained. GTID is recommended |
| Data sync service (Alibaba Cloud DTS, AWS DMS and others) | Heterogeneous or cross-cloud migration, continuous sync | Supports full plus incremental, with structure migration and bidirectional sync |
| Hybrid architecture | Phased move to the cloud | A read/write splitting transition: start with read replicas in the cloud, verify, then cut over writes |

Before migrating, check: character set (`utf8mb3` → `utf8mb4`), time zone, `sql_mode`, the default authentication plugin (`caching_sha2_password`), deprecated variables (such as `query_cache_size`, which in 8.0 causes a startup failure outright), and the application connection strings and connection pool configuration.

## 4. Performance and cost in the cloud

- **Instance size**: look at IOPS and network throughput first — MySQL's bottleneck is usually storage, not CPU; the difference between SSD/NVMe cloud disks and local disks shows up directly in how you set `innodb_io_capacity`;
- **Parameter tuning**: managed service defaults lean conservative, and `innodb_buffer_pool_size`, `max_connections`, `innodb_redo_log_capacity` and the slow query log threshold still need adjusting per workload (some parameters require a restart or a parameter group);
- **Read replicas and read/write splitting**: route reports and background queries to read replicas; use ProxySQL, RDS Proxy or an application-side read/write splitting middleware;
- **Serverless and pay-as-you-go**: some vendors offer a Serverless form (billed by ACU/CPU, auto-scaling), which suits workloads with large traffic swings; for sustained high load, an annual/monthly subscription is cheaper;
- **Backup and snapshot cost**: snapshots, binlog and cross-region replication all incur storage charges, so set retention policies.

## 5. High availability practices in the cloud

1. **Multi-AZ deployment**: primary and standby across AZs with automatic failover, the most basic HA guarantee;
2. **Read replicas for cross-region disaster recovery**: cross-region read replicas can be promoted to primary during a region-level failure (RPO is usually measured in minutes);
3. **Monitor replication lag**: watch both `Seconds_Behind_Source` from `SHOW REPLICA STATUS` and the replication lag metrics the platform provides;
4. **Regular drills**: backup restore drills and failover drills, to confirm RTO/RPO meet business requirements;
5. **Least privilege**: grant application accounts only the privileges they need, disable public access, and enable TLS and audit logs.

## Summary

The core change when using MySQL in the cloud is the "division of operational responsibility": a managed service hands backup, high availability and monitoring to the platform, while architecture design, parameter tuning, slow query governance, migration and cost control remain the user's responsibility. Understanding the limits of a managed service (no SUPER privilege, no direct restore of physical backups, restricted plugins) and working around them in the design phase is the key to running MySQL smoothly in the cloud.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [MySQL 8.0 Reference Manual · InnoDB Cluster](https://dev.mysql.com/doc/refman/8.0/en/mysql-innodb-cluster-introduction.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [knowledge](/knowledge.md)
- [README](README.md)
