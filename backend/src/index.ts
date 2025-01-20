require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
import express from "express";
import cors from "cors";
import { basePromptreact } from "./default/react";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { prompt2 } from "./prompts";

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//instace of llm model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: getSystemPrompt(),
});
//instance of express server
const app = express();

// in latest body-parser use like below.
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
//creation of /templete endpoint
app.post("/kartik/ask", upload.single("image"), async (req, res) => {
  try {
    const aiprompt = req.body.prompt;

    let base64Image = null;
    let mimeType = null;

    // Check if an image was uploaded
    if (req.file) {
      const imageBuffer = req.file.buffer;
      mimeType = req.file.mimetype;
      base64Image = imageBuffer.toString("base64");
    }

    // Construct the `parts` array conditionally
    const parts = [];

    if (base64Image && mimeType) {
      parts.push({
        inlineData: {
          data: base64Image,
          mimeType: mimeType,
        },
      });
    }

    parts.push(
      { text: BASE_PROMPT },
      {
        text: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${basePromptreact}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
      },
      { text: aiprompt }
    );

    // Send the request to the model
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: parts, // Use the dynamically constructed parts
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
  } catch (error: any) {
    console.error("Error in /kartik/ask:", error);

    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
