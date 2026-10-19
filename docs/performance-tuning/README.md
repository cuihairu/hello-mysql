# 性能调优

这里记录我处理 MySQL 性能问题时用到的监控、查询优化和系统调优方法。

## [性能监控](performance-monitoring.md)

性能监控用于跟踪数据库运行状况，也是我定位性能瓶颈时首先查看的信息来源之一。

- **[MySQL自带工具（SHOW STATUS, SHOW PROCESSLIST）](mysql-tools.md)**  
  MySQL 自带的性能监控工具，如 `SHOW STATUS` 和 `SHOW PROCESSLIST`，以及我用它们查看运行状态、定位问题的方式。

- **[第三方工具（Percona Toolkit, MySQL Enterprise Monitor）](third-party-tools.md)**  
  常用的第三方性能监控工具，如 Percona Toolkit 和 MySQL Enterprise Monitor，以及它们在性能分析中的用途。

## [查询优化](query-optimization.md)

查询优化是提升数据库查询效率的关键。有效的查询优化可以显著减少查询时间和资源消耗。

- **[执行计划分析（EXPLAIN）](explain.md)**  
  用 `EXPLAIN` 查看查询执行计划，并据此定位性能瓶颈。

- **[慢查询日志](slow-query-log.md)**  
  慢查询日志的启用、分析，以及定位耗时查询时的处理思路。

- **[查询重写与优化](query-rewriting-optimization.md)**  
  探讨查询重写技术，包括如何改写复杂的查询以提高执行效率和性能。

## [系统调优](system-tuning.md)

系统调优涉及数据库配置、硬件和操作系统的调整，以确保数据库在各种负载下保持最佳性能。

- **[参数优化（my.cnf配置文件）](parameter-optimization.md)**  
  `my.cnf` 参数调整记录，包括缓冲区、缓存等设置对性能的影响。

- **[硬件调优](hardware-tuning.md)**  
  硬件升级与优化对数据库性能的影响，例如增加内存或使用更快的磁盘。

- **[操作系统级调优](os-tuning.md)**  
  探索操作系统级的调优措施，包括文件系统配置、进程优先级调整等，以提升数据库的整体性能。

这些记录围绕性能监控、查询优化和系统调优，整理我排查与处理性能问题时的思路。

---

- [知识点整理](../knowledge.md) —— 核心概念、参考书目、官方文档要点、应用场景与常见坑，均带站内链接。

## 参考资料

- [MySQL 8.0 Reference Manual · 优化](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)

## 相关页面

- [explain](explain.md)

<!-- BACKLINKS-AUTO -->
## 相关页面

- [explain](explain.md)
