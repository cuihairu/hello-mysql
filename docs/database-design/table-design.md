# Table Design

Table design is a vital part of database physical design, involving defining the table structure, fields and their data types, indexes and constraints. Good table design ensures efficient data storage and retrieval, while also improving the overall performance and maintainability of the database. The main steps and key points of table design are:

## 1. Determining the Table Structure

**Determining the table structure** is the first step of table design. Each table usually contains one or more fields, and each field has its own data type and constraints. The points to consider when designing a table structure are:

- **Table Name**: Choose a descriptive table name that clearly expresses the function of the table or the type of data it contains.
- **Fields**: Determine the data items that need to be stored in the table. Each field should have a name and an appropriate data type.
- **Field Order**: Field order usually does not affect functionality, but a reasonable order can improve the readability and maintainability of the table.

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

## 2. Choosing Data Types

A **data type** determines the kind and range of data a field can store. Common data types include:

- **Integer types**: `INT`, `TINYINT`, `SMALLINT`, `MEDIUMINT`, `BIGINT`.
- **Floating-point types**: `FLOAT`, `DOUBLE`, `DECIMAL`.
- **String types**: `CHAR`, `VARCHAR`, `TEXT`, `BLOB`.
- **Date and time types**: `DATE`, `DATETIME`, `TIMESTAMP`, `TIME`, `YEAR`.

When **choosing data types**, consider the actual data requirements, storage space and performance. For example, use `CHAR` or `VARCHAR` for short text and `TEXT` for long text.

**Example**:

```sql
CREATE TABLE Products (
    ProductID INT NOT NULL AUTO_INCREMENT,
    ProductName VARCHAR(100),
    Price DECIMAL(10, 2),
    StockQuantity INT,
    ReleaseDate DATE,
    PRIMARY KEY (ProductID)
);
```

## 3. Setting the Primary Key

A **primary key** is the unique identifier of a table, used to determine each row of data. Primary key columns usually have the following characteristics:

- **Uniqueness**: The value of a primary key column must be unique in the table.
- **NOT NULL**: A primary key column cannot be `NULL`.
- **Auto-increment** (optional): For integer primary keys, auto-increment can be set, so a unique value is generated automatically when a new record is inserted.

**Example**:

```sql
CREATE TABLE Orders (
    OrderID INT NOT NULL AUTO_INCREMENT,
    OrderDate DATE,
    CustomerID INT,
    TotalAmount DECIMAL(10, 2),
    PRIMARY KEY (OrderID)
);
```

## 4. Defining Foreign Keys

A **foreign key** is used to establish relationships between tables and ensure data consistency and integrity. A foreign key column points to the primary key of another table. Foreign key constraints help maintain referential integrity of the data.

- **Foreign Key Constraint**: Defines the association between tables, ensuring the value of a foreign key column exists in the associated table.
- **Cascading Operations** (optional): You can define the operation on the corresponding records in the foreign key table when a record in the parent table is updated or deleted (such as `ON DELETE CASCADE` or `ON UPDATE CASCADE`).

**Example**:

```sql
CREATE TABLE OrderDetails (
    OrderDetailID INT NOT NULL AUTO_INCREMENT,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    UnitPrice DECIMAL(10, 2),
    PRIMARY KEY (OrderDetailID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
```

## 5. Setting Constraints

**Constraints** are used to ensure data validity and integrity. Common constraints include:

- **NOT NULL**: Ensures the column value cannot be empty.
- **UNIQUE**: Ensures the column value is unique in the table.
- **DEFAULT**: Sets a default value for the column.
- **CHECK**: Used to define that a column value must meet a specific condition (supported in MySQL 8.0.16 and above).
- **Expression Default Value**: A default value can be an expression, but it must be written inside a pair of parentheses (such as `DEFAULT (CURRENT_DATE)`, supported in MySQL 8.0.13 and above).

**Example**:

```sql
CREATE TABLE Customers (
    CustomerID INT NOT NULL AUTO_INCREMENT,
    CustomerName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    JoinDate DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (CustomerID)
);
```

## 6. Index Design

**Indexes** are used to improve query performance, especially when handling large amounts of data. Common index types include:

- **Single-column index**: An index on a single field.
- **Composite index**: A combined index on multiple fields, used to optimise queries involving multiple fields.
- **Full-text index**: Used for full-text search, suitable for text data.

**Example**:

```sql
CREATE INDEX idx_customer_name ON Customers (CustomerName);
CREATE INDEX idx_order_date_customer ON Orders (OrderDate, CustomerID);
```

## Summary

Table design is the core of database design, involving determining the table structure, choosing fields, defining primary and foreign keys, setting constraints and designing indexes. Reasonable table design not only helps improve the efficiency of data storage and retrieval but also ensures data consistency and integrity. By considering all aspects of table design, you can build an efficient, stable and easy-to-maintain database system.

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
- [ALTER TABLE](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
