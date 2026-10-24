# 数据库设计

这里记录我整理数据库设计时采用的脉络：从需求分析、概念与逻辑模型，到物理设计和性能扩展。设计决策会影响系统的效率、可靠性和可维护性。

## [数据库设计概述](overview.md)

数据库设计的基本概念、目标、整体流程和常见挑战。

## [需求分析](requirements-analysis.md)

需求分析涉及的步骤和方法：收集、分析用户需求，确定数据与系统功能需求，并将需求转成设计规范。

## [概念设计](conceptual-design.md)

概念设计的主要任务和方法，包括创建实体-关系模型（ER图），定义实体、属性和关系。

- **[实体-关系模型（ER图）](er-model.md)**

  ER图的基本构建方法和符号，以及实体、关系和属性的表示方式。

- **[实体与属性](entities-attributes.md)**

  实体和属性的定义、ER图中的表示方法，以及确定实体类型和关键属性时的考虑。

- **[关系与连接](relationships-joins.md)**

  不同类型的关系（如一对多、多对多）、连接概念及其在ER图中的表示。

## [逻辑设计](logical-design.md)

讲解将概念模型转化为逻辑模型的过程，包括规范化和数据库模式的设计。

- **[规范化与反规范化](normalization-denormalization.md)**

  介绍数据库规范化的基本原则和步骤，以及规范化的不同范式。探讨反规范化的场景和原因。

- **[数据库模式](database-schema.md)**

  讲解数据库模式的定义和设计，包括表结构、字段定义及其约束。

- **[主键与外键](primary-foreign-keys.md)**

  详细说明主键和外键的概念、作用及其在表设计中的应用，如何使用主键和外键来建立表之间的关系。

## [物理设计](physical-design.md)

讨论数据库的物理实现，包括表和字段的设计、索引的创建等，优化数据库性能和存储效率。

- **[表的设计](table-design.md)**

  介绍表设计的原则，包括如何确定表的结构、字段属性和约束条件。

- **[字段的设计](column-design.md)**

  讲解字段设计的重要性，包括数据类型选择、字段长度以及默认值设置等。

- **[索引设计](index-design.md)**

  讨论索引的作用、类型以及如何设计高效的索引以提高查询性能。

## [性能与扩展](performance-scaling.md)

探讨数据库性能优化和扩展策略，包括数据分区、分片、垂直和水平拆分等技术。

- **[分区与分片](partitioning-sharding.md)**

  介绍数据分区和分片的基本概念、实现方法以及适用场景，如何使用这些技术提升数据库性能和可扩展性。

- **[垂直与水平拆分](vertical-horizontal-splitting.md)**

  讲解垂直拆分和水平拆分的策略及其应用，包括如何通过这些拆分方法优化数据库架构和性能。

---

- [知识点整理](../knowledge.md) —— 核心概念、参考书目、官方文档要点、应用场景与常见坑，均带站内链接。

## 参考资料

- [MySQL 8.0 Reference Manual · 数据库对象](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [CREATE TABLE / ALTER TABLE / DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)

## 相关页面

- [column-design](column-design.md)

<!-- BACKLINKS-AUTO -->
## 相关页面

- [column-design](column-design.md)
