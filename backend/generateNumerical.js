
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};
async function generateNumericalQuestions(type) {
    try {
        console.log(`Type of req is ${type}`)
        const chatSession = model.startChat({
            generationConfig
        });
        const result = await chatSession.sendMessage(`Generate 5 Questions for ${type} in increasing level of difficulty`);
        return { response: result.response.text(), context: chatSession.history };
    } catch (error) {
        throw new Error(`Error generating question: ${error.message}`);
    }
}
module.exports = { generateNumericalQuestions };