export const SITE = {
  name: "CloudCertPrep",
  tagline: "Learn AWS Architecture. Practice with Confidence.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cloudcertprep.com",
  description:
    "Free practice questions, explanations, mock exams, and study plans for the AWS Certified Solutions Architect – Associate (SAA-C03) exam.",
  nav: [
    { label: "Practice Questions", href: "/practice" },
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
