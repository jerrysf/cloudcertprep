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

// ---- Pillar + comparison articles (SEO content expansion) ----

ARTICLES.push(
  {
    slug: "saa-c03-exam-guide",
    title: "SAA-C03 Exam Guide: Format, Cost, Scoring, and How to Prepare",
    description:
      "Everything about the AWS Certified Solutions Architect – Associate (SAA-C03) exam: 65 questions, 130 minutes, $150, the four domain weights, scoring, and a realistic prep strategy.",
    domain: "design-secure-architectures",
    topic: "iam-and-access-control",
    updatedAt: "2026-10-25",
    readingMinutes: 9,
    sections: [
      {
        paragraphs: [
          "The AWS Certified Solutions Architect – Associate (SAA-C03) validates that you can design solutions on AWS using the Well-Architected Framework. It is the most common starting point for cloud careers and the certification most employers recognize first.",
          "This guide summarizes the official exam details as published by AWS — always confirm current details on the official certification page before booking, since AWS updates exams periodically.",
        ],
      },
      {
        heading: "Exam format and cost",
        list: [
          "65 questions — a mix of multiple choice (one correct) and multiple response (two or more correct)",
          "130 minutes — roughly 2 minutes per question",
          "$150 USD; delivered via Pearson VUE testing center or online proctoring",
          "Pass/fail with a scaled score of 100–1,000; minimum passing score is 720",
          "Compensatory scoring: you need to pass overall, not in every section",
        ],
      },
      {
        heading: "The four content domains",
        list: [
          "Domain 1: Design Secure Architectures — 30% of scored content",
          "Domain 2: Design Resilient Architectures — 26%",
          "Domain 3: Design High-Performing Architectures — 24%",
          "Domain 4: Design Cost-Optimized Architectures — 20%",
        ],
        paragraphs: [
          "Security carries the most weight, which surprises many candidates — expect heavy coverage of IAM, encryption choices, VPC security controls, and defense-in-depth. Resilience follows closely: Multi-AZ designs, decoupling with queues, and disaster recovery trade-offs.",
        ],
      },
      {
        heading: "Who should take it",
        paragraphs: [
          "AWS recommends about a year of hands-on experience designing cloud solutions, but candidates with general IT experience regularly succeed with structured study. If you have zero IT background, AWS suggests starting with Cloud Practitioner for fundamentals first.",
          "The exam tests architectural decision-making more than hands-on console skills. Almost every question is a scenario: a workload description plus constraints (cost, latency, availability, security), and you pick the best-fit design.",
        ],
      },
      {
        heading: "How to prepare effectively",
        list: [
          "Learn the four domains' task statements — they define exactly what's in scope",
          "Practice scenario questions until you can justify every option — right and wrong",
          "Memorize the service-selection patterns: storage (S3/EBS/EFS), databases (RDS/Aurora/DynamoDB), compute (EC2/Lambda/containers), messaging (SQS/SNS/EventBridge)",
          "Take timed mock exams to build pacing — 2 minutes per question is the exam's rhythm",
          "Review official AWS docs and whitepapers for the services you keep getting wrong",
        ],
      },
      {
        heading: "Exam-day tips",
        list: [
          "Flag questions you're unsure of and return after a first pass",
          "Eliminate obviously wrong options first — most questions have 1–2 clear distractors",
          "Watch for cost keywords ('most cost-effective', 'cheapest') vs performance keywords ('lowest latency', 'most scalable') — they point to different answers",
          "Unanswered questions score as wrong; never leave blanks",
        ],
        paragraphs: [
          "Use our free practice questions and mock exams to rehearse these exact decision patterns — every question explains why each option is right or wrong.",
        ],
      },
    ],
    references: [
      {
        title: "AWS Certified Solutions Architect – Associate (official)",
        url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
      },
      {
        title: "SAA-C03 exam guide (AWS docs)",
        url: "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html",
      },
    ],
  },
  {
    slug: "alb-vs-nlb",
    title: "ALB vs NLB: Application vs Network Load Balancer",
    description:
      "When to choose an Application Load Balancer over a Network Load Balancer — layer 7 routing, WAF integration, static IPs, and extreme performance.",
    domain: "design-high-performing-architectures",
    topic: "scalability-and-elasticity",
    updatedAt: "2026-10-25",
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Both distribute traffic to targets, but they operate at different network layers — and that single fact drives almost every exam answer. ALB works at layer 7 (HTTP/HTTPS); NLB works at layer 4 (TCP/UDP/TLS passthrough).",
        ],
      },
      {
        heading: "Choose ALB when you need…",
        list: [
          "Path-, host-, header-, or query-string-based routing (e.g., /api → service A, /img → service B)",
          "AWS WAF integration for layer-7 attack filtering",
          "Authentication via OIDC/Cognito at the load balancer",
          "WebSocket support and container-friendly target groups",
          "Rich request metrics and access logs",
        ],
      },
      {
        heading: "Choose NLB when you need…",
        list: [
          "Non-HTTP protocols — TCP, UDP, or TLS passthrough to targets",
          "Ultra-low latency and millions of requests per second",
          "Static IP addresses per AZ (NLB supports Elastic IPs; ALB doesn't)",
          "Preserving client source IPs",
          "VPC endpoint service (PrivateLink) as a source",
        ],
      },
      {
        heading: "Exam shortcuts",
        paragraphs: [
          "'HTTP routing rules, WAF, auth' → ALB. 'Static IPs, UDP, extreme throughput, preserve source IP' → NLB. A third type, Gateway Load Balancer, only appears for inline virtual appliances (firewalls, IDS) — it's rarely the answer for app traffic.",
        ],
      },
    ],
    references: [
      {
        title: "How Elastic Load Balancing works",
        url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html",
      },
    ],
  },
  {
    slug: "sns-vs-sqs-vs-eventbridge",
    title: "SNS vs SQS vs EventBridge: Picking the Right Messaging Service",
    description:
      "Queues, pub/sub topics, and event buses solve different decoupling problems — learn which one fits each scenario.",
    domain: "design-resilient-architectures",
    topic: "decoupling-and-messaging",
    updatedAt: "2026-10-25",
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "All three move events between components, but they model different patterns: SQS is a queue (one consumer per message), SNS is pub/sub (every subscriber gets every message), and EventBridge is an event bus (routed events with filtering and third-party sources).",
        ],
      },
      {
        heading: "SQS — work queues",
        paragraphs: [
          "Use SQS when a task must be processed once by one consumer and you want to buffer load spikes. Consumers poll, process, and delete. Visibility timeout hides in-flight messages; dead-letter queues isolate poison messages. FIFO queues add ordering + exactly-once.",
        ],
      },
      {
        heading: "SNS — broadcast/fan-out",
        paragraphs: [
          "Use SNS when one event must reach many independent systems — the producer stays unaware of consumers. The standard pattern is SNS → per-consumer SQS queues (fan-out), giving each system durable, retryable delivery.",
        ],
      },
      {
        heading: "EventBridge — event routing",
        paragraphs: [
          "EventBridge is a serverless event bus: events from AWS services, SaaS partners, and custom apps route to targets by pattern-matching rules. Choose it for event-driven architectures needing content filtering, scheduling, SaaS integration, or schema discovery.",
        ],
      },
      {
        heading: "Decision table",
        list: [
          "One task → one consumer, buffer work → SQS",
          "One event → many consumers → SNS (usually to per-consumer SQS)",
          "Route/filter events from many sources (incl. SaaS) → EventBridge",
          "Scheduled triggers → EventBridge Scheduler",
        ],
      },
    ],
    references: [
      { title: "Amazon SQS", url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html" },
      { title: "Amazon SNS", url: "https://docs.aws.amazon.com/sns/latest/dg/welcome.html" },
      { title: "Amazon EventBridge", url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html" },
    ],
  },
  {
    slug: "rds-multi-az-vs-read-replica",
    title: "RDS Multi-AZ vs Read Replicas: Availability vs Read Scaling",
    description:
      "The most-tested RDS distinction on the exam — synchronous standby for failover vs asynchronous copies for read offload.",
    domain: "design-resilient-architectures",
    topic: "high-availability",
    updatedAt: "2026-10-25",
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Multi-AZ and read replicas both create copies of your RDS database, but for opposite reasons. Confusing them is one of the most common exam mistakes — and AWS knows it.",
        ],
      },
      {
        heading: "Multi-AZ — for availability",
        paragraphs: [
          "Multi-AZ maintains a synchronous standby replica in a different AZ. The standby serves no traffic — it exists only to take over automatically during failover (typically 60–120 seconds, no connection-string change needed). It's a disaster-resilience feature, not a scaling feature.",
        ],
      },
      {
        heading: "Read replicas — for read scaling",
        paragraphs: [
          "Read replicas are asynchronous copies that serve read-only traffic. Applications must explicitly point read queries at the replica endpoint. Replicas can also be promoted to standalone primaries — useful for DR or migrations — and can live in other Regions for cross-Region reads.",
        ],
      },
      {
        heading: "Memory aid",
        list: [
          "'Automatic failover / minimize downtime' → Multi-AZ",
          "'Offload read traffic / reporting queries / cross-Region reads' → read replica",
          "Need both? They're not exclusive — a primary can be Multi-AZ AND have replicas",
          "Aurora behaves differently: replicas there are multi-purpose (both HA and reads)",
        ],
      },
    ],
    references: [
      { title: "Multi-AZ deployments", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html" },
      { title: "Working with read replicas", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html" },
    ],
  },
  {
    slug: "interface-vs-gateway-vpc-endpoints",
    title: "Gateway vs Interface VPC Endpoints: Private Access to AWS Services",
    description:
      "Gateway endpoints are free and cover S3/DynamoDB; interface endpoints (PrivateLink) cover everything else. Here's when each applies.",
    domain: "design-secure-architectures",
    topic: "network-security",
    updatedAt: "2026-10-25",
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          "VPC endpoints let private resources reach AWS APIs without traversing the public internet — no NAT gateway, no public IPs. There are two types with very different mechanics, and the exam tests both.",
        ],
      },
      {
        heading: "Gateway endpoints — S3 and DynamoDB only",
        paragraphs: [
          "A gateway endpoint adds a route-table entry directing traffic for the service over the AWS network. They exist only for S3 and DynamoDB, carry no hourly charge, and are the standard answer for eliminating NAT data-processing fees on S3/DynamoDB traffic.",
        ],
      },
      {
        heading: "Interface endpoints — almost everything else",
        paragraphs: [
          "An interface endpoint (powered by AWS PrivateLink) provisions ENIs with private IPs in your subnets. Most AWS services — SNS, SQS, Secrets Manager, KMS, CloudWatch, and dozens more — are reachable through interface endpoints. They bill hourly per AZ plus per-GB processed.",
        ],
      },
      {
        heading: "Choosing",
        list: [
          "S3 or DynamoDB access → gateway endpoint (free, no reason not to)",
          "Any other AWS service → interface endpoint (PrivateLink)",
          "Third-party SaaS private access → PrivateLink to their endpoint service",
          "Heavy S3 traffic through NAT → gateway endpoint removes data-processing charges (classic cost question)",
        ],
      },
    ],
    references: [
      { title: "VPC endpoints", url: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html" },
      { title: "Gateway endpoints for S3", url: "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html" },
    ],
  },
  {
    slug: "ebs-snapshot-vs-ami",
    title: "EBS Snapshot vs AMI: Backup Building Blocks Compared",
    description:
      "Snapshots back up a volume's data; AMIs capture the whole bootable instance configuration. Know which one a scenario needs.",
    domain: "design-resilient-architectures",
    topic: "disaster-recovery",
    updatedAt: "2026-10-25",
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Both are 'copies' of EC2 state, but they answer different questions: an EBS snapshot backs up a single volume's data; an AMI is a launchable image bundling the root volume snapshot plus configuration (instance type, permissions, block device mappings).",
        ],
      },
      {
        heading: "EBS snapshots",
        paragraphs: [
          "Point-in-time, incremental backups of one volume stored in S3. Copy them across AZs/Regions for DR, resize on restore, or share across accounts. Use snapshots to protect data volumes and to seed new volumes.",
        ],
      },
      {
        heading: "AMIs",
        paragraphs: [
          "An AMI packages the root volume snapshot + launch metadata so new instances boot identically. Use AMIs for golden images, Auto Scaling launch templates, and replicating a configured instance across Regions (copy AMI).",
        ],
      },
      {
        heading: "Which does the scenario need?",
        list: [
          "'Back up the data on this volume' → EBS snapshot",
          "'Launch identical instances in another Region/AZ' → AMI",
          "'Restore a database volume after corruption' → snapshot → new volume",
          "'Standardize a hardened image for the fleet' → AMI pipeline",
        ],
      },
    ],
    references: [
      { title: "Amazon EBS snapshots", url: "https://docs.aws.amazon.com/ebs/latest/userguide/EBSSnapshots.html" },
      { title: "Amazon Machine Images (AMI)", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html" },
    ],
  },
  {
    slug: "s3-standard-ia-vs-intelligent-tiering",
    title: "S3 Standard-IA vs Intelligent-Tiering: Infrequent Access Done Right",
    description:
      "Both cut storage cost for rarely-accessed data — but one is a fixed cheaper tier and the other adapts automatically. Here's how to choose.",
    domain: "design-cost-optimized-architectures",
    topic: "cost-optimized-storage",
    updatedAt: "2026-10-25",
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Both classes keep millisecond retrieval while lowering the per-GB storage price. The difference is predictability: Standard-IA is cheaper storage with a retrieval fee, always; Intelligent-Tiering charges a small monitoring fee but automatically moves objects between tiers as access patterns change.",
        ],
      },
      {
        heading: "Standard-IA — for known rare access",
        paragraphs: [
          "Use Standard-IA when you know objects are accessed infrequently — backups you might restore, disaster-recovery copies, documents retrieved a few times a year. Storage price is roughly half of Standard; each retrieval carries a per-GB fee. Minimum storage duration (30 days) and minimum object size (128 KB) apply.",
        ],
      },
      {
        heading: "Intelligent-Tiering — for unknown or changing access",
        paragraphs: [
          "Intelligent-Tiering monitors access and moves objects between a frequent-access tier (Standard-priced), an infrequent tier (~Standard-IA-priced), and optional archive tiers — with no retrieval fees. Pay a small per-object monitoring charge instead. It's the answer for 'unknown or changing access pattern' scenarios.",
        ],
      },
      {
        heading: "Exam shortcuts",
        list: [
          "'Known infrequent access' → Standard-IA",
          "'Unknown, changing, or unpredictable access' → Intelligent-Tiering",
          "'Can tolerate hours-long retrieval' → Glacier Flexible Retrieval or Deep Archive (cheaper still)",
          "'Must stay millisecond-latency' → eliminates the Glacier archive tiers",
        ],
      },
    ],
    references: [
      { title: "S3 storage classes", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html" },
      { title: "Intelligent-Tiering", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-dynamic-data-access" },
    ],
  },
);

