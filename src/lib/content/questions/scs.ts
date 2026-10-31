import type { Question } from "../schema";

/**
 * SCS-C02 (AWS Certified Security – Specialty) seed questions.
 */
export const scsQuestions: Question[] = [
  {
    id: "scs-det-001",
    slug: "aggregate-security-findings-centrally",
    cert: "scs-c03",
    domain: "scs-detection",
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
    cert: "scs-c03",
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
    cert: "scs-c03",
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
    cert: "scs-c03",
    domain: "scs-detection",
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
  {
    id: "scs-ir-001",
    slug: "compromised-access-key-response",
    cert: "scs-c03",
    domain: "scs-incident-response",
    topic: "scs-incident-response",
    subtopic: "Credential compromise",
    difficulty: "medium",
    format: "single-choice",
    question:
      "CloudTrail shows an IAM user's access key making API calls from an unknown IP — the key is compromised. What's the correct FIRST response?",
    options: [
      { id: "A", text: "Delete the IAM user entirely" },
      { id: "B", text: "Deactivate the access key (and rotate), then investigate the blast radius" },
      { id: "C", text: "Send the user an email asking if it was them" },
      { id: "D", text: "Change the user's console password" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Deactivate the exposed key immediately to stop bleeding — then scope the incident via CloudTrail (what was called, from where) and rotate credentials. Deleting the user first destroys evidence and can break applications using other credentials on that user.",
    optionExplanations: {
      A: "Deleting the user is heavier-handed, loses forensic context, and may break workloads.",
      B: "Correct. Contain first (deactivate), then investigate, then rotate.",
      C: "Email delays containment while the attacker keeps access.",
      D: "Console password doesn't stop programmatic API abuse of the access key.",
    },
    services: ["AWS IAM", "AWS CloudTrail"],
    references: [
      {
        title: "Responding to compromised credentials",
        url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "scs-inf-001",
    slug: "waf-shield-ddos-protection",
    cert: "scs-c03",
    domain: "scs-infrastructure-security",
    topic: "scs-infrastructure-security",
    subtopic: "DDoS and edge protection",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A public web application behind an ALB faces repeated SQL-injection attempts and L7 floods. Which AWS services address application-layer attacks? (Choose the best single answer.)",
    options: [
      { id: "A", text: "AWS Shield Standard alone" },
      { id: "B", text: "AWS WAF rules on the ALB (SQLi/XSS rate-limiting rules) — Shield Advanced optional for enhanced DDoS" },
      { id: "C", text: "Security groups denying suspicious IPs" },
      { id: "D", text: "Amazon Inspector agent on the instances" },
    ],
    correctAnswers: ["B"],
    explanation:
      "WAF inspects HTTP requests and blocks SQLi/XSS/rate abuse at the ALB/CloudFront layer. Shield Standard (free) covers L3/L4 floods automatically; Shield Advanced adds enhanced protection and response. Inspector finds host vulnerabilities — it doesn't filter web attacks.",
    optionExplanations: {
      A: "Shield Standard covers L3/L4 only, not application-layer payloads.",
      B: "Correct. WAF is the L7 filtering layer; Shield handles DDoS.",
      C: "SGs can't filter by request content or dynamic rate limits.",
      D: "Inspector assesses vulnerabilities — it doesn't block attacks.",
    },
    services: ["AWS WAF", "AWS Shield", "Elastic Load Balancing"],
    references: [
      {
        title: "AWS WAF",
        url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "scs-det-003",
    slug: "guardduty-vs-inspector-vs-macie",
    cert: "scs-c03",
    domain: "scs-detection",
    topic: "scs-detection-and-response",
    subtopic: "Detection services",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which service detects a pattern like 'IAM credentials being used from an unusual geography combined with crypto-mining API calls' as a managed threat-detection finding?",
    options: [
      { id: "A", text: "Amazon Inspector" },
      { id: "B", text: "Amazon GuardDuty" },
      { id: "C", text: "Amazon Macie" },
      { id: "D", text: "AWS Config" },
    ],
    correctAnswers: ["B"],
    explanation:
      "GuardDuty is the managed threat-detection service — it continuously analyzes CloudTrail events, DNS logs, VPC Flow Logs (and more) using ML and threat intelligence to flag anomalies like credential misuse and crypto-mining. Inspector finds CVEs; Macie finds sensitive data; Config checks configuration.",
    optionExplanations: {
      A: "Inspector scans for software vulnerabilities, not behavioral threats.",
      B: "Correct. GuardDuty detects anomalous/malicious behavior from telemetry.",
      C: "Macie discovers PII/sensitive data in S3.",
      D: "Config evaluates resource configurations against rules.",
    },
    services: ["Amazon GuardDuty", "Amazon Inspector", "Amazon Macie"],
    references: [
      {
        title: "Amazon GuardDuty",
        url: "https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "scs-gov-001",
    slug: "scp-deny-leave-org",
    cert: "scs-c03",
    domain: "scs-security-foundations-governance",
    topic: "scs-governance",
    subtopic: "SCPs",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A security team must ensure no member account can disable CloudTrail or remove itself from the organization. Which control enforces this at the organization level?",
    options: [
      { id: "A", text: "IAM policies in each account" },
      { id: "B", text: "An SCP denying cloudtrail:StopLogging/DeleteTrail and organizations:LeaveOrganization" },
      { id: "C", text: "CloudWatch alarms on CloudTrail events" },
      { id: "D", text: "A tagging policy requiring audit tags" },
    ],
    correctAnswers: ["B"],
    explanation:
      "SCPs applied at the org/OU level set maximum permissions member accounts can exercise — including blocking tampering with audit trails and leaving the org. Local IAM can't override an SCP.",
    optionExplanations: {
      A: "Account admins can modify local IAM — not a guarantee.",
      B: "Correct. SCPs are the enforcement boundary member accounts can't escape.",
      C: "Alarms detect after the fact — and can themselves be disabled.",
      D: "Tag policies govern tagging, not API permissions.",
    },
    services: ["AWS Organizations", "AWS CloudTrail"],
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
];
