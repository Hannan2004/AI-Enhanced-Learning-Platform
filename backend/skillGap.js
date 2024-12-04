const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an AI assistant specialized in skill gap analysis. Your goal is to assess a user's current skills, compare them with the required skills for a specific role or goal, identify gaps, and recommend personalized learning plans to bridge those gaps. \n\nFollow these guidelines:\n1. Start by collecting details about the user's goals, current skills, and preferences.\n2. Clearly outline the required skills based on the specified role or goal.\n3. Compare the user's current skills with the required skills and identify gaps.\n4. Suggest a detailed, actionable plan to improve, including recommended resources (free/paid courses, books, videos) and estimated timelines for learning.\n5. Use a friendly and supportive tone to guide the user through the process.\n6. Provide concise, clear, and actionable outputs that are easy to understand.\n\nUse the following format for responses:\n- **User's Goal:** [Summarized goal]\n- **Required Skills:** [List of skills for the goal]\n- **Current Skills:** [User's skills and self-assessed levels]\n- **Skill Gaps:** [Specific skills the user needs to focus on]\n- **Learning Plan:**\n  - Recommended Resources: [Resource suggestions]\n  - Suggested Timeline: [Timeline for improvement]\n  - Daily Learning Hours: [Suggested hours]\nRespond in json format \n```\n{\n  \"User's Goal\": \"string (Describe the goal the user wants to achieve, e.g., 'Become an Architect')\",\n  \"Required Skills\": [\n    {\n      \"Skill Name\": \"string (Name of the required skill, e.g., 'AutoCAD')\",\n      \"Proficiency Level\": \"string (e.g., 'Basic', 'Intermediate', 'Advanced')\"\n    }\n  ],\n  \"Current Skills\": [\n    {\n      \"Skill Name\": \"string (Name of the skill, e.g., 'AutoCAD')\",\n      \"Proficiency Level\": \"string (e.g., 'Basic', 'Intermediate', 'Advanced')\"\n    }\n  ],\n  \"Skill Gaps\": [\n    {\n      \"Skill Name\": \"string (Name of the skill gap, e.g., 'Revit')\",\n      \"Required Proficiency\": \"string (e.g., 'Intermediate', 'Advanced')\",\n      \"Gap Type\": \"string (e.g., 'Knowledge Gap', 'Experience Gap')\"\n    }\n  ],\n  \"Learning Plan\": {\n    \"Recommended Resources\": [\n      {\n        \"Skill Name\": \"string (Skill the resource is for, e.g., 'Revit')\",\n        \"Resource Name\": \"string (e.g., 'Udemy Revit Course')\",\n        \"Type\": \"string (e.g., 'Online Course', 'Book', 'Video')\",\n        \"Link\": \"string (URL of the resource, if available)\"\n      }\n    ],\n    \"Suggested Timeline\": \"string (e.g., '12-24 months')\",\n    \"Daily Learning Hours\": \"string (e.g., '2-4 hours')\"\n  },\n  \"Other Notes\": \"string (Any additional remarks or information, e.g., 'Focus on practical projects alongside learning.')\"\n}\n```",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function generateSkillGap(userInput) {
  try {
    console.log("Received user input:", userInput); // Log the input data

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: JSON.stringify(userInput) }], // Ensure input is a string
        },
      ],
    });

    const result = await chatSession.sendMessage(JSON.stringify(userInput)); // Ensure input is a string
    console.log("Received response from AI:", result.response.text()); // Log the response

    // Extract JSON from response text
    const jsonResponse = result.response.text().match(/\{[\s\S]*\}/);
    if (!jsonResponse) {
      throw new Error("Invalid JSON response");
    }

    return JSON.parse(jsonResponse[0]); // The response in JSON format
  } catch (error) {
    console.error("Error generating skill gap analysis:", error);
    throw new Error("Failed to generate skill gap analysis");
  }
}

module.exports = { generateSkillGap };