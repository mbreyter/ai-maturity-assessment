import { Anthropic } from "@anthropic-ai/sdk";
import fs from "fs";

const envPath = ".env.local";
const envContent = fs.readFileSync(envPath, "utf-8");
const apiKeyLine = envContent.split("\n").find((line) => line.startsWith("ANTHROPIC_API_KEY"));
const apiKey = apiKeyLine.split("=")[1].trim();

console.log("Testing simple API call...");
console.log("API Key:", apiKey.substring(0, 20) + "...");

const client = new Anthropic({
  apiKey: apiKey,
  defaultHeaders: {
    "anthropic-version": "2023-06-01",
  },
});

try {
  console.log("Sending request...");
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 100,
    system: "You are a helpful assistant.",
    messages: [
      {
        role: "user",
        content: "What is 2 + 2?",
      },
    ],
  });
  
  console.log("SUCCESS! Response:", message.content[0].text);
} catch (error) {
  console.error("ERROR:", error.message);
  console.error("Error type:", error.constructor.name);
  if (error.response) {
    console.error("Response status:", error.response.status);
    console.error("Response body:", error.response.body);
  }
}
