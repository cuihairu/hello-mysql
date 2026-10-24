# Indexes

Indexes are a key structure in a database system used to improve data retrieval efficiency. By creating indexes on a table, you can greatly speed up data lookup operations, and also optimise query performance. The way indexes work is similar to a table of contents in a book: they help the database quickly locate the data it needs, without having to scan the entire data table.

## Basic concepts of indexes

- **Definition**: An index is a data structure that speeds up retrieval of data in a database table. An index usually involves one or more columns of a table, and is separate from the physical storage structure of the data table.

- **Purpose**: The main purpose of an index is to improve query efficiency, especially when retrieving from a large volume of data. It can also be used to speed up sorting and filtering operations, but it may also affect insert, update and delete operations, because these operations need to update the index in sync.

## Index types

1. **Single-column index**: An index that involves only one column of a table. The most commonly used index type.

   ```sql
   CREATE INDEX idx_column_name
   ON table_name (column_name);
   ```

2. **Multi-column index**: An index that involves multiple columns of a table. Also called a composite index. A multi-column index can optimise query conditions based on multiple columns.

   ```sql
   CREATE INDEX idx_multiple_columns
   ON table_name (column1, column2);
   ```

3. **Unique index**: Ensures that every value in the indexed column is unique. It is usually used to ensure data uniqueness.

   ```sql
   CREATE UNIQUE INDEX idx_unique_column
   ON table_name (column_name);
   ```

4. **Full-text index**: Used to optimise full-text search queries on text data. Suitable for scenarios requiring complex text search.

   ```sql
   CREATE FULLTEXT INDEX idx_fulltext_column
   ON table_name (column_name);
   ```

5. **Spatial index**: An index for geospatial data, suitable for queries related to geographic locations.

   ```sql
   CREATE SPATIAL INDEX idx_spatial_column
   ON table_name (column_name);
   ```

## Creating and managing indexes

- **Creating an index**: An index can be created when a table is created or afterwards, using the `CREATE INDEX` statement.

- **Dropping an index**: When an index is no longer needed or affects performance, it can be dropped using the `DROP INDEX` statement.

  ```sql
  DROP INDEX index_name ON table_name;
  ```

- **Viewing indexes**: You can query system tables or use tools provided by the database to view index information for a table.

  ```sql
  SHOW INDEX FROM table_name;
  ```

## Index optimisation

1. **Choose appropriate columns**: Indexes should be created on columns frequently used in query conditions, sorting or joins. Avoid creating indexes on columns that change frequently, because this increases the overhead of index maintenance.

2. **Avoid too many indexes**: Although indexes can improve query efficiency, too many indexes increase the overhead of data insert, update and delete. Therefore, you need to balance the number and type of indexes.

3. **Use covering indexes**: In some cases, you can create a covering index that includes all the columns needed by the query, avoiding access to the table data and improving query performance.

4. **Maintain regularly**: Optimise and rebuild indexes regularly to ensure index efficiency and performance.

## Performance impact of indexes

- **Query optimisation**: Indexes can significantly improve query speed, especially for complex queries on large data tables.

- **Update performance**: Although indexes speed up queries, every insert, update or delete on a table also needs to update the index, which may affect performance.

- **Storage space**: Indexes take up additional storage space, so storage overhead needs to be considered when designing indexes.

## Practical application

- **Choosing indexes**: When designing indexes, you typically decide the type and number of indexes based on the actual query patterns, data volume and how the table is used.

- **Tuning tools**: Many database management systems provide tools and commands to help analyse and optimise indexes, such as MySQL's `EXPLAIN` command, which helps understand the query plan and index usage.

Through reasonable index design and management, the performance of a database can be significantly improved, optimising query efficiency. Correctly understanding and applying indexes is key to database design and performance tuning.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Indexes](https://dev.mysql.com/doc/refman/8.0/en/innodb-indexes.html)
- [MySQL 8.0 Reference Manual · Optimising Indexes](https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
