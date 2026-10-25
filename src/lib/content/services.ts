export interface ServiceGuide {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  whenToUse: string[];
  whenNotToUse: string[];
  keyExamPoints: string[];
  compareWith: { slug: string; note: string }[];
  relatedTopics: string[];
  references: { title: string; url: string }[];
}

export const SERVICES: ServiceGuide[] = [
  {
    slug: "amazon-s3",
    name: "Amazon S3",
    category: "Storage",
    tagline: "Durable object storage with tiered pricing",
    description:
      "Amazon S3 is object storage built for 99.999999999% (11 nines) durability. Objects live in buckets within a Region and are replicated across multiple Availability Zones. Storage classes (Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier tiers, Deep Archive) trade cost against access frequency and retrieval time.",
    whenToUse: [
      "Static assets, media, backups, and data lakes",
      "Content served through CloudFront",
      "Archival with lifecycle transitions to Glacier tiers",
      "Any workload needing virtually unlimited durable object storage",
    ],
    whenNotToUse: [
      "Block storage for a running OS or database (use EBS)",
      "A POSIX file system mounted by many instances (use EFS or FSx)",
      "Low-latency sub-millisecond access",
    ],
    keyExamPoints: [
      "Standard is multi-AZ and millisecond-latency; Deep Archive is cheapest with hours-long retrieval",
      "Lifecycle rules transition objects automatically by age",
      "Versioning protects against overwrite and deletion; MFA delete adds extra protection",
      "Gateway VPC endpoints reach S3 privately and avoid NAT data-processing fees",
      "Intelligent-Tiering auto-moves objects for unknown/changing access patterns",
    ],
    compareWith: [
      { slug: "amazon-ebs", note: "EBS is single-AZ block storage attached to one instance; S3 is multi-AZ object storage accessed over HTTP." },
      { slug: "amazon-efs", note: "EFS is a mounted file system shared by many instances; S3 is object storage accessed via API." },
    ],
    relatedTopics: ["cost-optimized-storage", "resilient-storage"],
    references: [
      { title: "Amazon S3 User Guide", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html" },
      { title: "S3 storage classes", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html" },
    ],
  },
  {
    slug: "amazon-ebs",
    name: "Amazon EBS",
    category: "Storage",
    tagline: "Block storage volumes for EC2",
    description:
      "Amazon EBS provides persistent block-level volumes attached to EC2 instances in a single AZ. Families: gp3 (general SSD), io2/io2 Block Express (provisioned IOPS), st1 (throughput HDD), sc1 (cold HDD). Snapshots stored in S3 enable backup and cross-AZ/Region copies.",
    whenToUse: [
      "Boot volumes and databases needing low-latency block storage",
      "io2 when a database needs high sustained IOPS",
      "Workloads where data must persist independent of instance lifecycle",
    ],
    whenNotToUse: [
      "Shared access from many instances across AZs (use EFS)",
      "Object-style access over HTTP (use S3)",
      "Temporary scratch data where instance store is cheaper",
    ],
    keyExamPoints: [
      "Volumes live in one AZ; snapshots go to S3 and can recreate volumes in other AZs/Regions",
      "io2 provides provisioned IOPS for latency-sensitive databases",
      "Encryption is supported at rest and in transit to the instance",
      "Volumes persist after instance termination when delete-on-termination is disabled",
    ],
    compareWith: [
      { slug: "amazon-efs", note: "EBS attaches to a single instance in one AZ; EFS is shared across AZs." },
      { slug: "amazon-s3", note: "S3 is object storage for durability/scale; EBS is block storage for a running workload." },
    ],
    relatedTopics: ["resilient-storage", "compute-selection"],
    references: [
      { title: "Amazon EBS User Guide", url: "https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html" },
      { title: "EBS volume types", url: "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html" },
    ],
  },
  {
    slug: "amazon-efs",
    name: "Amazon EFS",
    category: "Storage",
    tagline: "Shared, elastic NFS file storage",
    description:
      "Amazon EFS is a managed NFS file system that scales elastically and is accessible from multiple AZs. Mount targets in each AZ let many instances share the same file system concurrently.",
    whenToUse: [
      "Web serving and content management shared across a multi-AZ fleet",
      "Lift-and-shift apps expecting POSIX file semantics",
      "Any workload needing concurrent shared file access across AZs",
    ],
    whenNotToUse: [
      "Single-instance high-IOPS databases (use EBS io2)",
      "Object storage use cases (use S3)",
      "Windows-only SMB requirements (use FSx for Windows)",
    ],
    keyExamPoints: [
      "Multi-AZ by design — the standard answer for 'shared file storage across an Auto Scaling group'",
      "Regional service; mount targets per AZ",
      "Infrequent Access storage classes reduce cost for rarely accessed files",
      "POSIX permissions and NFS protocol — not a block or object store",
    ],
    compareWith: [
      { slug: "amazon-ebs", note: "EBS is single-AZ single-instance block storage; EFS is multi-AZ shared file storage." },
      { slug: "amazon-s3", note: "S3 is object storage with HTTP access; EFS is a mounted file system." },
    ],
    relatedTopics: ["resilient-storage"],
    references: [
      { title: "Amazon EFS User Guide", url: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html" },
    ],
  },
  {
    slug: "amazon-rds",
    name: "Amazon RDS",
    category: "Database",
    tagline: "Managed relational databases",
    description:
      "Amazon RDS manages relational engines (PostgreSQL, MySQL, MariaDB, Oracle, SQL Server) — handling provisioning, patching, backups, and failover. Multi-AZ gives synchronous standby failover; read replicas scale reads asynchronously.",
    whenToUse: [
      "Relational data with joins, transactions, and SQL access",
      "Apps needing managed backups, patching, and failover",
      "Predictable schemas for OLTP workloads",
    ],
    whenNotToUse: [
      "Internet-scale key-value access (use DynamoDB)",
      "Sub-millisecond in-memory access (use ElastiCache)",
      "Analytics over petabytes (use Redshift)",
    ],
    keyExamPoints: [
      "Multi-AZ = HA failover (standby can't serve reads); read replicas = read scaling",
      "Storage autoscaling grows allocated storage as needed",
      "Encryption at rest via KMS; in transit via TLS; IAM DB authentication supported for some engines",
      "Backups: automated with point-in-time recovery to retention window",
    ],
    compareWith: [
      { slug: "amazon-aurora", note: "Aurora is AWS's cloud-native MySQL/PostgreSQL-compatible engine with faster replication and storage autoscaling; RDS covers more engine choices." },
      { slug: "amazon-dynamodb", note: "DynamoDB is managed NoSQL for key-value at any scale; RDS is relational SQL." },
    ],
    relatedTopics: ["database-selection-and-scaling", "high-availability", "data-protection"],
    references: [
      { title: "Amazon RDS User Guide", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html" },
      { title: "Multi-AZ deployments", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html" },
      { title: "Read replicas", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html" },
    ],
  },
  {
    slug: "amazon-aurora",
    name: "Amazon Aurora",
    category: "Database",
    tagline: "Cloud-native relational engine (MySQL/PostgreSQL compatible)",
    description:
      "Amazon Aurora is a MySQL- and PostgreSQL-compatible relational database built for the cloud, with storage that auto-scales across three AZs and up to 15 read replicas. Aurora Serverless v2 scales capacity automatically for variable loads.",
    whenToUse: [
      "Relational workloads needing higher throughput than community MySQL/PostgreSQL",
      "Read-heavy workloads that benefit from up to 15 low-lag replicas",
      "Variable workloads using Aurora Serverless v2 for automatic scaling",
      "Cross-Region DR via Aurora Global Database",
    ],
    whenNotToUse: [
      "Engines Aurora doesn't support (SQL Server, Oracle, MariaDB — use RDS)",
      "Pure key-value access at any scale (use DynamoDB)",
    ],
    keyExamPoints: [
      "Storage replicated 6 ways across 3 AZs; self-healing",
      "Reader endpoint load-balances connections across replicas",
      "Aurora Serverless v2 scales ACUs up/down automatically — useful for variable load and cost",
      "Global Database enables fast cross-Region DR and low-latency reads",
    ],
    compareWith: [
      { slug: "amazon-rds", note: "Aurora offers better performance/replication for MySQL/PostgreSQL-compatible workloads; RDS supports more engines." },
      { slug: "amazon-dynamodb", note: "DynamoDB is serverless NoSQL with per-request billing; Aurora is relational with provisioned or v2-serverless capacity." },
    ],
    relatedTopics: ["database-selection-and-scaling", "cost-optimized-databases-and-network"],
    references: [
      { title: "Amazon Aurora User Guide", url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html" },
      { title: "Aurora Serverless v2", url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html" },
    ],
  },
  {
    slug: "amazon-dynamodb",
    name: "Amazon DynamoDB",
    category: "Database",
    tagline: "Serverless NoSQL at any scale",
    description:
      "Amazon DynamoDB is a fully managed key-value and document database delivering single-digit-millisecond performance at virtually any scale. Capacity modes: on-demand (per-request billing) and provisioned (with auto scaling). DAX adds microsecond in-memory caching; global tables replicate across Regions.",
    whenToUse: [
      "Key-value/document access at unpredictable or internet scale",
      "Session stores, user profiles, shopping carts, gaming leaderboards",
      "Serverless architectures wanting per-request billing",
      "Multi-Region active-active writes via global tables",
    ],
    whenNotToUse: [
      "Complex joins, ad-hoc SQL, relational integrity (use RDS/Aurora)",
      "Analytics aggregations over large datasets (use Redshift)",
      "Graph traversals (use Neptune)",
    ],
    keyExamPoints: [
      "On-demand vs provisioned capacity modes trade flexibility vs predictable pricing",
      "DAX caches reads in memory for hot keys",
      "Global tables = multi-Region, multi-active replication",
      "Partition key design drives performance; hot partitions throttle",
    ],
    compareWith: [
      { slug: "amazon-rds", note: "RDS is relational SQL with vertical scaling and read replicas; DynamoDB is horizontally scalable NoSQL." },
      { slug: "amazon-elasticache", note: "ElastiCache is an in-memory cache in front of a database, not a durable primary store." },
    ],
    relatedTopics: ["database-selection-and-scaling", "cost-optimized-databases-and-network"],
    references: [
      { title: "Amazon DynamoDB Developer Guide", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html" },
      { title: "Read/write capacity modes", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html" },
      { title: "Global tables", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html" },
    ],
  },
  {
    slug: "aws-lambda",
    name: "AWS Lambda",
    category: "Compute",
    tagline: "Event-driven serverless functions",
    description:
      "AWS Lambda runs code in response to events with no servers to manage. Billing is per request plus duration (GB-seconds). Functions scale automatically to thousands of concurrent executions and integrate natively with S3, DynamoDB, SQS, API Gateway, EventBridge, and more.",
    whenToUse: [
      "Event-driven processing (S3 uploads, stream records, queue messages)",
      "APIs and glue logic with variable or sparse traffic",
      "Scheduled tasks and automation",
      "Workloads that fit within the 15-minute execution limit",
    ],
    whenNotToUse: [
      "Long-running jobs over 15 minutes (use ECS/Fargate or Batch)",
      "Workloads needing kernel modules or full OS control (use EC2)",
      "Ultra-latency-critical paths where cold starts are unacceptable (consider provisioned concurrency or EC2)",
    ],
    keyExamPoints: [
      "15-minute maximum execution time",
      "Auto-scaling concurrency; throttling when concurrency limits are hit",
      "Execution role = IAM role the function assumes; grant least privilege",
      "Pay per request + GB-second — cheapest for intermittent workloads",
    ],
    compareWith: [
      { slug: "amazon-ec2", note: "EC2 gives full OS control and predictable steady-state performance; Lambda gives zero-ops, scale-to-zero event compute." },
      { slug: "amazon-sqs", note: "Pair SQS queues with Lambda for buffered, retryable event processing." },
    ],
    relatedTopics: ["compute-selection", "cost-optimized-compute"],
    references: [
      { title: "AWS Lambda Developer Guide", url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html" },
      { title: "Lambda concurrency", url: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html" },
    ],
  },
  {
    slug: "amazon-ec2",
    name: "Amazon EC2",
    category: "Compute",
    tagline: "Virtual servers with full control",
    description:
      "Amazon EC2 provides resizable virtual machines with complete OS control. Pricing models include On-Demand, Savings Plans, Reserved Instances, Spot (up to ~90% off, interruptible), and Dedicated Hosts (for licensing/compliance). Placement groups and instance types tune performance.",
    whenToUse: [
      "Workloads needing OS-level control, specific kernels, or licensing",
      "Steady-state high-utilization services",
      "Apps requiring persistent instance-level state",
      "GPU or specialized hardware",
    ],
    whenNotToUse: [
      "Short event-driven tasks (use Lambda)",
      "Apps that don't need OS access (consider containers or serverless)",
    ],
    keyExamPoints: [
      "On-Demand = flexibility; Savings Plans/Reserved = discounts for commitment; Spot = interruptible discounts",
      "Auto Scaling groups maintain capacity and scale across AZs",
      "Placement groups: cluster (low latency), spread (isolation), partition (large distributed)",
      "Instance store is ephemeral; EBS persists",
    ],
    compareWith: [
      { slug: "aws-lambda", note: "Lambda removes server management for short tasks; EC2 gives full control for long-running or specialized workloads." },
    ],
    relatedTopics: ["compute-selection", "cost-optimized-compute", "high-availability"],
    references: [
      { title: "Amazon EC2 User Guide", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html" },
      { title: "Instance purchasing options", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html" },
    ],
  },
  {
    slug: "amazon-sqs",
    name: "Amazon SQS",
    category: "Application Integration",
    tagline: "Managed message queues for decoupling",
    description:
      "Amazon SQS is a fully managed message queue that decouples producers and consumers. Standard queues maximize throughput with at-least-once delivery; FIFO queues preserve order with exactly-once processing. Dead-letter queues isolate failing messages.",
    whenToUse: [
      "Buffering work between a fast producer and slower/failable consumer",
      "Absorbing traffic spikes without losing requests",
      "Enabling independent scaling of producers and consumers",
      "Retry handling via visibility timeouts and DLQs",
    ],
    whenNotToUse: [
      "Fan-out to many consumers (use SNS, or SNS→SQS fan-out)",
      "Real-time request/response where the caller must block on the result",
    ],
    keyExamPoints: [
      "Visibility timeout hides a message while a consumer processes it",
      "Standard = at-least-once, best-effort order; FIFO = ordered, exactly-once",
      "DLQ + redrive policy isolates poison messages after maxReceiveCount",
      "Long polling reduces empty receives and cost",
    ],
    compareWith: [
      { slug: "amazon-sns", note: "SNS is pub/sub fan-out to many subscribers; SQS is a queue where one consumer processes each message." },
    ],
    relatedTopics: ["decoupling-and-messaging"],
    references: [
      { title: "Amazon SQS Developer Guide", url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html" },
      { title: "FIFO queues", url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html" },
      { title: "Dead-letter queues", url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html" },
    ],
  },
  {
    slug: "amazon-sns",
    name: "Amazon SNS",
    category: "Application Integration",
    tagline: "Pub/sub messaging and fan-out",
    description:
      "Amazon SNS is a managed publish/subscribe service that fans messages out to many subscribers (SQS queues, Lambda, HTTP endpoints, email, SMS). The SNS→SQS fan-out pattern gives each consumer its own durable queue.",
    whenToUse: [
      "Broadcasting an event to many independent consumers",
      "Triggering parallel workflows from a single event",
      "Push notifications, email, SMS alerts",
    ],
    whenNotToUse: [
      "Guaranteed per-consumer processing semantics without pairing with SQS",
      "Strictly ordered message processing (SNS FIFO topics exist for some cases; SQS FIFO is the usual answer)",
    ],
    keyExamPoints: [
      "Pub/sub: one message → many subscribers; producer unaware of consumers",
      "Fan-out pattern: SNS topic → per-consumer SQS queues",
      "Message filtering lets subscribers receive only relevant messages",
    ],
    compareWith: [
      { slug: "amazon-sqs", note: "SQS delivers each message to one consumer; SNS delivers each message to every subscriber." },
    ],
    relatedTopics: ["decoupling-and-messaging"],
    references: [
      { title: "Amazon SNS Developer Guide", url: "https://docs.aws.amazon.com/sns/latest/dg/welcome.html" },
    ],
  },
  {
    slug: "amazon-cloudfront",
    name: "Amazon CloudFront",
    category: "Networking & Content Delivery",
    tagline: "Global CDN with edge caching",
    description:
      "Amazon CloudFront is a content delivery network that caches content at global edge locations, reducing latency and offloading origins. It integrates with S3, ALBs, API Gateway, and supports HTTPS via ACM, geo-restriction, signed URLs, and WAF.",
    whenToUse: [
      "Static/dynamic web content for global users",
      "Caching S3 content at edges with Origin Access Control",
      "HTTPS termination and WAF protection at the edge",
      "Media streaming and large file downloads",
    ],
    whenNotToUse: [
      "Non-cacheable TCP/UDP acceleration where Global Accelerator fits better",
      "Content that must never be cached without careful cache-control settings",
    ],
    keyExamPoints: [
      "Origin Access Control secures S3 origins so only CloudFront can fetch objects",
      "TTL and cache keys control hit rates; invalidation clears cached objects",
      "Works with AWS WAF and Shield for edge security",
      "Signed URLs/cookies restrict access to paid or private content",
    ],
    compareWith: [
      { slug: "amazon-s3", note: "S3 stores the content; CloudFront caches and serves it close to users." },
    ],
    relatedTopics: ["caching-and-content-delivery", "network-security"],
    references: [
      { title: "Amazon CloudFront Developer Guide", url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html" },
    ],
  },
  {
    slug: "amazon-elasticache",
    name: "Amazon ElastiCache",
    category: "Database",
    tagline: "Managed in-memory caching",
    description:
      "Amazon ElastiCache provides managed Redis OSS and Memcached in-memory data stores. Used for sub-millisecond caching, session stores, leaderboards, and offloading repeated database reads via cache-aside patterns.",
    whenToUse: [
      "Caching repeated database query results",
      "Session state shared across a web fleet",
      "Real-time leaderboards, counters, pub/sub (Redis)",
      "Reducing load on RDS/DynamoDB for hot reads",
    ],
    whenNotToUse: [
      "Durable primary storage — ElastiCache is a cache, not a system of record",
      "Data that must survive node failure without a backing store",
    ],
    keyExamPoints: [
      "Redis OSS supports persistence, replication, and pub/sub; Memcached is simpler and multi-threaded",
      "Cache-aside (lazy loading) vs write-through patterns",
      "Multi-AZ replication for cache availability",
      "For DynamoDB specifically, DAX is the purpose-built in-memory accelerator",
    ],
    compareWith: [
      { slug: "amazon-dynamodb", note: "DynamoDB + DAX is AWS's managed accelerator path for NoSQL; ElastiCache is the general-purpose cache." },
      { slug: "amazon-rds", note: "ElastiCache typically sits in front of RDS to absorb repeated reads." },
    ],
    relatedTopics: ["caching-and-content-delivery", "database-selection-and-scaling"],
    references: [
      { title: "Amazon ElastiCache User Guide", url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html" },
    ],
  },
];

export function getService(slug: string): ServiceGuide | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
