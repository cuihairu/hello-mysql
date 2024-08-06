### 主键与外键

主键（Primary Key）和外键（Foreign Key）是关系数据库设计中两个非常重要的概念，用于确保数据的完整性和建立表之间的关系。

#### 主键（Primary Key）

**主键**是表中一个或多个字段的组合，这些字段的值唯一地标识表中的每一行。主键具有以下特点：

1. **唯一性**：主键字段的值在表中必须是唯一的，不能重复。每一行的数据都可以通过主键唯一标识。
2. **非空**：主键字段不能包含空值（NULL）。每一行都必须有一个有效的主键值。
3. **不可变**：主键值通常应保持不变，以避免数据一致性问题。

**示例**：
```sql
CREATE TABLE Customers (
    CustomerID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    PRIMARY KEY (CustomerID)
);
```
在这个示例中，`CustomerID` 是 `Customers` 表的主键。

#### 外键（Foreign Key）

**外键**是一个或多个字段，它们在一个表中引用另一个表的主键。外键用于建立表之间的关系，并确保引用的完整性。外键具有以下特点：

1. **参照完整性**：外键确保字段的值必须存在于被引用的表中，从而保持数据的一致性。
2. **可空性**：外键字段可以包含空值（NULL），这表示没有对相关表的约束。
3. **级联操作**：外键可以配置级联操作（如级联更新和级联删除），在主表中的记录被修改或删除时自动更新或删除相关的记录。

**示例**：
```sql
CREATE TABLE Orders (
    OrderID INT NOT NULL AUTO_INCREMENT,
    CustomerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    PRIMARY KEY (OrderID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
```
在这个示例中，`CustomerID` 是 `Orders` 表的外键，它引用了 `Customers` 表的 `CustomerID` 主键。

#### 主键与外键的关系

1. **一对多关系**：
   - 在一对多关系中，主表（父表）的主键被引用为从表（子表）的外键。例如，一个客户可以有多个订单，但每个订单只能属于一个客户。`Customers` 表的主键 `CustomerID` 被 `Orders` 表作为外键引用。

2. **多对多关系**：
   - 在多对多关系中，通常使用一个关联表来表示两个表之间的关系。关联表包含两个外键，分别引用两个主表的主键。例如，`Students` 和 `Courses` 表之间的多对多关系可以通过一个 `Enrollments` 表来表示，其中包含 `StudentID` 和 `CourseID` 两个外键。

**示例**：
```sql
CREATE TABLE Students (
    StudentID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(100),
    PRIMARY KEY (StudentID)
);

CREATE TABLE Courses (
    CourseID INT NOT NULL AUTO_INCREMENT,
    CourseName VARCHAR(100),
    PRIMARY KEY (CourseID)
);

CREATE TABLE Enrollments (
    EnrollmentID INT NOT NULL AUTO_INCREMENT,
    StudentID INT,
    CourseID INT,
    PRIMARY KEY (EnrollmentID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);
```
在这个示例中，`Enrollments` 表的 `StudentID` 和 `CourseID` 分别是 `Students` 表和 `Courses` 表的外键，用于建立多对多关系。

#### 总结

- **主键**：唯一标识表中的每一行数据，必须唯一且不能为空。
- **外键**：引用其他表的主键，确保数据的完整性并建立表之间的关系。

主键和外键的正确使用对于数据库的设计和数据一致性至关重要。它们帮助维护数据的结构化和完整性，并在不同的表之间建立有效的关系。