# Query Rewriting and Optimization

Query rewriting and optimisation are important technical means for improving database performance; by modifying and optimising SQL query statements, you can significantly reduce query response time and resource consumption. Below are the details on query rewriting and optimisation.

## 1. Query Rewriting

Query rewriting refers to modifying an original SQL query statement in order to achieve higher performance. A rewritten query can make more effective use of indexes, reduce the amount of data scanned, lower complexity and so on.

### 1.1 Avoiding Full Table Scans

A full table scan is usually slower than an index scan. Therefore, you should try to avoid conditions in WHERE clauses that cannot make use of an index. For example:

- **Original query**:
  ```sql
  SELECT * FROM orders WHERE YEAR(order_date) = 2024;
  ```

- **Rewritten query**:
  ```sql
  SELECT * FROM orders WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';
  ```

The rewritten query uses a date range index and filters data more efficiently.

### 1.2 Avoiding `SELECT *`

`SELECT *` returns data for all columns, which may lead to unnecessary data transfer and processing. You should explicitly specify the columns you need:

- **Original query**:
  ```sql
  SELECT * FROM employees WHERE department_id = 1;
  ```

- **Rewritten query**:
  ```sql
  SELECT employee_id, first_name, last_name FROM employees WHERE department_id = 1;
  ```

### 1.3 Using Joins Instead of Subqueries

Subqueries can cause performance problems, especially when the query involves large amounts of data. Using join operations can improve query performance:

- **Original query** (using a subquery):
  ```sql
  SELECT employee_id, first_name
  FROM employees
  WHERE department_id IN (SELECT department_id FROM departments WHERE department_name = 'Sales');
  ```

- **Rewritten query** (using a join):
  ```sql
  SELECT e.employee_id, e.first_name
  FROM employees e
  JOIN departments d ON e.department_id = d.department_id
  WHERE d.department_name = 'Sales';
  ```

## 2. Query Optimization

Query optimisation means improving query efficiency by adjusting query statements and database configuration. The goal of optimisation is to reduce query execution time and resource consumption.

### 2.1 Using Indexes

Indexes are key to speeding up queries. Creating appropriate indexes can greatly improve query performance:

- **Single-column indexes**: create an index on a single column.
- **Composite indexes**: create a combined index on multiple columns to speed up multi-condition queries.

### 2.2 Analysing Execution Plans

Use the `EXPLAIN` command to analyse a query's execution plan, understand how MySQL executes the query, and identify performance bottlenecks:

- **Example**:
  ```sql
  EXPLAIN SELECT * FROM orders WHERE order_date = '2024-08-06';
  ```

`EXPLAIN` shows the query's execution plan, including the indexes used, the number of rows scanned and so on.

### 2.3 Optimising JOIN Operations

When joining multiple tables, optimising the order and conditions of JOIN operations can improve query performance:

- Make sure indexes are used to speed up the join conditions.
- If the query does not need to preserve rows from the joined table that have no matches, use INNER JOIN rather than LEFT JOIN/RIGHT JOIN: outer joins limit the optimiser's ability to reorder table joins and often bring extra sorting or intermediate-result overhead.

### 2.4 Reducing Sort and Grouping Operations

Sorting (`ORDER BY`) and grouping (`GROUP BY`) operations can consume large amounts of resources. Minimise the use of these operations, or create indexes on the relevant columns to improve efficiency.

- **Example**:
  ```sql
  SELECT department_id, COUNT(*) AS employee_count
  FROM employees
  GROUP BY department_id
  ORDER BY employee_count DESC;
  ```

### 2.5 Using Caches

MySQL 8.0 has removed the query cache; the caches available on the server side are mainly the InnoDB buffer pool (`innodb_buffer_pool_size`). Caching results of frequently run queries should be implemented at the application layer (such as Redis, Memcached), with a well-designed cache invalidation strategy.

## 3. Example

- **Original query**:
  ```sql
  SELECT * FROM orders WHERE customer_id = 123 AND order_status = 'shipped';
  ```

- **Rewritten query**:
  ```sql
  SELECT order_id, order_date, total_amount
  FROM orders
  WHERE customer_id = 123 AND order_status = 'shipped';
  ```

- **Using an index**:
  ```sql
  CREATE INDEX idx_customer_status ON orders (customer_id, order_status);
  ```

- **EXPLAIN analysis**:
  ```sql
  EXPLAIN SELECT order_id, order_date, total_amount
  FROM orders
  WHERE customer_id = 123 AND order_status = 'shipped';
  ```

## 4. Summary

Query rewriting and optimisation are key steps in improving database performance. By modifying and optimising SQL query statements, you can significantly improve query efficiency. Using indexes, analysing execution plans, optimising JOIN operations, reducing sorting and grouping operations and other methods can effectively improve database performance. Regularly rewriting and optimising queries is an important measure to ensure the database system runs efficiently.

## References

- [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [MySQL 8.0 Reference Manual · SELECT Optimization](https://dev.mysql.com/doc/refman/8.0/en/select-optimization.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
