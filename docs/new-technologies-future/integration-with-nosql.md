# Integrating with NoSQL Databases

MySQL is primarily a relational database, but it offers several ways to connect with the NoSQL ecosystem: you can store unstructured data such as JSON, documents and key-value pairs directly in MySQL, or have the application use MySQL alongside dedicated databases like Redis, MongoDB and Elasticsearch (polyglot persistence). This chapter introduces these paths and where they fit.

## 1. MySQL Document Store

### 1.1 What is a document store

Since 5.7, MySQL supports the **X Plugin** (X Protocol, default port **33060**), and combined with MySQL Shell you can work with MySQL like a document database without writing SQL:

- **Collections**: a collection is a schemaless container of documents, where each document is a JSON object, still stored in InnoDB underneath;
- **A unified X DevAPI**: `db.get_collection()`, `collection.add()`, `collection.find()`, `collection.modify()`, `collection.remove()`, `collection.insert()` cover CRUD on documents;
- **Multi-language drivers**: Connector/Node.js, Connector/Python, Connector/C++, Connector/Java and Connector/.NET all support the X DevAPI, and the document and relational interfaces can be mixed within the same driver.

### 1.2 Common operations

```javascript
// mysqlsh JavaScript 模式
db.createCollection('shop.orders');       // 创建集合（底层是 InnoDB 表）
var col = db.get_collection('shop.orders');
col.add({_id: 1, product: 'Keyboard', qty: 2, tags: ['peripherals']}).execute();
col.find('qty > 1').fields(['_id', 'product']).execute().fetchAll();
col.modify('_id = 1').set({qty: 3}).execute();
col.remove('_id = 1').execute();
```

The corresponding relational table operations use APIs other than `db.get_collection()`, such as `db.shop.get_table('orders')` together with `select()` / `insert()` / `update()` / `delete()`.

### 1.3 Combining with the JSON type

Even without the X Protocol, you can store documents using relational tables plus JSON columns:

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

Key points:

- The `JSON` type was introduced in 5.7.8, and 8.0 adds `JSON_TABLE()` (turns JSON into a relation for JOINs and aggregation), `JSON_SCHEMA_VALID()` validation and multi-valued indexes;
- Fields frequently used as query conditions should be pulled out into generated columns and indexed — a condition on a `JSON_EXTRACT` expression cannot use a normal index;
- `JSON_TABLE()` can expand an array into rows within a single SQL statement, commonly used for log parsing and event reporting.

## 2. Working with other NoSQL components

In a typical architecture MySQL doesn't "replace" NoSQL — they each do their own job:

| Scenario | Combination | Notes |
| ---- | ---------- | ---- |
| High-frequency reads, hot data caching | MySQL + Redis/Memcached | Application-level caching to reduce database load; MySQL itself has removed the query cache, so caching can only live on the application side |
| Frequently changing structure, fast iteration | MySQL Document Store / JSON columns | Land it with a flexible document shape first, then promote key fields to columns and indexes once stable |
| Full-text search, complex search | MySQL + Elasticsearch | MySQL provides full-text indexes (`FULLTEXT`) for simple search; leave complex aggregation, tokenization and highlighting to ES |
| High-concurrency key-value access | MySQL + caching layer | Put hot counters and sessions in Redis, and transactional data in MySQL |

### 2.1 The InnoDB Memcached plugin

MySQL provides the `daemon_memcached` plugin, which lets clients read and write InnoDB table data directly over the memcached protocol, bypassing the SQL layer. It suits very high QPS simple key-value access (such as looking up a state by session ID):

- Pros: very low latency, little connection overhead;
- Cons: bypasses SQL validation and part of the transaction semantics, so it only suits "well-defined keys, simple logic" scenarios — assess your consistency requirements carefully before using it.

### 2.2 Dual writes and consistency

When using MySQL together with Redis or Elasticsearch, consistency can only be maintained at the application layer. Common approaches:

- **Synchronous dual write**: write MySQL, and once it succeeds write ES/Redis. Simple logic, but you need to handle the consistency window and retries on failure;
- **Subscribing to the binlog (Canal, Debezium, Maxwell)**: treat MySQL's binlog as the single source of truth and deliver asynchronously to ES/Redis. Decoupled and reliable, this is the mainstream approach today;
- **Compensation and reconciliation**: use a tool like `pt-table-checksum` to periodically compare the source and the target system, and find and fix inconsistencies.

## 3. Full-text search and spatial capabilities

- **Full-text indexes**: `FULLTEXT` indexes support natural language and boolean mode retrieval (`MATCH(col) AGAINST(...)`); for spaceless languages like Chinese you need the ngram/parser plugin (`ngram_token_size`).
- **Spatial data**: 8.0 provides complete spatial indexes (`SPATIAL`) and geometry functions, sufficient for geolocation queries.

## 4. Vector search (9.x)

The MySQL 9.x innovation releases introduce the `VECTOR` data type and vector similarity search, used for vector storage and recall in AI scenarios (such as similar documents and semantic search), giving MySQL basic vector database capabilities beyond the relational model. This feature is still in the innovation line, so confirm the version and support status before using it in production.

## Summary

MySQL's integration with NoSQL has three layers of meaning: first, **document storage and JSON**, bringing semi-structured data natively into MySQL; second, **working with dedicated components like Redis and Elasticsearch**, achieving "relational + NoSQL" polyglot persistence via application-level caching or binlog subscription; third, new capabilities such as a **performance-oriented bypass** (the Memcached plugin) and **vector search** (9.x). When choosing, follow the principle of "keep data with high transactional and consistency demands in MySQL, and hand high-concurrency hotspots and complex search to dedicated components."

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [knowledge](/knowledge.md)
- [README](README.md)
