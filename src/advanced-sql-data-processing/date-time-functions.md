### 日期和时间函数

日期和时间函数在 SQL 查询中用于处理和计算日期及时间值。这些函数允许你从日期和时间中提取信息、进行日期计算和格式化。以下是一些常用的日期和时间函数及其用法：

#### 1. `CURDATE()` 和 `CURRENT_DATE()`

**功能**: 返回当前日期（不包含时间部分）。

**语法**:
```sql
CURDATE()
```
或
```sql
CURRENT_DATE()
```

**示例**:
```sql
SELECT CURDATE() AS today_date;
```
*此查询返回当前日期，例如 `2024-08-06`。*

#### 2. `NOW()` 和 `CURRENT_TIMESTAMP()`

**功能**: 返回当前的日期和时间。

**语法**:
```sql
NOW()
```
或
```sql
CURRENT_TIMESTAMP()
```

**示例**:
```sql
SELECT NOW() AS current_datetime;
```
*此查询返回当前的日期和时间，例如 `2024-08-06 14:30:00`。*

#### 3. `DATE()` 和 `TIME()`

**功能**: 从日期时间值中提取日期部分或时间部分。

**语法**:
```sql
DATE(datetime_value)
```
```sql
TIME(datetime_value)
```

**示例**:
```sql
SELECT DATE(NOW()) AS current_date;
```
*此查询返回当前日期部分。*

```sql
SELECT TIME(NOW()) AS current_time;
```
*此查询返回当前时间部分。*

#### 4. `YEAR()`, `MONTH()`, `DAY()`

**功能**: 提取日期中的年、月、日部分。

**语法**:
```sql
YEAR(date_value)
```
```sql
MONTH(date_value)
```
```sql
DAY(date_value)
```

**示例**:
```sql
SELECT YEAR(CURDATE()) AS current_year;
```
*此查询返回当前年份，例如 `2024`。*

```sql
SELECT MONTH(CURDATE()) AS current_month;
```
*此查询返回当前月份，例如 `8`。*

```sql
SELECT DAY(CURDATE()) AS current_day;
```
*此查询返回当前日期中的日部分，例如 `6`。*

#### 5. `DATE_ADD()` 和 `DATE_SUB()`

**功能**: 在日期值上加上或减去指定的时间间隔。

**语法**:
```sql
DATE_ADD(date_value, INTERVAL value unit)
```
```sql
DATE_SUB(date_value, INTERVAL value unit)
```

**示例**:
```sql
SELECT DATE_ADD(CURDATE(), INTERVAL 10 DAY) AS future_date;
```
*此查询返回当前日期之后 10 天的日期。*

```sql
SELECT DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AS past_date;
```
*此查询返回当前日期之前 1 个月的日期。*

#### 6. `DATEDIFF()`

**功能**: 计算两个日期之间的天数差。

**语法**:
```sql
DATEDIFF(date1, date2)
```

**示例**:
```sql
SELECT DATEDIFF('2024-08-06', '2024-07-06') AS days_difference;
```
*此查询计算两个日期之间的天数差，例如 31 天。*

#### 7. `TIMESTAMPDIFF()`

**功能**: 计算两个日期之间的时间差，可以按年、月、日、小时、分钟或秒计算。

**语法**:
```sql
TIMESTAMPDIFF(unit, date1, date2)
```

**示例**:
```sql
SELECT TIMESTAMPDIFF(DAY, '2024-07-06', '2024-08-06') AS days_difference;
```
*此查询计算两个日期之间的天数差。*

#### 8. `STR_TO_DATE()`

**功能**: 将字符串转换为日期格式。

**语法**:
```sql
STR_TO_DATE(string, format)
```

**示例**:
```sql
SELECT STR_TO_DATE('06-08-2024', '%d-%m-%Y') AS formatted_date;
```
*此查询将字符串 `'06-08-2024'` 转换为日期格式 `2024-08-06`。*

#### 9. `DATE_FORMAT()`

**功能**: 按指定的格式将日期或时间值格式化为字符串。

**语法**:
```sql
DATE_FORMAT(date_value, format)
```

**示例**:
```sql
SELECT DATE_FORMAT(CURDATE(), '%Y-%m-%d') AS formatted_date;
```
*此查询将当前日期格式化为 `'2024-08-06'`。*

```sql
SELECT DATE_FORMAT(NOW(), '%W, %M %e, %Y') AS formatted_datetime;
```
*此查询将当前日期和时间格式化为 `'Monday, August 6, 2024'`。*

### 总结

日期和时间函数在 SQL 查询中为日期和时间的处理提供了灵活性。这些函数允许你提取、计算、格式化和比较日期及时间，使得日期和时间的操作变得更加高效和便捷。