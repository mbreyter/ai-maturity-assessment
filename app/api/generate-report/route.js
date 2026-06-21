import https from "https";
import { systemPrompt } from "@/lib/systemPrompt";
import { calculateScores } from "@/lib/scoring";

export async function POST(request) {
  try {
    console.log("POST request received");
    console.log("Content-Type:", request.headers.get("content-type"));
    
    let body;
    try {
      body = await request.json();
      console.log("Request body parsed successfully:", body);
    } catch (parseError) {
      console.error("Failed to parse JSON body:", parseError.message);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body", details: parseError.message }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    const { answers } = body;

    if (!answers) {
      return new Response(
        JSON.stringify({ error: "No answers provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Calculate scores
    const scores = calculateScores(answers);

    // Prepare context for Claude
    const userMessage = `
An enterprise has completed the AI Maturity Assessment with the following results:

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

    console.log("Creating Anthropic API request...");
    const apiKey = (process.env.ANTHROPIC_API_KEY || "").trim();
    console.log("API Key loaded:", apiKey ? `${apiKey.substring(0, 20)}...` : "EMPTY");
    
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY environment variable not set");
    }

    console.log("Calling Anthropic API with model: claude-sonnet-4-6");
    
    // Use raw HTTPS instead of SDK to avoid connection issues
    const requestBody = JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: "api.anthropic.com",
        port: 443,
        path: "/v1/messages",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({ status: res.statusCode, data: data });
        });
      });

      req.on("error", (e) => {
        reject(e);
      });

      req.write(requestBody);
      req.end();
    });

    console.log("API Status:", response.status);

    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status} - ${response.data}`);
    }

    const message = JSON.parse(response.data);

    console.log("Anthropic API response received successfully");

    // Extract text from response
    const reportText =
      message.content[0].type === "text" ? message.content[0].text : "";

    console.log("Report generated, length:", reportText.length);

    return new Response(
      JSON.stringify({
        report: reportText,
        scores: scores,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("====== ERROR GENERATING REPORT ======");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error status:", error.status);
    console.error("Full error:", error);
    console.error("=====================================");

    return new Response(
      JSON.stringify({
        error: error.message || "Failed to generate report",
        details: error.constructor.name,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
