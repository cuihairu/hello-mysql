# Content and structure change review (2026-10-19)

## Scope reviewed

`git fetch origin && git pull --rebase origin main` was run first, and returned `Already up to date`; the working tree was clean when the review started. The repository's four most recent commits, in chronological order, are:

- `37e88b7` Add structure audit report
- `d1126cb` Unify documentation navigation source (A: unify the navigation source)
- `e9222ae` Clarify overlapping documentation topics (B: clarify and merge overlapping topics)
- `ee98aa4` Align project documentation description (C: unify the project's positioning)

The review range is `HEAD~4..HEAD`: 4 commits and 14 files (1 new audit report, 13 modifications to existing files), with no file deletions. I checked `transactions.md`'s deleted content, the SUMMARY index entries, the README wording, the sidebar, and every new cross-link section by section. All line numbers below refer to the versions at the time of review; deleted content is additionally cited with its old-version line numbers.

## Conclusions for the four checks

### 1. Lost content: not found

- B's deletions are concentrated in `docs/advanced-features-internals/transactions.md`, old lines 5–67. The old expansion of the transaction definition and ACID is now covered by `transaction-concepts.md:7–29`; the BEGIN, COMMIT and ROLLBACK examples and the autocommit discussion are now covered by `transaction-concepts.md:31–61` and `transaction-usage.md:5–58`; the four isolation levels and the InnoDB phantom-read note are now covered by `transaction-concepts.md:21–26` and `isolation-levels-locks.md:7–61`. The old transaction scenarios are still in `transactions.md:15–21`, and the transfer, order and batch-operation examples are in `transaction-usage.md:60–84`. The revised overview, `transactions.md:5–13`, links explicitly to those topic pages. Going through the deleted passages, I found no unique technical content that was deleted and not migrated elsewhere, so nothing needs to be put back.
- `docs/SUMMARY.md` was not drastically pruned: `d1126cb` added an explanatory note at the top (currently `SUMMARY.md:1–8`), and the complete old index mapping continues from line 10. Spot checks of parts 1, 2, 4, 5, 6 and 7 plus the appendix entries confirm they are still present (for example `SUMMARY.md:12–36, 77–120, 122–136`). It now states that it is for traceability only and is no longer the maintained navigation source, and no content-bearing entries were removed.

### 2. Incorrect rewording: no technical meaning reversed, no wrong numbers

- The README changes describe only the project's positioning; no chapter count, file count or directory count was added. English before and after: `README.md:16,22`, changing from “MySQL Knowledge Handbook” / “A Chinese-language knowledge site covering ... advanced data processing ...” to a collection of personal notes and development experience. Chinese before and after: `README.zh.md:16,22`, changing from “a Chinese-language knowledge site” to “personal experience sharing, not organised as courses or a learning path”. Neither the old nor the new text makes “supported/unsupported”-style technical capability claims, so the rewrite does not change any MySQL technical conclusion.
- The copy's topic coverage matches the repository: the 9 content topic directories are `basics`, `database-design`, `advanced-sql-data-processing`, `advanced-features-internals`, `architecture-deployment`, `performance-tuning`, `tools-practice`, `appendix` and `new-technologies-future`; the README's SQL / database design / internals / deployment / performance / tools descriptions do not claim any count of those directories or chapters. The visible Markdown count in the repository changes as the audit report itself is added, so it cannot be used as evidence of an incorrect number in the README.
- The sidebar still carries “Part 1” through “Part 7” (`sidebar.json:3` through to the part-7 tools group), so “not organised as courses or a learning path” is project-positioning wording rather than a precise statement of the structure; I found no technical meaning error caused by it. Whether “notes site” is the preferred term is an editorial choice, so it is not listed as a defect here and not rewritten.

### 3. Links and navigation: verified local targets are correct

- Recursively reading `docs/.vitepress/sidebar.json` yields 124 links, all 124 targets exist, and no target is duplicated. Of the changed appendix targets, `/appendix/README` keeps only one parent-level entry in `sidebar.json:527–547`, and the target file exists; the renamed appendix subgroup “Appendix materials” no longer links twice.
- Every cross-link B added points at the corresponding topic: index design and index implementation correspond to `database-design/index-design.md:3` and `advanced-features-internals/index-types.md:3`; the tools overview and performance observation correspond to `tools-practice/mysql-tools.md:3` and `performance-tuning/mysql-tools.md:3`; transaction concepts, operations, isolation and locks correspond to `transaction-concepts.md:3`, `transactions.md:9–11`, `isolation-levels-locks.md:3`, `locking-mechanisms.md:3` and `lock-types.md:3`. Reading the page titles and body topics by hand, I found no target that exists but is off-topic.
- Not verified: external URL reachability, post-deployment routes and anchors, and a full site build at the time of this review. None of that affects the conclusion of the local sidebar target check.

### 4. Evidence boundaries and unverified items

Git changes, target file existence, the changed sentences and the topics of the corresponding pages have all been checked. I did not pass off the build and link conclusions in the earlier structure audit report as results from a rerun just now; external links, build output and real navigation in a browser were not verified. I found no contested delete-or-merge decision that should be held back for lack of evidence.

## Issues found

| Severity | Issue | Evidence | Fixed? / commit |
|---|---|---|---|
| — | No clear lost content, wrong numbers, reversed technical meaning or misdirected links were found | See the four checks above | No fix needed |

## Conclusion

Within the review range stated in this report, this batch of structural and positioning changes can be considered **accepted**: no unique content needing to be put back, and no clear wording or local navigation error. External links and the build for this round were not verified, and are not part of the pass verdict. This verdict does not replace post-release verification of the unverified items.
