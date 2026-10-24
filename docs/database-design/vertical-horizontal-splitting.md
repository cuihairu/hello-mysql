# Vertical and Horizontal Splitting

**Vertical Partitioning** and **Horizontal Partitioning** are two commonly used data splitting techniques in database design, aimed at improving performance, managing data complexity and optimising system scalability. Their splitting approaches and goals differ, making them suitable for different scenarios and requirements.

## 1. Vertical Partitioning

**Vertical partitioning** splits the columns of a table across different tables. This approach is suitable for tables with many columns, where some columns are accessed frequently while others are rarely accessed. Vertical partitioning reduces the amount of data in a single query, thereby improving query performance.

### 1.1 Implementing Vertical Partitioning

- **Split by Access Frequency**: Split frequently accessed columns from rarely accessed ones into different tables. For example, split the basic information in a users table (such as username, email) from the additional information (such as user preferences, activity log) into different tables.

  **Example**:
  ```sql
  -- Basic user information
  CREATE TABLE UserBasicInfo (
      UserID INT PRIMARY KEY,
      UserName VARCHAR(100),
      Email VARCHAR(100)
  );
  
  -- Additional user information
  CREATE TABLE UserAdditionalInfo (
      UserID INT PRIMARY KEY,
      Preferences TEXT,
      ActivityLog TEXT,
      FOREIGN KEY (UserID) REFERENCES UserBasicInfo(UserID)
  );
  ```

- **Split by Column Groups**: Group the columns of a table by function, splitting each group of data into different tables. For example, split the basic order information and payment information from an orders table into two different tables.

  **Example**:
  ```sql
  -- Basic order information
  CREATE TABLE OrderBasicInfo (
      OrderID INT PRIMARY KEY,
      OrderDate DATE,
      CustomerID INT
  );
  
  -- Order payment information
  CREATE TABLE OrderPaymentInfo (
      OrderID INT PRIMARY KEY,
      PaymentMethod VARCHAR(50),
      PaymentStatus VARCHAR(50),
      FOREIGN KEY (OrderID) REFERENCES OrderBasicInfo(OrderID)
  );
  ```

### 1.2 Advantages of Vertical Partitioning

- **Improved Query Efficiency**: Reduces the amount of data in each query, which can significantly improve query performance, especially when a table has many columns.

- **Reduced I/O Operations**: Splitting the columns of a table reduces disk I/O operations and improves data read speed.

- **Optimised Storage**: Storing different types of data in different tables helps optimise the storage structure and reduce redundancy.

### 1.3 Challenges of Vertical Partitioning

- **Increased Complexity**: Queries need to join the split tables, which can increase query complexity.

- **Data Consistency**: You need to ensure data consistency and integrity between the split tables, especially during update and delete operations.

## 2. Horizontal Partitioning

**Horizontal partitioning** splits the rows of a table across different tables. Each table has the same column structure but stores different rows of data. This approach is suitable for large data volumes and high query and write loads. Horizontal partitioning can improve performance and scalability by reducing the data volume of a single table.

### 2.1 Implementing Horizontal Partitioning

- **Split by Range**: Distribute data rows across different tables based on the value range of a field. For example, split the orders table by order date range.

  **Example**:
  ```sql
  -- Split the orders table by year
  CREATE TABLE Orders_2023 (
      OrderID INT PRIMARY KEY,
      OrderDate DATE,
      CustomerID INT
  );
  
  CREATE TABLE Orders_2024 (
      OrderID INT PRIMARY KEY,
      OrderDate DATE,
      CustomerID INT
  );
  ```

- **Split by Hash Value**: Use a hash function to distribute data rows evenly across different tables, ensuring balanced load.

  **Example**:
  ```sql
  CREATE TABLE Orders_Part1 (
      OrderID INT PRIMARY KEY,
      OrderDate DATE,
      CustomerID INT
  );
  
  CREATE TABLE Orders_Part2 (
      OrderID INT PRIMARY KEY,
      OrderDate DATE,
      CustomerID INT
  );
  
  -- Data is assigned to different tables based on the hash value
  ```

- **Split by List**: Distribute data rows across different tables based on a list of column values. For example, shard data by region.

  **Example**:
  ```sql
  CREATE TABLE Orders_North (
      OrderID INT PRIMARY KEY,
      OrderDate DATE,
      CustomerID INT
  );
  
  CREATE TABLE Orders_South (
      OrderID INT PRIMARY KEY,
      OrderDate DATE,
      CustomerID INT
  );
  ```

### 2.2 Advantages of Horizontal Partitioning

- **Horizontal Scaling**: Distributing data across multiple tables enables horizontal scaling, supporting larger data volumes and higher concurrent requests.

- **Improved Performance**: Reduces the data volume of a single table, improving query performance and write performance.

- **Load Balancing**: Disperses data load across multiple tables, improving the system's processing capacity and availability.

### 2.3 Challenges of Horizontal Partitioning

- **Data Routing**: You need to implement a data routing mechanism to route queries and writes to the correct table, which can increase system complexity.

- **Cross-Table Queries**: Queries involving multiple tables require cross-table operations, which can increase query complexity and performance overhead.

- **Data Consistency**: Maintaining data consistency and integrity across multiple tables can be challenging, especially under high concurrency and complex transactions.

## Summary

Both **vertical partitioning** and **horizontal partitioning** are important technologies for optimising database performance and scalability. **Vertical partitioning** splits the columns of a table across different tables, reducing the amount of data in each query and improving query performance. **Horizontal partitioning** splits the rows of a table across different tables, achieving horizontal scaling and load balancing. Choosing the right splitting strategy based on specific application scenarios and requirements can significantly improve the performance and scalability of a database system.

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
- [MySQL 8.0 Reference Manual · Partitioning](https://dev.mysql.com/doc/refman/8.0/en/partitioning.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
