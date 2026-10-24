# Creating, Modifying, and Deleting Databases and Tables

## 1. Creating a Database
   - **Overview**: Create a new database for storing data.
   - **SQL command**:
     ```sql
     CREATE DATABASE database_name;
     ```
   - **Example**:
     ```sql
     CREATE DATABASE mydatabase;
     ```
   - **Notes**: Make sure the database name is unique and follows naming conventions.

## 2. Deleting a Database
   - **Overview**: Delete an existing database and all of its contents.
   - **SQL command**:
     ```sql
     DROP DATABASE database_name;
     ```
   - **Example**:
     ```sql
     DROP DATABASE mydatabase;
     ```
   - **Notes**: The delete operation is irreversible. Be sure to confirm whether important data has been backed up.

## 3. Modifying a Database
   - **Overview**: Modify the settings or attributes of a database.
   - **SQL command**:
     ```sql
     ALTER DATABASE database_name CHARACTER SET = charset COLLATE = collation;
     ```
   - **Example**:
     ```sql
     ALTER DATABASE mydatabase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
     ```
   - **Notes**: You can only modify attributes such as the database's character set and collation.

## 4. Creating a Table
   - **Overview**: Create a new table in a database for storing data.
   - **SQL command**:
     ```sql
     CREATE TABLE table_name (
       column1 datatype constraints,
       column2 datatype constraints,
       ...
     );
     ```
   - **Example**:
     ```sql
     CREATE TABLE mytable (
       id INT PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(255)
     );
     ```
   - **Notes**: Define the table's column names, data types, and constraints.

## 5. Deleting a Table
   - **Overview**: Delete an existing table and all of its data.
   - **SQL command**:
     ```sql
     DROP TABLE table_name;
     ```
   - **Example**:
     ```sql
     DROP TABLE mytable;
     ```
   - **Notes**: The delete operation is irreversible. Be sure to confirm whether important data has been backed up.

## 6. Modifying a Table
   - **Overview**: Modify an existing table, for example by adding or dropping columns.
   - **SQL command**:
     ```sql
     ALTER TABLE table_name
     ADD column_name datatype constraints;
     
     ALTER TABLE table_name
     DROP COLUMN column_name;
     
     ALTER TABLE table_name
     MODIFY COLUMN column_name new_datatype;
     ```
   - **Example**:
     ```sql
     ALTER TABLE mytable
     ADD COLUMN age INT;
     
     ALTER TABLE mytable
     DROP COLUMN email;
     
     ALTER TABLE mytable
     MODIFY COLUMN name TEXT;
     ```
   - **Notes**: Modifying the table structure may affect existing data and application logic.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE DATABASE](https://dev.mysql.com/doc/refman/8.0/en/create-database.html)
- [ALTER DATABASE](https://dev.mysql.com/doc/refman/8.0/en/alter-database.html)
- [DROP DATABASE](https://dev.mysql.com/doc/refman/8.0/en/drop-database.html)
- [CREATE TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
- [ALTER TABLE](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html)
- [DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/drop-table.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
