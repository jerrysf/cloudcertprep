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
  /** Cert vendor — defaults to "aws" for the original bank. */
  vendor?: "aws" | "azure";
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
    verified: true,
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
    verified: true,
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
    verified: true,
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
    name: "AWS Certified CloudOps Engineer – Associate",
    level: "associate",
    tagline: "Operate AWS workloads — monitoring, automation, and reliability.",
    description:
      "For cloud operations roles (formerly SysOps Administrator): running production workloads, monitoring, incident response, automation, and networking.",
    questionCount: 65,
    durationMinutes: 130,
    costUsd: 150,
    passingScaledScore: 720,
    scaledScoreRange: [100, 1000],
    examGuideUrl:
      "https://aws.amazon.com/certification/certified-cloudops-engineer-associate/",
    verified: true,
    featured: false,
    domains: [
      {
        id: "soa-monitoring-logging-remediation",
        number: 1,
        name: "Monitoring, Logging, Analysis, Remediation, and Performance Optimization",
        weight: 22,
        summary:
          "CloudWatch metrics/alarms/logs, event-driven remediation, observability, and performance tuning.",
      },
      {
        id: "soa-reliability-continuity",
        number: 2,
        name: "Reliability and Business Continuity",
        weight: 22,
        summary:
          "Backups, disaster recovery implementation, and scalable/resilient operations.",
      },
      {
        id: "soa-deployment-provisioning-automation",
        number: 3,
        name: "Deployment, Provisioning, and Automation",
        weight: 22,
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
    verified: true,
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
    id: "scs-c03",
    code: "SCS-C03",
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
    verified: true,
    featured: false,
    domains: [
      {
        id: "scs-detection",
        number: 1,
        name: "Detection",
        weight: 16,
        summary:
          "Threat detection, security findings, and detection-focused logging (GuardDuty, Security Hub, CloudTrail, Config).",
      },
      {
        id: "scs-incident-response",
        number: 2,
        name: "Incident Response",
        weight: 14,
        summary:
          "Incident response plans, isolation, forensics, and recovery from compromises.",
      },
      {
        id: "scs-infrastructure-security",
        number: 3,
        name: "Infrastructure Security",
        weight: 18,
        summary:
          "VPC security, WAF/Shield, edge protection, and network-layer defenses.",
      },
      {
        id: "scs-iam",
        number: 4,
        name: "Identity and Access Management",
        weight: 20,
        summary:
          "IAM policies, federation, permission boundaries, and cross-account access.",
      },
      {
        id: "scs-data-protection",
        number: 5,
        name: "Data Protection",
        weight: 18,
        summary:
          "KMS, encryption patterns, secrets management, and data classification.",
      },
      {
        id: "scs-security-foundations-governance",
        number: 6,
        name: "Security Foundations and Governance",
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
    verified: true,
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
    verified: true,
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
  {
    id: "az-900",
    code: "AZ-900",
    name: "Microsoft Azure Fundamentals",
    vendor: "azure",
    level: "foundational",
    tagline: "Cloud concepts, Azure architecture, and management & governance basics.",
    description:
      "Microsoft's entry-level cloud certification. Validates foundational knowledge of cloud concepts, Azure services, and management/governance tooling — no technical experience required.",
    questionCount: 45,
    durationMinutes: 45,
    costUsd: 99,
    passingScaledScore: 700,
    scaledScoreRange: [1, 1000],
    examGuideUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
    verified: false,
    featured: true,
    domains: [
      {
        id: "az-cloud-concepts",
        number: 1,
        name: "Describe Cloud Concepts",
        weight: 30,
        summary:
          "Cloud models (public/private/hybrid), consumption-based pricing, shared responsibility, and the benefits of cloud services.",
      },
      {
        id: "az-architecture-services",
        number: 2,
        name: "Describe Azure Architecture and Services",
        weight: 35,
        summary:
          "Regions and availability zones, compute/networking/storage services, and identity & access (Microsoft Entra, RBAC, zero trust).",
      },
      {
        id: "az-management-governance",
        number: 3,
        name: "Describe Azure Management and Governance",
        weight: 35,
        summary:
          "Cost management tools, governance (Azure Policy, resource locks, tags), monitoring (Azure Monitor, Advisor, Service Health), and deployment tools.",
      },
    ],
  },
  {
    id: "az-104",
    code: "AZ-104",
    name: "Microsoft Azure Administrator Associate",
    vendor: "azure",
    level: "associate",
    tagline: "Implement, manage, and monitor Azure environments — identity, storage, compute, networking.",
    description:
      "The core Azure role-based certification. Tests hands-on administration: identity and governance, storage configuration, compute deployment, virtual networking, and monitoring/backup. The standard next step after AZ-900.",
    questionCount: 55,
    durationMinutes: 100,
    costUsd: 165,
    passingScaledScore: 700,
    scaledScoreRange: [1, 1000],
    examGuideUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
    verified: false,
    featured: true,
    domains: [
      {
        id: "az104-identities-governance",
        number: 1,
        name: "Manage Azure Identities and Governance",
        weight: 20,
        summary:
          "Microsoft Entra ID users/groups, RBAC at scope, Azure Policy, management groups, and resource governance.",
      },
      {
        id: "az104-storage",
        number: 2,
        name: "Implement and Manage Storage",
        weight: 20,
        summary:
          "Storage accounts, redundancy options, access tiers, blob/file configuration, SAS/access keys, and data transfer tools.",
      },
      {
        id: "az104-compute",
        number: 3,
        name: "Deploy and Manage Azure Compute Resources",
        weight: 25,
        summary:
          "VMs, availability options, scale sets, App Service, containers (ACI/AKS), and ARM template deployments.",
      },
      {
        id: "az104-networking",
        number: 4,
        name: "Implement and Manage Virtual Networking",
        weight: 20,
        summary:
          "VNets, peering, NSGs, DNS, load balancing (LB/Application Gateway), VPN/ExpressRoute connectivity.",
      },
      {
        id: "az104-monitoring",
        number: 5,
        name: "Monitor and Maintain Azure Resources",
        weight: 15,
        summary:
          "Azure Monitor metrics/logs/alerts, VM insights, Azure Backup, and Azure Site Recovery.",
      },
    ],
  },
  {
    id: "ai-900",
    code: "AI-900",
    name: "Microsoft Azure AI Fundamentals",
    vendor: "azure",
    level: "foundational",
    tagline: "AI workloads, ML fundamentals, vision/NLP, and generative AI on Azure.",
    description:
      "Microsoft's entry-level AI certification. Validates AI/ML vocabulary, Azure AI services (vision, language, document intelligence), and generative AI concepts including Azure OpenAI — no coding or ML experience required.",
    questionCount: 45,
    durationMinutes: 60,
    costUsd: 99,
    passingScaledScore: 700,
    scaledScoreRange: [1, 1000],
    examGuideUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/",
    verified: false,
    featured: true,
    domains: [
      {
        id: "ai900-ai-workloads",
        number: 1,
        name: "Describe AI Workloads and Considerations",
        weight: 15,
        summary:
          "Common AI workload types, responsible AI principles, and matching workloads to business scenarios.",
      },
      {
        id: "ai900-ml-principles",
        number: 2,
        name: "Describe Fundamental Principles of Machine Learning on Azure",
        weight: 25,
        summary:
          "Regression/classification/clustering, training vs inference, features/labels, and Azure Machine Learning basics.",
      },
      {
        id: "ai900-computer-vision",
        number: 3,
        name: "Describe Features of Computer Vision Workloads on Azure",
        weight: 20,
        summary:
          "Image classification, object detection, OCR, facial analysis, and Azure AI Vision services.",
      },
      {
        id: "ai900-nlp",
        number: 4,
        name: "Describe Features of Natural Language Processing Workloads on Azure",
        weight: 20,
        summary:
          "Language understanding, text analytics, speech services, translation, and Azure AI Language/Speech.",
      },
      {
        id: "ai900-generative-ai",
        number: 5,
        name: "Describe Features of Generative AI Workloads on Azure",
        weight: 20,
        summary:
          "Azure OpenAI Service, prompt engineering, grounding/RAG, and responsible generative AI.",
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
