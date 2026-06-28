"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStageName, getStageDescription } from "@/lib/scoring";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

const stageColors = {
  1: "#c0392b",
  2: "#c0600a",
  3: "#6c3483",
  4: "#1a5276",
  5: "#1e6f35",
  6: "#283593",
};

// Helper function to render inline bold markdown
const renderInline = (text) =>
  text.split(/\*\*(.*?)\*\*/g).map((part, idx) =>
    idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
  );

// Helper function to format markdown-like text as HTML
const formatReportText = (text) => {
  if (!text) return null;

  const lines = text.split("\n");
  const elements = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Skip empty lines and dividers
    if (!trimmed || trimmed === "---") {
      return;
    }

    // Headers like "### YOUR HONEST DIAGNOSIS:"
    if (trimmed.startsWith("###")) {
      const headerText = trimmed.replace(/^#+\s*/, "").replace(/:$/, "");
      elements.push(
        <div key={`header-${index}`} style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", margin: "0 0 0.5rem 0", fontWeight: "bold", color: "#1a5276" }}>
            {headerText}
          </h3>
          <div style={{ height: "1px", backgroundColor: "#ddd", marginBottom: "1rem" }} />
        </div>
      );
    } else if (trimmed.startsWith("##")) {
      const headerText = trimmed.replace(/^#+\s*/, "").replace(/:$/, "");
      elements.push(
        <div key={`header2-${index}`} style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", margin: "0 0 0.5rem 0", fontWeight: "bold", color: "#1a5276" }}>
            {headerText}
          </h2>
        </div>
      );
    } else if (trimmed.startsWith("1.") || trimmed.startsWith("2.") || trimmed.startsWith("3.")) {
      // List items
      const itemText = trimmed.replace(/^\d+\.\s*/, "");
      elements.push(
        <div key={`item-${index}`} style={{ marginBottom: "0.75rem", paddingLeft: "1.5rem", fontSize: "0.98rem", lineHeight: "1.6" }}>
          <span style={{ marginRight: "0.5rem" }}>•</span>
          {renderInline(itemText)}
        </div>
      );
    } else if (trimmed) {
      // Regular paragraph text
      elements.push(
        <p key={`para-${index}`} style={{ marginBottom: "1rem", fontSize: "0.98rem", lineHeight: "1.6", color: "#333", margin: "0 0 1rem 0" }}>
          {renderInline(trimmed)}
        </p>
      );
    }
  });

  return elements;
};

const uncomfortableTruth =
  "The gap between perceived AI maturity and actual maturity is one of the most expensive blind spots in enterprise strategy right now. Most organizations overestimate their stage by one or two levels. If your AI strategy can be summarized as licenses, pilots, and training — you're probably in Stage 2. If workflows, governance, incentives, decision rights, and accountability haven't changed — you're not transforming. You're experimenting.";

const stageLadder = [
  { stage: 6, name: "The Operating Model", description: "AI is load-bearing infrastructure. The company runs on it." },
  { stage: 5, name: "The Refinery", description: "Agentic workflows under governance. Outcomes, not dashboards." },
  { stage: 4, name: "The Inversion", description: "The question flips. Workflows redesign around AI." },
  { stage: 3, name: "The Pilot Graveyard", description: "Pilots impress. Pilots die. Nothing changes around them." },
  { stage: 2, name: "The Bazaar", description: "Fragmented tools. No integration. Nobody owns the system." },
  { stage: 1, name: "The Petting Zoo", description: "Licenses and lunch-and-learns. Supervised play." },
];

