# JSON 函数

MySQL 从 5.7 开始提供原生 `JSON` 数据类型，8.0 又补充了 `JSON_TABLE`、多值索引等能力。对半结构化数据（配置、埋点、API 报文），不必再退回到字符串截取。本页聚焦 8.0 中最常用的读写函数。

示例使用下面这张表：

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

## 1. JSON 类型与校验

`JSON` 列以二进制格式存储：写入时校验合法性，随机读取比等价的 `TEXT` 字符串更快。插入非法 JSON 会直接报错：

```sql
-- 校验一个字符串是否是合法 JSON（合法返回 1）
SELECT JSON_VALID('{"a": 1}'), JSON_VALID('{a: 1}');
```

## 2. 提取：JSON_EXTRACT 与 ->、->>

`JSON_EXTRACT(doc, path)` 按路径取值；`->` 是它的简写，`->>` 额外去掉外层引号、返回字符串（两者均为 MySQL 8.0.21 起提供）：

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

常用简写：`col ->> '$.key'` 取字段值参与比较和分组；`col -> '$.key'` 保持 JSON 结构继续嵌套提取。

## 3. 构造：JSON_OBJECT、JSON_ARRAY 与聚合

```sql
-- 构造新文档
SELECT JSON_OBJECT('name', 'Alice', 'roles', JSON_ARRAY('admin', 'dev'));

-- 把多行聚合成一个 JSON 数组 / 对象
SELECT JSON_ARRAYAGG(doc ->> '$.item') AS items
FROM orders;

SELECT JSON_OBJECTAGG(id, doc ->> '$.item') AS by_id
FROM orders;
```

## 4. 修改：JSON_SET、JSON_REPLACE、JSON_REMOVE

三个函数都返回新文档，不修改原列，配合 `UPDATE` 落库：

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

## 5. 判断与搜索：JSON_CONTAINS、JSON_SEARCH

```sql
-- doc 中是否包含给定值（注意比较的是 JSON 值，字符串不带引号）
SELECT JSON_CONTAINS(doc, '"mech"', '$.tags') FROM orders WHERE id = 1;

-- 路径下是否存在某字段
SELECT JSON_CONTAINS_PATH(doc, 'one', '$.paid', '$.item') FROM orders;

-- 在所有字符串中做模糊搜索，第二个参数是通配符模式
SELECT JSON_SEARCH(doc, 'one', '%a%') FROM orders WHERE id = 1;
```

`JSON_CONTAINS` 的目标值要写成 JSON 字面量（字符串用双引号包一层），数字直接写。

## 6. 展开：JSON_TABLE

`JSON_TABLE`（8.0.4 起提供）把 JSON 数组展开成关系表的行，之后可以正常 `JOIN`、聚合：

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

## 7. 性能与索引

- `JSON` 列本身无法建普通索引，所有 `JSON_EXTRACT` 都是逐行解析，数据量大时是热点。
- 常用字段的标准做法是**生成列 + 索引**：

```sql
ALTER TABLE orders
  ADD COLUMN item VARCHAR(50) GENERATED ALWAYS AS (doc ->> '$.item') STORED,
  ADD INDEX idx_item (item);

-- 之后可以直接走索引
SELECT * FROM orders WHERE item = 'keyboard';
```

- 数组场景可用**多值索引**（8.0.17 起提供），直接加速 `JSON_CONTAINS`：

```sql
ALTER TABLE orders
  ADD INDEX idx_tags ((CAST(doc ->> '$.tags' AS CHAR(64) ARRAY)));
```

- 不要对 JSON 字段包一层函数做过滤（如 `WHERE JSON_EXTRACT(doc, '$.item') = 'x'` 在无生成列时无法用索引）；把比较下沉到生成列上。
