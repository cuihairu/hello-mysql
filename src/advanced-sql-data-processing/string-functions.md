### 字符串函数

字符串函数用于处理和操作字符串数据。在 SQL 中，常用的字符串函数包括字符串连接、子串提取、长度计算、大小写转换、空格修剪和替换等。以下是一些常用的字符串函数及其用法：

#### 1. `CONCAT()`

**功能**: 连接两个或多个字符串。

**语法**:
```sql
CONCAT(string1, string2, ...)
```

**示例**:
```sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM employees;
```
*此查询将 `first_name` 和 `last_name` 连接在一起，中间用空格隔开。*

#### 2. `SUBSTRING()` 或 `SUBSTR()`

**功能**: 从字符串中提取子字符串。

**语法**:
```sql
SUBSTRING(string, start, length)
```
或
```sql
SUBSTR(string, start, length)
```

**示例**:
```sql
SELECT SUBSTRING(description, 1, 50) AS short_description
FROM products;
```
*此查询从 `description` 字符串的第一个字符开始，提取长度为 50 的子字符串。*

#### 3. `LENGTH()` 或 `CHAR_LENGTH()`

**功能**: 返回字符串的长度（以字符为单位）。

**语法**:
```sql
LENGTH(string)
```
或
```sql
CHAR_LENGTH(string)
```

**示例**:
```sql
SELECT LENGTH(product_name) AS name_length
FROM products;
```
*此查询返回 `product_name` 的字符长度。*

#### 4. `UPPER()`

**功能**: 将字符串转换为大写字母。

**语法**:
```sql
UPPER(string)
```

**示例**:
```sql
SELECT UPPER(customer_name) AS uppercase_name
FROM customers;
```
*此查询将 `customer_name` 转换为大写。*

#### 5. `LOWER()`

**功能**: 将字符串转换为小写字母。

**语法**:
```sql
LOWER(string)
```

**示例**:
```sql
SELECT LOWER(product_code) AS lowercase_code
FROM products;
```
*此查询将 `product_code` 转换为小写。*

#### 6. `TRIM()`

**功能**: 去除字符串两端的空格。

**语法**:
```sql
TRIM(string)
```

**示例**:
```sql
SELECT TRIM(customer_name) AS trimmed_name
FROM customers;
```
*此查询去除 `customer_name` 字符串两端的空格。*

#### 7. `LTRIM()` 和 `RTRIM()`

**功能**: 分别去除字符串左侧和右侧的空格。

**语法**:
```sql
LTRIM(string)
```
```sql
RTRIM(string)
```

**示例**:
```sql
SELECT LTRIM(customer_name) AS left_trimmed_name
FROM customers;
```
*此查询去除 `customer_name` 字符串左侧的空格。*

```sql
SELECT RTRIM(customer_name) AS right_trimmed_name
FROM customers;
```
*此查询去除 `customer_name` 字符串右侧的空格。*

#### 8. `REPLACE()`

**功能**: 替换字符串中的指定子串。

**语法**:
```sql
REPLACE(string, old_substring, new_substring)
```

**示例**:
```sql
SELECT REPLACE(description, 'old', 'new') AS updated_description
FROM products;
```
*此查询将 `description` 中的所有 'old' 替换为 'new'。*

#### 9. `INSTR()`

**功能**: 返回子字符串首次出现的位置。

**语法**:
```sql
INSTR(string, substring)
```

**示例**:
```sql
SELECT INSTR(description, 'important') AS position
FROM products;
```
*此查询返回 'important' 在 `description` 中第一次出现的位置。*

#### 10. `LOCATE()`

**功能**: 查找子字符串首次出现的位置（类似于 `INSTR()`，但可以指定起始位置）。

**语法**:
```sql
LOCATE(substring, string, start)
```

**示例**:
```sql
SELECT LOCATE('important', description) AS position
FROM products;
```
*此查询返回 'important' 在 `description` 中首次出现的位置。*

#### 11. `FORMAT()`

**功能**: 格式化数值为字符串（常用于数值的货币格式）。

**语法**:
```sql
FORMAT(number, decimals)
```

**示例**:
```sql
SELECT FORMAT(price, 2) AS formatted_price
FROM products;
```
*此查询将 `price` 格式化为带有两位小数的字符串。*

### 总结

掌握这些字符串函数可以帮助你在 SQL 查询中有效地处理和操作字符串数据。通过字符串连接、子串提取、大小写转换、去除空格和替换等操作，你可以灵活地调整数据的显示和处理方式。