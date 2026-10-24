# hello-mysql directory and content organisation audit

Audit date: 2026-10-19
Scope: the repository's current Git working tree; read-only inspection. `docs/.vitepress/dist` is build output and is not counted in the source document statistics. This report is the only new file.

## Quantitative facts

### Markdown count and line count for first-level directories under docs

Line counts are the number of lines per file, including the `README.md` inside each directory; `docs/SUMMARY.md` is the directory-mapping draft that VitePress explicitly excludes, but it is still counted under the docs root. `.vitepress/dist` is not counted.

| First-level directory under docs | .md count | Total lines |
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
| `(docs root)` | 4 | 579 |
| **Total** | **126** | **13,429** |

### Organisation axes and entry counts

Here an "organisation axis" means a parallel structure that readers or maintainers use to locate content; folder layout, migration draft and navigation configuration each count as one axis. The three axes point at roughly the same topic tree but are maintained separately, so there is a synchronisation cost.

| Organisation axis | Entry count | Naming pattern | Numbered? | Numbering contiguous? |
|---|---:|---|---|---|
| Topic directories (actual content location) | 9 topic directories, 126 Markdown files (including root pages and the draft) | English lowercase kebab-case; the directory name denotes the topic, e.g. `database-design`; each topic usually has a `README.md` | No numeric prefix on either directory names or article filenames | Not applicable; article prefix numbers are 0 |
| mdBook legacy chapter mapping `docs/SUMMARY.md` | 7 numbered parts + 1 unnumbered "Appendix · Not indexed"; the mapping covers about 124 page entries | `Part N: topic` + indentation levels; entry links point at topic pages | Yes | Parts 1–7 are contiguous; the appendix being unnumbered is a type label, not a gap |
| VitePress sidebar `docs/.vitepress/sidebar.json` | 124 `link` page entries, 8 top-level groups (7 parts + not-indexed) plus 2 standalone page entries | Display titles mainly in Chinese, link paths correspond to file slugs; hierarchy expresses chapters/topics | Yes, reusing parts 1–7 | Contiguous; additionally "Appendix · Not indexed", Knowledge Notes and Glossary |

Counting notes: the 124 `link` entries in the sidebar are the total number of configuration entries, in which the appendix README appears as a parent link under "Appendix · Not indexed"; after deduplicating page files there are 123 targets. The configuration check found 0 non-existent targets and 0 visible content pages not in the sidebar (excluding the home page `index.md` and the `SUMMARY.md` mapping draft; the root-level `knowledge.md` and `glossary.md` are in the sidebar). The sidebar statistics are reproducible from `docs/.vitepress/sidebar.json`; the configuration entry point is `docs/.vitepress/config.mts:1-4,35-37`.

**No separate guide directory, API directory or history directory was found.** "History" is currently a topic article, `docs/basics/history-and-development.md`, not a separate documentation axis; no API-type directory or page was found. If "guide" means how-to tutorials, those are currently spread across the `basics`, `tools-practice` and similar topic directories.

### Issue list (evidence and severity)

#### 1. Numbering gaps, skipped numbers, duplicates

**Low: no numbering gaps, skipped numbers or duplicates in article file prefixes.** Extracting a "leading number + separator" prefix from all 126 Markdown filenames yields 0 matches, so there are no problem numbers to list. Chapter numbering appears only in the entry titles at `docs/SUMMARY.md:3,58,75,91,103`, numbered contiguously 1–7, and the sidebar reuses the same sequence (for example `docs/.vitepress/sidebar.json:3-4,262-264`). The eighth topic being called "Appendix · Not indexed" rather than "Part 8" is a category name and does not constitute a numbering gap.

#### 2. The same topic scattered across places

