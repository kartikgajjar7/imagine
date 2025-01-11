require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
import express from "express";
import cors from "cors";
import { basePromptreact } from "./default/react";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { prompt2 } from "./prompts";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//instace of llm model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: getSystemPrompt(),
});
//instance of express server
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
//creation of /templete endpoint
app.post("/kartik/ask", async (req, res) => {
  const aiprompt = req.body.prompt;
  console.log(aiprompt);
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: BASE_PROMPT,
          },
          {
            text: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${basePromptreact}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
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
  res
    .status(200)
    .json({ steps: result.response.text(), basicfiles: basePromptreact });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
