# 常用命令参考

按场景整理日常运维与开发中最高频的 MySQL 命令。示例基于 MySQL 8.0，涉及复制的新旧语法时都会注明。

## 1. 连接与基本信息

```bash
# 本地连接（会提示输入密码）
mysql -u root -p

# 指定主机、端口、数据库
mysql -h 192.168.1.10 -P 3306 -u app_user -p mydb

# 只执行一条 SQL 后退出
mysql -u root -p -e "SHOW VARIABLES LIKE 'version%';"

# 导入 SQL 文件
mysql -u root -p mydb < backup.sql
```

```sql
-- 查看服务器版本与状态摘要
SELECT VERSION();
STATUS;                     -- 或在客户端中输入 \s

-- 查看当前连接与用户
SELECT CURRENT_USER(), CONNECTION_ID(), NOW();

-- 查看当前会话/全局变量与状态
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
SHOW GLOBAL STATUS LIKE 'Threads%';
```

## 2. 库与表操作

```sql
CREATE DATABASE mydb DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
SHOW DATABASES;
USE mydb;
SHOW TABLES;
SHOW CREATE TABLE employees\G      -- 查看完整建表语句
DESCRIBE employees;                -- 查看列定义（等价于 DESC）

-- 常见 DDL（8.0 支持 ALGORITHM=INSTANT，多数加列可秒级完成）
ALTER TABLE employees ADD COLUMN phone VARCHAR(20), ALGORITHM=INSTANT;
ALTER TABLE employees MODIFY COLUMN phone VARCHAR(32);
ALTER TABLE employees RENAME COLUMN mobile TO phone;
ALTER TABLE employees DROP COLUMN phone;
DROP TABLE employees;
```

## 3. 用户与权限

```sql
CREATE USER 'app'@'10.0.%' IDENTIFIED BY 'Str0ng@Pass';
GRANT SELECT, INSERT, UPDATE, DELETE ON mydb.* TO 'app'@'10.0.%';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'192.168.1.%';
SHOW GRANTS FOR 'app'@'10.0.%';
REVOKE DELETE ON mydb.* FROM 'app'@'10.0.%';
ALTER USER 'app'@'10.0.%' PASSWORD EXPIRE INTERVAL 90 DAY;
DROP USER 'app'@'10.0.%';
```

说明：`GRANT`/`REVOKE` 执行后权限即时生效，不需要 `FLUSH PRIVILEGES`（只有直接修改 `mysql` 系统表时才需要）。

## 4. 备份与恢复

```bash
# 逻辑备份：单个库（InnoDB 建议加 --single-transaction 保证一致性）
mysqldump -u root -p --single-transaction --routines --triggers mydb > mydb.sql

# 全实例备份
mysqldump -u root -p --single-transaction --all-databases > all.sql

# 恢复
mysql -u root -p mydb < mydb.sql

# 压缩备份与解压恢复
mysqldump -u root -p --single-transaction mydb | gzip > mydb.sql.gz
gunzip < mydb.sql.gz | mysql -u root -p mydb

# MySQL Shell 并行逻辑备份/恢复（推荐，8.0）
mysqlsh root@localhost -e "util.dumpInstance('/data/backup/inst', {threads: 4})"
mysqlsh root@localhost -e "util.loadDump('/data/backup/inst', {threads: 4})"

# 物理热备份（Percona XtraBackup）
xtrabackup --backup --target-dir=/data/backup/base --user=root --password=xxx
xtrabackup --prepare --target-dir=/data/backup/base
xtrabackup --copy-back --target-dir=/data/backup/base
```

## 5. 状态诊断与性能排查

```sql
-- 当前正在执行的语句
SHOW PROCESSLIST;          -- SHOW FULL PROCESSLIST 可看到完整 SQL
SELECT * FROM information_schema.processlist WHERE command = 'Query';

-- 最耗时的语句（按指纹聚合）
SELECT DIGEST_TEXT, COUNT_STAR, ROUND(SUM_TIMER_WAIT/1e12, 3) AS total_sec
FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC LIMIT 10;

-- InnoDB 状态（事务、锁等待、死锁、缓冲池）
SHOW ENGINE INNODB STATUS\G

-- 当前锁等待（8.0）
SELECT * FROM performance_schema.data_lock_waits\G

-- 表与索引大小
SELECT table_name,
       ROUND(data_length/1024/1024) AS data_mb,
       ROUND(index_length/1024/1024) AS index_mb,
       table_rows
FROM information_schema.tables
WHERE table_schema = 'mydb'
ORDER BY data_length DESC;

-- 更新统计信息 / 重建表
ANALYZE TABLE employees;
OPTIMIZE TABLE employees;    -- InnoDB 上等价于重建表+重建索引，期间允许并发读写，
                             -- 但需要额外磁盘空间，并在开始/结束时有短暂的元数据锁
```

## 6. 复制相关

```sql
-- 8.0.23 及以后的新语法（旧版本为 CHANGE MASTER TO）
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='192.168.1.10', SOURCE_PORT=3306,
  SOURCE_USER='repl', SOURCE_PASSWORD='xxx',
  SOURCE_AUTO_POSITION=1;

START REPLICA;            -- 旧版本 START SLAVE
STOP REPLICA;
SHOW REPLICA STATUS\G     -- 旧版本 SHOW SLAVE STATUS；关注
                          -- Replica_IO_Running / Replica_SQL_Running / Seconds_Behind_Source
RESET REPLICA ALL;        -- 清空复制配置（旧版本 RESET SLAVE ALL）

-- 半同步复制（8.0.26+ 命名，旧版本为 rpl_semi_sync_master_*）
INSTALL PLUGIN rpl_semi_sync_source SONAME 'semisync_source.so';
SET GLOBAL rpl_semi_sync_source_enabled = 1;
```

## 7. 变量的查看与修改

```sql
-- 会话级 / 全局级修改（重启后失效）
SET SESSION long_query_time = 0.5;
SET GLOBAL long_query_time = 0.5;

-- 持久化到 mysqld-auto.cnf，重启后仍生效（8.0）
SET PERSIST max_connections = 1000;
SET PERSIST_ONLY innodb_redo_log_capacity = 2147483648;

-- 撤销持久化
RESET PERSIST max_connections;
```

## 8. 索引与执行计划

```sql
CREATE INDEX idx_dept ON employees(department_id);
CREATE INDEX idx_name ON employees(last_name, first_name);
ALTER TABLE employees ALTER INDEX idx_dept INVISIBLE;   -- 让优化器忽略（8.0）
DROP INDEX idx_dept ON employees;

EXPLAIN SELECT * FROM employees WHERE department_id = 1;
EXPLAIN FORMAT=TREE SELECT ... ;      -- 8.0.16+
EXPLAIN ANALYZE SELECT ... ;          -- 8.0.18+，会真实执行
```

## 9. 事务与锁

```sql
START TRANSACTION;            -- 或 BEGIN
SELECT ... FOR UPDATE;        -- 加排他行锁
SELECT ... FOR UPDATE SKIP LOCKED;   -- 跳过已锁行（8.0.1+）
SELECT ... FOR SHARE;         -- 共享锁（8.0 的写法，旧写法 LOCK IN SHARE MODE）
COMMIT;
ROLLBACK;

-- 锁等待超时（默认 50 秒）
SHOW VARIABLES LIKE 'innodb_lock_wait_timeout';
```
