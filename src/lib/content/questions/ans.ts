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
  {
    id: "ans-ops-002",
    slug: "flow-logs-rejected-traffic",
    cert: "ans-c01",
    domain: "ans-network-management-operations",
    topic: "ans-network-operations",
    subtopic: "Flow log analysis",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An app intermittently loses connectivity to a partner API. Ops suspects a stateless rule is dropping return traffic. Which log record would confirm a blocked connection attempt?",
    options: [
      { id: "A", text: "CloudTrail events for the API call" },
      { id: "B", text: "VPC Flow Log entries showing REJECT on the ENI" },
      { id: "C", text: "CloudWatch CPUUtilization metrics" },
      { id: "D", text: "Route 53 query logs" },
    ],
    correctAnswers: ["B"],
    explanation:
      "VPC Flow Logs record ACCEPT/REJECT per flow on each ENI — a REJECT entry on the return direction pinpoints a NACL or security group blocking traffic. They're the first tool for 'is the packet even getting through.'",
    optionExplanations: {
      A: "CloudTrail logs control-plane API calls, not packet flows.",
      B: "Correct. REJECT records show exactly what's dropped and where.",
      C: "CPU metrics say nothing about packet filtering.",
      D: "DNS logs cover name resolution, not traffic blocking.",
    },
    services: ["Amazon VPC"],
    references: [
      {
        title: "VPC Flow Logs",
        url: "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-des-002",
    slug: "dx-resilient-design",
    cert: "ans-c01",
    domain: "ans-network-design",
    topic: "ans-hybrid-connectivity",
    subtopic: "Direct Connect resilience",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A financial firm's production workloads depend on Direct Connect to AWS. Leadership requires the hybrid link to survive any single facility or device failure. What's the resilient design?",
    options: [
      { id: "A", text: "One dedicated DX connection on a high-bandwidth port" },
      { id: "B", text: "Two DX connections at separate locations/devices — plus a Site-to-Site VPN as backup path" },
      { id: "C", text: "A single DX connection with a higher SLA" },
      { id: "D", text: "Rely on the public internet for resilience" },
    ],
    correctAnswers: ["B"],
    explanation:
      "DX resilience requires physically redundant connections at different colocation facilities/devices, ideally with a VPN backup path for worst-case dual failure. Bandwidth and SLAs don't create redundancy.",
    optionExplanations: {
      A: "A single connection is a single point of failure regardless of speed.",
      B: "Correct. Redundant DX + VPN backup is the reference resilient pattern.",
      C: "SLAs are contractual, not technical redundancy.",
      D: "Public internet lacks the consistency/production guarantees needed.",
    },
    services: ["AWS Direct Connect", "AWS Site-to-Site VPN"],
    references: [
      {
        title: "Direct Connect resilience",
        url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/resilient-dx.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-imp-002",
    slug: "tgw-route-table-segmentation",
    cert: "ans-c01",
    domain: "ans-network-implementation",
    topic: "ans-dns-and-routing",
    subtopic: "Transit Gateway routing",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A Transit Gateway connects prod, dev, and shared-services VPCs. Prod and dev must NOT reach each other but both must reach shared services. How is this enforced at the TGW layer?",
    options: [
      { id: "A", text: "Put all attachments in one TGW route table" },
      { id: "B", text: "Separate TGW route tables — prod and dev each propagate to the shared table but not to each other's table" },
      { id: "C", text: "Security groups only — TGW can't isolate" },
      { id: "D", text: "Delete the dev attachment" },
    ],
    correctAnswers: ["B"],
    explanation:
      "TGW route tables control which attachments can reach each other: place shared services in a table both prod and dev route to, while keeping prod and dev in separate tables without mutual propagation — segmentation at the routing layer.",
    optionExplanations: {
      A: "One shared table gives full mesh — violates isolation.",
      B: "Correct. Route-table design enforces segmentation natively.",
      C: "SGs filter at the instance level — routing-layer isolation is the stronger control.",
      D: "That removes dev's connectivity entirely.",
    },
    services: ["AWS Transit Gateway", "Amazon VPC"],
    references: [
      {
        title: "Transit Gateway route tables",
        url: "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-sec-003",
    slug: "centralized-egress-inspection",
    cert: "ans-c01",
    domain: "ans-network-security-compliance",
    topic: "ans-network-security",
    subtopic: "Egress inspection",
    difficulty: "hard",
    format: "single-choice",
    question:
      "Security policy requires all outbound internet traffic from 20 workload VPCs to pass through deep packet inspection. What's the scalable architecture?",
    options: [
      { id: "A", text: "NAT gateways in every VPC with security groups" },
      { id: "B", text: "A dedicated egress/inspection VPC with AWS Network Firewall, fronted by Transit Gateway routing all outbound flows through it" },
      { id: "C", text: "WAF on each VPC's internet gateway" },
      { id: "D", text: "Squid proxies in one VPC with VPC peering" },
    ],
    correctAnswers: ["B"],
    explanation:
      "The reference pattern: a centralized inspection VPC running Network Firewall (or GWLB + appliances), with TGW route tables steering all egress through it — scales to many VPCs with one policy domain.",
    optionExplanations: {
      A: "NAT + SGs provide no DPI — just connectivity and port filtering.",
      B: "Correct. Centralized inspection VPC + TGW is the documented design.",
      C: "WAF attaches to ALB/CloudFront, not outbound NAT paths.",
      D: "DIY proxies + peering don't scale and lack managed DPI.",
    },
    services: ["AWS Network Firewall", "AWS Transit Gateway"],
    references: [
      {
        title: "Deploying Network Firewall",
        url: "https://docs.aws.amazon.com/network-firewall/latest/developerguide/vpc-tgw.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-des-003",
    slug: "vpc-cidr-non-overlapping-planning",
    cert: "ans-c01",
    domain: "ans-network-design",
    topic: "ans-hybrid-connectivity",
    subtopic: "Address planning",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company will peer five VPCs and later connect on-prem networks over Direct Connect. What is the most important design decision up front?",
    options: [
      { id: "A", text: "Assign every VPC a /16 for maximum capacity" },
      { id: "B", text: "Ensure all VPC and on-prem CIDRs are non-overlapping" },
      { id: "C", text: "Use the same CIDR in each VPC and rely on NAT" },
      { id: "D", text: "Enable IPv6 only to avoid IPv4 exhaustion" },
    ],
    correctAnswers: ["B"],
    explanation:
      "VPC peering, Transit Gateway, and hybrid routing all require non-overlapping CIDRs — you cannot change a VPC's primary CIDR after creation. Plan an address schema (e.g., different /16s per VPC, distinct on-prem ranges) before building.",
    optionExplanations: {
      A: "Capacity matters but /16s everywhere wastes space — and says nothing about overlap, the actual blocker.",
      B: "Correct. Overlapping CIDRs make peering and hybrid routing impossible without painful NAT workarounds.",
      C: "Duplicate CIDRs can't be peered or routed — NAT-at-scale for overlapping networks is a documented anti-pattern.",
      D: "IPv6 doesn't remove the need to plan; most hybrid networks still carry IPv4.",
    },
    services: ["Amazon VPC", "AWS Transit Gateway"],
    references: [
      {
        title: "VPC peering limitations",
        url: "https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-hyb-003",
    slug: "site-to-site-vpn-vs-direct-connect-latency",
    cert: "ans-c01",
    domain: "ans-network-design",
    topic: "ans-hybrid-connectivity",
    subtopic: "Hybrid connectivity",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A workload needs consistent, low-latency private connectivity between a data center and AWS with predictable bandwidth — the connection must not traverse the public internet. Which option fits?",
    options: [
      { id: "A", text: "AWS Site-to-Site VPN" },
      { id: "B", text: "AWS Direct Connect" },
      { id: "C", text: "VPC peering to the corporate network" },
      { id: "D", text: "AWS Client VPN" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Direct Connect is a private physical link — consistent latency, dedicated bandwidth, no internet traversal. Site-to-Site VPN is private in the encrypted sense but still rides the public internet, so latency varies.",
    optionExplanations: {
      A: "VPN tunnels encrypt traffic but run over the public internet — latency and bandwidth aren't predictable.",
      B: "Correct. Dedicated private circuit = consistent latency and bandwidth.",
      C: "Peering connects VPCs to each other — it can't reach a corporate data center.",
      D: "Client VPN is for end-user remote access, not site connectivity.",
    },
    services: ["AWS Direct Connect", "AWS Site-to-Site VPN"],
    references: [
      {
        title: "What is AWS Direct Connect",
        url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-imp-003",
    slug: "transit-gateway-route-table-isolation",
    cert: "ans-c01",
    domain: "ans-network-management-operations",
    topic: "ans-network-operations",
    subtopic: "Transit Gateway",
    difficulty: "hard",
    format: "single-choice",
    question:
      "Ten VPCs attach to a Transit Gateway. Two 'shared services' VPCs must be reachable by all, but the eight workload VPCs must not reach each other. How is this enforced?",
    options: [
      { id: "A", text: "Security groups on every workload instance" },
      { id: "B", text: "Separate TGW route tables: one for workloads propagating only shared services, one for shared services propagating everything" },
      { id: "C", text: "Network ACLs blocking inter-VPC subnets" },
      { id: "D", text: "One TGW route table with blackhole routes for each workload CIDR" },
    ],
    correctAnswers: ["B"],
    explanation:
      "TGW route tables control which attachments can reach which — associate workload VPCs to a table propagating only shared services, and shared services to a table seeing all CIDRs. Segmentation lives in the routing layer, not security groups.",
    optionExplanations: {
      A: "Security groups filter at instance level — an operational burden across hundreds of resources, and doesn't express topology.",
      B: "Correct. This hub-spoke pattern via TGW route tables is the standard segmentation design.",
      C: "NACLs are stateless subnet filters — they'd need constant updates as CIDRs change.",
      D: "Blackholing workload CIDRs in one table also breaks shared-services return traffic paths in many designs — two tables is the clean pattern.",
    },
    services: ["AWS Transit Gateway", "Amazon VPC"],
    references: [
      {
        title: "Transit Gateway route tables",
        url: "https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "ans-sec-004",
    slug: "vpc-traffic-mirroring-inspection",
    cert: "ans-c01",
    domain: "ans-network-security-compliance",
    topic: "ans-network-security",
    subtopic: "Traffic inspection",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A security team needs full packet copies from specific EC2 instances sent to an appliance for deep-packet inspection — without installing agents. What provides this?",
    options: [
      { id: "A", text: "VPC Flow Logs" },
      { id: "B", text: "VPC Traffic Mirroring" },
      { id: "C", text: "AWS Network Firewall" },
      { id: "D", text: "Route 53 Resolver query logs" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Traffic Mirroring copies network packets from ENIs of selected instances to a mirror target (NLB or appliance ENI) — agentless, full-packet capture for inspection tools. Flow Logs are metadata only, not payloads.",
    optionExplanations: {
      A: "Flow Logs record connection metadata (IPs, ports, bytes) — no packet contents.",
      B: "Correct. Mirroring delivers encapsulated copies of actual packets to your inspection target.",
      C: "Network Firewall inspects traffic in-line at the VPC boundary, not copies from arbitrary instance ENIs.",
      D: "Resolver logs cover DNS queries only.",
    },
    services: ["Amazon VPC"],
    references: [
      {
        title: "What is Traffic Mirroring",
        url: "https://docs.aws.amazon.com/vpc/latest/mirroring/what-is-traffic-mirroring.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
];
