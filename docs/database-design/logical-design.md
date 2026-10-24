# Logical Design

Logical design is an important phase of database design. It defines the structure and relationships of the database without worrying about the concrete implementation details. The goal of logical design is to create a database model that can store and manage data effectively, while ensuring data integrity and consistency.

## Steps of Logical Design

1. **Convert the ER Diagram to a Relational Model**
   - Convert the entity-relationship model (ER diagram) into a relational model. Entities become tables, and relationships become associations between tables.
   - For example, the "user" entity in an ER diagram can be converted into a "user" table, and the "signup" relationship becomes an intermediate table linking users and events.

2. **Define the Table Structure**
   - Determine the columns (fields) of each table, the data types of the columns, and the constraints.
   - Each table needs a primary key to uniquely identify each row. Choose a suitable column as the primary key, or create a new one (usually an auto-incrementing ID).

3. **Normalize**
   - Normalization decomposes tables into smaller tables to reduce data redundancy and improve data integrity. Common normal forms include First Normal Form (1NF), Second Normal Form (2NF), Third Normal Form (3NF) and higher forms.
     - **First Normal Form (1NF)**: Every column in the table must be atomic, i.e. the values in a column cannot be further decomposed.
     - **Second Normal Form (2NF)**: On top of 1NF, eliminate partial dependencies, i.e. every non-primary-key column must fully depend on the whole primary key.
     - **Third Normal Form (3NF)**: On top of 2NF, eliminate transitive dependencies, i.e. dependencies between non-primary-key columns.
     - **BCNF (Boyce-Codd Normal Form)**: On top of 3NF, every determinant must be a candidate key.

4. **Determine Foreign Keys and Constraints**
   - Define foreign key constraints to ensure referential integrity of the data. Foreign keys maintain relationships between tables and keep the data across tables consistent.
   - Set other constraints such as unique, NOT NULL and CHECK constraints to guarantee data validity and integrity.

5. **Design Indexes**
   - Design indexes for tables based on query requirements and performance considerations. Indexes can speed up data retrieval, but also add storage overhead and update cost.
   - Determine which columns need indexes, considering primary key indexes, unique indexes and regular indexes.

## Logical Design Example

Suppose we design the logical model of a library management system, including the "book", "author" and "borrow record" entities.

1. **Table Structure**
   - **Books table (Books)**
     - `book_id` (primary key, auto-incrementing)
     - `title` (book title, string)
     - `author_id` (foreign key, referencing the Authors table)
     - `publication_year` (publication year, integer)

   - **Authors table (Authors)**
     - `author_id` (primary key, auto-incrementing)
     - `name` (author name, string)
     - `birthdate` (date of birth, date)

   - **BorrowRecords table (BorrowRecords)**
     - `record_id` (primary key, auto-incrementing)
     - `book_id` (foreign key, referencing the Books table)
     - `borrower_name` (borrower name, string)
     - `borrow_date` (borrow date, date)
     - `return_date` (return date, date, nullable)

2. **Foreign Keys and Constraints**
   - The `author_id` in the **Books table** is a foreign key to the **Authors table**, ensuring every book is associated with a valid author.
   - The `book_id` in the **BorrowRecords table** is a foreign key to the **Books table**, ensuring every borrow record is associated with a valid book.

3. **Index Design**
   - Create indexes on commonly queried fields such as `book_id`, `author_id` and `borrower_name` to improve query performance.
   - For example, create a regular index on the `title` field of the **Books table** to speed up searches by title.

## Principles of Logical Design

1. **Data Integrity**: Make sure all data conforms to the predefined constraints and rules, to maintain correctness.
2. **Data Consistency**: Make sure the data in the database is logically correct and consistent.
3. **Performance**: Consider data access efficiency during the design phase, and optimise table structures and indexes.
4. **Extensibility**: Consider the system's future extension needs during design, so the model can support data growth and business changes.


## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