- **Medium: MySQL tools content is split into a "tools practice" group and a "performance tuning" group.** Tool overviews and client guides are in `docs/tools-practice/mysql-tools.md`, `docs/tools-practice/mysql-workbench.md`, `docs/tools-practice/mysql-shell.md`, `docs/tools-practice/percona-toolkit.md`, `docs/tools-practice/phpmyadmin.md`; monitoring and server-operation tools are in `docs/performance-tuning/mysql-tools.md` and `docs/performance-tuning/third-party-tools.md`. Evidence: `docs/SUMMARY.md:91-114` places them separately under parts 6 and 7 as well. Distinguishing "performance and operations tools" from "general-purpose clients" is reasonable; the problem is that the boundary and entry points for the two same-named `mysql-tools` pages are not intuitive, so they should not be merged on topic similarity alone.
- **Low: the index topic in database design crosses over with low-level index mechanisms.** Design advice is in `docs/database-design/index-design.md`; index types / creation / optimisation / low-level choice are in `docs/advanced-features-internals/index-types.md`, `create-manage-indexes.md`, `index-optimization.md`, `index-why.md`; they sit separately under design and internals in `docs/SUMMARY.md:22-35,58-67`. Design decisions and implementation mechanisms serve different learning purposes, so the existing split is itself reasonable; cross-links are recommended, not a move.
- **Low: transaction and lock content is related across pages.** `docs/advanced-features-internals/transactions.md`, `transaction-concepts.md`, `transaction-usage.md`, `isolation-levels-locks.md`, `index-and-locks.md`, `locking-mechanisms.md`, `lock-types.md`, `lock-optimization.md` split concepts, practice, isolation and locks across pages. `docs/SUMMARY.md:68-80` and the corresponding sidebar groups provide a contiguous path, so this is intra-topic subdivision rather than disorderly scattering.

#### 3. Inconsistent naming style

- **Medium: slug casing is not uniform.** Almost all files are lowercase kebab-case; the only clear exception is `docs/advanced-features-internals/Multi-Version-Concurrency-Control.md`, and the sidebar links it with the same casing (the `Multi-Version-Concurrency-Control` entry in `docs/.vitepress/sidebar.json`). Cross-platform deployment, case-sensitive URLs and the maintenance of search links are all easy to diverge because of this.
- **Low: titles and filenames follow several mixed-language conventions.** Topic directories and most slugs are English kebab-case, page titles are mainly Chinese and mixed with SQL/API product names; the root-level `README.md` and `README.zh.md` are distinguished by a language suffix, which is reasonable but overlaps in purpose with the topic-level `README.md` files in a differently cased style. Evidence: the root file listing `README.md`, `README.zh.md`; for example `docs/advanced-sql-data-processing/window-functions.md` versus `docs/advanced-features-internals/Multi-Version-Concurrency-Control.md`.
- **Low: the in-site "README/glossary/knowledge" links at the bottom of content pages are not uniform in casing or link style.** For example `docs/tools-practice/percona-toolkit.md:99-100` writes `[glossary](/zh/glossary.md)` and `[README](README.md)`, while `docs/tools-practice/README.md:36` uses a Chinese title and a relative path. This mainly affects consistency and is not evidence of a dead link right now.

#### 4. Sidebar reconciliation

**Low: this reconciliation found no differences (0 items on each side).** Recursively reading every `link` in `docs/.vitepress/sidebar.json`, stripping `.md` for clean URLs and comparing against the Markdown files: configured but file does not exist — **0**; file exists but not in the sidebar — **0**. The home page `docs/index.md` is displayed by VitePress's home-page convention, and `docs/SUMMARY.md` is excluded by `docs/.vitepress/config.mts:18-19`; neither counts as a miss. So "the first 10 on each side" has nothing to list.

#### 5. Dead links and build check

**Build-level dead links were not verified; static checking found no broken local Markdown targets.** A local `.md` existence scan over the Markdown links in every source Markdown file found 0 broken links; external URL reachability was not checked. Attempting `npm run docs:build` failed to start: `sh: 1: vitepress: not found`, because node_modules is not installed in the working tree. The conclusion is therefore only that the local file target reconciliation passed; it does not mean the build, anchors or external links are all fine. The review commands and configuration are in the `docs:build` script in `package.json` and `docs/.vitepress/config.mts`.

#### 6. Stray files in the root directory and duplicate READMEs

