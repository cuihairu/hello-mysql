# Index Types and Their Underlying Implementation

This page covers index types from the perspective of the MySQL/InnoDB implementation; for the trade-offs in table structure and query requirements, see the [Index Design Notes](../database-design/index-design.md).

In a database system, different types of indexes have different underlying implementations, to meet different query requirements and data characteristics. Below I introduce the definition, applicable scenarios and underlying implementation of common index types, and explain why these data structures are chosen.

## 1. Single-Column Index

- **Definition**: An index created on a single column; the most basic and commonly used index type.
- **Applicable scenarios**: Suitable for a single column that is frequently used as a query condition.
- **Underlying implementation**: Usually implemented based on a B-Tree or B+ Tree.
- **Reason for choice**: B-Tree and B+ Tree structures handle single-column equality and range queries efficiently, with good performance and disk I/O characteristics.
- **Example**:

  ```sql
  CREATE INDEX idx_column_name
  ON table_name (column_name);
  ```

## 2. Composite Index

- **Definition**: An index involving multiple columns, also called a composite index.
- **Applicable scenarios**: Suitable for cases where queries are frequently based on multiple columns; it can optimise multi-column query performance.
- **Notes**: The order of columns in a composite index is very important; the index optimises queries according to the column order.
- **Underlying implementation**: Usually implemented based on a B+ Tree.
- **Reason for choice**: The B+ Tree structure supports joint queries on multiple columns; through sorting and its tree structure, it can quickly find records satisfying multiple column conditions.
- **Example**:

  ```sql
  CREATE INDEX idx_multiple_columns
  ON table_name (column1, column2);
  ```

## 3. Unique Index

- **Definition**: Guarantees that the values of the indexed columns are unique in the table; usually used to ensure data uniqueness.
- **Applicable scenarios**: Suitable for columns requiring a unique constraint, such as user ID, email, and so on.
- **Underlying implementation**: Usually implemented based on a B+ Tree, with a uniqueness constraint added to the tree structure.
- **Reason for choice**: The B+ Tree supports fast lookup and insert operations, and can guarantee that each key value is unique in the tree, helping maintain data integrity.
- **Example**:

  ```sql
  CREATE UNIQUE INDEX idx_unique_column
  ON table_name (column_name);
  ```

## 4. Full-Text Index

- **Definition**: Used to optimise full-text search queries on text data, supporting complex text search such as word frequency statistics and relevance ranking.
- **Applicable scenarios**: Suitable for columns requiring complex text search, such as article content, comments, and so on.
- **Underlying implementation**: Usually implemented based on an inverted index.
- **Reason for choice**: An inverted index is suitable for handling large-scale text data; by building a mapping between words and documents, it efficiently supports full-text search, word frequency statistics and relevance ranking.
- **Example**:

  ```sql
  CREATE FULLTEXT INDEX idx_fulltext_column
  ON table_name (column_name);
  ```

## 5. Spatial Index

- **Definition**: An index for geospatial data, supporting efficient retrieval of spatial data types.
- **Applicable scenarios**: Suitable for applications that need to handle geographic location information, such as map services and Geographic Information Systems (GIS).
- **Underlying implementation**: Usually implemented based on an R-Tree or Quad-Tree.
- **Reason for choice**: R-Tree and Quad-Tree are suitable for handling multi-dimensional spatial data, supporting efficient spatial queries (such as range queries and nearest-neighbour queries), and can quickly find geographic location data.
- **Example**:

  ```sql
  CREATE SPATIAL INDEX idx_spatial_column
  ON table_name (column_name);
  ```

## 6. Hash Index

- **Definition**: An index type that uses a hash function, based on a hash table structure to store the index.
- **Applicable scenarios**: Suitable for equality queries, such as looking up records with a specific value.
- **Notes**: Does not support range queries.
- **Underlying implementation**: Implemented based on a hash table.
- **Reason for choice**: A hash table has O(1) time complexity for lookup and insert, making it very suitable for equality queries, but it does not support range queries.
- **Example** (in MySQL, only engines such as MEMORY that support HASH indexes truly use hash indexes):

  ```sql
  CREATE INDEX idx_hash_column
  ON table_name (column_name) USING HASH;
  ```

  Note: InnoDB does not support creating hash indexes manually (its adaptive hash index AHI is created and maintained automatically by the engine); for an InnoDB table, even if you write `USING HASH`, what is actually created is still a B+ Tree index.

