const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const genai = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

const model = genai.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
    You are an experienced career advisor and roadmap creator. You will be provided with the user's career preferences and details. Based on the user's current level (e.g., 10th grade, undergraduate, etc.), you will generate a detailed career roadmap for the specified career option.

    The user will provide the following information:
    1. Career Option: The career the user is interested in.
    2. Current Level: The user's current education level (e.g., 10th grade, undergraduate).
    3. Strengths, Skills, and Aspirations: Information that will help in building the roadmap.

    Your task is to generate a roadmap in Mermaid syntax that outlines the key milestones for the user's career path, including the necessary education, certifications, internships, and job applications. The roadmap should include:
    - Key education milestones
    - Internship recommendations
    - Important skills to acquire
    - Job search and application steps

    Return the roadmap in the following format:

    {
      "career_roadmap": "<Mermaid Syntax>"
    }
    `,
});

// Configuration for faster responses
const generationConfig = {
    temperature: 0.4,   // Reduced temperature for more deterministic responses
    topP: 0.85,        // Reduced topP for a narrower response distribution
    topK: 50,          // Reduced topK to consider fewer options
    maxOutputTokens: 1024, // Reduced tokens to speed up the response
    responseMimeType: "text/plain",
};

async function uploadToGemini(path, mimeType) {
    const uploadResult = await fileManager.uploadFile(path, {
        mimeType,
        displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file: ${file.displayName} as: ${file.name}`);
    return file;
}

async function generateRoadmap(career, userLevel, userStrengths) {
    const roadmapRequest = {
        career: career,
        level: userLevel,
        strengths: userStrengths,
    };

    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    {
                        content: JSON.stringify(roadmapRequest),
                    },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage("generate career roadmap.");

    // Extract the roadmap in Mermaid format from the response
    const mermaidRoadmap = result.response.text().match(/\{[\s\S]*\}/);
    if (!mermaidRoadmap) {
        throw new Error("Invalid Mermaid response");
    }

    return JSON.parse(mermaidRoadmap[0]);
}

module.exports = { generateRoadmap };
