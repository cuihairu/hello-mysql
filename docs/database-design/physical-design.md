# Physical Design

**Physical design** is an important phase of database design, mainly involving the translation of the conceptual and logical designs into the actual database implementation. Physical design focuses on how data is stored and managed efficiently in a database management system (DBMS). The key aspects of physical design are:

## 1. Table Design

**Table design** is the core of physical design, involving deciding the structure of each table, how it is stored, and how its data is indexed. Key points include:

- **Choosing Data Types**: Select an appropriate data type based on the nature of the field. For example, use `INT` to store integers, `VARCHAR` for variable-length strings, and `DATE` for dates.
- **Field Length**: Set a reasonable length for each field, avoiding lengths that are too long or too short, to save storage space and improve query performance.
- **Data Integrity Constraints**: Define constraints for fields, such as NOT NULL, UNIQUE and default values, to ensure data accuracy and integrity.

**Example**:

```sql
CREATE TABLE Employees (
    EmployeeID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    HireDate DATE,
    Salary DECIMAL(10, 2),
    PRIMARY KEY (EmployeeID)
);
```

## 2. Index Design

**Indexes** are used to speed up the process of data retrieval. Correct index design can significantly improve query performance. The main types include:

- **Primary Key Index**: Automatically created on the primary key column, used to uniquely identify each row.
- **Unique Index**: Ensures the uniqueness of column values, suitable for fields that need to guarantee uniqueness.
- **Regular Index**: Speeds up queries on non-unique fields.
- **Full-text Index**: Used for full-text search, suitable for fields handling large amounts of text data.

**Example**:

```sql
CREATE INDEX idx_lastname ON Employees (LastName);
```

## 3. Data Partitioning

**Data partitioning** splits a large table into several smaller parts to improve query efficiency and management performance. Common partitioning methods include:

- **Range Partitioning**: Partitions data based on the range of a column value, for example by date.
- **List Partitioning**: Partitions data based on specific column values, for example by country.
- **Hash Partitioning**: Partitions data based on the hash value of a column, used to distribute data evenly.

**Example**:

```sql
CREATE TABLE Orders (
    OrderID INT NOT NULL,
    OrderDate DATE,
    PRIMARY KEY (OrderID, OrderDate)
)
PARTITION BY RANGE (YEAR(OrderDate)) (
    PARTITION p0 VALUES LESS THAN (2000),
    PARTITION p1 VALUES LESS THAN (2010),
    PARTITION p2 VALUES LESS THAN (2020),
    PARTITION p3 VALUES LESS THAN MAXVALUE
);
```

## 4. Choosing a Storage Engine

A **storage engine** determines the characteristics of how data is stored, transaction support, locking mechanisms and so on. MySQL supports a number of storage engines, including:

- **InnoDB**: Supports transactions, foreign keys and row-level locking; it is the default storage engine and suitable for most scenarios.
- **MyISAM**: Does not support transactions or foreign keys; mainly used for read-only data or scenarios requiring high-speed read/write operations.
- **MEMORY**: Stores data in memory, suitable for temporary data and high-speed caches.

**Example**:

```sql
CREATE TABLE Products (
    ProductID INT NOT NULL AUTO_INCREMENT,
    ProductName VARCHAR(100),
    Price DECIMAL(10, 2),
    PRIMARY KEY (ProductID)
) ENGINE=InnoDB;
```

## 5. Data Backup and Restore

**Backup and restore** are key to ensuring data safety and recoverability. Physical design needs to consider how to implement efficient data backup and restore strategies, including:

- **Full Backup**: Backs up the entire database, including all tables and data.
- **Incremental Backup**: Backs up only the data that has changed since the last backup.
- **Differential Backup**: Backs up the data that has changed since the last full backup.

**Example**:

```bash
# 全量备份
mysqldump -u root -p mydatabase > mydatabase_backup.sql

# 恢复
mysql -u root -p mydatabase < mydatabase_backup.sql
```

## 6. Performance Optimisation

**Performance optimisation** involves tuning the database to improve overall performance. Common optimisation measures include:

- **Optimising Queries**: Use indexes and optimise query statements to improve query efficiency.
- **Tuning Parameters**: Adjust database configuration parameters, such as cache size and connection limits, to fit the load requirements.
- **Monitoring and Analysis**: Use performance monitoring tools to regularly analyse and optimise database performance.

## Summary

Physical design is the process of translating the logical model of a database into the actual database implementation. Through table design, index design, data partitioning, storage engine selection, backup and restore strategies, and performance optimisation, physical design ensures the database runs efficiently, stably and securely. Sound physical design not only improves database performance but also strengthens data management and security.

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
