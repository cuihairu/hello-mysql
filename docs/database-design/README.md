# Database Design

This section follows the order I use when working through database design: requirements analysis, conceptual and logical modeling, then physical design and scaling. Design decisions shape how efficient, reliable and maintainable the system turns out to be.

## [Overview](overview.md)

The basics of database design: goals, overall process and common challenges.

## [Requirements Analysis](requirements-analysis.md)

The steps and methods of requirements analysis: gathering and analysing user needs, defining data and functional requirements, and turning them into design specifications.

## [Conceptual Design](conceptual-design.md)

The main tasks and methods of conceptual design, including building the entity-relationship model (ER diagram) and defining entities, attributes and relationships.

- **[Entity-Relationship Model (ER Diagrams)](er-model.md)**

  How to build an ER diagram, the symbols used, and how entities, relationships and attributes are represented.

- **[Entities and Attributes](entities-attributes.md)**

  What entities and attributes are, how they appear in an ER diagram, and what to consider when choosing entity types and key attributes.

- **[Relationships and Joins](relationships-joins.md)**

  The different relationship types (one-to-many, many-to-many and so on), the idea of joins, and how they are shown in an ER diagram.

## [Logical Design](logical-design.md)

Turning a conceptual model into a logical one, including normalization and designing the database schema.

- **[Normalization and Denormalization](normalization-denormalization.md)**

  The principles and steps of normalization and the different normal forms. When and why to denormalize.

- **[Database Schema](database-schema.md)**

  What a database schema is and how to design it, including table structure, column definitions and constraints.

- **[Primary and Foreign Keys](primary-foreign-keys.md)**

  How primary and foreign keys work, and how they are used in table design to establish relationships between tables.

## [Physical Design](physical-design.md)

The physical implementation of the database — table and column design, index creation and so on — to optimise performance and storage efficiency.

- **[Table Design](table-design.md)**

  Principles of table design: how to determine structure, column attributes and constraints.

- **[Column Design](column-design.md)**

  Why column design matters: choosing data types, setting lengths and default values.

- **[Index Design](index-design.md)**

  What indexes do, what kinds exist, and how to design efficient indexes to improve query performance.

## [Performance and Scaling](performance-scaling.md)

Optimisation and scaling strategies: partitioning, sharding, vertical and horizontal splitting.

- **[Partitioning and Sharding](partitioning-sharding.md)**

  The basics of partitioning and sharding, how to implement them and when they apply, and how they improve performance and scalability.

- **[Vertical and Horizontal Splitting](vertical-horizontal-splitting.md)**

  Strategies for vertical and horizontal splitting, and how they are used to optimise architecture and performance.

---

- [Knowledge Notes](../knowledge.md) —— Core concepts, references, key points from the official docs, use cases and common pitfalls, all with in-site links.

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)

## Related pages

- [column-design](column-design.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [column-design](column-design.md)