## 7. B-Tree Index

- **Definition**: An index based on the B-Tree (balanced tree) structure, widely used in relational databases.
- **Applicable scenarios**: Supports range queries, sorting and equality queries.
- **Underlying implementation**: Implemented based on the B-Tree structure.
- **Reason for choice**: The B-Tree is a balanced tree structure that maintains the ordering of data, supporting efficient equality and range queries, and has a low tree height with few disk I/O operations.
- **Example** (the default index type in MySQL):

  ```sql
  CREATE INDEX idx_btree_column
  ON table_name (column_name);
  ```

## 8. Bitmap Index

- **Definition**: An index on the bitmaps of unique values in a column; suitable for low-cardinality columns (columns with few unique values).
- **Applicable scenarios**: Usually used for analytical queries in data warehouses.
- **Underlying implementation**: Implemented based on a bitmap.
- **Reason for choice**: A bitmap index is suitable for handling low-cardinality columns; through bitmap operations it can quickly perform logical operations, making it suitable for analytical queries in data warehouses.
- **Example** (bitmap indexes are supported in databases such as Oracle, **MySQL does not support bitmap indexes**):

  ```sql
  -- Oracle syntax example; cannot be executed in MySQL
  CREATE BITMAP INDEX idx_bitmap_column
  ON table_name (column_name);
  ```

## 9. Reverse Index

- **Definition**: Reverses the values of a column and creates an index on the reversed values; suitable for some specific query optimisations.
- **Applicable scenarios**: Used to index some patterns of text data, such as reverse geographic location information.
- **Underlying implementation**: Implemented based on a B-Tree or hash table, but with a reversal applied to the key values.
- **Reason for choice**: The reversed key values can optimise some specific query patterns, such as reverse geographic location information, helping improve query performance.
- **Example**: MySQL does not provide syntax such as `CREATE REVERSE INDEX` (that form cannot be executed in MySQL). For a similar effect, you can first generate a reversed column and then create an index on that column:

  ```sql
  ALTER TABLE table_name ADD COLUMN reversed_column VARCHAR(64) GENERATED ALWAYS AS (REVERSE(column_name)) STORED;
  CREATE INDEX idx_reverse_column ON table_name (reversed_column);
  ```

## 10. Clustered Index

- **Definition**: The physical storage order of the data table matches the order of the index; the primary key of a table is usually the clustered index.
- **Applicable scenarios**: Suitable for tables that need efficient range queries.
- **Underlying implementation**: Implemented based on a B+ Tree, with the physical storage order of the data table matching the order of the index.
- **Reason for choice**: A clustered index makes the physical order of the data match the order of the index, reducing disk I/O and improving query efficiency, especially suitable for range queries.
- **Example**: InnoDB's clustered index is determined by the table's primary key; **MySQL does not support syntax such as `CREATE CLUSTERED INDEX`** (that form cannot be executed in MySQL). The clustered index in InnoDB is created implicitly:

  ```sql
  -- The primary key is the clustered index; leaf nodes store the complete data row
  CREATE TABLE table_name (
      id INT PRIMARY KEY,
      column_name VARCHAR(64)
  );

  -- If the table has no primary key, InnoDB prefers the first non-null unique index as the clustered index;
  -- if neither exists, it automatically generates a hidden column DB_ROW_ID to build the clustered index
  ```

## Summary

Choosing the right index type can significantly improve the query performance and efficiency of a database. However, too many indexes increase the overhead of data modification operations, so when designing indexes you need to consider query requirements, data characteristics and performance needs comprehensively.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Indexes](https://dev.mysql.com/doc/refman/8.0/en/innodb-indexes.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
