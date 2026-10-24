# SQL Functions

SQL functions process data inside queries to do calculations, conversions and formatting. They fall into several categories, including string functions, math functions, date and time functions, and conditional functions. Here is the rundown by category:

## 1. String functions

String functions process and manipulate string data. The common ones include:

- **`CONCAT()`**: joins two or more strings together.
  ```sql
  SELECT CONCAT(first_name, ' ', last_name) AS full_name
  FROM employees;
  ```

- **`SUBSTRING()`**: extracts a substring from a string.
  ```sql
  SELECT SUBSTRING(description, 1, 50) AS short_description
  FROM products;
  ```

- **`LENGTH()`**: returns the length of a string.
  ```sql
  SELECT LENGTH(product_name) AS name_length
  FROM products;
  ```

- **`UPPER()`**: converts a string to uppercase.
  ```sql
  SELECT UPPER(customer_name) AS uppercase_name
  FROM customers;
  ```

- **`LOWER()`**: converts a string to lowercase.
  ```sql
  SELECT LOWER(product_code) AS lowercase_code
  FROM products;
  ```

- **`TRIM()`**: removes the spaces from both ends of a string.
  ```sql
  SELECT TRIM(customer_name) AS trimmed_name
  FROM customers;
  ```

- **`REPLACE()`**: replaces a given substring inside a string.
  ```sql
  SELECT REPLACE(description, 'old', 'new') AS updated_description
  FROM products;
  ```

## 2. Math functions

Math functions perform various arithmetic calculations. The common ones include:

- **`ABS()`**: returns the absolute value of a number.
  ```sql
  SELECT ABS(-100) AS absolute_value;
  ```

- **`ROUND()`**: rounds a number to a given number of decimal places.
  ```sql
  SELECT ROUND(price, 2) AS rounded_price
  FROM products;
  ```

- **`FLOOR()`**: rounds down to the nearest integer.
  ```sql
  SELECT FLOOR(123.456) AS floored_value;
  ```

- **`CEILING()`**: rounds up to the nearest integer.
  ```sql
  SELECT CEILING(123.456) AS ceiling_value;
  ```

- **`POWER()`**: returns a number raised to a given power.
  ```sql
  SELECT POWER(2, 3) AS power_result;
  ```

- **`SQRT()`**: returns the square root of a number.
  ```sql
  SELECT SQRT(16) AS square_root;
  ```

## 3. Date and time functions

Date and time functions process and manipulate date and time data. The common ones include:

- **`NOW()`**: returns the current date and time.
  ```sql
  SELECT NOW() AS current_datetime;
  ```

- **`CURDATE()`**: returns the current date.
  ```sql
  SELECT CURDATE() AS current_date;
  ```

- **`CURTIME()`**: returns the current time.
  ```sql
  SELECT CURTIME() AS current_time;
  ```

- **`DATE_ADD()`**: adds a time interval to a date.
  ```sql
  SELECT DATE_ADD(order_date, INTERVAL 30 DAY) AS delivery_date
  FROM orders;
  ```

- **`DATEDIFF()`**: counts the days between two dates.
  ```sql
  SELECT DATEDIFF(NOW(), order_date) AS days_since_order
  FROM orders;
  ```

- **`DATE_FORMAT()`**: formats a date value.
  ```sql
  SELECT DATE_FORMAT(order_date, '%Y-%m-%d') AS formatted_date
  FROM orders;
  ```

- **`EXTRACT()`**: extracts a date part, such as year, month or day.
  ```sql
  SELECT EXTRACT(YEAR FROM order_date) AS order_year
  FROM orders;
  ```

## 4. Conditional functions

Conditional functions make decisions inside a query. The common ones include:

- **`IF()`**: returns a different value depending on a condition.
  ```sql
  SELECT IF(order_amount > 1000, 'High Value', 'Normal') AS order_type
  FROM orders;
  ```

- **`CASE`**: returns a different value for multiple conditions.
  ```sql
  SELECT CASE
      WHEN status = 'A' THEN 'Active'
      WHEN status = 'I' THEN 'Inactive'
      ELSE 'Unknown'
  END AS status_description
  FROM users;
  ```

- **`NULLIF()`**: returns NULL if the two expressions are equal, otherwise returns the first expression.
  ```sql
  SELECT NULLIF(discount, 0) AS non_zero_discount
  FROM sales;
  ```

- **`COALESCE()`**: returns the first non-NULL value.
  ```sql
  SELECT COALESCE(phone_number, 'No Phone Number') AS contact
  FROM customers;
  ```

## Summary

SQL functions play a key role in data processing, analysis and reporting. They extract and transform the data in your database. Using string functions, math functions, date and time functions and conditional functions well lets you carry out complex data operations and analysis.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Function Reference](https://dev.mysql.com/doc/refman/8.0/en/functions.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
