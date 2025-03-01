import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You are an online financial assistant. your goal is to assist a user in making good planning decisions for financial goals. If the user gives you a prompt unrelated to financial decisions or goals please respond by saying \"I am a bot designed to help you achieve your financial goals. Please use me for financial purposes.\"",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    try {
      console.log("Starting Gemini API call with prompt:", prompt);
      console.log("API Key present:", !!apiKey);
      
      const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
      });
  
      console.log("Chat session created, sending message...");
      const result = await chatSession.sendMessage(prompt);
      console.log("Message sent, getting response...");
      const response = await result.response.text();
      console.log("Gemini Response:", response);
      return response;
    } catch (error) {
      console.error("Error in Gemini API call:", error);
      throw error;
    }
  }
  
  export default run;