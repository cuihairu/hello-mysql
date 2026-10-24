# Triggers

A **trigger** is a database object provided by MySQL that runs a block of predefined SQL automatically when a specific event happens. Triggers are commonly used for automated business rules, data validation, auditing and logging. They fire on insert, update or delete operations and can run either before or after those operations.

## 1. The concept of a trigger

A trigger is bound to a table. When an INSERT, UPDATE or DELETE operation runs on that table, the trigger executes automatically. There are six main trigger types:

- **BEFORE INSERT**: runs before the insert operation.
- **AFTER INSERT**: runs after the insert operation.
- **BEFORE UPDATE**: runs before the update operation.
- **AFTER UPDATE**: runs after the update operation.
- **BEFORE DELETE**: runs before the delete operation.
- **AFTER DELETE**: runs after the delete operation.

## 2. Creating a trigger

Use the `CREATE TRIGGER` statement to create a trigger, specifying the triggering event and the timing (BEFORE or AFTER).

**Example**:

Suppose we have an `employees` table and we want every insert of a new employee record to be logged automatically into an `audit_log` table.

First, create the `audit_log` table:
```sql
CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(50),
    employee_id INT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Then create the trigger:
```sql
DELIMITER //

CREATE TRIGGER after_employee_insert
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (action, employee_id)
    VALUES ('INSERT', NEW.id);
END //

DELIMITER ;
```

In this example, the `after_employee_insert` trigger runs after an insert into the `employees` table and records the inserted employee ID and the action in the `audit_log` table.

## 3. Use cases for triggers

- **Data validation**: validate the data before it is inserted or updated.
- **Automatic calculation**: compute certain field values automatically when data is operated on.
- **Logging**: record changes to table data for later auditing and analysis.
- **Data synchronisation**: synchronise data between multiple tables or carry out complex business logic.

## 4. Advantages of triggers

- **Automation**: triggers run complex operations automatically, reducing the need for manual intervention.
- **Consistency**: the same operation always runs when the given event happens, which increases data consistency.
- **Data integrity**: validation and adjustment at the moment data is modified keep the data complete and accurate.

## 5. Things to watch out for with triggers

- **Performance impact**: triggers run automatically on every related operation and can affect database performance, especially under heavy load.
- **Harder to debug**: the logic inside a trigger can be complex to debug and usually needs to be stepped through and tested inside the database environment.
- **Logic complexity**: avoid putting overly complex business logic into a trigger, which would hurt the maintainability and performance of the database.

## 6. Managing triggers

- **Viewing triggers**: use the `SHOW TRIGGERS` statement to list the triggers in the current database.
- **Dropping triggers**: use the `DROP TRIGGER` statement to remove a trigger.

**Example**:
```sql
-- 查看所有触发器
SHOW TRIGGERS;

-- 删除触发器
DROP TRIGGER IF EXISTS after_employee_insert;
```

## Summary

Triggers are a powerful tool in MySQL that run predefined operations automatically when a specific database event happens. They fit data validation, automatic calculation, logging and data synchronisation. Used well they raise the automation level and data consistency of a database system. That said, keep an eye on the performance impact and complexity management, so the trigger design fits the actual requirement and the database keeps performing well.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · Triggers](https://dev.mysql.com/doc/refman/8.0/en/triggers.html)
- [CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
