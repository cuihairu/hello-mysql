# Partitioning and Sharding

**Partitioning** and **Sharding** are important technologies for database performance optimisation and scaling. They can significantly improve database management efficiency and query performance when handling large-scale data. Although these two concepts are similar in goal, their implementation mechanisms and application scenarios are different.

## 1. Partitioning

**Partitioning** distributes the data of a single database table across different physical storage areas, to improve query performance and simplify data management. Each partition is treated as a logically independent subtable, but remains one whole logically.

### 1.1 Partition Types

- **Range Partitioning**: Partitions data based on the value range of a column. For example, partition the orders table by date range.

  **Example**:
  ```sql
  CREATE TABLE Orders (
      OrderID INT,
      OrderDate DATE
      -- other fields
  )
  PARTITION BY RANGE (YEAR(OrderDate)) (
      PARTITION p0 VALUES LESS THAN (1991),
      PARTITION p1 VALUES LESS THAN (1992),
      PARTITION p2 VALUES LESS THAN (1993),
      PARTITION pmax VALUES LESS THAN MAXVALUE
  );
  ```

- **List Partitioning**: Partitions data based on a list of column values. For example, partition the users table by country. Note: The partition expression for `LIST` partitioning must return an integer. To partition directly on a column of a non-integer type such as a string, you need to use `LIST COLUMNS` partitioning.

  **Example**:
  ```sql
  CREATE TABLE Users (
      UserID INT,
      Country VARCHAR(50)
      -- other fields
  )
  PARTITION BY LIST COLUMNS (Country) (
      PARTITION p0 VALUES IN ('USA', 'Canada'),
      PARTITION p1 VALUES IN ('UK', 'Germany'),
      PARTITION p2 VALUES IN ('France', 'Italy')
  );
  ```

- **Hash Partitioning**: Distributes data across partitions using a hash algorithm, suitable for cases where data is evenly distributed.

  **Example**:
  ```sql
  CREATE TABLE Employees (
      EmployeeID INT,
      DepartmentID INT
      -- other fields
  )
  PARTITION BY HASH (DepartmentID) PARTITIONS 4;
  ```

- **Key Partitioning**: Similar to hash partitioning, but uses a hash function built into the database to determine the data partition.

  **Example**:
  ```sql
  CREATE TABLE Sales (
      SaleID INT,
      ProductID INT
      -- other fields
  )
  PARTITION BY KEY (ProductID) PARTITIONS 4;
  ```

### 1.2 Advantages of Partitioning

- **Improved Query Performance**: By splitting data into different partitions, you can reduce the amount of data scanned and improve query efficiency.

- **Simplified Data Management**: You can back up and restore each partition independently, simplifying management tasks.

- **Improved Data Maintenance Efficiency**: When handling large tables, partitioning can reduce the scope of locks and improve the efficiency of data maintenance operations.

### 1.3 Limitations of Partitioning

- **Partitioning Complexity**: Partitioning design needs to consider the distribution pattern of the data, and excessive partitioning can increase management complexity.

- **Not Suitable for All Scenarios**: Partitioning is suitable for tables with large data volumes; small tables may not need partitioning.

## 2. Sharding

**Sharding** distributes the data of a database across multiple independent database instances to achieve horizontal scaling. Each database instance handles part of the data, dispersing the load and improving the system's processing capacity.

### 2.1 Sharding Strategies

- **Range-Based Sharding**: Distributes data across different database instances based on the value range of a field. For example, shard user data by user ID range.

  **Example**: User IDs 1-1000 are stored in database instance A, and 1001-2000 in database instance B.

- **Hash-Based Sharding**: Uses a hash function to distribute data evenly across different database instances, ensuring balanced load.

  **Example**: The hash value of the user ID determines the database instance used for storage.

- **List-Based Sharding**: Distributes data across different database instances based on a list of column values. For example, shard data by region.

### 2.2 Advantages of Sharding

- **Horizontal Scaling**: Increase the system's processing capacity by adding more database instances, supporting larger data volumes and higher concurrent requests.

- **Load Balancing**: Sharding disperses the load across multiple database instances, improving the system's processing capacity and reliability.

- **High Availability**: Each database instance can run independently, providing high availability and fault tolerance.

### 2.3 Challenges of Sharding

- **Data Routing**: You need to implement a data routing mechanism to route queries and writes to the correct shard. Implementing the routing logic can be complex.

- **Cross-Shard Queries**: Queries involving multiple shards may require cross-shard operations, which increases query complexity and latency.

- **Data Consistency**: Ensuring data consistency and integrity across multiple shards can be challenging, especially under high concurrency and complex transactions.

## Summary

Both partitioning and sharding are important technologies for database optimisation and scaling. **Partitioning** distributes data across different partitions within the same database, improving query efficiency and data management flexibility. **Sharding** distributes data across multiple database instances, achieving horizontal scaling and load balancing. Choose the right technology based on specific application scenarios and requirements to optimise database performance and scalability.

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
- [MySQL 8.0 Reference Manual · Partitioning](https://dev.mysql.com/doc/refman/8.0/en/partitioning.html)
- [Partitioning Overview](https://dev.mysql.com/doc/refman/8.0/en/partitioning-overview.html)
- [Partition Types](https://dev.mysql.com/doc/refman/8.0/en/partitioning-types.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
- [knowledge](/knowledge.md)
