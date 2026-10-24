# hello-mysql Directory and Content Organization Audit

Audit date: 2026-10-19
Scope: the repository's current Git working tree; read-only inspection. `docs/.vitepress/dist` is build output and is not counted in source document statistics. This report is the only newly added file.

## Quantitative Facts

### Markdown Count and Line Count of docs First-Level Directories

Line counts are based on each file's newline count, including each directory's `README.md`; `docs/SUMMARY.md` is the directory mapping draft that VitePress explicitly excludes, but it is still counted under the docs root directory. `.vitepress/dist` is not counted.

| docs first-level directory | .md count | Total lines |
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
| `(docs root directory)` | 4 | 579 |
| **Total** | **126** | **13,429** |

### Organization Axes and Entry Counts

An "organization axis" here is defined as a parallel structure that readers or maintainers use to locate content; folders, migration drafts, and navigation configurations each count as one axis. The three axes point to roughly the same topic tree but are maintained separately, so there is synchronization cost.

| Organization axis | Entry count | Naming pattern | Numbered? | Numbering continuous? |
|---|---:|---|---|---|
| Topic directories (actual content location) | 9 topic directories, 126 Markdown files (including root pages and drafts) | Lowercase English kebab-case; directory name indicates topic, e.g. `database-design`; each topic usually has a `README.md` | Neither directory names nor article file names have numeric prefixes | N/A; article prefix numbering is 0 |
| mdBook legacy chapter mapping `docs/SUMMARY.md` | 7 numbered parts + 1 unnumbered "Appendix · not in TOC"; maps approximately 124 page entries | `Part N: Topic` + indentation levels; entry links point to topic pages | Yes | Parts 1–7 are continuous; the unnumbered appendix is a type label, not a gap |
| VitePress sidebar `docs/.vitepress/sidebar.json` | 124 `link` page entries, 8 top-level groups (7 parts + not in TOC) and 2 standalone page entries | Display titles are primarily Chinese, link paths correspond to file slugs; hierarchy expresses chapters/topics | Yes, following Parts 1–7 | Continuous; plus "Appendix · not in TOC", knowledge points roundup, glossary |

Counting note: the sidebar's 124 `link` entries is the total number of configuration entries, of which the appendix README appears as a parent link under "Appendix · not in TOC"; after deduplicating page files, there are 123 targets. The configuration check found 0 nonexistent targets and 0 visible content pages not in the sidebar (excluding the homepage `index.md` and the `SUMMARY.md` mapping draft; the root `knowledge.md` and `glossary.md` are already in the sidebar). Sidebar statistics can be reproduced in `docs/.vitepress/sidebar.json`; its configuration entry points are at `docs/.vitepress/config.mts:1-4,35-37`.

**No separate guides directory, API directory, or history directory found.** "History" is currently the topic article `docs/basics/history-and-development.md`, not a separate document axis; no API-type directory/page was seen. If "guides" means operational tutorials, they are currently distributed within topic directories such as `basics` and `tools-practice`.

### Issues List (Evidence and Severity)

#### 1. Numbering Gaps, Skipped Numbers, Duplicates

**Low: no article-file numeric prefix gaps/skips/duplicates found.** Extracting "leading digit + separator" prefixes from the 126 Markdown file names yielded 0 results; so there are no numberable issues to list. Chapter numbering appears only in entry titles such as `docs/SUMMARY.md:3,58,75,91,103`, numbered 1–7 continuously, and the sidebar follows the same sequence (e.g. `docs/.vitepress/sidebar.json:3-4,262-264`). The 8th topic being called "Appendix · not in TOC" rather than "Part 8" is category naming, not a numbering gap.

#### 2. Same Topic Scattered Across Multiple Places

