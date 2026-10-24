# Physical Backup (Cold Backup, Hot Backup)

A physical backup involves directly copying the database files, including data files, log files and configuration files, so they can be restored later. It is a way of backing up the complete state of a database, typically used to restore an exact copy of an entire database. Physical backups can be divided into cold backups and hot backups, as follows:

## 1. Cold Backup

A cold backup is performed while the database is shut down. The characteristic of this backup method is that the database is inactive during the backup, which ensures the consistency of the backed-up data.

- **Characteristics**:
  - **Consistency**: since the database is shut down when the backup is taken, the consistency of all data files at the same point in time is guaranteed.
  - **Simplicity**: the backup process is relatively simple and does not require handling transaction logs.
  - **Downtime**: requires downtime; the database cannot serve requests during the backup.

- **Steps**:
  1. **Stop the database service**: make sure the database service is fully stopped.
  2. **Copy the data files**: copy the data directory (the `.ibd` tablespace files under `datadir`, the `ibdata1` system tablespace, and the undo and redo log files) together with the configuration files to the backup location. Note: MySQL 8.0 removed the `.frm` table definition files; table structure is stored in the InnoDB data dictionary, so you must back up the complete data directory and cannot just copy the tablespace files.
  3. **Verify the backup**: check the integrity of the backup files to ensure the backup succeeded.

- **Use cases**:
  - Small databases where downtime is acceptable.
  - Environments that do not require frequent backups.

## 2. Hot Backup

A hot backup is performed while the database is running. This backup method allows the backup to be taken while the database operates normally, avoiding downtime.

- **Characteristics**:
  - **No downtime**: the database can still serve requests during the backup, suitable for environments that need high availability.
  - **Complexity**: the backup process may affect database performance, and transaction logs must be handled to ensure data consistency.
  - **Consistency handling**: the logical consistency of the backed-up data must be guaranteed, usually achieved by using the database's backup tools during the backup.

- **Steps**:
  1. **Prepare the backup**: make sure the backup tool is available. The common hot backup tools in MySQL 8.0 are Percona XtraBackup (community edition) and MySQL Enterprise Backup (enterprise edition). Note: `mysqlhotcopy` was removed in MySQL 5.7.5, and `innobackupex` was also removed from Percona XtraBackup 8.0 onward (use the `xtrabackup` command uniformly); do not use these two tools.
  2. **Perform the backup** (using XtraBackup as an example, applicable to InnoDB):
     ```bash
     # 全量备份，备份期间业务可以正常读写
     xtrabackup --backup --target-dir=/data/backup/base \
       --user=backup_user --password=xxxxxx

     # 恢复前先“准备”备份，把 redo 日志合并到数据文件，使其达到一致状态
     xtrabackup --prepare --target-dir=/data/backup/base

     # 恢复：把备份复制回数据目录（需先停库并清空原数据目录）
     xtrabackup --copy-back --target-dir=/data/backup/base
     ```
     The enterprise edition can use `mysqlbackup` (MySQL Enterprise Backup) to perform the same backup and recovery, and it supports incremental and compressed backups.
  3. **Handling MyISAM tables**: the MyISAM engine does not support crash-safe hot backups; you can only copy the `.MYD`/`.MYI` files after acquiring a read lock (`FLUSH TABLES WITH READ LOCK`), which counts as a "warm backup".
  4. **Verify the backup**: check the integrity of the backup files, and periodically run a full recovery drill in a test environment to ensure backups can be restored correctly.

- **Use cases**:
  - High-availability systems that need to avoid downtime.
  - Large databases or frequently updated data that require frequent backups.

## 3. Comparing Cold Backups and Hot Backups

- **Cold backup**:
  - **Pros**: high consistency of backed-up data, simple operation.
  - **Cons**: requires downtime, affects business.

- **Hot backup**:
  - **Pros**: no downtime, business continuity is guaranteed.
  - **Cons**: the backup process may affect performance, transaction logs must be handled.

## 4. Factors for Choosing a Backup Type

- **Business needs**: whether you can accept database downtime.
- **Data importance**: the requirements for data consistency and integrity.
- **System scale**: the database size and backup time requirements.
- **Resource availability**: the impact of the backup process on system performance and the resources required.

By choosing a suitable backup type, you can effectively ensure database safety and business continuity. Formulating and implementing an appropriate backup strategy based on actual needs is the key to data protection and recovery.

## References

- [MySQL 8.0 Reference Manual · Replication](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [MySQL 8.0 Reference Manual · Backup and Recovery](https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html)
- [MySQL 8.0 Reference Manual · Backup Methods](https://dev.mysql.com/doc/refman/8.0/en/backup-methods.html)
- [MySQL 8.0 Reference Manual · Backup Types](https://dev.mysql.com/doc/refman/8.0/en/backup-types.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
