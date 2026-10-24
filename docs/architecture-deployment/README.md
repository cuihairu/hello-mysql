# Architecture and Deployment

My working notes on MySQL architecture, deployment, backup and recovery — including the trade-offs between options and the reliability questions that come with them.

## [Database Architecture](database-architecture.md)

Architecture design is critical to a database system's performance, reliability and scalability. This part covers the common architecture types and how to pick one to match your requirements.

- **[Single-Instance Architecture](single-instance-architecture.md)**  
  The basics of running a single instance: strengths and limits. This layout suits small to medium workloads.

- **[Master-Slave Replication](master-slave-replication.md)**  
  How master-slave replication works, how to configure it, and its role in load balancing and backups.

- **[Master-Master Replication](master-master-replication.md)**  
  Designing and running a master-master setup, plus the data sync and availability trade-offs between multiple primaries.

- **[MySQL Cluster](mysql-cluster.md)**  
  The MySQL Cluster architecture: design principles, advantages, and how to configure and operate a cluster for high availability and scalability.

- **[High-Availability Architectures (MHA, Galera Cluster)](high-availability-architecture.md)**  
  HA options such as MHA and Galera Cluster, and how they behave in failure scenarios.

## [Backup and Recovery](backup-recovery.md)

Backup and recovery are core parts of database administration. This part covers the backup methods and how to recover when data is lost or corrupted.

- **[Physical Backup (Cold and Hot)](physical-backup.md)**  
  What physical backup involves: the pros and cons of cold and hot backups and where each fits.

- **[Logical Backup (mysqldump, MySQL Workbench)](logical-backup.md)**  
  Logical backup tools and methods: mysqldump, MySQL Workbench, and points to watch for data integrity.

- **[Recovery Strategies](recovery-strategies.md)**  
  Different recovery strategies: building a recovery plan, testing the restore path, and handling the problems that come up along the way.

These notes cover MySQL architecture design along with backup and recovery, so I can look back on the choices made and the operational details.

---

- [Knowledge Notes](../knowledge.md) —— Core concepts, references, key points from the official docs, use cases and common pitfalls, all with in-site links.

## References

- [MySQL 8.0 Reference Manual · Replication](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [MySQL 8.0 Reference Manual · Backup and Recovery](https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html)

## Related pages

- [backup-recovery](backup-recovery.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [backup-recovery](backup-recovery.md)
