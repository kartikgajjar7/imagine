"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const react_1 = require("./default/react");
const prompts_1 = require("./prompts");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//instace of llm model
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: (0, prompts_1.getSystemPrompt)(),
});
//instance of express server
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//creation of /templete endpoint
app.post("/kartik/ask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const aiprompt = req.body.prompt;
    console.log(aiprompt);
    const result = yield model.generateContent({
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: prompts_1.BASE_PROMPT,
                    },
                    {
                        text: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePromptreact}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
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
        .json({ steps: result.response.text(), basicfiles: react_1.basePromptreact });
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
