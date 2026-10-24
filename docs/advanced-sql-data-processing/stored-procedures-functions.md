# Stored Procedures and Functions

In MySQL, **stored procedures** and **functions** are important tools for implementing complex business logic and data operations. Both let you define and execute a series of SQL statements in the database, which improves code reuse, cuts down on repeated work and makes database operations more efficient.

## 1. Stored Procedures

A **stored procedure** is a precompiled collection of SQL statements that is stored in the database and called when needed. A stored procedure can take input parameters, execute multiple SQL statements and return results. They are usually used to encapsulate business logic, simplify complex operations and improve database performance.

### 1.1 Creating a stored procedure

Use the `CREATE PROCEDURE` statement to create a stored procedure. You define the input parameters, the output parameters and the body of the procedure.

**Example**:
```sql
DELIMITER //

CREATE PROCEDURE GetEmployeeDetails(IN emp_id INT, OUT emp_name VARCHAR(100), OUT emp_salary DECIMAL(10,2))
BEGIN
    SELECT name, salary INTO emp_name, emp_salary
    FROM employees
    WHERE id = emp_id;
END //

DELIMITER ;
```

In this example, the `GetEmployeeDetails` stored procedure takes one input parameter `emp_id` and returns two output parameters `emp_name` and `emp_salary`. The procedure queries the employee information in the `employees` table and stores the result in the output parameters.

### 1.2 Calling a stored procedure

Use the `CALL` statement to call a stored procedure and pass in the required parameters.

**Example**:
```sql
CALL GetEmployeeDetails(1, @name, @salary);

-- 获取存储过程输出的参数
SELECT @name AS EmployeeName, @salary AS EmployeeSalary;
```

### 1.3 Advantages of stored procedures

- **Code reuse**: common SQL statements are wrapped inside the procedure, so the same code does not have to be written again.
- **Better performance**: a stored procedure is precompiled in the database, which reduces compile overhead on each run and improves execution efficiency.
- **Simpler complex operations**: wrapping complex business logic and multi-step operations inside one procedure keeps the application code cleaner.

### 1.4 Things to watch out for with stored procedures

- **Harder to debug**: errors inside a stored procedure can be difficult to debug, especially with complex logic and multiple statements.
- **Maintenance complexity**: changing a stored procedure requires recompiling it and can affect the applications that use it.

## 2. Functions

A **function** is a stored program that returns a single value. Functions can be embedded in SQL statements, for example in `SELECT` or `WHERE` clauses. Functions suit computations and transformations that produce one result.

### 2.1 Creating a function

Use the `CREATE FUNCTION` statement to create a function, defining its input parameters, its return type and the function body.

**Example**:
```sql
DELIMITER //

CREATE FUNCTION CalculateBonus(salary DECIMAL(10,2), percentage DECIMAL(5,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN salary * (percentage / 100);
END //

DELIMITER ;
```

In this example, the `CalculateBonus` function takes two parameters, `salary` and `percentage`, and returns the computed bonus.

### 2.2 Calling a function

A function can be called directly inside a SQL query, for example:

**Example**:
```sql
SELECT name, salary, CalculateBonus(salary, 10) AS bonus
FROM employees;
```

### 2.3 Advantages of functions

- **Simpler queries**: wrapping complex calculation logic in a function simplifies SQL queries and improves readability.
- **Better consistency**: a function keeps the calculation logic consistent and avoids reimplementing the same logic across multiple queries.
- **Reusability**: a function can be used in multiple queries and stored procedures, improving code reuse.

### 2.4 Things to watch out for with functions

- **Performance overhead**: calling and executing a function can cost performance, especially when it is called frequently.
- **Debugging challenges**: debugging a function usually means stepping through and checking its logic inside the database environment.

### Differences between stored procedures and functions

Stored procedures and functions are both programmable objects in the database, used to perform specific tasks and logic, but they differ in usage and capability in several important ways. Here are the main differences:

1. **Purpose and use**:
   - **Stored procedure**: mainly used to run a series of database operations, such as inserts, updates, deletes and complex business logic. A stored procedure can return multiple result sets, or return nothing at all.
   - **Function**: mainly used to compute and return a single value. Functions are usually used for data transformation, calculations and similar tasks.

2. **Return values**:
   - **Stored procedure**: can return zero or more values (usually through output parameters). A stored procedure can return multiple result sets.
   - **Function**: must return one value. A function returns a single value of a single data type.

3. **How they are called**:
   - **Stored procedure**: called with the `CALL` statement (MySQL does not support `EXEC`; that is SQL Server syntax). For example:
    
	```sql
    CALL procedure_name(parameters);
    ```
   
   - **Function**: can be called directly inside a SQL statement such as `SELECT`, `INSERT` or `UPDATE`. For example:
     
	```sql
	SELECT function_name(parameters);
	```

4. **Parameter types**:
   - **Stored procedure**: supports input parameters (IN), output parameters (OUT) and input/output parameters (INOUT).
   - **Function**: supports input parameters (IN) only.

5. **Side effects**:
   - **Stored procedure**: can have side effects, such as modifying the data in database tables (inserts, updates, deletes).
   - **Function**: should have no side effects; it normally only reads data and computes, and should not change the state of the database.

6. **Use cases**:
   - **Stored procedure**: fits complex business logic, multi-step transactions and cases that call different SQL statements repeatedly.
   - **Function**: fits calculations, data transformation and logic that gets reused many times inside a query.

7. **Nesting**:
   - **Stored procedure**: can call other stored procedures and functions.
   - **Function**: can call other functions but usually cannot call a stored procedure directly.

## Example

**Stored procedure** example:
```sql
DELIMITER //
CREATE PROCEDURE AddEmployee(IN name VARCHAR(100), IN dept VARCHAR(100))
BEGIN
    INSERT INTO employees (name, department) VALUES (name, dept);
END //
DELIMITER ;
```
Calling the stored procedure:
```sql
CALL AddEmployee('John Doe', 'Engineering');
```

**Function** example:
```sql
DELIMITER //
CREATE FUNCTION CalculateBonus(salary DECIMAL(10,2), rate DECIMAL(5,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN salary * rate / 100;
END //
DELIMITER ;
```
> Tip: on a server with binary logging enabled, MySQL requires a function to be declared `DETERMINISTIC`, `NO SQL` or `READS SQL DATA` (otherwise it raises error 1418), unless `log_bin_trust_function_creators` is set to `ON`.
Calling the function:
```sql
SELECT CalculateBonus(50000, 10);
```

All in all, stored procedures and functions each have their own fit and characteristics; picking the right tool for the requirement is what matters.

### Summary

**Stored procedures** and **functions** are powerful programming tools in MySQL for implementing complex business logic and data operations. Stored procedures suit complex operations and transactions and can accept and return multiple parameters, while functions perform calculations and transformations and are embedded inside SQL statements. Choose and use them according to your actual needs and you get noticeably better performance, maintainability and code reuse out of the database.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Stored Routines](https://dev.mysql.com/doc/refman/8.0/en/stored-routines.html)
- [CREATE PROCEDURE](https://dev.mysql.com/doc/refman/8.0/en/create-procedure.html)
- [CREATE FUNCTION](https://dev.mysql.com/doc/refman/8.0/en/create-function.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