- **Low: the root-level Markdown files are two language versions of the project introduction, not random loose pages.** `README.md` and `README.zh.md` sit side by side and carry the English and Chinese descriptions respectively; as the repository entry point that is reasonable, and mechanically deleting or merging them is not recommended. The repository root also contains `LICENSE`, `package.json` and `package-lock.json`, all normal project files.
- **Low: there are many topic READMEs, but their role is topic entry point / index.** Each of the 9 topic directories has a `README.md`, corresponding to the topic entry points in the sidebar/nav; these are not duplicate files. `docs/appendix/README.md` is additionally linked twice — once as the parent entry under SUMMARY's "Appendix · Not indexed" and once under the "Appendix" subgroup — and the sidebar likewise contains duplicate parent and child targets (see `docs/SUMMARY.md:115-120` and the appendix block in `docs/.vitepress/sidebar.json`). This is the only confirmable duplicate navigation item, not duplicate document content; **medium**, because a user can reach the same page twice within the same sidebar level.
- **No temporary Markdown or duplicate README copies under Git were found.** The root file listing is only `README.md` and `README.zh.md`; `git ls-files` at the root shows no temporary files. `docs/.vitepress/dist` is a generated directory, does not count as source documentation, and should not be included in refactoring statistics.

## Judgement and recommendations

### Conclusion: three organisation axes; recommend converging to one primary axis

The three parallel axes today are: topic directories (file ownership), the numbered chapter mapping (`SUMMARY.md`) and the VitePress sidebar (user navigation). I recommend keeping **topic directories + one sidebar navigation** as the single maintained primary axis; mark `SUMMARY.md` explicitly as a generated artifact / migration archive, or — after confirming it still has a use — generate it automatically from the sidebar, to avoid maintaining two copies by hand. The primary navigation users ultimately see can still be expressed as 7 numbered parts, so the learning path does not need to change; the data source just needs to be single. Rationale: topic directories stably carry the content; the sidebar is already the effective navigation source and currently reconciles against the full file set; SUMMARY is explicitly excluded in the build configuration, so its value as a second hand-maintained outline is limited (`docs/.vitepress/config.mts:18-19`).

### Overall severity

| Severity | Conclusion | Rationale |
|---|---|---|
| High | None | No structural dead links, numbering incidents or orphaned pages were found; the current state should not be described as comprehensively disordered. |
| Medium | Overlapping boundaries between entry points for the same topic; duplicate parent/child navigation for the appendix README; a single camel-case slug | Raises reader choice and maintenance judgement cost, but the existing sidebar links work and the scope is local. |
| Low | SUMMARY and sidebar maintained as two copies; two naming perspectives (chapter parts and topic directories); link copy and slug naming details are not fully consistent | Affects long-term consistency; in the short term it does not block reading or building and releasing (the build itself was not verified this round). |

### Things that are not actually messy and should not be touched

- The 7 numbered parts are contiguous, and the topic directories are filed by knowledge domain; the two are complementary views of "learning order" and "physical filing", not numbering confusion.
- All 9 topic directories have a README entry point, and all 124 sidebar entries have a file landing point, with 0 unmounted documents. Topic directories should not be merged just to reduce the directory count.
- `database-design/index-design.md` and the internals index mechanisms cover design and implementation respectively; transaction concepts, usage, isolation and lock mechanisms are split across pages but still live in the same topic directory and display hierarchically, which is reasonable. Chapters should not be merged merely because the topics are near each other.
- `docs/knowledge.md` is a cross-chapter review index and `docs/glossary.md` is a term lookup; the responsibilities differ. Both are in the sidebar, and keeping them has value.
- The English and Chinese READMEs at the root are language entry points; the topic READMEs are chapter navigation. Although the filenames are all README, the scopes differ, so they do not constitute duplicate files to be deleted.
- `docs/SUMMARY.md` currently serves as the mdBook legacy mapping draft and is explicitly excluded by the configuration; it does not directly pollute the built pages. Whether it should remain depends on the migration process, and it should not be treated as evidence of user-facing confusion.

## Three-phase convergence plan

> **2026-10-19 convergence record:** the plan below is the recommendation from before this round was executed; the actions actually taken and the evidence are in the "convergence acceptance record" at the end. The site is positioned as personal study notes and developer experience sharing, not organised as courses or a learning path.

