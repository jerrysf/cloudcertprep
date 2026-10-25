import type { Question } from "../schema";

export const resilientQuestions: Question[] = [
  {
    id: "saa-res-001",
    slug: "multi-az-web-tier-behind-alb",
    domain: "design-resilient-architectures",
    topic: "high-availability",
    subtopic: "Multi-AZ compute",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A web tier runs on a single EC2 instance in one Availability Zone. The company needs the application to keep serving requests if that AZ fails. What is the simplest resilient redesign?",
    options: [
      { id: "A", text: "Move the instance to a larger instance type" },
      { id: "B", text: "Place an Application Load Balancer in front of an Auto Scaling group spanning multiple Availability Zones" },
      { id: "C", text: "Take nightly AMI backups of the instance" },
      { id: "D", text: "Attach a second Elastic IP to the instance" },
    ],
    correctAnswers: ["B"],
    explanation:
      "An Application Load Balancer distributes traffic to healthy instances across multiple AZs, and the Auto Scaling group replaces failed instances and maintains capacity. A single instance — however large or well-backed-up — remains a single point of failure.",
    optionExplanations: {
      A: "Vertical scaling does not survive an AZ failure.",
      B: "Correct. ALB + multi-AZ Auto Scaling removes the single point of failure.",
      C: "Backups help recovery after data loss but do not keep the app serving during the failure.",
      D: "Elastic IPs do not add capacity or failover across AZs.",
    },
    services: ["Elastic Load Balancing", "Amazon EC2 Auto Scaling", "Amazon EC2"],
    references: [
      {
        title: "What is Elastic Load Balancing",
        url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html",
      },
      {
        title: "Amazon EC2 Auto Scaling",
        url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-res-002",
    slug: "rds-failover-for-critical-database",
    domain: "design-resilient-architectures",
    topic: "high-availability",
    subtopic: "Database HA",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A production RDS for PostgreSQL database must fail over automatically to a standby within minutes if the primary DB instance or its AZ becomes unavailable. Which configuration provides this?",
    options: [
      { id: "A", text: "A read replica in a second Availability Zone" },
      { id: "B", text: "RDS Multi-AZ deployment with synchronous standby replication" },
      { id: "C", text: "Nightly snapshots copied to another Region" },
      { id: "D", text: "A larger RDS instance class" },
    ],
    correctAnswers: ["B"],
    explanation:
      "RDS Multi-AZ keeps a synchronous standby replica in a different AZ and performs automatic failover with an updated DNS endpoint — typically in 60–120 seconds — without application connection-string changes.",
    optionExplanations: {
      A: "Read replicas are asynchronous and must be manually promoted; they are for read scaling, not automatic failover.",
      B: "Correct. Multi-AZ synchronous standby gives automatic failover.",
      C: "Cross-Region snapshots are a DR technique with much higher RTO/RPO, not AZ failover.",
      D: "Instance size affects capacity, not availability.",
    },
    services: ["Amazon RDS"],
    references: [
      {
        title: "Multi-AZ deployments for Amazon RDS",
        url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-res-003",
    slug: "route53-health-check-failover",
    domain: "design-resilient-architectures",
    topic: "high-availability",
    subtopic: "DNS failover",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A site runs in two Regions. Users should be directed to the secondary Region automatically when health checks detect the primary Region's endpoint is unhealthy. Which Route 53 feature accomplishes this?",
    options: [
      { id: "A", text: "Weighted routing policy" },
      { id: "B", text: "Failover routing policy with health checks" },
      { id: "C", text: "Geolocation routing policy" },
      { id: "D", text: "A CNAME record with a low TTL pointing at both Regions" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Route 53 failover routing evaluates health checks on the primary record and returns the secondary record when the primary is unhealthy — the standard DNS-based regional failover pattern.",
    optionExplanations: {
      A: "Weighted routing splits traffic by proportion; it does not model primary/secondary failover.",
      B: "Correct. Failover routing + health checks reroute users automatically.",
      C: "Geolocation routes by user geography, not endpoint health.",
      D: "A CNAME can point to only one target; DNS alone cannot monitor health without a routing policy.",
    },
    services: ["Amazon Route 53"],
    references: [
      {
        title: "Choosing a routing policy",
        url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-res-004",
    slug: "decouple-with-sqs-queue",
    domain: "design-resilient-architectures",
    topic: "decoupling-and-messaging",
    subtopic: "Queue-based decoupling",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A payment API sometimes fails when the downstream invoice-generation service is overloaded or unavailable. Orders must not be lost. Which change makes the architecture resilient?",
    options: [
      { id: "A", text: "Increase the API timeout so requests wait longer" },
      { id: "B", text: "Place an SQS queue between the API and the invoice service so requests are durably buffered" },
      { id: "C", text: "Move both components onto the same EC2 instance" },
      { id: "D", text: "Add a CloudFront distribution in front of the API" },
    ],
    correctAnswers: ["B"],
    explanation:
      "An SQS queue decouples the producer from the consumer: messages persist durably until the invoice service can process them, absorbing spikes and downstream outages. This is the classic loose-coupling pattern the exam favors.",
    optionExplanations: {
      A: "Longer timeouts still fail when the downstream service is down and waste resources.",
      B: "Correct. The queue durably buffers work until the consumer recovers.",
      C: "Co-locating components couples them further and removes independent scaling.",
      D: "CloudFront caches content; it does not buffer transactional requests.",
    },
    services: ["Amazon SQS"],
    references: [
      {
        title: "Amazon SQS developer guide",
        url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-res-005",
    slug: "fan-out-order-events-to-multiple-consumers",
    domain: "design-resilient-architectures",
    topic: "decoupling-and-messaging",
    subtopic: "Pub/sub fan-out",
    difficulty: "medium",
    format: "single-choice",
    question:
      "When an order is placed, three independent systems — fulfillment, analytics, and notifications — must each receive the event. The systems should not know about each other, and adding future consumers should not require producer changes. Which design fits best?",
    options: [
      { id: "A", text: "The API calls each of the three services synchronously" },
      { id: "B", text: "Publish the order event to an SNS topic with each consumer subscribed (e.g., via its own SQS queue)" },
      { id: "C", text: "Write the event to a shared RDS table that each service polls every second" },
      { id: "D", text: "Send the event through a single SQS queue shared by all consumers" },
    ],
    correctAnswers: ["B"],
    explanation:
      "SNS pub/sub delivers each event to every subscriber. A common pattern is SNS → SQS per consumer (fan-out), giving each system its own durable queue and independent retry/failure semantics while the producer stays unaware of consumers.",
    optionExplanations: {
      A: "Synchronous fan-out couples the API to each consumer's availability and requires code changes to add consumers.",
      B: "Correct. SNS fan-out (typically to per-consumer SQS queues) decouples producer and consumers.",
      C: "Polling a shared table adds load, latency, and coupling on a schema.",
      D: "Competing consumers on one SQS queue divide messages rather than each receiving a copy.",
    },
    services: ["Amazon SNS", "Amazon SQS"],
    references: [
      {
        title: "Amazon SNS developer guide",
        url: "https://docs.aws.amazon.com/sns/latest/dg/welcome.html",
      },
      {
        title: "Fanout to Amazon SQS queues",
        url: "https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-res-006",
    slug: "fifo-ordering-for-transactions",
    domain: "design-resilient-architectures",
    topic: "decoupling-and-messaging",
    subtopic: "Message ordering",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A queue carries financial transactions that must be processed exactly once and strictly in order. Which queue type should be selected?",
    options: [
      { id: "A", text: "Amazon SQS standard queue" },
      { id: "B", text: "Amazon SQS FIFO queue with message deduplication" },
      { id: "C", text: "An SNS topic" },
      { id: "D", text: "Amazon EventBridge scheduler" },
    ],
    correctAnswers: ["B"],
    explanation:
      "SQS FIFO queues preserve message order and provide exactly-once processing via content-based or explicit deduplication IDs. Standard queues offer at-least-once delivery with best-effort ordering — not acceptable for strict ordering.",
    optionExplanations: {
      A: "Standard queues are at-least-once and best-effort ordering.",
      B: "Correct. FIFO guarantees ordering and exactly-once processing.",
      C: "SNS is publish/subscribe fan-out, not an ordered queue.",
      D: "EventBridge Scheduler triggers events on schedules; it is not a transaction queue.",
    },
    services: ["Amazon SQS"],
    references: [
      {
        title: "Amazon SQS FIFO queues",
        url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-res-007",
    slug: "rto-rpo-choose-dr-strategy",
    domain: "design-resilient-architectures",
    topic: "disaster-recovery",
    subtopic: "DR patterns",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A workload requires recovery in a second Region with RTO under 1 hour and near-zero RPO, but full multi-site active/active is too expensive. Which DR strategy best balances these requirements?",
    options: [
      { id: "A", text: "Backup and restore from nightly snapshots" },
      { id: "B", text: "Pilot light" },
      { id: "C", text: "Warm standby with a scaled-down functional copy running in the DR Region and continuous data replication" },
      { id: "D", text: "Multi-site active/active in two Regions" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Warm standby runs a reduced-capacity but fully functional copy in the DR Region with continuous replication, so failover requires only scaling up — achieving sub-hour RTO and near-zero RPO at lower cost than active/active.",
    optionExplanations: {
      A: "Backup and restore has RTO measured in hours-to-days and RPO tied to snapshot frequency — too slow.",
      B: "Pilot light keeps only core data replicated; provisioning the full stack at failover typically exceeds a 1-hour RTO for non-trivial systems.",
      C: "Correct. Warm standby meets sub-hour RTO/near-zero RPO cheaper than active/active.",
      D: "Active/active meets the requirements but the question states it is too expensive.",
    },
    services: ["Disaster recovery", "Amazon Route 53"],
    references: [
      {
        title: "Disaster recovery options in the cloud",
        url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-res-008",
    slug: "centralized-backup-across-services",
    domain: "design-resilient-architectures",
    topic: "disaster-recovery",
    subtopic: "Backup orchestration",
    difficulty: "medium",
    format: "single-choice",
    question:
      "The company must centrally manage and audit backups for EC2 (EBS), RDS, EFS, and DynamoDB across accounts, with scheduled policies and retention rules. Which service is designed for this?",
    options: [
      { id: "A", text: "Cron jobs calling per-service snapshot APIs" },
      { id: "B", text: "AWS Backup with backup plans and vaults" },
      { id: "C", text: "Amazon S3 Glacier vaults accessed directly" },
      { id: "D", text: "AWS CloudTrail log archiving" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AWS Backup provides centralized, policy-driven backup across EBS, RDS, EFS, DynamoDB, and more — including cross-account and cross-Region copies, retention rules, and audit via AWS Backup Audit Manager.",
    optionExplanations: {
      A: "DIY cron scripts are error-prone, unaudited, and hard to enforce consistently.",
      B: "Correct. AWS Backup is the managed, centralized backup service.",
      C: "Glacier is a storage tier, not a cross-service backup orchestrator.",
      D: "CloudTrail records API activity; it does not back up workloads.",
    },
    services: ["AWS Backup", "Amazon RDS", "Amazon EBS"],
    references: [
      {
        title: "AWS Backup developer guide",
        url: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-res-009",
    slug: "rpo-driven-backup-frequency",
    domain: "design-resilient-architectures",
    topic: "disaster-recovery",
    subtopic: "RPO fundamentals",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A business can tolerate losing at most 15 minutes of data. Which statement correctly captures what the backup design must satisfy?",
    options: [
      { id: "A", text: "Restores must complete within 15 minutes" },
      { id: "B", text: "Restore points must be created at least every 15 minutes (RPO ≤ 15 minutes)" },
      { id: "C", text: "The system must fail over within 15 minutes of a Region loss" },
      { id: "D", text: "Monitoring must alert within 15 minutes" },
    ],
    correctAnswers: ["B"],
    explanation:
      "RPO (recovery point objective) defines maximum acceptable data loss — the age of the newest restore point after a failure. A 15-minute RPO means recovery points must be produced at least every 15 minutes. RTO is the separate measure of restore/failover time.",
    optionExplanations: {
      A: "That describes RTO, not data-loss tolerance.",
      B: "Correct. RPO ≤ 15 minutes requires recovery points at least every 15 minutes.",
      C: "That is an RTO statement about failover speed.",
      D: "Alerting speed is an operational metric, unrelated to data durability.",
    },
    services: ["AWS Backup"],
    references: [
      {
        title: "Disaster recovery options in the cloud",
        url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-res-010",
    slug: "s3-durability-and-versioning",
    domain: "design-resilient-architectures",
    topic: "resilient-storage",
    subtopic: "S3 data protection",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Objects in an S3 bucket must be protected against both accidental deletion and overwrites, while retaining S3's multi-AZ durability. What should be enabled?",
    options: [
      { id: "A", text: "S3 Versioning, optionally with MFA delete" },
      { id: "B", text: "S3 Transfer Acceleration" },
      { id: "C", text: "S3 Select for faster queries" },
      { id: "D", text: "A lifecycle rule that deletes old objects quickly" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Versioning preserves every variant of an object so overwrites and deletes create new versions or delete markers rather than losing data. MFA delete adds another protection against deletion. S3 Standard already stores data redundantly across multiple AZs.",
    optionExplanations: {
      A: "Correct. Versioning protects against overwrite and deletion; MFA delete adds extra protection.",
      B: "Transfer Acceleration speeds uploads over long distances; unrelated to durability.",
      C: "S3 Select queries object content in place; unrelated to protection.",
      D: "Aggressive deletion lifecycles increase data-loss risk.",
    },
    services: ["Amazon S3"],
    references: [
      {
        title: "Using versioning in S3 buckets",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-res-011",
    slug: "share-storage-across-instances-multi-az",
    domain: "design-resilient-architectures",
    topic: "resilient-storage",
    subtopic: "Shared file storage",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An Auto Scaling group of EC2 instances across three AZs must all read and write the same file system, which must remain available if one AZ fails. Which storage service fits?",
    options: [
      { id: "A", text: "A single EBS volume attached to all instances" },
      { id: "B", text: "Amazon EFS with mount targets in each AZ" },
      { id: "C", text: "Instance store volumes on each instance" },
      { id: "D", text: "An S3 bucket mounted as a block device" },
    ],
    correctAnswers: ["B"],
    explanation:
      "EFS is a managed, multi-AZ, NFS-style file system that many instances across AZs mount concurrently — exactly the shared, highly available file storage described.",
    optionExplanations: {
      A: "EBS volumes attach to a single instance in one AZ (multi-attach exists only for specific io1/io2 use cases within one AZ).",
      B: "Correct. EFS provides shared file access across AZs.",
      C: "Instance store is ephemeral, per-instance, and lost on stop/termination.",
      D: "S3 is object storage, not a mountable block device.",
    },
    services: ["Amazon EFS", "Amazon EC2"],
    references: [
      {
        title: "What is Amazon EFS",
        url: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-res-012",
    slug: "handle-poison-messages-with-dlq",
    domain: "design-resilient-architectures",
    topic: "decoupling-and-messaging",
    subtopic: "Failure handling",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A consumer repeatedly fails to process a small number of malformed SQS messages, blocking the queue and generating reprocessing noise. What is the standard mechanism to isolate these messages for later analysis?",
    options: [
      { id: "A", text: "Increase the visibility timeout to a week" },
      { id: "B", text: "Configure a dead-letter queue with a maxReceiveCount redrive policy" },
      { id: "C", text: "Delete the source queue and recreate it daily" },
      { id: "D", text: "Convert the queue from standard to FIFO" },
    ],
    correctAnswers: ["B"],
    explanation:
      "A dead-letter queue (DLQ) with a redrive policy moves a message aside after it has been received more than maxReceiveCount times, so poison messages stop blocking the main queue and can be inspected or replayed later.",
    optionExplanations: {
      A: "A longer visibility timeout delays redelivery but keeps bad messages cycling forever.",
      B: "Correct. DLQ + redrive policy is the standard poison-message pattern.",
      C: "Recreating queues discards in-flight messages and is not a control mechanism.",
      D: "FIFO ordering does not remove malformed messages.",
    },
    services: ["Amazon SQS"],
    references: [
      {
        title: "Amazon SQS dead-letter queues",
        url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
];
