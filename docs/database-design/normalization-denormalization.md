# Normalization and Denormalization

## Normalization

Normalization is a technique in database design aimed at reducing data redundancy and improving data integrity. It is achieved by splitting data into multiple related tables and defining clear relationships between them. The common normal forms are:

1. **First Normal Form (1NF)**
   - Every column in the table must be atomic, i.e. the value of each column cannot be further decomposed. For example, every column can only contain a single data value, with no repeating groups or lists.

2. **Second Normal Form (2NF)**
   - On top of 1NF, eliminate partial dependencies in the table. Non-primary-key fields must fully depend on the whole primary key, not just part of it. This is usually applied to tables with composite primary keys.

3. **Third Normal Form (3NF)**
   - On top of 2NF, eliminate transitive dependencies in the table. There should be no dependencies between non-primary-key fields; each non-primary-key field should depend directly on the primary key.

4. **Boyce-Codd Normal Form (BCNF)**
   - A stricter form of 3NF. Every determinant must be a candidate key, i.e. the determinant of every functional dependency in the table must be a candidate key.

5. **Fourth Normal Form (4NF)**
   - Handles multivalued dependencies, ensuring every multivalued dependency in the table is split into separate tables to eliminate redundancy.

6. **Fifth Normal Form (5NF)**
   - Handles join dependencies, ensuring all join dependencies in the table are properly handled so the table can store data with minimal redundancy.

## Denormalization

Denormalization deliberately violates normalization rules to improve system performance or simplify queries. It is usually used in the following situations:

1. **Performance Optimisation**
   - Denormalization can reduce complex join operations and improve query performance. For example, storing redundant data in a single table to reduce joins across multiple tables.

2. **Simplifying Queries**
   - By pre-merging frequently used data into a single table, complex queries can be simplified and the data-processing complexity in the application reduced.

3. **Reducing the Number of Queries**
   - In high-frequency read scenarios, denormalization may be chosen to reduce the number of queries and improve the overall response speed of the system.

## Trade-offs Between Normalization and Denormalization

1. **Data Redundancy and Consistency**
   - Normalization reduces data redundancy and improves data consistency. Denormalization may increase redundancy but helps optimise performance.

2. **Query Performance**
   - Denormalization can improve query performance, especially when many join operations are required. However, this may come at the cost of data consistency.

3. **Maintenance Complexity**
   - A normalized database structure is usually more complex but helps maintain data integrity. A denormalized structure may simplify queries but increase maintenance difficulty.

4. **Storage Overhead**
   - Normalization usually reduces storage overhead, but may require more tables and join operations. Denormalization may increase storage overhead but reduces join operations.

## In Practice

In practice, database designers usually choose the right normalization and denormalization strategy based on the specific needs of the system. For applications requiring high data consistency (such as financial systems), normalization is usually prioritised. For applications requiring high query performance (such as big data analytics systems), moderate denormalization may be chosen.

## Example

Suppose we have a sales database; normalization and denormalization examples are as follows:

- **Normalization example**
  - Store customer information and order information in separate tables. The customers table contains basic customer information, and the orders table contains order details, linked by customer ID as a foreign key.

- **Denormalization example**
  - Store basic customer information directly in the orders table, rather than only the customer ID. This reduces the join operations needed when querying orders and improves query performance, at the cost of increased data redundancy.

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [knowledge](/knowledge.md)
