const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Generate 5 Questions for conducting aptitude assessment \nCategory : Numerical Ability\n``` JSON\n            [ \n                \"question\": <question>,\n                \"options\": [\n                    \"A) <option A>\",\n                    \"B) <option B>\",\n                    \"C) <option C>\",\n                    \"D) <option D>\"\n                ],\n                \"correctAnswer\": <correct answer>\n            ]\n````\nRemember the questions should be in increasing level of difficulty",
});
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};  
async function generateNumericalQuestions(type) {
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
module.exports = { generateNumericalQuestions };