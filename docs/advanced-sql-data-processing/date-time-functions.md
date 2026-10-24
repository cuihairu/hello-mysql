# Date and Time Functions

Date and time functions handle and compute date and time values in SQL queries. They let you extract information from dates and times, do date arithmetic and format dates. Here are the common date and time functions and how to use them:

## 1. `CURDATE()` and `CURRENT_DATE()`

**Purpose**: return the current date (no time part).

**Syntax**:
```sql
CURDATE()
```
or
```sql
CURRENT_DATE()
```

**Example**:
```sql
SELECT CURDATE() AS today_date;
```
*This query returns the current date, for example `2024-08-06`.*

## 2. `NOW()` and `CURRENT_TIMESTAMP()`

**Purpose**: return the current date and time.

**Syntax**:
```sql
NOW()
```
or
```sql
CURRENT_TIMESTAMP()
```

**Example**:
```sql
SELECT NOW() AS current_datetime;
```
*This query returns the current date and time, for example `2024-08-06 14:30:00`.*

## 3. `DATE()` and `TIME()`

**Purpose**: extract the date part or the time part from a datetime value.

**Syntax**:
```sql
DATE(datetime_value)
```
```sql
TIME(datetime_value)
```

**Example**:
```sql
SELECT DATE(NOW()) AS current_date;
```
*This query returns the current date part.*

```sql
SELECT TIME(NOW()) AS current_time;
```
*This query returns the current time part.*

## 4. `YEAR()`, `MONTH()`, `DAY()`

**Purpose**: extract the year, month or day part of a date.

**Syntax**:
```sql
YEAR(date_value)
```
```sql
MONTH(date_value)
```
```sql
DAY(date_value)
```

**Example**:
```sql
SELECT YEAR(CURDATE()) AS current_year;
```
*This query returns the current year, for example `2024`.*

```sql
SELECT MONTH(CURDATE()) AS current_month;
```
*This query returns the current month, for example `8`.*

```sql
SELECT DAY(CURDATE()) AS current_day;
```
*This query returns the day part of the current date, for example `6`.*

## 5. `DATE_ADD()` and `DATE_SUB()`

**Purpose**: add or subtract a given time interval from a date value.

**Syntax**:
```sql
DATE_ADD(date_value, INTERVAL value unit)
```
```sql
DATE_SUB(date_value, INTERVAL value unit)
```

**Example**:
```sql
SELECT DATE_ADD(CURDATE(), INTERVAL 10 DAY) AS future_date;
```
*This query returns the date 10 days after the current date.*

```sql
SELECT DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AS past_date;
```
*This query returns the date 1 month before the current date.*

## 6. `DATEDIFF()`

**Purpose**: compute the number of days between two dates.

**Syntax**:
```sql
DATEDIFF(date1, date2)
```

**Example**:
```sql
SELECT DATEDIFF('2024-08-06', '2024-07-06') AS days_difference;
```
*This query computes the number of days between the two dates, for example 31 days.*

## 7. `TIMESTAMPDIFF()`

**Purpose**: compute the difference between two dates, in years, months, days, hours, minutes or seconds.

**Syntax**:
```sql
TIMESTAMPDIFF(unit, date1, date2)
```

**Example**:
```sql
SELECT TIMESTAMPDIFF(DAY, '2024-07-06', '2024-08-06') AS days_difference;
```
*This query computes the number of days between the two dates.*

## 8. `STR_TO_DATE()`

**Purpose**: convert a string into a date.

**Syntax**:
```sql
STR_TO_DATE(string, format)
```

**Example**:
```sql
SELECT STR_TO_DATE('06-08-2024', '%d-%m-%Y') AS formatted_date;
```
*This query converts the string `'06-08-2024'` into the date `2024-08-06`.*

## 9. `DATE_FORMAT()`

**Purpose**: format a date or time value into a string using the given format.

**Syntax**:
```sql
DATE_FORMAT(date_value, format)
```

**Example**:
```sql
SELECT DATE_FORMAT(CURDATE(), '%Y-%m-%d') AS formatted_date;
```
*This query formats the current date as `'2024-08-06'`.*

```sql
SELECT DATE_FORMAT(NOW(), '%W, %M %e, %Y') AS formatted_datetime;
```
*This query formats the current date and time as `'Monday, August 6, 2024'`.*

## Summary

Date and time functions make handling dates and times flexible in SQL queries. They let you extract, calculate, format and compare dates and times, so working with dates and times becomes faster and more convenient.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Date and Time Functions](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