ARTICLES.push({
  slug: "saa-c03-cheat-sheet",
  title: "SAA-C03 Cheat Sheet: AWS Service Selection Quick Reference",
  description:
    "A condensed decision guide for the SAA-C03 exam — which AWS service to pick for storage, databases, compute, messaging, networking, and DR scenarios.",
  domain: "design-high-performing-architectures",
  topic: "scalability-and-elasticity",
  updatedAt: "2026-10-25",
  readingMinutes: 8,
  sections: [
    {
      paragraphs: [
        "The SAA-C03 exam is a service-selection test at heart: a scenario plus constraints, and the 'best' AWS service. This cheat sheet compresses the most-tested decision patterns — bookmark it for your final review week.",
      ],
    },
    {
      heading: "Storage",
      list: [
        "Objects/files over HTTP, any scale → S3",
        "Block storage attached to one EC2 instance → EBS",
        "Shared POSIX file system across many instances → EFS",
        "Known infrequent S3 access → Standard-IA; unknown/changing → Intelligent-Tiering",
        "Multi-year archive, 12-hour retrieval OK → Glacier Deep Archive",
        "Slow long-distance S3 uploads → Transfer Acceleration",
      ],
    },
    {
      heading: "Databases",
      list: [
        "Relational, managed → RDS; high-end relational w/ better perf + replication → Aurora",
        "Key-value/documents, massive scale, single-digit-ms → DynamoDB",
        "Relational failover (no traffic served) → Multi-AZ; read scaling → read replica",
        "Multi-Region relational + fast DR promotion → Aurora Global Database",
        "In-memory cache → ElastiCache; sessions/leaderboards/persistence → Redis OSS, simple cache → Memcached",
        "Analytics/petabyte queries → Redshift",
      ],
    },
    {
      heading: "Compute",
      list: [
        "Full control, long-running → EC2; event-driven ≤15 min → Lambda",
        "Containers → ECS (simpler, AWS-native) or EKS (Kubernetes); launch without servers → Fargate",
        "HTTP routing/WAF/auth → ALB; TCP-UDP/static IPs/extreme throughput → NLB",
        "Stateful web tier → move sessions to DynamoDB or ElastiCache first",
      ],
    },
    {
      heading: "Messaging & decoupling",
      list: [
        "One task → one consumer, buffer spikes → SQS",
        "One event → many consumers → SNS (fan-out to per-consumer SQS queues)",
        "Route/filter events from many sources incl. SaaS → EventBridge",
        "Failed messages after retries → SQS dead-letter queue",
        "Real-time replayable streams → Kinesis Data Streams",
      ],
    },
    {
      heading: "Networking & security",
      list: [
        "Instance-level stateful firewall → security groups; subnet-level stateless → NACLs",
        "Private internet egress → NAT gateway; private S3/DynamoDB access → free gateway VPC endpoint; other AWS services → interface endpoint (PrivateLink)",
        "Prevent any public S3 access account-wide → Block Public Access",
        "TLS certificates on ALB/CloudFront → ACM; secrets w/ rotation → Secrets Manager; encrypt data → KMS",
        "Threat detection → GuardDuty; API audit → CloudTrail; config history → AWS Config; web exploits → WAF",
        "App user auth (sign-up/MFA/social login) → Cognito",
      ],
    },
    {
      heading: "Availability & DR",
      list: [
        "Survive an AZ loss → Multi-AZ + Multi-AZ DB",
        "Backups only → backup & restore (highest RTO/RPO, cheapest)",
        "Live data layer + provision app on failover → pilot light",
        "Reduced-capacity running stack → warm standby; full capacity both Regions → active/active",
        "Route by user geography → Route 53 geolocation; by latency → latency routing; DR failover → failover policy",
        "Launch identical instances elsewhere → AMI; back up a volume → EBS snapshot",
      ],
    },
    {
      heading: "Cost",
      list: [
        "Steady long-term usage → Savings Plans / Reserved Instances",
        "Interruptible batch → Spot Instances",
        "Cheapest EBS for cold data → sc1 Cold HDD",
        "Rightsizing recommendations → Compute Optimizer; spend alerts → Budgets",
        "Combine volume discounts across accounts → Organizations consolidated billing",
      ],
    },
  ],
  references: [
    {
      title: "AWS Certified Solutions Architect – Associate exam guide",
      url: "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html",
    },
  ],
});

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
