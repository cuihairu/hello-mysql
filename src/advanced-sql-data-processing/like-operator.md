### 模糊查询（LIKE）

`LIKE` 运算符用于在 SQL 查询中执行模糊匹配。它允许你根据指定的模式来查找数据，而不是要求精确匹配。`LIKE` 运算符常用于字符串数据类型的列，以匹配符合特定模式的记录。

#### 模糊查询的语法

```sql
SELECT column1, column2, ...
FROM table_name
WHERE column_name LIKE pattern;
```

- `column1, column2, ...`：要检索的列。
- `table_name`：要查询的表。
- `column_name`：要应用模式匹配的列。
- `pattern`：用于匹配的模式。

#### 通配符

`LIKE` 运算符使用以下通配符来定义匹配模式：

1. **百分号（%）**

   百分号表示任意数量的字符（包括零个字符）。

   - **匹配以特定字符开头的字符串**

     ```sql
     SELECT name
     FROM employees
     WHERE name LIKE 'J%';
     ```
     *此查询将返回所有名字以 `'J'` 开头的员工姓名。*

   - **匹配以特定字符结尾的字符串**

     ```sql
     SELECT email
     FROM users
     WHERE email LIKE '%@example.com';
     ```
     *此查询将返回所有电子邮件地址以 `'@example.com'` 结尾的用户记录。*

   - **匹配包含特定字符的字符串**

     ```sql
     SELECT name
     FROM employees
     WHERE name LIKE '%Smith%';
     ```
     *此查询将返回名字中包含 `'Smith'` 的员工姓名。*

2. **下划线（_）**

   下划线表示单个字符。

   - **匹配特定字符位置的单个字符**

     ```sql
     SELECT name
     FROM employees
     WHERE name LIKE 'J_n';
     ```
     *此查询将返回名字以 `'J'` 开头，接一个任意字符，然后是 `'n'` 的员工姓名。例如：`John`、`Jan`。*

   - **匹配特定字符位置的多个字符**

     ```sql
     SELECT name
     FROM employees
     WHERE name LIKE '_mith';
     ```
     *此查询将返回名字中以 `'mith'` 结尾，前面有一个任意字符的员工姓名。例如：`Smith`。*

#### 示例

1. **匹配以特定字符开头的字符串**

   ```sql
   SELECT product_name
   FROM products
   WHERE product_name LIKE 'Pro%';
   ```
   *此查询将返回所有产品名称以 `'Pro'` 开头的产品。*

2. **匹配包含特定字符的字符串**

   ```sql
   SELECT address
   FROM customers
   WHERE address LIKE '%Street%';
   ```
   *此查询将返回地址中包含 `'Street'` 的所有客户记录。*

3. **匹配特定字符位置的单个字符**

   ```sql
   SELECT phone_number
   FROM contacts
   WHERE phone_number LIKE '555-___-____';
   ```
   *此查询将返回所有电话号以 `'555-'` 开头，接一个任意的三位数字，后面是四位数字的联系人记录。*

#### 注意事项

- `LIKE` 运算符的性能可能会受到影响，特别是当数据表很大时，尤其是使用通配符 `%` 在模式的开头（例如 `%text`）时，因为数据库需要扫描整个表以找到匹配项。
- 使用 `LIKE` 运算符时，匹配模式的大小写取决于数据库的排序规则（collation）。在默认的排序规则下，`LIKE` 运算符通常是不区分大小写的。

#### 总结

`LIKE` 运算符是 SQL 中用于进行模糊查询的强大工具，通过使用通配符，可以灵活地匹配字符串数据。掌握 `LIKE` 的使用技巧，可以帮助你更精确地筛选和检索数据。