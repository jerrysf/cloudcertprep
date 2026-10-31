import type { Question } from "../schema";

/**
 * SCS-C02 (AWS Certified Security – Specialty) seed questions.
 */
export const scsQuestions: Question[] = [
  {
    id: "scs-det-001",
    slug: "aggregate-security-findings-centrally",
    cert: "scs-c02",
    domain: "scs-threat-detection-ir",
    topic: "scs-detection-and-response",
    subtopic: "Security Hub",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A security team wants a single pane of glass aggregating findings from GuardDuty, Inspector, Macie, and third-party tools across all accounts, with severity scoring and automated remediation. Which service?",
    options: [
      { id: "A", text: "AWS Config" },
      { id: "B", text: "AWS Security Hub" },
      { id: "C", text: "Amazon Detective" },
      { id: "D", text: "AWS Trusted Advisor" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Security Hub is the central findings aggregation service — it normalizes findings from AWS services and partner integrations, scores them by severity, and supports automated remediation via custom actions and EventBridge.",
    optionExplanations: {
      A: "Config tracks resource configuration compliance, not security findings aggregation.",
      B: "Correct. Security Hub is the central security findings dashboard.",
      C: "Detective visualizes/investigates findings sources but isn't the aggregation layer.",
      D: "Trusted Advisor gives best-practice checks, not findings correlation.",
    },
    services: ["AWS Security Hub"],
    references: [
      {
        title: "What is AWS Security Hub",
        url: "https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "scs-iam-001",
    slug: "permission-boundary-vs-scp-difference",
    cert: "scs-c02",
    domain: "scs-iam",
    topic: "scs-iam-deep-dive",
    subtopic: "Guardrails",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A platform team wants every developer to manage their own IAM roles, but no role a developer creates may exceed a defined permission ceiling. Which mechanism enforces this ceiling on self-service role creation?",
    options: [
      { id: "A", text: "Service control policies (SCPs)" },
      { id: "B", text: "Permissions boundaries" },
      { id: "C", text: "Resource-based policies" },
      { id: "D", text: "Session policies" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Permissions boundaries set the maximum permissions an identity-based policy can grant — a created role is effective only within its boundary, enabling delegated role creation with a hard ceiling. SCPs apply at the org/account level to all principals, not per-created-entity.",
    optionExplanations: {
      A: "SCPs restrict the whole account/org level, not specifically delegated role creation.",
      B: "Correct. Boundaries are the mechanism for safe self-service role management.",
      C: "Resource policies control access to specific resources, not role creation ceilings.",
      D: "Session policies constrain temporary sessions, not role permission limits.",
    },
    services: ["AWS IAM", "AWS Organizations"],
    references: [
      {
        title: "Permissions boundaries for IAM entities",
        url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "scs-enc-001",
    slug: "envelope-encryption-with-kms",
    cert: "scs-c02",
    domain: "scs-data-protection",
    topic: "scs-encryption-and-keys",
    subtopic: "KMS fundamentals",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An application encrypts large volumes of data. KMS has a 4 KB limit per Encrypt call. How does KMS handle encryption of larger data?",
    options: [
      { id: "A", text: "KMS automatically splits data into 4 KB chunks" },
      { id: "B", text: "Envelope encryption — KMS generates a data key that encrypts the data locally, and encrypts only that key" },
      { id: "C", text: "Stream the data through KMS in batches" },
      { id: "D", text: "Upload data to KMS-managed S3 storage" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Envelope encryption: GenerateDataKey returns a plaintext data key + its KMS-encrypted copy. The app encrypts data locally with the data key, stores the encrypted data key alongside, and decrypts only via KMS — the data never transits KMS.",
    optionExplanations: {
      A: "KMS doesn't accept data over the 4 KB limit — it never sees the bulk data.",
      B: "Correct. Only the data key goes through KMS; bulk encryption happens locally.",
      C: "There's no streaming Encrypt API — KMS only encrypts the small data key.",
      D: "KMS doesn't store customer data; it manages keys.",
    },
    services: ["AWS KMS"],
    references: [
      {
        title: "Envelope encryption",
        url: "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#enveloping",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "scs-det-002",
    slug: "cloudtrail-vs-config-vs-guardduty",
    cert: "scs-c02",
    domain: "scs-security-logging-monitoring",
    topic: "scs-logging-and-audit",
    subtopic: "Logging services",
    difficulty: "medium",
    format: "multiple-response",
    question:
      "Which TWO services record WHO did WHAT and WHEN in an AWS account — forming the audit trail for security investigations? (Select TWO.)",
    options: [
      { id: "A", text: "AWS CloudTrail" },
      { id: "B", text: "AWS Config" },
      { id: "C", text: "Amazon GuardDuty" },
      { id: "D", text: "Amazon Macie" },
      { id: "E", text: "VPC Flow Logs" },
    ],
    correctAnswers: ["A", "B"],
    explanation:
      "CloudTrail logs every API call (who/what/when) — the primary audit trail. Config records resource configuration history and changes — complementary audit for 'what changed and when'. GuardDuty detects threats; Macie finds sensitive data; Flow Logs capture network traffic, not API attribution.",
    optionExplanations: {
      A: "Correct. CloudTrail is the canonical who-did-what audit service.",
      B: "Correct. Config provides the configuration-change history trail.",
      C: "GuardDuty analyzes logs to detect threats — it doesn't record the audit trail itself.",
      D: "Macie scans S3 for sensitive data — discovery, not audit.",
      E: "Flow Logs record network flows (source/dest/ports), not API activity.",
    },
    services: ["AWS CloudTrail", "AWS Config"],
    references: [
      {
        title: "AWS CloudTrail",
        url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html",
      },
      {
        title: "AWS Config",
        url: "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
];
