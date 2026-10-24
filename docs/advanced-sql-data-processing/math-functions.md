# Math Functions

Math functions perform various arithmetic calculations in SQL queries. They are used for numeric computation, statistical analysis and data processing. Here are the common math functions and how to use them:

## 1. `ABS()`

**Purpose**: return the absolute value of a number.

**Syntax**:
```sql
ABS(number)
```

**Example**:
```sql
SELECT ABS(-123.45) AS absolute_value;
```
*This query returns the absolute value of -123.45, which is 123.45.*

## 2. `ROUND()`

**Purpose**: round a number to a given number of decimal places.

**Syntax**:
```sql
ROUND(number, decimals)
```

**Example**:
```sql
SELECT ROUND(123.4567, 2) AS rounded_value;
```
*This query rounds 123.4567 to two decimal places, giving 123.46.*

## 3. `CEIL()` or `CEILING()`

**Purpose**: return the smallest integer greater than or equal to the given number.

**Syntax**:
```sql
CEIL(number)
```
or
```sql
CEILING(number)
```

**Example**:
```sql
SELECT CEIL(123.45) AS ceiling_value;
```
*This query returns the ceiling of 123.45, which is 124.*

## 4. `FLOOR()`

**Purpose**: return the largest integer less than or equal to the given number.

**Syntax**:
```sql
FLOOR(number)
```

**Example**:
```sql
SELECT FLOOR(123.45) AS floor_value;
```
*This query returns the floor of 123.45, which is 123.*

## 5. `POWER()`

**Purpose**: return a number raised to a given exponent.

**Syntax**:
```sql
POWER(number, exponent)
```

**Example**:
```sql
SELECT POWER(2, 3) AS power_value;
```
*This query computes 2 to the power 3, giving 8.*

## 6. `SQRT()`

**Purpose**: return the square root of a number.

**Syntax**:
```sql
SQRT(number)
```

**Example**:
```sql
SELECT SQRT(16) AS square_root;
```
*This query computes the square root of 16, giving 4.*

## 7. `RAND()`

**Purpose**: generate a random float between 0 and 1.

**Syntax**:
```sql
RAND()
```

**Example**:
```sql
SELECT RAND() AS random_number;
```
*This query generates a random float.*

## 8. `RADIANS()` and `DEGREES()`

**Purpose**: convert degrees to radians, and radians to degrees, respectively.

**Syntax**:
```sql
RADIANS(degrees)
```
```sql
DEGREES(radians)
```

**Example**:
```sql
SELECT RADIANS(45) AS radians_value;
```
*This query converts 45 degrees to radians.*

```sql
SELECT DEGREES(PI()) AS degrees_value;
```
*This query converts π radians to degrees, giving 180.*

## 9. `PI()`

**Purpose**: return the value of π.

**Syntax**:
```sql
PI()
```

**Example**:
```sql
SELECT PI() AS pi_value;
```
*This query returns the value of π, which is 3.141592653589793.*

## 10. `EXP()`

**Purpose**: compute e (the base of the natural logarithm) raised to a given power.

**Syntax**:
```sql
EXP(number)
```

**Example**:
```sql
SELECT EXP(1) AS exp_value;
```
*This query computes e to the power 1, giving approximately 2.718.*

## 11. `LOG()` and `LOG10()`

**Purpose**: compute the natural logarithm and the base-10 logarithm of a number, respectively.

**Syntax**:
```sql
LOG(number)
```
```sql
LOG10(number)
```

**Example**:
```sql
SELECT LOG(10) AS natural_log;
```
*This query computes the natural logarithm of 10, giving approximately 2.302.*

```sql
SELECT LOG10(100) AS log10_value;
```
*This query computes the base-10 logarithm of 100, giving 2.*

## Summary

Math functions give SQL queries powerful data-processing capabilities. With them you can do a wide range of math calculations and analysis, from simple rounding to complex exponentiation, to meet your data processing and analysis needs.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Mathematical Functions](https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
