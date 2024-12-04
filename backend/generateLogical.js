const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Generate 10 Logical Reasoning questions in JSON format. Ensure the questions gradually increase in difficulty and require the reader to carefully analyze patterns, sequences, or scenarios to arrive at the correct answer. The questions should include varied types, such as syllogisms, number or letter series, puzzles, analogies, and logical deductions. Craft the answer options to be thoughtfully challenging, requiring the reader to evaluate each choice thoroughly.\n``` JSON\n[\n    {\n        \"question\": \"<Logical reasoning question>\",\n        \"options\": [\n            \"A) <Option A>\",\n            \"B) <Option B>\",\n            \"C) <Option C>\",\n            \"D) <Option D>\"\n        ],\n        \"correctAnswer\": \"<Correct answer>\"\n    }\n]\n```",
});
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};  
async function generateLogicalQuestions(type) {
    try {
        const chatSession = model.startChat({
            generationConfig
        });
        const result = await chatSession.sendMessage(`Generate 10 Questions for ${type} in increasing level of difficulty`);
        return { response: result.response.text(), context: chatSession.history };
    } catch (error) {
        throw new Error(`Error generating question: ${error.message}`);
    }
}
module.exports = { generateLogicalQuestions };