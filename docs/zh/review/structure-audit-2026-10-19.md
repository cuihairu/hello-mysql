# hello-mysql 目录与内容组织审计

审计日期：2026-10-19
范围：仓库当前 Git 工作区；只读检查。`docs/.vitepress/dist` 是构建输出，不计入源文档统计。此报告是唯一新增文件。

## 量化事实

### docs 下一级目录的 Markdown 数量与行数

行数按文件换行行数统计，包含目录内的 `README.md`；`docs/SUMMARY.md` 是 VitePress 明确排除的目录映射底稿，仍计入 docs 根目录。未计 `.vitepress/dist`。

| docs 下一级目录 | .md 数量 | 总行数 |
|---|---:|---:|
| `advanced-features-internals/` | 22 | 2,188 |
| `advanced-sql-data-processing/` | 24 | 3,346 |
| `appendix/` | 4 | 383 |
| `architecture-deployment/` | 11 | 1,056 |
| `basics/` | 13 | 1,189 |
| `database-design/` | 18 | 1,757 |
| `new-technologies-future/` | 8 | 578 |
| `performance-tuning/` | 12 | 1,323 |
| `tools-practice/` | 10 | 1,030 |
| `(docs 根目录)` | 4 | 579 |
| **总计** | **126** | **13,429** |

### 组织轴与条目数

这里把“组织轴”定义为读者或维护者用来定位内容的并行结构；文件夹、迁移底稿、导航配置各计一轴。三轴指向大体相同的主题树，但分别维护，故存在同步成本。

| 组织轴 | 条目数 | 命名规律 | 有无编号 | 编号是否连续 |
|---|---:|---|---|---|
| 主题目录（实际内容位置） | 9 个主题目录，126 篇 Markdown（含根页与底稿） | 英文小写 kebab-case；目录名表示主题，如 `database-design`；每个主题通常有 `README.md` | 目录名与文章文件名均无数字前缀 | 不适用；文章前缀编号为 0 |
| mdBook 遗留章节映射 `docs/SUMMARY.md` | 7 个编号部分 + 1 个未编号“附录·未入目录”；映射约 124 个页面条目 | `第N部分：主题` + 缩进层级；条目链接指向主题页 | 有 | 第 1–7 部分连续；附录未编号是类型标签，不是断档 |
| VitePress sidebar `docs/.vitepress/sidebar.json` | 124 个 `link` 页面条目，8 个顶层分组（7 部分 + 未入目录）及 2 个独立页面条目 | 显示标题中文为主，链接路径与文件 slug 对应；层级表达章节/主题 | 有，沿用第 1–7 部分 | 连续；另有“附录·未入目录”、知识点整理、术语表 |

计数说明：sidebar 的 124 个 `link` 是配置条目总数，其中附录 README 在“附录·未入目录”下作为父链接出现；页面文件去重后为 123 个目标。配置检查找到 0 个不存在目标、0 个未进入侧边栏的可见内容页（首页 `index.md`、`SUMMARY.md` 映射底稿除外；根目录 `knowledge.md` 与 `glossary.md` 已进入 sidebar）。sidebar 统计可复现于 `docs/.vitepress/sidebar.json`；其配置入口见 `docs/.vitepress/config.mts:1-4,35-37`。

**未发现独立的指南目录、API 目录或 history 目录。** “历史”目前是主题文章 `docs/basics/history-and-development.md`，不是另起的文档轴；API 类型目录/页面未见。若“指南”指操作教程，当前分布在 `basics`、`tools-practice` 等主题目录内。

### 问题清单（证据与严重度）

#### 1. 编号断档、跳号、重复

**低：未发现文章文件数字前缀断档/跳号/重复。** 对 126 个 Markdown 文件名抽取“开头数字 + 分隔符”前缀，结果为 0 项；所以不存在可列的问题编号。章节编号只出现在 `docs/SUMMARY.md:3,58,75,91,103` 等条目标题中，编号为 1–7 连续，sidebar 沿用同一序列（如 `docs/.vitepress/sidebar.json:3-4,262-264`）。第 8 个主题被称为“附录·未入目录”而不是“第8部分”，是类别命名，不构成编号断档。

