import type { Question } from "../schema";

/**
 * DEA-C01 (AWS Certified Data Engineer – Associate) seed questions.
 */
export const deaQuestions: Question[] = [
  {
    id: "dea-ing-001",
    slug: "serverless-etl-without-infrastructure",
    cert: "dea-c01",
    domain: "dea-ingestion-transformation",
    topic: "dea-ingestion-and-etl",
    subtopic: "AWS Glue",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A data team needs to run Python-based ETL jobs to transform S3 data into a queryable form — without provisioning servers. Which service is designed for this?",
    options: [
      { id: "A", text: "Amazon EMR on EC2" },
      { id: "B", text: "AWS Glue" },
      { id: "C", text: "AWS Data Pipeline" },
      { id: "D", text: "Amazon EC2 with cron" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AWS Glue is the fully managed, serverless ETL service — crawlers infer schemas, the Data Catalog stores metadata, and jobs transform data without infrastructure management. It's the canonical 'serverless ETL' answer.",
    optionExplanations: {
      A: "EMR runs managed clusters you size and pay for — not serverless.",
      B: "Correct. Glue is purpose-built serverless ETL with integrated cataloging.",
      C: "Data Pipeline is the legacy orchestration service; Glue superseded it for ETL.",
      D: "Cron on EC2 requires managing servers and isn't a data service.",
    },
    services: ["AWS Glue", "Amazon S3"],
    references: [
      {
        title: "What is AWS Glue",
        url: "https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dea-ing-002",
    slug: "kinesis-data-streams-vs-firehose",
    cert: "dea-c01",
    domain: "dea-ingestion-transformation",
    topic: "dea-ingestion-and-etl",
    subtopic: "Streaming ingestion",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A team needs to land streaming clickstream data directly into S3 as batched files, with optional format conversion — no custom consumers needed. Which Kinesis service fits best?",
    options: [
      { id: "A", text: "Kinesis Data Streams" },
      { id: "B", text: "Amazon Data Firehose" },
      { id: "C", text: "Kinesis Data Analytics" },
      { id: "D", text: "Amazon Managed Service for Apache Flink" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Amazon Data Firehose (formerly Kinesis Data Firehose) delivers streams directly to destinations like S3/Redshift/OpenSearch with built-in batching, compression, and format conversion — no consumer code required.",
    optionExplanations: {
      A: "Data Streams requires you to write consumers that process and store records.",
      B: "Correct. Firehose is the managed 'stream → destination' delivery service.",
      C: "Data Analytics is for SQL processing over streams, not S3 delivery.",
      D: "Managed Flink runs stream-processing apps — overkill for simple landing.",
    },
    services: ["Amazon Data Firehose", "Amazon Kinesis"],
    references: [
      {
        title: "Amazon Data Firehose",
        url: "https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dea-store-001",
    slug: "analytics-warehouse-for-petabyte-queries",
    cert: "dea-c01",
    domain: "dea-data-store-management",
    topic: "dea-data-stores",
    subtopic: "Redshift",
    difficulty: "easy",
    format: "single-choice",
    question:
      "An analytics team needs to run complex SQL joins and aggregations over terabytes-to-petabytes of structured data for BI dashboards. Which service is designed for this workload?",
    options: [
      { id: "A", text: "Amazon RDS" },
      { id: "B", text: "Amazon DynamoDB" },
      { id: "C", text: "Amazon Redshift" },
      { id: "D", text: "Amazon ElastiCache" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Amazon Redshift is the petabyte-scale, columnar data warehouse built for analytic SQL (OLAP) — massive parallel query execution, result caching, and BI tool integrations.",
    optionExplanations: {
      A: "RDS handles OLTP workloads; it's not optimized for large analytic scans.",
      B: "DynamoDB is key-value NoSQL for item-level access, not SQL analytics.",
      C: "Correct. Redshift is the dedicated analytics warehouse.",
      D: "ElastiCache is an in-memory cache, not an analytics store.",
    },
    services: ["Amazon Redshift"],
    references: [
      {
        title: "What is Amazon Redshift",
        url: "https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dea-gov-001",
    slug: "fine-grained-data-lake-access",
    cert: "dea-c01",
    domain: "dea-data-security-governance",
    topic: "dea-data-governance",
    subtopic: "Lake Formation",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Analysts need column-level access control over a data lake in S3 — some columns (like salary) visible only to HR. Which service provides centralized, fine-grained data-lake permissions?",
    options: [
      { id: "A", text: "S3 bucket policies" },
      { id: "B", text: "AWS Lake Formation" },
      { id: "C", text: "IAM policies on the objects" },
      { id: "D", text: "Amazon Macie" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AWS Lake Formation provides centralized governance for data lakes — database/table/column-level (even row/cell-level) permissions enforced across Athena, Redshift Spectrum, and EMR consumers.",
    optionExplanations: {
      A: "Bucket policies control object-level access, not column granularity within data.",
      B: "Correct. Lake Formation is the fine-grained data-lake governance service.",
      C: "IAM on S3 operates at object level — you can't grant column-level rights on a file.",
      D: "Macie discovers sensitive data; it doesn't enforce query-time permissions.",
    },
    services: ["AWS Lake Formation", "Amazon S3"],
    references: [
      {
        title: "What is AWS Lake Formation",
        url: "https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
];
