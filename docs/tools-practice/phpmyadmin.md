# phpMyAdmin

phpMyAdmin is a web-based MySQL/MariaDB database management tool, written in PHP, intended to simplify database management and operations. It provides a user-friendly graphical interface that lets users manage databases through a browser, without going straight to the SQL command line. Below are the main features and characteristics of phpMyAdmin:

## Main features

1. **Database management**
   - **Create and drop databases**: easily create new databases or delete databases that are no longer needed.
   - **Table management**: create, delete and rename tables, and manage table structure (such as adding and dropping columns, changing column data types and so on).

2. **Data operations**
   - **Data browsing**: browse and edit data in tables through a table view, with pagination support for large datasets.
   - **Data import/export**: import and export data, supporting multiple formats, including SQL, CSV, XML, JSON and other common formats.
   - **Data editing**: modify table data directly in the web interface, with support for insert, update and delete operations.

3. **SQL queries**
   - **Query editor**: write, execute and save SQL queries, and view query results.
   - **Query history**: record and manage queries that have been run, making it easy to re-run and refer back to them.
   - **Query by example**: build SELECT queries by field conditions through a graphical interface, making it easy for users unfamiliar with SQL syntax to combine query conditions.

4. **Database backup and recovery**
   - **Backup tool**: generate SQL backup files for a database, supporting full backups and selective backups.
   - **Recovery tool**: restore a database from a backup file, with support for importing SQL scripts.

5. **User and privilege management**
   - **User management**: create and delete database users, and set user privileges and access control.
   - **Privilege settings**: manage user access privileges to databases, tables and other objects.

6. **Table structure design**
   - **Table structure editing**: design and modify table structure through a graphical interface, adding and dropping indexes, foreign keys and so on.
   - **ER diagram**: generate and view entity-relationship diagrams (ER diagrams) to visualise the database structure.

7. **Multi-language support**
   - **Multi-language interface**: supports interfaces in multiple languages, suitable for users of different languages.

## Advantages

- **Ease of use**: an intuitive web interface that makes database management simple and easy to understand.
- **Cross-platform**: as a web application it can run on any web server that supports PHP.
- **Community support**: an open source project with active community support, offering rich documentation and plugins.
- **Flexibility**: supports a wide range of MySQL/MariaDB features and configuration options, suitable for various database management needs.

## Use cases

- **Database management**: for users without a deep SQL background, phpMyAdmin provides simplified database management.
- **Development and testing**: developers and testers can use phpMyAdmin to operate on databases quickly, carrying out data editing and query testing.
- **Education and training**: in teaching and training environments, phpMyAdmin provides an easy tool for demonstrating and learning database management.

## Using phpMyAdmin

To use phpMyAdmin, make sure the following conditions are met:

1. **Web server**: install and configure a web server, such as Apache or Nginx.
2. **PHP environment**: install and configure a PHP environment, making sure PHP can work together with the web server.
3. **MySQL/MariaDB**: install a MySQL or MariaDB database server.
4. **phpMyAdmin**: download and install phpMyAdmin, place it in the web server root directory or a subdirectory, and apply the necessary configuration.

By visiting the phpMyAdmin web interface, users can carry out all kinds of database operations, including design, management and maintenance.

## References

- [MySQL 8.0 Reference Manual · Programs](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [glossary](/glossary.md)
- [README](README.md)
