# Pattern Matching (LIKE)

The `LIKE` operator performs fuzzy matching in SQL queries. It lets you find data against a given pattern instead of requiring an exact match. `LIKE` is usually applied to string columns to match records that fit a specific pattern.

## LIKE syntax

```sql
SELECT column1, column2, ...
FROM table_name
WHERE column_name LIKE pattern;
```

- `column1, column2, ...`: the columns to retrieve.
- `table_name`: the table to query.
- `column_name`: the column the pattern matching applies to.
- `pattern`: the pattern to match against.

## Wildcards

The `LIKE` operator uses the following wildcards to define matching patterns:

1. **Percent sign (%)**

   The percent sign stands for any number of characters, including zero characters.

   - **Match strings that start with specific characters**

     ```sql
     SELECT name
     FROM employees
     WHERE name LIKE 'J%';
     ```
     *This query returns every employee name that starts with `'J'`.*

   - **Match strings that end with specific characters**

     ```sql
     SELECT email
     FROM users
     WHERE email LIKE '%@example.com';
     ```
     *This query returns every user whose email address ends with `'@example.com'`.*

   - **Match strings that contain specific characters**

     ```sql
     SELECT name
     FROM employees
     WHERE name LIKE '%Smith%';
     ```
     *This query returns every employee name containing `'Smith'`.*

2. **Underscore (_)**

   The underscore stands for a single character.

   - **Match a single character at a specific position**

     ```sql
     SELECT name
     FROM employees
     WHERE name LIKE 'J_n';
     ```
     *This query returns every employee name that starts with `'J'`, followed by any single character, then `'n'`. For example: `John`, `Jan`.*

   - **Match multiple characters at specific positions**

     ```sql
     SELECT name
     FROM employees
     WHERE name LIKE '_mith';
     ```
     *This query returns every employee name ending in `'mith'` with one character in front of it. For example: `Smith`.*

## Examples

1. **Match strings that start with specific characters**

   ```sql
   SELECT product_name
   FROM products
   WHERE product_name LIKE 'Pro%';
   ```
   *This query returns every product whose name starts with `'Pro'`.*

2. **Match strings that contain specific characters**

   ```sql
   SELECT address
   FROM customers
   WHERE address LIKE '%Street%';
   ```
   *This query returns every customer record whose address contains `'Street'`.*

3. **Match a single character at a specific position**

   ```sql
   SELECT phone_number
   FROM contacts
   WHERE phone_number LIKE '555-___-____';
   ```
   *This query returns every contact record whose phone number starts with `'555-'`, followed by any three digits, then four digits.*

## Notes

- `LIKE` performance can suffer, especially on very large tables, particularly when the wildcard `%` sits at the start of the pattern (for example `%text`), because the database has to scan the whole table to find matches.
- With `LIKE`, the case sensitivity of the match depends on the database collation. Under the default collation, `LIKE` is usually case-insensitive.

## Summary

`LIKE` is a powerful tool for fuzzy matching in SQL. Combined with wildcards it matches string data flexibly, and lets you filter and retrieve data by string pattern.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
