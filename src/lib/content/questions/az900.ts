import type { Question } from "../schema";

export const az900Questions: Question[] = [
  // ---- Cloud Concepts (az-cloud-concepts) ----
  {
    id: "az-cc-001",
    slug: "az-public-cloud-model",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A startup runs all of its applications on infrastructure owned and operated by a cloud provider, accessed over the internet, with no on-premises datacenter. Which cloud model is this?",
    options: [
      { id: "A", text: "Private cloud" },
      { id: "B", text: "Public cloud" },
      { id: "C", text: "Hybrid cloud" },
      { id: "D", text: "Community cloud" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Public cloud means computing services delivered over the internet by a third-party provider (like Microsoft Azure) that owns and operates all the hardware. Private cloud is dedicated to one organization (on-premises or hosted); hybrid combines private and public.",
    optionExplanations: {
      A: "Private cloud is infrastructure dedicated to a single organization, typically on-premises or dedicated hosting.",
      B: "Public cloud delivers services over the internet from a shared, provider-owned infrastructure — matches this scenario exactly.",
      C: "Hybrid cloud combines on-premises/private infrastructure with public cloud — this org has no on-premises footprint.",
      D: "Community cloud is shared by organizations with common requirements — not a standard Azure exam model.",
    },
    services: ["Azure"],
    references: [
      {
        title: "Describe cloud computing — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-002",
    slug: "az-hybrid-cloud-definition",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A company keeps sensitive customer data on on-premises servers but bursts web traffic to Azure during peak periods, with both environments connected and managed together. Which model is this?",
    options: [
      { id: "A", text: "Public cloud" },
      { id: "B", text: "Private cloud" },
      { id: "C", text: "Hybrid cloud" },
      { id: "D", text: "Multi-cloud" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Hybrid cloud interconnects on-premises (private) infrastructure with public cloud so workloads and data can move between them. It is a core AZ-900 definition — look for 'on-premises + cloud working together' in the stem.",
    optionExplanations: {
      A: "Public-only would mean no on-premises infrastructure — the scenario explicitly keeps data on-premises.",
      B: "Private-only wouldn't use Azure for bursting.",
      C: "Hybrid = on-premises + public cloud integrated as one environment. Correct.",
      D: "Multi-cloud means using services from multiple public cloud providers — only Azure is used here.",
    },
    services: ["Azure Arc"],
    references: [
      {
        title: "Cloud deployment models — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-003",
    slug: "az-capex-vs-opex",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which statement correctly compares capital expenditure (CapEx) and operational expenditure (OpEx) in the context of cloud computing?",
    options: [
      {
        id: "A",
        text: "Cloud computing primarily uses CapEx — you buy servers upfront and depreciate them",
      },
      {
        id: "B",
        text: "Cloud computing primarily uses OpEx — you pay for resources as you consume them, with no upfront hardware purchase",
      },
      {
        id: "C",
        text: "CapEx and OpEx are identical in cloud and on-premises models",
      },
      {
        id: "D",
        text: "On-premises computing is an OpEx-only model with no upfront costs",
      },
    ],
    correctAnswers: ["B"],
    explanation:
      "Cloud shifts spending from CapEx (buying physical infrastructure upfront) to OpEx (paying for services as consumed, like a utility bill). On-premises requires CapEx for servers, storage, and facilities.",
    optionExplanations: {
      A: "Buying servers upfront is the on-premises CapEx model — cloud removes that upfront purchase.",
      B: "Correct — consumption-based billing is OpEx: pay for what you use, when you use it.",
      C: "They differ fundamentally: CapEx = upfront investment; OpEx = ongoing consumption costs.",
      D: "On-premises requires substantial CapEx for hardware, licenses, and facilities.",
    },
    services: ["Azure"],
    references: [
      {
        title: "Benefits of cloud services — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-004",
    slug: "az-shared-responsibility-saas",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Under the shared responsibility model, which customer responsibility remains in ALL service models (IaaS, PaaS, and SaaS)?",
    options: [
      { id: "A", text: "Patching the operating system" },
      { id: "B", text: "Maintaining the physical network" },
      {
        id: "C",
        text: "Managing the data, accounts, and identities you put in the cloud",
      },
      { id: "D", text: "Updating the hypervisor" },
    ],
    correctAnswers: ["C"],
    explanation:
      "The shared responsibility model divides duties by service type: the provider always owns the physical layer; in IaaS the customer manages the OS upward; in SaaS nearly everything except data, accounts/identities, and devices. Data and identity are always the customer's responsibility.",
    optionExplanations: {
      A: "OS patching is the provider's job in PaaS and SaaS — only in IaaS does the customer do it.",
      B: "Physical network is always the provider's responsibility.",
      C: "Data, accounts/identities, and access control are always the customer's — in every model.",
      D: "The hypervisor is always provider-managed infrastructure.",
    },
    services: ["Azure"],
    references: [
      {
        title: "Shared responsibility model — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-005",
    slug: "az-iaas-paas-saas-examples",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which pairing of Azure service and cloud service type is correct?",
    options: [
      { id: "A", text: "Azure Virtual Machines — SaaS" },
      { id: "B", text: "Azure App Service — IaaS" },
      { id: "C", text: "Microsoft 365 — PaaS" },
      { id: "D", text: "Azure Functions — PaaS" },
    ],
    correctAnswers: ["D"],
    explanation:
      "Azure VMs = IaaS (you manage the OS). App Service and Functions = PaaS (provider manages OS and runtime; Functions adds serverless event-driven execution). Microsoft 365 = SaaS (finished software). These service-model mappings are among the most repeated AZ-900 questions.",
    optionExplanations: {
      A: "VMs give you full OS control — that's the classic IaaS offering.",
      B: "App Service abstracts the OS — PaaS, not IaaS.",
      C: "Microsoft 365 is finished end-user software — SaaS.",
      D: "Functions is a serverless PaaS: you supply code, Azure runs infrastructure and scales automatically.",
    },
    services: ["Azure Virtual Machines", "Azure App Service", "Azure Functions"],
    references: [
      {
        title: "Types of cloud services — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-006",
    slug: "az-high-availability-sla",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "An e-commerce site must stay online even if individual servers fail. Which cloud benefit primarily describes minimizing downtime through redundancy?",
    options: [
      { id: "A", text: "Agility" },
      { id: "B", text: "High availability" },
      { id: "C", text: "Scalability" },
      { id: "D", text: "Economies of scale" },
    ],
    correctAnswers: ["B"],
    explanation:
      "High availability means keeping services running despite component failures, typically via redundant resources across fault domains or availability zones, and is expressed through SLAs (e.g., 99.9% or 99.95% uptime).",
    optionExplanations: {
      A: "Agility is the ability to deploy and configure resources quickly — not uptime.",
      B: "High availability = resilience to failure through redundancy, guaranteed by SLAs.",
      C: "Scalability handles demand growth — a different benefit.",
      D: "Economies of scale is a cost benefit, not availability.",
    },
    services: ["Azure"],
    references: [
      {
        title: "High availability and scalability — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-007",
    slug: "az-scalability-vs-elasticity",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A retailer wants capacity to grow AND shrink automatically in response to real-time demand, so they never pay for idle resources. Which cloud capability is this?",
    options: [
      { id: "A", text: "Scalability" },
      { id: "B", text: "Elasticity" },
      { id: "C", text: "High availability" },
      { id: "D", text: "Predictability" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Elasticity is the automatic, demand-driven expansion AND contraction of resources. Scalability is the broader ability to grow capacity (which may be manual). The exam keyword pair is 'automatic' + 'shrink' → elasticity.",
    optionExplanations: {
      A: "Scalability means the system can grow, but doesn't imply automatic scale-in/scale-out.",
      B: "Elasticity = automatic, demand-matched scaling in both directions. Correct.",
      C: "High availability is about uptime, not capacity adjustment.",
      D: "Predictability refers to consistent performance/cost forecasting.",
    },
    services: ["Azure"],
    references: [
      {
        title: "Scalability and elasticity — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-008",
    slug: "az-vertical-vs-horizontal-scaling",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "medium",
    format: "single-choice",
    question:
      "To handle increased load, a team adds more instances of a web app behind a load balancer rather than upgrading to a larger server. What is this called?",
    options: [
      { id: "A", text: "Vertical scaling (scale up)" },
      { id: "B", text: "Horizontal scaling (scale out)" },
      { id: "C", text: "Fault tolerance" },
      { id: "D", text: "Geo-distribution" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Scaling out (horizontal) adds more instances/nodes; scaling up (vertical) makes a single instance more powerful (more CPU/RAM). Adding app instances behind a load balancer is the textbook scale-out pattern.",
    optionExplanations: {
      A: "Scale up = bigger single server — the scenario adds more instances instead.",
      B: "Scale out = more instances in parallel. Correct.",
      C: "Fault tolerance is surviving failures — related but not what 'adding instances for load' describes.",
      D: "Geo-distribution is placing resources in multiple regions for latency/DR.",
    },
    services: ["Azure Load Balancer", "Azure Virtual Machine Scale Sets"],
    references: [
      {
        title: "Scalability concepts — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-009",
    slug: "az-agility-benefit",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A development team provisions a complete test environment in 15 minutes using Azure, instead of waiting six weeks for hardware procurement. Which cloud benefit does this demonstrate?",
    options: [
      { id: "A", text: "Agility" },
      { id: "B", text: "High availability" },
      { id: "C", text: "Economies of scale" },
      { id: "D", text: "Governance" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Agility is the speed of provisioning and deprovisioning resources — deploy environments in minutes rather than waiting for procurement cycles. It's the 'do things faster' benefit.",
    optionExplanations: {
      A: "Agility = rapid resource provisioning and iteration. Correct.",
      B: "High availability is about uptime/redundancy.",
      C: "Economies of scale is a cost benefit from provider-scale purchasing.",
      D: "Governance is about control and compliance, not speed.",
    },
    services: ["Azure"],
    references: [
      {
        title: "Benefits of cloud services — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-010",
    slug: "az-consumption-based-model",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "What does the consumption-based model of cloud pricing mean?",
    options: [
      {
        id: "A",
        text: "You pay a fixed annual fee regardless of usage",
      },
      {
        id: "B",
        text: "You pay only for the resources and services you actually use",
      },
      {
        id: "C",
        text: "You must purchase reserved capacity before using any service",
      },
      {
        id: "D",
        text: "You are billed per user license like traditional software",
      },
    ],
    correctAnswers: ["B"],
    explanation:
      "Consumption-based (pay-as-you-go) pricing bills for actual usage — compute time, storage consumed, transactions. No usage means no charge, which is what makes the OpEx model fundamentally different from buying fixed capacity.",
    optionExplanations: {
      A: "A fixed annual fee is a subscription/license model, not consumption-based.",
      B: "Pay-as-you-go = billed per actual usage. Correct.",
      C: "Reservations are optional discounts on top of consumption — not required.",
      D: "Per-user licensing describes SaaS licenses like Microsoft 365, not cloud resource pricing.",
    },
    services: ["Azure Cost Management"],
    references: [
      {
        title: "Consumption-based model — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-011",
    slug: "az-disaster-recovery-benefit",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company uses Azure regions on different continents so an application can fail over if one geography experiences a major outage. Which cloud benefit is being used?",
    options: [
      { id: "A", text: "Scalability" },
      { id: "B", text: "Agility" },
      {
        id: "C",
        text: "Disaster recovery through geo-distribution",
      },
      { id: "D", text: "Elasticity" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Geo-distribution — deploying across multiple regions — provides disaster recovery: if one region fails, workloads can continue elsewhere. Cloud makes multi-region DR affordable compared to building secondary datacenters.",
    optionExplanations: {
      A: "Scalability is about handling load changes, not surviving regional disasters.",
      B: "Agility is speed of provisioning.",
      C: "Cross-region failover is exactly cloud-enabled disaster recovery. Correct.",
      D: "Elasticity is automatic scaling with demand.",
    },
    services: ["Azure Site Recovery"],
    references: [
      {
        title: "Disaster recovery and reliability — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-012",
    slug: "az-economies-of-scale",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Why can large cloud providers offer compute at lower per-unit cost than most individual organizations can achieve on-premises?",
    options: [
      { id: "A", text: "They use older, cheaper hardware" },
      {
        id: "B",
        text: "Economies of scale — massive purchasing power and shared infrastructure lower per-customer costs",
      },
      {
        id: "C",
        text: "They don't have to pay for electricity or facilities",
      },
      {
        id: "D",
        text: "They charge hidden fees that offset the apparent savings",
      },
    ],
    correctAnswers: ["B"],
    explanation:
      "Economies of scale: providers buy hardware and energy at massive volume discounts and amortize datacenter costs across millions of customers, passing savings on as lower per-unit prices.",
    optionExplanations: {
      A: "Providers run modern hardware — the savings come from scale, not cheap equipment.",
      B: "Volume purchasing + shared infrastructure = lower per-unit costs. Correct.",
      C: "Providers pay huge power/facility costs — spread across an enormous customer base.",
      D: "Pricing is consumption-based and transparent; the model works because of real scale efficiencies.",
    },
    services: ["Azure"],
    references: [
      {
        title: "Benefits of cloud services — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  // ---- Core Azure Services (az-core-services) ----
  {
    id: "az-svc-001",
    slug: "az-regions-definition",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "easy",
    format: "single-choice",
    question:
      "What is an Azure region?",
    options: [
      { id: "A", text: "A single datacenter building" },
      {
        id: "B",
        text: "A geographic area containing one or more datacenters networked together with low latency",
      },
      { id: "C", text: "A logical grouping of Azure subscriptions" },
      { id: "D", text: "A country where Azure is legally available" },
    ],
    correctAnswers: ["B"],
    explanation:
      "A region is a set of datacenters deployed within a latency-defined perimeter, connected through a dedicated low-latency network. You choose the region where resources are deployed for latency, compliance, and feature availability reasons.",
    optionExplanations: {
      A: "A single building is a datacenter, not a region — regions contain multiple datacenters.",
      B: "Correct — a region = geographic cluster of networked datacenters.",
      C: "That's a management group / subscription concept, not a region.",
      D: "Availability is a legal/commercial concept — a region is a technical geography of datacenters.",
    },
    services: ["Azure regions"],
    references: [
      {
        title: "Azure regions and availability zones — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-svc-002",
    slug: "az-availability-zones",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "medium",
    format: "single-choice",
    question:
      "To protect an application against the failure of an entire datacenter, a solution should distribute resources across which Azure construct?",
    options: [
      { id: "A", text: "Availability zones" },
      { id: "B", text: "Resource groups" },
      { id: "C", text: "Management groups" },
      { id: "D", text: "Azure subscriptions" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Availability zones are physically separate datacenters within a region, each with independent power, cooling, and networking. Distributing VMs or services across zones protects against single-datacenter failure — the key zone-vs-region distinction: zones protect within a region; multiple regions protect against regional loss.",
    optionExplanations: {
      A: "Availability zones = separate datacenters in one region. Correct for datacenter-level failure.",
      B: "Resource groups are logical containers — they provide no physical redundancy.",
      C: "Management groups organize subscriptions for governance — unrelated to availability.",
      D: "Subscriptions are billing/access boundaries, not fault-isolation units.",
    },
    services: ["Azure Availability Zones"],
    references: [
      {
        title: "What are availability zones — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-svc-003",
    slug: "az-region-pairs",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "medium",
    format: "single-choice",
    question:
      "What is the primary purpose of Azure region pairs?",
    options: [
      { id: "A", text: "To halve the cost of running in two regions" },
      {
        id: "B",
        text: "To provide built-in disaster recovery geography — paired regions receive platform updates sequentially and support data residency within the same geography",
      },
      {
        id: "C",
        text: "To let any VM automatically fail over without configuration",
      },
      { id: "D", text: "To share a single virtual network between regions" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Each region is paired with another in the same geography (e.g., East US ↔ West US). Pairs get sequential platform updates (one at a time), prioritized recovery in disasters, and data residency within the geography for services that replicate data (e.g., GRS storage).",
    optionExplanations: {
      A: "There's no pairing discount — you pay for resources in each region.",
      B: "Correct — pairing exists for disaster recovery, sequential updates, and in-geography data residency.",
      C: "Failover still requires architecting it; pairing doesn't make it automatic.",
      D: "VNets are regional resources — pairing doesn't merge networks.",
    },
    services: ["Azure regions"],
    references: [
      {
        title: "Azure region pairs — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/reliability/cross-region-replication-azure",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-svc-004",
    slug: "az-resource-groups",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which statement about Azure resource groups is correct?",
    options: [
      { id: "A", text: "A resource can belong to multiple resource groups simultaneously" },
      {
        id: "B",
        text: "A resource group is a logical container; each resource belongs to exactly one, and deleting the group deletes all resources in it",
      },
      {
        id: "C",
        text: "Resources in a group must be deployed in the same region",
      },
      { id: "D", text: "Resource groups cannot be nested or moved" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Every resource lives in exactly one resource group. Groups act as a management/lifecycle boundary — applying RBAC, tags, locks, and deletion to the group affects all contained resources. Resources in a group CAN span regions.",
    optionExplanations: {
      A: "One resource = one resource group, always. It can be moved to a different group, but never duplicated.",
      B: "Correct — single membership + lifecycle container semantics.",
      C: "A group can hold resources in different regions; the group itself just has a metadata location.",
      D: "Groups can't be nested (that's management groups), but resources CAN be moved between them.",
    },
    services: ["Azure Resource Manager"],
    references: [
      {
        title: "Resource groups — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-svc-005",
    slug: "az-management-groups-hierarchy",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An enterprise wants Azure Policy and RBAC assignments to inherit automatically to dozens of subscriptions organized by department. What should they use above the subscription level?",
    options: [
      { id: "A", text: "Resource groups" },
      { id: "B", text: "Management groups" },
      { id: "C", text: "Availability sets" },
      { id: "D", text: "Tags" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Management groups sit above subscriptions in the hierarchy (tenant root → management groups → subscriptions → resource groups → resources). Policy and access assigned at a management group inherit to all child subscriptions — the standard mechanism for at-scale governance.",
    optionExplanations: {
      A: "Resource groups are below subscriptions — they can't span subscriptions.",
      B: "Management groups = the governance layer above subscriptions. Correct.",
      C: "Availability sets are a VM fault-domain construct, not an organizational hierarchy.",
      D: "Tags label resources for cost/reporting — they don't inherit policy or access.",
    },
    services: ["Azure Management Groups", "Azure Policy"],
    references: [
      {
        title: "Azure management groups — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/governance/management-groups/overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-svc-006",
    slug: "az-vm-iaas-control",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A team needs maximum control — choice of operating system, custom kernel-level software, and full administrative access. Which Azure compute option fits?",
    options: [
      { id: "A", text: "Azure Virtual Machines" },
      { id: "B", text: "Azure App Service" },
      { id: "C", text: "Azure Functions" },
      { id: "D", text: "Azure Container Instances" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Azure VMs are the IaaS offering: full OS control, any software stack, administrative access — with the tradeoff that you patch and manage the OS yourself. PaaS options (App Service, Functions) trade control for less management.",
    optionExplanations: {
      A: "VMs = full OS-level control (IaaS). Correct.",
      B: "App Service hosts web apps without OS access — PaaS convenience, less control.",
      C: "Functions is serverless — you only bring code.",
      D: "Container Instances run single containers without orchestration — no OS control like a VM.",
    },
    services: ["Azure Virtual Machines"],
    references: [
      {
        title: "Azure compute options — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-svc-007",
    slug: "az-app-service-paas",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A developer wants to deploy a web application without managing the underlying OS, patching, or load balancers — just push code. Which Azure service is designed for this?",
    options: [
      { id: "A", text: "Azure Virtual Machines" },
      { id: "B", text: "Azure App Service" },
      { id: "C", text: "Azure Kubernetes Service" },
      { id: "D", text: "Azure ExpressRoute" },
    ],
    correctAnswers: ["B"],
    explanation:
      "App Service is the managed PaaS for web apps, REST APIs, and mobile backends: deploy code (or containers), and Azure handles OS, patching, scaling, and load balancing. The 'just deploy my web app' answer is almost always App Service.",
    optionExplanations: {
      A: "VMs mean managing the OS yourself — opposite of the requirement.",
      B: "App Service = managed web app platform. Correct.",
      C: "AKS is Kubernetes orchestration — far more operational surface than needed.",
      D: "ExpressRoute is private network connectivity, not compute.",
    },
    services: ["Azure App Service"],
    references: [
      {
        title: "Azure App Service overview — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/app-service/overview",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-svc-008",
    slug: "az-functions-serverless",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which Azure compute service runs small pieces of code in response to events, scales automatically, and bills only for execution time?",
    options: [
      { id: "A", text: "Azure Virtual Machine Scale Sets" },
      { id: "B", text: "Azure Functions" },
      { id: "C", text: "Azure Batch" },
      { id: "D", text: "Azure SQL Database" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Azure Functions is the serverless compute service: event-driven, per-execution billing, automatic scale to zero — the purest 'pay only when code runs' model. Container Instances is also per-second but is for containers.",
    optionExplanations: {
      A: "Scale Sets scale VMs — you pay for VM uptime, not per execution.",
      B: "Functions = event-driven serverless with per-execution billing. Correct.",
      C: "Batch runs large-scale parallel jobs on managed VM pools — not per-event serverless.",
      D: "SQL Database is a data platform, not compute for event handlers.",
    },
    services: ["Azure Functions"],
    references: [
      {
        title: "Azure Functions overview — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-svc-009",
    slug: "az-aks-vs-container-instances",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company needs to orchestrate hundreds of containers with automated scaling, self-healing, and rolling deployments. Which Azure service is designed for this?",
    options: [
      { id: "A", text: "Azure Container Instances" },
      { id: "B", text: "Azure Kubernetes Service (AKS)" },
      { id: "C", text: "Azure App Service" },
      { id: "D", text: "Azure Virtual Machines" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AKS is the managed Kubernetes service for production container orchestration at scale — scheduling, scaling, self-healing, rolling updates. Container Instances is for simple single containers without orchestration ('run one container fast' = ACI; 'orchestrate many containers' = AKS).",
    optionExplanations: {
      A: "ACI runs containers quickly without orchestration — no scaling/self-healing management.",
      B: "AKS = managed Kubernetes for orchestration at scale. Correct.",
      C: "App Service can host single containers but isn't a container orchestrator.",
      D: "VMs would require building your own orchestration.",
    },
    services: ["Azure Kubernetes Service", "Azure Container Instances"],
    references: [
      {
        title: "Azure Kubernetes Service — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/aks/what-is-aks",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-svc-010",
    slug: "az-expressroute-private-connection",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A bank requires a dedicated private connection between its on-premises datacenter and Azure that does NOT traverse the public internet. Which service provides this?",
    options: [
      { id: "A", text: "Azure VPN Gateway" },
      { id: "B", text: "Azure ExpressRoute" },
      { id: "C", text: "Azure DNS" },
      { id: "D", text: "Virtual network peering" },
    ],
    correctAnswers: ["B"],
    explanation:
      "ExpressRoute provides private dedicated connectivity via connectivity providers — traffic never touches the public internet, offering consistent bandwidth/latency. VPN Gateway also connects on-prem to Azure but DOES traverse the internet (encrypted).",
    optionExplanations: {
      A: "VPN Gateway encrypts traffic over the public internet — fails the 'not over internet' requirement.",
      B: "ExpressRoute = private dedicated circuit via a provider. Correct.",
      C: "DNS is name resolution, not connectivity.",
      D: "Peering connects two Azure VNets — not on-premises to Azure.",
    },
    services: ["Azure ExpressRoute", "Azure VPN Gateway"],
    references: [
      {
        title: "ExpressRoute overview — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-svc-011",
    slug: "az-blob-storage-tiers",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Backups are retained for seven years for compliance and are almost never read. Which Blob Storage access tier minimizes storage cost for this data?",
    options: [
      { id: "A", text: "Hot tier" },
      { id: "B", text: "Cool tier" },
      { id: "C", text: "Archive tier" },
      { id: "D", text: "Premium tier" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Access tiers trade storage cost for access cost/latency: Hot (frequent access), Cool (infrequent, ≥30 days), Cold (rare, ≥90 days), Archive (rarely accessed, hours of rehydration latency, cheapest storage). Seven-year compliance backups almost never read = Archive.",
    optionExplanations: {
      A: "Hot = highest storage cost, optimized for frequent access — opposite of this use case.",
      B: "Cool is for infrequent but online access (~30-day minimum) — still pricier than Archive.",
      C: "Archive = cheapest storage, offline, hours to rehydrate. Correct for long-retention backups.",
      D: "Premium is high-performance SSD-backed block storage — most expensive.",
    },
    services: ["Azure Blob Storage"],
    references: [
      {
        title: "Blob access tiers — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-svc-012",
    slug: "az-storage-redundancy-grs",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which storage redundancy option replicates data to a secondary region hundreds of miles away for regional disaster recovery?",
    options: [
      { id: "A", text: "Locally redundant storage (LRS)" },
      { id: "B", text: "Zone-redundant storage (ZRS)" },
      { id: "C", text: "Geo-redundant storage (GRS)" },
      { id: "D", text: "Premium file shares" },
    ],
    correctAnswers: ["C"],
    explanation:
      "LRS = 3 copies within one datacenter (cheapest, protects hardware failure). ZRS = copies across availability zones in a region (protects datacenter loss). GRS = LRS + async replication to a paired secondary region (protects regional loss). GZRS combines both.",
    optionExplanations: {
      A: "LRS stays within a single datacenter — no regional protection.",
      B: "ZRS spans zones within ONE region — regional outage still loses it.",
      C: "GRS replicates to the paired secondary region. Correct.",
      D: "Premium is a performance tier, not a redundancy option.",
    },
    services: ["Azure Storage"],
    references: [
      {
        title: "Azure Storage redundancy — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  // ---- Identity & Access (az-identity-access) ----
  {
    id: "az-ids-001",
    slug: "az-entra-id-service",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-identity-access",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which Azure service provides cloud-based identity and access management — handling user sign-in, MFA, and single sign-on to applications?",
    options: [
      { id: "A", text: "Microsoft Entra ID" },
      { id: "B", text: "Azure Key Vault" },
      { id: "C", text: "Microsoft Defender for Cloud" },
      { id: "D", text: "Azure Active Directory Domain Services only" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Microsoft Entra ID (formerly Azure Active Directory) is Azure's cloud identity provider: user/device identity, authentication, MFA, SSO, conditional access. Key Vault is for secrets; Defender for Cloud is workload protection.",
    optionExplanations: {
      A: "Entra ID = the identity and access management service. Correct.",
      B: "Key Vault stores keys, secrets, and certificates — not user sign-in.",
      C: "Defender for Cloud is a security posture/workload protection service, not an IdP.",
      D: "Entra Domain Services provides managed AD domain features — a different, narrower service.",
    },
    services: ["Microsoft Entra ID"],
    references: [
      {
        title: "Microsoft Entra ID overview — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/entra/fundamentals/whatis",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-ids-002",
    slug: "az-authentication-vs-authorization",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-identity-access",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A user successfully signs in with their credentials, then is denied access to a resource because their role doesn't permit it. Which two concepts do the two steps represent?",
    options: [
      { id: "A", text: "Authorization, then authentication" },
      { id: "B", text: "Authentication, then authorization" },
      { id: "C", text: "Encryption, then hashing" },
      { id: "D", text: "Federation, then conditional access" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Authentication (AuthN) proves who you are — the sign-in. Authorization (AuthZ) determines what you're allowed to do — the role/permission check. Sign-in first, permission check second.",
    optionExplanations: {
      A: "The order is reversed — you authenticate before authorization can be evaluated.",
      B: "AuthN = identity proof (sign-in); AuthZ = permission check (denied by role). Correct.",
      C: "Encryption/hashing are data-protection primitives, not access-control steps.",
      D: "Federation and conditional access are specific identity mechanisms, not the two generic steps.",
    },
    services: ["Microsoft Entra ID"],
    references: [
      {
        title: "Authentication vs authorization — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-ids-003",
    slug: "az-mfa-factors",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-identity-access",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which scenario represents true multi-factor authentication (MFA)?",
    options: [
      { id: "A", text: "Entering a password plus a PIN" },
      {
        id: "B",
        text: "Entering a password (knowledge) plus approving a notification on a phone app (possession)",
      },
      {
        id: "C",
        text: "Using two different authenticator apps on the same phone",
      },
      { id: "D", text: "Answering two security questions" },
    ],
    correctAnswers: ["B"],
    explanation:
      "MFA requires factors from at least two categories: something you know (password/PIN), something you have (phone, hardware key), something you are (biometrics). Two factors from the same category (password + PIN) is not MFA.",
    optionExplanations: {
      A: "Password and PIN are both 'something you know' — single category, not MFA.",
      B: "Knowledge (password) + possession (phone) = two categories. Correct.",
      C: "Two authenticator apps are the same possession factor.",
      D: "Both security questions are knowledge factors.",
    },
    services: ["Microsoft Entra multifactor authentication"],
    references: [
      {
        title: "How MFA works — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-ids-004",
    slug: "az-sso-benefit",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-identity-access",
    difficulty: "easy",
    format: "single-choice",
    question:
      "What is the primary benefit of single sign-on (SSO) in Microsoft Entra ID?",
    options: [
      { id: "A", text: "Users never need passwords at all" },
      {
        id: "B",
        text: "Users authenticate once and can access multiple applications without re-entering credentials",
      },
      {
        id: "C",
        text: "All applications share the same stored password",
      },
      {
        id: "D",
        text: "It eliminates the need for authorization checks",
      },
    ],
    correctAnswers: ["B"],
    explanation:
      "SSO lets one identity and one sign-in session unlock many apps — fewer credentials to manage, better UX, central revocation. Each app still performs its own authorization; SSO is about authentication, not shared passwords.",
    optionExplanations: {
      A: "SSO reduces sign-ins but doesn't remove authentication itself.",
      B: "One authentication → many app sessions. Correct.",
      C: "Apps never share passwords — SSO brokers tokens, not credentials.",
      D: "Authorization still applies per application and role.",
    },
    services: ["Microsoft Entra ID"],
    references: [
      {
        title: "Single sign-on — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/what-is-single-sign-on",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-ids-005",
    slug: "az-rbac-scopes",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-identity-access",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An admin assigns a user the 'Virtual Machine Contributor' role on a resource group. What does Azure RBAC determine?",
    options: [
      { id: "A", text: "Whether the user can sign in" },
      {
        id: "B",
        text: "What actions the user can perform on resources within that scope",
      },
      {
        id: "C",
        text: "Which region the user's resources must be deployed to",
      },
      {
        id: "D",
        text: "The user's network bandwidth allocation",
      },
    ],
    correctAnswers: ["B"],
    explanation:
      "RBAC is Azure's authorization system: a role assignment = security principal + role definition + scope (management group, subscription, resource group, or resource). Access is allow-based and inherits downward — grant at a broader scope applies to all child resources.",
    optionExplanations: {
      A: "Sign-in is authentication handled by Entra ID — RBAC is the authorization layer after sign-in.",
      B: "Role + principal + scope = what actions are allowed. Correct.",
      C: "Region restrictions are Azure Policy's job, not RBAC.",
      D: "RBAC has nothing to do with bandwidth.",
    },
    services: ["Azure RBAC"],
    references: [
      {
        title: "What is Azure RBAC — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-ids-006",
    slug: "az-zero-trust-principles",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-identity-access",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which set correctly lists the three guiding principles of Zero Trust?",
    options: [
      {
        id: "A",
        text: "Trust but verify, encrypt everything, centralize control",
      },
      {
        id: "B",
        text: "Verify explicitly, use least privilege access, assume breach",
      },
      {
        id: "C",
        text: "Perimeter defense, VPN for all users, on-premises first",
      },
      {
        id: "D",
        text: "Automate everything, monitor continuously, patch regularly",
      },
    ],
    correctAnswers: ["B"],
    explanation:
      "The Zero Trust model: (1) verify explicitly — authenticate and authorize using all available signals; (2) least privilege — just-enough, just-in-time access; (3) assume breach — design as if attackers are already inside. 'Never trust, always verify' is the tagline.",
    optionExplanations: {
      A: "'Trust but verify' is the opposite philosophy — Zero Trust starts from no implicit trust.",
      B: "Correct — the three official Zero Trust principles.",
      C: "Perimeter-centric thinking is what Zero Trust replaces.",
      D: "Good operational practices, but not the named Zero Trust principles.",
    },
    services: ["Zero Trust"],
    references: [
      {
        title: "What is Zero Trust — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-ids-007",
    slug: "az-defense-in-depth",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-identity-access",
    difficulty: "medium",
    format: "single-choice",
    question:
      "What does a defense-in-depth security strategy involve?",
    options: [
      {
        id: "A",
        text: "Deploying the strongest possible single firewall at the network edge",
      },
      {
        id: "B",
        text: "Multiple independent layers of security controls so a breach of one layer doesn't expose the whole system",
      },
      {
        id: "C",
        text: "Moving all workloads on-premises where they can be physically guarded",
      },
      {
        id: "D",
        text: "Relying on Microsoft to secure everything above the physical layer",
      },
    ],
    correctAnswers: ["B"],
    explanation:
      "Defense in depth layers controls — physical, identity & access, perimeter, network, compute, application, data — so attackers must defeat multiple independent defenses. The classic AZ-900 diagram is the concentric-ring model with data at the center.",
    optionExplanations: {
      A: "A single strong perimeter is the opposite — one failure point.",
      B: "Layered, redundant controls across seven levels. Correct.",
      C: "Location doesn't matter — the principle applies to any environment.",
      D: "Shared responsibility still leaves identity, data, and access to the customer.",
    },
    services: ["Microsoft Defender for Cloud"],
    references: [
      {
        title: "Defense in depth — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-ids-008",
    slug: "az-defender-for-cloud",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-identity-access",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which Azure service provides a unified security posture view — secure score, regulatory compliance assessment, and threat protection recommendations across Azure and hybrid workloads?",
    options: [
      { id: "A", text: "Microsoft Entra ID" },
      { id: "B", text: "Azure Sentinel content only" },
      { id: "C", text: "Microsoft Defender for Cloud" },
      { id: "D", text: "Azure Advisor" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Microsoft Defender for Cloud is the CSPM (cloud security posture management) + CWPP (cloud workload protection) service: secure score, compliance dashboards, and Defender plans per workload. Advisor gives cost/performance/reliability recommendations — its security items come from Defender.",
    optionExplanations: {
      A: "Entra ID is the identity service, not posture management.",
      B: "Sentinel is Microsoft's SIEM/SOAR — related but focuses on analytics/detection, not posture scoring.",
      C: "Defender for Cloud = posture + protection + secure score. Correct.",
      D: "Advisor surfaces recommendations but Defender for Cloud owns the security posture engine.",
    },
    services: ["Microsoft Defender for Cloud"],
    references: [
      {
        title: "Microsoft Defender for Cloud — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  // ---- Management & Governance (az-management-governance) ----
  {
    id: "az-mg-001",
    slug: "az-pricing-calculator",
    cert: "az-900",
    domain: "az-management-governance",
    topic: "az-management-governance",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Before provisioning anything, a team wants to estimate the monthly cost of a planned architecture by selecting services, regions, and usage levels. Which tool should they use?",
    options: [
      { id: "A", text: "Total Cost of Ownership (TCO) Calculator" },
      { id: "B", text: "Azure Pricing Calculator" },
      { id: "C", text: "Azure Advisor" },
      { id: "D", text: "Azure Cost Management" },
    ],
    correctAnswers: ["B"],
    explanation:
      "The Pricing Calculator estimates future Azure costs for a planned configuration — no resources needed, no account sign-in. TCO Calculator compares on-premises vs Azure cost; Cost Management analyzes costs of what you've already deployed.",
    optionExplanations: {
      A: "TCO Calculator compares existing on-premises costs to Azure — not per-service estimation.",
      B: "Pricing Calculator = estimate before you build. Correct.",
      C: "Advisor recommends optimizations on existing resources.",
      D: "Cost Management reports on actual spend — after the fact.",
    },
    services: ["Azure Pricing Calculator"],
    references: [
      {
        title: "Azure cost estimation tools — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-mg-002",
    slug: "az-tco-calculator",
    cert: "az-900",
    domain: "az-management-governance",
    topic: "az-management-governance",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A company wants to compare the cost of running its existing on-premises servers against equivalent Azure infrastructure to build a migration business case. Which tool is designed for this comparison?",
    options: [
      { id: "A", text: "Azure Pricing Calculator" },
      { id: "B", text: "Total Cost of Ownership (TCO) Calculator" },
      { id: "C", text: "Azure Monitor" },
      { id: "D", text: "Azure Policy" },
    ],
    correctAnswers: ["B"],
    explanation:
      "The TCO Calculator takes your current on-premises workloads and produces a comparison report against Azure — the migration business-case tool. Pricing Calculator estimates Azure costs but doesn't model your existing on-prem environment.",
    optionExplanations: {
      A: "Pricing Calculator estimates Azure-side costs but doesn't compare against your current datacenter.",
      B: "TCO Calculator = on-prem vs Azure comparison. Correct.",
      C: "Monitor collects telemetry, not cost comparisons.",
      D: "Policy enforces governance rules.",
    },
    services: ["Azure TCO Calculator"],
    references: [
      {
        title: "Azure TCO Calculator — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-mg-003",
    slug: "az-cost-management-budgets",
    cert: "az-900",
    domain: "az-management-governance",
    topic: "az-management-governance",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A team wants automatic alerts when monthly Azure spending exceeds defined thresholds, plus breakdowns showing which resource groups drive the spend. Which tool provides this?",
    options: [
      { id: "A", text: "Azure Advisor" },
      { id: "B", text: "Microsoft Cost Management" },
      { id: "C", text: "Azure Monitor" },
      { id: "D", text: "Azure Resource Manager" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Cost Management provides cost analysis (breakdowns by service, resource group, tag), budgets, alerts, and scheduled exports. Tags on resources enable grouping spend by department/environment.",
    optionExplanations: {
      A: "Advisor recommends cost savings but doesn't do budgets/alerts/reporting.",
      B: "Cost Management = analysis + budgets + alerts. Correct.",
      C: "Monitor is performance/health telemetry, not billing.",
      D: "ARM is the deployment/management layer — not cost tooling.",
    },
    services: ["Microsoft Cost Management"],
    references: [
      {
        title: "Microsoft Cost Management — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/overview-cost-management",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-mg-004",
    slug: "az-azure-policy-enforcement",
    cert: "az-900",
    domain: "az-management-governance",
    topic: "az-management-governance",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An organization must ensure all new resources are deployed only in approved regions. Which service enforces this rule and blocks non-compliant deployments?",
    options: [
      { id: "A", text: "Azure RBAC" },
      { id: "B", text: "Azure Policy" },
      { id: "C", text: "Azure resource locks" },
      { id: "D", text: "Tags" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Azure Policy creates, assigns, and enforces rules over resources — e.g., 'allowed locations', allowed SKUs, required tags. Non-compliant deployments are denied or flagged. Locks prevent deletion/modification; RBAC controls who can do what; tags are metadata.",
    optionExplanations: {
      A: "RBAC controls who can perform actions, not where resources may be deployed.",
      B: "Azure Policy = rule enforcement like allowed-locations. Correct.",
      C: "Locks only prevent deletion/modification — they can't restrict regions.",
      D: "Tags describe resources; they don't block deployments.",
    },
    services: ["Azure Policy"],
    references: [
      {
        title: "Azure Policy overview — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/governance/policy/overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-mg-005",
    slug: "az-resource-locks",
    cert: "az-900",
    domain: "az-management-governance",
    topic: "az-management-governance",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An admin accidentally deleted a production VM last month. Which feature prevents accidental deletion or modification of resources going forward?",
    options: [
      { id: "A", text: "Azure Policy" },
      { id: "B", text: "Resource locks (CanNotDelete / ReadOnly)" },
      { id: "C", text: "Azure Advisor recommendations" },
      { id: "D", text: "Availability zones" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Resource locks apply to subscriptions, resource groups, or individual resources: CanNotDelete allows read/modify but blocks deletion; ReadOnly blocks modification and deletion. Locks apply regardless of permissions — even owners must remove the lock first.",
    optionExplanations: {
      A: "Policy can deny certain actions but isn't the named mechanism for delete protection.",
      B: "Locks exist precisely for accidental delete/modify protection. Correct.",
      C: "Advisor recommends — it doesn't prevent actions.",
      D: "Availability zones protect against datacenter failure, not admin mistakes.",
    },
    services: ["Azure resource locks"],
    references: [
      {
        title: "Lock resources — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-mg-006",
    slug: "az-azure-monitor-logs-metrics",
    cert: "az-900",
    domain: "az-management-governance",
    topic: "az-management-governance",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which Azure platform service collects, analyzes, and acts on telemetry — metrics and logs — from cloud and on-premises resources?",
    options: [
      { id: "A", text: "Azure Advisor" },
      { id: "B", text: "Azure Monitor" },
      { id: "C", text: "Azure Service Health" },
      { id: "D", text: "Azure Resource Manager" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Azure Monitor is the full observability platform: metrics (numeric time-series) and logs (collected into Log Analytics workspaces via KQL), alerts, dashboards. Application Insights is its application-monitoring component; Service Health reports Azure platform issues.",
    optionExplanations: {
      A: "Advisor gives optimization recommendations — a different tool.",
      B: "Monitor = the telemetry platform. Correct.",
      C: "Service Health reports Azure service outages/advisories, not your resource telemetry.",
      D: "ARM manages resources, not monitoring.",
    },
    services: ["Azure Monitor", "Log Analytics"],
    references: [
      {
        title: "Azure Monitor overview — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/azure-monitor/overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-mg-007",
    slug: "az-advisor-vs-service-health",
    cert: "az-900",
    domain: "az-management-governance",
    topic: "az-management-governance",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which service notifies you specifically about Azure platform issues — outages or planned maintenance — that could affect YOUR resources?",
    options: [
      { id: "A", text: "Azure Advisor" },
      { id: "B", text: "Azure Service Health" },
      { id: "C", text: "Azure Monitor" },
      { id: "D", text: "Azure status page only" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Service Health delivers personalized alerts about Azure service issues, planned maintenance, and health advisories affecting your subscriptions/regions. Advisor recommends cost/security/reliability/performance improvements for YOUR resources — the pair is a classic exam distinction.",
    optionExplanations: {
      A: "Advisor = recommendations for your resources, not platform outage alerts.",
      B: "Service Health = personalized platform-health alerts. Correct.",
      C: "Monitor watches your resource telemetry, not Microsoft's platform status.",
      D: "The public status page isn't personalized to your environment — Service Health is.",
    },
    services: ["Azure Service Health", "Azure Advisor"],
    references: [
      {
        title: "Azure Service Health — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/service-health/overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-mg-008",
    slug: "az-arm-templates-bicep-iac",
    cert: "az-900",
    domain: "az-management-governance",
    topic: "az-management-governance",
    difficulty: "medium",
    format: "multiple-response",
    question:
      "A team wants to define Azure infrastructure as code — declarative files that deploy resources consistently and repeatably. Which tools are Azure's native infrastructure-as-code options? (Choose TWO)",
    options: [
      { id: "A", text: "ARM templates (JSON)" },
      { id: "B", text: "Bicep" },
      { id: "C", text: "Azure Advisor" },
      { id: "D", text: "Azure Monitor alerts" },
    ],
    correctAnswers: ["A", "B"],
    explanation:
      "ARM templates (JSON) and Bicep (a friendlier DSL that compiles to ARM) are Microsoft's declarative IaC options; Terraform is a third-party alternative. Both deploy the same resource graph idempotently through Azure Resource Manager.",
    optionExplanations: {
      A: "ARM templates = the foundational JSON declarative format. Correct.",
      B: "Bicep = modern concise DSL that transpiles to ARM. Correct.",
      C: "Advisor recommends optimizations — not a deployment language.",
      D: "Monitor alerts are observability, not IaC.",
    },
    services: ["Azure Resource Manager", "Bicep"],
    references: [
      {
        title: "Infrastructure as code options — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/deployment-models",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-13",
  },
  {
    id: "az-cc-013",
    slug: "az-cloud-vs-onprem-capex-opex",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which statement correctly contrasts capital expenditure (CapEx) and operational expenditure (OpEx) in cloud computing?",
    options: [
      { id: "A", text: "CapEx = upfront hardware purchases depreciated over years; OpEx = pay-as-you-go consumption that scales with usage" },
      { id: "B", text: "CapEx = monthly subscriptions; OpEx = datacenter builds" },
      { id: "C", text: "Cloud eliminates all costs" },
      { id: "D", text: "OpEx requires long-term contracts" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Cloud converts infrastructure spend from CapEx (big upfront, own the depreciation risk) to OpEx (metered consumption, treat as operating cost). The exam tests this shift plus elasticity — paying for what you use when you use it.",
    optionExplanations: {
      A: "Correct — upfront vs metered consumption.",
      B: "Reversed definitions.",
      C: "Cloud shifts the cost model — doesn't remove cost.",
      D: "OpEx is consumption-based — contracts not required.",
    },
    services: ["Azure"],
    references: [
      {
        title: "CapEx vs OpEx — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "az-cc-014",
    slug: "az-private-public-hybrid-cloud",
    cert: "az-900",
    domain: "az-cloud-concepts",
    topic: "az-cloud-concepts",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A bank runs sensitive workloads in its own datacenter with cloud-style automation, and bursts seasonal traffic to Azure. What deployment model is this?",
    options: [
      { id: "A", text: "Hybrid cloud — private infrastructure plus public cloud integration" },
      { id: "B", text: "Public cloud only" },
      { id: "C", text: "Private cloud only" },
      { id: "D", text: "Multi-cloud" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Private cloud = dedicated infrastructure with cloud characteristics (virtualization, self-service); hybrid = private + public working as one environment; multi-cloud = multiple PUBLIC providers. Mixing hybrid with multi-cloud is the common exam trap.",
    optionExplanations: {
      A: "Private + public integration = hybrid. Correct.",
      B: "The datacenter part makes this not public-only.",
      C: "Bursting to Azure means it's not private-only.",
      D: "Multi-cloud means multiple public providers — not on-prem + one cloud.",
    },
    services: ["Azure"],
    references: [
      {
        title: "Cloud deployment models — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "az-svc-013",
    slug: "az-paas-service-selection",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "medium",
    format: "multiple-response",
    question:
      "Which TWO Azure services are PaaS offerings where Microsoft manages the OS and runtime? (Select TWO.)",
    options: [
      { id: "A", text: "Azure App Service" },
      { id: "B", text: "Azure SQL Database" },
      { id: "C", text: "Azure Virtual Machines" },
      { id: "D", text: "Azure Virtual Network" },
    ],
    correctAnswers: ["A", "B"],
    explanation:
      "App Service (managed web hosting) and SQL Database (managed relational DB) are PaaS — Microsoft handles OS/runtime patching, you handle the app/data. VMs are IaaS (you patch the OS); VNet is infrastructure networking.",
    optionExplanations: {
      A: "Managed web platform = PaaS. Correct.",
      B: "Managed database service = PaaS. Correct.",
      C: "VMs leave the OS to you = IaaS.",
      D: "Networking is an IaaS building block.",
    },
    services: ["Azure App Service", "Azure SQL Database"],
    references: [
      {
        title: "Cloud service types — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "az-svc-014",
    slug: "azure-functions-serverless",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Code must run only when a file lands in storage — no servers to manage, billed per execution. Which Azure compute service?",
    options: [
      { id: "A", text: "Azure Functions" },
      { id: "B", text: "Azure Virtual Machines" },
      { id: "C", text: "Azure Kubernetes Service" },
      { id: "D", text: "Azure App Service dedicated plan" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Functions = event-driven serverless compute: triggers (blob, queue, HTTP, timer) invoke code, consumption plan bills per execution + scales to zero. VMs/AKS require capacity management; App Service dedicated is always-on.",
    optionExplanations: {
      A: "Event-triggered, per-execution billing = Functions. Correct.",
      B: "VMs run 24/7 — you manage everything.",
      C: "AKS orchestrates containers — needs node pools.",
      D: "Dedicated plans bill for reserved capacity.",
    },
    services: ["Azure Functions"],
    references: [
      {
        title: "Azure Functions — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "az-svc-015",
    slug: "azure-dns-vs-traffic-manager",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-core-services",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A global app must route users to the nearest healthy deployment endpoint based on routing rules. Which Azure service performs this intelligent traffic distribution?",
    options: [
      { id: "A", text: "Azure Traffic Manager" },
      { id: "B", text: "Azure DNS" },
      { id: "C", text: "Azure Load Balancer" },
      { id: "D", text: "Azure CDN" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Traffic Manager = DNS-based global routing across endpoints (performance, weighted, priority, geographic routing methods). Azure DNS only hosts/resolves zones; Load Balancer distributes within a region (L4); CDN caches content at edges.",
    optionExplanations: {
      A: "Global endpoint routing = Traffic Manager. Correct.",
      B: "Azure DNS resolves names — doesn't pick endpoints.",
      C: "Load Balancer works inside one region — L4 only.",
      D: "CDN caches content — not endpoint failover routing.",
    },
    services: ["Azure Traffic Manager"],
    references: [
      {
        title: "Traffic Manager — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/traffic-manager/traffic-manager-overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "az-ids-009",
    slug: "entra-mfa-methods",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-identity-access",
    difficulty: "easy",
    format: "single-choice",
    question:
      "An organization requires a second verification factor beyond passwords at sign-in — authenticator app push, SMS, or hardware key. Which Entra ID capability enforces this?",
    options: [
      { id: "A", text: "Microsoft Entra multifactor authentication (MFA)" },
      { id: "B", text: "Single sign-on (SSO)" },
      { id: "C", text: "Password hash sync" },
      { id: "D", text: "RBAC role assignment" },
    ],
    correctAnswers: ["A"],
    explanation:
      "MFA adds a second factor (something you have/are) — enforced via Conditional Access policies or per-user settings. SSO reduces sign-in count; PHS is an authentication method; RBAC is authorization, not authentication.",
    optionExplanations: {
      A: "Second-factor enforcement = MFA. Correct.",
      B: "SSO = one login for many apps — no second factor.",
      C: "PHS syncs password hashes — still single-factor.",
      D: "RBAC controls what you can do — not how you prove identity.",
    },
    services: ["Microsoft Entra ID"],
    references: [
      {
        title: "Microsoft Entra MFA — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "az-ids-010",
    slug: "conditional-access-policy",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-identity-access",
    difficulty: "medium",
    format: "single-choice",
    question:
      "IT wants sign-ins from outside the corporate network to require MFA, while in-office sign-ins pass without it. Which Entra feature implements signal-based access decisions?",
    options: [
      { id: "A", text: "Conditional Access policies" },
      { id: "B", text: "Azure RBAC" },
      { id: "C", text: "Access reviews" },
      { id: "D", text: "Privileged Identity Management" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Conditional Access = if-then access control: signals (location, device, app, risk) → decisions (allow, require MFA, block). It's the policy engine for context-aware authentication — not RBAC (resource permissions) or PIM (JIT elevation).",
    optionExplanations: {
      A: "Signal→decision policy engine = Conditional Access. Correct.",
      B: "RBAC is authorization on resources — not sign-in conditions.",
      C: "Access reviews audit group membership — not real-time sign-in.",
      D: "PIM manages privileged role activation — not base sign-in rules.",
    },
    services: ["Microsoft Entra ID"],
    references: [
      {
        title: "Conditional Access — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "az-ids-011",
    slug: "managed-identity-purpose",
    cert: "az-900",
    domain: "az-architecture-services",
    topic: "az-identity-access",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A VM-hosted app needs to call Key Vault WITHOUT storing any client secret or connection string in code. Which Azure feature provides the credential automatically?",
    options: [
      { id: "A", text: "Managed identity — system- or user-assigned Entra identity for the resource" },
      { id: "B", text: "Service principal with a stored secret" },
      { id: "C", text: "Shared access signature" },
      { id: "D", text: "An Entra user account" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Managed identities give Azure resources an Entra identity whose credential lifecycle Azure manages entirely — no secrets in code, no rotation burden. The 'no stored credentials' requirement is the exam's managed-identity signal.",
    optionExplanations: {
      A: "Azure-managed credential = managed identity. Correct.",
      B: "A stored secret is exactly what we're avoiding.",
      C: "SAS is a token embedded in URLs — still a stored credential.",
      D: "User accounts shouldn't run services.",
    },
    services: ["Microsoft Entra ID", "Azure Key Vault"],
    references: [
      {
        title: "Managed identities — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "az-mg-009",
    slug: "azure-policy-vs-blueprint",
    cert: "az-900",
    domain: "az-management-governance",
    topic: "az-management-governance",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Compliance requires that all storage accounts in the org enforce HTTPS — automatically auditing and remedying violations. Which Azure service?",
    options: [
      { id: "A", text: "Azure Policy — define and enforce rules over resource configurations" },
      { id: "B", text: "Azure Resource Graph" },
      { id: "C", text: "Azure Advisor" },
      { id: "D", text: "Resource locks" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Azure Policy evaluates/enforces resource configuration rules (audit, deny, modify, deployIfNotExists effects) at management-group or subscription scope. Resource Graph queries inventory; Advisor recommends; locks prevent changes to specific resources.",
    optionExplanations: {
      A: "Rule enforcement at scale = Azure Policy. Correct.",
      B: "Resource Graph queries resources — doesn't enforce.",
      C: "Advisor recommends best practices — doesn't enforce.",
      D: "Locks block delete/change on individual resources — not config rules.",
    },
    services: ["Azure Policy"],
    references: [
      {
        title: "Azure Policy — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/governance/policy/overview",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  },
  {
    id: "az-mg-010",
    slug: "azure-pricing-calculator-vs-tco",
    cert: "az-900",
    domain: "az-management-governance",
    topic: "az-management-governance",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which tool estimates the MONTHLY COST of a planned Azure deployment, and which compares total cost vs running it on-premises?",
    options: [
      { id: "A", text: "Pricing Calculator (deployment estimate) + TCO Calculator (cloud vs on-prem comparison)" },
      { id: "B", text: "Cost Management for both" },
      { id: "C", text: "Azure Advisor for both" },
      { id: "D", text: "Budgets and alerts" },
    ],
    correctAnswers: ["A"],
      explanation:
      "Pricing Calculator models a hypothetical deployment's cost; TCO Calculator estimates savings vs on-prem (hardware, power, labor); Cost Management analyzes ACTUAL spend after deployment. The exam loves the calculator pair.",
    optionExplanations: {
      A: "Estimate + comparison = Pricing + TCO. Correct.",
      B: "Cost Management analyzes real spend — not hypothetical.",
      C: "Advisor optimizes existing resources.",
      D: "Budgets control actual spend — not estimates.",
    },
    services: ["Azure Pricing Calculator"],
    references: [
      {
        title: "Cost tools — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-11-05",
  }
];
