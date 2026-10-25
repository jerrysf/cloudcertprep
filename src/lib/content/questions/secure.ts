import type { Question } from "../schema";

export const secureQuestions: Question[] = [
  {
    id: "saa-sec-001",
    slug: "least-privilege-permissions-for-lambda",
    domain: "design-secure-architectures",
    topic: "iam-and-access-control",
    subtopic: "IAM roles and policies",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A Lambda function must read objects from one specific S3 bucket and nothing else. What is the MOST secure way to grant this access?",
    options: [
      { id: "A", text: "Attach the AdministratorAccess managed policy to the Lambda execution role" },
      { id: "B", text: "Create an IAM role with a policy allowing s3:GetObject on that bucket's resources and assign it to the function" },
      { id: "C", text: "Embed an IAM user's access key in the function's environment variables" },
      { id: "D", text: "Make the S3 bucket public and use unsigned requests" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Lambda functions should assume an IAM execution role scoped to least privilege. Granting s3:GetObject on the specific bucket ARN (and its object ARN) gives the function only the access it needs, and credentials are delivered via temporary role credentials rather than long-lived keys.",
    optionExplanations: {
      A: "AdministratorAccess violates least privilege and grants far more than needed.",
      B: "Correct. A scoped execution role provides temporary, least-privilege credentials.",
      C: "Embedding access keys creates long-lived credentials that can leak and are hard to rotate.",
      D: "Public buckets remove access control entirely and expose the data to anyone.",
    },
    services: ["AWS Lambda", "AWS IAM", "Amazon S3"],
    references: [
      {
        title: "Security best practices in IAM",
        url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
      },
      {
        title: "Lambda execution role",
        url: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-002",
    slug: "cross-account-access-with-roles",
    domain: "design-secure-architectures",
    topic: "iam-and-access-control",
    subtopic: "Cross-account access",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A partner AWS account needs read access to CloudTrail logs in your S3 bucket. Which approach follows AWS best practices for cross-account access?",
    options: [
      { id: "A", text: "Share your account's root credentials with the partner" },
      { id: "B", text: "Create an IAM user in your account and share its access key with the partner" },
      { id: "C", text: "Create an IAM role in your account with a trust policy allowing the partner account to assume it, with a policy granting read access to the bucket" },
      { id: "D", text: "Create a second S3 bucket in the partner account and enable replication" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Cross-account access should use IAM roles with trust policies. The partner account assumes the role and receives temporary credentials — no long-lived credentials are shared, and access can be revoked by deleting the role or updating the trust policy.",
    optionExplanations: {
      A: "Root credentials grant unrestricted access to everything and must never be shared.",
      B: "Sharing user access keys distributes long-lived credentials that are difficult to rotate safely.",
      C: "Correct. Role assumption with a trust policy is the recommended cross-account pattern.",
      D: "Replication adds cost and complexity and does not give controlled read access to existing logs.",
    },
    services: ["AWS IAM", "Amazon S3", "AWS STS"],
    references: [
      {
        title: "IAM roles",
        url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
      },
      {
        title: "Cross-account resource access in IAM",
        url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-003",
    slug: "enforce-mfa-for-privileged-users",
    domain: "design-secure-architectures",
    topic: "iam-and-access-control",
    subtopic: "Identity hardening",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which combination of measures best protects highly privileged IAM users according to AWS best practices?",
    options: [
      { id: "A", text: "Enable MFA and apply least-privilege policies" },
      { id: "B", text: "Rotate access keys every 5 years and share credentials across the team" },
      { id: "C", text: "Use the root user for daily administration to avoid IAM complexity" },
      { id: "D", text: "Store credentials in a private GitHub repository" },
    ],
    correctAnswers: ["A"],
    explanation:
      "AWS recommends enabling MFA for all privileged users and applying least-privilege permissions. The root user should only be used for tasks that require it, credentials should never be shared, and secrets must never be committed to source control.",
    optionExplanations: {
      A: "Correct. MFA plus least privilege is the core AWS identity hardening guidance.",
      B: "Shared credentials destroy accountability; rotation alone does not limit excessive permissions.",
      C: "The root user should be locked away and protected with MFA, not used daily.",
      D: "Secrets in repositories are a leading cause of account compromise.",
    },
    services: ["AWS IAM"],
    references: [
      {
        title: "Security best practices in IAM",
        url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-004",
    slug: "restrict-access-across-accounts-with-scps",
    domain: "design-secure-architectures",
    topic: "iam-and-access-control",
    subtopic: "Multi-account guardrails",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A company uses AWS Organizations with dozens of member accounts. Security wants to guarantee that no member account can disable CloudTrail or move resources to unapproved Regions, even if an account administrator tries. What should they use?",
    options: [
      { id: "A", text: "IAM permission boundaries on every user" },
      { id: "B", text: "Service control policies (SCPs) attached to the organization or OUs" },
      { id: "C", text: "AWS Config rules in each member account" },
      { id: "D", text: "Amazon GuardDuty with threat detection enabled" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Service control policies set the maximum available permissions for accounts in an organization or OU. An SCP can deny cloudtrail:StopLogging / DeleteTrail and restrict aws:RequestedRegion, and member account administrators cannot exceed or remove an SCP.",
    optionExplanations: {
      A: "Permission boundaries limit IAM users/roles but an account admin could create new unbounded principals; they do not constrain the account itself.",
      B: "Correct. SCPs are organization-level guardrails that member accounts cannot bypass.",
      C: "Config rules detect and can remediate noncompliance but do not prevent the action.",
      D: "GuardDuty detects threats and anomalies; it is detective, not preventive.",
    },
    services: ["AWS Organizations", "AWS IAM", "AWS CloudTrail"],
    references: [
      {
        title: "Service control policies (SCPs)",
        url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-005",
    slug: "security-groups-vs-network-acls",
    domain: "design-secure-architectures",
    topic: "network-security",
    subtopic: "VPC traffic control",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A solutions architect needs to deny traffic from a specific malicious IP range at the subnet boundary. Security groups only support allow rules. Which control can explicitly DENY the IP range?",
    options: [
      { id: "A", text: "A security group with a deny rule for the CIDR block" },
      { id: "B", text: "A network ACL (NACL) with a deny rule for the CIDR block" },
      { id: "C", text: "An internet gateway route table entry" },
      { id: "D", text: "An Amazon Route 53 routing policy" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Network ACLs are stateless firewall rules applied at the subnet level and support both allow and deny rules. Security groups operate at the instance/ENI level, are stateful, and support only allow rules — so the explicit deny must be done with a NACL.",
    optionExplanations: {
      A: "Security groups cannot deny; they only allow.",
      B: "Correct. NACLs support explicit deny rules evaluated in numbered order.",
      C: "Route tables control where traffic goes, not whether it is permitted.",
      D: "Route 53 is DNS; it does not filter packet traffic.",
    },
    services: ["Amazon VPC"],
    references: [
      {
        title: "Network ACLs",
        url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
      },
      {
        title: "Security groups",
        url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-006",
    slug: "protect-web-app-from-sql-injection",
    domain: "design-secure-architectures",
    topic: "network-security",
    subtopic: "Application-layer protection",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An application behind an Application Load Balancer is experiencing SQL injection attempts and cross-site scripting in HTTP requests. Which AWS service provides managed rules to block these common web exploits at layer 7?",
    options: [
      { id: "A", text: "AWS Shield Standard" },
      { id: "B", text: "AWS WAF attached to the ALB" },
      { id: "C", text: "Amazon Inspector" },
      { id: "D", text: "Security groups with stricter port rules" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AWS WAF is a web application firewall that inspects HTTP(S) requests. AWS Managed Rules include rule groups that block SQL injection and XSS patterns, and WAF attaches directly to an ALB, CloudFront distribution, API Gateway, or AppSync API.",
    optionExplanations: {
      A: "Shield Standard mitigates layer 3/4 DDoS attacks, not layer 7 application exploits.",
      B: "Correct. WAF inspects web requests and blocks OWASP-style attack patterns.",
      C: "Inspector scans workloads for software vulnerabilities; it does not filter live traffic.",
      D: "Security groups filter by port/protocol/IP, not request content.",
    },
    services: ["AWS WAF", "Elastic Load Balancing", "AWS Shield"],
    references: [
      {
        title: "AWS WAF developer guide",
        url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-007",
    slug: "allow-private-subnet-instances-internet-egress",
    domain: "design-secure-architectures",
    topic: "network-security",
    subtopic: "VPC egress",
    difficulty: "medium",
    format: "single-choice",
    question:
      "EC2 instances in a private subnet must download OS patches from the internet, but must NOT accept inbound connections initiated from the internet. What should the architect deploy?",
    options: [
      { id: "A", text: "An internet gateway with a route from the private subnet" },
      { id: "B", text: "A NAT gateway in a public subnet with a route from the private subnet" },
      { id: "C", text: "A VPC peering connection to another VPC" },
      { id: "D", text: "An Elastic IP address assigned to each instance" },
    ],
    correctAnswers: ["B"],
    explanation:
      "A NAT gateway in a public subnet lets private-subnet instances initiate outbound IPv4 connections to the internet while blocking unsolicited inbound connections — exactly the egress-only requirement.",
    optionExplanations: {
      A: "Routing a private subnet to an internet gateway does not help instances without public IPs, and is not the controlled egress pattern.",
      B: "Correct. NAT gateway provides outbound-only internet access for private subnets.",
      C: "VPC peering connects two VPCs; it does not provide internet access.",
      D: "Elastic IPs on private instances would expose them if the subnet routed to an IGW and defeats the 'private' design.",
    },
    services: ["Amazon VPC", "Amazon EC2"],
    references: [
      {
        title: "NAT gateways",
        url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-008",
    slug: "layer-3-4-ddos-protection",
    domain: "design-secure-architectures",
    topic: "network-security",
    subtopic: "DDoS mitigation",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which AWS service automatically protects resources such as CloudFront distributions and Elastic Load Balancers against common network and transport layer (layer 3/4) DDoS attacks at no additional cost?",
    options: [
      { id: "A", text: "AWS Shield Standard" },
      { id: "B", text: "Amazon Macie" },
      { id: "C", text: "AWS Artifact" },
      { id: "D", text: "Amazon Detective" },
    ],
    correctAnswers: ["A"],
    explanation:
      "AWS Shield Standard is enabled automatically at no cost and protects against common layer 3 and layer 4 DDoS attacks. Shield Advanced adds costlier protections and response support for a fee.",
    optionExplanations: {
      A: "Correct. Shield Standard provides automatic, free L3/L4 DDoS mitigation.",
      B: "Macie discovers sensitive data in S3; it is not a DDoS service.",
      C: "Artifact provides compliance reports, not network protection.",
      D: "Detective helps investigate security findings; it does not mitigate attacks.",
    },
    services: ["AWS Shield", "Amazon CloudFront", "Elastic Load Balancing"],
    references: [
      {
        title: "AWS Shield",
        url: "https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-009",
    slug: "encrypt-data-at-rest-with-customer-controlled-keys",
    domain: "design-secure-architectures",
    topic: "data-protection",
    subtopic: "KMS",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Compliance requires that the company controls the keys used to encrypt data in S3, including the ability to rotate keys and audit every key usage. Which encryption option meets these requirements?",
    options: [
      { id: "A", text: "SSE-S3 with Amazon S3 managed keys" },
      { id: "B", text: "SSE-KMS with a customer managed key (CMK)" },
      { id: "C", text: "Client-side encryption with keys stored in a spreadsheet" },
      { id: "D", text: "TLS encryption in transit only" },
    ],
    correctAnswers: ["B"],
    explanation:
      "SSE-KMS with a customer managed key gives the company control over key policies, rotation, and disablement, and every use of the key is logged in CloudTrail for auditing.",
    optionExplanations: {
      A: "SSE-S3 uses keys fully managed by Amazon; the customer cannot control rotation or audit key use.",
      B: "Correct. Customer managed KMS keys provide control, rotation, and CloudTrail audit of key usage.",
      C: "Spreadsheets are not a key management system; client-side encryption is possible but this approach is insecure.",
      D: "TLS protects data in transit, not data at rest.",
    },
    services: ["AWS KMS", "Amazon S3", "AWS CloudTrail"],
    references: [
      {
        title: "AWS Key Management Service concepts",
        url: "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html",
      },
      {
        title: "Using server-side encryption with AWS KMS",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-010",
    slug: "store-database-credentials-with-automatic-rotation",
    domain: "design-secure-architectures",
    topic: "data-protection",
    subtopic: "Secrets management",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An application stores RDS database credentials in a configuration file. The security team requires centralized secret storage with built-in automatic rotation. Which service should be used?",
    options: [
      { id: "A", text: "AWS Systems Manager Parameter Store with manual rotation" },
      { id: "B", text: "AWS Secrets Manager with automatic rotation enabled" },
      { id: "C", text: "Amazon S3 with bucket versioning" },
      { id: "D", text: "EC2 user data scripts" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AWS Secrets Manager is purpose-built for secrets: it encrypts them with KMS, provides fine-grained IAM access, and supports automatic rotation for RDS and other services via managed Lambda rotation functions.",
    optionExplanations: {
      A: "Parameter Store can hold secrets (SecureString) but automatic credential rotation for RDS is a native Secrets Manager feature.",
      B: "Correct. Secrets Manager offers built-in automatic rotation for RDS credentials.",
      C: "Versioned S3 objects are still plaintext files; no rotation or access auditing for secrets is provided.",
      D: "User data is visible to anyone who can describe the instance — a well-known credential leak.",
    },
    services: ["AWS Secrets Manager", "Amazon RDS"],
    references: [
      {
        title: "AWS Secrets Manager user guide",
        url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-011",
    slug: "tls-certificates-for-load-balancer",
    domain: "design-secure-architectures",
    topic: "data-protection",
    subtopic: "Encryption in transit",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A company wants to serve HTTPS traffic through an Application Load Balancer using a publicly trusted certificate that is provisioned and renewed automatically at no cost. Which service should provide the certificate?",
    options: [
      { id: "A", text: "AWS Certificate Manager (ACM)" },
      { id: "B", text: "AWS KMS" },
      { id: "C", text: "A self-signed certificate generated on an EC2 instance" },
      { id: "D", text: "AWS Secrets Manager" },
    ],
    correctAnswers: ["A"],
    explanation:
      "ACM provisions public TLS certificates at no cost and renews them automatically. Certificates integrate directly with ALBs, CloudFront, API Gateway, and other services.",
    optionExplanations: {
      A: "Correct. ACM issues free public certs and handles renewal and deployment to the ALB.",
      B: "KMS manages encryption keys, not TLS certificates for load balancers.",
      C: "Self-signed certificates are not publicly trusted and require manual renewal.",
      D: "Secrets Manager stores secrets, it does not issue certificates.",
    },
    services: ["AWS Certificate Manager", "Elastic Load Balancing"],
    references: [
      {
        title: "AWS Certificate Manager",
        url: "https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-012",
    slug: "select-controls-for-secure-workload",
    domain: "design-secure-architectures",
    topic: "data-protection",
    subtopic: "Layered controls",
    difficulty: "hard",
    format: "multiple-response",
    question:
      "A web application stores regulated data in RDS. Which TWO controls together provide defense-in-depth for BOTH data at rest and application access? (Select TWO.)",
    options: [
      { id: "A", text: "Enable RDS encryption at rest with a customer managed KMS key" },
      { id: "B", text: "Require IAM database authentication or Secrets Manager-managed credentials for application access" },
      { id: "C", text: "Enable S3 versioning on the application bucket" },
      { id: "D", text: "Add a CloudFront distribution in front of the database" },
      { id: "E", text: "Increase the RDS instance size" },
    ],
    correctAnswers: ["A", "B"],
    explanation:
      "Defense-in-depth means controls at multiple layers. KMS-encrypted storage protects data at rest, while IAM DB authentication or Secrets Manager-managed credentials controls and audits who/what can authenticate to the database.",
    optionExplanations: {
      A: "Correct. A customer managed KMS key encrypts RDS storage and provides control plus audit of key use.",
      B: "Correct. IAM database authentication or rotated Secrets Manager credentials secures application access without embedded passwords.",
      C: "S3 versioning does not protect database data or access to it.",
      D: "CloudFront caches web content at edge locations; placing it 'in front of the database' is not a meaningful database control.",
      E: "Larger instances change capacity, not security posture.",
    },
    services: ["Amazon RDS", "AWS KMS", "AWS Secrets Manager", "AWS IAM"],
    references: [
      {
        title: "Encrypting Amazon RDS resources",
        url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html",
      },
      {
        title: "IAM database authentication",
        url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-013",
    slug: "private-api-access-with-interface-endpoint",
    domain: "design-secure-architectures",
    topic: "network-security",
    subtopic: "Private connectivity",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Instances in private subnets must call the Amazon SNS API, and security policy forbids routing that traffic through an internet gateway or NAT gateway. What provides private connectivity to the AWS service?",
    options: [
      { id: "A", text: "An interface VPC endpoint (AWS PrivateLink) for SNS" },
      { id: "B", text: "A public subnet with a bastion host" },
      { id: "C", text: "A site-to-site VPN to another VPC" },
      { id: "D", text: "Amazon Macie private discovery" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Interface VPC endpoints (powered by AWS PrivateLink) create ENIs in your subnets that reach AWS service APIs privately, keeping traffic off the public internet. Most AWS services — including SNS — support interface endpoints.",
    optionExplanations: {
      A: "Correct. PrivateLink interface endpoints reach AWS APIs privately from inside the VPC.",
      B: "A bastion in a public subnet does not make the private instances' API calls private.",
      C: "A VPN to another VPC does not provide private access to the SNS service endpoint.",
      D: "Macie discovers sensitive data in S3; it is unrelated to connectivity.",
    },
    services: ["AWS PrivateLink", "Amazon VPC", "Amazon SNS"],
    references: [
      {
        title: "Access AWS services through AWS PrivateLink",
        url: "https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-014",
    slug: "prevent-accidental-public-s3-access",
    domain: "design-secure-architectures",
    topic: "data-protection",
    subtopic: "S3 access control",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A security team wants a single account-level control that prevents any S3 bucket in the account from becoming publicly accessible, regardless of how bucket policies or ACLs are configured. What should they enable?",
    options: [
      { id: "A", text: "S3 Block Public Access at the account level" },
      { id: "B", text: "An AWS Config rule that reports public buckets" },
      { id: "C", text: "A daily script that audits bucket policies" },
      { id: "D", text: "Amazon Macie sensitive-data discovery" },
    ],
    correctAnswers: ["A"],
    explanation:
      "S3 Block Public Access applied at the account level overrides every bucket-level setting and blocks all public access grants account-wide — the preventive (not detective) control the scenario requires.",
    optionExplanations: {
      A: "Correct. Account-level Block Public Access is the strongest, preventive guardrail.",
      B: "Config rules detect noncompliance after it happens; they don't prevent it.",
      C: "Scheduled audits leave windows of exposure and depend on script correctness.",
      D: "Macie finds sensitive data in buckets; it does not block public access.",
    },
    services: ["Amazon S3"],
    references: [
      {
        title: "Blocking public access to your Amazon S3 storage",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-015",
    slug: "detect-threats-and-audit-api-calls",
    domain: "design-secure-architectures",
    topic: "data-protection",
    subtopic: "Detection and audit",
    difficulty: "medium",
    format: "multiple-response",
    question:
      "Which TWO AWS services provide threat detection and API-activity auditing across an AWS account? (Select TWO.)",
    options: [
      { id: "A", text: "Amazon GuardDuty for intelligent threat detection" },
      { id: "B", text: "AWS CloudTrail for API activity logging and auditing" },
      { id: "C", text: "AWS WAF for blocking web exploits" },
      { id: "D", text: "Amazon CloudWatch for metrics dashboards" },
      { id: "E", text: "AWS Artifact for compliance reports" },
    ],
    correctAnswers: ["A", "B"],
    explanation:
      "GuardDuty analyzes CloudTrail events, DNS logs, and other sources to detect threats continuously. CloudTrail records API calls for auditing. Together they provide detection plus audit trail — the detection layer of defense-in-depth.",
    optionExplanations: {
      A: "Correct. GuardDuty is AWS's managed threat-detection service.",
      B: "Correct. CloudTrail logs every API call — the foundation of AWS auditing.",
      C: "WAF blocks malicious web requests; it's a preventive filter, not detection/auditing.",
      D: "CloudWatch collects metrics/logs; it does not analyze for threats.",
      E: "Artifact provides compliance documentation, not account monitoring.",
    },
    services: ["Amazon GuardDuty", "AWS CloudTrail"],
    references: [
      {
        title: "What is Amazon GuardDuty",
        url: "https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html",
      },
      {
        title: "AWS CloudTrail user guide",
        url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-016",
    slug: "restrict-cloudfront-content-to-signed-urls",
    domain: "design-secure-architectures",
    topic: "data-protection",
    subtopic: "Content access control",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A media company sells premium videos served via CloudFront. Videos must be accessible only to paying subscribers for a limited time. Which mechanism enforces this?",
    options: [
      { id: "A", text: "Signed URLs or signed cookies generated by the application" },
      { id: "B", text: "HTTPS on the CloudFront distribution" },
      { id: "C", text: "Geo-restriction on the distribution" },
      { id: "D", text: "A WAF rule blocking bots" },
    ],
    correctAnswers: ["A"],
    explanation:
      "CloudFront signed URLs/cookies embed an encrypted policy (expiry, allowed IP ranges, etc.) in the request. Content stays private at the edge until the application issues a signed grant — exactly the paid-content access-control pattern.",
    optionExplanations: {
      A: "Correct. Signed URLs/cookies are CloudFront's built-in gated-access mechanism.",
      B: "HTTPS encrypts transport but doesn't restrict who can fetch content.",
      C: "Geo-restriction filters by country, not by subscriber status.",
      D: "WAF blocks attack patterns, not unpaid legitimate requests.",
    },
    services: ["Amazon CloudFront"],
    references: [
      {
        title: "Restricting access with signed URLs and signed cookies",
        url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-017",
    slug: "user-authentication-for-mobile-app",
    domain: "design-secure-architectures",
    topic: "iam-and-access-control",
    subtopic: "Customer identity",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A mobile app needs user sign-up/sign-in with MFA, social identity providers (Google, Apple), and JWT tokens the backend can validate — without building an auth system. Which service provides this?",
    options: [
      { id: "A", text: "AWS IAM" },
      { id: "B", text: "Amazon Cognito user pools" },
      { id: "C", text: "AWS IAM Identity Center" },
      { id: "D", text: "AWS Secrets Manager" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Amazon Cognito user pools are a managed customer-identity directory with hosted sign-up/sign-in, MFA, social IdP federation, and JWT issuance. IAM manages AWS-resource access, not end-customer app authentication.",
    optionExplanations: {
      A: "IAM controls access to AWS resources, not application end-users.",
      B: "Correct. Cognito user pools are the managed customer identity provider.",
      C: "IAM Identity Center is workforce SSO for employees, not app customers.",
      D: "Secrets Manager stores secrets; it's not an identity provider.",
    },
    services: ["Amazon Cognito"],
    references: [
      {
        title: "What is Amazon Cognito",
        url: "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
  {
    id: "saa-sec-018",
    slug: "security-group-chaining-between-tiers",
    domain: "design-secure-architectures",
    topic: "network-security",
    subtopic: "Security group design",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A three-tier app must allow the web tier's instances to reach the app tier on port 8080, and nothing else. Instances in both tiers change frequently due to Auto Scaling. What's the most maintainable security-group design?",
    options: [
      { id: "A", text: "List every app-tier instance's private IP in a web-tier outbound rule" },
      { id: "B", text: "Allow 0.0.0.0/0 inbound on port 8080 in the app tier's security group" },
      { id: "C", text: "Reference the web tier's security group as the source in the app tier's inbound port-8080 rule" },
      { id: "D", text: "Add a NACL allow rule for the subnet" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Security groups can reference other security groups as a source — so only members of the web tier's group can reach the app tier's port, and Auto Scaling membership changes need no rule edits.",
    optionExplanations: {
      A: "Hardcoded IPs break every time Auto Scaling replaces instances.",
      B: "0.0.0.0/0 opens the port to anything that can reach the subnet — too broad.",
      C: "Correct. SG-to-SG references track group membership automatically.",
      D: "A NACL subnet rule can't distinguish instance roles; it controls subnets, not tiers.",
    },
    services: ["Amazon VPC", "Amazon EC2"],
    references: [
      {
        title: "Security group rules and referencing",
        url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-25",
  },
];
