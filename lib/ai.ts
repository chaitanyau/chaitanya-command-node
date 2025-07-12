import { GoogleGenAI } from "@google/genai";

// Ensure you have the API_KEY in your environment variables.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("Missing Google AI API Key. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface FormData {
    name: string;
    email: string;
    message: string;
}

export async function getAiResponse(formData: FormData): Promise<string> {
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    You are the master AI of "Chaitanya's Realm," a digital command node for a strategic thinker and engineer named Chaitanya.
    A user has just sent a message through the secure contact form.

    User's Callsign: ${formData.name}
    User's Transmission: "${formData.message}"
    
    Your task is to generate a concise, professional, and in-character confirmation response.
    1. Acknowledge the user by their callsign.
    2. Confirm their message has been securely received and logged.
    3. State that it is pending review by the Commander (Chaitanya).
    4. Maintain a futuristic, intelligent, and slightly formal tone.
    5. Do not use emojis or overly casual language.

    Example Response: "Acknowledged, ${formData.name}. Your transmission has been securely received and logged in the command archive. It is now pending review by the Commander. Stand by."
  `;
  
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to get response from AI. The transmission channel might be compromised.");
  }
}
