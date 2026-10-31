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
];
