import type { Question } from "../schema";

/**
 * AIF-C01 (AWS Certified AI Practitioner) seed questions.
 */
export const aifQuestions: Question[] = [
  {
    id: "aif-ml-001",
    slug: "ai-vs-ml-vs-genai",
    cert: "aif-c01",
    domain: "aif-ai-ml-fundamentals",
    topic: "aif-ml-foundations",
    subtopic: "Terminology",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A team wants a system that learns patterns from historical data to predict future sales — without writing explicit rules. Which approach is this?",
    options: [
      { id: "A", text: "Traditional rule-based programming" },
      { id: "B", text: "Machine learning" },
      { id: "C", text: "Generative AI" },
      { id: "D", text: "Robotic process automation" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Machine learning learns patterns from historical data to make predictions on new data — exactly the sales-forecasting scenario. Generative AI creates new content; rule-based systems use explicit hand-written logic.",
    optionExplanations: {
      A: "Rule-based systems use explicit if-then logic, not learned patterns.",
      B: "Correct. Learning from data to predict is the definition of ML.",
      C: "Generative AI produces new content (text, images) rather than predicting numeric outcomes.",
      D: "RPA automates repetitive tasks via scripts; it doesn't learn.",
    },
    services: ["Amazon SageMaker AI"],
    references: [
      {
        title: "What is machine learning",
        url: "https://aws.amazon.com/what-is/machine-learning/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "aif-ml-002",
    slug: "managed-service-for-foundation-models",
    cert: "aif-c01",
    domain: "aif-fm-applications",
    topic: "aif-genai-and-bedrock",
    subtopic: "Amazon Bedrock",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A company wants to build generative AI apps using foundation models from multiple providers (Anthropic, Meta, Amazon) through a single API — without managing infrastructure or training models. Which AWS service?",
    options: [
      { id: "A", text: "Amazon SageMaker AI" },
      { id: "B", text: "Amazon Bedrock" },
      { id: "C", text: "Amazon Comprehend" },
      { id: "D", text: "AWS Lambda" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Amazon Bedrock is the fully managed service that provides access to foundation models from multiple providers through a unified API — the canonical answer for 'managed FMs without infrastructure'.",
    optionExplanations: {
      A: "SageMaker is for building/training your own ML models — heavier than consuming FMs.",
      B: "Correct. Bedrock offers multi-provider FMs via one managed API.",
      C: "Comprehend is a pre-built NLP analysis service, not an FM platform.",
      D: "Lambda is compute, not an AI model service.",
    },
    services: ["Amazon Bedrock"],
    references: [
      {
        title: "What is Amazon Bedrock",
        url: "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "aif-ml-003",
    slug: "grounding-llm-with-company-data",
    cert: "aif-c01",
    domain: "aif-fm-applications",
    topic: "aif-genai-and-bedrock",
    subtopic: "RAG",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A chatbot built on a foundation model keeps giving outdated answers because the model was trained before the company's latest documentation was written. Which technique grounds responses in the company's current documents without retraining?",
    options: [
      { id: "A", text: "Increase the model's temperature" },
      { id: "B", text: "Retrieval-Augmented Generation (RAG)" },
      { id: "C", text: "Fine-tuning on new data" },
      { id: "D", text: "Prompt engineering alone" },
    ],
    correctAnswers: ["B"],
    explanation:
      "RAG retrieves relevant documents at query time and injects them into the prompt — grounding the model in current data without any retraining. On AWS this is commonly implemented via knowledge bases connected to Bedrock.",
    optionExplanations: {
      A: "Temperature controls randomness, not knowledge freshness.",
      B: "Correct. RAG grounds responses in retrieved, up-to-date documents.",
      C: "Fine-tuning works but is slower and costlier than retrieval for changing data.",
      D: "Prompt engineering can't inject knowledge the model never saw.",
    },
    services: ["Amazon Bedrock"],
    references: [
      {
        title: "Retrieval-Augmented Generation on AWS",
        url: "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "aif-ml-004",
    slug: "responsible-ai-bias-mitigation",
    cert: "aif-c01",
    domain: "aif-responsible-ai",
    topic: "aif-responsible-ai",
    subtopic: "Bias and fairness",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A hiring-screening model consistently ranks candidates from one demographic group lower. Which responsible-AI dimension does this violate, and what's the first step to address it?",
    options: [
      { id: "A", text: "Explainability — make the model's reasoning transparent" },
      { id: "B", text: "Fairness — evaluate training data for demographic bias" },
      { id: "C", text: "Privacy — encrypt the candidate data" },
      { id: "D", text: "Robustness — test against adversarial inputs" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Systematic disadvantage to a demographic group is a fairness/bias problem. The first step is auditing the training data and model outputs for bias — then mitigating (rebalancing data, bias metrics, human review).",
    optionExplanations: {
      A: "Explainability helps diagnose but the problem itself is fairness.",
      B: "Correct. Demographic disparities are a fairness issue; audit the data first.",
      C: "Privacy protects data confidentiality, not equitable outcomes.",
      D: "Robustness concerns adversarial/noisy inputs, not systematic group bias.",
    },
    services: ["Amazon SageMaker AI"],
    references: [
      {
        title: "Responsible AI on AWS",
        url: "https://aws.amazon.com/ai/responsible-ai/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
];
