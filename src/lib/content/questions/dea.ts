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
  {
    id: "dea-ops-001",
    slug: "pipeline-orchestration-service",
    cert: "dea-c01",
    domain: "dea-data-operations-support",
    topic: "dea-data-operations",
    subtopic: "Orchestration",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A data team has existing Apache Airflow DAGs orchestrating their pipelines and wants managed hosting on AWS without rewriting workflows. Which service runs Airflow natively?",
    options: [
      { id: "A", text: "AWS Step Functions" },
      { id: "B", text: "Amazon MWAA (Managed Workflows for Apache Airflow)" },
      { id: "C", text: "AWS Glue workflows" },
      { id: "D", text: "EventBridge schedules" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Amazon MWAA is managed Apache Airflow — existing DAGs run unchanged. Step Functions is a different orchestration model (state machines); Glue workflows orchestrate Glue jobs only.",
    optionExplanations: {
      A: "Step Functions orchestrates well but requires rewriting DAGs.",
      B: "Correct. MWAA is Airflow-as-a-service.",
      C: "Glue workflows only chain Glue-native components.",
      D: "Schedules trigger events — they don't orchestrate dependencies.",
    },
    services: ["Amazon MWAA", "AWS Step Functions"],
    references: [
      {
        title: "Amazon MWAA",
        url: "https://docs.aws.amazon.com/mwaa/latest/userguide/what-is-mwaa.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dea-ing-003",
    slug: "msk-vs-kinesis-choice",
    cert: "dea-c01",
    domain: "dea-ingestion-transformation",
    topic: "dea-ingestion-and-etl",
    subtopic: "Streaming platforms",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company already runs Apache Kafka on-premises and wants the same Kafka APIs/ecosystem on AWS with minimal migration friction. Which service fits?",
    options: [
      { id: "A", text: "Amazon Kinesis Data Streams" },
      { id: "B", text: "Amazon MSK (Managed Streaming for Apache Kafka)" },
      { id: "C", text: "Amazon SQS" },
      { id: "D", text: "Amazon EventBridge" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Amazon MSK is fully managed Apache Kafka — same APIs, tooling, and ecosystem as existing Kafka deployments. Kinesis is a proprietary streaming service requiring producer/consumer changes.",
    optionExplanations: {
      A: "Kinesis requires code changes — it's not Kafka-compatible.",
      B: "Correct. MSK preserves the Kafka ecosystem with managed ops.",
      C: "SQS is a message queue, not a streaming log platform.",
      D: "EventBridge is an event bus for app integration, not Kafka.",
    },
    services: ["Amazon MSK", "Amazon Kinesis"],
    references: [
      {
        title: "Amazon MSK",
        url: "https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dea-store-002",
    slug: "athena-partitioning-cost",
    cert: "dea-c01",
    domain: "dea-data-store-management",
    topic: "dea-data-stores",
    subtopic: "Athena optimization",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Athena queries over a 10 TB S3 data lake are slow and expensive — Athena bills per TB scanned. What design change most reduces both cost and latency?",
    options: [
      { id: "A", text: "Larger Athena workgroup with more memory" },
      { id: "B", text: "Partition data by date/region in S3 + convert to a columnar format like Parquet" },
      { id: "C", text: "Add more S3 buckets for the same data" },
      { id: "D", text: "Increase the query timeout" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Partition pruning makes Athena scan only relevant partitions; columnar formats (Parquet/ORC) let it read only needed columns. Together they can cut scanned data 10-100x — the core Athena cost optimization.",
    optionExplanations: {
      A: "Athena is serverless — you can't allocate memory.",
      B: "Correct. Partitioning + columnar format reduces bytes scanned.",
      C: "More buckets without partitioning doesn't reduce scan volume.",
      D: "Timeouts don't reduce data scanned.",
    },
    services: ["Amazon Athena", "Amazon S3"],
    references: [
      {
        title: "Partitioning data in Athena",
        url: "https://docs.aws.amazon.com/athena/latest/ug/partitions.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dea-gov-002",
    slug: "glue-data-quality-monitoring",
    cert: "dea-c01",
    domain: "dea-data-security-governance",
    topic: "dea-data-governance",
    subtopic: "Data quality",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A pipeline occasionally ingests files with nulls and schema drift, silently corrupting dashboards. What AWS capability evaluates data quality rules and can stop or alert on bad batches?",
    options: [
      { id: "A", text: "AWS Glue Data Quality" },
      { id: "B", text: "S3 storage class analysis" },
      { id: "C", text: "CloudWatch billing alarms" },
      { id: "D", text: "IAM Access Analyzer" },
    ],
    correctAnswers: ["A"],
    explanation:
      "AWS Glue Data Quality lets you define rules (completeness, uniqueness, schema conformance) evaluated against datasets — with results published to CloudWatch and the ability to fail jobs on rule violations.",
    optionExplanations: {
      A: "Correct. Purpose-built data quality rules and scoring.",
      B: "Storage class analysis is about cost, not content quality.",
      C: "Billing alarms watch spend, not data.",
      D: "Access Analyzer reviews permissions, not data quality.",
    },
    services: ["AWS Glue"],
    references: [
      {
        title: "AWS Glue Data Quality",
        url: "https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dea-ing-004",
    slug: "firehose-vs-kinesis-streams",
    cert: "dea-c01",
    domain: "dea-ingestion-transformation",
    topic: "dea-ingestion-and-etl",
    subtopic: "Streaming ingestion",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Application logs must be delivered to S3 in near-real-time, optionally transformed, with zero infrastructure to manage and no consumer applications reading the stream. Which service fits best?",
    options: [
      { id: "A", text: "Amazon Kinesis Data Streams" },
      { id: "B", text: "Amazon Data Firehose" },
      { id: "C", text: "Amazon MSK" },
      { id: "D", text: "Amazon SQS" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Firehose is the fully managed 'load streaming data to a destination' service — buffers, optionally transforms via Lambda, converts to Parquet, and delivers to S3/Redshift/OpenSearch. Kinesis Data Streams is for custom consumers processing the stream.",
    optionExplanations: {
      A: "KDS requires you to build/run stream consumers — overkill for delivery-only.",
      B: "Correct. Firehose = zero-code delivery to destinations with optional transform.",
      C: "MSK is managed Kafka — far more platform than needed.",
      D: "SQS is a queue — no native S3 delivery.",
    },
    services: ["Amazon Data Firehose", "Amazon Kinesis"],
    references: [
      {
        title: "Amazon Data Firehose",
        url: "https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dea-store-003",
    slug: "redshift-vs-athena-adhoc",
    cert: "dea-c01",
    domain: "dea-data-store-management",
    topic: "dea-data-stores",
    subtopic: "Analytics engines",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Analysts run infrequent, ad-hoc SQL queries directly against raw files in an S3 data lake — no regular reporting workload. What's the most cost-effective query layer?",
    options: [
      { id: "A", text: "A provisioned Redshift cluster" },
      { id: "B", text: "Amazon Athena over the Glue Data Catalog" },
      { id: "C", text: "Amazon EMR with Hive" },
      { id: "D", text: "Amazon RDS with a foreign data wrapper" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Athena is serverless — you pay only per TB scanned for occasional queries, with zero cluster to run. Redshift clusters bill continuously and make sense for sustained, performance-critical BI workloads.",
    optionExplanations: {
      A: "Provisioned Redshift bills 24/7 regardless of query frequency.",
      B: "Correct. Serverless, pay-per-scan — ideal for sporadic ad-hoc analysis.",
      C: "An always-on EMR cluster costs more and requires ops.",
      D: "RDS isn't designed to query raw lake files.",
    },
    services: ["Amazon Athena", "Amazon Redshift", "AWS Glue"],
    references: [
      {
        title: "Amazon Athena",
        url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dea-ops-002",
    slug: "pipeline-monitoring-alerting",
    cert: "dea-c01",
    domain: "dea-data-operations-support",
    topic: "dea-data-operations",
    subtopic: "Pipeline observability",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A nightly Glue ETL job silently fails some weeks — dashboards go stale before anyone notices. What's the standard way to get alerted on job failures?",
    options: [
      { id: "A", text: "Poll the Glue console daily" },
      { id: "B", text: "EventBridge rule on Glue job-state-change events → SNS alert" },
      { id: "C", text: "Enable S3 access logging on the output bucket" },
      { id: "D", text: "Increase the job's retry count" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Glue emits job state-change events to EventBridge; a rule on FAILED states triggers SNS (or Lambda for auto-remediation) — the designed event-driven alerting pattern for pipeline failures.",
    optionExplanations: {
      A: "Manual checks don't scale and miss failures between checks.",
      B: "Correct. EventBridge → SNS is the standard failure-alert chain.",
      C: "Access logs record S3 requests, not job success.",
      D: "Retries mask failures — they don't notify anyone.",
    },
    services: ["AWS Glue", "Amazon EventBridge", "Amazon SNS"],
    references: [
      {
        title: "Automating AWS Glue with EventBridge",
        url: "https://docs.aws.amazon.com/glue/latest/dg/automating-awsglue-with-cloudwatch-events.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dea-gov-003",
    slug: "lakeformation-column-level-access",
    cert: "dea-c01",
    domain: "dea-data-security-governance",
    topic: "dea-data-governance",
    subtopic: "Fine-grained access",
    difficulty: "hard",
    format: "single-choice",
    question:
      "Analysts should query a data lake table but must not see the salary column. Which Lake Formation capability enforces this — and why is a table-level deny insufficient?",
    options: [
      { id: "A", text: "Column-level permissions — exclude the salary column; a table-level deny blocks the whole table" },
      { id: "B", text: "Row-level filters on salary" },
      { id: "C", text: "An S3 bucket policy denying the column" },
      { id: "D", text: "Encrypt the salary column with a different KMS key managed outside Lake Formation" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Lake Formation supports column-level access control — analysts get the table minus excluded columns. Bucket policies operate at object level (can't see schema), and a table-level deny is all-or-nothing.",
    optionExplanations: {
      A: "Correct. Column-level grants are the designed mechanism.",
      B: "Row filters restrict rows, not columns.",
      C: "S3 policies don't understand table columns.",
      D: "Separate KMS keys work but is brittle — Lake Formation's designed answer is column-level grants.",
    },
    services: ["AWS Lake Formation", "Amazon S3"],
    references: [
      {
        title: "Lake Formation column-level access",
        url: "https://docs.aws.amazon.com/lake-formation/latest/dg/lf-grants.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
];
