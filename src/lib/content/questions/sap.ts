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
];
