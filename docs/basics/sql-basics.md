# Introduction to SQL Basics

SQL (Structured Query Language) is a standard language for managing relational databases. It is used not only to query data, but also to insert, update and delete data, create and manage database structures, and perform various other operations on a database. SQL was designed so that users can interact with databases in a simple and intuitive way.

## 1. Basic SQL Concepts

- **Database**: An organized collection of data, usually containing multiple tables.
- **Table**: The basic storage unit in a database, consisting of rows (records) and columns (fields).
- **Row**: A single record in a table.
- **Column**: A field in a table, with each column containing data of some type.
- **Field**: Another name for a column, representing a data element.
- **Record**: A row of data in a table, containing the values of several fields.

## 2. Basic SQL Functions

SQL can perform a variety of operations, including:

- **Data querying**: Retrieving data from a database.
- **Data insertion**: Adding new data to database tables.
- **Data updating**: Modifying existing data in database tables.
- **Data deletion**: Removing data from database tables.
- **Table management**: Creating, modifying and deleting tables and their structures.
- **Database management**: Creating, deleting and modifying databases, and managing database permissions and security settings.

## 3. Main SQL Statements

- **Query statement (SELECT)**:
  - Used to retrieve data from a database.
  - Example: `SELECT column1, column2 FROM table_name WHERE condition;`

- **Insert statement (INSERT)**:
  - Used to insert data into a table.
  - Example: `INSERT INTO table_name (column1, column2) VALUES (value1, value2);`

- **Update statement (UPDATE)**:
  - Used to update data in a table.
  - Example: `UPDATE table_name SET column1 = value1 WHERE condition;`

- **Delete statement (DELETE)**:
  - Used to delete data from a table.
  - Example: `DELETE FROM table_name WHERE condition;`

- **Create table (CREATE TABLE)**:
  - Used to create a new table.
  - Example: `CREATE TABLE table_name (column1 datatype, column2 datatype, ...);`

- **Alter table (ALTER TABLE)**:
  - Used to modify the structure of an existing table, such as adding or dropping columns.
  - Example: `ALTER TABLE table_name ADD column_name datatype;`

- **Drop table (DROP TABLE)**:
  - Used to delete a table and all of its data.
  - Example: `DROP TABLE table_name;`

## 4. SQL Data Types

Common data types in SQL include:

- **Integer (INT, SMALLINT, BIGINT)**: Used to store integer values.
- **Floating-point (FLOAT, DOUBLE, DECIMAL)**: Used to store floating-point or high-precision numbers.
- **Character (CHAR, VARCHAR, TEXT)**: Used to store character or text data.
- **Date and time (DATE, TIME, DATETIME, TIMESTAMP)**: Used to store date and time information.
- **Boolean (BOOLEAN)**: Used to store true or false values.

## 5. SQL Operators and Functions

- **Arithmetic operators**: such as `+`, `-`, `*`, `/`.
- **Comparison operators**: such as `=`, `<>`, `>`, `<`, `>=`, `<=`.
- **Logical operators**: such as `AND`, `OR`, `NOT`.
- **Aggregate functions**: such as `SUM()`, `AVG()`, `COUNT()`, `MIN()`, `MAX()`.
- **String functions**: such as `CONCAT()`, `SUBSTR()`, `LENGTH()`.
- **Date functions**: such as `NOW()`, `DATE_ADD()`, `DATEDIFF()`.

## 6. SQL Standards and Dialects

- **SQL standards**: Standard versions of SQL include SQL-92, SQL:1999, SQL:2003, SQL:2008 and so on.
- **SQL dialects**: Different database systems (such as MySQL, PostgreSQL, SQL Server, Oracle) may have their own SQL dialects or extensions, but basic SQL syntax and functionality are common across database systems.

## 7. Practical Applications of SQL

SQL is widely used in:

- **Data analysis**: Using SQL to query data and generate reports and analysis results.
- **Web development**: Interacting with databases to dynamically generate web page content.
- **Business systems**: Managing enterprise data, such as customer information and order management.
- **Data migration and backup**: Performing data migration and backup through SQL operations.

## Summary

SQL is the core language for managing relational databases and a foundational tool in database development and administration. When querying, managing and analyzing data, everything ultimately comes down to specific SQL operations and data models.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
