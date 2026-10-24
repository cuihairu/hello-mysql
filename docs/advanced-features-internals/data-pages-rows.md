# Data Pages and Rows

In MySQL, data pages and data rows are the basic units of data storage in the storage engine (especially the InnoDB storage engine). Understanding their concepts is crucial for optimising database performance and managing data storage.

## 1. Data Page

- **Definition**:
  - A data page is the basic storage unit of data in a MySQL storage engine. In the InnoDB storage engine, the default size of a data page is 16 KB. Data pages are used to store the table's records (data rows) as well as structures such as indexes.

- **Structure**:
  - **Page header**: Contains information about the page, such as the page type, page number, page size, and so on.
  - **Records**: The actual data rows.
  - **Page trailer**: Used for checksums and other internal data structures.

- **Page types**:
  - **Data page (index page, `FIL_PAGE_INDEX`)**: In InnoDB, table data is itself organised by the clustered index, so the "data page" that stores data rows is in fact a leaf page of the clustered index; secondary indexes are stored in the same kind of page.
  - **Undo log page (`FIL_PAGE_UNDO_LOG`)**: Stores undo log records.
  - **System page / transaction system page**: Stores management information such as tablespaces and transactions.
  - **BLOB page (`FIL_PAGE_TYPE_BLOB`)**: Stores large field data that overflows onto pages outside the data page.
  - **Unallocated page (`FIL_PAGE_TYPE_ALLOCATED`)**: Pages not yet in use.

- **Management**:
  - The allocation and reclamation of data pages is managed automatically by the InnoDB storage engine. When more data needs to be stored, InnoDB allocates new data pages; when data is deleted, pages may be marked as free for future use.

## 2. Data Row

- **Definition**:
  - A data row is the unit in which actual data is stored in a table. Each data row corresponds to one record in the table.

- **Storage**:
  - Data rows are stored in data pages. Each data page can contain multiple data rows, depending on the size of each row and the size of the page.

- **Row formats**:
  - **Compact Row Format**: The storage format of each row is compact, saving space. Field length information is stored at the beginning of the row.
  - **Redundant Row Format**: An older format; the length information of each field is stored separately before each field in the data row.
  - **Dynamic Row Format**: Similar to Compact, but for long fields (such as TEXT and BLOB) it tends to put the entire value onto overflow pages, keeping only a 20-byte pointer within the data row. **The default row format in MySQL 8.0 is DYNAMIC**.
  - **Compressed Row Format**: Compresses the data before storage to save storage space, but requires additional computational overhead.

- **Management**:
  - The storage of data rows is managed automatically by InnoDB's internal mechanisms. Data rows can be located quickly through the primary key or a unique index.

## Performance optimisation and management

- **Page management**:
  - Understanding data page management helps optimise performance. For example, InnoDB's default page size is 16 KB, and can be set to 4 KB, 8 KB, 16 KB, 32 KB or 64 KB via the parameter `innodb_page_size` **at instance initialisation time**; the page size cannot be changed directly after initialisation — changing it requires re-exporting and re-importing the data.

- **Data row storage**:
  - When designing table structures, choosing the appropriate data row format and field types can optimise storage efficiency and query performance. For example, using a more compact row format can reduce storage needs, but may increase processing overhead.

- **Effect of indexes**:
  - Index page management and optimisation is closely related to data pages. An effective indexing strategy can significantly improve query performance and data access speed.

## Summary

Data pages and data rows are core components of data storage and management in MySQL. Understanding how they work helps optimise database performance, manage data storage effectively, and design efficient database structures. Data pages are responsible for storing and managing the table's data rows, while data rows are the actual records stored in the table. Through appropriate configuration and optimisation, the efficiency and response speed of the database can be improved.

## References

- [MySQL 8.0 Reference Manual · InnoDB Storage Engine](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)
- [MySQL 8.0 Reference Manual · InnoDB Architecture](https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html)
- [MySQL 8.0 Reference Manual · InnoDB Row Format](https://dev.mysql.com/doc/refman/8.0/en/innodb-row-format.html)
- [MySQL 8.0 Reference Manual · InnoDB Page Compression](https://dev.mysql.com/doc/refman/8.0/en/innodb-page-compression.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
- [glossary](/glossary.md)
