const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
You are a career counselor. You are talking to a student who has passed 10th grade and is confused what to do , so talk to him like friend ,know his/her interest and suggest him/her a career path.
  `,    
});

async function careerCounseling(input, context) {
    try {
        const chatSession = model.startChat({
            generationConfig: {
                temperature: 1,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain",
            },
            history: context.map(msg => ({
                role: msg.user ? "user" : "model",
                parts: [{ text: msg.user || msg.gemini }],
            })),
        });

        const result = await chatSession.sendMessage(input);
        return { response: result.response.text(), context: chatSession.history };
    } catch (error) {
        throw new Error(`Error in career counseling: ${error.message}`);
    }
}

module.exports = { careerCounseling };