const nextStageAdvice = {
  1: "The move from Stage 1 to Stage 2 is deceptively simple to describe and genuinely hard to execute: you must consolidate what already exists before adding anything new. First, appoint a named executive — not a committee, one person — accountable for AI strategy with a board mandate, a defined budget, and authority to say no to new tool purchases. Second, commission a complete AI tool inventory across every function within 30 days. Include every vendor contract, every data access agreement, every pilot in flight. Third, publish a company-wide AI use policy that defines what employees can and cannot do with AI tools on company data before the next license renewal. The goal is not to slow down adoption — it is to ensure the next phase of adoption is coordinated rather than chaotic.",
  2: "The move from Stage 2 to Stage 3 requires stopping before accelerating. Before launching another pilot, your organization must do three things. First, consolidate your AI tool portfolio to a maximum of two or three integrated platforms. Every standalone point solution that cannot integrate with your core data and identity infrastructure is a liability, not an asset — retire it. Second, define your data governance standard for AI: what data can models access, under what conditions, with what audit trail. This must exist before your next pilot goes live, not after. Third, create a mandatory pilot template that requires workflow redesign as a precondition for launch — not an afterthought. No pilot is approved unless it includes: a redesigned workflow, defined exception paths, a named human escalation owner, and a success metric tied to a business outcome. Adoption metrics do not qualify.",
  3: "The move from Stage 3 to Stage 4 is a leadership decision, not a technology decision. It requires your executive team to ask a question most are avoiding: 'What should our people stop doing because AI can do it better?' Schedule a board-level AI strategy session within 60 days with one agenda item: operating model redesign. Bring the CFO — not as a budget approver but as a co-architect of the ROI framework. Before that session, conduct a workflow audit of your five highest-volume business processes and identify which steps AI can own, which steps require human judgment, and which steps exist only because the previous technology could not handle them. The output of that session should be a named executive owner for each workflow redesign, a timeline, and a success metric tied to EBIT — not a roadmap slide.",
  4: "The move from Stage 4 to Stage 5 is about replacing intent with infrastructure. Three things must happen in parallel. First, every AI initiative must have its success metric converted from an activity measure to an outcome measure within 90 days — if you cannot articulate the EBIT impact of an initiative, it does not get funded in the next cycle. Second, every agent running in or near production must have a formally documented human escalation path and a defined 'pull the plug' protocol — tested, not assumed. Third, your data infrastructure must be audited against production-grade AI requirements: data quality, lineage, access controls, and real-time availability. The gaps in that audit become your infrastructure roadmap. Organizations that skip this step find their agents producing confident, wrong answers at scale — which is more damaging than no agents at all.",
  5: "The move from Stage 5 to Stage 6 is the hardest transition because it requires making AI genuinely load-bearing — which means accepting the operational risk that comes with dependency. Three commitments define this transition. First, redesign your management operating cadence around AI-generated insights: which decisions get made by humans reviewing AI outputs, on what cycle, with what override authority. This changes how your leadership team meets, what they review, and how they escalate. Second, rebuild your new employee onboarding to treat AI fluency as a core job competency — not a tool tutorial, but a fundamental capability expectation equivalent to financial literacy or communication skills. Third, apply the vendor dependency test quarterly: if your primary AI vendor went offline for a week, what would break? The answer to that question is your map to Stage 6.",
  6: "You are operating at the frontier of enterprise AI maturity — among the top 6% of organizations globally according to McKinsey's 2025 State of AI research. Your focus now shifts from transformation to governance at scale: maintaining rigorous human oversight as agent orchestration complexity grows, building institutional knowledge that does not depend on any single vendor or model, and beginning to export your operating model to the broader industry. The organizations at Stage 6 today will define what enterprise AI governance looks like for the next decade. That is both an opportunity and a responsibility.",
};

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("assessmentResults");
    if (!data) {
      router.push("/assessment");
      return;
    }
    setResults(JSON.parse(data));
  }, [router]);

  if (!results) {
    return (
      <div
        style={{
          backgroundColor: "#F7F4EE",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#666" }}>Loading...</p>
      </div>
    );
  }

  const { scores, report } = results;
  const stageName = getStageName(scores.maturityStage);
  const stageDesc = getStageDescription(scores.maturityStage);
  const color = stageColors[scores.maturityStage];

  const radarData = Object.entries(scores.dimensionScores || {}).map(([dim, score]) => ({
    dimension: dim,
    score,
  }));

  const frameworkStages = [
    { num: 1, name: "The Petting Zoo",      desc: "Supervised play with copilots",              color: "#c0392b", pct: 28 },
    { num: 2, name: "The Bazaar",            desc: "87 vendors, 0 architecture",                 color: "#c0600a", pct: 44 },
    { num: 3, name: "The Pilot Graveyard",   desc: "Built for a demo, not the operating model",  color: "#6c3483", pct: 59 },
    { num: 4, name: "The Inversion",         desc: "Productivity → operating model",             color: "#1a5276", pct: 73 },
    { num: 5, name: "The Refinery",          desc: "Outcome reshaping under governance",         color: "#1e6f35", pct: 87 },
    { num: 6, name: "The Operating Model",   desc: "AI as the substrate of the business",        color: "#283593", pct: 100 },
  ];

  const shareText = `I just took the Enterprise AI Maturity Assessment — a free tool based on the Six Stages of Enterprise AI Maturity framework.

Try it out at https://ai-maturity-assessment-ruby.vercel.app

#EnterpriseAI #AIStrategy #AITransformation #BoardLeadership @mariyabreyter`;

  const handleCopyToShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`, "_blank");
  };

  return (
    <div style={{ backgroundColor: "#F7F4EE", minHeight: "100vh", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* SECTION 1: THE VERDICT */}
        <section style={{ marginBottom: "4rem" }}>
          <div
            style={{
              backgroundColor: color,
              color: "white",
              padding: "4rem 2rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.8rem",
                margin: "0 0 2rem 0",
                fontWeight: "bold",
              }}
            >
              Stage {scores.maturityStage} — {stageName}
            </p>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                margin: "0 0 2rem 0",
              }}
            >
              Your Score: {scores.totalScore} / 60
            </p>
            <p style={{ margin: 0, fontSize: "0.95rem", opacity: 0.9 }}>
              Only 6% of enterprises globally reach Stage 5 or 6.{" "}
              <a
                href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white", textDecoration: "underline" }}
              >
                (McKinsey, 2025)
              </a>
            </p>
          </div>
        </section>

        {/* SECTION 1B: RADAR CHART */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{
            backgroundColor: "white",
            padding: "2.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}>
            <h2 style={{
              fontFamily: "Georgia, serif", fontSize: "1.8rem",
              marginBottom: "0.5rem", color: "#1a1a2e", fontWeight: "bold",
            }}>
              Your AI Maturity Profile
            </h2>
            <p style={{ color: "#666", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              Maturity score across six dimensions (out of 10 each)
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData} margin={{ top: 20, right: 50, bottom: 20, left: 50 }}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fontSize: 12, fill: "#444", fontFamily: "Georgia, serif" }}
                />
                <PolarRadiusAxis
                  angle={90} domain={[0, 10]} tickCount={6}
                  tick={{ fontSize: 11, fill: "#999" }}
                />
                <Radar
                  dataKey="score"
                  stroke={stageColors[scores.maturityStage]}
                  fill={stageColors[scores.maturityStage]}
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip
                  formatter={(value) => [`${value} / 10`, "Score"]}
                  contentStyle={{ fontFamily: "Georgia, serif", fontSize: "0.9rem" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* SECTION 2: FRAMEWORK REFERENCE */}
        <section style={{ marginBottom: "4rem" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.8rem",
                marginBottom: "2rem",
                color: "#1a1a2e",
                fontWeight: "bold",
              }}
            >
              The Six Stages Framework
            </h2>
            {/* Custom bar chart */}
            <p style={{ fontStyle: "italic", color: "#444", fontSize: "1rem", marginBottom: "2rem" }}>
              Most boards believe they're in Stage 5. Most are in Stage 2 or 3.
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "300px", marginBottom: "1rem" }}>
              {frameworkStages.map((s) => (
                <div key={s.num} style={{
                  flex: 1, height: `${s.pct}%`, backgroundColor: s.color,
                  borderRadius: "4px 4px 0 0", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "space-between",
                  padding: "0.4rem 0.2rem 0.35rem", color: "white", overflow: "hidden",
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.58rem", fontWeight: "bold", lineHeight: "1.25", fontFamily: "Georgia, serif" }}>
                      {s.num}. {s.name}
                    </div>
                    <div style={{ fontSize: "0.52rem", opacity: 0.9, lineHeight: "1.25", marginTop: "2px" }}>
                      {s.desc}
                    </div>
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", fontFamily: "Georgia, serif" }}>
                    {s.num}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#888", marginBottom: "0.5rem" }}>
              <span>2022</span>
              <span style={{ fontStyle: "italic" }}>From productivity story → operating model rewrite</span>
              <span>2027+</span>
            </div>
            <p style={{ textAlign: "right", fontSize: "0.75rem", color: "#aaa", margin: "0 0 2rem 0" }}>
              Mariya Breyter, Ph.D. | Enterprise AI Maturity Model
            </p>
            <a
              href="https://www.linkedin.com/posts/mariyabreyter_enterpriseai-aistrategy-boardleadership-share-7474510895449219072-n55X"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#0077B5",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "0",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              Read the Full Framework on LinkedIn
            </a>
          </div>
        </section>

        {/* SECTION 2B: MATURITY LADDER */}
        <section style={{ marginBottom: "4rem" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.8rem",
                marginBottom: "2rem",
                color: "#1a1a2e",
                fontWeight: "bold",
              }}
            >
              Your Position in the Framework
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {stageLadder.map((stage) => {
                const isCurrentStage = stage.stage === scores.maturityStage;
                const isPast = stage.stage < scores.maturityStage;
                
                return (
                  <div
                    key={stage.stage}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1.25rem",
                      backgroundColor: isCurrentStage ? stageColors[stage.stage] + "20" : isPast ? "#f0f0f0" : "#fafafa",
                      borderLeft: isCurrentStage ? `5px solid ${stageColors[stage.stage]}` : isPast ? "5px solid #1e6f35" : "5px solid #ddd",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: stageColors[stage.stage],
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        flexShrink: 0,
                      }}
                    >
                      {stage.stage}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: "0 0 0.25rem 0", fontFamily: "Georgia, serif", fontWeight: isCurrentStage ? "bold" : "normal", fontSize: "1.05rem" }}>
                        {stage.name}
                      </h3>
                      <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>
                        {stage.description}
                      </p>
                    </div>
                    <div style={{ textAlign: "right", fontSize: "1.3rem", flexShrink: 0 }}>
                      {isCurrentStage && <span style={{ color: stageColors[stage.stage], fontWeight: "bold" }}>← You are here</span>}
                      {isPast && <span style={{ color: "#1e6f35" }}>✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT THIS MEANS */}
        <section style={{ marginBottom: "4rem" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderLeft: `6px solid ${color}`,
            }}
          >
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.8rem",
                marginBottom: "1.5rem",
                color: "#1a1a2e",
                fontWeight: "bold",
              }}
            >
              What This Means
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "#333",
                margin: 0,
              }}
            >
              {stageDesc}
            </p>
          </div>
        </section>

        {/* SECTION 3B: HOW TO REACH THE NEXT STAGE */}
        <section style={{ marginBottom: "4rem" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderLeft: `6px solid ${scores.maturityStage < 6 ? stageColors[scores.maturityStage + 1] : stageColors[6]}`,
            }}
          >
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.8rem",
                marginBottom: "1.5rem",
                color: "#1a1a2e",
                fontWeight: "bold",
              }}
            >
              How to Reach the Next Stage
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "#333",
                margin: 0,
              }}
            >
              {nextStageAdvice[scores.maturityStage]}
            </p>
          </div>
        </section>

        {/* SECTION 4: THE UNCOMFORTABLE TRUTH */}
        <section style={{ marginBottom: "4rem" }}>
          <div
            style={{
              backgroundColor: "#EDE9E0",
              padding: "3rem",
              borderRadius: "0.5rem",
              border: "2px dashed #c0600a",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.3rem",
                margin: "0 0 1rem 0",
                color: "#1a1a2e",
                fontWeight: "bold",
              }}
            >
              The Uncomfortable Truth
            </h3>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "#333",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {uncomfortableTruth}
            </p>
          </div>
        </section>

        {/* SECTION 5: CLAUDE-GENERATED REPORT */}
        <section style={{ marginBottom: "4rem" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.8rem",
                marginBottom: "2rem",
                color: "#1a1a2e",
                fontWeight: "bold",
              }}
            >
              Your Personalized Diagnosis
            </h2>

            {report ? (
              <div
                style={{
                  lineHeight: "1.8",
                  color: "#333",
                  fontSize: "1rem",
                }}
              >
                {formatReportText(report)}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "3px solid #ddd",
                      borderTop: "3px solid #1a5276",
                      borderRadius: "50%",
                      margin: "0 auto 1rem",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <p style={{ color: "#666", margin: 0 }}>
                    Generating your personalized diagnosis...
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 6: SHARE */}
        <section style={{ marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: "0.75rem" }}>
            Share your results
          </p>
          <div style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "0.5rem",
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}>
            <div style={{ flex: 1, minWidth: "200px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
              <div style={{ fontSize: "0.78rem", lineHeight: "1.5", color: "#555" }}>
                <p style={{ margin: "0 0 0.4rem 0" }}>
                  I just took the{" "}
                  <a href="/" style={{ color: "#1a5276" }}>Enterprise AI Maturity Assessment</a>
                  {" "}— a free tool based on the Six Stages of Enterprise AI Maturity framework.
                </p>
                <p style={{ margin: "0 0 0.4rem 0" }}>
                  Try it out at <span style={{ color: "#1a5276" }}>https://ai-maturity-assessment-ruby.vercel.app</span>
                </p>
                <p style={{ margin: 0, color: "#aaa" }}>
                  #EnterpriseAI #AIStrategy #AITransformation #BoardLeadership @mariyabreyter
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flexShrink: 0 }}>
              <button
                onClick={handleCopyToShare}
                style={{
                  backgroundColor: copied ? "#1e6f35" : "#1a1a2e",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.8rem",
                }}
              >
                {copied ? "✓ Copied" : "Copy to Share"}
              </button>
              <button
                onClick={handleShareLinkedIn}
                style={{
                  backgroundColor: "#0077B5",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.8rem",
                }}
              >
                Share on LinkedIn
              </button>
            </div>
          </div>
        </section>

        {/* CTA Buttons */}
        <section style={{ marginBottom: "2rem", textAlign: "center" }}>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              backgroundColor: "#1a1a2e",
              color: "white",
              padding: "1rem 1.5rem",
              borderRadius: "0",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              marginRight: "1rem",
              fontSize: "1rem",
            }}
          >
            Back to Home
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("assessmentResults");
              window.location.href = "/assessment";
            }}
            style={{
              backgroundColor: "#666",
              color: "white",
              padding: "1rem 1.5rem",
              borderRadius: "0",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
            }}
          >
            Take Assessment Again
          </button>
        </section>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
