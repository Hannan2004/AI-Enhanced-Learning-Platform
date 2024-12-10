const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

async function generateLogicalQuestions(type, language) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `Generate 5 Logical Reasoning questions in JSON format for the difficulty level of a ${type} student.
Ensure the questions gradually increase in difficulty and require the reader to carefully analyze patterns, sequences, or scenarios to arrive at the correct answer. The questions should include varied types, such as syllogisms, number or letter series, puzzles, analogies, and logical deductions. Craft the answer options to be thoughtfully challenging, requiring the reader to evaluate each choice thoroughly.
The response should follow this JSON format:
\`\`\`json
[
    {
        "question": "<Logical reasoning question>",
        "options": [
            "A) <Option A>",
            "B) <Option B>",
            "C) <Option C>",
            "D) <Option D>"
        ],
        "correctAnswer": "<Correct answer>",
        "marks": 10
    }
]
\`\`\`
Remember the questions should be in increasing level of difficulty. You should generate questions in the language specified by the user. Supported languages are English, Hindi, Marathi, Malayalam, and Bengali.`,
        });

        const chatSession = model.startChat({
            generationConfig
        });
        const result = await chatSession.sendMessage(`Generate 5 Questions for ${type} in ${language}: logical-reasoning in increasing level of difficulty`);
        return { response: result.response.text(), context: chatSession.history };
    } catch (error) {
        throw new Error(`Error generating question: ${error.message}`);
    }
}

module.exports = { generateLogicalQuestions };