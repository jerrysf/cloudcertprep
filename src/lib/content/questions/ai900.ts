import type { Question } from "../schema";

export const ai900Questions: Question[] = [
  // ---- AI Workloads & Responsible AI (ai900-ai-workloads) ----
  {
    id: "aiz-wld-001",
    slug: "ai900-workload-types",
    cert: "ai-900",
    domain: "ai900-ai-workloads",
    topic: "ai900-ai-workloads",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A system forecasts tomorrow's electricity demand from historical usage and weather data to set prices. Which AI workload type is this?",
    options: [
      { id: "A", text: "Computer vision" },
      { id: "B", text: "Machine learning (prediction/forecasting)" },
      { id: "C", text: "Natural language processing" },
      { id: "D", text: "Anomaly detection only" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Forecasting continuous values from historical data is the machine-learning workload (specifically regression). The six AI-900 workload families: ML prediction, computer vision, NLP, document intelligence, knowledge mining, and generative AI.",
    optionExplanations: {
      A: "Computer vision processes images/video — this is numeric forecasting.",
      B: "Regression-style forecasting = core ML workload. Correct.",
      C: "NLP handles text/speech, not numeric prediction.",
      D: "Anomaly detection flags unusual points — demand forecasting is different.",
    },
    services: ["Azure Machine Learning"],
    references: [
      {
        title: "AI workloads — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-wld-002",
    slug: "ai900-responsible-ai-principles",
    cert: "ai-900",
    domain: "ai900-ai-workloads",
    topic: "ai900-ai-workloads",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Microsoft's responsible AI framework defines six guiding principles. Which set is correct?",
    options: [
      { id: "A", text: "Speed, scale, security, savings, simplicity, support" },
      { id: "B", text: "Fairness, reliability & safety, privacy & security, inclusiveness, transparency, accountability" },
      { id: "C", text: "Accuracy, availability, affordability, agility, automation, analytics" },
      { id: "D", text: "Performance, predictability, portability, privacy, productivity, partnership" },
    ],
    correctAnswers: ["B"],
    explanation:
      "The six Microsoft responsible AI principles: fairness, reliability & safety, privacy & security, inclusiveness, transparency, and accountability. This exact list is a guaranteed AI-900 question — memorize it.",
    optionExplanations: {
      A: "Business-values list, not the official principles.",
      B: "The official six. Correct.",
      C: "Made-up alliterative list — the real principles are ethical dimensions.",
      D: "Also not the framework — only 'privacy' overlaps.",
    },
    services: ["Responsible AI"],
    references: [
      {
        title: "Responsible AI principles — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-wld-003",
    slug: "ai900-fairness-principle",
    cert: "ai-900",
    domain: "ai900-ai-workloads",
    topic: "ai900-ai-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A loan-approval model is discovered to systematically reject qualified applicants from one demographic group at a higher rate. Which responsible AI principle is violated?",
    options: [
      { id: "A", text: "Transparency" },
      { id: "B", text: "Fairness" },
      { id: "C", text: "Accountability" },
      { id: "D", text: "Privacy and security" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Fairness requires AI systems to treat all people equitably — biased outcomes against a group is the canonical fairness violation. Transparency = explainability of decisions; accountability = human responsibility for the system.",
    optionExplanations: {
      A: "Transparency is about explaining how the system works — the issue here is biased outcomes.",
      B: "Unequal treatment across groups = fairness violation. Correct.",
      C: "Accountability is about who owns the system's impact — a different dimension.",
      D: "Privacy/security concern data protection, not discriminatory outcomes.",
    },
    services: ["Responsible AI"],
    references: [
      {
        title: "Fairness in AI — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-wld-004",
    slug: "ai900-transparency-vs-accountability",
    cert: "ai-900",
    domain: "ai900-ai-workloads",
    topic: "ai900-ai-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A bank publishes documentation explaining how its credit-scoring model works so regulators and customers can understand decisions. Which principle does this embody — and which one covers designating a team responsible for the model's behavior?",
    options: [
      { id: "A", text: "Inclusiveness, then reliability" },
      { id: "B", text: "Transparency, then accountability" },
      { id: "C", text: "Accountability, then transparency" },
      { id: "D", text: "Fairness, then privacy" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Transparency = making the system's workings understandable (documentation, explainability). Accountability = people remaining answerable for the system — governance, oversight, designated responsibility. Order matters here.",
    optionExplanations: {
      A: "Neither matches — inclusiveness is broad participation; reliability is consistent operation.",
      B: "Explainability = transparency; owning outcomes = accountability. Correct.",
      C: "Reversed order.",
      D: "Fairness is unbiased outcomes; privacy is data protection.",
    },
    services: ["Responsible AI"],
    references: [
      {
        title: "Responsible AI — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-wld-005",
    slug: "ai900-anomaly-detection-scenario",
    cert: "ai-900",
    domain: "ai900-ai-workloads",
    topic: "ai900-ai-workloads",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A payment processor wants to flag transactions that deviate from each customer's normal spending pattern in real time. Which AI workload fits?",
    options: [
      { id: "A", text: "Content personalization" },
      { id: "B", text: "Anomaly detection" },
      { id: "C", text: "Knowledge mining" },
      { id: "D", text: "Conversational AI" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Anomaly detection identifies data points that deviate from learned normal patterns — fraud detection is its signature scenario. Personalization recommends content; knowledge mining extracts insights from unstructured corpora.",
    optionExplanations: {
      A: "Personalization is recommendations — not outlier flagging.",
      B: "Fraud-style outlier detection. Correct.",
      C: "Knowledge mining surfaces insights from documents — different purpose.",
      D: "Conversational AI is chat/voice interaction.",
    },
    services: ["Azure AI Anomaly Detector"],
    references: [
      {
        title: "Anomaly detection — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-wld-006",
    slug: "ai900-inclusiveness-principle",
    cert: "ai-900",
    domain: "ai900-ai-workloads",
    topic: "ai900-ai-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A speech interface is redesigned so users with speech impairments and non-native accents are recognized equally well. Which responsible AI principle does this apply?",
    options: [
      { id: "A", text: "Inclusiveness" },
      { id: "B", text: "Reliability and safety" },
      { id: "C", text: "Transparency" },
      { id: "D", text: "Fairness" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Inclusiveness = AI should empower everyone regardless of ability — designing for accessibility and diverse user populations. Fairness is about unbiased outcomes; inclusiveness is about broad participation and benefit.",
    optionExplanations: {
      A: "Designing for diverse abilities = inclusiveness. Correct.",
      B: "Reliability is consistent, safe operation — not accessibility design.",
      C: "Transparency is explainability.",
      D: "Fairness is close but concerns biased treatment — inclusive DESIGN is the better match.",
    },
    services: ["Responsible AI"],
    references: [
      {
        title: "Inclusive AI — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-wld-007",
    slug: "ai900-knowledge-mining",
    cert: "ai-900",
    domain: "ai900-ai-workloads",
    topic: "ai900-ai-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A law firm wants to make millions of scanned contracts searchable — extracting entities, key phrases, and making everything queryable. Which AI workload is this?",
    options: [
      { id: "A", text: "Anomaly detection" },
      { id: "B", text: "Knowledge mining" },
      { id: "C", text: "Computer vision" },
      { id: "D", text: "Document intelligence alone" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Knowledge mining = ingesting unstructured content (documents, images) and extracting searchable insights — Azure AI Search is the flagship service. Document intelligence is one INPUT capability (extracting from forms), but the end-to-end searchable-corpus scenario is knowledge mining.",
    optionExplanations: {
      A: "No outliers involved.",
      B: "Unstructured corpus → searchable index = knowledge mining. Correct.",
      C: "Vision handles image content, not full-text search scenarios.",
      D: "Document intelligence extracts fields from forms — a component, not the whole workload.",
    },
    services: ["Azure AI Search"],
    references: [
      {
        title: "Knowledge mining — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-wld-008",
    slug: "ai900-reliability-safety",
    cert: "ai-900",
    domain: "ai900-ai-workloads",
    topic: "ai900-ai-workloads",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An autonomous-drone vision system must behave predictably even in unusual lighting or weather conditions it wasn't trained on. Which responsible AI principle does this requirement map to?",
    options: [
      { id: "A", text: "Reliability and safety" },
      { id: "B", text: "Inclusiveness" },
      { id: "C", text: "Transparency" },
      { id: "D", text: "Accountability" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Reliability & safety = the system operates dependably under diverse conditions, handles edge cases gracefully, and fails safely when uncertain. Out-of-distribution robustness is the signature concern.",
    optionExplanations: {
      A: "Robust operation under varied conditions = reliability & safety. Correct.",
      B: "Inclusiveness is about serving diverse USERS — not environmental conditions.",
      C: "Transparency is explainability.",
      D: "Accountability is human ownership.",
    },
    services: ["Responsible AI"],
    references: [
      {
        title: "Responsible AI — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  // ---- ML Principles (ai900-ml-fundamentals) ----
  {
    id: "aiz-ml-001",
    slug: "ai900-regression-classification-clustering",
    cert: "ai-900",
    domain: "ai900-ml-principles",
    topic: "ai900-ml-fundamentals",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Match the task to the ML type: predicting a house's sale price from features; grouping customers by purchase behavior without predefined categories. (Select the correct pair)",
    options: [
      { id: "A", text: "Classification, then clustering" },
      { id: "B", text: "Regression, then clustering" },
      { id: "C", text: "Clustering, then regression" },
      { id: "D", text: "Regression, then classification" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Regression predicts continuous numeric values (price). Classification predicts categories (spam/not-spam). Clustering groups unlabeled data by similarity — no predefined categories. The three-model-type split is THE core AI-900 ML question.",
    optionExplanations: {
      A: "Price is continuous, not a category — first one is regression.",
      B: "Continuous → regression; unlabeled grouping → clustering. Correct.",
      C: "Fully reversed.",
      D: "Behavior grouping without labels is clustering, not classification.",
    },
    services: ["Azure Machine Learning"],
    references: [
      {
        title: "ML model types — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-machine-learning/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-ml-002",
    slug: "ai900-features-vs-labels",
    cert: "ai-900",
    domain: "ai900-ml-principles",
    topic: "ai900-ml-fundamentals",
    difficulty: "easy",
    format: "single-choice",
    question:
      "In a dataset used to predict delivery time, which columns would be the label and which would be features?",
    options: [
      { id: "A", text: "Label = delivery time; features = distance, weather, traffic, package weight" },
      { id: "B", text: "Label = distance; features = delivery time" },
      { id: "C", text: "Labels and features are interchangeable" },
      { id: "D", text: "Features = the predicted output; label = the inputs" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Features (x) are the input variables the model learns from; the label (y) is the value being predicted. 'Past deliveries with known outcomes' provides labeled training data; the model learns f(features) → label.",
    optionExplanations: {
      A: "Correct — inputs are features, the target is the label.",
      B: "Distance is an input — can't be the label for predicting delivery time.",
      C: "They have distinct roles — swapping them inverts the problem.",
      D: "Reversed definition.",
    },
    services: ["Azure Machine Learning"],
    references: [
      {
        title: "Features and labels — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-machine-learning/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-ml-003",
    slug: "ai900-supervised-unsupervised",
    cert: "ai-900",
    domain: "ai900-ml-principles",
    topic: "ai900-ml-fundamentals",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which statement correctly distinguishes supervised from unsupervised learning?",
    options: [
      { id: "A", text: "Supervised = data without labels; unsupervised = labeled data" },
      { id: "B", text: "Supervised = trained on labeled data (regression/classification); unsupervised = finds structure in unlabeled data (clustering)" },
      { id: "C", text: "Supervised requires GPUs; unsupervised runs on CPUs" },
      { id: "D", text: "They differ only in dataset size" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Supervised = historical examples with known answers (labels) → predict labels for new data (regression, classification). Unsupervised = unlabeled data → discover structure (clustering, dimensionality reduction). Reinforcement learning (reward-based) is the third family.",
    optionExplanations: {
      A: "Exactly backwards.",
      B: "Correct definition.",
      C: "Hardware has nothing to do with the supervised/unsupervised distinction.",
      D: "The difference is labeling, not volume.",
    },
    services: ["Azure Machine Learning"],
    references: [
      {
        title: "Types of ML — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-machine-learning/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-ml-004",
    slug: "ai900-train-validation-test-split",
    cert: "ai-900",
    domain: "ai900-ml-principles",
    topic: "ai900-ml-fundamentals",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Why is a held-out test set kept separate during model development?",
    options: [
      { id: "A", text: "To make training faster" },
      { id: "B", text: "To evaluate the model on data it has never seen — an honest estimate of real-world performance" },
      { id: "C", text: "To increase the training data volume" },
      { id: "D", text: "To tune hyperparameters directly" },
    ],
    correctAnswers: ["B"],
    explanation:
      "The split: train (learn patterns) → validation (tune/compare models) → test (final unbiased evaluation on unseen data). Testing on training data would only measure memorization — overfitting would go undetected.",
    optionExplanations: {
      A: "Splitting doesn't speed training — it reserves data.",
      B: "Unseen-data evaluation = the point of the test set. Correct.",
      C: "The test set is REMOVED from training, not added.",
      D: "Hyperparameter tuning uses the VALIDATION set, not test.",
    },
    services: ["Azure Machine Learning"],
    references: [
      {
        title: "Training and evaluation — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-machine-learning/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-ml-005",
    slug: "ai900-overfitting",
    cert: "ai-900",
    domain: "ai900-ml-principles",
    topic: "ai900-ml-fundamentals",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A model achieves 99.9% accuracy on its training data but performs poorly on new production data. What is this called?",
    options: [
      { id: "A", text: "Underfitting" },
      { id: "B", text: "Overfitting" },
      { id: "C", text: "Convergence" },
      { id: "D", text: "Data leakage by design" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Overfitting = the model memorized the training data (including its noise) instead of learning generalizable patterns — great train scores, poor real-world performance. Fixes: more data, regularization, simpler models, better splits.",
    optionExplanations: {
      A: "Underfitting = too simple to capture patterns — poor everywhere including training.",
      B: "Memorization over generalization = overfitting. Correct.",
      C: "Convergence is training stabilizing — not a failure mode.",
      D: "Leakage is a specific cause (target info in features), not the general name for this pattern.",
    },
    services: ["Azure Machine Learning"],
    references: [
      {
        title: "Model evaluation — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-machine-learning/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-ml-006",
    slug: "ai900-confusion-matrix-metrics",
    cert: "ai-900",
    domain: "ai900-ml-principles",
    topic: "ai900-ml-fundamentals",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A fraud classifier flags 90 of 100 real frauds (90 true positives) but also flags 40 legitimate transactions (40 false positives). What are its recall and precision?",
    options: [
      { id: "A", text: "Recall 69%, precision 90%" },
      { id: "B", text: "Recall 90%, precision ~69%" },
      { id: "C", text: "Both are 90%" },
      { id: "D", text: "Recall ~69%, precision 90%" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Recall = TP/(TP+FN) = 90/100 = 90% (of actual frauds, how many caught). Precision = TP/(TP+FP) = 90/130 ≈ 69% (of flagged items, how many were real). Exam tip: recall answers 'of the real positives'; precision answers 'of my positive predictions'.",
    optionExplanations: {
      A: "The metrics are swapped — recall comes out to 90% here.",
      B: "Recall 90%, precision 69%. Correct.",
      C: "Precision is diluted by the 40 false positives.",
      D: "Recall is the 90% figure — precision drops to ~69%.",
    },
    services: ["Azure Machine Learning"],
    references: [
      {
        title: "Classification metrics — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-machine-learning/",
      },
    ],
    estimatedMinutes: 3,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-ml-007",
    slug: "ai900-automl",
    cert: "ai-900",
    domain: "ai900-ml-principles",
    topic: "ai900-ml-fundamentals",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A team with limited ML expertise wants Azure to automatically try multiple algorithms and preprocessing combinations and return the best model. Which Azure ML feature does this?",
    options: [
      { id: "A", text: "Azure Machine Learning designer pipelines" },
      { id: "B", text: "Automated machine learning (AutoML)" },
      { id: "C", text: "Azure AI Studio prompt flow" },
      { id: "D", text: "MLflow experiment tracking" },
    ],
    correctAnswers: ["B"],
    explanation:
      "AutoML iterates over algorithms + hyperparameters + featurization automatically and surfaces the best-performing pipeline — designed for users who know their data but not algorithm selection. Designer is a visual drag-drop pipeline builder; prompt flow is for LLM apps.",
    optionExplanations: {
      A: "Designer is visual pipeline building — not automatic algorithm search.",
      B: "AutoML = automated algorithm/hyperparameter search. Correct.",
      C: "Prompt flow orchestrates LLM workflows — unrelated to tabular ML.",
      D: "MLflow tracks experiments — doesn't train models.",
    },
    services: ["Azure Machine Learning"],
    references: [
      {
        title: "What is AutoML — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/machine-learning/concept-automated-ml",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-ml-008",
    slug: "ai900-azureml-designer",
    cert: "ai-900",
    domain: "ai900-ml-principles",
    topic: "ai900-ml-fundamentals",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which Azure Machine Learning capability lets users build training pipelines by dragging components (data, transforms, algorithms, evaluation) onto a canvas without writing code?",
    options: [
      { id: "A", text: "Notebooks" },
      { id: "B", text: "Azure ML designer" },
      { id: "C", text: "AutoML" },
      { id: "D", text: "The Azure CLI ml extension" },
    ],
    correctAnswers: ["B"],
    explanation:
      "The designer is Azure ML's visual pipeline canvas — drag datasets, transformations, algorithms, and evaluation modules, then submit the pipeline to compute. AutoML automates algorithm choice; designer is manual-but-visual pipeline assembly.",
    optionExplanations: {
      A: "Notebooks = code-first environment.",
      B: "Visual no-code pipeline builder. Correct.",
      C: "AutoML is automated search — not manual visual composition.",
      D: "CLI is scripting — the opposite of no-code.",
    },
    services: ["Azure Machine Learning"],
    references: [
      {
        title: "Azure ML designer — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/azure/machine-learning/concept-designer",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  // ---- Computer Vision (ai900-computer-vision) ----
  {
    id: "aiz-cv-001",
    slug: "ai900-image-classification-vs-object-detection",
    cert: "ai-900",
    domain: "ai900-computer-vision",
    topic: "ai900-computer-vision",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Which correctly distinguishes image classification from object detection?",
    options: [
      { id: "A", text: "Classification labels the whole image; object detection locates and labels individual objects with bounding boxes" },
      { id: "B", text: "They're identical — different names for the same task" },
      { id: "C", text: "Object detection labels the whole image; classification finds objects" },
      { id: "D", text: "Classification works on video only" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Classification answers 'what is this image of' — one label per image. Object detection answers 'what objects are where' — bounding boxes + labels per instance. Semantic segmentation goes further (per-pixel labels); OCR extracts text.",
    optionExplanations: {
      A: "Correct — whole-image label vs localized objects.",
      B: "Distinct tasks with distinct outputs.",
      C: "Reversed — detection localizes objects, classification labels the image.",
      D: "Classification works on still images too.",
    },
    services: ["Azure AI Vision"],
    references: [
      {
        title: "Computer vision concepts — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-computer-vision/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-cv-002",
    slug: "ai900-azure-ai-vision-service",
    cert: "ai-900",
    domain: "ai900-computer-vision",
    topic: "ai900-computer-vision",
    difficulty: "easy",
    format: "single-choice",
    question:
      "An app needs to describe image content (tags, captions, detected objects) and extract printed/handwritten text without training custom models. Which service?",
    options: [
      { id: "A", text: "Azure AI Vision" },
      { id: "B", text: "Azure AI Custom Vision" },
      { id: "C", text: "Azure AI Face" },
      { id: "D", text: "Azure AI Document Intelligence" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Azure AI Vision provides prebuilt image analysis: captions, tags, object detection, OCR (Read API). Custom Vision = train your own classifier/detector. Face = facial features/liveness. Document Intelligence = structured extraction from forms/invoices.",
    optionExplanations: {
      A: "Prebuilt image analysis + OCR. Correct.",
      B: "Custom Vision requires training on your images — the scenario wants prebuilt.",
      C: "Face is for facial analysis, not general image description.",
      D: "Document Intelligence extracts fields/tables from documents — narrower.",
    },
    services: ["Azure AI Vision"],
    references: [
      {
        title: "Azure AI Vision — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-computer-vision/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-cv-003",
    slug: "ai900-custom-vision-scenario",
    cert: "ai-900",
    domain: "ai900-computer-vision",
    topic: "ai900-computer-vision",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A manufacturer needs to detect its own specific product defects on the assembly line — categories that don't exist in any prebuilt model. Which service should they train?",
    options: [
      { id: "A", text: "Azure AI Vision (prebuilt)" },
      { id: "B", text: "Azure AI Custom Vision" },
      { id: "C", text: "Azure AI Face" },
      { id: "D", text: "Azure AI Document Intelligence" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Custom Vision lets you train image classifiers and object detectors on YOUR labeled images via a low-code portal — designed for domain-specific categories. Prebuilt Vision handles generic content; the custom defect categories require custom training.",
    optionExplanations: {
      A: "Prebuilt models won't know your product-specific defect classes.",
      B: "Custom Vision = train on your labeled images. Correct.",
      C: "Face service analyzes human faces only.",
      D: "Document Intelligence is for forms/documents, not defect detection.",
    },
    services: ["Azure AI Custom Vision"],
    references: [
      {
        title: "Custom Vision — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-computer-vision/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-cv-004",
    slug: "ai900-ocr-vs-document-intelligence",
    cert: "ai-900",
    domain: "ai900-computer-vision",
    topic: "ai900-computer-vision",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company must extract structured data — invoice number, line items, totals — from thousands of vendor invoices. Which service extracts structured fields from documents?",
    options: [
      { id: "A", text: "Azure AI Vision OCR alone" },
      { id: "B", text: "Azure AI Document Intelligence" },
      { id: "C", text: "Azure AI Custom Vision" },
      { id: "D", text: "Azure AI Search" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Document Intelligence (formerly Form Recognizer) extracts STRUCTURED data — key-value pairs, tables, line items — from documents using prebuilt models (invoices, receipts, IDs) or custom-trained ones. OCR gets raw text; DI understands document structure and semantics.",
    optionExplanations: {
      A: "OCR gives text, not field-level structure — invoice fields need Document Intelligence.",
      B: "Prebuilt invoice models extract named fields/tables. Correct.",
      C: "Custom Vision classifies/detects objects in images — not form fields.",
      D: "AI Search indexes content for querying — not field extraction.",
    },
    services: ["Azure AI Document Intelligence"],
    references: [
      {
        title: "Document Intelligence — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-ai-vision/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-cv-005",
    slug: "ai900-face-service",
    cert: "ai-900",
    domain: "ai900-computer-vision",
    topic: "ai900-computer-vision",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An office wants touchless entry: a camera verifies an employee's face against enrolled profiles before unlocking doors. Which service provides facial detection and verification?",
    options: [
      { id: "A", text: "Azure AI Vision image analysis" },
      { id: "B", text: "Azure AI Face" },
      { id: "C", text: "Azure AI Custom Vision" },
      { id: "D", text: "Azure AI Video Indexer" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Azure AI Face provides face detection, verification (is this the same person?), identification (who is this?), and liveness detection. Video Indexer analyzes video content broadly; Custom Vision could theoretically be trained but Face is the purpose-built service.",
    optionExplanations: {
      A: "General image analysis doesn't do face verification.",
      B: "Face service = purpose-built facial verification. Correct.",
      C: "Custom Vision lacks anti-spoofing/liveness and person-verification features.",
      D: "Video Indexer extracts insights from video — not identity verification.",
    },
    services: ["Azure AI Face"],
    references: [
      {
        title: "Azure AI Face — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-computer-vision/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-cv-006",
    slug: "ai900-video-indexer",
    cert: "ai-900",
    domain: "ai900-computer-vision",
    topic: "ai900-computer-vision",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A media company needs to index its video library — extracting faces, spoken words, on-screen text, scenes, and topics to make everything searchable. Which service?",
    options: [
      { id: "A", text: "Azure AI Vision" },
      { id: "B", text: "Azure AI Video Indexer" },
      { id: "C", text: "Azure AI Speech" },
      { id: "D", text: "Azure AI Search" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Video Indexer combines multiple AI models to extract rich insights from video/audio: faces, celebrities, speech transcription, OCR, objects, scenes, sentiments — producing a searchable metadata index per video.",
    optionExplanations: {
      A: "Vision works on images, not temporal video content.",
      B: "Video Indexer = the video-insights service. Correct.",
      C: "Speech handles only audio — not the full video insight set.",
      D: "AI Search indexes data — doesn't extract the insights from video.",
    },
    services: ["Azure AI Video Indexer"],
    references: [
      {
        title: "Video Indexer — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-computer-vision/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-cv-007",
    slug: "ai900-semantic-segmentation",
    cert: "ai-900",
    domain: "ai900-computer-vision",
    topic: "ai900-computer-vision",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A self-driving system must label every pixel in a road scene (road, pedestrian, vehicle, sign) for precise scene understanding. Which computer vision technique is this?",
    options: [
      { id: "A", text: "Image classification" },
      { id: "B", text: "Object detection" },
      { id: "C", text: "Semantic segmentation" },
      { id: "D", text: "OCR" },
    ],
    correctAnswers: ["C"],
    explanation:
      "Semantic segmentation assigns a class label to every pixel — the finest-grained vision task. Classification = one label per image; object detection = bounding boxes; segmentation = pixel-level masks.",
    optionExplanations: {
      A: "Whole-image label — far too coarse.",
      B: "Bounding boxes locate objects but don't label every pixel.",
      C: "Per-pixel labeling = semantic segmentation. Correct.",
      D: "OCR extracts text only.",
    },
    services: ["Azure AI Vision"],
    references: [
      {
        title: "Vision techniques — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-computer-vision/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-cv-008",
    slug: "ai900-ocr-read-api",
    cert: "ai-900",
    domain: "ai900-computer-vision",
    topic: "ai900-computer-vision",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A mobile app scans whiteboards and extracts the handwritten text into editable documents. Which capability is used?",
    options: [
      { id: "A", text: "Image captioning" },
      { id: "B", text: "Optical character recognition (OCR / Read API)" },
      { id: "C", text: "Facial recognition" },
      { id: "D", text: "Semantic segmentation" },
    ],
    correctAnswers: ["B"],
    explanation:
      "OCR converts images of text (printed or handwritten) into machine-readable text — Azure AI Vision's Read API is optimized for documents/handwriting vs the basic OCR for small embedded text.",
    optionExplanations: {
      A: "Captioning describes scenes in words — doesn't extract written text.",
      B: "Text extraction from images = OCR. Correct.",
      C: "Facial recognition is identity — unrelated.",
      D: "Segmentation labels pixels — not text extraction.",
    },
    services: ["Azure AI Vision"],
    references: [
      {
        title: "OCR with Read API — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-computer-vision/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  // ---- NLP & Speech (ai900-nlp-speech) ----
  {
    id: "aiz-nlp-001",
    slug: "ai900-language-service-features",
    cert: "ai-900",
    domain: "ai900-nlp",
    topic: "ai900-nlp-speech",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A support team wants to automatically detect sentiment and extract key phrases from customer reviews. Which Azure AI service provides this?",
    options: [
      { id: "A", text: "Azure AI Language" },
      { id: "B", text: "Azure AI Speech" },
      { id: "C", text: "Azure AI Translator" },
      { id: "D", text: "Azure AI Vision" },
    ],
    correctAnswers: ["A"],
    explanation:
      "Azure AI Language covers text analytics: sentiment/opinion mining, key-phrase extraction, named entity recognition (NER), language detection, PII detection, summarization. Speech handles audio; Translator translates.",
    optionExplanations: {
      A: "Sentiment + key phrases = Language service. Correct.",
      B: "Speech is audio transcription/synthesis.",
      C: "Translator converts between languages.",
      D: "Vision is images — not text analytics.",
    },
    services: ["Azure AI Language"],
    references: [
      {
        title: "Azure AI Language — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-text-analysis-with-the-language-service/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-nlp-002",
    slug: "ai900-ner-entities",
    cert: "ai-900",
    domain: "ai900-nlp",
    topic: "ai900-nlp-speech",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Extracting people, organizations, locations, and dates from contracts is which NLP capability?",
    options: [
      { id: "A", text: "Sentiment analysis" },
      { id: "B", text: "Named entity recognition (NER)" },
      { id: "C", text: "Key phrase extraction" },
      { id: "D", text: "Language detection" },
    ],
    correctAnswers: ["B"],
    explanation:
      "NER identifies and categorizes entities in text — people, orgs, places, dates, quantities. Key phrases = main topics; sentiment = opinion polarity; entity LINKING additionally resolves entities to known references.",
    optionExplanations: {
      A: "Sentiment measures positive/negative opinion — not entity types.",
      B: "Entity extraction = NER. Correct.",
      C: "Key phrases capture topics, not typed entities.",
      D: "Language detection identifies which language the text is in.",
    },
    services: ["Azure AI Language"],
    references: [
      {
        title: "Entity recognition — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-text-analysis-with-the-language-service/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-nlp-003",
    slug: "ai900-speech-capabilities",
    cert: "ai-900",
    domain: "ai900-nlp",
    topic: "ai900-nlp-speech",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which Azure AI Speech capability converts spoken audio into text (e.g., meeting transcription)?",
    options: [
      { id: "A", text: "Text-to-speech (speech synthesis)" },
      { id: "B", text: "Speech-to-text (speech recognition)" },
      { id: "C", text: "Speaker recognition" },
      { id: "D", text: "Speech translation" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Speech-to-text = audio → transcript (recognition). Text-to-speech = text → synthesized audio. Speaker recognition identifies WHO is speaking. Speech translation does both transcription and translation in one flow.",
    optionExplanations: {
      A: "The reverse direction — audio out, not text out.",
      B: "Audio → text = speech-to-text. Correct.",
      C: "Speaker recognition identifies voices, doesn't transcribe.",
      D: "Translation changes language — transcription alone is speech-to-text.",
    },
    services: ["Azure AI Speech"],
    references: [
      {
        title: "Azure AI Speech — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-azure-ai-speech/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-nlp-004",
    slug: "ai900-translator-vs-language",
    cert: "ai-900",
    domain: "ai900-nlp",
    topic: "ai900-nlp-speech",
    difficulty: "easy",
    format: "single-choice",
    question:
      "A global help desk must auto-translate tickets between 60 languages, preserving meaning. Which service?",
    options: [
      { id: "A", text: "Azure AI Language" },
      { id: "B", text: "Azure AI Translator" },
      { id: "C", text: "Azure AI Speech" },
      { id: "D", text: "Azure OpenAI Service" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Azure AI Translator is the dedicated machine-translation service for text (and documents). Language service analyzes text; Translator converts between languages. LLMs can translate but Translator is the purpose-built answer on AI-900.",
    optionExplanations: {
      A: "Language analyzes text (sentiment, entities) — doesn't translate at scale.",
      B: "Translator = the machine translation service. Correct.",
      C: "Speech handles audio, not text translation.",
      D: "GenAI can translate but isn't the named service for bulk machine translation.",
    },
    services: ["Azure AI Translator"],
    references: [
      {
        title: "Azure AI Translator — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-text-analysis-with-the-language-service/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-nlp-005",
    slug: "ai900-conversational-language-understanding",
    cert: "ai-900",
    domain: "ai900-nlp",
    topic: "ai900-nlp-speech",
    difficulty: "hard",
    format: "single-choice",
    question:
      "A chatbot must understand that 'Book a table for Friday' means intent=Reserve with entity date=Friday. Which Azure AI Language feature extracts intents and entities from utterances?",
    options: [
      { id: "A", text: "Text analytics sentiment" },
      { id: "B", text: "Conversational language understanding (CLU)" },
      { id: "C", text: "Question answering" },
      { id: "D", text: "Text summarization" },
    ],
    correctAnswers: ["B"],
    explanation:
      "CLU (the successor to LUIS) trains on utterances to predict intents and extract entities — the engine for task-driven bots. Question answering matches questions to answers in knowledge bases; summarization condenses text.",
    optionExplanations: {
      A: "Sentiment measures opinion polarity — not intent extraction.",
      B: "Utterance → intent + entities = CLU. Correct.",
      C: "Q&A retrieves answers, not action intents.",
      D: "Summarization condenses text — unrelated to intents.",
    },
    services: ["Azure AI Language"],
    references: [
      {
        title: "Conversational language understanding — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-text-analysis-with-the-language-service/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-nlp-006",
    slug: "ai900-question-answering-bot",
    cert: "ai-900",
    domain: "ai900-nlp",
    topic: "ai900-nlp-speech",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company wants an FAQ bot that answers employee questions by matching them to its existing FAQ documents and URLs. Which feature fits?",
    options: [
      { id: "A", text: "Conversational language understanding" },
      { id: "B", text: "Question answering in Azure AI Language" },
      { id: "C", text: "Azure AI Search alone" },
      { id: "D", text: "Speech-to-text" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Question answering creates a knowledge base from FAQs/documents/URLs and matches user questions to answers — the direct FAQ-bot feature (successor to QnA Maker). CLU is for task intents, not information retrieval.",
    optionExplanations: {
      A: "CLU extracts intents for task execution — not FAQ matching.",
      B: "KB-based question→answer matching. Correct.",
      C: "AI Search could index FAQs but the purpose-built Q&A feature is the exam answer.",
      D: "Speech is audio input — orthogonal.",
    },
    services: ["Azure AI Language"],
    references: [
      {
        title: "Question answering — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-text-analysis-with-the-language-service/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-nlp-007",
    slug: "ai900-speech-synthesis-neural-voices",
    cert: "ai-900",
    domain: "ai900-nlp",
    topic: "ai900-nlp-speech",
    difficulty: "medium",
    format: "single-choice",
    question:
      "An accessibility app reads articles aloud in natural-sounding voices. Which capability — and which Speech feature makes the voices sound human?",
    options: [
      { id: "A", text: "Speech-to-text with custom models" },
      { id: "B", text: "Text-to-speech with neural voices" },
      { id: "C", text: "Speaker verification" },
      { id: "D", text: "Real-time speech translation" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Text-to-speech synthesizes audio from text; neural voices (deep-learning-based) produce humanlike prosody vs older concatenative voices. Voice assistants, audiobooks, and accessibility all use this.",
    optionExplanations: {
      A: "Reverse direction — that's audio in, text out.",
      B: "TTS + neural voices. Correct.",
      C: "Speaker verification identifies a speaker — doesn't generate speech.",
      D: "Translation changes language — unrelated.",
    },
    services: ["Azure AI Speech"],
    references: [
      {
        title: "Text-to-speech — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-azure-ai-speech/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-nlp-008",
    slug: "ai900-pii-detection",
    cert: "ai-900",
    domain: "ai900-nlp",
    topic: "ai900-nlp-speech",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A health company must automatically identify and redact phone numbers and patient names from transcripts before sharing them externally. Which Azure AI Language capability does this?",
    options: [
      { id: "A", text: "Key phrase extraction" },
      { id: "B", text: "Personally identifiable information (PII) detection" },
      { id: "C", text: "Entity linking" },
      { id: "D", text: "Custom text classification" },
    ],
    correctAnswers: ["B"],
    explanation:
      "PII detection identifies sensitive entities (names, phone numbers, SSNs, addresses) in text or transcripts and can redact them — the compliance-critical NLP feature. Entity linking maps entities to known references but isn't focused on sensitivity/redaction.",
    optionExplanations: {
      A: "Key phrases are topics — not sensitive-data discovery.",
      B: "PII detection + redaction = the exact feature. Correct.",
      C: "Linking resolves entities to references — not redaction.",
      D: "Custom classification assigns document labels — not field redaction.",
    },
    services: ["Azure AI Language"],
    references: [
      {
        title: "PII detection — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-text-analysis-with-the-language-service/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  // ---- Generative AI (ai900-generative-ai) ----
  {
    id: "aiz-gen-001",
    slug: "ai900-azure-openai-service",
    cert: "ai-900",
    domain: "ai900-generative-ai",
    topic: "ai900-generative-ai",
    difficulty: "easy",
    format: "single-choice",
    question:
      "Which Azure service provides access to OpenAI models (GPT-4, DALL-E, Whisper, embeddings) inside your Azure subscription with enterprise security and private networking?",
    options: [
      { id: "A", text: "Azure Machine Learning" },
      { id: "B", text: "Azure OpenAI Service" },
      { id: "C", text: "Azure AI Language" },
      { id: "D", text: "Microsoft Copilot" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Azure OpenAI Service hosts OpenAI's models as an Azure resource — same models, plus Azure's enterprise features: RBAC, private endpoints, customer data not used for training, regional deployment. Copilot is Microsoft's end-user assistant product.",
    optionExplanations: {
      A: "Azure ML trains/serves YOUR models — not hosted OpenAI models.",
      B: "OpenAI models + Azure enterprise controls. Correct.",
      C: "Language is prebuilt text analytics — not generative.",
      D: "Copilot is the product, not the underlying service.",
    },
    services: ["Azure OpenAI Service"],
    references: [
      {
        title: "Azure OpenAI — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-gen-002",
    slug: "ai900-llm-definition",
    cert: "ai-900",
    domain: "ai900-generative-ai",
    topic: "ai900-generative-ai",
    difficulty: "easy",
    format: "single-choice",
    question:
      "What is a large language model (LLM)?",
    options: [
      { id: "A", text: "A model that stores every web page it was trained on" },
      { id: "B", text: "A deep learning model trained on massive text corpora that generates human-like language by predicting the next tokens" },
      { id: "C", text: "A rule-based chatbot engine" },
      { id: "D", text: "A database of question-answer pairs" },
    ],
    correctAnswers: ["B"],
    explanation:
      "LLMs (GPT, LLaMA, etc.) are transformer neural networks trained on vast text — they don't retrieve stored text but generate completions by predicting probable next tokens. This generative mechanism explains both their fluency AND hallucinations.",
    optionExplanations: {
      A: "LLMs learn patterns, not verbatim storage — that's why they can produce false 'facts'.",
      B: "Trained text-prediction models. Correct.",
      C: "Rule-based bots predate LLMs — rigid scripts, not learned language.",
      D: "Q&A databases are retrieval — LLMs generate novel text.",
    },
    services: ["Azure OpenAI Service"],
    references: [
      {
        title: "Generative AI fundamentals — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-gen-003",
    slug: "ai900-prompt-engineering",
    cert: "ai-900",
    domain: "ai900-generative-ai",
    topic: "ai900-generative-ai",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Adding examples of the desired input→output format directly into the prompt to shape model responses is called what?",
    options: [
      { id: "A", text: "Zero-shot prompting" },
      { id: "B", text: "Few-shot prompting" },
      { id: "C", text: "Fine-tuning" },
      { id: "D", text: "Grounding" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Few-shot = providing a few examples in the prompt so the model infers the pattern. Zero-shot = instructions only. Fine-tuning = actually retraining on data (heavier). Grounding = connecting the model to external knowledge (RAG).",
    optionExplanations: {
      A: "Zero-shot = no examples, just instructions.",
      B: "Examples-in-prompt = few-shot. Correct.",
      C: "Fine-tuning modifies the model itself — much heavier than prompting.",
      D: "Grounding injects external data — related but the examples-format technique is few-shot.",
    },
    services: ["Azure OpenAI Service"],
    references: [
      {
        title: "Prompt engineering — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-gen-004",
    slug: "ai900-rag-grounding",
    cert: "ai-900",
    domain: "ai900-generative-ai",
    topic: "ai900-generative-ai",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A company wants the LLM to answer questions using ONLY its internal policy documents — preventing invented answers. Which technique grounds the model on company data?",
    options: [
      { id: "A", text: "Fine-tuning on the documents" },
      { id: "B", text: "Retrieval-augmented generation (RAG) — retrieve relevant document chunks and include them in the prompt" },
      { id: "C", text: "Increase the temperature setting" },
      { id: "D", text: "Use a larger foundation model" },
    ],
    correctAnswers: ["B"],
    explanation:
      "RAG retrieves relevant content from a knowledge source (e.g., Azure AI Search over the policy docs) and injects it into the prompt so the model answers from real data — the standard 'chat on your data' pattern. Fine-tuning teaches style/behavior, not factual grounding.",
    optionExplanations: {
      A: "Fine-tuning adapts behavior/style — it won't reliably inject current facts.",
      B: "Retrieve-then-generate = grounded answers. Correct.",
      C: "Higher temperature increases randomness — opposite of factual grounding.",
      D: "Model size doesn't grant access to your private documents.",
    },
    services: ["Azure OpenAI Service", "Azure AI Search"],
    references: [
      {
        title: "RAG on Azure — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/use-own-data-azure-openai/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-gen-005",
    slug: "ai900-temperature-parameter",
    cert: "ai-900",
    domain: "ai900-generative-ai",
    topic: "ai900-generative-ai",
    difficulty: "medium",
    format: "single-choice",
    question:
      "What does the temperature parameter control in generative AI responses?",
    options: [
      { id: "A", text: "The maximum response length" },
      { id: "B", text: "Response randomness — lower is more deterministic, higher is more varied/creative" },
      { id: "C", text: "The model's knowledge cutoff" },
      { id: "D", text: "API cost per request" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Temperature scales output randomness: ~0 = focused/deterministic (good for factual tasks), higher = more diverse/creative. Max tokens controls length; top-p is a related sampling control.",
    optionExplanations: {
      A: "That's max tokens.",
      B: "Randomness/creativity dial. Correct.",
      C: "Knowledge cutoff is baked into training — not a parameter.",
      D: "Cost follows token usage — temperature doesn't price requests.",
    },
    services: ["Azure OpenAI Service"],
    references: [
      {
        title: "Model parameters — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-azure-openai-service/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-gen-006",
    slug: "ai900-hallucination",
    cert: "ai-900",
    domain: "ai900-generative-ai",
    topic: "ai900-generative-ai",
    difficulty: "easy",
    format: "single-choice",
    question:
      "An LLM confidently generates a plausible-sounding but factually incorrect citation. What is this phenomenon called?",
    options: [
      { id: "A", text: "Grounding" },
      { id: "B", text: "Hallucination" },
      { id: "C", text: "Overfitting" },
      { id: "D", text: "Prompt injection" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Hallucination = fluent but false output — an inherent LLM risk because models predict plausible text, not verified truth. Mitigations: grounding (RAG), prompt constraints, human review. Prompt injection is adversarial input manipulation — different threat.",
    optionExplanations: {
      A: "Grounding is the FIX, not the failure.",
      B: "Fluent-but-false = hallucination. Correct.",
      C: "Overfitting is an ML training issue, not generation-time falsehood.",
      D: "Injection is an attack — not spontaneous false output.",
    },
    services: ["Azure OpenAI Service"],
    references: [
      {
        title: "Responsible generative AI — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-responsible-generative-ai/",
      },
    ],
    estimatedMinutes: 1,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-gen-007",
    slug: "ai900-copilot-vs-studio",
    cert: "ai-900",
    domain: "ai900-generative-ai",
    topic: "ai900-generative-ai",
    difficulty: "medium",
    format: "single-choice",
    question:
      "A development team wants to build, test, and deploy custom generative AI apps on Azure — choosing models, designing prompt flows, evaluating outputs. Which tool is Microsoft's platform for this?",
    options: [
      { id: "A", text: "Microsoft 365 Copilot" },
      { id: "B", text: "Azure AI Studio (AI Foundry portal)" },
      { id: "C", text: "Azure Machine Learning designer" },
      { id: "D", text: "Azure DevOps pipelines" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Azure AI Studio (now part of Microsoft Foundry) is the unified GenAI development platform: model catalog, prompt flow, playgrounds, evaluation, deployment. Microsoft 365 Copilot is the end-user assistant; Azure ML designer is for classic ML pipelines.",
    optionExplanations: {
      A: "Copilot is the finished product — not the builder platform.",
      B: "AI Studio/Foundry = the GenAI dev platform. Correct.",
      C: "Designer builds classic ML pipelines, not GenAI apps.",
      D: "DevOps is CI/CD — not GenAI-specific.",
    },
    services: ["Azure AI Studio"],
    references: [
      {
        title: "Azure AI Studio — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-azure-ai-studio/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
  {
    id: "aiz-gen-008",
    slug: "ai900-content-safety",
    cert: "ai-900",
    domain: "ai900-generative-ai",
    topic: "ai900-generative-ai",
    difficulty: "medium",
    format: "single-choice",
    question:
      "Before showing AI-generated responses to users, an app must filter harmful categories — hate, violence, self-harm, sexual content — in both prompts and completions. Which Azure service provides this?",
    options: [
      { id: "A", text: "Microsoft Defender for Cloud" },
      { id: "B", text: "Azure AI Content Safety" },
      { id: "C", text: "Azure AI Language sentiment analysis" },
      { id: "D", text: "Azure Policy" },
    ],
    correctAnswers: ["B"],
    explanation:
      "Azure AI Content Safety detects harmful content across text and images with severity scoring and customizable filters — the responsible-AI guardrail service for GenAI apps. Sentiment analysis measures opinion polarity, not harm categories.",
    optionExplanations: {
      A: "Defender is cloud security posture — not content moderation.",
      B: "Content Safety = the harm-filtering service. Correct.",
      C: "Sentiment ≠ safety — a toxic prompt can have 'neutral' sentiment.",
      D: "Azure Policy governs resource configurations — unrelated.",
    },
    services: ["Azure AI Content Safety"],
    references: [
      {
        title: "Content Safety — Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/modules/fundamentals-responsible-generative-ai/",
      },
    ],
    estimatedMinutes: 2,
    reviewStatus: "published",
    lastReviewed: "2026-02-14",
  },
];
