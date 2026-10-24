# MySQL Basics: Data Types

In MySQL, data types define how column data is stored in a table. Choosing the right data types can improve database performance and efficiency. Below are the common MySQL data types, organized by category:

## 1. Numeric Types

- **Integer types**
  - `TINYINT`: 1 byte, range from -128 to 127 or 0 to 255.
  - `SMALLINT`: 2 bytes, range from -32,768 to 32,767 or 0 to 65,535.
  - `MEDIUMINT`: 3 bytes, range from -8,388,608 to 8,388,607 or 0 to 16,777,215.
  - `INT`: 4 bytes, range from -2,147,483,648 to 2,147,483,647 or 0 to 4,294,967,295.
  - `BIGINT`: 8 bytes, range from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 or 0 to 18,446,744,073,709,551,615.

- **Floating-point types**
  - `FLOAT`: 4 bytes, single-precision floating point, approximately 7 significant digits.
  - `DOUBLE`: 8 bytes, double-precision floating point, approximately 15 significant digits.

- **Fixed-point types**
  - `DECIMAL(M,D)`: stores exact decimals. `M` is the total number of digits, `D` is the number of decimal digits. For example, `DECIMAL(10,2)` means 10 digits in total, of which 2 are decimal places.

## 2. String Types

- **Fixed-length strings**
  - `CHAR(M)`: fixed-length string, `M` is the character length. If the value is shorter, it is padded with spaces.

- **Variable-length strings**
  - `VARCHAR(M)`: variable-length string, `M` is the maximum length. It stores the actual length of the characters and saves space.

- **Large text types**
  - `TEXT`: used to store long text data, maximum length 65,535 bytes.
  - `MEDIUMTEXT`: used to store medium-length text data, maximum length 16,777,215 bytes.
  - `LONGTEXT`: used to store very long text data, maximum length 4,294,967,295 bytes.

## 3. Date and Time Types

- **Date type**
  - `DATE`: stores a date in the format `YYYY-MM-DD`.

- **Time type**
  - `TIME`: stores a time in the format `HH:MM:SS`.

- **Date-time type**
  - `DATETIME`: stores a date and time in the format `YYYY-MM-DD HH:MM:SS`.

- **Timestamp type**
  - `TIMESTAMP`: stores the number of seconds since 1970-01-01 00:00:00 UTC, and is automatically updated to the current timestamp (if defined).

- **Year type**
  - `YEAR`: stores a year in the format `YYYY`.

## 4. Boolean Type

- **Boolean type**
  - `BOOLEAN`: boolean value, stores `TRUE` or `FALSE`. In MySQL it is actually stored as `TINYINT(1)`, with `TRUE` mapping to 1 and `FALSE` mapping to 0.

## 5. Binary Types

- **Fixed-length binary**
  - `BINARY(M)`: fixed-length binary data, `M` is the byte length.

- **Variable-length binary**
  - `VARBINARY(M)`: variable-length binary data, `M` is the maximum byte length.

- **Large binary data**
  - `BLOB`: used to store long binary data, maximum length 65,535 bytes.
  - `MEDIUMBLOB`: used to store medium-length binary data, maximum length 16,777,215 bytes.
  - `LONGBLOB`: used to store very long binary data, maximum length 4,294,967,295 bytes.

Choosing the appropriate data type ensures data accuracy and database performance, and also helps save storage space.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [MySQL 8.0 Reference Manual · Data Types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)
- [String Types · CHAR/VARCHAR](https://dev.mysql.com/doc/refman/8.0/en/char.html)
- [Binary String Types · BLOB](https://dev.mysql.com/doc/refman/8.0/en/blob.html)
- [DATETIME](https://dev.mysql.com/doc/refman/8.0/en/datetime.html)
- [Integer Types](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)
- [Numeric Types](https://dev.mysql.com/doc/refman/8.0/en/numeric-types.html)
- [Floating-point Types](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html)
- [YEAR](https://dev.mysql.com/doc/refman/8.0/en/year.html)
- [SET / ENUM](https://dev.mysql.com/doc/refman/8.0/en/set.html)
- [ENUM](https://dev.mysql.com/doc/refman/8.0/en/enum.html)
- [BIT](https://dev.mysql.com/doc/refman/8.0/en/bit-type.html)
- [JSON](https://dev.mysql.com/doc/refman/8.0/en/json.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
