# Primary and Foreign Keys

Primary keys (Primary Key) and foreign keys (Foreign Key) are two very important concepts in relational database design, used to ensure data integrity and establish relationships between tables.

## Primary Key

A **primary key** is a single column or combination of columns whose values uniquely identify each row in a table. A primary key has the following characteristics:

1. **Uniqueness**: The values of a primary key column must be unique in the table and cannot be repeated. Each row of data can be identified uniquely by its primary key.
2. **NOT NULL**: A primary key column cannot contain NULL values. Every row must have a valid primary key value.
3. **Immutability**: Primary key values should generally remain unchanged, to avoid data consistency issues.

**Example**:

```sql
CREATE TABLE Customers (
    CustomerID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    PRIMARY KEY (CustomerID)
);
```

In this example, `CustomerID` is the primary key of the `Customers` table.

## Foreign Key

A **foreign key** is one or more columns that reference the primary key of another table from one table. Foreign keys are used to establish relationships between tables and ensure referential integrity. A foreign key has the following characteristics:

1. **Referential Integrity**: A foreign key ensures the values in a column must exist in the referenced table, maintaining data consistency.
2. **Nullability**: A foreign key column can contain NULL values, which means there is no constraint to the related table.
3. **Cascading Operations**: A foreign key can be configured with cascading operations (such as cascade update and cascade delete), so that related records are automatically updated or deleted when a record in the primary table is modified or deleted.

**Example**:

```sql
CREATE TABLE Orders (
    OrderID INT NOT NULL AUTO_INCREMENT,
    CustomerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    PRIMARY KEY (OrderID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
```

In this example, `CustomerID` is a foreign key in the `Orders` table, referencing the `CustomerID` primary key of the `Customers` table.

## The Relationship Between Primary and Foreign Keys

1. **One-to-Many Relationship**:
   - In a one-to-many relationship, the primary key of the parent table is referenced as a foreign key in the child table. For example, a customer can have multiple orders, but each order belongs to only one customer. The primary key `CustomerID` of the `Customers` table is referenced as a foreign key in the `Orders` table.

2. **Many-to-Many Relationship**:
   - In a many-to-many relationship, a junction table is usually used to represent the relationship between two tables. The junction table contains two foreign keys, referencing the primary keys of the two parent tables. For example, the many-to-many relationship between the `Students` and `Courses` tables can be represented by an `Enrollments` table, containing the two foreign keys `StudentID` and `CourseID`.

**Example**:

```sql
CREATE TABLE Students (
    StudentID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(100),
    PRIMARY KEY (StudentID)
);

CREATE TABLE Courses (
    CourseID INT NOT NULL AUTO_INCREMENT,
    CourseName VARCHAR(100),
    PRIMARY KEY (CourseID)
);

CREATE TABLE Enrollments (
    EnrollmentID INT NOT NULL AUTO_INCREMENT,
    StudentID INT,
    CourseID INT,
    PRIMARY KEY (EnrollmentID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);
```

In this example, `StudentID` and `CourseID` in the `Enrollments` table are foreign keys to the `Students` and `Courses` tables respectively, used to establish a many-to-many relationship.

## Summary

- **Primary Key**: Uniquely identifies each row of data in a table; it must be unique and cannot be NULL.
- **Foreign Key**: References the primary key of another table, ensuring data integrity and establishing relationships between tables.

Correct use of primary keys and foreign keys is crucial to database design and data consistency. They help maintain the structure and integrity of the data, and establish effective relationships between different tables.

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
