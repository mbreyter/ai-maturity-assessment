"use client";

import Link from "next/link";
import { useState } from "react";

const stageInfo = [
  {
    stage: 1,
    name: "The Petting Zoo",
    description: "Informal AI use by employees; no central governance or strategy",
    color: "#c0392b",
  },
  {
    stage: 2,
    name: "The Bazaar",
    description: "Multiple teams procuring tools independently; fragmented landscape",
    color: "#c0600a",
  },
  {
    stage: 3,
    name: "The Pilot Graveyard",
    description: "Many pilots launched but few scale; workflows unchanged",
    color: "#6c3483",
  },
  {
    stage: 4,
    name: "The Inversion",
    description: "Organization rethinks roles and workflows around AI; CFO engaged",
    color: "#1a5276",
  },
  {
    stage: 5,
    name: "The Refinery",
    description: "Agentic AI workflows in production; quantified business outcomes",
    color: "#1e6f35",
  },
  {
    stage: 6,
    name: "The Operating Model",
    description: "AI embedded in core products and organizational operating model",
    color: "#283593",
  },
];

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#F7F4EE", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Hero Section */}
        <section style={{ marginBottom: "4rem", textAlign: "center" }}>
          <h1 style={{ fontFamily: "Georgia, serif", marginBottom: "1rem" }}>
            Where Does Your Organization Actually Land?
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#666",
              marginBottom: "2rem",
              fontStyle: "italic",
            }}
          >
            Most executives believe they're at Stage 4 or 5. McKinsey data puts most at Stage 2
            or 3.
          </p>
          <Link href="/assessment">
            <button
              style={{
                backgroundColor: "#1a5276",
                color: "white",
                padding: "1rem 2.5rem",
                fontSize: "1.1rem",
                borderRadius: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Take the Assessment
            </button>
          </Link>
        </section>

        {/* Stage Ladder */}
        <section>
          <h2 style={{ textAlign: "center", marginBottom: "2rem", fontFamily: "Georgia, serif" }}>
            The 6 Stages of AI Maturity
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {stageInfo.map((stage, index) => (
              <div
                key={stage.stage}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  animation: `slideIn 0.5s ease forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: stage.color,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {stage.stage}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 0.25rem 0", fontFamily: "Georgia, serif" }}>
                    {stage.name}
                  </h3>
                  <p style={{ margin: 0, color: "#666", fontSize: "0.95rem" }}>
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: "3rem", textAlign: "center" }}>
          <Link href="/assessment">
            <button
              style={{
                backgroundColor: "#c0600a",
                color: "white",
                padding: "0.875rem 2rem",
                fontSize: "1rem",
                borderRadius: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Ready? Start Now
            </button>
          </Link>
        </section>

        {/* Framework Attribution */}
        <section style={{ marginTop: "4rem", textAlign: "center", paddingTop: "2rem", borderTop: "1px solid #ddd" }}>
          <p style={{ color: "#666", fontSize: "0.95rem" }}>
            Framework developed by{" "}
            <a
              href="https://www.linkedin.com/in/mariyabreyter/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a5276", textDecoration: "none", fontWeight: "500" }}
            >
              Mariya Breyter, Ph.D.
            </a>{" "}
            —{" "}
            <a
              href="https://www.linkedin.com/pulse/welcome-inversion-six-stages-enterprise-ai-maturity-breyter-ph-d--yql3e"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a5276", textDecoration: "none", fontWeight: "500" }}
            >
              read the full article on LinkedIn
            </a>
          </p>
        </section>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
