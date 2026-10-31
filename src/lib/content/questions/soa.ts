import type { Question } from "../schema";

/**
 * SOA-C03 (AWS Certified SysOps Administrator – Associate) seed questions.
 */
export const soaQuestions: Question[] = [
  {
    id: "soa-mon-001",
    slug: "alert-on-ec2-high-cpu",
    cert: "soa-c03",
    domain: "soa-monitoring-logging-remediation",
    topic: "soa-monitoring-and-remediation",
    subtopic: "CloudWatch alarms",
    difficulty: "easy",
    format: "single-choice",
    question:
      "An ops team needs an automated notification whenever any production EC2 instance's CPU stays above 90% for 10 minutes. What should they configure?",
    options: [
      { id: "A", text: "A CloudWatch alarm on CPUUtilization with an SNS notification action" },
      { id: "B", text: "A CloudTrail event rule" },
      { id: "C", text: "A VPC flow log filter" },
      { id: "D", text: "A Config rule checking instance type" },
    ],
    correctAnswers: ["A"],
    explanation:
      "CloudWatch alarms watch metrics over periods (e.g., CPUUtilization > 90% for two 5-min periods) and trigger actions like SNS notifications — the canonical monitoring-and-alerting pattern.",
    optionExplanations: {
      A: "Correct. Metric threshold + notification action is exactly what CloudWatch alarms do.",
      B: "CloudTrail logs API calls, not performance metrics.",
      C: "Flow logs capture network traffic, not CPU metrics.",
      D: "Config rules evaluate configuration compliance, not metric thresholds.",
    },
    services: ["Amazon CloudWatch", "Amazon SNS"],
    references: [
      {
        title: "Using CloudWatch alarms",
        url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "soa-mon-002",
    slug: "detailed-vs-basic-monitoring",
    cert: "soa-c03",
    domain: "soa-monitoring-logging-remediation",
    topic: "soa-monitoring-and-remediation",
    subtopic: "EC2 monitoring",
    difficulty: "easy",
    format: "single-choice",
    question:
      "By default, EC2 instances publish metrics to CloudWatch every 5 minutes. How do you get 1-minute metric granularity for faster incident response?",
    options: [
      { id: "A", text: "Install the CloudWatch agent" },
      { id: "B", text: "Enable detailed monitoring on the instance" },
      { id: "C", text: "Change the CloudWatch retention period" },
      { id: "D", text: "Nothing — 1-minute is the default" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Basic monitoring publishes EC2 metrics every 5 minutes free; enabling detailed monitoring raises granularity to 1 minute (additional charge). The CloudWatch agent is needed for OS-level metrics like memory/disk, not for faster EC2 hypervisor metrics.",
    optionExplanations: {
      A: "The agent adds OS-level metrics (memory, disk) but doesn't change EC2 metric frequency.",
      B: "Correct. Detailed monitoring = 1-minute EC2 metric granularity.",
      C: "Retention controls how long metrics are stored, not collection frequency.",
      D: "5-minute granularity is the default, not 1-minute.",
    },
    services: ["Amazon CloudWatch", "Amazon EC2"],
    references: [
      {
        title: "EC2 detailed monitoring",
        url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch-new.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "soa-dep-001",
    slug: "patch-fleet-of-instances",
    cert: "soa-c03",
    domain: "soa-deployment-provisioning-automation",
    topic: "soa-deployment-and-automation",
    subtopic: "Systems Manager",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An operations team must apply OS security patches to hundreds of EC2 instances on a schedule, with approval controls and compliance reporting. Which service handles this natively?",
    options: [
      { id: "A", text: "AWS Config" },
      { id: "B", text: "AWS Systems Manager Patch Manager" },
      { id: "C", text: "Amazon Inspector" },
      { id: "D", text: "AWS CloudFormation" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Systems Manager Patch Manager automates patching at fleet scale: patch baselines define approved updates, maintenance windows control scheduling, and compliance reporting shows patch status — purpose-built for this.",
    optionExplanations: {
      A: "Config assesses configuration compliance; it doesn't apply patches.",
      B: "Correct. Patch Manager is SSM's fleet patching capability.",
      C: "Inspector scans for vulnerabilities but doesn't remediate them.",
      D: "CloudFormation provisions infrastructure, not OS patching cycles.",
    },
    services: ["AWS Systems Manager"],
    references: [
      {
        title: "AWS Systems Manager Patch Manager",
        url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-patch-manager.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "soa-net-001",
    slug: "private-subnet-internet-access",
    cert: "soa-c03",
    domain: "soa-networking-content-delivery",
    topic: "soa-networking-operations",
    subtopic: "NAT gateway ops",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Instances in a private subnet can reach the internet via a NAT gateway, but the ops team wants to eliminate the NAT gateway's data-processing charges for traffic to S3 and DynamoDB. What's the fix?",
    options: [
      { id: "A", text: "Add more NAT gateways for redundancy" },
      { id: "B", text: "Create gateway VPC endpoints for S3 and DynamoDB" },
      { id: "C", text: "Move the instances to a public subnet" },
      { id: "D", text: "Assign Elastic IPs to the instances" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Gateway VPC endpoints route S3/DynamoDB traffic over the AWS network without a NAT gateway — free of hourly endpoint charge and eliminating per-GB NAT processing fees for that traffic. Classic cost question.",
    optionExplanations: {
      A: "More NAT gateways increase cost, not reduce it.",
      B: "Correct. Gateway endpoints bypass NAT for S3/DynamoDB at no charge.",
      C: "Public subnets don't remove data-transfer cost and reduce security.",
      D: "Public IPs route through the IGW with its own egress pricing.",
    },
    services: ["Amazon VPC", "AWS PrivateLink"],
    references: [
      {
        title: "Gateway endpoints",
        url: "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "soa-mon-003",
    slug: "ec2-memory-metrics-cloudwatch",
    cert: "soa-c03",
    domain: "soa-monitoring-logging-remediation",
    topic: "soa-monitoring-and-remediation",
    subtopic: "Custom metrics",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An ops team wants CloudWatch alarms on EC2 memory utilization and disk space. CPUUtilization works fine, but memory and disk metrics don't appear in CloudWatch. Why, and what's the fix?",
    options: [
      { id: "A", text: "Enable detailed monitoring — memory is a detailed-only metric" },
      { id: "B", text: "Install and configure the CloudWatch agent to publish OS-level metrics" },
      { id: "C", text: "Memory metrics require CloudWatch Insights subscription" },
      { id: "D", text: "Move the instance to a larger type; small instances don't report memory" },
    ],
    correctAnswers: ["B"],
    explanation:
      "CloudWatch collects hypervisor-level metrics automatically (CPU, network, disk I/O, status checks) — but OS-level metrics like memory utilization and disk usage require the CloudWatch agent installed inside the instance.",
    optionExplanations: {
      A: "Detailed monitoring changes the metric interval (1 min vs 5 min), not the metric set.",
      B: "Correct. OS-level metrics come only from the in-guest agent.",
      C: "Logs Insights queries logs — it doesn't unlock memory metrics.",
      D: "Instance type doesn't gate which OS metrics exist — the agent does.",
    },
    services: ["Amazon CloudWatch", "Amazon EC2"],
    references: [
      {
        title: "Collect metrics with the CloudWatch agent",
        url: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "soa-mon-004",
    slug: "eventbridge-auto-remediation",
    cert: "soa-c03",
    domain: "soa-monitoring-logging-remediation",
    topic: "soa-monitoring-and-remediation",
    subtopic: "Automated remediation",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An ops team wants non-compliant resources remediated automatically — e.g., when an S3 bucket becomes public, a runbook removes the public access within minutes. What's the standard event-driven pattern?",
    options: [
      { id: "A", text: "CloudWatch Logs subscription filter invoking Lambda every hour" },
      { id: "B", text: "AWS Config rule detecting the violation + EventBridge/SSM Automation remediation" },
      { id: "C", text: "CloudTrail lookup run manually each morning" },
      { id: "D", text: "An S3 lifecycle rule to delete the bucket" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Config rules detect non-compliance continuously; EventBridge routes the compliance event to an SSM Automation runbook (or Lambda) for auto-remediation — the designed closed-loop pattern for operational compliance.",
    optionExplanations: {
      A: "Log subscriptions stream logs — they don't detect config compliance state.",
      B: "Correct. Config + EventBridge + SSM Automation is the textbook auto-remediation chain.",
      C: "Manual lookups aren't remediation and don't scale.",
      D: "Lifecycle rules manage object retention, not bucket permissions.",
    },
    services: ["AWS Config", "Amazon EventBridge", "AWS Systems Manager"],
    references: [
      {
        title: "Remediating noncompliant resources",
        url: "https://docs.aws.amazon.com/config/latest/developerguide/remediation.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "soa-rel-001",
    slug: "aws-backup-centralized-backups",
    cert: "soa-c03",
    domain: "soa-reliability-continuity",
    topic: "soa-reliability-and-dr",
    subtopic: "AWS Backup",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An ops team must centrally manage backups across EC2/EBS, RDS, DynamoDB, and EFS — with scheduled plans, retention policies, and cross-account copies for DR. Which service consolidates this?",
    options: [
      { id: "A", text: "AWS Backup" },
      { id: "B", text: "Manual snapshots via a scheduled Lambda per service" },
      { id: "C", text: "S3 versioning" },
      { id: "D", text: "CloudFormation stack sets" },
    ],
    correctAnswers: ["A"],
    explanation:
      "AWS Backup provides a single backup policy engine (plans, schedules, retention, lifecycle to cold storage) across most AWS data services — plus vaults, cross-Region and cross-account copy for DR.",
    optionExplanations: {
      A: "Correct. One service unifies backup policy and cross-account DR copies.",
      B: "Hand-rolled snapshot jobs reinvent AWS Backup with more failure modes.",
      C: "S3 versioning covers only S3 objects, not databases or volumes.",
      D: "CloudFormation manages infrastructure, not point-in-time data backups.",
    },
    services: ["AWS Backup", "Amazon RDS", "Amazon EFS"],
    references: [
      {
        title: "AWS Backup",
        url: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "soa-rel-002",
    slug: "asg-elb-health-check-replacement",
    cert: "soa-c03",
    domain: "soa-reliability-continuity",
    topic: "soa-reliability-and-dr",
    subtopic: "Auto Scaling health",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An Auto Scaling group behind an ALB keeps unhealthy instances in service — the app returns 500s but the ASG health check still reports the instances healthy. What fixes the detection gap?",
    options: [
      { id: "A", text: "Reduce the ASG min size" },
      { id: "B", text: "Change the ASG health check type to ELB so load balancer failures trigger replacement" },
      { id: "C", text: "Increase instance size so the app stops failing" },
      { id: "D", text: "Attach a second target group" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Default ASG health checks use EC2 status only — an instance can pass while the app is dead. Setting the health check type to ELB lets the load balancer's app-level health checks mark instances unhealthy, so the ASG replaces them.",
    optionExplanations: {
      A: "Min size changes capacity, not health detection.",
      B: "Correct. ELB health checks surface application failure to the ASG.",
      C: "Bigger instances mask symptoms; the health gap remains.",
      D: "A second target group doesn't change ASG health evaluation.",
    },
    services: ["Amazon EC2 Auto Scaling", "Elastic Load Balancing"],
    references: [
      {
        title: "Health checks for Auto Scaling instances",
        url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/health-checks-overview.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "soa-dep-002",
    slug: "cloudformation-drift-detection",
    cert: "soa-c03",
    domain: "soa-deployment-provisioning-automation",
    topic: "soa-deployment-and-automation",
    subtopic: "CloudFormation ops",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Someone changed a security group rule manually in the console, and the CloudFormation stack no longer matches its template. How does ops detect this kind of out-of-band change going forward?",
    options: [
      { id: "A", text: "Run drift detection on the stack" },
      { id: "B", text: "Delete and recreate the stack" },
      { id: "C", text: "Enable Termination Protection" },
      { id: "D", text: "Export the template and diff manually" },
    ],
    correctAnswers: ["A"],
    explanation:
      "CloudFormation drift detection compares each stack resource's actual state against the expected template state and reports which resources drifted — the designed tool for spotting out-of-band changes.",
    optionExplanations: {
      A: "Correct. Drift detection is purpose-built for template-vs-reality divergence.",
      B: "Rebuilds cause downtime and are a fix, not detection.",
      C: "Termination protection prevents stack deletion, not resource drift.",
      D: "Manual diffing doesn't scale and can't see runtime state.",
    },
    services: ["AWS CloudFormation"],
    references: [
      {
        title: "Detecting unmanaged configuration changes (drift)",
        url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/detect-drift-stack.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "soa-dep-003",
    slug: "session-manager-vs-ssh-bastion",
    cert: "soa-c03",
    domain: "soa-deployment-provisioning-automation",
    topic: "soa-deployment-and-automation",
    subtopic: "Access management",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Admins currently SSH through a bastion host with port 22 open and shared key pairs. Security wants auditable shell access without inbound ports or SSH keys. What replaces the bastion?",
    options: [
      { id: "A", text: "EC2 Instance Connect" },
      { id: "B", text: "AWS Systems Manager Session Manager" },
      { id: "C", text: "A stronger bastion with a smaller CIDR" },
      { id: "D", text: "AWS Site-to-Site VPN for all admins" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Session Manager provides interactive shell access through the SSM agent — no inbound ports, no key pairs, IAM-controlled access, and session logging to CloudWatch/S3 for audit. It's the managed bastion-killer.",
    optionExplanations: {
      A: "Instance Connect still needs port 22 open and uploads temporary keys.",
      B: "Correct. Agent-based access, IAM auth, no open ports, full session audit.",
      C: "A hardened bastion still carries key management and an open port.",
      D: "VPN grants network access but doesn't provide per-session audit.",
    },
    services: ["AWS Systems Manager"],
    references: [
      {
        title: "Session Manager",
        url: "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "soa-sec-001",
    slug: "config-rules-compliance-monitoring",
    cert: "soa-c03",
    domain: "soa-security-compliance",
    topic: "soa-security-operations",
    subtopic: "Compliance checks",
    difficulty: "medium",
    format: "multiple-response",
    question:
      "Ops needs continuous proof that all EBS volumes are encrypted and no security group allows 0.0.0.0/0 on port 22. Which TWO services/features provide this? (Select TWO.)",
    options: [
      { id: "A", text: "AWS Config managed rules evaluating resources continuously" },
      { id: "B", text: "CloudWatch metric filters on application logs" },
      { id: "C", text: "IAM credential reports generated monthly" },
      { id: "D", text: "Security Hub aggregating Config and standard findings into a compliance score" },
      { id: "E", text: "S3 access logs" },
    ],
    correctAnswers: ["A", "D"],
    explanation:
      "AWS Config managed rules continuously evaluate resource configurations (encrypted volumes, restricted SSH) and flag violations; Security Hub aggregates those findings into standards-based compliance scores — together covering detection and reporting.",
    optionExplanations: {
      A: "Correct. Managed rules like ENCRYPTED_VOLUMES check exactly this.",
      B: "Log filters scan application text, not resource configuration.",
      C: "Credential reports cover IAM user credentials only.",
      D: "Correct. Security Hub rolls findings into auditable compliance posture.",
      E: "Access logs record S3 requests — unrelated to config compliance.",
    },
    services: ["AWS Config", "AWS Security Hub"],
    references: [
      {
        title: "AWS Config managed rules",
        url: "https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "soa-net-002",
    slug: "alb-unhealthy-target-troubleshooting",
    cert: "soa-c03",
    domain: "soa-networking-content-delivery",
    topic: "soa-networking-operations",
    subtopic: "Load balancer health",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An ALB target group shows targets unhealthy — instances run fine and the app answers on port 8080, but health checks fail. What's the FIRST thing to verify?",
    options: [
      { id: "A", text: "The health check path/protocol/port matches what the app actually serves" },
      { id: "B", text: "The instance IAM role" },
      { id: "C", text: "The ALB's SSL certificate" },
      { id: "D", text: "Route 53 DNS TTLs" },
    ],
    correctAnswers: ["A"],
    explanation:
      "The most common cause: the health check is pointed at the wrong port/path/protocol (e.g., checking / on 80 while the app serves /health on 8080). Security groups on the instance are the second check — but verify the check itself first.",
    optionExplanations: {
      A: "Correct. Path/port/protocol mismatch is the classic misconfiguration.",
      B: "IAM roles don't affect ALB-to-instance health traffic.",
      C: "Certificate issues break client TLS, not target health (unless HTTPS checks are misconfigured).",
      D: "DNS affects clients reaching the ALB, not ALB-to-target checks.",
    },
    services: ["Elastic Load Balancing", "Amazon EC2"],
    references: [
      {
        title: "Health checks for target groups",
        url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
];
