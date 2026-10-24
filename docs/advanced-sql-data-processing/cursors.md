# Cursors

A **cursor** is a mechanism provided by the database that processes a query result set row by row. Cursors let you do row-level processing in SQL, especially when you need to read data one record at a time and perform complex operations on it. In MySQL cursors are used mainly inside stored procedures and functions, where they can manipulate data row by row instead of handling the whole result set at once.

## 1. The concept of a cursor

A cursor is a database object that retrieves rows from a result set and provides the ability to operate on them row by row. The basic cursor operations are: open the cursor, fetch data rows, process the data, and close the cursor. Cursors are used for complex database operations such as row-by-row updates or multi-step operations.

## 2. Creating and using a cursor

In MySQL, cursors are normally used together with stored procedures and functions. The basic steps are:

1. **Declare the cursor**: define the cursor and specify the query statement.
2. **Open the cursor**: initialise the cursor and run the query.
3. **Fetch data**: read the data out of the cursor row by row.
4. **Close the cursor**: release the cursor resources.

**Example**:

Suppose we have an `employees` table and we want to walk through every employee record and process each employee's salary.

First, create a stored procedure that uses a cursor:

```sql
DELIMITER //

CREATE PROCEDURE process_employees()
BEGIN
    -- 声明变量来存储游标中的数据（变量必须声明在游标之前）
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE emp_id INT;
    DECLARE emp_salary DECIMAL(10,2);

    -- 声明游标
    DECLARE emp_cursor CURSOR FOR SELECT id, salary FROM employees;

    -- 声明游标完成标志（HANDLER 必须声明在游标之后）
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- 打开游标
    OPEN emp_cursor;

    -- 游标循环
    read_loop: LOOP
        -- 从游标中提取数据
        FETCH emp_cursor INTO emp_id, emp_salary;

        -- 处理游标数据
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- 这里可以添加对数据的处理逻辑，例如更新工资
        -- UPDATE employees SET salary = emp_salary * 1.1 WHERE id = emp_id;
    END LOOP;

    -- 关闭游标
    CLOSE emp_cursor;
END //

DELIMITER ;
```

In the example above, the stored procedure `process_employees` uses the cursor `emp_cursor` to walk through every record in the `employees` table and processes each employee's salary. Note the strict declaration order: declare variables first, then the cursor, and the `HANDLER` last; the `done` variable is used with the `NOT FOUND` handler to tell whether the cursor has read all the data. The stored procedure opens the cursor first, then fetches and processes rows one at a time, and finally closes the cursor.

## 3. Use cases for cursors

- **Row-by-row data processing**: when each row of a result set needs complex handling, such as row-by-row updates or calculations.
- **Multi-step operations**: when multiple steps of calculation or operation are required, a cursor processes rows in order and keeps the operation sequence correct.
- **Data migration**: during data migration you read and process data incrementally, and a cursor gives you row-level control.

## 4. Advantages of cursors

- **Row-level operations**: row-by-row reading and processing makes complex data-processing tasks more flexible.
- **Sequential access**: a cursor allows sequential access to the data, so the order of operations is preserved while processing.

## 5. Things to watch out for with cursors

- **Performance impact**: cursors are usually slower than bulk operations because they process rows one at a time. On large datasets this can hurt performance.
- **Resource usage**: cursors hold onto system resources, so close them as soon as you are done to release those resources.
- **Complexity**: using cursors can make stored procedures more complex and harder to maintain.

## 6. Managing cursors

- **Viewing cursors**: MySQL does not provide a tool to look at the currently active cursors directly, but you can get that information indirectly by querying relevant system tables or using debugging tools.
- **Closing cursors**: once you are finished with a cursor, you must close it to release system resources.

**Example**:
```sql
-- 关闭游标
CLOSE emp_cursor;
```

## Summary

Cursors are a powerful tool in MySQL that let you process data row by row inside stored procedures and functions. By declaring, opening, fetching from and closing a cursor you can carry out complex data-processing tasks. Cursors give you row-level control, but they come with performance and resource cost. Use them where row-level processing and multi-step operations are needed and you get more flexible data handling.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Cursors](https://dev.mysql.com/doc/refman/8.0/en/cursors.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
