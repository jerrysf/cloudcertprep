import type { CertificationId } from "./schema";

export interface RoadmapStep {
  /** Certification we cover (links to its hub). */
  certId?: CertificationId;
  /** Exam code for certs we don't cover yet — rendered as a muted badge. */
  externalCode?: string;
  externalName?: string;
  externalLevel?: "foundational" | "associate" | "professional" | "specialty";
  kind: "core" | "optional" | "stretch";
  note?: string;
}

export interface Roadmap {
  slug: string;
  title: string;
  audience: string;
  description: string;
  steps: RoadmapStep[];
}

export const ROADMAPS: Roadmap[] = [
  {
    slug: "solutions-architect",
    title: "Solutions Architect",
    audience: "Designing systems on AWS",
    description:
      "The classic architect track: fundamentals first, then the Associate blueprint, then Professional-level multi-account and organizational design.",
    steps: [
      {
        certId: "clf-c02",
        kind: "optional",
        note: "Skip if you already have hands-on AWS experience.",
      },
      {
        certId: "saa-c03",
        kind: "core",
        note: "The anchor cert — Well-Architected reasoning across compute, storage, DB, networking.",
      },
      {
        certId: "sap-c02",
        kind: "core",
        note: "Multi-account orgs, migration, complex hybrid — the professional tier.",
      },
      {
        certId: "ans-c01",
        kind: "stretch",
        note: "Deep networking depth — valuable for hybrid/global architectures.",
      },
    ],
  },
  {
    slug: "devops-cloudops-engineer",
    title: "DevOps / CloudOps Engineer",
    audience: "Operating and automating AWS workloads",
    description:
      "Operations-first path: monitoring, deployment automation, and reliability — then broaden into architecture and the DevOps professional cert.",
    steps: [
      {
        certId: "clf-c02",
        kind: "optional",
        note: "Skip if you already know AWS fundamentals.",
      },
      {
        certId: "soa-c03",
        kind: "core",
        note: "CloudOps: monitoring, remediation, deployment, security ops — the ops baseline.",
      },
      {
        certId: "saa-c03",
        kind: "core",
        note: "Architecture literacy — you can't automate what you can't design.",
      },
      {
        certId: "dva-c02",
        kind: "optional",
        note: "CI/CD services, Lambda, and IaC deepen the automation skill set.",
      },
      {
        externalCode: "DOP-C02",
        externalName: "DevOps Engineer – Professional",
        externalLevel: "professional",
        kind: "core",
        note: "The DevOps professional tier — practice content coming soon.",
      },
      {
        certId: "sap-c02",
        kind: "stretch",
        note: "For platform/lead roles owning org-wide infrastructure.",
      },
    ],
  },
  {
    slug: "developer",
    title: "Developer",
    audience: "Building applications on AWS",
    description:
      "Code-first path: serverless and SDK fluency at Associate, then architectural breadth to design what you build.",
    steps: [
      {
        certId: "clf-c02",
        kind: "optional",
        note: "Skip if you already deploy on AWS.",
      },
      {
        certId: "dva-c02",
        kind: "core",
        note: "Lambda, DynamoDB, API Gateway, CI/CD — the builder's cert.",
      },
      {
        certId: "saa-c03",
        kind: "core",
        note: "Broadens you from writing services to designing them.",
      },
      {
        certId: "sap-c02",
        kind: "stretch",
        note: "Senior/staff-level architecture scope.",
      },
    ],
  },
  {
    slug: "security-engineer",
    title: "Security Engineer",
    audience: "Securing AWS environments",
    description:
      "Security requires architecture context first — then the specialty cert covering detection, IR, and data protection in depth.",
    steps: [
      {
        certId: "clf-c02",
        kind: "optional",
        note: "Foundation if new to AWS.",
      },
      {
        certId: "saa-c03",
        kind: "core",
        note: "You secure what you understand — architecture first.",
      },
      {
        certId: "scs-c03",
        kind: "core",
        note: "Detection, incident response, IAM depth, data protection, governance.",
      },
      {
        certId: "ans-c01",
        kind: "stretch",
        note: "Network-layer defense at scale — firewalls, inspection, segmentation.",
      },
    ],
  },
  {
    slug: "data-engineer",
    title: "Data Engineer / Analytics",
    audience: "Building data pipelines and lakes",
    description:
      "Data platform path: foundational cloud literacy, then the analytics-heavy DEA cert covering ingestion, storage, ETL, and governance.",
    steps: [
      {
        certId: "clf-c02",
        kind: "optional",
        note: "Foundation if new to AWS.",
      },
      {
        certId: "dea-c01",
        kind: "core",
        note: "Kinesis, Glue, Redshift, Athena, Lake Formation — the data platform core.",
      },
      {
        certId: "saa-c03",
        kind: "optional",
        note: "Architecture breadth for designing end-to-end platforms.",
      },
      {
        certId: "sap-c02",
        kind: "stretch",
        note: "For data platform architects owning org-wide design.",
      },
    ],
  },
  {
    slug: "ai-ml-engineer",
    title: "AI / ML Practitioner",
    audience: "Applying AI and generative AI on AWS",
    description:
      "Start with the AI practitioner cert — accessible even without deep ML background — then build architectural and engineering depth.",
    steps: [
      {
        certId: "aif-c01",
        kind: "core",
        note: "GenAI fundamentals, Bedrock, responsible AI — no ML experience required.",
      },
      {
        certId: "clf-c02",
        kind: "optional",
        note: "If also new to AWS generally — broad cloud literacy.",
      },
      {
        certId: "saa-c03",
        kind: "core",
        note: "Architecture context for deploying AI workloads in real systems.",
      },
      {
        externalCode: "MLA-C01",
        externalName: "ML Engineer – Associate",
        externalLevel: "associate",
        kind: "stretch",
        note: "SageMaker-centric ML engineering — practice content coming soon.",
      },
    ],
  },
  {
    slug: "network-engineer",
    title: "Network Engineer",
    audience: "Hybrid and large-scale networking",
    description:
      "Networking path: broad architecture foundation, then the deepest AWS specialty — hybrid connectivity, TGW, DNS, and inspection at scale.",
    steps: [
      {
        certId: "clf-c02",
        kind: "optional",
        note: "Foundation if new to AWS.",
      },
      {
        certId: "saa-c03",
        kind: "core",
        note: "VPC fundamentals in architectural context first.",
      },
      {
        certId: "ans-c01",
        kind: "core",
        note: "Direct Connect, TGW routing, hybrid DNS, Network Firewall — the deep dive.",
      },
      {
        certId: "scs-c03",
        kind: "stretch",
        note: "Security depth pairs naturally with network inspection roles.",
      },
    ],
  },
];

export function getRoadmap(slug: string): Roadmap | undefined {
  return ROADMAPS.find((r) => r.slug === slug);
}
