# 知识点整理

本页把全站内容收拢成一条复习主线:核心概念、权威书籍、官方文档、应用场景、常见坑。每条末尾的 [S#] 对应文末「来源」清单;站内链接指向展开正文,条目只留结论,推导与示例在正文里。本站正文引用过的出处都已核实;查无实据的内容不进本页。

## 一、核心概念

1. **存储引擎可插拔,InnoDB 是默认引擎**:每张表可以选自己的存储引擎,事务、行锁、崩溃恢复、MVCC 都由 InnoDB 这一层提供,MyISAM 不支持事务。[存储引擎](./advanced-features-internals/storage-engines.md) [S1]
2. **索引用 B+树,不用 B-树**:B+树是 B-树的变体,数据全在叶子层,内部节点只存索引,叶子层适合范围扫描。[索引的底层数据结构选择](./advanced-features-internals/index-why.md) [S1][S8]
3. **事务有 ACID 四性,隔离级别有四档**:InnoDB 默认 REPEATABLE READ;隔离级别从 READ UNCOMMITTED 到 SERIALIZABLE,逐级用一致性换并发。[事务概念](./advanced-features-internals/transaction-concepts.md)、[ACID 特性](./advanced-features-internals/acid-properties.md)、[隔离级别与锁](./advanced-features-internals/isolation-levels-locks.md) [S1]
4. **InnoDB 的 RR 在很大程度上避免了幻读**:标准 SQL 说 REPEATABLE READ 仍可能出现幻读;InnoDB 用 MVCC 快照读挡住已提交的新行,再用间隙锁/临键锁(Next-Key Lock)挡住范围插入——这是 MySQL 与标准的差异点。[隔离级别与锁](./advanced-features-internals/isolation-levels-locks.md)
5. **MVCC = 隐藏列 + Undo Log 版本链 + ReadView**:每行带 DB_TRX_ID、DB_ROLL_PTR、DB_ROW_ID 三个隐藏列,旧版本挂在 Undo Log 上;READ COMMITTED 每条语句新建 ReadView,REPEATABLE READ 复用事务内第一个。[MVCC](./advanced-features-internals/Multi-Version-Concurrency-Control.md) [S9]
6. **读分快照读与当前读**:普通 SELECT 走快照读,不加锁;SELECT ... FOR UPDATE、SELECT ... LOCK IN SHARE MODE、UPDATE、DELETE 走当前读,读最新版本并加锁。[MVCC](./advanced-features-internals/Multi-Version-Concurrency-Control.md)
7. **三种日志各管一件事**:Redo Log 用 WAL 保证崩溃恢复与持久性,提交是否立即刷盘由 innodb_flush_log_at_trx_commit 控制;Undo Log 保回滚(原子性)并给 MVCC 供旧版本;Binary Log 记逻辑变更,供复制与时间点恢复。[日志](./advanced-features-internals/logs.md) [S1]
8. **主从复制是一条四步链路**:主库写 binlog → Binlog Dump 线程推送给从库 → 从库 IO 线程写入本地 Relay Log → SQL 线程重放。读压力分流与故障切换都建立在这条链路上。[主从复制](./architecture-deployment/master-slave-replication.md) [S1]
9. **EXPLAIN 是调优第一入口**:type 列从 ALL(全表扫描)、index、range 到 ref 逐级变好,再看 key(实际用的索引)、rows(预估扫描行数)与 Extra 的提示定位问题。[执行计划分析](./performance-tuning/explain.md) [S1]
10. **规范化与反规范化是一对权衡**:范式(1NF 起)减少冗余、保完整性;读多的场景用反规范化换查询性能。单表顶不住时再谈分区、分片与垂直/水平拆分。[规范化与反规范化](./database-design/normalization-denormalization.md)、[分区与分片](./database-design/partitioning-sharding.md) [S8]

## 二、权威书籍要点

1. **《高性能 MySQL》(High Performance MySQL,第 4 版)**:架构、索引、复制、调优四个方向的经典参考;本站索引篇、主从复制篇、性能调优篇的展开思路与它对齐。[S8]
2. **《MySQL 技术内幕:InnoDB 存储引擎》(姜承尧)**:深入 InnoDB 实现细节;对应本站存储引擎、锁机制、MVCC、日志四篇的底层视角。[S9]
3. **《MySQL 必知必会》(Ben Forta)**:入门 SQL 语法速查,对应本站 SQL 基础与函数各篇。[S10]
4. **《数据密集型应用系统设计》(DDIA)**:从系统视角理解存储、复制与一致性,给主从复制与日志分工提供背景框架。[S11]
5. **O'Reilly《Learning SQL》**:SQL 基础与标准语法入门,与本站高级 SQL 各篇互补。[S12]

书目均收录在本站 [参考资料](./appendix/references-resources.md)。

## 三、官方文档要点

1. **MySQL 8.0 Reference Manual** [S1]:站内引用最多的权威出处,语法、系统参数、锁与复制语义以它为准。
2. **MySQL 8.0 Release Notes** [S2]:版本变更记录;本站 [MySQL 8.0 新特性](./new-technologies-future/mysql-8-0-features.md)(数据字典重写、原子 DDL、窗口函数与 CTE、INSTANT 加列)的版本归属以此核对。
3. **MySQL Error Reference (8.0)** [S3]:错误码官方释义,本站 [错误码与解决方案](./appendix/error-codes-solutions.md) 的对照来源。
4. **MySQL Shell 8.4** [S4]:util.dumpInstance()/util.loadDump() 逻辑备份与迁移,云迁移方案在用。[MySQL Shell 实战](./tools-practice/mysql-shell.md)
5. **MySQL Workbench** [S5]:官方建模与管理 GUI,对应 [Workbench 篇](./tools-practice/mysql-workbench.md)。
6. **X DevAPI User Guide** [S6]:文档存储与 NoSQL 接口,对应 [与 NoSQL 集成](./new-technologies-future/integration-with-nosql.md)。
7. **Connector/ODBC** [S7]:ODBC 驱动官方文档,各语言 Connector 分册入口见 [参考资料](./appendix/references-resources.md)。

## 四、应用场景

1. **电商系统**:用户、商品、订单、订单项、支付、库存、物流、评论八类实体的 ER 建模,再到读写分离与分库分表落点。[电商系统实战](./tools-practice/e-commerce-system.md)
2. **社交网络**:用户、内容、关注关系、时间线的数据模型与热点读优化。[社交网络实战](./tools-practice/social-network-system.md)
3. **日志处理与分析**:多源采集、批量写入与聚合统计的表设计。[日志处理分析](./tools-practice/log-processing-analysis.md)
4. **云上部署四种形态**:自建实例、托管 RDS 类服务、云原生增强型(Aurora、PolarDB、TDSQL-C、HeatWave)、Vitess 分布式层。[MySQL 在云环境](./new-technologies-future/mysql-in-cloud.md)
5. **选型对比**:MySQL vs PostgreSQL 等主流库的定位差异,以及 JSON 文档存储、多语言持久化下 MySQL 与 Redis、MongoDB、Elasticsearch 的分工。[与其他数据库对比](./new-technologies-future/comparison-with-other-databases.md)

## 五、常见坑误区

1. **物理备份一般恢复不进 RDS**:XtraBackup 依赖底层文件系统,托管服务不开放;迁云走 mysqldump 或 MySQL Shell 的逻辑备份。[MySQL 在云环境](./new-technologies-future/mysql-in-cloud.md)
2. **托管服务没有 SUPER 权限**:全局参数、LOAD DATA LOCAL INFILE、UDF、事件调度常受限,上云前过一遍功能清单。
3. **innodb_flush_log_at_trx_commit 非 1 会丢已提交事务**:默认值 1 每次提交刷盘;调成 2 或 0 换性能,崩溃时可能丢最近提交。[日志](./advanced-features-internals/logs.md) [S1]
4. **DELETE 不立即物理删除**:InnoDB 先打 delete mark,旧版本进 Undo Log,事务结束后由 purge 后台线程清理;大批量删除后空间不会马上归还。[MVCC](./advanced-features-internals/Multi-Version-Concurrency-Control.md)
5. **「RR 必有幻读」是标准口径,不是 InnoDB 口径**:拿 SQL 标准套 MySQL 面试/考试常见错位,见核心概念第 4 条。
6. **死锁靠检测与回滚解决**:事务互相持锁等待形成僵局时,InnoDB 自动检测并回滚其中一个事务;业务侧按固定顺序访问资源可减少触发。[死锁与检测](./advanced-features-internals/deadlock-detection.md)

## 来源

- [S1] MySQL 8.0 Reference Manual — <https://dev.mysql.com/doc/refman/8.0/en/>
- [S2] MySQL 8.0 Release Notes — <https://dev.mysql.com/doc/relnotes/mysql/8.0/en/>
- [S3] MySQL 8.0 Error Reference — <https://dev.mysql.com/doc/mysql-errors/8.0/en/>
- [S4] MySQL Shell 8.4 Manual — <https://dev.mysql.com/doc/mysql-shell/8.4/en/>
- [S5] MySQL Workbench Manual — <https://dev.mysql.com/doc/workbench/en/>
- [S6] X DevAPI User Guide — <https://dev.mysql.com/doc/x-devapi-userguide/en/>
- [S7] MySQL Connector/ODBC Developer Guide — <https://dev.mysql.com/doc/connector-odbc/en/>
- [S8] 《高性能 MySQL》(High Performance MySQL,第 4 版) — 站内书目页收录
- [S9] 《MySQL 技术内幕:InnoDB 存储引擎》,姜承尧 — 站内书目页收录
- [S10] 《MySQL 必知必会》,Ben Forta — 站内书目页收录
- [S11] 《数据密集型应用系统设计》(DDIA) — 站内书目页收录
- [S12] O'Reilly《Learning SQL》 — 站内书目页收录
