# String Functions

String functions process and manipulate string data. The common string functions in SQL include concatenation, substring extraction, length calculation, case conversion, space trimming and replacement. Here are the common ones and how to use them:

## 1. `CONCAT()`

**Purpose**: join two or more strings together.

**Syntax**:
```sql
CONCAT(string1, string2, ...)
```

**Example**:
```sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM employees;
```
*This query joins `first_name` and `last_name` together, separated by a space.*

## 2. `SUBSTRING()` or `SUBSTR()`

**Purpose**: extract a substring from a string.

**Syntax**:
```sql
SUBSTRING(string, start, length)
```
or
```sql
SUBSTR(string, start, length)
```

**Example**:
```sql
SELECT SUBSTRING(description, 1, 50) AS short_description
FROM products;
```
*This query starts at the first character of the `description` string and extracts a substring of length 50.*

## 3. `LENGTH()` or `CHAR_LENGTH()`

**Purpose**: return the length of a string. Note the difference between the two: `LENGTH()` returns the number of **bytes** (affected by the character set — for example a Chinese character takes 3 bytes in UTF-8); `CHAR_LENGTH()` returns the number of **characters**.

**Syntax**:
```sql
LENGTH(string)
```
or
```sql
CHAR_LENGTH(string)
```

**Example**:
```sql
SELECT LENGTH(product_name) AS name_bytes,
       CHAR_LENGTH(product_name) AS name_chars
FROM products;
```
*This query returns the byte length and the character length of `product_name` respectively. For pure ASCII strings the two give the same result; when multi-byte characters such as Chinese are present, `LENGTH()` comes out larger than `CHAR_LENGTH()`.*

## 4. `UPPER()`

**Purpose**: convert a string to uppercase letters.

**Syntax**:
```sql
UPPER(string)
```

**Example**:
```sql
SELECT UPPER(customer_name) AS uppercase_name
FROM customers;
```
*This query converts `customer_name` to uppercase.*

## 5. `LOWER()`

**Purpose**: convert a string to lowercase letters.

**Syntax**:
```sql
LOWER(string)
```

**Example**:
```sql
SELECT LOWER(product_code) AS lowercase_code
FROM products;
```
*This query converts `product_code` to lowercase.*

## 6. `TRIM()`

**Purpose**: remove the spaces from both ends of a string.

**Syntax**:
```sql
TRIM(string)
```

**Example**:
```sql
SELECT TRIM(customer_name) AS trimmed_name
FROM customers;
```
*This query removes the leading and trailing spaces from the `customer_name` string.*

## 7. `LTRIM()` and `RTRIM()`

**Purpose**: remove the spaces from the left and the right of a string, respectively.

**Syntax**:
```sql
LTRIM(string)
```
```sql
RTRIM(string)
```

**Example**:
```sql
SELECT LTRIM(customer_name) AS left_trimmed_name
FROM customers;
```
*This query removes the leading spaces from the `customer_name` string.*

```sql
SELECT RTRIM(customer_name) AS right_trimmed_name
FROM customers;
```
*This query removes the trailing spaces from the `customer_name` string.*

## 8. `REPLACE()`

**Purpose**: replace a given substring inside a string.

**Syntax**:
```sql
REPLACE(string, old_substring, new_substring)
```

**Example**:
```sql
SELECT REPLACE(description, 'old', 'new') AS updated_description
FROM products;
```
*This query replaces every 'old' in `description` with 'new'.*

## 9. `INSTR()`

**Purpose**: return the position of the first occurrence of a substring.

**Syntax**:
```sql
INSTR(string, substring)
```

**Example**:
```sql
SELECT INSTR(description, 'important') AS position
FROM products;
```
*This query returns the position of the first occurrence of 'important' in `description`.*

## 10. `LOCATE()`

**Purpose**: find the position of the first occurrence of a substring (like `INSTR()`, but with an optional start position).

**Syntax**:
```sql
LOCATE(substring, string, start)
```

**Example**:
```sql
SELECT LOCATE('important', description) AS position
FROM products;
```
*This query returns the position of the first occurrence of 'important' in `description`.*

## 11. `FORMAT()`

**Purpose**: format a number as a string (often used for currency formatting).

**Syntax**:
```sql
FORMAT(number, decimals)
```

**Example**:
```sql
SELECT FORMAT(price, 2) AS formatted_price
FROM products;
```
*This query formats `price` as a string with two decimal places.*

## Summary

These string functions process string data inside SQL queries. With concatenation, substring extraction, case conversion, space trimming and replacement you can adjust how data is displayed and handled flexibly.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · String Functions](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