| Phase | Action list | Impact scope | Risk (links/search/external links) | User sign-off |
|---|---|---|---|---|
| Phase 1: mechanical tidy-up, target under 1 hour | Establish a naming convention for slugs and titles; before fixing the single casing exception, inventory casing references across the whole repository; unify the bottom-of-page navigation copy; add mutual links and introductions between the two `mysql-tools` pages to clarify the boundary between general-purpose clients and performance monitoring; make the in-site links in the README explicit | `Multi-Version-Concurrency-Control.md`, the two `mysql-tools.md` pages, related bottom-of-page links | Low risk if only copy and cross-links change; changing casing involves in-site references, external links and case-sensitive deployment, and cannot be changed directly without a redirect. The search index needs rebuilding but content is unchanged | **Sign-off needed** on whether a slug casing migration is allowed; link copy and tool page boundary wording can be applied by the maintainer as-is |
| Phase 2: sidebar and redirects | Fix the duplicate parent/child appendix entry; decide whether `SUMMARY.md` is deprecated or becomes auto-generated from the sidebar; add VitePress redirects or compatibility pages for any slug/path change and check old external links one by one; update the sidebar after link and build checks | `docs/.vitepress/sidebar.json`, `docs/.vitepress/config.mts`, possible compatibility redirect configuration, `docs/SUMMARY.md` | Sidebar hierarchy changes alter browsing paths; path changes may affect search results and external links — redirects reduce the risk but need deployment verification | **Sign-off required** on removing the duplicate entry, SUMMARY's retention strategy, and the compatibility period for old URLs |
| Phase 3: deep chapter restructuring | Use reader task interviews / usage data to decide whether to merge appendix with new technologies and reclassify tools; then draw up chapter split-and-merge plans, migration tables, aliases/redirects, in-site references and search verification; deleting files should not be presumed in advance | May involve multiple topic directories, SUMMARY/sidebar, directory READMEs and all references | High risk: moving files may change in-site URLs, search weight and external links; per-page redirects and post-release checks are mandatory | **Sign-off required** on the new primary information architecture, the scope of chapters to merge or split, and the external-link compatibility strategy |

### The three things to do first

1. **Handle the duplicate appendix README navigation first**: remove the duplicate link on either the parent or the child entry and keep a single entry point, without changing the file URL (`docs/SUMMARY.md:115-120`, the sidebar appendix block).
2. **Write clear boundaries for the two `mysql-tools` pages and link them to each other**: position one as performance monitoring / server tools and the other as the tools-practice overview, to reduce mis-entry by readers (`docs/performance-tuning/mysql-tools.md`, `docs/tools-practice/mysql-tools.md`).
3. **Decide whether SUMMARY is a derivative of the sidebar**: fix the maintained source first, then either auto-generate or stop hand-updating, to avoid the two indexes drifting apart (`docs/.vitepress/config.mts:18-19`, `docs/SUMMARY.md`, `docs/.vitepress/sidebar.json`).

## Convergence acceptance record

This is the actual result of the execution this round; the audit report body records pre-execution evidence, and where it differs from the following, this section takes precedence. The content is positioned as personal study notes, takeaways and developer experience sharing, and is not organised as courses or a learning path.

### A | Navigation source

- `docs/SUMMARY.md` keeps its file and URL, and the top was changed to a navigation maintenance note: the sidebar is the single authoritative source, and SUMMARY is only a no-longer-maintained migration draft; page changes are maintained in the sidebar only and file targets are checked.
- The appendix README in `docs/.vitepress/sidebar.json` is linked only once at the parent entry; the child level "Appendix materials" keeps the category but no longer links to the same page a second time.
- The targets of all links in the sidebar were checked, along with duplicate targets within the same sidebar; reuse across sidebars is not counted as duplication.

### B | Cross-axis duplication: textual evidence and classification

