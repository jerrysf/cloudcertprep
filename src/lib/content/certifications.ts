import type { CertificationId } from "./schema";

/**
 * Certification registry — one entry per AWS certification the site covers.
 *
 * IMPORTANT: exam metadata (question count, duration, cost, domain weights) for
 * non-SAA certifications is compiled from AWS's public exam pages but marked
 * `verified: false` until re-checked against the official exam guide. See
 * docs/exam-verification.md before publishing content updates.
 */

export interface CertDomain {
  /** Globally unique across all certifications — used as Question.domain. */
  id: string;
  number: number;
  name: string;
  /** Percentage of scored content. */
  weight: number;
  summary?: string;
}

export interface Certification {
  /** Internal id, e.g. "saa-c03". */
  id: CertificationId;
  /** Exam code, e.g. "SAA-C03". */
  code: string;
  name: string;
  level: "foundational" | "associate" | "professional" | "specialty";
  tagline: string;
  description: string;
  questionCount: number;
  durationMinutes: number;
  costUsd: number;
  passingScaledScore: number;
  scaledScoreRange: readonly [number, number];
  examGuideUrl: string;
  domains: CertDomain[];
  /** True once exam details have been re-verified against the official guide. */
  verified: boolean;
  /** Emphasized in navigation/homepage ordering. */
  featured: boolean;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "saa-c03",
    code: "SAA-C03",
    name: "AWS Certified Solutions Architect – Associate",
    level: "associate",
    tagline: "Design cost-optimized, resilient, secure, high-performing architectures.",
    description:
      "The most popular AWS certification. Tests architectural decision-making across the Well-Architected pillars — the certification CloudCertPrep covers most deeply.",
    questionCount: 65,
    durationMinutes: 130,
    costUsd: 150,
    passingScaledScore: 720,
    scaledScoreRange: [100, 1000],
    examGuideUrl:
      "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    verified: true,
    featured: true,
    domains: [
      {
        id: "design-secure-architectures",
        number: 1,
        name: "Design Secure Architectures",
        weight: 30,
        summary:
          "Secure access to AWS resources, secure workloads and applications, and data security controls.",
      },
      {
        id: "design-resilient-architectures",
        number: 2,
        name: "Design Resilient Architectures",
        weight: 26,
        summary:
          "Scalable, loosely coupled, highly available, fault-tolerant architectures and disaster recovery.",
      },
      {
        id: "design-high-performing-architectures",
        number: 3,
        name: "Design High-Performing Architectures",
        weight: 24,
        summary:
          "High-performing compute, storage, database, and network solutions that scale with demand.",
      },
      {
        id: "design-cost-optimized-architectures",
        number: 4,
        name: "Design Cost-Optimized Architectures",
        weight: 20,
        summary:
          "Cost-optimized storage, compute, database, and network architectures for workload requirements.",
      },
    ],
  },
  {
    id: "clf-c02",
    code: "CLF-C02",
    name: "AWS Certified Cloud Practitioner",
    level: "foundational",
    tagline: "The entry point: cloud concepts, security, technology, and billing.",
    description:
      "The foundational AWS certification for non-technical and early-career learners. Validates overall understanding of the AWS Cloud independent of a specific job role.",
    questionCount: 65,
    durationMinutes: 90,
    costUsd: 100,
    passingScaledScore: 700,
    scaledScoreRange: [100, 1000],
    examGuideUrl:
      "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    verified: false,
    featured: true,
    domains: [
      {
        id: "clf-cloud-concepts",
        number: 1,
        name: "Cloud Concepts",
        weight: 24,
        summary:
          "Value of the AWS Cloud, Well-Architected Framework, and benefits of cloud adoption.",
      },
      {
        id: "clf-security-compliance",
        number: 2,
        name: "Security and Compliance",
        weight: 30,
        summary:
          "Shared responsibility model, cloud security concepts, and access management.",
      },
      {
        id: "clf-technology-services",
        number: 3,
        name: "Cloud Technology and Services",
        weight: 34,
        summary:
          "Deployment methods, global infrastructure, and core AWS services.",
      },
      {
        id: "clf-billing-pricing-support",
        number: 4,
        name: "Billing, Pricing, and Support",
        weight: 12,
        summary:
          "AWS pricing models, account structures, billing tools, and support plans.",
      },
    ],
  },
  {
    id: "aif-c01",
    code: "AIF-C01",
    name: "AWS Certified AI Practitioner",
    level: "foundational",
    tagline: "AI/ML and generative AI fundamentals on AWS.",
    description:
      "AWS's newest foundational certification covering AI, ML, and generative AI concepts — including Amazon Bedrock — plus responsible AI practices.",
    questionCount: 65,
    durationMinutes: 90,
    costUsd: 100,
    passingScaledScore: 700,
    scaledScoreRange: [100, 1000],
    examGuideUrl:
      "https://aws.amazon.com/certification/certified-ai-practitioner/",
    verified: false,
    featured: true,
    domains: [
      {
        id: "aif-ai-ml-fundamentals",
        number: 1,
        name: "Fundamentals of AI and ML",
        weight: 20,
        summary:
          "AI/ML concepts, model types, and the ML development lifecycle.",
      },
      {
        id: "aif-genai-fundamentals",
        number: 2,
        name: "Fundamentals of Generative AI",
        weight: 24,
        summary:
          "Foundation models, prompt engineering concepts, and generative AI use cases.",
      },
      {
        id: "aif-fm-applications",
        number: 3,
        name: "Applications of Foundation Models",
        weight: 28,
        summary:
          "Amazon Bedrock, agents, RAG patterns, and evaluating generative AI output.",
      },
      {
        id: "aif-responsible-ai",
        number: 4,
        name: "Guidelines for Responsible AI",
        weight: 14,
        summary:
          "Fairness, transparency, privacy, and responsible AI development practices.",
      },
      {
        id: "aif-ai-security-governance",
        number: 5,
        name: "Security, Compliance, and Governance for AI",
        weight: 14,
        summary:
          "Securing AI workloads, data governance, and compliance frameworks for AI.",
      },
    ],
  },
  {
    id: "dva-c02",
    code: "DVA-C02",
    name: "AWS Certified Developer – Associate",
    level: "associate",
    tagline: "Build and deploy applications on AWS — SDKs, Lambda, DynamoDB, CI/CD.",
    description:
      "For developers who build on AWS: serverless applications, SDK usage, deployment pipelines, and application-level security.",
    questionCount: 65,
    durationMinutes: 130,
    costUsd: 150,
    passingScaledScore: 720,
    scaledScoreRange: [100, 1000],
    examGuideUrl:
      "https://aws.amazon.com/certification/certified-developer-associate/",
    verified: false,
    featured: true,
    domains: [
      {
        id: "dva-development-with-aws",
        number: 1,
        name: "Development with AWS Services",
        weight: 32,
        summary:
          "Serverless development, APIs, messaging, and using AWS services in application code.",
      },
      {
        id: "dva-security",
        number: 2,
        name: "Security",
        weight: 26,
        summary:
          "Authentication/authorization for applications, encryption, and secrets management in code.",
      },
      {
        id: "dva-deployment",
        number: 3,
        name: "Deployment",
        weight: 24,
        summary:
          "CI/CD pipelines, IaC, deployment strategies, and packaging applications for AWS.",
      },
      {
        id: "dva-troubleshooting-optimization",
        number: 4,
        name: "Troubleshooting and Optimization",
        weight: 18,
        summary:
          "Debugging, observability (X-Ray, CloudWatch), and application performance tuning.",
      },
    ],
  },
  {
    id: "soa-c03",
    code: "SOA-C03",
    name: "AWS Certified SysOps Administrator – Associate",
    level: "associate",
    tagline: "Operate AWS workloads — monitoring, automation, and reliability.",
    description:
      "For systems administrators and operations roles: running production workloads, monitoring, incident response, and cost/performance management.",
    questionCount: 65,
    durationMinutes: 130,
    costUsd: 150,
    passingScaledScore: 720,
    scaledScoreRange: [100, 1000],
    examGuideUrl:
      "https://aws.amazon.com/certification/certified-sysops-admin-associate/",
    verified: false,
    featured: false,
    domains: [
      {
        id: "soa-monitoring-logging-remediation",
        number: 1,
        name: "Monitoring, Logging, and Remediation",
        weight: 20,
        summary:
          "CloudWatch metrics/alarms/logs, event-driven remediation, and observability.",
      },
      {
        id: "soa-reliability-continuity",
        number: 2,
        name: "Reliability and Business Continuity",
        weight: 16,
        summary:
          "Backups, disaster recovery implementation, and scalable/resilient operations.",
      },
      {
        id: "soa-deployment-provisioning-automation",
        number: 3,
        name: "Deployment, Provisioning, and Automation",
        weight: 18,
        summary:
          "CloudFormation, Systems Manager, image management, and provisioning automation.",
      },
      {
        id: "soa-security-compliance",
        number: 4,
        name: "Security and Compliance",
        weight: 16,
        summary:
          "IAM implementation, compliance tooling, and applying security policies.",
      },
      {
        id: "soa-networking-content-delivery",
        number: 5,
        name: "Networking and Content Delivery",
        weight: 18,
        summary:
          "VPC connectivity, DNS, load balancing, and CloudFront operations.",
      },
      {
        id: "soa-cost-performance-optimization",
        number: 6,
        name: "Cost and Performance Optimization",
        weight: 12,
        summary:
          "Cost allocation, compute/storage optimization, and performance management.",
      },
    ],
  },
  {
    id: "dea-c01",
    code: "DEA-C01",
    name: "AWS Certified Data Engineer – Associate",
    level: "associate",
    tagline: "Data pipelines, stores, and analytics on AWS.",
    description:
      "For data engineers: ingesting, transforming, storing, and securing data pipelines using AWS analytics services.",
    questionCount: 65,
    durationMinutes: 130,
    costUsd: 150,
    passingScaledScore: 720,
    scaledScoreRange: [100, 1000],
    examGuideUrl:
      "https://aws.amazon.com/certification/certified-data-engineer-associate/",
    verified: false,
    featured: false,
    domains: [
      {
        id: "dea-ingestion-transformation",
        number: 1,
        name: "Data Ingestion and Transformation",
        weight: 34,
        summary:
          "Streaming/batch ingestion, ETL with Glue, and transforming data for analytics.",
      },
      {
        id: "dea-data-store-management",
        number: 2,
        name: "Data Store Management",
        weight: 26,
        summary:
          "Data lakes, warehouses (Redshift), partitioning, and storage optimization.",
      },
      {
        id: "dea-data-operations-support",
        number: 3,
        name: "Data Operations and Support",
        weight: 22,
        summary:
          "Pipeline orchestration, data quality, monitoring, and operational excellence.",
      },
      {
        id: "dea-data-security-governance",
        number: 4,
        name: "Data Security and Governance",
        weight: 18,
        summary:
          "Data encryption, access control, Lake Formation, and governance practices.",
      },
    ],
  },
  {
    id: "scs-c02",
    code: "SCS-C02",
    name: "AWS Certified Security – Specialty",
    level: "specialty",
    tagline: "Deep dive into AWS security — detection, IAM, encryption, and response.",
    description:
      "For security engineers: threat detection, logging/monitoring, infrastructure protection, IAM depth, and data protection controls.",
    questionCount: 65,
    durationMinutes: 170,
    costUsd: 300,
    passingScaledScore: 750,
    scaledScoreRange: [100, 1000],
    examGuideUrl:
      "https://aws.amazon.com/certification/certified-security-specialty/",
    verified: false,
    featured: false,
    domains: [
      {
        id: "scs-threat-detection-ir",
        number: 1,
        name: "Threat Detection and Incident Response",
        weight: 20,
        summary:
          "GuardDuty, Security Hub, incident response workflows, and forensics.",
      },
      {
        id: "scs-security-logging-monitoring",
        number: 2,
        name: "Security Logging and Monitoring",
        weight: 16,
        summary:
          "CloudTrail, Config, centralized logging, and security metrics.",
      },
      {
        id: "scs-infrastructure-edge-protection",
        number: 3,
        name: "Infrastructure and Edge Protection",
        weight: 16,
        summary:
          "VPC security, WAF/Shield, edge security, and network-layer defenses.",
      },
      {
        id: "scs-iam",
        number: 4,
        name: "Identity and Access Management",
        weight: 18,
        summary:
          "IAM policies, federation, permission boundaries, and cross-account access.",
      },
      {
        id: "scs-data-protection",
        number: 5,
        name: "Data Protection",
        weight: 16,
        summary:
          "KMS, encryption patterns, secrets management, and data classification.",
      },
      {
        id: "scs-management-security-governance",
        number: 6,
        name: "Management and Security Governance",
        weight: 14,
        summary:
          "Organizations/SCPs, multi-account governance, and compliance frameworks.",
      },
    ],
  },
  {
    id: "ans-c01",
    code: "ANS-C01",
    name: "AWS Certified Advanced Networking – Specialty",
    level: "specialty",
    tagline: "Complex hybrid networks, VPC design, and global connectivity.",
    description:
      "For network engineers: hybrid connectivity, Transit Gateway architectures, DNS, and network performance/security at scale.",
    questionCount: 65,
    durationMinutes: 170,
    costUsd: 300,
    passingScaledScore: 750,
    scaledScoreRange: [100, 1000],
    examGuideUrl:
      "https://aws.amazon.com/certification/certified-advanced-networking-specialty/",
    verified: false,
    featured: false,
    domains: [
      {
        id: "ans-network-design",
        number: 1,
        name: "Network Design",
        weight: 30,
        summary:
          "VPC/subnet design, hybrid connectivity (Direct Connect, VPN), and global architectures.",
      },
      {
        id: "ans-network-implementation",
        number: 2,
        name: "Network Implementation",
        weight: 26,
        summary:
          "Transit Gateway, routing, load balancing, and implementing connectivity solutions.",
      },
      {
        id: "ans-network-management-operations",
        number: 3,
        name: "Network Management and Operations",
        weight: 20,
        summary:
          "Monitoring, troubleshooting (Reachability Analyzer, flow logs), and network automation.",
      },
      {
        id: "ans-network-security-compliance",
        number: 4,
        name: "Network Security, Compliance, and Governance",
        weight: 24,
        summary:
          "Traffic inspection, encryption in transit, and securing network architectures.",
      },
    ],
  },
  {
    id: "sap-c02",
    code: "SAP-C02",
    name: "AWS Certified Solutions Architect – Professional",
    level: "professional",
    tagline: "Advanced architecture — complex orgs, migrations, and optimization.",
    description:
      "The pinnacle architecture certification: multi-account strategies, large-scale migrations, and optimizing complex hybrid solutions.",
    questionCount: 75,
    durationMinutes: 180,
    costUsd: 300,
    passingScaledScore: 750,
    scaledScoreRange: [100, 1000],
    examGuideUrl:
      "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
    verified: false,
    featured: true,
    domains: [
      {
        id: "sap-organizational-complexity",
        number: 1,
        name: "Design Solutions for Organizational Complexity",
        weight: 26,
        summary:
          "Multi-account structures, hybrid connectivity, and organization-wide resilience.",
      },
      {
        id: "sap-new-solutions",
        number: 2,
        name: "Design for New Solutions",
        weight: 29,
        summary:
          "Architecting greenfield solutions balancing security, reliability, performance, and cost.",
      },
      {
        id: "sap-continuous-improvement",
        number: 3,
        name: "Continuous Improvement for Existing Solutions",
        weight: 25,
        summary:
          "Evolving architectures — optimizing for cost, performance, security, and reliability.",
      },
      {
        id: "sap-migration-modernization",
        number: 4,
        name: "Accelerate Workload Migration and Modernization",
        weight: 20,
        summary:
          "Migration strategies, application modernization, and cutover planning.",
      },
    ],
  },
];

export const ALL_DOMAINS: CertDomain[] = CERTIFICATIONS.flatMap(
  (c) => c.domains,
);

export function getCertification(id: string): Certification | undefined {
  return CERTIFICATIONS.find((c) => c.id === id);
}

export function getCertificationByCode(code: string): Certification | undefined {
  return CERTIFICATIONS.find((c) => c.code === code);
}