#### 2. 同一主题散落多处

- **中：MySQL 工具内容分为“工具实战”和“性能调优”两组。** 工具总览与客户端指南在 `docs/tools-practice/mysql-tools.md`、`docs/tools-practice/mysql-workbench.md`、`docs/tools-practice/mysql-shell.md`、`docs/tools-practice/percona-toolkit.md`、`docs/tools-practice/phpmyadmin.md`；监控/服务器运维工具在 `docs/performance-tuning/mysql-tools.md` 与 `docs/performance-tuning/third-party-tools.md`。证据：`docs/SUMMARY.md:91-114` 也分别把它们放在第 6、7 部分。区分“性能运维工具”和“通用客户端”有合理性，问题是两个同名 `mysql-tools` 页的边界与入口不直观，不能仅凭主题相似就合并。
- **低：数据库设计的索引主题与底层索引机制跨主题。** 设计建议在 `docs/database-design/index-design.md`，索引类型/创建/优化/底层选择在 `docs/advanced-features-internals/index-types.md`、`create-manage-indexes.md`、`index-optimization.md`、`index-why.md`；它们在 `docs/SUMMARY.md:22-35,58-67` 分属设计与底层原理。设计决策与实现机制是不同学习目的，现有分区本身合理；建议交叉链接，不要求搬迁。
- **低：事务与锁内容存在跨页关联。** `docs/advanced-features-internals/transactions.md`、`transaction-concepts.md`、`transaction-usage.md`、`isolation-levels-locks.md`、`index-and-locks.md`、`locking-mechanisms.md`、`lock-types.md`、`lock-optimization.md` 分拆讲概念、实践、隔离和锁。`docs/SUMMARY.md:68-80` 及 sidebar 对应分组提供了连续路径，属于主题内细分，并非无序散落。

#### 3. 命名风格不一致

- **中：slug 的大小写不统一。** 几乎所有文件为小写 kebab-case，唯一明显例外是 `docs/advanced-features-internals/Multi-Version-Concurrency-Control.md`，且 sidebar 以同样大小写链接（`docs/.vitepress/sidebar.json` 中 `Multi-Version-Concurrency-Control` 项）。跨平台部署、大小写敏感 URL 与搜索链接维护容易因此出现差异。
- **低：标题/文件名采用多种语言混合约定。** 主题目录和大多数 slug 是英文 kebab-case，页面标题主要中文并混有 SQL/API 产品名；根级 `README.md` 与 `README.zh.md` 通过语言后缀区分，合理但大小写风格与主题页 `README.md` 不同用途重叠。证据：根文件清单 `README.md`、`README.zh.md`；例如 `docs/advanced-sql-data-processing/window-functions.md` 与 `docs/advanced-features-internals/Multi-Version-Concurrency-Control.md`。
- **低：内容页尾的站内“README/glossary/knowledge”链接大小写和链接写法不统一。** 例如 `docs/tools-practice/percona-toolkit.md:99-100` 写 `[glossary](/zh/glossary.md)`、`[README](README.md)`；而 `docs/tools-practice/README.md:36` 使用中文标题和相对路径。该现象主要影响一致性，不是当前死链证据。

#### 4. 侧边栏对账

**低：本轮对账无差异（两组各 0 条）。** 递归读取 `docs/.vitepress/sidebar.json` 所有 `link`，按 clean URL 去掉 `.md` 后与 Markdown 文件核对：配置但文件不存在 **0 条**；文件存在但未进 sidebar **0 条**。首页 `docs/index.md` 由 VitePress 首页约定展示，`docs/SUMMARY.md` 按 `docs/.vitepress/config.mts:18-19` 被排除，均不视为漏挂。故“各列前 10 条”无可列项目。

#### 5. 死链与构建核查

**未核实构建级死链；静态检查未发现本地 Markdown 目标断链。** 对所有源 Markdown 的 Markdown 链接做本地 `.md` 文件存在性扫描，坏链 0 条；外部 URL 可达性未检查。尝试 `npm run docs:build` 未能启动：`sh: 1: vitepress: not found`，因为工作区没有安装 node_modules。结论仅是本地文件目标静态核对通过，不代表构建、锚点或外链均无问题。复核命令与配置见 `package.json` 的 `docs:build` 脚本及 `docs/.vitepress/config.mts`。

