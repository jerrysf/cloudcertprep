import type { Question } from "../schema";

export const costOptimizedQuestions: Question[] = [
  {
    id: "saa-cost-001",
    slug: "archive-access-pattern-storage-class",
    domain: "design-cost-optimized-architectures",
    topic: "cost-optimized-storage",
    subtopic: "S3 storage classes",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Regulatory archives must be retained 7 years, are retrieved at most once a year, and a retrieval time of several hours is acceptable. Which S3 storage class minimizes storage cost?",
    options: [
      { id: "A", text: "S3 Standard" },
      { id: "B", text: "S3 Standard-IA" },
      { id: "C", text: "S3 Glacier Deep Archive" },
      { id: "D", text: "S3 One Zone-IA" },
    ],
    correctAnswers: ["C"],
    explanation:
      "S3 Glacier Deep Archive is the lowest-cost S3 storage class, designed for data accessed once or twice a year, with retrieval in hours. For 7-year archives with annual access and hours-long retrieval tolerance, it minimizes storage cost.",
    optionExplanations: {
      A: "Standard costs the most per GB-month and is designed for frequent access.",
      B: "Standard-IA is for infrequent but millisecond-latency access, costing more than archive tiers.",
      C: "Correct. Deep Archive is built for long-retention, rarely accessed data with hours-long retrieval.",
      D: "One Zone-IA lowers resilience (single AZ) and still costs more than Deep Archive for this access pattern.",
    },
    services: ["Amazon S3"],
    references: [
      {
        title: "Amazon S3 storage classes",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-cost-002",
    slug: "lifecycle-rules-for-aging-logs",
    domain: "design-cost-optimized-architectures",
    topic: "cost-optimized-storage",
    subtopic: "Lifecycle management",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Application logs in S3 are actively queried for 30 days, rarely read for the next 60 days, and must be retained for 1 year. Which approach reduces cost automatically over time?",
    options: [
      { id: "A", text: "Keep all logs in S3 Standard for the year" },
      { id: "B", text: "An S3 Lifecycle rule transitioning objects to S3 Standard-IA after 30 days and to S3 Glacier Flexible Retrieval after 90 days" },
      { id: "C", text: "Manually download logs to a laptop monthly" },
      { id: "D", text: "Enable S3 replication to a second Region" },
    ],
    correctAnswers: ["B"],
    explanation:
      "S3 Lifecycle rules automatically transition objects between storage classes (or expire them) based on age — matching storage cost to access frequency without manual work. Replication doubles storage cost rather than reducing it.",
    optionExplanations: {
      A: "Standard pricing for a year ignores the changing access pattern.",
      B: "Correct. Lifecycle transitions align each phase with a cheaper tier.",
      C: "Manual offloading is error-prone and loses durability guarantees.",
      D: "Cross-Region replication adds cost for DR, not savings.",
    },
    services: ["Amazon S3"],
    references: [
      {
        title: "Managing your storage lifecycle",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-cost-003",
    slug: "unknown-access-pattern-storage",
    domain: "design-cost-optimized-architectures",
    topic: "cost-optimized-storage",
    subtopic: "Intelligent-Tiering",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A data lake holds objects whose access frequency is unknown and changes over time; some objects go untouched for months then spike. Retrieval must remain millisecond-latency. Which storage class automatically optimizes cost?",
    options: [
      { id: "A", text: "S3 Standard" },
      { id: "B", text: "S3 Intelligent-Tiering" },
      { id: "C", text: "S3 Glacier Deep Archive" },
      { id: "D", text: "S3 One Zone-IA" },
    ],
    correctAnswers: ["B"],
    explanation:
      "S3 Intelligent-Tiering monitors access patterns and automatically moves objects between frequent/infrequent/archive-access tiers, keeping millisecond retrieval while reducing cost — designed exactly for unknown or changing access patterns.",
    optionExplanations: {
      A: "Standard never tiers down, so rarely-accessed objects keep paying the highest price.",
      B: "Correct. Intelligent-Tiering automatically moves objects between access tiers as patterns change.",
      C: "Deep Archive has hours-long retrieval, violating the latency requirement.",
      D: "One Zone-IA trades away multi-AZ resilience and cannot adapt to changing patterns.",
    },
    services: ["Amazon S3"],
    references: [
      {
        title: "S3 Intelligent-Tiering",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-dynamic-data-access",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-cost-004",
    slug: "predictable-steady-workload-pricing",
    domain: "design-cost-optimized-architectures",
    topic: "cost-optimized-compute",
    subtopic: "Commitment discounts",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A production database server runs 24/7 on EC2 at a stable size for at least the next year. The company wants the largest legitimate discount without changing the architecture. What should they purchase?",
    options: [
      { id: "A", text: "Nothing — On-Demand is already cheapest for steady workloads" },
      { id: "B", text: "A Compute Savings Plan or EC2 Instance Savings Plan (1-year or 3-year commitment), or a Reserved Instance" },
      { id: "C", text: "Spot Instances for the database" },
      { id: "D", text: "A second identical instance for load balancing" },
    ],
    correctAnswers: ["B"],
    explanation:
      "For predictable, steady-state usage, Savings Plans (or matching Reserved Instances) offer substantial discounts in exchange for a 1- or 3-year usage commitment — with no architecture change.",
    optionExplanations: {
      A: "On-Demand is the most flexible and the most expensive per hour for steady usage.",
      B: "Correct. Commitment-based discounts fit stable 24/7 workloads.",
      C: "Spot capacity can be interrupted — inappropriate for a production database.",
      D: "Adding capacity increases cost; it is not a discount mechanism.",
    },
    services: ["Amazon EC2", "AWS Savings Plans"],
    references: [
      {
        title: "Savings Plans",
        url: "https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html",
      },
      {
        title: "EC2 instance purchasing options",
        url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-cost-005",
    slug: "right-size-underutilized-instances",
    domain: "design-cost-optimized-architectures",
    topic: "cost-optimized-compute",
    subtopic: "Right-sizing",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Cost Explorer shows a fleet of EC2 instances averaging 5% CPU for months. The team wants the lowest-effort way to cut compute spend while keeping capacity headroom. What should they do first?",
    options: [
      { id: "A", text: "Purchase Reserved Instances for the current sizes" },
      { id: "B", text: "Right-size the instances using AWS Compute Optimizer recommendations" },
      { id: "C", text: "Move all instances to Spot capacity" },
      { id: "D", text: "Add more instances behind the load balancer" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AWS Compute Optimizer analyzes CloudWatch metrics and recommends better-fitting instance types/sizes. Right-sizing chronically underutilized instances is the standard first cost-optimization move before committing to discounts on oversized capacity.",
    optionExplanations: {
      A: "Committing to current sizes locks in the waste.",
      B: "Correct. Compute Optimizer right-sizing removes persistent overprovisioning.",
      C: "Spot is for interruptible workloads, not steady services.",
      D: "More instances raise cost without addressing utilization.",
    },
    services: ["AWS Compute Optimizer", "Amazon EC2"],
    references: [
      {
        title: "AWS Compute Optimizer",
        url: "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-cost-006",
    slug: "intermittent-dev-workloads-serverless",
    domain: "design-cost-optimized-architectures",
    topic: "cost-optimized-compute",
    subtopic: "Pay-per-use",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An internal tool serves a few dozen requests per day, mostly during business hours, with occasional idle days. Which compute approach minimizes cost?",
    options: [
      { id: "A", text: "An always-on m5.large EC2 instance" },
      { id: "B", text: "AWS Lambda behind API Gateway, paying only per request" },
      { id: "C", text: "A Dedicated Host reserved for the tool" },
      { id: "D", text: "An ECS cluster with two always-running tasks" },
    ],
    correctAnswers: ["B"],
    explanation:
      "For sparse, intermittent traffic, Lambda + API Gateway scales to zero and bills per request and duration — typically pennies per day versus paying for idle always-on capacity.",
    optionExplanations: {
      A: "Always-on instances bill continuously regardless of use.",
      B: "Correct. Per-request serverless billing eliminates idle cost.",
      C: "Dedicated Hosts are the most expensive, isolation-driven option.",
      D: "Always-running ECS tasks bill like always-on servers.",
    },
    services: ["AWS Lambda", "Amazon API Gateway"],
    references: [
      {
        title: "AWS Lambda pricing model",
        url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-cost-007",
    slug: "aurora-vs-rds-vs-dynamodb-cost",
    domain: "design-cost-optimized-architectures",
    topic: "cost-optimized-databases-and-network",
    subtopic: "Database cost models",
    difficulty: "hard",
    format: "multiple-response",
    question:
      "Which TWO choices can reduce database cost for the described workloads? (Select TWO.)",
    options: [
      { id: "A", text: "Use DynamoDB on-demand capacity for a spiky, unpredictable key-value workload instead of provisioned capacity" },
      { id: "B", text: "Use Aurora Serverless v2 for a relational database with highly variable load that is idle overnight" },
      { id: "C", text: "Run all databases on the largest available RDS instance to avoid resizing" },
      { id: "D", text: "Enable Multi-AZ on every dev/test database" },
      { id: "E", text: "Keep a year's queryable backups in a provisioned Redshift cluster" },
    ],
    correctAnswers: ["A", "B"],
    explanation:
      "On-demand DynamoDB pricing matches spiky access without paying for provisioned-but-unused capacity. Aurora Serverless v2 scales capacity (and thus cost) down during idle periods for variable relational workloads.",
    optionExplanations: {
      A: "Correct. On-demand billing aligns cost with unpredictable request volume.",
      B: "Correct. Serverless v2 scales to minimal ACUs overnight, cutting idle spend.",
      C: "Oversizing everything is the opposite of cost optimization.",
      D: "Multi-AZ roughly doubles database cost — unjustified for dev/test.",
      E: "Keeping a year's data 'hot' in a warehouse costs far more than archive storage.",
    },
    services: ["Amazon DynamoDB", "Amazon Aurora"],
    references: [
      {
        title: "Aurora Serverless v2",
        url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html",
      },
      {
        title: "DynamoDB capacity modes",
        url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-cost-008",
    slug: "private-s3-access-avoid-nat-fees",
    domain: "design-cost-optimized-architectures",
    topic: "cost-optimized-databases-and-network",
    subtopic: "VPC endpoints",
    difficulty: "hard",
    format: "single-choice",
    question:
      "Instances in private subnets transfer terabytes to S3 through a NAT gateway, generating high hourly and data-processing charges. What is the most cost-effective fix that keeps the traffic off the internet?",
    options: [
      { id: "A", text: "Add a second NAT gateway in another AZ" },
      { id: "B", text: "Create a gateway VPC endpoint for S3 and update the route table" },
      { id: "C", text: "Give each instance a public IP and use the internet gateway" },
      { id: "D", text: "Move the data to EFS" },
    ],
    correctAnswers: ["B"],
    explanation:
      "A gateway VPC endpoint routes S3 traffic over the AWS network without a NAT gateway, eliminating NAT data-processing charges for S3 traffic. Gateway endpoints for S3 and DynamoDB carry no hourly endpoint charge.",
    optionExplanations: {
      A: "More NAT gateways increase hourly cost and do not remove per-GB processing fees.",
      B: "Correct. A free gateway endpoint bypasses the NAT gateway entirely for S3 traffic.",
      C: "Public IPs expose private instances and route through the IGW with its own data-transfer pricing — worse security and not cheaper.",
      D: "EFS is a different storage class with different pricing; it does not address the access-pattern problem.",
    },
    services: ["Amazon VPC", "Amazon S3"],
    references: [
      {
        title: "Gateway endpoints for Amazon S3",
        url: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
];
