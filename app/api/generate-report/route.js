import { systemPrompt } from "@/lib/systemPrompt";
import { calculateScores } from "@/lib/scoring";

export async function POST(request) {
  try {
    const body = await request.json();
    const { answers } = body;

    if (!answers) {
      return Response.json({ error: "No answers provided" }, { status: 400 });
    }

    const scores = calculateScores(answers);

    const apiKey = (process.env.ANTHROPIC_API_KEY || "").trim();
    if (!apiKey) {
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }

    const userMessage = `An enterprise has completed the AI Maturity Assessment with the following results:

Total Score: ${scores.totalScore}/60
Maturity Stage: ${scores.maturityStage} - ${scores.stageName}

Score breakdown by stage:
- Stage 1 (The Petting Zoo): ${scores.stageScores[1]}/10 (${scores.stagePercentages[1]}%)
- Stage 2 (The Bazaar): ${scores.stageScores[2]}/10 (${scores.stagePercentages[2]}%)
- Stage 3 (The Pilot Graveyard): ${scores.stageScores[3]}/10 (${scores.stagePercentages[3]}%)
- Stage 4 (The Inversion): ${scores.stageScores[4]}/10 (${scores.stagePercentages[4]}%)
- Stage 5 (The Refinery): ${scores.stageScores[5]}/10 (${scores.stagePercentages[5]}%)
- Stage 6 (The Operating Model): ${scores.stageScores[6]}/10 (${scores.stagePercentages[6]}%)

Please generate a personalized, actionable report based on this assessment.`;

    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      return Response.json({ error: `Anthropic API error: ${anthropicResponse.status}`, details: errorText }, { status: 500 });
    }

    const message = await anthropicResponse.json();
    const reportText = message.content[0].type === "text" ? message.content[0].text : "";

    return Response.json({ report: reportText, scores });
  } catch (error) {
    return Response.json({ error: error.message || "Failed to generate report" }, { status: 500 });
  }
}
