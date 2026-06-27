"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { calculateScores } from "@/lib/scoring";

const loadingMessages = [
  "Collecting your responses...",
  "Assessing against the Six Stages framework...",
  "Identifying your maturity patterns...",
  "Calculating your score breakdown...",
  "Generating your personalized diagnosis...",
  "Finalizing your report...",
];

export default function AssessmentPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (!isSubmitting) return;
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep(prev => prev < loadingMessages.length - 1 ? prev + 1 : prev);
    }, 14000);
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = Math.round(((currentQuestion + 1) / totalQuestions) * 100);

  const handleAnswer = (questionId, score) => {
    setAnswers({
      ...answers,
      [questionId]: score,
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (answeredQuestions !== totalQuestions) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const data = await response.json();
      sessionStorage.setItem("assessmentResults", JSON.stringify(data));
      router.push("/results");
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
      alert(`Something went wrong: ${error.message}. Please try again.`);
    }
  };

  const question = questions[currentQuestion];
  const isAnswered = answers[question.id] !== undefined;

  if (isSubmitting) {
    return (
      <div style={{
        position: "fixed", inset: 0, backgroundColor: "#F7F4EE",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
      }}>
        <div style={{ position: "relative", width: "220px", height: "220px", marginBottom: "2rem" }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "4px solid #ddd", borderTopColor: "#1a5276",
            animation: "spin 1.2s linear infinite",
          }} />
          <div style={{
            position: "absolute", inset: "12px", borderRadius: "50%",
            overflow: "hidden", backgroundColor: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img src="/ai-maturity-stages.jpg" alt="AI Maturity Stages"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <p key={loadingStep} style={{
          fontFamily: "Georgia, serif", fontSize: "1.2rem", color: "#1a1a2e",
          margin: "0 0 0.5rem 0", animation: "fadeIn 0.6s ease",
        }}>
          {loadingMessages[loadingStep]}
        </p>
        <p style={{ fontSize: "0.9rem", color: "#888", margin: 0 }}>
          This may take 1–2 minutes
        </p>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F7F4EE", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Progress Bar */}
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#ddd",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#1a5276",
                width: `${progress}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: "#666",
              marginTop: "0.5rem",
              textAlign: "right",
            }}
          >
            {progress}% complete
          </div>
        </div>

        {/* Question Card */}
        <div
          style={{
            backgroundColor: "white",
            padding: "2.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "2rem",
            minHeight: "520px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Question Header */}
          <div style={{ marginBottom: "2rem", minHeight: "100px" }}>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "0.95rem",
                fontWeight: "normal",
                color: "#1a5276",
                margin: "0 0 1rem 0",
              }}
            >
              Question {currentQuestion + 1} of {totalQuestions}
            </h2>
            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.4rem",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              {question.questionText}
            </h1>
          </div>

          {/* Answer Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {question.options.map((option, idx) => (
              <label
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1.25rem",
                  borderRadius: "0.5rem",
                  backgroundColor:
                    answers[question.id] === option.score
                      ? "#1a527620"
                      : "#f8f8f8",
                  border:
                    answers[question.id] === option.score
                      ? "2px solid #1a5276"
                      : "2px solid #ddd",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (answers[question.id] !== option.score) {
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
                    e.currentTarget.style.borderColor = "#999";
                  }
                }}
                onMouseLeave={(e) => {
                  if (answers[question.id] !== option.score) {
                    e.currentTarget.style.backgroundColor = "#f8f8f8";
                    e.currentTarget.style.borderColor = "#ddd";
                  }
                }}
              >
                <input
                  type="radio"
                  name={`q${question.id}`}
                  value={option.score}
                  checked={answers[question.id] === option.score}
                  onChange={() => handleAnswer(question.id, option.score)}
                  style={{
                    cursor: "pointer",
                    marginTop: "0.25rem",
                    width: "20px",
                    height: "20px",
                    minWidth: "20px",
                  }}
                />
                <span style={{ fontSize: "1rem", color: "#333", lineHeight: "1.4" }}>
                  {option.text}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            style={{
              backgroundColor: currentQuestion === 0 ? "#ccc" : "#999",
              color: "white",
              padding: "0.875rem 1.5rem",
              borderRadius: "0.5rem",
              cursor: currentQuestion === 0 ? "default" : "pointer",
              fontWeight: "500",
              border: "none",
              fontSize: "1rem",
            }}
          >
            ← Back
          </button>

          {currentQuestion < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              style={{
                backgroundColor: !isAnswered ? "#ccc" : "#1a5276",
                color: "white",
                padding: "0.875rem 1.5rem",
                borderRadius: "0.5rem",
                cursor: !isAnswered ? "default" : "pointer",
                fontWeight: "500",
                border: "none",
                fontSize: "1rem",
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isAnswered || isSubmitting}
              style={{
                backgroundColor:
                  !isAnswered || isSubmitting ? "#ccc" : "#1e6f35",
                color: "white",
                padding: "0.875rem 1.5rem",
                borderRadius: "0.5rem",
                cursor: !isAnswered || isSubmitting ? "default" : "pointer",
                fontWeight: "500",
                border: "none",
                fontSize: "1rem",
              }}
            >
              {isSubmitting ? "Loading..." : "Get My Results"}
            </button>
          )}
        </div>

        {/* Inline footer */}
        <div style={{ textAlign: "center", paddingBottom: "2rem" }}>
          <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.85rem", color: "#888" }}>
            © 2026{" "}
            <a href="https://www.linkedin.com/in/mariyabreyter/" target="_blank" rel="noopener noreferrer"
              style={{ color: "#888", textDecoration: "underline" }}>
              Mariya Breyter, Ph.D.
            </a>
            {" "}All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: "0.85rem" }}>
            <a href="https://www.linkedin.com/in/mariyabreyter/" target="_blank" rel="noopener noreferrer"
              style={{ color: "#1a5276", textDecoration: "none" }}>
              linkedin.com/in/mariyabreyter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
