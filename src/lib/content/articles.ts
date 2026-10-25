import type { DomainId } from "./schema";

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  domain: DomainId;
  topic: string; // topic slug for related practice
  updatedAt: string;
  readingMinutes: number;
  sections: ArticleSection[];
  references: { title: string; url: string }[];
}

export const ARTICLES: Article[] = [
  {
    slug: "s3-storage-classes-explained",
    title: "Amazon S3 Storage Classes Explained: Choosing the Right Tier",
    description:
      "Compare S3 Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, and the Glacier tiers — when each saves money and when it costs you more.",
    domain: "design-cost-optimized-architectures",
    topic: "cost-optimized-storage",
    updatedAt: "2026-10-25",
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Every S3 object lives in a storage class that determines its price, durability characteristics, and retrieval behavior. The exam loves scenarios where an access pattern is described and you must pick the cheapest class that still meets the requirements — so anchor your thinking on access frequency and retrieval-time tolerance.",
          "All classes except One Zone-IA store data redundantly across multiple Availability Zones. The differences that matter are cost per GB-month, retrieval fees, and retrieval latency.",
        ],
      },
      {
        heading: "The classes at a glance",
        list: [
          "S3 Standard — frequent access, millisecond latency, highest storage cost, no retrieval fee.",
          "S3 Intelligent-Tiering — automatically moves objects between frequent/infrequent/archive tiers based on observed access; use when patterns are unknown or changing.",
          "S3 Standard-IA — infrequent access, still millisecond latency, lower storage price but a per-GB retrieval fee.",
          "S3 One Zone-IA — like Standard-IA but in a single AZ; cheaper, less resilient.",
          "S3 Glacier Instant Retrieval — archive pricing with millisecond access, for data accessed roughly once a quarter.",
          "S3 Glacier Flexible Retrieval — minutes-to-hours retrieval for data accessed once or twice a year.",
          "S3 Glacier Deep Archive — the lowest storage price; hours-long retrieval; designed for long-retention compliance archives.",
        ],
      },
      {
        heading: "Decision framework",
        paragraphs: [
          "Ask two questions: how often is the data read, and how fast must retrieval be? Frequently accessed → Standard. Unknown or changing → Intelligent-Tiering. Rarely accessed but must stay millisecond-fast → Standard-IA or Glacier Instant Retrieval. Tolerates hours → Flexible Retrieval or Deep Archive.",
          "Watch the exam trap: cheaper storage classes charge retrieval fees, so putting frequently-read objects in Standard-IA can cost more than Standard.",
        ],
      },
      {
        heading: "Lifecycle rules",
        paragraphs: [
          "When access patterns are predictable by age — logs queried for 30 days, then rarely — use lifecycle rules to transition objects between classes and expire them at end of retention. It is the standard answer for 'reduce cost automatically over time.'",
        ],
      },
    ],
    references: [
      { title: "Amazon S3 storage classes", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html" },
      { title: "Managing your storage lifecycle", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html" },
    ],
  },
  {
    slug: "s3-vs-ebs-vs-efs",
    title: "S3 vs EBS vs EFS: Picking the Right AWS Storage",
    description:
      "Object, block, and file storage serve different jobs. Learn the decision criteria the SAA-C03 exam expects you to apply.",
    domain: "design-resilient-architectures",
    topic: "resilient-storage",
    updatedAt: "2026-10-25",
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "AWS offers three fundamental storage types, and exam questions test whether you can match one to a described workload. The key distinction: object storage (S3) is accessed over HTTP at unlimited scale, block storage (EBS) is a disk attached to one instance, and file storage (EFS) is a mounted file system shared by many instances.",
        ],
      },
      {
        heading: "S3 — object storage",
        paragraphs: [
          "S3 stores objects (files plus metadata) in buckets, replicated across multiple AZs for extreme durability. You access it via API — you cannot mount it as a disk. It is the answer for static assets, backups, data lakes, media, and anything that needs 11-nines durability and unlimited scale.",
        ],
      },
      {
        heading: "EBS — block storage",
        paragraphs: [
          "EBS volumes behave like hard drives attached to a single EC2 instance in a single AZ. Use it for boot volumes, databases, and any workload needing low-latency block access. Snapshots to S3 provide backup and cross-AZ/Region portability. io2 volumes deliver provisioned IOPS for demanding databases.",
        ],
      },
      {
        heading: "EFS — shared file storage",
        paragraphs: [
          "EFS is a managed NFS file system that many instances across multiple AZs mount simultaneously. When an Auto Scaling group must share files — content management, shared config, web roots — EFS is the standard answer. (Windows workloads needing SMB should look at FSx for Windows File Server.)",
        ],
      },
      {
        heading: "Quick decision table",
        list: [
          "Unlimited durable storage accessed via API → S3",
          "Disk for one instance / database storage → EBS",
          "Shared file system across a multi-AZ fleet → EFS",
          "Ephemeral scratch storage on the instance → instance store",
        ],
      },
    ],
    references: [
      { title: "Amazon S3 User Guide", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html" },
      { title: "Amazon EBS User Guide", url: "https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html" },
      { title: "Amazon EFS User Guide", url: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html" },
    ],
  },
  {
    slug: "security-groups-vs-network-acls",
    title: "Security Groups vs Network ACLs: Stateless vs Stateful Firewalls",
    description:
      "Two different layers of VPC security. Understand where each applies, the stateful/stateless distinction, and which one supports deny rules.",
    domain: "design-secure-architectures",
    topic: "network-security",
    updatedAt: "2026-10-25",
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "Security groups and network ACLs both filter traffic in a VPC, but they operate at different layers with different rules. Exam questions frequently hinge on one fact: security groups are stateful and allow-only; NACLs are stateless and support explicit denies.",
        ],
      },
      {
        heading: "Security groups — instance-level, stateful",
        paragraphs: [
          "A security group is a virtual firewall attached to an ENI (instances, load balancers, RDS, Lambda-in-VPC, etc.). It is stateful: if you allow inbound traffic, the response is automatically allowed out regardless of outbound rules, and vice versa. Rules are allow-only — you cannot write 'deny this IP.'",
          "Multiple security groups can attach to one resource, and rules reference other security groups as sources — the standard way to allow web-tier → app-tier traffic.",
        ],
      },
      {
        heading: "Network ACLs — subnet-level, stateless",
        paragraphs: [
          "A NACL applies to every resource in a subnet. It is stateless: return traffic must be explicitly allowed in both directions (ephemeral ports matter). Rules are numbered and evaluated in order, and — crucially — support both allow AND deny.",
          "The classic exam answer: 'block a specific malicious IP' → NACL deny rule, because security groups cannot deny.",
        ],
      },
      {
        heading: "How to remember it",
        list: [
          "SG = instance-level, stateful, allow-only",
          "NACL = subnet-level, stateless, allow + deny, numbered rules",
          "Ephemeral ports: NACLs need outbound ephemeral-port ranges open for return traffic",
        ],
      },
    ],
    references: [
      { title: "Security groups", url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html" },
      { title: "Network ACLs", url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html" },
    ],
  },
  {
    slug: "rds-vs-dynamodb-vs-aurora",
    title: "RDS vs Aurora vs DynamoDB: Choosing a Database on AWS",
    description:
      "Relational engines, cloud-native Aurora, and serverless NoSQL — map workload characteristics to the right database.",
    domain: "design-high-performing-architectures",
    topic: "database-selection-and-scaling",
    updatedAt: "2026-10-25",
    readingMinutes: 7,
    sections: [
      {
        paragraphs: [
          "Database selection questions on the exam describe access patterns — query type, scale, structure — and expect you to pick the fitting engine. The split is simple at heart: relational (RDS/Aurora) vs NoSQL key-value (DynamoDB).",
        ],
      },
      {
        heading: "RDS — managed relational",
        paragraphs: [
          "RDS runs PostgreSQL, MySQL, MariaDB, Oracle, and SQL Server with managed backups, patching, and failover. Choose it when you need SQL, joins, transactions, or a specific engine. Scale reads with read replicas; get HA with Multi-AZ.",
        ],
      },
      {
        heading: "Aurora — cloud-native relational",
        paragraphs: [
          "Aurora is MySQL/PostgreSQL-compatible but re-architected for the cloud: storage replicated six ways across three AZs, up to 15 low-lag read replicas, and faster failover. Aurora Serverless v2 scales capacity automatically — good for variable loads and cost control. Choose Aurora when the workload is relational but demands more performance or resilience than community engines, or cross-Region DR via Global Database.",
        ],
      },
      {
        heading: "DynamoDB — serverless NoSQL",
        paragraphs: [
          "DynamoDB provides single-digit-millisecond key-value/document access at effectively unlimited scale with zero infrastructure management. On-demand mode bills per request — perfect for spiky workloads. Global tables give multi-Region active-active. Choose it for session stores, user profiles, catalogs, leaderboards — anything accessed by key rather than relational queries.",
        ],
      },
      {
        heading: "Quick decision table",
        list: [
          "Need SQL, joins, transactions, specific engine (Oracle, SQL Server) → RDS",
          "MySQL/PostgreSQL-compatible, higher performance or global DR → Aurora",
          "Key-value access, unpredictable scale, single-digit-ms, serverless billing → DynamoDB",
          "In-memory caching of hot reads → ElastiCache or DAX on top",
        ],
      },
    ],
    references: [
      { title: "Amazon RDS User Guide", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html" },
      { title: "Amazon Aurora", url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html" },
      { title: "Amazon DynamoDB", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html" },
    ],
  },
  {
    slug: "ec2-vs-lambda-vs-containers",
    title: "EC2 vs Lambda vs Containers: Picking a Compute Model",
    description:
      "Full-control VMs, event-driven functions, and managed containers each own a sweet spot. Learn the trade-offs for the exam.",
    domain: "design-high-performing-architectures",
    topic: "compute-selection",
    updatedAt: "2026-10-25",
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Compute questions describe workload shape — duration, traffic pattern, control requirements — and expect the fitting platform. Think of a spectrum: EC2 = maximum control, containers = packaged services without VM management, Lambda = pure event-driven code.",
        ],
      },
      {
        heading: "EC2 — full control",
        paragraphs: [
          "Choose EC2 when the workload needs OS-level access: custom kernels, specific AMIs, licensing tied to hardware, GPUs, or persistent instance state. It suits steady, predictable, long-running services. You own patching, scaling, and capacity.",
        ],
      },
      {
        heading: "Lambda — zero-ops functions",
        paragraphs: [
          "Choose Lambda for event-driven, short-lived work (under 15 minutes): S3 triggers, stream processing, API backends, scheduled jobs. It scales automatically from zero and bills per request — cheapest for intermittent traffic. It cannot run kernel modules and cold starts matter for ultra-latency-sensitive paths.",
        ],
      },
      {
        heading: "ECS/EKS on Fargate — containers",
        paragraphs: [
          "Choose containers when you need to package an application and its dependencies but want longer-running processes, custom runtimes, or orchestration without managing servers (Fargate) or with managed nodes. ECS is AWS-native and simpler; EKS is managed Kubernetes for teams needing Kubernetes APIs/ecosystem.",
        ],
      },
      {
        heading: "Exam shortcuts",
        list: [
          "'Event-driven, seconds-long, bursty' → Lambda",
          "'Full OS control / custom kernel / licensing' → EC2",
          "'Long-running microservice, packaged app, Kubernetes requirement' → ECS/EKS on Fargate",
          "'Batch of thousands of parallel interruptible jobs' → Spot + AWS Batch",
        ],
      },
    ],
    references: [
      { title: "AWS Lambda", url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html" },
      { title: "Amazon EC2", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html" },
      { title: "Amazon ECS", url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html" },
    ],
  },
  {
    slug: "disaster-recovery-rto-rpo-explained",
    title: "Disaster Recovery on AWS: RTO, RPO, and the Four Strategies",
    description:
      "Backup & restore, pilot light, warm standby, multi-site — map recovery objectives to the right DR pattern.",
    domain: "design-resilient-architectures",
    topic: "disaster-recovery",
    updatedAt: "2026-10-25",
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Disaster recovery questions give you recovery objectives and a cost sensitivity, then ask which strategy fits. The two metrics: RTO (how fast must service be restored) and RPO (how much data loss is acceptable, measured as the age of the newest recovery point).",
        ],
      },
      {
        heading: "The four strategies",
        list: [
          "Backup & restore — cheapest, slowest. Snapshots/backups to another Region; rebuild on disaster. RTO: hours+; RPO: backup interval.",
          "Pilot light — core data layer (databases, critical storage) continuously replicated; compute provisioned at failover. RTO: tens of minutes to hours.",
          "Warm standby — a scaled-down but functional copy always running in the DR Region; scale up on failover. RTO: under an hour; RPO near zero.",
          "Multi-site active/active — full capacity in multiple Regions serving traffic simultaneously. Fastest recovery, highest cost.",
        ],
      },
      {
        heading: "Choosing for the exam",
        paragraphs: [
          "The question almost always includes a budget or RTO hint. Tight RTO (<1 hour) + cost-conscious → warm standby. 'Can tolerate hours of downtime' → backup & restore or pilot light. 'Zero downtime, cost no object' → active/active.",
          "Remember the supporting services: continuous replication (RDS cross-Region read replicas, Aurora Global Database, S3 CRR, DynamoDB global tables), Route 53 failover routing for traffic shift, and AWS Backup for centralized backup policies.",
        ],
      },
      {
        heading: "Common traps",
        list: [
          "Multi-AZ is NOT disaster recovery — it protects against AZ loss, not regional loss.",
          "Cross-Region read replicas alone do not fail over — you need promotion + DNS/traffic shift.",
          "A snapshot in the same Region does not protect against regional failure.",
        ],
      },
    ],
    references: [
      { title: "Disaster recovery options in the cloud", url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html" },
      { title: "Route 53 routing policies", url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html" },
    ],
  },
  {
    slug: "designing-high-availability-on-aws",
    title: "Designing Highly Available Architectures on AWS",
    description:
      "Eliminate single points of failure across compute, database, and DNS layers — the patterns behind Domain 2's biggest weight.",
    domain: "design-resilient-architectures",
    topic: "high-availability",
    updatedAt: "2026-10-25",
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "High availability means the workload keeps serving requests when components fail. On AWS, the recurring exam pattern is the same: distribute across Availability Zones, put a load balancer in front, auto-scale the fleet, and make the data layer multi-AZ.",
        ],
      },
      {
        heading: "The layered checklist",
        list: [
          "Compute — Auto Scaling group across ≥2 AZs behind an ALB; never a single instance",
          "Load balancing — ALB for HTTP(S) path routing; NLB for TCP/UDP at ultra-low latency",
          "Database — RDS/Aurora Multi-AZ synchronous standby for automatic failover",
          "Storage — S3 and EFS are already multi-AZ; EBS snapshots span AZs",
          "DNS — Route 53 health checks + failover routing for multi-Region resilience",
          "State — keep instances stateless (sessions in DynamoDB/ElastiCache) so any instance can serve any request",
        ],
      },
      {
        heading: "Availability vs fault tolerance",
        paragraphs: [
          "The exam distinguishes the two loosely: high availability minimizes downtime (fast failover, some seconds of impact); fault tolerance aims for no interruption at all (active/active, redundant everything). More fault tolerance costs more — questions ask for the design matching the stated requirement and budget.",
        ],
      },
      {
        heading: "What breaks single points of failure",
        paragraphs: [
          "Look for these answers in scenarios: replace a single EC2 instance with an ASG; replace single-AZ RDS with Multi-AZ; add a health-checking load balancer; decouple a brittle synchronous call chain with SQS; replicate data cross-Region for regional DR.",
        ],
      },
    ],
    references: [
      { title: "AWS Well-Architected Framework", url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html" },
      { title: "Elastic Load Balancing", url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html" },
      { title: "EC2 Auto Scaling", url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html" },
    ],
  },
  {
    slug: "ec2-pricing-models-explained",
    title: "EC2 Pricing Models Explained: On-Demand, Savings Plans, Reserved, Spot",
    description:
      "Match purchasing options to workload stability — the most common cost-optimization scenario on the exam.",
    domain: "design-cost-optimized-architectures",
    topic: "cost-optimized-compute",
    updatedAt: "2026-10-25",
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "EC2 offers four purchasing models and the exam tests the match between workload shape and pricing model. Stability and interruptibility are the deciding factors.",
        ],
      },
      {
        heading: "The options",
        list: [
          "On-Demand — full price, no commitment; use for unpredictable or short-term workloads.",
          "Savings Plans — commit to $/hour of usage for 1–3 years; applies across EC2, Fargate, Lambda. Flexible and broadly applicable.",
          "Reserved Instances — commit to a specific instance configuration for 1–3 years; larger discount, less flexibility (Standard vs Convertible).",
          "Spot — up to ~90% off spare capacity; can be interrupted with a 2-minute warning; for fault-tolerant work only.",
          "Dedicated Hosts — physical server for licensing/compliance; expensive, not a discount play.",
        ],
      },
      {
        heading: "Decision logic",
        paragraphs: [
          "Steady 24/7 production → Savings Plans or RIs. Unpredictable or dev/test → On-Demand. Interruptible batch/CI/stateless → Spot. The classic trap: buying Spot for a database that cannot tolerate interruption, or leaving On-Demand on a stable workload.",
          "Right-sizing comes first: discounting an oversized instance locks in waste. Use Compute Optimizer to fit the instance to the workload before committing.",
        ],
      },
    ],
    references: [
      { title: "EC2 instance purchasing options", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html" },
      { title: "Savings Plans", url: "https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html" },
      { title: "AWS Compute Optimizer", url: "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html" },
    ],
  },
  {
    slug: "vpc-connectivity-patterns",
    title: "VPC Connectivity Patterns: NAT Gateways, Endpoints, and Peering",
    description:
      "How private resources reach the internet, AWS APIs, and each other — and where cost hides.",
    domain: "design-secure-architectures",
    topic: "network-security",
    updatedAt: "2026-10-25",
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Connectivity questions are about who can reach what: internet vs private resources, and VPC-internal vs AWS-service traffic. Three building blocks cover most scenarios: NAT gateways, VPC endpoints, and VPC peering/Transit Gateway.",
        ],
      },
      {
        heading: "Outbound internet from private subnets",
        paragraphs: [
          "Private-subnet instances reach the internet outbound-only through a NAT gateway deployed in a public subnet. The instance initiates; the internet cannot initiate back. This is the default pattern for patching, external API calls, and package downloads.",
        ],
      },
      {
        heading: "Private access to AWS APIs",
        paragraphs: [
          "VPC endpoints keep traffic to AWS services on the AWS network. Gateway endpoints (free, route-table based) exist for S3 and DynamoDB — they also eliminate NAT data-processing charges for that traffic. Interface endpoints (PrivateLink ENIs) cover most other services.",
        ],
      },
      {
        heading: "VPC-to-VPC and hybrid",
        list: [
          "VPC peering — direct, non-transitive connection between two VPCs",
          "Transit Gateway — hub-and-spoke for many VPCs and on-prem networks",
          "Site-to-site VPN — encrypted tunnel over the internet",
          "Direct Connect — dedicated private connection from on-premises; consistent bandwidth, not internet-dependent",
        ],
      },
      {
        heading: "Cost note",
        paragraphs: [
          "NAT gateways bill hourly plus per-GB processed — a common hidden cost in scenarios. If S3/DynamoDB traffic flows through NAT, a free gateway endpoint removes those data-processing charges; that is a favorite exam trick in the cost-optimization domain.",
        ],
      },
    ],
    references: [
      { title: "NAT gateways", url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html" },
      { title: "VPC endpoints", url: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html" },
      { title: "VPC peering", url: "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
