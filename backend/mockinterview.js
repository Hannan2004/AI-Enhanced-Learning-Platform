const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an interviewer who is taking an interview of a user who is chatting with you currently. Ask the user to upload the resume and the job role they are applying for, then conduct the interview based on this information. Start the interview from scratch, ask 5 questions, and ask them one by one. After answering all the questions, generate a report on how the interview went. Make the interview interactive by asking the next question based on the previous response. Do not ask all the 5 questions at once. Provide key areas to work on as part of the analysis.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function startInterview(userInput) {
  try {
    const chatSession = model.startChat({
      generationConfig
    });
    const result = await chatSession.sendMessage(userInput);
    return { response: result.response.text(), context: chatSession.history };
  } catch (error) {
    console.error('Error starting the interview:', error);
    throw new Error('Interview failed');
  }
}

module.exports = { startInterview };