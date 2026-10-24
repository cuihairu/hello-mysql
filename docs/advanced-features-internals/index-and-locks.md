# Indexes and Locks

In a database system, indexes and locks are two key concepts that significantly affect data access and concurrency control. Here I cover the relationship between indexes and locks, index optimisation strategies, and the difference in lock behaviour when an index is present versus absent.

## Basic concepts of indexes

An index is a data structure in a database used to speed up data retrieval. By creating an index on one or more columns, you can locate data quickly, reducing the scan range of a query and thereby improving query performance.

Common index types include:
- **B-Tree index**: Suitable for equality queries, range queries and sorting operations.
- **Hash index**: Suitable for equality queries, but does not support range queries.
- **Full-text index**: Suitable for text search, supporting fuzzy matching and full-text retrieval.
- **Spatial index**: Used for querying geospatial data, such as range queries on coordinate points.

## Basic concepts of locks

Locks are a mechanism a database uses to manage concurrent access. By locking, the database ensures data consistency and integrity when multiple transactions access concurrently. Common lock types include:
- **Row-level lock**: Locks specific rows, allowing higher concurrency.
- **Table-level lock**: Locks the entire table, suitable for bulk operations.
- **Page-level lock**: Locks a data page, intermediate between row-level and table-level locks (largely unused in MySQL 8.0's built-in storage engines — InnoDB and MyISAM provide only row-level or table-level locks).

## The relationship between indexes and locks

Indexes influence the granularity and scope of locks to a certain extent. By using an index, you can reduce the range of data locked, thereby improving concurrency and query performance.

**Queries with an index**:
- The query can use the index to locate rows, locking only the index records that match the query condition and the corresponding data rows.
- The lock granularity is finer, typically a row-level lock.

**Queries without an index**:
- The query needs to perform a full table scan, locking the entire table or most of the table's data rows.
- The lock granularity is coarser, possibly a table-level or page-level lock.

## Differences in locks with and without an index

1. **Lock scope**:
   - **With an index**: The query can use the index to locate rows, so the locked range is smaller. For example, it locks only the index records matching the query condition and the corresponding data rows.
   - **Without an index**: The query needs to perform a full table scan, so the locked range is larger, typically locking the entire table or most of the table's data rows.

2. **Lock granularity**:
   - **With an index**: The lock granularity is finer, and can be a row-level lock. An index query locks only the specific rows that satisfy the condition, avoiding locking unrelated rows and thereby improving concurrency.
   - **Without an index**: The lock granularity is coarser, possibly a table-level or page-level lock. A full table scan locks many data rows, reducing concurrency.

3. **Performance impact**:
   - **With an index**: The presence of an index can greatly reduce the number of rows locked and the time locks are held, improving query performance and the system's ability to handle concurrency.
   - **Without an index**: A full table scan needs to lock many rows and holds locks for longer, which can cause lock waits and performance degradation.

4. **Deadlock probability**:
   - **With an index**: Because the lock granularity is finer and fewer rows are locked, the probability of deadlocks is lower.
   - **Without an index**: Locking many rows or the entire table intensifies lock contention, raising the probability of deadlocks.

## Illustrative example

Suppose there is an `employees` table with fields `employee_id`, `name` and `department`.

**Query with an index**:
```sql
-- 创建索引
CREATE INDEX idx_employee_id ON employees(employee_id);

-- 执行查询
SELECT * FROM employees WHERE employee_id = 1234 FOR UPDATE;
```
In the query above, the `employee_id` column has an index, so the query uses the index to locate the specific row and locks that row; the lock granularity is a row-level lock.

**Query without an index**:
```sql
-- 执行查询
SELECT * FROM employees WHERE name = 'John Doe' FOR UPDATE;
```
If the `name` column has no index, the database needs to perform a full table scan to find matching rows. In InnoDB, this kind of locking read locks records along the scan path (under REPEATABLE READ this appears as next-key locks on almost every record), effectively locking far more rows than match the condition and greatly reducing concurrency.

## Index optimisation strategies

Index optimisation is key to improving database performance. Here are some common index optimisation strategies and practices:

1. **Choose the appropriate index type**:
   - Choose the right index type based on the query scenario, such as B-Tree index, hash index, full-text index and spatial index.

2. **Design indexes reasonably**:
   - A single-column index is suitable for queries on a single column; a multi-column index (composite index) is suitable for combination queries on multiple columns.
   - Avoid too many indexes; create indexes only for columns that are frequently queried or joined.
   - Use a covering index to include all the columns the query needs, avoiding a table lookup.

3. **Maintain and optimise existing indexes**:
   - Rebuild indexes periodically to optimise performance.
   - Update statistics to ensure the accuracy of query plans.
   - Use index compression to save storage space and improve cache efficiency.

4. **Use query optimisation tools**:
   - Use `EXPLAIN` to analyse the query plan and check index usage.
   - Enable the slow query log to analyse and optimise long-running queries.

5. **Avoid unnecessary indexes**:
   - Periodically review and drop indexes that are no longer used or are redundant.
   - Avoid creating indexes on columns with high update frequency.

6. **Consider database design**:
   - A reasonable database design can reduce the need for indexes. Normalisation helps eliminate redundant data, while denormalisation can improve read performance.
   - For large-scale data tables, consider a partitioning or sharding strategy to distribute data across multiple physical files or nodes, improving query performance.

## Summary

Indexes and locks play a critical role in a database. Through effective index optimisation strategies, database performance can be significantly improved, query time reduced, concurrency improved and system load lowered. At the same time, understanding the difference in locks with and without an index helps design and optimise the database better. Index optimisation is an ongoing process that needs to be adjusted according to changes in data, query patterns and system load.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)
- [MySQL 8.0 Reference Manual · InnoDB Lock Types](https://dev.mysql.com/doc/refman/8.0/en/innodb-locks-set.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
