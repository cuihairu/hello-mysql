# 内容结构改动复核（2026-10-19）

## 复核范围

已先执行 `git fetch origin && git pull --rebase origin main`，结果为 `Already up to date`；复核开始时工作区干净。仓库实际最近四个提交（按时间顺序）为：

- `37e88b7` Add structure audit report
- `d1126cb` Unify documentation navigation source（A：统一导航源）
- `e9222ae` Clarify overlapping documentation topics（B：重复主题澄清/合并）
- `ee98aa4` Align project documentation description（C：统一项目口径）

对照范围为 `HEAD~4..HEAD`，共 4 个提交、14 个文件（1 个新增审计报告，13 个既有文件修改），未发现删除文件。重点逐段核对 `transactions.md` 的删除内容、SUMMARY 目录条目、README 表述、sidebar 和所有新增交叉链接。以下行号均指复核时的当前版本；删除内容另注明旧版本行号。

## 四项核查结论

### 1. 内容丢失：未发现

- B 删除集中在 `docs/advanced-features-internals/transactions.md` 旧版第 5–67 行。旧版事务定义/ACID 的展开内容现由 `transaction-concepts.md:7–29` 覆盖；BEGIN、COMMIT、ROLLBACK 示例及自动提交现由 `transaction-concepts.md:31–61` 和 `transaction-usage.md:5–58` 覆盖；四种隔离级别及 InnoDB 幻读说明现由 `transaction-concepts.md:21–26`、`isolation-levels-locks.md:7–61` 覆盖。旧版事务场景仍在 `transactions.md:15–21`，转账、订单和批量操作示例也在 `transaction-usage.md:60–84`。改后总览 `transactions.md:5–13` 明确链接到这些主题页。对照删除段落，未找到被删且未迁移的独有技术内容，因此无须补回。
- `docs/SUMMARY.md` 不是大幅精简：`d1126cb` 在其开头新增说明（当前 `SUMMARY.md:1–8`），完整旧目录映射从第 10 行继续保留；抽查第 1、2、4、5、6、7 部分及附录条目仍在（如 `SUMMARY.md:12–36, 77–120, 122–136`）。它已声明仅供追溯、不再作为导航维护源，没有删掉内容性条目。

### 2. 表述改错：未发现技术含义反转或错误数字

- README 改动仅描述项目定位，没有新增篇数、文件数或目录数。英文前后对比：`README.md:16,22`，由 “MySQL Knowledge Handbook” / “A Chinese-language knowledge site covering ... advanced data processing ...” 改为个人笔记和开发经验集合；中文前后对比：`README.zh.md:16,22`，由“中文知识站点”改为“个人经验分享，不按课程或学习路径组织”。原文与新文均没有“支持/不支持”一类技术能力断言，改写未改变 MySQL 技术结论。
- 文案主题覆盖与仓库相符：9 个内容主题目录为 `basics`、`database-design`、`advanced-sql-data-processing`、`advanced-features-internals`、`architecture-deployment`、`performance-tuning`、`tools-practice`、`appendix`、`new-technologies-future`；README 的 SQL/数据库设计/底层原理/部署/性能/工具描述没有声称这些目录数量或篇数。仓库当时可见 Markdown 计数随审计报告自身加入而变化，不能作为 README 数字错误证据。
- 侧栏仍保留“第1部分”至“第7部分”（`sidebar.json:3` 起至第 7 部分工具组），因此“不是按课程或学习路径组织”属于项目定位措辞，不是结构事实的精确描述；未发现它造成技术含义错误。是否更偏好称为“笔记站”是编辑取舍，本次不列为缺陷、不改写。

### 3. 链接与导航：已核对的本地目标正确

- 递归读取 `docs/.vitepress/sidebar.json` 得到 124 个 link，124 个目标均存在、目标无重复。改动涉及的附录目标 `/appendix/README` 在 `sidebar.json:527–547` 仅保留父级一个入口，目标文件存在；附录子组改名“附录资料”不再重复链接。
- B 新增的交叉链接均指向对应主题：索引设计与实现分别对应 `database-design/index-design.md:3`、`advanced-features-internals/index-types.md:3`；工具总览与性能观测分别对应 `tools-practice/mysql-tools.md:3`、`performance-tuning/mysql-tools.md:3`；事务概念、操作、隔离和锁对应 `transaction-concepts.md:3`、`transactions.md:9–11`、`isolation-levels-locks.md:3`、`locking-mechanisms.md:3`、`lock-types.md:3`。人工查看页面标题及正文主题，未见“存在但主题不符”的目标。
- 未核实：外部 URL 可达性、部署后的路由/锚点，以及本次复核时的完整站点构建。以上不影响本地 sidebar 目标核验结论。

### 4. 证据边界与未核实项

已检查 Git 改动、目标文件存在性、改动句子及对应页面主题。没有把旧结构审计报告中的构建/链接结论冒充为本次重新运行的结果；外链、构建产物与浏览器实际导航均未核实。未发现需要因证据不足而暂缓判断的争议性删并决策。

## 发现的问题清单

| 严重度 | 问题 | 证据 | 是否已修 / commit |
|---|---|---|---|
| — | 未发现明确内容丢失、错误数字、技术含义改反或链接指错 | 见上述四项核查 | 无需修复 |

## 结论

在本报告列明的复核范围内，这批结构与口径改动可以视为**已验收**：未发现需补回的独有内容，也未发现明确表述或本地导航错误。外链和本次构建未核实，不纳入通过结论。此结论不代替对未核实项的发布后验证。