- **Medium: MySQL tool content is split into "Tools in Practice" and "Performance Tuning" groups.** The tools overview and client guides are in `docs/tools-practice/mysql-tools.md`, `docs/tools-practice/mysql-workbench.md`, `docs/tools-practice/mysql-shell.md`, `docs/tools-practice/percona-toolkit.md`, `docs/tools-practice/phpmyadmin.md`; monitoring/server operations tools are in `docs/performance-tuning/mysql-tools.md` and `docs/performance-tuning/third-party-tools.md`. Evidence: `docs/SUMMARY.md:91-114` also places them in Parts 6 and 7 respectively. Distinguishing "performance operations tools" from "general-purpose clients" is reasonable; the problem is that the two same-named `mysql-tools` pages have unintuitive boundaries and entry points, and should not be merged merely because the topics are similar.
- **Low: database-design index topics and underlying index mechanisms span across topics.** Design recommendations are in `docs/database-design/index-design.md`; index types/creation/optimization/underlying choices are in `docs/advanced-features-internals/index-types.md`, `create-manage-indexes.md`, `index-optimization.md`, `index-why.md`; in `docs/SUMMARY.md:22-35,58-67` they belong under design and internals respectively. Design decisions and implementation mechanisms serve different learning purposes, and the existing partition is itself reasonable; cross-linking is recommended, but relocation is not required.
- **Low: transaction and locking content has cross-page connections.** `docs/advanced-features-internals/transactions.md`, `transaction-concepts.md`, `transaction-usage.md`, `isolation-levels-locks.md`, `index-and-locks.md`, `locking-mechanisms.md`, `lock-types.md`, `lock-optimization.md` are split across concepts, practice, isolation, and locking. `docs/SUMMARY.md:68-80` and the corresponding sidebar groups provide a continuous path; this is intra-topic subdivision, not disordered scattering.

#### 3. Naming Style Inconsistencies

- **Medium: slug case is not uniform.** Almost all files use lowercase kebab-case; the only clear exception is `docs/advanced-features-internals/Multi-Version-Concurrency-Control.md`, and the sidebar links it with the same case (the `Multi-Version-Concurrency-Control` entry in `docs/.vitepress/sidebar.json`). Cross-platform deployment, case-sensitive URLs, and search link maintenance are prone to divergences because of this.
- **Low: titles/file names follow a mixed multi-language convention.** Topic directories and most slugs are English kebab-case, while page titles are primarily Chinese mixed with SQL/API product names; the root-level `README.md` and `README.zh.md` are distinguished by language suffix, which is reasonable but the case style and purpose overlap with topic-page `README.md` files. Evidence: root file list `README.md`, `README.zh.md`; for example `docs/advanced-sql-data-processing/window-functions.md` and `docs/advanced-features-internals/Multi-Version-Concurrency-Control.md`.
- **Low: in-page "README/glossary/knowledge" links have inconsistent case and link syntax.** For example `docs/tools-practice/percona-toolkit.md:99-100` writes `[glossary](/zh/glossary.md)` and `[README](README.md)`; while `docs/tools-practice/README.md:36` uses a Chinese title and relative path. This mainly affects consistency, not current dead-link evidence.

#### 4. Sidebar Reconciliation

**Low: no discrepancies in this reconciliation (0 in each of the two groups).** Recursively reading all `link` entries in `docs/.vitepress/sidebar.json`, stripping `.md` per clean URL and checking against Markdown files: configured but file nonexistent **0**; file exists but not in sidebar **0**. The homepage `docs/index.md` is displayed by VitePress homepage convention, and `docs/SUMMARY.md` is excluded per `docs/.vitepress/config.mts:18-19`; neither is considered a miss. So "top 10 of each list" has no items to list.

#### 5. Dead Links and Build Check

**Build-level dead links not verified; static checks found no broken local Markdown targets.** Scanning all source Markdown links for local `.md` file existence: 0 broken links; external URL reachability not checked. Attempted `npm run docs:build` failed to start: `sh: 1: vitepress: not found`, because node_modules is not installed in the workspace. The conclusion is only that local file targets passed static checking; it does not mean build, anchors, or external links are all problem-free. Review commands and configuration are in the `docs:build` script in `package.json` and `docs/.vitepress/config.mts`.

#### 6. Root Directory Stray Files and Duplicate READMEs

