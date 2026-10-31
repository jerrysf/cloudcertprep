export const SITE = {
  name: "CloudCertPrep",
  tagline: "Learn AWS Architecture. Practice with Confidence.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cloudcertprep.com",
  description:
    "Free practice questions, per-option explanations, timed mock exams, and study plans for AWS certifications — Cloud Practitioner, Solutions Architect, Developer, and more.",
  nav: [
    { label: "Certifications", href: "/certifications" },
    { label: "Practice Questions", href: "/practice" },
    { label: "Question Bank", href: "/questions" },
    { label: "Mock Exams", href: "/mock-exam" },
    { label: "Study Guides", href: "/services" },
    { label: "Flashcards", href: "/flashcards" },
    { label: "Progress", href: "/progress" },
  ],
  footer: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
} as const;

export const AWS_TRADEMARK_DISCLAIMER =
  "CloudCertPrep is an independent study resource and is not affiliated with, endorsed by, or sponsored by Amazon Web Services, Inc. AWS, Amazon Web Services, and all related marks are trademarks of Amazon.com, Inc. or its affiliates.";
