# Conceptual Design

## What Is Conceptual Design

Conceptual design is the step in database design that turns requirements analysis into a high-level data model. Its main purpose is to define the core data structures of the database system and their relationships, laying the ground for the subsequent logical and physical design.

## Steps of Conceptual Design

1. **Identify Entities**: Identify the main entities in the system. Entities usually represent important objects or concepts in the business, such as users, orders and products.
2. **Define Attributes**: Define the attributes for each entity. Attributes are the specific data items of an entity, such as username, password and email for a user entity.
3. **Identify Relationships**: Determine the relationships between entities, including one-to-one, one-to-many and many-to-many, and clarify the nature of the relationship and its participants.
4. **Draw the ER Diagram**: Use an entity-relationship diagram (ER diagram) to represent entities, attributes and relationships visually, to help understanding and communication of the data model.

## What Conceptual Design Covers

1. **Entities and Their Attributes**:
   - **Entity**: Defines the main objects or concepts in the business.
   - **Attribute**: Defines the specific data items of an entity. Each attribute should have a unique name and a clear data type.
2. **Relationships Between Entities**:
   - **Relationship Types**: Including one-to-one, one-to-many and many-to-many.
   - **Relationship Attributes**: Define the participating entities and attributes in a relationship.
3. **ER Diagram**:
   - **Entity Symbol**: A rectangle represents an entity, a double-lined rectangle represents a weak entity.
   - **Relationship Symbol**: A diamond represents a relationship, connecting lines represent associations between entities.
   - **Attribute Symbol**: An ellipse represents an attribute, a double-lined ellipse represents a multivalued attribute, a dashed ellipse represents a derived attribute.

## Things to Watch Out For

1. **Accuracy**: Make sure the definitions of entities, attributes and relationships are correct and match the actual business.
2. **Completeness**: Cover all important business objects and data items, and avoid omissions.
3. **Clarity**: The ER diagram should be concise and clear, to make it easy to understand and communicate.
4. **Consistency**: Keep the design consistent, and avoid contradictions and duplication across different parts.

## Example: Conceptual Design of an E-commerce System

1. **Entities**:
   - User: username, password, email, registration date.
   - Product: product ID, name, description, price, stock quantity.
   - Order: order ID, user ID, order date, total amount.
   - OrderDetail: order detail ID, order ID, product ID, quantity, unit price.
2. **Relationships**:
   - User to Order: one-to-many relationship, one user can have multiple orders.
   - Order to OrderDetail: one-to-many relationship, one order can contain multiple order details.
   - Product to OrderDetail: one-to-many relationship, one product can appear in multiple order details, but one order detail only contains one product. (The many-to-many relationship between User and Product is broken down and implemented through these two tables, Order and OrderDetail.)
3. **ER Diagram**:

   ```plaintext
   用户 (User)
   -----------
   - 用户ID (UserID)
   - 用户名 (Username)
   - 密码 (Password)
   - 邮箱 (Email)
   - 注册日期 (RegistrationDate)

   产品 (Product)
   -------------
   - 产品ID (ProductID)
   - 名称 (Name)
   - 描述 (Description)
   - 价格 (Price)
   - 库存数量 (StockQuantity)

   订单 (Order)
   ------------
   - 订单ID (OrderID)
   - 用户ID (UserID)
   - 订单日期 (OrderDate)
   - 总金额 (TotalAmount)

   订单明细 (OrderDetail)
   ---------------------
   - 订单明细ID (OrderDetailID)
   - 订单ID (OrderID)
   - 产品ID (ProductID)
   - 数量 (Quantity)
   - 单价 (UnitPrice)

   关系:
   用户 (1) -- (n) 订单
   订单 (1) -- (n) 订单明细
   产品 (1) -- (n) 订单明细
   ```

## References

- [MySQL 8.0 Reference Manual · Database Objects](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
