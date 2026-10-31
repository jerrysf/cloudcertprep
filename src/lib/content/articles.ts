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

ARTICLES.push({
  slug: "clf-c02-exam-guide",
  title: "CLF-C02 Exam Guide: Format, Cost, Domains, and How to Prepare",
  description:
    "Everything about the AWS Certified Cloud Practitioner (CLF-C02) exam: 65 questions, 90 minutes, $100, the four domain weights, scoring, and a realistic prep strategy for beginners.",
  domain: "clf-cloud-concepts",
  topic: "clf-cloud-essentials",
  updatedAt: "2026-10-27",
  readingMinutes: 8,
  sections: [
    {
      paragraphs: [
        "The AWS Certified Cloud Practitioner (CLF-C02) is AWS's foundational certification — designed for people with no deep technical background who need to demonstrate broad cloud literacy. It's the most-taken AWS exam and the usual first step before associate-level certifications.",
        "This guide summarizes the official exam details as published by AWS. Confirm current details on the official certification page before booking, since AWS revises exams periodically.",
      ],
    },
    {
      heading: "Exam format at a glance",
      list: [
        "65 questions — multiple choice (one correct of four) and multiple response (two or more of five+)",
        "90 minutes — about 1.4 minutes per question, generous compared to associate exams",
        "$100 USD — the cheapest AWS certification",
        "Passing score: 700 on a scaled range of 100–1000 (compensatory scoring — no per-domain minimum)",
        "50 scored + 15 unscored questions; unscored items aren't identified, so treat every question seriously",
        "Pearson VUE testing center or online proctored exam",
      ],
    },
    {
      heading: "The four domains",
      paragraphs: [
        "CLF-C02 weights breadth over depth. The official domain percentages:",
      ],
      list: [
        "Domain 1: Cloud Concepts — 24% (value of the cloud, Well-Architected basics, cloud adoption benefits)",
        "Domain 2: Security and Compliance — 30% (shared responsibility model, IAM basics, compliance resources)",
        "Domain 3: Cloud Technology and Services — 34% (the largest domain: core services, global infrastructure, deployment methods)",
        "Domain 4: Billing, Pricing, and Support — 12% (pricing models, billing tools, support plans, cost calculators)",
      ],
    },
    {
      heading: "What the exam actually tests",
      paragraphs: [
        "CLF-C02 asks 'what is this service for' more than 'how do you configure it.' Expect scenario snippets like 'a team needs to run code without managing servers' — and the answer is recognizing that Lambda is the fit. The shared responsibility model shows up repeatedly in different disguises; know exactly where the AWS/customer line sits for EC2 vs managed services.",
        "Billing questions are easy points: AWS Budgets vs Cost Explorer (alerts vs analysis), the Pricing Calculator for estimates, and the support plan tiers (Developer → Business → Enterprise) and what each unlocks.",
      ],
    },
    {
      heading: "A realistic prep plan",
      paragraphs: [
        "Most candidates with some IT exposure pass with 2–4 weeks of study; complete beginners should budget 4–6. The trap is over-studying depth — CLF rewards breadth, so cover every domain rather than mastering one.",
      ],
      list: [
        "Week 1: Cloud concepts + security — shared responsibility model until it's reflexive",
        "Week 2: Core services — compute, storage, databases, networking at recognition level",
        "Week 3: Billing/pricing/support + practice questions per domain",
        "Final days: timed practice sets, review every explanation (including why wrong answers are wrong), re-drill weak domains",
      ],
    },
    {
      heading: "After CLF-C02",
      paragraphs: [
        "Cloud Practitioner validates vocabulary and concepts — the next step depends on your role: Solutions Architect Associate for architecture, Developer Associate for builders, AI Practitioner for AI/ML fundamentals. Passing CLF also unlocks a 50%-off voucher on your next AWS exam, which meaningfully reduces the cost of the associate-level path.",
      ],
    },
  ],
  references: [
    {
      title: "AWS Certified Cloud Practitioner",
      url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    },
    {
      title: "AWS shared responsibility model",
      url: "https://aws.amazon.com/compliance/shared-responsibility-model/",
    },
  ],
});

ARTICLES.push({
  slug: "dva-c02-exam-guide",
  title: "DVA-C02 Exam Guide: Format, Cost, Domains, and How to Prepare",
  description:
    "Everything about the AWS Certified Developer – Associate (DVA-C02) exam: 65 questions, 130 minutes, $150, the four domain weights, scoring, and a developer-focused prep strategy.",
  domain: "dva-development-with-aws",
  topic: "dva-serverless-and-apis",
  updatedAt: "2026-10-27",
  readingMinutes: 8,
  sections: [
    {
      paragraphs: [
        "The AWS Certified Developer – Associate (DVA-C02) validates that you can build, deploy, and debug applications on AWS — SDK usage, Lambda, DynamoDB, APIs, CI/CD, and application security. It's aimed at developers with roughly a year of hands-on AWS experience.",
        "This guide summarizes official exam details — confirm the current version on the AWS certification page before booking.",
      ],
    },
    {
      heading: "Exam format at a glance",
      list: [
        "65 questions — multiple choice and multiple response",
        "130 minutes — about 2 minutes per question",
        "$150 USD",
        "Passing score: 720 on a scaled range of 100–1000 (compensatory scoring)",
        "Pearson VUE testing center or online proctored exam",
      ],
    },
    {
      heading: "The four domains",
      list: [
        "Domain 1: Development with AWS Services — 32% (SDKs, serverless compute, APIs, data stores, messaging)",
        "Domain 2: Security — 26% (IAM in code, Cognito, encryption, secrets)",
        "Domain 3: Deployment — 24% (CI/CD, IaC, deployment strategies, containers)",
        "Domain 4: Troubleshooting and Optimization — 18% (X-Ray, CloudWatch, caching, performance)",
      ],
    },
    {
      heading: "What the exam actually tests",
      paragraphs: [
        "DVA-C02 is API-and-service-behavior heavy. The questions rarely ask you to recall syntax — they describe a scenario and ask which service feature or configuration achieves the outcome. The recurring themes: Lambda limits and concurrency controls, DynamoDB capacity/streams/keys, SQS visibility timeouts and FIFO semantics, Cognito user pools vs identity pools, CodeDeploy strategies, and X-Ray tracing.",
        "Multiple-response questions ('Select TWO') are common — partial answers score zero, so elimination skills matter as much as recall.",
      ],
    },
    {
      heading: "A realistic prep plan",
      paragraphs: [
        "Hands-on beats reading here — write a small serverless app (Lambda + API Gateway + DynamoDB) and break it on purpose: hit a visibility-timeout bug, trigger a concurrency throttle, deploy with a canary config. Budget 4–8 weeks depending on experience.",
      ],
      list: [
        "Weeks 1–2: Domain 1 — Lambda, API Gateway, DynamoDB, SQS/SNS/EventBridge",
        "Week 3: Domain 2 — IAM roles in code, Cognito, KMS, Secrets Manager",
        "Week 4: Domain 3 — CodeBuild/CodePipeline/CodeDeploy, SAM, Beanstalk",
        "Week 5: Domain 4 — X-Ray, CloudWatch, DAX/ElastiCache, provisioned concurrency",
        "Final week: timed practice sets and review every missed explanation",
      ],
    },
  ],
  references: [
    {
      title: "AWS Certified Developer – Associate",
      url: "https://aws.amazon.com/certification/certified-developer-associate/",
    },
  ],
});

ARTICLES.push({
  slug: "aif-c01-exam-guide",
  title: "AIF-C01 Exam Guide: Format, Cost, Domains, and How to Prepare",
  description:
    "Everything about the AWS Certified AI Practitioner (AIF-C01) exam: 65 questions, 90 minutes, $100, the five domain weights, new question formats, and a prep strategy for AI fundamentals.",
  domain: "aif-ai-ml-fundamentals",
  topic: "aif-ml-foundations",
  updatedAt: "2026-10-27",
  readingMinutes: 8,
  sections: [
    {
      paragraphs: [
        "The AWS Certified AI Practitioner (AIF-C01) is AWS's foundational AI certification — validating fluency in AI/ML concepts, generative AI, Amazon Bedrock, and responsible AI practices. It's designed for people who use or evaluate AI solutions, not necessarily build them.",
        "This guide summarizes official exam details — confirm the current version on the AWS certification page before booking.",
      ],
    },
    {
      heading: "Exam format at a glance",
      list: [
        "65 questions — multiple choice, multiple response, plus ordering and matching formats unique to this exam",
        "90 minutes — about 1.4 minutes per question",
        "$100 USD",
        "Passing score: 700 on a scaled range of 100–1000",
        "50 scored + 15 unscored questions (unscored items aren't identified)",
        "Pearson VUE testing center or online proctored exam",
      ],
    },
    {
      heading: "The five domains",
      list: [
        "Domain 1: Fundamentals of AI and ML — 20%",
        "Domain 2: Fundamentals of Generative AI — 24%",
        "Domain 3: Applications of Foundation Models — 28% (the largest — Bedrock, RAG, prompt engineering, agents)",
        "Domain 4: Guidelines for Responsible AI — 14%",
        "Domain 5: Security, Compliance, and Governance for AI — 14%",
      ],
    },
    {
      heading: "What the exam actually tests",
      paragraphs: [
        "AIF-C01 is conceptual, not code-heavy. Expect 'which technique/service fits this scenario' questions: RAG vs fine-tuning vs prompt engineering for a knowledge task; embeddings and vector stores for semantic search; Textract vs Comprehend vs Rekognition for document/text/image tasks; Bedrock Guardrails for content safety.",
        "Watch the ordering/matching formats — e.g., rank inference options by latency or match responsible-AI dimensions to scenarios. They reward understanding relationships, not just memorization.",
      ],
    },
    {
      heading: "A realistic prep plan",
      paragraphs: [
        "Most candidates prepare in 2–6 weeks. Priorities by weight: spend the most time on Domain 3 (foundation model applications — RAG, prompt techniques, Bedrock features) and Domain 2 (generative concepts — tokens, embeddings, temperature).",
      ],
      list: [
        "Week 1: AI/ML basics — supervised vs unsupervised vs generative, model lifecycle",
        "Week 2: GenAI fundamentals — FMs, tokens, embeddings, inference parameters",
        "Week 3: Bedrock + FM applications — RAG, agents, prompt engineering, managed AI services",
        "Week 4: Responsible AI + security/governance — bias, transparency, PII, guardrails",
        "Final days: practice sets covering every domain, review all explanations",
      ],
    },
  ],
  references: [
    {
      title: "AWS Certified AI Practitioner",
      url: "https://aws.amazon.com/certification/certified-ai-practitioner/",
    },
  ],
});

