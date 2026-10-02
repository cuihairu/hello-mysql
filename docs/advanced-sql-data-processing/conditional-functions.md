### 条件判断函数（IF, CASE）

条件判断函数用于在 SQL 查询中实现条件逻辑，可以在 SELECT 查询、WHERE 子句以及其他 SQL 语句中使用。MySQL 提供了 `IF()` 和 `CASE` 两种主要的条件判断函数。

#### 1. `IF()` 函数

**功能**: 根据条件表达式返回不同的值。类似于编程语言中的 `if-else` 结构。

**语法**:
```sql
IF(condition, true_value, false_value)
```

**参数**:
- `condition`：一个布尔表达式，决定返回的值。
- `true_value`：如果条件为真，返回的值。
- `false_value`：如果条件为假，返回的值。

**示例**:
```sql
SELECT 
    IF(5 > 3, 'True', 'False') AS result;
```
*此查询将返回 `'True'`，因为 5 大于 3。*

```sql
SELECT 
    name,
    IF(age >= 18, 'Adult', 'Minor') AS age_group
FROM 
    users;
```
*此查询将根据用户的年龄显示 `'Adult'` 或 `'Minor'`。*

#### 2. `CASE` 表达式

**功能**: 根据多个条件返回不同的值。`CASE` 表达式提供了更多的灵活性，类似于编程语言中的 `switch-case` 结构。

**语法**:
```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ...
    ELSE default_result
END
```

**参数**:
- `WHEN condition THEN result`：当条件满足时返回的结果。
- `ELSE default_result`：如果没有条件满足时返回的默认结果（可选）。

**示例**:
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
*此查询将根据年龄范围返回相应的年龄组：`'Child'`、`'Teenager'`、`'Adult'` 或 `'Senior'`。*

**简写形式**:
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
*此查询将根据 `age` 字段的具体值返回 `'Infant'`、`'Toddler'`、`'Preschool'` 或 `'School Age'`。*

#### 3. `IFNULL()` 和 `COALESCE()` 函数

**功能**: 这两个函数用于处理空值（NULL）。`IFNULL()` 只处理两个值，而 `COALESCE()` 可以处理多个值。

- **`IFNULL(expression, alt_value)`**: 如果 `expression` 为 NULL，则返回 `alt_value`，否则返回 `expression`。
- **`COALESCE(value1, value2, ..., valueN)`**: 返回第一个非 NULL 值。如果所有值都是 NULL，则返回 NULL。

**示例**:
```sql
SELECT 
    name,
    IFNULL(phone_number, 'No phone number') AS contact_number
FROM 
    users;
```
*此查询将如果 `phone_number` 为 NULL，则显示 `'No phone number'`。*

```sql
SELECT 
    name,
    COALESCE(phone_number, email_address, 'No contact info') AS contact_info
FROM 
    users;
```
*此查询将优先显示 `phone_number`，如果为 NULL，则显示 `email_address`，如果两个都是 NULL，则显示 `'No contact info'`。*

### 总结

条件判断函数在 SQL 查询中用于实现复杂的逻辑判断。`IF()` 和 `CASE` 提供了灵活的条件表达式，用于根据不同的条件返回不同的值。`IFNULL()` 和 `COALESCE()` 则用于处理和替代空值，以确保查询结果的完整性和准确性。