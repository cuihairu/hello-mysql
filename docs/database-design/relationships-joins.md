# Relationships and Joins

## Relationship

### Definition

In database design, a relationship describes the association between entities. For example, in an event management system, the "user" and "event" entities can have a "signup" relationship, meaning a user signs up for an event.

### Types of Relationships

1. **One-to-One**:
   - One entity instance can only be associated with one other entity instance. For example, a "person" can only have one "passport", and each passport can only belong to one person.

2. **One-to-Many**:
   - One entity instance can be associated with multiple entity instances, but each associated entity instance can only be associated with one entity instance. For example, an "author" can publish multiple "articles", but each article has only one author.

3. **Many-to-Many**:
   - One entity instance can be associated with multiple entity instances, and vice versa. For example, a "user" can sign up for multiple "events", and each event can also have multiple users signed up. Many-to-many relationships are usually implemented through an intermediate entity.

### How to Represent a Relationship

- In an ER diagram, a relationship is represented by a diamond. The relationship name is written inside the diamond, and it is connected to the related entities with straight lines.

## Join

### Definition

A join is an operation that associates related data from two or more tables. Through joins, data from different tables can be combined in a query to obtain more meaningful information.

### Types of Joins

1. **INNER JOIN**:
   - Returns only the records that have matches in all the tables participating in the join. For example, returning all orders that have records in both the "orders" table and the "customers" table.

2. **LEFT JOIN**:
   - Returns all records from the left table, plus the matching records from the right table. If the right table has no match, the result shows NULL. For example, returning all customers and their orders, even if some customers have no orders.

3. **RIGHT JOIN**:
   - Returns all records from the right table, plus the matching records from the left table. If the left table has no match, the result shows NULL. For example, returning all orders and their customers, even if some orders have no customer.

4. **FULL JOIN**:
   - Returns all records from both the left and the right table. When neither the left nor the right table has a match, the result shows NULL. For example, returning all customers and all orders, including unmatched records. Note that MySQL does not support the `FULL JOIN` (`FULL OUTER JOIN`) syntax; you need to simulate it with `LEFT JOIN` and `RIGHT JOIN` combined with `UNION` (see Example 3 below).

5. **CROSS JOIN**:
   - Returns the Cartesian product of the left and right tables, i.e. each row of the left table is combined with each row of the right table in the result set. For example, returning all combinations of products and orders.

### Join Examples

#### Example 1: Inner Join

```sql
SELECT orders.order_id, customers.customer_name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id;
```
This query returns the order IDs and corresponding customer names for all orders that have been placed.

#### Example 2: Left Join

```sql
SELECT customers.customer_name, orders.order_id
FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id;
```
This query returns all customers and their corresponding order IDs, even if some customers have no orders.

#### Example 3: Full Join

MySQL does not support the `FULL JOIN` syntax; you can simulate a full outer join with `LEFT JOIN` and `RIGHT JOIN` combined with `UNION`:

```sql
SELECT a.id, b.value
FROM table1 a
LEFT JOIN table2 b ON a.id = b.id
UNION
SELECT a.id, b.value
FROM table1 a
RIGHT JOIN table2 b ON a.id = b.id;
```
This query returns all records from both tables: matching records are shown together, and non-matching records show NULL.

## Design Principles for Relationships and Joins

1. **Define Relationships Clearly**: Make sure all relationships between entities are clear and accurate in the business context.
2. **Choose the Right Join Type**: Select the appropriate join type based on the query requirements, to get the data you need.
3. **Optimize Join Performance**: When handling large-scale data, pay attention to the performance of join operations, and consider indexes and query optimisation.
4. **Keep Data Consistent**: Make sure relationships and joins do not lead to inconsistent data, and use appropriate constraints and rules to maintain data integrity.

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
- [MySQL 8.0 Reference Manual · Subqueries](https://dev.mysql.com/doc/refman/8.0/en/subqueries.html)
- [MySQL 8.0 Reference Manual · SELECT](https://dev.mysql.com/doc/refman/8.0/en/select.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
