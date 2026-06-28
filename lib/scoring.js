// Scoring logic for AI maturity assessment
export function calculateScores(answers) {
  // answers is an object: { questionId: score, ... }
  
  const stageScores = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  const stageCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  // Sum scores by stage (questions 1-5 are stage 1, 6-10 are stage 2, etc.)
  for (const [questionId, score] of Object.entries(answers)) {
    const qId = parseInt(questionId);
    let stage;
    
    if (qId <= 5) stage = 1;
    else if (qId <= 10) stage = 2;
    else if (qId <= 15) stage = 3;
    else if (qId <= 20) stage = 4;
    else if (qId <= 25) stage = 5;
    else stage = 6;

    stageScores[stage] += parseInt(score);
    stageCounts[stage]++;
  }

  // Calculate overall score and maturity stage
  const totalScore = Object.values(stageScores).reduce((a, b) => a + b, 0);
  const maturityStage = determineStage(stageScores, totalScore);
  const stageNames = {
    1: "The Petting Zoo",
    2: "The Bazaar",
    3: "The Pilot Graveyard",
    4: "The Inversion",
    5: "The Refinery",
    6: "The Operating Model",
  };

  // Dimension scores (5 questions each, max 10)
  const dimensionQuestions = {
    "Strategy":            [3, 5, 9, 16, 17],
    "Governance":          [1, 10, 14, 18, 23],
    "Operating Model":     [12, 13, 26, 27, 30],
    "Workforce":           [2, 4, 19, 20, 29],
    "Data & Technology":   [6, 7, 8, 21, 24],
    "Measurement & Value": [11, 15, 22, 25, 28],
  };
  const dimensionScores = {};
  for (const [dim, qIds] of Object.entries(dimensionQuestions)) {
    const raw = qIds.reduce((sum, id) => sum + (parseInt(answers[id]) || 0), 0);
    dimensionScores[dim] = 10 - raw; // invert: 0=least mature → 0, 10=most mature → 10
  }

  return {
    totalScore,
    maxScore: 60,
    maturityStage,
    stageName: stageNames[maturityStage],
    stageScores,
    dimensionScores,
    stagePercentages: {
      1: Math.round((stageScores[1] / 10) * 100),
      2: Math.round((stageScores[2] / 10) * 100),
      3: Math.round((stageScores[3] / 10) * 100),
      4: Math.round((stageScores[4] / 10) * 100),
      5: Math.round((stageScores[5] / 10) * 100),
      6: Math.round((stageScores[6] / 10) * 100),
    },
  };
}

function determineStage(stageScores, totalScore) {
  // Primary logic: find the stage where answers are strongest
  // But also consider progression (can't be stage 5 if stage 2 is weak)
  
  const scores = [
    stageScores[1],
    stageScores[2],
    stageScores[3],
    stageScores[4],
    stageScores[5],
    stageScores[6],
  ];

  // Find the "peak" - the highest stage where they scored well
  let primaryStage = 1;
  for (let i = 6; i >= 1; i--) {
    if (stageScores[i] >= 10) {
      // At least 5 points per question on average
      primaryStage = i;
      break;
    }
  }

  // Ensure progression - can't be stage 4 if stage 1-2 are very weak
  if (primaryStage >= 4 && stageScores[1] + stageScores[2] < 8) {
    primaryStage = 3;
  }

  // If total is very low, cap at stage 2
  if (totalScore < 15 && primaryStage > 2) {
    primaryStage = 2;
  }

  // If total is very high, ensure at least stage 5
  if (totalScore >= 50 && primaryStage < 5) {
    primaryStage = 5;
  }

  return Math.max(1, Math.min(6, primaryStage));
}

export function getStageColor(stage) {
  const colors = {
    1: "#c0392b",
    2: "#c0600a",
    3: "#6c3483",
    4: "#1a5276",
    5: "#1e6f35",
    6: "#283593",
  };
  return colors[stage] || "#999";
}

export function getStageName(stage) {
  const names = {
    1: "The Petting Zoo",
    2: "The Bazaar",
    3: "The Pilot Graveyard",
    4: "The Inversion",
    5: "The Refinery",
    6: "The Operating Model",
  };
  return names[stage] || "Unknown";
}