ARTICLES.push({
  slug: "soa-c03-exam-guide",
  title: "SOA-C03 Exam Guide: CloudOps Engineer — Format, Domains, and How to Prepare",
  description:
    "Everything about the AWS Certified CloudOps Engineer – Associate (SOA-C03) exam — the renamed SysOps Administrator certification: 65 questions, 130 minutes, $150, the five domain weights, and a prep strategy.",
  domain: "soa-monitoring-logging-remediation",
  topic: "soa-monitoring-and-remediation",
  updatedAt: "2026-10-27",
  readingMinutes: 8,
  sections: [
    {
      paragraphs: [
        "The AWS Certified CloudOps Engineer – Associate (SOA-C03) is the renamed and updated successor to the SysOps Administrator – Associate (SOA-C02, retired September 29, 2025). It validates operating production workloads on AWS — monitoring, reliability, deployment, security, and networking.",
        "Key change from SOA-C02: five domains instead of six (Cost and Performance Optimization merged into Domain 1), plus new scope for containers (ECR/ECS/EKS), CDK, and multi-account/multi-Region operations.",
      ],
    },
    {
      heading: "Exam format at a glance",
      list: [
        "65 questions — multiple choice and multiple response",
        "130 minutes — about 2 minutes per question",
        "$150 USD",
        "Passing score: 720 on a scaled range of 100–1000",
        "Pearson VUE testing center or online proctored exam",
      ],
    },
    {
      heading: "The five domains",
      list: [
        "Domain 1: Monitoring, Logging, Analysis, Remediation, and Performance Optimization — 22%",
        "Domain 2: Reliability and Business Continuity — 22% (up from 16% in SOA-C02)",
        "Domain 3: Deployment, Provisioning, and Automation — 22% (up from 18%)",
        "Domain 4: Security and Compliance — 16%",
        "Domain 5: Networking and Content Delivery — 18%",
      ],
    },
    {
      heading: "What the exam actually tests",
      paragraphs: [
        "SOA-C03 is operations-first: CloudWatch metrics/alarms/logs (including agent-collected OS metrics like memory), Config-based compliance and EventBridge/SSM remediation, CloudFormation operations (drift, change sets), Systems Manager (Patch Manager, Session Manager, Automation), backup/DR implementation, and VPC/Route 53/ALB troubleshooting.",
        "New-for-C03 scope includes container operations and CloudFormation/CDK provisioning — if you prepared on SOA-C02 materials, top up with ECS/EKS operational basics and CDK stack management.",
      ],
    },
    {
      heading: "A realistic prep plan",
      paragraphs: [
        "Budget 4–8 weeks. The exam rewards operational instinct — know not just what CloudWatch does, but which alarm/metric/log combination detects a given failure mode.",
      ],
      list: [
        "Weeks 1–2: Domains 1–2 — CloudWatch end-to-end, EventBridge remediation, AWS Backup, Auto Scaling health checks",
        "Week 3: Domain 3 — CloudFormation drift/change sets, Systems Manager, patching, image pipelines, CDK basics",
        "Week 4: Domain 4 — IAM operations, Config rules, Security Hub, compliance enforcement",
        "Week 5: Domain 5 — VPC connectivity, Route 53, ALB health checks, CloudFront",
        "Final week: timed practice + hands-on console drills on weak services",
      ],
    },
  ],
  references: [
    {
      title: "AWS Certified CloudOps Engineer – Associate",
      url: "https://aws.amazon.com/certification/certified-cloudops-engineer-associate/",
    },
    {
      title: "SOA-C02 vs SOA-C03 domain comparison",
      url: "https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-comparison.html",
    },
  ],
});

ARTICLES.push({
  slug: "sap-c02-exam-guide",
  title: "SAP-C02 Exam Guide: Format, Cost, Domains, and How to Prepare",
  description:
    "Everything about the AWS Certified Solutions Architect – Professional (SAP-C02) exam: 75 questions, 180 minutes, $300, the four domain weights, and a strategy for AWS's hardest architecture exam.",
  domain: "sap-organizational-complexity",
  topic: "sap-multi-account-architecture",
  updatedAt: "2026-10-27",
  readingMinutes: 9,
  sections: [
    {
      paragraphs: [
        "The AWS Certified Solutions Architect – Professional (SAP-C02) is the pinnacle of the architecture track — validating the ability to design complex, multi-account, hybrid, and migration-scale solutions. It's widely regarded as the hardest AWS exam and the strongest signal for senior cloud architect roles.",
        "This guide summarizes official exam details — confirm the current version on the AWS certification page before booking.",
      ],
    },
    {
      heading: "Exam format at a glance",
      list: [
        "75 questions — long, multi-paragraph scenarios; multiple choice and multiple response",
        "180 minutes — about 2.4 minutes per question, but questions are dense",
        "$300 USD",
        "Passing score: 750 on a scaled range of 100–1000",
        "Pearson VUE testing center or online proctored exam",
      ],
    },
    {
      heading: "The four domains",
      list: [
        "Domain 1: Design Solutions for Organizational Complexity — 26% (multi-account, hybrid connectivity, organizational guardrails)",
        "Domain 2: Design for New Solutions — 29% (the largest — balancing security, reliability, performance, cost for greenfield)",
        "Domain 3: Continuous Improvement for Existing Solutions — 25% (evolving and optimizing live architectures)",
        "Domain 4: Accelerate Workload Migration and Modernization — 20% (6R strategies, DMS/SCT, discovery, cutover)",
      ],
    },
    {
      heading: "What the exam actually tests",
      paragraphs: [
        "SAP-C02 questions are multi-constraint scenarios: 'minimize cost AND meet RTO<15min AND work across 50 accounts.' The skill is reading requirements precisely and picking the option that satisfies ALL constraints — wrong answers usually fail exactly one constraint.",
        "Recurring themes: AWS Organizations + SCPs, Transit Gateway vs PrivateLink vs peering at scale, hybrid DNS (Route 53 Resolver endpoints), multi-Region DR tiers (backup → pilot light → warm standby → active/active), data-migration tools (DMS, SCT, Snow family, DataSync), and cost governance (CUR, allocation tags, Savings Plans).",
      ],
    },
    {
      heading: "A realistic prep plan",
      paragraphs: [
        "Plan for 8–12+ weeks, especially if your experience is single-account or single-Region. The biggest gap for most candidates is organizational/multi-account architecture and hybrid networking — study those even if they're not part of your day job.",
      ],
      list: [
        "Weeks 1–2: Domain 1 — Organizations, SCPs, TGW/DX/VPN, hybrid DNS, shared services patterns",
        "Weeks 3–4: Domain 2 — new-solution trade-offs: DR tiers, caching, data stores, global architectures",
        "Week 5: Domain 3 — optimization: cost, performance, security, reliability on running systems",
        "Week 6: Domain 4 — migration: discovery tools, DMS/SCT, Snow/DataSync, cutover patterns",
        "Final weeks: long timed sets — train stamina for 3-hour, 75-question scenarios",
      ],
    },
  ],
  references: [
    {
      title: "AWS Certified Solutions Architect – Professional",
      url: "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
    },
  ],
});

