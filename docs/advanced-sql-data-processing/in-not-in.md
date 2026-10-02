### IN 和 NOT IN

`IN` 和 `NOT IN` 是 SQL 中用于匹配多个值的操作符。这两个操作符可以简化对多个可能值的条件查询，而不需要使用多个 `OR` 条件。

#### 语法

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

- `column1, column2, ...`：要检索的列。
- `table_name`：要查询的表。
- `column_name`：要应用条件的列。
- `value1, value2, ...`：匹配的值列表。

#### `IN` 运算符

`IN` 运算符用于匹配列中的值是否在给定的一组值中。如果列的值在这些值列表中，则记录将被选中。

##### 示例

1. **匹配多个值**

   ```sql
   SELECT name, department
   FROM employees
   WHERE department IN ('Sales', 'Marketing', 'HR');
   ```
   *此查询将返回部门为 `'Sales'`、`'Marketing'` 或 `'HR'` 的所有员工记录。*

2. **与子查询结合使用**

   ```sql
   SELECT name
   FROM products
   WHERE category_id IN (SELECT category_id FROM categories WHERE category_name = 'Electronics');
   ```
   *此查询将返回所有属于 `Electronics` 类别的产品。子查询首先选择 `Electronics` 类别的 `category_id`，然后 `IN` 运算符用于匹配这些 `category_id`。*

#### `NOT IN` 运算符

`NOT IN` 运算符用于匹配列中的值是否不在给定的一组值中。如果列的值不在这些值列表中，则记录将被选中。

##### 示例

1. **排除多个值**

   ```sql
   SELECT name, position
   FROM employees
   WHERE position NOT IN ('Manager', 'Director');
   ```
   *此查询将返回职位不是 `'Manager'` 或 `'Director'` 的所有员工记录。*

2. **与子查询结合使用**

   ```sql
   SELECT name
   FROM products
   WHERE category_id NOT IN (SELECT category_id FROM categories WHERE category_name = 'Discontinued');
   ```
   *此查询将返回所有不属于 `Discontinued` 类别的产品。子查询首先选择 `Discontinued` 类别的 `category_id`，然后 `NOT IN` 运算符用于排除这些 `category_id`。*

#### 注意事项

- **空值处理**：如果 `IN` 或 `NOT IN` 的列表（含子查询结果）中包含 `NULL`，结果会受影响：
  - 对于 `IN`：只要列值能与列表中的某个非 `NULL` 值匹配，结果仍为 `TRUE`；只有在无法匹配任何非 `NULL` 值、又与 `NULL` 比较时结果才为 `NULL`（视为不成立）。
  - 对于 `NOT IN`：只要列表中存在 `NULL`，且列值不等于列表中的任何值，整个表达式的结果就是 `NULL`（而不是 `TRUE`），**该查询不会返回任何行**。因此子查询用于 `NOT IN` 时应显式排除 `NULL`（如加 `WHERE col IS NOT NULL`），或改用 `NOT EXISTS`。
  
- **性能考虑**：`IN` 和 `NOT IN` 运算符可以使查询更简洁，但在处理大量数据时，性能可能会受到影响。对于大数据量的情况，考虑使用索引或优化查询方式。

#### 总结

`IN` 和 `NOT IN` 运算符是用于在 SQL 查询中匹配多个值的有用工具。它们使得查询条件更简洁，并能够处理复杂的查询逻辑。正确使用这些操作符，可以提高查询的可读性和维护性。