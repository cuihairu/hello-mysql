# JSON Functions

MySQL has provided a native `JSON` data type since 5.7, and 8.0 added `JSON_TABLE`, multi-value indexes and so on. For semi-structured data (config, event tracking, API payloads) you no longer have to fall back to string slicing. This page focuses on the read and write functions most used in 8.0.

The examples use the table below:

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer VARCHAR(50),
  doc JSON
);

INSERT INTO orders VALUES
  (1, 'Alice', '{"item": "keyboard", "qty": 2, "tags": ["mech", "rgb"], "ship": {"city": "Beijing", "fee": 12}}'),
  (2, 'Bob',   '{"item": "mouse", "qty": 1, "tags": ["wireless"], "ship": {"city": "Shanghai", "fee": 8}}'),
  (3, 'Carol', '{"item": "monitor", "qty": 1, "tags": ["4k", "hdr"], "ship": {"city": "Beijing", "fee": 0}}');
```

## 1. The JSON type and validation

A `JSON` column is stored in binary form: values are validated on write, and random access is faster than an equivalent `TEXT` string. Inserting invalid JSON errors out directly:

```sql
-- 校验一个字符串是否是合法 JSON（合法返回 1）
SELECT JSON_VALID('{"a": 1}'), JSON_VALID('{a: 1}');
```

## 2. Extraction: JSON_EXTRACT and `->`, `->>`

`JSON_EXTRACT(doc, path)` reads a value by path; `->` is shorthand for it, and `->>` additionally strips the outer quotes and returns a string (both available from MySQL 8.0.21):

```sql
-- JSON_EXTRACT 返回 JSON 值：字符串带引号
SELECT JSON_EXTRACT(doc, '$.item') FROM orders WHERE id = 1;

-- -> 与 JSON_EXTRACT 等价；->> 等价于 JSON_UNQUOTE(JSON_EXTRACT(...))
SELECT doc -> '$.item'      AS item_json,
       doc ->> '$.item'     AS item_str,
       doc ->> '$.ship.city' AS city
FROM orders WHERE id = 1;

-- 数组元素用下标，-1 表示最后一个
SELECT doc ->> '$.tags[0]'  AS first_tag,
       doc ->> '$.tags[-1]' AS last_tag
FROM orders WHERE id = 1;
```

Common shorthand: `col ->> '$.key'` to pull a field value for comparison and grouping; `col -> '$.key'` keeps the JSON structure so you can keep extracting nested values.

## 3. Construction: JSON_OBJECT, JSON_ARRAY and aggregation

```sql
-- 构造新文档
SELECT JSON_OBJECT('name', 'Alice', 'roles', JSON_ARRAY('admin', 'dev'));

-- 把多行聚合成一个 JSON 数组 / 对象
SELECT JSON_ARRAYAGG(doc ->> '$.item') AS items
FROM orders;

SELECT JSON_OBJECTAGG(id, doc ->> '$.item') AS by_id
FROM orders;
```

## 4. Modification: JSON_SET, JSON_REPLACE, JSON_REMOVE

All three return a new document; they do not change the original column. Use them with `UPDATE` to persist the change:

```sql
-- JSON_SET：字段不存在则新增，存在则覆盖
UPDATE orders
SET doc = JSON_SET(doc, '$.ship.fee', 15, '$.paid', TRUE)
WHERE id = 2;

-- JSON_REPLACE：只覆盖已存在的字段
UPDATE orders
SET doc = JSON_REPLACE(doc, '$.qty', doc ->> '$.qty' + 1)
WHERE id = 3;

-- JSON_REMOVE：删除字段
UPDATE orders
SET doc = JSON_REMOVE(doc, '$.ship.fee')
WHERE id = 1;

-- JSON_MERGE_PATCH：按 RFC 7386 合并，后者覆盖前者
SELECT JSON_MERGE_PATCH('{"a": 1, "b": 2}', '{"b": 3, "c": 4}');
```

## 5. Checks and search: JSON_CONTAINS, JSON_SEARCH

```sql
-- doc 中是否包含给定值（注意比较的是 JSON 值，字符串不带引号）
SELECT JSON_CONTAINS(doc, '"mech"', '$.tags') FROM orders WHERE id = 1;

-- 路径下是否存在某字段
SELECT JSON_CONTAINS_PATH(doc, 'one', '$.paid', '$.item') FROM orders;

-- 在所有字符串中做模糊搜索，第二个参数是通配符模式
SELECT JSON_SEARCH(doc, 'one', '%a%') FROM orders WHERE id = 1;
```

The target value for `JSON_CONTAINS` must be written as a JSON literal (wrap a string in double quotes); numbers are written as-is.

## 6. Unfolding: JSON_TABLE

`JSON_TABLE` (available from 8.0.4) unfolds a JSON array into rows of a relational table, so you can then `JOIN` and aggregate on it as usual:

```sql
-- 把 tags 数组展开成行
SELECT o.id, o.customer, j.tag
FROM orders o,
     JSON_TABLE(o.doc, '$.tags[*]' COLUMNS (
       tag VARCHAR(20) PATH '$'
     )) AS j
WHERE o.id = 1;

-- 按 tag 统计订单数
SELECT j.tag, COUNT(*) AS cnt
FROM orders o,
     JSON_TABLE(o.doc, '$.tags[*]' COLUMNS (
       tag VARCHAR(20) PATH '$'
     )) AS j
GROUP BY j.tag;
```

## 7. Performance and indexes

- A `JSON` column cannot have a normal index at all, and every `JSON_EXTRACT` parses row by row, so it becomes a hotspot on large tables.
- The standard approach for frequently queried fields is a **generated column + index**:

```sql
ALTER TABLE orders
  ADD COLUMN item VARCHAR(50) GENERATED ALWAYS AS (doc ->> '$.item') STORED,
  ADD INDEX idx_item (item);

-- 之后可以直接走索引
SELECT * FROM orders WHERE item = 'keyboard';
```

- For arrays you can use a **multi-value index** (available from 8.0.17), which speeds up `JSON_CONTAINS` directly:

```sql
ALTER TABLE orders
  ADD INDEX idx_tags ((CAST(doc ->> '$.tags' AS CHAR(64) ARRAY)));
```

- Do not wrap a JSON field in a function to filter on it (for example `WHERE JSON_EXTRACT(doc, '$.item') = 'x'` cannot use an index without a generated column); push the comparison down onto the generated column instead.

## References

- [MySQL 8.0 Reference Manual · SQL Statements](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [MySQL 8.0 Reference Manual · JSON Functions](https://dev.mysql.com/doc/refman/8.0/en/json-functions.html)
- [MySQL 8.0 Reference Manual · JSON](https://dev.mysql.com/doc/refman/8.0/en/json.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