#### 6. 根目录杂散文件与重复 README

- **低：根目录 Markdown 是两份语言版项目介绍，不是随机散页。** `README.md` 和 `README.zh.md` 并列，分别承载英文/中文说明；作为仓库入口合理，不建议机械删除或合并。仓库根还含 `LICENSE`、`package.json`、`package-lock.json`，均为正常项目文件。
- **低：主题 README 数量多，但其职责是主题入口/索引。** 9 个主题目录各有 `README.md`，对应 sidebar/nav 的主题入口；不是重复文件。`docs/appendix/README.md` 还被 SUMMARY 的“附录·未入目录”父项与“附录”子项重复链接，侧边栏同样包含父子重复目标（见 `docs/SUMMARY.md:115-120` 与 `docs/.vitepress/sidebar.json` 附录块）。此处是唯一可确认的重复导航项，不是文档内容重复；**中**，因为用户可能在同一侧栏层级走到相同页面两次。
- **未发现纳入 Git 的临时 Markdown 或重复 README 副本。** 根级文件清单只有 `README.md`、`README.zh.md`；`git ls-files` 根文件未见临时文件。`docs/.vitepress/dist` 是生成目录，不计源文档，也不应纳入重构统计。

## 判断与推荐

### 结论：三套组织轴，建议收口为一套主轴

当前三套并行轴是：主题目录（文件归属）、编号章节映射（`SUMMARY.md`）、VitePress sidebar（用户导航）。推荐保留**主题目录 + 一份 sidebar 导航**作为唯一维护主轴；将 `SUMMARY.md` 明确为生成物/迁移归档，或在确认仍有用途后由自动化从 sidebar 生成，避免双份手工维护。用户最终看到的主导航可仍以 7 个编号部分表达，所以不需要改变学习路径；只是数据来源应单一。理由：主题目录能稳定承载内容；sidebar 已是实际导航源且当前与文件全量对账；SUMMARY 当前在构建配置中明确排除，作为手工维护的第二份大纲价值有限（`docs/.vitepress/config.mts:18-19`）。

### 严重度总评

| 严重度 | 结论 | 理由 |
|---|---|---|
| 高 | 无 | 未发现结构性断链、编号事故或页面失联；不应把现状描述成全面失序。 |
| 中 | 同主题入口有边界交叠；附录 README 父子重复导航；单个大写 slug | 会增加读者选择/维护判断成本，但现有侧边栏链接有效，范围局部。 |
| 低 | SUMMARY 与 sidebar 双份维护；章节部分与主题目录两种命名视角；链接文案/slug 命名细节不完全一致 | 影响长期一致性，短期不阻断阅读与构建发布（构建本身本轮未核实）。 |

### 其实不乱、不用动

- 7 个编号部分连续，主题目录按知识领域归档；二者是“学习顺序”和“物理归档”的互补视角，不是编号错乱。
- 9 个主题目录均有 README 入口，且 sidebar 124 条均有文件落点，未挂载文档数为 0。无需为了减少目录数量而合并主题目录。
- `database-design/index-design.md` 与底层原理中的索引机制分别讲设计与实现；事务概念、使用、隔离与锁机制拆页后仍在同一主题目录并按层级展示，合理，不建议仅为“主题相近”合章。
- `docs/knowledge.md` 是跨章节复习索引，`docs/glossary.md` 是术语查询，职责不同；两者均在 sidebar 中，保留有价值。
- 根目录中英 README 是语言入口；主题 README 是章节导航。虽然文件名同为 README，但作用域不同，不构成应删的重复件。
- `docs/SUMMARY.md` 当前作为 mdBook 遗留映射底稿，并被配置明确排除；它不直接污染构建页面。是否继续保留取决于迁移流程，不能当作已造成用户端混乱的证据。

## 三期收口方案

> **2026-10-19 收口记录：** 下方原方案为本轮执行前建议；实际采取的动作与证据见文末“收口验收记录”。定位为个人学习笔记与开发者经验分享，不按课程或学习路径组织。

