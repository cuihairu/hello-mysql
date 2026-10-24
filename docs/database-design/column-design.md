# Column Design

Column design is the core part of database table design, involving defining the name, data type and constraints of each column. Reasonable column design can significantly improve database performance, maintainability and data quality. The main steps and points to watch out for in column design are:

## 1. Column Names

**Column names** should be descriptive and clearly express the meaning of the column. Column names usually follow these rules:

- **Concise and Clear**: Column names should be short and accurately describe their content.
- **Consistency**: Column naming should follow a consistent naming convention, such as camelCase (`firstName`) or snake_case (`first_name`).
- **Avoid Reserved Words**: Avoid using database reserved words or keywords as column names.

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

## 2. Data Types

A **data type** determines the type and range of data a column can store. Choosing the right data type is crucial for optimising performance and storage space. Common data types include:

- **Integer types** (`INT`, `TINYINT`, `SMALLINT`, `MEDIUMINT`, `BIGINT`): Used to store integer values.
- **Floating-point types** (`FLOAT`, `DOUBLE`, `DECIMAL`): Used to store floating-point or fixed-point values.
- **String types** (`CHAR`, `VARCHAR`, `TEXT`, `BLOB`): Used to store character data or binary data.
- **Date and time types** (`DATE`, `DATETIME`, `TIMESTAMP`, `TIME`, `YEAR`): Used to store date and time information.

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

## 3. Column Length

**Column length** should be set according to actual data requirements. For string columns, define the length based on the maximum possible length, to avoid wasting storage space and improve query performance.

- **Fixed Length**: `CHAR(n)`, suitable for data with a fixed length, such as status codes.
- **Variable Length**: `VARCHAR(n)`, suitable for data with a variable length, such as names or descriptions.

**Example**:

```sql
CREATE TABLE Customers (
    CustomerID INT NOT NULL AUTO_INCREMENT,
    CustomerName VARCHAR(100) NOT NULL,
    Address TEXT,
    PhoneNumber CHAR(15),
    PRIMARY KEY (CustomerID)
);
```

## 4. Constraints

**Constraints** are used to ensure the validity and consistency of column data. Common constraints include:

- **NOT NULL**: The column cannot be empty.
- **UNIQUE**: The column value is unique in the table.
- **DEFAULT**: Sets a default value for the column.
- **CHECK**: Used to define that a column value must meet a specific condition (supported in MySQL 8.0.16 and above).

**Example**:

```sql
CREATE TABLE Orders (
    OrderID INT NOT NULL AUTO_INCREMENT,
    OrderDate DATE NOT NULL DEFAULT (CURRENT_DATE),
    CustomerID INT NOT NULL,
    TotalAmount DECIMAL(10, 2) CHECK (TotalAmount >= 0),
    PRIMARY KEY (OrderID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
```

## 5. Default Values

A **default value** provides a default value for a column, simplifying data insertion. When inserting a record, if no value is specified for a column, the default value is used. Default values should be set sensibly, avoiding unnecessary NULL or invalid data.

**Example**:

```sql
CREATE TABLE Products (
    ProductID INT NOT NULL AUTO_INCREMENT,
    ProductName VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) DEFAULT 0.00,
    StockQuantity INT DEFAULT 0,
    PRIMARY KEY (ProductID)
);
```

## 6. Indexes and Optimisation

**Indexes** can improve the query performance of a column. For columns frequently used in retrieval, sorting or joins, consider creating indexes. Common index types include:

- **Single-column index**: An index on a single field.
- **Composite index**: A combined index on multiple fields.

**Example**:

```sql
CREATE INDEX idx_customer_name ON Customers (CustomerName);
CREATE INDEX idx_order_date ON Orders (OrderDate);
```

## 7. Column-Level Constraints and Validation

Column-level constraints and validation are used to ensure data quality and compliance with business rules. You can use the following techniques to implement column-level validation:

- **Data Format Validation**: Ensure the column value conforms to a specific format, such as an email address or phone number.
- **Range Limitation**: Restrict the column value to a specified range, such as age or price.

Note: A `CHECK` constraint expression can only use deterministic built-in functions. Non-deterministic functions such as `CURDATE()` and `NOW()` cannot appear in a `CHECK`, so a dynamic rule like "date of birth cannot be later than today" needs to be implemented at the application layer or in a trigger.

**Example**:

```sql
CREATE TABLE Employees (
    EmployeeID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    BirthDate DATE CHECK (BirthDate >= '1900-01-01'),
    Salary DECIMAL(10, 2) CHECK (Salary >= 0),
    PRIMARY KEY (EmployeeID)
);
```

## Summary

Column design plays an important role in database design, covering column names, data types, lengths, constraints, default values, indexes and optimisation. Reasonable column design ensures data accuracy, consistency and query performance, thereby building an efficient and reliable database system. When designing columns, consider actual business requirements, data characteristics and performance requirements to achieve the best design.

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
- [MySQL 8.0 Reference Manual · Data Types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)
- [String Types · CHAR/VARCHAR](https://dev.mysql.com/doc/refman/8.0/en/char.html)
- [BLOB](https://dev.mysql.com/doc/refman/8.0/en/blob.html)
- [DATETIME](https://dev.mysql.com/doc/refman/8.0/en/datetime.html)

## Related pages

- [README](README.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
