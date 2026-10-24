# IN and NOT IN

`IN` and `NOT IN` are SQL operators for matching against a list of values. They simplify conditional queries over multiple possible values, so you do not need a chain of `OR` conditions.

## Syntax

```sql
SELECT column1, column2, ...
FROM table_name
WHERE column_name IN (value1, value2, ...);
```

```sql
SELECT column1, column2, ...
FROM table_name
WHERE column_name NOT IN (value1, value2, ...);
```

- `column1, column2, ...`: the columns to retrieve.
- `table_name`: the table to query.
- `column_name`: the column the condition applies to.
- `value1, value2, ...`: the list of values to match against.

## The `IN` operator

`IN` matches whether a column value is in the given list of values. If the column value is in that list, the row is selected.

### Examples

1. **Match multiple values**

   ```sql
   SELECT name, department
   FROM employees
   WHERE department IN ('Sales', 'Marketing', 'HR');
   ```
   *This query returns every employee whose department is `'Sales'`, `'Marketing'` or `'HR'`.*

2. **Combined with a subquery**

   ```sql
   SELECT name
   FROM products
   WHERE category_id IN (SELECT category_id FROM categories WHERE category_name = 'Electronics');
   ```
   *This query returns every product in the `Electronics` category. The subquery first picks the `category_id` of the `Electronics` category, then the `IN` operator matches those `category_id` values.*

## The `NOT IN` operator

`NOT IN` matches whether a column value is not in the given list of values. If the column value is not in that list, the row is selected.

### Examples

1. **Exclude multiple values**

   ```sql
   SELECT name, position
   FROM employees
   WHERE position NOT IN ('Manager', 'Director');
   ```
   *This query returns every employee whose position is neither `'Manager'` nor `'Director'`.*

2. **Combined with a subquery**

   ```sql
   SELECT name
   FROM products
   WHERE category_id NOT IN (SELECT category_id FROM categories WHERE category_name = 'Discontinued');
   ```
   *This query returns every product not in the `Discontinued` category. The subquery first picks the `category_id` of the `Discontinued` category, then the `NOT IN` operator excludes those `category_id` values.*

## Notes

- **Null handling**: if the `IN` or `NOT IN` list (including the subquery result) contains `NULL`, the result is affected:
  - For `IN`: as long as the column value matches some non-`NULL` value in the list, the result is still `TRUE`; the result is `NULL` (treated as not matched) only when the value matches no non-`NULL` value and is compared against `NULL`.
  - For `NOT IN`: if the list contains `NULL` and the column value equals none of the values in the list, the whole expression evaluates to `NULL` (not `TRUE`), **and the query returns no rows at all**. So when a subquery feeds `NOT IN`, explicitly exclude `NULL` (for example add `WHERE col IS NOT NULL`), or switch to `NOT EXISTS`.
  
- **Performance**: `IN` and `NOT IN` keep queries concise, but on large datasets performance can suffer. For large data volumes, consider indexes or a different query formulation.

## Summary

`IN` and `NOT IN` are handy operators for matching against a list of values in SQL queries. They make query conditions more concise and can express complex query logic. Used correctly, they improve the readability and maintainability of your queries.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Subqueries](https://dev.mysql.com/doc/refman/8.0/en/subqueries.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
