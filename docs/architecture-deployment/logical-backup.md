# Logical Backup (mysqldump, MySQL Workbench)

A logical backup is made by exporting the structure and data of a database. This backup method converts database content into SQL statements or other file formats, and can be used for database migration, recovery and data analysis. Logical backups do not depend on a specific storage engine and are usually more flexible than physical backups.

## 1. `mysqldump`

`mysqldump` is a command-line tool provided by MySQL for generating logical backups of a database. It exports a database's data and structure as SQL scripts, which can be used for data recovery and migration.

- **Basic usage**:
  ```bash
  mysqldump -u [username] -p [database_name] > [backup_file].sql
  ```

  - `-u [username]`: specifies the username.
  - `-p`: prompts for the password.
  - `[database_name]`: specifies the name of the database to back up.
  - `[backup_file].sql`: the name of the backup file.

- **Common options**:
  - `--all-databases`: back up all databases.
  - `--single-transaction`: keep transaction consistency during the backup (applicable to InnoDB).
  - `--routines`: back up stored procedures and functions.
  - `--triggers`: back up triggers.
  - `--no-data`: back up only the database structure, not the data.
  - `--compress`: compress data transferred over the client-server connection (deprecated as of 8.0.18; prefer `--compression-algorithms=zlib`). Note that it does not compress the backup file itself; to reduce the backup file size, pair it with a system compression tool, e.g. `mysqldump -u root -p mydb | gzip > mydb_backup.sql.gz`.
  - `--source-data=2` (`--master-data=2` before 8.0.26): records the binary log position of the source at backup time in the backup file, making position-based recovery and replica setup easier.
  - `--set-gtid-purged=OFF`: on GTID-enabled instances, this option is usually required when exporting SQL meant to be re-imported, to avoid the backup file carrying this instance's GTID set.

- **Example**:
  ```bash
  mysqldump -u root -p mydb > mydb_backup.sql
  ```

  This command exports the structure and data of the `mydb` database to the `mydb_backup.sql` file.

- **Restore**:
  ```bash
  mysql -u [username] -p [database_name] < [backup_file].sql
  ```

  Use the `mysql` command to import the backup file into the database.

## 2. MySQL Workbench

MySQL Workbench is a graphical database management tool that provides a user-friendly interface for performing database backup and recovery operations. With MySQL Workbench, you can conveniently create logical backups and restore them.

- **Creating a backup**:
  1. Open MySQL Workbench and connect to the database server.
  2. In the **Administration** navigation on the left, choose **Data Export**.
  3. Check the databases and tables to back up.
  4. Choose the export method: **Export to Self-Contained File** (produces a single `.sql` file) or **Export to Dump Project Folder** (one file per table).
  5. In **Advanced Options**, check as needed whether to include structure, data, triggers, stored procedures and so on.
  6. Click **Start Export** and specify where to save the backup file.

- **Restoring a backup**:
  1. Open MySQL Workbench and connect to the database server.
  2. In the **Administration** navigation, choose **Data Import/Restore**.
  3. Choose the import source: **Import from Dump Project Folder** or **Import from Self-Contained File**.
  4. In **Default Target Schema**, select the target database (you can also check the box to create the Schema automatically during import).
  5. Click **Start Import** to restore the data from the backup file into the database.

- **Pros**:
  - **User-friendly**: provides a graphical interface, easy to operate.
  - **Integrated tooling**: supports multiple management functions such as database design and queries.

- **Cons**:
  - **Performance**: for large databases, the graphical tool may be slow.
  - **Resource usage**: may require more system resources and memory.

## 3. Comparing Logical Backups

- **Flexibility**: a logical backup can select part of the database to back up (such as only the table structure, or the data of certain tables), whereas a physical backup is usually an all-or-nothing backup.
- **Recovery**: a logical backup is restored via SQL scripts and usually does not depend on a specific database storage engine.
- **Use cases**: suitable for migrating data, generating data snapshots and performing data analysis.

## 4. Factors for Choosing a Backup Method

- **Data size**: logical backups suit small and medium databases; larger databases may need more efficient tools.
- **Backup frequency**: logical backups suit regular backups and narrow-scope restores.
- **Restore needs**: a logical backup can selectively restore some of the data, while restoring from a physical backup requires a complete backup file.

By choosing the right backup tools and methods, you can ensure the safety and integrity of your database data. Logical backup is a flexible and effective backup method suited to a wide range of data protection needs.

## References

- [MySQL 8.0 Reference Manual · Replication](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [MySQL 8.0 Reference Manual · Backup and Recovery](https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html)
- [MySQL 8.0 Reference Manual · mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
- [MySQL 8.0 Reference Manual · mysqlpump](https://dev.mysql.com/doc/refman/8.0/en/mysqlpump.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
