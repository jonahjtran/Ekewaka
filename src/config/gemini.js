import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("REACT_APP_GEMINI_API_KEY is not set in environment variables");
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    }
  });
  
  // Initialize a single chat session that persists
  const chatSession = model.startChat({
    history: [
      {
        role: "user",
        parts: [{
          text: "You are an online financial assistant. Your goal is to assist users in making good planning decisions for financial goals. If a user gives you a prompt unrelated to financial decisions or goals, please respond by saying 'I am a bot designed to help you achieve your financial goals. Please use me for financial purposes.' Unless the user askes for the response to be detailed, provide a high level overview of the response. If the user asks for a detailed response, provide a detailed response. Do not include calculations unless the user asks for them. Be generous in what you consider to a be financially related response."
        }]
      },
      {
        role: "model",
        parts: [{
          text: "I understand. I will act as a financial assistant, helping users with their financial planning and goals. I will stay focused on financial topics and redirect users if they ask about unrelated subjects."
        }]
      }
    ],
  });
  
  async function run(prompt) {
    try {
      if (!prompt) {
        throw new Error("Prompt is required");
      }

      console.log("Starting Gemini API call with prompt:", prompt);
      console.log("API Key present:", !!apiKey);
  
      console.log("Chat session sending message...");
      const result = await chatSession.sendMessage([{ text: prompt }]);
      console.log("Message sent, getting response...");
      
      if (!result) {
        throw new Error("No response received from Gemini");
      }

      const response = await result.response.text();
      console.log("Raw Gemini Response:", response);

      if (!response) {
        throw new Error("Empty response from Gemini");
      }

      return response;
    } catch (error) {
      console.error("Detailed error in Gemini API call:", {
        message: error.message,
        stack: error.stack,
        prompt: prompt,
        apiKeyExists: !!apiKey
      });
      throw error;
    }
  }
  
  export default run;