- **Low: root-directory Markdown is two language versions of the project introduction, not random stray pages.** `README.md` and `README.zh.md` sit side by side, carrying English/Chinese descriptions respectively; reasonable as repository entry points, and not recommended to mechanically delete or merge. The repository root also contains `LICENSE`, `package.json`, `package-lock.json`, all normal project files.
- **Low: many topic READMEs, but their role is topic entry/index.** Each of the 9 topic directories has a `README.md`, corresponding to sidebar/nav topic entries; these are not duplicate files. `docs/appendix/README.md` is also linked by both the SUMMARY "Appendix · not in TOC" parent item and the "Appendix" child item, and the sidebar similarly contains duplicate parent-child targets (see `docs/SUMMARY.md:115-120` and the appendix block in `docs/.vitepress/sidebar.json`). This is the only confirmed duplicate navigation item, not duplicate document content; **Medium**, because a user could reach the same page twice within the same sidebar hierarchy.
- **No Git-tracked temporary Markdown or duplicate README copies found.** The root file list only contains `README.md` and `README.zh.md`; `git ls-files` at root shows no temporary files. `docs/.vitepress/dist` is a generated directory, not counted as source documents, and should not be included in refactoring statistics.

## Judgments and Recommendations

### Conclusion: Three Organization Axes, Recommend Converging to One Primary Axis

The current three parallel axes are: topic directories (file ownership), numbered chapter mapping (`SUMMARY.md`), and VitePress sidebar (user navigation). Recommend keeping **topic directories + one sidebar navigation** as the sole maintenance primary axis; designate `SUMMARY.md` explicitly as a generated artifact/migration archive, or, once its continued usefulness is confirmed, generate it automatically from the sidebar, avoiding dual manual maintenance. The primary navigation users ultimately see can still be expressed as 7 numbered parts, so the learning path does not need to change; only the data source should be singular. Rationale: topic directories can stably hold content; the sidebar is already the actual navigation source and currently reconciles in full with files; SUMMARY is currently explicitly excluded in the build configuration, so its value as a second manually maintained outline is limited (`docs/.vitepress/config.mts:18-19`).

### Overall Severity Assessment

| Severity | Conclusion | Rationale |
|---|---|---|
| High | None | No structural broken links, numbering incidents, or orphaned pages found; the status quo should not be described as wholesale disorder. |
| Medium | Same-topic entries have boundary overlap; appendix README parent-child duplicate navigation; a single uppercase slug | Increases reader choice / maintainer decision cost, but existing sidebar links are valid and the scope is local. |
| Low | SUMMARY and sidebar dual maintenance; two naming perspectives between chapter parts and topic directories; link text / slug naming details not fully consistent | Affects long-term consistency, does not block reading or build/release in the short term (the build itself was not verified this round). |

### Actually Not Disordered, No Need to Change

- The 7 numbered parts are continuous, and topic directories are archived by knowledge domain; the two are complementary perspectives of "learning order" and "physical archival," not numbering confusion.
- All 9 topic directories have README entries, and all 124 sidebar entries have file destinations; the number of unmounted documents is 0. There is no need to merge topic directories just to reduce the directory count.
- `database-design/index-design.md` and the index mechanisms in internals cover design and implementation respectively; after splitting transaction concepts, usage, isolation, and locking across pages, they remain in the same topic directory and display by hierarchy, which is reasonable; not recommended to merge chapters merely because "topics are similar."
- `docs/knowledge.md` is a cross-chapter review index, `docs/glossary.md` is a term lookup; they serve different purposes; both are in the sidebar and worth keeping.
- Root English and Chinese READMEs are language entry points; topic READMEs are chapter navigation. Although the file name is the same README, their scopes differ, and they do not constitute duplicates to delete.
- `docs/SUMMARY.md` currently serves as an mdBook legacy mapping draft and is explicitly excluded by configuration; it does not directly pollute build pages. Whether to continue keeping it depends on the migration process and should not be taken as evidence of user-facing confusion.

## Three-Phase Convergence Plan

> **2026-10-19 Convergence Record:** The original plan below was the recommendation before this round of execution; actual actions taken and evidence are in the "Convergence Acceptance Record" at the end. Positioned as personal learning notes and developer experience sharing, not organized as courses or learning paths.

