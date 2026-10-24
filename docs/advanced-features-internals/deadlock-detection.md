# Deadlocks and Detection

In a database system, a deadlock is a situation where two or more transactions, during concurrent execution, each hold a lock that the other needs, forming a circular wait that prevents these transactions from proceeding. Deadlocks affect system performance and reliability, so when designing and managing a database you need to understand the concept of deadlocks and how to detect and resolve them.

## 1. Deadlock definition

A **deadlock** is a deadlock state in which two or more transactions, during execution, each hold the lock resource that the other needs. In this state, none of the transactions can proceed, because they are all waiting for the other to release its lock.

**Illustrative example**:
- Transaction A locks resource X and waits for resource Y.
- Transaction B locks resource Y and waits for resource X.
- Because transactions A and B wait on each other to release locks, a deadlock is produced.

## 2. Deadlock detection

To ensure the robustness and stability of a database system, a deadlock detection mechanism is essential. Common deadlock detection strategies include:

- **Wait-graph based detection**:
  - A **wait graph** is a directed graph used to represent the allocation and request state of resources. In this graph, nodes represent transactions and edges represent the waiting relationships between transactions.
  - When a cycle exists in the graph, it indicates that a deadlock exists in the system. After detecting a cycle, a transaction can be aborted to break the deadlock.

- **Resource graph**:
  - A resource graph is an extension of the relationship between resources and transactions, used to detect resource allocation and waiting. Cycle detection on the resource graph can be used to identify deadlocks.

- **Timeout detection**:
  - Set a timeout threshold for each transaction; if a transaction does not acquire the required resource within the specified time, a deadlock is assumed to have possibly occurred, and the system can roll back that transaction to resolve the deadlock.

- **Banker's algorithm**:
  - The Banker's algorithm is a dynamic deadlock detection and prevention method. It simulates the situation of transaction resource requests to judge whether a deadlock would occur, thereby deciding whether to approve a resource request.

## 3. Deadlock resolution

Once a deadlock is detected, the system must take measures to resolve it. Common resolution methods include:

- **Roll back a transaction**:
  - Rolling back a transaction is the most common deadlock resolution method. The system selects a transaction to roll back, thereby releasing the resources it holds and allowing other transactions to proceed.

- **Terminate a transaction**:
  - In addition to rolling back, a transaction can also be terminated and its resources released. Typically, the transaction with the longest execution time or the least impact on the system is chosen for termination.

- **Resource reallocation**:
  - By adjusting the resource allocation strategy, deadlocks caused by resource contention can be avoided. For example, allocate resources in a certain order to avoid the formation of cycles.

## 4. Deadlock prevention

To reduce the probability of deadlocks, some preventive measures can be taken, including:

- **Resource ordering**:
  - By setting a global order for resource allocation, transactions are required to request resources in order, avoiding the formation of cycles.

- **Transaction timeout**:
  - Set a timeout for transactions; when a transaction times out without completing, it is automatically rolled back, avoiding deadlocks caused by long waits.

- **Avoid holding locks for long periods**:
  - Ensure that transactions hold locks for as short a time as possible during execution, avoiding long occupation of resources and thereby reducing the risk of deadlocks.

## 5. Deadlock detection tools

Many modern database management systems provide deadlock detection and debugging tools to help users identify and resolve deadlock problems:

- **InnoDB deadlock detection**:
  - The InnoDB storage engine automatically detects and resolves deadlocks through a built-in deadlock detection mechanism. When a deadlock is detected, InnoDB rolls back one transaction and records the deadlock information.

- **MySQL `SHOW ENGINE INNODB STATUS`**:
  - This command displays the current state of the InnoDB engine, including deadlock information and recent deadlock detection records.

- **MySQL 8.0 data dictionary tables**:
  - You can query `performance_schema.data_locks` and `performance_schema.data_lock_waits` to see the current locks and lock waits, or directly use the `sys.innodb_lock_waits` view to locate the blocking source; to record all deadlocks, enable `innodb_print_all_deadlocks` to write deadlock information to the error log.

## Summary

- **Deadlock**: A deadlock state in which transactions wait on each other for resources, preventing them from proceeding.
- **Deadlock detection**: Includes strategies based on the wait graph, resource graph, timeout detection and the Banker's algorithm.
- **Deadlock resolution**: Common methods include rolling back a transaction, terminating a transaction and resource reallocation.
- **Deadlock prevention**: Includes resource ordering, transaction timeout and avoiding holding locks for long periods.
- **Detection tools**: Such as InnoDB's built-in detection mechanism and MySQL's `SHOW ENGINE INNODB STATUS` command.

Understanding deadlocks and their detection and resolution methods can help improve the stability and performance of a database system.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Deadlocks](https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html)
- [MySQL 8.0 Reference Manual · InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
- [knowledge](/knowledge.md)
