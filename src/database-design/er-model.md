## 实体-关系模型（ER图）

### 什么是实体-关系模型
实体-关系模型（Entity-Relationship Model, ER模型）是一种用于数据库设计的高层次数据模型，它通过实体、属性和关系的形式来描述数据及其相互关系。ER图（Entity-Relationship Diagram）是实体-关系模型的图形化表示，用于直观地展示数据库的结构和设计。

### ER图的组成部分
1. **实体（Entity）**：
   - 实体是指现实世界中的对象或概念，通常是名词，如“用户”、“产品”等。
   - 在ER图中，实体用矩形表示。

2. **属性（Attribute）**：
   - 属性是实体的具体数据项，用于描述实体的特征，如“用户名”、“价格”等。
   - 在ER图中，属性用椭圆表示，连接到相应的实体。

3. **关系（Relationship）**：
   - 关系描述实体之间的关联，如“用户下订单”、“订单包含产品”等。
   - 在ER图中，关系用菱形表示，连接到参与的实体。

4. **键（Key）**：
   - 主键（Primary Key）：唯一标识实体实例的属性或属性组合。
   - 外键（Foreign Key）：用来在一个实体中引用另一个实体的主键，表示实体之间的关联。

### ER图的表示方法
1. **实体**：
   - 矩形表示实体，实体名称写在矩形内部。
   - 弱实体用双线矩形表示，表示其存在依赖于其他实体。

2. **属性**：
   - 椭圆表示属性，属性名称写在椭圆内部，并连接到相应的实体。
   - 多值属性用双线椭圆表示，表示一个实体实例可以有多个该属性的值。
   - 派生属性用虚线椭圆表示，表示其值可以从其他属性推导得出。

3. **关系**：
   - 菱形表示关系，关系名称写在菱形内部，并连接到参与的实体。
   - 关系的基数（Cardinality）表示参与实体的数量关系，如一对一、一对多、多对多等。

### ER图的示例
以下是一个简单的电商系统的ER图示例：

```mermaid
erDiagram
    USER {
        int userID PK
        string username
        string password
        string email
        datetime registrationDate
    }

    PRODUCT {
        int productID PK
        string name
        string description
        float price
        int stockQuantity
    }

    ORDER {
        int orderID PK
        int userID FK
        datetime orderDate
        float totalAmount
    }

    ORDERDETAIL {
        int detailID PK
        int orderID FK
        int productID FK
        int quantity
        float unitPrice
    }

    USER ||--o{ ORDER : places
    ORDER ||--o{ ORDERDETAIL : contains
    ORDERDETAIL ||--o{ PRODUCT : includes

```

### ER图设计的注意事项
1. **明确需求**：在绘制ER图前，确保对系统的业务需求有清晰的理解。
2. **精确表示**：实体、属性和关系的表示应尽量精确，避免歧义。
3. **保持简洁**：ER图应尽量简洁，避免不必要的复杂性，以便于理解和交流。
4. **规范命名**：使用统一的命名规范，确保实体、属性和关系名称的一致性和可读性。
