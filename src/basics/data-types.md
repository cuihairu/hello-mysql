### MySQL 基础知识：数据类型

在 MySQL 中，数据类型用于定义表中列的数据存储方式。正确选择数据类型可以提高数据库的性能和效率。以下是 MySQL 常用的数据类型分类和介绍：

#### 1. **数字类型**

- **整数类型**
  - `TINYINT`：1字节，范围从 -128 到 127 或 0 到 255。
  - `SMALLINT`：2字节，范围从 -32,768 到 32,767 或 0 到 65,535。
  - `MEDIUMINT`：3字节，范围从 -8,388,608 到 8,388,607 或 0 到 16,777,215。
  - `INT`：4字节，范围从 -2,147,483,648 到 2,147,483,647 或 0 到 4,294,967,295。
  - `BIGINT`：8字节，范围从 -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807 或 0 到 18,446,744,073,709,551,615。

- **浮点数类型**
  - `FLOAT`：4字节，单精度浮点数，约为 7 位有效数字。
  - `DOUBLE`：8字节，双精度浮点数，约为 15 位有效数字。

- **定点数类型**
  - `DECIMAL(M,D)`：存储精确的小数，`M` 是总位数，`D` 是小数位数。例如，`DECIMAL(10,2)` 表示总共 10 位，其中 2 位为小数位。

#### 2. **字符类型**

- **定长字符串**
  - `CHAR(M)`：固定长度字符串，`M` 是字符长度。长度不足时，使用空格填充。

- **变长字符串**
  - `VARCHAR(M)`：变长字符串，`M` 是最大长度。存储实际长度的字符，并且节省空间。

- **大文本类型**
  - `TEXT`：用于存储长文本数据，最大长度为 65,535 字节。
  - `MEDIUMTEXT`：用于存储中等长度的文本数据，最大长度为 16,777,215 字节。
  - `LONGTEXT`：用于存储非常长的文本数据，最大长度为 4,294,967,295 字节。

#### 3. **日期和时间类型**

- **日期类型**
  - `DATE`：存储日期，格式为 `YYYY-MM-DD`。

- **时间类型**
  - `TIME`：存储时间，格式为 `HH:MM:SS`。

- **日期时间类型**
  - `DATETIME`：存储日期和时间，格式为 `YYYY-MM-DD HH:MM:SS`。

- **时间戳类型**
  - `TIMESTAMP`：存储自 1970-01-01 00:00:00 UTC 以来的秒数，自动更新为当前时间戳（如果定义了）。

- **年类型**
  - `YEAR`：存储年份，格式为 `YYYY`。

#### 4. **布尔类型**

- **布尔类型**
  - `BOOLEAN`：布尔值，存储 `TRUE` 或 `FALSE`。在 MySQL 中，实际存储为 `TINYINT(1)`，`TRUE` 映射为 1，`FALSE` 映射为 0。

#### 5. **二进制类型**

- **定长二进制**
  - `BINARY(M)`：固定长度的二进制数据，`M` 是字节长度。

- **变长二进制**
  - `VARBINARY(M)`：变长的二进制数据，`M` 是最大字节长度。

- **大二进制数据**
  - `BLOB`：用于存储长二进制数据，最大长度为 65,535 字节。
  - `MEDIUMBLOB`：用于存储中等长度的二进制数据，最大长度为 16,777,215 字节。
  - `LONGBLOB`：用于存储非常长的二进制数据，最大长度为 4,294,967,295 字节。

选择合适的数据类型可以确保数据的准确性和数据库性能，同时也有助于节省存储空间。