| Group | Classification and handling | Before-change textual comparison evidence |
|---|---|---|
| Transaction overview / transaction concepts | **True duplication, 1 group.** `transactions.md` was reduced to key-point summaries and links to the full write-ups on transaction concepts, isolation levels and locks, and transaction usage; its business application scenarios and overview angle were kept. | `transactions.md` original: “A transaction is a collection of operations ... either all are executed or none are executed.” `transaction-concepts.md` original: “A transaction is a logical unit of database operations ... all operations either all succeed or none are executed.” Both expand on ACID and isolation levels. |
| Database design indexes / low-level index implementation | **Different angles, kept and cross-linked.** The former discusses design trade-offs for table structure and query needs; the latter discusses MySQL/InnoDB types and implementation. | `database-design/index-design.md`: “Index design is a key part of database performance optimisation ... best practices.” `advanced-features-internals/index-types.md`: “Different types of indexes have different low-level implementations ... applicable scenarios and their low-level implementations.” |
| Tools overview / performance monitoring tools | **Different angles, kept and cross-linked.** The former is a classification of development and administration tools; the latter focuses on server-side observation commands at the performance scene. | `tools-practice/mysql-tools.md` introduces features and applicable scenarios for tools such as Workbench, phpMyAdmin and MySQL Shell; `performance-tuning/mysql-tools.md` covers `SHOW STATUS`, `SHOW PROCESSLIST`, status variables and on-scene triage. |
| Transaction isolation / lock mechanisms and lock types | **Different angles, kept and cross-linked.** Concurrency visibility, lock mechanisms and lock types are discussed separately, without treating topically adjacent content as duplication. | `isolation-levels-locks.md` explains transaction visibility from isolation levels; `locking-mechanisms.md` surveys concurrency access control mechanisms; `lock-types.md` focuses on the characteristics of table and row locks. |

### C | Positioning and sidebar reconciliation

- The root `README.md` and `README.zh.md` list no chapter counts or non-existent directories; they were unified to the positioning of personal notes, takeaways and developer experience sharing, with no invented chapter counts or course paths.
- The sidebar comments in `docs/.vitepress/config.mts` still describe 7 topic groups and the appendix classification, consistent with the actual configuration; there are no stale “lecture N” numbers.
- All sidebar configuration targets exist; the overview page and all visible Markdown pages have an entry point, the home page is handled by VitePress's home-page convention, and SUMMARY is excluded via `srcExclude`.

The specific file:line references, build, dead links and deletion counts are as reported in the final delivery report.

### Final acceptance evidence

- Build: `pnpm docs:build` passed; VitePress 1.6.4 completed the client and server builds and page rendering. The build has a pre-existing single bundle-size notice that does not affect the successful exit.
- Local Markdown links: a script scanned the repository root README and the docs Markdown, excluding code examples and external links, checking **671** local targets with **0** broken. This number covers local file targets only, not external URL reachability or anchor validity.
- Sidebar: 124 link targets; duplicate targets within the same sidebar **0**, non-existent targets **0**, visible content Markdown not in the sidebar **0**. Excluded: the home-page convention, the SUMMARY draft, the internal `docs/review/` reports, and VitePress configuration/theme files.
- Deletion count: `git diff origin/main...HEAD --diff-filter=D --name-only | wc -l` = **0**; the Markdown deletion count is also **0**.
- A locations: `docs/SUMMARY.md` lines 1–5; the appendix's single sidebar entry is [sidebar.json](../.vitepress/sidebar.json) lines 527–547.
- B locations: transaction summary [transactions.md](../advanced-features-internals/transactions.md) lines 5–13 and the cross-links to the authoritative pages [transaction-concepts.md](../advanced-features-internals/transaction-concepts.md) lines 1–3; index cross-links [index-design.md](../database-design/index-design.md) lines 1–5, [index-types.md](../advanced-features-internals/index-types.md) lines 1–5; tools cross-links [mysql-tools.md](../tools-practice/mysql-tools.md) lines 1–5, [performance monitoring tools](../performance-tuning/mysql-tools.md) lines 1–5; the lock/isolation angle cross-links are in [isolation-levels-locks.md](../advanced-features-internals/isolation-levels-locks.md), [locking-mechanisms.md](../advanced-features-internals/locking-mechanisms.md) and [lock-types.md](../advanced-features-internals/lock-types.md), lines 1–5 each.
- C locations: English README lines 16 and 22; Chinese README lines 16 and 22. The sidebar configuration comments in `docs/.vitepress/config.mts` lines 38–40 are consistent with the 7 topic groups, with no stale “lecture N” counts.
