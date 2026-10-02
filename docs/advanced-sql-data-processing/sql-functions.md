### SQL函数

SQL 函数用于在查询中处理数据，以完成各种计算、转换和格式化任务。SQL 函数可以分为几种类型，包括字符串函数、数学函数、日期和时间函数，以及条件判断函数等。以下是各类 SQL 函数的详细介绍：

#### 1. 字符串函数

字符串函数用于处理和操作字符串数据。常见的字符串函数包括：

- **`CONCAT()`**: 连接两个或多个字符串。
  ```sql
  SELECT CONCAT(first_name, ' ', last_name) AS full_name
  FROM employees;
  ```

- **`SUBSTRING()`**: 从字符串中提取子字符串。
  ```sql
  SELECT SUBSTRING(description, 1, 50) AS short_description
  FROM products;
  ```

- **`LENGTH()`**: 返回字符串的长度。
  ```sql
  SELECT LENGTH(product_name) AS name_length
  FROM products;
  ```

- **`UPPER()`**: 将字符串转换为大写。
  ```sql
  SELECT UPPER(customer_name) AS uppercase_name
  FROM customers;
  ```

- **`LOWER()`**: 将字符串转换为小写。
  ```sql
  SELECT LOWER(product_code) AS lowercase_code
  FROM products;
  ```

- **`TRIM()`**: 去除字符串两端的空格。
  ```sql
  SELECT TRIM(customer_name) AS trimmed_name
  FROM customers;
  ```

- **`REPLACE()`**: 替换字符串中的指定子串。
  ```sql
  SELECT REPLACE(description, 'old', 'new') AS updated_description
  FROM products;
  ```

#### 2. 数学函数

数学函数用于执行各种数学计算。常见的数学函数包括：

- **`ABS()`**: 返回数值的绝对值。
  ```sql
  SELECT ABS(-100) AS absolute_value;
  ```

- **`ROUND()`**: 四舍五入一个数值到指定的小数位数。
  ```sql
  SELECT ROUND(price, 2) AS rounded_price
  FROM products;
  ```

- **`FLOOR()`**: 向下取整到最接近的整数。
  ```sql
  SELECT FLOOR(123.456) AS floored_value;
  ```

- **`CEILING()`**: 向上取整到最接近的整数。
  ```sql
  SELECT CEILING(123.456) AS ceiling_value;
  ```

- **`POWER()`**: 返回一个数的指定次幂。
  ```sql
  SELECT POWER(2, 3) AS power_result;
  ```

- **`SQRT()`**: 返回数值的平方根。
  ```sql
  SELECT SQRT(16) AS square_root;
  ```

#### 3. 日期和时间函数

日期和时间函数用于处理和操作日期和时间数据。常见的日期和时间函数包括：

- **`NOW()`**: 返回当前的日期和时间。
  ```sql
  SELECT NOW() AS current_datetime;
  ```

- **`CURDATE()`**: 返回当前的日期。
  ```sql
  SELECT CURDATE() AS current_date;
  ```

- **`CURTIME()`**: 返回当前的时间。
  ```sql
  SELECT CURTIME() AS current_time;
  ```

- **`DATE_ADD()`**: 向日期添加指定的时间间隔。
  ```sql
  SELECT DATE_ADD(order_date, INTERVAL 30 DAY) AS delivery_date
  FROM orders;
  ```

- **`DATEDIFF()`**: 计算两个日期之间的天数。
  ```sql
  SELECT DATEDIFF(NOW(), order_date) AS days_since_order
  FROM orders;
  ```

- **`DATE_FORMAT()`**: 格式化日期值。
  ```sql
  SELECT DATE_FORMAT(order_date, '%Y-%m-%d') AS formatted_date
  FROM orders;
  ```

- **`EXTRACT()`**: 提取日期部分，例如年、月、日等。
  ```sql
  SELECT EXTRACT(YEAR FROM order_date) AS order_year
  FROM orders;
  ```

#### 4. 条件判断函数

条件判断函数用于在查询中进行条件判断。常见的条件判断函数包括：

- **`IF()`**: 基于条件返回不同的值。
  ```sql
  SELECT IF(order_amount > 1000, 'High Value', 'Normal') AS order_type
  FROM orders;
  ```

- **`CASE`**: 根据多个条件返回不同的值。
  ```sql
  SELECT CASE
      WHEN status = 'A' THEN 'Active'
      WHEN status = 'I' THEN 'Inactive'
      ELSE 'Unknown'
  END AS status_description
  FROM users;
  ```

- **`NULLIF()`**: 如果两个表达式相等，返回 NULL，否则返回第一个表达式的值。
  ```sql
  SELECT NULLIF(discount, 0) AS non_zero_discount
  FROM sales;
  ```

- **`COALESCE()`**: 返回第一个非 NULL 的值。
  ```sql
  SELECT COALESCE(phone_number, 'No Phone Number') AS contact
  FROM customers;
  ```

### 总结

SQL 函数在数据处理、分析和报告中扮演着关键角色。了解和正确使用这些函数可以帮助你更有效地从数据库中提取和处理数据。通过合理利用字符串函数、数学函数、日期和时间函数以及条件判断函数，你可以实现复杂的数据操作和分析。