import type { CertificationId, DomainId } from "./schema";

export interface Topic {
  slug: string;
  name: string;
  cert: CertificationId;
  domain: DomainId;
  description: string;
}

/**
 * Practice topics map to /practice/[slug] routes. A topic page is generated
 * only when at least one published question exists for it (see questions/index).
 */
export const TOPICS: Topic[] = [
  {
    slug: "iam-and-access-control",
    cert: "saa-c03",
    name: "IAM & Access Control",
    domain: "design-secure-architectures",
    description:
      "IAM users, roles, policies, least privilege, MFA, and cross-account access patterns.",
  },
  {
    slug: "network-security",
    cert: "saa-c03",
    name: "Network Security",
    domain: "design-secure-architectures",
    description:
      "Security groups, network ACLs, AWS WAF, Shield, and securing VPC traffic.",
  },
  {
    slug: "data-protection",
    cert: "saa-c03",
    name: "Data Protection & Encryption",
    domain: "design-secure-architectures",
    description:
      "KMS, encryption at rest and in transit, Secrets Manager, and certificate management.",
  },
  {
    slug: "high-availability",
    cert: "saa-c03",
    name: "High Availability",
    domain: "design-resilient-architectures",
    description:
      "Multi-AZ design, Elastic Load Balancing, Route 53 routing, and eliminating single points of failure.",
  },
  {
    slug: "decoupling-and-messaging",
    cert: "saa-c03",
    name: "Decoupling & Messaging",
    domain: "design-resilient-architectures",
    description:
      "SQS, SNS, EventBridge, and loose coupling patterns that absorb failures.",
  },
  {
    slug: "disaster-recovery",
    cert: "saa-c03",
    name: "Disaster Recovery",
    domain: "design-resilient-architectures",
    description:
      "RTO/RPO trade-offs, backup and restore, pilot light, warm standby, and multi-site designs.",
  },
  {
    slug: "resilient-storage",
    cert: "saa-c03",
    name: "Resilient Storage",
    domain: "design-resilient-architectures",
    description:
      "S3 durability and versioning, EBS snapshots, EFS, and storage-level fault tolerance.",
  },
  {
    slug: "compute-selection",
    cert: "saa-c03",
    name: "Compute Selection",
    domain: "design-high-performing-architectures",
    description:
      "Choosing between EC2, Lambda, ECS, EKS, and batch/edge compute options.",
  },
  {
    slug: "database-selection-and-scaling",
    cert: "saa-c03",
    name: "Database Selection & Scaling",
    domain: "design-high-performing-architectures",
    description:
      "RDS vs Aurora vs DynamoDB, read replicas, partitioning, and caching with ElastiCache/DAX.",
  },
  {
    slug: "caching-and-content-delivery",
    cert: "saa-c03",
    name: "Caching & Content Delivery",
    domain: "design-high-performing-architectures",
    description:
      "CloudFront, global acceleration, ElastiCache strategies, and latency reduction.",
  },
  {
    slug: "scalability-and-elasticity",
    cert: "saa-c03",
    name: "Scalability & Elasticity",
    domain: "design-high-performing-architectures",
    description:
      "Auto Scaling policies, scaling metrics, and designing for variable demand.",
  },
  {
    slug: "cost-optimized-storage",
    cert: "saa-c03",
    name: "Cost-Optimized Storage",
    domain: "design-cost-optimized-architectures",
    description:
      "S3 storage classes, lifecycle policies, and matching storage tiers to access patterns.",
  },
  {
    slug: "cost-optimized-compute",
    cert: "saa-c03",
    name: "Cost-Optimized Compute",
    domain: "design-cost-optimized-architectures",
    description:
      "On-Demand vs Savings Plans vs Reserved vs Spot, right-sizing, and serverless cost levers.",
  },
  {
    slug: "cost-optimized-databases-and-network",
    cert: "saa-c03",
    name: "Cost-Optimized Databases & Networking",
    domain: "design-cost-optimized-architectures",
    description:
      "Aurora vs RDS vs DynamoDB cost profiles, data transfer costs, and NAT Gateway spend.",
  },
  // ---- CLF-C02 Cloud Practitioner ----
  {
    slug: "clf-cloud-essentials",
    name: "Cloud Essentials",
    cert: "clf-c02",
    domain: "clf-cloud-concepts",
    description:
      "What the cloud is, why organizations adopt AWS, and the benefits of cloud economics.",
  },
  {
    slug: "clf-security-basics",
    name: "Security Basics",
    cert: "clf-c02",
    domain: "clf-security-compliance",
    description:
      "Shared responsibility model, basic IAM, and core compliance concepts.",
  },
  {
    slug: "clf-core-services",
    name: "Core AWS Services",
    cert: "clf-c02",
    domain: "clf-technology-services",
    description:
      "Recognizing what the core AWS services do — compute, storage, database, networking.",
  },
  {
    slug: "clf-billing-and-support",
    name: "Billing & Support",
    cert: "clf-c02",
    domain: "clf-billing-pricing-support",
    description:
      "AWS pricing models, consolidated billing, support plans, and cost tools.",
  },
  // ---- AIF-C01 AI Practitioner ----
  {
    slug: "aif-ml-foundations",
    name: "AI/ML Foundations",
    cert: "aif-c01",
    domain: "aif-ai-ml-fundamentals",
    description:
      "AI vs ML vs generative AI, model types, and when to use each approach.",
  },
  {
    slug: "aif-genai-and-bedrock",
    name: "Generative AI & Bedrock",
    cert: "aif-c01",
    domain: "aif-fm-applications",
    description:
      "Foundation models, Amazon Bedrock, RAG, agents, and prompt engineering basics.",
  },
  {
    slug: "aif-responsible-ai",
    name: "Responsible AI",
    cert: "aif-c01",
    domain: "aif-responsible-ai",
    description:
      "Bias, transparency, privacy, and governance for AI workloads on AWS.",
  },
  {
    slug: "aif-genai-concepts",
    name: "Generative AI Concepts",
    cert: "aif-c01",
    domain: "aif-genai-fundamentals",
    description:
      "Foundation models, tokens, embeddings, temperature, and prompt engineering concepts.",
  },
  {
    slug: "aif-security-governance",
    name: "AI Security & Governance",
    cert: "aif-c01",
    domain: "aif-ai-security-governance",
    description:
      "Securing AI workloads, PII handling, access control, and compliance for AI solutions.",
  },
  // ---- DVA-C02 Developer Associate ----
  {
    slug: "dva-serverless-and-apis",
    name: "Serverless & APIs",
    cert: "dva-c02",
    domain: "dva-development-with-aws",
    description:
      "Lambda, API Gateway, DynamoDB SDK patterns, and event-driven development.",
  },
  {
    slug: "dva-app-security",
    name: "Application Security",
    cert: "dva-c02",
    domain: "dva-security",
    description:
      "IAM in code, Cognito, encryption SDKs, and secrets handling in applications.",
  },
  {
    slug: "dva-cicd-and-observability",
    name: "CI/CD & Observability",
    cert: "dva-c02",
    domain: "dva-deployment",
    description:
      "CodePipeline/CodeDeploy, deployment strategies, CloudFormation, and X-Ray.",
  },
  {
    slug: "dva-debugging-and-optimization",
    name: "Debugging & Optimization",
    cert: "dva-c02",
    domain: "dva-troubleshooting-optimization",
    description:
      "X-Ray tracing, CloudWatch debugging, caching strategies, and application performance tuning.",
  },
  // ---- SOA-C03 SysOps Administrator ----
  {
    slug: "soa-monitoring-and-remediation",
    name: "Monitoring & Remediation",
    cert: "soa-c03",
    domain: "soa-monitoring-logging-remediation",
    description:
      "CloudWatch alarms, EventBridge remediation, and operational visibility.",
  },
  {
    slug: "soa-deployment-and-automation",
    name: "Deployment & Automation",
    cert: "soa-c03",
    domain: "soa-deployment-provisioning-automation",
    description:
      "CloudFormation ops, Systems Manager, patching, and image pipelines.",
  },
  {
    slug: "soa-networking-operations",
    name: "Networking Operations",
    cert: "soa-c03",
    domain: "soa-networking-content-delivery",
    description:
      "VPC ops, Route 53, load balancing, and CloudFront administration.",
  },
  // ---- DEA-C01 Data Engineer ----
  {
    slug: "dea-ingestion-and-etl",
    name: "Ingestion & ETL",
    cert: "dea-c01",
    domain: "dea-ingestion-transformation",
    description:
      "Kinesis, Glue ETL, DMS, and batch/streaming ingestion patterns.",
  },
  {
    slug: "dea-data-stores",
    name: "Data Stores & Lakes",
    cert: "dea-c01",
    domain: "dea-data-store-management",
    description:
      "S3 data lakes, Redshift, partitioning, and storage format choices.",
  },
  {
    slug: "dea-data-governance",
    name: "Data Governance",
    cert: "dea-c01",
    domain: "dea-data-security-governance",
    description:
      "Lake Formation, data encryption, access control, and data quality.",
  },
  // ---- SCS-C03 Security Specialty ----
  {
    slug: "scs-detection-and-response",
    name: "Detection & Response",
    cert: "scs-c03",
    domain: "scs-detection",
    description:
      "GuardDuty, Security Hub, incident response, and forensic workflows.",
  },
  {
    slug: "scs-logging-and-audit",
    name: "Logging & Audit",
    cert: "scs-c03",
    domain: "scs-detection",
    description:
      "CloudTrail, Config, centralized logging, and building audit trails for investigations.",
  },
  {
    slug: "scs-iam-deep-dive",
    name: "IAM Deep Dive",
    cert: "scs-c03",
    domain: "scs-iam",
    description:
      "Policy evaluation, permission boundaries, federation, and cross-account access.",
  },
  {
    slug: "scs-encryption-and-keys",
    name: "Encryption & Key Management",
    cert: "scs-c03",
    domain: "scs-data-protection",
    description:
      "KMS key policies, envelope encryption, CloudHSM, and secrets management.",
  },
  // ---- ANS-C01 Networking Specialty ----
  {
    slug: "ans-hybrid-connectivity",
    name: "Hybrid Connectivity",
    cert: "ans-c01",
    domain: "ans-network-design",
    description:
      "Direct Connect, Site-to-Site VPN, Transit Gateway, and hybrid routing.",
  },
  {
    slug: "ans-dns-and-routing",
    name: "DNS & Edge Routing",
    cert: "ans-c01",
    domain: "ans-network-implementation",
    description:
      "Route 53 Resolver, private hosted zones, and global routing design.",
  },
  {
    slug: "ans-network-security",
    name: "Network Security",
    cert: "ans-c01",
    domain: "ans-network-security-compliance",
    description:
      "Traffic inspection, Network Firewall, TLS, and securing hybrid paths.",
  },
  // ---- SAP-C02 Solutions Architect Professional ----
  {
    slug: "sap-multi-account-architecture",
    name: "Multi-Account Architecture",
    cert: "sap-c02",
    domain: "sap-organizational-complexity",
    description:
      "Organizations design, control towers, shared services, and network topologies.",
  },
  {
    slug: "sap-migration-strategies",
    name: "Migration & Modernization",
    cert: "sap-c02",
    domain: "sap-migration-modernization",
    description:
      "6R strategies, DMS, Application Discovery, and modernization patterns.",
  },
  {
    slug: "sap-complex-solutions",
    name: "Complex Solution Design",
    cert: "sap-c02",
    domain: "sap-new-solutions",
    description:
      "Balancing competing requirements across security, cost, reliability, and performance.",
  },
];

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function topicsByCert(certId: CertificationId): Topic[] {
  return TOPICS.filter((t) => t.cert === certId);
}
