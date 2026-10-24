# Database Schema

A database schema is the structured design of a database, used to describe how data is organised within it. It defines the tables, columns, data types, indexes, constraints and the relationships between them. Designing a database schema is an important step in building a database, helping to ensure data integrity, efficiency and maintainability.

## Main Components of a Database Schema

1. **Tables**
   - The basic unit of a database, used to store data. Each table is made up of rows (records) and columns (fields). Table design should follow normalization principles to reduce redundancy and dependencies.

2. **Columns**
   - Each column in a table represents an attribute or characteristic of the data. Columns should have defined data types and constraints, such as `VARCHAR`, `INT`, `DATE` and so on.

3. **Data Types**
   - Define the type of data stored in a column. Common data types include:
     - **Integer**: `INT`, `TINYINT`, `BIGINT`
     - **String**: `VARCHAR`, `CHAR`, `TEXT`
     - **Date**: `DATE`, `DATETIME`, `TIMESTAMP`
     - **Floating point**: `FLOAT`, `DOUBLE`, `DECIMAL`
     - **Boolean**: `BOOLEAN`

4. **Constraints**
   - Used to ensure data integrity and consistency. Common constraints include:
     - **PRIMARY KEY**: Uniquely identifies each row in the table.
     - **FOREIGN KEY**: Defines relationships between tables and ensures referential integrity.
     - **UNIQUE**: Ensures the values in a column are unique.
     - **NOT NULL**: Ensures a column cannot be empty.
     - **CHECK**: Ensures column values meet a specific condition.
     - **DEFAULT**: Sets a default value for a column.

5. **Indexes**
   - Used to speed up data retrieval. Indexes can be on a single column or multiple columns. Common index types include:
     - **Regular index (INDEX)**: A basic index used to speed up queries.
     - **Unique index (UNIQUE)**: Ensures the indexed column values are unique.
     - **Full-text index (FULLTEXT)**: Used for full-text search.
     - **Composite index (COMPOSITE)**: An index covering multiple columns.

6. **Views**
   - Virtual tables created by querying existing table data. Views can simplify complex queries and provide a layer of data security.

7. **Stored Procedures and Functions**
   - Programmable database objects used to encapsulate complex business logic. Stored procedures perform operations, while functions perform calculations and return values.

8. **Triggers**
   - Programs that execute automatically when an insert, update or delete operation occurs on a table. Triggers are used for automated tasks such as auditing or data validation.

## Steps of Schema Design

1. **Requirements Analysis**
   - Determine the business requirements, and understand the data types, data volumes and their relationships needed by the system.

2. **Conceptual Design**
   - Create an entity-relationship model (ER diagram), defining the main entities, attributes and their relationships.

3. **Logical Design**
   - Convert the ER diagram into a relational model, designing tables, columns and their constraints. This includes determining primary keys, foreign keys and indexes.

4. **Physical Design**
   - Implement the physical storage structure of the database, optimising performance and storage space. This includes choosing indexes and partitioning strategies.

5. **Implementation and Optimisation**
   - Create the database schema, insert test data, run queries and optimise performance. Make sure the database structure meets requirements and runs efficiently.

## Example

The following is a simple database schema design example:

1. **Customers table (Customers)**
   - **Columns**: CustomerID (primary key, INT), FirstName (VARCHAR), LastName (VARCHAR), Email (VARCHAR, unique), Phone (VARCHAR)

2. **Orders table (Orders)**
   - **Columns**: OrderID (primary key, INT), CustomerID (foreign key, INT), OrderDate (DATE), TotalAmount (DECIMAL)

3. **OrderItems table (OrderItems)**
   - **Columns**: OrderItemID (primary key, INT), OrderID (foreign key, INT), ProductName (VARCHAR), Quantity (INT), Price (DECIMAL)

4. **View example**
   - **View name**: CustomerOrdersView
   - **Definition**: A view showing customers and all of their orders.

5. **Stored procedure example**
   - **Procedure name**: `GetCustomerOrders`
   - **Function**: Retrieves all orders for a given customer ID.

6. **Trigger example**
   - **Trigger name**: `BeforeOrderInsert`
   - **Function**: Validates data integrity before an order is inserted.


## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)
- [INFORMATION_SCHEMA · SCHEMATA](https://dev.mysql.com/doc/refman/8.0/en/information-schema-schemata-table.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