ARTICLES.push({
  slug: "dea-c01-exam-guide",
  title: "DEA-C01 Exam Guide: Format, Cost, Domains, and How to Prepare",
  description:
    "Everything about the AWS Certified Data Engineer – Associate (DEA-C01) exam: 65 questions, 130 minutes, $150, the four domain weights, and a data-engineering prep strategy.",
  domain: "dea-ingestion-transformation",
  topic: "dea-ingestion-and-etl",
  updatedAt: "2026-10-27",
  readingMinutes: 8,
  sections: [
    {
      paragraphs: [
        "The AWS Certified Data Engineer – Associate (DEA-C01) validates building and operating data pipelines on AWS — ingestion, transformation, storage, orchestration, and governance. It targets data engineers with hands-on pipeline experience.",
        "This guide summarizes official exam details — confirm the current version on the AWS certification page before booking.",
      ],
    },
    {
      heading: "Exam format at a glance",
      list: [
        "65 questions — multiple choice and multiple response",
        "130 minutes — about 2 minutes per question",
        "$150 USD",
        "Passing score: 720 on a scaled range of 100–1000",
        "Pearson VUE testing center or online proctored exam",
      ],
    },
    {
      heading: "The four domains",
      list: [
        "Domain 1: Data Ingestion and Transformation — 34% (the largest — Glue, Kinesis, MSK, Firehose, DMS)",
        "Domain 2: Data Store Management — 26% (S3 data lakes, Redshift, DynamoDB, partitioning, lifecycle)",
        "Domain 3: Data Operations and Support — 22% (orchestration, monitoring, data quality)",
        "Domain 4: Data Security and Governance — 18% (Lake Formation, encryption, access control, catalog)",
      ],
    },
    {
      heading: "What the exam actually tests",
      paragraphs: [
        "DEA-C01 is pipeline-architecture focused. Expect 'which service/pattern ingests this data at this velocity' and 'how do you transform/store this efficiently' scenarios. The recurring themes: Glue ETL and crawlers vs EMR, Kinesis vs MSK vs Firehose for streaming, S3 partitioning + columnar formats (Parquet) for Athena/Redshift Spectrum query cost, MWAA vs Step Functions for orchestration, and Lake Formation for fine-grained lake access.",
        "Data quality and schema evolution questions appear often — Glue Data Quality, schema registries, and handling schema drift are worth knowing concretely.",
      ],
    },
    {
      heading: "A realistic prep plan",
      paragraphs: [
        "Budget 5–8 weeks. Domain 1 alone is a third of the score — ingestion/transformation deserves the most time. Build one end-to-end mini pipeline if you can: Kinesis/Firehose → S3 → Glue → Athena is the exam's canonical shape.",
      ],
      list: [
        "Weeks 1–2: Domain 1 — streaming vs batch ingestion, Glue jobs/crawlers, MSK vs Kinesis, Firehose, DMS",
        "Week 3: Domain 2 — S3 layout/partitioning, Parquet, Redshift distribution/sort keys, DynamoDB patterns",
        "Week 4: Domain 3 — MWAA/Step Functions orchestration, CloudWatch for pipelines, Glue Data Quality",
        "Week 5: Domain 4 — Lake Formation permissions, KMS encryption, Glue Data Catalog",
        "Final week: timed practice sets + review every missed option",
      ],
    },
  ],
  references: [
    {
      title: "AWS Certified Data Engineer – Associate",
      url: "https://aws.amazon.com/certification/certified-data-engineer-associate/",
    },
  ],
});

ARTICLES.push({
  slug: "scs-c03-exam-guide",
  title: "SCS-C03 Exam Guide: Format, Cost, Domains, and How to Prepare",
  description:
    "Everything about the AWS Certified Security – Specialty (SCS-C03) exam — the current version that replaced SCS-C02 in December 2025: 65 questions, 170 minutes, $300, the six domain weights, and a security-focused prep strategy.",
  domain: "scs-detection",
  topic: "scs-detection-and-response",
  updatedAt: "2026-10-27",
  readingMinutes: 9,
  sections: [
    {
      paragraphs: [
        "The AWS Certified Security – Specialty (SCS-C03) is the current version of the security specialty — it replaced SCS-C02 on December 2, 2025. It validates deep security expertise across detection, incident response, infrastructure protection, IAM, data protection, and governance.",
        "Compared to SCS-C02, the new version reorganized domains: detection and incident response are now separate domains, IAM grew to 20%, and the governance domain was reframed as Security Foundations and Governance.",
      ],
    },
    {
      heading: "Exam format at a glance",
      list: [
        "65 questions — long scenario-based multiple choice and multiple response",
        "170 minutes — about 2.6 minutes per question",
        "$300 USD",
        "Passing score: 750 on a scaled range of 100–1000",
        "Pearson VUE testing center or online proctored exam",
      ],
    },
    {
      heading: "The six domains",
      list: [
        "Domain 1: Detection — 16% (GuardDuty, Security Hub, detection-focused logging)",
        "Domain 2: Incident Response — 14% (IR plans, isolation, forensics, credential compromise)",
        "Domain 3: Infrastructure Security — 18% (VPC security, WAF/Shield, edge protection)",
        "Domain 4: Identity and Access Management — 20% (the largest — policy evaluation, federation, boundaries)",
        "Domain 5: Data Protection — 18% (KMS, envelope encryption, secrets, certificate management)",
        "Domain 6: Security Foundations and Governance — 14% (SCPs, multi-account security baselines)",
      ],
    },
    {
      heading: "What the exam actually tests",
      paragraphs: [
        "SCS-C03 rewards precise security reasoning: which finding source detects a given anomaly (GuardDuty vs Inspector vs Macie vs Config), how to respond to a compromised credential, how envelope encryption actually works, which IAM policy construct (SCP vs permission boundary vs resource policy vs session policy) enforces a given constraint.",
        "The split between Detection (domain 1) and Incident Response (domain 2) matters: know the difference between generating a finding and executing a response runbook — GuardDuty/Security Hub vs SSM Incident Manager/IR workflows.",
      ],
    },
    {
      heading: "A realistic prep plan",
      paragraphs: [
        "Budget 8–10 weeks — this is a specialty exam and assumes real security experience. IAM is the heaviest domain and the most frequently failed: practice reading policy documents until evaluation logic is reflexive.",
      ],
      list: [
        "Weeks 1–2: Domain 4 (IAM) — policies, boundaries, SCPs, federation, cross-account access",
        "Week 3: Domain 5 (Data Protection) — KMS internals, envelope encryption, CloudHSM, secrets rotation",
        "Week 4: Domains 1–2 — GuardDuty/Security Hub/Detective, IR playbooks, forensics",
        "Week 5: Domain 3 — WAF/Shield/Network Firewall, VPC security layers, edge protection",
        "Week 6: Domain 6 — Organizations governance, security baselines, compliance tooling",
        "Final weeks: long timed sets — this exam's scenarios are dense",
      ],
    },
  ],
  references: [
    {
      title: "AWS Certified Security – Specialty",
      url: "https://aws.amazon.com/certification/certified-security-specialty/",
    },
  ],
});

ARTICLES.push({
  slug: "ans-c01-exam-guide",
  title: "ANS-C01 Exam Guide: Format, Cost, Domains, and How to Prepare",
  description:
    "Everything about the AWS Certified Advanced Networking – Specialty (ANS-C01) exam: 65 questions, 170 minutes, $300, the four domain weights, and a networking prep strategy.",
  domain: "ans-network-design",
  topic: "ans-hybrid-connectivity",
  updatedAt: "2026-10-27",
  readingMinutes: 8,
  sections: [
    {
      paragraphs: [
        "The AWS Certified Advanced Networking – Specialty (ANS-C01) validates deep networking expertise — hybrid connectivity, large-scale VPC design, DNS, and network security. It's the most specialized associate-adjacent AWS exam and pairs naturally with Solutions Architect Professional knowledge.",
        "Note: AWS has announced ANS-C01 retires on December 31, 2026 — if you're planning to take it, schedule accordingly.",
      ],
    },
    {
      heading: "Exam format at a glance",
      list: [
        "65 questions — scenario-heavy multiple choice and multiple response",
        "170 minutes — about 2.6 minutes per question",
        "$300 USD",
        "Passing score: 750 on a scaled range of 100–1000",
        "Pearson VUE testing center or online proctored exam",
      ],
    },
    {
      heading: "The four domains",
      list: [
        "Domain 1: Network Design — 30% (the largest — VPC design, hybrid architectures, edge/global design)",
        "Domain 2: Network Implementation — 26% (routing, Transit Gateway, Direct Connect, VPN, DNS)",
        "Domain 3: Network Management and Operations — 20% (monitoring, troubleshooting, automation)",
        "Domain 4: Network Security, Compliance, and Governance — 24% (firewalls, inspection, PrivateLink, TLS)",
      ],
    },
    {
      heading: "What the exam actually tests",
      paragraphs: [
        "ANS-C01 is unforgiving about connectivity details: Transit Gateway routing tables and attachments, Direct Connect (dedicated vs hosted, public vs private VIF, BGP), Site-to-Site VPN redundancy, Route 53 Resolver inbound/outbound endpoints for hybrid DNS, and when PrivateLink beats peering (overlapping CIDRs, unidirectional exposure).",
        "Operations questions focus on diagnosis: Reachability Analyzer, VPC Flow Logs analysis, and Network Firewall vs security groups vs NACLs for layered defense.",
      ],
    },
    {
      heading: "A realistic prep plan",
      paragraphs: [
        "Budget 8–10 weeks. Hybrid connectivity (DX + VPN + TGW interactions) is where most candidates lose points — lab it if possible: build two VPCs, a TGW, resolver endpoints, and break the routing on purpose.",
      ],
      list: [
        "Weeks 1–2: Domain 1 — VPC design at scale, multi-account networking, global/edge architecture",
        "Weeks 3–4: Domain 2 — TGW routing, DX VIFs/LAG, VPN, BGP, Route 53 resolver endpoints, PrivateLink",
        "Week 5: Domain 3 — Reachability Analyzer, Flow Logs, CloudWatch network metrics, automation",
        "Week 6: Domain 4 — Network Firewall, TLS inspection, WAF at the edge, governance",
        "Final weeks: timed scenario sets — practice tracing traffic hop by hop",
      ],
    },
  ],
  references: [
    {
      title: "AWS Certified Advanced Networking – Specialty",
      url: "https://aws.amazon.com/certification/certified-advanced-networking-specialty/",
    },
  ],
});

// ---- Comparison articles: messaging, IAM, network security, hybrid ----