| 阶段 | 动作清单 | 影响范围 | 风险（链接/搜索/外链） | 用户拍板 |
|---|---|---|---|---|
| 一期：机械整理，目标 1 小时内 | 建立 slug 与标题命名约定；修复单个大小写例外前先做全仓大小写引用盘点；统一页尾导航文案；补充 `mysql-tools` 两页互链及简介，明确通用客户端与性能监控边界；明确 README 的站点内链接 | `Multi-Version-Concurrency-Control.md`、两处 `mysql-tools.md`、相关页尾链接 | 若只统一文案/交叉链接，风险低；改大小写即涉及站内引用、外链与大小写敏感部署，不能无重定向地直接改。搜索索引需重建但内容未变 | **需要拍板** slug 是否允许大小写迁移；链接文案与工具页面边界措辞可由维护者按现状执行 |
| 二期：sidebar 与重定向 | 修正附录父子重复入口；确定 `SUMMARY.md` 是否弃用或改为由 sidebar 自动生成；任何 slug/路径变化增加 VitePress redirects/兼容页，逐条核对旧外链；做链接/构建检查后更新 sidebar | `docs/.vitepress/sidebar.json`、`docs/.vitepress/config.mts`、可能的兼容重定向配置、`docs/SUMMARY.md` | 侧栏层级变化会改变浏览路径；路径变更可能影响搜索结果和外链，重定向可降低风险但需部署验证 | **必须拍板** 是否移除重复入口、SUMMARY 的保留策略、旧 URL 兼容期限 |
| 三期：章节深度重构 | 依据读者任务访谈/使用数据决定是否合并附录与新技术、重分工具分类；再制定章节拆并、迁移表、别名/重定向、站内引用与搜索验证；不建议预设删除文件 | 可能涉及多个主题目录、SUMMARY/sidebar、目录 README 与所有引用 | 风险高：搬迁可能改变站内 URL、搜索权重和外链；逐页重定向与发布后检查是必要条件 | **必须拍板** 新主信息架构、被合并/拆分章节的范围，以及外链兼容策略 |

### 最该先做的三件事

1. **先处理附录 README 重复导航**：去掉父项或子项的重复链接，保留唯一入口，不改文件 URL（`docs/SUMMARY.md:115-120`，sidebar 附录块）。
2. **给两个 `mysql-tools` 页写清边界并互链**：把一个定位为性能监控/服务器工具，另一个定位为工具实战总览，减少读者误入（`docs/performance-tuning/mysql-tools.md`、`docs/tools-practice/mysql-tools.md`）。
3. **确定 SUMMARY 是否为 sidebar 的派生物**：先定维护来源，之后再做自动生成或停止手工更新，避免两份目录慢慢漂移（`docs/.vitepress/config.mts:18-19`、`docs/SUMMARY.md`、`docs/.vitepress/sidebar.json`）。

## 收口验收记录

以下是本轮实际执行结果；审计报告正文记录执行前证据，若与下列结果不同，以本节为准。内容定位采用个人学习笔记、心得和开发者经验分享，不组织成课程或学习路径。

### A｜导航源

- `docs/SUMMARY.md` 保留文件和 URL，开头改为导航维护说明：sidebar 是唯一权威源，SUMMARY 仅作不再维护的迁移底稿；页面变更只维护 sidebar 并核对文件目标。
- `docs/.vitepress/sidebar.json` 附录 README 只在父入口链接一次；子级“附录资料”保留分类但不再重复链接同一页面。
- 检查 sidebar 全部 link 的目标及同一侧栏重复目标；跨侧栏复用不计重复。

### B｜跨轴重复：文本证据与分类