| Phase | Action list | Impact scope | Risk (links/search/external links) | User sign-off |
|---|---|---|---|---|
| Phase 1: mechanical tidy-up, target within 1 hour | Establish slug and title naming conventions; before fixing the single case exception, do a whole-repo case-reference inventory; unify footer navigation copy; add cross-links and intros between the two `mysql-tools` pages, clarifying the boundary between general-purpose clients and performance monitoring; clarify README in-site links | `Multi-Version-Concurrency-Control.md`, the two `mysql-tools.md` pages, and related footer links | If only unifying copy / cross-links, risk is low; changing case involves in-site references, external links, and case-sensitive deployment, so it cannot be changed directly without redirects. Search index needs rebuilding but content is unchanged | **Needs sign-off** whether slug case migration is allowed; link text and tool-page boundary wording can be executed by maintainers per status quo |
| Phase 2: sidebar and redirects | Fix appendix parent-child duplicate entries; decide whether `SUMMARY.md` is deprecated or switched to auto-generation from the sidebar; add VitePress redirects / compatibility pages for any slug/path changes, checking old external links one by one; update sidebar after link/build checks | `docs/.vitepress/sidebar.json`, `docs/.vitepress/config.mts`, possible compatibility redirect configuration, `docs/SUMMARY.md` | Sidebar hierarchy changes alter browsing paths; path changes may affect search results and external links, and redirects can lower risk but require deployment verification | **Must sign off** whether to remove duplicate entries, SUMMARY retention strategy, old URL compatibility window |
| Phase 3: deep chapter restructuring | Based on reader task interviews / usage data, decide whether to merge appendix with new technologies and reclassify tools; then plan chapter split/merge, migration table, aliases/redirects, in-site references and search verification; do not preset file deletions | May involve multiple topic directories, SUMMARY/sidebar, directory READMEs, and all references | High risk: relocation may change in-site URLs, search weight, and external links; per-page redirects and post-release checks are necessary conditions | **Must sign off** the new primary information architecture, scope of merged/split chapters, and external link compatibility strategy |

### Top Three Things to Do First

1. **First handle the appendix README duplicate navigation**: remove the duplicate link from the parent or child item, keep a single entry point, without changing the file URL (`docs/SUMMARY.md:115-120`, sidebar appendix block).
2. **Write clear boundaries and cross-link the two `mysql-tools` pages**: position one as performance monitoring / server tools and the other as the tools-in-practice overview, reducing reader mis-routing (`docs/performance-tuning/mysql-tools.md`, `docs/tools-practice/mysql-tools.md`).
3. **Determine whether SUMMARY is a derivative of the sidebar**: first establish the maintenance source, then either auto-generate or stop manual updates, to avoid the two outlines slowly drifting apart (`docs/.vitepress/config.mts:18-19`, `docs/SUMMARY.md`, `docs/.vitepress/sidebar.json`).

## Convergence Acceptance Record

The following are the actual execution results of this round; the audit report body records pre-execution evidence, and where it differs from the results below, this section takes precedence. Content positioning uses personal learning notes, insights, and developer experience sharing, not organized as courses or learning paths.

### A | Navigation Source

- `docs/SUMMARY.md` keeps its file and URL, with the opening changed to a navigation maintenance note: the sidebar is the sole authoritative source, and SUMMARY is only a no-longer-maintained migration draft; page changes maintain only the sidebar and check file targets.
- The appendix README in `docs/.vitepress/sidebar.json` is linked only once at the parent entry; the child-level "Appendix materials" keeps the category but no longer links the same page again.
- Checked all sidebar link targets and duplicate targets within the same sidebar; reuse across sidebars is not counted as duplication.

### B | Cross-Axis Duplication: Text Evidence and Classification

