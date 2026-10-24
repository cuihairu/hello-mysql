# EXISTS and NOT EXISTS

`EXISTS` and `NOT EXISTS` are SQL operators that test whether a subquery produces a result. They are especially useful with nested queries, when you need to know whether rows matching a condition exist.

## Syntax

```sql
-- EXISTS
SELECT column1, column2, ...
FROM table_name
WHERE EXISTS (subquery);

-- NOT EXISTS
SELECT column1, column2, ...
FROM table_name
WHERE NOT EXISTS (subquery);
```

- `column1, column2, ...`: the columns to retrieve.
- `table_name`: the table to query.
- `subquery`: the nested subquery.

## The `EXISTS` operator

`EXISTS` tests whether the subquery returns at least one row. If the subquery returns at least one row, `EXISTS` returns `TRUE`; otherwise it returns `FALSE`.

### Examples

1. **Check for order records**

   ```sql
   SELECT customer_name
   FROM customers
   WHERE EXISTS (
       SELECT 1
       FROM orders
       WHERE orders.customer_id = customers.customer_id
   );
   ```
   *This query returns every customer who has at least one order. The subquery checks whether an order record exists for the customer.*

2. **Find products that have reviews**

   ```sql
   SELECT product_name
   FROM products
   WHERE EXISTS (
       SELECT 1
       FROM reviews
       WHERE reviews.product_id = products.product_id
   );
   ```
   *This query returns every product name that has at least one review. The subquery checks whether a review record exists for the product.*

## The `NOT EXISTS` operator

`NOT EXISTS` tests whether the subquery returns no rows. If the subquery returns no rows, `NOT EXISTS` returns `TRUE`; otherwise it returns `FALSE`.

### Examples

1. **Find customers with no orders**

   ```sql
   SELECT customer_name
   FROM customers
   WHERE NOT EXISTS (
       SELECT 1
       FROM orders
       WHERE orders.customer_id = customers.customer_id
   );
   ```
   *This query returns every customer name with no orders at all. The subquery checks whether any order record exists for the customer.*

2. **Find products with no reviews**

   ```sql
   SELECT product_name
   FROM products
   WHERE NOT EXISTS (
       SELECT 1
       FROM reviews
       WHERE reviews.product_id = products.product_id
   );
   ```
   *This query returns every product name with no reviews. The subquery checks whether any review record exists for the product.*

## Notes

- **Subquery performance**: `EXISTS` and `NOT EXISTS` subqueries usually perform the same whether you use `SELECT 1` or `SELECT *`. What matters is whether the subquery returns a result, not what it contains. Appropriate indexes on the subquery improve performance.
  
- **Compared with `IN`**: in MySQL 8.0 the optimizer usually rewrites `IN` subqueries into a semi-join or another more efficient plan, so `IN` and `EXISTS` often perform on par and you cannot simply say one is always faster. The real difference is null handling: once a `NOT IN` subquery returns `NULL` the whole query can return a wrong result (no rows at all), while `NOT EXISTS` is unaffected by `NULL` and has more straightforward semantics. Prefer `NOT EXISTS`.

- **Logic**: `EXISTS` and `NOT EXISTS` are used to test whether rows matching some condition exist, and they are particularly useful when checking whether a relationship exists.

## Summary

`EXISTS` and `NOT EXISTS` test whether a subquery returns a result. In SQL queries they handle complex data relationships and condition checks, giving queries more flexibility and expressive power. Used correctly, they detect row existence efficiently and keep the retrieval logic clean.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Subqueries](https://dev.mysql.com/doc/refman/8.0/en/subqueries.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
