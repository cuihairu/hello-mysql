# Entities and Attributes

## Entity

### Definition

In database design, an entity refers to a specific object or concept that has an independent existence in the real world. Entities are usually nouns, such as "student", "order" or "product". Each entity corresponds to a data table in the database, used to store the data related to that entity.

### Characteristics of an Entity

1. **Uniqueness**: Each entity should have a unique identifier, usually implemented with a primary key.
2. **Abstraction**: An entity is an abstraction of an object or concept in the real world; it defines the basic structure of the data model.
3. **Instances**: An entity can have multiple instances. For example, a "user" entity can contain multiple user records.

### How to Represent an Entity

- In an ER diagram, an entity is represented by a rectangle. The entity name is written inside the rectangle, usually in singular form.

## Attribute

### Definition

An attribute is a characteristic or data item of an entity, used to describe specific information about it. For example, the entity "student" may have the attributes "student ID", "name" and "date of birth". Attributes are used to store the actual data of an entity.

### Types of Attributes

1. **Simple Attribute**:
   - An attribute that cannot be decomposed. For example, "name" or "product ID".

2. **Composite Attribute**:
   - An attribute that can be decomposed into multiple sub-attributes. For example, the attribute "address" can be decomposed into "street", "city" and "postal code".

3. **Multivalued Attribute**:
   - An attribute that can contain multiple values. For example, the attribute "phone number" can contain multiple phone numbers. Multivalued attributes are usually represented by a double-lined ellipse.

4. **Derived Attribute**:
   - An attribute whose value can be derived from other attributes. For example, "age" can be derived from "date of birth". Derived attributes are usually represented by a dashed ellipse.

5. **Key Attribute**:
   - An attribute that uniquely identifies entity instances. For example, "student ID" is the primary key attribute in the "student" entity, used to uniquely identify each student.

### How to Represent an Attribute

- In an ER diagram, an attribute is represented by an ellipse, connected to its entity by a straight line. The attribute name is written inside the ellipse.

## Examples of Entities and Attributes

### Example 1: Student Entity

- **Entity**: Student
- **Attributes**:
  - Student ID (primary key)
  - Name
  - Date of birth
  - Gender
  - Phone number (multivalued attribute)

### Example 2: Order Entity

- **Entity**: Order
- **Attributes**:
  - Order ID (primary key)
  - Order date
  - Customer ID (foreign key, referencing the Customer entity)
  - Total amount
  - Order status (derived attribute, possibly derived from order history)

## Design Principles for Entities and Attributes

1. **Identify Entities Clearly**: Determine which objects or concepts need to be modelled as entities, and make sure each entity has a clear meaning in the business context.
2. **Choose Attributes Accurately**: Select appropriate attributes for each entity, and make sure these attributes fully describe the entity's characteristics.
3. **Design the Primary Key**: Choose a suitable key attribute to uniquely identify each entity instance.
4. **Normalize the Design**: Avoid redundant data and keep attributes normalized, to improve the database's efficiency and consistency.
5. **Consider Future Extension**: When designing attributes, consider the system's future extensibility and maintainability.

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
