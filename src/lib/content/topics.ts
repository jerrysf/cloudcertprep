import type { DomainId } from "./schema";

export interface Topic {
  slug: string;
  name: string;
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
    name: "IAM & Access Control",
    domain: "design-secure-architectures",
    description:
      "IAM users, roles, policies, least privilege, MFA, and cross-account access patterns.",
  },
  {
    slug: "network-security",
    name: "Network Security",
    domain: "design-secure-architectures",
    description:
      "Security groups, network ACLs, AWS WAF, Shield, and securing VPC traffic.",
  },
  {
    slug: "data-protection",
    name: "Data Protection & Encryption",
    domain: "design-secure-architectures",
    description:
      "KMS, encryption at rest and in transit, Secrets Manager, and certificate management.",
  },
  {
    slug: "high-availability",
    name: "High Availability",
    domain: "design-resilient-architectures",
    description:
      "Multi-AZ design, Elastic Load Balancing, Route 53 routing, and eliminating single points of failure.",
  },
  {
    slug: "decoupling-and-messaging",
    name: "Decoupling & Messaging",
    domain: "design-resilient-architectures",
    description:
      "SQS, SNS, EventBridge, and loose coupling patterns that absorb failures.",
  },
  {
    slug: "disaster-recovery",
    name: "Disaster Recovery",
    domain: "design-resilient-architectures",
    description:
      "RTO/RPO trade-offs, backup and restore, pilot light, warm standby, and multi-site designs.",
  },
  {
    slug: "resilient-storage",
    name: "Resilient Storage",
    domain: "design-resilient-architectures",
    description:
      "S3 durability and versioning, EBS snapshots, EFS, and storage-level fault tolerance.",
  },
  {
    slug: "compute-selection",
    name: "Compute Selection",
    domain: "design-high-performing-architectures",
    description:
      "Choosing between EC2, Lambda, ECS, EKS, and batch/edge compute options.",
  },
  {
    slug: "database-selection-and-scaling",
    name: "Database Selection & Scaling",
    domain: "design-high-performing-architectures",
    description:
      "RDS vs Aurora vs DynamoDB, read replicas, partitioning, and caching with ElastiCache/DAX.",
  },
  {
    slug: "caching-and-content-delivery",
    name: "Caching & Content Delivery",
    domain: "design-high-performing-architectures",
    description:
      "CloudFront, global acceleration, ElastiCache strategies, and latency reduction.",
  },
  {
    slug: "scalability-and-elasticity",
    name: "Scalability & Elasticity",
    domain: "design-high-performing-architectures",
    description:
      "Auto Scaling policies, scaling metrics, and designing for variable demand.",
  },
  {
    slug: "cost-optimized-storage",
    name: "Cost-Optimized Storage",
    domain: "design-cost-optimized-architectures",
    description:
      "S3 storage classes, lifecycle policies, and matching storage tiers to access patterns.",
  },
  {
    slug: "cost-optimized-compute",
    name: "Cost-Optimized Compute",
    domain: "design-cost-optimized-architectures",
    description:
      "On-Demand vs Savings Plans vs Reserved vs Spot, right-sizing, and serverless cost levers.",
  },
  {
    slug: "cost-optimized-databases-and-network",
    name: "Cost-Optimized Databases & Networking",
    domain: "design-cost-optimized-architectures",
    description:
      "Aurora vs RDS vs DynamoDB cost profiles, data transfer costs, and NAT Gateway spend.",
  },
];

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}
