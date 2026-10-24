# Conditional Functions (IF, CASE)

Conditional functions implement conditional logic inside SQL queries. They can be used in `SELECT` queries, `WHERE` clauses and other SQL statements. MySQL provides two main conditional functions: `IF()` and `CASE`.

## 1. The `IF()` function

**Purpose**: returns a different value depending on a condition. It works like an `if-else` structure in a programming language.

**Syntax**:
```sql
IF(condition, true_value, false_value)
```

**Parameters**:
- `condition`: a boolean expression that decides which value to return.
- `true_value`: the value returned when the condition is true.
- `false_value`: the value returned when the condition is false.

**Example**:
```sql
SELECT 
    IF(5 > 3, 'True', 'False') AS result;
```
*This query returns `'True'`, because 5 is greater than 3.*

```sql
SELECT 
    name,
    IF(age >= 18, 'Adult', 'Minor') AS age_group
FROM 
    users;
```
*This query shows `'Adult'` or `'Minor'` based on each user's age.*

## 2. The `CASE` expression

**Purpose**: returns a different value for multiple conditions. The `CASE` expression is more flexible and works like a `switch-case` structure in a programming language.

**Syntax**:
```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ...
    ELSE default_result
END
```

**Parameters**:
- `WHEN condition THEN result`: the result returned when the condition is met.
- `ELSE default_result`: the default result returned when no condition is met (optional).

**Example**:
```sql
SELECT 
    name,
    CASE 
        WHEN age < 13 THEN 'Child'
        WHEN age BETWEEN 13 AND 19 THEN 'Teenager'
        WHEN age BETWEEN 20 AND 64 THEN 'Adult'
        ELSE 'Senior'
    END AS age_group
FROM 
    users;
```
*This query returns the matching age group for each age range: `'Child'`, `'Teenager'`, `'Adult'` or `'Senior'`.*

**Shorthand form**:
```sql
SELECT 
    name,
    CASE age
        WHEN 1 THEN 'Infant'
        WHEN 2 THEN 'Toddler'
        WHEN 3 THEN 'Preschool'
        ELSE 'School Age'
    END AS age_category
FROM 
    children;
```
*This query returns `'Infant'`, `'Toddler'`, `'Preschool'` or `'School Age'` based on the value in the `age` field.*

## 3. The `IFNULL()` and `COALESCE()` functions

**Purpose**: these two functions handle null values (NULL). `IFNULL()` handles two values only, while `COALESCE()` can handle many values.

- **`IFNULL(expression, alt_value)`**: returns `alt_value` if `expression` is NULL, otherwise returns `expression`.
- **`COALESCE(value1, value2, ..., valueN)`**: returns the first non-NULL value. If every value is NULL, it returns NULL.

**Example**:
```sql
SELECT 
    name,
    IFNULL(phone_number, 'No phone number') AS contact_number
FROM 
    users;
```
*This query shows `'No phone number'` when `phone_number` is NULL.*

```sql
SELECT 
    name,
    COALESCE(phone_number, email_address, 'No contact info') AS contact_info
FROM 
    users;
```
*This query prefers `phone_number`; if it is NULL it shows `email_address`; if both are NULL it shows `'No contact info'`.*

## Summary

Conditional functions implement complex logic in SQL queries. `IF()` and `CASE` offer flexible conditional expressions that return different values for different conditions. `IFNULL()` and `COALESCE()` handle and replace null values, keeping query results complete and accurate.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Flow Control Functions](https://dev.mysql.com/doc/refman/8.0/en/flow-control-functions.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