ARTICLES.push({
  slug: "kinesis-vs-msk-vs-eventbridge",
  title: "Kinesis vs Amazon MSK vs EventBridge: Picking the Right Event Platform",
  description:
    "Streaming data, Kafka workloads, and event buses solve different problems. Learn when Kinesis, MSK, or EventBridge is the right answer — with decision shortcuts for exam scenarios.",
  domain: "design-high-performing-architectures",
  topic: "decoupling-and-messaging",
  updatedAt: "2026-10-27",
  readingMinutes: 7,
  sections: [
    {
      paragraphs: [
        "All three services move events, but they answer different questions. Kinesis is AWS's native streaming platform for high-throughput ordered data. MSK is managed Apache Kafka for teams standardized on Kafka's ecosystem. EventBridge is a serverless event bus for routing application events to targets with filtering — not a streaming store.",
        "Exam questions hinge on three signals: is this a durable replayable stream (Kinesis/MSK) or event routing (EventBridge)? Is Kafka compatibility required (MSK)? Is the answer 'fully managed, least operational effort' (usually EventBridge or Kinesis Data Streams/Firehose over MSK)?",
      ],
    },
    {
      heading: "Kinesis: native AWS streaming",
      paragraphs: [
        "Kinesis Data Streams stores an ordered, replayable stream per shard (1 MB/s in, 2 MB/s out per shard). Consumers use the KCL or Lambda to process records; retention is 24 hours to 365 days. Choose it for clickstream ingestion, real-time analytics pipelines, and ordering-sensitive event logs.",
        "Kinesis Data Firehose is the delivery cousin — buffers and delivers streams to S3, Redshift, or OpenSearch with optional Lambda transforms. If the requirement ends at 'land data in a destination,' Firehose is the answer.",
      ],
    },
    {
      heading: "Amazon MSK: when it must be Kafka",
      paragraphs: [
        "MSK runs real Apache Kafka clusters — brokers, ZooKeeper/KRaft, the whole ecosystem. Choose MSK when migrating existing Kafka workloads, when teams depend on Kafka clients/tools (Kafka Connect, ksqlDB), or when multi-cluster replication patterns are already Kafka-based.",
        "The trade-off: more operational surface than Kinesis. MSK Serverless reduces this, but if there's no Kafka requirement, native Kinesis is usually the 'less operations' answer.",
      ],
    },
    {
      heading: "EventBridge: the routing bus",
      paragraphs: [
        "EventBridge ingests events from AWS services, SaaS partners, and custom apps, then routes them to 20+ targets via rules — with content filtering, schema registry, and event replay. It's the default for decoupled 'X happened → notify these consumers' integration, scheduled tasks, and cross-service choreography.",
        "It's not a stream: no ordering guarantees across the bus, no shard-based replay model for bulk analytics. If the question says 'route events to different targets based on content,' think EventBridge.",
      ],
    },
    {
      heading: "Decision shortcuts",
      list: [
        "Ordered replayable stream, real-time consumers → Kinesis Data Streams",
        "Deliver streaming data to S3/Redshift/OpenSearch, no code → Kinesis Data Firehose",
        "Existing Kafka ecosystem or migration → Amazon MSK",
        "Route events between apps/AWS services with filtering → EventBridge",
        "Scheduled jobs or cron-like triggers → EventBridge Scheduler",
        "Simple decoupling of one producer/consumer → SQS (not these three)",
      ],
      paragraphs: [
        "Watch for hybrid answers: producers often publish to Kinesis while EventBridge handles the application-integration layer — they coexist rather than compete.",
      ],
    },
  ],
  references: [
    { title: "Amazon Kinesis Data Streams", url: "https://docs.aws.amazon.com/streams/latest/dev/introduction.html" },
    { title: "Amazon MSK", url: "https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html" },
    { title: "Amazon EventBridge", url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html" },
  ],
});

ARTICLES.push({
  slug: "scp-vs-permission-boundary",
  title: "SCP vs Permission Boundary: Two Guardrails That Look Alike but Aren't",
  description:
    "Service Control Policies and permission boundaries both cap what IAM identities can do — but they apply at different layers, in different scopes, and fail differently. Here's how to tell them apart.",
  domain: "design-secure-architectures",
  topic: "iam-and-access-control",
  updatedAt: "2026-10-27",
  readingMinutes: 6,
  sections: [
    {
      paragraphs: [
        "Both SCPs and permission boundaries are maximum-permission guardrails — neither grants permissions on its own. The exam tests whether you know WHERE each applies: SCPs guard accounts (and OUs/roots) in AWS Organizations; permission boundaries guard individual IAM users and roles.",
        "The effective permission is always the intersection: for an IAM entity to act, its identity policy must allow it AND no guardrail must deny it.",
      ],
    },
    {
      heading: "Service Control Policies — account-level ceiling",
      paragraphs: [
        "SCPs attach to the organization root, OUs, or individual accounts in AWS Organizations. They set the maximum permissions for ALL principals in affected accounts — including the root user. Deny-list strategy (default allow, SCPs carve out) is the common pattern: 'deny leaving these regions,' 'deny disabling CloudTrail.'",
        "Key facts: SCPs don't affect service-linked roles; they apply to IAM users/roles including root; a 'deny' wins over any allow; management-account SCPs don't limit the management account itself.",
      ],
    },
    {
      heading: "Permission boundaries — entity-level ceiling",
      paragraphs: [
        "A permission boundary is a managed policy attached to a single IAM user or role that caps what that entity can do — even if its identity policies grant more. The classic use case: let developers create IAM roles for their Lambda functions, but only if the new roles carry a boundary that prevents privilege escalation.",
        "Boundaries don't apply to resource-based policies for access evaluation in the same way — a resource policy can grant access to the entity within boundary limits, but the boundary still caps what identity-policy permissions can do.",
      ],
    },
    {
      heading: "Side-by-side",
      list: [
        "Scope: SCP = org/OU/account; boundary = one user or role",
        "Managed by: SCP = organization admin; boundary = IAM admin in the account",
        "Applies to root user: SCP yes; boundary no (root has no policies)",
        "Use for: SCP = governance across many accounts; boundary = safe IAM delegation",
        "Evaluation: both intersect with identity policies — allow requires all three layers",
      ],
      paragraphs: [
        "Exam shortcut: 'prevent privilege escalation when delegating role creation' → permission boundary. 'Enforce rules across every account in the org' → SCP. Both can appear in the same scenario — layered, not competing.",
      ],
    },
  ],
  references: [
    { title: "Service control policies", url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html" },
    { title: "Permission boundaries", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html" },
  ],
});

ARTICLES.push({
  slug: "waf-vs-network-firewall-vs-shield",
  title: "AWS WAF vs Network Firewall vs Shield: Three Layers of Network Defense",
  description:
    "WAF filters application traffic, Network Firewall inspects network flows, Shield absorbs DDoS. Understand which service answers which threat — and how they layer together.",
  domain: "design-secure-architectures",
  topic: "network-security",
  updatedAt: "2026-10-27",
  readingMinutes: 6,
  sections: [
    {
      paragraphs: [
        "These three services get confused because all are 'firewall-ish.' The clean separation: Shield protects against DDoS (layers 3/4 volumetric + L7 with Advanced), WAF filters HTTP(S) requests at layer 7, and Network Firewall is a stateful network-layer inspection engine for VPC traffic.",
      ],
    },
    {
      heading: "AWS WAF — the web request gatekeeper",
      paragraphs: [
        "WAF attaches to CloudFront, ALB, API Gateway, AppSync, and Cognito. It inspects HTTP requests against rules: managed rule groups (OWASP Top 10, known bad inputs, IP reputation), rate-based rules, geo-matching, and custom conditions.",
        "Choose WAF for: blocking SQLi/XSS patterns, rate-limiting abusive clients, geo-blocking, bot control. It sees requests only after TLS termination at the attached resource — it's an application-layer control.",
      ],
    },
    {
      heading: "AWS Network Firewall — the VPC traffic inspector",
      paragraphs: [
        "Network Firewall deploys into a dedicated subnet and inspects traffic flowing through it — stateful rules, domain filtering, Suricata-compatible IPS signatures, and TLS inspection (with ACM certs). It's the managed answer to 'run IDS/IPS across my VPCs,' typically in a centralized inspection VPC behind Transit Gateway.",
        "Choose it for: egress filtering to approved domains, protocol enforcement, centralized deep-packet inspection across many VPCs. It operates at layers 3–7 on network flows, not just web requests.",
      ],
    },
    {
      heading: "AWS Shield — the DDoS absorber",
      paragraphs: [
        "Shield Standard is automatic and free on CloudFront, Route 53, ALB, and Global Accelerator — it absorbs common L3/L4 attacks. Shield Advanced adds 24/7 DDoS response team access, cost protection during attacks, enhanced visibility, and L7 mitigation when combined with WAF.",
        "Shield isn't a firewall you configure rules for — it's always-on mitigation capacity. The decision is usually Standard (free, default) vs Advanced (paid, for high-availability or regulated workloads).",
      ],
    },
    {
      heading: "Layering them together",
      list: [
        "Edge DDoS protection for a public web app → Shield Standard on CloudFront + WAF rules",
        "Regulated workload needing DRT support + cost protection → Shield Advanced",
        "Inspect ALL outbound VPC traffic to unapproved domains → Network Firewall",
        "Block SQL injection on an ALB → WAF (Network Firewall could, but WAF is the designed answer)",
        "Defense in depth for a large org → all three, each covering its layer",
      ],
      paragraphs: [
        "Exam tells: 'HTTP request filtering' → WAF. 'VPC-level IDS/IPS or domain-based egress control' → Network Firewall. 'DDoS resilience or response team' → Shield.",
      ],
    },
  ],
  references: [
    { title: "AWS WAF", url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html" },
    { title: "AWS Network Firewall", url: "https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html" },
    { title: "AWS Shield", url: "https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html" },
  ],
});

ARTICLES.push({
  slug: "direct-connect-vs-site-to-site-vpn",
  title: "Direct Connect vs Site-to-Site VPN: Choosing Your Hybrid Link",
  description:
    "Dedicated private circuit or encrypted tunnel over the internet? Compare latency, cost, setup time, encryption, and resilience — with the exam's decision cues for hybrid connectivity.",
  domain: "ans-network-design",
  topic: "ans-hybrid-connectivity",
  updatedAt: "2026-10-27",
  readingMinutes: 6,
  sections: [
    {
      paragraphs: [
        "Both connect your on-premises network to AWS, but they trade differently. Site-to-Site VPN is an IPsec tunnel over the public internet — fast to provision, cheap, dependent on internet quality. Direct Connect is a dedicated physical circuit via a DX location — consistent bandwidth and latency, private, but takes weeks to provision and costs more.",
        "The standard enterprise answer is often 'both': DX as the primary path, VPN as encrypted backup or failover.",
      ],
    },
    {
      heading: "Site-to-Site VPN: the quick encrypted tunnel",
      list: [
        "Two IPsec tunnels per connection for built-in failover",
        "Provisions in minutes — just a customer gateway device and config",
        "Runs over the internet — bandwidth/latency vary with your ISP path",
        "Encapsulation is encrypted end to end (IPsec)",
        "Throughput ~1.25 Gbps per tunnel on a VGW (more via TGW/ECMP)",
      ],
      paragraphs: [
        "Choose VPN for: quick setup, low traffic volumes, backup connectivity to DX, or reaching resources where a DX location isn't feasible.",
      ],
    },
    {
      heading: "Direct Connect: the dedicated circuit",
      list: [
        "Private physical connection — bypasses the internet entirely",
        "Consistent low latency and bandwidth (dedicated 1/10/100 Gbps or hosted 50 Mbps–10 Gbps)",
        "Weeks to provision — involves a carrier and a DX location",
        "NOT encrypted by default — add MACsec (supported ports) or run a VPN over DX",
        "Virtual interfaces: private VIF (VPCs), public VIF (AWS public endpoints), transit VIF (TGW)",
      ],
      paragraphs: [
        "Choose DX for: steady high-throughput workloads, latency-sensitive apps, compliance requiring private paths, or reducing data-transfer costs at scale.",
      ],
    },
    {
      heading: "Resilience and the hybrid answer",
      paragraphs: [
        "A single DX connection is a single point of failure — the reference design is two connections at separate DX locations, optionally with a Site-to-Site VPN as tertiary failover. VPN over a public VIF on DX adds encryption to a private path.",
      ],
      list: [
        "'Provision in days, low cost, moderate bandwidth' → Site-to-Site VPN",
        "'Consistent latency/bandwidth, private connectivity' → Direct Connect",
        "'Encrypt traffic on DX' → MACsec on supported ports or VPN over public VIF",
        "'Resilient production hybrid' → dual DX + VPN backup",
        "'Backup when DX fails' → Site-to-Site VPN as failover path",
      ],
    },
  ],
  references: [
    { title: "AWS Direct Connect", url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html" },
    { title: "AWS Site-to-Site VPN", url: "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html" },
    { title: "Direct Connect resilience", url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/resilient-dx.html" },
  ],
});

ARTICLES.push({
  slug: "clf-c02-cheat-sheet",
  title: "CLF-C02 Cheat Sheet: Cloud Practitioner Quick Reference",
  description:
    "A condensed CLF-C02 review sheet: cloud concepts, shared responsibility, core services by category, billing tools, and support plans — the facts the exam repeats.",
  domain: "clf-cloud-concepts",
  topic: "clf-cloud-essentials",
  updatedAt: "2026-10-27",
  readingMinutes: 7,
  sections: [
    {
      paragraphs: [
        "CLF-C02 is vocabulary-heavy: most questions are 'which service/concept is described here.' This sheet compresses the highest-frequency facts — scan it the week before the exam.",
      ],
    },
    {
      heading: "Cloud concepts",
      list: [
        "Six cloud advantages: trade CapEx for variable expense, economies of scale, stop guessing capacity, speed/agility, stop running data centers, go global in minutes",
        "Well-Architected pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability",
        "CAF perspectives: Business, People, Governance, Platform, Security, Operations",
        "Deployment models: cloud, hybrid (Outposts, Direct Connect, VPN), on-premises",
      ],
    },
    {
      heading: "Shared responsibility model",
      list: [
        "AWS = security OF the cloud: physical, hardware, global infrastructure, managed-service OS/patching",
        "Customer = security IN the cloud: data, IAM, network config, (on EC2) guest OS",
        "More managed = less customer responsibility: EC2 > containers > Lambda",
      ],
    },
    {
      heading: "Core services in one line",
      list: [
        "EC2 — virtual servers; S3 — object storage; EBS — block storage for EC2; EFS — shared file storage",
        "RDS/Aurora — relational DB; DynamoDB — NoSQL key-value; Redshift — data warehouse",
        "Lambda — serverless functions; Elastic Beanstalk — deploy apps fast; ECS/EKS — containers",
        "VPC — your network; Route 53 — DNS; CloudFront — CDN; ELB — load balancing",
        "IAM — users/roles/policies; Organizations — multi-account; CloudTrail — API audit; CloudWatch — metrics/logs/alarms",
        "SNS — pub/sub notifications; SQS — message queue; KMS — encryption keys; WAF/Shield — web filtering/DDoS",
      ],
    },
    {
      heading: "Billing & pricing",
      list: [
        "Cost Explorer — analyze/visualize spend & forecast; Budgets — threshold alerts on actual or forecasted spend",
        "Pricing Calculator — estimate BEFORE you build; CUR — raw detailed billing data to S3",
        "Free tier: 12-month (e.g., t2/t3.micro), always-free (e.g., Lambda 1M requests), trials",
        "EC2 pricing: On-Demand (flexible), Reserved/Savings Plans (1-3yr commit, up to ~72% off), Spot (interruptible, up to ~90% off), Dedicated Hosts (licensing/compliance)",
        "Consolidated billing (Organizations) — volume discounts pool across accounts",
      ],
    },
    {
      heading: "Support plans",
      list: [
        "Basic — free: docs, forums, limited Trusted Advisor checks",
        "Developer — business-hours email, one primary contact, general guidance",
        "Business — 24/7 phone/chat/email, full Trusted Advisor, production guidance (NO TAM — the trap)",
        "Enterprise — adds a Technical Account Manager + concierge team",
      ],
    },
    {
      heading: "Last-week checklist",
      list: [
        "Know which tool does what: CloudTrail (who did it) vs CloudWatch (how it's performing) vs Config (what changed)",
        "Multi-AZ = availability; read replica = scale/DR; edge location = latency",
        "'Cheapest way to X' answers usually involve serverless or managed services",
        "Global services: IAM, CloudFront, Route 53, WAF — everything else is regional",
      ],
    },
  ],
  references: [
    {
      title: "AWS Certified Cloud Practitioner",
      url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    },
  ],
});

ARTICLES.push({
  slug: "dva-c02-cheat-sheet",
  title: "DVA-C02 Cheat Sheet: Developer Associate Quick Reference",
  description:
    "A condensed DVA-C02 review sheet: Lambda limits and behaviors, DynamoDB gotchas, API Gateway features, SQS/SNS/EventBridge patterns, IAM must-knows, and CI/CD services.",
  domain: "dva-development-with-aws",
  topic: "dva-serverless-and-apis",
  updatedAt: "2026-10-27",
  readingMinutes: 7,
  sections: [
    {
      paragraphs: [
        "DVA-C02 rewards service-behavior precision — limits, defaults, and which feature solves which problem. This sheet compresses the repeated exam signals by service.",
      ],
    },
    {
      heading: "Lambda — the numbers that matter",
      list: [
        "Timeout max: 15 minutes. Memory: 128 MB–10 GB (CPU scales with memory). /tmp: 512 MB–10 GB",
        "Deployment: 50 MB zipped direct, 250 MB unzipped (with layers), 10 GB container image",
        "Concurrency: default 1,000/region (soft); reserved = guarantee+ceiling; provisioned = pre-warmed (kills cold starts)",
        "Versions are immutable; aliases point at versions — weighted alias routing enables canary/blue-green via CodeDeploy",
        "Destinations: async success/failure routing (SQS/SNS/Lambda/EventBridge); DLQ for sync-invoked failures",
        "Environment variables are encrypted at rest by KMS but visible in console — use Secrets Manager for real secrets",
      ],
    },
    {
      heading: "DynamoDB — the gotchas",
      list: [
        "Primary key: partition key (required) + optional sort key — no joins, no ad-hoc query by non-key attrs without GSI/scan",
        "GSI: any attributes, can be added anytime, own RCU/WCU; LSI: same PK, different sort, table-creation only",
        "On-demand vs provisioned capacity; DAX = in-memory cache (ms→µs); Streams capture item changes (Lambda triggers)",
        "Eventually consistent by default; strongly consistent reads cost 2x RCU — the classic cost/accuracy trade",
        "Point-in-time recovery, global tables (multi-region), TTL for free expiry",
      ],
    },
    {
      heading: "SQS / SNS / EventBridge",
      list: [
        "SQS standard: at-least-once, best-effort ordering, ~unlimited throughput; FIFO: exactly-once + strict order (300 msg/s base)",
        "Visibility timeout ≠ retention — message hidden while being processed; DLQ after max receives",
        "Long polling (waitTimeSeconds 1–20s) reduces empty receives and cost — always prefer it",
        "SNS = fan-out pub/sub to many subscribers; EventBridge = event bus with content-based routing + SaaS/native integrations + schema registry",
        "Fan-out pattern: SNS → multiple SQS queues (each consumer gets its own copy)",
      ],
    },
    {
      heading: "API Gateway",
      list: [
        "REST vs HTTP API: HTTP is cheaper/faster (proxy-style); REST adds keys, usage plans, request validation, caching, private endpoints",
        "WebSocket API: two-way real-time (chat); routes $connect/$disconnect/custom",
        "Authorizers: IAM, Cognito user pools, Lambda (custom); resource policies for cross-account/IP rules",
        "Throttling default 10k rps/account; stages + stage variables; canary deployments on stages",
      ],
    },
    {
      heading: "IAM & security must-knows",
      list: [
        "Never embed credentials — EC2 instance profile, Lambda execution role, ECS task role",
        "Cognito: user pools = authN + JWTs; identity pools = AWS credentials for federated/guest access",
        "JWT verification: JWKS public keys + validate iss/aud/exp — verify signature, not just decode",
        "KMS: envelope encryption; SSM Parameter Store vs Secrets Manager (rotation built-in)",
      ],
    },
    {
      heading: "CI/CD & observability",
      list: [
        "CodeCommit (source) → CodeBuild (build/test) → CodeDeploy (deploy) → CodePipeline (orchestrates all)",
        "CodeDeploy styles: in-place/blue-green on EC2; canary/linear traffic shifting on Lambda & ECS; auto-rollback on CloudWatch alarms",
        "X-Ray: end-to-end traces + service map + subsegments — 'where is latency' answers",
        "Elastic Beanstalk: upload code, AWS manages infra — 'fastest way to deploy without managing servers (non-Lambda)'",
        "SAM = IaC for serverless (template shorthand for Lambda/API/DynamoDB)",
      ],
    },
  ],
  references: [
    {
      title: "AWS Certified Developer – Associate",
      url: "https://aws.amazon.com/certification/certified-developer-associate/",
    },
  ],
});

// ---- Comparison articles batch 2 ----

ARTICLES.push({
  slug: "secrets-manager-vs-parameter-store",
  title: "Secrets Manager vs Parameter Store: Where Should Each Value Live?",
  description:
    "Both store strings securely — but rotation, cross-account sharing, cost, and integrations differ. Here's when Parameter Store is enough and when Secrets Manager earns its price.",
  domain: "dva-security",
  topic: "dva-app-security",
  updatedAt: "2026-10-28",
  readingMinutes: 5,
  sections: [
    {
      paragraphs: [
        "Both services store configuration values and secrets encrypted with KMS, retrievable via the same AWS SDKs. The exam distinction comes down to three things: automatic rotation, cost model, and purpose-built secret features.",
      ],
    },
    {
      heading: "Parameter Store — the config workhorse",
      list: [
        "Free standard tier: config values, feature flags, AMI IDs, plain strings",
        "SecureString tier encrypts with your KMS key — good enough for many secrets",
        "Hierarchical paths (/prod/db/host) with IAM-controlled access per path",
        "No built-in rotation — you'd wire EventBridge + Lambda yourself",
        "Advanced tier ($) raises the 4KB limit to 8KB and adds parameter policies",
      ],
    },
    {
      heading: "Secrets Manager — secrets with lifecycle",
      list: [
        "Automatic rotation built in for RDS/Redshift/DocumentDB — Lambda-based for others",
        "Random secret generation, cross-account access to secrets, and fine-grained resource policies",
        "$0.40 per secret per month + API calls — priced for real secrets, not config sprawl",
        "Version staging labels (AWSCURRENT/AWSPREVIOUS) let apps roll through rotations safely",
      ],
      paragraphs: [
        "The rule of thumb: rotating credentials for AWS databases → Secrets Manager, no contest. Plain configuration and non-rotating values → Parameter Store's free tier. SecureString covers the middle ground when you need encryption but not rotation.",
      ],
    },
    {
      heading: "Decision shortcuts",
      list: [
        "'Automatically rotate RDS credentials' → Secrets Manager (Parameter Store can't)",
        "'Store non-secret config cheaply' → Parameter Store",
        "'Encrypted value, no rotation needed, cost-sensitive' → Parameter Store SecureString",
        "'Share a secret across AWS accounts' → Secrets Manager resource policy",
        "'Lambda needs a secret at runtime' → either works via SDK; rotation need decides",
      ],
    },
  ],
  references: [
    { title: "AWS Secrets Manager", url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html" },
    { title: "SSM Parameter Store", url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/system-manager-parameter-store.html" },
  ],
});

ARTICLES.push({
  slug: "sqs-fifo-vs-standard",
  title: "SQS FIFO vs Standard Queues: Ordering, Dedup, and Throughput",
  description:
    "Standard queues are fast and sloppy; FIFO queues are ordered and exactly-once but capped. Know the three guarantees, the throughput limits, and when each wins.",
  domain: "design-high-performing-architectures",
  topic: "decoupling-and-messaging",
  updatedAt: "2026-10-28",
  readingMinutes: 5,
  sections: [
    {
      paragraphs: [
        "SQS standard and FIFO queues differ on exactly three axes — and the exam hammers all three: message ordering, delivery guarantee, and throughput ceiling.",
      ],
    },
    {
      heading: "Standard: throughput over order",
      list: [
        "Nearly unlimited TPS — scales automatically with demand",
        "At-least-once delivery — duplicates WILL happen; consumers must be idempotent",
        "Best-effort ordering — messages usually arrive in order, not guaranteed",
        "Cheaper per request and the right default for most decoupling",
      ],
    },
    {
      heading: "FIFO: correctness over speed",
      list: [
        "Exactly-once processing via deduplication (content-based or MessageDeduplicationId)",
        "Strict ordering within a message group (MessageGroupId) — order across groups is parallel",
        "Throughput: ~300 msg/s without batching, ~3,000 msg/s with batching — the hard ceiling that decides most questions",
        "Higher per-request cost than standard",
      ],
      paragraphs: [
        "The subtlety: FIFO ordering is per message GROUP, not queue-wide. Multiple group IDs give you ordered lanes with parallel throughput — high-cardinality group IDs preserve ordering AND scale.",
      ],
    },
    {
      heading: "Decision shortcuts",
      list: [
        "'Process payments/events exactly once in order' → FIFO",
        "'Decouple microservices, duplicates are handled idempotently' → Standard",
        "'Need >3,000 msg/s sustained' → Standard (or shard FIFO by group ID)",
        "'Order matters per customer/session, but many independent customers' → FIFO with per-entity group IDs",
        "'Just need a buffer between producer and consumer' → Standard",
      ],
      paragraphs: [
        "Common trap: choosing FIFO 'to be safe' when ordering isn't required — you pay more and cap throughput for a guarantee nobody needs.",
      ],
    },
  ],
  references: [
    { title: "Standard vs FIFO queues", url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues.html" },
    { title: "FIFO queue details", url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html" },
  ],
});

ARTICLES.push({
  slug: "cloudwatch-vs-cloudtrail-vs-config",
  title: "CloudWatch vs CloudTrail vs AWS Config: Monitoring, Auditing, and Change Tracking",
  description:
    "The three most-confused AWS observability services: CloudWatch tells you how it's running, CloudTrail tells you who did what, and Config tells you what changed. Full breakdown.",
  domain: "clf-security-compliance",
  topic: "clf-security-basics",
  updatedAt: "2026-10-28",
  readingMinutes: 5,
  sections: [
    {
      paragraphs: [
        "These three services appear in almost every CLF-C02 exam — and confuse even experienced engineers because their names all sound like 'watching things.' The clean split: performance, activity, configuration.",
      ],
    },
    {
      heading: "CloudWatch — how is it performing?",
      list: [
        "Metrics (CPU, latency, custom metrics), alarms on thresholds, dashboards",
        "Logs from Lambda, applications, agents — with metric filters and Insights queries",
        "Answers: 'is CPU high?', 'why did this alarm fire?', 'show me error counts'",
        "Time-series focused — it's about state over time, not events or history",
      ],
    },
    {
      heading: "CloudTrail — who did what?",
      list: [
        "Every API call in the account: who, what action, when, from where, on what resource",
        "Event history (90 days free) and organization trails to S3 for permanent audit",
        "Answers: 'who deleted the bucket?', 'who modified the security group?', 'was this API call made?'",
        "The forensic/audit layer — enabled by default at the account level",
      ],
    },
    {
      heading: "AWS Config — what is the configuration state?",
      list: [
        "Configuration timeline: snapshots of resource settings and how they changed over time",
        "Config rules evaluate compliance: 'are all buckets encrypted?', 'is MFA enabled?'",
        "Remediation actions can auto-fix drift via SSM documents",
        "Answers: 'when did this SG rule change?', 'is this resource compliant?', 'what did the VPC look like last week?'",
      ],
    },
    {
      heading: "The scenario test",
      list: [
        "'Who terminated the instance?' → CloudTrail (API activity)",
        "'Why did the app slow down at 3am?' → CloudWatch (metrics/logs)",
        "'When did the security group start allowing 0.0.0.0/0?' → Config (config timeline)",
        "'Alert me when any bucket becomes public' → Config rule (+ optional remediation)",
        "'Notify me when root is used' → CloudTrail event + EventBridge → alert",
      ],
      paragraphs: [
        "They compose in practice: CloudTrail captures the event, Config tracks the resulting state change, and CloudWatch alarms on the operational impact.",
      ],
    },
  ],
  references: [
    { title: "Amazon CloudWatch", url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html" },
    { title: "AWS CloudTrail", url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html" },
    { title: "AWS Config", url: "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html" },
  ],
});

ARTICLES.push({
  slug: "soa-c03-cheat-sheet",
  title: "SOA-C03 Cheat Sheet: CloudOps Engineer Associate Quick Reference",
  description:
    "A condensed SOA-C03 review sheet: CloudWatch monitoring and remediation, backup/DR, deployment automation, security operations, and hybrid networking — the operational facts the exam repeats.",
  domain: "soa-monitoring-logging-remediation",
  topic: "soa-monitoring-and-remediation",
  updatedAt: "2026-10-27",
  readingMinutes: 7,
  sections: [
    {
      paragraphs: [
        "SOA-C03 is the renamed SysOps Administrator exam — it tests operating AWS in production: metrics, alarms, remediation, backup/restore, and safe deployments. This sheet compresses the highest-frequency operational facts.",
      ],
    },
    {
      heading: "CloudWatch essentials",
      list: [
        "Default EC2 metrics: CPU, network, disk I/O, status checks — every 5 min (1 min with detailed monitoring)",
        "Memory and disk usage need the CloudWatch agent (or Systems Manager + unified agent config)",
        "Alarms states: OK / ALARM / INSUFFICIENT_DATA; actions: SNS, Auto Scaling, EC2 recover/reboot",
        "Logs Insights queries log groups; Contributor Insights finds top talkers",
        "EventBridge matches events/schedules → targets (SNS, Lambda, SSM Automation)",
      ],
    },
    {
      heading: "Remediation patterns",
      list: [
        "Config rule + EventBridge + SSM Automation = detect → auto-remediate (e.g., public S3 bucket → make private)",
        "CloudWatch alarm → SSM runbook for instance remediation",
        "SSM Session Manager = shell access without SSH keys, bastion, or port 22",
        "Patch Manager = patch baselines + maintenance windows + compliance reporting",
      ],
    },
    {
      heading: "Backup & reliability",
      list: [
        "AWS Backup: central policies for EBS/RDS/DynamoDB/EFS/S3, cross-account + cross-region copies, Vault Lock (WORM)",
        "DR options cheapest→strongest: Backup & Restore → Pilot Light → Warm Standby → Multi-site Active-Active",
        "RPO = data loss tolerance; RTO = downtime tolerance — always check which the question optimizes",
        "ELB health checks vs ASG: use ELB health check type so failed instances get replaced",
      ],
    },
    {
      heading: "Deployment & provisioning",
      list: [
        "CloudFormation: change sets preview changes; drift detection finds out-of-band changes; StackSets deploy across accounts/regions",
        "SSM documents/Automation: runbooks for ops tasks; State Manager = desired-state enforcement",
        "OpsWorks/Puppet/Chef are legacy — favor Systems Manager answers",
        "Elastic Beanstalk deployment options: all-at-once, rolling, rolling+additional batch, immutable, blue/green",
      ],
    },
    {
      heading: "Security & compliance",
      list: [
        "CloudTrail = API audit (management + data events); enable org trail for all accounts",
        "Config = resource configuration history + compliance rules",
        "GuardDuty = threat detection; Security Hub = findings aggregator; Inspector = vulnerability scanning",
        "SSM Parameter Store vs Secrets Manager: free vs rotation + cross-service integration",
      ],
    },
    {
      heading: "Networking & content delivery",
      list: [
        "ALB = Layer 7 host/path routing; NLB = Layer 4, static IP, ultra-low latency",
        "CloudFront = CDN caching at edge; signed URLs/cookies for private content; OAI/OAC for S3 origin access",
        "Route 53 routing: simple, weighted, latency, failover, geolocation, geoproximity, multivalue",
        "NAT gateway per AZ for private-subnet outbound internet",
      ],
    },
  ],
  references: [
    { title: "SOA-C03 exam guide", url: "https://aws.amazon.com/certification/certified-cloudops-engineer-associate/" },
    { title: "Amazon CloudWatch", url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html" },
    { title: "AWS Systems Manager", url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html" },
    { title: "AWS Backup", url: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html" },
  ],
});

ARTICLES.push({
  slug: "aif-c01-cheat-sheet",
  title: "AIF-C01 Cheat Sheet: AI Practitioner Quick Reference",
  description:
    "A condensed AIF-C01 review sheet: AI vs ML vs GenAI vocabulary, Bedrock capabilities, prompt engineering levers, responsible-AI guardrails, and AI security — the terms the exam repeats.",
  domain: "aif-ai-ml-fundamentals",
  topic: "aif-ml-foundations",
  updatedAt: "2026-10-27",
  readingMinutes: 7,
  sections: [
    {
      paragraphs: [
        "AIF-C01 is vocabulary-driven: distinguish AI/ML/GenAI, know which AWS AI service does what, and know responsible-AI controls. Scan this the week before the exam.",
      ],
    },
    {
      heading: "Vocabulary you must separate",
      list: [
        "AI = the field; ML = subset learning from data; DL = neural-net subset; GenAI = creates new content from foundation models",
        "Foundation model (FM) = large pre-trained model adaptable to many tasks; LLM = text-focused FM",
        "Inference = running a trained model; training = fitting parameters on data; fine-tuning = continued training on your data",
        "Embeddings = numeric vectors capturing meaning → semantic search, RAG retrieval",
      ],
    },
    {
      heading: "AWS AI services in one line",
      list: [
        "SageMaker — build/train/deploy custom ML models; SageMaker JumpStart = pre-trained models",
        "Bedrock — managed foundation models via API (Claude, Llama, Titan, etc.) + Knowledge Bases + Agents + Guardrails",
        "Comprehend — NLP: sentiment, entities, PII; Textract — document text/tables/forms extraction",
        "Rekognition — image/video analysis; Polly — text→speech; Transcribe — speech→text; Translate — language translation",
        "Lex — chatbots; Personalize — recommendations; Forecast — time-series; Fraud Detector / Kendra (search)",
        "Q Business / Q Developer — enterprise assistant / coding assistant",
      ],
    },
    {
      heading: "Prompt engineering levers",
      list: [
        "Temperature — higher = more random/creative, lower = more deterministic",
        "Top-p (nucleus) / top-k — sample from most probable tokens",
        "Zero-shot vs few-shot (examples in prompt); chain-of-thought improves reasoning",
        "System/context prompts set behavior; prompt injection = user input overriding instructions",
      ],
    },
    {
      heading: "RAG vs fine-tuning",
      list: [
        "RAG — retrieve relevant docs at inference → current/factual answers without retraining; cheaper, traceable",
        "Fine-tuning — adjust model weights on labeled data → style/format/domain behavior; costlier, static knowledge",
        "Bedrock Knowledge Bases = managed RAG; Agents = tool-use orchestration",
      ],
    },
    {
      heading: "Responsible AI",
      list: [
        "Dimensions: fairness, explainability, privacy, safety, transparency, veracity/robustness, governance",
        "Guardrails for Amazon Bedrock — content filters, denied topics, PII redaction, grounding checks",
        "Hallucination = confident false output — mitigate with RAG grounding + guardrails",
        "SageMaker Clarify / Model Monitor — bias detection and drift monitoring",
      ],
    },
    {
      heading: "AI security & governance",
      list: [
        "Same AWS security stack applies: IAM for access, KMS for encryption, CloudTrail for audit, PrivateLink for private endpoints",
        "Data residency & retention: understand where Bedrock processes prompts; training data doesn't leave your control plane boundary per service terms",
        "Shared responsibility extends to AI: AWS secures the platform, you secure prompts/data/outputs",
      ],
    },
  ],
  references: [
    { title: "AIF-C01 exam guide", url: "https://aws.amazon.com/certification/certified-ai-practitioner/" },
    { title: "Amazon Bedrock", url: "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html" },
    { title: "Guardrails for Amazon Bedrock", url: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html" },
  ],
});

ARTICLES.push({
  slug: "dea-c01-cheat-sheet",
  title: "DEA-C01 Cheat Sheet: Data Engineer Associate Quick Reference",
  description:
    "A condensed DEA-C01 review sheet: ingestion services, data stores, Glue/EMR transforms, orchestration, and data governance — the service distinctions the exam repeats.",
  domain: "dea-ingestion-transformation",
  topic: "dea-ingestion-and-etl",
  updatedAt: "2026-10-27",
  readingMinutes: 7,
  sections: [
    {
      paragraphs: [
        "DEA-C01 is a service-selection exam: know which ingestion, storage, and processing tool fits each workload, plus the operational and governance details. Scan this the week before the exam.",
      ],
    },
    {
      heading: "Ingestion",
      list: [
        "Kinesis Data Streams — real-time streaming, shard-based, replayable; on-demand vs provisioned capacity",
        "Data Firehose — managed delivery to S3/Redshift/OpenSearch, batch transform, no shard management",
        "MSK — managed Apache Kafka for existing Kafka workloads; MSK Connect for connectors",
        "DataSync — bulk/scheduled file migration NFS/SMB→S3/EFS/FSx; DMS — database migration + CDC",
        "S3 Transfer Acceleration — edge-accelerated uploads; Snowball — offline bulk transfer",
      ],
    },
    {
      heading: "Data stores",
      list: [
        "S3 data lake + Glue Data Catalog — the center of nearly every architecture",
        "Redshift — MPP data warehouse for repeated complex SQL; DISTKEY co-locates joins, ALL for small dims",
        "Athena — serverless SQL on S3; partition + Parquet/ORC cuts cost and time",
        "DynamoDB — NoSQL key-value at any scale; OpenSearch — log/search analytics",
        "Lake Formation — permissions layer over the lake (DB/table/column/row)",
      ],
    },
    {
      heading: "Transform & process",
      list: [
        "Glue — serverless ETL: crawlers (schema→catalog), jobs (Spark/Python shell), DataBrew (visual prep)",
        "Glue Data Quality — DQDL rules gate pipelines on row counts/nulls/ranges",
        "EMR — managed Spark/Hive/HBase clusters when you need framework control",
        "Lambda — lightweight event transforms; Kinesis Data Analytics / Flink — stream processing with SQL",
      ],
    },
    {
      heading: "Orchestration & operations",
      list: [
        "MWAA — managed Airflow DAGs for interdependent pipelines",
        "Step Functions — serverless state machines; EventBridge Scheduler — single-target schedules",
        "Glue workflows/triggers — ETL-native orchestration",
        "CloudWatch + EventBridge — pipeline monitoring, retries, alerting",
      ],
    },
    {
      heading: "Governance & security",
      list: [
        "Lake Formation — column/row-level access on catalog tables; tag-based access control",
        "Macie — automated PII/sensitive-data discovery in S3",
        "KMS — encrypt at rest; TLS in transit; CloudTrail — audit API access",
        "Glue Data Catalog — schema registry + versioning; resource policies for cross-account sharing",
      ],
    },
  ],
  references: [
    { title: "DEA-C01 exam guide", url: "https://aws.amazon.com/certification/certified-data-engineer-associate/" },
    { title: "AWS Glue", url: "https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html" },
    { title: "Amazon Kinesis", url: "https://docs.aws.amazon.com/streams/latest/dev/introduction.html" },
  ],
});

ARTICLES.push({
  slug: "scs-c03-cheat-sheet",
  title: "SCS-C03 Cheat Sheet: Security Specialty Quick Reference",
  description:
    "A condensed SCS-C03 review sheet: detection services, incident response, infrastructure security, IAM deep-dive, data protection, and governance — the control mappings the exam repeats.",
  domain: "scs-detection",
  topic: "scs-detection-and-response",
  updatedAt: "2026-10-27",
  readingMinutes: 8,
  sections: [
    {
      paragraphs: [
        "SCS-C03 rewards knowing which control detects, prevents, or responds — and the exact service mechanics. This sheet groups the highest-frequency distinctions.",
      ],
    },
    {
      heading: "Detection services",
      list: [
        "GuardDuty — threat detection from CloudTrail/VPC Flow/DNS logs + malware scans; findings, not prevention",
        "Security Hub — findings aggregator (ASFF format) + standards checks (CIS, FSBP)",
        "Inspector — vulnerability scanning for EC2/ECR/Lambda; ECR scan-on-push + continuous",
        "Macie — sensitive data (PII) discovery in S3",
        "Detective — behavior-graph investigation over findings/flow logs/CloudTrail",
        "Config — resource config history + compliance rules; CloudTrail — API audit trail",
      ],
    },
    {
      heading: "Incident response",
      list: [
        "Isolate EC2: swap SG → forensics SG, then snapshot EBS + capture memory — never terminate/stop first",
        "Compromised credentials: deactivate key → rotate → review CloudTrail for abuse → SCP boundary if needed",
        "Automate: EventBridge on findings → SSM Automation/Lambda runbooks",
        "Artifact service for legal/compliance agreements; Abuse team contact for reporting",
      ],
    },
    {
      heading: "Infrastructure security",
      list: [
        "SGs are stateful (responses auto-allowed); NACLs are stateless (need ephemeral-port rules)",
        "ALB = L7; NLB = L4 + static IP; endpoint services = PrivateLink",
        "WAF — L7 rules (SQLi/XSS/rate/geo/managed); Shield Standard free auto DDoS; Shield Advanced = DRT + cost protection",
        "Network Firewall — stateful VPC boundary inspection; Route 53 Resolver DNS Firewall — domain filtering",
      ],
    },
    {
      heading: "IAM deep-dive",
      list: [
        "Evaluation order: explicit Deny → SCP → resource policy → session policy → permission boundary → identity policy",
        "Permission boundaries cap what delegated admins can grant (aws:PermissionsBoundary condition)",
        "Roles for cross-account/federation; access analyzer for external access + unused access findings",
        "OIDC federation for GitHub/CI workloads — no long-lived keys",
      ],
    },
    {
      heading: "Data protection",
      list: [
        "KMS: symmetric for data encryption, envelope encryption via data keys; automatic yearly rotation on CMKs",
        "SSE-S3 / SSE-KMS / SSE-C / client-side — know who manages the keys in each",
        "CloudHSM — dedicated single-tenant HSM when you must control key material",
        "Secrets Manager — auto-rotation + cross-service creds; Parameter Store — free, no rotation",
        "Certificate Manager — free public TLS certs, auto-renewal, ALB/CloudFront integration",
      ],
    },
    {
      heading: "Governance",
      list: [
        "SCPs set permission ceilings per OU/account — they never grant",
        "Control Tower guardrails: preventive=SCPs, detective=Config rules, proactive=CFN hooks",
        "Organization CloudTrail → single log-archive account; Config aggregator for fleet compliance",
        "Service Catalog / account vending for approved, guardrailed products",
      ],
    },
  ],
  references: [
    { title: "SCS-C03 exam guide", url: "https://aws.amazon.com/certification/certified-security-specialty/" },
    { title: "Amazon GuardDuty", url: "https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html" },
    { title: "AWS KMS", url: "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html" },
  ],
});

ARTICLES.push({
  slug: "ans-c01-cheat-sheet",
  title: "ANS-C01 Cheat Sheet: Advanced Networking Specialty Quick Reference",
  description:
    "A condensed ANS-C01 review sheet: hybrid connectivity, Transit Gateway routing, DNS, load balancing, and network security — the architecture patterns the exam repeats.",
  domain: "ans-network-design",
  topic: "ans-hybrid-connectivity",
  updatedAt: "2026-10-27",
  readingMinutes: 8,
  sections: [
    {
      paragraphs: [
        "ANS-C01 is the hardest associate-adjacent exam: it tests routing tables, BGP, and when each connectivity construct applies. This sheet compresses the highest-frequency patterns.",
      ],
    },
    {
      heading: "Hybrid connectivity",
      list: [
        "Direct Connect — private dedicated circuit: consistent latency/bandwidth, no internet; private VIF→VPC VGW, transit VIF→TGW, public VIF→AWS public endpoints",
        "Site-to-Site VPN — encrypted over internet, fast to stand up, cheaper; static or BGP routing",
        "DX + VPN backup — classic resilience pair; MACsec for DX encryption",
        "Client VPN — end-user remote access",
      ],
    },
    {
      heading: "Transit Gateway",
      list: [
        "TGW = regional hub; peering links TGWs across regions; route tables control segmentation (hub-spoke)",
        "TGW + DX gateway via transit VIF — many VPCs, segmentation, multi-region over one link",
        "Shared TGW via RAM for multi-account; appliance mode for symmetric stateful inspection",
        "Connect/peer attachments: VPC, VPN, DX (via DXGW), peering, connect (SD-WAN/GRE)",
      ],
    },
    {
      heading: "DNS & Route 53",
      list: [
        "Routing policies: simple, weighted, latency, failover, geolocation, geoproximity, multivalue, IP-based",
        "Private resources health checks → CloudWatch alarm-based checks (checkers live outside VPC)",
        "Resolver endpoints: inbound (on-prem→VPC DNS), outbound (VPC→on-prem); Resolver rules forward domains",
        "Public vs private hosted zones; split-view DNS with same-name PHZ",
      ],
    },
    {
      heading: "Load balancing & edge",
      list: [
        "ALB — L7 host/path routing, auth offload; NLB — L4, static IP, preserve source IP, TLS passthrough; GWLB — L3 appliance insertion",
        "CloudFront — CDN, OAC for S3, signed URLs/cookies, field-level encryption, functions vs Lambda@Edge",
        "Global Accelerator — anycast static IPs, TCP/UDP, near-source failover — vs CloudFront (caching CDN)",
        "PrivateLink/endpoint services — expose service via NLB, no routing/peering needed",
      ],
    },
    {
      heading: "VPC internals",
      list: [
        "CIDR planning is irreversible — non-overlapping ranges before peering/TGW/hybrid",
        "Egress-only IGW for IPv6 outbound-only; NAT gateway for IPv4 (per-AZ for HA)",
        "VPC endpoints: interface (PrivateLink, per-AZ ENI) vs gateway (S3/DynamoDB, route-table entry)",
        "Flow Logs (metadata), Traffic Mirroring (full packets), Reachability Analyzer (path testing)",
      ],
    },
    {
      heading: "Network security & operations",
      list: [
        "SGs stateful vs NACLs stateless; ephemeral ports 1024–65535 in NACL returns",
        "Network Firewall — managed stateful L3–L7 at VPC boundary; DNS Firewall for domain control",
        "Cloud WAN / Network Manager — global topology, monitoring, segmentation",
        "BGP: local-pref controls outbound, AS-path prepending/med influence inbound",
      ],
    },
  ],
  references: [
    { title: "ANS-C01 exam guide", url: "https://aws.amazon.com/certification/certified-advanced-networking-specialty/" },
    { title: "AWS Transit Gateway", url: "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html" },
    { title: "AWS Direct Connect", url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html" },
  ],
});

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
