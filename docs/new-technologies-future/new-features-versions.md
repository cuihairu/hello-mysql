# 新特性与版本更新

MySQL 的版本号变化频繁，很多新特性的“版本归属”容易被记错。本章按时间线梳理主要版本与关键特性，并给出选型与升级建议。

## 1. 版本时间线

| 版本 | GA 时间 | 定位 | 关键特性 |
| ---- | ------- | ---- | -------- |
| 5.5 | 2010-10 | 过渡版本 | InnoDB 成为默认存储引擎、半同步复制引入 |
| 5.6 | 2013-02 | 成熟版本 | GTID 与多线程复制雏形、Online DDL、InnoDB 性能大幅提升 |
| 5.7 | 2015-10 | 经典版本 | 原生 JSON 类型、生成列、并行复制（LOGICAL_CLOCK）、`sys` schema、动态调整 buffer pool |
| 8.0 | 2018-04 | 当前主流 | 事务型数据字典、原子 DDL、窗口函数、CTE、角色、默认 utf8mb4、默认认证插件 caching_sha2_password |
| 8.4 | 2024-04 | LTS（长期支持） | 清理一批废弃项：`mysql_native_password` 默认禁用、复制与选项命名进一步统一 |
| 9.x | 2024-07 起 | 创新版（Innovation） | `VECTOR` 向量类型与向量检索、JavaScript 存储过程等面向新场景的能力 |

说明：MySQL 采用“LTS + 创新版”双轨发布模式——创新版按季度发布，只在下一个版本发布前提供修复；LTS 版本提供长期支持。生产环境通常选择 LTS 或 8.0 这类成熟版本，创新版用于提前验证新特性。

## 2. 易混淆的版本归属

以下特性经常被张冠李戴，列出正确的归属版本：

- **窗口函数、公用表表达式（CTE）、递归 CTE**：MySQL **8.0** 才有，5.7 不支持。
- **JSON 数据类型**：**5.7.8** 引入，8.0 增加 `JSON_TABLE()`、JSON Schema 校验、多值索引等增强。
- **生成列（Generated Columns）**：**5.7.6** 引入；函数索引在 8.0.13 起可以通过“在函数表达式上建索引”实现（底层即不可见生成列 + 索引）。
- **GTID**：**5.6** 引入。8.0 中 `gtid_mode`、`enforce_gtid_consistency` 的默认值**仍是 `OFF`**，需要手动开启；不要把“GTID 默认开启”当成 8.0 的特性。
- **默认字符集 `utf8mb4`**：**8.0** 起（默认排序规则 `utf8mb4_0900_ai_ci`）。5.x 的默认字符集是 `latin1`，`utf8` 实际是最大 3 字节的 `utf8mb3`，无法存储 Emoji 等四字节字符。
- **默认认证插件 `caching_sha2_password`**：**8.0** 起。8.4 起 `mysql_native_password` 插件默认被禁用。
- **`SET PERSIST`（持久化系统变量）**：**8.0** 起。
- **查询缓存（Query Cache）**：5.7 中已不建议使用（默认关闭），**8.0 中被彻底移除**，`query_cache_size` 等变量不复存在。
- **InnoDB 成为默认存储引擎**：**5.5**；8.0 中系统表也全部改用 InnoDB（数据字典事务化）。
- **半同步复制**：**5.5** 引入，8.0.26 起插件与变量名由 `rpl_semi_sync_master_*` 更名为 `rpl_semi_sync_source_*`。
- **`SHOW PROCESSLIST` 的替代方案**：`performance_schema.threads` 与 `information_schema.processlist` 均可用；`SHOW PROCESSLIST` 本身**不支持 `WHERE` 子句**。
- **`EXPLAIN ANALYZE`**：**8.0.18**；`EXPLAIN FORMAT=TREE`：**8.0.16**。
- **Hash Join**：**8.0.18**。
- **INSTANT 加列（不重建表的 `ADD COLUMN`）**：**8.0.12**，8.0.29 扩展到更多 DDL 操作。
- **克隆插件（Clone Plugin）**：**8.0.17**。
- **组复制（Group Replication）**：**8.0**（5.7 曾提供实验室版本，GA 于 8.0）。
- **`INTERSECT` / `EXCEPT`**：**8.0.31**（此前只有 `UNION`）。

## 3. 升级路径建议

1. **先做兼容性检查**：使用 MySQL Shell 的 `util.checkForServerUpgrade()` 检查废弃选项、保留字冲突、不兼容的 SQL 用法；重点确认配置文件中是否还残留 `query_cache_size`、`query_cache_type` 等已移除变量。
2. **逐版本升级**：官方支持 5.7 → 8.0 的原地升级；跨多个大版本（如 5.6 → 8.0）应分步进行。
3. **先验证应用与驱动**：
   - 默认认证插件变为 `caching_sha2_password`，旧驱动/连接池需要升级，否则会报认证错误；
   - 默认字符集变为 `utf8mb4`，注意隐式转换、索引长度（`utf8mb4` 每字符 4 字节）与排序规则差异；
   - 8.0 的复制术语更名（`source`/`replica`）影响脚本与监控中的变量名。
4. **升级前必备**：完整备份（建议 XtraBackup 物理备份 + mysqldump 逻辑备份各一份）、从库先升级验证、回滚预案。
5. **选择 LTS**：生产环境建议选择 8.0 或 8.4 这类版本；创新版只用于测试环境尝鲜。

## 4. 版本支持周期

Oracle 对每个 GA 版本提供 Premier Support 与 Extended Support，具体年限以官方 [Oracle 生命周期支持政策](https://www.oracle.com/support/lifetime-support/) 与 MySQL 发布说明为准。规划升级时，建议把“当前版本是否仍在支持期内”纳入评估：支持期结束的版本不再有安全补丁，继续使用会带来合规与安全风险。

## 总结

梳理版本与特性的对应关系，有助于在读文档、写 SQL、做升级评估时避免“把 5.7 当 8.0 用”的常见错误。记住几条主线：8.0 是分水岭（数据字典、窗口函数、utf8mb4、移除查询缓存），8.4 是 LTS，9.x 是创新版；GTID 自 5.6 引入但默认关闭，默认认证插件在 8.0 变更、8.4 收紧。
