# BETWEEN and NOT BETWEEN

`BETWEEN` and `NOT BETWEEN` are range operators in SQL. They let you filter whether a value in a column falls inside, or outside, a given range.

## Syntax

```sql
SELECT column1, column2, ...
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

```sql
SELECT column1, column2, ...
FROM table_name
WHERE column_name NOT BETWEEN value1 AND value2;
```

- `column1, column2, ...`: the columns to retrieve.
- `table_name`: the table to query.
- `column_name`: the column the condition applies to.
- `value1` and `value2`: the two values that define the range, where `value1` is the lower bound and `value2` is the upper bound.

## The `BETWEEN` operator

`BETWEEN` selects rows where the column value falls inside the given range, including the boundary values.

### Examples

1. **Select dates within a range**

   ```sql
   SELECT order_id, order_date
   FROM orders
   WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';
   ```
   *This query returns every order whose order date falls between 2023-01-01 and 2023-12-31.*

2. **Select products within a price range**

   ```sql
   SELECT product_name, price
   FROM products
   WHERE price BETWEEN 50 AND 150;
   ```
   *This query returns every product with a price between 50 and 150, including products priced exactly 50 and 150.*

## The `NOT BETWEEN` operator

`NOT BETWEEN` selects rows where the column value falls outside the given range, that is, the data outside the range.

### Examples

1. **Exclude a date range**

   ```sql
   SELECT employee_id, hire_date
   FROM employees
   WHERE hire_date NOT BETWEEN '2020-01-01' AND '2022-12-31';
   ```
   *This query returns every employee whose hire date falls outside 2020-01-01 to 2022-12-31.*

2. **Exclude a price range**

   ```sql
   SELECT product_name, price
   FROM products
   WHERE price NOT BETWEEN 100 AND 200;
   ```
   *This query returns every product whose price is not between 100 and 200, excluding products priced 100 to 200.*

## Notes

- **Range boundaries**: `BETWEEN` and `NOT BETWEEN` are inclusive, so `BETWEEN value1 AND value2` includes both `value1` and `value2`. To exclude the boundaries, use other conditions such as `>` and `<`.

- **Boundaries on datetime types**: if the column is `DATETIME`/`TIMESTAMP`, `order_date BETWEEN '2023-01-01' AND '2023-12-31'` only matches up to `2023-12-31 00:00:00`, **so it misses the rest of December 31st**. Rewrite it as `order_date >= '2023-01-01' AND order_date < '2024-01-01'`.
  
- **Data type consistency**: make sure the values in `BETWEEN` and `NOT BETWEEN` match the data type of the column. A type mismatch can cause query errors or performance problems.

- **Performance**: `BETWEEN` and `NOT BETWEEN` are usually efficient for range queries, but on large datasets make sure the column has an appropriate index to keep query performance up.

## Summary

`BETWEEN` and `NOT BETWEEN` let you specify data ranges in SQL queries, which makes filtering more concise and readable. Used correctly, they let you retrieve or exclude data inside a specific range efficiently.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
