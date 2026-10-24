# Performance Tuning

The monitoring, query optimisation and system tuning methods I use when dealing with MySQL performance problems.

## [Performance Monitoring](performance-monitoring.md)

Monitoring tracks the health of the database, and it is one of the first places I look when hunting for a bottleneck.

- **[Built-in MySQL Tools (SHOW STATUS, SHOW PROCESSLIST)](mysql-tools.md)**  
  The monitoring tools MySQL ships with, such as `SHOW STATUS` and `SHOW PROCESSLIST`, and how I use them to inspect runtime state and narrow down problems.

- **[Third-Party Tools (Percona Toolkit, MySQL Enterprise Monitor)](third-party-tools.md)**  
  Common third-party monitoring tools such as Percona Toolkit and MySQL Enterprise Monitor, and what they contribute to performance analysis.

## [Query Optimization](query-optimization.md)

Query optimisation is the key to efficient database queries. Done well, it cuts query time and resource use considerably.

- **[Execution Plans (EXPLAIN)](explain.md)**  
  Reading execution plans with `EXPLAIN` and using them to locate bottlenecks.

- **[Slow Query Log](slow-query-log.md)**  
  Enabling and analysing the slow query log, and how I follow up on slow statements.

- **[Query Rewriting](query-rewriting-optimization.md)**  
  Query rewriting techniques: how to rework complex queries for better execution efficiency and performance.

## [System Tuning](system-tuning.md)

System tuning covers database configuration, hardware and operating system adjustments, so the database holds up under varying load.

- **[Parameter Optimization (my.cnf)](parameter-optimization.md)**  
  Notes on tuning `my.cnf` parameters, including how buffer and cache settings affect performance.

- **[Hardware Tuning](hardware-tuning.md)**  
  How hardware upgrades affect database performance — more memory, faster disks and so on.

- **[OS-Level Tuning](os-tuning.md)**  
  Operating system level tuning: filesystem configuration, process priorities and other levers that lift overall database performance.

These notes are organised around monitoring, query optimisation and system tuning — the path I usually follow when investigating and fixing performance problems.

---

- [Knowledge Notes](../knowledge.md) —— Core concepts, references, key points from the official docs, use cases and common pitfalls, all with in-site links.

## References

- [MySQL 8.0 Reference Manual · Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)

## Related pages

- [explain](explain.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [explain](explain.md)
