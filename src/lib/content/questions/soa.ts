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
];
