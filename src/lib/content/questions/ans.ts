import type { Question } from "../schema";

/**
 * ANS-C01 (AWS Certified Advanced Networking – Specialty) seed questions.
 */
export const ansQuestions: Question[] = [
  {
    id: "ans-hyb-001",
    slug: "direct-connect-vs-site-to-site-vpn",
    cert: "ans-c01",
    domain: "ans-network-design",
    topic: "ans-hybrid-connectivity",
    subtopic: "Hybrid connectivity",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company needs a dedicated, private connection from their data center to AWS with consistent low-latency bandwidth that bypasses the public internet. Which service provides this?",
    options: [
      { id: "A", text: "Site-to-Site VPN over the internet" },
      { id: "B", text: "AWS Direct Connect" },
      { id: "C", text: "VPC peering" },
      { id: "D", text: "AWS Transit Gateway" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AWS Direct Connect establishes a physical dedicated link (via AWS Direct Connect locations/partners) bypassing the internet — offering consistent bandwidth, lower latency variance, and private connectivity. Site-to-Site VPN rides over the public internet.",
    optionExplanations: {
      A: "VPN encrypts over the internet but doesn't avoid internet variability.",
      B: "Correct. DX is the dedicated physical connection service.",
      C: "Peering connects VPCs inside AWS, not on-premises to AWS.",
      D: "Transit Gateway is a routing hub, not a physical connectivity service.",
    },
    services: ["AWS Direct Connect"],
    references: [
      {
        title: "AWS Direct Connect",
        url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-hyb-002",
    slug: "centralized-hub-for-many-vpcs",
    cert: "ans-c01",
    domain: "ans-network-design",
    topic: "ans-hybrid-connectivity",
    subtopic: "Transit Gateway",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An organization has 50 VPCs across 3 Regions plus on-premises networks that all need to communicate. VPC peering would create an unmanageable mesh. What provides scalable hub-and-spoke connectivity?",
    options: [
      { id: "A", text: "AWS Transit Gateway" },
      { id: "B", text: "Full-mesh VPC peering" },
      { id: "C", text: "More NAT gateways" },
      { id: "D", text: "Additional internet gateways" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Transit Gateway is the cloud router: VPCs, VPNs, and Direct Connect gateways attach as spokes to one hub, with route tables controlling connectivity — replacing an O(n²) peering mesh with O(n) attachments.",
    optionExplanations: {
      A: "Correct. TGW is AWS's hub-and-spoke transit service for scale.",
      B: "Peering doesn't scale — it's non-transitive and meshes explode.",
      C: "NAT provides internet egress, not interconnectivity.",
      D: "IGWs connect a VPC to the internet, not to each other.",
    },
    services: ["AWS Transit Gateway"],
    references: [
      {
        title: "What is Transit Gateway",
        url: "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-dns-001",
    slug: "route53-resolver-endpoints-hybrid-dns",
    cert: "ans-c01",
    domain: "ans-network-implementation",
    topic: "ans-dns-and-routing",
    subtopic: "Hybrid DNS",
    difficulty: "hard",
    format: "single-choice",
    question:
      "On-premises servers must resolve private Route 53 hosted zone records, and AWS resources must resolve the on-premises corporate DNS zone. Which Route 53 Resolver feature pair enables both directions?",
    options: [
      { id: "A", text: "One inbound endpoint only" },
      { id: "B", text: "Inbound endpoint (on-prem → AWS) plus outbound endpoint with forwarding rules (AWS → on-prem)" },
      { id: "C", text: "Public hosted zone for both directions" },
      { id: "D", text: "Route 53 health checks" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Hybrid DNS needs both directions: an inbound endpoint gives on-premises resolvers an IP to query private zones; an outbound endpoint forwards AWS queries to on-premises DNS via forwarding rules. Both are needed for bidirectional resolution.",
    optionExplanations: {
      A: "Inbound alone only solves on-prem → AWS resolution.",
      B: "Correct. Inbound + outbound endpoints enable the full hybrid DNS loop.",
      C: "Public zones can't expose private-zone names to on-premises.",
      D: "Health checks monitor endpoints, not DNS forwarding.",
    },
    services: ["Amazon Route 53"],
    references: [
      {
        title: "Route 53 Resolver",
        url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-sec-001",
    slug: "inspect-egress-traffic-with-network-firewall",
    cert: "ans-c01",
    domain: "ans-network-security-compliance",
    topic: "ans-network-security",
    subtopic: "Traffic inspection",
    difficulty: "hard",
    format: "single-choice",
    question:
      "Security policy requires all egress traffic from workload VPCs to be inspected by an inline stateful firewall before reaching the internet. Which managed service provides this?",
    options: [
      { id: "A", text: "Security groups" },
      { id: "B", text: "AWS Network Firewall" },
      { id: "C", text: "AWS WAF" },
      { id: "D", text: "Route 53 Resolver DNS Firewall" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AWS Network Firewall is the managed stateful firewall/IDS-IPS for VPCs — deployed inline (often via a dedicated inspection VPC + Transit Gateway), it inspects all traffic flows including egress with stateful rules.",
    optionExplanations: {
      A: "Security groups are instance-level filters, not inline traffic inspection.",
      B: "Correct. Network Firewall is the purpose-built inline inspection service.",
      C: "WAF filters layer-7 HTTP on ALB/CloudFront, not arbitrary egress flows.",
      D: "DNS Firewall filters DNS queries only, not general traffic.",
    },
    services: ["AWS Network Firewall"],
    references: [
      {
        title: "AWS Network Firewall",
        url: "https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-ops-001",
    slug: "reachability-analyzer-troubleshooting",
    cert: "ans-c01",
    domain: "ans-network-management-operations",
    topic: "ans-network-operations",
    subtopic: "Connectivity troubleshooting",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An EC2 instance in one VPC can't reach an RDS instance in a peered VPC. Security groups look correct. Which AWS tool analyzes the full network path — route tables, NACLs, peering — and identifies the blocking hop?",
    options: [
      { id: "A", text: "VPC Flow Logs" },
      { id: "B", text: "VPC Reachability Analyzer" },
      { id: "C", text: "AWS Network Firewall" },
      { id: "D", text: "Amazon Route 53 health checks" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Reachability Analyzer performs path analysis between a source and destination — evaluating route tables, security groups, NACLs, and peering — and reports exactly which component blocks the path. Flow Logs show observed traffic but don't analyze the intended path.",
    optionExplanations: {
      A: "Flow Logs record actual traffic flows; they don't diagnose why a path fails.",
      B: "Correct. Purpose-built hop-by-hop path analysis.",
      C: "Network Firewall filters traffic — it's not a diagnostic tool.",
      D: "Health checks monitor endpoints, not network paths.",
    },
    services: ["Amazon VPC"],
    references: [
      {
        title: "Reachability Analyzer",
        url: "https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-des-001",
    slug: "global-accelerator-vs-cloudfront-tcp",
    cert: "ans-c01",
    domain: "ans-network-design",
    topic: "ans-hybrid-connectivity",
    subtopic: "Edge services",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A live-streaming platform needs global TCP/UDP traffic delivered with the lowest possible latency to a regional endpoint — not HTTP content caching. Which service fits?",
    options: [
      { id: "A", text: "Amazon CloudFront" },
      { id: "B", text: "AWS Global Accelerator" },
      { id: "C", text: "An additional internet gateway" },
      { id: "D", text: "Route 53 geolocation routing alone" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Global Accelerator provides static Anycast IPs routing TCP/UDP traffic over AWS's backbone to the optimal regional endpoint — ideal for non-HTTP or latency-critical traffic. CloudFront caches/serves HTTP(S) content at the edge; it isn't a general TCP/UDP accelerator.",
    optionExplanations: {
      A: "CloudFront optimizes HTTP(S) delivery/caching, not arbitrary TCP/UDP.",
      B: "Correct. Anycast IPs + backbone routing for non-HTTP traffic.",
      C: "IGWs provide VPC internet access — no global acceleration.",
      D: "Geo DNS routes by user location but still traverses the public internet.",
    },
    services: ["AWS Global Accelerator", "Amazon CloudFront"],
    references: [
      {
        title: "AWS Global Accelerator",
        url: "https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-imp-001",
    slug: "route53-routing-policies",
    cert: "ans-c01",
    domain: "ans-network-implementation",
    topic: "ans-dns-and-routing",
    subtopic: "Route 53 policies",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A SaaS runs active endpoints in us-east-1 and eu-west-1. European users should hit the EU stack — and if it becomes unhealthy, traffic must failover automatically. Which Route 53 configuration applies?",
    options: [
      { id: "A", text: "Simple routing with two A records" },
      { id: "B", text: "Geolocation routing per continent + health checks and failover records" },
      { id: "C", text: "Weighted routing 50/50" },
      { id: "D", text: "Multivalue answer routing" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Geolocation routing sends users to the endpoint matching their location; Route 53 health checks mark the EU endpoint unhealthy and failover records shift its traffic to the US stack — the designed pattern for geo-affinity plus automatic failover.",
    optionExplanations: {
      A: "Simple routing ignores geography and health state.",
      B: "Correct. Geo-affinity plus health-checked failover.",
      C: "Weighted splits traffic regardless of user location.",
      D: "Multivalue returns several IPs but doesn't enforce geo-affinity.",
    },
    services: ["Amazon Route 53"],
    references: [
      {
        title: "Route 53 routing policies",
        url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-sec-002",
    slug: "privatelink-service-exposure",
    cert: "ans-c01",
    domain: "ans-network-security-compliance",
    topic: "ans-network-security",
    subtopic: "Private connectivity",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A company must expose an internal API to partner VPCs — without internet exposure, VPC peering (CIDRs overlap), or giving partners broad network access. What's the secure sharing mechanism?",
    options: [
      { id: "A", text: "Open the API's security group to 0.0.0.0/0" },
      { id: "B", text: "VPC peering with a NAT workaround for overlapping CIDRs" },
      { id: "C", text: "AWS PrivateLink — expose the service via an NLB endpoint service consumed through interface endpoints" },
      { id: "D", text: "A public ALB restricted by TLS client certificates" },
    ],
    correctAnswers: ["C"],
    explanation:
      "PrivateLink exposes a service behind an NLB as an endpoint service; consumers create interface endpoints in their VPC — unidirectional, no CIDR overlap issues, no route-table coupling, and traffic never traverses the internet.",
    optionExplanations: {
      A: "0.0.0.0/0 exposes the service publicly — fails every requirement.",
      B: "Peering can't span overlapping CIDRs and grants broad network adjacency.",
      C: "Correct. PrivateLink is purpose-built for cross-VPC service sharing.",
      D: "Public exposure violates the no-internet requirement.",
    },
    services: ["AWS PrivateLink", "Amazon VPC", "Elastic Load Balancing"],
    references: [
      {
        title: "AWS PrivateLink",
        url: "https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
];
