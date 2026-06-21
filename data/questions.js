export const questions = [
  // Stage 1: The Petting Zoo
  {
    id: 1,
    stage: 1,
    stageName: "The Petting Zoo",
    questionText: "How would you describe your organization's current AI license situation?",
    options: [
      { text: "No AI tools purchased", score: 0 },
      { text: "A few licenses bought informally, no strategy", score: 1 },
      { text: "Licenses actively governed with defined use policies", score: 2 },
    ],
  },
  {
    id: 2,
    stage: 1,
    stageName: "The Petting Zoo",
    questionText: "When employees use AI tools at work, what happens?",
    options: [
      { text: "It's discouraged or blocked", score: 0 },
      { text: "It's tolerated but untracked", score: 1 },
      { text: "It's encouraged with guidelines and oversight", score: 2 },
    ],
  },
  {
    id: 3,
    stage: 1,
    stageName: "The Petting Zoo",
    questionText: "Does your organization have a named executive accountable for AI strategy?",
    options: [
      { text: "No", score: 0 },
      { text: "Someone informally owns it alongside other responsibilities", score: 1 },
      { text: "Yes, with budget, mandate, and board visibility", score: 2 },
    ],
  },
  {
    id: 4,
    stage: 1,
    stageName: "The Petting Zoo",
    questionText: "How would you describe AI education in your organization today?",
    options: [
      { text: "None", score: 0 },
      { text: "Ad hoc lunch-and-learns or one-off workshops", score: 1 },
      { text: "Structured curriculum tied to role-specific use cases", score: 2 },
    ],
  },
  {
    id: 5,
    stage: 1,
    stageName: "The Petting Zoo",
    questionText: "Has your board or C-suite formally discussed AI strategy in the last 90 days?",
    options: [
      { text: "No", score: 0 },
      { text: "Yes, as a one-time agenda item", score: 1 },
      { text: "Yes, as a recurring strategic priority with owners and timelines", score: 2 },
    ],
  },

  // Stage 2: The Bazaar
  {
    id: 6,
    stage: 2,
    stageName: "The Bazaar",
    questionText: "If you asked your CIO today for a complete inventory of AI tools in use across the enterprise, what would happen?",
    options: [
      { text: "They could produce it within a day", score: 0 },
      { text: "It would take weeks and still be incomplete", score: 1 },
      { text: "There is no inventory; different teams are buying independently", score: 2 },
    ],
  },
  {
    id: 7,
    stage: 2,
    stageName: "The Bazaar",
    questionText: "How many business functions have independently procured or piloted an AI tool in the last 12 months?",
    options: [
      { text: "None or one", score: 0 },
      { text: "Two or three", score: 1 },
      { text: "Four or more, with no central coordination", score: 2 },
    ],
  },
  {
    id: 8,
    stage: 2,
    stageName: "The Bazaar",
    questionText: "Do your AI tools share data, identity, or workflow integration with each other?",
    options: [
      { text: "Yes, they're integrated on a common platform", score: 0 },
      { text: "Some do, most don't", score: 1 },
      { text: "No — they operate as isolated point solutions", score: 2 },
    ],
  },
  {
    id: 9,
    stage: 2,
    stageName: "The Bazaar",
    questionText: "When your board sees an AI strategy update, what does it typically look like?",
    options: [
      { text: "Measured outcomes tied to specific business results", score: 0 },
      { text: "A mix of use cases and some metrics", score: 1 },
      { text: "A slide with tool logos and adoption numbers", score: 2 },
    ],
  },
  {
    id: 10,
    stage: 2,
    stageName: "The Bazaar",
    questionText: "Who is accountable when an AI tool causes a compliance, data, or reputational incident today?",
    options: [
      { text: "A clear owner with defined escalation paths", score: 0 },
      { text: "It would depend on which tool and who bought it", score: 1 },
      { text: "Nobody has formally defined this", score: 2 },
    ],
  },

  // Stage 3: The Pilot Graveyard
  {
    id: 11,
    stage: 3,
    stageName: "The Pilot Graveyard",
    questionText: "How many AI pilots from the last 18 months have moved into full production with measured business outcomes?",
    options: [
      { text: "Most or all", score: 0 },
      { text: "Some (roughly half)", score: 1 },
      { text: "Few or none — most stalled after the demo phase", score: 2 },
    ],
  },
  {
    id: 12,
    stage: 3,
    stageName: "The Pilot Graveyard",
    questionText: "When an AI pilot ends without scaling, what is the most common reason?",
    options: [
      { text: "Technical failure or model underperformance", score: 0 },
      { text: "Budget reprioritization", score: 1 },
      { text: "The workflow, incentives, or operating model around it never changed", score: 2 },
    ],
  },
  {
    id: 13,
    stage: 3,
    stageName: "The Pilot Graveyard",
    questionText: "Before launching an AI pilot, does your organization redesign the workflow it will operate in?",
    options: [
      { text: "Always — workflow redesign precedes tool deployment", score: 0 },
      { text: "Sometimes, depends on the team", score: 1 },
      { text: "Rarely — the tool is fitted into existing processes", score: 2 },
    ],
  },
  {
    id: 14,
    stage: 3,
    stageName: "The Pilot Graveyard",
    questionText: "How are exception handling and human escalation paths defined for your AI deployments?",
    options: [
      { text: "Formally documented before go-live", score: 0 },
      { text: "Handled ad hoc as issues arise", score: 1 },
      { text: "Not defined — the tool is expected to handle everything", score: 2 },
    ],
  },
  {
    id: 15,
    stage: 3,
    stageName: "The Pilot Graveyard",
    questionText: "When you celebrate an AI success internally, what are you measuring?",
    options: [
      { text: "Business outcomes: revenue, cost, risk, or cycle time", score: 0 },
      { text: "A mix of usage and some outcomes", score: 1 },
      { text: "Adoption: logins, active users, prompts submitted", score: 2 },
    ],
  },

  // Stage 4: The Inversion
  {
    id: 16,
    stage: 4,
    stageName: "The Inversion",
    questionText: "Has your organization formally asked \"What should our people stop doing because AI can do it better?\" at the executive level?",
    options: [
      { text: "Yes, with specific decisions and role redesigns resulting", score: 0 },
      { text: "It's been discussed but not acted on", score: 1 },
      { text: "No — the conversation is still about what AI can add, not what it should replace", score: 2 },
    ],
  },
  {
    id: 17,
    stage: 4,
    stageName: "The Inversion",
    questionText: "Is your CFO actively involved in AI strategy decisions — not just budget approvals?",
    options: [
      { text: "Yes, co-owns the AI ROI framework with the CTO/CPTO", score: 0 },
      { text: "Involved in some discussions", score: 1 },
      { text: "No — AI is still treated as a technology cost center", score: 2 },
    ],
  },
  {
    id: 18,
    stage: 4,
    stageName: "The Inversion",
    questionText: "Has your AI governance model shifted from \"tool approval\" to \"workflow redesign\"?",
    options: [
      { text: "Yes — governance now operates at the process and outcome level", score: 0 },
      { text: "Partially — some workflows reviewed, most not", score: 1 },
      { text: "No — governance is still primarily a vendor/security review process", score: 2 },
    ],
  },
  {
    id: 19,
    stage: 4,
    stageName: "The Inversion",
    questionText: "Have any org chart changes, role eliminations, or role redesigns been directly attributed to AI deployment in the last 12 months?",
    options: [
      { text: "Yes, with documented rationale and transition plans", score: 0 },
      { text: "Informally, but not officially attributed to AI", score: 1 },
      { text: "No — headcount decisions remain separate from AI strategy", score: 2 },
    ],
  },
  {
    id: 20,
    stage: 4,
    stageName: "The Inversion",
    questionText: "How would you describe the emotional climate around AI in your organization?",
    options: [
      { text: "Engaged and informed — people understand what's changing and why", score: 0 },
      { text: "Mixed — enthusiasm in some teams, anxiety in others", score: 1 },
      { text: "Resistant or passive — most employees see AI as something being done to them", score: 2 },
    ],
  },

  // Stage 5: The Refinery
  {
    id: 21,
    stage: 5,
    stageName: "The Refinery",
    questionText: "Do you have agentic AI workflows — where AI takes multi-step actions autonomously — running in production today?",
    options: [
      { text: "Yes, multiple, with governance and monitoring in place", score: 0 },
      { text: "One or two in pilot", score: 1 },
      { text: "No agentic workflows in production", score: 2 },
    ],
  },
  {
    id: 22,
    stage: 5,
    stageName: "The Refinery",
    questionText: "How does your board measure AI success today?",
    options: [
      { text: "Business outcomes: EBIT impact, cost removed, risk reduced, cycle time", score: 0 },
      { text: "A mix of outcome and activity metrics", score: 1 },
      { text: "Activity: number of users, tools deployed, pilots launched", score: 2 },
    ],
  },
  {
    id: 23,
    stage: 5,
    stageName: "The Refinery",
    questionText: "Are human escalation paths and \"pull the plug\" protocols defined for your AI agents?",
    options: [
      { text: "Yes — formally documented, tested, and audited", score: 0 },
      { text: "Informally understood but not documented", score: 1 },
      { text: "No — not yet defined", score: 2 },
    ],
  },
  {
    id: 24,
    stage: 5,
    stageName: "The Refinery",
    questionText: "How mature is your data infrastructure for AI — quality, lineage, access controls, real-time availability?",
    options: [
      { text: "Production-grade: governed, auditable, and AI-ready", score: 0 },
      { text: "Partially ready — gaps in quality or access", score: 1 },
      { text: "Not ready — data is a consistent blocker for AI deployment", score: 2 },
    ],
  },
  {
    id: 25,
    stage: 5,
    stageName: "The Refinery",
    questionText: "Can you point to AI initiatives that have measurably reduced headcount, eliminated process steps, or compressed cycle times — with documented evidence?",
    options: [
      { text: "Yes, multiple examples with quantified business impact", score: 0 },
      { text: "One or two early examples", score: 1 },
      { text: "No — outcomes haven't been measured at that level yet", score: 2 },
    ],
  },

  // Stage 6: The Operating Model
  {
    id: 26,
    stage: 6,
    stageName: "The Operating Model",
    questionText: "Is AI embedded in how your core products or services are built and delivered — not as a feature, but as infrastructure?",
    options: [
      { text: "Yes — AI is load-bearing in the product and delivery stack", score: 0 },
      { text: "Some products, not others", score: 1 },
      { text: "No — AI is a feature layer added on top of existing products", score: 2 },
    ],
  },
  {
    id: 27,
    stage: 6,
    stageName: "The Operating Model",
    questionText: "Has your operating cadence — how decisions are made, reviewed, and escalated — changed because of AI?",
    options: [
      { text: "Yes — meeting structures, decision rights, and review cycles have been redesigned", score: 0 },
      { text: "Some changes, mostly at the team level", score: 1 },
      { text: "No — the management operating system is unchanged", score: 2 },
    ],
  },
  {
    id: 28,
    stage: 6,
    stageName: "The Operating Model",
    questionText: "Do you have a dedicated AI measurement system — separate from your general BI stack — that tracks AI's contribution to business outcomes in real time?",
    options: [
      { text: "Yes, with executive dashboards and board reporting", score: 0 },
      { text: "In development", score: 1 },
      { text: "No — AI impact is estimated, not measured", score: 2 },
    ],
  },
  {
    id: 29,
    stage: 6,
    stageName: "The Operating Model",
    questionText: "How do new employees learn to work with AI in your organization?",
    options: [
      { text: "It's embedded in onboarding as a core work competency, not a separate training", score: 0 },
      { text: "There's optional AI training available", score: 1 },
      { text: "They figure it out on their own", score: 2 },
    ],
  },
  {
    id: 30,
    stage: 6,
    stageName: "The Operating Model",
    questionText: "If your primary AI vendor went offline for a week, what would happen to your business?",
    options: [
      { text: "Significant disruption — AI is load-bearing", score: 0 },
      { text: "Noticeable slowdown in some functions", score: 1 },
      { text: "Minor inconvenience — AI is still peripheral to core operations", score: 2 },
    ],
  },
];
