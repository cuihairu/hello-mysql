# 与NoSQL数据库的整合

MySQL 主要是一个关系型数据库，但它也提供多种途径与 NoSQL 生态对接：既可以把 JSON、文档、键值这类非结构化数据直接存进 MySQL，也可以让应用同时使用 MySQL 和 Redis、MongoDB、Elasticsearch 等专用数据库（多语言持久化，Polyglot Persistence）。本章介绍这些途径及其适用场景。

## 1. MySQL 文档存储（Document Store）

### 1.1 什么是文档存储

自 5.7 起，MySQL 支持 **X Plugin**（X Protocol，默认端口 **33060**），配合 MySQL Shell 可以像使用文档数据库一样操作 MySQL，而不必写 SQL：

- **集合（Collection）**：集合是无模式的文档容器，每个文档是一个 JSON 对象，底层仍然由 InnoDB 存储；
- **统一的 X DevAPI**：`db.get_collection()`、`collection.add()`、`collection.find()`、`collection.modify()`、`collection.remove()`、`collection.insert()`，覆盖文档的增删改查；
- **多语言驱动**：Connector/Node.js、Connector/Python、Connector/C++、Connector/Java、Connector/.NET 均支持 X DevAPI，文档接口与关系接口可以在同一个驱动中混用。

### 1.2 常用操作

```javascript
// mysqlsh JavaScript 模式
db.createCollection('shop.orders');       // 创建集合（底层是 InnoDB 表）
var col = db.get_collection('shop.orders');
col.add({_id: 1, product: 'Keyboard', qty: 2, tags: ['peripherals']}).execute();
col.find('qty > 1').fields(['_id', 'product']).execute().fetchAll();
col.modify('_id = 1').set({qty: 3}).execute();
col.remove('_id = 1').execute();
```

对应的关系表操作使用 `db.get_collection()` 之外的 API，例如 `db.shop.get_table('orders')` 与 `select()` / `insert()` / `update()` / `delete()`。

### 1.3 与 JSON 类型结合

即使不使用 X Protocol，也可以用关系表 + JSON 列的方式存储文档：

```sql
CREATE TABLE orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  doc JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  -- 从 JSON 中提取常用字段，用生成列 + 索引参与查询与统计
  customer_id BIGINT GENERATED ALWAYS AS (doc->>'$.customer_id') STORED,
  INDEX idx_customer (customer_id)
);

SELECT id, doc->>'$.status' AS status
FROM orders
WHERE JSON_EXTRACT(doc, '$.status') = 'PAID'
  AND JSON_CONTAINS(doc, '"peripherals"', '$.tags');
```

要点：

- `JSON` 类型在 5.7.8 引入，8.0 增加 `JSON_TABLE()`（把 JSON 转成关系表参与 JOIN/聚合）、`JSON_SCHEMA_VALID()` 校验与多值索引；
- 经常用作查询条件的字段应抽成生成列并建索引，直接对 `JSON_EXTRACT` 表达式做条件判断无法利用普通索引；
- `JSON_TABLE()` 可以在一条 SQL 内把数组展开成行，常用于日志解析与埋点上报。

## 2. 与其他 NoSQL 组件的协同

典型架构中 MySQL 不是“取代”NoSQL，而是与它们各司其职：

| 场景 | 选择的组合 | 说明 |
| ---- | ---------- | ---- |
| 高频读、热点数据缓存 | MySQL + Redis/Memcached | 应用层缓存，降低数据库负载；MySQL 本身已移除查询缓存，缓存只能放在应用侧 |
| 结构多变、快速迭代 | MySQL 文档存储 / JSON 列 | 先用灵活的文档结构落地，稳定后把关键字段抽成列和索引 |
| 全文检索、复杂搜索 | MySQL + Elasticsearch | MySQL 提供全文索引（`FULLTEXT`）满足简单检索；复杂聚合、分词、高亮交给 ES |
| 高并发键值访问 | MySQL + 缓存层 | 热点计数、会话等放 Redis，事务型数据落 MySQL |

### 2.1 InnoDB Memcached 插件

MySQL 提供 `daemon_memcached` 插件，允许客户端用 memcached 协议直接读写 InnoDB 表中的数据，绕过 SQL 层，适合超高 QPS 的简单键值读写（如根据会话 ID 取状态）：

- 优点：延迟极低、连接开销小；
- 缺点：绕过 SQL 校验和部分事务语义，只适合“键值明确、逻辑简单”的场景，使用前需谨慎评估一致性要求。

### 2.2 双写与一致性

同时使用 MySQL 与 Redis、Elasticsearch 时，一致性只能靠应用层维护，常见做法：

- **同步双写**：写 MySQL 成功后写 ES/Redis，逻辑简单但一致性窗口和失败重试需要处理；
- **订阅 binlog（Canal、Debezium、Maxwell）**：以 MySQL 的 binlog 为唯一事实来源，异步投递到 ES/Redis，解耦、可靠性高，是当前主流方案；
- **补偿与对账**：用 `pt-table-checksum` 这类工具定期比对源库与目标系统，发现并修复不一致。

## 3. 全文检索与空间能力

- **全文索引**：`FULLTEXT` 索引支持自然语言与布尔模式检索（`MATCH(col) AGAINST(...)`），对中文等无空格分词的语言需配合 ngram/parser 插件（`ngram_token_size`）。
- **空间数据**：8.0 提供完整的空间索引（`SPATIAL`）与几何函数，可承载地理位置类查询。

## 4. 向量检索（9.x）

MySQL 9.x 创新版引入 `VECTOR` 数据类型与向量相似度检索能力，用于 AI 场景中的向量存储与召回（如相似文档、语义检索），让 MySQL 在关系型之外具备了基础的向量数据库能力。该特性目前仍处在创新版中，生产使用前需确认版本与支持状态。

## 总结

MySQL 对 NoSQL 的整合有三层含义：一是**文档存储与 JSON**，把半结构化数据原生纳入 MySQL；二是**与 Redis、Elasticsearch 等专用组件协同**，通过应用层缓存或 binlog 订阅实现“关系型 + NoSQL”的多语言持久化；三是**性能型旁路**（Memcached 插件）与**向量检索**（9.x）等新能力。选型时应遵循“事务与一致性要求高的数据留在 MySQL，高并发热点与复杂检索交给专用组件”的原则。
