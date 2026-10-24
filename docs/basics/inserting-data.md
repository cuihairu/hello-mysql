# Inserting Data (INSERT)

The `INSERT` statement is used to insert new data rows into a MySQL table. Below are the main uses of the `INSERT` statement along with some examples.

## 1. Basic INSERT Statements

- **Insert a single row**
  ```sql
  INSERT INTO table_name (column1, column2, column3)
  VALUES (value1, value2, value3);
  ```
  Example:
  ```sql
  INSERT INTO employees (name, age, department)
  VALUES ('John Doe', 30, 'Sales');
  ```

## 2. Inserting Multiple Rows

- **Insert multiple rows**
  ```sql
  INSERT INTO table_name (column1, column2, column3)
  VALUES (value1a, value2a, value3a),
         (value1b, value2b, value3b),
         (value1c, value2c, value3c);
  ```
  Example:
  ```sql
  INSERT INTO employees (name, age, department)
  VALUES ('Alice', 28, 'HR'),
         ('Bob', 35, 'IT'),
         ('Charlie', 40, 'Finance');
  ```

## 3. Inserting Data from Another Table

- **Using a SELECT statement to insert data from another table**
  ```sql
  INSERT INTO table1 (column1, column2)
  SELECT column1, column2
  FROM table2
  WHERE condition;
  ```
  Example:
  ```sql
  INSERT INTO new_employees (name, age)
  SELECT name, age
  FROM old_employees
  WHERE department = 'Sales';
  ```

## 4. Specifying Default Values When Inserting Data

- **Not specifying values for some columns**
  If some columns in the table have default values, you can omit those columns and they will use the default values.
  ```sql
  INSERT INTO table_name (column1, column2)
  VALUES (value1, value2);
  ```
  Example:
  ```sql
  INSERT INTO employees (name, department)
  VALUES ('David', 'Marketing');
  ```
  If the `age` column has a default value (for example `0`), that default value is used.

## 5. Inserting Data and Handling Conflicts

- **Using ON DUPLICATE KEY UPDATE to handle conflicts**
  When the inserted data conflicts with an existing unique key, you can update the existing row.
  ```sql
  INSERT INTO table_name (unique_column, column2)
  VALUES (value1, value2)
  ON DUPLICATE KEY UPDATE column2 = value2;
  ```
  Example:
  ```sql
  INSERT INTO employees (id, name, department)
  VALUES (1, 'John Doe', 'Sales')
  ON DUPLICATE KEY UPDATE department = 'Sales';
  ```

## 6. Inserting Data and SQL Injection

- **Avoiding SQL injection**
  When performing insert operations in an application, using parameterized queries or prepared statements prevents SQL injection attacks. For example, when using PHP and MySQL:
  ```php
  $stmt = $mysqli->prepare("INSERT INTO employees (name, age, department) VALUES (?, ?, ?)");
  $stmt->bind_param("sis", $name, $age, $department);
  $stmt->execute();
  ```

These `INSERT` operations add data to a MySQL database, and also cover several common edge cases.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [MySQL 8.0 Reference Manual · INSERT](https://dev.mysql.com/doc/refman/8.0/en/insert.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
