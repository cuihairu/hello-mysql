# Advanced SQL and Data Processing

The topics I collect while working with advanced SQL and data processing: complex queries, aggregation and analysis, SQL functions, and filtering conditions.

## [Advanced SQL Queries](advanced-sql-queries.md)

Advanced querying covers complex queries, views, stored procedures and functions, triggers and cursors.

- **[Complex Queries (JOINs and Subqueries)](complex-queries.md)**

  Various ways to build complex queries, including the different JOIN types (INNER JOIN, LEFT JOIN, RIGHT JOIN and so on) and subquery techniques.

- **[Views](views.md)**

  What views are, how to create them, and how they simplify complex queries.

- **[Stored Procedures and Functions](stored-procedures-functions.md)**

  Defining, creating and using stored procedures and functions, including passing parameters and control-flow statements.

- **[Triggers](triggers.md)**

  What triggers are for, how to create them, and common use cases.

- **[Cursors](cursors.md)**

  What cursors are, how to use them, and where they come up in complex data operations.

## [Aggregation and Analysis](data-summarization-analysis.md)

Aggregation and analysis rely on aggregate functions, GROUP BY with HAVING, window functions and set operations.

- **[Aggregate Functions (SUM, AVG, COUNT, MIN, MAX)](aggregate-functions.md)**

  The common aggregate functions and the scenarios they fit.

- **[GROUP BY and HAVING](group-by-having.md)**

  How to group data with GROUP BY and filter the groups with HAVING.

- **[Window Functions](window-functions.md)**

  How to use OVER, PARTITION BY, ranking functions (ROW_NUMBER, RANK, DENSE_RANK), window frames and LAG/LEAD.

- **[Set Operations (UNION, INTERSECT, EXCEPT)](set-operations.md)**

  Combining result sets with UNION, INTERSECT and EXCEPT, and the differences between them.

## [SQL Functions](sql-functions.md)

A rundown of the common SQL function families: string, math, date and time, conditional and JSON.

- **[String Functions](string-functions.md)**

  Common string functions such as CONCAT, SUBSTRING and TRIM, and where they are used in data processing.

- **[Math Functions](math-functions.md)**

  Common math functions including ROUND, FLOOR and CEILING, and their role in data calculations.

- **[Date and Time Functions](date-time-functions.md)**

  Date and time functions such as NOW, DATE_ADD and DATEDIFF for working with time-related data.

- **[Conditional Functions (IF, CASE)](conditional-functions.md)**

  How to use IF and CASE, and where they come up in data processing.

- **[JSON Functions](json-functions.md)**

  Reading and writing JSON data: extraction with JSON_EXTRACT and `->` / `->>`, mutators like JSON_SET, unfolding with JSON_TABLE, and generated columns and multi-value indexes as optimisations.

## [Filtering and Conditions](data-filtering-conditions.md)

Common filtering and conditional query patterns, and how they affect retrieval.

- **[WHERE Clause](where-clause.md)**

  How to use WHERE and what it does when narrowing down data.

- **[LIKE Operator](like-operator.md)**

  Pattern matching with LIKE and its use in data matching.

- **[IN and NOT IN](in-not-in.md)**

  Using IN and NOT IN in queries.

- **[BETWEEN and NOT BETWEEN](between-not-between.md)**

  Using BETWEEN and NOT BETWEEN for range queries.

- **[EXISTS and NOT EXISTS](exists-not-exists.md)**

  Using EXISTS and NOT EXISTS for existence checks.

These pages record common patterns and trade-offs in advanced SQL queries and data processing.

---

- [Knowledge Notes](../knowledge.md) —— Core concepts, references, key points from the official docs, use cases and common pitfalls, all with in-site links.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)

## Related pages

- [advanced-sql-queries](advanced-sql-queries.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [advanced-sql-queries](advanced-sql-queries.md)
