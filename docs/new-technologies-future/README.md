# Appendix · New Technologies and the Future

My notes on MySQL's newer features and version history, plus its place in the database ecosystem: which capabilities arrived with 8.0, what the release cadence looks like, how MySQL works alongside NoSQL / cloud-native / AI workloads, and where things are heading.

## MySQL 8.0 and Later

- **[MySQL 8.0 Features](mysql-8-0-features.md)**  
  The key 8.0 changes by theme: the transactional data dictionary and atomic DDL, window functions and CTEs, the default character set and authentication plugin, InnoDB improvements, replication and high availability, and removed features such as the query cache.

- **[New Features and Versions](new-features-versions.md)**  
  A version timeline from 5.5 through 8.4/9.x, corrections of common version mix-ups (GTID defaults, which version introduced the JSON type), and upgrade path advice.

## Ecosystem and Use Cases

- **[Integrating with NoSQL](integration-with-nosql.md)**  
  MySQL's document store and X DevAPI, working with JSON columns plus generated columns, and typical architectures alongside Redis, Elasticsearch and Memcached.

- **[Comparison with Other Databases](comparison-with-other-databases.md)**  
  Comparing PostgreSQL, MariaDB, commercial databases, NewSQL and document/search databases along positioning and capability, with a framework for choosing between them.

- **[MySQL in the Cloud](mysql-in-cloud.md)**  
  The differences between self-managed cloud instances, managed services (RDS-style) and cloud-native variants; migration plans, performance and cost, and high availability practices.

## Trends

- **[Future Development](future-development.md)**  
  MySQL from the product roadmap angle: the LTS plus innovation release model, HTAP and HeatWave, vector capabilities and AI workloads.

- **[Trends and Outlook](trends-and-outlook.md)**  
  Industry-level trends: cloud native, distributed scaling, observability and automation, security and compliance, and what they mean for personal skill sets.

While putting this together I focused on which version each feature belongs to, the grounds for upgrade versus new-project choices, and where MySQL sits in modern data architectures.

---

- [Knowledge Notes](../knowledge.md) —— Core concepts, references, key points from the official docs, use cases and common pitfalls, all with in-site links.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)

## Related pages

- [comparison-with-other-databases](comparison-with-other-databases.md)

<!-- BACKLINKS-AUTO -->
## Related pages

- [comparison-with-other-databases](comparison-with-other-databases.md)
