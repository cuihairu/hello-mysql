# Data Filtering and Conditions

In SQL queries, data filtering and conditions control what data is retrieved from the database. This is done with the `WHERE` clause, pattern matching, range queries and existence checks. Here are the main data filtering techniques:

## 1. The `WHERE` clause

**Purpose**: the `WHERE` clause specifies the conditions for retrieving data and returns only the rows that satisfy them.

**Syntax**:
```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

**Example**:
```sql
SELECT *
FROM employees
WHERE department = 'Sales';
```
*This query returns every employee record whose department is `'Sales'`.*

```sql
SELECT name, salary
FROM employees
WHERE salary > 50000;
```
*This query returns the names and salaries of employees with a salary above 50,000.*

## 2. Pattern matching (LIKE)

**Purpose**: the `LIKE` operator performs fuzzy matching and lets you find records that match a given pattern.

**Syntax**:
```sql
SELECT column1, column2, ...
FROM table_name
WHERE column LIKE pattern;
```

**Common wildcards**:
- `%`: zero or more characters.
- `_`: exactly one character.

**Example**:
```sql
SELECT name
FROM employees
WHERE name LIKE 'J%';
```
*This query returns every employee name that starts with `'J'`.*

```sql
SELECT email
FROM users
WHERE email LIKE '%@example.com';
```
*This query returns every user whose email address ends with `'@example.com'`.*

## 3. `IN` and `NOT IN`

**Purpose**: the `IN` and `NOT IN` operators check whether a value is in a given set of values.

**Syntax**:
```sql
SELECT column1, column2, ...
FROM table_name
WHERE column IN (value1, value2, ...);
```

**Example**:
```sql
SELECT name
FROM employees
WHERE department IN ('Sales', 'Marketing');
```
*This query returns every employee name whose department is `'Sales'` or `'Marketing'`.*

```sql
SELECT name
FROM employees
WHERE department NOT IN ('HR', 'Finance');
```
*This query returns every employee name whose department is neither `'HR'` nor `'Finance'`.*

## 4. `BETWEEN` and `NOT BETWEEN`

**Purpose**: `BETWEEN` and `NOT BETWEEN` retrieve rows within a given range.

**Syntax**:
```sql
SELECT column1, column2, ...
FROM table_name
WHERE column BETWEEN value1 AND value2;
```

**Example**:
```sql
SELECT name, salary
FROM employees
WHERE salary BETWEEN 40000 AND 60000;
```
*This query returns the names and salaries of employees with a salary between 40,000 and 60,000.*

```sql
SELECT name
FROM employees
WHERE hire_date NOT BETWEEN '2020-01-01' AND '2022-12-31';
```
*This query returns every employee hired outside the range from 2020-01-01 to 2022-12-31.*

## 5. `EXISTS` and `NOT EXISTS`

**Purpose**: `EXISTS` and `NOT EXISTS` check whether a subquery returns any rows.

**Syntax**:
```sql
SELECT column1, column2, ...
FROM table_name
WHERE EXISTS (subquery);
```

**Example**:
```sql
SELECT name
FROM employees e
WHERE EXISTS (
    SELECT 1
    FROM departments d
    WHERE d.manager_id = e.id
);
```
*This query returns the names of employees who manage a department.*

```sql
SELECT name
FROM employees e
WHERE NOT EXISTS (
    SELECT 1
    FROM projects p
    WHERE p.employee_id = e.id
);
```
*This query returns the names of employees who are not assigned to any project.*

## Summary

Data filtering and conditions are core operations in SQL queries; they limit the scope and precision of the results. With the `WHERE` clause, pattern matching, `IN`, `BETWEEN`, `EXISTS` and the like you can filter and retrieve data in complex ways and make sure you get exactly the rows you need from the database.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
