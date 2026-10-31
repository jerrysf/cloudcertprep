import type { Question } from "../schema";

/**
 * SAP-C02 (AWS Certified Solutions Architect – Professional) seed questions.
 */
export const sapQuestions: Question[] = [
  {
    id: "sap-org-001",
    slug: "multi-account-guardrails-design",
    cert: "sap-c02",
    domain: "sap-organizational-complexity",
    topic: "sap-multi-account-architecture",
    subtopic: "Organizations design",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An enterprise wants separate AWS accounts per environment (dev/staging/prod) and per business unit, with centrally enforced guardrails and shared logging. Which approach provides scalable multi-account governance?",
    options: [
      { id: "A", text: "One large account with IAM groups per team" },
      { id: "B", text: "AWS Organizations with OUs and service control policies" },
      { id: "C", text: "Separate AWS accounts billed independently" },
      { id: "D", text: "VPC peering between team VPCs in one account" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AWS Organizations organizes accounts into organizational units (OUs) and applies service control policies as preventive guardrails across them — the standard multi-account governance model, typically bootstrapped with Control Tower.",
    optionExplanations: {
      A: "Single-account boundaries can't isolate blast radius or billing per unit effectively.",
      B: "Correct. OUs + SCPs are the canonical multi-account guardrail pattern.",
      C: "Independent billing loses consolidated visibility and governance.",
      D: "Peering is connectivity, not account governance.",
    },
    services: ["AWS Organizations", "AWS Control Tower"],
    references: [
      {
        title: "AWS Organizations",
        url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "sap-mig-001",
    slug: "choose-migration-strategy-6r",
    cert: "sap-c02",
    domain: "sap-migration-modernization",
    topic: "sap-migration-strategies",
    subtopic: "6R strategies",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A legacy application runs on physical servers. The business wants to migrate quickly with minimal code changes now, then modernize later. Which migration strategy fits best?",
    options: [
      { id: "A", text: "Rearchitect — rewrite as serverless first" },
      { id: "B", text: "Rehost — lift-and-shift to EC2" },
      { id: "C", text: "Repurchase — move to a SaaS product" },
      { id: "D", text: "Refactor — rebuild with microservices" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Rehosting (lift-and-shift to EC2) is the fastest path with minimal change — matching 'migrate quickly now, modernize later'. Rearchitect/refactor/repurchase are larger transformations suited to modernization phases, not fast initial moves.",
    optionExplanations: {
      A: "Rearchitecting is a rewrite — the opposite of 'minimal change quickly'.",
      B: "Correct. Rehost is the fastest minimal-change path for the initial move.",
      C: "Repurchase replaces the app entirely — not a migration of this workload.",
      D: "Refactoring is deep code change — a modernization step, not the quick first move.",
    },
    services: ["AWS Application Migration Service", "Amazon EC2"],
    references: [
      {
        title: "6 strategies for migrating applications to the cloud",
        url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-strategy/migration-strategies.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "sap-new-001",
    slug: "complex-solution-trade-offs",
    cert: "sap-c02",
    domain: "sap-new-solutions",
    topic: "sap-complex-solutions",
    subtopic: "Architecture trade-offs",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A financial services app needs: RPO near zero, RTO under 5 minutes, and cost sensitivity for non-production environments. Which DR architecture balances all three constraints?",
    options: [
      { id: "A", text: "Active/active across Regions everywhere" },
      { id: "B", text: "Multi-AZ plus cross-Region pilot light for prod; backups only for non-prod" },
      { id: "C", text: "Backup and restore for all environments" },
      { id: "D", text: "Single-Region with high-capacity instances" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Pro questions reward tiered design: prod gets Multi-AZ for AZ resilience plus a cross-Region pilot light (replicated data, provisioned-on-demand app tier) for ~minute-level RTO at controlled cost; non-prod uses cheap backup/restore since tight RTO doesn't justify spend.",
    optionExplanations: {
      A: "Active/active everywhere ignores the cost constraint for non-prod.",
      B: "Correct. Tiered DR matches RPO/RTO to environment criticality cost-effectively.",
      C: "Backup/restore can't meet 5-minute RTO for prod.",
      D: "Single Region leaves regional-failure RPO/RTO unaddressed.",
    },
    services: ["Disaster recovery", "Amazon RDS"],
    references: [
      {
        title: "Disaster recovery options in the cloud",
        url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "sap-org-002",
    slug: "cross-account-shared-services-vpc",
    cert: "sap-c02",
    domain: "sap-organizational-complexity",
    topic: "sap-multi-account-architecture",
    subtopic: "Shared services",
    difficulty: "hard",
    format: "single-choice",
    question:
      "Shared services (DNS, security inspection, logging collectors) must be reachable from 100+ workload VPCs across accounts. What's the scalable way to provide centralized shared services?",
    options: [
      { id: "A", text: "VPC peering from every workload VPC to a shared services VPC" },
      { id: "B", text: "A shared services VPC attached to a Transit Gateway, with all workload VPCs attached" },
      { id: "C", text: "Duplicate shared services in every VPC" },
      { id: "D", text: "Make services public behind CloudFront" },
    ],
    correctAnswers: ["B"],
    explanation:
      "At scale, Transit Gateway with a dedicated shared-services VPC is the standard pattern: every workload VPC attaches to the TGW hub, which routes to shared services — avoiding a 100-way peering mesh and duplication.",
    optionExplanations: {
      A: "Peering meshes become unmanageable and non-transitive at 100+ VPCs.",
      B: "Correct. TGW + shared-services VPC is the canonical enterprise pattern.",
      C: "Duplication multiplies cost, patching, and drift across 100 environments.",
      D: "Exposing internal services publicly adds attack surface without solving routing.",
    },
    services: ["AWS Transit Gateway", "Amazon VPC"],
    references: [
      {
        title: "Transit Gateway design patterns",
        url: "https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-centralized-architecture.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "sap-opt-001",
    slug: "org-wide-cost-visibility",
    cert: "sap-c02",
    domain: "sap-continuous-improvement",
    topic: "sap-optimization",
    subtopic: "Cost governance",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company with 40 accounts in AWS Organizations can't tell which teams drive cost growth and wants per-team visibility plus right-sizing recommendations. Which combination addresses this?",
    options: [
      { id: "A", text: "Monthly invoice PDFs reviewed by finance" },
      { id: "B", text: "Cost and Usage Report + cost allocation tags per team + Compute Optimizer recommendations" },
      { id: "C", text: "CloudWatch billing alarms on the payer account only" },
      { id: "D", text: "AWS Trusted Advisor basic checks" },
    ],
    correctAnswers: ["B"],
    explanation:
      "CUR gives line-item granularity; cost allocation tags (activated in the payer) attribute spend to teams; Compute Optimizer surfaces right-sizing recommendations across accounts — the complete visibility-to-action chain.",
    optionExplanations: {
      A: "Invoices are too coarse and too late for engineering action.",
      B: "Correct. Attribution (tags) + detail (CUR) + recommendations (Optimizer).",
      C: "Billing alarms alert on totals — they don't attribute or recommend.",
      D: "Trusted Advisor is advisory and less granular than CUR+Optimizer.",
    },
    services: ["AWS Cost and Usage Report", "AWS Compute Optimizer", "AWS Organizations"],
    references: [
      {
        title: "Cost allocation tags",
        url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "sap-opt-002",
    slug: "read-heavy-database-scaling",
    cert: "sap-c02",
    domain: "sap-continuous-improvement",
    topic: "sap-optimization",
    subtopic: "Database scaling",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An Aurora MySQL cluster's read traffic has grown 10x; the writer is fine but read queries queue. What's the simplest scaling path that keeps the current architecture?",
    options: [
      { id: "A", text: "Failover to a larger writer instance" },
      { id: "B", text: "Add Aurora Replicas and point read traffic at the reader endpoint" },
      { id: "C", text: "Migrate the database to DynamoDB" },
      { id: "D", text: "Enable Aurora storage auto-scaling" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Aurora Replicas share the underlying cluster storage and scale out reads to up to 15 replicas; the reader endpoint load-balances connections. It's the native read-scaling lever with no schema/app migration.",
    optionExplanations: {
      A: "A bigger writer scales writes, not reads.",
      B: "Correct. Replicas offload reads linearly with shared storage.",
      C: "DynamoDB is a different data model — not 'simplest'.",
      D: "Storage auto-scaling handles capacity, not query concurrency.",
    },
    services: ["Amazon Aurora"],
    references: [
      {
        title: "Aurora Replicas",
        url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "sap-new-002",
    slug: "global-low-latency-architecture",
    cert: "sap-c02",
    domain: "sap-new-solutions",
    topic: "sap-complex-solutions",
    subtopic: "Multi-Region design",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A global app needs low-latency reads for users on three continents with writes consolidated to one Region — no multi-Region write conflict handling allowed. Which design fits?",
    options: [
      { id: "A", text: "Active/active writers in all three Regions" },
      { id: "B", text: "Single writer Region + read replicas/edge caching + Route 53 latency routing" },
      { id: "C", text: "Three independent stacks with periodic data sync" },
      { id: "D", text: "One Region, larger instances for all users" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Consolidating writes to one Region avoids conflict resolution entirely; cross-Region read replicas (or CloudFront-cached reads) serve reads locally; latency-based routing sends users to the best endpoint.",
    optionExplanations: {
      A: "Multi-writer invites exactly the conflict problem that's disallowed.",
      B: "Correct. Single-writer + distributed reads meets all constraints.",
      C: "Async sync creates divergence and operational complexity.",
      D: "Instance size doesn't solve geographic latency.",
    },
    services: ["Amazon Route 53", "Amazon Aurora", "Amazon CloudFront"],
    references: [
      {
        title: "Latency-based routing",
        url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "sap-mig-002",
    slug: "large-database-migration-minimal-downtime",
    cert: "sap-c02",
    domain: "sap-migration-modernization",
    topic: "sap-migration-strategies",
    subtopic: "Database migration",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A 4 TB Oracle database must migrate to Aurora PostgreSQL with under 30 minutes of downtime. Which approach achieves near-zero-downtime migration including heterogeneous schema conversion?",
    options: [
      { id: "A", text: "Export/import with a full-day maintenance window" },
      { id: "B", text: "AWS SCT for schema conversion + DMS with full load and ongoing replication (CDC)" },
      { id: "C", text: "Snapshot the Oracle DB and restore to Aurora" },
      { id: "D", text: "Replicate with native Oracle Data Guard to Aurora" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AWS Schema Conversion Tool converts the schema/code objects; Database Migration Service does initial load then continuous change data capture, keeping target in sync until cutover — the standard near-zero-downtime heterogeneous migration.",
    optionExplanations: {
      A: "Export/import requires downtime proportional to data size.",
      B: "Correct. SCT + DMS CDC is the designed heterogeneous path.",
      C: "Aurora can't restore Oracle snapshots — different engines.",
      D: "Data Guard replicates Oracle→Oracle only, not to Aurora.",
    },
    services: ["AWS DMS", "AWS SCT", "Amazon Aurora"],
    references: [
      {
        title: "AWS Database Migration Service",
        url: "https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "sap-org-003",
    slug: "scp-guardrail-prevent-region",
    cert: "sap-c02",
    domain: "sap-organizational-complexity",
    topic: "sap-multi-account-architecture",
    subtopic: "SCP guardrails",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company wants to guarantee — across 50 accounts — that workloads run only in two approved Regions, even for account admins. Which mechanism enforces this?",
    options: [
      { id: "A", text: "IAM policies in every account" },
      { id: "B", text: "An SCP denying all actions outside the approved Regions, applied at the OU or org root" },
      { id: "C", text: "CloudTrail alarms watching for API calls in other Regions" },
      { id: "D", text: "A signed agreement with each account admin" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Service control policies set maximum permission boundaries across member accounts — including denying `aws:RequestedRegion` outside an allowlist. SCPs bind even account administrators; they can't be overridden locally.",
    optionExplanations: {
      A: "Account admins can modify local IAM policies — not a guardrail.",
      B: "Correct. SCPs are the enforceable org-wide boundary.",
      C: "Alarms detect but don't prevent, and can be disabled.",
      D: "Agreements aren't technical enforcement.",
    },
    services: ["AWS Organizations"],
    references: [
      {
        title: "Service control policies",
        url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "sap-new-003",
    slug: "dr-pilot-light-vs-warm-standby",
    cert: "sap-c02",
    domain: "sap-new-solutions",
    topic: "sap-complex-solutions",
    subtopic: "DR strategy selection",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A payments system needs RTO under 15 minutes and RPO under 1 minute in a second Region, but finance rejects the cost of full capacity standby. Which DR strategy fits the budget and targets?",
    options: [
      { id: "A", text: "Backup and restore" },
      { id: "B", text: "Pilot light" },
      { id: "C", text: "Warm standby" },
      { id: "D", text: "Multi-site active/active" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Warm standby runs a scaled-down but functional copy in the DR Region — data replicated live meets RPO<1min, and scaling up on failover meets a ~15min RTO at far less than full-capacity cost. Pilot light (core components only, off) takes longer to start; backup/restore is hours.",
    optionExplanations: {
      A: "Backup/restore RTO is typically hours — misses 15 minutes.",
      B: "Pilot light keeps only data/core infra live — spin-up usually exceeds 15 min.",
      C: "Correct. Minimum capacity live + scale-up hits both targets cheaper than active/active.",
      D: "Active/active meets the SLA but is the most expensive — rejected by the budget.",
    },
    services: ["Amazon Route 53", "AWS Backup"],
    references: [
      {
        title: "Disaster recovery options in the cloud",
        url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "sap-opt-003",
    slug: "pb-scale-storage-cost",
    cert: "sap-c02",
    domain: "sap-continuous-improvement",
    topic: "sap-optimization",
    subtopic: "Storage cost",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A data lake holds 3 PB in S3 Standard. Access patterns: hot for 90 days, occasional for a year, then rare but must stay retrievable for compliance. What's the most cost-effective design?",
    options: [
      { id: "A", text: "Keep everything in S3 Standard and review quarterly" },
      { id: "B", text: "Lifecycle rules: Standard → Intelligent-Tiering or Standard-IA at 90 days → Glacier Flexible at 1 year" },
      { id: "C", text: "Move everything to Glacier Deep Archive now" },
      { id: "D", text: "Migrate to EBS volumes" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Lifecycle transitions match storage class to access pattern over time — hot in Standard, cooling in IA/Intelligent-Tiering, archive in Glacier. It automates the optimal cost curve; Deep Archive too early breaks the 'occasional' access year.",
    optionExplanations: {
      A: "Standard forever overpays massively at PB scale.",
      B: "Correct. Age-based transitions implement the optimal tiering.",
      C: "Deep Archive's hours-long retrieval breaks year-1 occasional access.",
      D: "EBS is block storage — wrong fit and more expensive for object data.",
    },
    services: ["Amazon S3"],
    references: [
      {
        title: "Managing storage lifecycle",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "sap-mig-003",
    slug: "migration-discovery-tools",
    cert: "sap-c02",
    domain: "sap-migration-modernization",
    topic: "sap-migration-strategies",
    subtopic: "Discovery phase",
    difficulty: "medium",
    format: "multiple-response",
    question:
      "Before designing a migration, architects need inventory: which servers exist, their dependencies, and utilization for right-sizing. Which TWO AWS tools support this discovery? (Select TWO.)",
    options: [
      { id: "A", text: "AWS Application Discovery Service (agent or agentless collectors)" },
      { id: "B", text: "AWS Migration Hub to consolidate discovery data and track migration progress" },
      { id: "C", text: "Amazon Inspector" },
      { id: "D", text: "AWS Artifact" },
      { id: "E", text: "Amazon Detective" },
    ],
    correctAnswers: ["A", "B"],
    explanation:
      "Application Discovery Service collects inventory, dependency mappings, and utilization from on-prem servers; Migration Hub aggregates that data and tracks migrations across tools — the standard discovery-phase pair.",
    optionExplanations: {
      A: "Correct. ADS is the purpose-built discovery/dependency tool.",
      B: "Correct. Migration Hub centralizes inventory and tracks migration.",
      C: "Inspector scans for vulnerabilities, not migration inventory.",
      D: "Artifact hosts compliance reports — unrelated.",
      E: "Detective investigates security findings, not infrastructure discovery.",
    },
    services: ["AWS Application Discovery Service", "AWS Migration Hub"],
    references: [
      {
        title: "Application Discovery Service",
        url: "https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
];
