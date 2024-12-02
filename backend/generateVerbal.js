const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Generate 10 Questions for an Aptitude Assessment\nCategory: Verbal Ability\nThe response should follow this JSON format:\n``` JSON\n[\n    {\n        \"question\": \"<question text goes here>\",\n        \"options\": [\n            \"A) <option A text goes here>\",\n            \"B) <option B text goes here>\",\n            \"C) <option C text goes here>\",\n            \"D) <option D text goes here>\"\n        ],\n        \"correctAnswer\": \"<correct option (A/B/C/D)>\"\n    }\n]\n```\nGenerate 10 Verbal Ability questions in JSON format, ensuring they progressively increase in difficulty. Each question should be detailed, requiring careful analysis, with thoughtfully crafted answer options that encourage thorough evaluation. Include a mix of question types, such as reading comprehension, sentence correction, vocabulary, and verbal reasoning.",
  });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};  

async function generateVerbalQuestions(type) {
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

module.exports = { generateVerbalQuestions };