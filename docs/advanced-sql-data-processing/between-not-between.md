### BETWEEN 和 NOT BETWEEN

`BETWEEN` 和 `NOT BETWEEN` 是 SQL 中用于指定范围的操作符。这些操作符使你能够筛选某列中的数据是否在指定的范围内或不在该范围内。

#### 语法

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

- `column1, column2, ...`：要检索的列。
- `table_name`：要查询的表。
- `column_name`：要应用条件的列。
- `value1` 和 `value2`：定义范围的两个值，其中 `value1` 是范围的下界，`value2` 是范围的上界。

#### `BETWEEN` 运算符

`BETWEEN` 运算符用于选取某列中的数据是否在指定的范围内，包括范围的边界值。

##### 示例

1. **选择范围内的日期**

   ```sql
   SELECT order_id, order_date
   FROM orders
   WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';
   ```
   *此查询将返回订单日期在 2023 年 1 月 1 日到 2023 年 12 月 31 日之间的所有订单。*

2. **选择价格范围内的产品**

   ```sql
   SELECT product_name, price
   FROM products
   WHERE price BETWEEN 50 AND 150;
   ```
   *此查询将返回价格在 50 到 150 之间的所有产品，包括价格为 50 和 150 的产品。*

#### `NOT BETWEEN` 运算符

`NOT BETWEEN` 运算符用于选取某列中的数据是否不在指定的范围内，即在范围之外的数据。

##### 示例

1. **排除某个日期范围**

   ```sql
   SELECT employee_id, hire_date
   FROM employees
   WHERE hire_date NOT BETWEEN '2020-01-01' AND '2022-12-31';
   ```
   *此查询将返回入职日期不在 2020 年 1 月 1 日到 2022 年 12 月 31 日之间的所有员工记录。*

2. **排除价格范围**

   ```sql
   SELECT product_name, price
   FROM products
   WHERE price NOT BETWEEN 100 AND 200;
   ```
   *此查询将返回价格不在 100 到 200 之间的所有产品，排除价格为 100 到 200 的产品。*

#### 注意事项

- **范围边界**：`BETWEEN` 和 `NOT BETWEEN` 是包含边界的，即 `BETWEEN value1 AND value2` 包括 `value1` 和 `value2`。如果需要排除边界值，则需要使用其他条件，如 `>` 和 `<`。
  
- **数据类型一致性**：确保 `BETWEEN` 和 `NOT BETWEEN` 中的值与列的数据类型一致。如果数据类型不匹配，可能会导致查询错误或性能问题。

- **性能考虑**：`BETWEEN` 和 `NOT BETWEEN` 运算符在范围查询时通常较为高效，但在处理大量数据时，确保列上有适当的索引以优化查询性能。

#### 总结

`BETWEEN` 和 `NOT BETWEEN` 运算符用于在 SQL 查询中指定数据范围，这使得筛选数据变得更加简洁和直观。正确使用这些操作符，可以有效地检索或排除在特定范围内的数据。