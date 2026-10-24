# Query Optimizer

The Query Optimizer is one of the core components of a database management system, responsible for analysing and optimising SQL queries to ensure efficient execution. Its main goal is to generate the optimal query execution plan, thereby improving query performance. The optimizer analyses different execution strategies and selects the most suitable one to execute the SQL query.

## 1. Functions of the optimizer

- **Generating execution plans**:
  - The optimizer analyses the SQL query and generates multiple execution plans. These plans define how to access the data, how to join tables and how to sort and filter data, and so on.

- **Selecting the optimal plan**:
  - The optimizer evaluates all generated execution plans and selects the most efficient one. The selection criteria typically include execution time, resource usage (such as CPU, memory, I/O) and the data access method.

- **Adjusting query performance**:
  - By selecting the best execution plan, the optimizer can significantly improve query performance, reducing query time and resource consumption.

## 2. Working mechanism of the optimizer

- **Parsing the SQL query**:
  - The optimizer first parses the SQL query and converts it into a logical query tree. This tree structure represents the logical order of the query, such as selection, projection, joining and so on.

- **Generating candidate execution plans**:
  - Based on the logical query tree, the optimizer generates multiple candidate execution plans. These plans may adopt different access methods and join strategies, such as full table scan, index scan, nested loop join, hash join and so on.

- **Estimating cost**:
  - For each candidate execution plan, the optimizer estimates its execution cost. Cost estimation is typically based on statistics such as table size, index selectivity and data distribution.

- **Selecting the best execution plan**:
  - The optimizer compares the cost of all candidate execution plans and selects the one with the lowest cost as the final execution plan. The optimizer may consider the actual execution environment and data distribution to ensure the selected plan performs well in actual execution.

## 3. Common optimisation strategies

- **Using indexes**:
  - The optimizer considers using indexes to speed up data retrieval. For example, for conditions in a WHERE clause, the optimizer prefers an index scan over a full table scan.

- **Optimising join order**:
  - For join operations involving multiple tables, the optimizer selects the optimal join order to reduce the size of intermediate result sets and the computational cost. For example, the optimizer may choose to join a small table first and then join with a large table.

- **Choosing the appropriate join algorithm**:
  - The optimizer selects an appropriate join algorithm, such as the Nested-Loop Join, the Block Nested-Loop Join (removed from MySQL 8.0.20) and the Hash Join (supported since MySQL 8.0.18, used for equality joins with no available index). Note that MySQL does not support the Sort-Merge Join.

- **Optimising query rewriting**:
  - The optimizer may rewrite the query, using an equivalent but more efficient SQL expression. For example, rewriting a subquery as a join operation, or pushing complex calculations to an earlier stage of the query.

## 4. Generation and execution of execution plans

- **Execution plan cache**:
  - Unlike some databases, **MySQL 8.0 has no global execution plan cache**: aside from prepared statements, which can reuse parsing results within a session, every SQL statement is optimised from scratch based on current statistics at execution time. Therefore there is no "plan cache invalidation" problem, and it is all the more important to keep statistics accurate.

- **Dynamic adjustment of execution plans**:
  - In some database systems, execution plans may be dynamically adjusted according to the actual data situation at runtime, adapting to changes in data distribution.

## 5. Optimizer configuration and tuning

- **Statistics**:
  - Ensure that statistics for database tables and indexes are up to date, so the optimizer can make accurate estimates. Updating statistics periodically can improve the quality of the optimizer's decisions.

- **Query analysis tools**:
  - Use the query analysis tools provided by the database (such as `EXPLAIN` or `EXPLAIN ANALYZE`) to view the execution plan of a query and optimisation suggestions. Analysing this information helps identify and resolve performance bottlenecks.

- **Configuration optimisation**:
  - Adjust database configuration parameters (such as memory allocation, cache size and concurrency level) to improve query performance. Adjusting these parameters according to the actual workload and system resources can effectively improve performance.

## Summary

The query optimizer is a critical component of a database management system, responsible for generating and selecting the optimal query execution plan to improve query performance. By understanding the optimizer's working mechanism and common optimisation strategies, users can design and optimise SQL queries better, thereby improving the overall performance of the database system.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · Optimizer Tracing](https://dev.mysql.com/doc/refman/8.0/en/optimizer-tracing.html)
- [MySQL 8.0 Reference Manual · Optimizer Hints](https://dev.mysql.com/doc/refman/8.0/en/optimizer-hints.html)
- [MySQL 8.0 Reference Manual · Optimizer Statistics](https://dev.mysql.com/doc/refman/8.0/en/optimizer-statistics.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
