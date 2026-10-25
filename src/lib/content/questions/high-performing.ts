import type { Question } from "../schema";

export const highPerformingQuestions: Question[] = [
  {
    id: "saa-perf-001",
    slug: "event-driven-image-resize-compute",
    domain: "design-high-performing-architectures",
    topic: "compute-selection",
    subtopic: "Serverless compute",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Images uploaded to S3 must be resized. Work is bursty — zero to thousands of uploads per hour — and each resize finishes in seconds. Which compute option is the best operational fit?",
    options: [
      { id: "A", text: "A large always-on EC2 instance" },
      { id: "B", text: "AWS Lambda triggered by S3 event notifications" },
      { id: "C", text: "A cron job on a t3.micro polling for new files each hour" },
      { id: "D", text: "Amazon ECS with a fixed cluster of one task" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Lambda scales automatically from zero to thousands of concurrent invocations, bills only for actual compute time, and integrates natively with S3 event notifications — ideal for short, bursty, event-driven work.",
    optionExplanations: {
      A: "An always-on instance idles during quiet periods and can be overwhelmed at peak.",
      B: "Correct. Event-triggered Lambda matches bursty, short-lived workloads.",
      C: "Hourly polling adds up to an hour of latency and wasted cycles.",
      D: "A fixed one-task cluster cannot absorb bursts and still runs when idle.",
    },
    services: ["AWS Lambda", "Amazon S3"],
    references: [
      {
        title: "AWS Lambda developer guide",
        url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
      },
      {
        title: "Using Lambda with Amazon S3",
        url: "https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-002",
    slug: "steady-state-vs-spiky-compute",
    domain: "design-high-performing-architectures",
    topic: "compute-selection",
    subtopic: "Right compute model",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A latency-sensitive API has constant high traffic, requires sub-millisecond internal calls between microservices, and needs full control of the runtime environment including a custom kernel module. Which platform is most appropriate?",
    options: [
      { id: "A", text: "AWS Lambda" },
      { id: "B", text: "Amazon EC2 instances (or containers on EC2)" },
      { id: "C", text: "AWS Fargate only, because it removes all servers" },
      { id: "D", text: "Amazon S3 with static hosting" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Custom kernel modules and constant high throughput favor EC2 (or ECS/EKS on EC2), which offers full OS control and predictable sustained performance. Lambda does not allow kernel-level customization.",
    optionExplanations: {
      A: "Lambda cannot load kernel modules and cold starts hurt the most latency-sensitive paths.",
      B: "Correct. EC2 provides OS-level control and consistent performance for steady high load.",
      C: "Fargate removes server management but still cannot run custom kernel modules.",
      D: "Static hosting cannot run an API.",
    },
    services: ["Amazon EC2", "Amazon ECS", "AWS Lambda"],
    references: [
      {
        title: "Amazon EC2 user guide",
        url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-003",
    slug: "batch-processing-spot-fleet",
    domain: "design-high-performing-architectures",
    topic: "compute-selection",
    subtopic: "Batch workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A nightly analytics job runs thousands of parallel, fault-tolerant tasks for 4 hours. Tasks can be interrupted and retried without harm. Which approach provides scalable, efficient capacity?",
    options: [
      { id: "A", text: "One very large On-Demand EC2 instance" },
      { id: "B", text: "EC2 Spot Instances managed by AWS Batch or an Auto Scaling group" },
      { id: "C", text: "Reserved Instances sized for peak" },
      { id: "D", text: "Dedicated Hosts in a single AZ" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Interruptible, retryable batch work is the canonical Spot Instance use case — high parallel capacity at large discounts. AWS Batch can orchestrate queues and compute environments over Spot capacity.",
    optionExplanations: {
      A: "One big instance cannot parallelize thousands of tasks efficiently.",
      B: "Correct. Spot capacity plus a batch scheduler matches fault-tolerant parallel work.",
      C: "Reserving peak capacity 24/7 wastes money for a 4-hour nightly job.",
      D: "Dedicated Hosts are for licensing/compliance isolation, not elastic batch throughput.",
    },
    services: ["Amazon EC2", "AWS Batch"],
    references: [
      {
        title: "Spot Instances",
        url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html",
      },
      {
        title: "AWS Batch",
        url: "https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-004",
    slug: "read-heavy-rds-scaling",
    domain: "design-high-performing-architectures",
    topic: "database-selection-and-scaling",
    subtopic: "Read scaling",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A reporting feature adds heavy read traffic to an RDS MySQL database, slowing the primary writer. Most reads are tolerant of slight staleness. What is the standard way to scale reads?",
    options: [
      { id: "A", text: "Convert the DB to a larger instance class" },
      { id: "B", text: "Add RDS read replicas and direct reporting queries to them" },
      { id: "C", text: "Enable Multi-AZ and point reads at the standby" },
      { id: "D", text: "Move the database to a single DynamoDB table without changes" },
    ],
    correctAnswers: ["B"],
    explanation:
      "RDS read replicas asynchronously replicate data and serve read traffic, offloading the writer. Multi-AZ standbys exist purely for failover and cannot serve reads, and switching engines mid-flight is a redesign, not a scaling step.",
    optionExplanations: {
      A: "Bigger instances help vertically but do not isolate reporting load from the writer.",
      B: "Correct. Read replicas scale reads horizontally and keep the writer responsive.",
      C: "The Multi-AZ standby does not accept connections — it only takes over on failover.",
      D: "DynamoDB is a different data model; a transparent migration is not possible without re-architecting.",
    },
    services: ["Amazon RDS"],
    references: [
      {
        title: "Working with read replicas",
        url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-005",
    slug: "key-value-single-digit-ms-at-any-scale",
    domain: "design-high-performing-architectures",
    topic: "database-selection-and-scaling",
    subtopic: "NoSQL at scale",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A session store needs single-digit-millisecond key-value reads and writes that must scale to unpredictable internet-scale traffic, with no relational queries required. Which database is the best fit?",
    options: [
      { id: "A", text: "Amazon RDS for Oracle" },
      { id: "B", text: "Amazon DynamoDB" },
      { id: "C", text: "Amazon Redshift" },
      { id: "D", text: "Amazon Neptune" },
    ],
    correctAnswers: ["B"],
    explanation:
      "DynamoDB is a fully managed key-value/document NoSQL service delivering single-digit-millisecond latency at virtually any scale, with automatic partitioning and on-demand capacity — built for exactly this access pattern.",
    optionExplanations: {
      A: "Relational engines are not optimized for internet-scale simple key-value access.",
      B: "Correct. DynamoDB provides consistent single-digit-ms key-value performance at any scale.",
      C: "Redshift is a data warehouse for analytics, not low-latency transactional lookups.",
      D: "Neptune is a graph database — wrong data model for session key-value data.",
    },
    services: ["Amazon DynamoDB"],
    references: [
      {
        title: "What is Amazon DynamoDB",
        url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-006",
    slug: "dynamodb-millisecond-reads-under-load",
    domain: "design-high-performing-architectures",
    topic: "database-selection-and-scaling",
    subtopic: "DynamoDB caching",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A DynamoDB-backed catalog suffers hot-key read spikes on popular items during flash sales, pushing reads from ~5ms to higher latency. What reduces read latency and offloads repeated reads MOST effectively?",
    options: [
      { id: "A", text: "Enable DynamoDB Auto Scaling" },
      { id: "B", text: "Add DynamoDB Accelerator (DAX), an in-memory cache, for read-heavy access" },
      { id: "C", text: "Convert the table to provisioned capacity" },
      { id: "D", text: "Enable DynamoDB Streams" },
    ],
    correctAnswers: ["B"],
    explanation:
      "DAX is a fully managed in-memory cache for DynamoDB that serves repeated reads in microseconds, smoothing hot-key spikes. Auto Scaling adjusts capacity but does not cut per-read latency for identical hot keys.",
    optionExplanations: {
      A: "Auto Scaling prevents throttling on capacity but does not create a microsecond read path.",
      B: "Correct. DAX caches item/query results in memory for repeated hot reads.",
      C: "Capacity mode affects billing/limits, not latency for repeated identical reads.",
      D: "Streams capture changes for processing; they do not accelerate reads.",
    },
    services: ["Amazon DynamoDB", "Amazon DAX"],
    references: [
      {
        title: "DynamoDB Accelerator (DAX)",
        url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-007",
    slug: "global-low-latency-static-assets",
    domain: "design-high-performing-architectures",
    topic: "caching-and-content-delivery",
    subtopic: "CDN",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Users worldwide download static media from a single-Region S3 bucket and experience high latency. What reduces latency with minimal architecture change?",
    options: [
      { id: "A", text: "Enable S3 Transfer Acceleration for downloads" },
      { id: "B", text: "Put a CloudFront distribution in front of the bucket to cache content at edge locations" },
      { id: "C", text: "Move the bucket to a Region closer to the largest user group" },
      { id: "D", text: "Enable S3 versioning" },
    ],
    correctAnswers: ["B"],
    explanation:
      "CloudFront caches objects at globally distributed edge locations so users download from a nearby PoP — the standard CDN pattern for static content with minimal change to the origin.",
    optionExplanations: {
      A: "Transfer Acceleration primarily speeds long-distance uploads/downloads to a specific bucket endpoint; edge caching serves repeated reads faster and cheaper.",
      B: "Correct. CloudFront edge caching is the canonical answer for global static-content latency.",
      C: "Moving the bucket only moves the problem to distant users.",
      D: "Versioning protects data; it does not improve latency.",
    },
    services: ["Amazon CloudFront", "Amazon S3"],
    references: [
      {
        title: "What is Amazon CloudFront",
        url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-008",
    slug: "cache-frequent-db-lookups",
    domain: "design-high-performing-architectures",
    topic: "caching-and-content-delivery",
    subtopic: "In-memory caching",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A product service re-computes the same complex SQL query for every request, and the result changes only hourly. The team wants microsecond-to-millisecond lookups and to relieve the database. What should they add?",
    options: [
      { id: "A", text: "Amazon ElastiCache (Redis OSS) with a cache-aside (lazy-loading) pattern" },
      { id: "B", text: "A second RDS writer instance" },
      { id: "C", text: "S3 Select queries over query-result CSV exports" },
      { id: "D", text: "Larger connection strings to the database" },
    ],
    correctAnswers: ["A"],
    explanation:
      "ElastiCache for Redis provides in-memory lookups in sub-millisecond time. The cache-aside pattern (check cache → on miss, query DB and populate cache) is ideal when the query result changes infrequently.",
    optionExplanations: {
      A: "Correct. An in-memory cache-aside layer removes repeated expensive queries.",
      B: "RDS supports one writer; a 'second writer' is not a scaling mechanism (that is what read replicas/Aurora provide differently).",
      C: "S3 Select queries files, not a live cache; it adds latency rather than removing it.",
      D: "Connection strings do not change query cost.",
    },
    services: ["Amazon ElastiCache", "Amazon RDS"],
    references: [
      {
        title: "Amazon ElastiCache for Redis",
        url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-009",
    slug: "auto-scaling-for-daily-traffic-cycle",
    domain: "design-high-performing-architectures",
    topic: "scalability-and-elasticity",
    subtopic: "Scaling policies",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Web traffic roughly doubles every weekday at noon and halves overnight, but the exact level varies. The architecture must maintain response times without paying for permanent peak capacity. Which approach is most appropriate?",
    options: [
      { id: "A", text: "Fixed fleet sized for peak" },
      { id: "B", text: "EC2 Auto Scaling with target tracking on average CPU/load plus scheduled scaling for known peaks" },
      { id: "C", text: "Manually resize instances each morning" },
      { id: "D", text: "Move everything into a single large instance" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Target-tracking scaling adjusts capacity automatically against a metric (e.g., average CPU or ALB request count), while scheduled scaling pre-warms known recurring peaks — elastic capacity that tracks demand without paying for peak 24/7.",
    optionExplanations: {
      A: "Peak-sized fleets pay for unused capacity most of the day.",
      B: "Correct. Target tracking handles variance; scheduled scaling handles the predictable noon surge.",
      C: "Manual daily resizing is slow, error-prone, and cannot react to variance.",
      D: "One large instance caps scale and creates a single point of failure.",
    },
    services: ["Amazon EC2 Auto Scaling", "Amazon CloudWatch"],
    references: [
      {
        title: "Target tracking scaling policies",
        url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html",
      },
      {
        title: "Scheduled scaling",
        url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-010",
    slug: "alb-vs-nlb-selection",
    domain: "design-high-performing-architectures",
    topic: "scalability-and-elasticity",
    subtopic: "Load balancer types",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A fleet of containers exposes HTTP/HTTPS APIs that need path-based routing to different services and integration with AWS WAF. Which load balancer type is required?",
    options: [
      { id: "A", text: "Network Load Balancer" },
      { id: "B", text: "Application Load Balancer" },
      { id: "C", text: "Gateway Load Balancer" },
      { id: "D", text: "Classic Load Balancer" },
    ],
    correctAnswers: ["B"],
    explanation:
      "The Application Load Balancer operates at layer 7 with path/host/header-based routing and integrates with AWS WAF and target groups for containers. NLB is layer 4 (TCP/UDP, ultra-low latency, static IPs); GWLB is for inline virtual appliances; Classic is legacy.",
    optionExplanations: {
      A: "NLB is layer 4 — no HTTP path routing or WAF integration.",
      B: "Correct. ALB provides layer-7 routing rules and WAF support.",
      C: "GWLB is for transparently inserting third-party network appliances.",
      D: "Classic is the previous generation lacking modern layer-7 features.",
    },
    services: ["Elastic Load Balancing", "AWS WAF", "Amazon ECS"],
    references: [
      {
        title: "How Elastic Load Balancing works",
        url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-011",
    slug: "cloudfront-vs-global-accelerator",
    domain: "design-high-performing-architectures",
    topic: "caching-and-content-delivery",
    subtopic: "Global networking",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A real-time bidding API (non-cacheable, dynamic TCP traffic) must reduce latency for global users hitting an ALB in one Region. CloudFront cannot cache this traffic. Which service improves performance using the AWS global network?",
    options: [
      { id: "A", text: "AWS Global Accelerator, which routes TCP/UDP traffic over the AWS network to the nearest healthy endpoint" },
      { id: "B", text: "Amazon CloudFront with a longer TTL" },
      { id: "C", text: "An additional S3 bucket in each Region" },
      { id: "D", text: "Amazon Macie traffic inspection" },
    ],
    correctAnswers: ["A"],
    explanation:
      "AWS Global Accelerator provides static anycast IPs and routes TCP/UDP traffic over the AWS global network to the optimal regional endpoint — improving latency for dynamic, non-cacheable traffic where CloudFront caching does not help.",
    optionExplanations: {
      A: "Correct. Global Accelerator accelerates non-cacheable TCP/UDP traffic via the AWS backbone and anycast IPs.",
      B: "CloudFront helps cacheable content; longer TTL cannot cache dynamic API responses.",
      C: "S3 does not serve a live API.",
      D: "Macie is a data-discovery/security service, unrelated to latency.",
    },
    services: ["AWS Global Accelerator", "Amazon CloudFront", "Elastic Load Balancing"],
    references: [
      {
        title: "What is AWS Global Accelerator",
        url: "https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-012",
    slug: "gp3-vs-io2-for-iops",
    domain: "design-high-performing-architectures",
    topic: "compute-selection",
    subtopic: "Block storage performance",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A database on EC2 needs consistently high IOPS beyond what general-purpose volumes deliver, with provisioned IOPS independent of volume size. Which EBS volume family is designed for this?",
    options: [
      { id: "A", text: "st1 throughput-optimized HDD" },
      { id: "B", text: "io2 Block Express (Provisioned IOPS SSD)" },
      { id: "C", text: "sc1 cold HDD" },
      { id: "D", text: "Instance store" },
    ],
    correctAnswers: ["B"],
    explanation:
      "io2/io2 Block Express volumes are Provisioned IOPS SSDs for latency-sensitive, high-IOPS workloads, delivering tens of thousands of IOPS independent of volume size. gp3 suits general use; HDD families optimize sequential throughput, not IOPS.",
    optionExplanations: {
      A: "st1 is for big sequential throughput (e.g., log processing), not high random IOPS.",
      B: "Correct. Provisioned IOPS SSD targets sustained high-IOPS databases.",
      C: "sc1 is the lowest-cost cold-data HDD tier — the slowest option.",
      D: "Instance store is fast but ephemeral; data is lost on stop/termination — unsuitable for durable databases.",
    },
    services: ["Amazon EBS", "Amazon EC2"],
    references: [
      {
        title: "Amazon EBS volume types",
        url: "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-013",
    slug: "real-time-stream-ingestion",
    domain: "design-high-performing-architectures",
    topic: "compute-selection",
    subtopic: "Streaming data",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A platform must ingest clickstream events in real time and let multiple downstream applications each process the same stream independently, with replay of recent records. Which service is designed for this?",
    options: [
      { id: "A", text: "Amazon SQS" },
      { id: "B", text: "Amazon Kinesis Data Streams" },
      { id: "C", text: "Amazon EventBridge" },
      { id: "D", text: "Amazon S3 event notifications" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Kinesis Data Streams is the managed real-time ingestion service: records persist for a retention window (default 24h, extendable), and multiple independent consumers can each process and replay the stream — a capability SQS and EventBridge lack.",
    optionExplanations: {
      A: "SQS is a work queue — each message goes to one consumer, no replay or stream semantics.",
      B: "Correct. Kinesis provides ordered, replayable, multi-consumer streams.",
      C: "EventBridge routes events by rules; it isn't a replayable ordered stream store.",
      D: "S3 events notify on object changes; not a general ingestion stream.",
    },
    services: ["Amazon Kinesis"],
    references: [
      {
        title: "Amazon Kinesis Data Streams",
        url: "https://docs.aws.amazon.com/streams/latest/dev/introduction.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-014",
    slug: "faster-long-distance-s3-uploads",
    domain: "design-high-performing-architectures",
    topic: "caching-and-content-delivery",
    subtopic: "Upload acceleration",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A distributed team uploads large files to an S3 bucket in one Region and uploads are slow over long distances. The content itself doesn't need edge caching. Which feature improves upload speed most directly?",
    options: [
      { id: "A", text: "Amazon CloudFront distribution" },
      { id: "B", text: "S3 Transfer Acceleration" },
      { id: "C", text: "S3 Intelligent-Tiering" },
      { id: "D", text: "Multipart upload API alone" },
    ],
    correctAnswers: ["B"],
    explanation:
      "S3 Transfer Acceleration routes uploads through AWS edge locations and over the AWS backbone, specifically speeding long-distance transfers to a bucket — exactly the slow-upload scenario described.",
    optionExplanations: {
      A: "CloudFront caches downloads for readers; it isn't the canonical upload accelerator (though it can ingest traffic).",
      B: "Correct. Transfer Acceleration exists precisely for long-distance S3 uploads.",
      C: "Intelligent-Tiering optimizes storage cost by access pattern, not transfer speed.",
      D: "Multipart upload helps large-file reliability but doesn't route traffic over the AWS backbone.",
    },
    services: ["Amazon S3"],
    references: [
      {
        title: "S3 Transfer Acceleration",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-015",
    slug: "elasticache-redis-vs-memcached",
    domain: "design-high-performing-architectures",
    topic: "caching-and-content-delivery",
    subtopic: "Cache engine choice",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A session store needs an in-memory cache with persistence, replication, failover, and data structures like sorted sets for leaderboards. Which ElastiCache engine is required?",
    options: [
      { id: "A", text: "Memcached" },
      { id: "B", text: "Redis OSS" },
      { id: "C", text: "Either — they're equivalent on AWS" },
      { id: "D", text: "DynamoDB DAX" },
    ],
    correctAnswers: ["B"],
    explanation:
      "ElastiCache for Redis OSS supports persistence, replication/failover, pub/sub, and rich data structures (sorted sets, hashes). Memcached is a simpler multi-threaded in-memory cache without persistence or replication.",
    optionExplanations: {
      A: "Memcached lacks persistence and replication — sessions would be lost on node failure.",
      B: "Correct. Redis OSS provides persistence, failover, and sorted sets.",
      C: "The engines differ significantly in capabilities; they're not interchangeable.",
      D: "DAX accelerates DynamoDB reads; it isn't a general-purpose cache engine.",
    },
    services: ["Amazon ElastiCache"],
    references: [
      {
        title: "Comparing Memcached and Redis OSS",
        url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/SelectEngine.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-016",
    slug: "dynamodb-partition-key-design",
    domain: "design-high-performing-architectures",
    topic: "database-selection-and-scaling",
    subtopic: "DynamoDB data modeling",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A DynamoDB table uses a partition key with only a handful of distinct values (e.g., a status field), so a few keys receive most of the traffic and get throttled. What's the fix?",
    options: [
      { id: "A", text: "Switch to on-demand capacity mode" },
      { id: "B", text: "Choose a high-cardinality partition key (e.g., user ID) that spreads requests evenly" },
      { id: "C", text: "Add a global secondary index on status" },
      { id: "D", text: "Enable DynamoDB Streams" },
    ],
    correctAnswers: ["B"],
    explanation:
      "DynamoDB distributes data by partition key; low-cardinality keys concentrate load into 'hot' partitions. A high-cardinality key (or key suffixing/composite design) spreads requests across partitions — the fundamental DynamoDB performance principle.",
    optionExplanations: {
      A: "On-demand raises capacity ceilings but hot partitions still throttle within a partition.",
      B: "Correct. Even distribution across partitions requires a high-cardinality partition key.",
      C: "A GSI on a low-cardinality attribute creates the same hot-partition problem in the index.",
      D: "Streams emit change events; they don't affect partitioning.",
    },
    services: ["Amazon DynamoDB"],
    references: [
      {
        title: "DynamoDB partition key design",
        url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-perf-017",
    slug: "low-latency-hpc-placement-group",
    domain: "design-high-performing-architectures",
    topic: "compute-selection",
    subtopic: "Placement groups",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A tightly-coupled HPC workload needs the lowest possible network latency between its EC2 instances within a single AZ. Which EC2 placement group should be used?",
    options: [
      { id: "A", text: "Spread placement group" },
      { id: "B", text: "Cluster placement group" },
      { id: "C", text: "Partition placement group" },
      { id: "D", text: "Dedicated hosts" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Cluster placement groups pack instances close together in one AZ for low-latency, high-throughput networking — ideal for tightly-coupled HPC. Spread and partition groups do the opposite (isolation).",
    optionExplanations: {
      A: "Spread groups deliberately isolate instances on separate hardware for availability, not latency.",
      B: "Correct. Cluster groups maximize network performance for latency-sensitive workloads.",
      C: "Partition groups isolate partitions for large distributed systems like Kafka/HDFS.",
      D: "Dedicated hosts address licensing/compliance, not network latency.",
    },
    services: ["Amazon EC2"],
    references: [
      {
        title: "Placement groups",
        url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
];
