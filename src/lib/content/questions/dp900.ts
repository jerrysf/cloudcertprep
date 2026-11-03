import type { Question } from "../schema";

export const dp900Questions: Question[] = [
  // ---- Core Data Concepts ----
  {
    id: "dp-core-001",
    slug: "dp-structured-semi-unstructured",
    cert: "dp-900",
    domain: "dp-core-data-concepts",
    topic: "dp-core-data-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "JSON documents from a web API — flexible schema, nested fields, some fields missing across records. Which data classification?",
    options: [
      { id: "A", text: "Structured data" },
      { id: "B", text: "Semi-structured data" },
      { id: "C", text: "Unstructured data" },
      { id: "D", text: "Relational data" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Semi-structured data has organizational markers (tags, keys, nesting) but no fixed schema — JSON/XML are the canonical examples. Structured = fixed-schema tables; unstructured = video/images/free text.",
    optionExplanations: {
      A: "Structured implies a rigid schema like SQL tables.",
      B: "JSON = semi-structured. Correct.",
      C: "Unstructured has no organizational markers at all.",
      D: "Relational is a structured-data model — JSON isn't relational.",
    },
    services: ["Azure Cosmos DB"],
    references: [
      {
        title: "Data types — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-core-data-concepts/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-core-002",
    slug: "dp-oltp-vs-olap",
    cert: "dp-900",
    domain: "dp-core-data-concepts",
    topic: "dp-core-data-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "An order-entry system processes thousands of small insert/update transactions per second with millisecond response requirements. Which workload type?",
    options: [
      { id: "A", text: "OLAP — analytical processing" },
      { id: "B", text: "OLTP — transactional processing" },
      { id: "C", text: "Batch processing" },
      { id: "D", text: "Data warehousing" },
    ],
    correctAnswers: ["B"],
    explanation:
      "OLTP = many small read/write transactions, low latency, current data — the classic order-entry/banking workload. OLAP/warehousing = large scans and aggregations over historical data for analysis.",
    optionExplanations: {
      A: "OLAP runs analytical queries over large historical datasets.",
      B: "High-volume small transactions = OLTP. Correct.",
      C: "Batch describes scheduling, not the transaction pattern.",
      D: "Warehousing is analytical storage — not transaction processing.",
    },
    services: ["Azure SQL Database"],
    references: [
      {
        title: "Transactional vs analytical workloads — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-core-data-concepts/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-core-003",
    slug: "dp-batch-vs-streaming",
    cert: "dp-900",
    domain: "dp-core-data-concepts",
    topic: "dp-core-data-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Fraud detection must flag suspicious card transactions within SECONDS of occurrence. Which processing model fits?",
    options: [
      { id: "A", text: "Batch processing on a nightly schedule" },
      { id: "B", text: "Stream processing" },
      { id: "C", text: "Weekly ETL" },
      { id: "D", text: "Manual report generation" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Stream processing handles data continuously as it arrives — sub-second to seconds latency. Batch processes accumulated data on a schedule (minutes to hours latency) — wrong fit for real-time fraud windows.",
    optionExplanations: {
      A: "Nightly batch finds fraud hours too late.",
      B: "Continuous low-latency processing = streaming. Correct.",
      C: "Weekly is even slower than nightly.",
      D: "Manual reporting isn't a processing model for this.",
    },
    services: ["Azure Stream Analytics", "Azure Event Hubs"],
    references: [
      {
        title: "Batch vs stream processing — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-core-data-concepts/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-core-004",
    slug: "dp-data-roles-analyst-engineer",
    cert: "dp-900",
    domain: "dp-core-data-concepts",
    topic: "dp-core-data-concepts",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Who primarily builds pipelines that move and transform raw data into systems where analysts can consume it?",
    options: [
      { id: "A", text: "Data analyst" },
      { id: "B", text: "Data engineer" },
      { id: "C", text: "Database administrator" },
      { id: "D", text: "Data scientist" },
    ],
    correctAnswers: ["B"],
    explanation:
      "The three core roles: data engineer builds pipelines/infrastructure to ingest and transform data; data analyst builds reports/visualizations on prepared data; DBA manages database systems (availability, security, backups). Pipeline-building = engineer.",
    optionExplanations: {
      A: "Analysts consume prepared data for reports.",
      B: "Pipelines and data infrastructure = engineer. Correct.",
      C: "DBAs operate and secure databases — not pipeline builders.",
      D: "Scientists build models/experiments — not ingestion pipelines.",
    },
    services: ["Microsoft Fabric", "Azure Data Factory"],
    references: [
      {
        title: "Data roles — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-roles-responsibilities-world-of-data/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-core-005",
    slug: "dp-data-lake-definition",
    cert: "dp-900",
    domain: "dp-core-data-concepts",
    topic: "dp-core-data-concepts",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company wants one repository storing raw data of EVERY type — files, logs, images, JSON — at scale, keeping native formats for future analysis. What is this pattern called?",
    options: [
      { id: "A", text: "Data warehouse" },
      { id: "B", text: "Data lake" },
      { id: "C", text: "Relational database" },
      { id: "D", text: "Data mart" },
    ],
    correctAnswers: ["B"],
    explanation:
      "A data lake stores raw data in native format at scale — schema-on-read. A warehouse stores structured, processed data (schema-on-write) for BI. Lake = raw everything; warehouse = curated for queries.",
    optionExplanations: {
      A: "Warehouses hold processed, structured data — not raw everything.",
      B: "Raw native-format storage at scale = lake. Correct.",
      C: "Relational DBs impose schema — opposite of raw storage.",
      D: "A mart is a scoped warehouse subset — curated, not raw.",
    },
    services: ["Azure Data Lake Storage"],
    references: [
      {
        title: "Data lake concepts — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-data-lake-azure/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-core-006",
    slug: "dp-etl-vs-elt",
    cert: "dp-900",
    domain: "dp-core-data-concepts",
    topic: "dp-core-data-concepts",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which accurately contrasts ETL and ELT in modern analytics pipelines?",
    options: [
      { id: "A", text: "ETL transforms before loading; ELT loads raw data first and transforms in the target" },
      { id: "B", text: "ETL is for streaming; ELT is for batch" },
      { id: "C", text: "ELT transforms before loading; ETL transforms after" },
      { id: "D", text: "They are identical" },
    ],
    correctAnswers: ["A"],
    explanation:
      "ETL: Extract → Transform → Load (transform in a staging engine, load curated). ELT: Extract → Load → Transform (land raw in the lake/warehouse, transform with the target's compute — the modern lakehouse pattern).",
    optionExplanations: {
      A: "Correct ordering distinction.",
      B: "Both can be batch or streaming — the difference is WHERE transform happens.",
      C: "Reversed — ELT loads first.",
      D: "The transform location genuinely differs.",
    },
    services: ["Azure Data Factory", "Microsoft Fabric"],
    references: [
      {
        title: "ETL and ELT — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-core-data-concepts/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-core-007",
    slug: "dp-data-normalization-purpose",
    cert: "dp-900",
    domain: "dp-core-data-concepts",
    topic: "dp-core-data-concepts",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Why do transactional relational databases normalize data into multiple related tables?",
    options: [
      { id: "A", text: "To reduce redundancy and prevent update anomalies" },
      { id: "B", text: "To speed up large analytical scans" },
      { id: "C", text: "To store unstructured data" },
      { id: "D", text: "To eliminate the need for keys" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Normalization removes duplicated data — each fact lives once — preventing update/insert/delete anomalies. Analytics systems often DENORMALIZE (star schemas) because fewer joins speed up reads.",
    optionExplanations: {
      A: "Dedup + integrity = normalization's purpose. Correct.",
      B: "Analytic systems denormalize for speed — opposite direction.",
      C: "Normalization is a relational-structuring concept.",
      D: "Normalization relies ON keys — it doesn't remove them.",
    },
    services: ["Azure SQL Database"],
    references: [
      {
        title: "Relational data concepts — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-relational-data-offerings/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-core-008",
    slug: "dp-schema-on-read-vs-write",
    cert: "dp-900",
    domain: "dp-core-data-concepts",
    topic: "dp-core-data-concepts",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A data lake applies structure only when data is READ for analysis, while a warehouse enforces structure on WRITE. What are these called?",
    options: [
      { id: "A", text: "Schema-on-read vs schema-on-write" },
      { id: "B", text: "Normalization vs denormalization" },
      { id: "C", text: "Indexing vs partitioning" },
      { id: "D", text: "ACID vs BASE" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Schema-on-read (lakes): store raw, interpret at query time — flexible, handles any format. Schema-on-write (warehouses): enforce structure on ingest — guarantees consistency, faster predictable queries.",
    optionExplanations: {
      A: "Correct terminology pair.",
      B: "Normalization is table design within relational schemas.",
      C: "Indexing/partitioning are physical storage optimizations.",
      D: "ACID/BASE describe transaction consistency models.",
    },
    services: ["Azure Data Lake Storage", "Azure Synapse Analytics"],
    references: [
      {
        title: "Schema on read — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-data-lake-azure/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-core-009",
    slug: "dp-data-ingestion-definition",
    cert: "dp-900",
    domain: "dp-core-data-concepts",
    topic: "dp-core-data-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "In an analytics solution, what does 'data ingestion' refer to?",
    options: [
      { id: "A", text: "Visualizing data in dashboards" },
      { id: "B", text: "Collecting and importing data from source systems into the platform" },
      { id: "C", text: "Deleting obsolete records" },
      { id: "D", text: "Querying a data warehouse" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Ingestion is the intake stage — pulling data from sources (files, APIs, streams, databases) into the analytics platform, the first step before storage, transform, and serving.",
    optionExplanations: {
      A: "That's the serving/visualization stage.",
      B: "Source→platform intake = ingestion. Correct.",
      C: "Lifecycle management — not ingestion.",
      D: "Querying is consumption — the last stage.",
    },
    services: ["Azure Data Factory"],
    references: [
      {
        title: "Data ingestion — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-data-ingestion-azure/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-core-010",
    slug: "dp-csv-file-format",
    cert: "dp-900",
    domain: "dp-core-data-concepts",
    topic: "dp-core-data-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which file format stores tabular data as plain text with one record per line and comma-separated fields — readable by almost every tool?",
    options: [
      { id: "A", text: "Parquet" },
      { id: "B", text: "CSV" },
      { id: "C", text: "Avro" },
      { id: "D", text: "ORC" },
    ],
    correctAnswers: ["B"],
    explanation:
      "CSV = delimited text, human-readable, universal interchange. Parquet/ORC are compressed COLUMNAR binary formats optimized for analytics; Avro is a row-based binary format for serialization/streaming.",
    optionExplanations: {
      A: "Parquet is binary columnar — not plain text.",
      B: "Text rows, comma fields = CSV. Correct.",
      C: "Avro is binary + schema — not readable text.",
      D: "ORC is binary columnar like Parquet.",
    },
    services: ["Azure Data Lake Storage"],
    references: [
      {
        title: "Common file formats — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-core-data-concepts/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  // ---- Relational Data on Azure ----
  {
    id: "dp-rel-001",
    slug: "dp-azure-sql-database-paas",
    cert: "dp-900",
    domain: "dp-relational-data",
    topic: "dp-relational-data",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A team wants a managed SQL Server-compatible database WITHOUT managing VMs, patching, or backups — fully PaaS. Which Azure service?",
    options: [
      { id: "A", text: "SQL Server on Azure VMs (IaaS)" },
      { id: "B", text: "Azure SQL Database" },
      { id: "C", text: "Azure Cosmos DB" },
      { id: "D", text: "Azure Table Storage" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Azure SQL Database is the PaaS relational engine — Microsoft manages patching, HA, and backups. SQL on VMs is IaaS (you manage the OS/SQL). Cosmos DB and Table Storage are non-relational.",
    optionExplanations: {
      A: "VMs = IaaS — you patch and manage.",
      B: "Managed SQL PaaS = Azure SQL Database. Correct.",
      C: "Cosmos DB is NoSQL — not relational SQL.",
      D: "Table Storage is a key-attribute NoSQL store.",
    },
    services: ["Azure SQL Database"],
    references: [
      {
        title: "Azure SQL Database — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-rel-002",
    slug: "dp-sql-managed-instance-vs-database",
    cert: "dp-900",
    domain: "dp-relational-data",
    topic: "dp-relational-data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company migrating on-prem SQL Server needs near-100% compatibility — SQL Agent jobs, cross-database queries, CLR — while staying PaaS. Which service?",
    options: [
      { id: "A", text: "Azure SQL Database (single database)" },
      { id: "B", text: "Azure SQL Managed Instance" },
      { id: "C", text: "Azure Database for PostgreSQL" },
      { id: "D", text: "Azure Synapse SQL pools" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Managed Instance = instance-scoped PaaS with ~near-complete SQL Server compatibility (Agent, linked servers, CLR, cross-DB queries) — the lift-and-shift target. Single-database Azure SQL DB lacks instance-level features.",
    optionExplanations: {
      A: "Single DB lacks Agent/cross-DB features.",
      B: "Instance-level PaaS = Managed Instance. Correct.",
      C: "Different engine — no SQL Server compatibility.",
      D: "Synapse is analytics — not OLTP migration target.",
    },
    services: ["Azure SQL Managed Instance"],
    references: [
      {
        title: "SQL Managed Instance — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-rel-003",
    slug: "dp-primary-foreign-key",
    cert: "dp-900",
    domain: "dp-relational-data",
    topic: "dp-relational-data",
    difficulty: "easy",
    format: "single-choice",
    question:
      "In an Orders table, a CustomerID column links each order to a row in the Customers table. What is CustomerID called in the ORDERS table?",
    options: [
      { id: "A", text: "Primary key" },
      { id: "B", text: "Foreign key" },
      { id: "C", text: "Composite key" },
      { id: "D", text: "Index" },
    ],
    correctAnswers: ["B"],
    explanation:
      "A foreign key references a primary key in ANOTHER table — enforcing referential integrity (you can't order for a nonexistent customer). The primary key is in Customers; Orders.CustomerID is the FK.",
    optionExplanations: {
      A: "PK uniquely identifies the row's own table.",
      B: "Reference to another table's PK = FK. Correct.",
      C: "Composite = multi-column key — different concept.",
      D: "An index speeds lookups — doesn't define relationships.",
    },
    services: ["Azure SQL Database"],
    references: [
      {
        title: "Keys and relationships — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-relational-data-offerings/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-rel-004",
    slug: "dp-open-source-azure-databases",
    cert: "dp-900",
    domain: "dp-relational-data",
    topic: "dp-relational-data",
    difficulty: "easy",
    format: "multiple-response",
    question:
      "Which TWO are managed open-source relational database services on Azure? (Select 2)",
    options: [
      { id: "A", text: "Azure Database for PostgreSQL" },
      { id: "B", text: "Azure SQL Database" },
      { id: "C", text: "Azure Database for MySQL" },
      { id: "D", text: "Azure Cosmos DB" },
    ],
    correctAnswers: ["A", "C"],
    explanation:
      "Azure offers managed PaaS for both open-source engines: Database for PostgreSQL and Database for MySQL (plus MariaDB). Azure SQL Database is Microsoft's proprietary engine; Cosmos DB is NoSQL.",
    optionExplanations: {
      A: "PostgreSQL = open-source engine, managed on Azure. Correct.",
      B: "Azure SQL = Microsoft proprietary.",
      C: "MySQL = open-source, managed offering exists. Correct.",
      D: "Cosmos DB is proprietary NoSQL — not relational.",
    },
    services: ["Azure Database for PostgreSQL", "Azure Database for MySQL"],
    references: [
      {
        title: "Open-source databases on Azure — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-relational-data-offerings/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-rel-005",
    slug: "dp-sql-select-statement",
    cert: "dp-900",
    domain: "dp-relational-data",
    topic: "dp-relational-data",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which SQL statement retrieves rows matching a condition without changing any data?",
    options: [
      { id: "A", text: "INSERT" },
      { id: "B", text: "SELECT ... WHERE" },
      { id: "C", text: "UPDATE" },
      { id: "D", text: "DELETE" },
    ],
    correctAnswers: ["B"],
    explanation:
      "SELECT retrieves data; WHERE filters rows. INSERT/UPDATE/DELETE are DML write operations. DP-900 expects you to recognize basic SQL statement roles — SELECT, INSERT, UPDATE, DELETE, plus DDL like CREATE/ALTER/DROP.",
    optionExplanations: {
      A: "INSERT adds rows — a write op.",
      B: "Read + filter = SELECT/WHERE. Correct.",
      C: "UPDATE modifies rows.",
      D: "DELETE removes rows.",
    },
    services: ["Azure SQL Database"],
    references: [
      {
        title: "Query relational data — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-relational-data-azure/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-rel-006",
    slug: "dp-view-definition",
    cert: "dp-900",
    domain: "dp-relational-data",
    topic: "dp-relational-data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An analyst should query a predefined JOIN of customers and orders WITHOUT seeing the underlying query or table structure. Which database object provides this?",
    options: [
      { id: "A", text: "Index" },
      { id: "B", text: "View" },
      { id: "C", text: "Stored procedure" },
      { id: "D", text: "Trigger" },
    ],
    correctAnswers: ["B"],
    explanation:
      "A view is a saved query exposed as a virtual table — abstracts complexity, restricts which columns/rows users see. Stored procedures EXECUTE logic; a view presents a reusable queryable result.",
    optionExplanations: {
      A: "Indexes speed lookups — they don't expose query results.",
      B: "Saved query as a virtual table = view. Correct.",
      C: "Procedures run logic — they're not queryable result sets per se.",
      D: "Triggers fire on data changes — unrelated.",
    },
    services: ["Azure SQL Database"],
    references: [
      {
        title: "Views — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/sql/relational-databases/views/views",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-rel-007",
    slug: "dp-index-purpose",
    cert: "dp-900",
    domain: "dp-relational-data",
    topic: "dp-relational-data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Queries filtering on a non-keyed Email column are slow — full table scans on millions of rows. What's the standard relational fix?",
    options: [
      { id: "A", text: "Create an index on Email" },
      { id: "B", text: "Normalize the table further" },
      { id: "C", text: "Add a foreign key" },
      { id: "D", text: "Move the column to another table" },
    ],
    correctAnswers: ["A"],
    explanation:
      "An index on the filtered column lets the engine seek directly instead of scanning every row — the classic relational query-tuning answer. Trade-off: indexes cost write performance and storage.",
    optionExplanations: {
      A: "Index on the filter column = seek not scan. Correct.",
      B: "Normalization fixes redundancy — not lookup speed.",
      C: "FKs enforce integrity — not query performance.",
      D: "Moving the column doesn't change scan behavior.",
    },
    services: ["Azure SQL Database"],
    references: [
      {
        title: "Indexes — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-relational-data-azure/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-rel-008",
    slug: "dp-azure-sql-vs-cosmos-choice",
    cert: "dp-900",
    domain: "dp-relational-data",
    topic: "dp-relational-data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An app stores orders with strict referential integrity, complex multi-table JOINs, and T-SQL reporting requirements. Which Azure service fits?",
    options: [
      { id: "A", text: "Azure Cosmos DB" },
      { id: "B", text: "Azure SQL Database" },
      { id: "C", text: "Azure Blob Storage" },
      { id: "D", text: "Azure Table Storage" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Multi-table JOINs + referential integrity + T-SQL = relational engine requirements → Azure SQL Database. Cosmos DB handles JSON documents at global scale but joins are intra-partition/limited; Blob/Table aren't queryable relational stores.",
    optionExplanations: {
      A: "Cosmos is document NoSQL — no rich cross-entity joins.",
      B: "Relational + T-SQL = SQL Database. Correct.",
      C: "Blob is object storage — not a queryable database.",
      D: "Table Storage is simple key-attribute — no joins.",
    },
    services: ["Azure SQL Database"],
    references: [
      {
        title: "Choose a data store — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-relational-data-offerings/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-rel-009",
    slug: "dp-dtu-vs-vcore",
    cert: "dp-900",
    domain: "dp-relational-data",
    topic: "dp-relational-data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "When provisioning Azure SQL Database, what do the DTU and vCore purchasing models represent?",
    options: [
      { id: "A", text: "Storage pricing vs compute pricing" },
      { id: "B", text: "A blended CPU/memory/IO measure vs explicit vCPU cores" },
      { id: "C", text: "Free tier vs paid tier" },
      { id: "D", text: "Single database vs elastic pool" },
    ],
    correctAnswers: ["B"],
    explanation:
      "DTU bundles CPU+memory+IO into one abstract measure — simpler sizing. vCore exposes explicit compute cores with hardware choices — more control, transparent scaling. Both are provisioning models, not storage/pricing tiers.",
    optionExplanations: {
      A: "Both models cover compute — storage is priced separately.",
      B: "Blended measure vs explicit cores. Correct.",
      C: "Both models have multiple paid tiers.",
      D: "Elastic pools are a different orthogonal feature.",
    },
    services: ["Azure SQL Database"],
    references: [
      {
        title: "Purchasing models — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/azure-sql/database/purchasing-models",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-rel-010",
    slug: "dp-sql-server-on-vm-iaas",
    cert: "dp-900",
    domain: "dp-relational-data",
    topic: "dp-relational-data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An app requires a specific SQL Server version plus custom OS-level agents on the database server — unsupported by any PaaS tier. Which deployment option allows full control?",
    options: [
      { id: "A", text: "Azure SQL Database" },
      { id: "B", text: "SQL Server on Azure Virtual Machines" },
      { id: "C", text: "Azure SQL Managed Instance" },
      { id: "D", text: "Azure Database for MySQL" },
    ],
    correctAnswers: ["B"],
    explanation:
      "IaaS (SQL Server on VMs) = full control: any version, OS-level access, custom agents/extensions — at the cost of managing patching/HA yourself. PaaS options remove control for convenience.",
    optionExplanations: {
      A: "PaaS single database — no OS access.",
      B: "Full control requires IaaS VM. Correct.",
      C: "MI is still PaaS — no OS-level customization.",
      D: "Wrong engine AND PaaS.",
    },
    services: ["SQL Server on Azure VMs"],
    references: [
      {
        title: "SQL Server on Azure VMs — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  // ---- Non-Relational Data ----
  {
    id: "dp-doc-001",
    slug: "dp-cosmos-db-global-distribution",
    cert: "dp-900",
    domain: "dp-non-relational-data",
    topic: "dp-non-relational-data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A global app needs single-digit-millisecond reads/writes for JSON documents in EVERY region users live — with multi-region replication built in. Which service?",
    options: [
      { id: "A", text: "Azure SQL Database" },
      { id: "B", text: "Azure Cosmos DB" },
      { id: "C", text: "Azure Table Storage" },
      { id: "D", text: "Azure Files" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Cosmos DB is the globally-distributed NoSQL database — turnkey multi-region replication, multi-model APIs, tunable consistency, and SLAs on latency. Its signature differentiator is global distribution.",
    optionExplanations: {
      A: "Relational — single-region writes by default.",
      B: "Global distribution + low latency = Cosmos. Correct.",
      C: "Table Storage is simpler key-attribute — no global replication features like Cosmos.",
      D: "Files is SMB file shares — not a document DB.",
    },
    services: ["Azure Cosmos DB"],
    references: [
      {
        title: "Azure Cosmos DB — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/cosmos-db/introduction",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-doc-002",
    slug: "dp-cosmos-consistency-levels",
    cert: "dp-900",
    domain: "dp-non-relational-data",
    topic: "dp-non-relational-data",
    difficulty: "hard",
    format: "single-choice",
    question:
      "Which Cosmos DB consistency level guarantees reads ALWAYS see the most recent write — the strongest guarantee with the lowest availability during partitions?",
    options: [
      { id: "A", text: "Eventual" },
      { id: "B", text: "Strong" },
      { id: "C", text: "Session" },
      { id: "D", text: "Consistent prefix" },
    ],
    correctAnswers: ["B"],
    explanation:
      "The five levels from strongest to weakest: Strong → Bounded staleness → Session → Consistent prefix → Eventual. Strong = linearizable reads everywhere, trading availability/latency; Eventual = max availability, replicas may lag.",
    optionExplanations: {
      A: "Eventual is the WEAKEST — opposite end.",
      B: "Linearizability = Strong. Correct.",
      C: "Session guarantees consistency within a client session only.",
      D: "Consistent prefix only guarantees read ORDER, not recency.",
    },
    services: ["Azure Cosmos DB"],
    references: [
      {
        title: "Consistency levels — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-doc-003",
    slug: "dp-cosmos-apis-core-gremlin",
    cert: "dp-900",
    domain: "dp-non-relational-data",
    topic: "dp-non-relational-data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A social network needs to store and traverse relationships — 'friends of friends' queries — in Cosmos DB. Which API models graph data?",
    options: [
      { id: "A", text: "NoSQL API (SQL for JSON)" },
      { id: "B", text: "Gremlin API" },
      { id: "C", text: "Table API" },
      { id: "D", text: "MongoDB API" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Cosmos is multi-model via APIs: NoSQL (JSON docs + SQL query), MongoDB API, Cassandra API (column-family), Table API (key-attribute), Gremlin API (graph nodes+edges for relationship traversal).",
    optionExplanations: {
      A: "NoSQL API stores JSON — not graph traversals.",
      B: "Graph model = Gremlin. Correct.",
      C: "Table API = key-attribute — no relationships.",
      D: "Mongo API = documents — not native graph.",
    },
    services: ["Azure Cosmos DB"],
    references: [
      {
        title: "Cosmos DB APIs — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/cosmos-db/choose-api",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-doc-004",
    slug: "dp-blob-storage-object-data",
    cert: "dp-900",
    domain: "dp-non-relational-data",
    topic: "dp-non-relational-data",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A media company needs cheap, massively scalable storage for video files and images served to a website. Which Azure Storage service?",
    options: [
      { id: "A", text: "Azure Files" },
      { id: "B", text: "Azure Blob Storage" },
      { id: "C", text: "Azure Table Storage" },
      { id: "D", text: "Azure Queue Storage" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Blob Storage = object storage for unstructured data — images, video, backups, static site assets — with hot/cool/cold/archive tiers. Files = SMB file shares; Table = key-attribute NoSQL; Queue = messaging.",
    optionExplanations: {
      A: "Files is SMB network shares — different protocol.",
      B: "Unstructured object storage = Blob. Correct.",
      C: "Table stores key-value entities — not files.",
      D: "Queue is messaging — not file storage.",
    },
    services: ["Azure Blob Storage"],
    references: [
      {
        title: "Azure Blob Storage — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-doc-005",
    slug: "dp-adls-gen2-hierarchical",
    cert: "dp-900",
    domain: "dp-non-relational-data",
    topic: "dp-non-relational-data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A big-data analytics team needs a data lake with true hierarchical directories (folders you can rename atomically) and POSIX-style permissions, built on Blob Storage. Which capability?",
    options: [
      { id: "A", text: "Standard Blob Storage containers" },
      { id: "B", text: "Azure Data Lake Storage Gen2 (hierarchical namespace enabled)" },
      { id: "C", text: "Azure Files" },
      { id: "D", text: "Azure Table Storage" },
    ],
    correctAnswers: ["B"],
    explanation:
      "ADLS Gen2 = Blob Storage + hierarchical namespace: real directories, atomic rename, ACLs — the foundation of Azure data lakes for analytics. Standard Blob containers are flat namespaces with virtual folders.",
    optionExplanations: {
      A: "Flat namespace — no true directories or POSIX ACLs.",
      B: "Hierarchical namespace + ACLs = ADLS Gen2. Correct.",
      C: "Files is SMB shares — not analytics lake storage.",
      D: "Table is key-attribute store — not a filesystem.",
    },
    services: ["Azure Data Lake Storage"],
    references: [
      {
        title: "ADLS Gen2 — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-doc-006",
    slug: "dp-azure-table-storage-key-value",
    cert: "dp-900",
    domain: "dp-non-relational-data",
    topic: "dp-non-relational-data",
    difficulty: "easy",
    format: "single-choice",
    question:
      "An app needs simple schemaless key-attribute storage for customer session data — PartitionKey + RowKey lookups, no complex queries. Which Azure service fits best?",
    options: [
      { id: "A", text: "Azure Table Storage" },
      { id: "B", text: "Azure SQL Database" },
      { id: "C", text: "Azure Synapse Analytics" },
      { id: "D", text: "Azure Event Hubs" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Table Storage is the simple NoSQL key-attribute store — schemaless entities keyed by PartitionKey+RowKey, cheap and fast for simple lookups. Cosmos DB Table API is its modern multi-region upgrade.",
    optionExplanations: {
      A: "Simple key-attribute store = Table. Correct.",
      B: "Relational engine — overkill for key lookups.",
      C: "Analytics platform — not operational storage.",
      D: "Event streaming — not storage at all.",
    },
    services: ["Azure Table Storage"],
    references: [
      {
        title: "Table Storage — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/storage/tables/table-storage-overview",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-doc-007",
    slug: "dp-blob-access-tiers",
    cert: "dp-900",
    domain: "dp-non-relational-data",
    topic: "dp-non-relational-data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Backup archives must be retained for years and are almost NEVER read — lowest storage cost is the priority, and retrieval in hours is acceptable. Which Blob tier?",
    options: [
      { id: "A", text: "Hot" },
      { id: "B", text: "Cool" },
      { id: "C", text: "Cold" },
      { id: "D", text: "Archive" },
    ],
    correctAnswers: ["D"],
    explanation:
      "Archive = offline tier, cheapest GB/month, but data must be rehydrated (hours) before reading. Hot = frequent access; Cool/Cold = infrequent but still online. Rarely-read long retention + hours tolerance = Archive.",
    optionExplanations: {
      A: "Hot is for frequent access — most expensive storage.",
      B: "Cool is online — cheaper but not the cheapest.",
      C: "Cold is still online retrieval — not archive pricing.",
      D: "Offline + cheapest + rehydrate delay = Archive. Correct.",
    },
    services: ["Azure Blob Storage"],
    references: [
      {
        title: "Blob access tiers — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-doc-008",
    slug: "dp-document-vs-keyvalue-vs-column",
    cert: "dp-900",
    domain: "dp-non-relational-data",
    topic: "dp-non-relational-data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Match the scenario: a product catalog where each item is a self-contained JSON with varying attributes per category. Which non-relational model?",
    options: [
      { id: "A", text: "Key-value store" },
      { id: "B", text: "Document database" },
      { id: "C", text: "Column-family store" },
      { id: "D", text: "Graph database" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Document DBs store self-describing JSON documents — perfect for catalogs with heterogeneous attributes. Key-value = opaque blobs by key; column-family = sparse wide tables (Cassandra); graph = relationships.",
    optionExplanations: {
      A: "Key-value stores opaque values — no queryable structure.",
      B: "JSON documents per item = document model. Correct.",
      C: "Column-family suits time-series/wide rows — not nested docs.",
      D: "Graph is for relationships — not the catalog shape here.",
    },
    services: ["Azure Cosmos DB"],
    references: [
      {
        title: "Non-relational data models — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-non-relational-data-offerings-azure/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-doc-009",
    slug: "dp-cosmos-partition-key",
    cert: "dp-900",
    domain: "dp-non-relational-data",
    topic: "dp-non-relational-data",
    difficulty: "hard",
    format: "single-choice",
    question:
      "In Cosmos DB, what does the choice of PARTITION KEY most directly determine?",
    options: [
      { id: "A", text: "How items distribute across physical partitions — affecting scalability and query efficiency" },
      { id: "B", text: "The encryption used at rest" },
      { id: "C", text: "Which consistency level applies" },
      { id: "D", text: "The document schema" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Partition key value routes each item to a logical partition — good keys spread load evenly (high cardinality) and keep query targets single-partition. Poor keys create hot partitions and expensive cross-partition fan-out queries.",
    optionExplanations: {
      A: "Distribution + query targeting = partition key role. Correct.",
      B: "Encryption is platform-managed — unrelated.",
      C: "Consistency is account/request-level config.",
      D: "Items remain schemaless regardless of key choice.",
    },
    services: ["Azure Cosmos DB"],
    references: [
      {
        title: "Partitioning — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/cosmos-db/partitioning-overview",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-doc-010",
    slug: "dp-azure-files-smb",
    cert: "dp-900",
    domain: "dp-non-relational-data",
    topic: "dp-non-relational-data",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Legacy apps need shared file storage mounted over SMB that works like an on-prem file share — lift-and-shift without code changes. Which service?",
    options: [
      { id: "A", text: "Azure Blob Storage" },
      { id: "B", text: "Azure Files" },
      { id: "C", text: "Azure Data Lake Storage" },
      { id: "D", text: "Azure Disk Storage" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Azure Files = managed SMB/NFS file shares mountable by Windows/Linux/macOS — the file-server-in-the-cloud service. Blob is object storage (no SMB mounting natively); disks attach to a single VM.",
    optionExplanations: {
      A: "Blob is object storage — not mountable as SMB.",
      B: "Managed SMB shares = Azure Files. Correct.",
      C: "ADLS is analytics storage — not SMB shares.",
      D: "Disks attach to one VM — not a shared filesystem.",
    },
    services: ["Azure Files"],
    references: [
      {
        title: "Azure Files — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  // ---- Analytics Workloads ----
  {
    id: "dp-an-001",
    slug: "dp-data-warehouse-definition",
    cert: "dp-900",
    domain: "dp-analytics-workloads",
    topic: "dp-analytics-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A BI team needs a centralized store of CLEANED, structured historical data optimized for fast analytical queries and reporting. What is this called?",
    options: [
      { id: "A", text: "Data lake" },
      { id: "B", text: "Data warehouse" },
      { id: "C", text: "OLTP database" },
      { id: "D", text: "Message queue" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Data warehouse = curated, structured data optimized for analytics (star schemas, columnar storage, MPP). The lake holds raw data; the warehouse holds processed data ready for BI.",
    optionExplanations: {
      A: "Lakes store raw data — not curated-for-BI.",
      B: "Curated analytics store = warehouse. Correct.",
      C: "OLTP serves transactions — not analytical scans.",
      D: "Queues move messages — not analytical storage.",
    },
    services: ["Azure Synapse Analytics"],
    references: [
      {
        title: "Data warehousing — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-data-warehousing-azure/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-an-002",
    slug: "dp-synapse-analytics-role",
    cert: "dp-900",
    domain: "dp-analytics-workloads",
    topic: "dp-analytics-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which Azure service provides a unified analytics platform combining SQL pools (data warehousing), Spark, data integration pipelines, and serverless SQL querying?",
    options: [
      { id: "A", text: "Azure SQL Database" },
      { id: "B", text: "Azure Synapse Analytics" },
      { id: "C", text: "Azure Cosmos DB" },
      { id: "D", text: "Azure Data Factory only" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Synapse is the integrated analytics service: dedicated SQL pools (warehouse), serverless SQL, Spark pools, and pipelines in one workspace. Note Microsoft Fabric is the newer unified SaaS analytics platform — both appear on DP-900.",
    optionExplanations: {
      A: "Single relational engine — not an analytics platform.",
      B: "Unified analytics workspace = Synapse. Correct.",
      C: "Operational NoSQL — not warehousing.",
      D: "ADF is only orchestration — one component, not the platform.",
    },
    services: ["Azure Synapse Analytics"],
    references: [
      {
        title: "Azure Synapse Analytics — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/synapse-analytics/overview-what-is",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-an-003",
    slug: "dp-power-bi-role",
    cert: "dp-900",
    domain: "dp-analytics-workloads",
    topic: "dp-analytics-workloads",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which tool builds interactive dashboards and reports — charts, maps, drill-down — consumed by business users, sitting at the END of the analytics pipeline?",
    options: [
      { id: "A", text: "Azure Data Factory" },
      { id: "B", text: "Power BI" },
      { id: "C", text: "Azure Event Hubs" },
      { id: "D", text: "Azure Stream Analytics" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Power BI is Microsoft's BI/visualization layer — models data, builds dashboards/reports, shares via Power BI Service. It's the 'serve/visualize' stage after ingest → store → transform.",
    optionExplanations: {
      A: "ADF orchestrates pipelines — not visualization.",
      B: "Dashboards/reports = Power BI. Correct.",
      C: "Event Hubs ingests streams — not dashboards.",
      D: "Stream Analytics processes streams — not BI.",
    },
    services: ["Power BI"],
    references: [
      {
        title: "Power BI — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-data-analysis-visualization/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-an-004",
    slug: "dp-star-schema-facts-dimensions",
    cert: "dp-900",
    domain: "dp-analytics-workloads",
    topic: "dp-analytics-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "In a star schema, which correctly distinguishes FACT tables from DIMENSION tables?",
    options: [
      { id: "A", text: "Facts store numeric measurements/events; dimensions store descriptive attributes for slicing" },
      { id: "B", text: "Facts store descriptions; dimensions store numbers" },
      { id: "C", text: "Facts link to other facts; dimensions are unlinked" },
      { id: "D", text: "There is no difference" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Facts = measurable events (sales amounts, clicks) with FKs to dimensions. Dimensions = the 'who/what/where/when' context (customer, product, date, region) used to slice/aggregate facts. The exam loves this distinction.",
    optionExplanations: {
      A: "Measurements + descriptive context = correct split.",
      B: "Reversed — facts are numbers, dimensions are descriptions.",
      C: "Dimensions link TO facts — not vice versa as stated.",
      D: "The distinction is the whole point of star schema.",
    },
    services: ["Azure Synapse Analytics"],
    references: [
      {
        title: "Star schema — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/explore-data-warehousing-azure/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-an-005",
    slug: "dp-microsoft-fabric-saas",
    cert: "dp-900",
    domain: "dp-analytics-workloads",
    topic: "dp-analytics-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which Microsoft offering is a unified SaaS analytics platform — OneLake storage, data engineering, warehousing, real-time intelligence, and Power BI in a single product?",
    options: [
      { id: "A", text: "Microsoft Fabric" },
      { id: "B", text: "Azure Data Factory" },
      { id: "C", text: "Azure HDInsight" },
      { id: "D", text: "Azure SQL Managed Instance" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Microsoft Fabric is the all-in-one SaaS analytics platform — OneLake (unified storage), lakehouses, warehouses, KQL/real-time, Data Factory, and Power BI. It's the newer consolidated alternative to assembling Synapse components.",
    optionExplanations: {
      A: "Unified SaaS analytics = Fabric. Correct.",
      B: "ADF is just the orchestration piece.",
      C: "HDInsight is managed open-source clusters (Hadoop/Spark).",
      D: "MI is a relational database — not analytics SaaS.",
    },
    services: ["Microsoft Fabric"],
    references: [
      {
        title: "Microsoft Fabric — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-an-006",
    slug: "dp-event-hubs-stream-ingestion",
    cert: "dp-900",
    domain: "dp-analytics-workloads",
    topic: "dp-analytics-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Millions of IoT telemetry events per second must be ingested and buffered for downstream real-time processing. Which Azure service is the event-ingestion front door?",
    options: [
      { id: "A", text: "Azure Event Hubs" },
      { id: "B", text: "Azure SQL Database" },
      { id: "C", text: "Power BI" },
      { id: "D", text: "Azure Blob Storage" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Event Hubs is the big-data event ingestion service — millions of events/sec, partitioned, replayable, Kafka-compatible endpoint. It feeds Stream Analytics/Fabric real-time or landing in the lake. Azure IoT Hub adds device management for IoT specifically.",
    optionExplanations: {
      A: "High-throughput event buffering = Event Hubs. Correct.",
      B: "Relational DB can't ingest at that rate.",
      C: "BI is the consumption end — not ingestion.",
      D: "Blob is storage — events must land there via something else.",
    },
    services: ["Azure Event Hubs"],
    references: [
      {
        title: "Event Hubs — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-about",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-an-007",
    slug: "dp-data-factory-pipelines",
    cert: "dp-900",
    domain: "dp-analytics-workloads",
    topic: "dp-analytics-workloads",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which service builds code-free DATA pipelines — copying data from dozens of connectors, transforming it, scheduling the workflow?",
    options: [
      { id: "A", text: "Azure Data Factory" },
      { id: "B", text: "Azure Logic Apps" },
      { id: "C", text: "Power BI" },
      { id: "D", text: "Azure Event Grid" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Data Factory (and its Fabric incarnation) is the ETL/ELT orchestration service — Copy activity with 90+ connectors, mapping data flows for transform, triggers for scheduling. Logic Apps = app/workflow integration, not data pipelines.",
    optionExplanations: {
      A: "Data movement + transform orchestration = ADF. Correct.",
      B: "Logic Apps automate business workflows — not data pipelines.",
      C: "Power BI visualizes — doesn't orchestrate.",
      D: "Event Grid routes events — not batch pipelines.",
    },
    services: ["Azure Data Factory"],
    references: [
      {
        title: "Azure Data Factory — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/data-factory/introduction",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-an-008",
    slug: "dp-lakehouse-medallion",
    cert: "dp-900",
    domain: "dp-analytics-workloads",
    topic: "dp-analytics-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "In the medallion (lakehouse) architecture, what do bronze, silver, and gold layers represent?",
    options: [
      { id: "A", text: "Raw ingested → cleaned/conformed → business-ready aggregated data" },
      { id: "B", text: "Dev → test → production environments" },
      { id: "C", text: "Hot → cool → archive storage tiers" },
      { id: "D", text: "Free → standard → premium pricing" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Medallion = progressive refinement: bronze holds raw landed data, silver holds cleaned/deduped/conformed data, gold holds business-level aggregates ready for BI — the standard lakehouse data quality pattern.",
    optionExplanations: {
      A: "Raw→clean→curated = medallion layers. Correct.",
      B: "Not environments — data maturity levels.",
      C: "Unrelated to blob access tiers.",
      D: "Not pricing.",
    },
    services: ["Microsoft Fabric", "Azure Data Lake Storage"],
    references: [
      {
        title: "Medallion architecture — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/fabric/onelake/onelake-medallion-lakehouse-architecture",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-an-009",
    slug: "dp-stream-analytics-windowing",
    cert: "dp-900",
    domain: "dp-analytics-workloads",
    topic: "dp-analytics-workloads",
    difficulty: "hard",
    format: "single-choice",
    question:
      "Stream Analytics must compute 'average temperature per 5-minute window' over a continuous event stream. Which concept enables bounded calculations on unbounded data?",
    options: [
      { id: "A", text: "Windowing functions (tumbling/hopping/session)" },
      { id: "B", text: "Partition keys" },
      { id: "C", text: "Index tuning" },
      { id: "D", text: "Batch checkpoints" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Streaming queries are infinite — windowing bounds them: tumbling (fixed non-overlapping), hopping (overlapping), sliding, session windows. 'Average per 5 minutes' = tumbling window — the core stream-processing concept.",
    optionExplanations: {
      A: "Time-bounded aggregation = windowing. Correct.",
      B: "Partitioning distributes load — doesn't bound time.",
      C: "Indexing is storage optimization — not streaming logic.",
      D: "Checkpoints are fault recovery — not aggregation.",
    },
    services: ["Azure Stream Analytics"],
    references: [
      {
        title: "Stream Analytics windowing — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/stream-analytics-query/windowing-azure-stream-analytics",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "dp-an-010",
    slug: "dp-databricks-role",
    cert: "dp-900",
    domain: "dp-analytics-workloads",
    topic: "dp-analytics-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Data engineers want a collaborative Apache Spark notebook environment on Azure for large-scale transformation and ML — which first-party integrated service?",
    options: [
      { id: "A", text: "Azure Databricks" },
      { id: "B", text: "Azure SQL Database" },
      { id: "C", text: "Power BI" },
      { id: "D", text: "Azure Functions" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Azure Databricks = managed Spark platform with collaborative notebooks — the go-to for big-data processing, ML, and lakehouse transformations. Synapse Spark pools are the alternative; Databricks is the mature dedicated offering.",
    optionExplanations: {
      A: "Spark notebooks + collaboration = Databricks. Correct.",
      B: "Relational OLTP — not a Spark platform.",
      C: "BI visualization — not data engineering.",
      D: "Serverless functions — not interactive analytics compute.",
    },
    services: ["Azure Databricks"],
    references: [
      {
        title: "Azure Databricks — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/databricks/introduction/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  }
];