| Group | Classification and handling | Pre-change text comparison evidence |
|---|---|---|
| Transaction overview / Transaction concepts | **True duplication, 1 group.** `transactions.md` was condensed to a key-point summary with links to the three pages on transaction concepts, isolation levels and locks, and transaction usage; its business application scenarios and overview angle were retained. | `transactions.md` original text: "A transaction is a collection of operations... either all are executed or none are executed"; `transaction-concepts.md` original text: "A transaction (Transaction) is a logical unit of database operations... all operations either all succeed or none are executed." Both expand on ACID and isolation levels. |
| Database design indexes / Underlying index implementation | **Different angles, kept and cross-linked.** The former discusses design trade-offs for table structure and query needs; the latter discusses MySQL/InnoDB types and implementation. | `database-design/index-design.md`: "Index design is a key part of database performance optimization... best practices"; `advanced-features-internals/index-types.md`: "Different types of indexes have different underlying implementations... applicable scenarios and their underlying implementations." |
| Tools overview / Performance monitoring tools | **Different angles, kept and cross-linked.** The former is a development management tool classification; the latter focuses on server observation commands in performance contexts. | `tools-practice/mysql-tools.md` introduces features and applicable scenarios for tools such as Workbench, phpMyAdmin, MySQL Shell; `performance-tuning/mysql-tools.md` expands on `SHOW STATUS`, `SHOW PROCESSLIST`, status variables, and live investigation. |
| Transaction isolation / Locking mechanisms and lock types | **Different angles, kept and cross-linked.** They discuss concurrency visibility, locking mechanisms, and lock types respectively, without treating conceptually adjacent topics as duplication. | `isolation-levels-locks.md` explains transaction visibility from isolation levels; `locking-mechanisms.md` maps out concurrent access control mechanisms; `lock-types.md` focuses on table lock and row lock characteristics. |

### C | Positioning and Sidebar Reconciliation

- Root `README.md` and `README.zh.md` do not list article counts or nonexistent directories; they have been unified to the positioning of personal notes, insights, and developer experience sharing, without fabricating article counts or course paths.
- The sidebar comment in `docs/.vitepress/config.mts` still describes 7 topic groups and appendix categorization, consistent with the actual configuration; no stale "Lecture N" numbers.
- All sidebar configuration targets exist; overview pages and visible Markdown pages all have entries; the homepage is handled by VitePress homepage convention, and SUMMARY is excluded by `srcExclude`.

Specific file:line references, build, dead links, and deletion counts are per the final delivery report.

### Final Acceptance Evidence

- Build: `pnpm docs:build` passed; VitePress 1.6.4 completed client/server build and page rendering. The build has a pre-existing single bundle size hint, which does not affect a successful exit.
- Local Markdown links: a script scanned the repo root README and docs Markdown, excluding code examples and external links, checking **671** local targets in total with **0** broken links. This number only represents local file targets, not external URL reachability or anchor validity.
- Sidebar: 124 link targets; **0** duplicate targets within the same sidebar, **0** nonexistent targets, **0** visible content Markdown not in the sidebar. Excluding homepage convention, SUMMARY draft, internal `docs/review/` reports, and VitePress config/theme files.
- Deletion count: `git diff origin/main...HEAD --diff-filter=D --name-only | wc -l` = **0**; the Markdown deletion count is also **0**.
- A location: `docs/SUMMARY.md` lines 1–5; the sole sidebar entry for the appendix is [sidebar.json](../.vitepress/sidebar.json) lines 527–547.
- B location: transaction summary [transactions.md](../advanced-features-internals/transactions.md) lines 5–13 and authoritative page cross-links [transaction-concepts.md](../advanced-features-internals/transaction-concepts.md) lines 1–3; index cross-links [index-design.md](../database-design/index-design.md) lines 1–5, [index-types.md](../advanced-features-internals/index-types.md) lines 1–5; tool cross-links [mysql-tools.md](../tools-practice/mysql-tools.md) lines 1–5, [performance monitoring tools](../performance-tuning/mysql-tools.md) lines 1–5; lock/isolation angle cross-links see [isolation-levels-locks.md](../advanced-features-internals/isolation-levels-locks.md), [locking-mechanisms.md](../advanced-features-internals/locking-mechanisms.md), [lock-types.md](../advanced-features-internals/lock-types.md) each lines 1–5.
- C location: English README lines 16, 22; Chinese README lines 16, 22. The sidebar configuration comment in `docs/.vitepress/config.mts` lines 38–40 is consistent with the 7 topic groups, with no stale "Lecture N" counts.
