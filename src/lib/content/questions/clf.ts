import type { Question } from "../schema";

/**
 * CLF-C02 (AWS Certified Cloud Practitioner) seed questions.
 * Original scenarios aligned to the published CLF-C02 domain structure.
 */
export const clfQuestions: Question[] = [
  {
    id: "clf-cc-001",
    slug: "shared-responsibility-boundary",
    cert: "clf-c02",
    domain: "clf-security-compliance",
    topic: "clf-security-basics",
    subtopic: "Shared responsibility",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Under the AWS shared responsibility model, who is responsible for patching the guest operating system on an Amazon EC2 instance?",
    options: [
      { id: "A", text: "AWS" },
      { id: "B", text: "The customer" },
      { id: "C", text: "Both AWS and the customer share it equally" },
      { id: "D", text: "The EC2 hypervisor team" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AWS is responsible for security OF the cloud (hardware, facilities, hypervisor); the customer is responsible for security IN the cloud — including the guest OS, applications, and data on EC2.",
    optionExplanations: {
      A: "AWS patches the underlying infrastructure, not your guest OS.",
      B: "Correct. Guest OS patching on EC2 is a customer responsibility.",
      C: "Responsibilities are divided by layer, not shared equally on each task.",
      D: "Hypervisor maintenance is AWS's job; the guest OS is yours.",
    },
    services: ["Amazon EC2"],
    references: [
      {
        title: "Shared responsibility model",
        url: "https://aws.amazon.com/compliance/shared-responsibility-model/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "clf-cc-002",
    slug: "what-aws-provides-in-cloud-value",
    cert: "clf-c02",
    domain: "clf-cloud-concepts",
    topic: "clf-cloud-essentials",
    subtopic: "Cloud benefits",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which is a key benefit of running workloads on AWS compared to on-premises data centers?",
    options: [
      { id: "A", text: "Trade capital expense for variable expense — pay only for what you use" },
      { id: "B", text: "Applications automatically become more secure with no configuration" },
      { id: "C", text: "All AWS services are free below a usage threshold" },
      { id: "D", text: "AWS eliminates the need for any IT staff" },
    ],
    correctAnswers: ["A"],
    explanation:
      "The core cloud economics benefit: you stop guessing capacity and paying upfront for hardware (CapEx) and instead pay variable, consumption-based cost (OpEx) that scales with actual usage.",
    optionExplanations: {
      A: "Correct. CapEx → OpEx and pay-as-you-go is the foundational cloud benefit.",
      B: "Security still requires customer configuration under the shared model.",
      C: "AWS has a Free Tier, but most services bill beyond it — 'all free' is wrong.",
      D: "AWS reduces undifferentiated heavy lifting, but staff are still needed.",
    },
    services: ["AWS Cloud"],
    references: [
      {
        title: "Six advantages of cloud computing",
        url: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "clf-cc-003",
    slug: "aws-global-infrastructure-parts",
    cert: "clf-c02",
    domain: "clf-technology-services",
    topic: "clf-core-services",
    subtopic: "Global infrastructure",
    difficulty: "easy",
    format: "multiple-response",
    question:
      "Which TWO components are part of the AWS global infrastructure? (Select TWO.)",
    options: [
      { id: "A", text: "Regions" },
      { id: "B", text: "Availability Zones" },
      { id: "C", text: "Subnets" },
      { id: "D", text: "Security groups" },
      { id: "E", text: "IAM policies" },
    ],
    correctAnswers: ["A", "B"],
    explanation:
      "AWS global infrastructure consists of Regions (geographic areas), Availability Zones (isolated data centers within Regions), and edge locations/CloudFront PoPs. Subnets and security groups are constructs you create inside a VPC.",
    optionExplanations: {
      A: "Correct. Regions are the top-level geographic units of AWS infrastructure.",
      B: "Correct. AZs are physically separate data centers within a Region.",
      C: "Subnets are user-created IP ranges inside a VPC — not infrastructure.",
      D: "Security groups are instance-level firewall rules — configuration, not infrastructure.",
      E: "IAM policies are access-control documents — configuration, not infrastructure.",
    },
    services: ["AWS global infrastructure"],
    references: [
      {
        title: "AWS global infrastructure",
        url: "https://aws.amazon.com/about-aws/global-infrastructure/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "clf-cc-004",
    slug: "consolidated-billing-benefit",
    cert: "clf-c02",
    domain: "clf-billing-pricing-support",
    topic: "clf-billing-and-support",
    subtopic: "Billing",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A company manages 20 AWS accounts under AWS Organizations. Which benefit does consolidated billing provide at no extra cost?",
    options: [
      { id: "A", text: "A single bill plus combined usage volume for discounted pricing tiers" },
      { id: "B", text: "Automatic cost optimization of idle resources" },
      { id: "C", text: "Free migration of workloads between accounts" },
      { id: "D", text: "Removal of all service quotas across member accounts" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Consolidated billing rolls all member-account usage into one payer bill — combining usage volume to reach lower pricing tiers (e.g., S3 volume discounts) while preserving per-account cost visibility.",
    optionExplanations: {
      A: "Correct. One bill + pooled volume pricing is the feature's purpose.",
      B: "Cost optimization requires tools like Compute Optimizer — billing consolidation doesn't act on resources.",
      C: "Account migration isn't a billing feature.",
      D: "Service quotas are independent of billing structure.",
    },
    services: ["AWS Organizations", "AWS Billing"],
    references: [
      {
        title: "Consolidated billing for AWS Organizations",
        url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
];
