### 数据库和表的创建、修改与删除

#### 1. **创建数据库**
   - **概述**：创建一个新的数据库，用于存储数据。
   - **SQL命令**：
     ```sql
     CREATE DATABASE database_name;
     ```
   - **示例**：
     ```sql
     CREATE DATABASE mydatabase;
     ```
   - **注意事项**：确保数据库名称唯一且符合命名规范。

#### 2. **删除数据库**
   - **概述**：删除一个现有的数据库及其所有内容。
   - **SQL命令**：
     ```sql
     DROP DATABASE database_name;
     ```
   - **示例**：
     ```sql
     DROP DATABASE mydatabase;
     ```
   - **注意事项**：删除操作不可恢复，务必确认是否备份重要数据。

#### 3. **修改数据库**
   - **概述**：修改数据库的设置或属性。
   - **SQL命令**：
     ```sql
     ALTER DATABASE database_name CHARACTER SET = charset COLLATE = collation;
     ```
   - **示例**：
     ```sql
     ALTER DATABASE mydatabase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
     ```
   - **注意事项**：仅能修改数据库的字符集和排序规则等属性。

#### 4. **创建表**
   - **概述**：在数据库中创建一个新表，用于存储数据。
   - **SQL命令**：
     ```sql
     CREATE TABLE table_name (
       column1 datatype constraints,
       column2 datatype constraints,
       ...
     );
     ```
   - **示例**：
     ```sql
     CREATE TABLE mytable (
       id INT PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(255)
     );
     ```
   - **注意事项**：定义表的列名、数据类型和约束条件。

#### 5. **删除表**
   - **概述**：删除一个现有的表及其所有数据。
   - **SQL命令**：
     ```sql
     DROP TABLE table_name;
     ```
   - **示例**：
     ```sql
     DROP TABLE mytable;
     ```
   - **注意事项**：删除操作不可恢复，务必确认是否备份重要数据。

#### 6. **修改表**
   - **概述**：对现有表进行修改，例如添加或删除列。
   - **SQL命令**：
     ```sql
     ALTER TABLE table_name
     ADD column_name datatype constraints;
     
     ALTER TABLE table_name
     DROP COLUMN column_name;
     
     ALTER TABLE table_name
     MODIFY COLUMN column_name new_datatype;
     ```
   - **示例**：
     ```sql
     ALTER TABLE mytable
     ADD COLUMN age INT;
     
     ALTER TABLE mytable
     DROP COLUMN email;
     
     ALTER TABLE mytable
     MODIFY COLUMN name TEXT;
     ```
   - **注意事项**：修改表结构可能会影响现有数据和应用程序逻辑。