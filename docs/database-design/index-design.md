# Index Design

This page records index design trade-offs starting from table structure and query requirements. See [Index Types and Their Underlying Implementations](../advanced-features-internals/index-types.md) for index data structures and types, and [Index Optimisation](../advanced-features-internals/index-optimization.md) for operations and tuning.

Index design is a key part of database performance optimisation; it can significantly improve the speed of data retrieval. Reasonable index design can speed up queries and reduce data access time. The main content and best practices of index design are:

## 1. Basic Concepts of Indexes

An **index** is a database object used to speed up data retrieval. It is like the table of contents of a book, allowing you to quickly locate data. An index achieves this acceleration by creating a data structure over certain columns of a database table.

## 2. Index Types

The examples in this section assume the database already contains tables such as `Customers`, `Orders`, `Users`, `Products` and `Locations`, and that `Locations.Coordinates` is a `NOT NULL` column of type `POINT` (creating a spatial index requires the indexed column not to be `NULL`).

- **Single-column index**: An index on a single field in a table. This is the most common index type, used to optimise queries on a single field.

  **Example**:
  ```sql
  CREATE INDEX idx_customer_name ON Customers (CustomerName);
  ```

- **Composite index**: An index on multiple fields. A composite index can improve query performance on multiple fields, especially when queries involve conditions on several fields.

  **Example**:
  ```sql
  CREATE INDEX idx_order_customer_date ON Orders (CustomerID, OrderDate);
  ```

- **Unique index**: Ensures the values in the indexed columns are unique, preventing duplicate data from being inserted. Primary key indexes and unique constraints usually use unique indexes.

  **Example**:
  ```sql
  CREATE UNIQUE INDEX idx_unique_email ON Users (Email);
  ```

- **Full-text index**: Used to speed up full-text search on text columns. Suitable for application scenarios that need complex text search.

  **Example**:
  ```sql
  CREATE FULLTEXT INDEX idx_fulltext_description ON Products (Description);
  ```

- **Spatial index**: Used for spatial data types, such as geographic location data, supporting geospatial queries.

  **Example**:
  ```sql
  CREATE SPATIAL INDEX idx_location ON Locations (Coordinates);
  ```

## 3. Index Design Principles

- **High-Selectivity Columns**: When choosing indexed columns, prioritise columns with high selectivity, i.e. columns with a relatively large number of distinct values. This improves index efficiency.

  **Example**: In a table with a large number of user records, the `Email` column usually has high selectivity, while the `Gender` column may have low selectivity.

- **Avoid Too Many Indexes**: Although indexes can speed up queries, too many indexes increase the cost of write operations (insert, update, delete). Choose and create indexes reasonably based on query requirements.

- **Covering Index**: When a query only involves indexed columns, the index can "cover" the query, avoiding access to the actual data rows. This can further improve query efficiency.

  **Example**:
  ```sql
  CREATE INDEX idx_order_summary ON Orders (OrderID, TotalAmount);
  ```

- **Column Order**: For a composite index, the order of the columns affects the effectiveness of the index. Design the column order based on the query's filtering conditions and sorting requirements.

  **Example**:
  ```sql
  -- Optimize for WHERE CustomerID = ? AND OrderDate BETWEEN ? AND ?
  CREATE INDEX idx_customer_order_date ON Orders (CustomerID, OrderDate);
  ```

- **Regular Maintenance**: As data grows and changes, indexes may no longer be efficient. Regular index maintenance, such as rebuilding or reorganising indexes, keeps the database performing well.

## 4. Index Optimisation

- **Monitoring and Analysis**: Use the tools provided by the database (such as `EXPLAIN`) to analyse the execution plan of a query and determine whether indexes need to be added or adjusted.

  **Example**:
  ```sql
  EXPLAIN SELECT * FROM Orders WHERE CustomerID = 123;
  ```

- **Avoid Over-Designing Indexes**: Creating too many indexes leads to a performance decline. You should not create indexes on every column of a table; only index the frequently used query conditions and sorting columns.

- **Choose the Right Data Structure**: For specific types of queries, choosing the right data structure (such as B-Tree or Hash indexes) can improve performance. Note: In MySQL, InnoDB and MyISAM only support B-Tree indexes; Hash indexes are only available for storage engines such as MEMORY and NDB. Specifying `USING HASH` on InnoDB is ignored, and a B-Tree is used in practice.

## 5. Practical Cases

- **E-commerce website**: In the orders table, creating a composite index on `CustomerID` and `OrderDate` can speed up queries for orders by customer and date range.

  **Example**:
  ```sql
  CREATE INDEX idx_customer_order_date ON Orders (CustomerID, OrderDate);
  ```

- **Social networking platform**: In the users table, creating a unique index on the `Email` column ensures each user's email address is unique and prevents duplicate registration.

  **Example**:
  ```sql
  CREATE UNIQUE INDEX idx_unique_email ON Users (Email);
  ```

## Summary

Index design is a key part of improving database performance. By choosing index types wisely, following design principles and maintaining indexes regularly, you can significantly improve query speed and system responsiveness. In practice, indexes should be designed and optimised according to specific query requirements and data characteristics, to achieve the best database performance.

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
- [CREATE INDEX](https://dev.mysql.com/doc/refman/8.0/en/create-index.html)
- [MySQL 8.0 Reference Manual · Optimising Indexes](https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