export function getArchetype(stage) {
  const archetypes = {
    1: "The Explorer",
    2: "The Opportunist",
    3: "The Believer",
    4: "The Transformer",
    5: "The Operator",
    6: "The Strategist",
  };
  return archetypes[stage] || "Unknown";
}

export function getStageDescription(stage) {
  const descriptions = {
    1: "Your organization is in the earliest phase of AI adoption — characterized by curiosity without commitment. AI tools are being purchased and explored, but there is no architecture, no decision rights, no governance, and no agents. Individual employees are discovering ChatGPT and similar tools on their own. IT is tolerating rather than enabling. Leadership is watching rather than directing. This stage feels productive because there is visible activity — licenses, workshops, demos — but none of it is connected to business outcomes. Every organization passes through this stage. The ones that move quickly through it share one trait: a senior leader who decides that supervised play is no longer acceptable and sets a date to move past it.",
    2: "Your organization has moved from curiosity to collection — and collection without architecture is fragmentation. Different functions are buying different AI tools independently: marketing has a content AI, engineering has coding agents, support has a chatbot, finance has a forecasting tool. None of these talk to each other. Nobody owns the system. By the time the CIO asks for an inventory, Legal has reviewed six different vendor agreements, Security is chasing data exposure questions, and the board is being shown an 'AI strategy' slide with dozens of logos. This is not innovation. It is the enterprise equivalent of buying gym equipment and storing it in the garage. The tools exist. The capability does not.",
    3: "Your organization has learned to run pilots — and has not yet learned that a successful pilot is not the goal. Proofs of concept are shipping. Demos are impressing stakeholders. Internal newsletters are celebrating AI wins. And then the pilots die. Not because the model failed. Because the team built for a demo, not for the operating model. The workflow was never redesigned. The exception paths were undefined. The compliance model was bolted on after the fact. The human handoff was never specified. Incentives never changed. Decision rights never changed. Roles never changed. Every dead pilot in your organization has the same epitaph: 'We proved the technology worked. We never changed the business around it.' The Pilot Graveyard is the most expensive stage — because the sunk cost of failed experiments makes leadership progressively more skeptical of the next initiative.",
    4: "Your organization has reached the inflection point — the moment where AI strategy stops being about what AI can do and starts being about what the business must change. The question has flipped: it is no longer 'What can AI do for our people?' It is 'What should our people no longer be doing?' This inversion is painful. Org charts start to crack. Legacy processes get exposed as indefensible. Governance moves from tool approval to workflow redesign. The CFO is now in the AI strategy conversation, not just the CTO. This is where transformation actually begins — not because the technology changed, but because the leadership team finally asked the right question. The electricity analogy applies here: electricity did not speed up factories. It forced factories to be rebuilt from the floor up. AI will do the same to enterprise operating models.",
    5: "Your organization has moved from transformation intent to operational discipline. Agentic workflows are running under governance. Human escalation paths are defined and tested. Data architecture is production-grade. Model evaluation is continuous. Measurement is tied to business outcomes — cost removed, risk reduced, cycle time compressed — not usage dashboards. Your board has stopped asking 'How many employees are using copilots?' and started asking 'How much work has been removed, redesigned, or automated with acceptable risk?' This is where co-intelligence becomes a system rather than a vibe. You are in the top tier of enterprise AI maturity globally. The risk at this stage is complacency — the discipline that got you here must now scale across every function and every geography.",
    6: "Your organization has achieved what very few enterprises have: AI is no longer a tool, a function, or a platform initiative. It is part of how the company runs. The product runs on it. The processes run on it. The customer experience runs on it. The measurement system runs on it. The management operating cadence has changed because the decision system has changed. New employees learn to work with AI in onboarding as a core competency, not optional training. If your primary AI vendor went offline for a week, it would meaningfully disrupt your business — because AI is now load-bearing infrastructure, not a feature layer. You are among the top 6% of enterprises globally by McKinsey's measure. The companies at this stage do not look like they adopted AI. They look like they were rebuilt around it — because they were.",
  };
  return descriptions[stage] || "Unknown";
}
