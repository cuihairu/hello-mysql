# MySQL Shell

MySQL Shell is a powerful command-line tool that provides interactive operation for MySQL databases. It supports SQL, JavaScript and Python modes, and can be used to carry out database management tasks, development and debugging. MySQL Shell is designed to offer a flexible environment that suits different types of users and use cases.

## Main features

1. **Multi-language support**
   - **SQL mode**: the traditional SQL query execution mode, supporting standard SQL syntax.
   - **JavaScript mode**: scripting and database operations in JavaScript, suitable for developers doing programming tasks.
   - **Python mode**: scripting and database operations in Python, suitable for Python developers doing data processing and analysis.

2. **Interactive operation**
   - **Command-line interface**: a powerful command-line interface where commands execute in real time and results can be viewed immediately.
   - **History**: records historical commands, making it easy for users to reuse and look them up.

3. **Database management**
   - **Connection management**: supports connecting to local and remote MySQL servers to carry out database management operations.
   - **Session management**: manage the current database session, execute SQL statements, queries and scripts.

4. **Data processing**
   - **Bulk data operations**: supports large-scale data import and export, convenient for data migration and backup.
   - **Data analysis**: carry out data analysis and processing through scripts and programming languages, supporting complex data operations.

5. **Automated scripting**
   - **Script execution**: you can write and execute automation scripts for regular database maintenance and management tasks, for example `mysqlsh --file /path/to/job.js`; scheduled execution can be combined with the operating system's `cron`/`systemd timer` (MySQL Shell itself has no built-in job scheduler, and server-side scheduled tasks are handled by MySQL's Event Scheduler).

6. **JSON and NoSQL support**
   - **JSON data processing**: supports working with data in JSON format, suitable for data exchange with modern applications.
   - **NoSQL features**: supports MySQL's Document Store feature, allowing NoSQL-style operations and management.

7. **Database configuration and management**
   - **Configuration management**: modify and view database configuration settings, for system optimisation and tuning.
   - **User management**: manage database users and privileges, for access control and security configuration.

## Advantages

- **Multi-language support**: offers SQL, JavaScript and Python modes, adapting to the needs of different users.
- **Powerful**: integrates database management, data processing and scripting, suitable for complex database operations.
- **Interactivity**: provides real-time interactive operation and feedback, improving the user experience.
- **Automation**: supports automation scripts and task scheduling, improving work efficiency.

## Use cases

- **Database development**: developers can use MySQL Shell for database development, testing and debugging.
- **Data analysis**: data analysts can use the Shell's scripting features for data analysis and processing.
- **Database management**: database administrators can use the Shell to carry out database management tasks and maintenance operations.
- **Automated tasks**: suitable for scenarios that need automated database operations and task scheduling.

## Using MySQL Shell

To use MySQL Shell, install it and choose the appropriate mode as needed. Below are some basic steps:

1. **Install MySQL Shell**: download and install the MySQL Shell build for your operating system from the official MySQL website.

2. **Start MySQL Shell**:
   - Start MySQL Shell from the command line: `mysqlsh`
   - Connect to a MySQL server: `mysqlsh --uri user@host`

3. **Choose a mode**:
   - SQL mode: `\sql`
   - JavaScript mode: `\js`
   - Python mode: `\py`

4. **Execute commands and scripts** (the `db` in the examples is the default Schema bound via `\use 数据库名`):
   - In SQL mode, execute SQL statements, for example: `SELECT * FROM my_table;`
   - In JavaScript mode, query documents in a collection, for example: `db.myCollection.find().limit(3)`; when you need the results inside a script, use `db.myCollection.find().limit(3).fetchAll()` (a `DocResult` method — note that `toArray()` is the MongoDB Shell spelling and does not exist in X DevAPI).
   - In Python mode, query a relational table, for example: `db.my_table.select().limit(3)`; to query a collection use `db.myCollection.find().limit(3)` (relational tables use `select()`, only collections use `find()`).
   - Result objects are consumed uniformly through `fetchAll()` (Python: `fetch_all()`) or `fetchOne()`.

5. **Manage the database**:
   - Use SQL statements or scripts for database management, data processing and automation tasks.

### Practical utility functions: backup, upgrade checks and more

MySQL Shell ships with a set of `util.*` utility functions, which is its biggest practical advantage over an ordinary client:

```javascript
// 检查实例能否平滑升级到指定版本，并给出需要修改的项
util.checkForServerUpgrade()

// 并行逻辑备份整个实例（输出为压缩分片文件，支持多线程恢复）
util.dumpInstance("/data/backup/inst_dump", {threads: 4, compress: true})

// 只备份部分 Schema / 单表
util.dumpSchemas(["mydb"], "/data/backup/mydb_dump", {threads: 4})
util.exportTable("mydb.orders", "/data/backup/orders.csv", {format: "csv"})

// 并行恢复 dumpInstance/dumpSchemas 的备份
util.loadDump("/data/backup/inst_dump", {threads: 4})
```

- `util.dumpInstance()` / `util.loadDump()` were introduced in 8.0; combined with multi-threading and compression they are usually much faster than `mysqldump`, and they are the logical backup method officially recommended by MySQL.
- `util.checkForServerUpgrade()` checks before an upgrade for deprecated configuration items, reserved-word conflicts, incompatible SQL usage and more; always run it once before upgrading.

MySQL Shell provides a flexible and powerful environment, suitable for all kinds of database operation needs, whether development, management or data analysis.

## References

- [MySQL 8.0 Reference Manual · Programs](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
- [MySQL 8.0 Reference Manual · MySQL Shell](https://dev.mysql.com/doc/refman/8.0/en/mysql-shell-tutorial-python.html)
- [MySQL Shell · JavaScript documentation](https://dev.mysql.com/doc/refman/8.0/en/mysql-shell-tutorial-javascript.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [glossary](/glossary.md)
- [knowledge](/knowledge.md)
- [README](README.md)
