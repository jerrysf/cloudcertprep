import type { Question } from "../schema";

/**
 * DVA-C02 (AWS Certified Developer – Associate) seed questions.
 */
export const dvaQuestions: Question[] = [
  {
    id: "dva-dev-001",
    slug: "lambda-execution-time-limit",
    cert: "dva-c02",
    domain: "dva-development-with-aws",
    topic: "dva-serverless-and-apis",
    subtopic: "Lambda limits",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A Lambda function processes uploaded images. Processing occasionally takes 20 minutes and the function times out. What is the maximum Lambda execution timeout, and what's the right fix if the task regularly exceeds it?",
    options: [
      { id: "A", text: "5 minutes — split the work across more invocations" },
      { id: "B", text: "15 minutes — use Step Functions to orchestrate or move to ECS/Fargate for longer tasks" },
      { id: "C", text: "60 minutes — just increase the timeout setting" },
      { id: "D", text: "Unlimited if memory is increased" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Lambda's maximum execution timeout is 15 minutes. For workloads exceeding it, the standard pattern is orchestrating with Step Functions (task decomposition) or moving to containerized compute like ECS/Fargate with no per-request time cap.",
    optionExplanations: {
      A: "5 minutes is below the actual limit.",
      B: "Correct. 15 minutes is the cap; beyond it, use Step Functions or containers.",
      C: "No Lambda timeout setting goes to 60 minutes.",
      D: "Memory affects CPU/power, not the execution time ceiling.",
    },
    services: ["AWS Lambda", "AWS Step Functions", "Amazon ECS"],
    references: [
      {
        title: "Lambda quotas",
        url: "https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dva-dev-002",
    slug: "dynamodb-crud-from-lambda",
    cert: "dva-c02",
    domain: "dva-security",
    topic: "dva-app-security",
    subtopic: "DynamoDB SDK",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A Lambda function needs to read items from a DynamoDB table. What's the correct way to grant the function access — following least-privilege?",
    options: [
      { id: "A", text: "Embed AWS access keys in the function code" },
      { id: "B", text: "Attach an IAM execution role with DynamoDB read permissions on that table" },
      { id: "C", text: "Store credentials in environment variables" },
      { id: "D", text: "Make the DynamoDB table publicly readable" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Lambda runs under an IAM execution role. Grant that role scoped DynamoDB permissions (e.g., dynamodb:GetItem on the specific table ARN) — never embed credentials in code or environment variables.",
    optionExplanations: {
      A: "Hardcoded keys are a critical security anti-pattern.",
      B: "Correct. IAM roles provide temporary, scoped credentials automatically.",
      C: "Env vars leak credentials into config and are still a manual key pattern.",
      D: "There's no 'public' DynamoDB read — access always goes through IAM.",
    },
    services: ["AWS Lambda", "Amazon DynamoDB", "AWS IAM"],
    references: [
      {
        title: "Lambda execution role",
        url: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dva-dev-003",
    slug: "api-gateway-rest-vs-websocket",
    cert: "dva-c02",
    domain: "dva-development-with-aws",
    topic: "dva-serverless-and-apis",
    subtopic: "API Gateway",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A real-time chat application needs persistent two-way communication between clients and backend — messages pushed in both directions without polling. Which API Gateway type should be used?",
    options: [
      { id: "A", text: "REST API" },
      { id: "B", text: "HTTP API" },
      { id: "C", text: "WebSocket API" },
      { id: "D", text: "Private API" },
    ],
    correctAnswers: ["C"],
    explanation:
      "API Gateway WebSocket APIs maintain persistent connections enabling true bidirectional push — the right choice for chat/live-update apps. REST and HTTP APIs are request-response only.",
    optionExplanations: {
      A: "REST APIs are request-response; servers can't push to clients.",
      B: "HTTP APIs are also request-response (simpler/cheaper REST).",
      C: "Correct. WebSocket APIs provide persistent bidirectional channels.",
      D: "Private refers to VPC access scope, not communication pattern.",
    },
    services: ["Amazon API Gateway"],
    references: [
      {
        title: "WebSocket APIs in API Gateway",
        url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
  {
    id: "dva-dev-004",
    slug: "blue-green-deployment-service",
    cert: "dva-c02",
    domain: "dva-deployment",
    topic: "dva-cicd-and-observability",
    subtopic: "Deployment strategies",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A team wants zero-downtime deployments where a new environment runs alongside the old, traffic shifts only when the new version is verified, and rollback is instant. Which deployment strategy is this?",
    options: [
      { id: "A", text: "In-place rolling deployment" },
      { id: "B", text: "Blue/green deployment" },
      { id: "C", text: "Canary deployment to 10% then 100%" },
      { id: "D", text: "Recreate deployment" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Blue/green runs two full environments: traffic shifts wholesale from blue (old) to green (new) after verification, with instant rollback by shifting back. CodeDeploy supports this pattern for EC2 and ECS.",
    optionExplanations: {
      A: "Rolling replaces instances incrementally — no isolated full environment.",
      B: "Correct. Two parallel environments with an atomic traffic shift = blue/green.",
      C: "Canary is a gradual percentage ramp, not an all-at-once shift.",
      D: "Recreate causes downtime while the old version is torn down.",
    },
    services: ["AWS CodeDeploy"],
    references: [
      {
        title: "Blue/green deployments with CodeDeploy",
        url: "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-10-26",
  },
];
