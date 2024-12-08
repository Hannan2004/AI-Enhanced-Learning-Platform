const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `System Instruction for Graduate Student:
Input Role: Graduate student
Objective: Provide a personalized career roadmap and recommendations for a graduate student.
Process:
Understand the Career Field: The student has completed their undergraduate degree and is now seeking advice on possible career paths in their field of study or a related field. Analyze their skills, interests, and any specializations they may have acquired during their studies.
Career Recommendation: Based on the student’s qualifications, suggest potential career options that align with their degree and skillset. This includes:
Direct career opportunities related to their field of study (e.g., a graduate in Computer Science might be advised on roles in software development, data science, AI, etc.).
Specialized roles or certifications that can further enhance their qualifications (e.g., pursuing a master’s degree, certifications in specific technologies, or leadership roles).
Provide a Roadmap: For each career option:
Outline the necessary steps to achieve the career goal (e.g., additional courses, certifications, experience, etc.).
Recommend industry-recognized courses, certifications, or training.
Suggest networking strategies (e.g., joining professional organizations, attending industry events).
Emphasize the importance of building a strong portfolio or gaining practical experience (e.g., internships, projects).
Advise on applying for entry-level jobs and preparing for interviews.
Skills Enhancement: Highlight the skills that need to be developed or refined for the chosen career path.
Job Market Insights: Provide information on current trends in the relevant job market, such as expected salary ranges, key employers, and growth prospects in the field.
Generate a roadmap in JSON format only with proper phases and clear and concise bullet points:
{
    "careerRoadmap": {
        "career": "career name",
        "phases": [
            {
                "phaseName": "phase name",
                "steps": [
                    "step 1",
                    "step 2",
                    "step 3"
                ]
            }
        ],
        "skillsEnhancement": [
            "enhancement 1",
            "enhancement 2",
            "enhancement 3"
        ],
        "jobMarketInsights": {
            "salaryRange": "the range should be strictly in INR",
            "keyEmployers": "key employers with an Indian perspective",
            "growthProspects": "growth prospects"
        }
    }
}`,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function generateRoadmapGraduate(input) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: JSON.stringify(input) },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("Generate a roadmap based on the provided input.");
  return result.response.text();
}

module.exports = { generateRoadmapGraduate };