| 组别 | 分类与处理 | 修改前文本对比证据 |
|---|---|---|
| 事务总览 / 事务概念 | **真重复，1 组。** `transactions.md` 收敛为要点摘要和指向事务概念、隔离级别与锁、事务使用三页的完整说明链接；保留其业务应用场景和总览角度。 | `transactions.md` 原文：“事务是一组操作的集合……要么全部执行，要么全部不执行”；`transaction-concepts.md` 原文：“事务（Transaction）是一个数据库操作的逻辑单元……所有操作要么全部成功，要么全部不执行”。两处均展开 ACID 和隔离级别。 |
| 数据库设计索引 / 底层索引实现 | **不同角度，保留并互链。** 前者讨论表结构与查询需求的设计取舍，后者讨论 MySQL/InnoDB 类型及实现。 | `database-design/index-design.md`：“索引设计是数据库性能优化中的关键部分……最佳实践”；`advanced-features-internals/index-types.md`：“不同类型的索引有不同的底层实现……适用场景及其底层实现”。 |
| 工具总览 / 性能监控工具 | **不同角度，保留并互链。** 前者是开发管理工具分类，后者聚焦性能现场的服务器观测命令。 | `tools-practice/mysql-tools.md` 按 Workbench、phpMyAdmin、MySQL Shell 等工具介绍功能和适用场景；`performance-tuning/mysql-tools.md` 展开 `SHOW STATUS`、`SHOW PROCESSLIST`、状态变量和现场筛查。 |
| 事务隔离 / 锁机制与锁类型 | **不同角度，保留并互链。** 分别讨论并发可见性、锁机制、锁类型，没有把概念相邻当作重复。 | `isolation-levels-locks.md` 从隔离级别解释事务可见性；`locking-mechanisms.md` 梳理并发访问控制机制；`lock-types.md` 聚焦表锁和行锁特点。 |

### C｜口径与侧栏对账

- 根目录 `README.md`、`README.zh.md` 未列篇数或不存在的目录；已统一为个人笔记、心得与开发者经验分享的定位，没有虚构篇数或课程路径。
- `docs/.vitepress/config.mts` 侧栏注释仍描述 7 个主题分组与附录归类，和实际配置一致；没有过期“第 N 讲”数字。
- sidebar 配置目标均存在；总览页及可见 Markdown 页面均有入口，首页由 VitePress 首页约定处理，SUMMARY 由 `srcExclude` 排除。

具体 file:line、构建、死链和删除计数以最终交付回报为准。

### 最终验收证据

- 构建：`pnpm docs:build` 通过；VitePress 1.6.4 完成客户端/服务端构建与页面渲染。构建有既存的单个 bundle 大小提示，不影响成功退出。
- 本地 Markdown 链接：脚本扫描仓库根 README 和 docs Markdown，排除代码示例及外链，共检查 **671** 个本地目标，断链 **0**。此数字只代表本地文件目标，不代表外部 URL 可达性或锚点有效性。
- Sidebar：124 个链接目标；同一侧栏重复目标 **0**、不存在目标 **0**、未进入侧栏的可见内容 Markdown **0**。排除首页约定、SUMMARY 底稿、内部 `docs/review/` 报告和 VitePress 配置/主题文件。
- 删除计数：`git diff origin/main...HEAD --diff-filter=D --name-only | wc -l` = **0**；其中 Markdown 删除数也为 **0**。
- A 定位：`docs/SUMMARY.md` 第 1–5 行；附录唯一侧栏入口为 [sidebar.json](../.vitepress/sidebar.json) 第 527–547 行。
- B 定位：事务摘要 [transactions.md](../advanced-features-internals/transactions.md) 第 5–13 行及权威页互链 [transaction-concepts.md](../advanced-features-internals/transaction-concepts.md) 第 1–3 行；索引互链 [index-design.md](../database-design/index-design.md) 第 1–5 行、[index-types.md](../advanced-features-internals/index-types.md) 第 1–5 行；工具互链 [mysql-tools.md](../tools-practice/mysql-tools.md) 第 1–5 行、[性能监控工具](../performance-tuning/mysql-tools.md) 第 1–5 行；锁/隔离角度互链见 [isolation-levels-locks.md](../advanced-features-internals/isolation-levels-locks.md)、[locking-mechanisms.md](../advanced-features-internals/locking-mechanisms.md)、[lock-types.md](../advanced-features-internals/lock-types.md) 各第 1–5 行。
- C 定位：英文 README 第 16、22 行；中文 README 第 16、22 行。侧栏配置注释 `docs/.vitepress/config.mts` 第 38–40 行与 7 个主题分组一致，没有“第 N 讲”过期数量。
