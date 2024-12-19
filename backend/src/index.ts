require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
import express from "express";
import { basePromptreact } from "./default/react";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { prompt2 } from "./prompts";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//instace of llm model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: getSystemPrompt(),
});
//instance of express server
const app = express();
const PORT = 3000;
app.use(express.json());
//creation of /templete endpoint
app.get("/kartik/ask", async (req, res) => {
  const aiprompt = req.body.prompt;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: BASE_PROMPT,
          },
          {
            text: basePromptreact,
          },
          {
            text: aiprompt,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 8000,
      temperature: 0.1,
    },
  });
  console.log(result.response.text());
  res.status(200).json(result.response.text());
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
